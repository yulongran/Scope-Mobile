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
import DatePicker from 'react-native-datepicker'

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
        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons onPress={() =>
                  Alert.alert(
                    'Project information will not be save once exist',
                    '',
                    [
                      {
                        text: 'Yes', onPress: () => {
                          this.closeModal()
                        }
                      },
                      { text: 'No', style: 'cancel' },
                    ],
                    {
                      cancelable: true
                    }
                  )
                }
                  name="md-arrow-round-back" size={32} color="blue" style={{ marginLeft: WIDTH * 0.04 }}></Ionicons>
                <Text style={{ fontSize: WIDTH * 0.06, marginLeft: WIDTH * 0.05 }}>Create a new project</Text>
              </View>

              <View style={{
                marginTop: HEIGHT * 0.01,
                marginLeft: WIDTH * 0.05,
                marginRight: WIDTH * 0.05,
              }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: WIDTH * 0.04, paddingTop: HEIGHT * 0.008, fontWeight: 'bold' }}>Project Title</Text>
                  <TextInput
                    style={{
                      height: HEIGHT * 0.035, borderColor: '#D3D3D3',
                      borderWidth: 1, marginLeft: WIDTH * 0.04,
                      width: WIDTH * 0.5,
                      borderRadius: WIDTH * 0.01,
                      fontSize: WIDTH * 0.04,
                      paddingLeft: WIDTH * 0.02,
                    }}
                    onChangeText={text => this.setState(
                      {
                        modalContent_project_title: text,
                      }
                    )}
                    value={this.state.modalContent_project_title}
                  ></TextInput>
                </View>

                <View>
                  <Text style={{ fontSize: WIDTH * 0.04, paddingTop: HEIGHT * 0.008, fontWeight: 'bold' }}>Project Description</Text>
                  <TextInput
                    style={{
                      fontSize: WIDTH * 0.04,
                      paddingLeft: WIDTH * 0.02,
                      height: HEIGHT * 0.13, borderColor: '#D3D3D3',
                      borderWidth: 1,
                      width: WIDTH * 0.9,
                      borderRadius: WIDTH * 0.01,
                      alignSelf: 'center',
                      marginTop: HEIGHT * 0.01,
                    }}
                    onChangeText={text => this.setState(
                      {
                        modalContent_project_description: text,
                      }
                    )}
                    value={this.state.modalContent_project_description}
                    multiline={true}
                  ></TextInput>
                </View>


              </View>
              <View style={{ flexDirection: 'row', paddingLeft: WIDTH * 0.045, alignContent: 'center', marginTop: HEIGHT * 0.013 }}>
                <Text style={{ fontSize: WIDTH * 0.04, paddingTop: HEIGHT * 0.008, fontWeight: 'bold' }}>Start Date</Text>
                <DatePicker
                  style={{ width: 200, marginLeft: WIDTH * 0.15, borderColor: "white", }}
                  date={this.state.modalContent_project_startDate}
                  mode="date"
                  placeholder="Select Date"
                  format="YYYY-MM-DD"
                  minDate="2000-05-01"
                  maxDate="2100-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(date) => { this.setState({ modalContent_project_startDate: date }) }}
                />
              </View>

              <View style={{ flexDirection: 'row', paddingLeft: WIDTH * 0.045, }}>
                <Text style={{ fontSize: WIDTH * 0.04, paddingTop: HEIGHT * 0.008, fontWeight: 'bold' }}>End Date</Text>
                <DatePicker
                  style={{ width: 200, marginLeft: WIDTH * 0.1748, borderColor: "white" }}
                  date={this.state.modalContent_project_endDate}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate="2000-05-01"
                  maxDate="2100-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(date) => { this.setState({ modalContent_project_endDate: date }) }}
                />
              </View>
              <View style={{ flexDirection: 'row', paddingLeft: WIDTH * 0.045, }}>
                <Text style={{ fontSize: WIDTH * 0.04, paddingTop: HEIGHT * 0.008, fontWeight: 'bold' }}>Milestone</Text>
                <Button
                  onPress={() => {
                    this.state.modalContent_milestone.push({
                      milestone_number: this.state.modalContent_milestone.length + 1,
                      milestone_description: '',
                      milestone_startDate: '',
                      milestone_endDate: '',
                    })
                    this.setState(
                      {
                        modalContent_milestone: this.state.modalContent_milestone
                      })
                  }}
                  icon={
                    <Ionicons name="md-add" size={WIDTH * 0.08} color="black" />
                  }
                  buttonStyle={{ backgroundColor: 'white', marginLeft: WIDTH * 0.7, paddingTop: -HEIGHT * 0.009 }} />
              </View>
              <View name="MilestoneList">
                <FlatList
                  contentContainerStyle={{height: HEIGHT*0.45}}
                  data={this.state.modalContent_milestone}
                  renderItem={({ item }) =>
                    <View style={{ height: HEIGHT * 0.23, borderWidth: 1, }}>
                      <Text style={{
                        padding: Dimensions.get('window').width * 0.025,
                        fontSize: WIDTH * 0.04,
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                      }}>Milestone {item.milestone_number}</Text>
                      <Text style={{ marginLeft: WIDTH * 0.06 }}>Description</Text>
                      <TextInput
                        style={{
                          fontSize: WIDTH * 0.04,
                          paddingLeft: WIDTH * 0.02,
                          paddingRight: WIDTH * 0.02,
                          height: HEIGHT * 0.1, borderColor: '#D3D3D3',
                          borderWidth: 1,
                          width: WIDTH * 0.9,
                          borderRadius: WIDTH * 0.01,
                          alignSelf: 'center',
                          marginTop: HEIGHT * 0.01,
                        }}
                        onChangeText={(text) => {
                          const copy = this.state.modalContent_milestone
                          copy[item.milestone_number - 1].milestone_description = text
                          this.setState(
                            {
                              modalContent_milestone: copy
                            }
                          )
                        }
                        }
                        value={this.state.modalContent_milestone[item.milestone_number - 1].milestone_description}
                        multiline={true}
                      ></TextInput>
                      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{marginLeft: WIDTH*0.06, flexDirection:'row', alignItems: 'center'}}>
                          <Text>Start Date</Text>
                          <DatePicker
                            style={{ width: 100, marginLeft: WIDTH * 0.015, borderColor: "white" }}
                            date={this.state.modalContent_project_endDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2000-05-01"
                            maxDate="2100-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            onDateChange={(date) => { this.setState({ modalContent_project_endDate: date }) }}
                          />
                        </View>
                        <View style={{marginLeft: WIDTH*0.06, flexDirection:'row', alignItems: 'center'}}>
                          <Text>End Date</Text>
                          <DatePicker
                            style={{ width: 100, marginLeft: WIDTH * 0.03, borderColor: "white" }}
                            date={this.state.modalContent_project_endDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2000-05-01"
                            maxDate="2100-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            onDateChange={(date) => { this.setState({ modalContent_project_endDate: date }) }}
                          />
                        </View>

                      </View>
                    </View>
                  }
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={1}
                  extraData={this.state}>
                </FlatList>
              </View>
              <Button
                onPress={() => this.closeModal()}
                title="Submit"
              >
              </Button>
            </View>
          </View>
        </Modal>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'center' }}>
          <MenuButton navigation={this.props.navigation} />
          <Button
            onPress={() => {
              this.setState(
                {
                  modalVisible: true,
                }
              )
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
                projectName={item.projectName}
                courseName={item.courseName}
                schoolName={item.schoolName}
                startDate={item.project_startDate}
                endDate={item.project_endDate}
                description={item.description}
                onPress={() => {
                  if (this.state.user_identity == 'student') {
                    this.props.navigation.navigate("Review", { project: item })
                  }
                  else {
                    this.props.navigation.navigate("Team", { project: item })
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: HEIGHT * 0.06,
  },
  innerContainer: {
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
