import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Button,
    TouchableOpacity,
    FlatList,
    Image,
    AsyncStorage,
} from 'react-native';
import ProfilePic from '../assets/profile_default.jpg';
import { stringify } from 'qs'
import People from './People';

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
    }

    state =
        {
            project_id: '',
            team_number: '',
            team_member: [
            ],
        }

    async fetchTeamMember() {
        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/team/member_size',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                    project_id: this.state.project_id,
                    team_number: this.state.team_number,
                },
            })
        let responseJson = await response.json();
        this.setState(
            {
                team_member: responseJson
            }
        )
        return true
    }

    componentDidMount() {
        this.setState(
            {
                team_number: this.props.team_number,
                project_id: this.props.project_id,
            }
        )
        this.fetchTeamMember()
    }
    render() {
        return (
            // <TouchableOpacity onPress={() => {
            //     this.props.navigation.navigate("Review", {
            //         team_member: this.state.team_member,
            //         team_number: this.state.team_number,
            //         project_id: this.state.project_id,
            //     })
            // }}>
            <TouchableOpacity 
                onPress={this.props.onPress}>
                <View style={styles.ViewStyle} >
                    <Text style={styles.TeamNameStyle}>Team # {this.state.team_number}</Text>
                    <Text style={{ textAlign: 'center', marginTop: WIDTH * 0.01 }}>Number in party: {this.state.team_member.length}</Text>
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



