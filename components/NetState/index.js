import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { P, Label } from '../../components/typo';
import NetInfo from '@react-native-community/netinfo';
import publicIP from 'react-native-public-ip';
import { useFocusEffect } from '@react-navigation/native';
import { GetOperatorName } from './_netState';
import { Icon } from 'react-native-elements'
import DeviceInfo from 'react-native-device-info';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Stl from '../styles';
import {setCountryCode} from '../../store/actions/paramAction'

function NetState({ fade, setCarr, ip, status, operator, tech, server, device,setCountryCode  }) {

  const fading = useRef(new Animated.Value(0)).current;
  const [connected, setConnect] = useState(false);
  const [type, setType] = useState('');
  const [carrier, setCarrier] = useState('');
  const [yourIp, setIp] = useState('');
  const [deviceName, setDeviceName] = useState('');

  useEffect(() => {
    if (fade === true) {
      Animated.timing(fading, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
        // easing: Easing.in
      }).start();
    } else {
      Animated.timing(fading, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
        // easing: Easing.in
      }).start();
    }

    if (Platform.OS === 'ios') {
      setDeviceName(DeviceInfo.getDeviceId())
    } else {
      let brand = DeviceInfo.getBrand();
      let deviceId = DeviceInfo.getDeviceId();
      DeviceInfo.getDeviceName().then(res => {
        setDeviceName(brand + ' ' + deviceId)

      }).catch(err => { })
    }

    // console.log('device id',deviceId)
    // console.log('model', DeviceInfo.getModel())
    // DeviceInfo.getDevice().then(device => {
    //   // "walleye"
    //   setDeviceName(device)
    // });
  }, [fade]);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        if (state.isConnected) {
          // NetworkInfo.getIPAddress().then(ipAddress => {
          //     GetOperatorName(ipAddress).then(res=>{
          //         console.log(res)
          //     })
          //   });
          if (state.isInternetReachable) {
            publicIP()
              .then(ip => {
                setIp(ip);
                // setCurrentIp(ip)
                // console.log('ip', ip);
                GetOperatorName(ip).then(res => {
                  // console.log(res, 'gate')
                  if (res.data.status === 'success') {
                    if (typeof (setCarr) !== 'undefined') {
                      setCarr(res.data.isp)
                    }
                    if (state.type === 'cellular') {
                      setType(state.details.cellularGeneration);
                      setCarrier(state.details.carrier);
                     
                    } else {
                      setType(state.type);
                      setCarrier(res.data.isp);
                     
                    }
                    // console.log('country code', res.data.countryCode)
                    setCountryCode(res.data.countryCode)

                  } else {
                    setType('ناشناخته');
                    setCarrier('ناشناخته');
                  }
                });
              })
              .catch(error => {
                setIp('')
                setType('ناشناخته');
                setCarrier('ناشناخته');
                // console.log(error);
                // 'Unable to get IP address.'
              });
          } else {
            setIp('')
          }
          // console.log(state)
          setConnect(true);
        } else {
          setConnect(false);
        }
      });

      return () => unsubscribe();
    }, []),
  );

  return (
    <Animated.View style={[{ paddingHorizontal: 20, opacity: fading }]}>
      <View style={s.row}>
        <View style={{ flex: 0.5 }}>
          {server ?
            <View style={s.outterBox}>
              <View style={s.box}>
                <Icon
                  name='server'
                  type='feather'
                  color='#fff'
                  style={{ marginRight: 10 }}
                />
                <P style={[s.label, { color: '#fff' }]}>سرور ایران</P>
              </View>
            </View> : null
          }
          {
            device ? <View style={s.outterBox}>
              <View style={s.box}>
                <Icon
                  name='mobile'
                  type='font-awesome-5'
                  color='#fff'
                  style={{ marginRight: 10 }}
                />

                <P style={[s.label]}>{deviceName}</P>
              </View>
            </View> : null
          }

          <View style={s.outterBox}>
            {
              ip ? yourIp !== '' ? (
                <View style={s.box}>
                  <Icon
                    name='ip-network-outline'
                    type='material-community'
                    color='#fff'
                    style={{ marginRight: 10 }}
                  />
                  <P style={[s.label]}>{yourIp}</P>
                </View>
              ) : null : null}
          </View>

        </View>
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
          {
            status ? <View style={s.outterBox}>
              <View style={[s.box, { flexDirection: 'row-reverse' }]}>
                <Icon
                  name={connected ? 'power-plug' : 'power-plug-off'}
                  type='material-community'
                  color={connected ? '#49DE0B' : 'red'}
                />
                {
                  connected ? (
                    <P style={[s.label, { color: '#49DE0B' }]}>متصل به اینترنت</P>
                  ) : (
                      <P style={[s.label, { color: 'red' }]}>قطع اتصال</P>
                    )
                }
              </View>
            </View> : null
          }
          {
            tech ? <View style={s.outterBox}>
              <View style={[s.box, { flexDirection: 'row-reverse' }]}>
                <Icon
                  name={type === 'wifi' ? 'ios-cellular' : 'md-cellular'}
                  type='ionicon'
                  color='#fff'
                />
                <P style={[s.label]}>{type}</P>
              </View>
            </View> : null
          }
          {
            operator ? <View style={s.outterBox}>
              <View style={[{ flexDirection: 'row-reverse' }]}>
                <Icon
                  name='font-awesome-flag'
                  type='font-awesome-5'
                  color='#fff'
                />
                <P style={[s.label]}>{carrier}</P>
              </View>
            </View> : null
          }
        </View>
      </View>
    </Animated.View>
  );
}








const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { setCountryCode },
    dispatch,
  );
};

const mapStateToProps = state => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NetState);


const s = StyleSheet.create({
  row: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  outterBox: {
    marginBottom: 35,
    flex: 1
  },
  box: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'right',
    paddingRight: 10
  },
  tleft: {
    textAlign: 'left',
  },
  tCenter: {
    textAlign: 'center',
  },
});
