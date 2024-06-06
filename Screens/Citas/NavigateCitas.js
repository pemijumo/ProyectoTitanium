import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IconButton } from 'react-native-paper';
import CitasParte1 from './CitaParte1';
// import CitasParte2 from './CitaParte2';
// import ViewScoreCard from './ViewScoreCard'
// import ViewDetailLH from './ViewDetailLH'
import { StackActions } from '@react-navigation/native';
import DemoScreen from '../../screens2/DemoScreen'

const Stack = createNativeStackNavigator();

class NavigateCitas extends Component {
  // toggleDrawer = () => {
  //   this.props.navigationProps.toggleDrawer();
  // };
  render() {
    return (
      <View style={{flexDirection:'row'}}>
        {/* <View>
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <IconButton icon="menu" color="#ED9A0C" size={28}/>
          </TouchableOpacity>
        </View>
        <View style = {{width:40}}>
          
        </View> */}
        
      </View>
    );
  }
}

const AppNavigatorCitas = ({ props }) =>
{
  return (
        <Stack.Navigator>
                <Stack.Screen name="CitasP1" component={CitasParte1} 
                options={{ header: () => null }}
                ///options ={{
                //  title:'Registro de cita', headerTitleStyle: {fontSize:20, color:'#ED9A0C'}, 
                  //headerLeft: () => null
                    //(<DemoScreen {...props}/>),
                  //  headerLeft: () => (<NavigateCitas navigationProps={navigation}/>),
                  //  headerRight: () => (<IconButton icon="power" size={28}  
                  //   onPress={()=>{ 
                  //     AsyncStorage.removeItem('@NombreUser')
                  //     AsyncStorage.removeItem('@CorreoUser') 
                  //     AsyncStorage.removeItem('@TelefonoUser')                       
                  //     AsyncStorage.removeItem('@PDUser')
                  //     navigation.dispatch(StackActions.replace('Login')); 
                   //} }
                  
                />
                <Stack.Screen name="CitasP2" component={CitasParte1} 
                options ={{
                  title:'Registro de cita', headerTitleStyle: {fontSize:20, color:'#ED9A0C'}, 
                  headerStyle: {
                    backgroundColor: 'white',
                    color: '#ED9A0C'
                  },
                  headerTintColor: '#ED9A0C',
                  headerTitleColor: {
                    color: '#ED9A0C'
                  },
                }}
                />
                
        </Stack.Navigator>
  );
}
  export default AppNavigatorCitas