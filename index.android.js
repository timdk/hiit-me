import React, { Component } from 'react';
import { AppRegistry, Navigator, BackAndroid } from 'react-native';

// import { Timer } from './src/app/components/Timer';
// import { styles } from './src/app/styles/styles';
import { CreateProgramme } from './src/app/components/CreateProgramme';
import { Programme } from './src/app/components/Programme';

export default class HIITMe extends Component {

  render() {
    //  <Programme highDuration="15" lowDuration="30" intervals="10"></Programme>
    return (
      <Navigator
        initialRoute={{ name: 'CreateProgramme' }}
        renderScene={(route, navigator) => {
          if (route.name === 'CreateProgramme') {
            return <CreateProgramme navigator={navigator} />
          } else if (route.name === 'Programme') {
            return <Programme navigator={navigator} {...route.passProps} />
          }
        }}
      />
    );
  }

}

AppRegistry.registerComponent('HIITMe', () => HIITMe);
