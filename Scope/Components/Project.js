import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
} from 'react-native-popup-menu';
import { Ionicons } from '@expo/vector-icons'

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
export class Project extends Component {
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


    async deleteProject() {
        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/project/delete',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                    project_id: this.props.project_id
                },
            })
        let responseJson = await response.text();
        if (responseJson == 'Success') {
            this.setState(
                {
                    delete: true,
                }
            )
        }
        return true

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
                    <Menu style={{ marginLeft: WIDTH * 0.33, }}>
                        <MenuTrigger>
                            <Ionicons
                                name="md-menu"
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
                                                this.deleteProject()
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
                    <View style={styles.ViewStyle} >
                        <Text style={styles.ProjectNameStyle}>{this.props.projectName}</Text>
                        <Text style={styles.CourseStyle}>{this.props.courseName} {this.props.schoolName}</Text>
                        <Text style={styles.startDateStyle}>Start {this.props.startDate}</Text>
                        <Text style={styles.endDateStyle}>End {this.props.endDate}</Text>
                    </View>

                </View>
            </TouchableOpacity>



        )
    }
}
const styles = StyleSheet.create({
    containerStyle:
    {
        width: WIDTH * 0.38,
        height: HEIGHT * 0.15,
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
    },
    ViewStyle: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    ProjectNameStyle: {
        paddingTop: 7,
        color: 'blue',
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    CourseStyle: {
        textAlign: 'center',
        paddingTop: HEIGHT * 0.01,
    },
    startDateStyle: {
        paddingTop: HEIGHT * 0.001,
        textAlign: 'center',
        fontSize: 12
    },
    endDateStyle: {
        textAlign: 'center',
        fontSize: 12
    }
})

export default Project



