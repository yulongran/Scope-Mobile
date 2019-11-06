import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Dimensions, TextInput,TouchableOpacity, AsyncStorage
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Ionicons } from "@expo/vector-icons";
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

class ProjectCreationScreen extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        project_title: null,
        project_course: null,
        project_institution: null,
        project_startDate: null,
        project_endDate: null,
        milestone: [],
        project_id: null,
    }

    /**
    * Config Stack Navigator Header
    */
    static navigationOptions = {
        headerStyle: {
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerBackground: (
            <LinearGradient colors={['#3366cc', '#0066ff', '#ffffff']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }} />
        ),

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
            <View style={{ height: HEIGHT * 0.8 }}>
                <LinearGradient colors={['#3366cc', '#0066ff', '#ffffff']}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }}>

                    <ScrollView style={{ backgroundColor: 'white', margin: WIDTH * 0.02, borderWidth: 1, borderColor: '#bdbdbd' }}>
                        <View style={{ margin: WIDTH * 0.04 }}>
                            <View name="titleSection" style={{
                            }}>
                                <View style={{
                                    height: HEIGHT * 0.04,
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    marginTop: HEIGHT * 0.025,
                                }}>
                                    <Text style={{ fontSize: WIDTH * 0.06, }}>Title</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={{
                                            height: HEIGHT * 0.04, borderColor: '#bdbdbd',
                                            fontSize: WIDTH * 0.04,
                                            backgroundColor: 'white',
                                            borderBottomWidth: 1,
                                        }}
                                        placeholder={"Add Title"}
                                        onChangeText={(text) => {
                                            this.setState(
                                                {
                                                    project_title: text,
                                                }
                                            )
                                        }
                                        }
                                        value={this.state.project_title}
                                    ></TextInput>
                                </View>
                            </View>

                            <View style={{
                                marginTop: HEIGHT * 0.025,
                            }}>
                                <Text style={styles.titleStyle}>Start Date</Text>
                                <DatePicker
                                    style={{ width: WIDTH * 0.89, backgroundColor: 'white' }}
                                    date={this.state.project_startDate}
                                    mode="date"
                                    placeholder="Select Date"
                                    format="YYYY-MM-DD"
                                    minDate="2000-05-01"
                                    maxDate="2100-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    onDateChange={(date) => { this.setState({ project_startDate: date }) }}
                                />
                            </View>

                            <View style={{
                                marginTop: HEIGHT * 0.025,
                            }}>
                                <Text style={styles.titleStyle}>End Date</Text>
                                <DatePicker
                                    style={{ width: WIDTH * 0.89, backgroundColor: 'white' }}
                                    date={this.state.project_endDate}
                                    mode="date"
                                    placeholder="Select Date"
                                    format="YYYY-MM-DD"
                                    minDate="2000-05-01"
                                    maxDate="2100-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    onDateChange={(date) => { this.setState({ project_endDate: date }) }}
                                />
                            </View>

                            <View style={{
                                marginTop: HEIGHT * 0.025,
                            }}>
                                <Text style={{ fontSize: WIDTH * 0.06, marginTop: HEIGHT * 0.008, }}>Description:</Text>
                                <TextInput
                                    style={{
                                        height: HEIGHT * 0.25, borderColor: '#D3D3D3',
                                        borderWidth: 1,
                                        borderRadius: WIDTH * 0.02,
                                        fontSize: WIDTH * 0.04,
                                        backgroundColor: 'white',
                                    }}
                                    onChangeText={(text) => {
                                        this.setState(
                                            {
                                                project_description: text,
                                            }
                                        )
                                    }
                                    }
                                    value={this.state.project_description}
                                    multiline={true}
                                ></TextInput>
                            </View>

                            <View style={{
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.titleStyle}>Milestone</Text>
                                    <Button
                                        onPress={() => {
                                            this.state.milestone.push({
                                                milestone_number: this.state.milestone.length + 1,
                                                milestone_description: '',
                                                milestone_startDate: '',
                                                milestone_endDate: '',
                                            })
                                            this.setState(
                                                {
                                                    milestone: this.state.milestone
                                                })
                                        }}
                                        icon={
                                            <Ionicons name="md-add" size={WIDTH * 0.08} color="black" />
                                        }
                                        buttonStyle={{ backgroundColor: 'white', marginLeft: WIDTH * 0.55, paddingTop: -HEIGHT * 0.009 }} />
                                </View>
                            </View>
                            <View name="MilestoneList">
                                {
                                    MilestoneList = this.state.milestone.map(item => {
                                        return (
                                            <View style={{ height: HEIGHT * 0.23, borderWidth: 1, }} key={item.milestone_number}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{
                                                        padding: Dimensions.get('window').width * 0.025,
                                                        fontSize: WIDTH * 0.04,
                                                        fontStyle: 'italic',
                                                        fontWeight: 'bold',
                                                    }}>Milestone {item.milestone_number}</Text>
                                                    <Button
                                                        onPress={() => {
                                                            this.state.milestone.splice(item.milestone_number - 1, 1);

                                                            {/* Re-compute the milestone_number after remove an element*/ }

                                                            for (var i = 0; i < this.state.milestone.length; i++) {
                                                                this.state.milestone[i].milestone_number = i + 1;
                                                            }
                                                            this.setState(
                                                                {
                                                                    milestone: this.state.milestone
                                                                })
                                                        }}
                                                        icon={
                                                            <Ionicons name="md-remove" size={WIDTH * 0.07} color="black" />
                                                        }
                                                        buttonStyle={{ backgroundColor: 'white', marginLeft: WIDTH * 0.5, paddingTop: -HEIGHT * 0.009 }} />
                                                </View>
                                                <Text style={{ marginLeft: WIDTH * 0.06 }}>Description</Text>
                                                <TextInput
                                                    style={{
                                                        fontSize: WIDTH * 0.04,
                                                        paddingLeft: WIDTH * 0.02,
                                                        paddingRight: WIDTH * 0.02,
                                                        height: HEIGHT * 0.1, borderColor: '#D3D3D3',
                                                        borderWidth: 1,
                                                        width: WIDTH * 0.8,
                                                        borderRadius: WIDTH * 0.01,
                                                        alignSelf: 'center',
                                                        marginTop: HEIGHT * 0.01,
                                                    }}
                                                    onChangeText={(text) => {
                                                        const copy = this.state.milestone
                                                        copy[item.milestone_number - 1].milestone_description = text
                                                        this.setState(
                                                            {
                                                                milestone: copy
                                                            }
                                                        )
                                                    }
                                                    }
                                                    value={this.state.milestone[item.milestone_number - 1].milestone_description}
                                                    multiline={true}
                                                ></TextInput>
                                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                                    <View style={{ marginLeft: WIDTH * 0.023, flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text>Start Date</Text>
                                                        <DatePicker
                                                            style={{ width: WIDTH * 0.2, height: HEIGHT * 0.03, marginTop: HEIGHT * 0.003, marginLeft: WIDTH * 0.015, borderColor: "white" }}
                                                            date={this.state.milestone[item.milestone_number - 1].milestone_startDate}
                                                            mode="date"
                                                            placeholder="select date"
                                                            format="YYYY-MM-DD"
                                                            minDate="2000-05-01"
                                                            maxDate="2100-06-01"
                                                            confirmBtnText="Confirm"
                                                            cancelBtnText="Cancel"
                                                            showIcon={false}
                                                            onDateChange={(date) => {
                                                                const copy = this.state.milestone
                                                                copy[item.milestone_number - 1].milestone_startDate = date,
                                                                    this.setState({
                                                                        milestone: copy
                                                                    })
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={{ marginLeft: WIDTH * 0.03, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text>End Date</Text>
                                                        <DatePicker
                                                            style={{ width: WIDTH * 0.23, height: HEIGHT * 0.03, marginTop: HEIGHT * 0.003, marginLeft: WIDTH * 0.03, borderColor: "white" }}
                                                            date={this.state.milestone[item.milestone_number - 1].milestone_endDate}
                                                            mode="date"
                                                            placeholder="select date"
                                                            format="YYYY-MM-DD"
                                                            minDate="2000-05-01"
                                                            maxDate="2100-06-01"
                                                            confirmBtnText="Confirm"
                                                            cancelBtnText="Cancel"
                                                            showIcon={false}
                                                            onDateChange={(date) => {
                                                                const copy = this.state.milestone
                                                                copy[item.milestone_number - 1].milestone_endDate = date,
                                                                    this.setState({
                                                                        milestone: copy
                                                                    })
                                                            }}
                                                        />
                                                    </View>

                                                </View>
                                            </View>
                                        )
                                    })}
                            </View>
                        </View>
                    </ScrollView>
                </LinearGradient>
                <TouchableOpacity style={styles.submitButtonStyle}
                    onPress={() => {
                        this.createProject()
                    }}>
                    <Text style={{ fontSize: WIDTH * 0.05, textAlign: 'center' }}>Submit</Text>
                </TouchableOpacity>
            </View >
        )
    }
}

const styles = StyleSheet.create(
    {
        titleStyle:
        {
            fontSize: WIDTH * 0.06, marginTop: HEIGHT * 0.008,
        },
        submitButtonStyle:
        {
            backgroundColor: 'white',
            width: WIDTH,
            height: HEIGHT * 0.05,
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 10,
        }
    }
)


export default ProjectCreationScreen;

