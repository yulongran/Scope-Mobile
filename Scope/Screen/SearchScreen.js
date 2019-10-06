import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import MenuButton from '../Components/MenuButton'
import { SearchBar } from "react-native-elements";

class SearchScreen extends Component {

    state = {
        search: '',
    }

    updataSearch(text) {
        this.setState({
            search: text
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <MenuButton navigation={this.props.navigation} />
                <SearchBar
                    placeholder="Search"
                    showCancel={true}
                    inputStyle={{ backgroundColor: "white" }}
                    inputContainerStyle={{ backgroundColor: "white" }}
                    containerStyle={styles.searchStyle}
                    lightTheme={true}
                    onChangeText={text => this.updataSearch(text)}
                    value={this.state.search}
                    onClear={this.reload}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 3,
            backgroundColor: '#fff',
        },
        text: {
            fontSize: 30,
        },
        searchStyle: {
            width: Dimensions.get("window").width * 0.9,
            marginBottom: 7,
            backgroundColor: "white",
            marginTop: Dimensions.get("window").height * 0.10,
            alignSelf: 'center',

        },
    }
)

export default SearchScreen;