import React, { Component } from 'react'
import { View, FlatList, Text, Dimensions, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Button, IconButton  } from 'react-native-paper';
import { API_URL_GRAL } from '../../Constantes/constants';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Table, Row, Cell } from 'react-native-table-component';

class ListaCitasGeneradas extends Component {
    constructor(props) {
        super(props)
        let date1 = new Date();
        let date2 = new Date();
        let newDate = date1.getFullYear() + '-' + this.LlenadoCeros(date1.getMonth() + 1,2) + '-' + this.LlenadoCeros(date1.getDate(),2)
        let newDate1 = date2.getFullYear() + '-' + this.LlenadoCeros(date2.getMonth() + 1,2) + '-' + this.LlenadoCeros(date2.getDate(),2)


        this.state = {
            data: [],
            loading: true,
            Desde: newDate,
            Hasta: newDate1,

            datePickerShow1: false,
            dateAll1: date1, 

            datePickerShow2: false,
            dateAll2: date2, 
            tableHeadEntregar: ["Fecha visita"],
            widthHeader:[1]
        }

    }

    componentDidMount() {
       this.GetCitasGeneradas();
    }

    GetCitasGeneradas = async () => {
        this.setState({ loading: false, data: json })

        console.log(API_URL_GRAL)

        const _vlTelefono = await AsyncStorage.getItem('@TelefonoUser')
        let Controller = `${API_URL_GRAL}GetCatalog`;
        console.log(Controller)
        let response = await fetch(Controller, 
        {
            method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                Parameters: { TipoConsulta: 10, Usuario : _vlTelefono, Desde: this.state.Desde, Hasta: this.state.Hasta },
                StoredProcedure: "up_AccesoUsuarios",
                Conexion: "TCN"

            })
        
        });

        let json = await response.json();

        console.log('valor de lista de citas')
        console.log(json)

        this.setState({ loading: false, data: json })
    }

    LlenadoCeros = (str, max)=> {
        str = str.toString();
        return str.length < max ? this.LlenadoCeros("0" + str, max) : str;
      }

    renderSeparator(){
        return <View style={{ height: 1, borderColor: 'silver', paddingVertical: 5}}></View>
    }

    onDateSelected1Android  = (event, value)=> {
        let fech = value.getFullYear() + '-' + this.LlenadoCeros(value.getMonth() + 1,2) + '-' + this.LlenadoCeros(value.getDate(),2)
        this.setState({ dateAll1 : value, Desde: fech, datePickerShow1:false
        })
      };

      onDateSelected1IOS  = (value)=> {
        let fech = value.getFullYear() + '-' + this.LlenadoCeros(value.getMonth() + 1,2) + '-' + this.LlenadoCeros(value.getDate(),2)
        this.setState({ dateAll1 : value, Desde: fech, datePickerShow1:false
        })
      };

      onDateSelected2Android  = (event, value)=> {
        let fech = value.getFullYear() + '-' + this.LlenadoCeros(value.getMonth() + 1,2) + '-' + this.LlenadoCeros(value.getDate(),2)
        this.setState({ dateAll2 : value, Hasta: fech, datePickerShow2:false
        })
      };

      onDateSelected2IOS  = (value)=> {
        let fech = value.getFullYear() + '-' + this.LlenadoCeros(value.getMonth() + 1,2) + '-' + this.LlenadoCeros(value.getDate(),2)
        this.setState({ dateAll2 : value, Hasta: fech, datePickerShow2:false
        })
      };

      RowLine = ()=>{
        return(
            <View>
                <Text>Col1</Text>
                <Text>Col2</Text>
            </View>
        )
      }

    render() {

        return (
            <View style={{
                paddingHorizontal: 20,
                paddingVertical: 15
            }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{flex:4}}>
                    <Text style={styles.label}>Desde:</Text>
                </View>
                <View style={{flex:4}}>
                    <Text style={styles.label}>Hasta:</Text>
                </View>
                <View style={{flex:2}}>
                    
                </View>
                <View style={{flex:2}}>
                    
                </View>
            </View>

            <View style={{ flexDirection: 'row', paddingBottom:20, height:55 }}>
                <View style={{flex:4}}>
                <TouchableOpacity style={{borderWidth:1, height:40}} onPress={() => this.setState({datePickerShow1: true})}>
                    <View style={{flexDirection:'row', padding:0}}>
                        <View style={{flex:3}}>
                            <IconButton icon={'calendar'} size={25} color="#ED9A0C" style={{padding:0, margin:0}}></IconButton>
                        </View>
                        <View style={{flex:9}}>
                            <Text style={{color:'black', textAlign:'center', textAlignVertical:'center', marginTop:10}}>{this.state.Desde}</Text>
                        </View>
                        {this.state.datePickerShow1 && (
                            Platform.OS === 'ios' ?
                            <DatePicker
                            modal
                            open={this.state.datePickerShow1}
                            date={this.state.dateAll1}
                            onConfirm={(date) => {
                                this.onDateSelected1IOS(date)
                            }}
                            onCancel={() => {
                            this.setState({datePickerShow1: false})
                            }}
                            mode={'date'}
                            confirmText={'Confirmar'}
                            cancelText={'Cancelar'}
                            />
                            :  
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.dateAll1}
                            mode={'date'}
                            style={styles.datePicker}
                            onChange={this.onDateSelected1Android}
                            />
                        )}
                    </View>                        
                </TouchableOpacity>
                </View>
                <View style={{flex:4, paddingLeft:5}}>
                <TouchableOpacity style={{borderWidth:1, height:40}} onPress={() => this.setState({datePickerShow2: true})}>
                    <View style={{flexDirection:'row', padding:0}}>
                        <View style={{flex:3}}>
                            <IconButton icon={'calendar'} size={25} color="#ED9A0C" style={{padding:0, margin:0}}></IconButton>
                        </View>
                        <View style={{flex:9}}>
                            <Text style={{color:'black', textAlign:'center', textAlignVertical:'center', marginTop:10}}>{this.state.Hasta}</Text>
                        </View>
                        {this.state.datePickerShow2 && (
                            Platform.OS === 'ios' ?
                            <DatePicker
                            modal
                            open={this.state.datePickerShow2}
                            date={this.state.dateAll2}
                            onConfirm={(date) => {
                                this.onDateSelected2IOS(date)
                            }}
                            onCancel={() => {
                            this.setState({datePickerShow2: false})
                            }}
                            mode={'date'}
                            confirmText={'Confirmar'}
                            cancelText={'Cancelar'}
                            />
                            : 
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.dateAll2}
                            mode={'date'}
                            style={styles.datePicker}
                            onChange={this.onDateSelected2Android}
                            />
                        )}
                    </View>                        
                </TouchableOpacity>
                </View>
                <View style={{flex:4, paddingLeft:5, flexDirection:'row'}}>
                    <Button 
                     onPress={() => this.GetCitasGeneradas()} 
                    mode="contained" color="#f4cc37"><Text style={{fontSize:11}}>Consultar</Text></Button>
                </View>
            </View>
            
            <View style={{flexDirection:'row', paddingBottom:5}}>
                <View style={{flex:1}}>
                    <Text style={{fontSize: 15, color:'black'}}>Citas encontradas: <Text style={{fontWeight:'bold', fontSize: 15, color:'black', backgroundColor:'#f4cc37'}}>{this.state.data != undefined ? this.state.data.length : 0}</Text></Text>                
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingBottom:5, height:DEVICE_HEIGHT - 200 }}>   
            <ScrollView>
                <FlatList
                    data={this.state.data} 
                    renderItem={({ item, index }) => (
                        <View style={{
                            flexDirection:'column',
                            //paddingHorizontal: 10,
                            //paddingVertical: 1,
                            padding:8,
                            backgroundColor: index % 2 === 0 ? '#EAEDED' : '#D4E6F1',
                            borderRadius:8,
                            
                            
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                
                            }}>
                                <IconButton icon={'account'} style={{margin:-7, paddingRight:5}} size={25} color="black"/>
                                <Text style={styles.label}>Visitante: </Text>
                                <Text style={{color:'black', fontWeight: 'bold', fontSize: 16}}>{item.NombreVisitante}</Text> 
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <IconButton icon={'calendar'} style={{margin:-7, paddingRight:5}} size={25} color="black"/>  
                                <Text style={styles.label}>Fecha visita: </Text>
                                <Text style={{color:'black', fontWeight: 'bold', fontSize: 16}}>{item.FechaVisita}</Text> 
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <IconButton icon={'calendar'} style={{margin:-7, paddingRight:5}} size={25} color="black"/>  
                                <Text style={styles.label}>Fecha entrada: </Text>
                                <Text style={{color:'black', fontWeight: 'bold',fontSize: 16}}>{item.FechaEntrada}</Text> 
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <IconButton icon={'calendar'} style={{margin:-7, paddingRight:5}} size={25} color="black"/>  
                                <Text style={styles.label}>Fecha salida: </Text>
                                <Text style={{color:'black', fontWeight: 'bold',fontSize: 16}}>{item.FechaSalida}</Text> 
                            </View>
                            <View style={{flexDirection: 'row'}}>
                            
                                <IconButton icon={'account-tie-hat'} style={{margin:-7, paddingRight:5}} size={25} color="black"/>  
                                <Text style={styles.label}>Autorizó: </Text>
                                <Text style={{color:'black', fontWeight: 'bold',fontSize: 16}}>{item.UsuarioAutoriza}</Text> 
                            </View>
                        </View>
                    )}

                    keyExtractor={item => item.DocEntry}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    blurOnSubmit={false}
                    keyboardShouldPersistTaps='handled'
                />
                </ScrollView>
            </View>
            </View>
        )
    }
}

export default ListaCitasGeneradas

const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    items: {
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    label: {
        fontSize: 16,
        //fontWeight: 'bold',
        color:'black'
    },
    labelData: {
        fontSize: 16,
        paddingHorizontal: '8%'
    },
    container: { flex: 1, padding: 16, paddingTop: 5, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    text: { margin: 6, textAlign: 'left', color: 'white' },
    row: { flexDirection: 'row', backgroundColor: 'white' },
    cellStyle1: { flex: 1 },
    cellStyle2: { flex: 2 }
    , header: { backgroundColor: '#004481' }
    , loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
    , spinnerTextStyle: {
        color: '#FFF'
    }
    , modalSelector: {
        height: DEVICE_HEIGHT - 50,
        paddingTop: 50,
    },
    textAreaContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        borderRadius: 8
    },
    textArea: {
        height: 50,
    },
    textContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        padding:0,
        margin:0
    },
});
