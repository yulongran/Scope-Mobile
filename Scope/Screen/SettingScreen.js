import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MenuButton from '../Components/MenuButton'
import BackArrow from '../Components/BackArrow'

// Testing purpose: delete after
import { Review } from '../Components/Review'

class SettingScreen extends Component {
    render() {
        return (
            <View>
                <BackArrow navigation={this.props.navigation} />
                <View style= {styles.container}>
                    <Text style={styles.text}>Settings</Text>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            fontSize: 30,
        }
    }
)

export default SettingScreen;