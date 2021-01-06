import React from 'react';
import {Text, TouchableOpacity, StyleSheet,View, Image} from 'react-native'
import * as Stl from '../styles'

const Btn = (props) => {
    return(
        <TouchableOpacity 
            onPress={props.onPress} 
            style={[
                S.Container,
                props.Primary? Stl.BgPrimary : null,
                props.Light? Stl.BgLight : null,
                props.Secondary? Stl.BgSecondary : null,
                props.Gray? Stl.BgGray : null,
                props.Green? Stl.BgGreen : null,
                props.Left? S.AlignLeft : null,
                props.Center? S.AlignCenter : null,
                props.Right? S.AlignRight : null,
                props.BtnStyle? props.BtnStyle : null
                ]}>
            {props.imgSrc? <Image source={props.imgSrc} resizeMode='contain' style={{width: '100%', height: 40, marginVertical: 10}}/> : null}
            <Text 
                style={[Stl.font,
                    props.TCenter? S.TCenter : null,
                    props.TLeft? S.TLeft : null,
                    props.TRight? S.TRight : null,
                    props.Light? {color: '#fff'}: null,
                    props.Primary || props.Secondary ? Stl.Light : null,
                    props.TThird? Stl.Third : null,
                    props.Size? {fontSize: props.Size} : S.TextSize,
                    props.TextStyle? props.TextStyle : null,
                ]}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
} 
export default Btn
export const BtnRow = (props) => {
    return(
        <View 
            style={[
                S.btnRow,
                props.Left? S.AlignLeft : null,
                props.Center? S.AlignCenter : null,
                props.Right? S.AlignRight : null,
                props.CustomStyle ?  props.CustomStyle : null
            ]}
        >
            {props.children}
        </View>
    )
} 

const S = StyleSheet.create({
    TCenter:{
        textAlign: 'center'
    },
    TRight:{
        textAlign: 'right'
    },
    TLeft:{
        textAlign: 'left'
    },
    AlignLeft:{
        alignSelf: 'flex-start'
    },
    AlignCenter:{
        alignSelf: 'center'
    },
    AlignRight:{
        alignSelf: 'flex-end'
    },
    Container:{
        minWidth: 150,
        // flex: 0.2,
        margin: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 30,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.22,
        // shadowRadius: 2.22,

        // elevation: 3,
    },
    Rtl:{
        
    },
    TextSize:{
        fontSize:16
    },
    btnRow:{
        flexDirection: 'row-reverse',
        justifyContent: 'center',
    }
});


// Readme:

// props=[
//     TCenter: TextAlign Center
//     TLeft: TextAlign Left
//     TRight: TextAlign Right
//     Primary: color Set to Primary Color and White Text
//     Secondary: color Set to Secondary Color and White Text
//     Right: Button align to Right
//     Left: Button align to Center
//     Center: Button align to Center
//     TextStyle: Customize Style for Text
//     BtnStyle: Customize Style for Button

// ]