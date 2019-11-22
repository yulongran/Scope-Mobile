import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, AsyncStorage
} from 'react-native'
import ScopeLogo from '../../assets/images/ScopeLogo.png';
import { Ionicons } from "@expo/vector-icons";
import UserRequest from '../../services/User/index';
import { LinearGradient } from 'expo-linear-gradient';

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
            <LinearGradient colors={['#005AA7', '#FFFDE4']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }} >
                <View style={styles.container}>
                    <Image source={ScopeLogo} style={styles.logo}></Image>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Username"
                            onChangeText={val => this.onChangeText('username', val)}
                        />
                        <Ionicons name="md-person" size={20} color="#005AA7" />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput style={styles.textInput} placeholder="Password"
                            onChangeText={val => this.onChangeText('password', val)}
                            value={this.state.password} />
                        <Ionicons name="md-lock" size={20} color="#005AA7" />
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
                            <Text style={{ color: '#0260F7' }}>Forget Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: HEIGHT * 0.02 }}
                            onPress={() =>
                                this.props.navigation.navigate("SignUp")

                            }>
                            <Text style={{ color: '#0260F7' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View >
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
            marginTop: HEIGHT * 0.25,
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
    }
)

export default HomeScreen;