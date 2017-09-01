/**
 * util 模块工具类
 * 主要提供工具方法
 */
import React from 'react';
var Dimensions = require('Dimensions');

import {
    PixelRatio,
} from 'react-native';
let Util = {
    /*最小线宽*/
    pixel: 1/ PixelRatio.get(),

    /*屏幕尺寸*/
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    /**
     *  基于fetch的get方法
     */
     get: (url,successCallback,failCallback) => {
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                successCallback(responseJson);
            })
            .catch((err) => {
                failCallback(err);
            });
     },
     /**
      *  基于fetch的get方法
      */
      postJson(url, data, callback){
             var fetchOptions = {
               method: 'POST',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'multipart/form-data;boundary=6ff46e0b6b5148d984f148b6542e5a5d'
               },
               body:data
             };

             fetch(url, fetchOptions)
             .then((response) => response.text())
             .then((responseText) => {
              //  callback(JSON.parse(responseText));
                callback(responseText);
             }).done();
       },

}
export default Util