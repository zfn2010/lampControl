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
  Text,
  InteractionManager,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Button from 'react-native-smart-button'
import ViewUtils from '../util/ViewUtils'
import Icon from 'react-native-vector-icons/Ionicons'
import Dimensions from 'Dimensions';
import {
  MapView,
  MapTypes,
  Geolocation
} from 'react-native-baidu-map';

import ProgressiveInput from 'react-native-progressive-input';

export default class LampMapPage extends Component {

    constructor(props){
      super(props);
      this.state = {
        theme: this.props.theme,
        showMap: false,
        mayType: MapTypes.NORMAL,
        zoom: 13,
        center: {
          longitude: 114.31,
          latitude: 30.52
        },
        trafficEnabled: false,
        baiduHeatMapEnabled: false,
        markers: null,
        value: '',
        isLoading: false,
      };

      InteractionManager.runAfterInteractions(() => {
          this.setState({showMap:true});
      });
    }
    
    onBack() {
        this.props.navigator.pop();
    }

    _locateMap(){
      Geolocation.getCurrentPosition().then(data => {
        this.setState({
          zoom: 15,
          marker: {
            latitude: data.latitude,
            longitude: data.longitude,
            title: '当前位置'
          },

          center: {
            latitude: data.latitude,
            longitude: data.longitude
          }
        });
      }).catch(e =>{
        console.warn(e, 'error');
      })
    }

    _zoomOut(){
      var newZoom = this.state.zoom + 1;
      this.setState( {zoom : newZoom});
    }

    _zoomIn(){
      var newZoom = this.state.zoom - 1;
      this.setState( {zoom : newZoom});
    }

    _onChangeText(text){
      this.setState({isLoading: true, value: text});

    }

    render() {
    var statusBar = {
        backgroundColor: this.state.theme.themeColor,
      };

    let navigationBar = 
        <NavigationBar
          title = '路灯地图'
          style = {this.state.theme.styles.navBar}
          leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
          statusBar = {statusBar}
          hide = {false} />;

    let map = <View />
    if( this.state.showMap ){
      map =
      <View style={{flex:1}}>  
        <MapView 
            trafficEnabled={this.state.trafficEnabled}
            baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
            zoom={this.state.zoom}
            mapType={this.state.mapType}
            center={this.state.center}
            style={styles.map}
            zoomControlsVisible = {false}
            marker = {this.state.marker}
            onMarkerClick={(e) => {
              console.warn(JSON.stringify(e));
            }}
          >
        </MapView>

        <View style = {styles.mapSearchInpuText}>
            <ProgressiveInput
              value = {this.state.value}
              isLoading = {this.state.isLoading}
              onChangeText = {this._onChangeText.bind(this)}
              autoFocus = {true}
            />
          </View>

          <View style = {styles.mapZoomButton} >
             <Button
              onPress = {this._zoomOut.bind(this)}
              touchableTypes = {Button.constants.touchableTypes.highlight}
             >
                {/*<Icon name='ios-add-outline'size={40} style = {styles.mapZoomIcon}/>*/}
                <Image source = {require('../../res/images/plus.png')} style = {styles.mapZoomIcon}/>
              </Button>

              <Button
                onPress = {this._zoomIn.bind(this)}
                touchableTypes = {Button.constants.touchableTypes.highlight}
              >
                <Image source = {require('../../res/images/minus.png')} style = {styles.mapZoomIcon}/>
              </Button>
          </View>

          <View style = {styles.maplocButton}> 
            <Button  
              onPress = {this._locateMap.bind(this)}
              touchableTypes = {Button.constants.touchableTypes.highlight}
            >
              <Image source = {require('../../res/images/loc.png')} style = {styles.maplocIcon}/>
            </Button>
          </View>
      </View>  
    }

      return (
        <View style={styles.container}>
          {navigationBar}
          {map}

        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    flex:1,
    // marginBottom: 16
  },

  mapZoomButton: {
    position:'absolute',
    bottom: 20,
    right: 5
  },

  mapZoomIcon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },

  maplocButton: {
    position:'absolute',
    bottom: 40,
    left: 5,
  },

  maplocIcon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },

  mapSearchInpuText: {
    position:'absolute',
    left: 10,
    right: 10,
    top: 10,
    backgroundColor: 'white',
  }
});