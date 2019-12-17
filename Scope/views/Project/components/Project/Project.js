import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert,
    Image,
    FlatList,
} from 'react-native'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Card } from 'react-native-elements';
import ProjectCard from '../../../../assets/images/projectCard.png';
import firebase from 'react-native-firebase'

/**
 * A Project Component in the Dashbaord Screen
 */
class Project extends Component {
    /**
     * Construct a ProjectDisplay object
     * @param {*} props
     * @property project_title The title of the project
     * @property project_course The course name of the project
     * @property schoolName the name of the institution
     * @property startDate the start date of the project
     * @property endDate the end date of the project
     * @property description brief description of the project
     * 
     */
    constructor(props) {
        super(props)
        this.state =
        {
            delete: false,
            team_member: [],
        }
    }

    onPressDelete = () => {
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref('Project').child(uid).child(this.props.uid).remove();
    }

    readTeamMember = () => {
        let users = []
        firebase.database().ref(`Project/${this.props.uid}/Users`).on('value', (snapshot) => {
            Object.values(snapshot.val()).forEach(element => {
                firebase.database().ref(`Users/${element.uid}`).once('value', (snapshot) => {
                    users.push(snapshot.val())
                }).then(() => {
                    this.setState({ team_member: users })
                })
            })
        })
    }

    componentDidMount() {
        if (this.state.team_member.length == 0) {
            this.readTeamMember()
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Card containerStyle={{
                    width: WIDTH * 0.9,
                    height: HEIGHT * 0.145,
                    borderRadius: 10,
                    justifyContent: 'center',
                    borderLeftColor: colors[Math.floor(Math.random(10)*colors.length*this.props.index)],
                    borderLeftWidth: 4,
                }}>
                    <View className="main_content" style={{ marginTop: -HEIGHT * 0.02 }}>
                        <View className="project_menu_selection" style={styles.menuContainerStyle}>
                            <Menu style={{ marginLeft: WIDTH * 0.33 }}>
                                <MenuTrigger>
                                    <Ionicons
                                        name="ios-more"
                                        color="#000000"
                                        size={WIDTH * 0.04}
                                    />
                                </MenuTrigger>
                                <MenuOptions optionsContainerStyle={styles.optionsContainerStyle}>
                                    <MenuOption text='Edit' />
                                    <MenuOption text='Remove' onSelect={() => {
                                        Alert.alert(
                                            'Permanent delete project',
                                            '',
                                            [
                                                {
                                                    text: 'Yes', onPress: () => {
                                                        this.onPressDelete()
                                                    }
                                                },
                                                { text: 'No', style: 'cancel' },
                                            ],
                                            {
                                                cancelable: true
                                            }
                                        )
                                    }} />
                                </MenuOptions>
                            </Menu>
                        </View>
                        <View style={styles.ViewStyle} >
                            <View className="left_container">
                                <Text style={styles.ProjectNameStyle}>{this.props.project_title}</Text>
                                <View style={{ marginTop: HEIGHT * 0.01, marginLeft: WIDTH * 0.03 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="ios-calendar" size={18} color='red'></Ionicons>
                                        <Text style={styles.startDateStyle}>From {this.props.project_startDate}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="ios-calendar" size={18} color='red'></Ionicons>
                                        <Text style={styles.endDateStyle}>To      {this.props.project_endDate}</Text>
                                    </View>
                                </View>
                            </View>
                            <View className="right_avatar_container" style={styles.rightSideStyle}>
                                <FlatList
                                    data={this.state.team_member}
                                    renderItem={({ item, index }) => (
                                        <Avatar
                                            rounded
                                            title={item.firstname[0] + item.lastname[0]}
                                            size={42}
                                            containerStyle={{ margin: 10 }}
                                        />
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                    extraData={this.state.team_member}
                                    horizontal={true}
                                />
                            </View>
                        </View>
                    </View>
                    {/* </View> */}
                </Card>
            </TouchableOpacity>



        )
    }
}

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
var colors = ['red', 'green', 'blue', 'orange', 'yellow', 'rosybrown', 'skyblue', 'slateblue','springgreen','navajowhite'
,'navy','mediumvioletred', 'mediumpurple', 'lightgrey','goldenrod','gainsboro','darkturquoise','darkred','cadetblue'];
const styles = StyleSheet.create({
    ViewStyle: {
        flexDirection: 'row',
    },
    rightSideStyle:
    {
        marginLeft: WIDTH * 0.09,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    ProjectNameStyle: {
        color: '#3F5AA6',
        fontStyle: 'italic',
        fontFamily: 'Avenir',
        fontWeight: '800',
        fontSize: WIDTH * 0.05,
        marginLeft: WIDTH * 0.03,
    },
    CourseStyle: {
        textAlign: 'center',
        // paddingTop: HEIGHT * 0.01,
        fontFamily: 'Avenir',
        fontWeight: '800',
    },
    startDateStyle: {
        textAlign: 'center',
        fontSize: WIDTH * 0.0325,
        fontFamily: 'Avenir',
        marginLeft: WIDTH * 0.035,
        fontWeight: '200',
    },
    endDateStyle: {
        textAlign: 'center',
        fontSize: WIDTH * 0.0325,
        marginLeft: WIDTH * 0.035,
        fontFamily: 'Avenir',
        fontWeight: '200',
    },
    projectCardStyle:
    {
        alignSelf: 'flex-end',
        height: WIDTH * 0.07,
        width: WIDTH * 0.07,
    },
    menuContainerStyle:
    {
        alignSelf: 'flex-end',
        paddingRight: WIDTH * 0.05,
    },
    optionsContainerStyle:
        { width: WIDTH * 0.2, borderRadius: 8 },


})

export default Project;



