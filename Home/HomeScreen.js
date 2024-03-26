import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import Corporativo from '../Screens/VCorporativo';
import SimplyBook from '../Screens/VSimplyBook';
import { IconButton } from 'react-native-paper';

import SCanner from '../Screens/SCanner'


import CustomSidebarMenu from '../Componentes/CustomSidebarMenu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native';
import ChangePassword from '../Login/ChangePassword';
import NavigateCitas from '../Screens/Citas/NavigateCitas'
import ListaCitas from '../Screens/Citas/ListaCitasGeneradas'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

class HomeScreen extends Component {

componentDidMount()
{
  console.log('entro en home screen')
}

  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    // console.disableYellowBox = true; 
    return (
      <View style={{flexDirection:'row'}}>
        <View >
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            <IconButton icon="menu" color="#ED9A0C" size={28}/>
          </TouchableOpacity>
        </View>
        <View style = {{width:50}}>
        </View>
      </View>
    );
  }
}



const Home_StackNavigator = ({ navigation }) =>
{
  return (
        <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} 
                options ={{
                   title:'Titanium CN', headerTitleStyle: {fontSize:17}, 
                    headerLeft: () => (<HomeScreen navigationProps={navigation}/>),
                    headerRight: () => (<IconButton icon="power" size={28}  
                    onPress={()=>{ 
                      AsyncStorage.removeItem('@IDUser')    
                      AsyncStorage.removeItem('@NombreUser')
                      AsyncStorage.removeItem('@CorreoUser') 
                      AsyncStorage.removeItem('@TelefonoUser')                       
                      AsyncStorage.removeItem('@PDUser')
                      AsyncStorage.removeItem('@TypUser')  
                      navigation.dispatch(StackActions.replace('Login')); 
                  } }
                  color="#ED9A0C"
                    />),
                  }}
                />
                <Stack.Screen name="Home2" component={Home} options={{header: () => null}} />
        </Stack.Navigator>
  );
}

const Page2_StackNavigator = ({ navigation }) =>
{
  return (
    <Stack.Navigator>
            <Stack.Screen name="Citas" component={NavigateCitas} options={{header: () => null}} />             
    </Stack.Navigator>
);
}

const Page3_StackNavigator = ({ navigation }) =>
{
  return (
    <Stack.Navigator>
            <Stack.Screen name="Acceso" component={SCanner}  
            options ={{
              title:'Titanium CN', headerTitleStyle: {fontSize:17}, 
               headerLeft: () => (<HomeScreen navigationProps={navigation}/>),
               headerRight: () => (<IconButton icon="power" size={28}  
               onPress={()=>{ 
                AsyncStorage.removeItem('@IDUser')     
                AsyncStorage.removeItem('@NombreUser')
                AsyncStorage.removeItem('@CorreoUser') 
                AsyncStorage.removeItem('@TelefonoUser')  
                AsyncStorage.removeItem('@PDUser')   
                AsyncStorage.removeItem('@TypUser')                    
                navigation.dispatch(StackActions.replace('Login')); 
                }}
                color="#ED9A0C"
               />),
             }}
            // options ={{
            //        title:'Articulos', headerTitleStyle: {fontSize:17}, 
            //         headerLeft: () => (<HomeScreen navigationProps={navigation}/>),
            //         headerRight: () => (<IconButton icon="power" size={28}  onPress={()=>{auth().signOut()} }/>),
            //       }}
                />
    </Stack.Navigator>
);
}

const Page4_StackNavigator = ({ navigation }) =>
{
  return (
    <Stack.Navigator>
            <Stack.Screen name="Corporativo" component={Corporativo}  
            options ={{
              title:'Titanium CN', headerTitleStyle: {fontSize:17}, 
               headerLeft: () => (<HomeScreen navigationProps={navigation}/>),
               headerRight: () => (<IconButton icon="power" size={28}  
               onPress={()=>{ 
                AsyncStorage.removeItem('@IDUser') 
                AsyncStorage.removeItem('@NombreUser')
                AsyncStorage.removeItem('@CorreoUser') 
                AsyncStorage.removeItem('@TelefonoUser') 
                AsyncStorage.removeItem('@PDUser')       
                AsyncStorage.removeItem('@TypUser')                 
                navigation.dispatch(StackActions.replace('Login')); 
                }}
                color="#ED9A0C"
               />),
             }}
            // options ={{
            //        title:'Articulos', headerTitleStyle: {fontSize:17}, 
            //         headerLeft: () => (<HomeScreen navigationProps={navigation}/>),
            //         headerRight: () => (<IconButton icon="power" size={28}  onPress={()=>{auth().signOut()} }/>),
            //       }}
                />
    </Stack.Navigator>
);
}

