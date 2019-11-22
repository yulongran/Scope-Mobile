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
import ProjectRequest from '../../../../services/Project/index';


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
                    <View className="project_menu_selection" style={{alignSelf:'flex-end', paddingRight: 20}}>
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
                        <Text style={styles.ProjectNameStyle}>{this.props.projectName}</Text>
                        {/**<Text style={styles.CourseStyle}>{this.props.courseName} {this.props.schoolName}</Text>**/}
                        <View style={{ marginTop: HEIGHT * 0.03, marginLeft: WIDTH * 0.03 }}>
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
        height: HEIGHT * 0.15,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ViewStyle: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    ProjectNameStyle: {
        color: 'blue',
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: WIDTH * 0.04,
    },
    CourseStyle: {
        textAlign: 'center',
        // paddingTop: HEIGHT * 0.01,
        fontFamily: 'DevanagariSangamMN-Bold'
    },
    startDateStyle: {
        textAlign: 'center',
        fontSize: 12,
        marginLeft: 5,
    },
    endDateStyle: {
        textAlign: 'center',
        fontSize: 12,
        marginLeft: 5,
    }
})

export default Project



