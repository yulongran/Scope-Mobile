import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Button
} from 'react-native'


class Redirect extends Component {
    render() {
        return (
            <View style = {{flex:1, alignContent:'center', justifyContent:'center'}}>
                <Button title="Log In"/>
            </View>
        )
    }
}


export default Redirect;