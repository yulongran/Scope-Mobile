import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    Alert,
} from 'react-native';
import TeamRequest from '../../../../services/Team/index';

export class Team extends Component {
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
                project_id: '',
                team_number: '',
                team_member: [
                ],
            }
    }


    async componentDidMount() {
        this.setState(
            {
                team_number: this.props.team_number,
                project_id: this.props.project_id,
            }
        )
        const result = await TeamRequest.fetchTeamMember(this.props.project_id, this.props.team_number)
        if (result != false) {
            this.setState(
                {
                    team_member: result
                }
            )
        }
    }
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                onLongPress={() => {
                    Alert.alert(
                        'Would you like to join this team',
                        '',
                        [
                            {
                                text: 'Join', onPress: () => {
                                    this.joinTeam()
                                    this.props.joinTeamHandler()
                                }
                            },
                            { text: 'Cancel', style: 'cancel' },
                        ],
                        {
                            cancelable: true
                        }
                    )
                }
                }>
                <View style={styles.ViewStyle} >
                    <View style={{ marginTop: HEIGHT * 0.001, marginRight: WIDTH * 0.01 }}>
                        {/* <Button
                            onPress={() => {
                                this.removeTeam(),
                                this.props.handler()
                            }
                            }
                            icon={
                                <Ionicons name="md-remove" size={WIDTH * 0.04} color="red" />
                            }
                            buttonStyle={{ backgroundColor: 'white', paddingTop: -HEIGHT * 0.009, alignSelf: 'flex-end', }} /> */}

                    </View>
                    <Text style={styles.TeamNameStyle}>Team # {this.state.team_number}</Text>
                    <Text style={{ textAlign: 'center', marginTop: WIDTH * 0.01 }}>Contributors: {this.state.team_member.length}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
const WIDTH = Dimensions
    .get('window')
    .width

const HEIGHT = Dimensions.get('screen').height

const styles = StyleSheet.create({
    ViewStyle: {
        width: WIDTH * 0.38,
        height: HEIGHT * 0.15,
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        alignContent: 'center',
        justifyContent: 'center',
    },
    TeamNameStyle: {
        paddingTop: 7,
        color: 'blue',
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: WIDTH * 0.05,
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

export default Team



