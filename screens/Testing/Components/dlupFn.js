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
    var upData = [];
    var upSpeeds= [];
    var speeds = [];
    // alert('umadim tush')
    // alert(type)
    var startTime = new Date();
    if (type === "dl") {
        // alert('tuye type')
        try {
            const options = await AsyncStorage.getItem(`options`);
            console.log('options', options)
            var link = JSON.parse(options).dlLink;
            return await axios({
                method: 'get',
                url: "https://romakertebat.com/api/Data/GetImage",
                responseType: 'blob',
                timeout: 1000,
                onDownloadProgress: (e) => {
                    var b = e;
                    b.tt = new Date().getTime()
                    // prog.push(e)
                    data.push({ loaded: e.loaded, time: e.timeStamp, total: e.total })
                    // console.log('e',e)
                },
            }).then(res => {
                // console.log('data',data)
                for (var i = 0; i < data.length; i++) {
                    if (typeof (data[i - 1]) !== 'undefined') {
                        var time = (data[i].time - data[i - 1].time) / 1000
                        var size = (data[i].loaded - data[i - 1].loaded)
                        if (time !== 0) {
                            speeds.push(((size) * 8 / time) / 1000000)
                        }
                    }
                }
                var minSpeed = Math.min(...speeds)
                var maxSpeed = Math.max(...speeds)
                var avgSpeed = (maxSpeed + minSpeed) / 2;
                // console.log('speed',speeds)
                // console.log('max',maxSpeed)
                // console.log('min',minSpeed)
                return {
                    speeds: speeds,
                    avg: avgSpeed.toFixed(2),
                    max: maxSpeed.toFixed(2)
                }
                // console.log(prog[0].total / (prog[prog.length-1].tt - prog[0].tt) , 'dddd')
                // console.log(res)
            })

        } catch {
            (err) => {
                console.log('errrrr', err)
            }
        }
    } else {
        try {
            const uploadFilePath = await AsyncStorage.getItem(`currentFilePath`);
            const path = JSON.parse(uploadFilePath);
            const options = await AsyncStorage.getItem('options');
            // var uplink = JSON.parse(options).upLink;
            const formData = new FormData();
            formData.append('avatar', {
                uri: `${path}`,
                type: 'image/jpg',
                name: `upload.jpg`,
              });
            var tempUpLink = 'http://service.romaak.net:12086/api/Data/UploadFile';
            return await axios({
                method: 'POST',
                url: tempUpLink,
                responseType: 'blob',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                data: formData,
                timeout: 1000,
                onUploadProgress: (e) => {
                    var b = e;
                    b.tt = new Date().getTime()
                    // prog.push(e)
                    upData.push({ loaded: e.loaded, time: e.timeStamp, total: e.total })
                    // console.log('e',e)
                },
            }).then(res => {
                // console.log('data',data)
                for (var i = 0; i < upData.length; i++) {
                    if (typeof (upData[i - 1]) !== 'undefined') {
                        var time = (upData[i].time - upData[i - 1].time) / 1000
                        var size = (upData[i].loaded - upData[i - 1].loaded)
                        if (time !== 0) {
                            upSpeeds.push(((size) * 8 / time) / 1000000)
                        }
                    }
                }
                var minSpeed = Math.min(...upSpeeds)
                var maxSpeed = Math.max(...upSpeeds)
                var avgSpeed = (maxSpeed + minSpeed) / 2;
                // console.log('speed',speeds)
                // console.log('max',maxSpeed)
                // console.log('min',minSpeed)
                return {
                    speeds: upSpeeds,
                    avg: avgSpeed.toFixed(2),
                    max: maxSpeed.toFixed(2)
                }
                // console.log(prog[0].total / (prog[prog.length-1].tt - prog[0].tt) , 'dddd')
                // console.log(res)
            })

        } catch {
            (err) => {
                console.log('errrrr', err)
            }
        }
        //         const uploadFilePath = await AsyncStorage.getItem(`currentFilePath`);
        //         const path = JSON.parse(uploadFilePath);
        //         const options = await AsyncStorage.getItem('options');
        //         var uplink = JSON.parse(options).upLink;
        //         var tempUpLink = 'https://api.romaak.net/speedtest/uploadtest/index.php';
        //         return await uploadFile(path, tempUpLink)
        //         .then(res => {
        //             if (res.data.status === 200) {
        //                 var endTime = new Date();
        //                 var diff = Math.abs(endTime - startTime);
        //                 diff = diff / 1000;
        //                 var dataSize = 1567140; // in bytes;
        //                 dataSize = dataSize / diff; // in bytes;
        //                 dataSize = dataSize / 1000000; // in MegaByte
        //                 dataSize = dataSize * 8; // Megabit
        //                 return dataSize.toFixed(2)
        //             }else{
        //                 return 'rsp err'
        //             }
        //         })
        //         .catch(err => {
        //             return 'srv err'
        //         })
        //     } catch (err) {
        //         return 'filePathErr'
        //     }
        // }

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