import React, {useRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {P} from '../../components/typo';
import NetInfo from '@react-native-community/netinfo';
import publicIP from 'react-native-public-ip';

import {useFocusEffect} from '@react-navigation/native';
import {GetOperatorName} from './_netState';

function NetState({fade, setCarr}) {
  const fading = useRef(new Animated.Value(0)).current;
  const [connected, setConnect] = useState(false);
  const [type, setType] = useState('');
  const [carrier, setCarrier] = useState('');
  const [yourIp, setIp] = useState('');

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
          if (state.type === 'cellular') {
            setType(state.details.cellularGeneration);
            setCarrier(state.details.carrier);
            if(typeof(setCarr) !== 'undefined'){
              setCarr(state.details.carrier)
            }
          } else {
            if (state.isInternetReachable) {
              publicIP()
                .then(ip => {
                  setIp(ip);
                  // console.log(ip);
                  GetOperatorName(ip).then(res => {
                    // console.log(res, 'gate')
                    if (res.data.status === 'success') {
                      setType(state.type);
                      setCarrier(res.data.isp);
                      if(typeof(setCarr) !== 'undefined'){
                        setCarr(res.data.isp)
                      }
                    } else {
                      setType('ناشناخته');
                      setCarrier('ناشناخته');
                    }
                  });
                })
                .catch(error => {
                  // console.log(error);
                  // 'Unable to get IP address.'
                });
            }
            // setType(details.cellularGeneration)
            // setCarrier(details.carrier)
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
    <Animated.View style={[{paddingHorizontal: 20, opacity: fading}]}>
      <View style={s.row}>
        <View style={s.td}>
          <P style={s.label}>سرور انتخابی</P>
        </View>
        <View style={s.td}>
          <P style={[s.label, s.tleft, {color: '#fff'}]}>ایران</P>
        </View>
      </View>
      <View style={s.row}>
        <View style={s.td}>
          <P style={s.label}>وضعیت اینترنت</P>
        </View>
        <View style={s.td}>
          {connected ? (
            <P style={[s.label, s.tleft, {color: '#49DE0B'}]}>
              متصل به اینترنت
            </P>
          ) : (
            <P style={[s.label, s.tleft, {color: 'red'}]}>قطع اتصال</P>
          )}
        </View>
      </View>
      {yourIp !== '' ? (
        <View style={s.row}>
          <View style={s.td}>
            <P style={s.label}>آی پی شما</P>
          </View>
          <View style={s.td}>
          <View style={s.td}>
              <P style={[s.label, s.tleft]}>{yourIp}</P>
            </View>
          </View>
        </View>
      ) : null}
      {connected === false ? null : (
        <>
          <View style={s.row}>
            <View style={s.td}>
              <P style={s.label}>تکنولوژی</P>
            </View>
            <View style={s.td}>
              <P style={[s.label, s.tleft]}>{type}</P>
            </View>
          </View>
          <View style={s.row}>
            <View style={s.td}>
              <P style={s.label}>اپراتور</P>
            </View>
            <View style={s.td}>
              <P style={[s.label, s.tleft]}>{carrier}</P>
            </View>
          </View>
        </>
      )}
    </Animated.View>
  );
}

export default NetState;

const s = StyleSheet.create({
  row: {
    flexDirection: 'row-reverse',
    marginBottom: 20,
  },
  td: {
    flex: 0.5,
  },
  label: {
    color: '#fff',
  },
  tleft: {
    textAlign: 'left',
  },
});
