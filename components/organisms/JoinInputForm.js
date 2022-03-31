import React, {useState} from 'react';
import CustomInput from "../atom/CustomInput";
import PasswordInput from "../atom/PasswordInput";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";
import {ActivityIndicator, Alert,useWindowDimensions, View} from "react-native";
import axios from "axios";
import {showErrorMessage} from "../showErrorMessage";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";

function JoinInputForm({props, center_id}) {
    const [currentInfo, setCurrentInfo] = useState({
        o_name: "",
        o_nickname: "",
        o_pwd: "",
        o_ph: "",
        o_email: "",
        center_id: center_id
    })
    const [isLoading, setIsLoading] = useState(false)
    const [login,setLogin]=useRecoilState(loginState);

    // 정보가 바뀔때마다 set해주는 함수
    const handleChange = (name, value) => {
        setCurrentInfo({
            ...currentInfo,
            [name]: value
        })
    }

    // 시설 회원가입 api 요청
    const onPress = async () => {
        setIsLoading(true)
        await axios.post(`http://3.35.135.214:8080/app/officials`, currentInfo, {withCredentials: true}).then((res) => {
            setIsLoading(false)
            Alert.alert(
                "회원가입되었습니다",
                "가입한 아이디, 비밀번호로 로그인하시길 바랍니다.",
                [
                    {
                        text: "확인",
                    }
                ]
            );
            props.navigation.navigate("MainPage")
        }).catch((err) => {
            setIsLoading(false)
            showErrorMessage(err.response.data.response, setLogin, props)
        })
    }



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

            <View style={{marginTop: 30}}>
                <CustomButton onPress={onPress} content={isLoading?<ActivityIndicator color="gray" />: "회원가입"}
                              width="100" height="50" backgroundColor={Style.color2}/>
            </View>
        </>

    )
        ;
}

export default JoinInputForm;