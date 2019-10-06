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
                <Text style={styles.keyWord}>{this.props.keyWord}</Text>
                <Text stlye={styles.reviewMain}>{this.props.review}</Text>
                <Text style={styles.reviewClosing}>by
                    <Text style={{color: 'blue',}}> {this.props.name}
                        <Text style={{color: 'black',}}> at {this.props.date}</Text>
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
        keyWord:
        {
            fontSize: 17,
            marginBottom: 3,
            fontWeight: 'bold',
            color: 'blue',
            fontFamily: 'Baskerville-SemiBoldItalic',
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
