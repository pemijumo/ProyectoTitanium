import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/Entypo'
import colors from '../resources/styles/colors'
class UserInput extends Component {
  constructor(props) {
    super(props);
  }

  render(){
  return(
        <View style={styles.inputWrapper}>
        {/* <Image source={this.props.source} style={styles.inlineImg} /> */}
        {/* <Icon2 name={this.props.source} color={"white"} size={25} style={styles.inlineImg} /> */}
            <TextInput
                style={[styles.input, {height:this.props.heightInput }]}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder={this.props.placeholder}
                placeholderTextColor='gray'
                textContentType='emailAddress'
                secureTextEntry={this.props.secureTextEntry}
                autoCorrect={this.props.autoCorrect}
                autoCapitalize={this.props.autoCapitalize}
                returnKeyType={this.props.returnKeyType}
                onChangeText={tx => this.props.placeholder == "Usuario" ? this.props.setEmail(tx) : this.props.setPassword(tx) }
                //placeholderTextColor="white"
                //underlineColorAndroid="transparent"
                theme={{ colors: { 
                placeholder: 'black', text: 'white', primary: 'white',
                background : '#ED9A0C',
            }}}
            />
        </View>
  )
  }
}

UserInput.propTypes = {
    source: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    returnKeyType: PropTypes.string,
    heightInput: PropTypes.number,
  };

  export default UserInput;


  const DEVICE_WIDTH = Dimensions.get('window').width;
  const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    input: {
      backgroundColor: 'gray',//'rgba(255, 255, 255, 0.4)',
      
      //width: DEVICE_WIDTH -100,
      //height: props.heightInput,
      //marginHorizontal: 20,
      paddingLeft: 70,
      //borderRadius: 10,
      //color: '#ffffff',
      
      
    },
    inputWrapper: {
      flex:1,
      //paddingTop:20,
    },
    inlineImg: {
      position: 'absolute',
      zIndex: 99,
      width: 22,
      height: 22,
      left: 35,
      top: 30,
    },
  });