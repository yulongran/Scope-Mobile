import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import MenuButton from '../Components/MenuButton'

class HomeScreen extends Component 
{
    render()
    {
        return(
            <View style = {styles.container}>
                <MenuButton navigation = {this.props.navigation}/>
                <Text style = {styles.text}>Home</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex:3,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent :'center',
        },
        text: {
            fontSize: 30,
        }
    }
)

export default HomeScreen;