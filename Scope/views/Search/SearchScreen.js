import React, { Component } from 'react'
import {
    View, Text, StyleSheet,
    Dimensions, FlatList, TouchableOpacity,
    TextInput,
    Image,
} from 'react-native';
import { Container, Header, Left, Body, Right, Title } from 'native-base'
import { SearchBar, Button } from "react-native-elements";
import firebase from 'react-native-firebase';
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

class SearchScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: null,
            project:null,
        }
    }

    searchProject = (text) => {
        this.setState({ uid: text })
    }

    onPressSearch = () => {
        firebase.database().ref(`Project/${this.state.uid}`).once('value', (snapshot)=>
        {
            console.log(snapshot.val())
        })
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }} searchBar rounded>
                    <Left />
                    <Body>
                        <Title style={styles.titleStyle}>Project Search</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <SearchBar
                        placeholder="Search"
                        showCancel={true}
                        inputStyle={{ fontSize: WIDTH * 0.045, fontFamily: 'Avenir' }}
                        inputContainerStyle={styles.searchStyle}
                        containerStyle={styles.searchSectionStyle}
                        round={true}
                        lightTheme={true}
                        onChangeText={text => this.searchProject(text)}
                        value={this.state.uid}
                    />
                    <Button
                        title="Search"
                        raised
                        type={'clear'}
                        titleStyle={{ color: '#3F5AA6' }}
                        onPress={this.onPressSearch}
                    />

                </View>
            </Container>
        )
    }
}


const styles = StyleSheet.create(
    {
        titleStyle:
        {
            fontFamily: 'Avenir',
            fontSize: WIDTH * 0.07,
            textAlign: 'center',
            flex: 1,
            color: '#192A59',
            fontWeight: '900',
            width: WIDTH,
        },
        searchStyle: {
            width: WIDTH * 0.75,
            height: HEIGHT * 0.05,
            borderRadius: 15,
            borderWidth: 0.6,
            borderBottomWidth: 0.6,
            backgroundColor: 'white',
        },
        searchSectionStyle:
        {
            backgroundColor: 'white',
            borderTopColor: 'white',
            borderBottomColor: 'white',
        },
    }
)

export default SearchScreen;