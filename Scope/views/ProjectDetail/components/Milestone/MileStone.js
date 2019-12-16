import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    FlatList,
} from 'react-native';
import { Avatar, Divider, Icon } from 'react-native-elements';
import AccordionView from './components/MilestoneAccordin';
import firebase from 'react-native-firebase';


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


export class MileStone extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project: null,
            team_member: null,
        }
    }

    readProjectData = () => {
        firebase.database().ref('Project/' + this.props.navigation.getParam('uid')).on('value', (snapshot) => {
            this.setState({ project: snapshot.val() })
        });
    }

    readTeamMember = () => {
        // var ref = firebase.database().ref('Project');
        // ref.orderByChild(uid).equalTo(this.props.navigation.getParam('uid')).on("value", (snapshot)=>
        // {
        //     console.log(snapshot.val())
        // });
    }

    onPressAddMilestone = () => {
        this.props.navigation.navigate("MilestoneCreationScreen")
    }


    componentDidMount() {
        console.log(this.props.navigation.getParam('uid'))
        if (this.state.project == null) {
            this.readProjectData()
        }
        if (this.state.team_member == null) {
            this.readTeamMember()
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <View className="project_title">
                    <Text style={styles.projectTitleStyle}>{this.state.project != null ? this.state.project.project_title : null}</Text>
                    <View style={styles.projectIDContainer}>
                        <Text style={styles.projectIDStyle}> ID:{this.props.navigation.getParam('uid')}</Text>
                    </View>
                </View>
                <Divider style={styles.dividerStyle} />
                <View className="project_description" style={styles.sectionContainerStyle}>
                    <Text style={styles.sectionLabelStyle}>DESCRIPTION</Text>
                    <Text style={styles.descriptionStyle}>{this.state.project != null ? this.state.project.project_description : null} </Text>
                </View>
                <View className="team_member" style={styles.flastListContainerStyle}>
                    <FlatList
                        data={[1, 2, 3, 4, 5]}
                        key={[1, 2, 3]}
                        contentContainerStyle={styles.profileListStyle}
                        renderItem={({ item }) => (
                            <View style={styles.avatarWrapper}>
                                <Avatar
                                    title={"RA"}
                                    rounded
                                    size={WIDTH * 0.15}

                                />
                                <Text style={styles.avatarNameStyle}>First name</Text>
                                <Text style={styles.avatarNameStyle}>Lastname</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true} />
                </View>
                <View className="milestone_menu" style={styles.milestoneMenuStyle}>
                    <Text style={styles.sectionLabelStyle}>MILESTONE</Text>
                    <Icon
                        raised
                        name='md-add'
                        type='ionicon'
                        color='#192A59'
                        onPress={this.onPressAddMilestone}
                        size={WIDTH * 0.045}
                        style={styles.iconStyle} />
                </View>
                <AccordionView />
            </View>
        )
    }
}

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const styles = StyleSheet.create(
    {
        container: {
            marginBottom: WIDTH * 0.05,
            marginLeft: WIDTH * 0.05,
            marginRight: WIDTH * 0.05,
            marginTop: WIDTH * 0.02,

        },
        projectIDStyle:
        {
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.03,
            color: '#3F5AA6',
        },
        projectIDContainer:
        {
            marginLeft: WIDTH * 0.5,
        },
        dividerStyle:
        {
            backgroundColor: '#EBEEF7',
            marginTop: HEIGHT * 0.01
        },
        projectTitleStyle:
        {
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.07,
            color: '#192A59',
            fontWeight: '800'
        },
        sectionLabelStyle:
        {
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.045,
            color: '#192A59',
            fontWeight: '600',
            flex: 1,
        },
        descriptionStyle:
        {
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.035,
            color: '#828899',
            fontWeight: '400',
            marginTop: HEIGHT * 0.015,
        },
        sectionContainerStyle:
        {
            marginTop: HEIGHT * 0.02,
        },
        profileListStyle:
        {
            alignSelf: 'center',
        },
        flastListContainerStyle:
        {
            alignItems: 'center',
            marginTop: HEIGHT * 0.025,
        },
        avatarNameStyle:
        {
            fontSize: WIDTH * 0.030,
            fontFamily: 'Avenir',
            textAlign: 'center',
            fontWeight: '300',
        },
        avatarWrapper:
        {
            marginRight: WIDTH * 0.075,
            alignItems: 'center'
        },
        milestoneMenuStyle:
        {
            marginTop: HEIGHT * 0.02,
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            marginBottom: HEIGHT * 0.015,
        },
        iconStyle:
        {
            alignSelf: 'flex-end',
            marginTop: -HEIGHT * 0.0065,
        },

    }
)

export default MileStone;