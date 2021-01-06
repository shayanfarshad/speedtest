/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './navigation';
import { enableScreens } from 'react-native-screens';
import {name as appName} from './app.json';

enableScreens();

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
 