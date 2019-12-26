import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Button, Icon, Avatar } from 'react-native-elements';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-crop-picker';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

class ProfileScreen extends Component {
    constructor(props) {
        super(props)
        this.state =
        {
            user: null,
            firstname: null,
            lastname: null,
            contact: null,
            institution: null,
            edit: false,
        }
    }

    onPressSignOut = () => {
        firebase.auth().signOut();
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }


    saveImage(ref, image, imageName) {
        var firebaseStorageRef = firebase.storage().ref(ref);
        const imageRef = firebaseStorageRef.child(imageName + ".jpeg");
        imageRef.putFile(image.path, { contentType: 'image/jpeg' }).then(function () {
            return imageRef.getDownloadURL();
        }).then(function (url) {
            console.log(url)
            firebase.database().ref(`Users/${firebase.auth().currentUser.uid}`).update({
                avatar: url
            })
        }).catch(function (error) {
            console.log(error)
        });
    }
    onUploadPress = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            let my_uid = firebase.auth().currentUser.uid;
            this.saveImage('Avatar', image, `${my_uid}`)
        }).catch((err) => {
            console.log(err)
        })
    }

    uploadToFirebase = (blob) => {

        return new Promise((resolve, reject) => {

            var storageRef = firebase.storage().ref();

            storageRef.child('uploads/photo.jpg').put(blob, {
                contentType: 'image/jpeg'
            }).then((snapshot) => {

                blob.close(); // let's free up the blob

                resolve(snapshot);

            }).catch((error) => {

                reject(error);

            });

        });


    }

    componentDidMount() {
        const uid = firebase.auth().currentUser.uid;
        if (uid !== null && !this.state.user) {
            firebase.database().ref('Users/' + uid).on('value', (snapshot) => {
                if (snapshot.val() != null) {
                    this.setState({ user: snapshot.val() })
                    this.setState({
                        firstname: snapshot.val().firstname,
                        lastname: snapshot.val().lastname,
                        contact: snapshot.val().email,
                        institution: snapshot.val().institution,
                    })
                }
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
                        source={this.state.user != null && this.state.user.avatar != null ? { uri: this.state.user.avatar } : null}
                        size={WIDTH * 0.3}
                        showEditButton
                        containerStyle={{ alignSelf: 'center' }}
                        onEditPress={this.onUploadPress}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.nameStyle}>{this.state.user != null ? this.state.user.firstname : null} {this.state.user != null ? this.state.user.lastname : null}</Text>
                    </View>
                </View>
                <View style={{ flex: 2 }}>
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
                                editable={this.state.edit}
                                value={this.state.firstname != null ? this.state.firstname : null}
                                onChangeText={value => this.onChangeText('firstname', value)}
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
                                editable={this.state.edit}
                                value={this.state.lastname != null ? this.state.lastname : null}
                                onChangeText={value => this.onChangeText('lastname', value)}
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
                                style={{
                                    color: '#828899',
                                    fontFamily: 'Avenir',
                                    fontSize: WIDTH * 0.032,
                                    height: HEIGHT * 0.05,
                                }}
                                editable={this.state.edit}
                                value={this.state.contact != null ? this.state.contact : null}
                                onChangeText={value => this.onChangeText('contact', value)}
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
                                editable={this.state.edit}
                                value={this.state.institution != null ? this.state.institution : null}
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
                </View>
                <View className='sign_out_button' style={styles.signOutStyle}>
                    <Button
                        title="Sign Out"
                        raised
                        buttonStyle={{ backgroundColor: '#ED4337' }}
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
            flex: 1,
            backgroundColor: '#FAFBFF',
        },
        textStyle: {
            color: '#3F5AA6',
            fontSize: WIDTH * 0.04,
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
            fontSize: WIDTH * 0.04,
            height: HEIGHT * 0.05,
        },
        nameStyle:
        {
            alignSelf: 'center',
            fontSize: WIDTH * 0.07,
            fontWeight: '800',
            fontStyle: 'italic',
            fontFamily: 'Avenir',
            color: '#3F5AA6',
        },
        profileStyle:
        {
            flex: 1.5,
            alignSelf: 'center',
            marginTop: HEIGHT * 0.035,
            marginBottom: HEIGHT * 0.04,
            justifyContent:'center',
        },
        iconStyle:
        {
            color: '#3F5AA6',

        },
        infoStyle:
        {
            marginLeft: WIDTH * 0.02,
            flex: 3,
            justifyContent: 'center',
        },
        signOutTextStyle:
            { fontFamily: 'Avenir', fontWeight: '800', fontSize: WIDTH * 0.05, alignSelf: 'center' },
        signOutStyle:
        {
            flex: 1,
            justifyContent: 'flex-end',
            width: WIDTH * 0.8,
            alignSelf: 'center',
            paddingBottom: HEIGHT * 0.015,
            borderRadius: (WIDTH + HEIGHT) / 2,
        },
    }
)

export default ProfileScreen;