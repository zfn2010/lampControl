/**
 * ViewUtils
 * @flow
 **/
'use strict'

import React  from 'react';
import {
    TouchableHighlight,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
const SEPARATOR_HEIGHT = StyleSheet.hairlineWidth;
import Icon from 'react-native-vector-icons/Ionicons'
import Button from 'react-native-smart-button'

export default class ViewUtils {
    static getSettingItem(callBack, icon, text, tintStyle, expandableIco) {
        return (
            <TouchableHighlight
                onPress={callBack}>
                <View style={[styles.setting_item_container]}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        {icon ?
                            <Image source={icon} resizeMode='stretch'
                                   style={[{opacity: 1, width: 16, height: 16, marginRight: 10,}, tintStyle]}/> :
                            <View style={{opacity: 1, width: 16, height: 16, marginRight: 10,}} />
                            }
                        <Text>{text}</Text>
                    </View>
                    <Image source={expandableIco ? expandableIco : require('../../res/images/ic_tiaozhuan.png')}
                           style={[{
                               marginRight: 10,
                               height: 22,
                               width: 22,
                               alignSelf: 'center',
                               opacity: 1
                           }, tintStyle]}/>
                </View>
            </TouchableHighlight>
        )
    }
    static getMoreButton(callBack) {
        return <TouchableHighlight
            ref='moreMenuButton'
            underlayColor='transparent'
            style={{padding:5}}
            onPress={callBack}>
            <View style={{paddingRight:8}}>
                <Image
                    style={{width: 24, height: 24, marginLeft: 5}}
                    source={require('../../res/images/ic_more_vert_white_48pt.png')}
                />
            </View>
        </TouchableHighlight>
    }

    static getLeftButton(callBack) {
        return <TouchableOpacity
            style={{padding:8}}
            onPress={callBack}>
            {/*<Image
                style={{width: 26, height: 26,}}
                source={require('../../res/images/ic_arrow_back_white_36pt.png')}/>*/}
            <Icon name='ios-arrow-back-outline' size={26} color='white'/>
        </TouchableOpacity>;
        // return <Icon.Button name='ios-arrow-back-outline' onPress={callBack} backgroundColor={'transparent'} size={26} color='white' />
    }

    static getProblemSearchButton(tip, content, callBack){
        return  <View style={styles.settingView}> 
                     <Text style={{color:'white'}}>{tip}</Text>
                     <Text style={{color:'white'}}>{content}</Text>
                     {/*<Icon.Button style = {styles.ButtonIcon} name='ios-arrow-forward-outline' onPress={callBack} backgroundColor={'transparent'} size={25} color='white' />*/}
                      <Button  style = {styles.ButtonIcon} onPress = {callBack}>
                        <Icon name='ios-arrow-forward-outline' size={26} color='white' />
                      </Button>
                </View>
    }

    static PlainInput(props) {
        return (
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                underlineColorAndroid="transparent"
                style={styles.searchTextInput}
                {...props}
            />
        );
   }

   static SeparatorComponent(props){
        return (<View 
                style={styles.separator} 
                {...props}
                />
        );
   }


}

const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    settingView: {
        padding: 5,
        margin: 5,
        marginLeft: 20,
        marginRight: 20,
        flexDirection:'row',
        borderRadius: 3,
        borderColor: 'white',
        borderWidth: 1,
    },

    ButtonIcon: {
        position: 'absolute',
        top:3,
        right: 10,
        paddingVertical: 0,
    },

    searchTextInput: {
        backgroundColor: 'white',
        // borderColor: '#cccccc',
        // borderRadius: 3,
        // borderWidth: 1,
        marginTop: 2,
        paddingLeft: 8,
        paddingVertical: 0,
        // paddingTop: 0,
        // paddingBottom: 0,
        height: 26,
        fontSize: 14,
        flexGrow: 1,
    },

    separator: {
        height: SEPARATOR_HEIGHT,
        backgroundColor: 'gray',
    },
})