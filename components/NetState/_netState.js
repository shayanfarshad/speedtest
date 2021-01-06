import axios from 'axios';

export const GetOperatorName = (ip) =>{
    return axios({
        url: 'http://ip-api.com/json/'+ip ,
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
}