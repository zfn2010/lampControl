/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
} from 'react-native';

import Main from './js/page/main';

class LampControl extends Component {
  render() {
    return (<Main />);
  }
}

AppRegistry.registerComponent('LampControl', () => LampControl);
