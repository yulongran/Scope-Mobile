import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Dimensions, Image, TextInput, SafeAreaView
} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { Avatar, AirbnbRating, Button } from 'react-native-elements';
import { Container, Content, Textarea, Form, CheckBox, Body } from "native-base";
import firebase from 'react-native-firebase';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const rating = ['Unsatisfactory', 'Improvement needed', 'Meets expectations', 'Exceeds expectations']
class EvaluationScreen extends Component {
    constructor(props) {
        super(props)
        this.state =
        {
            team_member: null,
            team_memberKey: null,
            reviewee: 0,
            rating: 0,
            review_description: '',
            anonymous: false,
        }
        this.ratingCompleted = this.ratingCompleted.bind(this)
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Evaluation',
            headerTintColor: '#192A59',
            headerTitleStyle:
            {
                fontFamily: 'Avenir',
                fontSize: WIDTH * 0.06,
                textAlign: 'center',
                fontWeight: '900',
            },
        };
    }

    readTeamMember = () => {
        let users = []
        let usersKey = []
        firebase.database().ref(`Project/${this.props.navigation.getParam('uid')}/Users`).on('value', (snapshot) => {
            Object.values(snapshot.val()).forEach(element => {
                usersKey.push(element.uid)
                firebase.database().ref(`Users/${element.uid}`).once('value', (snapshot) => {
                    users.push(snapshot.val())
                }).then(() => {
                    this.setState({ team_member: users })
                    this.setState({ team_memberKey: usersKey })
                })
            })
        })
    }


    ratingCompleted(value) {
        this.setState({ rating: value })
    }

    _renderItem({ item, index }) {
        return (
            <View style={{ alignItems: 'center' }}>
                <Avatar rounded title={item.firstname[0] + item.lastname[0]} size={WIDTH * 0.25} />
                <Text style={styles.nameStyle}>{item.firstname} {item.lastname}</Text>
            </View>
        );
    }
    onChangeItem = (index) => {
        this.setState({ reviewee: index })
    }

    onChangeTextArea = (value) => {
        this.setState({ review_description: value })
    }

    onPressAnonymous = () => {
        this.setState({ anonymous: !this.state.anonymous })
    }

    onSubmitPress = () => {
        let reviewer = null;
        firebase.database().ref('Users/' + firebase.auth().currentUser.uid).once('value', (snapshot) => {
            reviewer = snapshot.val();
        }).then(() => {
            firebase.database().ref(`Project/${this.props.navigation.getParam('uid')}`).child('Reviews').push({
                reviewee: this.state.team_memberKey[this.state.reviewee],
                reviewer: reviewer,
                review_description: this.state.review_description,
                rating: this.state.rating,
                anonymous: this.state.anonymous,
                reviewer_firstname: reviewer.firstname,
                reviewee_firstname: this.state.team_member[this.state.reviewee].firstname,
            }).then(() => {
                this.props.navigation.goBack();
            })
        })
    }

    componentDidMount() {
        if (this.state.team_member == null) {
            this.readTeamMember()
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.containerStyle}>
                <View style={styles.carouselStyle}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.team_member !== null ? this.state.team_member : []}
                        renderItem={this._renderItem}
                        sliderWidth={WIDTH}
                        itemWidth={WIDTH * 0.8}
                        removeClippedSubviews={false}
                        onSnapToItem={this.onChangeItem}
                    />
                </View>
                <View style={styles.sliderStyle}>
                    <AirbnbRating
                        count={4}
                        reviews={rating}
                        defaultRating={0}
                        size={WIDTH * 0.04}
                        starContainerStyle={{ backgroundColor: '#FAFBFF' }}
                        onFinishRating={this.ratingCompleted}
                        selectedColor={'#3F5AA6'}
                        reviewColor={'#3F5AA6'}
                    />
                </View>
                <Container style={styles.textAreaContainerStyle}>
                    <Content padder>
                        {/* <View style={{ flexDirection: 'row' }}>
                            <CheckBox checked={this.state.anonymous} color="#3F5AA6" onPress={this.onPressAnonymous} />
                            <Body>
                                <Text style={{
                                    fontFamily: 'Avenir',
                                    fontWeight: '800',
                                    fontSize: WIDTH * 0.05,
                                    color: '#3F5AA6',
                                }}>Remain Anonymous</Text>
                            </Body>

                        </View> */}
                        <Form style={{ backgroundColor: 'white', padding: WIDTH * 0.05 }}>
                            <Textarea rowSpan={5} style={styles.textAreaStyle} bordered placeholder="Leave a Review" onChangeText={this.onChangeTextArea} />
                        </Form>
                        <View className="submit_button" style={{ justifyContent: 'flex-end' }}>
                            <Button
                                title="SUBMIT"
                                type="solid"
                                titleStyle={{ textAlign: 'center' }}
                                buttonStyle={styles.submitButtonStyle}
                                onPress={this.onSubmitPress}
                                disabled={this.state.rating == 0 || this.state.review_description.length == 0}
                            />
                        </View>
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create(
    {
        containerStyle:
        {
            backgroundColor: '#FAFBFF',
            height: '100%',
        },
        carouselStyle:
        {
            marginTop: HEIGHT * 0.05,
        },
        nameStyle:
        {
            fontFamily: 'Avenir',
            margin: 5,
            fontWeight: '800',
            fontSize: WIDTH * 0.07,
            color: '#3F5AA6',
        },
        sliderStyle:
        {
            marginTop: HEIGHT * 0.02,
            alignSelf: 'center',
            width: WIDTH * 0.8,
            backgroundColor: '#FAFBFF',
        },
        ratingStyle:
        {
            backgroundColor: '#FAFBFF',
        },
        textAreaStyle:
        {
            fontFamily: 'Avenir',
            color: '#828899',
            flex: 1,
            height: HEIGHT * 0.25,
        },
        textAreaContainerStyle:
        {
            marginTop: HEIGHT * 0.05,
        },
        submitButtonStyle:
        {
            width: WIDTH * 0.8,
            backgroundColor: '#3F5AA6',
            alignSelf: 'center',
            borderRadius: (WIDTH + HEIGHT) / 2,
        },
    }
)
export default EvaluationScreen;