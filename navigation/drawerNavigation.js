import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity as TO,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import { P, H5, Label } from '../components/typo';
import { Icon } from 'react-native-elements';
import * as Stl from '../components/styles';
import TopTenHistory from '../screens/History/lastTen';
import DownloadUploadScreen from '../screens/Testing/DlUp';

import HomeScreen from '../screens/Home';
// import DownloadScreen from '../screens/Testing/Download';
// import UploadScreen from '../screens/Testing/Upload';
import WebBrowsing from '../screens/Testing/Browsing';
import Streaming from '../screens/Testing/Streaming';
import DriveTest from '../screens/Testing/DriveTest';
import Profile from '../screens/Profile/index';
// import Scores from '../screens/Scores';
// import QRCode from '../screens/Qr';
import History from '../screens/History';
// import Setting from '../screens/Setting';
import About from '../screens/About';
// import Result from '../screens/Result';
import Register from '../screens/Auth/Register';

import logoType from '../assets/img/logoType.png';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import FullResult from '../screens/Testing/FullResult';
import Scores from '../screens/Scores';
import fullShow from '../screens/Scores/fullShow';
import Soket from '../screens/Testing/Soket';

const Drawer = createDrawerNavigator();
const DrawerL = createDrawerNavigator();

export default function DrawerScreen() {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      initialRouteName="LeftDrawer"
      drawerContent={props => <LeftContent {...props} />}>
      <DrawerL.Screen
        name="LeftDrawer"
        component={LeftDrawer}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

function LeftDrawer() {
  return (
    <DrawerL.Navigator
      initialRouteName="Home"
      drawerPosition="right"
      drawerContent={props => <RightContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="dlupScreen"
        component={DownloadUploadScreen}
        options={{ headerShown: false }}
      />


      {/* <Drawer.Screen
        name="DownloadScreen"
        component={DownloadScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="UploadScreen"
        component={UploadScreen}
        options={{ headerShown: false }}
      /> */}
      <Drawer.Screen
        name="BrowsingScreen"
        component={WebBrowsing}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="StreamingScreen"
        component={Streaming}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="DriveTest"
        component={DriveTest}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Result"
        component={FullResult}
        options={{ headerShown: false }}
      />

      {/* <Drawer.Screen
        name="QRCode"
        component={QRCode}
        options={{ headerShown: false }}
      /> */}
      <Drawer.Screen
        name="History"
        component={History}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Scores"
        component={Scores}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="fullShow"
        component={fullShow}
        options={{ headerShown: false }}
      />
      {/* <Drawer.Screen
        name="Setting"
        component={Setting}
        options={{ headerShown: false }}
      /> */}
      <Drawer.Screen
        name="About"
        component={About}
        options={{ headerShown: false }}
      />
        <Drawer.Screen
        name="Soket"
        component={Soket}
        options={{ headerShown: false }}
      />
    </DrawerL.Navigator>
  );
}

function LeftContent(props) {
  return <TopTenHistory recieved={props.state} />;
}

function activeColor(firstValue, secondValue) {
  if (firstValue == secondValue) {
    return true
  } else if (firstValue === 4 && secondValue === 5) {
    return true
  } else
    return false
}


function RightContent(props) {
  var statics = props.state.index
  const dispatch = useDispatch()
  // alert(statics)

  return (
    <LinearGradient
      colors={['#373B43', '#0c0c0c']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.6 }}
      locations={[0.09, 0.9]}>
      <SafeAreaView>
        <ScrollView>
          <Image
            source={logoType}
            style={{ width: '100%', height: 50, marginTop: 10 }}
            resizeMode="contain"
          />
          <P style={[Stl.Gold, { textAlign: 'center' }]}>
            تست کیفیت خدمات مبتنی بر اینترنت
          </P>
          <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
            <NavItem
              title="شروع سنجش"
              iconName="ios-rocket"
              iconFamily="ionicon"
              isActive={activeColor(statics, 0)}
              onPress={() => {
                dispatch({ type: 'set_cat_id', payload: 2 })
                props.navigation.navigate('Home');
              }}
            />

            <NavItem
              title="پروفایل"
              iconName="user"
              isActive={activeColor(statics, 4)}
              onPress={() => {
                AsyncStorage.getItem('token').then(res => {
                  if (res === null) {
                    props.navigation.navigate('Register');
                  } else {
                    props.navigation.navigate('Profile');
                  }
                })
              }}
            />
            <NavItem
              title="امتیازها"
              iconName="check-circle"
              isActive={activeColor(statics, 8)}
              onPress={() => {
                props.navigation.navigate('Scores');
              }}
            />

            <NavItem
              title="تاریخچه"
              iconName="list"
              isActive={activeColor(statics, 7)}
              onPress={() => {
                props.navigation.navigate('History');
              }}
            />

            <NavItem
              title="درباره اپ"
              iconName="help-circle"
              isActive={activeColor(statics, 10)}
              onPress={() => {
                props.navigation.navigate('About');
              }}
            />
             <NavItem
              title="سوکت"
              iconName="help-circle"
              isActive={activeColor(statics, 10)}
              onPress={() => {
                props.navigation.navigate('Soket');
              }}
            />
            <NavItem
              title="درایوتست"
              iconName="help-circle"
              isActive={activeColor(statics, 10)}
              onPress={() => {
                props.navigation.navigate('DriveTest');
              }}
            />
          </View>
          <View>
            <Label style={[Stl.typo, { textAlign: 'center', marginTop: 20 }]}>
              نسخه ۰.۱
            </Label>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
//  <NavItem
// title="درایو تست"
// iconName="ios-car"
// iconFamily="ionicon"
// isActive={activeColor(statics, 6)}
// onPress={() => {
//   props.navigation.navigate('DriveTest');
// }}
// /> 
//  <NavItem
//               title="تنظیمات"
//               iconName="settings"
//               isActive={activeColor(statics, 12)}
//               onPress={() => {
//                 props.navigation.navigate('Setting');
//               }}
//             /> 
//    <NavItem
//   title="اسکن QRCode"
//   iconFamily="antdesign"
//   iconName="qrcode"
//   isActive={activeColor(statics, 10)}
//   onPress={() => {
//     props.navigation.navigate('QRCode');
//   }}
// />
const NavItem = ({ title, iconName, iconFamily, isActive, onPress }) => {
  return (
    <TO
      style={{
        flex: 1,
        marginVertical: 10,
        marginBottom: 20,
        flexDirection: 'row-reverse',
      }}
      onPress={onPress}>
      <Icon
        name={iconName ? iconName : 'sc-telegram'}
        type={iconFamily ? iconFamily : 'feather'}
        color={isActive ? Stl.Gold.color : Stl.typo.color}
        size={28}
        style={{ marginLeft: 15 }}
      />
      <H5 style={[isActive ? Stl.Gold : Stl.typo]}>{title}</H5>
    </TO>
  );
};
