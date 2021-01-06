import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  ImageBackground,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tres from '../../../assets/img/trs2.png';
import needleUp from '../../../assets/img/neddle.png';
import needleDl from '../../../assets/img/neddle2.png';
import { H5, Label } from '../../../components/typo';
import * as Stl from '../../../components/styles';
import { Icon } from 'react-native-elements';
import Counter from 'react-native-counter';

export default function Gauge({ indicator, isLoading, isDl, isDone, navigating, speed }) {
  const needleValue = new Animated.Value(0);
  const rotateNeedle = needleValue.interpolate({
    inputRange: [0, 250],
    outputRange: ['-125deg', '125deg'],
  });
  //
  const spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const calcIndic = indicVal => {
    var nextVal = indicVal;
    if (indicVal > 0 && indicVal <= 10) {
      return nextVal * (43 / 5);
    } else if (indicVal > 10 && indicVal <= 30) {
      return nextVal * 4 + 45;
    } else if (indicVal >= 30 && indicVal <= 50) {
      return nextVal * 1.7 + 120;
    } else if (indicVal > 50) {
      return nextVal * 0.77 + 170;
    } else {
      // return nextVal
    }
  };
  useEffect(() => {
    Animated.timing(needleValue, {
      //toValue: 123,
      toValue: calcIndic(indicator),
      duration: 1000,
      // easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [indicator]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: isLoading ? 1 : 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [isLoading]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: navigating ? 1 : 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [navigating]);

  function renderIndicator() {
    return (
      <>
        {!isLoading ? (
          <>
            {isDl ? (
              <Animated.Image
                source={needleDl}
                style={{
                  transform: [{ rotate: rotateNeedle }],
                  width: 350,
                  height: 350,
                }}
              />
            ) : (
                <Animated.Image
                  source={needleUp}
                  style={{
                    transform: [{ rotate: rotateNeedle }],
                    width: 350,
                    height: 350,
                  }}
                />
              )}
            <Label
              style={{
                color: '#fff',
                textAlign: 'center',
                position: 'absolute',
                top: 40,
                fontSize: 10,
              }}>
              {isDl ? 'Download' : 'Upload'}
            </Label>
          </>
        ) : (
            <H5 style={{ color: Stl.Gold.color, textAlign: 'center' }}>
              درحال دریافت {'\n'}Ping...
            </H5>
          )}
        {
          speed !== 0 ? <Counter
            end={speed}
            start={0}
            time={1000}
            digits={2}
            easing="linear"
            style={[{
              color: '#fff',
              textAlign: 'center',
              position: 'absolute',
              bottom: 30,
            }, Stl.font, Stl.Paragraph]}
          /> : null
        }
        <Label
          style={{
            color: '#fff',
            textAlign: 'center',
            position: 'absolute',
            bottom: 10,
          }}>
          Mb/s
        </Label>
      </>
    );
  }
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ImageBackground
        source={tres}
        style={s.backBg}
        resizeMode="contain"
        imageStyle={{}}>
        <View style={s.inner}>
          <View style={s.overlayCircle}>
            {isDone === true ? <Icon
              name={'check-all'}
              type='material-community'
              color={Stl.Green.color}
              size={70}
            /> : renderIndicator()}
          </View>
          <Animated.View style={[{ transform: [{ rotate: spin }] }]}>
            <LinearGradient
              colors={['#1B1D21', '#10324B']}
              start={{ x: 0, y: 0.45 }}
              end={{ x: 0.1, y: 0.0 }}
              style={s.container}
            />
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
}

const s = StyleSheet.create({
  backBg: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 65,
    paddingRight: 10,
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
});
