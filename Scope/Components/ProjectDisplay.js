import React, {Component} from 'react'
import {Text, View, StyleSheet, Dimensions} from 'react-native'
import {stringify} from 'qs'

export class ProjectDisplay extends Component
{
    /**
     * Construct a ProjectDisplay object
     * @param {*} props
     * @property projectName the name of the project
     * @property courseName the name of the course follow by insitution
     * @property date the time period of the project
     */
    constructor(props)
    {
        super(props)
    }
    render()
    {
        return (
            <View style={styles.ViewStyle}>
                <Text style={styles.ProjectNameStyle}>{this.props.projectName}</Text>
                <Text style={styles.CourseStyle}>{this.props.courseName}</Text>
                <Text style={styles.DateStyle}>Date {this.props.date}</Text>
            </View>
        )
    }
}
const WIDTH = Dimensions
    .get('window')
    .width
const styles = StyleSheet.create({
    ViewStyle: {
        width: WIDTH*0.4,
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
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
    DateStyle: {
        paddingTop: 10,
        textAlign: 'center',
        fontSize: 12
    }
})

export default ProjectDisplay