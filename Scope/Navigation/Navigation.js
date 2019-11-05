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
import SearchScreen from '../Screen/SearchScreen';
import ProjectReviewScreen from '../Screen/ProjectReviewScreen';
import SignUpScreen from '../Screen/SignUpScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import TeamScreen from '../Screen/TeamScreen';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import Hidden from '../Components/Hidden';
import SJSULOGO from "../assets/images/SJSU.png";
import { View, Icon } from "native-base";
import ProjectCreationScreen from "../Screen/ProjectCreationScreen";
import ProjectJoinScreen from "../Screen/ProjectJoinScreen";
import EvaluationScreen from "../Screen/EvaluationScreen";
import RedirectScreen from '../Screen/RedirectScreen'



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
 * Stack Navigator
 * @param {*} props 
 */

const Stack = createStackNavigator(
    {
        Project:
        {
            screen: ProjectScreen,

        },
        Team:
        {
            screen: TeamScreen,
        },
        Review:
        {
            screen: ProjectReviewScreen,
        },
        ProjectCreation:
        {
            screen: ProjectCreationScreen,
        },
        ProjectJoinScreen:
        {
            screen: ProjectJoinScreen
        },
        EvaluationScreen:
        {
            screen: EvaluationScreen
        },


    },
    {
        initialRouteName: 'Project',
    },

)



/**
* TabNavigator of the Scope
*/
const TabNavigator = createBottomTabNavigator(
    {
        Project:
        {
            screen: Stack,
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
        Profile:
        {
            screen: ProfileScreen,
            navigationOptions:
            {
                tabBarLabel: 'Profile',
                tabBarIcon: ({ tintColor, activeTintColor }) => (
                    <Ionicons name="md-people" size={23} color="#0260F7" />
                )
            },
        }
    },
    {
        tabBarOptions:
        {
            style:
            {
            },
            labelStyle:
            {
                fontSize: 13,
                paddingTop: 4,
            },
            tabStyle:
            {
                justifyContent: 'center',
                alignContent: 'center',
                marginTop: 7,
            },
            inactiveTintColor: 'black',
            activeTintColor: '#0260F7',
        }
    },

);

const Main_Stack = createStackNavigator(
    {
        Home:
        {
            screen: HomeScreen,
            navigationOptions: {
                header: null,
            }

        },
        SignUp:
        {
            screen: SignUpScreen,
            navigationOptions: {
                header: null,
            }
        },
        Main:
        {
            screen: TabNavigator,
            navigationOptions: {
                header: null,
            }
        },

    },
    {
        initialRouteName: 'Main',
    },

)



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


export default createAppContainer(Main_Stack);