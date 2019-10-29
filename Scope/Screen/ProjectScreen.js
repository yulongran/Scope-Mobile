import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Button } from 'react-native-elements';
import MenuButton from "../Components/MenuButton";
import Project from "../Components/Project";
import { reload } from "expo/build/Updates/Updates";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./HomeScreen";
import ProjectReviewScreen from "./ProjectReviewScreen";
import SearchScreen from "./SearchScreen";
import RedirectScreen from '../Screen/RedirectScreen';
import { AsyncStorage } from 'react-native';
import deviceStorage from "../Components/deviceStorage";
import { Ionicons } from "@expo/vector-icons";

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

class ProjectScreen extends Component {

  /**
   * Remove Stack Navigation header
   */
  static navigationOptions = {
    header: null,
    headerBackTitle: null,
  }
  constructor(props) {
    super(props);
    this.filterProject = this.filterProject.bind(this);
    this.reload = this.reload.bind(this);
  }
  state = {
    search: "",
    project: [],
    user_identity: 'instructor',
    refresh: true,
    modalVisible: false,
    modalContent_project_title: '',
    modalContent_project_course: '',
    modalContent_project_institution: '',
    modalContent_project_startDate: '',
    modalContent_project_endDate: '',
    modalContent_milestone: [
    ],
  };


  closeModal() {
    this.setState(
      {
        modalVisible: false,
      }
    )
  }
  /**
   *  Get an array of project which due date is before today's date
   */
  getHistoryProject() {
    return (history = this.state.project.filter(function (project) {
      return Date.parse(project.project_endDate) < Date.now();
    }));
  }

  /**
   *  Get an array of project which due date is after today's date
   */
  getOngoingProject() {
    return (ongoing = this.state.project.filter(function (project) {
      return Date.parse(project.project_endDate) >= Date.now();
    }));
  }

  /**
   *  Filter out project's projectName don't contains search input
   * @param {string} text the search input
   */
  filterProject(text) {
    const filter = this.state.project.filter(item =>
      item.project_title.includes(text)
    );
    this.setState({
      project: filter,
      search: text
    });

    if (text.length == 0) {
      this.reload();
    }
  }


  /**
   * Reload project from database
   */
  reload() {
    this.fetchProject()
  }

  async fetchProject() {
    const token = await AsyncStorage.getItem('id_token');
    if (!token) {
      return false;
    }
    let response = await fetch('http://localhost:8001/project/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          auth_token: token,
          project_id: this.state.project.project_id
        },
      })
    let responseJson = await response.json();
    this.setState(
      {
        project: responseJson
      }
    )
    return true

  }

  refreshScreen() {
    this.setState(
      {
        refresh: !refresh
      }
    )
  }

  showAddProjectModal() {

  }

  componentDidMount() {
    this.fetchProject()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center' }}>
          <MenuButton navigation={this.props.navigation} />
          <Button
            onPress={() => {
              this.props.navigation.navigate("ProjectCreation")
            }}
            icon={
              <Ionicons name="md-add" size={WIDTH * 0.08} color="black" />
            }
            buttonStyle={{ backgroundColor: 'white', marginLeft: WIDTH * 0.7, paddingTop: -HEIGHT * 0.009 }} />
        </View>
        <SearchBar
          placeholder="Search"
          showCancel={true}
          inputStyle={{ backgroundColor: "white" }}
          inputContainerStyle={{ backgroundColor: "white" }}
          containerStyle={styles.searchStyle}
          lightTheme={true}
          onChangeText={text => this.filterProject(text)}
          value={this.state.search}
          onClear={this.reload}
        />
        <View style={styles.sectionStyle}>
          <Text style={styles.textStyle}>Ongoing</Text>
        </View>
        <SafeAreaView style={{ height: Dimensions.get("window").height * 0.35 }}>
          <FlatList
            data={this.getOngoingProject()}
            renderItem={({ item }) => (
              <Project
                projectName={item.project_title}
                courseName={item.project_course}
                schoolName={item.project_institution}
                startDate={item.project_startDate}
                endDate={item.project_endDate}
                onPress={() => {
                  if (this.state.user_identity == 'student') {
                    this.props.navigation.navigate("Review", { project: item, refreshScreen: this.refreshScreen })
                  }
                  else {
                    this.props.navigation.navigate("Team", { project: item, refreshScreen: this.refreshScreen })
                  }
                }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            extraData={this.state}
          />
        </SafeAreaView>
        <View style={styles.historySectionStyle}>
          <Text style={styles.textStyle}>History</Text>
        </View>
        <SafeAreaView
          style={{ height: Dimensions.get("window").height * 0.35, flexGrow: 1 }}
        >
          <FlatList
            data={this.getHistoryProject()}
            renderItem={({ item }) => (
              <Project
                projectName={item.project_title}
                courseName={item.project_course}
                schoolName={item.project_institution}
                startDate={item.project_startDate}
                endDate={item.project_endDate}
                onPress={() => {
                  if (this.state.user_identity == 'student') {
                    this.props.navigation.navigate("Review", { project: item, refreshScreen: this.refreshScreen })
                  }
                  else {
                    this.props.navigation.navigate("Team", { project: item, refreshScreen: this.refreshScreen })
                  }
                }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        </SafeAreaView>
      </View >
    );
  }

}

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: HEIGHT * 0.06,
  },
  listStyle: {
    backgroundColor: "#fff"
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  textStyle: {
    textAlign: "left",
    fontStyle: "italic",
    fontFamily: "Georgia"
  },
  sectionStyle: {
    width: Dimensions.get("window").width * 0.8,
    height: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  historySectionStyle: {
    width: Dimensions.get("window").width * 0.8,
    height: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 1
  },
  searchStyle: {
    width: Dimensions.get("window").width * 0.9,
    marginBottom: 7,
    backgroundColor: "white",
    marginTop: Dimensions.get("window").height * 0.004,

  },
});

/**
 * Screen Navigation
 */

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Review: {
    screen: ProjectReviewScreen
  }
});

export default ProjectScreen;
