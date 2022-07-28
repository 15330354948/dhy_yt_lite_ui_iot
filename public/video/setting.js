/*
 * @Author: your name
 * @Date: 2021-03-31 16:26:53
 * @LastEditTime: 2021-05-17 17:45:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\public\video\setting.js
 */
(function(global, factory) {
    if (typeof exports === 'object' && module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(factory);
    } else {
        global.RongCall = global.RongCall || {};
        global.RongCall.setting = factory();
    }
})(this, function() {
    var ENUM = {};

    ENUM.Events = {
        INVITE: 'invite',
        ACCEPT: 'accept',
        HUNGUP: 'hungup',
        MEDIA_MODIFY: 'media_modify',
        MEMBER_MODIFY: 'member_modify',
        RTC_ADDED: 'added',
        RTC_REMOVED: 'removed',
        RTC_LEAVE: 'leave'
    };

    return {
        appkey: 'x18ywvqfx4aoc',
        // appkey: 'bmdehs6pbal1s',
        navi: '',
        // server: 'https://139.159.189.117:443/rys',
        // server: 'https://221.13.67.194:1443/rys',
        server: 'https://139.159.189.117:443/rys',
        // server:'http://192.168.10.167:8081',
        ENUM: ENUM
    };
});