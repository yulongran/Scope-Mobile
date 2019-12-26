import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import ScopeLogo from '../../assets/images/ScopeLogo.png';
import { Input, Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import TermsAndCondition from './components/index';

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            institution: '',
            accepted: false,
        };
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    onSignUpPress = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((value) => {
                firebase.database().ref('Users/' + value.user.uid).set({
                    email: this.state.email,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    institution: this.state.institution,
                });
                firebase.auth().currentUser.sendEmailVerification();
            }).catch((err) => {
                console.log(err)
                Alert.alert(
                    'Email Already Exists',
                );
            })
    }

    onPressAccept = () => {
        this.setState({ accepted: true })
    }

    render() {
        return (
            <ScrollView>
                <TermsAndCondition onPressAccept={this.onPressAccept} navigation={this.props.navigation}/>
                <View style={styles.container}>
                    <Icon onPress={() => this.props.navigation.navigate('Home')}
                        name="arrow-left" type='feather' size={40} iconStyle={styles.backIconStyle} />
                    <Image source={ScopeLogo} style={styles.logo}></Image>
                    <View style={styles.inputView}>
                        <Input
                            rightIcon={
                                <Icon name="md-person" type='ionicon' size={21} color="#3F5AA6" />}
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
                                <Icon name="md-person" type='ionicon' size={21} color="#3F5AA6" />}
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
                                <Icon name="md-school" type='ionicon' size={21} color="#3F5AA6" />}
                            label='Institution'
                            onChangeText={val => this.onChangeText('institution', val)}
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
                                <Icon name="md-mail" type='ionicon' size={21} color="#3F5AA6" />}
                            label='Email'
                            onChangeText={val => this.onChangeText('email', val)}
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
                                <Icon name="md-lock" type='ionicon' size={21} color="#3F5AA6" />}
                            label='Password'
                            onChangeText={val => this.onChangeText('password', val)}
                            inputContainerStyle={styles.inputStyle}
                            rightIconContainerStyle={styles.rightIconStyle}
                            containerStyle={styles.inputContainerStyle}
                            labelStyle={styles.inputLabelStyle}
                            inputStyle={styles.inputTextStyle}
                            secureTextEntry={true}

                        />
                    </View>
                    <TouchableOpacity style={styles.touchableStyle} onPress={this.onSignUpPress}
                        disabled={this.state.email.length == 0 || this.state.firstname.length == 0 || this.state.lastname.length == 0
                            || this.state.lastname.length == 0 || this.state.institution.length == 0}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}


const HEIGHT = Dimensions.get('screen').height;

const WIDTH = Dimensions.get('screen').width;


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        text: {
            fontSize: 30,
        },
        logo:
        {
            width: WIDTH * 0.75,
            marginBottom: HEIGHT * 0.03,
            alignSelf: 'center',
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
            marginTop: HEIGHT * 0.015,
            alignSelf: 'center',
        },
        forgetStyle:
        {
            marginRight: 150,
            marginTop: HEIGHT * 0.02,
        },
        backIconStyle:
        {
            color: '#3F5AA6',
            alignSelf: 'flex-start',
            margin: HEIGHT * 0.02,
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
        inputView:
        {
            borderRadius: 10,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: HEIGHT * 0.015,
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
        inputStyle:
        {
            height: HEIGHT * 0.05,
        },

    }
)

export default SignUpScreen;