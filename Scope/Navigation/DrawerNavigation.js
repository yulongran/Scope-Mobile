import React from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    Image,
    SafeAreaView,
    ScrollView
} from 'react-native';
import {createAppContainer} from 'react-navigation'
import {createDrawerNavigator, DrawerNavigatorItems} from 'react-navigation-drawer'
import HomeScreen from '../Screen/HomeScreen';
import SettingScreen from '../Screen/SettingScreen';
import {View, Icon} from 'native-base';
import SJSULOGO from '../assets/SJSU.png'
import { Ionicons } from '@expo/vector-icons';

const WIDTH = Dimensions
    .get('window')
    .width;
const DrawerConfig = {
    drawerWidth: WIDTH *0.83
}

const CustomDrawerComponet = (props) => (
    <SafeAreaView>
        <View style={styles.container}>
            <View style={{
                height: 220
            }}></View>
            <Image source={SJSULOGO} style ={styles.logo}></Image>
            <DrawerNavigatorItems
                {...props}
                activeBackgroundColor = 'white'
                labelStyle={styles.itemStyle} />
        </View>
    </SafeAreaView>

)

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            drawerIcon: (
                <Ionicons name='md-home' size= {32} color= 'blue'/>
            )
        }
    },
    Setting: {
        screen: SettingScreen,
        navigationOptions: {
            drawerIcon: (
                <Ionicons name='ios-settings' size= {32} color= 'blue'/>
            )
        }
    }
}, {
    contentComponent: CustomDrawerComponet
}, DrawerConfig)

const styles = StyleSheet.create({
    container: {
        height: 150,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        height: 120,
        width: 120,
        borderRadius: 10
    },
    itemStyle: {
        fontWeight: 'normal',
        fontSize: 23,
        width: 115,
    }
});

export default createAppContainer(DrawerNavigator)