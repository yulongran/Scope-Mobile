import React, { Component, } from 'react';
import { StyleSheet, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import ProjectNavigation from './navigation/ProjectNavigation';
import AuthNavigation from './navigation/AuthNavigation'
import firebase from 'react-native-firebase';
import { firebaseConfig } from './firebaseConfig';
import { Root } from "native-base";

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      }
      else {
        this.setState({ user: null })
      }
    })
  }
  render() {
    return (
      <Root>
      <MenuProvider>
      <View style={styles.container}>
        {this.state.user ? <ProjectNavigation /> : <AuthNavigation />}
      </View>
      </MenuProvider>
      </Root>
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
