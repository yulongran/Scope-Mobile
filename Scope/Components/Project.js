import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Button,
    TouchableOpacity
} from 'react-native'
import {stringify} from 'qs'

export class Project extends Component
{
    /**
     * Construct a ProjectDisplay object
     * @param {*} props
     * @property projectName the name of the project
     * @property courseName the name of the course
     * @property schoolName the name of the institution
     * @property startDate the start date of the project
     * @property endDate the end date of the project
     * @property description brief description of the project
     * 
     */

    constructor(props)
    {
        super(props)
        this.state =
        {
            description: '',
        }
    }

    componentDidMount()
    {
        this.setState(
            {
                description: this.props.description,
            }
        )
    }
    render()
    {
        return (
            <TouchableOpacity onPress = {this.props.onPress}>
                <View style={styles.ViewStyle} >
                    <Text style={styles.ProjectNameStyle}>{this.props.projectName}</Text>
                    <Text style={styles.CourseStyle}>{this.props.courseName} {this.props.schoolName}</Text>
                    <Text style={styles.startDateStyle}>Start {this.props.startDate}</Text>
                    <Text style={styles.endDateStyle}>End {this.props.endDate}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
const WIDTH = Dimensions
    .get('window')
    .width
const styles = StyleSheet.create({
    ViewStyle: {
        width: WIDTH*0.38,
        height: 100,
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10
    },
    ProjectNameStyle: {
        paddingTop: 7,
        color: 'blue',
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    CourseStyle: {
        textAlign: 'center',
        paddingTop: 10
    },
    startDateStyle: {
        paddingTop: 10,
        textAlign: 'center',
        fontSize: 12
    },
    endDateStyle: {
        textAlign: 'center',
        fontSize: 12
    }
})

export default Project