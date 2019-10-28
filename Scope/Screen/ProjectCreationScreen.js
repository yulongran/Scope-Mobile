import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Dimensions, TextInput, FlatList
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Ionicons } from "@expo/vector-icons";
import { Button } from 'react-native-elements';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

class ProjectCreationScreen extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        project_title: '',
        project_course: '',
        project_institution: '',
        project_startDate: '',
        project_endDate: '',
        milestone: [],
    }

    render() {
        return (
            <View onStartShouldSetResponderCapture={() => {
                this.setState({ enableScrollViewScroll: true });
            }}>
                <ScrollView style={{ backgroundColor: 'white' }} scrollEnabled={this.state.enableScrollViewScroll}
                    ref={myScroll => (this._myScroll = myScroll)} >
                    <View>
                        <View style={{
                            marginLeft: WIDTH * 0.05,
                            marginRight: WIDTH * 0.05,
                            marginTop: HEIGHT * 0.01,
                        }}>
                            <Text style={{ fontSize: WIDTH * 0.06, marginTop: HEIGHT * 0.008, }}>Project Title</Text>
                            <TextInput
                                style={{
                                    height: HEIGHT * 0.045, borderColor: '#D3D3D3',
                                    borderBottomWidth: 1,
                                    width: WIDTH * 0.87,
                                    borderRadius: WIDTH * 0.02,
                                    fontSize: WIDTH * 0.04,
                                    backgroundColor: 'white',
                                }}
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

                        <View style={{
                            marginLeft: WIDTH * 0.05,
                            marginRight: WIDTH * 0.05,
                            marginTop: HEIGHT * 0.01,
                            marginTop: HEIGHT * 0.01,
                        }}>
                            <Text style={styles.titleStyle}>Start Date</Text>
                            <DatePicker
                                style={{ width: WIDTH * 0.87, backgroundColor: 'white' }}
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
                            marginLeft: WIDTH * 0.05,
                            marginRight: WIDTH * 0.05,
                            marginTop: HEIGHT * 0.01,
                            marginTop: HEIGHT * 0.01,
                        }}>
                            <Text style={styles.titleStyle}>End Date</Text>
                            <DatePicker
                                style={{ width: WIDTH * 0.87, backgroundColor: 'white' }}
                                date={this.state.project_EndDate}
                                mode="date"
                                placeholder="Select Date"
                                format="YYYY-MM-DD"
                                minDate="2000-05-01"
                                maxDate="2100-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(date) => { this.setState({ project_EndDate: date }) }}
                            />
                        </View>

                        <View style={{
                            marginLeft: WIDTH * 0.05,
                            marginRight: WIDTH * 0.05,
                            marginTop: HEIGHT * 0.01,
                            marginTop: HEIGHT * 0.15,

                        }}>
                            <Text style={{ fontSize: WIDTH * 0.06, marginTop: HEIGHT * 0.008, }}>Project Description</Text>
                            <TextInput
                                style={{
                                    height: HEIGHT * 0.25, borderColor: '#D3D3D3',
                                    borderWidth: 1,
                                    width: WIDTH * 0.87,
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
                            marginLeft: WIDTH * 0.05,
                            marginRight: WIDTH * 0.05,
                            marginTop: HEIGHT * 0.01,

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
                        <View name="MilestoneList" onStartShouldSetResponderCapture={() => {
                            this.setState({ enableScrollViewScroll: false });
                            if (this._myScroll.contentOffset === 0 && this.state.enableScrollViewScroll === false) {
                                this.setState({ enableScrollViewScroll: true });
                            }
                        }} style={{ flex: 1, }}>
                            <FlatList
                                contentContainerStyle={{ height: HEIGHT * 0.45, marginBottom: 1 }}
                                data={this.state.milestone}
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
                                            <View style={{ marginLeft: WIDTH * 0.06, flexDirection: 'row', alignItems: 'center' }}>
                                                <Text>Start Date</Text>
                                                <DatePicker
                                                    style={{ width: 100, marginLeft: WIDTH * 0.015, borderColor: "white" }}
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
                                            <View style={{ marginLeft: WIDTH * 0.06, flexDirection: 'row', alignItems: 'center' }}>
                                                <Text>End Date</Text>
                                                <DatePicker
                                                    style={{ width: 100, marginLeft: WIDTH * 0.03, borderColor: "white" }}
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
                                }
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={1}
                                extraData={this.state}>
                            </FlatList>
                        </View>
                    </View>
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        titleStyle:
        {
            fontSize: WIDTH * 0.06, marginTop: HEIGHT * 0.008,
        },
    }
)


export default ProjectCreationScreen;

