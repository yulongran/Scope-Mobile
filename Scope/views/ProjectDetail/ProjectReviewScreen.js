import React, { Component } from 'react'
import {
    View, Text,
    ImageBackground, StyleSheet,
    Dimensions, SafeAreaView, FlatList, TouchableOpacity, ScrollView,
} from 'react-native'
import Review from './components/Review/index';
import MileStone from './components/Milestone/index';
import { Avatar, ButtonGroup, Divider, colors } from 'react-native-elements';
import Accordion from '@dooboo-ui/native-accordion';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content } from 'native-base';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

/**
 * 
 * @param {<a href="http://www.freepik.com">Designed by rawpixel.com / Freepik</a>} num 
 */
/**https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript */
function romanize(num) {
    var lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }, roman = '', i;
    for (i in lookup) {
        while (num >= lookup[i]) {
            roman += i;
            num -= lookup[i];
        }
    }
    return roman;
}
class ProjectReviewScreen extends Component {

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
        this.state = {
            activePage: 1,
        }
    }

    /** https://stackoverflow.com/questions/52392725/changing-segment-content-onpress */
    selectComponent = (activePage) => () => this.setState({ activePage })

    /** https://stackoverflow.com/questions/52392725/changing-segment-content-onpress */
    _renderComponent = () => {
        if (this.state.activePage === 1)
            return <MileStone uid={this.props.navigation.getParam('uid')} navigation={this.props.navigation} />
        else
            return <Review uid={this.props.navigation.getParam('uid')} navigation={this.props.navigation} />
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Project Detail',
            headerTintColor: '#192A59',
            headerRight: <View/>,
              headerTitleStyle:
              {
                flex:1,
                fontFamily: 'Avenir',
                fontSize: WIDTH*0.06,
                fontWeight: '900',
                textAlign:'center',
              },
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView style={{ backgroundColor: '#FBFBFB' }}>
                    <Container>
                        <Segment style={{ backgroundColor: 'white' }}>
                            <Button active={this.state.activePage === 1}
                                transparent
                                style={{
                                    justifyContent: 'center',
                                    width: WIDTH * 0.4,
                                    borderRadius: WIDTH * 0.01,
                                    borderWidth: 1,
                                    borderColor: this.state.activePage == 1 ? '#3F5AA6' : '#BDCDD1',
                                    borderLeftWidth: 1,
                                    backgroundColor: this.state.activePage == 1 ? '#3F5AA6' : '#FFFFFF',
                                }}
                                onPress={this.selectComponent(1)}>
                                <Text style={{ color: this.state.activePage == 1 ? '#FFFFFF' : '#3F5AA6' }}>Milestone</Text>
                            </Button>
                            <Button active={this.state.activePage === 2} style={{
                                justifyContent: 'center',
                                width: WIDTH * 0.4,
                                borderRadius: WIDTH * 0.01,
                                borderWidth: 1,
                                borderColor: this.state.activePage == 2 ? '#3F5AA6' : '#BDCDD1',
                                borderLeftWidth: 1,
                                backgroundColor: this.state.activePage == 2 ? '#3F5AA6' : '#FFFFFF',
                            }}
                                onPress={this.selectComponent(2)}><Text style={{
                                    textAlign: 'center',
                                    color: this.state.activePage == 2 ? '#FFFFFF' : '#3F5AA6'
                                }}>Review</Text></Button>
                        </Segment>
                        <Content padder>
                            {this._renderComponent()}
                        </Content>
                    </Container>
                </ScrollView>
            </SafeAreaView >
        )
    }
}


const styles = StyleSheet.create(
    {
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
            borderRadius: 5,
            flex: 1,
        },
        touchStyle:
        {
            borderWidth: 0.5,
            borderRadius: 10 / 2,
            width: WIDTH * 0.20,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#f9c2ff',
        },
        touchOnStyle:
        {
            borderWidth: 0.5,
            borderRadius: 10 / 2,
            width: WIDTH * 0.20,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#d7ecfc',
            backgroundColor: '#d7ecfc',
        },
        groupListStyle: {
            alignContent: 'center',
            height: Dimensions.get('window').height * 0.24,
            marginTop: HEIGHT * 0.02,
            alignItems: 'center',
            alignSelf: 'center',
            width: WIDTH * 0.8,
            flex: 0.5,
        },
        selectionTabStyle:
        {
            backgroundColor: 'white',
        },
        AccordionStyle:
        {
            borderWidth: 1, borderColor: '#E9E9F0', padding: 10, borderRadius: 10
        },
        tabTextStyle:
        {
            fontFamily: 'Avenir',
            color: '#3F5AA6',
            fontWeight: '900',
            fontStyle: 'italic',
        },
        backgroundImage: {
            flex: 1,
            alignSelf: 'stretch',
            width: null,
        }
    }
)

export default ProjectReviewScreen;