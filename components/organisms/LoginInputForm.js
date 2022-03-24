import React from 'react';
import {ActivityIndicator, Button, useWindowDimensions, View} from 'react-native'
import CustomInput from "../atom/CustomInput";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";
import PasswordInput from "../atom/PasswordInput";
import Select from "../atom/Select";


function LoginInputForm({handleChange, currentInfo, onPress, isLoading}) {
    return (
        <>
            <View style={{marginBottom: 30,}}>
                <View style={{margin: 12, }}>
                    <Select label="권한 선택" id="role" width={useWindowDimensions().width * 0.7}
                            items={[{label: '현장요원', value: 'AGENT'}, {
                                label: '시설관리자',
                                value: 'OFFICIAL'
                            }]}
                            handleChange={handleChange} currentInfo={currentInfo}/>
                </View>


                    <CustomInput type="line" id="u_nickname" width={`${useWindowDimensions().width * 0.7}`} height="50"
                                 placeholder="아이디" handleChange={handleChange} currentInfo={currentInfo}/>

                    <PasswordInput type="line" id="u_pwd" width={`${useWindowDimensions().width * 0.7}`} height="50"
                                   placeholder="비밀번호" handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <CustomButton width={`${useWindowDimensions().width * 0.6}`} height="55" backgroundColor={Style.color2}
                          onPress={onPress} content={isLoading ? <ActivityIndicator color="gray"/> : "로그인"}/>
        </>
    );
}

export default LoginInputForm;