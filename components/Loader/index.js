import React, { useRef } from 'react';
import { View, Text, Animated, StyleSheet, Image, Easing } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { H3 } from '../../components/typo'
import l1 from './l1.png';
import l2 from './l2.png';
import l3 from './l3.png';

function Loader({ }) {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const animatedValue = useRef(new Animated.Value(225)).current;
  const animatedValue2 = useRef(new Animated.Value(-228)).current;
  const animatedValue3 = useRef(new Animated.Value(-225)).current;

  const runAnimation = () => {
    Animated.timing(
      fadeIn,
      {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }
    ).start();
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: -133.9,
            duration: 3000,
            useNativeDriver: false,
            easing: Easing.in
          })
        ]),
        {
          iterations: 20 // Number of repetitions,
        }
      ).start()
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue2, {
            toValue: 125.9,
            duration: 7000,
            useNativeDriver: false,
            easing: Easing.in
          })
        ]),
        {
          iterations: 20 // Number of repetitions
        }
      ).start()
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue3, {
            toValue: 126.9,
            duration: 10000,
            useNativeDriver: false,
            easing: Easing.in
          })
        ]),
        {
          iterations: 20 // Number of repetitions
        }
      ).start()
    }, 2000);

  }
  runAnimation()
  return (
    <Animated.View style={[s.BoxShadow, { opacity: fadeIn }]}>
      <LinearGradient
        colors={['#1A1B1F', '#383D45']}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        style={[s.container]}
      >
        <Animated.Image source={l3} style={[s.img, { bottom: 0, transform: [{ translateX: animatedValue3 }], }]} resizeMode="cover" />
        <Animated.Image source={l2} style={[s.img, { bottom: -5, transform: [{ translateX: animatedValue2 }] }]} resizeMode="cover" />
        <Animated.Image source={l1} style={[s.img, { transform: [{ translateX: animatedValue }] }]} resizeMode="cover" />

      </LinearGradient>
      <H3 style={s.logingTxt}>در حال بارگذاری...</H3>
    </Animated.View>

  )
}

export default Loader;


const s = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 5000000,
    position: 'relative',
    zIndex: 123,
    overflow: 'hidden',
  },
  img: {
    overflow: 'visible',
    // width: '100%',
    flex: 1,
    position: 'absolute',
    bottom: -14,
  },
  BoxShadow: {
    shadowColor: "rgba(123, 121, 121, 0.8);",
    // shadowColor: "#eee",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.41,
    shadowRadius: 20.11,

    elevation: 10,
    backgroundColor: "#0000" // invisible color
  },
  logingTxt: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20
  }
})