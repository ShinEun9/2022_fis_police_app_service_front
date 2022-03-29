import React, {useEffect, useState} from 'react';
import {Alert, Platform, SafeAreaView,View} from "react-native";
import CustomNavigation from "../organisms/CustomNavigation";
import SettingInputForm from "../organisms/SettingInputForm";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SettingTemplate(props) {
    const [login, setLogin] = useRecoilState(loginState);

    const onPressLogout = async () => {
        Alert.alert(
            "정말 로그아웃 하시겠습니까?",
            "",
            [
                {
                    text: "취소",
                    style: "cancel"
                },
                {
                    text: "확인", onPress: async () => {
                        await AsyncStorage.removeItem("@u_auth")
                        await AsyncStorage.removeItem("@token")
                        await AsyncStorage.removeItem("@refresh_token")
                        setLogin(null);
                        props.navigation.popToTop()
                    }
                }
            ]
        );
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{paddingTop: Platform.OS === 'ios' ? 0 : 30, flex: 1}}>
                <CustomNavigation props={props} type="joinSettingNavbar" title={"설정페이지"}/>
            </View>
            <View style={{flex: 10, justifyContent: "center", alignItems: 'center'}}>
                <SettingInputForm props={props} centerInfo={props.route.params} onPressLogout={onPressLogout}/>


            </View>
        </SafeAreaView>
    );
}

export default SettingTemplate;

