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
          <View></View>
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
