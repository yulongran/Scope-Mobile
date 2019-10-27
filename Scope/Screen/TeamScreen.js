import React, { Component } from 'react'
import {
    View, Text,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    FlatList,
    AsyncStorage,
} from 'react-native'
import MenuButton from '../Components/MenuButton'
import BackArrow from '../Components/BackArrow'
import Team from '../Components/Team'
import { Item } from 'native-base'


const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

class TeamScreen extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        project_id: '',
        team: [
        ],
    }

    /**
     * Fetch team info based on project id
     */

    async fetchTeam() {
        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/project/team',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    auth_token: token,
                    project_id: this.state.project_id
                },
            })
        let responseJson = await response.json();
        this.setState(
            {
                team: responseJson
            }
        )
        return true
    }

    /**
     * Insert Deplay between Welcome and Project Screen
     */
    componentDidMount() {
        this.setState(
            {
                project_id: this.props.navigation.getParam('project').project_id
            })
        this.fetchTeam()
    }

    render() {
        return (
            <View>
                <View style={{
                    marginLeft: WIDTH * 0.05,
                    marginRight: WIDTH * 0.05,
                    marginTop: WIDTH * 0.05,
                    height: HEIGHT * 0.7,
                }}>
                    <Text style={{ fontSize: WIDTH * 0.1 }}>
                        Teams
                </Text>
                    <FlatList
                        data={this.state.team}
                        renderItem={({ item }) => (
                            <Team team_number={item.team_number}
                                project_id={this.state.project_id}
                                onPress={() => {
                                    this.props.navigation.navigate("Review", { project: item, team_number: item.team_number, project_id: item.project_id })
                                }} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 3,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            fontSize: 30,
        }
    }
)

export default TeamScreen;