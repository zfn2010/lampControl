import React, { Component } from 'react';
import {
    Navigator,
    BackAndroid,
    ToastAndroid,
} from 'react-native';
import WelcomePage from './page/WelcomePage';

let firstClick = 0;
function setup() {
  class Root extends Component {

    constructor(props) {
      super(props);
      this.handleBack = this.handleBack.bind(this);
      this.state = {
      };
    }

    componentDidMount() {
      BackAndroid.addEventListener('hardWareBackPress', this.handleBack);
    }

    componentWillUnmount() {
      BackAndroid.removeEventListener('hardWareBackPress', this.handleBack);
    }

    handleBack() {
      const navigator = this.navigator;
      if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
      }
      const timestamp = (new Date()).valueOf();
      if (timestamp - firstClick > 2000) {
        firstClick = timestamp;
        ToastAndroid.show('再按一次退出', ToastAndroid.SHORT);
        return true;
      }
      return false;
    }

    _renderScene(route, navigator) {
      const Component = route.component;
      this.navigator = navigator;
      return (
        <Component {...route.params} navigator={navigator} />
      );
    }
    render() {
      return (
        <Navigator
          initialRoute={{
            name: 'WelcomePage',
            component: WelcomePage,
          }}
          configureScene={(route) => {
                        // 跳转的动画
            const conf = Navigator.SceneConfigs.HorizontalSwipeJump;
            conf.gestures = null;
            return conf;
          }}
          renderScene={(e, i) => this._renderScene(e, i)}
        />
      );
    }
    }

  return <Root />;
}
module.exports = setup;
