/*
 *  搜索框（设备列表搜索框） 
 */

'use strict'

import React, {Component, PropTypes} from 'react';

import {
    StyleSheet,
    Navigator,
    Platform,
    TouchableOpacity,
    Image,
    StatusBar,
    Text,
    View,
    TextInput,
    TouchableHighlight,
} from 'react-native'
import Button from 'react-native-smart-button'
import Icon from 'react-native-vector-icons/Ionicons'
import ViewUtils from '../util/ViewUtils'

export default class SearchBar extends Component{

    render(){

        return (

                <View style={styles.searchBox} >
                    {/*<Image source={require('../../res/images/search.png')} style={styles.logo} />*/}
                    <Icon name='ios-search-outline' size={25} style={styles.logo} />
                    <ViewUtils.PlainInput
                        keyboardType = 'web-search'
                            autoFocus = {true}
                            placeholder = '请输入设备关键字' />
                    {/*<TextInput style={styles.inputText}
                        keyboardType = 'web-search'
                        autoFocus = {true}
                        placeholder = '请输入设备关键字' />*/}
                    <Button>
                        <Text>搜索</Text>
                    </Button>
                </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'gray',
        padding: 5,
        alignItems: 'center',
    },

    searchBox: {
        height: 30,
        flexDirection: 'row',
        flex:1,
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',

    },

    logo: {
        marginLeft : 5
    },

    inputText: {
        flex: 1,
        marginLeft: 5,
        backgroundColor: 'transparent',
        fontSize: 15,
    },
});