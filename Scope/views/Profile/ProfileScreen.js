import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, AsyncStorage, ImageBackground } from 'react-native';
import { Button, Icon, Avatar } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { string } from 'prop-types';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

class ProfileScreen extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                user: null,
            }
    }

    onPressSignOut = () => {
        firebase.auth().signOut();
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

    onUploadPress = () => {
        alert("Upload Pictures")
    }

    componentDidMount() {
        const uid = firebase.auth().currentUser.uid;
        if (uid !== null && !this.state.user) {
            firebase.database().ref('Users/' + uid).on('value', (snapshot) => {
                this.setState({ user: snapshot.val() })
            });
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileStyle}>
                    <Avatar
                        title={this.state.user != null ? this.state.user.firstname[0] + this.state.user.lastname[0] : null}
                        rounded
                        size='xlarge'
                        containerStyle={{ alignSelf: 'center' }}
                        showEditButton
                        onEditPress={this.onUploadPress}
                    />

                    <Text style={styles.nameStyle}>{this.state.user != null ? this.state.user.firstname : null} {this.state.user != null ? this.state.user.lastname : null}</Text>
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
                        <Text style={styles.textStyle}>First Name</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.user != null ? this.state.user.firstname : null}
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
                        name='ios-contact'
                        type='ionicon'
                        color='#BACAFF'
                        iconStyle={styles.iconStyle}
                    />
                    <View style={styles.infoStyle}>
                        <Text style={styles.textStyle}>Last Name</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={this.state.user != null ? this.state.user.lastname : null}
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
                            value={this.state.user != null ? this.state.user.username : null}
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