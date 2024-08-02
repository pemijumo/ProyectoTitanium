import React, {Component} from 'react'
import { Alert } from 'react-native';
import AuthenticatorUI from './AuthenticatorUI'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import auth from '@react-native-firebase/auth';
// import { connect } from 'react-redux'
// import * as userActions from '../reduxStore/actions/user'
import {API_URL_GRAL, URL_PRINCIPAL, URL_RESPALDO, DireccionPrincipal, DireccionRespaldo, } from '../Constantes/constants'
import NetInfo from "@react-native-community/netinfo";

class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password: '',
            loading:false,
            connection_Status: "Online",
        }
    }

    async componentDidMount()
    {
      try {
        this.unsubscribe = NetInfo.addEventListener(this._handleConnectivityChange);

        console.log('entro en login screen')
        await this.verificarConexionServidor();
        
      } catch (error) {
        
      }
      
            
             
    }

    componentWillUnmount() {
      try {
        this.unsubscribe();
        console.log('unsubscribe netInfo LS')
        
      } catch (error) {
        
      }
      
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

    verificarConexionServidor = async () => {
        try {
            let responsePrincipal = "";
            let responseRespaldo = "";
            let SeguirVerificando = false;

            if(this.state.connection_Status=="Online")
            {
              console.log('en linea aut loading')
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
            }
            else{
                Alert.alert(
                    'Titanium All Access', "No se ha detectado una conexión a internet, verifique su conexión e intente nuevamente",
                    [{ text: 'OK', onPress: () => console.log('.'), style: 'cancel',}],
                    {cancelable: false},
                  );
            }
          
        } catch (error) {
          console.error("Error al intentar conectar al servidor:", error.message);
        }
    };

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

    _handleConnectivityChange = (state) => {
      try {
        if (state.isConnected) {
          this.setState({ connection_Status: 'Online' }, this.verificarConexionServidor);
        } else {
          this.setState({ connection_Status: 'Offline' });
        }
        
      } catch (error) {
        
      }
      
    };

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