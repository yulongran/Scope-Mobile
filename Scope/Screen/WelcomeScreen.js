import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MenuButton from '../Components/MenuButton'

// Testing purpose: delete after
import { Review } from '../Components/Review'

class WelcomeScreen extends Component {
    constructor(props) {
        super(props)
    }

    /**
     * Insert Deplay between Welcome and Project Screen
     */
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate("Project")
        }, 800);
    }

    render() {
        return (
            <View style={styles.container}>
                <MenuButton navigation={this.props.navigation} />
                <Text style={styles.text}>Welcome</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 3,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            fontSize: 30,
        }
    }
)

export default WelcomeScreen;