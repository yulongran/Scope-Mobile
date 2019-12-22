import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert,
    FlatList,
} from 'react-native'
import { Avatar, Card, Icon } from 'react-native-elements';
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
        firebase.database().ref(`Users/${uid}/Project`).once('value', (snapshot) => {
            Object.values(snapshot.val()).forEach((element, index) => {
                if (element.uid == this.props.uid) {
                    firebase.database().ref(`Users/${uid}/Project/${Object.keys(snapshot.val())[index]}`).remove()
                }
            })
        })
    }

    readTeamMember = () => {
        let users = []
        firebase.database().ref(`Project/${this.props.uid}/Users`).on('value', (snapshot) => {
            if (snapshot.val() != null) {
                this.setState({team_member: Object.values(snapshot.val())})
            }
        })
    }

    componentDidMount() {
        if (this.state.team_member.length == 0) {
            this.readTeamMember()
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{ justifyContent: 'center' }} onLongPress={() => {
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
            }}>
                <Card containerStyle={{
                    width: WIDTH * 0.9,
                    height: HEIGHT * 0.145,
                    borderRadius: 10,
                    justifyContent: 'center',
                    borderLeftColor: colors[Math.floor(Math.random() * colors.length)],
                    borderLeftWidth: 4,
                }}>
                    <View className="main_content" style={{ justifyContent: 'center' }}>
                        <View style={styles.ViewStyle} >
                            <View className="left_container">
                                <Text style={styles.ProjectNameStyle}>{this.props.project_title}</Text>
                                <View style={{ marginTop: HEIGHT * 0.01, marginLeft: WIDTH * 0.03 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon name="ios-calendar" type='ionicon' size={18} color='red' />
                                        <Text style={styles.startDateStyle}>From {this.props.project_startDate}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon name="ios-calendar" type='ionicon' size={18} color='red' />
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
                                            source={item.avatar != null ? { uri: item.avatar } : null}
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
                </Card >
            </TouchableOpacity >



        )
    }
}

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
var colors = ['red', 'green', 'blue', 'orange', 'yellow', 'rosybrown', 'skyblue', 'slateblue', 'springgreen', 'navajowhite'
    , 'navy', 'mediumvioletred', 'mediumpurple', 'lightgrey', 'goldenrod', 'gainsboro', 'darkturquoise', 'darkred', 'cadetblue'];
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
    // menuContainerStyle:
    // {
    //     alignSelf: 'flex-end',
    //     paddingRight: WIDTH * 0.05,
    //     marginTop: HEIGHT * 0.02,
    // },
    optionsContainerStyle:
        { width: WIDTH * 0.2, borderRadius: 8 },


})

export default Project;



