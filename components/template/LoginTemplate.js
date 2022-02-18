import React, {useEffect} from 'react';
import {SafeAreaView, View, Button, useWindowDimensions} from "react-native";
import LoginInputForm from '../organisms/LoginInputForm'
import logo from '../media/logo.png'
import {Image} from "react-native";

function LoginTemplate(props) {
    const [currentInfo, setCurrentInfo] = React.useState({user_id: "", user_password: ""});

    // input handleChange 함수


    const handleChange = (name, value) => {
        setCurrentInfo({
            ...currentInfo,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(currentInfo);
    }, [currentInfo])

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
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <View style={{flex: 1.5, justifyContent: "flex-end",}}>
                <Image source={logo} style={{width: 180, height: 140}}/>
            </View>
            <View style={{ flex:2, alignItems: "center",justifyContent: "center"}}>
                <LoginInputForm onPress={goSomePage} handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={{flex: 1}}>
                <Button onPress={goAuthSelectTemp} title='회원가입 하러가기'/>
            </View>
        </SafeAreaView>
    );
}

export default LoginTemplate;
