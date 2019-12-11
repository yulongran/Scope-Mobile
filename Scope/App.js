import React, { Component, } from 'react';
import { StyleSheet, Text, View, Button, Platform, Dimensions } from 'react-native'
import Navigation from './navigation/index';
import { MenuProvider } from 'react-native-popup-menu';
import { Container} from 'native-base';

class App extends Component {
  render() {
    return (
      <Container>
      <MenuProvider>
        <View style={styles.container}>
          <Navigation />
        </View>
      </MenuProvider>
      </Container>
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
