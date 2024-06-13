'use strict'
import React, { Component } from 'react'
import {
    StyleSheet, View, TouchableOpacity
} from 'react-native'

import Container                            from './../components/Container'
import Text                                 from './../components/form/Text'
import Button                               from './../components/form/Button'
import colors                               from './../resources/styles/colors'
import FAIcon                               from 'react-native-vector-icons/FontAwesome'
import FAIcon2                               from 'react-native-vector-icons/FontAwesome5'


class DemoScreen extends Component {
    render() {
        return (
            <View>
            {/* <Container style={[ styles.container, this.props.style || {} ]}> */}
                { this.renderNavBar() }
                {/* { this.renderHeader() } */}
             {/* </Container> */}
            </View>
        )
    }
    renderNavBar() {
        return (
             <View style={ styles.navBar }>
                <TouchableOpacity onPress={()=>{
                        this.props.onMenuPress()
                    } 
                }
                    >
                    <FAIcon2 name='server' size={24} style={{ color: colors.colorTCN }} />
                </TouchableOpacity>
            </View>
        )
    }

    renderHeader() {
        return (
            <View style={ styles.headerHolder }>
                <FAIcon name='bomb' size={100} style={ styles.logo } />
                <Text type='h1White' style={ styles.siteName }>Welcome to Animation World</Text>
                <Button
                    onPress={ this.onPressBack }
                    titleStyle={ styles.btnHeaderTitleStyle }
                    style={ styles.btnHeader }
                    title='Go Back' />
            </View>
        )
    }
}

export default DemoScreen

const styText = { color: colors.txtWhite }
const styles = StyleSheet.create({
    container: {
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowOffset: { height: -5, width:-5},
        shadowRadius: 10,
        backgroundColor: colors.bgMain,
    },
    navBar: {
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 25
    },
    headerHolder: {
        padding: 25,
        flex: 1
    },
    logo: {
        ...styText,
        marginTop: 10
    },
    siteName: {
        marginTop: 30,
        width: 250
    },
    btnHeader: {
        width: 160,
        height: 40,
        marginVertical: 70,
        borderWidth: 2,
        borderColor: colors.bdWhite,
        backgroundColor: 'transparent'
    },
    btnHeaderTitleStyle: {
        fontSize: 14,
        fontWeight: '700'
    }
})

// module.exports = DemoScreen