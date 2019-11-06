import React, { Component } from 'react'
import {
    View, Text,
    StyleSheet,
    Dimensions,
    FlatList,
    AsyncStorage,
} from 'react-native'
import Team from './components/Team/index'
import { LinearGradient } from 'expo-linear-gradient';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

class TeamScreen extends Component {

    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this)
    }

    /**
     * Config Stack Navigator Header
     */
    static navigationOptions = {
        headerStyle: {
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerBackground: (
            <LinearGradient colors={['#3366cc', '#0066ff', '#ffffff']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }} />
        ),

    };

    state = {
        project_id: '',
        team: [
        ],
    }

    /**
 * Update the project after project componet call delete API
 * @param {} someValue 
 */
    handler() {
        this.fetchTeam()
    }
    /**
     * Fetch team info based on project id
     */

    async fetchTeam() {
        const token = await AsyncStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        let response = await fetch('http://localhost:8001/team',
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

    componentDidUpdate() {

    }

    render() {
        return (
            <View>
                <View style={{
                    marginLeft: WIDTH * 0.05,
                    marginRight: WIDTH * 0.05,
                    marginTop: WIDTH * 0.05,
                }}>
                    <Text style={{ fontSize: WIDTH * 0.1 }}>
                        Teams
                </Text>
                    <View style={{ height: HEIGHT * 0.72 }}>
                        <FlatList
                            data={this.state.team}
                            renderItem={({ item }) => (
                                <View>
                                    <Team team_number={item.team_number}
                                        project_id={this.state.project_id}
                                        handler={this.handler}
                                        onPress={() => {
                                            this.props.navigation.navigate("Review", { project: item, team_number: item.team_number, project_id: item.project_id })
                                        }} />
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
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