import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import ScopeLogo from '../../assets/images/ScopeLogo.png';
import { Ionicons } from "@expo/vector-icons";
import UserRequest from '../../services/User/index';
import { Input } from 'react-native-elements'

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
                <Ionicons onPress={() => this.props.navigation.navigate('Home')}
                    name="md-arrow-round-back" size={40} style={styles.backIconStyle}></Ionicons>
                <Image source={ScopeLogo} style={styles.logo}></Image>
                <View style={styles.inputView}>
                    <Input
                        rightIcon={
                            <Ionicons name="md-person" size={21} color="#3F5AA6" />}
                        label='First Name'
                        onChangeText={val => this.onChangeText('firstname', val)}
                        inputContainerStyle={styles.inputStyle}
                        rightIconContainerStyle={styles.rightIconStyle}
                        containerStyle={styles.inputContainerStyle}
                        labelStyle={styles.inputLabelStyle}
                        inputStyle={styles.inputTextStyle}
                    />
                </View>
                <View style={styles.inputView}>
                    <Input
                        rightIcon={
                            <Ionicons name="md-person" size={21} color="#3F5AA6" />}
                        label='Last Name'
                        onChangeText={val => this.onChangeText('lastname', val)}
                        inputContainerStyle={styles.inputStyle}
                        rightIconContainerStyle={styles.rightIconStyle}
                        containerStyle={styles.inputContainerStyle}
                        labelStyle={styles.inputLabelStyle}
                        inputStyle={styles.inputTextStyle}
                    />
                </View>
                <View style={styles.inputView}>
                    <Input
                        rightIcon={
                            <Ionicons name="md-mail" size={21} color="#3F5AA6" />}
                        label='Email'
                        onChangeText={val => this.onChangeText('username', val)}
                        inputContainerStyle={styles.inputStyle}
                        rightIconContainerStyle={styles.rightIconStyle}
                        containerStyle={styles.inputContainerStyle}
                        labelStyle={styles.inputLabelStyle}
                        inputStyle={styles.inputTextStyle}
                    />
                </View>
                <View style={styles.inputView}>
                    <Input
                        rightIcon={
                            <Ionicons name="md-lock" size={21} color="#3F5AA6" />}
                        label='Password'
                        onChangeText={val => this.onChangeText('password', val)}
                        inputContainerStyle={styles.inputStyle}
                        rightIconContainerStyle={styles.rightIconStyle}
                        containerStyle={styles.inputContainerStyle}
                        labelStyle={styles.inputLabelStyle}
                        inputStyle={styles.inputTextStyle}
                    />
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
            marginTop: HEIGHT * 0.045,
            width: WIDTH * 0.75,
            marginBottom: HEIGHT * 0.06,
        },
        textInput:
        {
            height: HEIGHT * 0.05,
            width: WIDTH * 0.70,
            marginLeft: WIDTH * 0.03,
        },
        inputView:
        {
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 20,
            marginBottom: HEIGHT * 0.03,
            backgroundColor: 'white',
        },
        touchableStyle:
        {
            borderRadius: 10,
            height: HEIGHT * 0.05,
            width: WIDTH * 0.81,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#3F5AA6',
        },
        forgetStyle:
        {
            marginRight: 150,
            marginTop: HEIGHT * 0.02,
        },
        backIconStyle:
        {
            color: '#3F5AA6',
            marginLeft: Dimensions.get('window').width * 0.07,
            marginTop: Dimensions.get('window').height * 0.08,
            alignSelf: 'flex-start',
        },
        inputTextStyle:
        {
            fontFamily: 'Avenir',
            fontSize: 16,
        },
        inputLabelStyle:
        {
            fontFamily: 'Avenir',
            color: '#3F5AA6',
        },
        inputView:
        {
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: HEIGHT * 0.03,
            backgroundColor: 'white',
        },
        rightIconStyle:
        {
            marginRight: WIDTH * 0.02,
        },
        inputContainerStyle:
        {
            width: WIDTH * 0.8,
        },

    }
)

export default SignUpScreen;