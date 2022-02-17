import React from 'react';
import {Button, useWindowDimensions, View} from 'react-native'
import CustomInput from "../atom/CustomInput";
import CustomButton from "../atom/CustomButton";
function LoginInputForm(props) {
    return (
        <View style={{backgroundColor: "pink", flex:1}}>
            <CustomInput width={`${useWindowDimensions().width*0.7}`} height="50" placeholder="아이디"/>
            <CustomInput width="300" height="50" placeholder="비밀번호" password={true}/>
            <CustomButton  backgroundColor={"#111"} onPress={props.onPress} content="로그인" />
        </View>
    );
}

export default LoginInputForm;