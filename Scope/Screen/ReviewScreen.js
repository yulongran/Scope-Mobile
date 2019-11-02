import React, { Component } from 'react'
import {
    View, Text,
    Image, StyleSheet, Dimensions, SafeAreaView, FlatList, ImageBackground, TouchableOpacity
} from 'react-native'
import { Button } from 'react-native-elements';
import MenuButton from '../Components/MenuButton'
import { Ionicons } from "@expo/vector-icons";
import Review from '../Components/Review';
import MileStone from '../Components/MileStone';
import People from '../Components/People';
import ProfilePic from '../assets/profile_default.jpg'


const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

class ReviewScreen extends Component {

    /**
     * Construct a ProjectDisplay object
     * @param {*} props
     * @property projectName the name of the project
     * @property courseName the name of the course
     * @property schoolName the name of the institution
     * @property startDate the start date of the project
     * @property endDate the end date of the project
     */
    constructor(props) {
        super(props)

    }


    /**
    * Config Stack Navigator Header
    */
    static navigationOptions = {
        headerBackground: (
            <LinearGradient colors={['#3366cc', '#0066ff', '#ffffff']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }} />
        ),
    };

    state =
        {
            project: '',
            members: [
                {
                    name: "Adams, John",
                },
                {
                    name: "Buck, Pearl",
                },
                {
                    name: "Chapin, Harry",
                },
                {
                    name: "Corgan, Billy",
                },
            ],
            milestone: [
                {
                    milestone_number: 1,
                    milestone_description: 'E/R Diagram'
                },
                {
                    milestone_number: 2,
                    milestone_description: 'E/R Diagram'
                },
                {
                    milestone_number: 3,
                    milestone_description: 'E/R Diagram'
                },
            ],
            reviews: [

            ],

        }

    /**
     * name: 'David',
            review: 'Nice work, sdadaskdakdajdjasdaksdsadklajsdklakdasdasdasdasdsa',
            date: '09/07/2016'
     */

    componentDidMount() {
        this.setState(
            {
                project: this.props.navigation.getParam('project')
            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Ionicons onPress={() => this.props.navigation.navigate('Project')} name="md-arrow-round-back" size={32} color="blue" style={styles.backIconStyle}>
                </Ionicons>
                <Text style={styles.title}>{this.state.project.project_title}</Text>
                <Text style={styles.description}>{this.state.project.project_description}</Text>
                <View style={{ height: Dimensions.get('window').height * 0.24, justifyContent: 'center', flexDirection: 'row', marginLeft: WIDTH * 0.1 }}>
                    <View style={{ alignContent: 'center', alignItems: 'center', width: WIDTH * 0.4 }}>
                        <Text style={{ fontSize: 16, marginTop: 28, marginBottom: 10 }}>Group Members</Text>
                        <FlatList
                            data={this.state.members}
                            key={this.state.members}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={{ marginRight: WIDTH * 0.015 }}>
                                    <Image source={ProfilePic} style={{
                                        width: WIDTH * 0.1,
                                        height: WIDTH * 0.1,
                                        borderRadius: WIDTH * 0.1 / 2,
                                        alignSelf: 'center',
                                    }} />
                                    <Text style={{
                                        marginTop: HEIGHT * 0.008,
                                        fontSize: 12,
                                        alignSelf: 'center'
                                    }}>Everett Parker</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ width: WIDTH * 0.5, }}
                            numColumns={2}
                        />
                    </View>
                    <View style={{ alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, marginTop: 28, marginBottom: 10 }}>Teachers & TAs</Text>
                        <FlatList
                            data={this.state.members}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={{ marginTop: 11 }}>
                                    <Image source={ProfilePic} style={{
                                        width: WIDTH * 0.1,
                                        height: WIDTH * 0.1,
                                        borderRadius: WIDTH * 0.1 / 2,
                                        alignSelf: 'center',
                                    }} />
                                    <Text style={{
                                        marginTop: HEIGHT * 0.008,
                                        fontSize: 12,
                                        alignSelf: 'center'
                                    }}>Everett Parker</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ width: WIDTH * 0.5 }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: HEIGHT * 0.05 }}>
                </View>


                <SafeAreaView style={styles.contentContainer}>
                    <FlatList
                        data={this.state.milestone}
                        renderItem={({ item }) => (
                            <MileStone milestone_number={item.milestone_number} milestone_description={item.milestone_description}></MileStone>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state}
                        contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
                    />
                </SafeAreaView>
            </View>

        )
    }
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 3,

        },
        title: {
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 20,
        },
        description:
        {
            marginLeft: Dimensions.get('window').width * 0.1,
            marginRight: Dimensions.get('window').width * 0.1,
            textAlign: 'center',
        },
        backIconStyle:
        {
            color: 'black',
            marginLeft: Dimensions.get('window').width * 0.1,
            paddingTop: Dimensions.get('window').height * 0.08,
        },
        contentContainer:
        {
            height: Dimensions.get('window').height * 0.7,
            width: Dimensions.get('window').width * 0.92,
            alignSelf: 'center',
            borderRadius: 5,
            flex: 1,

        },
        touchStyle:
        {
            borderWidth: 0.5,
            borderRadius: 10 / 2,
            width: WIDTH * 0.5,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'blue',
        }
    }
)

export default ReviewScreen;