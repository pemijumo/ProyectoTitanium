import React, { useState, useEffect, Component } from 'react'
import { Alert } from 'react-native';
import { useNavigation  } from '@react-navigation/native';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {API_URL_GRAL, URL_PRINCIPAL, URL_RESPALDO, DireccionPrincipal, DireccionRespaldo} from '../Constantes/constants'
import { StackActions } from '@react-navigation/native';
// import { connect } from 'react-redux';
// import * as userActions from '../reduxStore/actions/user'
// import auth from '@react-native-firebase/auth'
// import {API_URL } from '../Constantes/constants'


// const navigation = useNavigation();
class AuthLoading extends Component{
  constructor(props){
      super(props);  
      this.state={
        loading:false
    }
  }
  async componentDidMount(){
    console.log('entro en aut loading')
    
    await this.getUser();
  }
  componentWillUnmount()
  {

  }

  verificarConexionServidor = async () => {
    try {
        let responsePrincipal = "";
        let responseRespaldo = "";
        let SeguirVerificando = false;

        try {
            let controller1 = new AbortController()
            setTimeout(() => controller1.abort(), 5000);  // abort after 15 seconds

            let URL1 = URL_PRINCIPAL + '/Hola'
            responsePrincipal = await fetch(URL1, {signal: controller1.signal});  
            let r1 = await responsePrincipal.json();
            console.log(r1)
            DireccionPrincipal();

            } catch (error) {
                console.log('cayo en error al verificar url principal')
                SeguirVerificando = true;
                console.log(error)
            }

        if(SeguirVerificando){
            try {
                let controller2 = new AbortController()
                setTimeout(() => controller2.abort(), 5000);  // abort after 15 seconds

                let URL2 = URL_RESPALDO + '/Hola'
                responseRespaldo = await fetch(URL2, {signal: controller2.signal});
                let r2 = await responseRespaldo.json();
                console.log(r2)
                DireccionRespaldo();
            } catch (error) {
                console.log('cayo en error al verificar url respaldo')
                SeguirVerificando = true;
                console.log(error)
            }
        }
      
    } catch (error) {
      console.error("Error al intentar conectar al servidor:", error.message);
    }
};

  getUser = async () =>{
    // const value1 = await AsyncStorage.getItem('@NombreUser')
    const value2 = await AsyncStorage.getItem('@CorreoUser') //--
    // const value3 = await AsyncStorage.getItem('@TelefonoUser')
    const value4 = await AsyncStorage.getItem('@PDUser') //--
    // const value5 = await AsyncStorage.getItem('@IDUser')
    // const value6 = await AsyncStorage.getItem('@TypUser')

      if(value2!=null && value4!=null)
      {
        await this.verificarConexionServidor();
        //validar que la contraseña no haya cambiado
        try {
            let url_ = `${API_URL_GRAL}VerificaUsuarioTCN?` 
            + `Usuario=` + value2
            + `&Contrasenia=` + value4

             let response0 = await fetch(url_);
             const json = await response0.json();

            if(json.length>0)
            {
              AsyncStorage.removeItem('@IDUser')
              AsyncStorage.removeItem('@NombreUser')
              AsyncStorage.removeItem('@CorreoUser') 
              AsyncStorage.removeItem('@TelefonoUser')  
              AsyncStorage.removeItem('@PDUser')     
              AsyncStorage.removeItem('@TypUser')
              //---------------------------------------
              AsyncStorage.setItem('@IDUser', json[0].Id)
              AsyncStorage.setItem('@NombreUser', json[0].Nombre)
              AsyncStorage.setItem('@CorreoUser', json[0].Correo)
              AsyncStorage.setItem('@TelefonoUser', json[0].Telefono)
              AsyncStorage.setItem('@PDUser', json[0].PD)
              AsyncStorage.setItem('@TypUser', json[0].Typ)
              this.props.navigation.navigate('App');
            }
            else{
              Alert.alert(
                'Error de autenticación',
                'Si ha actualizado su contraseña recientemente deberá ingresar su usuario y su nueva contraseña nuevamente, verifique e intente nuevamente',
                [
                  {
                    text: 'OK',
                    onPress: () => this.CleanReloadPassNew(),
                    style: 'cancel',
                  }
                ],
                {cancelable: false},
              );  
            }

        } catch (error) {
          
        }
      }
      else{
        this.props.navigation.navigate('Login');
      }
  }

  CleanReloadPassNew = async () =>{
    try {
      AsyncStorage.removeItem('@IDUser')
      AsyncStorage.removeItem('@NombreUser')
      AsyncStorage.removeItem('@CorreoUser') 
      AsyncStorage.removeItem('@TelefonoUser')  
      AsyncStorage.removeItem('@PDUser')     
      AsyncStorage.removeItem('@TypUser')     
      this.props.navigation.dispatch(StackActions.replace('Login')); 
    } catch (error) {
      
    }

  }

  render(){
    return(
        <View>
        </View>
    );
  }
}



// const mapStateToProps = (state, ownProps) => {
//   return {
//     user: state.user.user,
//   }
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: user => dispatch(userActions.login(user)),
//   }
// };

export default AuthLoading;
//connect(mapStateToProps, mapDispatchToProps)(AuthLoading);