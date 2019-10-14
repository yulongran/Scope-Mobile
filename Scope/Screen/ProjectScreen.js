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
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./HomeScreen";
import ProjectReviewScreen from "./ProjectReviewScreen";

const PROJECT = [
  {
    projectName: "Sample Project",
    courseName: "CS122",
    schoolName: "SJSU",
    startDate: "2018-08-01",
    endDate: "2019-12-01",
    description: " Angular is a rewrite of AngularJS. It focuses on good mobile development, modularity, and improved dependency injection. Angular is designed to comprehensively address a developer's web application workflow",
    review: [
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "David",
        keyWord: "Meet on Time",

      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom",
        keyWord: "Reliable",
      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom"
      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom"
      },
    ]
  },
  {
    projectName: "E-commerce web application",
    courseName: "CS122",
    schoolName: "SJSU",
    startDate: "2019-08-01",
    endDate: "2019-12-01",
    description: " Angular is a rewrite of AngularJS. It focuses on good mobile development, modularity, and improved dependency injection. Angular is designed to comprehensively address a developer's web application workflow",
    review: [
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "David",
        keyWord: "Meet on Time",

      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom",
        keyWord: "Reliable",
      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom"
      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom"
      },
    ]
  },
  {
    projectName: "CS100W-Project",
    courseName: "CS100W",
    schoolName: "SJSU",
    startDate: "2019-08-01",
    endDate: "2019-12-01",
    description: " Angular is a rewrite of AngularJS. It focuses on good mobile development, modularity, and improved dependency injection. Angular is designed to comprehensively address a developer's web application workflow",
    review: [
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "David",
        keyWord: "Meet on Time",

      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom",
        keyWord: "Reliable",
      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom"
      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom"
      },
    ]
  },
  {
    projectName: "CS47A-Project",
    courseName: "CS47A",
    schoolName: "SJSU",
    startDate: "2017-04-10",
    endDate: "2018-12-01",
    description: " Angular is a rewrite of AngularJS. It focuses on good mobile development, modularity, and improved dependency injection. Angular is designed to comprehensively address a developer's web application workflow",
    review: [
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "David",
        keyWord: "Meet on Time",

      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom",
        keyWord: "Reliable",
      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom"
      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom"
      },
    ]
  },
  {
    projectName: "Data Structure and Algorithm",
    courseName: "CS146A",
    schoolName: "SJSU",
    startDate: "2017-10-01",
    endDate: "2018-12-01",
    description: " Angular is a rewrite of AngularJS. It focuses on good mobile development, modularity, and improved dependency injection. Angular is designed to comprehensively address a developer's web application workflow",
    review: [
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "David",
        keyWord: "Meet on Time",

      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom",
        keyWord: "Reliable",
      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom"
      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom"
      },
    ]
  },
  {
    projectName: "DataBase Project",
    courseName: "CS42B",
    schoolName: "SJSU",
    startDate: "2017-08-01",
    endDate: "2018-12-01",
    description: " Angular is a rewrite of AngularJS. It focuses on good mobile development, modularity, and improved dependency injection. Angular is designed to comprehensively address a developer's web application workflow",
    review: [
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "David",
        keyWord: "Meet on Time",

      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom",
        keyWord: "Reliable",
      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom"
      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom"
      },
    ]
  },
  {
    projectName: "CS46A-Project",
    courseName: "CS46A",
    schoolName: "SJSU",
    startDate: "2017-08-01",
    endDate: "2018-12-01",
    description: " Angular is a rewrite of AngularJS. It focuses on good mobile development, modularity, and improved dependency injection. Angular is designed to comprehensively address a developer's web application workflow",
    review: [
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "David",
        keyWord: "Meet on Time",

      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom",
        keyWord: "Reliable",
      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom"
      },
      {
        review:
          "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
        author: "Tom"
      },
    ]
  },

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
        projectName: "Sample Project",
        courseName: "CS122",
        schoolName: "SJSU",
        startDate: "2018-08-01",
        endDate: "2019-12-01",
        description: " Angular is a rewrite of AngularJS. It focuses on good mobile development, modularity, and improved dependency injection. Angular is designed to comprehensively address a developer's web application workflow",
        review: [
          {
            review:
              "He ensures coworkers coordinate to meet deadlines and work effectively as a team and He will do whatever is necessary to get the job done, even taking on extra tasks that are not his own.",
            author: "David",
            keyWord: "Meet on Time",

          },
          {
            review:
              "He is not a willing team player and prefers to work individually ",
            author: "Tom",
            keyWord: "Unreliable",
          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom"
          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom"
          },
        ]
      },
      {
        projectName: "E-commerce web application",
        courseName: "CS122",
        schoolName: "SJSU",
        startDate: "2019-08-01",
        endDate: "2019-12-01",
        description: " Angular is a rewrite of AngularJS. It focuses on good mobile development, modularity, and improved dependency injection. Angular is designed to comprehensively address a developer's web application workflow",
        review: [
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "David",
            keyWord: "Meet on Time",

          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom",
            keyWord: "Reliable",
          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom"
          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom"
          },
        ]
      },
      {
        projectName: "CS100W-Project",
        courseName: "CS100W",
        schoolName: "SJSU",
        startDate: "2019-08-01",
        endDate: "2019-12-01",
        description: " Angular is a rewrite of AngularJS. It focuses on good mobile development, modularity, and improved dependency injection. Angular is designed to comprehensively address a developer's web application workflow",
        review: [
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "David",
            keyWord: "Meet on Time",

          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom",
            keyWord: "Reliable",
          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom"
          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom"
          },
        ]
      },
      {
        projectName: "CS47A-Project",
        courseName: "CS47A",
        schoolName: "SJSU",
        startDate: "2017-04-10",
        endDate: "2018-12-01",
        description: " Angular is a rewrite of AngularJS. It focuses on good mobile development, modularity, and improved dependency injection. Angular is designed to comprehensively address a developer's web application workflow",
        review: [
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "David",
            keyWord: "Meet on Time",

          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom",
            keyWord: "Reliable",
          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom"
          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom"
          },
        ]
      },
      {
        projectName: "Data Structure and Algorithm",
        courseName: "CS146A",
        schoolName: "SJSU",
        startDate: "2017-10-01",
        endDate: "2018-12-01",
        description: " Angular is a rewrite of AngularJS. It focuses on good mobile development, modularity, and improved dependency injection. Angular is designed to comprehensively address a developer's web application workflow",
        review: [
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "David",
            keyWord: "Meet on Time",

          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom",
            keyWord: "Reliable",
          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom"
          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom"
          },
        ]
      },
      {
        projectName: "DataBase Project",
        courseName: "CS42B",
        schoolName: "SJSU",
        startDate: "2017-08-01",
        endDate: "2018-12-01",
        description: " Angular is a rewrite of AngularJS. It focuses on good mobile development, modularity, and improved dependency injection. Angular is designed to comprehensively address a developer's web application workflow",
        review: [
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "David",
            keyWord: "Meet on Time",

          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom",
            keyWord: "Reliable",
          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom"
          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom"
          },
        ]
      },
      {
        projectName: "CS46A-Project",
        courseName: "CS46A",
        schoolName: "SJSU",
        startDate: "2017-08-01",
        endDate: "2018-12-01",
        description: " Angular is a rewrite of AngularJS. It focuses on good mobile development, modularity, and improved dependency injection. Angular is designed to comprehensively address a developer's web application workflow",
        review: [
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "David",
            keyWord: "Meet on Time",

          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom",
            keyWord: "Reliable",
          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom"
          },
          {
            review:
              "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
            author: "Tom"
          },
        ]
      },

    ]
  };

  /**
   *  Get an array of project which due date is before today's date
   */
  getHistoryProject() {
    return (history = this.state.Projects.filter(function (project) {
      return Date.parse(project.endDate) < Date.now();
    }));
  }

  /**
   *  Get an array of project which due date is after today's date
   */
  getOngoingProject() {
    return (ongoing = this.state.Projects.filter(function (project) {
      return Date.parse(project.endDate) >= Date.now();
    }));
  }

  /**
   *  Filter out project's projectName don't contains search input
   * @param {string} text the search input
   */
  filterProject(text) {
    const filter = this.state.Projects.filter(item =>
      item.projectName.includes(text)
    );
    this.setState({
      Projects: filter,
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
        <SafeAreaView style={{ height: Dimensions.get("window").height * 0.35 }}>
          <FlatList
            data={this.getOngoingProject()}
            renderItem={({ item }) => (
              <Project
                projectName={item.projectName}
                courseName={item.courseName}
                schoolName={item.schoolName}
                startDate={item.startDate}
                endDate={item.endDate}
                onPress={() =>
                  this.props.navigation.navigate("Review", { review: item })
                }
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            extraData={this.state}
          />
        </SafeAreaView>
        <View style={styles.historySectionStlye}>
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
                startDate={item.startDate}
                endDate={item.endDate}
                description={item.description}
                onPress={() =>
                  this.props.navigation.navigate("Review", { review: item })
                }
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        </SafeAreaView>
      </View>
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
    backgroundColor: "white",
    marginTop: Dimensions.get("window").height * 0.03,
  }
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
