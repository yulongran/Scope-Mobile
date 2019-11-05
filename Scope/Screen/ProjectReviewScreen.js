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
import { LinearGradient } from 'expo-linear-gradient';


const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

/**
 * Image Source from https://randomuser.me/
 * Credit to https://randomuser.me/
 */
const ProfilePic = ["https://randomuser.me/api/portraits/med/men/1.jpg",
    "https://randomuser.me/api/portraits/med/men/2.jpg",
    "https://randomuser.me/api/portraits/med/men/3.jpg",
    "https://randomuser.me/api/portraits/med/men/4.jpg",
    "https://randomuser.me/api/portraits/med/men/5.jpg",
    "https://randomuser.me/api/portraits/med/men/6.jpg",
    "https://randomuser.me/api/portraits/med/men/7.jpg",
    "https://randomuser.me/api/portraits/med/men/8.jpg",
    "https://randomuser.me/api/portraits/med/men/9.jpg",
    "https://randomuser.me/api/portraits/med/men/10.jpg",
    "https://randomuser.me/api/portraits/med/women/1.jpg",
    "https://randomuser.me/api/portraits/med/women/2.jpg",
    "https://randomuser.me/api/portraits/med/women/3.jpg",
    "https://randomuser.me/api/portraits/med/women/4.jpg",
    "https://randomuser.me/api/portraits/med/women/5.jpg",
    "https://randomuser.me/api/portraits/med/women/6.jpg",
    "https://randomuser.me/api/portraits/med/women/7.jpg",
    "https://randomuser.me/api/portraits/med/women/8.jpg",
    "https://randomuser.me/api/portraits/med/women/9.jpg",

]
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
            team_number: '',
            project_id: '',

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

    async fetchProject() {

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

    async fetchReview() {

        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/review/review',
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
                reviews: responseJson
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
        this.fetchProject()
        this.fetchReview()
    }

    render() {
        const milestoneList =
            <FlatList
                data={this.state.milestone}
                renderItem={({ item }) => (
                    <MileStone project_id={this.state.project_id}
                        milestone_number={item.milestone_number}
                        milestone_description={item.milestone_description}
                        milestone_startDate={item.milestone_startDate}
                        milestone_endDate={item.milestone_endDate}></MileStone>
                )}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
                contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
            />

        const reviewList =
            <FlatList
                data={this.state.reviews}
                renderItem={({ item }) => (
                    <Review reviewee_id={item.reviewee_id} reviewer_id={item.reviewer_id} review_description={item.review_description} />
                )}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
                contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
            />

        return (
            <View style={styles.container} >
                <Text style={styles.title}>{this.state.project.project_title}</Text>
                <Text style={styles.description}>{this.state.project.project_description}</Text>
                <View style={{ height: Dimensions.get('window').height * 0.24, alignItems: 'center', }}>
                    <View style={{ alignContent: 'center', marginTop: HEIGHT * 0.02, alignItems: 'center', width: WIDTH * 0.8 }}>
                        <Text style={{ fontSize: 16, marginBottom: 10, alignSelf: 'flex-start', fontStyle: 'italic' }}>Group Members</Text>
                        <FlatList
                            data={this.state.group_members}
                            key={this.state.group_members}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{
                                        width: WIDTH * 0.25,
                                        height: WIDTH * 0.3,
                                    }}
                                    onPress={() => {
                                        this.props.navigation.navigate("EvaluationScreen",
                                            {
                                                user_firstname: item.user_firstname,
                                                user_lastname: item.user_lastname,
                                                user_profile: ProfilePic[Math.floor(Math.random() * ProfilePic.length)]
                                            })
                                    }}
                                >
                                    <Image source={{ uri: ProfilePic[Math.floor(Math.random() * ProfilePic.length)] }} style={{
                                        width: WIDTH * 0.15,
                                        height: WIDTH * 0.15,
                                        borderRadius: WIDTH * 0.15 / 2,
                                        alignSelf: 'center',
                                    }} />
                                    <Text style={{
                                        marginTop: HEIGHT * 0.008,
                                        fontSize: WIDTH * 0.035,
                                        alignSelf: 'center'
                                    }}>{item.user_firstname}</Text>
                                    <Text style={{
                                        fontSize: WIDTH * 0.035,
                                        alignSelf: 'center'
                                    }}>
                                        {item.user_lastname}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ width: WIDTH * 0.8, alignItems: 'center' }}
                            horizontal={true}
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
                    {this.state.milestone_button ? milestoneList : reviewList}
                </SafeAreaView>

            </View>

        )
    }
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 3,
            marginTop: HEIGHT * 0.03,

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