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
import TeamRequest from '../../services/Team/index';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

class TeamScreen extends Component {

    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this)
        this.state = {
            project_id: '',
            team: [
            ],
        }
    }

    static navigationOptions = {
        title: 'Team',
        headerStyle: {
            backgroundColor: '#005AA7',

        },
        headerTintColor: 'white',
        headerTitleStyle:
        {
            fontFamily: 'Cochin',
            fontSize: 28,
        },
        headerBackTitleVisible: false,
        

    };



    /**
 * Update the project after project componet call delete API
 * @param {} someValue 
 */
    handler() {
        this.fetchTeam()
    }

    /**
     * Insert Deplay between Welcome and Project Screen
     */
    async componentDidMount() {
        this.setState(
            {
                project_id: this.props.navigation.getParam('project').project_id
            });
        const result = await TeamRequest.fetchTeam(this.props.navigation.getParam('project').project_id)
        if (result != false) {
            this.setState(
                {
                    team: result
                }
            )
        }
    }

    render() {
        return (
            <View>
                <View style={{
                    marginLeft: WIDTH * 0.05,
                    marginRight: WIDTH * 0.05,
                    marginTop: WIDTH * 0.05,
                }}>
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