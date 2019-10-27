import React, { Component, } from 'react';
import { StyleSheet, Text, View, Button, Platform, Dimensions } from 'react-native'
import Navigation from './Navigation/Navigation';
import { MenuProvider } from 'react-native-popup-menu';

class App extends Component {
  render() {
    return (
      <MenuProvider>
      <View style={styles.container}>
        <Navigation />
      </View>
      </MenuProvider>
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
