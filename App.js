import React, { Component } from 'react';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import Navigator from './src/routes/Homestack'


export default class App extends Component {
  render() {
    return (
      <Navigator />
    );
  }
}
