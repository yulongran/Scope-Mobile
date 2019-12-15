import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Dimensions, SafeAreaView, TextInput
} from 'react-native'
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native-elements';
import firebase from 'react-native-firebase';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;


class ProjectCreationScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project_title: null,
            project_course: null,
            project_description: null,
            project_startDate: null,
            project_endDate: null,
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Project Creation',
            headerTintColor: '#192A59',
            headerTitleStyle:
            {
                fontFamily: 'Avenir',
                fontSize: WIDTH * 0.06,
                textAlign: 'center',
                flex: 1,
                fontWeight: '900',
            },
        };
    }

    onSubmitPress = () => {
        const uid = firebase.auth().currentUser.uid;
        if (uid != null) {
            const project = firebase.database().ref('Project')
            project.push(
                {
                    project_title: this.state.project_title,
                    project_course: this.state.project_course,
                    project_description: this.state.project_description,
                    project_startDate: this.state.project_startDate,
                    project_endDate: this.state.project_endDate,
                }).then((data) => {
                    firebase.database().ref('Project/' + data.path.split('/')[1]).child('Users').push(
                        {
                            uid: uid
                        },
                        firebase.database().ref('Users/' + uid).child('Project').push(
                            {
                                uid: data.path.split('/')[1]
                            }
                        )
                    )

                    this.props.navigation.navigate("Project")
                })
        }
    }

    render() {
        return (
            <SafeAreaView>
                <View className="form" style={styles.inputWraperStyle}>
                    <View className="project_input">
                        <Input
                            label="Project Title"
                            labelStyle={styles.labelStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            containerStyle={styles.inputOutterContainerStyle}
                            inputStyle={{ fontFamily: 'Avenir', color: '#3F5AA6' }}
                            onChangeText={(value) => {
                                this.setState({ project_title: value })
                            }} />
                    </View>
                    <View className="course_input">
                        <Input
                            label="Course"
                            labelStyle={styles.labelStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            containerStyle={styles.inputOutterContainerStyle}
                            inputStyle={{ fontFamily: 'Avenir', color: '#3F5AA6' }}
                            onChangeText={(value) => {
                                this.setState({ project_course: value })
                            }} />
                    </View>
                    <View className="project_description" style={styles.inputOutterContainerStyle}>
                        <Text style={styles.labelStyle}>Description</Text>
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
                    <View className="date_picker" style={styles.inputOutterContainerStyle}>
                        <View className="start_date_picker">
                            <Text style={styles.labelStyle}>Start Date</Text>
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
                        <View className="end_date_picker" style={{ marginTop: HEIGHT * 0.01 }}>
                            <Text style={styles.labelStyle}>End Date</Text>
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
                                        borderColor: '#BDCDD1',
                                    },
                                }}
                                onDateChange={(date) => { this.setState({ project_endDate: date }) }}
                            />
                        </View>
                    </View>
                </View>
                <View className="submit_button" style={{ alignSelf: 'stretch' }}>
                    <Button
                        title="SUBMIT"
                        type="solid"
                        buttonStyle={styles.submitButtonStyle}
                        onPress={this.onSubmitPress}
                        disabled={this.state.project_course == null || this.state.project_description === null
                            || this.state.project_title == null || this.state.project_startDate == null || this.state.project_endDate == null}
                    />
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create(
    {
        submitButtonStyle:
        {
            width: WIDTH * 0.8,
            backgroundColor: '#3F5AA6',
            alignSelf: 'center',
            borderRadius: (WIDTH + HEIGHT) / 2,
            marginTop: HEIGHT * 0.03,
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
            borderColor: '#BDCDD1',
            borderWidth: 1,
            borderRadius: WIDTH * 0.02,
            fontSize: WIDTH * 0.04,
            width: WIDTH * 0.9,
            marginTop: HEIGHT * 0.010,
            padding: WIDTH * 0.05,
            fontFamily: 'Avenir',
            color: '#3F5AA6',
        },
        labelStyle:
        {
            alignSelf: 'flex-start',
            fontFamily: 'Avenir',
            color: '#3F5AA6',
            fontWeight: '700',
            fontSize: WIDTH * 0.045,
        },
        inputWraperStyle:
        {
            alignSelf: 'center',
        },
        inputContainerStyle:
        {
            alignItems: 'flex-start',
            width: WIDTH * 0.85,
            borderBottomColor: '#BDCDD1',
        },
        inputOutterContainerStyle:
        {
            marginTop: HEIGHT * 0.01,
        },
    }
)


export default ProjectCreationScreen;

