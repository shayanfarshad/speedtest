import React, { useState } from 'react'
import { Platform, Image } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';
import { uploadFile } from '../_test_services';
import axios from 'axios';
import uploadImgAss from '../../../assets/upload.jpg'

export default async function CommandDlUp(type) {
    const imgUri = Image.resolveAssetSource(uploadImgAss).uri;

    var data = [];
    var speeds = []
    // alert('umadim tush')
    // alert(type)
    var startTime = new Date();
    if (type === "dl") {
        // alert('tuye type')
        try {
            const options = await AsyncStorage.getItem(`options`);
            // console.log('options',options)
            var link = JSON.parse(options).dlLink;
            return RNFetchBlob.config({ fileCache: true, appendExt: 'jpg' })
                .fetch('GET', 'http://api.romaak.net/speedtest/uploadtest/download.jpg')
                .then(async res => {
                    var sizeeee = await axios({
                        method: 'get',
                        url: 'http://api.romaak.net/speedtest/uploadtest/download.jpg',
                        responseType: 'blob',
                        timeout: 2000,
                        onDownloadProgress: (e) => {
                            var b = e;
                            b.tt = new Date().getTime()
                            // prog.push(e)
                            data.push({loaded: e.loaded, time: new Date().getTime(), total: e.total})
                            // console.log(e)
                        },
                    }).then(res=>{
                        // console.log(data)
                        for(var i=0; i<data.length; i++){
                            if(typeof(data[i-1]) !== 'undefined'){
                                var time = (data[i].time - data[i-1].time)/1000
                                var size = data[i].total/(data[i].loaded - data[i-1].loaded)
                                if(time !== 0){
                                    speeds.push(((size)*8/time)/1000000)
                                }
                            }
                        }
                        var minSpeed = speeds.sort()[0]
                        var maxSpeed = speeds.sort()[speeds.length-1]
                        var avgSpeed = (maxSpeed + minSpeed) / 2;
        
                        return {
                            avg: avgSpeed.toFixed(2),
                            max: maxSpeed.toFixed(2)
                        }
                        // console.log(prog[0].total / (prog[prog.length-1].tt - prog[0].tt) , 'dddd')
                        // console.log(res)
                    })
                    // console.log('res',res)
                    var endTime = new Date();
                    var diff = Math.abs(endTime - startTime);
                    diff = diff / 1000;
                    var dataSize = 1567140; // in bytes;
                    dataSize = dataSize / diff; // in bytes;
                    dataSize = dataSize / 1000000; // in MegaByte
                    dataSize = dataSize * 8; // Megabit
                    // the temp file path
                    // console.log('dl speed ',dataSize)
                    AsyncStorage.setItem('currentFilePath', JSON.stringify(Platform.OS === 'ios' ? res.path() : 'file://' + res.path()))
                    return {
                        oldAvg: dataSize.toFixed(2),
                        avg: sizeeee.avg,
                        max: size.max
                    }
                })
                .catch(err => {
                    // console.log(err)
                    return 'dl err'
                });

        } catch {(err)=>{
            // console.log('errrrr',err)
        }}
    } else {
        try {
            const uploadFilePath = await AsyncStorage.getItem(`currentFilePath`);
            const path = JSON.parse(uploadFilePath);
            const options = await AsyncStorage.getItem('options');
            var uplink = JSON.parse(options).upLink;
            var tempUpLink = 'https://api.romaak.net/speedtest/uploadtest/index.php';
            return await uploadFile(imgUri, tempUpLink)
            .then(res => {
                if (res.data.status === 200) {
                    var endTime = new Date();
                    var diff = Math.abs(endTime - startTime);
                    diff = diff / 1000;
                    var dataSize = 1567140; // in bytes;
                    dataSize = dataSize / diff; // in bytes;
                    dataSize = dataSize / 1000000; // in MegaByte
                    dataSize = dataSize * 8; // Megabit
                    return dataSize.toFixed(2)
                }else{
                    return 'rsp err'
                }
            })
            .catch(err => {
                return 'srv err'
            })
        } catch (err) {
            return 'filePathErr'
        }
    }

}


// var past = null
// axios.get('http://api.romaak.net/speedtest/uploadtest/download.jpg', {
//   responseType: 'arraybuffer',
//   timeout: 5000,
//   onDownloadProgress: progressEvent => {
//     var res = null
//     if(past !== null){
//       var time = progressEvent.timeStamp - past.timeStamp
//       if(time !== 0)
//       res = (progressEvent.loaded - past.loaded) / (time)
//     }
//     if(res !== null){
//       console.log((res)/1000)
//     }
//     past = progressEvent
//   }
// }).then(res=>{
//   console.log(res)
// })