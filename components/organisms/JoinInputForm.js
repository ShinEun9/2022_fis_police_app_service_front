import React, {useEffect, useState} from 'react';
import CustomInput from "../atom/CustomInput";
import PasswordInput from "../atom/PasswordInput";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";
import {useWindowDimensions, View} from "react-native";
import axios from "axios";

function JoinInputForm({props, center_id}) {
    const [currentInfo, setCurrentInfo] = useState({
        o_name: "",
        o_nickname: "",
        o_pwd: "",
        o_ph: "",
        o_email: "",
        center_id: center_id
    })
    const onPress = async () => {
        console.log(currentInfo);
        await axios.post(`http://localhost:8080/app/officials`, currentInfo,{withCredentials: true}).
        then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err);
        })


        if (props.route.params === "setting") {
            console.log("hi")
            props.navigation.goBack();

        } else {
            props.navigation.navigate("MainPage")
        }
    }
    const handleChange = (name, value) => {
        setCurrentInfo({
            ...currentInfo,
            [name]: value
        })
    }

    useEffect(() => {
        if (props.route.params === "setting") {
            // 정보는 어디다가 저장하지...?
            // setCurrentInfo([]);
        }
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

            {props.route.params === "setting" ?
                <CustomInput type="line" id="c_name" width={useWindowDimensions().width * 0.6} height="50"
                             placeholder="센터 이름" handleChange={handleChange}
                             currentInfo={currentInfo}/> : null}

            <View style={{marginTop: 30}}>
                <CustomButton onPress={onPress} content={props.route.params === "setting" ? "정보 수정" : "회원가입"}
                              width="100" height="50" backgroundColor={Style.color2}/>
            </View>
        </>

    )
        ;
}

export default JoinInputForm;