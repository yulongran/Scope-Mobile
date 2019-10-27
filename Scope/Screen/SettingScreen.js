import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import MenuButton from '../Components/MenuButton'

// Testing purpose: delete after
import {Review} from '../Components/Review'

class SettingScreen extends Component 
{
    render()
    {
        return(
            <View style = {styles.container}>
                 <MenuButton navigation = {this.props.navigation}/>
                <Text style = {styles.text}>Settings</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex:3,
            backgroundColor: '#fff',
        },
        text: {
            fontSize: 30,
            textAlign:'center',
            alignSelf:'center',
        }
    }
)

export default SettingScreen;