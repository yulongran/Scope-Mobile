import React, { Component } from 'react'
import {
    View, Text,
    Image, StyleSheet, AsyncStorage,
    Dimensions, SafeAreaView, FlatList, TouchableOpacity, ScrollView
} from 'react-native'
import Review from './components/Review/index';
import MileStone from './components/Milestone/index';
import { Avatar, ButtonGroup, Divider } from 'react-native-elements';
import Accordion from '@dooboo-ui/native-accordion';
import { Ionicons } from "@expo/vector-icons";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

/**https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript */
function romanize(num) {
    var lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }, roman = '', i;
    for (i in lookup) {
        while (num >= lookup[i]) {
            roman += i;
            num -= lookup[i];
        }
    }
    return roman;
}
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
        this.state =
            {
                project: 'Hello',
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
                selectedIndex: 0,
                contents: [
                    {
                        title: 'Title 1',
                        body: 'Hi. I love this component. What do you think?',
                    },
                    {
                        title: 'See this one too',
                        body: 'Yes. You can have more items.',
                    },
                    {
                        title: 'Thrid thing',
                        body:
                            'What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text? What about very long text?',
                    },
                ],
            }
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
    }


    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Project Detail',
            headerTintColor: '#192A59',
            headerTitleStyle:
            {
                fontFamily: 'Avenir',
                fontSize: 28,
                textAlign: 'center',
                flex: 1,
                fontWeight: '900',
            },
        };
    }

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
                    project_id: this.state.project.project_id,
                },
            })
        let responseJson = await response.json();
        console.log(this.state.project.project_id)
        console.log(responseJson)
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

    async componentDidMount() {
        this.setState(
            {
                project: this.props.navigation.getParam('project'),
                project_id: this.props.navigation.getParam('project_id'),

            }
        )
        await this.fetchMilestone()
        await this.fetchTeamMember()
        await this.fetchProject()
        await this.fetchReview()
    }

    render() {
        const buttons = ['Milestone', 'Review']
        const { selectedIndex } = this.state
        return (
            <SafeAreaView>
                <ScrollView>
                    <View className="wrapper">
                        <View className="selection_view">
                            <ButtonGroup
                                onPress={this.updateIndex}
                                selectedIndex={selectedIndex}
                                buttons={buttons}
                                containerStyle={styles.selectionStyle}
                                textStyle={{ fontFamily: 'Avenir' }}
                                selectedButtonStyle={{ backgroundColor: "#3F5AA6" }}
                            />
                        </View>
                        {this.state.selectedIndex == 0 ? <View className='milestone_view'>
                            <MileStone />
                        </View> : null}
                    </View>
                </ScrollView>
            </SafeAreaView >
        )
    }
}


const styles = StyleSheet.create(
    {
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
        },
        groupListStyle: {
            alignContent: 'center',
            height: Dimensions.get('window').height * 0.24,
            marginTop: HEIGHT * 0.02,
            alignItems: 'center',
            alignSelf: 'center',
            width: WIDTH * 0.8,
            flex: 0.5,
        },
        selectionStyle:
        {
            height: HEIGHT * 0.04,
            width: WIDTH * 0.85,
            marginTop: HEIGHT * 0.01,
            alignSelf: 'center',
            borderRadius: 7,
        },
        AccordionStyle:
        {
            borderWidth: 1, borderColor: '#E9E9F0', padding: 10, borderRadius: 10
        },
    }
)

export default ProjectReviewScreen;