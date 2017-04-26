'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

import TimerMixin from 'react-timer-mixin';

const {width, height} = Dimensions.get('window');
const navigatorH = 64; // navigator height
const [aWidth, aHeight] = [300, 214];
const [left, top] = [0, 0];
const [middleLeft, middleTop] = [(width - aWidth) / 2, (height - aHeight) / 2 - navigatorH];

const styles = StyleSheet.create({
  container: {
    position:"absolute",
    width:width,
    height:height,
    left:left,
    top:top,
  },
  mask: {
    justifyContent:"center",
    backgroundColor:"#383838",
    opacity:0.8,
    position:"absolute",
    width:width,
    height:height,
    left:left,
    top:top,
  },
  tip: {
    width:aWidth,
    height:aHeight,
    left:middleLeft,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"space-between",
  },
  tipTitleView: {
    height:55,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  tipTitleText:{
    color:"#999999",
    fontSize:14,
  },
  tipContentView: {
    width:aWidth,
    borderTopWidth:0.5,
    borderColor:"#f0f0f0",
    height:45,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  tipText:{
    color:"#e6454a",
    fontSize:17,
    textAlign:"center",
  },
  button: {
    height: 45,
    backgroundColor: '#fff',
    //borderColor: '#e6454a',
    //borderWidth: 1,
    //borderRadius: 4,
    alignSelf: 'stretch',
    justifyContent: 'center',
    //marginLeft: 10,
    //marginRight: 10,
  },
  buttonText: {
    fontSize:17,
    color:"#e6454a",
    textAlign:"center",
  },
  gap:{
    height:10,
    width:aWidth,
    backgroundColor:'#383838',
    opacity:0.8,
  },
});

//console.log('======');

export default class Alert extends Component {
  mixins = [TimerMixin];
  parent ={};

  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(0),
      opacity: new Animated.Value(0),
      title: "",
      choose1: "",
      choose2: "",
      hide: true,
    };
  }

  render() {
    if(this.state.hide){
      return (<View />)
    } else {
      return (
        <View style={styles.container} >
          <Animated.View style={ styles.mask } >
          </Animated.View>

          <Animated.View style={[styles.tip , {transform: [{
                translateY: this.state.offset.interpolate({
                 inputRange: [0, 1],
                 outputRange: [height, (height-aHeight -34)]
                }),
              }]
            }]}>
            <View style={styles.tipTitleView}>
              <Text style={styles.tipTitleText}>{this.state.title}</Text>
            </View>
            <TouchableHighlight style={styles.tipContentView} underlayColor='#f0f0f0' onPress={this.choose.bind(this,this.state.choose1)}>
              <Text style={styles.tipText} >{this.state.choose1}</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.tipContentView} underlayColor='#f0f0f0' onPress={this.choose.bind(this,this.state.choose2)}>
              <Text style={styles.tipText} >{this.state.choose2}</Text>
            </TouchableHighlight>

            <View style={styles.gap}/>

            <TouchableHighlight style={styles.button} underlayColor='#f0f0f0' onPress={this.iknow.bind(this)}>
              <Text style={styles.buttonText}>取消</Text>
            </TouchableHighlight>
          </Animated.View>
        </View>
      );
    }
  }

  componentDidMount() {
  }

  //显示动画
  in() {
    Animated.parallel([
      Animated.timing(
        this.state.opacity,
        {
          easing: Easing.linear,
          duration: 500,
          toValue: 0.8,
        }
      ),
      Animated.timing(
        this.state.offset,
        {
          easing: Easing.linear,
          duration: 500,
          toValue: 1,
        }
      )
    ]).start();
  }

  //隐藏动画
  out(){
    Animated.parallel([
      Animated.timing(
        this.state.opacity,
        {
          easing: Easing.linear,
          duration: 500,
          toValue: 0,
        }
      ),
      Animated.timing(
        this.state.offset,
        {
          easing: Easing.linear,
          duration: 500,
          toValue: 0,
        }
      )
    ]).start();

    setTimeout(
      () => this.setState({hide: true}),
      500
    );
  }

  //取消
  iknow(event) {
    if(!this.state.hide){
      this.out();
    }
  }

  //选择
  choose(msg) {
    //console.log(msg);
    if(!this.state.hide){
      this.out();
      this.parent.setState({sex:msg});
    }
  }

  show(title: string, choose1:string,choose2:string ,obj:Object) {
    this.parent = obj;
    if(this.state.hide){
      this.setState({title: title, choose1: choose1, choose2: choose2, hide: false}, this.in);
    }
  }
}
