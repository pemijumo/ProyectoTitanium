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

//const isDarkMode = useColorScheme() === 'dark';

export default class AuthenticatorUI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
    };
    this.showPass = this.showPass.bind(this);
  }

  componentDidMount(){

  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
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
      <View style={{flexDirection:'row', paddingTop: SIZES.height * SIZES.TopGeneral }}></View>
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
          <View style={{flex: 1, flexDirection:'row'}}></View>
          
          <View style={{flex: 10, flexDirection:'row', paddingLeft:20, paddingRight:20 }}>
            <View style={{flexDirection:'column', width:'100%'}}>
            <KeyboardAvoidingView behavior="padding" >
              <UserInput 
              source={usernameImg}
              placeholder="Usuario"
              autoCapitalize={'none'}
              returnKeyType={'done'}
              autoCorrect={false}
              setEmail={this.props.setEmail}
              heightInput={InputLogin.height}
              />

              <UserInput
              source={passwordImg}
              secureTextEntry={this.state.showPass}
              placeholder="Contrase??a"
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
                <IconButton icon="eye" color="white" size={30}></IconButton>
              </TouchableOpacity>

              <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                            }}>
                                <TouchableHighlight style={{marginTop:15}}>
                                    <Button 
                                    tyle={styles.button}
                                    mode="contained" color="#f4cc37"
                                    onPress={()=> this.props.mainAction()}>Ingresar</Button>
                                </TouchableHighlight>
                            </View>

                <View style={{flexDirection:'row', height:30, paddingTop:10, margin:0}}>
                    <View style={{flexDirection:'column', flex:1}}></View>
                    <View style={{flexDirection:'column', flex:10}}>
                            <Text style={{textAlign:'center', color:'black'}}>??Olvidaste tu contrase??a?</Text>
                    </View>
                    <View style={{flexDirection:'column', flex:1}}></View>
                </View>
                <View style={{flexDirection:'row', height:30, paddingTop:10, margin:0}}>
                    <View style={{flexDirection:'column', flex:1}}></View>
                    <View style={{flexDirection:'column', flex:10}}>
                        <TouchableOpacity
                        onPress={()=> {
                                 Alert.alert(
                                    'Titanium', 'Esta apunto de generar una nueva contrase??a de ingreso, la cual se enviar?? al correo especificado en el campo "Usuario", mismo que debe contar con el registro en Titanium, ??Seguro que desea continuar?',
                                    [ { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                                    { text: 'Si', onPress: () => this.props.secondAction()
                                    },
                                    ],
                                    {cancelable: false},
                                );  
                                }
                        }
                        >
                            <Text style={{textAlign:'center', textDecorationLine:'underline', color:'#1F618D', fontWeight:'bold'}}>Genera una contrase??a temporal</Text>
                        </TouchableOpacity>
                            
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
      top: 80,
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