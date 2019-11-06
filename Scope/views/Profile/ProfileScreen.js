import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'


const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

/**
 * Image Source from https://randomuser.me/
 * Credit to https://randomuser.me/
 */
const ProfilePic = ["https://randomuser.me/api/portraits/med/men/1.jpg",
    "https://randomuser.me/api/portraits/med/men/2.jpg",
    "https://randomuser.me/api/portraits/med/men/3.jpg",
    "https://randomuser.me/api/portraits/med/men/4.jpg",
    "https://randomuser.me/api/portraits/med/men/5.jpg",
    "https://randomuser.me/api/portraits/med/men/6.jpg",
    "https://randomuser.me/api/portraits/med/men/7.jpg",
    "https://randomuser.me/api/portraits/med/men/8.jpg",
    "https://randomuser.me/api/portraits/med/men/9.jpg",
    "https://randomuser.me/api/portraits/med/men/10.jpg",
    "https://randomuser.me/api/portraits/med/women/1.jpg",
    "https://randomuser.me/api/portraits/med/women/2.jpg",
    "https://randomuser.me/api/portraits/med/women/3.jpg",
    "https://randomuser.me/api/portraits/med/women/4.jpg",
    "https://randomuser.me/api/portraits/med/women/5.jpg",
    "https://randomuser.me/api/portraits/med/women/6.jpg",
    "https://randomuser.me/api/portraits/med/women/7.jpg",
    "https://randomuser.me/api/portraits/med/women/8.jpg",
    "https://randomuser.me/api/portraits/med/women/9.jpg",

]
class ProfileScreen extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                user_institution: '',
                user_firstName: '',
                user_lastName: '',
                studentID: '010010101',
            }
    }

    /**
     * Log out by deleting User's JWT toekn
     */
    logOut = async () => {
        try {
            await AsyncStorage.removeItem('id_token');
            this.props.navigation.navigate('Home')
            return true;
        }
        catch (error) {
            return false;
        }
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    /**
     * Fetch user info based on id
     */
    async fetchInformation() {
        const token = await AsyncStorage.getItem('id_token')
        let response = await fetch('http://localhost:8001/users/info',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                },
            })
        let responseJson = await response.json()
        this.setState(
            {
                user_institution: responseJson[0].user_institution,
                user_firstName: responseJson[0].user_firstname,
                user_lastName: responseJson[0].user_lastname,
            }
        )
    }



    /**
     * Update Information to the data base
     * when user clicked back button or logout
     */
    updateInformation() {

    }

    componentDidMount() {
        this.fetchInformation()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    alignSelf: 'center',
                    marginTop: HEIGHT * 0.13,
                    marginBottom: HEIGHT * 0.06,
                }}>
                    {/* Profile Pic ( Replace ProfilePic with a function getting pic from local storage) -->*/}
                    <Image source={{ uri: ProfilePic[Math.floor(Math.random() * ProfilePic.length)] }} style={{
                        width: WIDTH * 0.3,
                        height: WIDTH * 0.3,
                        borderRadius: WIDTH * 0.3 / 2,
                        alignSelf: 'center',
                    }} />
                    <Text style={{
                        alignSelf: 'center',
                        marginTop: HEIGHT * 0.01,
                        fontSize: 25,
                    }}>{this.state.user_firstName} {this.state.user_lastName}</Text>
                </View>
                <View style={styles.viewStyle}>
                    <Text style={{
                        color: '#0260F7',
                        fontSize: 20,
                    }}>Institution</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={this.state.user_institution}
                        onChangeText={value => this.onChangeText('institution', value)}
                    ></TextInput>
                </View>
                <View style={styles.viewStyle}>
                    <Text style={{
                        color: '#0260F7',
                        fontSize: 20,
                    }}>First Name</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={this.state.user_firstName}
                        onChangeText={value => this.onChangeText('firstName', value)}
                    ></TextInput>
                </View>
                <View style={styles.viewStyle}>
                    <Text style={{
                        color: '#0260F7',
                        fontSize: 20,
                    }}>Last Name</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={this.state.user_lastName}
                        onChangeText={value => this.onChangeText('lastName', value)}
                    ></TextInput>
                </View>
                <View style={styles.viewStyle}>
                    <Text style={{
                        color: '#0260F7',
                        fontSize: 20,
                    }}>Student ID</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={this.state.studentID}
                        onChangeText={value => this.onChangeText('studentID', value)}
                    ></TextInput>
                </View>
                <View style={{
                    marginTop: HEIGHT * 0.1,
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: 'red',
                        height: HEIGHT * 0.04,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                        onPress={this.logOut}>

                        <Text style={{
                            color: 'white',
                            fontSize: 20,

                        }}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 3,
            backgroundColor: '#fff',
        },
        text: {
            fontSize: 30,
        },
        viewStyle:
        {
            marginLeft: WIDTH * 0.15,
            marginRight: WIDTH * 0.15,
            marginBottom: HEIGHT * 0.02,
        },
        inputStyle:
        {
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
            height: 40,
        },
    }
)

export default ProfileScreen;