import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Body from '../../components/Body';
import Header from '../../components/Header';
import * as Stl from '../../components/styles';
import SelectBox from '../../components/Inputs/selectBox';

function Setting({ }) {

    const [lang, setLang] = useState('')
    const [testType, setTestType] = useState('')
    const [testUnit, setTestUnit] = useState('')

    const [selectedLang] = useState([
        { Name: 'فارسی' },
        { Name: 'انگلیسی' },
        { Name: 'عربی' },
    ])
    const [selectedType] = useState([
        { Name: 'ندارد' },
        { Name: 'سنجش کامل' },
    ])
    const [selectedUnit] = useState([
        { Name: 'ندارد' },
        { Name: 'مگابایت-MB' },
    ])
    return (
        <Body>
            <Header />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[{ color: '#D2AB67', textAlign: 'center' }, Stl.font]}>تنظیمات</Text>
                <View style={{width:'95%'}}>
                    <SelectBox
                        current={lang}
                        setCurrent={setLang}
                        items={selectedLang}
                        title="زبان"
                        titleStyle={{color:'#D2AB67'}}
                        style={{ minHeight:50 }}
                        fontStyle={{color:'white'}}
                        NameSelector={"Name"}
                    />
                    <SelectBox
                        current={testType}
                        setCurrent={setTestType}
                        items={selectedType}
                        title="نوع سنجش"
                        titleStyle={{color:'#D2AB67'}}
                        fontStyle={{color:'white'}}
                        style={{ minHeight:50 }}
                        NameSelector={"Name"}
                    />
                    <SelectBox
                        current={testUnit}
                        setCurrent={setTestUnit}
                        items={selectedUnit}
                        title="واحد سنجش"
                        titleStyle={{color:'#D2AB67'}}
                        fontStyle={{color:'white'}}
                        style={{ minHeight:50 }}
                        NameSelector={"Name"}
                    />
                </View>
            </View>
        </Body>
    )
}

export default Setting;