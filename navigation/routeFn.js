//test

import {Alert} from 'react-native';
import AppAlert from '../utils';
import { CommonActions } from '@react-navigation/native'
export function startBtnRouteHandler(selectedId, navigation) {
  // console.log('selected', selectedId)
  switch (selectedId) {
    case 0:
      // navigation.navigate('PrepareScreen',{nextPage: 'HomeScreen', title: 'به زودی'})
      // AppAlert('alert','به زودی در دسترس قرار میگیرد',2000)
      break;
    case 1:
      // navigation.navigate('PrepareScreen',{nextPage: 'StreamingScreen', title: 'سنجش پخش ویدیو'})
      // navigation.navigate('StreamingScreen');
      navigation.reset({
        index: 3,
        routes: [{ name: 'StreamingScreen' }],
      })
      break;
    case 2:
      // navigation.navigate('PrepareScreen',{nextPage: 'DownloadScreen', title: 'سنجش سرعت دانلود'})
      // navigation.navigate('dlupScreen');
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [
      //       { name: 'dlupScreen' },
      //      ],
      //   })
      // );
      navigation.reset({
        index: 1,
        routes: [{ name: 'dlupScreen' }],
      })
      break;
    case 3:
      // navigation.navigate('PrepareScreen',{nextPage: 'HomeScreen', title: 'به زودی'})
      break;
    case 4:
      // navigation.navigate('PrepareScreen',{nextPage: 'DownloadScreen', title: 'سنجش سرعت دانلود'})
      // navigation.navigate('dlupScren');
      navigation.reset({
        index: 1,
        routes: [{ name: 'dlupScreen' }],
      })
      break;
    case 5:
      // navigation.navigate('BrowsingScreen');
      navigation.reset({
        index: 2,
        routes: [{ name: 'BrowsingScreen' }],
      })
      // navigation.navigate('PrepareScreen',{nextPage: 'BrowsingScreen', title: 'سنجش وبگردی'})
      break;

    default:
      break;
  }
}
