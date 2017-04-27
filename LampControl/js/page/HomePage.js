/**
 * 首页
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import MainPage from './MainPage';
import DevicePage from './DevicePage';
import SettingPage from './SettingPage';
import MyPage from './MyPage';
import Icon from 'react-native-vector-icons/Ionicons';


export const FLAG_TAB = {
  flag_mainTab: 'flag_mainTab',
  flag_deviceTab: 'flag_devicaTab',
  flag_settingTab: 'flag_settingTab',
  flag_myTab: 'flag_myTab',
};
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    let selectedTab = this.props.selectedTab ? this.props.selectedTab : FLAG_TAB.flag_mainTab;
    this.state = {
      selectedTab: selectedTab,
      theme: this.props.theme,
    };
  }

  onSelected(object) {
    this.setState({
      selectedTab: object,
    });
  }

  onThemeChange(theme) {
    if (!theme) return;
    this.setState({
      theme: theme,

    });

  }

  _renderTab(Component, selectedTab, title, iconName) {
    return (
      <TabNavigator.Item
        selected={this.state.selectedTab === selectedTab}
        title={title}
        selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
        renderIcon={() => <Icon name={iconName} size={25} color='black'/>}
        renderSelectedIcon={() => <Icon name={iconName} size={25} color='#F44336'/>}
        onPress={() => this.onSelected(selectedTab)}>
        <Component {...this.props} theme={this.state.theme} homeComponent={this} />
      </TabNavigator.Item>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          {this._renderTab(MainPage, FLAG_TAB.flag_mainTab, '主页', 'ios-home-outline')}
          {this._renderTab(DevicePage, FLAG_TAB.flag_deviceTab, '设备', 'ios-laptop-outline')}
          {this._renderTab(SettingPage, FLAG_TAB.flag_settingTab, '设置', 'ios-settings-outline')}
          {this._renderTab(MyPage, FLAG_TAB.flag_myTab, '我', 'ios-contact-outline')}
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tabBarIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },

  tabBarSelectedIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  }
});


