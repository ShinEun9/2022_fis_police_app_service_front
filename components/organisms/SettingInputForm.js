import React, {useEffect, useState} from 'react';
import CustomInput from "../atom/CustomInput";
import PasswordInput from "../atom/PasswordInput";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";
import {Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SettingInputForm({props, centerInfo}) {
    const [currentInfo, setCurrentInfo] = useState({})

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
        await axios.get(`http://localhost:8080/app/official/setting`,
            {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res)
                const {center_id, center_name, o_name, o_ph, o_email, o_nickname, o_pwd,} = res.data
                setCurrentInfo({center_id, center_name, o_name, o_ph, o_email, o_nickname, o_pwd});
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const editRequest = async (token) => {
        let c;
        if (centerInfo != null) {
            console.log("hi")
            c=centerInfo.center_id
        }else{
            c=currentInfo.center_id
        }
        console.log(c)

        await axios.patch(`http://localhost:8080/app/officials`, {...currentInfo, center_id: c}, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res)
                props.navigation.goBack();
            }).catch((err) => {
                console.log(err);
            })
    }

    const onPress = () => {
        getToken().then((token) => {
            editRequest(token)
        })
        // props.navigation.goBack();
    }


    // 처음 데이터 불러옴.
    useEffect(() => {
        getToken().then((token) => {
            getData(token)
        })
    }, [])

    return (
        <>
            <CustomInput type="line" id="o_name" width={useWindowDimensions().width * 0.6} height="50" placeholder="이름"
                         handleChange={handleChange} currentInfo={currentInfo}/>
            <CustomInput type="line" id="o_ph" width={useWindowDimensions().width * 0.6} height="50"
                         placeholder="전화번호"
                         keyboardType="phone-pad" handleChange={handleChange}
                         currentInfo={currentInfo}/>
            <CustomInput type="line" id="o_email" width={useWindowDimensions().width * 0.6} height="50"
                         placeholder="이메일"
                         keyboardType="email-address"
                         handleChange={handleChange}
                         currentInfo={currentInfo}/>
            <CustomInput type="line" id="o_nickname" width={useWindowDimensions().width * 0.6} height="50"
                         placeholder="아이디" handleChange={handleChange}
                         currentInfo={currentInfo}/>
            <PasswordInput type="line" id="o_pwd" width={useWindowDimensions().width * 0.6} height="50"
                           placeholder="비밀번호"
                           handleChange={handleChange}
                           currentInfo={currentInfo}/>

            <TouchableOpacity onPress={() => {
                props.navigation.navigate('SearchCenterTemplate', "setting")
            }}>
                <View style={{
                    width: useWindowDimensions().width * 0.6,
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


            <View style={{marginTop: 30}}>
                <CustomButton onPress={onPress} content={"정보 수정"} width="100" height="50" backgroundColor={Style.color2}/>
            </View>
        </>

    )
        ;
}

export default SettingInputForm;