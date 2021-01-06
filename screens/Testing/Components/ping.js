import React, { useState } from 'react';
import Ping from 'react-native-ping';

async function CalPingParams(pingServer) {
    // const [currentLocation,setCurrentLocation] = useState(null)
    async function callPing() {
        var pingData = []
        for (var i = 0; i < 13; i++) {
            try {
                /**
                 *
                 * Get RTT (Round-trip delay time)
                 *
                 * @static
                 * @param {string} ipAddress - For example : 8.8.8.8
                 * @param {Object} option - Some optional operations
                 * @param {number} option.timeout - timeout
                 * @returns
                 * @memberof Ping
                 */
                // const ms = await Ping.start('88.198.17.214', { timeout: 1000 }); // amirtb
                const ms = await Ping.start(pingServer, { timeout: 100 }); // 158.58.187.43#53
                if (i !== 0 && i !== 1 && i !== 2) {
                    // console.log(ms)
                    pingData.push(ms);
                }
                // console.log(rtt);
            } catch (error) {
                // console.log('special code', error.code, error.message);
            }
        }
        return pingData
    }
    var sortedPing = await callPing();
    if(sortedPing.length > 0){
        sortedPing = sortedPing.sort(function(a, b){return a - b});
    }
    var minPing = sortedPing[0];
    var maxPing = sortedPing[sortedPing.length-1]
    var avgPing = 0;
    var jitter = 0;
    var plr = 10 - sortedPing.length;
    var Total = sortedPing.reduce(function (a, b) {
        return a + b;
    }, 0)
    if (Total !== 0) {
        avgPing = Total / sortedPing.length
        avgPing.toFixed(2)
    }

    var jitterL = [];
    for (var item in sortedPing) {
        if (item !== '0') {
            var aaa = Math.abs(sortedPing[item] - sortedPing[item - 1])
            if(aaa !== 'NaN')
            jitterL.push(aaa);
        }
    }
    if(jitterL.length>0){
        var sum = jitterL.reduce(function (a, b) {
            return a + b;
        }, 0);
        jitter = sum / jitterL.length
        if(jitter !== 0){
            jitter = jitter.toFixed(2)
        }
    
    }
    // Geolocation.getCurrentPosition(info => setCurrentLocation({ lat: info.coords.latitude, lng: info.coords.longitude }));

    return ({
        pingArray: sortedPing,
        minPing: minPing,
        maxPing: maxPing,
        avgPing: avgPing.toFixed(2),
        jitter: jitter,
        plr: plr*10
    })
}

export default CalPingParams;