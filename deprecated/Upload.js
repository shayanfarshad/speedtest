import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  StyleSheet,
  ImageBackground,
  BackHandler,
  Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Body from '../../components/Body';
import Header from '../../components/Header';
import Ping from 'react-native-ping';
import RNFetchBlob from 'rn-fetch-blob';
import Charts from './Components/Charts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setDataPath,
  setDownloadSpeed,
  setUploadSpeed,
} from '../../store/actions/paramAction';
import { uploadFile } from './_test_services';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment-jalaali';
import AppAlert from '../../utils';
import { CommonActions } from '@react-navigation/native';

function UploadScreen(props) {
  const fading = useRef(new Animated.Value(0)).current;
  const [rtt, setRtt] = useState([0]);
  const [rttAvg, setRttAvg] = useState(0);
  const [done, setDone] = useState(false);
  const [dlSpeed, setDlSpeed] = useState(0);
  const [isMount, setMount] = useState(false)
  // useEffect(()=>{
  //   const backAction = () => {
  //     props.navigation.navigate('Home')
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // },[])
  useEffect(() => {
    setTimeout(async () => {
      Animated.timing(fading, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
        easing: Easing.in,
      }).start();
    }, 4000);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setMount(true)
      const unsub = test();
      return () => {
        unsub;
      };
    }, []),
  );

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', (e) => {
      setMount(false)
    });
    return unsubscribe;
  }, [props.navigation]);

  async function test() {
    setDone(false);
    setRttAvg(0);
    setDlSpeed(0);
    var startTime = new Date();
    // console.log(props.dataParam)
    var link = ''
    try {
      const options = await AsyncStorage.getItem('options');
      link = JSON.parse(options).upLink;
    } catch (err) { }
    uploadFile(props.dataParam, 'https://api.romaak.net/speedtest/uploadtest/index.php')
      .then(async res => {
        // console.log(res, 'upload')
        if (res.data.status === 200) {
          var endTime = new Date();
          var diff = Math.abs(endTime - startTime);
          diff = diff / 1000;
          var dataSize = 1567140; // in bytes;
          dataSize = dataSize / diff; // in bytes;
          dataSize = dataSize / 1000000; // in MegaByte
          dataSize = dataSize * 8; // Megabit
          setDlSpeed(dataSize + ' Mb/s');
          AsyncStorage.setItem('tempUpSpeed', dataSize.toString());
          // props.setUploadSpeed(dataSize);
          try {
            const res = await AsyncStorage.getItem(`tempRtt`);
            const res2 = await AsyncStorage.getItem(`tempRttAvg`);
            var a = res;
            if (res !== null) {
              // We have data!!
              a = JSON.parse(res);
              setRtt(a);
              setRttAvg(Number(res2));
            } else {
              setRtt([]);
              setRtt(0);
            }
            setDone(true);
            setTimeout(() => {
              if (isMount) {}
              if (props.selectedCatId == 3) {
                // props.navigation.navigate('PrepareScreen', {
                //   nextPage: 'BrowsingScreen',
                //   title: 'سنجش وبگردی',
                //   // id:Id
                // });
              } else {
                props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Result' }],
                  }),
                );
              }

            }, 7000);
          } catch (err) {
            // console.log(err, 'errro up')
          }
        }
      })
      .catch(err => {
        //console.log(err, 'err');
        AsyncStorage.setItem('tempUpSpeed', '0');
        setRtt([]);
        setRtt(0);
        setDlSpeed(0 + ' Mb/s');
        setDone(true);
        setTimeout(() => {
          // console.log('props id',props.id)
          if (isMount) {
            if (props.selectedCatId == 3) {
              // props.navigation.navigate('PrepareScreen', {
              //   nextPage: 'BrowsingScreen',
              //   title: 'سنجش وبگردی',
              //   // id:Id
              // });
            } else {
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Result' }],
                }),
              );
            }
          }
        }, 7000);
        // setDlSpeed(0 + ' Mb/s');
        // setUpload(0);
      });
    // var abs = {
    //   date: moment().format('jYYYY/jMM/jDD'),
    //   time: moment().format('HH:mm:ss'),
    //   dl: props.downloadSpeed,
    //   up: props.lastUpSpeed,
    //   rtt: avg,
    // };
    // try {
    //   const res = await AsyncStorage.getItem(`LastTest`);
    //   var a = res;
    //   var b = [];
    //   if (res !== null) {
    //     // We have data!!
    //     if (res.startsWith('{')) {
    //       b.push(JSON.parse(a));
    //     } else {
    //       b = JSON.parse(a);
    //     }
    //   } else {
    //     b = [];
    //   }
    //   b.push(abs);
    //   AsyncStorage.setItem('LastTest', JSON.stringify(b))
    // } catch (err) {}
    // setTimeout(() => {
    //   props.navigation.dispatch(
    //     CommonActions.reset({
    //       index: 0,
    //       routes: [{name: 'Home'}],
    //     }),
    //   );
    //   AppAlert('ok', 'نتایج بررسی در سایدبار ذخیره شد.');
    // }, 5000);
  }
  return (
    <Body style={{ justifyContent: 'center' }}>
      <Animated.View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          <Header />
        </View>
        <Charts
          rtt={rtt}
          done={done}
          param={dlSpeed}
          Avg={rttAvg}
          title={'سنجش سرعت آپلود'}
          color={'191, 55, 150'}
          isDownload={false}
        />
      </Animated.View>
    </Body>
  );
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { setDataPath, setDownloadSpeed, setUploadSpeed },
    dispatch,
  );
};

const mapStateToProps = state => {
  return {
    dataParam: state.paramHandler.dataParam,
    downloadSpeed: state.paramHandler.lastDownloadSpeed,
    lastUpSpeed: state.paramHandler.lastUpSpeed,
    selectedCatId: state.catHandler.selectedCatId

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadScreen);
