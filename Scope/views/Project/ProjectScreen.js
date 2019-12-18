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

  /**
   *  Filter out project's title don't contains search input
   * @param {string} text The search input
   */
  filterProject = (text) => {
    const filter = this.state.project.filter(item =>
      item.project_title.includes(text)
    );
    this.setState({
      project: filter,
      search: text
    });
    if (text.length == 0) {
      this.fetchProject();
    }
  }

  componentDidMount() {
    if (!this.state.project && !this.state.projectKeys) {
      this.fetchProject()
    }
  }

  fetchProject = () => {
    const uid = firebase.auth().currentUser.uid;
    if (uid !== null) {
      firebase.database().ref('Users/' + uid).child('Project').on('value', (snapshot) => {
        if (snapshot.val() != null) {
          let project_uid = []
          Object.values(snapshot.val()).forEach((element) => {
            project_uid.push(element.uid)
          })
          this.setState({ projectKeys: Object.values(snapshot.val()) })
          let project_tmp = []
          project_uid.forEach((element) => {
            firebase.database().ref('Project/' + element).once('value', (snapshot) => {
              project_tmp.push(snapshot.val())
            })
          })
          this.setState({ project: project_tmp })
          console.log(this.state.project)
        }
      })
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
              inputStyle={{ fontSize: WIDTH * 0.045, fontFamily: 'Avenir' }}
              inputContainerStyle={styles.searchStyle}
              containerStyle={styles.searchSectionStyle}
              round={true}
              lightTheme={true}
              onChangeText={text => this.filterProject(text)}
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
                  index={index}
                  uid={this.state.projectKeys !== null ? this.state.projectKeys[index].uid : null}
                  onPress={() => {
                    this.props.navigation.navigate("Review", { uid: this.state.projectKeys[index].uid })
                  }}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.state.project != null ? this.state.project : {}}
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
        </View>
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
    position: 2,
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
    width: WIDTH * 0.9,
    height: HEIGHT * 0.05,
    borderRadius: 15,
    borderWidth: 0.6,
    borderBottomWidth: 0.6,
    backgroundColor: 'white',
  },
  searchSectionStyle:
  {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  projectListStyle:
  {
    height: Dimensions.get("window").height * 0.7,
  }
});

export default ProjectScreen;
