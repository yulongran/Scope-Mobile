import React, {Component,} from 'react';
import {StyleSheet, Text, View, Button, Platform, Dimensions} from 'react-native'
import Navigation from './Navigation/Navigation';

class App extends Component {
    render()
    {
        return (
            <View style={styles.container}>
              <Navigation/>
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
