import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import Getuser from './components/Getuser.js';
import Uploadfile from './components/Uploadfile.js';
import Profile from './components/Profile.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      loading: true,
      token: ''
    };
  }

  login = async (json) => {
    const url = 'https://master.dev.mahara.org/';
    const serverUrl = url + 'webservice/rest/server.php?alt=json';
    const api = 'module_mobileapi_sync';

    const body = {
      blogs: {},
      folders: {},
      tags: {},
      userprofile: {},
      userprofileicon: {},
      wsfunction: "module_mobileapi_sync",
      wstoken: this.state.token
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    try {
      const response = await fetch(serverUrl, requestOptions);
      const json = await response.json();
      this.receiveRequest(json);
    } catch (error) {
      this.errorHandle(error);
    }
  };

  receiveRequest = (json) => {
    this.setState({
     loading: false,
     message: 'Hi ' + json.userprofile.myname + '!'
    });
  }

  errorHandle = (error) => {
    this.setState({
      stuff: 'Unable to connect to server'
    })
    console.log('errorr', error);
  }

  handler = async (value) => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:token');
      this.setState({token: value});
    } catch (error) {
      console.log("Error retrieving data" + error);
    }

    this.login();
  }

  render() {
    let message = this.state.message;

    return (
      <View style={styles.app}>
        <View style={styles.view}>
          <Text style={styles.title}>Mahara Mobile</Text>
          <View>{this.state.message ? <Text style={styles.message}>{this.state.message}</Text> : null}</View>
        </View>
        <View style={styles.container}>
          <Getuser handler={this.handler} />
          {this.state.token ? <Uploadfile style={{paddingTop: 20}} /> : null }
          {this.state.token ? <Profile style={{paddingTop: 20}} token={this.state.token} /> : null }
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff'
  },
  view: {
    height: 120,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  message: {
    paddingBottom: 10
  },
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});