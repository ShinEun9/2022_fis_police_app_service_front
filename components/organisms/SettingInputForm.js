import React, {useEffect, useState} from 'react';
import CustomInput from "../atom/CustomInput";
import PasswordInput from "../atom/PasswordInput";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";
import {ActivityIndicator, Alert, Dimensions, Text, TouchableOpacity, View} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";
import CustomImageButton from "../atom/CustomImageButton";
import {showErrorMessage} from "../showErrorMessage";

function SettingInputForm({props, centerInfo, onPressLogout}) {
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
        await axios.get(`http://3.35.135.214:8080/app/official/setting`,
            {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                setIsLoading({...isLoading, getDataLoading: false})
                const {center_id, center_name, o_name, o_ph, o_email, o_nickname, o_pwd,} = res.data
                setCurrentInfo({center_id, center_name, o_name, o_ph, o_email, o_nickname, o_pwd});
            })
            .catch((err) => {
                setIsLoading({...isLoading, getDataLoading: false})
                showErrorMessage(err.response.data.message, setLogin, props,getData)

            })
    }

    const editRequest = async (token) => {
        let c;
        if (centerInfo != null) {
            // center를 변경 했을 때, SearchCenterTemplate에서 SettingTemplate으로 navigation params로 center_id를 넘겨줌
            c = centerInfo.center_id
        } else {
            // center를 변경하지 않았을 때
            c = currentInfo.center_id
        }

        setIsLoading({...isLoading, editButtonLoading: true})
        await axios.patch(`http://3.35.135.214:8080/app/officials`, {
            ...currentInfo,
            center_id: c
        }, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                setIsLoading({...isLoading, editButtonLoading: false})
                Alert.alert("정보수정에 성공하였습니다","수정된 정보를 확인해보세요", [{text:"확인"}])
            }).catch((err) => {
                setIsLoading({...isLoading, editButtonLoading: false})
                showErrorMessage(err.response.data.message,setLogin,props, editRequest);

            })
    }

    const onPress = () => {
        getToken().then((token) => {
            editRequest(token)
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
                <CustomInput type="line" id="o_name" width={Dimensions.get('window').width * 0.6} height="50"
                             placeholder="이름"
                             handleChange={handleChange} currentInfo={currentInfo}/>
                <CustomInput type="line" id="o_ph" width={Dimensions.get('window').width * 0.6} height="50"
                             placeholder="전화번호"
                             keyboardType="phone-pad" handleChange={handleChange}
                             currentInfo={currentInfo}/>
                <CustomInput type="line" id="o_email" width={Dimensions.get('window').width * 0.6} height="50"
                             placeholder="이메일"
                             keyboardType="email-address"
                             handleChange={handleChange}
                             currentInfo={currentInfo}/>
                <CustomInput type="line" id="o_nickname" width={Dimensions.get('window').width * 0.6} height="50"
                             placeholder="아이디" handleChange={handleChange}
                             currentInfo={currentInfo}/>
                <PasswordInput type="line" id="o_pwd" width={Dimensions.get('window').width * 0.6} height="50"
                               placeholder="비밀번호"
                               handleChange={handleChange}
                               currentInfo={currentInfo}/>

                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('SearchCenterTemplate', "setting")
                }}>
                    <View style={{
                        width: Dimensions.get('window').width * 0.6,
                        height: 50,
                        borderWidth: 2,
                        borderColor: "transparent",
                        borderBottomColor: Style.color5,
                        padding: 10,
                        justifyContent: "flex-end"
                    }}>
                        <Text>{centerInfo != null ? centerInfo.c_name : currentInfo.center_name}</Text>
                    </View>
                </TouchableOpacity>


                <View style={{marginTop: 30, marginBottom: 30}}>
                    <CustomButton onPress={onPress}
                                  content={isLoading.editButtonLoading ? <ActivityIndicator color="gray"/> : "정보수정"} width="100"
                                  height="50" backgroundColor={Style.color2}/>
                </View>
                <TouchableOpacity onPress={onPressLogout} style={{flexDirection:"row", alignItems:"center"}}>
                    <CustomImageButton name="sign-out" color={"gray"} size={20}/>
                    <Text style={{color: "gray", fontSize: 15}}>로그아웃 하기</Text>
                </TouchableOpacity>
            </>


    )
        ;
}

export default SettingInputForm;