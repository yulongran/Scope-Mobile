import React, { Component } from 'react'
import {
    View, Text,
    Image, StyleSheet, AsyncStorage,
    Dimensions, SafeAreaView, FlatList, TouchableOpacity, ScrollView
} from 'react-native'
import Review from './components/Review/index';
import MileStone from './components/Milestone/index';
import { Avatar, ButtonGroup, Divider, colors } from 'react-native-elements';
import Accordion from '@dooboo-ui/native-accordion';
import { Ionicons } from "@expo/vector-icons";
import { Container, Header, Content, Tab, Tabs } from 'native-base';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

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
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Project Detail',
            headerTintColor: '#192A59',
            headerTitleStyle:
            {
                fontFamily: 'Avenir',
                fontSize: 28,
                textAlign: 'center',
                flex: 1,
                fontWeight: '900',
            },
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <Container>
                        <Tabs tabBarUnderlineStyle={{ backgroundColor: '#3F5AA6' }}>
                            <Tab heading="Milestone" activeTabStyle={styles.selectionTabStyle}
                                tabStyle={{ backgroundColor: 'white' }}
                                textStyle={styles.tabTextStyle}
                                activeTextStyle={styles.tabTextStyle}>
                                <MileStone uid={this.props.navigation.getParam('uid')} navigation={this.props.navigation} />
                            </Tab>
                            <Tab heading="Review" activeTabStyle={styles.selectionTabStyle} tabStyle={{ backgroundColor: 'white' }}
                                textStyle={styles.tabTextStyle}
                                activeTextStyle={styles.tabTextStyle}>
                                <Review/>
                            </Tab>
                        </Tabs>
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
    }
)

export default ProjectReviewScreen;