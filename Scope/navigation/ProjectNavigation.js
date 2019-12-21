import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import {
    Dimensions,
    StyleSheet,
} from "react-native";
import { createStackNavigator } from 'react-navigation-stack'
import { Icon } from 'react-native-elements';
// Views 
import ProfileScreen from '../views/Profile/index';
import SearchScreen from '../views/Search/index';
import ProjectScreen from '../views/Project/index';
import ProjectReviewScreen from '../views/ProjectDetail/index';
import EvaluationScreen from "../views/Evaluation/index";
import ProjectCreationScreen from "../views/ProjectCreation/index";
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
        },
        Review:
        {
            screen: ProjectReviewScreen,
        },
        MilestoneCreationScreen:
        {
            screen: MilestoneCreationScreen,
        },
        ProjectCreation:
        {
            screen: ProjectCreationScreen,
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
                    <Icon name="ios-document" type='ionicon' size={22} color={tintColor} />
                ),
            },
        },
        Search:
        {
            screen: SearchScreen,
            navigationOptions:
            {
                tabBarLabel: 'SEARCH',
                tabBarIcon: ({ tintColor, activeTintColor }) => (
                    <Icon name="ios-search" type='ionicon' size={23} color={tintColor} />
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
                    <Icon name="md-people" type='ionicon' size={25} color={tintColor} />
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
                fontSize: WIDTH*0.035,
            },
            tabStyle:
            {
                justifyContent: 'center',
                alignContent: 'center',
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