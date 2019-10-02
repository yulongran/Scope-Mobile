import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions
} from "react-native";
import MenuButton from "../Components/MenuButton";
import Project from "../Components/Project";

class ProjectScreen extends Component {
  state = {
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

  render() {
    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <View style={styles.sectionStlye}>
          <Text style={styles.textStyle}>Ongoing</Text>
        </View>
        <SafeAreaView
          style={{ height: Dimensions.get("window").height * 0.35 }}
        >
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
    paddingTop: Dimensions.get("window").height * 0.12
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
  title: {
    fontSize: 32
  },
  textStyle: {
    textAlign: "left",
    fontStyle: "italic"
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
  }
});

export default ProjectScreen;
