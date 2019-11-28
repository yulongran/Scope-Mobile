import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, AsyncStorage
} from 'react-native';
import { Input } from 'react-native-elements'
import ScopeLogo from '../../assets/images/ScopeLogo.png';
import { Ionicons } from "@expo/vector-icons";
import UserRequest from '../../services/User/index';

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                username: '',
                password: '',
                userLogedIn: false,

            }
        this.props.navigation.addListener('willFocus', (refresh) => {
            this.setState(
                {
                    username: '',
                    password: '',
                })
        })
    }

    // https://stackoverflow.com/questions/32913338/react-native-get-textinput-value
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    checkChangeLogin = () => {

    }

    async componentDidMount() {
        // var userLogedIn = await UserRequest.checkUserStatus()

        // this.setState(
        //     {
        //         userLogedIn: userLogedIn
        //     }
        // )
        const token = await AsyncStorage.getItem('id_token')
        if (token) {
            this.props.navigation.navigate("Project")
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={ScopeLogo} style={styles.logo}></Image>
                <View style={styles.inputView}>
                    <Input
                        rightIcon={
                            <Ionicons name="md-person" size={21} color="#3F5AA6" />}
                        label='Username'
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
                        labelStyle ={styles.inputLabelStyle}
                        inputStyle={styles.inputTextStyle}
                    />
                </View>
                <TouchableOpacity style={styles.touchableStyle}
                    onPress={() => {
                        var status = UserRequest.login(this.state.username, this.state.password)
                        if (status) {
                            this.setState({
                                username: '',
                                password: '',
                            })
                            this.props.navigation.navigate("Project")
                        }
                    }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Log In</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', }}>
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
            </View >
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
            marginTop: HEIGHT * 0.23,
            width: WIDTH * 0.75,
            marginBottom: HEIGHT * 0.06,
            marginLeft: WIDTH*0.02,
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
        touchableStyle:
        {
            borderRadius: 10,
            height: HEIGHT * 0.05,
            width: WIDTH * 0.80,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#3F5AA6',
            alignSelf:'center',
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
        forgetStyle:
        {
            marginRight: 150,
            marginTop: HEIGHT * 0.02,
        },
    }
)

export default HomeScreen;