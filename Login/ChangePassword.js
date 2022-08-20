import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {API_URL_GRAL} from '../Constantes/constants'
import { StackActions } from '@react-navigation/native';

class ChangePassword extends Component { 
    constructor(props) {
        super(props);
        this.state={
            ContraseniaAnt:'',
            ContraseniaNew: '',
            loading:false
        }
    }

    ChangePaswordNw = async ()=>{ 
        let _Email = await AsyncStorage.getItem('@CorreoUser')
        if(_Email!='')
        {
            if(this.state.ContraseniaAnt!='')
            {
                if(this.state.ContraseniaNew!=''){
                    try {
                        this.setState({ loading: true });
                    
                        let url_ = `${API_URL_GRAL}UpdatePassword?` 
                        + `Usuario=` + _Email 
                        + `&PassAnt=` + this.state.ContraseniaAnt 
                        + `&PassNew=` + this.state.ContraseniaNew 
                        
                        let response0 = await fetch(url_);
                        const json = await response0.json();

                        let msjResetPD = json[0].Message;
                        let Tipomsj = json[0].TipoMensaje;
                        Alert.alert(
                            'Titanium',
                            msjResetPD,
                            [
                            {
                                text: 'OK',
                                onPress: () => {
                                    this.setState({ loading: false })
                                    if(Tipomsj == 1){
                                    AsyncStorage.removeItem('@NombreUser')
                                    AsyncStorage.removeItem('@CorreoUser') 
                                    AsyncStorage.removeItem('@TelefonoUser')                       
                                    AsyncStorage.removeItem('@PDUser')
                                    AsyncStorage.removeItem('@IDUser')     
                                    AsyncStorage.removeItem('@TypUser')  
                                    this.props.navigation.dispatch(StackActions.replace('Login'));
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
                        'Titanium','Debe especificar su nueva contraseña',
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
                    'Titanium','Debe especificar su contraseña anterior',
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
                'Titanium','Debe especificar su usuario',
                
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

    createPasstmp = async ()=>{ 
        let _Email = await AsyncStorage.getItem('@CorreoUser')
        if(_Email!='')
        {
            console.log(_Email)
            try {
                this.setState({ loading: true });
            
                let url_ = `${API_URL_GRAL}UpdatePasswordRandom?` 
                + `Usuario=` + _Email 
                let response0 = await fetch(url_);
                const json = await response0.json();

                let msjResetPD = json;
                Alert.alert(
                    'Titanium',
                    msjResetPD,
                    [
                    {
                        text: 'OK',
                        onPress: () => {
                            this.setState({ loading: false })
                            AsyncStorage.removeItem('@NombreUser')
                            AsyncStorage.removeItem('@CorreoUser') 
                            AsyncStorage.removeItem('@TelefonoUser')                       
                            AsyncStorage.removeItem('@PDUser')
                            AsyncStorage.removeItem('@IDUser')     
                            AsyncStorage.removeItem('@TypUser')  
                            this.props.navigation.dispatch(StackActions.replace('Login'));
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
        else{
            Alert.alert(
                'Titanium','Debe especificar su usuario',
                
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

    render() {
        if (this.state.loading) {
            return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
              </View>
            );
        }
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                <View style={{flexDirection:'row', paddingTop:15}}>
                    
                </View>
                <View style={{flexDirection:'row', height:30, paddingTop:10, margin:0}}>
                    <View style={{flexDirection:'column', flex:1}}></View>
                    <View style={{flexDirection:'column', flex:10}}>
                            <Text style={{textAlign:'center', fontWeight:'bold', color:'black'}}>Contraseña anterior:</Text>
                    </View>
                    <View style={{flexDirection:'column', flex:1}}></View>
                </View>
                <View style={{flexDirection:'row', height:60}}>
                    <View style={{flexDirection:'column', flex:1}}></View>
                    <View style={{flexDirection:'column', flex:10}}>
                            <TextInput style={{height:45, textAlign:'center'}}
                            onChangeText={tx => this.setState({ContraseniaAnt : tx})}
                            value={this.state.ContraseniaAnt}
                            secureTextEntry={true}
                            ></TextInput>
                    </View>
                    <View style={{flexDirection:'column', flex:1}}></View>
                </View>
                <View style={{flexDirection:'row', height:30, paddingTop:5, margin:0}}>
                    <View style={{flexDirection:'column', flex:1}}></View>
                    <View style={{flexDirection:'column', flex:10}}>
                            <Text style={{textAlign:'center', fontWeight:'bold', color:'black'}}>Contraseña nueva:</Text>
                    </View>
                    <View style={{flexDirection:'column', flex:1}}></View>
                </View>
                <View style={{flexDirection:'row', flex:1}}>
                    <View style={{flexDirection:'column', flex:1}}></View>
                    <View style={{flexDirection:'column', flex:10}}>
                            <TextInput style={{height:45, textAlign:'center'}}
                            onChangeText={tx => this.setState({ContraseniaNew : tx})}
                            value={this.state.ContraseniaNew}
                            secureTextEntry={true}
                            heightInput={45}
                            ></TextInput>
                    </View>
                    <View style={{flexDirection:'column', flex:1}}></View>
                </View>
                <View style={{flexDirection:'row', paddingTop:30}}></View>
                <View style={{flexDirection:'row', height:45, margin:0}}>
                    <View style={{flexDirection:'column', flex:4}}></View>
                    <View style={{flexDirection:'column', flex:4}}>
                        <TouchableOpacity>
                            <Button mode="contained" color="#f4cc37"
                            onPress={this.ChangePaswordNw}
                            >Actualizar</Button>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'column', flex:4}}></View>
                </View>
                <View style={{flexDirection:'row', paddingTop:30, margin:0}}>
                    
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
                                    'Titanium', 'Esta apunto de generar una nueva contraseña de ingreso, la cual se enviará al correo vinculado a esta cuenta, ¿Seguro que desea continuar?',
                                    [ { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                                    { text: 'Si', onPress: () => this.createPasstmp()
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

                <View style={{flexDirection:'row', flex:4}}>
                    <Text></Text>
                </View>

            </View>


        )
    }

}

export default ChangePassword