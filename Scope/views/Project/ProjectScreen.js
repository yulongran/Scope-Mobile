import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Project from "./components/Project/index";
import { Ionicons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import firebase from 'react-native-firebase';


class ProjectScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      project: null,
      projectKeys: null,
      search: '',
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Project',
      headerStyle:
      {
        // borderBottomColor: '#EBEEF7',
        // borderWidth: 1,
      },
      headerTintColor: '#192A59',
      headerTitleStyle:
      {
        fontFamily: 'Avenir',
        fontSize: 28,
        textAlign: 'left',
        flex: 1,
        marginLeft: 30,
        fontWeight: '900',
      },
    };
  }

  componentDidMount() {
    this.fetchProject()
  }

  fetchProject = () => {
    const uid = firebase.auth().currentUser.uid;
    if (uid !== null && !this.state.project && !this.state.projectKeys) {
      firebase.database().ref('Project/' + uid).on('value', (snapshot) => {
        this.setState({ project: Object.values(snapshot.val()) })
        this.setState({ projectKeys: Object.keys(snapshot.val()) })
      });
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View className="SearchBar" style={styles.searchSectionStyle}>
            <SearchBar
              placeholder="Search"
              showCancel={true}
              inputStyle={{ backgroundColor: "white" }}
              inputContainerStyle={styles.searchStyle}
              containerStyle={styles.searchSectionStyle}
              lightTheme={true}
              // onChangeText={text => this.filterProject(text)}
              value={this.state.search}
              onClear={() => { }}
            />
          </View>
          <View style={styles.projectListStyle}>
            <FlatList
              data={this.state.project}
              renderItem={({ item, index }) => (
                <Project
                  project_title={item.project_title}
                  project_course={item.project_course}
                  project_startDate={item.project_startDate}
                  project_endDate={item.project_endDate}
                  uid={this.state.projectKeys !== null ? this.state.projectKeys[index] : null}
                  onPress={() => {
                    this.props.navigation.navigate("Review")
                  }}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.state.project}
            />
          </View>
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
            color={"#3F5AA6"}
          />
        </View >
      </SafeAreaView>
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
  ArchivedStye:
  {
    fontFamily: 'Avenir',
    fontWeight: '800',
    fontSize: WIDTH * 0.05,
    color: '#3F5AA6',
    marginLeft: WIDTH * 0.02
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
    backgroundColor: 'white',
  },
  projectListStyle:
  {
    // height: Dimensions.get("window").height * 0.7,
  }
});

export default ProjectScreen;
