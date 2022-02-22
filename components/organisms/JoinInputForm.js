import React, {useEffect, useState} from 'react';
import CustomInput from "../atom/CustomInput";
import PasswordInput from "../atom/PasswordInput";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";
import {useWindowDimensions, View} from "react-native";

function JoinInputForm({props}) {
    const [currentInfo, setCurrentInfo] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        user_id: "",
        user_password: "",
        c_name: ""
    })
    const onPress = () => {
        // 날짜 : 2022/02/18 11:15 AM
        // 작성자 : 신은수
        // 작성내용 :
        //          api요청
        //          joinInputForm에서 하는 게 맞는 걸까
        //          다른 곳에서처럼 template에서 하는 게 맞는 걸까
        //          joinInputForm에서 하면 장점 - jointInputTemplate에서 props(onPress, handleChange, currentInfo 안 받아와도 됨)
        //          joinInputForm에서 하면 단점 - 통일성 부족(다른 곳은 다 template에서 하잖아,,,,?)
        //                                  - navigate는...? :해결할 수 있긴 함


        // 어쨌든 일단은 joinInputForm에서 api 요청 보내도록 함.
        // api 회원 가입 요청
        if (props.route.params === "setting") {
            console.log("hi")
            props.navigation.goBack();

        } else {
            props.navigation.navigate("LoginTemplate")
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


    useEffect(() => {
        console.log(currentInfo)
    }, [currentInfo])


    return (
        <>
            <CustomInput type="line" id="name" width={useWindowDimensions().width * 0.6} height="50" placeholder="이름"
                         handleChange={handleChange} currentInfo={currentInfo}/>
            <CustomInput type="line" id="phoneNumber" width={useWindowDimensions().width * 0.6} height="50"
                         placeholder="전화번호"
                         keyboardType="phone-pad" handleChange={handleChange}
                         currentInfo={currentInfo}/>
            <CustomInput type="line" id="email" width={useWindowDimensions().width * 0.6} height="50" placeholder="이메일"
                         keyboardType="email-address"
                         handleChange={handleChange}
                         currentInfo={currentInfo}/>
            <CustomInput type="line" id="user_id" width={useWindowDimensions().width * 0.6} height="50"
                         placeholder="아이디" handleChange={handleChange}
                         currentInfo={currentInfo}/>
            <PasswordInput type="line" id="user_password" width={useWindowDimensions().width * 0.6} height="50"
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