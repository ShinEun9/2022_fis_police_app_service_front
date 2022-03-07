import React from 'react';
import {ActivityIndicator, Button, useWindowDimensions, View} from 'react-native'
import CustomInput from "../atom/CustomInput";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";
import PasswordInput from "../atom/PasswordInput";

function LoginInputForm({handleChange, currentInfo, onPress, isLoading}) {
    return (
        <>
            <View style={{marginBottom: 30}}>
                <CustomInput type="line" id="u_nickname" width={`${useWindowDimensions().width * 0.7}`} height="50"
                             placeholder="아이디" handleChange={handleChange} currentInfo={currentInfo}/>

                <PasswordInput type="line" id="u_pwd" width={`${useWindowDimensions().width * 0.7}`} height="50"
                               placeholder="비밀번호" handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <CustomButton width={`${useWindowDimensions().width * 0.6}`} height="55" backgroundColor={Style.color2}
                          onPress={onPress} content={isLoading ? <ActivityIndicator /> : "로그인"}/>
        </>
    );
}

export default LoginInputForm;