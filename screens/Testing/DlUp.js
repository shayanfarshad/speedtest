import React, { useState, useEffect } from 'react';
import { View, Text, BackHandler, Modal, TouchableOpacity as TO, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import CalPingParams from './Components/ping';
import CommandDlUp from './Components/dlupFn';
import SaveResult from './Components/saveResults';
import { bindActionCreators } from 'redux';
import { CommonActions } from '@react-navigation/native';

import Body from '../../components/Body';
import Header from '../../components/Header';
import NetState from '../../components/NetState';
import { P, H5 } from '../../components/typo'
import Gauge from './Components/Gauge';
import ResultBox from './Components/resultBox';
import LineCharts from './Components/LineChart';
import { setDownloadSpeed, setUploadSpeed, setDownloadMaxSpeed, setDataPath } from '../../store/actions/paramAction';
import AppAlert from '../../utils';
import CloseModal from '../../components/Modal';
import Geolocation from '@react-native-community/geolocation';

function DownloadUploadScreen({ navigation, selectedCatId, setDownloadSpeed, setUploadSpeed, setDownloadMaxSpeed, setDataPath }) {
  const [isLoading, setLoading] = useState(true);
  const [jitter, setJitter] = useState('');
  const [ping, setPing] = useState('');
  const [plr, setPlr] = useState('');
  const [pingArray, setPingArray] = useState([]);
  const [dlSpeed, setDlSpeed] = useState('');
  const [currentLocation, setCurrentLocation] = useState({});
  const [upSpeed, setUpSpeed] = useState('');
  const [indicator, setIndicator] = useState(0);
  const [finalIndicator, setFinalIndicator] = useState(0);
  const [isDl, setDl] = useState(true);
  const [isDone, setDone] = useState(false);
  const [isNavigating, setIsNavigating] = useState(true);
  const [modalVisible, setModalVisible] = useState(false)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Geolocation.getCurrentPosition(info => setCurrentLocation({ lat: info.coords.latitude, lng: info.coords.longitude }));
      BackHandler.addEventListener('hardwareBackPress', handleBack);
      var targetCat = selectedCatId
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
          CommandDlUp('dl')
            .then(res => {
              setDlSpeed(res);
              setDownloadSpeed(Number(res.avg));
              setDownloadMaxSpeed(Number(res.max))
          
              setIndicator(Number(res.avg))
              setTimeout(async() => {
                setUpSpeed(0);
                setIndicator(0);
                setLoading(true);
                try {
                  const up = await CommandDlUp('up');
                  setDl(false);
                  setLoading(false);
                  setUpSpeed(Number(up.avg));
                  setUploadSpeed(Number(up.avg));
                  setIndicator(Number(up.avg));
                  await new SaveResult().DlUpload(
                    res.avg,
                    res.max,
                    up.avg,
                    data.avgPing,
                    data.maxPing,
                    data.pingArray[data.pingArray.length - 1],
                    data.jitter,
                    data.plr.toString(),
                    targetCat,
                    0,
                    currentLocation.lat,
                    currentLocation.lng,
                  );

                  setTimeout(() => {
                    setDone(true);
                    // console.log(props.selectedCatId)
                    if (targetCat === 2) {
                      setTimeout(() => {
                        setIsNavigating(true)
                      }, 1000);
                      setTimeout(() => {
                        navigation.navigate('BrowsingScreen');
                      }, 2500);
                    } else {
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 6,
                          routes: [{ name: 'Result' }],
                        }),
                      );
                    }
                  }, 5000);
                } catch (err) {
                  //console.log(err);
                  setDone(true)
                  if (targetCat === 2) {
                    setTimeout(() => {
                      setIsNavigating(true)
                    }, 1000);
                    setTimeout(() => {
                      navigation.navigate('BrowsingScreen');
                    }, 2500);
                  }
                }
              }, 5000);
            })
            .catch(err => {
              setDone(true)

              if (targetCat === 2) {
                setTimeout(() => {
                  setIsNavigating(true)
                }, 1000);
                setTimeout(() => {
                  navigation.navigate('BrowsingScreen');
                }, 2500);
              }
            });
        } catch (err) {
          setLoading(false);
          setDone(true)
          if (targetCat === 2) {
            setTimeout(() => {
              setIsNavigating(true)
            }, 1000);
            setTimeout(() => {
              navigation.navigate('BrowsingScreen');
            }, 2500);
          }
        }
      }, 3000);
    });
    return unsubscribe;
  }, [navigation]);

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
    <Body>
      <View style={{ flex: 0.1 }}>
        <Header title="سنجش سرعت" />
      </View>
      <View style={{ flex: 0.9 }}>
        <CloseModal navigation={navigation} setVisible={setModalVisible} visible={modalVisible} />
        <ScrollView>
          {/* <LineCharts params={pingArray} /> */}
          <Gauge
            indicator={indicator}
            isLoading={isLoading}
            isDl={isDl}
            isDone={isDone}
            navigating={isNavigating}
            speed={indicator}
          />
          <ResultBox
            ping={ping}
            jitter={jitter}
            plr={plr}
            dlSpeed={dlSpeed}
            upSpeed={upSpeed}
          />
          <NetState fade={false} operator tech server device />
        </ScrollView>
      </View>
    </Body>
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


const mapStateToProps = state => {
  return {
    dataParam: state.paramHandler.dataParam,
    selectedCatId: state.catHandler.selectedCatId,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DownloadUploadScreen);
