import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Ionicons } from "@expo/vector-icons";
import { Text } from 'react-native-elements';

const SECTIONS = [
    {
        title: 'First',
        content: 'Identifying the overall purpose of the project. Designing a research tool, designing an assay or other diagnostic tool',
    },
    {
        title: 'Second',
        content: 'Identifying the overall purpose of the project. Designing a research tool, designing an assay or other diagnostic tool',
    },
    {
        title: 'First',
        content: 'Identifying the overall purpose of the project. Designing a research tool, designing an assay or other diagnostic tool',
    },
    {
        title: 'Second',
        content: 'Identifying the overall purpose of the project. Designing a research tool, designing an assay or other diagnostic tool',
    },
];

class AccordionView extends Component {
    state = {
        activeSections: [],
    };

    _renderSectionTitle = section => {
        return (
            <View>
            </View>
        );
    };

    _renderHeader = (section, isActive) => {
        return (
            <View style={styles.headerStyle}>
                <Text style={styles.headerTextStyle}>Milestone I</Text>
                <View style={styles.iconStyle}>
                    <Ionicons name="ios-arrow-down" size={32} color="#3F5AA6"></Ionicons>
                </View>
            </View>
        );
    };

    _renderContent = section => {
        return (
            <View style={styles.contentStyle}>
                <Text style={styles.contentTextStyle}>{section.content}</Text>
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {
        return (
            <Accordion
                sections={SECTIONS}
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
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.05,
            fontWeight: '200',
            color: '#707070',
        },
        iconStyle:
        {
            marginLeft: WIDTH * 0.55,
        },
        contentTextStyle:
        {
            fontFamily: 'Helvetica Neue',
            fontSize: WIDTH * 0.04,
            fontWeight: '400',
            color: '#707070',
        },
        contentStyle:
        {
            margin: 10
        },
    }
)

export default AccordionView;