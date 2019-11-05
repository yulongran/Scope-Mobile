import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, Alert,
    TouchableWithoutFeedback, Keyboard, AsyncStorage
} from 'react-native'
import MenuButton from '../Components/MenuButton';
import ScopeLogo from '../assets/images/ScopeLogo.png';
import { Ionicons } from "@expo/vector-icons";
import deviceStorage from '../Components/deviceStorage';
import checkLogin from '../Function/checkLogIn';
import WelcomeScreen from '../Screen/WelcomeScreen'

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigation.addListener('willFocus', (refresh) => {
            this.setState(
                {
                    username: '',
                    password: '',
                })
        })
    }
    state =
        {
            username: '',
            password: '',
            userLogedIn: false,

        }

    /**
* Remove Stack Navigation header
*/
    static navigationOptions = {
        header: null,
        headerBackTitle: null,
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }


    /**
    * POST Login request to the sever
    */
    login = async () => {
        const { username, password } = this.state
        await fetch('http://localhost:8001/users/login',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        username: username,
                        password: password,
                    }
                ),

            }).then((response) => {
                console.log(response.headers.map.auth_token)

                // Log in Successful
                if (response.status == 200) {
                    deviceStorage.saveItem("id_token", response.headers.map.auth_token);
                    this.props.navigation.navigate("Project")
                    this.setState(
                        {
                            username: '',
                            password: '',
                        }
                    )
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async componentDidMount() {
        this.checkUserStatus()
    }

    async checkUserStatus() {
        const token = await AsyncStorage.getItem('id_token')
        await fetch('http://localhost:8001/users/status',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                },

            }).then((response) => {
                if (response.status == 200) {
                    this.setState(
                        {
                            userLogedIn: true
                        }
                    )
                }
            }).catch((error) => {
                console.log("User Status: " + error)
            })

    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={ScopeLogo} style={styles.logo}></Image>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Username"
                        onChangeText={val => this.onChangeText('username', val)}
                    />
                    <Ionicons name="md-person" size={20} color="#0260F7" />
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.textInput} placeholder="Password"
                        onChangeText={val => this.onChangeText('password', val)}
                        value={this.state.password} />
                    <Ionicons name="md-lock" size={20} color="#0260F7" />
                </View>
                <TouchableOpacity style={styles.touchableStyle}
                    onPress={this.login}>
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
        )


    }
}


// Alert.alert(
//     'Password and Username do not match',
// )


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
            marginBottom: HEIGHT * 0.03,
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

export default HomeScreen;