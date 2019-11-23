import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Project from "./components/Project/index";
import { Ionicons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import ProjectRequest from '../../services/Project/index';


class ProjectScreen extends Component {

  constructor(props) {
    super(props);
    this.filterProject = this.filterProject.bind(this);
    this.reload = this.reload.bind(this);
    this.handler = this.handler.bind(this);
    this.state = {
      search: "",
      project: [],
      user_identity: 'instructor',
      refresh: true,
    };
  }

  static navigationOptions = {
    title: 'Project',
    headerStyle: {
      backgroundColor: '#005AA7',

    },
    headerTintColor: 'white',
    headerTitleStyle:
    {
      fontFamily: 'Cochin',
      fontSize: 28,
    }

  };



  /**
   * Update the project after project componet call delete API
   * @param {} someValue 
   */
  async handler() {
    let response = await ProjectRequest.fetchProject()
    this.setState(
      {
        project: response
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
  async reload() {
    let response = await ProjectRequest.fetchProject()
    this.setState(
      {
        project: response
      }
    )
  }

  refreshScreen() {
    this.setState(
      {
        refresh: !refresh
      }
    )
  }
  /**
   * Re-render after project had been deleted or updated
   */
  async componentDidMount() {
    let response = await ProjectRequest.fetchProject()
    this.setState(
      {
        project: response
      }
    )
  }

  componentDidUpdate() {

  }
  render() {
    return (
      <View style={styles.container}>
        <View className ="SearchBar" style={styles.searchSectionStyle}>
          <SearchBar
            placeholder="Search"
            showCancel={true}
            inputStyle={{ backgroundColor: "white" }}
            inputContainerStyle={styles.searchStyle}
            containerStyle ={styles.searchSectionStyle}
            lightTheme={true}
            onChangeText={text => this.filterProject(text)}
            value={this.state.search}
            onClear={this.reload}
          />
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
                project_id={item.project_id}
                handler={this.handler}
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
            extraData={this.state}
          />
        </SafeAreaView>
        <View style={styles.historySectionStyle}>
          <Text>Archived</Text>
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
                projet_id={item.project_id}
                handler={this.handler}
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
          />
        </SafeAreaView>
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            if (name == 'add_project') {
              this.props.navigation.navigate("ProjectCreation");
            }
            if (name == 'join_project') {
              this.props.navigation.navigate('ProjectJoinScreen')
            }
          }}
          buttonSize={45}
          color={"#0066ff"}
        />
      </View >
    );
  }

}

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const actions = [
  {
    text: "Add Project",
    icon: <Ionicons name="md-add" size={WIDTH * 0.05} color="white" />,
    name: "add_project",
    position: 2
  },
  {
    text: "Join Project",
    icon: <Ionicons name="md-add" size={WIDTH * 0.05} color="white" />,
    name: "join_project",
    position: 1
  },

];


/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
  // textStyle: {
  //   textAlign: "left",
  //   fontFamily: "Baskerville-SemiBoldItalic"
  // },
  sectionStyle: {
    // width: Dimensions.get("window").width * 0.8,
  },
  historySectionStyle: {
    width: Dimensions.get("window").width * 0.8,
    height: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 1
  },
  searchStyle: {
    width: Dimensions.get("window").width * 0.9,
    height: HEIGHT * 0.05,
    borderRadius: 15,
    borderWidth: 0.6,
    borderBottomWidth: 0.6,
    backgroundColor: 'white',
  },
  searchSectionStyle:
  {
    backgroundColor:'white',
  }
});

export default ProjectScreen;
