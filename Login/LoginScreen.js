import React, {Component} from 'react'
import { Alert } from 'react-native';
import AuthenticatorUI from './AuthenticatorUI'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import auth from '@react-native-firebase/auth';
// import { connect } from 'react-redux'
// import * as userActions from '../reduxStore/actions/user'
import {API_URL_GRAL} from '../Constantes/constants'


class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password: '',
            loading:false
        }
    }

    componentDidMount()
    {
        console.log('entro en login screen')
    }

    setEmail = (email)=>{
        this.setState({
            email:email
        })
    }

    setPassword = (password)=>{
        this.setState({
            password
        })
    }

    login = async ()=>{ //funcion asyncrona

        try {
            this.setState({ loading: true });
            
            let url_ = `${API_URL_GRAL}VerificaUsuarioTCN?` 
            + `Usuario=` + this.state.email 
            + `&Contrasenia=` + this.state.password

            console.log(url_)
             let response0 = await fetch(url_);
             const json = await response0.json();

             console.log(json)

             let oUsuario = {}  
            if(json.length>0)
            { 
                this.setEmail('');
                this.setPassword('');
                
                this.setState({ loading: false, email: '', password: '' })
                AsyncStorage.setItem('@IDUser', json[0].Id)
                AsyncStorage.setItem('@NombreUser', json[0].Nombre)
                AsyncStorage.setItem('@CorreoUser', json[0].Correo)
                AsyncStorage.setItem('@TelefonoUser', json[0].Telefono)
                AsyncStorage.setItem('@PDUser', json[0].PD)
                AsyncStorage.setItem('@TypUser', json[0].Typ)
                this.props.navigation.navigate('App');
             }  
             else
                {
                    this.setState({ loading: false })
                    Alert.alert(
                        'Error de autenticación',
                        'Usuario o contraseña invalida',
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
            this.setState({ loading: false })
            Alert.alert(
                'Error de autenticación',
                error,
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
        if(this.state.email!='')
        {
            try {
                this.setState({ loading: true });
                let url_ = `${API_URL_GRAL}UpdatePasswordRandom?` 
                + `Usuario=` + this.state.email 
                let response0 = await fetch(url_);
                const json = await response0.json();

                let msjResetPD = json;
                Alert.alert(
                    'Titanium',
                    msjResetPD,
                    [
                    {
                        text: 'OK',
                        onPress: () => this.setState({ loading: false }),
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
                'Titanium','Debe especificar su correo de acceso en el campo [usuario]',
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

    render(){
        return(
            <AuthenticatorUI
            setPassword={this.setPassword}
            setEmail={this.setEmail}
            mainAction={this.login} 
            mainButtonTitle="Ingresar"
            //secondaryButtonTitle="no tengo cuenta"
            //navigationAction = {()=> {this.props.navigation.navigate('SignUp')}}
            stateLogin={this.state.loading}
            secondAction={this.createPasstmp}
            />
        )
    }
}

// const mapStateToProps = (state, ownProps) => {
//     return {
//       user: state.user.user,
//     }
//   };
  
//   const mapDispatchToProps = (dispatch) => {
//     return {
//       login: user => dispatch(userActions.login(user)),
//     }
//   };
  
//   export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
export default LoginScreen