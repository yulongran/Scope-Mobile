import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Button,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native'

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

export class Review extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }

    // async fetchRevieweeNameById() {
    //     const token = await AsyncStorage.getItem('id_token');
    //     if (!token) {
    //         return false;
    //     }
    //     let response = await fetch('http://localhost:8001/users/firstname',
    //         {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //                 auth_token: token,
    //                 user_id: this.state.reviewee_id,
    //             },
    //         })
    //     let responseJson = await response.json()
    //     this.setState(
    //         {
    //             reviewee_firstname: responseJson[0].user_firstname
    //         }
    //     )
    //     return true
    // }

    // async fetchReviewerNameById() {
    //     const token = await AsyncStorage.getItem('id_token');
    //     if (!token) {
    //         return false;
    //     }
    //     let response = await fetch('http://localhost:8001/users/firstname',
    //         {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //                 auth_token: token,
    //                 user_id: this.state.reviewer_id,
    //             },
    //         })
    //     let responseJson = await response.json()
    //     this.setState(
    //         {
    //             reviewer_firstname: responseJson[0].user_firstname
    //         }
    //     )
    //     return true
    // }

    // componentDidMount() {
    //     this.setState(
    //         {
    //             reviewee_id: this.props.reviewee_id,
    //             reviewer_id: this.props.reviewer_id,
    //             review_description: this.props.review_description,
    //         }
    //     )
    //     this.fetchRevieweeNameById()
    //     this.fetchReviewerNameById()
    // }

    render() {
        return (
            <View style={styles.container} >
                <View className="project_title">
                    <Text style={{ fontFamily: 'Avenir', fontSize: WIDTH * 0.07, color: '#192A59', fontWeight: '800' }}>Project Title</Text>
                    <View style={styles.projectIDContainer}>
                        <Text style={styles.projectIDStyle}> ID: 10123123132 </Text>
                    </View>
                </View>
                <Divider style={{ backgroundColor: '#EBEEF7', marginTop: HEIGHT * 0.01 }} />
                <View className="project_description" style={{ marginTop: HEIGHT * 0.02 }}>
                    <Text style={{ fontFamily: 'Avenir', fontSize: WIDTH * 0.045, color: '#192A59', fontWeight: '600', marginBottom: HEIGHT * 0.015 }}>DESCRIPTION</Text>
                    <Text style={{ fontFamily: 'Avenir', fontSize: WIDTH * 0.04, color: '#828899', fontWeight: '400' }}>Project Description</Text>
                </View>
                <View className="team_member" style={{ marginTop: HEIGHT * 0.02 }}>
                    <FlatList
                        data={this.state.group_members}
                        key={this.state.group_members}
                        renderItem={({ item }) => (
                            <View style={{ marginRight: WIDTH * 0.075, alignItems: 'center' }}>
                                <Avatar
                                    rounded
                                    size={WIDTH * 0.15}
                                    source={{
                                        uri:
                                            ProfilePic[Math.floor(Math.random() * ProfilePic.length)],
                                    }} />
                                <Text style={{
                                    fontSize: WIDTH * 0.030,
                                    fontFamily: 'Avenir',
                                    textAlign: 'center',
                                    fontWeight: '300',
                                }}>{item.user_firstname}</Text>
                                <Text style={{
                                    fontSize: WIDTH * 0.030,
                                    fontFamily: 'Avenir',
                                    textAlign: 'center',
                                    fontWeight: '300',
                                }}>
                                    {item.user_lastname}
                                </Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        viewStyle:
        {
            borderWidth: 0.3,
            borderBottomColor: 'gray',
            paddingLeft: Dimensions.get('window').width * 0.05,
            paddingRight: Dimensions.get('window').width * 0.05,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height * 0.12,
            paddingBottom: Dimensions.get('window').height * 0.01,
        },
    })

export default Review
