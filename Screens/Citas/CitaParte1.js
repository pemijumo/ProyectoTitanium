import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Text, StyleSheet, TextInput, Alert, PermissionsAndroid
, Modal, Dimensions, Image, FlatList
} from 'react-native';
import {SearchBar, ListItem, Avatar } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, IconButton  } from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector'
import {API_URL_GRAL} from '../../Constantes/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Contacts from 'react-native-contacts';
import ContactPhone from   '../../Imagenes/phone.png'

const windowWidth = Math.round(Dimensions.get('window').width);
const windowHeight = Math.round(Dimensions.get('window').height);

const FActual = new Date();
class CitasParte1 extends Component {
    constructor() {
        super();
        let fech = FActual.getFullYear() + '-' 
                   + this.LlenadoCeros(FActual.getMonth() + 1,2) 
                   + '-' + this.LlenadoCeros(FActual.getDate(),2)
        this.state = {
          loading: false,
          vlTxtNombreVisitante: '',
          datePickerShow: false,
          dateAll: FActual, 
          date: fech,
          dateAllTime: FActual, 
          datePickerTimeShow: false,
          time: '00:00:00',
          vlTipoPersonal:'',
          vlTextTipoPersonal:'',
          ListTipoPersonal : [{key:'1', label:'Invitado'}, {key:'2', label:'Proveedor'}],
          vlTxtMotivoVisita: '',
          vltxtTelefonoVisitante:'',
          vlTipoAcceso:'',
          vlTextTipoAcceso:'',
          ListTipoAcceso : [{key:'1', label:'Vehícular'}, {key:'2', label:'Peatonal'}, {key:'3', label:'Bicicleta'}],
          vltxtTotalVisitantes:'0',
          vltxtTemplate:'notificacion_cita',
          isModalContactos: false,
          LContactos:[],
          LContactosFilter:[]
        }

       
    }

    async componentDidMount()
    {
      try {
        this.requestContactsPermission();

        
      } catch (error) {
        console.log(error)
      }
      

    }

