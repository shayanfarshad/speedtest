import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Platform ,TouchableOpacity as TO,Modal} from 'react-native';
import {P,H5} from '../../components/typo'

function CloseModal({navigation,setVisible,visible,question}) {
// console.log('visible',setVisible)
    // const [modalVisible,setModalVisible] = useState(setVisible)
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}

            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <H5 style={styles.modalText}>{question}</H5>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>
                            <TO
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    setVisible(false)
                                    // setVisible(false);
                                }}
                            >
                                <P style={{ textAlign: 'center', color: 'white' }}>خیر</P>
                            </TO>
                            <TO
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Home' }],
                                      })
                                }}
                            >
                                <P style={{ textAlign: 'center', color: 'white' }}>بله</P>
                            </TO>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default CloseModal;
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      width:'60%',
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      width:40,height:40,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  