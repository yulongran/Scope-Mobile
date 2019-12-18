import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import {
    Dimensions,
    StyleSheet,
} from "react-native";
import { createStackNavigator } from 'react-navigation-stack'
import { Ionicons } from "@expo/vector-icons";
// Views 
import ProfileScreen from '../views/Profile/index';
import SearchScreen from '../views/Search/index';
import ProjectScreen from '../views/Project/index';
import TeamScreen from '../views/Team/index';
import ProjectReviewScreen from '../views/ProjectDetail/index';
import EvaluationScreen from "../views/Evaluation/index";
import ProjectCreationScreen from "../views/ProjectCreation/index";
import ProjectJoinScreen from "../views/ProjectJoin/index";
import MilestoneCreationScreen from '../views/MilestoneCreation/index';





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
            navigationOptions: () => ({
                headerBackTitle: null,
            }),
        },
        Team:
        {
            screen: TeamScreen,
            navigationOptions: () => ({
                headerBackTitle: null,
            }),

        },
        Review:
        {
            screen: ProjectReviewScreen,
            navigationOptions: () => ({
                headerBackTitle: null,
            }),
        },
        MilestoneCreationScreen:
        {
            screen: MilestoneCreationScreen,
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
            screen: EvaluationScreen,
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
                tabBarLabel: 'PROJECT',
                tabBarIcon: ({ tintColor, activeTintColor }) => (
                    <Ionicons name="ios-archive" size={22} color={tintColor} />
                ),
                labelStyle: {
                    fontSize: 12,
                    fontFamily: 'Avenir',
                },
            },
        },
        Search:
        {
            screen: SearchScreen,
            navigationOptions:
            {
                tabBarLabel: 'SEARCH',
                tabBarIcon: ({ tintColor, activeTintColor }) => (
                    <Ionicons name="ios-search" size={23} color={tintColor} />
                ),

            },
        },
        Profile:
        {
            screen: ProfileScreen,
            navigationOptions:
            {
                tabBarLabel: 'PROFILE',
                tabBarIcon: ({ tintColor, activeTintColor }) => (
                    <Ionicons name="md-people" size={25} color={tintColor} />
                )
            },
        },
    },
    {
        tabBarOptions:
        {
            style:
            {
                backgroundColor: '#3F5AA6',
            },
            labelStyle:
            {
                fontSize: 13,
                marginTop: 5,
            },
            tabStyle:
            {
                justifyContent: 'center',
                alignContent: 'center',
                marginTop: 9,
            },
            inactiveTintColor: '#BACAFF',
            activeTintColor: 'white',
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