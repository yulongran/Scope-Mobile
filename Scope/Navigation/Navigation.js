import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React, { Component } from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    Image,
    SafeAreaView,
    ScrollView
} from "react-native";
import HomeScreen from "../Screen/HomeScreen"
import SettingScreen from "../Screen/SettingScreen"
import ProjectScreen from '../Screen/ProjectScreen'
import SearchScreen from '../Screen/SearchScreen'
import ProjectReviewScreen from '../Screen/ProjectReviewScreen'
import { createDrawerNavigator, DrawerNavigatorItems } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import Hidden from '../Components/Hidden';
import SJSULOGO from "../assets/SJSU.png";
import { View, Icon } from "native-base";



/**
 * Navigation of the App
 * Navigation uses TabNavigationa and wrapps Drawer navigation inside
 */


/**
 * Width of the Device window
 */
const WIDTH = Dimensions
    .get("window")
    .width;

/**
 * Drawer Navigation of the Scope
 * @param {} props 
 */
const CustomDrawerComponet = props => (
    <SafeAreaView>
        <View style={styles.container}>
            <View style={{
                height: 220
            }}></View>
            <Image source={SJSULOGO} style={styles.logo}></Image>
            <DrawerNavigatorItems
                {...props}
                activeBackgroundColor="white"
                labelStyle={styles.itemStyle} />
        </View>
    </SafeAreaView>
);

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            drawerIcon: <Ionicons name="md-home" size={32} color="blue" />,
        }
    },
    Project: {
        screen: ProjectScreen,
        navigationOptions: {
            drawerIcon: <Ionicons name="ios-archive" size={32} color="blue" />
        }
    },
    Search:
    {
        screen: SearchScreen,
        navigationOptions:
        {
            drawerIcon: <Ionicons name="ios-search" size={32} color="blue" />
        }
    },
    Setting: {
        screen: SettingScreen,
        navigationOptions: {
            drawerIcon: <Ionicons name="ios-settings" size={32} color="blue" />
        }
    },
    Review:
    {
        screen: ProjectReviewScreen,
        navigationOptions: {
            drawerLabel: <Hidden />
        }
    },
}, {
    contentComponent: CustomDrawerComponet,
    drawerWidth: WIDTH * 0.83
});

/**
 * TabNavigator of the Scope
 */
const TabNavigator = createBottomTabNavigator(
    {
        Home:
        {
            screen: DrawerNavigator,
            navigationOptions:
            {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor, activeTintColor }) => (
                    <Ionicons name="md-home" size={23} color="#0260F7" />
                )
            },
        },
        Project:
        {
            screen: ProjectScreen,
            navigationOptions:
            {
                tabBarLabel: 'Project',
                tabBarIcon: ({ tintColor, activeTintColor }) => (
                    <Ionicons name="ios-archive" size={22} color="#0260F7" />
                )
            },
        },
        Search:
        {
            screen: SearchScreen,
            navigationOptions:
            {
                tabBarLabel: 'Search',
                tabBarIcon: ({ tintColor, activeTintColor }) => (
                    <Ionicons name="ios-search" size={23} color="#0260F7" />
                )
            },
        },
    },
    {
        tabBarOptions:
        {
            style:
            {
            },
            labelStyle:
            {
                fontSize:13,
                paddingTop:4,
            },
            tabStyle:
            {
                justifyContent:'center',  
                alignContent:'center',
                marginTop:7,
            },
            inactiveTintColor:'black',
            activeTintColor:'#0260F7',
        }
    },

);


/**
 * Style Sheet of Navigation
 */
const styles = StyleSheet.create({
    container: {
        height: 150,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        height: 120,
        width: 120,
        borderRadius: 1
    },
    itemStyle: {
        fontWeight: "normal",
        fontSize: 23,
        width: 115
    }
});


export default createAppContainer(TabNavigator);