const Page5_StackNavigator = ({ navigation }) =>
{
  return (
    <Stack.Navigator>
            <Stack.Screen name="SimplyBook" component={SimplyBook}  
            options ={{
              title:'Titanium CN', headerTitleStyle: {fontSize:17}, 
               headerLeft: () => (<HomeScreen navigationProps={navigation}/>),
               headerRight: () => (<IconButton icon="power" size={28}  
               onPress={()=>{ 
                AsyncStorage.removeItem('@IDUser')    
                AsyncStorage.removeItem('@NombreUser')
                AsyncStorage.removeItem('@CorreoUser') 
                AsyncStorage.removeItem('@TelefonoUser')  
                AsyncStorage.removeItem('@PDUser')   
                AsyncStorage.removeItem('@TypUser')                    
                navigation.dispatch(StackActions.replace('Login')); 
                }}
                color="#ED9A0C"
               />),
             }}

                />
    </Stack.Navigator>
);
}

const Page6_StackNavigator = ({ navigation }) =>
{
  return (
    <Stack.Navigator>
            <Stack.Screen name="ChangePassword" component={ChangePassword}  
            options ={{
              title:'Titanium CN', headerTitleStyle: {fontSize:17}, 
               headerLeft: () => (<HomeScreen navigationProps={navigation}/>),
               headerRight: () => (<IconButton icon="power" size={28}  
               onPress={()=>{ 
                AsyncStorage.removeItem('@IDUser')  
                AsyncStorage.removeItem('@NombreUser')
                AsyncStorage.removeItem('@CorreoUser') 
                AsyncStorage.removeItem('@TelefonoUser') 
                AsyncStorage.removeItem('@PDUser')    
                AsyncStorage.removeItem('@TypUser')                    
                navigation.dispatch(StackActions.replace('Login')); 
                }}
                color="#ED9A0C"
               />),
             }}

                />
    </Stack.Navigator>
);
}

const Page7_StackNavigator = ({ navigation }) =>
{
  return (
    <Stack.Navigator>
            <Stack.Screen name="ListaCitas" component={ListaCitas}  
            options ={{
              title:'Historico de citas', headerTitleStyle: {fontSize:17}, 
               headerLeft: () => (<HomeScreen navigationProps={navigation}/>),
               headerRight: () => (<IconButton icon="power" size={28}  
               onPress={()=>{ 
                AsyncStorage.removeItem('@IDUser')  
                AsyncStorage.removeItem('@NombreUser')
                AsyncStorage.removeItem('@CorreoUser') 
                AsyncStorage.removeItem('@TelefonoUser') 
                AsyncStorage.removeItem('@PDUser')    
                AsyncStorage.removeItem('@TypUser')                    
                navigation.dispatch(StackActions.replace('Login')); 
                }}
                color="#ED9A0C"
               />),
             }}

                />
    </Stack.Navigator>
);
}



const DrawerNavigator = () =>
{
  return (
    
    <Drawer.Navigator
    screenOptions ={{ activeTintColor: '#e91e63', itemStyle: {marginVertical: 5}  }}
    
    drawerContent={(props) => <CustomSidebarMenu {...props} />}

    //initialRouteName = {(props) => props.route[0]._NameMenuActivo}
    >
        <Drawer.Screen name="Screen1" component={Home_StackNavigator} options={{ header: () => null}} />
        <Drawer.Screen name="Screen2" component={Page2_StackNavigator} options={{ header: () => null}} />
        <Drawer.Screen name="Screen3" component={Page3_StackNavigator} options={{ header: () => null}} />
        <Drawer.Screen name="Screen4" component={Page4_StackNavigator} options={{ header: () => null}} />
        <Drawer.Screen name="Screen5" component={Page5_StackNavigator} options={{ header: () => null}} />
        <Drawer.Screen name="Screen6" component={Page6_StackNavigator} options={{ header: () => null}} />
        <Drawer.Screen name="Screen7" component={Page7_StackNavigator} options={{ header: () => null}} />

    </Drawer.Navigator>
  
  );
}
export default (DrawerNavigator)

