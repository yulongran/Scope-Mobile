import React, { Component } from 'react'
import {
    View, Text, StyleSheet,
    Dimensions, FlatList, TouchableOpacity,
    TextInput,
    Image, 
} from 'react-native'
import ProfilePic from '../../assets/images/profile_default.jpg';
import UserRequest from '../../services/User/index';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

class SearchScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            user_firstname: '',
            user_lastname: '',
            people: [],
        }
    }

    updateSearch(text) {
        this.setState({
            search: text
        });
    }

    onChangeText(text) {
        if (text.length == 0) {
            this.setState(
                {
                    people: [],
                }
            )
        }
        this.setState(
            {
                search: text
            }
        )
    }

    componentDidMount() {
        //this.fetchPeople()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={{
                            height: HEIGHT * 0.06,
                            borderTopColor: 'gray',
                            borderBottomColor: 'gray',
                            borderLeftColor: 'white',
                            borderRightColor: 'white',
                            borderWidth: 0.5,
                            width: WIDTH * 0.7,
                            marginLeft: WIDTH * 0.05
                        }}
                        onChangeText={text => this.onChangeText(text)}
                        value={this.state.search}
                        placeholder={"Search"}
                    >
                    </TextInput>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                        borderWidth: 0.5,
                        borderRightColor: "white",
                        borderLeftColor: 'white',
                        borderTopColor: 'gray',
                        borderBottomColor: 'gray',
                    }}
                        onPress={async () => {
                            var text = this.state.search
                            if (text.length == 0) {
                                return false;
                            }
                            var name = text.split(',');
                            if (name.length == 1) {
                                this.setState(
                                    {
                                        user_firstname: name[0],
                                    }
                                )
                            }
                            else {
                                this.setState(
                                    {
                                        user_firstname: name[0],
                                        user_lastname: name[1],
                                    }
                                )
                            }
                            var result =await UserRequest.fetchPeople(this.state.user_firstname, this.state.user_lastname)
                            if(result !=false)
                            {
                                this.setState({
                                    people: result
                                })
                            }
                        }}>
                        <Text style={{ color: 'blue' }}>Search</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <FlatList
                        data={this.state.people}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{
                                marginRight: WIDTH * 0.015,
                                width: WIDTH * 0.27,
                                height: WIDTH * 0.3,
                                marginTop: HEIGHT * 0.01,
                            }}>
                                <Image source={ProfilePic} style={{
                                    width: WIDTH * 0.2,
                                    height: WIDTH * 0.2,
                                    borderRadius: WIDTH * 0.2 / 2,
                                    alignSelf: 'center',
                                }} />
                                <Text style={{
                                    marginTop: HEIGHT * 0.008,
                                    fontSize: WIDTH * 0.03,
                                    alignSelf: 'center'
                                }}>{item.user_firstname}</Text>
                                <Text style={{
                                    fontSize: WIDTH * 0.03,
                                    alignSelf: 'center'
                                }}>
                                    {item.user_lastname}
                                </Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{ width: WIDTH * 0.85 }}
                        numColumns={3}
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 3,
            backgroundColor: '#fff',
            marginTop: HEIGHT * 0.10,
        },
        text: {
            fontSize: 30,
        },
        searchStyle: {
            width: Dimensions.get("window").width * 0.9,
            marginBottom: 7,
            backgroundColor: "white",
            marginTop: Dimensions.get("window").height * 0.01,
            alignSelf: 'center',

        },
    }
)

export default SearchScreen;