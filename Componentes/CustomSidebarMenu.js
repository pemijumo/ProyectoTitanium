import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { connect } from 'react-redux'
//import {SafeAreaView} from 'react-navigation'
import { API_URL_GRAL } from '../Constantes/constants';

let _NomUsuario = ''
let _Mail = ''
let _Tel = ''
let _Menu = []
let _CodeMenuActivo = 0
let _NameMenuActivo = ''
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
  }

  async componentDidMount()
  {
    global.currentScreenIndex = 0;
    await this.ObtenerDatos();
    _Menu = await this.ObtenerMenuRol();
    await this.RedireccionaMenu();
    //console.log(_Menu)
    //this.props.navigation.navigate(_Menu[0].MenuActivo);
    //console.log(this.props)
  }

  ObtenerDatos = async ()=>{
    _NomUsuario = await AsyncStorage.getItem('@NombreUser')
    _Mail = await AsyncStorage.getItem('@CorreoUser')
    _Tel = await AsyncStorage.getItem('@TelefonoUser')
  }

  ObtenerMenuRol= async ()=>{
    let menuList = [];
    let url_ = `${API_URL_GRAL}ConsultaModulos?`
      + 'Usuario=' + _Mail
      + '&PhoneNumber=' + _Tel      

      fetch(url_)
      .then(res => res.json())
      .then(res => {
          menu = res;
          //console.log(menu)
          try {
            if(menu.length>0){
              for(let i = 0; i < menu.length; i++){
                let valorobj = { Code: menu[i].Code, navOptionThumb: menu[i].Icono, navOptionName: menu[i].Nombre, screenToNavigate: menu[i].Pantalla, MenuActivo: menu[i].NameActivo }
                //console.log(menu[i])
                _CodeMenuActivo = menu[i].CodeActivo;
                _NameMenuActivo = menu[i].NameActivo;

                //console.log(_NameMenuActivo)
                menuList.push(valorobj)
                //console.log(menuList)
              }  
              if(_NameMenuActivo!=''){
                this.props.navigation.navigate(_NameMenuActivo);
              }
            }
            else
            {

            }
          } catch (error) {
            return []
          }
        })
        //console.log(menuList)
       return menuList;  
  }

  componentDidUpdate()
  {

  }
  ConsultarImgUser = () =>{
    
  }

  
  

  render() {
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
        
        
        {_Menu.map((item, key) => (
              <TouchableOpacity
                key={key}
                onPress={()=> {
                  _CodeMenuActivo = item.Code
                  //this.setState({FilaActiva: item.Code/*key*/})
                  this.props.navigation.navigate(item.screenToNavigate);
                }
                }
                style={{ height: 40, marginTop: 3 
                ,backgroundColor: _CodeMenuActivo == item.Code ? '#e0dbdb' : '#ffffff'
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
                    color: _CodeMenuActivo == item.Code ? 'red' : 'black',
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