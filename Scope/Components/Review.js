import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Button,
    TouchableOpacity
} from 'react-native'

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

export class Review extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        reviewee: '',
        reviewer: '',
        review_description: '',
    }


    componentDidMount() {
        this.setState(
            {
                review_description: this.props.review_description
            }
        )
    }

    fetchUserName() {

    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <Text style={{
                    marginTop: HEIGHT * 0.006,        
                    fontSize: 15,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                }}>From
                    <Text>  Janna
                        <Text>  To</Text>
                        <Text>  Yulong</Text>
                    </Text>
                </Text>
                <Text style={{marginLeft: WIDTH*0.1,
                            marginRight: WIDTH*0.1,
                            marginTop: HEIGHT * 0.006,}}>{this.state.review_description}</Text>
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
