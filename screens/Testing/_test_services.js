import axios from 'axios';
import { ajax } from '../../utils/ajax';
import DeviceInfo from 'react-native-device-info';

export const uploadFile = (path, link) => {
    const formData = new FormData();
    formData.append('avatar', {
        uri: `${path}`,
        type: 'image/jpg',
        name: `upload.jpg`,
    });
    return axios({
        // url: 'http://amirtb.ir/speedTest/index.php' ,
        url: link,
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}

export const doSaveResult = (d) => {
    var body = {
        "DLSpeed": d.DLSpeed,
        "UpSpeed": d.UpSpeed,
        "PingAvg": d.PingAvg,
        "PingMin": d.PingMin,
        "PingMax": d.PingMax,
        "Jitter": d.Jitter,
        "PLR": d.PLR,
        "Lat": d.Lat,
        "Lng": d.Lng,
        "DateTime": new Date()
    }
    return ajax('tokenJson', '/Data/SubmitSpeedTest', 'POST', 'true', body)
}


export const getBrowserUrl = () => {
    return ajax(null, '/Data/GetTestUrls', 'GET', false)
}

export const submitBrowsingResult = (d) => {
    var systemName = DeviceInfo.getSystemName();
    var uuid = DeviceInfo.getUniqueId();
    // var data = {
    //     "submitWebs": d
    // }
    return ajax('tokenJson', '/Data/SubmitWebBrowsing', 'POST', true, d, systemName, uuid)
}

export const getVideoUrl = () => {
    return ajax(null, '/Data/GetSpeedTestVideoStreamData', 'GET', false)
}

export const submitStreamingResult = (d) => {
    var body = {
        "submitVideoStreamDtos":d
    }
    var systemName = DeviceInfo.getSystemName();
    var uuid = DeviceInfo.getUniqueId();
    return ajax('tokenJson', '/Data/SubmitVideoStreamResult', 'POST', true, body,systemName,uuid)
}