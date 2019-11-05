import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, AsyncStorage, Alert } from 'react-native'
import ProfilePic from '../assets/images/profile_default.jpg'
import MenuButton from '../Components/MenuButton'
import BackArrow from '../Components/BackArrow'

import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { SearchBar } from "react-native-elements";
import Project from "../Components/Project";

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
class ProjectJoinScreen extends Component {


    /**
     * Config Stack Navigator Header
    */
    static navigationOptions = {
        title: 'Add Project'
    };

    constructor(props) {
        super(props)
    }

    state =
        {
            project_id: '',
            project: undefined,
        }

    async fetchProjectInfo() {

        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/project/projectByID',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                    project_id: this.state.project_id
                },
            })
        let responseJson = await response.json();
        this.setState(
            {
                project: responseJson[0]
            }
        )
        return true

    }

    fetchProject(id) {
        this.setState(
            {
                project_id: id,
            }
        )
        this.fetchProjectInfo()
    }

    /**
     * Join Project
     * Update UserHasProject Table
     */
    async joinProject() {
        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/project//UpdateUserHasProjectTable',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                    project_id: this.state.project_id
                },
            })
        responseText = await response.text()
        return true
    }

    render() {
        return (
            <View>
                <View name="SearchSection" style={styles.searchStyle}>
                    <SearchBar
                        placeholder="Enter Your Project ID"
                        showCancel={true}
                        inputStyle={{ backgroundColor: "white" }}
                        inputContainerStyle={{ backgroundColor: "white", alignSelf: 'center' }}
                        containerStyle={styles.searchBarStyle}
                        lightTheme={true}
                        onChangeText={(text) => {
                            this.fetchProject(text)
                            this.fetchProjectInfo()
                        }}
                        value={this.state.project_id}
                        onClear={this.reload}
                    />
                </View>
                <View name="ProjectSection" style={{ alignItems: 'center' }}>
                    {this.state.project && <TouchableOpacity onPress={() => {
                        Alert.alert(
                            'Join Project',
                            '',
                            [
                                {
                                    text: 'Join',
                                    onPress: () => { this.joinProject() },
                                },
                                {
                                    text: 'Cancel',
                                    onPress: () => { },
                                    style: 'cancel',
                                },
                            ],
                            { cancelable: false },
                        );
                    }}>
                        <View style={styles.containerStyle}>
                            <View style={styles.ViewStyle} >
                                <Text style={styles.ProjectNameStyle}>{this.state.project.project_title}</Text>
                                <Text style={styles.CourseStyle}>{this.state.project.project_course} {this.state.project.project_institution}</Text>
                                <Text style={styles.startDateStyle}>Start {this.state.project.project_startDate.slice(0, 10)}</Text>
                                <Text style={styles.endDateStyle}>End {this.state.project.project_endDate.slice(0, 10)}</Text>
                            </View>

                        </View>
                    </TouchableOpacity>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        searchStyle:
        {
            alignItems: 'center',
            justifyContent: 'center',
            padding: WIDTH * 0.05,
            backgroundColor: '#1b14a8',
        },
        searchBarStyle:
        {
            height: HEIGHT * 0.06,
            width: WIDTH * 0.8,
            backgroundColor: 'white',
            borderRadius: WIDTH * 0.015,
        },
        containerStyle:
        {
            width: WIDTH,
            height: HEIGHT * 0.15,
            borderColor: 'blue',
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 1,
            alignContent: 'center',
            justifyContent: 'center',
        },
        ViewStyle: {
            alignContent: 'center',
            justifyContent: 'center',
        },
        ProjectNameStyle: {
            paddingTop: 7,
            color: 'blue',
            fontStyle: 'italic',
            fontWeight: 'bold',
            textAlign: 'center'
        },
        CourseStyle: {
            textAlign: 'center',
            paddingTop: HEIGHT * 0.01,
        },
        startDateStyle: {
            paddingTop: HEIGHT * 0.001,
            textAlign: 'center',
            fontSize: 12
        },
        endDateStyle: {
            textAlign: 'center',
            fontSize: 12
        }

    }

)


export default ProjectJoinScreen;