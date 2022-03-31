import React, {useEffect} from 'react';
import {SafeAreaView, View, Alert, TouchableOpacity, Text} from "react-native";
import LoginInputForm from '../organisms/LoginInputForm'
import logo from '../media/logo.png'
import {Image} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";
import {showErrorMessage} from "../showErrorMessage";

function LoginTemplate({props}) {
    const [currentInfo, setCurrentInfo] = React.useState({u_nickname: "", u_pwd: "", role: ""});
    const [isLoading, setIsLoading] = React.useState(false);
    const [login, setLogin] = useRecoilState(loginState);

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

    const setAsyncStorage = async (key, value) => {
        await AsyncStorage.setItem(key, value)
    }

    const goSomePage = async () => {
        //로그인 api 요청
        setIsLoading(true)
        if(currentInfo.role === ""){
            setIsLoading(false)
            Alert.alert(
                "권한을 선택해주세요",
                "",
                [
                    {
                        text: "확인",
                    }
                ]
            );
        }
        else if (currentInfo.u_nickname === "" || currentInfo.u_pwd === "") {
            setIsLoading(false)
            Alert.alert(
                "아이디 또는 비밀번호를 입력하세요",
                "",
                [
                    {
                        text: "확인",
                    }
                ]
            );
        } else {
            await axios.post(`http://3.35.135.214:8080/app/login`, currentInfo, {withCredentials: true})
                .then((res) => {
                    console.log(res.data)
                    if (res.data.u_auth === "AGENT") {
                        setAsyncStorage("@u_auth", "AGENT")
                        setAsyncStorage("@token", res.data.token);
                        setAsyncStorage("@refresh_token", res.data.refreshToken)
                        setIsLoading(false);
                        setLogin("AGENT")
                    } else if (res.data.u_auth === "OFFICIAL") {
                        setAsyncStorage("@u_auth", "OFFICIAL")
                        setAsyncStorage("@token", res.data.token);
                        setAsyncStorage("@refresh_token", res.data.refreshToken)
                        setIsLoading(false);
                        setLogin("OFFICIAL")
                    }
                }).catch((err) => {
                    setIsLoading(false);
                    showErrorMessage(err.response.data.message, setLogin, props)
                })
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
                <View style={{flex: 2.5, alignItems: "center", justifyContent: "center"}}>
                    <LoginInputForm onPress={goSomePage} handleChange={handleChange} currentInfo={currentInfo}
                                    isLoading={isLoading}/>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={goAuthSelectTemp}>
                        <Text style={{color: "gray"}}>회원가입 하러가기</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
}

export default LoginTemplate;

