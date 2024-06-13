import React, { Component } from 'react'
import {StyleSheet, TouchableOpacity, View, Image, ImageBackground, SafeAreaView, ScrollView, FlatList} from 'react-native'
import { IconButton, Menu } from 'react-native-paper';
import Text from './form/Text'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Entypo'
import colors from './../resources/styles/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL_GRAL } from '../Constantes/constants';
import { StackActions } from '@react-navigation/native';

let SideMenuWidth = 300;
let _NomUsuario = '';
let _Mail = '';
let _Tel = '';
let _Menu = [];
let _CodeMenuActivo = 0;
let _NameMenuActivo = '';

class MenuCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            FilaActiva: 0,
            FotoUser: '',
            NombreUser: '',
            menuList: []
        };
        this.proileImage = 'https://aboutreact.com/wp-content/uploads/2018/07/sample_img.png';
    }

    async componentDidMount() {
        global.currentScreenIndex = 0;
        await this.ObtenerDatos();
        const menuList = await this.ObtenerMenuRol();
        this.setState({ menuList });
        await this.RedireccionaMenu();
    }

    ObtenerDatos = async () => {
        _NomUsuario = await AsyncStorage.getItem('@NombreUser');
        _Mail = await AsyncStorage.getItem('@CorreoUser');
        _Tel = await AsyncStorage.getItem('@TelefonoUser');
    };

    ObtenerMenuRol = async () => {
        let menuList = [];
        let url_ = `${API_URL_GRAL}ConsultaModulos?Usuario=${_Mail}&PhoneNumber=${_Tel}`;

        try {
            const response = await fetch(url_);
            const menu = await response.json();
            if (menu.length > 0) {
                for (let i = 0; i < menu.length; i++) {
                    let valorobj = {
                        Code: menu[i].Code,
                        navOptionThumb: menu[i].Icono2,
                        navOptionName: menu[i].Nombre,
                        screenToNavigate: menu[i].Pantalla,
                        MenuActivo: menu[i].NameActivo
                    };
                    _CodeMenuActivo = menu[i].CodeActivo;
                    _NameMenuActivo = menu[i].NameActivo;
                    menuList.push(valorobj);
                }

                let valorobj = {
                    Code: 99,
                    navOptionThumb: 'log-out',
                    navOptionName: 'Salir',
                    screenToNavigate: 'Login',
                    MenuActivo: ''
                };
                menuList.push(valorobj);

                if (_NameMenuActivo != '') {
                   
                    this.props.navigation.navigate(_NameMenuActivo);
                }
            }
        } catch (error) {
            console.error(error);
        }

        return menuList;
    };

    renderMenuItem = ({ item }) => {
        return (
            <View>
                <TouchableOpacity
                    style={[
                        styles.menu,
                        { backgroundColor: _CodeMenuActivo == item.Code ? '#f4cc37' : colors.txtMain }
                    ]}
                    onPress={() => {
                        _CodeMenuActivo = item.Code;
                        if(item.Code!=99)
                        {
                            this.props.onMenuPress();
                            this.props.navigation.navigate(item.screenToNavigate);
                        }
                        else
                        {
                            AsyncStorage.removeItem('@IDUser')  
                            AsyncStorage.removeItem('@NombreUser')
                            AsyncStorage.removeItem('@CorreoUser') 
                            AsyncStorage.removeItem('@TelefonoUser') 
                            AsyncStorage.removeItem('@PDUser')    
                            AsyncStorage.removeItem('@TypUser')                    
                            this.props.navigation.dispatch(StackActions.replace('Login'));

                        }
                            
                    }}
                >
                    <View style={{ flexDirection: 'row', backgroundColor: 'Yellow' }}>
                        <View style={{ flex: 3, alignContent:'flex-end', alignItems:'flex-end', paddingLeft:50 }}>
                            { item.Code==99 ?
                                <Icon2 name={item.navOptionThumb} color={colors.txtWhite} size={24} />
                                :
                                <Icon name={item.navOptionThumb} color={colors.txtWhite} size={24} />
                            }                          
                            
                        </View>
                        <View style={{ flex: 9, paddingLeft:10 }}>
                            <Text 
                            style={{ color: _CodeMenuActivo == item.Code ? 'red' : 'white' }} 
                            type="h5White">
                                {item.navOptionName}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    _renderHeader() {
        return (
            <View style={styles.header}>
                <View style={styles.userInfosHolder}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: 'https://scontent-frt3-1.cdninstagram.com/t51.2885-15/s640x640/e15/15623603_1636005733360687_308770619158167552_n.jpg'
                        }}
                    />
                    <View style={styles.userInfos}>
                        <Text type="h1White" style={styles.username}>
                            {_NomUsuario}
                        </Text>
                        <Text type="h5White">¡Bienvenido!</Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        const { menuList } = this.state;

        return (
                
                    <View style={[styles.sideMenu, this.props.style || {}]}>
                        
                        <View style={{ paddingHorizontal: 30 }}>
                            <ScrollView>
                            {this._renderHeader()}
                            
                            <FlatList
                                data={menuList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={this.renderMenuItem}
                                contentContainerStyle={styles.flatListContent}
                            />
                            </ScrollView>
                        </View>
                        
                    </View>
                
        );
    }
}

export default MenuCode;

const styles = StyleSheet.create({
    
    sideMenu: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        //width: SideMenuWidth,
        backgroundColor: 'transparent'
    },
    sideMenuTitle: {
        marginLeft: 20,
        marginBottom: 30
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    menuText: {
        marginLeft: 20
    },
    header: {
        marginTop: 20,
        marginBottom: 20
    },
    userInfosHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    userInfos: {
        height: 100,
        justifyContent: 'center'
    },
    username: {
        fontWeight: '100'
    }
})

