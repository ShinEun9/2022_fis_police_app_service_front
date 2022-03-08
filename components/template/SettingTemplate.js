import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, View} from "react-native";
import CustomNavigation from "../organisms/CustomNavigation";
import JoinInputForm from "../organisms/JoinInputForm";
import SettingInputForm from "../organisms/SettingInputForm";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";

function SettingTemplate(props) {
    const [login, setLogin] = useRecoilState(loginState);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <CustomNavigation navigation={props.navigation} type="noGearTitleNavbar" title={"설정페이지"}/>
            </View>
            <View style={{flex: 10, justifyContent: "center", alignItems: 'center'}}>
                <SettingInputForm props={props} centerInfo={props.route.params}/>


            </View>
        </SafeAreaView>
    );
}

export default SettingTemplate;

