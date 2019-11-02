import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Button, Dimensions, Image, TextInput
} from 'react-native'
import ProfilePic from '../assets/profile_default.jpg';
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
import { LinearGradient } from 'expo-linear-gradient';

class EvaluationScreen extends Component {
    constructor(props) {
        super(props)

    }

    state =
        {
            review: "",
            reviewee: "",
            reviewer: "",
        }

    /**
* Config Stack Navigator Header
*/
    static navigationOptions = {
        headerBackground: (
            <LinearGradient colors={['#3366cc', '#0066ff', '#ffffff']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }} />
        ),
    };

    onChangeText(text) {
        this.setState(
            {
                review: text,
            }
        )
    }

    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center', }}>
                <Text style={styles.titleStyle}>Evalutaion</Text>
                <View className="profile_image">
                    <Image source={ProfilePic} style={{
                        width: WIDTH * 0.3,
                        height: WIDTH * 0.3,
                        borderRadius: WIDTH * 0.3 / 2,
                        alignSelf: 'center',
                    }} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View className="reviewee" style={styles.nameStyle}>
                        <Text style={{ marginRight: 10, fontSize: WIDTH * 0.05, textAlign: 'center' }}>{this.props.navigation.getParam('user_firstname')}</Text>
                        <Text style={{ marginRight: 10, fontSize: WIDTH * 0.05, textAlign: 'center' }}>{this.props.navigation.getParam('user_lastname')}</Text>
                    </View>
                </View>
                <View className="review" style={{ marginTop: HEIGHT * 0.06, borderWidth: 0.5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: WIDTH * 0.08, marginTop: HEIGHT * 0.015 }}>
                        <View style={{ backgroundColor: 'red', borderRadius: 10, height: 10, width: 10 }}></View>
                        <Text style={{ fontSize: WIDTH * 0.05, marginLeft: WIDTH * 0.08 }}>Leave a Review</Text>
                    </View>
                    <View style={{ margin: WIDTH * 0.05, height: HEIGHT * 0.3, borderWidth: 0.5 }}>
                        <TextInput
                            style={{ height: HEIGHT * 0.3, padding: 20, fontSize: WIDTH * 0.04 }}
                            multiline={true}
                            onChangeText={text => this.onChangeText(text)}
                            value={this.state.review}></TextInput>
                    </View>
                </View>
                <LinearGradient colors={['#3366cc', '#0066ff', '#ffffff']}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <View style={{ justifyContent: 'center', backgroundColor: '' }}>
                        <Button
                            title="Submit"
                            onPress={() => {/** Submit Review API */ }}
                            color='white'
                        />
                    </View>
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        titleStyle:
        {
            fontSize: WIDTH * 0.1,
            textAlign: 'center',
            padding: WIDTH * 0.07,
        },
        nameStyle:
        {
            flexDirection: 'row',
            marginTop: HEIGHT * 0.02,
        },
    }
)
export default EvaluationScreen;