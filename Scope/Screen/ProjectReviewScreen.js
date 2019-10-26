import React, { Component } from 'react'
import {
    View, Text,
    Image, StyleSheet, AsyncStorage,
    Dimensions, SafeAreaView, FlatList, ImageBackground, TouchableOpacity
} from 'react-native'
import { Button } from 'react-native-elements';
import MenuButton from '../Components/MenuButton'
import { Ionicons } from "@expo/vector-icons";
import Review from '../Components/Review';
import MileStone from '../Components/MileStone';
import People from '../Components/People';
import ProfilePic from '../assets/profile_default.jpg'


const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

class ProjectReviewScreen extends Component {

    /**
     * Construct a ProjectDisplay object
     * @param {*} props
     * @property projectName the name of the project
     * @property courseName the name of the course
     * @property schoolName the name of the institution
     * @property startDate the start date of the project
     * @property endDate the end date of the project
     */
    constructor(props) {
        super(props)

    }

    state =
        {
            
            project: '',
            group_members: [
            ],
            teacher: [
                {
                    user_firstname: 'Yulong',
                    user_lastname: 'Ran'
                }
            ],
            milestone: [],
            reviews: [
            ],
            milestone_button: true,
            review_button: false,
            display: 'milestone', // milestone // review
            team_number:'',
            project_id:'',

        }

    /**
     * name: 'David',
            review: 'Nice work, sdadaskdakdajdjasdaksdsadklajsdklakdasdasdasdasdsa',
            date: '09/07/2016'
     */

    async fetchMilestone() {

        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/review/',
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
                milestone: responseJson
            }
        )

    }
    async fetchTeamMember() {

        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/team/member',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                    project_id: this.state.project.project_id,
                    team_number: this.state.team_number,
                },
            })
        let responseJson = await response.json();
        this.setState(
            {
                group_members: responseJson
            }
        )

    }

    async ProjectInfo() {

        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/project/project',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                    project_id: this.state.project.project_id,
                },
            })
        let responseJson = await response.json();
        this.setState(
            {
                project: responseJson[0]
            }
        )

    }

    componentDidMount() {
        this.setState(
            {
                project: this.props.navigation.getParam('project'),
                team_number: this.props.navigation.getParam('team_number'),
                project_id: this.props.navigation.getParam('project_id'),
                
            }
        )
        this.fetchMilestone()
        this.fetchTeamMember()
        this.ProjectInfo()
      
    }

    render() {
        const milestoneList =
            <FlatList
                data={this.state.milestone}
                renderItem={({ item }) => (
                    <MileStone project_id = {this.state.project_id}
                                milestone_number={item.milestone_number} 
                                milestone_description={item.milestone_description}
                                milestone_startDate={item.milestone_startDate}
                                milestone_endDate ={item.milestone_endDate}></MileStone>
                )}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
                contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
            />

        const reivewList =
            <View>
                <Text>
                    Hello World
            </Text>
            </View>

        return (
            <View style={styles.container} >
                <Ionicons onPress={() => this.props.navigation.navigate('Project')} name="md-arrow-round-back" size={32} color="blue" style={styles.backIconStyle}>
                </Ionicons>
                <Text style={styles.title}>{this.state.project.project_title}</Text>
                <Text style={styles.description}>{this.state.project.project_description}</Text>
                <View style={{ height: Dimensions.get('window').height * 0.24, justifyContent: 'center', flexDirection: 'row', marginLeft: WIDTH * 0.1 }}>
                    <View style={{ alignContent: 'center', alignItems: 'center', width: WIDTH * 0.4 }}>
                        <Text style={{ fontSize: 16, marginTop: HEIGHT*0.03, marginBottom: 10 }}>Group Members</Text>
                        <FlatList
                            data={this.state.group_members}
                            key={this.state.group_members}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={{ marginRight: WIDTH * 0.015, 
                                                        width: WIDTH * 0.17,
                                                        height: WIDTH * 0.20,}}>
                                    <Image source={ProfilePic} style={{
                                        width: WIDTH * 0.1,
                                        height: WIDTH * 0.1,
                                        borderRadius: WIDTH * 0.1 / 2,
                                        alignSelf: 'center',
                                    }} />
                                    <Text style={{
                                        marginTop: HEIGHT * 0.008,
                                        fontSize: WIDTH*0.025,
                                        alignSelf: 'center'
                                    }}>{item.user_firstname}</Text>
                                    <Text style= {{
                                        fontSize: WIDTH*0.025,
                                        alignSelf: 'center'}}>
                                    {item.user_lastname}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ width: WIDTH * 0.5, alignItems:'center', paddingRight:WIDTH*0.1}}
                            numColumns={2}
                        />
                    </View>
                    <View style={{ alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, marginTop: HEIGHT*0.03, marginBottom: 10 }}>Teachers & TAs</Text>
                        <FlatList
                            data={this.state.teacher}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={{ marginTop: 11, width: WIDTH * 0.17,
                                    height: WIDTH * 0.20}}>
                                    <Image source={ProfilePic} style={{
                                        width: WIDTH * 0.1,
                                        height: WIDTH * 0.1,
                                        borderRadius: WIDTH * 0.1 / 2,
                                        alignSelf: 'center',
                                    }} />
                                    <Text style={{
                                        marginTop: HEIGHT * 0.008,
                                        fontSize: WIDTH*0.025,
                                        alignSelf: 'center'
                                    }}>{item.user_firstname}</Text>
                                    <Text style= {{
                                        fontSize: WIDTH*0.025,
                                        alignSelf: 'center'}}>
                                    {item.user_lastname}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ width: WIDTH * 0.5 , alignItems:'center'}}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: HEIGHT * 0.03 }}>
                    <TouchableOpacity style={[this.state.milestone_button ? styles.touchOnStyle : styles.touchStyle]}
                        onPress={() => {
                            this.setState(
                                {
                                    milestone_button: true,
                                    review_button: false,
                                }
                            )
                        }}>
                        <Text>Milestone</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[this.state.review_button ? styles.touchOnStyle : styles.touchStyle]}
                        onPress={() => {
                            this.setState(
                                {
                                    review_button: true,
                                    milestone_button: false,
                                }
                            )
                        }}>
                        <Text>Review</Text>
                    </TouchableOpacity>
                </View>

                < SafeAreaView style={styles.contentContainer} >
                    {this.state.milestone_button ? milestoneList : reivewList}
                </SafeAreaView>

            </View>

        )
    }
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 3,

        },
        title: {
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 20,
        },
        description:
        {
            marginLeft: Dimensions.get('window').width * 0.1,
            marginRight: Dimensions.get('window').width * 0.1,
            textAlign: 'center',
        },
        backIconStyle:
        {
            color: 'black',
            marginLeft: Dimensions.get('window').width * 0.1,
            paddingTop: Dimensions.get('window').height * 0.08,
        },
        contentContainer:
        {
            height: Dimensions.get('window').height * 0.7,
            width: Dimensions.get('window').width * 0.92,
            alignSelf: 'center',
            borderRadius: 5,
            flex: 1,

        },
        touchStyle:
        {
            borderWidth: 0.5,
            borderRadius: 10 / 2,
            width: WIDTH * 0.20,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#f9c2ff',
        },
        touchOnStyle:
        {
            borderWidth: 0.5,
            borderRadius: 10 / 2,
            width: WIDTH * 0.20,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#d7ecfc',
            backgroundColor: '#d7ecfc',
        }
    }
)

export default ProjectReviewScreen;