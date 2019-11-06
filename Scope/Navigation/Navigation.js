import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from '../node_modules/react-navigation-tabs';
import React from '../node_modules/react';
import {
    Dimensions,
    StyleSheet,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator } from '../node_modules/react-navigation-stack'
import { Ionicons } from "../node_modules/@expo/vector-icons";
// Views 
import HomeScreen from "../views/SignIn/index";
import SignUpScreen from '../views/SignUp/index';
import ProfileScreen from '../views/Profile/index';
import SearchScreen from '../views/Search/index';
import ProjectScreen from '../views/Project/index';
import TeamScreen from '../views/Team/index';
import ProjectReviewScreen from '../views/ProjectDetail/index';
import EvaluationScreen from "../views/Evaluation/index";
import ProjectCreationScreen from "../views/ProjectCreation/index";
import ProjectJoinScreen from "../views/ProjectJoin/index";





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
                ),
                headerBackground: (
                    <LinearGradient colors={['#3366cc', '#0066ff', '#ffffff']}
                      style={{ flex: 1 }}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }} />
                  ),
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
                //header: null,
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