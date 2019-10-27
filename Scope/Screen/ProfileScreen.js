import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'
import ProfilePic from '../assets/profile_default.jpg'
import MenuButton from '../Components/MenuButton'
import BackArrow from '../Components/BackArrow'
// Testing purpose: delete after
import { Review } from '../Components/Review'
import { Button } from 'react-native-elements'


const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
class ProfileScreen extends Component {


    constructor(props) {
        super(props)
    }

    state =
        {
            institution: 'San Jose State University',
            firstName: 'Everett',
            lastName: 'Parker',
            studentID: '010010101',

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
     * Update Information to the data base
     * when user clicked back button or logout
     */
    updateInformation() {

    }

    render() {
        return (
            <View style={styles.container}>
                <BackArrow navigation={this.props.navigation} />
                <View style={{
                    alignSelf: 'center',
                    marginTop: HEIGHT * 0.07,
                    marginBottom: HEIGHT * 0.06,
                }}>
                    {/* Profile Pic ( Replace ProfilePic with a function getting pic from local storage) -->*/}
                    <Image source={ProfilePic} style={{
                        width: WIDTH * 0.3,
                        height: WIDTH * 0.3,
                        borderRadius: WIDTH * 0.3 / 2,
                        alignSelf: 'center',
                    }} />
                    <Text style={{
                        alignSelf: 'center',
                        marginTop: HEIGHT * 0.01,
                        fontSize: 25,
                    }}>Everett Parker</Text>
                </View>
                <View style={styles.viewStyle}>
                    <Text style={{
                        color: '#0260F7',
                        fontSize: 20,
                    }}>Institution</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={this.state.institution}
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
                        value={this.state.firstName}
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
                        value={this.state.lastName}
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
                <View>

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