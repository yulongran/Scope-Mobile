import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, AsyncStorage, ImageBackground } from 'react-native';
import { Button, Icon, Avatar } from 'react-native-elements';
import firebase from 'react-native-firebase';

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

    onPressSignOut = () => {
        firebase.auth().signOut();
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
                <View style={styles.profileStyle}>
                    {/* Profile Pic ( Replace ProfilePic with a function getting pic from local storage) -->*/}
                    <Avatar
                        source={{
                            uri:
                                ProfilePic[Math.floor(Math.random() * ProfilePic.length)],
                        }}
                        rounded
                        size='xlarge'
                        containerStyle={{ alignSelf: 'center' }}
                        showEditButton
                    />

                    <Text style={styles.nameStyle}>{this.state.user_firstName} {this.state.user_lastName}</Text>
                </View>
                <View style={styles.viewStyle}>
                    <Icon
                        reverse
                        name='ios-contact'
                        type='ionicon'
                        color='#BACAFF'
                        iconStyle={styles.iconStyle}
                    />
                    <View style={styles.infoStyle}>
                        <Text style={styles.textStyle}>Full Name</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.user_institution}
                            onChangeText={value => this.onChangeText('institution', value)}
                        ></TextInput>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Icon
                            name='right'
                            type='antdesign'
                            color='#3F5AA6'
                            size={WIDTH * 0.055}
                        />
                    </View>
                </View>
                <View style={styles.viewStyle}>
                    <Icon
                        reverse
                        name='contacts'
                        type='antdesign'
                        color='#BACAFF'
                        iconStyle={styles.iconStyle}
                    />
                    <View style={styles.infoStyle}>
                        <Text style={styles.textStyle}>Contact Info</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.user_institution}
                            onChangeText={value => this.onChangeText('institution', value)}
                        ></TextInput>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Icon
                            name='right'
                            type='antdesign'
                            color='#3F5AA6'
                            size={WIDTH * 0.055}
                        />
                    </View>
                </View>
                <View style={styles.viewStyle}>
                    <Icon
                        reverse
                        name='ios-school'
                        type='ionicon'
                        color='#BACAFF'
                        iconStyle={styles.iconStyle}
                    />
                    <View style={styles.infoStyle}>
                        <Text style={styles.textStyle}>Institution</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.user_institution}
                            onChangeText={value => this.onChangeText('institution', value)}
                        ></TextInput>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Icon
                            name='right'
                            type='antdesign'
                            color='#3F5AA6'
                            size={WIDTH * 0.055}
                        />
                    </View>
                </View>
                {/* <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>First Name</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={this.state.user_firstName}
                        onChangeText={value => this.onChangeText('firstName', value)}
                    ></TextInput>
                </View> */}
                {/* <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>Last Name</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={this.state.user_lastName}
                        onChangeText={value => this.onChangeText('lastName', value)}
                    ></TextInput>
                </View>
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>User ID</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={this.state.studentID}
                        onChangeText={value => this.onChangeText('studentID', value)}
                    ></TextInput>
                </View>
                <View style={{
                    marginTop: HEIGHT * 0.12,
                }}>
                    <Button
                        title="Log Out"
                        type="solid"
                        buttonStyle={styles.submitButtonStyle}
                        onPress={() => {
                            this.logOut()
                        }} />
                </View> */}
                <View className='sign_out_button' style={styles.signOutStyle}>
                    <Button
                        title="Sign Out"
                        raised
                        buttonStyle={{ backgroundColor: '#FF0000' }}
                        titleStyle={styles.signOutTextStyle}
                        onPress={this.onPressSignOut}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 3,
            backgroundColor: '#FAFBFF',
        },
        textStyle: {
            color: '#3F5AA6',
            fontSize: WIDTH * 0.045,
            fontFamily: 'Avenir',
            fontWeight: '800',

        },
        viewStyle:
        {
            width: WIDTH * 0.85,
            alignSelf: 'center',
            marginBottom: HEIGHT * 0.02,
            backgroundColor: 'white',
            borderRadius: WIDTH * 0.01,
            flexDirection: 'row',
            alignItems: 'center',
        },
        inputStyle:
        {
            color: '#828899',
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.035,
        },
        nameStyle:
        {
            alignSelf: 'center',
            marginTop: HEIGHT * 0.02,
            fontSize: WIDTH * 0.07,
            fontWeight: '800',
            fontStyle: 'italic',
            fontFamily: 'Avenir',
            color: '#3F5AA6',
        },
        profileStyle:
        {
            alignSelf: 'center',
            marginTop: HEIGHT * 0.08,
            marginBottom: HEIGHT * 0.06,
        },
        iconStyle:
        {
            color: '#3F5AA6',

        },
        infoStyle:
        {
            marginLeft: WIDTH * 0.02,
            flex: 3,
        },
        signOutTextStyle:
            { fontFamily: 'Avenir', fontWeight: '800', fontSize: WIDTH * 0.05, alignSelf: 'center' },
        signOutStyle:
        {
            flex: 1,
            justifyContent: 'flex-end',
            width: WIDTH * 0.8,
            alignSelf: 'center',
            paddingBottom: HEIGHT * 0.03,
            borderRadius: (WIDTH + HEIGHT) / 2,
        },
    }
)

export default ProfileScreen;