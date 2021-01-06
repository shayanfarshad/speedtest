import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import Body from '../components/Body';
import Header from '../components/Header';
import Ping from 'react-native-ping';
import RNFetchBlob from 'rn-fetch-blob';
import Charts from '../screens/Testing/Components/Charts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setDataPath, setDownloadSpeed } from '../store/actions/paramAction';
import AsyncStorage from '@react-native-community/async-storage';

// http://www.3rdechelon.net/jittercalc.asp#ping

function DownloadScreen(props) {
  const fading = useRef(new Animated.Value(0)).current;
  const [rtt, setRtt] = useState([0]);
  const [rttAvg, setRttAvg] = useState(0);
  const [done, setDone] = useState(false);
  const [dlSpeed, setDlSpeed] = useState(0);
  const [isMount, setMount] = useState(false)

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


  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', (e) => {
      setMount(true);
      test();
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', (e) => {
      // setMount(false)
    });
    return unsubscribe;
  }, [props.navigation]);

  async function test() {
    setDone(false);
    setRttAvg(0);
    setDlSpeed(0);
    var startTime = new Date();
    var link = ''
    try {
      const options = await AsyncStorage.getItem(`options`);
      link = JSON.parse(options).dlLink;
    } catch (err) { }
    RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      appendExt: 'jpg'

    })
      .fetch('GET', link, {
        //some headers ..
      })
      .then(async res => {
        var endTime = new Date();
        var diff = Math.abs(endTime - startTime);
        diff = diff / 1000;
        var dataSize = 1567140; // in bytes;
        dataSize = dataSize / diff; // in bytes;
        dataSize = dataSize / 1000000; // in MegaByte
        dataSize = dataSize * 8; // Megabit
        setDlSpeed(dataSize + ' Mb/s');
        // props.setDownloadSpeed(dataSize)
        AsyncStorage.setItem('tempDlSpeed', dataSize.toString());
        // the temp file path
        if (Platform.OS !== 'ios') {
          props.setDataPath('file://' + res.path());
        } else {
          props.setDataPath(res.path());
        }
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
            // if (isMount === true) {
              // props.navigation.navigate('PrepareScreen', {
              //   nextPage: 'UploadScreen',
              //   title: 'سنجش سرعت آپلود',
              // });
            // }

          }, 7000);
        } catch (err) { }
      })
      .catch(err => {
        // console.log(err, 'error download ')
        AsyncStorage.setItem('tempDlSpeed', '0');
        setDlSpeed(0 + ' Mb/s');
        setRtt([]);
        setRtt(0);
        setDone(true);
        setTimeout(() => {
          // Alert('selected id is '+ selectedCatId)
          if (isMount) {
            // props.navigation.navigate('PrepareScreen', {
            //   nextPage: 'UploadScreen',
            //   title: 'سنجش سرعت آپلود',
            //   // id:Id
            // });
          }
        }, 7000);
      });

    // setDlSpeed(sendNetworkTotal)
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
          title={'سنجش سرعت دانلود'}
          color={'3, 198, 90'}
          isDownload={true}
        />
      </Animated.View>
    </Body>
  );
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setDataPath, setDownloadSpeed }, dispatch);
};

const mapStateToProps = state => {
  return {
    dataParam: state.paramHandler.dataParam,
    selectedCatId: state.catHandler.selectedCatId
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DownloadScreen);
