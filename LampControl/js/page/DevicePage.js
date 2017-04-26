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
  TouchableHighlight,
  FlatList,
  InteractionManager,
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import SearchBar from '../common/SearchBar'
import LampMapPage from './LampMapPage'
import Button from 'react-native-smart-button'
import Icon from 'react-native-vector-icons/Ionicons'
import ViewUtils from '../util/ViewUtils'
import DeviceItem from '../common/DeviceItem'
import CheckBox from 'react-native-check-box'

type Item = {
  title: string,
  problemType: string,
  time: string,
  key: number,
}


export default class DevicePage extends Component {

    constructor(props){
      super(props);
      this.state = {
        theme: this.props.theme,
        data: [],
        showcontent:false,
      };

      InteractionManager.runAfterInteractions(() => {
        this.setState({showcontent:true, data: this.genItemData(1000)});
      });
    }

    genItemData(count: number): Array<Item>{
      const dataBlob = [];
      for( let ii = 0; ii < count; ++ii){
        dataBlob.push({
          title: '设备' + ii,
          problemType: '开灯无电流',
          time: '2017-4-21',
          key: ii,
        });         
      }
      return dataBlob;
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

    _renderItemComponent = ({item}) => {
      /*return (
        <View>
          <Text>{item.title}</Text>
          <Text>{item.problemType}</Text>
          <Text>{item.time}</Text>
        </View>
      );*/

      return <DeviceItem name={item.title} />
    }

    onBack() {
        this.props.navigator.pop();
    }

  _shouldItemUpdate(prev, next) {
    /**
     * Note that this does not check state.horizontal or state.fixedheight
     * because we blow away the whole list by changing the key in those cases.
     * Make sure that you do the same in your code, or incorporate all relevant
     * data into the item data, or skip this optimization entirely.
     */
    return prev.item !== next.item;
  }

  renderCheckBox(data) {
            let leftText = data.name;
            let isChecked=this.isRemoveKey?false:data.checked;
            return (
                <CheckBox
                    style={{flex: 1, padding: 5}}
                    onClick={()=>{}}
                    isChecked={isChecked}
                    rightText={leftText}
                    checkedImage={<Icon name='ios-checkbox-outline' size={25} />}
                    unCheckedImage={<Icon name='ios-square-outline' size={25} />}
                />);
    }

    render() {

    var statusBar = {
        backgroundColor: this.state.theme.themeColor,
      };

    let navigationBar = 
        <NavigationBar
        title = '设备选择'
        style = {this.state.theme.styles.navBar}
        leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
        statusBar = {statusBar}
        hide = {false} />;

    /*let typeCheckBox = 
          <View style={styles.checkBoxView}>
              <CheckBox style={{flex:1,tinkColor:'red'}} rightText='所有设备' onClick={() => {}}/>
              <CheckBox style={{flex:1}} rightText='终端' onClick={() => {}}/>
              <CheckBox style={{flex:1}} rightText='单灯' onClick={() => {}}/>
          </View>;*/
    let typeCheckBox =
        <View style={styles.checkBoxView}>
          {this.renderCheckBox({name:'所有设备', checked:false})}
          {this.renderCheckBox({name:'终端', checked:false})}
          {this.renderCheckBox({name:'单灯', checked:false})}
        </View>

    let dataList = <FlatList
                    data={this.state.data}
                    renderItem={this._renderItemComponent}
                    shouldItemUpdate={this._shouldItemUpdate}
                  />
    


      return (
        <View style={styles.container}>
          {navigationBar}
          <View style={styles.searchBar}>
            <SearchBar />
            <Button 
              onPress = {this._goLampMap.bind(this)}
            >
              <Icon name='ios-pin-outline' size={30} color='red' style = {styles.locIcon} />
              {/*<Image source = {require('../../res/images/location.png')} style = {styles.locIcon} />*/}
            </Button>           
          </View>
          {typeCheckBox}
          {dataList}
        </View>
      );
    }

  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    padding: 5,
    alignItems: 'center',
  },

  locIcon: {
    marginLeft:10,
    marginRight: 5,
  },

  checkBoxView: {
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    // flex: 1,
  }


});
