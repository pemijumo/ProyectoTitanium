import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default class AvisoPrivacidad extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){

    }

    render() {
        return(
            <View>
                <WebView
                source={{
                    uri: 'https://www.titaniumcn.com.mx/aviso-de-privacidad/'
                }}
                style={{ marginTop: 20 }}
                >

                </WebView>
            </View>
        )
    }
}