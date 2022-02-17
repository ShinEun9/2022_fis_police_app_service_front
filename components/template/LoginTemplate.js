import React from 'react';
import {SafeAreaView, View, Button, useWindowDimensions} from "react-native";
import LoginInputForm from '../organisms/LoginInputForm'
import logo from '../media/logo.png'
import {Image} from "react-native";

function LoginTemplate(props) {
    const goAuthSelectTemp = () => {
        props.navigation.navigate('AuthSelectTemplate', props);
    }

    const goSomePage = () => {
        //로그인 api 요청
        let auth = "center"
        if (auth = "center") {
            props.navigation.navigate('CenterMainTemplate', props);
        } else if (auth = "agent") {
            props.navigation.navigate('AgentMainTemplate', props);
        }

    }
    return (
        <SafeAreaView style={{
            flex:1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "orange"
        }}>
            <View style={{flex:1, justifyContent: "center", backgroundColor: "yellow"}}>
                <Image source={logo} style={{width: 180, height:140}}/>
            </View>
            <LoginInputForm onPress={goSomePage}  />
            <View style={{flex:1}}>
                <Button onPress={goAuthSelectTemp} title='회원가입 하러가기'/>
            </View>
        </SafeAreaView>
    );
}

export default LoginTemplate;

