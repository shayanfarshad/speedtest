/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from '../store/store';
import { Root } from "native-base";
import {
  StyleSheet,
} from 'react-native';

import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import SplashScreen from '../screens/Splash';
import DrawerScreen from './drawerNavigation';
import Code from '../screens/Auth/Code';
import FullResult from '../screens/Testing/FullResult';


const Stack = createStackNavigator();
// const config = {
//   animation: 'fade',
//   config: {
//     stiffness: 1000,
//     damping: 500,
//     mass: 3,
//     overshootClamping: true,
//     restDisplacementThreshold: 0.01,
//     restSpeedThreshold: 0.01,
//   },
// };

const forFade = ({ current, closing }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const App = () => {
  return (
    <Root>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef} >
          <Stack.Navigator screenOptions={{
            headerShown: false,
            cardStyleInterpolator: forFade
            // transitionSpec: {
            //   open: config,
            //   close: config
            // }
          }}>
            {/* <Stack.Screen name="result" component={FullResult} /> */}
            <Stack.Screen name="HomeScreen" component={DrawerScreen} />
            <Stack.Screen name="CodeScreen" component={Code} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </Root>
  );
};

const styles = StyleSheet.create({

});

export default App;
export const navigationRef = React.createRef();
