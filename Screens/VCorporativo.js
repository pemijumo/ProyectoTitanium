import React, {Component} from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';

class VCorporativo extends Component{
    render(){
        
        console.log('https://www.titaniumcn.com.mx/');

        return(
            <WebView
            source={{
                uri: 'https://www.titaniumcn.com.mx/'
              }}
              style={{ marginTop: 20 }}
            >

            </WebView>
        )
    }
}

export default VCorporativo