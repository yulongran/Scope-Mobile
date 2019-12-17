import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Alert,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Ionicons } from "@expo/vector-icons";
import { Text, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';


class AccordionView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeSections: [],
        };
    }
    /**https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript */
    romanize(num) {
        if (isNaN(num))
            return NaN;
        var digits = String(+num).split(""),
            key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    }

    onPressDeleteMilestone(index) {
        firebase.database().ref(`Project/${this.props.uid}/Milestones/${this.props.milestoneKey[index]}`).remove()
    }

    _renderSectionTitle = section => {
        return (
            <View>
            </View>
        );
    };

    _renderHeader = (section, index, isActive) => {
        return (
            <View style={styles.headerStyle}>
                <Text style={styles.headerTextStyle}>Milestone {this.romanize(index + 1)}</Text>
                <Text style={styles.headerTitleStyle}>{section.milestone_title}</Text>
                <View style={styles.iconStyle}>
                    {isActive ? <Ionicons name="ios-arrow-up" size={32} color="#3F5AA6" /> : <Ionicons name="ios-arrow-down" size={32} color="#3F5AA6" />}
                </View>
            </View>
        );
    };

    _renderContent = (section, index) => {
        return (
            <View style={styles.contentStyle}>
                <Text style={styles.contentTextStyle}>{section.milestone_description}</Text>
                <View style={{ alignSelf: 'flex-end' }}>
                    <Button
                        icon={<Ionicons name='md-remove-circle' size={WIDTH * 0.07} color="#ED4337" />}
                        buttonStyle={{ backgroundColor: 'white' }}
                        onPress={() => {
                            Alert.alert(
                                'Permanent delete Milestone',
                                '',
                                [
                                    {
                                        text: 'Yes', onPress: () => {
                                            this.onPressDeleteMilestone(index)
                                        }
                                    },
                                    { text: 'No', style: 'cancel' },
                                ],
                                {
                                    cancelable: true
                                }
                            )
                        }}
                    />
                </View>
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {
        return (
            <Accordion
                sections={this.props.milestone != null ? this.props.milestone : []}
                activeSections={this.state.activeSections}
                renderSectionTitle={this._renderSectionTitle}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
                sectionContainerStyle={styles.containerStyle}
                underlayColor={'white'}
            />
        );
    }
}

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create(
    {
        containerStyle:
        {
            borderWidth: 1,
            borderRadius: WIDTH * 0.03,
            borderColor: '#BDCDD1',
            padding: WIDTH * 0.02,
        },
        headerStyle:
        {
            flexDirection: 'row',
            alignItems: 'center',
        },
        headerTextStyle:
        {
            flex: 6,
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.045,
            fontWeight: '200',
            color: '#192A59',
        },
        headerTitleStyle:
        {
            flex: 6,
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.040,
            fontWeight: '200',
            color: '#192A59',
        },
        iconStyle:
        {
            flex: 1,
        },
        contentTextStyle:
        {
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.04,
            color: '#192A59',
            fontWeight: '400',
        },
        contentStyle:
        {
            margin: 8,
        },
    }
)

export default AccordionView;