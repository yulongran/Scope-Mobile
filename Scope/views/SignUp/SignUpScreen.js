import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import ScopeLogo from '../../assets/images/ScopeLogo.png';
import { Ionicons } from "@expo/vector-icons";
import UserRequest from '../../services/User/index';
import { LinearGradient } from 'expo-linear-gradient';
import BackArrow from '../../components/BackArrow';

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
            <LinearGradient colors={['#005AA7', '#FFFDE4']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }} >
                <View style={styles.container}>
                    {/**Back Arrow */}
                    <Ionicons onPress={() => this.props.navigation.navigate('Home')}
                        name="md-arrow-round-back" size={40} color="blue" style={styles.backIconStyle}></Ionicons>
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
            </LinearGradient>
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
            marginTop: HEIGHT * 0.13,
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
            backgroundColor: '#005AA7',
        },
        forgetStyle:
        {
            marginRight: 150,
            marginTop: HEIGHT * 0.02,
        },
        backIconStyle:
        {
            color: 'white',
            marginLeft: Dimensions.get('window').width * 0.05,
            paddingTop: Dimensions.get('window').height * 0.06,
            alignSelf:'flex-start',
        },

    }
)

export default SignUpScreen;