/**
 * 设备列表项中渲染的视图
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Navigator,
    Platform,
    TouchableOpacity,
    Image,
    StatusBar,
    Text,
    View
} from 'react-native'
import GlobalStyles from '../../res/styles/GlobalStyles'
import Button from 'react-native-smart-button'
import Icon from 'react-native-vector-icons/Ionicons'

export default class DeviceItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            showMoreButton: false,

        }
    }

    render(){

        let iconName = this.state.showMoreButton? 'ios-arrow-dropdown-outline' : 'ios-arrow-dropup-outline';
        let moreButtonView = this.state.showMoreButton? 
                            <View style={styles.moreView}>
                                <Button style={styles.moreButton}>最新</Button>
                                <Button style={styles.moreButton}>历史</Button>
                                <Button style={styles.moreButton}>选测</Button>
                                <Button style={styles.moreButton}>周设置</Button>
                                <Button style={styles.moreButton}>召测参数</Button>
                                <Button style={styles.moreButton}>设置</Button>
                             </View> : null;

        return (
                <View style={styles.rootView}>
                    <View style={styles.firstLineView}>    
                        <Icon name='ios-bulb-outline' size={26} />               
                        <Text style={styles.textName}>{this.props.name}</Text>
                        <View style={styles.buttonView}>
                            <Button 
                                style={styles.iconButton}
                                onPress={()=>{this.setState({showMoreButton: !this.state.showMoreButton})}} >
                                <Icon name={iconName} size={26} />
                            </Button>
                            <Button style={styles.iconButton} >
                                <Icon name='ios-locate-outline' size={26} />
                            </Button>
                            <Button style={styles.iconButton}>
                                关注
                            </Button>
                        </View>
                    </View>
                    <Text style={styles.textInfo}>重要摘要信息</Text>
                    {moreButtonView}
                </View>    
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        flexDirection: 'column',
        margin: 5,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#cccccc',
    },

    firstLineView: {
        marginLeft: 10,
        flexDirection: 'row',
    },

    textName: {
        fontSize: 20,
        marginLeft:5,
        marginRight: 5,
    },

    textInfo: {
        margin:5,
        marginLeft: 10,
        fontSize: 16,
        color: 'red',
    },

    moreView: {
        flexDirection: 'row',
        marginLeft: 10,
    },

    moreButton: {
        margin: 3,
        borderRadius: 3,
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center'
    },

    iconButton: {
        marginLeft:3,
        marginRight:3,
    },

    buttonView: {
        flexDirection: 'row',
        position:'absolute',
        right: 5
    }
})
