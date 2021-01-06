import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import AppAlert from './index'
import {navigationRef} from '../navigation/index';


// const base = 'http://192.168.3.43:5801/api';
const base = 'https://romakertebat.com/api';
// const base = 'http://service.romaak.net:12086/api';

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data.
    // console.log(navigationRef)
    return response

}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response !== undefined)

        if (error.response.status === 401)
        AsyncStorage.getItem('token').then(token=>{
            // console.log(token)
            if(token !== null){
                // AsyncStorage.clear()
                navigationRef.current.reset()
                AppAlert('err', 'مدت زمان استفاده شما از نرم افزار به پایان رسیده است. لطفا مجددا وارد شوید')
            }
        })


    return Promise.reject(error);
});



export function ajax(sys, url, Method, isbody, body,device,uuid) {
    let localUrl = base + url;
    // AsyncStorage.getItem('token').then((token)=>{
    //     console.log(token)
    // })
    switch (sys) {
        case 'tokenFormData':
            console.log('eee',body)
            return AsyncStorage.getItem('token').then((token)=>{
                axios.defaults.headers.common['Authorization'] = 'Bearer ' +  token;
                return axios({
                    method: Method,
                    url: localUrl,
                    data: isbody ? body : null,
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + token}
                });
            })
            
            
        case 'tokenJson':
            return (
                AsyncStorage.getItem('token').then((token)=>{
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' +  token;
                    console.log('token',token)
                    return axios({
                        url:localUrl,
                        method:Method,
                        data:  isbody ? JSON.stringify(body) : null,
                        headers: {
                           Accept: 'application/json',
                           'Content-Type': 'application/json',
                           'Authorization': 'Bearer ' + token,
                           'uuid':uuid,
                        }
                   })
                })
                 
            );

        case 'TokenUrl':
            return(
                AsyncStorage.getItem('token').then((token)=>{
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' +  token;
                    return axios({
                        url: localUrl + body,
                        method:Method,
                        data:  isbody ? JSON.stringify(body) : null,
                        headers: {
                           Accept: 'application/json',
                           'Content-Type': 'application/json',
                           'Authorization': 'Bearer ' + token
                        }
                   })
                })
            )
            
        case 'Url':
            function checkbody(localUrl,body){
                if(typeof(body) === 'undefined'){
                    return localUrl
                }else{
                    return localUrl + body
                }
            }
            return AsyncStorage.getItem('token').then((token)=>{
                axios.defaults.headers.common['Authorization'] = 'Bearer ' +  token;
                return axios({
                    url:        checkbody(localUrl,body),
                    method:     Method,
                    headers: {
                      Accept:           'application/json',
                      'Content-Type':   'application/json',
                      'Authorization': 'Bearer ' + token
                    }
                  });
            })
            
        case 'FormData':
            return AsyncStorage.getItem('userToken').then((token)=>{
                return axios({
                    method: Method,
                    url: localUrl,
                    data: isbody ? body : null,
                    headers: { 'Content-Type': 'multipart/form-data' ,'Authorization': 'Bearer ' + token}
                });
            })
            
        default:
            return (
                axios({
                    url: localUrl ,
                    method: Method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'uuid':uuid,
                        'DeviceType':device
                    },
                    data: isbody ? JSON.stringify(body) : null
                })
            )
            
    }
}

