import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment-jalaali';
import AppAlert from '../../../utils/';
import { doSaveResult } from '../_test_services';
import Geolocation from '@react-native-community/geolocation';
import Browsing from '../Browsing';
import { useState } from 'react';

export default class SaveResult {
  async DlUpload(avgDl, maxDl, upAvg, rtt, maxping, minping, jitter, plr, catId, browsing, streaming,lat,lng) {
    // console.log('tarikhche')
    // const [currentLocation,setCurrentLocation]= useState(null)
    switch (catId) {
      case 0:
        var cat = ''
        break;
      case 1:
        var cat = 'تماشای فیلم'
        break;
      case 2:
        var cat = 'کامل'
        break;
      case 3:
        var cat = ''
        break;
      case 4:
        var cat = 'سرعت'
        break;
      case 5:
        var cat = 'وب گردی'
        break;
      default:
        break;
    }
    try {
      const oldResults = await AsyncStorage.getItem('LastTest');
      var b = [];
      if (oldResults !== null) {
        // We have data!!
        if (oldResults.startsWith('{')) {
          b.push(JSON.parse(oldResults));
        } else {
          b = JSON.parse(oldResults);
        }
      } else {
        b = [];
      }
      // console.log(abs)
      // Geolocation.getCurrentPosition(info => setCurrentLocation({ lat: info.coords.latitude, lng: info.coords.longitude }));

      b.push({
        date: moment().format('jYYYY/jMM/jDD'),
        time: moment().format('HH:mm:ss'),
        maxDl: Number(maxDl),
        avgDl: Number(avgDl),
        maxPing: Number(maxping),
        up: Number(upAvg),
        rtt: Number(rtt),
        jit: jitter,
        plr: plr,
        lat: '0',
        lng: '0',
        cat: cat,
        browsing: browsing,
        streaming: streaming
      })

      doSaveResult({
        DLSpeed: avgDl,
        UpSpeed: upAvg,
        PingAvg: rtt,
        PingMin: minping.toString(),
        PingMax: maxping.toString(),
        Jitter: jitter,
        PLR: plr,
        Lat: lat,
        Lng: lng
      })
        .then(res => {
          if (res.status === 200) {
            AsyncStorage.setItem('LastTest', JSON.stringify(b));
            AppAlert('ok', 'نتایج سنجش ذخیره شد')
          }
        })
        .catch(err => {
          AsyncStorage.setItem('LastTest', JSON.stringify(b));
        });
    } catch (err) {
    }
  }
} 
