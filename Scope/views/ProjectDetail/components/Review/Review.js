import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

export class Review extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }


    _renderItem({ item, index }) {
        return (
            <View>
                <Card
                    title='HELLO WORLD'
                    image={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg' }}>
                    <Text style={{ marginBottom: 10 }}>
                        The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                    <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='VIEW NOW' />
                </Card>
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.wrapperStyle}>
                <Text style={styles.sectionLabelStyle}>MY REIVEW</Text>
                <View style={styles.carouselStyle}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={[1, 2, 3]}
                        renderItem={this._renderItem}
                        sliderWidth={WIDTH}
                        itemWidth={WIDTH * 0.8}
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
                        size={WIDTH * 0.07} />
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
            flex: 1,
        },
        carouselStyle:
        {
            flex: 2,
            alignItems: 'center',
        },
        addButtonStyle:
        {
            flex: 1,
            alignSelf: 'flex-end',
        },
        sectionLabelStyle:
        {
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.045,
            color: '#3F5AA6',
            fontWeight: '900',
            fontStyle:'italic',
        },
    })

export default Review
