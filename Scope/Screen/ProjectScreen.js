import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import MenuButton from '../Components/MenuButton'
import ProjectDisplay from '../Components/ProjectDisplay'

class ProjectScreen extends Component 
{
    state = {
        Projects: [
            {
                projectName : 'Scope',
                courseName: 'CS122 SJSU',
                date: '08/01/2019 - 12/01/2019',
            }, 
            {
                projectName : 'HelloWorld',
                courseName: 'CS66 SJSU',
                date: '08/01/2019 - 12/01/2019',
            },
        ]

    }
    render()
    {
        return(
            <View style = {styles.container}>
                <MenuButton navigation = {this.props.navigation}/>
                <FlatList style = {styles.listStyle}>
                {
                    this.state.Projects.map((project)=>
                    {
                        return(
                            <ProjectDisplay projectName={project.projectName} courseName= {project.courseName}
                            date= {project.date}/>
                        )
                    }
                    )
                }
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex:3,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent :'center',
        },
        text: {
            fontSize: 30,
        },
    }
)

export default ProjectScreen;