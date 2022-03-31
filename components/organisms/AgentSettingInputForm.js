import React, {useEffect, useState} from 'react';
import CustomInput from "../atom/CustomInput";
import {ActivityIndicator, Dimensions, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";
import CustomImageButton from "../atom/CustomImageButton";
import {showErrorMessage} from "../showErrorMessage";

function AgentSettingInputForm({onPressLogout, props}) {
    const [currentInfo, setCurrentInfo] = useState({})
    const [isLoading, setIsLoading] = useState({getDataLoading: true, editButtonLoading: false})
    const [login, setLogin] = useRecoilState(loginState);

    const handleChange = (name, value) => {
        setCurrentInfo({
            ...currentInfo,
            [name]: value
        })
    }

    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token")
        return t
    }

    const getData = async (token) => {
        await axios.get(`http://3.35.135.214:8080/app/agent/setting`,
            {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                setIsLoading({...isLoading, getDataLoading: false})
                const {a_name, a_nickname, a_pwd, a_ph} = res.data
                setCurrentInfo({a_name, a_nickname, a_pwd, a_ph});
            })
            .catch((err) => {
                setIsLoading({...isLoading, getDataLoading: false})
                console.log(err)
                showErrorMessage(err.response.data.message,setLogin,props, getData)
            })
    }



    // 처음 데이터 불러옴.
    useEffect(() => {
        getToken().then((token) => {
            getData(token)
        })
    }, [])

    return (
        isLoading.getDataLoading ? <ActivityIndicator color="gray"/> :
            <>
                <CustomInput type="line" id="a_name" width={Dimensions.get('window').width * 0.6} height="50"
                             placeholder="이름"
                             handleChange={handleChange} currentInfo={currentInfo}/>
                <CustomInput type="line" id="a_nickname" width={Dimensions.get('window').width * 0.6} height="50"
                             placeholder="전화번호"
                             keyboardType="phone-pad" handleChange={handleChange}
                             currentInfo={currentInfo}/>
                <CustomInput type="line" id="a_pwd" width={Dimensions.get('window').width * 0.6} height="50"
                             placeholder="이메일"
                             keyboardType="email-address"
                             handleChange={handleChange}
                             currentInfo={currentInfo}/>
                <CustomInput type="line" id="a_ph" width={Dimensions.get('window').width * 0.6} height="50"
                             placeholder="아이디" handleChange={handleChange}
                             currentInfo={currentInfo}/>
                <View style={{marginTop: 20}}>
                    <TouchableOpacity onPress={onPressLogout} style={{flexDirection: "row", alignItems: "center"}}>
                        <CustomImageButton name="sign-out" color={"gray"} size={20}/>
                        <Text style={{color: "gray", fontSize: 15}}>로그아웃 하기</Text>
                    </TouchableOpacity>
                </View>
            </>


    )
        ;
}

export default AgentSettingInputForm;