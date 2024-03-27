import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen  from './LoginScreen';
import AuthLoading  from './AuthLoading';
//import Home  from '../Home/Home'
import HomeScreen from '../Home/HomeScreen'
import vAvisoPrivacidad from './AvisoPrivacidad'
import vListaCitas from  '../Screens/Citas/ListaCitasGeneradas'

const Stack = createNativeStackNavigator();

function Navigator()
{
    return(
        // <NavigationContainer>
            <Stack.Navigator initialRouteName="AuthLoading" 
             screenOptions={{headerShown: false, }} 
             //screenOptions={{ headerMode: 'none' }} 
             options={{header: () => null}}
                    >
                <Stack.Screen name="Login" component={LoginScreen} 
                 options={{header: () => null}}
                />
                <Stack.Screen name="App" component={HomeScreen} 
                 options={{header: () => null}} 
                />
                <Stack.Screen name="AuthLoading" component={AuthLoading}
                 options={{header: () => null}}
                />
                <Stack.Screen name="vAvisoPrivacidad" component={vAvisoPrivacidad}
                 options={{header: () => null}}
                />
            </Stack.Navigator>
        // </NavigationContainer>
    )

}

export default Navigator;