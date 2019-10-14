import React from "react";
import {
    Platform,
    Dimensions,
    StyleSheet,
    Image,
    SafeAreaView,
    ScrollView
} from "react-native";
import {createAppContainer} from "react-navigation";
import {createDrawerNavigator, DrawerNavigatorItems} from "react-navigation-drawer";
import HomeScreen from "../Screen/HomeScreen"
import SettingScreen from "../Screen/SettingScreen"
import ProjectScreen from '../Screen/ProjectScreen'
import SearchScreen from '../Screen/SearchScreen'
import ProjectReviewScreen from '../Screen/ProjectReviewScreen'
import ExampleScreen from '../Screen/ExampleScreen'
import Hidden from '../Components/Hidden'
import {View, Icon} from "native-base";
import SJSULOGO from "../assets/SJSU.png";
import {Ionicons} from "@expo/vector-icons";

const WIDTH = Dimensions
    .get("window")
    .width;

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
                labelStyle={styles.itemStyle}/>
        </View>
    </SafeAreaView>
);

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            drawerIcon: <Ionicons name="md-home" size={32} color="blue"/>,
        }
    },
    Project: {
        screen: ProjectScreen,
        navigationOptions: {
            drawerIcon: <Ionicons name="ios-archive" size={32} color="blue"/>
        }
    },
    Search:
    {
        screen: SearchScreen,
        navigationOptions:
        {
            drawerIcon: <Ionicons name="ios-search" size={32} color="blue"/>
        }
    },
    Setting: {
        screen: SettingScreen,
        navigationOptions: {
            drawerIcon: <Ionicons name="ios-settings" size={32} color="blue"/>
        }
    },
    Review:
    {
        screen:ProjectReviewScreen,
        navigationOptions: {
            drawerLabel:<Hidden/>
        }
    },
}, {
    contentComponent: CustomDrawerComponet,
    drawerWidth: WIDTH * 0.83
},);

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
        borderRadius: 10
    },
    itemStyle: {
        fontWeight: "normal",
        fontSize: 23,
        width: 115
    }
});

export default createAppContainer(DrawerNavigator);
