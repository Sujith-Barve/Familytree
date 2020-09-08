import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
// import home from './src/components/Home';
import Navigator from  './src/routes/Homestack'


export default class App extends Component {
  render() {
    return (
      <Navigator/>
    );
  }           
}
