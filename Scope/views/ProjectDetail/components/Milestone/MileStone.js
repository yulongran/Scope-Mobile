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
    }

    render() {
        return (
            <View style={styles.container} >
                <View className="project_title">
                    <Text style={styles.projectTitleStyle}>Project Title</Text>
                    <View style={styles.projectIDContainer}>
                        <Text style={styles.projectIDStyle}> ID: 10123123132 </Text>
                    </View>
                </View>
                <Divider style={styles.dividerStyle} />
                <View className="project_description" style={styles.sectionContainerStyle}>
                    <Text style={styles.sectionLabelStyle}>DESCRIPTION</Text>
                    <Text style={styles.descriptionStyle}>Donec porttitor, turpis vitae pretium dignissim, magna
tellus porttitor felis, eu ornare mi tortor at justo. Cras
laoreet vel nibh ut sodales. Duis velit nisl, eleifend vitae
massa nec, molesti  in purus fringilla, commodo libero ac,
 viverra arcu. Curabitur non blandit enim, sed blandit
quam. Cras facilisis dictum nisi, ac rhoncus metus. </Text>
                </View>
                <View className="team_member" style={styles.flastListContainerStyle}>
                    <FlatList
                        data={[1, 2, 3]}
                        key={[1, 2, 3]}
                        contentContainerStyle={styles.profileListStyle}
                        renderItem={({ item }) => (
                            <View style={styles.avatarWrapper}>
                                <Avatar
                                    rounded
                                    size={WIDTH * 0.15}
                                    source={{
                                        uri:
                                            ProfilePic[Math.floor(Math.random() * ProfilePic.length)],
                                    }} />
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
                        onPress={() => alert("Handle Add Milestone")}
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
            marginBottom:WIDTH * 0.05,
            marginLeft: WIDTH*0.05,
            marginRight: WIDTH*0.05,
            marginTop: WIDTH*0.02,
            
        },
        projectIDStyle:
        {
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.03,
            color: '#3F5AA6',
        },
        projectIDContainer:
        {
            marginLeft: WIDTH * 0.6,
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
            marginTop: HEIGHT*0.015,
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