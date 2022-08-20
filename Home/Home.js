import React, {Component} from 'react'
import { View, Text, Image, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Home extends Component{
    render(){
        return(
            <View style={{color:'black'}}>
                <View style={{alignSelf:'center', alignContent:'center', alignItems:'center'}}>
                    <Image 
                        source={require('../Imagenes/ImgInicioTitanium.jpg')} 
                        style={{ width: windowWidth, height: windowHeight-200, resizeMode:'stretch'}}
                        />
                </View>
            </View>
        )
    }
}

export default Home