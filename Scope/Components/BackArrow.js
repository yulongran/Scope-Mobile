
import React, { Component } from 'react'
import {
    StyleSheet, Dimensions
} from 'react-native'
import { Ionicons } from "@expo/vector-icons";

class BackArrow extends React.Component {
    render() {
        return (
            <Ionicons onPress={() => this.props.navigation.navigate('Project')} name="md-arrow-round-back" size={32} color="blue" style={styles.backIconStyle}></Ionicons>
        )
    }
}

const styles = StyleSheet.create(
    {
        backIconStyle:
        {
            color: 'black',
            marginLeft: Dimensions.get('window').width * 0.1,
            paddingTop: Dimensions.get('window').height * 0.08,
        },
    })

export default BackArrow


