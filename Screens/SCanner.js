import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Linking, View,
  Alert, ActivityIndicator
} from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-async-storage/async-storage'


const API_URL_TCN = 'http://187.190.62.113/TCN_WEB/TNC/'
const API_URL = 'https://spatiatek-access-demo-php.herokuapp.com/api/access/'


class SCanner extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      ModoValidacion: 'residente'
    }
  }

  async componentDidMount()
  {
      //  let cadena = 
      //  'Inmueble=T03/Tipo=PE/NumAcceso=14'
      //  //'Inmueble=T01/Tipo=PE/NumAcceso=1'
      //  let arrayCadenas = cadena.split('/')
      //   if(arrayCadenas.length == 3){
      //     let indiceInmueble = arrayCadenas[0].indexOf('=')
      //     let indiceTipo = arrayCadenas[1].indexOf('=')
      //     let indiceAcceso = arrayCadenas[2].indexOf('=')

      //     if(indiceInmueble>0 && indiceTipo>0 && indiceAcceso>0)
      //     {
      //       let _Inmueble = arrayCadenas[0].substring(indiceInmueble+1, arrayCadenas[0].length)
      //       let _Tipo = arrayCadenas[1].substring(indiceTipo+1, arrayCadenas[1].length)
      //       let _NumAccess = arrayCadenas[2].substring(indiceAcceso+1, arrayCadenas[2].length)

      //       if(_Inmueble.length>0 && _Tipo.length>0 && _NumAccess.length>0)
      //       {
      //         this.setState({loading: true});
      //         this.ValidaAcceso(_Inmueble, _Tipo, _NumAccess);
      //       }
      //       else
      //       {
      //         Alert.alert(
      //           'TCN:', 'Formato no valido para verificacion de acceso',
      //           [{ text: 'OK', onPress: () => console.log('Presionó OK'), style: 'cancel',}],
      //           {cancelable: false},
      //         );
      //       }
      //     }
      //     else
      //     {
      //       Alert.alert(
      //         'TCN:', 'Formato no valido para verificacion de acceso',
      //         [{ text: 'OK', onPress: () => console.log('Presionó OK'), style: 'cancel',}],
      //         {cancelable: false},
      //       );
      //     }
      //   }
      //   else{
      //     Alert.alert(
      //       'TCN:', 'Formato no valido para verificacion de acceso',
      //       [{ text: 'OK', onPress: () => console.log('Presionó OK'), style: 'cancel',}],
      //       {cancelable: false},
      //     );
      //   }



  }

  onSuccess = e => {
    try {
      let txtQr = e.data.toUpperCase()
      if(txtQr.length >0)
      {

        let cadena = txtQr
        //'Inmueble=T02/Tipo=VE/NumAcceso=7'
        let arrayCadenas = cadena.split('/')
        if(arrayCadenas.length == 3){
          let indiceInmueble = arrayCadenas[0].indexOf('=')
          let indiceTipo = arrayCadenas[1].indexOf('=')
          let indiceAcceso = arrayCadenas[2].indexOf('=')

          if(indiceInmueble>0 && indiceTipo>0 && indiceAcceso>0)
          {
            let _Inmueble = arrayCadenas[0].substring(indiceInmueble+1, arrayCadenas[0].length)
            let _Tipo = arrayCadenas[1].substring(indiceTipo+1, arrayCadenas[1].length)
            let _NumAccess = arrayCadenas[2].substring(indiceAcceso+1, arrayCadenas[2].length)

            if(_Inmueble.length>0 && _Tipo.length>0 && _NumAccess.length>0)
            {
              this.setState({loading: true});
              this.ValidaAcceso(_Inmueble, _Tipo, _NumAccess);
            }
            else
            {
              Alert.alert(
                'Titanium All Access', 'Formato no valido para verificacion de acceso',
                [{ text: 'OK', onPress: () => console.log('Presionó OK'), style: 'cancel',}],
                {cancelable: false},
              );
            }
          }
          else
          {
            Alert.alert(
              'Titanium All Access', 'Formato no valido para verificacion de acceso',
              [{ text: 'OK', onPress: () => console.log('Presionó OK'), style: 'cancel',}],
              {cancelable: false},
            );
          }
        }
        else{
          Alert.alert(
            'Titanium All Access', 'Formato no valido para verificacion de acceso',
            [{ text: 'OK', onPress: () => console.log('Presionó OK'), style: 'cancel',}],
            {cancelable: false},
          );
        }

      }
      else{
        this.setState({loading: false});
        Alert.alert(
          'Titanium All Access', 'Formato no valido para verificacion de acceso',
          [{ text: 'OK', onPress: () => console.log('Presionó OK'), style: 'cancel',}],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.log(error)
    }
    
  };

  ValidaAcceso = async (_Inmueble, _Tipo, _NumAccess)=>{
    try {
      console.log('entra a validar acceso')
      const _vlTelefono = await AsyncStorage.getItem('@TelefonoUser')
      const _Modo = this.state.ModoValidacion == 'residente' ? 3 : 4
        const response = await fetch(`${API_URL_TCN}ValidarAccesoUsuario`, {
          method: 'POST', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },        
          body: JSON.stringify({
            TipoAcceso: 2, 
            Modo: _Modo, 
            Usuario: _vlTelefono, 
            InMueble: _Inmueble, 
            Tipo: _Tipo, 
            NumAcceso: _NumAccess
            })
          })
          .then((response) => response.json()
          .then((resp) => {
            console.log(resp)
            let TipoRespuesta = resp[0].TipoMensaje
            let Mensaje = resp[0].Message
            let ValidaEstatusMecanismo = resp[0].ValidarEstatus

            if(TipoRespuesta == 1)
            {
              if(ValidaEstatusMecanismo == 1)
              {
                this.ValidaMecanismoAndApertura(_Modo, _vlTelefono, _Inmueble, _Tipo, _NumAccess, resp[0].Nodo, resp[0].Rele);
              }
              else
              {
                this.AperturaOnlyMecanismo(_Modo, _vlTelefono, _Inmueble, _Tipo, _NumAccess, resp[0].Nodo, resp[0].Rele)
              }
            }
            else
            {
              this.setState({loading: false});
              Alert.alert(
                'Titanium All Access', Mensaje,
                [{ text: 'OK', onPress: () => console.log('Presionó OK'), style: 'cancel',}],
                {cancelable: false},
              );
            }
          })
        )
      
    } catch (error) {
      this.setState({loading: false});
      console.log(error);
    }      
  }

  ValidaMecanismoAndApertura = async (_Modo, _vlTelefono, _Inmueble, _Tipo, _NumAccess, _Nodo, _Rele)=>{
    try {
      let urlValidacion = `${API_URL}online?` + `nodo=` + _Nodo
      let response = await fetch(urlValidacion)
      const resp = await response.json();
      console.log(resp);

      if(resp.msg == 'ONLINE')
      {
          this.AperturaOnlyMecanismo(_Modo, _vlTelefono, _Inmueble, _Tipo, _NumAccess, _Nodo, _Rele);
      }
      else{
        this.setState({loading: false});
        Alert.alert(
          'Titanium All Access', resp.msg,
          [{ text: 'OK', onPress: () => console.log('Presionó OK'), style: 'cancel',}],
          {cancelable: false},
        );
      }
      
    } catch (error) {
      this.setState({loading: false});
      console.log(error);
    }      
  }

  AperturaOnlyMecanismo = async (_Modo, _vlTelefono, _Inmueble, _Tipo, _NumAccess, _Nodo, _Rele)=>{
    try {
        const response = await fetch(`${API_URL}open`, {
          method: 'POST', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },        
          body: JSON.stringify({
              nodo: _Nodo,
              rele: _Rele,
            })
          })
          .then((response) => response.json()
          .then((resp) => {
            console.log(resp.msg)
            if(resp.msg == 'Registro generado')
            {
              this.RegistraBitacora(_Modo, _vlTelefono, _Inmueble, _Tipo, _NumAccess);
            }
            else{
              this.setState({loading: false});
              Alert.alert(
                'Titanium All Access', resp.msg,
                [{ text: 'OK', onPress: () => console.log('Presionó OK'), style: 'cancel',}],
                {cancelable: false},
              );
            }
          })
        )
      
    } catch (error) {
      this.setState({loading: false});
      console.log(error);
    }      
  }

  RegistraBitacora = async (_Modo, _vlTelefono, _Inmueble, _Tipo, _NumAccess)=>{
    console.log('Se actualiza los valores de la BD para decir que ha ingresado')
    this.setState({loading: false});
    try {
      const response = await fetch(`${API_URL_TCN}RegistroBitacora`, {
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },        
        body: JSON.stringify({
          TipoAcceso: 2, 
          Modo: _Modo, 
          Usuario: _vlTelefono, 
          InMueble: _Inmueble, 
          Tipo: _Tipo, 
          NumAcceso: _NumAccess
          })
        })
        .then((response) => response.json()
        .then((resp) => {
          console.log(resp)
        })
      )
      
    } catch (error) {
      
    }
    Alert.alert(
      'Titanium All Access', "¡Acceso correcto!",
      [{ text: 'OK', onPress: () => this.props.navigation.navigate('Home'), style: 'cancel',}],
      {cancelable: false},
    );
  }


  render() {
    return (
      // <View>

      // </View>
      //<View style={{flexDirection:"row", paddingLeft:0, paddingRight:0, paddingTop:3, paddingBottom:3}}>
      <View style={{flex:1}}>
        <View style={{flexDirection:'row', height:120}}>
          <RadioButton.Group 
          onValueChange={newValue => this.setState({ ModoValidacion: newValue}) } 
          value={this.state.ModoValidacion}
          
          >
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <View>
                <RadioButton value="residente"/>
              </View>
              <View>
                <Text>Residente</Text>
              </View>
              <View style={{paddingLeft:10, paddingRight:10}}></View>
              <View>
              <RadioButton value="membresia"/>
              </View>
              <View>
              <Text>Membresia</Text>
              </View>
              
            </View>
          </RadioButton.Group>
        </View>
        <View style={{flexDirection:'row'}}>
        <QRCodeScanner
            onRead={this.onSuccess}
            ref={(node) => { this.SCanner = node }}
            reactivate={true}
            showMarker={true}
            reactivateTimeout={5000}
            topContent={
              <View 
              style={{
                flex: 1,
                flexDirection: 'column',
                marginHorizontal: 20,
                marginTop: 10
                }}>
              </View>
            }
          />
        </View>

        
        {/* <QRCodeScanner
        onRead={this.onSuccess}
        ref={(node) => { this.SCanner = node }}
        reactivate={true}
        showMarker={true}
        reactivateTimeout={5000}
        topContent={
          <View style={{
            flex: 1,
            flexDirection: 'column',
            marginHorizontal: 20,
            marginTop: 10
        }}>

      </View>
      }
    /> */}

      {this.state.loading && (
        <View style={styles.loadingActivity}>
        <ActivityIndicator size="large"/>
        </View>
        
      )}
       </View>
    );
  }
}

export default SCanner;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
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
