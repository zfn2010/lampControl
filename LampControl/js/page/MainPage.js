/**
 * 主菜单页
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  InteractionManager
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import SettingPage from './SettingPage'
import ProblemSearchPage from './ProblemSearchPage'
import LampMapPage from './LampMapPage'
import FitImage from '../common/FitImage'
import Button from 'react-native-smart-button'
import Icon from 'react-native-vector-icons/Ionicons'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class BigButton extends Component {
  constructor(props){
    super(props);
    this.props = props;
    if( this.props.onPress ){
      this._onPress = this.props.onPress;
    }else{
      this._onPress = () => {};
    }
  }

  render(){
    return (
      <TouchableHighlight 
        style={[this.props.style,{margin:2}]}
        onPress = {this._onPress}
      >
      {/*<View style={[{flexDirection:this.props.direction},{flex:1, alignItems: 'center', justifyContent: 'center'}]}>
          <Image style={ {width:40, height:40, resizeMode: 'contain', tintColor:'white'} } source = {this.props.icon} />
          <Text style={{margin:6, color:'white', fontSize: 14, fontWeight: 'bold',}}>{this.props.text}</Text>
      </View>*/}
      <View style={[{flexDirection:this.props.direction},{flex:1, alignItems: 'center', justifyContent: 'center'}]}>
          <Icon name= {this.props.iconName} size={this.props.iconSize} color="white" />
          <Text style={{margin:6, color:'white', fontSize: 14, fontWeight: 'bold',}}>{this.props.text}</Text>
      </View>
      </TouchableHighlight>
    );
  }
}

export default class MainPage extends Component {
    constructor(props){
      super(props);
      this.state = {
        theme: this.props.theme,
      };
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    renderMoreButton(){
      return (
        <View style={{flexDirection: 'row',}}>
          <Button
            ref='button'
            underlayColor='transparent'           
          >
            <View style={{padding:10}}>
              <Image
                style={{width: 16, height: 16}}
                source={require('../../res/images/bar_more.png')} />      
            </View>
          </Button>
        </View>
      );
    }

    _goLampMap(){
      const { navigator} = this.props;
      if (navigator) {
        navigator.push({
          name: 'LampMapPage',
          component: LampMapPage,
          params: {...this.props}
        });
      }

    }

    _goSettingPage(){
      const { navigator} = this.props;
      if (navigator) {
        navigator.push({
          name: 'SetttingPage',
          component: SettingPage,
          params: {...this.props}
        });
      }
    }

    _goProblemSearchPage(){
      const { navigator} = this.props;
      if (navigator) {
        navigator.push({
          name: 'ProblemSearchPage',
          component: ProblemSearchPage,
          params: {...this.props}
        });
      }
    }


    render() {

      var statusBar = {
        backgroundColor: this.state.theme.themeColor,
      }

      let navigationBar = 
          <NavigationBar
            title = '智慧路灯'
            style = {this.state.theme.styles.navBar}
            rightButton={this.renderMoreButton()}
            statusBar = {statusBar}
            hide = {false} />;
      
      /*let logoImage = 
          <Image style = {styles.logoImage}
            source={require('../../res/images/mainpage.jpeg')}
          />*/
      let logoImage = 
        <FitImage style = {styles.logoImage}
          source={require('../../res/images/mainpage.jpeg')}
        />;

      let interestDevice = 
          <View style={styles.interestView}>
            <View style={{flexDirection: 'row'}} >
              {/*<Image style = {[styles.tabBarIcon]} source={require('../../res/images/attention.png')} />*/}
              <Icon name = 'ios-desktop-outline' size = {30}/>
              <Text  style={{fontSize:18, marginTop: 5, marginLeft:5}}>当前关注：</Text>
              <Text  style={{fontSize:18, marginTop: 5, color: 'red'}}>无选择设备</Text>
            </View>
          </View>

      let buttonView = 
        <View flexDirection='row' style={{flex:1}}>
          <View style={{flex:1,paddingLeft:2}}>
            <BigButton style={{flex:2, backgroundColor:'#E91E63'}}
              text= {'路灯地图'} 
              icon = {require('../../res/images/map.png')} 
              iconName = 'ios-map-outline'
              iconSize = {40}
              onPress = {this._goLampMap.bind(this)}
            />

            <BigButton style={{flex:1, backgroundColor:'#F44336'}}
                text= {'故障查询'} 
                direction = 'row'
                icon = {require('../../res/images/problem.png')} 
                iconName = 'ios-alert-outline'
                iconSize = {30}
                onPress = {this._goProblemSearchPage.bind(this)}/>

            <BigButton style={{flex:1, backgroundColor:'#4CAF50'}}
                text= {'参数设置'} 
                direction = 'row'
                iconName = 'ios-settings-outline'
                iconSize = {30}
                icon = {require('../../res/images/settings.png')} 
                onPress = {this._goSettingPage.bind(this)}
            />
          </View>

          <View style={{flex:1, paddingRight: 2}} >
            <BigButton style={{flex:1, backgroundColor:'#2196F3'}}
              text= {'单灯控制'} 
              direction = 'row'
              iconName = 'ios-bulb-outline'
              iconSize = {30}
              icon = {require('../../res/images/light.png')} />

            <BigButton style={{flex:2, backgroundColor:'#2196F3'}}
              text= {'终端控制'} 
              icon = {require('../../res/images/control.png')} 
              iconName = 'ios-options-outline'
              iconSize = {40}
            />
            <BigButton style={{flex:2, backgroundColor:'#FF9800'}}
              text= {'运行状态'} 
              icon = {require('../../res/images/search.png')} 
              iconName = 'ios-glasses-outline'
              iconSize = {40}
              />
          </View>
        </View>;

      return (
        <View style={styles.container}>
          {navigationBar}
          {logoImage}
          {interestDevice}
          {buttonView}
        </View>
      );
    }

  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logoImage: {
    height: 200,
    width: screenWidth,
    resizeMode: 'stretch',
  },

  interestView: {
    margin: 3,
    padding: 6,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
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
