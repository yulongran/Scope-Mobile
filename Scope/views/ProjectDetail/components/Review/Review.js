import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';
import { Card, ListItem, Button, Icon, Avatar, AirbnbRating } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel';
import firebase from 'react-native-firebase';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('screen').width;
const rating = ['Unsatisfactory', 'Improvement needed', 'Meets expectations', 'Exceeds expectations']
export class Review extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: null,
        }
        this._renderItem = this._renderItem.bind(this)

    }
    onPressAddMilestone = () => {
        this.props.navigation.navigate('EvaluationScreen', { uid: this.props.uid })
    }

    readReview = () => {
        let my_uid = firebase.auth().currentUser.uid;
        firebase.database().ref(`Project/${this.props.uid}/Reviews`).orderByChild('reviewee').equalTo(my_uid).on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                this.setState({ reviews: Object.values(snapshot.val()) })
            }
        })
    }

    _renderItem({ item, index }) {
        return (
            <View>
                <Card containerStyle={{ borderRadius: WIDTH * 0.05 / 2, backgroundColor: '#FAFBFF', }}>
                    <View style={{ height: HEIGHT * 0.4 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Avatar rounded
                                source={item.reviewer_avatar != null ? { uri: item.reviewer_avatar } : null} 
                                title={item.reviewer_firstname[0]} size={WIDTH * 0.1} />
                            <View style={{ flexDirection: 'row', marginLeft: WIDTH * 0.01 }}>
                                <Text style={{
                                    fontFamily: 'Avenir',
                                    fontSize: WIDTH * 0.04,
                                    fontWeight: '600',
                                    fontStyle: 'italic',
                                }}>Review from </Text>
                                <Text style={styles.reviewerStyle}>{item.reviewer_firstname}</Text>
                            </View>
                        </View>
                        <View>
                            <AirbnbRating
                                count={4}
                                reviews={rating}
                                defaultRating={item.rating}
                                size={20}
                                reviewSize={WIDTH * 0.05}
                                isDisabled={true}
                                selectedColor={'#3F5AA6'}
                                reviewColor={'#3F5AA6'}
                            />
                        </View>
                        <ScrollView style={styles.descriptionContainerStyle}>
                            <Text style={styles.reviewDescriptionStyle}>
                                {item.review_description}
                            </Text>
                        </ScrollView>
                    </View>
                </Card>
            </View>
        );
    }

    componentDidMount() {
        if (this.state.reviews == null) {
            this.readReview()
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.wrapperStyle}>
                <View>
                    <Text style={styles.sectionLabelStyle}>MY REIVEW</Text>
                </View>
                <View style={styles.carouselStyle}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.reviews != null ? this.state.reviews : []}
                        renderItem={this._renderItem}
                        sliderWidth={WIDTH}
                        itemWidth={WIDTH * 0.8}
                        extraData={this.state.reviews}
                    />
                </View>
                <View style={styles.addButtonStyle}>
                    <Icon
                        raised
                        name='md-add'
                        type='ionicon'
                        color='#3F5AA6'
                        reverse={true}
                        onPress={this.onPressAddMilestone}
                        size={WIDTH * 0.05} />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create(
    {
        wrapperStyle:
        {
            margin: WIDTH * 0.025,
        },
        carouselStyle:
        {
            alignItems: 'center',
        },
        addButtonStyle:
        {
            alignSelf: 'flex-end',
            marginTop: HEIGHT * 0.12,
        },
        sectionLabelStyle:
        {
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.045,
            color: '#3F5AA6',
            fontWeight: '900',
            fontStyle: 'italic',
        },
        reviewDescriptionStyle:
        {
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.035,
            color: '#3F5AA6',
            fontWeight: '600',
            fontStyle: 'italic',
            padding: WIDTH * 0.025,
        },
        reviewerStyle:
        {
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.04,
            color: '#3F5AA6',
            fontWeight: '600',
            fontStyle: 'italic',
        },
        descriptionContainerStyle:
        {
            marginTop: HEIGHT * 0.01,
            borderWidth: 1,
            margin: WIDTH * 0.01,
            borderRadius: WIDTH * 0.05 / 2,
            height: HEIGHT * 0.2,
            borderColor: '#EBEEF7',
            backgroundColor: 'white',
        },
    })

export default Review