    requestContactsPermission = async () => 
      {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              'title': 'Contactos',
            'message': 'Esta aplicacion requiere los permisos a tus contactos para funcion correcta del modulo '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {

          } else {
          }
        } catch (err) {
          console.log(err)
        }
      }

    LlenadoCeros = (str, max)=> {
      str = str.toString();
      return str.length < max ? this.LlenadoCeros("0" + str, max) : str;
    }

    RegistrarCita = async ()=>{ 
      try {
        let _iUsr = await AsyncStorage.getItem('@IDUser')
        let _pUsr = await AsyncStorage.getItem('@TelefonoUser')
        let _tUsr = await AsyncStorage.getItem('@TypUser')

        if(this.state.vlTxtNombreVisitante !='')
        {
            if(this.state.vlTipoPersonal !='')
            {
                if(this.state.vltxtTelefonoVisitante!=''){

                  if(this.state.vlTipoAcceso!=''){

                    //if(this.state.vltxtTotalVisitantes!='' && this.state.vltxtTotalVisitantes!='0'){
                          try {
                            this.setState({ loading: true });
                        
                            let url_ = `${API_URL_GRAL}RegistrarCita?` 
                            + `NombreVisitante=` + this.state.vlTxtNombreVisitante 
                            + `&Fecha=` + this.state.date 
                            + `&Hora=` + this.state.time 
                            + `&TipoPersonal=` + this.state.vlTipoPersonal 
                            + `&Motivo=` + this.state.vlTxtMotivoVisita
                            + `&ToNumber=` + this.state.vltxtTelefonoVisitante 
                            + `&TipoAcceso=` + this.state.vlTipoAcceso
                            + `&TotalVisitantes=` + this.state.vltxtTotalVisitantes 
                            + `&UserId=` + _iUsr 
                            + `&UserPhoneNumber=` + _pUsr
                            + `&TipoUser=` + _tUsr 

                            //console.log(url_)
                            
                            let response0 = await fetch(url_);
                            const json = await response0.json();
                            
                            let msj = json[0].Message;
                            let Tipomsj = json[0].TipoMensaje;
                          
                            Alert.alert(
                              'Titanium All Access',msj,
                              [
                              {
                                  text: 'OK',
                                  onPress: () => {
                                    this.setState({ loading: false })
                                    if(Tipomsj==1)
                                    {
                                      this.DescartarVisita();
                                    }
                                  },
                                  style: 'cancel',
                              }
                              ],
                              {cancelable: false},
                          ); 
                            
                        } catch (error) {
                            console.log(error);
                        }
                  }
                  else
                  {
                      Alert.alert(
                        'Titanium All Access','Debe especificar una opcion para el tipo de acceso',
                        [
                        {
                            text: 'OK',
                            onPress: () => this.setState({ loading: false }),
                            style: 'cancel',
                        }
                        ],
                        {cancelable: false},
                    ); 
                  }
                }
                else
                {
                    Alert.alert(
                        'Titanium All Access','Debe especificar el numero de telefono del visitante ya que ahi le llegará la alerta para el acceso',
                        [
                        {
                            text: 'OK',
                            onPress: () => this.setState({ loading: false }),
                            style: 'cancel',
                        }
                        ],
                        {cancelable: false},
                    ); 
                }
            }
            else
            {
                Alert.alert(
                    'Titanium All Access','Debe especificar el tipo de personal',
                    [
                      {
                        text: 'OK',
                        onPress: () => this.setState({ loading: false }),
                        style: 'cancel',
                      }
                    ],
                    {cancelable: false},
                  ); 
            }
        }
        else{
            Alert.alert(
                'Titanium All Access','Debe especificar el nombre del visitante',
                [
                  {
                    text: 'OK',
                    onPress: () => this.setState({ loading: false }),
                    style: 'cancel',
                  }
                ],
                {cancelable: false},
              );  
        }
        
      } catch (error) {
        
      }
      

    }

    DescartarVisita = async ()=>{
      try {
        this.setState({vlTxtNombreVisitante: '', vlTipoPersonal: '', vlTextTipoPersonal:''
      , vlTxtMotivoVisita: '', vltxtTelefonoVisitante:'', vlTipoAcceso: '', vlTextTipoAcceso: ''
      , vltxtTotalVisitantes: '0'})        
      } catch (error) {
        console.log(error)
      }      
    }


    onDateSelectedAndroid  = (event, value)=> {
      try {
        let fech = value.getFullYear() + '-' + this.LlenadoCeros(value.getMonth() + 1,2) + '-' + this.LlenadoCeros(value.getDate(),2)
        this.setState({ dateAll : value, date: fech, datePickerShow:false
      })
      } catch (error) {
        console.log(error)
      }
      
    };
  
    onDateSelectedIOS  = (value)=> {
      try {
        let fech = value.getFullYear() + '-' + this.LlenadoCeros(value.getMonth() + 1,2) + '-' + this.LlenadoCeros(value.getDate(),2)
        this.setState({ dateAll : value, date: fech, datePickerShow:false
      })  
      } catch (error) {
        console.log(error)
      }      
    };
  
    onDateTimeSelectedAndroid  = (event, value)=> {
      try {
        let fechTime = this.LlenadoCeros(value.getHours(),2) + ':' + this.LlenadoCeros(value.getMinutes(),2) + ':00'
        this.setState({ dateAllTime: value, time : fechTime, datePickerTimeShow:false
      })  
      } catch (error) {
        console.log(error)
      }      
    };
  
    onDateTimeSelectedIOS  = (value)=> {
      try {
        let fechTime = this.LlenadoCeros(value.getHours(),2) + ':' + this.LlenadoCeros(value.getMinutes(),2) + ':00'
        this.setState({ dateAllTime: value, time : fechTime, datePickerTimeShow:false
      })  
      } catch (error) {
        console.log(error)
      }
      
    };

    ShowAllContacts = async ()=>{
      try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              'title': 'Contactos',
            'message': 'Esta aplicacion requiere los permisos a tus contactos para funcion correcta del modulo '
            }
          )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Contacts.getAll()
          .then((contacts) => {
            let contactsWithNumber = contacts.filter(obj=> obj.phoneNumbers.length>0)
            let ContactosPhone = contactsWithNumber.map((contact) => {
               return {
              Name: contact.displayName, 
              Number: contact.phoneNumbers[0].number
            }  
            } );
            let NwContactosPhone = ContactosPhone.slice(0,5)
            this.setState({ isModalContactos : true, LContactos: ContactosPhone, LContactosFilter: NwContactosPhone})
          })
          .catch((e) => {
            console.log(e)
          })
        } else {
        }
      } catch (err) {
        console.log(err)
      }
      
    }

    searchFilterFunction = text => {
      try {
        let oLContactosFilter = this.state.LContactos.filter(obj => (obj.Name.toLowerCase().includes(text.toLowerCase()) || obj.Number.toString().replace(/[^a-zA-Z0-9]/g, '').includes(text.toLowerCase())))
        let NwContactosFilter = oLContactosFilter.slice(0,5)
        this.setState({ value: text, LContactosFilter: NwContactosFilter });        
      } catch (error) {
        console.log(error)
      }      
    };

    render() {
        return (
          <ScrollView>
            <View style={{paddingTop:15}}>
              <View>
                <View style={styles.items}>
                  <View>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={styles.label}>Nombre del visitante:</Text>
                      <View>
                          <TextInput
                              style={styles.textContainer} 
                              underlineColorAndroid="transparent"
                              placeholderTextColor="grey"
                              multiline={false}
                              value={this.state.vlTxtNombreVisitante}
                              onChangeText={value => this.setState({ vlTxtNombreVisitante: value })}
                          />
                      </View>
                    </View>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={{flex:6}}><Text style={styles.label}>Fecha:</Text></View>
                        <View style={{flex:6}}><Text style={styles.label}>Hora:</Text></View>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={{flex:6}}>
                        <TouchableOpacity style={{borderWidth:1, height:40, borderRadius:10}} onPress={() => this.setState({datePickerShow: true})}>
                        <View style={{flexDirection:'row', padding:0}}>
                            <View style={{flex:3}}>
                                <IconButton icon={'calendar'} size={25} color="#ED9A0C" style={{padding:0, margin:0}}></IconButton>
                            </View>
                            <View style={{flex:9}}>
                                <Text style={{color:'black', textAlign:'center', textAlignVertical:'center', marginTop:10}}>{this.state.date}</Text>
                            </View>
                            {this.state.datePickerShow && (
                            <DateTimePicker
                                    testID="dateTimePicker"
                                    value={this.state.dateAll}
                                    mode={'date'}
                                    onChange={this.onDateSelectedAndroid}
                                  />
                            )}
                        </View>
                        </TouchableOpacity>
                          
                        </View>
                        <View style={{flex:5, paddingLeft:5}}>
                            <TouchableOpacity style={{borderWidth:1, height:40, borderRadius:10}} onPress={() => this.setState({datePickerTimeShow: true})}>
                            <View style={{flexDirection:'row', padding:0}}>
                                <View style={{flex:3}}>
                                    <IconButton icon={'calendar'} size={25} color="#ED9A0C" style={{padding:0, margin:0}}></IconButton>
                                </View>
                                <View style={{flex:9}}>
                                    <Text style={{color:'black', textAlign:'center', textAlignVertical:'center', marginTop:10}}>{this.state.time}</Text>
                                </View>
                                {this.state.datePickerTimeShow && (
                              <DateTimePicker
                                      testID="dateTimePicker"
                                      value={this.state.dateAllTime}
                                      mode={'time'}
                                      style={styles.datePicker}
                                      is24Hour={true}
                                      onChange={this.onDateTimeSelectedAndroid}
                                      />
                              )}
                            </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1}}>
                        </View>
                      </View>

                      <View style={{flexDirection:"row", paddingTop:15, paddingRight:15}}>                
                            <ModalSelector
                                data={this.state.ListTipoPersonal}
                                initValue={this.state.vlTextTipoPersonal}
                                onChange={(option)=>{ this.setState({vlTipoPersonal: `${option.key}`, vlTextTipoPersonal: `${option.label}` }) }}
                                style={{flex:10, padding:0}}
                                sectionStyle = {{padding:0}}
                                cancelText={'Cancelar'}
                                >
                                    <View style={{flexDirection:"row", backgroundColor: '#E2E2E2'}}>
                                    <TextInput
                                    style={{borderWidth:1, borderColor:'#ccc', padding:0, height:40, flex:11, color:'black', textAlign:'center'}}
                                    editable={false}
                                    placeholder="Selecciona una opcion"
                                    placeholderTextColor="black"
                                    value={this.state.vlTextTipoPersonal} />
                                    
                                    <IconButton  style={{height:20}} icon={'chevron-down'} ></IconButton>
                                    </View>
                                </ModalSelector>      
                      </View>

                    <View style={{ flexDirection: 'column', display:'none' }}>
                      <Text style={styles.label}>Motivo:</Text>
                      <View>
                          <TextInput
                              style={styles.textContainer} 
                              underlineColorAndroid="transparent"
                              placeholderTextColor="grey"
                              multiline={false}
                              value={this.state.vlTxtMotivoVisita}
                              onChangeText={value => this.setState({ vlTxtMotivoVisita: value })}
                          />
                      </View>
                    </View>

                    <View style={{flexDirection:'row', paddingRight:15, paddingTop:10}}></View>

                    <View style={{ flexDirection: 'column', padding:0, margin:0 }}>
                      
                      <View style={{flexDirection:'row', padding:0}}>
                            <View style={{flex:10}}>
                              <Text style={styles.label}>No. Teléfono:</Text>
                            </View>
                            <View style={{flex:2}}>
                                <TouchableOpacity >
                                  <IconButton icon={'contacts'} size={25} color="#ED9A0C" 
                                  style={{padding:0, margin:0}}
                                  onPress={() => this.ShowAllContacts() }
                                  ></IconButton>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{flexDirection:'row', padding:0}}>
                           
                            <View style={{flex:12}}>
                            <TextInput
                              style={styles.textContainer} 
                              underlineColorAndroid="transparent"
                              placeholderTextColor="grey"
                              multiline={false}
                              value={this.state.vltxtTelefonoVisitante}
                              onChangeText={value => this.setState({ vltxtTelefonoVisitante: value })}
                              keyboardType='phone-pad'
                              />
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:"row", paddingTop:15, paddingRight:15}}>                
                            <ModalSelector
                                data={this.state.ListTipoAcceso}
                                initValue={this.state.vlTextTipoAcceso}
                                onChange={(option)=>{ this.setState({vlTipoAcceso: `${option.key}`, vlTextTipoAcceso: `${option.label}` }) }}
                                style={{flex:10, padding:0}}
                                sectionStyle = {{padding:0}}
                                cancelText={'Cancelar'}
                                >
                                    <View style={{flexDirection:"row", backgroundColor: '#E2E2E2'}}>
                                    <TextInput
                                    style={{borderWidth:1, borderColor:'#ccc', padding:0, height:40, flex:11, color:'black', textAlign:'center'}}
                                    editable={false}
                                    placeholder="Selecciona una opcion"
                                    placeholderTextColor="black"
                                    value={this.state.vlTextTipoAcceso} />
                                    
                                    <IconButton  style={{height:20}} icon={'chevron-down'} ></IconButton>
                                    </View>
                                </ModalSelector>      
                      </View>

                      

                    <View style={{ flexDirection: 'column' }}>
                      <Text style={styles.label}>Total de visitantes:</Text>
                      <View>
                          <TextInput
                              style={styles.textContainer} 
                              underlineColorAndroid="transparent"
                              placeholderTextColor="grey"
                              multiline={false}
                              value={this.state.vltxtTotalVisitantes}
                              onChangeText={value => this.setState({ vltxtTotalVisitantes: value })}
                              keyboardType="numeric"
                          />
                      </View>
                    </View>

                    <View style={{flexDirection:'row', paddingRight:15, paddingTop:20}}>
                    <View style={{flex:3}}>

                    </View>
                    <View style={{flex:6}}>
                        <TouchableOpacity>
                            <Button mode="contained" color="#f4cc37"
                            onPress={this.RegistrarCita}
                            >Guardar</Button>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:3}}>
                    </View>                       
                    </View>
                    <View style={{flexDirection:'column', paddingRight:15, paddingTop:5}}>
                        
                    </View>

                  </View>
                </View>
              </View>

              <View>
                <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.isModalContactos}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
            
                }
                }>
                  <View style={styles.modalView}>
                  <View style={{ flex: 1 }}>
                  <View style={{flexDirection:'column', flex:8}}>
                    <SearchBar
                      placeholder="Buscar contacto"
                      lightTheme
                      round
                      onChangeText={text => this.searchFilterFunction(text)}
                      autoCorrect={false}
                      value={this.state.value}
                      blurOnSubmit={false}
                    />
                    <FlatList
                    data={this.state.LContactosFilter}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                      onPress={()=> {
                        let _number = item.Number.toString()                        
                        _number = _number.replace(/[^a-zA-Z0-9]/g, '');
                        this.setState({vltxtTelefonoVisitante: _number, isModalContactos:false})
                      }}
                      >
                        <View>
                        <ListItem key={index}>
                        <Avatar 
                        rounded 
                        activeOpacity={0.7}
                        containerStyle={{backgroundColor:'#A8E884'}}
                        source={ContactPhone} />
                            <ListItem.Content>
                                <ListItem.Title>{item.Name}</ListItem.Title>
                                <ListItem.Subtitle>{item.Number}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                        </View>
                      </TouchableOpacity>
                    )}
                   // keyExtractor={item => item.index}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    blurOnSubmit={false}
                    keyboardShouldPersistTaps='handled'
                  />
                  </View>
              
                  <View style={{flexDirection:'column', flex:4}}>
                  <View style={{flexDirection:'row', paddingRight:15, paddingTop:20}}>
                    <View style={{flex:3}}>

                    </View>
                    <View style={{flex:6}}>
                        <TouchableOpacity>
                            <Button mode="contained" color="#f4cc37"
                            onPress={() => this.setState({ isModalContactos: false})}
                            >Cancelar</Button>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:3}}>
                    </View>                    
                    </View>
                  </View>
                  </View>
                  </View>
                </Modal>
                </View> 
            </View>
          </ScrollView>
        );
      }

}

export default CitasParte1

const styles = StyleSheet.create({
  items: {
    paddingLeft:20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black',
    textAlign:'center'
  },
  textContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    padding:2,
    marginRight:20,
    color:'black',
    borderRadius:10,
    textAlign:'center'
    },
    modalView: {
      backgroundColor: 'grey',
     width: windowWidth,//*0.8,
     height: windowHeight,// *0.8,
      alignSelf: 'center',
     top: windowHeight *0.1,
     borderRadius: windowHeight*0.03,
   },
   inlineImg: {
     position: 'relative',
    // zIndex: 99,
    width: 22,
    height: 22,
    // left: 35,
    // top: 30,
  },
})