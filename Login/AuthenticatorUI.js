import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity
    , Image, TouchableHighlight, Dimensions, useColorScheme, KeyboardAvoidingView, Alert, ActivityIndicator  } from 'react-native'
import { Colors } from  'react-native/Libraries/NewAppScreen';
// import Spinner from 'react-native-loading-spinner-overlay';
import UserInput from '../Componentes/UserInput'
import usernameImg from '../Imagenes/username.png'
import passwordImg from '../Imagenes/password.png'
import logoTitaniumImg from   '../Imagenes/LogoTitanium.jpg'
// import halconImg from '../Imagenes/halcon.png'
import { Button, IconButton } from 'react-native-paper';
import {SIZES, InputLogin, ModeDark, ModeLight} from '../Constantes/Tema'
import { VersionSys } from '../Constantes/constants';
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import colors from '../resources/styles/colors';

//const isDarkMode = useColorScheme() === 'dark';

export default class AuthenticatorUI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      iconPass : 'eye',
      //iconNotShow : 'eye-with-line'
    };
    this.showPass = this.showPass.bind(this);
  }

  componentDidMount(){

  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true, iconPass: 'eye-with-line'})
      : this.setState({showPass: true, press: false, iconPass: 'eye'});
  }

  render() {
  return(
    <View style={{backgroundColor:'white', flex:1}}>
      {/* <Spinner
      visible = {props.stateLogin}
      textContent = {'Cargando...'}
      textStyle = {{color: '#FFF'}}
      /> */}
      <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={{flexDirection:'row', paddingTop: SIZES.height * SIZES.TopGeneral, backgroundColor:colors.bdMain }}></View>
        <View style={{flexDirection:'row'}}>
          <View style={{flex: 2, flexDirection:'row'}}></View>
          <View style={{flex: 8, flexDirection:'row'}}>
            <TouchableOpacity
            //  onPress={()=> props.mainAction()}
            >
              <Image
              style={{flex:1, resizeMode:'stretch'}}
              source={logoTitaniumImg}
              >
              
              </Image>
            </TouchableOpacity>
          </View>
          <View style={{flex: 2, flexDirection:'row'}}></View>
        </View>
        {/* <View style={{flexDirection:'row'}}>
                <View style={{flex: 3, flexDirection:'row'}}></View>
                <View style={{flex: 6, flexDirection:'row'}}>
                  <TouchableOpacity 
                  // onPress={()=> this.props.mainAction()}
                  >
                    <Image
                    style={{width:50, height:50}}
                    source={logoTitaniumImg}
                    >
                    
                    </Image>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 3, flexDirection:'row'}}></View>
              </View> */}
        <View style={{flexDirection:'row'}}>
          <View style={{flex: 1, flexDirection:'row'}}>
          

          </View>
          
          <View style={{flex: 8, flexDirection:'row', paddingLeft:0, paddingRight:0 }}>
            <View style={{flexDirection:'column', width:'100%'}}>
              
            <KeyboardAvoidingView behavior="padding" >
            <View style={{
                                flexDirection: 'row', paddingTop:20
                            }}>
            
            <TouchableOpacity
                
                >
                  {/* <IconButton icon="eye" color="white" size={30}></IconButton> */}
                  <Icon2 name={'user'} color={colors.colorTCN} size={30} />
                </TouchableOpacity>
                <Text style={{color:'black'}}>Usuario:</Text>
                </View>

              <View style={{ flexDirection: 'row', paddingTop:2 }}></View>
              <UserInput 
              source={'user'}
              placeholder="Usuario"
              autoCapitalize={'none'}
              returnKeyType={'done'}
              autoCorrect={false}
              setEmail={this.props.setEmail}
              heightInput={InputLogin.height}
              />



              <View style={{ flexDirection: 'row', paddingTop:20 }}></View>
              <View style={{
                                flexDirection: 'row', padding:1,
                            }}>
            
            <TouchableOpacity
                
                >
                  {/* <IconButton icon="eye" color="white" size={30}></IconButton> */}
                  <Icon2 name={'key'} color={colors.colorTCN} size={30} />
                </TouchableOpacity>
                <Text style={{color:'black'}}>Contraseña:</Text>
                </View>
                

              <UserInput
              source={'key'}
              secureTextEntry={this.state.showPass}
              placeholder="Contraseña"
              returnKeyType={'done'}
              autoCapitalize={'none'}
              autoCorrect={false}
              setPassword={this.props.setPassword}
              heightInput={InputLogin.height}
              />

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btnEye}
                onPress={this.showPass }
                onBlur={false}
              >
                {/* <IconButton icon="eye" color="white" size={30}></IconButton> */}
                <Icon2 name={this.state.iconPass} color={"white"} size={30} />
              </TouchableOpacity>

              <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                            }}>
                                <TouchableHighlight style={{marginTop:15}}>
                                    <Button 
                                    tyle={styles.button}
                                    mode="contained" color="#f4cc37"
                                    onPress={()=> this.props.mainAction()}>Entrar</Button>
                                </TouchableHighlight>
                            </View>

                <View style={{flexDirection:'row', height:30, paddingTop:10, margin:0}}>
                    <View style={{flexDirection:'column', flex:1}}></View>
                    <View style={{flexDirection:'column', flex:10}}>
                            <Text style={{textAlign:'center', color:'black'}}>¿Olvidaste tu contraseña?</Text>
                    </View>
                    <View style={{flexDirection:'column', flex:1}}></View>
                </View>
                <View style={{flexDirection:'row', height:30, paddingTop:10, margin:0}}>
                    <View style={{flexDirection:'column', flex:1}}></View>
                    <View style={{flexDirection:'column', flex:10}}>
                        <TouchableOpacity
                        onPress={()=> {
                                 Alert.alert(
                                    'Titanium', 'Esta apunto de generar una nueva contraseña de ingreso, la cual se enviará al correo especificado en el campo "Usuario", mismo que debe contar con el registro en Titanium, ¿Seguro que desea continuar?',
                                    [ { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                                    { text: 'Si', onPress: () => this.props.secondAction()
                                    },
                                    ],
                                    {cancelable: false},
                                );  
                                }
                        }
                        >
                            <Text style={{textAlign:'center', textDecorationLine:'underline', color:'#1F618D', fontWeight:'bold'}}>Genera una contraseña temporal</Text>
                        </TouchableOpacity>
                            
                    </View>
                    <View style={{flexDirection:'column', flex:1}}></View>
                </View>
                <View style={{flexDirection:'row', height:5, paddingTop:10, margin:0}}>
                    <View style={{flexDirection:'column', flex:1}}></View>
                    <View style={{flexDirection:'column', flex:10}}>
                            <Text style={{textAlign:'center', color:'black'}}>Consulta</Text>
                    </View>
                    <View style={{flexDirection:'column', flex:1}}></View>
                </View>

                            <View style={{
                                flexDirection: 'row',
                                paddingTop:70,
                                justifyContent: 'space-evenly'
                            }}>
                              {/* <Text style={{color:'white', textAlign:'center'}}>{VersionSys}</Text> */}

                            </View>
                      </KeyboardAvoidingView>
                            
              
            </View>

          </View>
          <View style={{flex: 1, flexDirection:'row'}}></View>
        </View>
        
      </ScrollView>
      {this.state.loading && (
        <View style={styles.loadingActivity}>
        <ActivityIndicator size="large"/>
        </View>
        
        )}  
    </View>
)
  
        
    
}
}



const styles = StyleSheet.create({
    Content: {
      flex: 1,
      //padding:30,
      //backgroundColor: isDarkMode ? Colors.black : Colors.white
      alignContent:'flex-start'
    },
    btnEye: {
      position:'absolute',
      top: 160,
      right: 10,
    },
    iconEye: {
      width: 30,
      height: 30,
    },
    loadingActivity: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0.5,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center'
    }
    
  });