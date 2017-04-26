/**
 * ProblemCommon
 * 设备故障查询子页面
 * @flow
 */
'use strict';
import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    ListView,
    Platform,
    PixelRatio,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtils from '../../util/ViewUtils'
import GlobalStyles from '../../../res/styles/GlobalStyles'
import Button from 'react-native-smart-button'
import Icon from 'react-native-vector-icons/Ionicons'

export const CLICK_TYPE = {
    DEVICE_SELECT:'Device Select',
    FAULT_TYPE: 'Fault Type',
    START_TIME:'Start Time',
    END_TIME: 'End Time',
    DO_SEARCH: 'Do Search',
}

export default class ProblemCommon {
    constructor(props, updateState, onClick){
        this.props = props;
        this.updateState = updateState;
        this.onClick = onClick;
    }

    getParallaxRenderConfig(params) {
        let config = {};
        let avatar=typeof(params.avatar)==='string' ? {uri:params.avatar}:params.avatar;
        /*config.renderBackground = () => (
            <View key="background">
                <View style={{
                    position: 'absolute',
                    top: 50,
                    width: window.width,
                    backgroundColor: 'rgba(0,0,0,0.0)',
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
            </View>
        );*/
        config.renderForeground = () => (
            <View key="parallax-header" style={ styles.parallaxHeader }>
                {ViewUtils.getProblemSearchButton('设备类型：', '已选择49个设备',() => this.onClick(CLICK_TYPE.DEVICE_SELECT))}
                {ViewUtils.getProblemSearchButton('故障选择：', '全部故障类型',() => this.onClick(CLICK_TYPE.FAULT_TYPE))}
                {ViewUtils.getProblemSearchButton('开始时间：', '2017-3-20',() => this.onClick(CLICK_TYPE.START_TIME))}
                {ViewUtils.getProblemSearchButton('结束时间：', '2017-4-20',() => this.onClick(CLICK_TYPE.END_TIME))}
                <Button
                    touchableType={Button.constants.touchableTypes.highlight}
                    underlayColor={'#C90000'}
                    style={styles.buttonStyle}
                    onPress = {() => this.onClick(CLICK_TYPE.DO_SEARCH)}
                    textStyle={styles.buttonTextStyle}>
                    查询
                </Button>
            </View>
        );
        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>
        );

        config.renderFixedHeader = () => (
            <View key="fixed-header" style={styles.fixedSection}>
                {ViewUtils.getLeftButton(()=>this.props.navigator.pop())}
                {/*<Text style={styles.stickySectionText}>{params.name}</Text>*/}
                <Image source={require('../../../res/images/ic_share.png')} resizeMode='stretch'
                       style={[{opacity: .9, width: 16, height: 16, marginRight: 10, tintColor: 'white'}]}/>

            </View>
        );
        return config;
    }

    render(contentView,params) {
        let renderConfig = this.getParallaxRenderConfig(params);
        return (
            <ParallaxScrollView
                contentBackgroundColor={GlobalStyles.backgroundColor}
                backgroundColor={this.props.theme.themeColor}
                stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                backgroundSpeed={10}
                {...renderConfig}
            >
                {contentView}
            </ParallaxScrollView>
        );
    }

}

const window = Dimensions.get('window');

const AVATAR_SIZE = 90;
const PARALLAX_HEADER_HEIGHT = 290;
const STICKY_HEADER_HEIGHT =(Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios+20:GlobalStyles.nav_bar_height_android;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20:0,
        alignItems: 'center',
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingRight: 8,
        paddingTop: (Platform.OS === 'ios') ? 20:0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fixedSectionText: {
        color: 'white',
        fontSize: 20,
        opacity: .9,
    },
    parallaxHeader: {
        // alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 60
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        marginBottom: 5,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
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

    buttonStyle: {
        margin: 5,
        marginLeft: 20,
        marginRight: 20,
        height: 40,
        backgroundColor: 'green',
        borderRadius: 3,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'gray',
        justifyContent: 'center',
    },

    buttonTextStyle: {
        fontSize: 15,
        color: 'white'
    },

    ButtonIcon: {
        position: 'absolute',
        // top:3,
        right: 5,
    }
});