import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Image, Text, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { connect } from 'react-redux'
//import {SafeAreaView} from 'react-navigation'
import { API_URL } from '../Constantes/constants';
import DrawerNavigator from '../Home/HomeScreen';

let _NomUsuario = ''
class CustomSidebarMenu extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
      ,FilaActiva:0
      ,FotoUser: ''
      ,NombreUser: ''
    }

    this.proileImage =
      'https://aboutreact.com/wp-content/uploads/2018/07/sample_img.png';
    this.items = this.RevisionRol();

  }

  RevisionRol () 
  {
    let menu = []
    let menuList = [];
    let valorobj = { navOptionThumb: "home", navOptionName: "Inicio", screenToNavigate: "Screen1" }
    menuList.push(valorobj)
    let valorobj1 = { navOptionThumb: "book-clock", navOptionName: "Invitaciones / citas", screenToNavigate: "Screen2" }
    menuList.push(valorobj1)
    let valorobj2 = { navOptionThumb: "qrcode-scan", navOptionName: "Lector QR", screenToNavigate: "Screen3" }
    menuList.push(valorobj2)
    let valorobj3 = { navOptionThumb: "web", navOptionName: "Sitio corporativo", screenToNavigate: "Screen4" }
    menuList.push(valorobj3)
    let valorobj4 = { navOptionThumb: "semantic-web", navOptionName: "Reserva tu espacio", screenToNavigate: "Screen5" }
    menuList.push(valorobj4)
    let valorobj5 = { navOptionThumb: "account-cog", navOptionName: "Cambiar contraseña", screenToNavigate: "Screen6" }
    menuList.push(valorobj5)

    
    console.log(_NomUsuario)
    // let url_ = `${API_URL}ConsultaModulos?Opcion=1`
    //   + '&UserId=' + this.props.user.Id_Usuario
    //   + '&RolUser=' + this.props.user.Rol      
    //   fetch(url_)
    //   .then(res => res.json())
    //   .then(res => {
    //       menu = res;
    //       try {
    //         for(let i = 0; i < menu.length; i++){
    //           let valorobj = { navOptionThumb: menu[i].Icono, navOptionName: menu[i].Nombre, screenToNavigate: menu[i].Pantalla }
    //           menuList.push(valorobj)
    //         }  
    //       } catch (error) {
    //         return []
    //       }
    //     })
       return menuList;  
  }
  componentDidMount()
  {
    global.currentScreenIndex = 0;
    //this.ConsultarImgUser()
    //console.log(this.props)
    this.ObtenerNombre();
  }

  ObtenerNombre = async ()=>{
    _NomUsuario = await AsyncStorage.getItem('@NombreUser')
  }
  componentDidUpdate()
  {

  }
  ConsultarImgUser = () =>{
    
}

  render() {
    //let NombreUser = AsyncStorage.getItem('@NombreUser')
    return (
        <SafeAreaView>
        <View style={{flexDirection:'row'}}>
        {/* <ImageBackground source={require('../Imagenes/HNTBackRound.jpg')} style={styles.sideMenuProfileBackRound}>
       
        
        </ImageBackground> */}
         <View style={{flex:1}}>
            <Image 
                  source={require('../Imagenes/ImgUsuario.png')} 
                  style={styles.sideMenuProfileIcon}
                />
            
            
            <View style={{alignSelf:'center'}}>
                <Text style={{fontWeight:'bold', color:'black'}}>{_NomUsuario}</Text>
            </View>
          </View>
        </View>
        
        
        {this.items.map((item, key) => (
              <TouchableOpacity
                key={key}
                onPress={()=> {
                  this.setState({FilaActiva:key})
                  this.props.navigation.navigate(item.screenToNavigate);
                }
                }
                style={{ height: 40, marginTop: 3 
                ,backgroundColor: this.state.FilaActiva == key ? '#e0dbdb' : '#ffffff'
                 ,alignItems:'flex-start'
                 , paddingLeft: 15
                 , paddingTop: 10
                 , color: 'black'
                }}
              >
                <View style={{flexDirection:'row'}}>
                <IconButton icon={item.navOptionThumb} style={{margin:-7, paddingRight:5}} size={25} color="black"/>
                <Text
                  style={{
                    fontSize: 15,
                    color: this.state.FilaActiva == key ? 'red' : 'black',
                    paddingLeft:10
                  }}
                  >
                  {item.navOptionName}
                </Text>
                </View>
              </TouchableOpacity>
           ))
        }  
        </SafeAreaView>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     user: state.user
//   }
// };


export default CustomSidebarMenu;
//connect(mapStateToProps)(CustomSidebarMenu)

const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  sideMenuProfileIcon: {
   resizeMode: 'center',
     width: 125,
     height: 125,
     alignSelf:'center'
  
    // borderRadius: 400
  },
  sideMenuProfileBackRound: {
     width: '100%',
     height: 160
   },
   container:{
     flex:11,
     backgroundColor:'#ecf0f1',
     justifyContent:'space-between',
     paddingBottom:'10'

   },
   btn: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderColor: '#dc00ff',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
  btnActive: {
    alignItems: 'center',
    backgroundColor: '#dc00ff',
    borderColor: '#dc00ff',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  }
});