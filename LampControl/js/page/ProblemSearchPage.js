/**
 * 故障查询
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  DatePickerIOS,
  DatePickerAndroid,
  Animated,
  FlatList,
  Text,
  InteractionManager,
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import ViewUtils from '../util/ViewUtils'
import Button from 'react-native-smart-button'
import PopDialog from '../common/PopDialog'
import CustomActionSheet from 'react-native-custom-action-sheet'
import ProblemCommon from './ProblemSearch/ProblemCommon'
import {CLICK_TYPE} from './ProblemSearch/ProblemCommon'
import DevicePage from './DevicePage'

type Item = {
  title: string,
  problemType: string,
  time: string,
  key: number,
}
// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class ProblemSearchPage extends Component {

    constructor(props){
      super(props);

      this.state = {
        theme: this.props.theme,
        datePickerModalVisible: false,  //选择器显隐标记  
        chooseDate: new Date(),  //选择的日期  
        data: [],
        showcontent: false,
      };

      InteractionManager.runAfterInteractions(() => {
        this.setState({showcontent:true, data: this.genItemData(1000)});
      });

      this.ProblemCommon = new ProblemCommon(props, (dic)=>this.updateState(dic), (type)=>this.onSearchClick(type));
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

    updateState(dic){
      this.setState(dic);
    }

    onSearchClick(type){
      switch (type){
        case CLICK_TYPE.DEVICE_SELECT:
          const { navigator} = this.props;
          if (navigator) {
            navigator.push({
              name: 'DevicePage',
              component: DevicePage,
              params: {...this.props}
            });
          }
          break;
        case CLICK_TYPE.FAULT_TYPE:
          break;
        case CLICK_TYPE.START_TIME:
          this._showDatePicker();
          break;
        case CLICK_TYPE.END_TIME:
          break;
      } 
    }

    onBack() {
        this.props.navigator.pop();
    }

    _showDatePicker () { //切换显隐标记  
      this.setState({datePickerModalVisible: !this.state.datePickerModalVisible});  
    };  
    
    _onDateChange (date) {  //改变日期state  
      alert(date);  //弹出提示框: 显示你选择日期  
      this.setState({  
        chooseDate: date  
      });  
    };  

  _shouldItemUpdate(prev, next) {
    /**
     * Note that this does not check state.horizontal or state.fixedheight
     * because we blow away the whole list by changing the key in those cases.
     * Make sure that you do the same in your code, or incorporate all relevant
     * data into the item data, or skip this optimization entirely.
     */
    return prev.item !== next.item;
  }

    _renderItemComponent = ({item}) => {
      return (
        <View>
          <Text>{item.title}</Text>
          <Text>{item.problemType}</Text>
          <Text>{item.time}</Text>
        </View>
      );
    }

    render() {
    var statusBar = {
        backgroundColor: this.state.theme.themeColor,
      };

    let navigationBar = 
        <NavigationBar
          title = '故障查询'
          style = {this.state.theme.styles.navBar}
          leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
          statusBar = {statusBar}
          hide = {false} />;
    
    let datePickerModal = (   
      this.state.datePickerModalVisible ?  
      <CustomActionSheet  
        modalVisible={this.state.datePickerModalVisible}  
        buttonText = '取消'
        onCancel={()=>this._showDatePicker()}> 
          <View style={styles.datePickerContainer}>
            {/*<DatePickerAndroid style={{flex: 1}}
              mode={"datetime"}   
              minimumDate={new Date()} 
              minuteInterval={30} 
              date={this.state.chooseDate}    
              onDateChange={this._onDateChange.bind(this)}   
            />  */}
           
            </View>  
       </CustomActionSheet> : null 
    );
    
    let dataList = <FlatList
                    data={this.state.data}
                    ItemSeparatorComponent={ViewUtils.SeparatorComponent}
                    renderItem={this._renderItemComponent}
                    shouldItemUpdate={this._shouldItemUpdate}
                    />

    let content = this.state.showcontent ? <View>
                    {dataList}
                    {datePickerModal}
                  </View> : null;

        return this.ProblemCommon.render(content, {'name': '故障查询'});
    }
}

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: 'center',  
    alignItems: 'center',  
    backgroundColor: '#F5FCFF',  
  },  
  datePickerContainer: {  
    flex: 1,  
    borderRadius: 5,  
    // justifyContent: 'center',  
    // alignItems: 'center',  
    backgroundColor: 'white',  
    marginBottom: 10,  
  },  
});  