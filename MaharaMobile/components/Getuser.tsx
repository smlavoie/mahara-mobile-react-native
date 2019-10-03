import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, AsyncStorage } from 'react-native';

export default class Getuser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: ''
    };
  };

  updateToken = async (input) => {
    let token = input.trim();

    try {
      await AsyncStorage.setItem('@MySuperStore:token', input);
    } catch (error) {
      // Error saving data
      console.log('Error saving data', error);
    }
  }

  render() {

    return (
      <View style={{padding: 20, color: 'black', flex: 1, justifyContent: 'flex-start'}}>
        <TextInput
          style={styles.textInputStyle}
          defaultValue='ab6f3b68f8b0b976cf6b51eac2cd54da'
          onChangeText={(token) => this.updateToken(token)}
        />
        <Button
          title="Verify token"
          onPress={() => this.props.handler(this.state.token) }
         />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInputStyle: {
    color: 'green',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    height: 40,
  }
})
