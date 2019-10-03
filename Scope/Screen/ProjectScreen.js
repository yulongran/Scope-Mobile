import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions
} from "react-native";
import { SearchBar } from "react-native-elements";
import MenuButton from "../Components/MenuButton";
import Project from "../Components/Project";
import { reload } from "expo/build/Updates/Updates";

const PROJECT = [
  {
    projectName: "Scope0",
    courseName: "CS122",
    schoolName: "SJSU",
    startDate: "2019-08-01",
    endDate: "2017-12-01"
  },
  {
    projectName: "Scope",
    courseName: "CS122",
    schoolName: "SJSU",
    startDate: "2019-08-01",
    endDate: "2019-12-01"
  },
  {
    projectName: "Scope1",
    courseName: "CS122",
    schoolName: "SJSU",
    startDate: "2019-08-01",
    endDate: "2019-12-01"
  },
  {
    projectName: "Scope2",
    courseName: "CS122",
    schoolName: "SJSU",
    startDate: "2019-08-01",
    endDate: "2019-12-01"
  },
  {
    projectName: "Scope3",
    courseName: "CS122",
    schoolName: "SJSU",
    startDate: "2019-08-01",
    endDate: "2018-12-01"
  },
  {
    projectName: "Scope4",
    courseName: "CS122",
    schoolName: "SJSU",
    startDate: "2019-08-01",
    endDate: "2018-12-01"
  },
  {
    projectName: "Scope5",
    courseName: "CS122",
    schoolName: "SJSU",
    startDate: "2019-08-01",
    endDate: "2018-12-01"
  },
  {
    projectName: "Scope6",
    courseName: "CS122",
    schoolName: "SJSU",
    startDate: "2019-08-01",
    endDate: "2018-12-01"
  }
];
class ProjectScreen extends Component {
  constructor(props) {
    super(props);
    this.filterProject = this.filterProject.bind(this);
    this.reload = this.reload.bind(this);
  }
  state = {
    search: "",
    Projects: [
      {
        projectName: "Scope0",
        courseName: "CS122",
        schoolName: "SJSU",
        startDate: "2019-08-01",
        endDate: "2017-12-01"
      },
      {
        projectName: "Scope",
        courseName: "CS122",
        schoolName: "SJSU",
        startDate: "2019-08-01",
        endDate: "2019-12-01"
      },
      {
        projectName: "Scope1",
        courseName: "CS122",
        schoolName: "SJSU",
        startDate: "2019-08-01",
        endDate: "2019-12-01"
      },
      {
        projectName: "Scope2",
        courseName: "CS122",
        schoolName: "SJSU",
        startDate: "2019-08-01",
        endDate: "2019-12-01"
      },
      {
        projectName: "Scope3",
        courseName: "CS122",
        schoolName: "SJSU",
        startDate: "2019-08-01",
        endDate: "2018-12-01"
      },
      {
        projectName: "Scope4",
        courseName: "CS122",
        schoolName: "SJSU",
        startDate: "2019-08-01",
        endDate: "2018-12-01"
      },
      {
        projectName: "Scope5",
        courseName: "CS122",
        schoolName: "SJSU",
        startDate: "2019-08-01",
        endDate: "2018-12-01"
      },
      {
        projectName: "Scope6",
        courseName: "CS122",
        schoolName: "SJSU",
        startDate: "2019-08-01",
        endDate: "2018-12-01"
      }
    ]
  };

  getHistoryProject() {
    return (history = this.state.Projects.filter(function(project) {
      return Date.parse(project.endDate) < Date.now();
    }));
  }

  getOngoingProject() {
    return (ongoing = this.state.Projects.filter(function(project) {
      return Date.parse(project.endDate) >= Date.now();
    }));
  }

  filterProject(text) {
    const filter = this.state.Projects.filter(item =>
      item.projectName.includes(text)
    );
    this.setState({
      Projects: filter,
      search: text
    });
  }

  reload() {
    this.setState({
      Projects: PROJECT
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
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
        <View style={styles.sectionStlye}>
          <Text style={styles.textStyle}>Ongoing</Text>
        </View>
        <SafeAreaView style={{ height: Dimensions.get("window").height * 0.3 }}>
          <FlatList
            data={this.getOngoingProject()}
            renderItem={({ item }) => (
              <Project
                projectName={item.projectName}
                courseName={item.courseName}
                schoolName={item.schoolName}
                startDate={item.startDate}
                endDate={item.endDate}
              />
            )}
            numColumns={2}
            extraData={this.state}
          />
        </SafeAreaView>
        <View style={styles.historySectionStlye}>
          <Text style={styles.textStyle}>History</Text>
        </View>
        <SafeAreaView
          style={{ height: Dimensions.get("window").height * 0.35 }}
        >
          <FlatList
            data={this.getHistoryProject()}
            renderItem={({ item }) => (
              <Project
                projectName={item.projectName}
                courseName={item.courseName}
                schoolName={item.schoolName}
                startDate={item.startDate}
                endDate={item.endDate}
              />
            )}
            numColumns={2}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.1
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
  sectionStlye: {
    width: Dimensions.get("window").width * 0.8,
    height: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 1
  },
  historySectionStlye: {
    width: Dimensions.get("window").width * 0.8,
    height: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 1
  },
  searchStyle: {
    width: Dimensions.get("window").width * 0.9,
    marginBottom: 7,
    backgroundColor: "white"
  }
});

export default ProjectScreen;
