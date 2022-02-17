import React from 'react';
import {Text, SafeAreaView} from "react-native";
import CustomInput from "../atom/CustomInput";
import CustomButton from "../atom/CustomButton";

function JoinInfoTemplate(props) {
    const goSomePage = ()=>{
        props.navigation.navigate('CenterPage')
    }

    return (
        <SafeAreaView>
            <CustomButton width = "300" height ="300" backgroundColor="black" content="회원가입" onPress={goSomePage} />
        </SafeAreaView>
    );
}

export default JoinInfoTemplate;