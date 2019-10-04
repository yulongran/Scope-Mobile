import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Button,
    TouchableOpacity
} from 'react-native'


export class Review extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.reviewHead}>from {this.props.name}</Text>
                <Text stlye={styles.reviewMain}>{this.props.review}</Text>
                <Text style={styles.reviewClosing}>by
                    <Text> {this.props.name}
                        <Text> at {this.props.date}</Text>
                    </Text>
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container:
        {
            borderColor: 'gray',
            borderRadius: 10,
            borderWidth: 1,
            padding: 12,
            marginBottom: 10,
            marginTop: 5,
            width: Dimensions.get('screen').width * 0.95,
        },
        reviewHead:
        {
            fontSize: 17,
            marginBottom: 3,
        },
        reviewClosing:
        {
            textAlign: 'right',
            fontStyle: 'italic',
            marginRight: 10,
        },
        reviewMain:
        {
        },
        nameStyle:
        {
            color: 'blue',
            fontWeight: 'bold',
        }
    })

export default Review
