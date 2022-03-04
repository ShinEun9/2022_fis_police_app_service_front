import React, {useEffect} from 'react';
import {SafeAreaView, View, Button, useWindowDimensions} from "react-native";
import LoginInputForm from '../organisms/LoginInputForm'
import logo from '../media/logo.png'
import {Image} from "react-native";
import axios from "axios";
import {StackActions} from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginTemplate({props, setLogin}) {
    const [currentInfo, setCurrentInfo] = React.useState({u_nickname: "", u_pwd: ""});

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

    const setAsyncStorage = async(key, value)=>{
        await AsyncStorage.setItem(key, value)
    }

    const goSomePage = async () => {
        //로그인 api 요청
        console.log("hi")

        await axios.post(`http://localhost:8080/app/login`, {...currentInfo, role: "OFFICIAL"}, {withCredentials: true})

            .then((res) => {
                console.log("hi1")
                console.log(res.data)
                if (res.data.u_auth === "AGENT") {
                    setAsyncStorage("@u_auth","AGENT")
                    setAsyncStorage("@token",res.data.token);
                    setLogin("AGENT")
                }else if(res.data.u_auth === "OFFICIAL"){
                    setAsyncStorage("@u_auth","OFFICIAL")
                    setAsyncStorage("@token",res.data.token);
                    setLogin("OFFICIAL")
                }
            }).catch((err) => {
                console.log(err)
            })
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
            <View style={{flex: 2, alignItems: "center", justifyContent: "center"}}>
                <LoginInputForm onPress={goSomePage} handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={{flex: 1}}>
                <Button onPress={goAuthSelectTemp} title='회원가입 하러가기'/>
            </View>
        </SafeAreaView>
    );
}

export default LoginTemplate;

