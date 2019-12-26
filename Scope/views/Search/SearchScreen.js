import React, { Component } from 'react'
import {
    View, StyleSheet,
    Dimensions,
    Alert,
} from 'react-native';
import { Container, Header, Title } from 'native-base'
import { SearchBar, Button, } from "react-native-elements";
import firebase from 'react-native-firebase';
import Project from './components/Project/index';
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

class SearchScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: null,
            project: null,
            projectKey: null
        }
    }

    searchProject = (text) => {
        this.setState({ uid: text })
    }

    onPressSearch = () => {
        firebase.database().ref(`Project/${this.state.uid}`).once('value', (snapshot) => {
            this.setState({ project: snapshot.val() })
            this.setState({ projectKey: snapshot.key })
        })
    }

    onPressJoinProject = () => {
        Alert.alert(
            'Join this Project',
            '',
            [
                {
                    text: 'Yes', onPress: () => {
                        let my_uid = firebase.auth().currentUser.uid;
                        firebase.database().ref(`Project/${this.state.uid}/Users`).orderByChild('uid').equalTo(my_uid).once('value', (snapshot) => {
                            if (!snapshot.exists()) {
                                firebase.database().ref(`Users/${my_uid}`).once('value', (snapshot) => {
                                    let user = snapshot.val()
                                    firebase.database().ref(`Project/${this.state.uid}/Users`).push({
                                        uid: my_uid,
                                        firstname: user.firstname,
                                        lastname: user.lastname,
                                        avatar: user.avatar != null ? user.avatar : null
                                    }).then(() => {
                                        firebase.database().ref(`Users/${my_uid}/Project`).push({
                                            uid: this.state.uid
                                        })
                                    }).then(() => {
                                        alert("Successfully Join this Project")
                                        this.setState({
                                            project: null,
                                            projectKey: null,
                                            uid: null,
                                        })
                                    })
                                })
                            }
                        }).then(() => {

                        })
                    }
                },
                { text: 'No', style: 'cancel' },
            ],
            {
                cancelable: true
            }
        )
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: 'white', alignItems: 'center' }}>
                    <Title style={styles.titleStyle}>Project Search</Title>
                </Header>
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <SearchBar
                        placeholder="Search by Project ID"
                        showCancel={true}
                        inputStyle={{ fontSize: WIDTH * 0.035, fontFamily: 'Avenir', color: '#3F5AA6' }}
                        inputContainerStyle={styles.searchStyle}
                        containerStyle={styles.searchSectionStyle}
                        round={true}
                        lightTheme={true}
                        onChangeText={text => this.searchProject(text)}
                        value={this.state.uid}
                    />
                    <Button
                        title="Search"
                        type={'clear'}
                        titleStyle={{ color: '#3F5AA6' }}
                        onPress={this.onPressSearch}
                    />
                </View>
                <View>
                    {this.state.project != null ?
                        <Project
                            project_title={this.state.project.project_title}
                            project_course={this.state.project.project_course}
                            project_startDate={this.state.project.project_startDate}
                            project_endDate={this.state.project.project_endDate}
                            onPress={this.onPressJoinProject}
                            index={1}
                            uid={this.state.projectKey != null ? this.state.projectKey : null}
                        /> : <View />}
                </View>
            </Container>
        )
    }
}


const styles = StyleSheet.create(
    {
        titleStyle:
        {
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.07,
            textAlign: 'center',
            flex: 1,
            color: '#192A59',
            fontWeight: '900',
            width: WIDTH,
        },
        searchStyle: {
            width: WIDTH * 0.75,
            height: HEIGHT * 0.05,
            borderRadius: 15,
            borderWidth: 0.6,
            borderBottomWidth: 0.6,
            backgroundColor: 'white',
        },
        searchSectionStyle:
        {
            backgroundColor: 'white',
            borderBottomColor: 'white',
        },
    }
)

export default SearchScreen;