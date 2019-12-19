import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, SafeAreaView, Alert
} from 'react-native';
import { Input } from 'react-native-elements'
import ScopeLogo from '../../assets/images/ScopeLogo.png';
import { Ionicons } from "@expo/vector-icons";
import firebase from 'react-native-firebase';

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                username: '',
                password: '',
            }
        // this.props.navigation.addListener('willFocus', (refresh) => {
        //     this.setState(
        //         {
        //             username: '',
        //             password: '',
        //         })
        // })
    }

    // https://stackoverflow.com/questions/32913338/react-native-get-textinput-value
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    checkChangeLogin = () => {

    }

    /**
     * Firebase User Sign In
     */
    onLoginPress() {
        const { username, password } = this.state
        firebase.auth().signInWithEmailAndPassword(username, password)
            .then((value) => {
                console.log(value)
            }).catch((err) => {
                Alert.alert(
                    'Unable to log in with provided credentials',
                );
            })
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.logo}>
                    <Image source={ScopeLogo}></Image>
                </View >
                <View style={styles.inputView}>
                    <Input
                        rightIcon={
                            <Ionicons name="md-person" size={21} color="#3F5AA6" />}
                        label='Username'
                        onChangeText={val => this.onChangeText('username', val)}
                        rightIconContainerStyle={styles.rightIconStyle}
                        containerStyle={styles.inputContainerStyle}
                        labelStyle={styles.inputLabelStyle}
                        inputStyle={styles.inputTextStyle}
                    />
                    <Input
                        rightIcon={
                            <Ionicons name="md-lock" size={21} color="#3F5AA6" />}
                        label='Password'
                        onChangeText={val => this.onChangeText('password', val)}
                        rightIconContainerStyle={styles.rightIconStyle}
                        containerStyle={styles.inputContainerStyle}
                        labelStyle={styles.inputLabelStyle}
                        inputStyle={styles.inputTextStyle}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity
                    style={styles.touchableStyle}
                    onPress={() => {
                        this.onLoginPress()
                    }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Log In</Text>
                </TouchableOpacity>
                <View style={styles.signInUpStyle}>
                    <TouchableOpacity style={styles.forgetStyle}>
                        <Text style={{ color: '#3F5AA6' }}>Forget Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: HEIGHT * 0.02 }}
                        onPress={() =>
                            this.props.navigation.navigate("SignUp")
                        }>
                        <Text style={{ color: '#3F5AA6' }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
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
            marginBottom: HEIGHT * 0.06,
            marginLeft: WIDTH * 0.15,
            alignSelf: 'center',
        },
        textInput:
        {
            width: WIDTH * 0.70,
            marginLeft: WIDTH * 0.03,
        },
        inputView:
        {
            borderRadius: 10,
            alignItems: 'center',
            backgroundColor: 'white',
        },
        rightIconStyle:
        {
            marginRight: WIDTH * 0.02,
        },
        inputContainerStyle:
        {
            width: WIDTH * 0.8,
            marginBottom: HEIGHT * 0.03,
        },
        touchableStyle:
        {
            borderRadius: 10,
            height: HEIGHT * 0.05,
            width: WIDTH * 0.80,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#3F5AA6',
            alignSelf: 'center',
        },
        inputTextStyle:
        {
            fontFamily: 'Avenir',
            fontSize: 16,
            color: '#3F5AA6',
        },
        inputLabelStyle:
        {
            fontFamily: 'Avenir',
            color: '#3F5AA6',
        },
        forgetStyle:
        {
            marginRight: 150,
            marginTop: HEIGHT * 0.02,
        },
        signInUpStyle:
        {
            flexDirection: 'row',
            justifyContent: 'center',
        },
    }
)

export default HomeScreen;