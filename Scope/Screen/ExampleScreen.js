import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, SafeAreaView, FlatList } from 'react-native'
import { Button } from 'react-native-elements';
import MenuButton from '../Components/MenuButton'
import { Ionicons } from "@expo/vector-icons";
import Review from '../Components/Review';


class ExampleScreen extends Component {

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

    state =
        {
            members: [
                {
                    name: "Miguel Morales-Suazo",
                },
                {
                    name: "Yulong Ran",
                },
                {
                    name: "Jingyi Wang",
                },
                {
                    name: "Elizabeth Wong",
                },
            ],
            description:
            {

            },
            Project: [
                {
                    projectName: "Scope",
                    courseName: "CS122",
                    schoolName: "SJSU",
                    startDate: "2018-08-01",
                    endDate: "2019-12-01",
                    description: " Angular is a rewrite of AngularJS. It focuses on good mobile development, modularity, and improved dependency injection. Angular is designed to comprehensively address a developer's web application workflow",
                    review: [
                        {
                            review:
                                "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
                            author: "David",
                            keyWord: "Meet on Time",

                        },
                        {
                            review:
                                "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
                            author: "Tom",
                            keyWord: "Reliable",
                        },
                        {
                            review:
                                "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
                            author: "Tom"
                        },
                        {
                            review:
                                "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
                            author: "Tom"
                        },
                    ]
                },
                {
                    projectName: "E-commerce web application",
                    courseName: "CS122",
                    schoolName: "SJSU",
                    startDate: "2019-08-01",
                    endDate: "2019-12-01",
                    description: " Angular is a rewrite of AngularJS. It focuses on good mobile development, modularity, and improved dependency injection. Angular is designed to comprehensively address a developer's web application workflow",
                    review: [
                        {
                            review:
                                "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
                            author: "David",
                            keyWord: "Meet on Time",

                        },
                        {
                            review:
                                "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
                            author: "Tom",
                            keyWord: "Reliable",
                        },
                        {
                            review:
                                "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
                            author: "Tom"
                        },
                        {
                            review:
                                "Google News is a news aggregator app developed by Google. It presents a continuous, customizable flow of articles organized from thousands of publishers and magazines. Google News is available as an app on Android, iOS, and the Web. ",
                            author: "Tom"
                        },
                    ]
                },
            ]

        }

    /**
     * name: 'David',
            review: 'Nice work, sdadaskdakdajdjasdaksdsadklajsdklakdasdasdasdasdsa',
            date: '09/07/2016'
     */

    getReviews() {
        return this.props.navigation.getParam('review').review
    }

    render() {


        return (
            <View style={styles.container}>
                <Ionicons onPress={() => this.props.navigation.navigate('Project')} name="md-arrow-round-back" size={32} color="blue" style={styles.backIconStyle}>
                </Ionicons>
                <Text style={styles.title}>Scope</Text>
                <Text style={styles.description}>Hold</Text>
                <View style={{ height: Dimensions.get('window').height * 0.24, justifyContent: 'center', flexDirection: 'row' }}>
                    <View style={{ alignContent: 'center' }}>
                        <Text style={{ fontSize: 15, marginTop: 30, }}>Group Members</Text>
                        <FlatList
                            data={this.state.members}
                            key={this.state.members}
                            renderItem={({ item }) => (
                                <Text style={{ fontSize: 12, color: 'blue', marginTop: 10, }}>{item.name}</Text>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ marginRight: 11 }}
                        />
                    </View>
                    <View>
                        <Text style={{ fontSize: 15, marginTop: 30, }}>Teachers & TAs</Text>
                        <FlatList
                            data={this.state.members}
                            renderItem={({ item }) => (
                                <Text style={{ fontSize: 12, color: 'blue', marginTop: 10, }}>{item.name}</Text>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ flexGrow: 1 }}
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end', marginRight: 15, height: Dimensions.get('screen').height * 0.08 }}>
                    <Button icon={
                        <Ionicons name="ios-add" size={30} color='blue' stlye={{ paddingRight: 10 }} />
                    }
                        type='outline'
                        title="AddReview"></Button>
                </View>


                <SafeAreaView style={styles.contentContainer}>
                    <FlatList
                        data={this.state.project}
                        renderItem={({ item }) => (
                            <Review name={item.author} review={item.review} keyWord={item.keyWord} date="09/07/2016"></Review>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state}
                        contentContainerStyle={{ alignItems: 'center', flexGrow: 1, borderRadius: 5, }}
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
            height: Dimensions.get('window').height * 0.8,
            width: Dimensions.get('window').width * 0.92,
            alignSelf: 'center',
            borderRadius: 5,
            flex: 1,

        }
    }
)

export default ExampleScreen;