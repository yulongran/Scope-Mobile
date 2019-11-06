import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import ScopeLogo from '../../assets/images/ScopeLogo.png';
import { Ionicons } from "@expo/vector-icons";
import UserRequest from '../../services/User/index';

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
        };
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={ScopeLogo} style={styles.logo}></Image>
                <View style={styles.inputView}>
                    <TextInput style={styles.textInput} placeholder="First Name"
                        onChangeText={val => this.onChangeText('firstname', val)} />
                    <Ionicons name="md-person" size={20} color="#0260F7" />
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.textInput} placeholder="Last Name"
                        onChangeText={val => this.onChangeText('lastname', val)} />
                    <Ionicons name="md-lock" size={20} color="#0260F7" />
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.textInput} placeholder="Username"
                        onChangeText={val => this.onChangeText('username', val)} />
                    <Ionicons name="md-lock" size={20} color="#0260F7" />
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.textInput} placeholder="Password"
                        onChangeText={val => this.onChangeText('password', val)} />
                    <Ionicons name="md-lock" size={20} color="#0260F7" />
                </View>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => {
                    // Sign Up function
                    var status = UserRequest.signUp(this.state.firstname, this.state.lastname, this.state.username, this.state.password)
                    if (status) {
                        // Navigation to Sign In screen
                    }
                }}>
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
            marginTop: HEIGHT * 0.05,
            width: WIDTH * 0.75,
        },
        textInput:
        {
            height: HEIGHT * 0.05,
            width: WIDTH * 0.70,
            marginLeft: WIDTH * 0.03,
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
            marginTop: HEIGHT * 0.02,
        },
    }
)

export default SignUpScreen;