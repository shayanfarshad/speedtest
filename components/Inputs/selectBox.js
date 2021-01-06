import React,{Fragment, useState} from 'react'
import { View, Text, TouchableOpacity as TO} from 'react-native'
import { Icon } from 'react-native-elements'

import * as Stl from '../styles';
import * as S from './styles'


// import console = require('console');

const SelectBox = ({style,title, current, items, setCurrent, idSelector, NameSelector, pressCallBack,titleStyle,fontStyle}) =>{
    const [boxState, openBox] = useState(false)

    function itemPress(i){
        setCurrent(i)
        openBox(false)
        if(pressCallBack !== undefined){
            pressCallBack(i)
        }
    }

    function handleContainer(){
        openBox(!boxState)
    }

    function renderItem(item, key){
        return(
            <TO onPress={()=>itemPress(item)} key={key} style={[S.ListItemStyle,
                // props.multiSelect ? 
                //     props.current.length > key ? 
                //         props.current[key].Id === item.Id ? S.ActiveListItem : null
                //     : null
                // :props.current.Id === item.Id ? S.ActiveListItem: null
            ]}>
                <Text style={[Stl.font,
                // props.multiSelect ? 
                //     props.current.length > key ? 
                //         props.current[key].Id === item.Id ? S.ActiveListItemTxt : null
                //     : null
                // :props.current.Id === item.Id ? S.ActiveListItemTxt: null
                ]}>{item[NameSelector]}</Text>
            </TO>
        )
    }

    return(
        <View style={{marginBottom:10}}>
            <Text style={[Stl.font,titleStyle]}>{title}:</Text>
            <TO style={[S.SelectContainer,style]} onPress={()=>handleContainer()}>
                <View style={S.SelectBoxRow}>
                    <Text style={[Stl.font, Stl.Third, S.SelecBoxTitle, S.inputTitle,fontStyle]}>
                        {
                            typeof(current) !== 'undefined' && current !== null && current[NameSelector] !== undefined ? current[NameSelector] : 'تعیین نشده'
                        }
                    </Text>
                    <Icon
                        name={boxState ? 'caretup' : 'caretdown'}
                        type='antdesign'
                        color='#adabab'
                        size={14}
                        containerStyle={S.SelectBoxIcon}
                    />
                </View>
                {
                    boxState ? 
                    <View style={{padding: 10}}>
                        {
                            items !== null ? items.length > 0 ? items.map((i,k)=>{
                                return renderItem(i,k)
                            }) : null : null
                        }
                    </View>
                    : null
                }
            </TO>
        </View>
    )
}

export default SelectBox;

