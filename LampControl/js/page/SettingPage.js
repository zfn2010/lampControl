/**
 * 设备页
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import ViewUtils from '../util/ViewUtils'

export default class SettingPage extends Component {

    constructor(props){
      super(props);
      this.state = {
        theme: this.props.theme,
      };
    }
    
    onBack() {
        this.props.navigator.pop();
    }

    render() {
    var statusBar = {
        backgroundColor: this.state.theme.themeColor,
      };

    let navigationBar = 
        <NavigationBar
          title = '参数设置'
          style = {this.state.theme.styles.navBar}
          leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
          statusBar = {statusBar}
          hide = {false} />;

      return (
        <View >
          {navigationBar}
        </View>
      );
    }
}