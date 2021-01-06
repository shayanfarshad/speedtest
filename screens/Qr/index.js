import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions,StyleSheet,TouchableOpacity as TO, Linking } from 'react-native';
import Body from '../../components/Body';
import Header from '../../components/Header';
import * as Stl from '../../components/styles';
import {Icon} from 'react-native-elements';
import { RNCamera } from 'react-native-camera';

function QrCode({ }) {
    const [camera,setCamera] = useState(true)
    const [code,setCode] = useState(null)
    const [loading,setLoading] = useState('hide')
    const [mustShowCamera,setMustShowCamera] = useState(false)
    const [isFlash,setIsFlash] = useState(false)



    return (
        <Body>
            {/* <Header /> */}
            <RNCamera
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={
                    isFlash
                        ? RNCamera.Constants.FlashMode.torch
                        : RNCamera.Constants.FlashMode.off
                }
                barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                captureAudio={false}
                googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.DATA_MATRIX}
                googleVisionBarcodeMode={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeMode.ALTERNATE}
                onGoogleVisionBarcodesDetected={({ barcodes }) => {
                    // console.log(barcodes);
                  }}
                androidCameraPermissionOptions={{
                    title: 'نیاز به اجازه شما دارد',
                    message: 'برای اسکن کد qr نیاز به اجازه شما داریم',
                    buttonPositive: 'بسیارخب',
                    buttonNegative: 'اجازه نمیدهم',
                }}
                detectedImageInEvent={true}
                // bounds={
                //     width: number;git 
                //     height: number;
                //     origin: Array<{x: number, y: number}>
                //   }
                // onBarCodeRead={(res)=>{
                //     console.log("res",res)

                // }}
                onBarCodeRead={p => {
                    // console.log('res',p)
                    if (typeof p !== 'undefined')
                        if (typeof p.data !== 'undefined')
                            if (p.data.length > 0){
                                // console.log('data',p.data)
                                Linking.openURL(p.data)
                            }
                                // this.props.navigation.navigate('homepage', {
                                //     id: fixNumbers(p.data),
                                // });

                }}
                >
                <TO
                    onPress={() => setIsFlash(!isFlash)}
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        zIndex: 12312,
                        backgroundColor: '#fff',
                        borderRadius: 100000000,
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }}>
                    <Icon
                        name={isFlash ? 'ios-flash' : 'ios-flash-off'}
                        type="ionicon"
                        color={Stl.Primary.color}
                        size={30}
                    />
                </TO>
                <View style={styles.rectangleContainer}>
                    <View style={styles.rectangle} />
                </View>
            </RNCamera>
        </Body>
    )
}
const styles = StyleSheet.create({
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 8,
      paddingHorizontal: 15,
      alignSelf: 'center',
      margin: 20,
    },
    rectangleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    rectangle: {
      height: 150,
      width: 150,
      borderWidth: 2,
      borderColor: '#00FF00',
      backgroundColor: 'transparent',
    },
  });
export default QrCode;