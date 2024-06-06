import React, {Component} from 'react'
import { View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DemoScreen from './DemoScreen'
import DemoScreen2 from './DemoScreen2'
import Home from '../Home/Home'
import NavigateCitas from '../Screens/Citas/NavigateCitas'
import SCanner from '../Screens/SCanner'
import Corporativo from '../Screens/VCorporativo'
import SimplyBook from '../Screens/VSimplyBook'
import ChangePassword from '../Login/ChangePassword'
import ListaCitas from '../Screens/Citas/ListaCitasGeneradas'
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native';
import colors from '../resources/styles/colors';
import MenuCode from '../components/Menu'

const Stack = createNativeStackNavigator();


const Home_StackNavigator = ({ props}) =>
    {
      return (
            <Stack.Navigator
            >
              <Stack.Screen name="Home"
               options ={{
                title:'Titanium CN', headerTitleStyle: {fontSize:17, color:'white' },
                headerStyle: { backgroundColor: colors.bdMain },
                headerTitleAlign: 'center',
                headerLeft: () => (<View></View>),
                headerRight: () => (<DemoScreen {...props}/>),
               }}
              >{(screenProps) => <Home {...props} 
              
              />}</Stack.Screen>
              <Stack.Screen name="Home2" 
              options={{ header: () => null 

              }}>{(screenProps) => <Home {...props} />}</Stack.Screen>
            </Stack.Navigator>
      );
    }

    const Page2_StackNavigator = ({ props }) =>
      {
        return (
          <Stack.Navigator>
            <Stack.Screen name="Citas" 
            options ={{
              title:'Registro de cita', headerTitleStyle: {fontSize:17, color:'white' },
              headerStyle: { backgroundColor: colors.bdMain },
              headerTitleAlign: 'center',
              headerTintColor: 'white'
              // headerLeft: () => (<View></View>),
              // headerRight: () => (<DemoScreen {...props}/>),
             }}
            >{(screenProps) => <NavigateCitas props={props} />}</Stack.Screen>
          </Stack.Navigator>
      );
      }
      
      const Page3_StackNavigator = ({ props }) =>
      {
        return (
          <Stack.Navigator>
                  <Stack.Screen name="Acceso" component={SCanner}  
                  options ={{
                    title:'Lector de acceso', headerTitleStyle: {fontSize:17, color:'white' },
                    headerStyle: { backgroundColor: colors.bdMain },
                    headerTitleAlign: 'center',
                    headerTintColor: 'white' ,
                  //   headerLeft: () => (
                  //     <Button
                  //         onPress={() => {
                  //             actualizarCodigoMenuActivo(1); // Actualiza _CodeMenuActivo aquí
                  //             props.navigation.goBack();
                  //         }}
                  //         title="Back"
                  //         color="white"
                  //     />
                  // )
                   }}

                      />
          </Stack.Navigator>
      );
      }
      
      const Page4_StackNavigator = ({ props }) =>
      {
        return (
          <Stack.Navigator>
                  <Stack.Screen name="Corporativo" component={Corporativo}  
                  options ={{
                    title:'Corporativo', headerTitleStyle: {fontSize:17, color:'white' },
                    headerStyle: { backgroundColor: colors.bdMain },
                    headerTitleAlign: 'center',
                    headerTintColor: 'white'
                   }}

                      />
          </Stack.Navigator>
      );
      }
      
      const Page5_StackNavigator = ({ props }) =>
      {
        return (
          <Stack.Navigator>
                  <Stack.Screen name="SimplyBook" component={SimplyBook}  
                  options ={{
                    title:'Reserva tu espacio', headerTitleStyle: {fontSize:17, color:'white' },
                    headerStyle: { backgroundColor: colors.bdMain },
                    headerTitleAlign: 'center',
                    headerTintColor: 'white'
                   }}
      
                      />
          </Stack.Navigator>
      );
      }
      
      const Page6_StackNavigator = ({ props }) =>
      {
        return (
          <Stack.Navigator>
                  <Stack.Screen name="ChangePassword" component={ChangePassword}  
                  options ={{
                    title:'Cambio de contraseña', headerTitleStyle: {fontSize:17, color:'white' },
                    headerStyle: { backgroundColor: colors.bdMain },
                    headerTitleAlign: 'center',
                    headerTintColor: 'white'
                   }}
      
                      />
          </Stack.Navigator>
      );
      }
      
      const Page7_StackNavigator = ({ props }) =>
      {
        return (
          <Stack.Navigator>
                  <Stack.Screen name="ListaCitas" component={ListaCitas}  
                  options ={{
                    title:'Historico de citas', headerTitleStyle: {fontSize:17, color:'white' },
                    headerStyle: { backgroundColor: colors.bdMain },
                    headerTitleAlign: 'center',
                    headerTintColor: 'white' 
                   }}
      
                      />
          </Stack.Navigator>
      );
      }
    
class NavMenu extends Component
{
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }

    actualizarCodigoMenuActivo = (nuevoCodigo) => {
      this.menuCodeRef?.actualizarCodigoMenuActivo(nuevoCodigo);
  };

    render(){
        return(
    
          // <MenuCode
          // ref={ref => (this.menuCodeRef = ref)}
          // actualizarCodigoMenuActivo={this.actualizarCodigoMenuActivo}
          
          // >
                <Stack.Navigator initialRouteName="Screen1" 
                screenOptions={{
                  headerShown: false
                }}
                
                >
                          <Stack.Screen name="Screen1">{(props) => <Home_StackNavigator props={this.props} />}</Stack.Screen>
                          <Stack.Screen name="Screen2">{(props) => <Page2_StackNavigator props={this.props}/>}</Stack.Screen>
                          <Stack.Screen name="Screen3">{(props) => <Page3_StackNavigator props={this.props}/>}</Stack.Screen>
                          <Stack.Screen name="Screen4">{(props) => <Page4_StackNavigator props={this.props}/>}</Stack.Screen>
                          <Stack.Screen name="Screen5">{(props) => <Page5_StackNavigator props={this.props}/>}</Stack.Screen>
                          <Stack.Screen name="Screen6">{(props) => <Page6_StackNavigator props={this.props}/>}</Stack.Screen>
                          <Stack.Screen name="Screen7">{(props) => <Page7_StackNavigator props={this.props}/>}</Stack.Screen>
                </Stack.Navigator>
          // </MenuCode>
        )
}

}

export default NavMenu


{/* <Stack.Screen name="Screen1" component={(props) => <Home_StackNavigator {...this.props} />}/>
                    <Stack.Screen name="Screen2" component={(props) => <NavigateCitas {...this.props} />} />
                    <Stack.Screen name="Screen3" component={(props) => <SCanner {...this.props} />} />
                    <Stack.Screen name="Screen4" component={(props) => <Corporativo {...this.props} />}/> 
                    <Stack.Screen name="Screen5" component={(props) => <SimplyBook {...this.props} />} />
                    <Stack.Screen name="Screen6" component={(props) => <ChangePassword {...this.props} />} />
                    <Stack.Screen name="Screen7" component={(props) => <ListaCitas {...this.props} />} /> */}