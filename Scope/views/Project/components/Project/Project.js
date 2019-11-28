import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert,
} from 'react-native'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import ProjectRequest from '../../../../services/Project/index';


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

class Project extends Component {
    /**
     * Construct a ProjectDisplay object
     * @param {*} props
     * @property projectName the name of the project
     * @property courseName the name of the course
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
                description: '',
                delete: false,
            }
    }

    componentDidMount() {
        this.setState(
            {
                description: this.props.description,
            }
        )
    }
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.containerStyle}>
                    <View className="project_menu_selection" style={{ alignSelf: 'flex-end', paddingRight: 20 }}>
                        <Menu style={{ marginLeft: WIDTH * 0.33 }}>
                            <MenuTrigger>
                                <Ionicons
                                    name="ios-more"
                                    color="#000000"
                                    size={WIDTH * 0.04}
                                />
                            </MenuTrigger>
                            <MenuOptions optionsContainerStyle={{ width: WIDTH * 0.2, borderRadius: 8 }}>
                                <MenuOption text='Edit' />
                                <MenuOption text='Remove' onSelect={() => {
                                    Alert.alert(
                                        'Permanent delete project',
                                        '',
                                        [
                                            {
                                                text: 'Yes', onPress: () => {
                                                    var response = ProjectRequest.deleteProject(this.props.project_id)
                                                    if (response) {
                                                        this.setState({
                                                            delete: true,
                                                        })
                                                    }
                                                    this.props.handler()
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
                            <Text style={styles.ProjectNameStyle}>{this.props.projectName}</Text>
                            <View style={{ marginTop: HEIGHT * 0.01, marginLeft: WIDTH * 0.03 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="ios-calendar" size={18} color='red'></Ionicons>
                                    <Text style={styles.startDateStyle}>From {this.props.startDate}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="ios-calendar" size={18} color='red'></Ionicons>
                                    <Text style={styles.endDateStyle}>To     {this.props.endDate}</Text>
                                </View>
                            </View>
                        </View>
                        <View className="right_container" style={styles.rightSideStyle}>
                            <Avatar
                                rounded
                                source={{
                                    uri:
                                        ProfilePic[Math.floor(Math.random() * ProfilePic.length)],
                                }}
                                size={42}
                                containerStyle={{margin:10}}
                            />
                            <Avatar
                                rounded
                                source={{
                                    uri:
                                        ProfilePic[Math.floor(Math.random() * ProfilePic.length)],
                                }}
                                size={42}
                                containerStyle={{margin:10}}
                            />
                            <Avatar
                                rounded
                                source={{
                                    uri:
                                        ProfilePic[Math.floor(Math.random() * ProfilePic.length)],
                                }}
                                size={42}
                                containerStyle={{margin:10}}
                            />
                        </View>
                    </View>

                </View>
            </TouchableOpacity>



        )
    }
}

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
const styles = StyleSheet.create({
    containerStyle:
    {
        width: WIDTH * 0.9,
        height: HEIGHT * 0.145,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderTopColor: '#EBEEF7',
        borderBottomColor: '#EBEEF7',
        borderRadius: 10,
        margin: 10,
    },
    ViewStyle: {
        flexDirection: 'row',
    },
    rightSideStyle:
    {
        marginLeft: WIDTH * 0.12,
        flexDirection: 'row',
        alignItems:'flex-end',
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
        fontSize: 12,
        fontFamily: 'Avenir',
        marginLeft: 10,
        fontWeight: '200',
    },
    endDateStyle: {
        textAlign: 'center',
        fontSize: 12,
        marginLeft: 10,
        fontFamily: 'Avenir',
        fontWeight: '200',
    }
})

export default Project



