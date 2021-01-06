import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableOpacity as TO,
  ActivityIndicator,
  PermissionsAndroid,
  BackHandler,
  Platform,
  Easing
} from 'react-native';
import Body from '../../components/Body';
import Header from '../../components/Header';
import NetState from '../../components/NetState';
import StartBtn from './components/StartBtn';
import CatSelect from './components/CatSelect';
import { useFocusEffect } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import AppAlert from '../../utils';
import { getBrowserUrl, getOptions, getUserProfile } from './_home_srv';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setProfileData, setUserScoreData } from '../../store/actions/userAction';
import { setLocation } from '../../store/actions/locationAction';
import { ScrollView } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import RNFetchBlob from 'rn-fetch-blob';

// import { set } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { setUploadSpeed, setDownloadMaxSpeed, setDownloadSpeed, setDataPath } from '../../store/actions/paramAction'
import setBrowsingData from '../../store/actions/setBrowsingData'
import setStreamData from '../../store/actions/setStreamData'
import { GetUserScore } from '../Scores/_score_srv';

function HomeScreen({ navigation, selectedCatId, setProfileData, countryCode, setUploadSpeed, setDownloadMaxSpeed, setDownloadSpeed, setDataPath, setBrowsingData, setStreamData, setUserScoreData }) {
  const [connected, setConnect] = useState(false);
  const [fadeconfig, setFadeConfig] = useState(false);
  const [wave, setWave] = useState(false);
  const [isFocus, setFocus] = useState(false)

  useEffect(() => {
    RNFetchBlob.config({ fileCache: true, appendExt: 'jpg' }).fetch('GET', 'http://api.romaak.net/speedtest/uploadtest/download.jpg')
      .then(res => {
        console.log(res.path())
        AsyncStorage.setItem('currentFilePath', JSON.stringify(Platform.OS === 'ios' ? res.path() : 'file://' + res.path()))
      }).catch(err => {
        // console.log(err)
        return 'dl err'
      });
  }, [])
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      // AsyncStorage.removeItem('tempRtt')
      // AsyncStorage.removeItem('tempRttAvg')
      setFocus(true)
      setFadeConfig(false);
      setWave(false)
      reqPermission()
      reqPermission2()

      // forceUpdate()
    });
    return unsubscribe;
  }, [navigation]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setFocus(false)
    });
    return unsubscribe;
  }, [navigation]);

  const reqPermission = async () => {


    try {
      if (Platform.OS !== 'ios') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'خواندن اطلاعات از روی دستگاه',
            message:
              'ما برای محاسبه سرعت آپلود و دانلود داده نیازمنده ذخیره و خواندن اطلاعات بر روی موبایل شما هستیم. ' +
              'آیا این اجازه را صادر می کنید؟',
            buttonNegative: 'خیر',
            buttonPositive: 'بله',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //console.log('You can use the camera');
        } else {
          //console.log('Camera permission denied');
        }
      }
    } catch (err) {
      //console.warn(err);
    }
  };
  const reqPermission2 = async () => {
    try {
      if (Platform.OS !== 'ios') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'ذخیره اطلاعات بر روی دستگاه',
            message:
              'ما برای محاسبه سرعت آپلود و دانلود داده نیازمنده ذخیره و خواندن اطلاعات بر روی موبایل شما هستیم. ' +
              'آیا این اجازه را صادر می کنید؟',
            buttonNegative: 'خیر',
            buttonPositive: 'بله',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //console.log('You can use the camera');
        } else {
          //console.log('Camera permission denied');
        }
      }
    } catch (err) {
      //console.warn(err);
    }
  };

  // useEffect(()=>{
  //   const backAction = () => {
  //     navigation.goBack('HomeScreen')
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // },[])
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        if (state.isConnected) {
          setConnect(true);
        } else {
          setConnect(false);
        }
        if (AsyncStorage.getItem('token') !== null) {
          getUserProfile().then(res => {
            if (res.status === 200) {
              setProfileData(res.data)
            }
          }).catch(err => {
          })

        }

      });
      getOptions().then(res => {
        if (res.status === 200) {
          AsyncStorage.setItem('options', JSON.stringify(res.data))
        }
      }).catch(err => {
        // console.log(err,'options err')
      })


      // Geolocation.getCurrentPosition(info => setLocation({ lat: info.coords.latitude, lng: info.coords.longitude }));
      return () => unsubscribe();
    }, []),
  );
  useEffect(() => {
    if (AsyncStorage.getItem('token') !== null) {
      GetUserScore().then(res => {
        setUserScoreData(res.data)
      }).catch(err => {
        console.log('errr', err)
      })
    }
  }, [navigation])
  const fading = useRef(new Animated.Value(0)).current;


  // useEffect(() => {
  //   setInterval(() => {
  //     // Your code  
  //     if (wave) {
  //       Animated.timing(fading, {
  //         toValue: 0,
  //         duration:500,
  //         useNativeDriver: false,
  //         // easing: Easing.in
  //       }).start()
  //       setWave(false)

  //     } else {
  //       Animated.timing(fading, {
  //         toValue: 1,
  //         duration:500,
  //         useNativeDriver: false,
  //         easing: Easing.in
  //       }).start()
  //       setWave(true)

  //     }
  //   },2000);

  // }, [wave])
  async function emptyRedux() {
    setDataPath(null)
    setDownloadSpeed('')
    setDownloadMaxSpeed('')
    setUploadSpeed('')
    setBrowsingData({ perf: '' })
    setStreamData({ perf: '' })
  }
  return (
    <Body style={{ flex: 1 }}>
      <View style={{ flex: 0.3 }}>
        <Header />
        {
          isFocus ? <CatSelect fade={fadeconfig} /> : null
        }

      </View>
      <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
        <LinearGradient colors={['#181818', '#202020']}
          style={[s.btnStyle]}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 0.5, y: 1 }}>
          {/* <View> */}
          <TO
            onPress={() => {
              if (connected) {
                // setFadeConfig(true);
                if (selectedCatId !== 0 && selectedCatId !== 3) {
                  if (countryCode === 'IR') {
                    emptyRedux().then(() => setFadeConfig(true))



                  } else {
                    AppAlert('info', 'فیلترشکن خود را قطع کنید و از اینترنت داخلی استفاده کنید', 2000)
                  }


                } else {
                  AppAlert('alert', 'به زودی در دسترس قرار میگیرد', 2000)
                }

                // alert(selectedCatId)
              } else {
                AppAlert('alert', 'اتصال خود به اینترنت را بررسی کنید');
              }
            }}
            style={{ height: 170, width: 170, justifyContent: 'center', alignItems: 'center', borderRadius: 85, }}
          >
            <StartBtn start={fadeconfig} selectedId={selectedCatId} />
          </TO>
        </LinearGradient>
        {/* </View> */}

        {/* <PrePare /> */}
      </View>
      <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
        <ScrollView>
          <NetState fade={fadeconfig} ip status operator tech server device />

        </ScrollView>

      </View>
    </Body>
  );
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setProfileData,
      setLocation,
      setDataPath,
      setDownloadSpeed,
      setDownloadMaxSpeed,
      setUploadSpeed,
      setBrowsingData,
      setStreamData,
      setUserScoreData
    },
    dispatch,
  );
};

const mapStateToProps = state => {
  return {
    selectedCatId: state.catHandler.selectedCatId,
    countryCode: state.paramHandler.countryCode
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
const s = StyleSheet.create({
  container: {
    shadowColor: "rgba(59,59,59,1)",
    shadowOffset: {
      width: -2,
      height: -2,
    },
    shadowOpacity: 1.75,
    shadowRadius: 20.84,
    marginTop: -50,
    // elevation: 1,
    // borderWidth:1,

    justifyContent: 'center', alignItems: 'center'
  },
  wrapper: {
    shadowColor: "rgba(255,255,255,0.51)",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1.75,
    shadowRadius: 20.84,

    // elevation: 1,
    width: 170,
    // height: 155,'

    alignSelf: 'center'
  },
  btnStyle: {
    width: 170,
    height: 170,
    alignSelf: 'center',
    borderRadius: 100000000,
    alignItems: 'center',
    elevation: 0,
    shadowColor: "rgba(255,255,255,0.51)",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1.75,
    shadowRadius: 10.84,
    justifyContent: 'center',
  },
  btnImg: {
    width: 50,
    height: 50,
    // position: 'absolute',
    alignSelf: 'center',
    zIndex: 12312,
  }
})
