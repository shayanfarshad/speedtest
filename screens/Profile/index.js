import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity as TO, ScrollView, Modal, StyleSheet } from 'react-native';
import Body from '../../components/Body';
import Header from '../../components/Header';
import * as Stl from '../../components/styles';
import InputBox, { InputRow } from '../../components/Inputs/InputBox';
import Btn, { BtnRow } from '../../components/Buttons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setProfileData } from '../../store/actions/userAction'
import AsyncStorage from '@react-native-community/async-storage';
import { setProfileChange, updateUserImage } from './_profile_srv';
import AppAlert from '../../utils';
import { getUserProfile } from '../Home/_home_srv';
import ImagePicker from 'react-native-image-picker';
import { P } from '../../components/typo';
import LinearGradient from 'react-native-linear-gradient'
import nullPicture from '../../assets/img/user.png'
import RNFetchBlob from 'rn-fetch-blob';
import { setDataPath, setDownloadMaxSpeed, setDownloadSpeed, setUploadSpeed } from '../../store/actions/paramAction';
import setBrowsingData from '../../store/actions/setBrowsingData';
import setStreamData from '../../store/actions/setStreamData';
const RNFS = require("react-native-fs");
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'عکس', title: 'عکس کاربری خود را انتخاب کنید' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
function Profile({ user, navigation, setProfileData, setDataPath,
    setDownloadSpeed,
    setDownloadMaxSpeed,
    setUploadSpeed,
    setBrowsingData,
    setStreamData }) {

    const [exit, setExit] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [codeMelli, setCodeMelli] = useState('')
    const [email, setEmail] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')
    const [visibleModal, setVisibleModal] = useState(false)
    useEffect(() => {
        AsyncStorage.getItem('token').then(res => {
            setProfilePhoto(user.ProfilePhoto + `${res}`)
        })
        setFirstName(user.Name)
        setLastName(user.Family)
        setEmail(user.Email)
        setCodeMelli(user.CodeMeli)

    }, [])

    function saveChange() {
        var obj = new Object()
        obj.Name = firstName;
        obj.CodeMeli = codeMelli;
        obj.Family = lastName;
        obj.Email = email;
        setProfileChange(obj).then(res => {
            console.log('res pro', res)
        }).catch(err => {
            if (err.response)
                AppAlert(err.response.status, err.response.data)
        })
    }

    useEffect(() => {
        getUserProfile().then((res) => {
            console.log('user profile', res)
        })
    }, [navigation])


    function uploadImage() {
        // ImagePicker.launchImageLibrary(options, (response) => {
        //     console.log('Response = ', response);

        //     if (response.didCancel) {
        //       console.log('User cancelled image picker');
        //     } else if (response.error) {
        //       console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //       console.log('User tapped custom button: ', response.customButton);
        //     } else {
        //       const source = { uri: response.uri };
        //     console.log()
        //       // You can also display the image using data:
        //       // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        //     //  setProfilePhoto(response.uri)
        //     }
        //   });
        ImagePicker.launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                if (response.didCancel !== true) {
                    const formData = new FormData();
                    const data = new FormData()
                    // const byteCharacters = atob(response.data);
                    // // console.log('res', response.data)
                    // const byteNumbers = new Array(byteCharacters.length);
                    // for (let i = 0; i < byteCharacters.length; i++) {
                    //     byteNumbers[i] = byteCharacters.charCodeAt(i);
                    // }

                    // const byteArray = new Uint8Array(byteNumbers);
                    console.log('image path', response.path)
                    console.log('image uri', response.uri)
                    setProfilePhoto(response.uri);
                    // formData.append('test', 'test')
                    // const sourceData = { uri: 'data:image/jpeg;base64,' + response.data };
                    // RNFS.readFile(response.uri, "base64").then(data => {
                    //     // binary data
                    //     console.log('binary', data);

                    // });



                    data.append("Image", {
                        uri: response.uri,
                        type: response.type,
                        name: response.fileName
                    });


                    //formData.append('Image',response.data);
                    // console.log('binary', response.data)
                    console.log('form', data)
                    updateUserImage(data).then(res => {
                        console.log('res image', res)
                    }).catch(err => {
                        console.log('error', err)
                    })
                }

            },
        )
    }

    function takeImage() {


        ImagePicker.launchCamera(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                if (response.didCancel !== true) {
                    const data = new FormData();
                    // console.log('cancel nashode')
                    setProfilePhoto(response.uri);
                    // formData.append('test', 'test')

                    data.append("Image", {
                        uri: response.uri,
                        type: response.type,
                        name: response.fileName
                    });

                    // console.log('binary', response.data)
                    console.log('form', data)
                    updateUserImage(data).then(res => {
                        console.log('res image', res)
                    }).catch(err => {
                        console.log('error', err.response)
                    })
                }


            },

        )
    }


    async function goOut() {
        try {
            await AsyncStorage.removeItem('token')
        } catch (e) {
            // remove error
        }
        console.log('token', AsyncStorage.getItem('token'))
        setDataPath(null)
        setDownloadSpeed('')
        setDownloadMaxSpeed('')
        setUploadSpeed('')
        setBrowsingData({ perf: '' })
        setStreamData({ perf: '' })
        setExit(true)
        navigation.navigate('Home')

    }

    function openPicture() {
        setVisibleModal(true)
    }

    function deletePhoto() {
        // console.log('img',nullPicture)
        setProfilePhoto(null)
    }
    return (

        <Body  >
            <ScrollView>

                <Header title={'حساب کاربری'} type={'profile'} onPress={() => goOut(exit)} exit={exit} setExit={setExit} />

                <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                    {/* <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}> */}

                    <TO onPress={openPicture} style={{ width: 107, height: 107, borderRadius: 54, backgroundColor: 'gray' }}>
                        <Image source={profilePhoto == null ? nullPicture : { uri: profilePhoto }} style={{ width: 107, height: 107, borderRadius: 54 }} />
                    </TO>
                    <Modal
                        visible={visibleModal}
                        onDismiss={() => setVisibleModal(false)}
                        onRequestClose={() => setVisibleModal(false)}
                    >
                        <View style={{ width: '100%', height: '100%' }}>
                            <LinearGradient colors={['#383D45', '#1A1B1F']} style={{ flex: 1 }}>
                                <Image source={profilePhoto == null ? nullPicture : { uri: profilePhoto }} resizeMode='contain' style={{ width: '100%', height: '80%' }} />
                                <View style={{ height: '20%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <TO onPress={deletePhoto} style={styles.buttonStyle}><P>حذف عکس</P></TO>
                                    <TO onPress={takeImage} style={styles.buttonStyle}><P>دوربین</P></TO>
                                    <TO onPress={uploadImage} style={styles.buttonStyle}><P>آپلود عکس</P></TO>
                                </View>
                            </LinearGradient>
                        </View>
                    </Modal>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[{ color: '#D2AB67', textAlign: 'center' }, Stl.font]}>{user.Name} {user.Family}</Text>
                        <Text style={[{ color: '#D2AB67', textAlign: 'center' }, Stl.font]}>{user.MobailNumber}</Text>
                    </View>


                    {/* </View> */}

                </View>

                <View style={{ justifyContent: 'flex-start', alignItems: 'center', borderRadius: 10, backgroundColor: '#3B4048' }}>
                    <View style={{ width: '95%' }}>
                        <InputRow label='نام'>
                            <InputBox
                                // placeholder="نام"
                                value={firstName}
                                style={{ backgroundColor: '#202227', borderRadius: 30 }}
                                // keyboardType=
                                onChangeText={(value) => { setFirstName(value) }}
                            />
                        </InputRow>
                        <InputRow label='نام خانوادگی'>
                            <InputBox
                                // placeholder="نام"
                                value={lastName}
                                style={{ backgroundColor: '#202227', borderRadius: 30 }}
                                // keyboardType=
                                onChangeText={(value) => { setLastName(value) }}
                            />
                        </InputRow>
                        {/* <InputRow label='شماره همراه'>
                                    <InputBox
                                        // placeholder="نام"
                                        value={mobile}
                                        style={{ backgroundColor: '#202227', borderRadius: 30 }}
                                        // keyboardType=
                                        onChangeText={(value) => { setMobile(value) }}
                                    />
                                </InputRow> */}
                        <InputRow label='ایمیل'>
                            <InputBox
                                // placeholder="نام"
                                value={email}
                                style={{ backgroundColor: '#202227', borderRadius: 30 }}
                                // keyboardType=
                                onChangeText={(value) => { setEmail(value) }}
                            />
                        </InputRow>
                        <InputRow label='کدملی'>
                            <InputBox
                                // placeholder="نام"
                                value={codeMelli}
                                style={{ backgroundColor: '#202227', borderRadius: 30 }}
                                // keyboardType=
                                onChangeText={(value) => { setCodeMelli(value) }}
                            />
                        </InputRow>

                    </View>
                    <BtnRow>
                        <Btn onPress={saveChange} title="ذخیره تغییرات" Gray Light TCenter />
                    </BtnRow>
                </View>
            </ScrollView>
        </Body>

    )
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setProfileData, setDataPath,
            setDownloadSpeed,
            setDownloadMaxSpeed,
            setUploadSpeed,
            setBrowsingData,
            setStreamData
        },
        dispatch,
    );
};

const mapStateToProps = state => {
    return {
        user: state.userHandler.profile
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Profile);


const styles = StyleSheet.create({
    buttonStyle: {
        width: 80,
        backgroundColor: Stl.Gold.color,
        borderRadius: 10, height: 40, justifyContent: 'center',
        alignItems: 'center'
    }
})
// export default Profile;