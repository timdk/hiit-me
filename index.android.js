import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// import { Timer } from './src/app/components/Timer';
// import { styles } from './src/app/styles/styles';
import { Programme } from './src/app/components/Programme';

export default class HIITMe extends Component {
  render() {
    return (
      <Programme highDuration="15" lowDuration="30" intervals="10"></Programme>
    );
  }
}



AppRegistry.registerComponent('HIITMe', () => HIITMe);
