import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import ProfilePic from '../assets/images/profile_default.jpg'


const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

export class People extends Component {
    constructor(props) {
        super(props)
    }

    // Props should pass in a image size

    state =
        {

        }

    render() {
        return (
            <View style={{ paddingTop: 6, paddingRight: 6 }}>
                <TouchableOpacity>
                    <Image source={ProfilePic} style={{
                        width: WIDTH * 0.06,
                        height: WIDTH * 0.06,
                        borderRadius: WIDTH * 0.06 / 2,
                        alignSelf: 'center',
                    }} />
                    <Text style={{
                        marginTop: HEIGHT * 0.008,
                        fontSize: 10,
                        alignSelf: 'center'
                    }}>Everett Parker</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default People