/**
 * 欢迎页
 * @flow
 * **/
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    InteractionManager,
} from 'react-native';
import HomePage from './HomePage';
import ThemeDao from '../expand/dao/ThemeDao';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class WelcomePage extends Component {
  componentDidMount() {
    const { navigator } = this.props;
    new ThemeDao().getTheme().then(((data) => {
      this.theme = data;
    }));

    this.timer = setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        navigator.resetTo({
          component: HomePage,
          name: 'HomePage',
          params: {
            theme: this.theme,
          },
        });
      });
    }, 500);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
              {/* <Image style={{flex:1,width:null}} resizeMode='repeat' source={require('../../res/images/LaunchScreen.png')}/> */}
            </View>
    );
  }
}
