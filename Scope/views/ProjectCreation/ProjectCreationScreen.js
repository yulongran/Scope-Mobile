import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Dimensions, TextInput, TouchableOpacity, AsyncStorage,
} from 'react-native'
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import { Button } from 'react-native-elements';
import Slider from "react-native-slider";

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;


class ProjectCreationScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project_title: null,
            project_course: null,
            project_institution: null,
            project_startDate: null,
            project_endDate: null,
            milestone: [],
            project_id: null,
            team_size: 0,
        }
    }

    static navigationOptions = {
        title: "Project Creation",
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
     * API call to create a project in the database
     */
    async UpdateUserHasProjectTable() {
        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/project/UpdateUserHasProjectTable',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                    project_id: this.state.project_id,
                },
            })
        if (response.state == 200) {
            return true;
        }
        return false
    }

    /**
     * API call to create a project in the database
     */
    async UpdateMilestoneTable(milestone) {
        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/milestone/addMilestone',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                    project_id: this.state.project_id,
                    milestone_description: milestone.milestone_description,
                    milestone_number: milestone.milestone_number,
                    milestone_startDate: milestone.milestone_startDate,
                    milestone_endDate: milestone.milestone_endDate,

                },
            })
        if (response.state == 200) {
            return true;
        }
        return false
    }


    /**
     * API call to create a project in the database
     */
    async createProject() {
        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/project/projectCreation',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                    project_title: this.state.project_title,
                    project_course: this.state.project_course,
                    project_institution: this.state.project_institution,
                    project_startDate: this.state.project_startDate,
                    project_endDate: this.state.project_endDate,
                    project_description: this.state.project_description,
                },
            })
        if (response.status == 200) {
            let responseJson = await response.json();
            console.log(responseJson)
            this.setState(
                {
                    project_id: responseJson.insertId
                }
            )
            this.UpdateUserHasProjectTable()
            this.state.milestone.forEach(item => {
                this.UpdateMilestoneTable(item)
            })
        }
        return false
    }

    render() {
        return (
            <View className="container" style={styles.containerStyle}>
                <View className="form" style={{ alignItems: 'center', flex: 3 }}>
                    <View className="project_input">
                        <Input
                            label="Project Title"
                            labelStyle={{ alignSelf: 'flex-start', fontFamily: 'Helvetica Neue' }}
                            inputContainerStyle={{ backgroundColor: 'white', borderBottomWidth: 0.6, marginTop: 10 }}
                            containerStyle={{ width: WIDTH, alignItems: 'center', width: WIDTH * 0.9, marginTop: HEIGHT * 0.02 }} />
                    </View>
                    <View className="project_description" style={{ marginTop: HEIGHT * 0.01, }}>
                        <Text style={styles.titleStyle}>Description</Text>
                        <TextInput
                            style={styles.descriptionStyle}
                            onChangeText={(text) => {
                                this.setState(
                                    {
                                        project_description: text,
                                    })
                            }}
                            value={this.state.project_description}
                            multiline={true}
                        ></TextInput>
                    </View>
                    <View style={styles.Slidercontainer}>
                        <Slider
                            value={this.state.team_size}
                            minimumValue={1}
                            maximumValue={50}
                            step={1}
                            onValueChange={value => this.setState({ team_size: value })}
                        />
                        <Text>
                            Number of Team: {this.state.team_size}
                        </Text>
                    </View>
                    <View className="date_picker" style={{ marginTop: HEIGHT * 0.05 }}>
                        <View className="start_date_picker">
                            <Text style={styles.titleStyle}>Start Date</Text>
                            <DatePicker
                                style={styles.datePickerStyle}
                                date={this.state.project_startDate}
                                mode="date"
                                placeholder="Project Begin"
                                format="YYYY-MM-DD"
                                minDate="2000-05-01"
                                maxDate="2100-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateInput: {
                                        borderRadius: 5,
                                    },
                                }}
                                onDateChange={(date) => { this.setState({ project_startDate: date }) }}
                            />
                        </View>
                        <View className="end_date_picker">
                            <Text style={styles.titleStyle}>End Date</Text>
                            <DatePicker
                                style={styles.datePickerStyle}
                                date={this.state.project_endDate}
                                mode="date"
                                placeholder="Project End"
                                format="YYYY-MM-DD"
                                minDate="2000-05-01"
                                maxDate="2100-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateInput: {
                                        borderRadius: 5,
                                    },
                                }}
                                onDateChange={(date) => { this.setState({ project_endDate: date }) }}
                            />
                        </View>
                    </View>
                </View>
                <View className="submit_button" style={{ flex: 1, alignSelf: 'flex-end' }}>
                    <Button
                        title="Submit"
                        type="solid"
                        buttonStyle={styles.submitButtonStyle}
                        onPress={() => {
                            this.createProject()
                        }} />
                </View>
            </View >
        )
    }
}
const styles = StyleSheet.create(
    {
        titleStyle:
        {
            fontSize: WIDTH * 0.037,
            marginTop: HEIGHT * 0.01,
            fontFamily: 'Helvetica Neue',
            color: 'gray',
            fontWeight: 'bold',
            alignSelf: 'flex-start',
        },
        submitButtonStyle:
        {
            width: WIDTH,
        },
        containerStyle:
        {
            height: HEIGHT,
            flexDirection: 'column',
        },
        datePickerStyle:
        {
            width: WIDTH,
            alignItems: 'center',
            width: WIDTH * 0.9,
            marginTop: HEIGHT * 0.010,
        },
        descriptionStyle:
        {
            height: HEIGHT * 0.25,
            borderColor: '#D3D3D3',
            borderWidth: 1,
            borderRadius: WIDTH * 0.02,
            fontSize: WIDTH * 0.04,
            backgroundColor: 'white',
            width: WIDTH * 0.9,
            marginTop: HEIGHT * 0.010,
        },
        Slidercontainer: {
            marginLeft: 10,
            marginRight: 10,
            marginTop: HEIGHT * 0.03,
            alignItems: "stretch",
            justifyContent: "center",
            width: WIDTH * 0.9,
        },
    }
)


export default ProjectCreationScreen;

