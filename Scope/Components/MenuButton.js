import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

export default class MenuButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ alignSelf: 'flex-start', marginLeft:WIDTH*0.05}}>
                <Ionicons
                    name="md-menu"
                    color="#000000"
                    size={32}
                    style={styles.menuIcon}
                    onPress={() => this.props.navigation.toggleDrawer()}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create(
    {
        menuIcon: {
            alignSelf: 'flex-start',
        }
    }
)