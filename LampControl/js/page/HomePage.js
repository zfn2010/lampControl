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
    if(!theme) return;
    this.setState({
      theme: theme,

    });

  }

    _renderTab(Component, selectedTab, title, renderIcon) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={title}
                selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
                renderIcon={() => <Image style={styles.tabBarIcon}
                                         source={renderIcon}/>}
                renderSelectedIcon={() => <Image
                    style={[styles.tabBarSelectedIcon, this.state.theme.styles.tabBarSelectedIcon]}
                    source={renderIcon}/>}
                onPress={() => this.onSelected(selectedTab)}>
                <Component {...this.props} theme={this.state.theme} homeComponent={this}/>
            </TabNavigator.Item>
        );
    }

  render() {
    return (
      <View style={styles.container}>
          <TabNavigator>
            {this._renderTab(MainPage, FLAG_TAB.flag_mainTab, '主页', require('../image/home.png'))}
            {this._renderTab(DevicePage, FLAG_TAB.flag_deviceTab, '设备', require('../image/device.png'))}
             {this._renderTab(SettingPage, FLAG_TAB.flag_settingTab, '设置', require('../image/settings.png'))} 
            {this._renderTab(MyPage, FLAG_TAB.flag_myTab, '我', require('../image/ic_my.png'))} 
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


