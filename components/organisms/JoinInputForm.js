import React from 'react';
import CustomInput from "../atom/CustomInput";
import PasswordInput from "../atom/PasswordInput";
import CustomButton from "../atom/CustomButton";

function JoinInputForm(props) {
    const onPress=()=>{
        console.log("hi")
    }
    return (
        <>
            <CustomInput width="200" height="50" placeholder="이름"/>
            <CustomInput width="200" height="50" placeholder="전화번호"/>
            <CustomInput width="200" height="50" placeholder="이메일"/>
            <CustomInput width="200" height="50" placeholder="아이디"/>
            <CustomInput width="200" height="50" placeholder="비밀번호"/>
            <PasswordInput />

            <CustomButton onPress={onPress} content="회원가입" backgroundColor="pink"/>
        </>

)
    ;
}

export default JoinInputForm;