import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { H1, H2, H3, H4, H5 } from '../components/typo';
import * as Stl from '../components/styles';
import { CommonActions } from '@react-navigation/native';
import Body from '../components/Body';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Ping from 'react-native-ping';
import * as Progress from 'react-native-progress';

const spinValue = new Animated.Value(0);

export default function PrePare({ navigation, route }) {
  const fading = useRef(new Animated.Value(0)).current;

  const [preparing, setprepare] = useState(false)
  const [number, setNumber] = useState(0)
  const [parameter, setParameter] = useState(0)
  const [done, setDone] = useState(false)

  
  useEffect(()=>{
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true, // To make use of native driver for performance
      }),
    ).start();

    // Animated.timing(fading, {
    //   toValue: 1,
    //   duration: 1000,
    //   useNativeDriver: false,
    //   easing: Easing.in,
    // }).start();
  },[])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const fucousing = async () => {
    try {
      const res = await AsyncStorage.getItem(`tempRtt`);
      if (res !== null) {
        setprepare(false)
        setTimeout(() => {
          navigating();
        }, 4000);
      } else {
        setprepare(true)
        var b = [];
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
            const ms = await Ping.start('158.58.187.188', { timeout: 100 }); // 158.58.187.43#53
            if(i!==0 && i!== 1 && i!== 2){
              // console.log(ms)
              b.push(ms);
              setNumber(i+1)
            }
            // console.log(rtt);
          } catch (error) {
            // console.log('special code', error.code, error.message);
          }
        }
        setDone(true)
        var total = b.reduce(function (a, b) {
          return a + b;
        }, 0);
        var avg = total / b.length;
        AsyncStorage.setItem('tempRtt', JSON.stringify(b));
        AsyncStorage.setItem('tempRttAvg', avg.toString());
        setTimeout(() => {
          navigating();
        }, 1000);
      }
    } catch (err) {console.log(err, 'erro')}
  };

  function navigating() {
    // Animated.timing(fading, {
    //   toValue: 0,
    //   duration: 2000,
    //   useNativeDriver: false,
    //   easing: Easing.in,
    // }).start();
    setTimeout(() => {
      navigation.navigate(`${route.params.nextPage}`);
    }, 2000);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async (e) => {
      await fucousing();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(()=>{
    if (parameter !== 1) {
      setParameter(parameter + 0.1)
    }
  },[number])

  return (
    <Body style={{ justifyContent: 'center' }}>
      <Animated.View style={[s.bg, { opacity: 1 }]}>
        <View style={s.inner}>
          <View style={s.overlayCircle}>
            <H4 style={[Stl.typo, { textAlign: 'center', maxWidth: 130 }]}>
              آماده سازی {route.params.title ? route.params.title : null}
            </H4>
          </View>
          <Animated.View style={[{ transform: [{ rotate: spin }] }]}>
            <LinearGradient
              colors={['#1B1D21', '#10324B']}
              start={{ x: 0, y: 0.45 }}
              end={{ x: 0.4, y: 0.0 }}
              style={s.container}>
              <View style={s.sliceBg}>
                <View style={s.slice} />
              </View>
            </LinearGradient>
          </Animated.View>
        </View>
      </Animated.View>
      {
        preparing ? <Animated.View style={[{ opacity: fading }]}>
        <Progress.Bar progress={parameter} width={200} style={s.progress} borderRadius={0} unfilledColor={'rgba(0,53,128,0.23)'} color={'#003580'} borderWidth={0} />
        <Text style={{textAlign: 'center', marginTop: 20, color: '#fff'}}>{!done ? 'Pinging ...' : 'Calculation Succeed!'}</Text>
        </Animated.View> : null
      }
    </Body>
  );
}

const s = StyleSheet.create({
  progress:{
    alignSelf: 'center',
    marginTop: 40,
  },
  bg: {
    alignItems: 'center',
    backgroundColor: '#1B1D21',
    width: 200,
    height: 200,
    borderRadius: 20000000,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.84,
    elevation: 2,
  },
  inner: {
    borderRadius: 100,
    alignSelf: 'center',
    shadowColor: '#424A51',
    shadowOffset: {
      width: -4,
      height: -4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 2,
  },
  container: {
    width: 200,
    height: 200,
    borderRadius: 20000000,
    justifyContent: 'center',
  },
  sliceBg: {
    justifyContent: 'flex-end',
    flex: 1,
    // position: 'absolute',
    // right: 0,
    // bottom: 0,
  },
  slice: {
    backgroundColor: '#1B1D21',
    width: 100,
    height: 100,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 100,
  },
  overlayCircle: {
    position: 'absolute',
    top: 30,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B1D21',
    width: 140,
    height: 140,
    borderRadius: 100,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 2,
    zIndex: 2,
  },
});
