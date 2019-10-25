import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    FlatList,
} from 'react-native'
import People from '../Components/People';


export class MileStone extends Component {
    constructor(props) {
        super(props)
    }

    state =
        {
            team_member: [1, 2, 3, 4],
        }

    render() {
        return (
            <View style={styles.viewStyle}>
                <View style={styles.textStyle}>
                    <Text style={styles.titleStyle}>Milestone {this.props.milestone_number}</Text>
                    <Text style={styles.descriptionStyle}>{this.props.milestone_description}</Text>
                </View>
                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Text>
                        Start Date
                    </Text>
                    <Text>
                    {this.props.milestone_startDate.slice(0,10)}
                    </Text>
                    <Text>
                        End Date 
                    </Text>
                    <Text>
                    {this.props.milestone_endDate.slice(0,10)}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        viewStyle:
        {
            borderWidth: 0.3,
            borderBottomColor: 'gray',
            paddingLeft: Dimensions.get('window').width * 0.05,
            paddingRight: Dimensions.get('window').width * 0.05,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height * 0.12,
            paddingBottom: Dimensions.get('window').height * 0.01,
            flexDirection: 'row',
        },
        titleStyle:
        {
            padding: Dimensions.get('window').width * 0.03,
            fontSize: 15,
            fontStyle: 'italic',
            fontWeight: 'bold',
        },
        descriptionStyle:
        {
            paddingLeft: Dimensions.get('window').width * 0.04,
        },
        textStyle:
        {
            marginRight:Dimensions.get('window').width * 0.31,
        }
    }
)

export default MileStone;