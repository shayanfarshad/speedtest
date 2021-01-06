import React from 'react';
import {View,Text} from 'react-native';
import Body from '../../components/Body';
import Header from '../../components/Header';
import * as Stl from '../../components/styles';

function About({}){

    return(
        <Body>
            <Header />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[{color: '#fff', textAlign: 'center', fontSize: 26},Stl.Primary, Stl.font]}> راکت نت</Text>
                <Text style={[{color: '#fff', textAlign: 'center', fontSize: 18}, Stl.font]}>ترازوی سنجش اینترنت شما</Text>
                <Text style={[{color: '#fff', fontSize: 14, paddingHorizontal: 10, marginTop: 10, textAlign: 'justify'}, Stl.font]}>
                    نرم افزار راکت نت، یک اپلیکیشن مولتی پلتفرم هوشمند جهت سنجش کیفیت ارتباط اتصال اینترنت تلفن همراه تان است.
                </Text>
                <Text style={[{color: '#fff', fontSize: 14, paddingHorizontal: 10, marginTop: 10, textAlign: 'justify'}, Stl.font]}>
                این نرم افزار بر اساس الگوهای استاندارد و تعریف شده جهت بررسی پارامترهای کیفیت کانال ارتباطی شما در موضوعات مختلف اقدام به سنجش شاخص های زیرساخت شبکه می نماید.
                </Text>
                <Text style={[{color: '#fff', fontSize: 14, paddingHorizontal: 10, marginTop: 10, textAlign: 'justify'}, Stl.font]}>
                نسخه ای که در دستان شماست، نسخه بتای عمومی نرم افزار راکت نت با قابلیت سنج پارامترهای سرعت دانلود، آپلود، ویدئو استریم و مشاهده صفحات اینترنتی می باشد.
                </Text>
                <Text style={[{color: '#fff', fontSize: 14, paddingHorizontal: 10, marginTop: 10, textAlign: 'justify'}, Stl.font]}>
                در آینده ای نزدیک قابلیت های بسیار بیشتری به این سامانه اضافه خواهد شد.                
                </Text>
            </View>
        </Body>
    )
}

export default About;