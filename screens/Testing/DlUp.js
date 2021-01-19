import React, { useState, useEffect } from 'react';
import { View, Text, BackHandler, Modal, TouchableOpacity as TO, StyleSheet, ImageBackground, Animated, Easing } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import CalPingParams from './Components/ping';
import { bindActionCreators } from 'redux';
import { CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import Ping from 'react-native-ping';
import Body from '../../components/Body';
import Header from '../../components/Header';
import gauge from '../../assets/img/bg.png'
import NetState from '../../components/NetState';
import ResultBox from './Components/resultBox';
import { setDownloadSpeed, setUploadSpeed, setDownloadMaxSpeed, setDataPath } from '../../store/actions/paramAction';
import CloseModal from '../../components/Modal';
import Geolocation from '@react-native-community/geolocation';
import RNSpeedometer from 'react-native-speedometer'
import AsyncStorage from '@react-native-community/async-storage';

function DownloadUploadScreen({ navigation, selectedCatId, setDownloadSpeed, setUploadSpeed, setDownloadMaxSpeed, setDataPath, lastDownloadSpeed, lastUploadSpeed, maxDl }) {
  const [isLoading, setLoading] = useState(true);
  const [jitter, setJitter] = useState('');
  const [ping, setPing] = useState('');
  const [plr, setPlr] = useState('');
  const [pingArray, setPingArray] = useState([]);
  const [dlSpeed, setDlSpeed] = useState('');
  // const [maxDl, setMaxDl] = useState('')
  const [currentLocation, setCurrentLocation] = useState({});
  const [upSpeed, setUpSpeed] = useState('');
  const [downFinish, setDownFinish] = useState(false);
  const [upFinish, setUpFinish] = useState(false);
  const [indicator, setIndicator] = useState(0);
  const [finalIndicator, setFinalIndicator] = useState(0);
  const [isDl, setDl] = useState(true);
  const [isDone, setDone] = useState(false);
  const [isNavigating, setIsNavigating] = useState(true);
  const [modalVisible, setModalVisible] = useState(false)

  const serverIp = "92.114.17.213:5151";
  // const downloadBitRequest = 25548000;
  const downloadBitRequest = 2000000;
  const uploadBitRequest = 3548000;
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const [waiting, setWaiting] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [progressing, setProgressing] = useState(false);
  const [uploadProgressing, setUploadProgressing] = useState(false);
  const [byteArray, setByteArray] = useState();
  const [downloadTime, setDownloadTime] = useState();
  var xhr = new XMLHttpRequest();
  const downloadProgress = () => {

    setTimeout(() => {

      setLoading(false)
      const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

      let loadedDArr = [];
      let timeStampDArr = [];
      let speedArr = [];
      xhr.responseType = 'blob'
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          setProgressing(100)
        }
      };
      xhr.open(
        "GET",
        `http://92.114.17.213:5151/new.mp4`,
        true,

      );


      let i = 0;
      xhr.addEventListener(
        "progress",
        (evt) => {
          timeStampDArr.push(evt.timeStamp / 1000); //make mili second to second
          loadedDArr.push(evt.loaded * 8); //make byte to bit

          if (i > 0) {
            let time = timeStampDArr[i] - timeStampDArr[i - 1];
            let load = loadedDArr[i] - loadedDArr[i - 1];
            let speed = load / time / 1024 / 1024; // in Mbit/s
            speedArr.push(speed);
            setDlSpeed(arrAvg(speedArr).toFixed(1))
            setIndicator(arrAvg(speedArr).toFixed(1))
            setDownloadSpeed(arrAvg(speedArr).toFixed(1))
            setDownloadMaxSpeed(Math.max(...speedArr).toFixed(1))

            if (evt.lengthComputable) {
              let percentComplete = (evt.loaded / evt.total) * 100;
              setProgressing(percentComplete);
              setDownloadTime(evt.timeStamp)

            }
          }

          i++;
        },
        false
      );

      xhr.addEventListener(
        "error", (evt) => {
          // console.log('eerrrroorrr ', evt)
        }
      )


      xhr.addEventListener("load", function () {
        var bl = new Blob([JSON.stringify(this.response._data, null, 2)], { type: 'application/json' })
        setByteArray(bl)
      }, false);


      xhr.setRequestHeader("Range", `bytes=1-${downloadBitRequest}`); // the bytes  you request
      xhr.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
      xhr.send(null);
    }, 2000);
  };

  const uploadProgress = () => {

    let loadedDArr = [];
    let timeStampDArr = [];
    let speedArr = [];
    setTimeout(async () => {
      const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
      const uploadFilePath = await AsyncStorage.getItem(`currentFilePath`);
      const path = JSON.parse(uploadFilePath);
      const formData = new FormData();
      formData.append('File', {
        uri: `${path}`,
        type: 'image/jpg',
        name: `upload.jpg`,
      });
      var tempUpLink = 'http://92.114.17.213:5151/api/Data/UploadFile';

      xhr.onreadystatechange = function (e) {
        if (4 == this.readyState) {
          setUploadProgressing(100);
        }
      };
      if (xhr.upload) {
        let i = 0;
        xhr.upload.onprogress = function (e) {
          var done = e.position || e.loaded, total = e.totalSize || e.total;
          timeStampDArr.push(e.timeStamp / 1000); //make mili second to second
          loadedDArr.push(e.loaded * 8); //make byte to bit
          if (i > 0) {
            let time = timeStampDArr[i] - timeStampDArr[i - 1];
            let load = loadedDArr[i] - loadedDArr[i - 1];
            let speed = load / time / 1024 / 1024; // in Mbit/s
            speedArr.push(speed);
            setUploadSpeed(arrAvg(speedArr).toFixed(1))
            setIndicator(arrAvg(speedArr).toFixed(1))
            if (e.lengthComputable) {
              let percentComplete = (e.loaded / e.total) * 100;

            }
          }

          i++;
          console.log('xhr.upload progress: ' + done + ' / ' + total + ' = ' + (Math.floor(done / total * 1000) / 10) + '%');


        };
      }

      xhr.open('post', tempUpLink, true);
      xhr.setRequestHeader("Content-Type", "multipart/form-data");
      xhr.send(formData);

    }, 2000)
  }

  const getPing = async (ip) => {
    var t = [];
    for (var i = 1; i <= 13; i++) {
      if (i !== 1 && i !== 2 && i !== 3) {
        var m = await Ping(ip);
        t.push(m);
      }
    }
    if (t.length > 0) {
      t = t.sort(function (a, b) {
        return a - b;
      });
    }
    var minPing = t[0];
    var maxPing = t[t.length - 1];
    var avgPing = 0;
    var jitter = 0;
    var plr = 10 - t.length;
    var Total = t.reduce(function (a, b) {
      return a + b;
    }, 0);
    if (Total !== 0) {
      avgPing = Total / t.length;
      avgPing.toFixed(1);
    }
    var jitterL = [];
    for (var item in t) {
      if (item !== "0") {
        var aaa = Math.abs(t[item] - t[item - 1]);
        if (aaa !== "NaN") jitterL.push(aaa);
      }
    }
    if (jitterL.length > 0) {
      var sum = jitterL.reduce(function (a, b) {
        return a + b;
      }, 0);
      jitter = sum / jitterL.length;
      if (jitter !== 0) {
        jitter = jitter.toFixed(1);
      }
    }
    return {
      pingArray: t,
      minPing: minPing,
      maxPing: maxPing,
      avgPing: avgPing,
      jitter: jitter,
      plr: plr * 10,
    };

  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Geolocation.getCurrentPosition(info => setCurrentLocation({ lat: info.coords.latitude, lng: info.coords.longitude }));
      BackHandler.addEventListener('hardwareBackPress', handleBack);
      setTimeout(async () => {

        try {
          var data = await CalPingParams('158.58.187.188');
          if (data) {
            setDataPath(data);
            setJitter(data.jitter);
            setPing(data.avgPing);
            setPlr(data.plr.toString());
            setPingArray(data.pingArray);
            setLoading(false);
          }
          downloadProgress();
          dispatch({ type: 'set_Download_Speed', payload: 0 })

        } catch (error) {
          console.log('get ping has error')
        }
      }, 2000)
      // getPing(serverIp).then((res) => {
      //   console.log('ping res', res)
      //   setPing(res.avgPing)
      //   setJitter(res.jitter)
      //   setPlr(res.plr)
      //   setLoading(false)
      // dispatch({ type: "PING", payload: res.avgPing });
      // dispatch({ type: "JITTER", payload: res.jitter });
      // dispatch({ type: "POCKET_LOSS", payload: res.plr });
    });
    return unsubscribe;
  }, []);

  // dispatch({ type: 'UPLOAD_DATA', payload: 0 })

  useEffect(() => {
    if (progressing === 100) {
      setTimeout(() => {
        setWaiting(true);
      }, 2000);
    }
  }, [progressing]);

  useEffect(() => {
    if (byteArray) {
      // setDl(false)
      setIndicator(0);
      uploadProgress()
    };
  }, [byteArray]);

  useEffect(() => {
    if (uploadProgressing === 100) {
      // setRedirect(true);
      xhr.abort();
      if (selectedCatId === 2) {
        setTimeout(() => {
          setIsNavigating(true)
        }, 1000);
        setTimeout(() => {
          navigation.navigate('BrowsingScreen');
        }, 2500);
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 7,
            routes: [{ name: 'Result' }],
          }),
        );
      }
    }
  }, [uploadProgressing]);


  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', async () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
      setLoading(true);
      setJitter('');
      setPing('');
      setPlr('');
      setPingArray([]);
      setDlSpeed('');
      setUpSpeed('');
      setIndicator(0);
      setDl(true);
      setDone(false);
      setIsNavigating(false)
    });
    return unsubscribe;
  }, [navigation]);

  function handleBack() {
    setModalVisible(true)

    // navigation.navigate('Home');
    return true;
  }
  return (

    < Body >
      <View style={{ flex: 0.1 }}>
        <Header title="سنجش سرعت" />
      </View>
      <View style={{ flex: 0.9 }}>
        <CloseModal navigation={navigation} setVisible={setModalVisible} visible={modalVisible} />
        <ScrollView>
          <ImageBackground source={gauge} style={s.backBg}
            resizeMode="contain"
            imageStyle={{}}>
            <RNSpeedometer value={indicator} allowedDecimals={1} minValue={0} maxValue={100} labels={costumLabel} labelStyle={{ width: 0 }} innerCircleStyle={{ backgroundColor: 'rgba(0,0,0,0)' }} outerCircleStyle={{ backgroundColor: "rgba(0,0,0,0)" }} wrapperStyle={{ marginBottom: 40 }} size={300} />

          </ImageBackground>

          <ResultBox
            ping={ping}
            jitter={jitter}
            plr={plr}
            dlSpeed={lastDownloadSpeed}
            upSpeed={lastUploadSpeed}
            dlMax={maxDl}
          />
          <NetState fade={false} operator tech server device />
        </ScrollView>
      </View>
    </Body >
  );
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setDataPath,
      setDownloadSpeed,
      setDownloadMaxSpeed,
      setUploadSpeed
    },
    dispatch
  );
};
const s = StyleSheet.create({
  label: {
    color: '#fff'
  },
  backBg: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 65,
    paddingRight: 5,
  },
  inner: {
    borderRadius: 20000000,
    alignSelf: 'center',
    shadowColor: '#424A51',
    shadowOffset: {
      width: -4,
      height: -4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    width: 230,
    height: 230,
    borderRadius: 20000000,
    justifyContent: 'center',
  },
  overlayCircle: {
    position: 'absolute',
    top: 28,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff',
    backgroundColor: '#1B1D21',
    width: 170,
    height: 170,
    borderRadius: 20000000,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 2,
  },
})
const costumLabel = [
  {
    name: 'خیلی ضعیف',
    labelColor: 'rgba(0,0,0,0)',
    activeBarColor: 'rgba(0,0,0,0)',
  },
  {
    name: 'Slow',
    labelColor: 'rgba(0,0,0,0)',
    activeBarColor: 'rgba(0,0,0,0)',
  },
  {
    name: 'Normal',
    labelColor: 'rgba(0,0,0,0)',
    activeBarColor: 'rgba(0,0,0,0)',
  },
  {
    name: 'Fast',
    labelColor: 'rgba(0,0,0,0)',
    activeBarColor: 'rgba(0,0,0,0)',
  },
  {
    name: 'rgba(0,0,0,0)',
    labelColor: 'rgba(0,0,0,0)',
    activeBarColor: 'rgba(0,0,0,0)',
  },
]

const mapStateToProps = state => {
  return {
    dataParam: state.paramHandler.dataParam,
    lastDownloadSpeed: state.paramHandler.lastDownloadSpeed,
    maxDl: state.paramHandler.maxDownloadSpeed,
    lastUploadSpeed: state.paramHandler.lastUpSpeed,
    selectedCatId: state.catHandler.selectedCatId,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DownloadUploadScreen);
