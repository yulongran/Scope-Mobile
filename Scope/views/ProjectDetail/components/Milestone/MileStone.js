import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Clipboard,
    TouchableOpacity,
    ScollView,
} from 'react-native';
import { Avatar, Divider, Icon } from 'react-native-elements';
import AccordionView from './components/MilestoneAccordin';
import firebase from 'react-native-firebase';
import { Toast } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';


export class MileStone extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project: null,
            team_member: [],
            milestone: null,
            milestoneKey: null,
            milestoneUpdate: null,
        }
    }
    readProjectData = () => {
        firebase.database().ref('Project/' + this.props.navigation.getParam('uid')).on('value', (snapshot) => {
            this.setState({ project: snapshot.val() })
        });
    }
    readMilestoneData = () => {
        firebase.database().ref('Project/' + this.props.navigation.getParam('uid') + '/Milestones').orderByChild('time').on('value', (snapshot) => {
            if (snapshot.val() != undefined) {
                this.setState({ milestone: Object.values(snapshot.val()).reverse() })
                this.setState({ milestoneKey: Object.keys(snapshot.val()).reverse() })
            }
            else {
                this.setState({ milestone: [] })
                this.setState({ milestoneKey: [] })
            }
        })
        firebase.database().ref()
    }
    readTeamMember = () => {
        firebase.database().ref(`Project/${this.props.navigation.getParam('uid')}/Users`).on('value', (snapshot) => {
            this.setState({ team_member: Object.values(snapshot.val()) })
        })
    }
    onPressAddMilestone = () => {
        this.props.navigation.navigate("MilestoneCreationScreen", { uid: this.props.navigation.getParam('uid') })
    }
    componentDidMount() {
        if (this.state.project == null) {
            this.readProjectData()
        }
        if (this.state.team_member.length == 0) {
            this.readTeamMember()
        }
        if (this.state.milestone == null) {
            this.readMilestoneData()
        }
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                    <View className="project_title">
                        <Text style={styles.projectTitleStyle}>{this.state.project != null ? this.state.project.project_title : null}</Text>
                        <View style={styles.projectIDContainer}>
                            <TouchableOpacity onPress={() => {
                                Clipboard.setString(this.props.navigation.getParam('uid')),
                                    Toast.show({
                                        text: 'Copied to Clipboard',
                                        duration: 1100,
                                        textStyle: { textAlign: 'center' }
                                    })
                            }}>
                                <Text style={styles.projectIDStyle}> ID:{this.props.navigation.getParam('uid')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Divider style={styles.dividerStyle} />
                    <View className="project_description" style={styles.sectionContainerStyle}>
                        <Text style={styles.sectionLabelStyle}>DESCRIPTION</Text>
                        <Text style={styles.descriptionStyle}>{this.state.project != null ? this.state.project.project_description : null} </Text>
                    </View>
                    <View className="team_member" style={styles.flastListContainerStyle}>
                        <FlatList
                            data={this.state.team_member}
                            key={this.state.team_member.length}
                            contentContainerStyle={styles.profileListStyle}
                            extraData={this.state}
                            renderItem={({ item }) => (
                                <View style={styles.avatarWrapper}>
                                    <Avatar
                                        title={item.firstname[0] + item.lastname[0]}
                                        rounded
                                        size={WIDTH * 0.15}
                                        source={item.avatar != null ? { uri: item.avatar } : null}
                                    />
                                    <Text style={styles.avatarNameStyle}>{item.firstname}</Text>
                                    <Text style={styles.avatarNameStyle}>{item.lastname}</Text>
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
                    <AccordionView milestone={this.state.milestone} milestoneKey={this.state.milestoneKey} uid={this.props.navigation.getParam('uid')} />
            </ScrollView >
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
            flexGrow: 1,
        },
        projectIDStyle:
        {
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.027,
            color: '#3F5AA6',
        },
        projectIDContainer:
        {
            marginLeft: WIDTH * 0.4,
        },
        dividerStyle:
        {
            backgroundColor: '#BDCDD1',
            marginTop: HEIGHT * 0.01,
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
            marginLeft: WIDTH * 0.075 / 2,
            marginRight: WIDTH * 0.075 / 2,
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
        flashMessageStyle:
        {
            fontSize: WIDTH * 0.05,
            fontFamily: 'Avenir',
            textAlign: 'center',
            fontWeight: '300',
            justifyContent: 'center',
        },

    }
)

export default MileStone;