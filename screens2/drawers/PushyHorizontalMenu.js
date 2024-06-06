import React, { Component, useRef } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text, Button, Dimensions, Animated, ScrollView } from 'react-native'
import Interactable from 'react-native-interactable'
import Icon                     from 'react-native-vector-icons/FontAwesome'
import Menu                     from './../../components/Menu'
import colors                   from './../../resources/styles/colors'
// import Navigator from '../../Login/Navigator';
// import Home from '../../Home/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import NavMenu from '../NavMenu'
import DemoScreen from '../DemoScreen'
const Screen = Dimensions.get('window')
const SideMenuWidth = 300
const SideMenuHeight = 10
const RemainingWidth = Screen.width - SideMenuWidth
const RemainingHeight = Screen.height - SideMenuHeight

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();



export default class SideMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deltaX: new Animated.Value(SideMenuWidth),
            deltaY: new Animated.Value(SideMenuHeight),
            menuOpened: false
        }
        this.deltaX = new Animated.Value(0)
        this.deltaY = new Animated.Value(0)
    }
    render() {
        return (
            

            <View style={styles.container}>
                <Menu {...this.props} onMenuPress={ this.onMenuPress } />
                <Interactable.View
                    style={{ flex: 1}}
                    ref='menuInstance'
                    horizontalOnly={true}
                    snapPoints={[{x: 0, damping: 0.6}, {x: -SideMenuWidth, damping: 0.6}]}
                    boundaries={{left: -SideMenuWidth}}
                    initialPosition={{x: 0}}
                    //animatedValueX={this.deltaX}
                    animatedValueX={this.deltaX}
                    animatedValueY={this.deltaY}
                    onSnap={ this.onStopInteraction.bind(this) }
                >
                    <NavMenu style={ styles.demoScreen } navigation={this.props.navigation} onMenuPress={ this.onMenuPress } />
                    {/* <DemoScreen style={ styles.demoScreen } navigation={this.props.navigation} onMenuPress={ this.onMenuPress } /> */}
                </Interactable.View>
            </View>
        )
    }

    onStopInteraction(event, check) {
        let menuOpened = true
        if(event.nativeEvent.index == 0) {
            menuOpened = false
        }
        this.setState((preState, props) => {
            return { menuOpened }
        })
    }

    onMenuPress = () => {
        const menuOpened = !this.state.menuOpened
        if(menuOpened) {
            this.refs['menuInstance'].snapTo({index: 1})
        } else {
            this.refs['menuInstance'].snapTo({index: 0})
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: colors.bgMain,
    },
    demoScreen: {
        backgroundColor: colors.bgMainRed
    },

    header: {
        height: 60,
        paddingLeft: 20,
        flexDirection: 'row',
        backgroundColor: 'red',
        alignItems: 'center',
        zIndex: 1001
    },
    body: {
        flex: 1,
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000'
    },
    menuIcon: {
        width: 30,
        height: 30
    },
    headerTitle: {
        marginLeft: 30,
        color: 'white',
        fontSize: 20
    },
    content: {
        fontSize: 18
    }
})