import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import ScopeLogo from '../../assets/images/ScopeLogo.png';
import { Ionicons } from "@expo/vector-icons";

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
    }
    state =
        {
            firstname: '',
            lastname: '',
            username: '',
            password: '',

        }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    /**
    * POST Sign Up request to the sever
    */
    signUp = async () => {
        const { firstname, lastname, username, password } = this.state
        fetch('http://localhost:8001/users/register',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        firstname, firstname,
                        lastname: lastname,
                        username: username,
                        password: password,
                }
                ),
                
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <MenuButton navigation={this.props.navigation} />
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
                <TouchableOpacity style={styles.touchableStyle} onPress={this.signUp}>
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