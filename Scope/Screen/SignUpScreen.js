import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import MenuButton from '../Components/MenuButton';
import ScopeLogo from '../assets/ScopeLogo.png';
import { Ionicons } from "@expo/vector-icons";

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <MenuButton navigation={this.props.navigation} />
                <Image source={ScopeLogo} style={styles.logo}></Image>
                <View style={styles.inputView}>
                    <TextInput style={styles.textInput} placeholder="First Name" />
                    <Ionicons name="md-person" size={20} color="#0260F7" />
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.textInput} placeholder="Last Name" />
                    <Ionicons name="md-lock" size={20} color="#0260F7" />
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.textInput} placeholder="Username" />
                    <Ionicons name="md-lock" size={20} color="#0260F7" />
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.textInput} placeholder="Password" />
                    <Ionicons name="md-lock" size={20} color="#0260F7" />
                </View>
                <TouchableOpacity style={styles.touchableStyle}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const HEIGHT = Dimensions.get('screen').height;

const WIDTH = Dimensions.get('screen').width;


const styles = StyleSheet.create(
    {
        container: {
            alignItems: 'center',
            flex: 1,
        },
        text: {
            fontSize: 30,
        },
        logo:
        {
            marginTop: HEIGHT * 0.15,
            width: WIDTH * 0.75,
        },
        textInput:
        {
            height: HEIGHT * 0.05,
            width: WIDTH * 0.70,
            marginLeft: WIDTH*0.03,
        },
        inputView:
        {
            borderColor: '#0260F7',
            borderWidth: 1,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 20,
            marginBottom: HEIGHT * 0.03,
        },
        touchableStyle:
        {
            borderColor: '#0260F7',
            borderWidth: 1,
            borderRadius: 10,
            height: HEIGHT * 0.05,
            width: WIDTH * 0.81,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0260F7',
        },
        forgetStyle:
        {
            marginRight: 150,
            marginTop: HEIGHT*0.02,
        },
    }
)

export default SignUpScreen;