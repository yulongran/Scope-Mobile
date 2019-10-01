import React, {Component,} from 'react';
import {StyleSheet, Text, View, Button, Platform, Dimensions} from 'react-native'
import DrawerNavigator from './Navigation/DrawerNavigation'
import HomeScreen from './Screen/HomeScreen';

class App extends Component {
    render()
    {
        return (
            <View style={styles.container}>
              <DrawerNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  }
});

export default App;
