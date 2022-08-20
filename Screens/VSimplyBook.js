import React, {Component} from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';

class VSimplyBook extends Component{
    render(){
        return(
            <WebView
            source={{
                uri: 'https://nivel17.simplybook.me/v2/'
              }}
              style={{ marginTop: 20 }}
            >

            </WebView>
        )
    }
}

export default VSimplyBook