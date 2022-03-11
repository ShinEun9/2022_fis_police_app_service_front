import React from 'react';
import {SafeAreaView, View} from "react-native";
import JoinInputForm from "../organisms/JoinInputForm";
import CustomNavigation from "../organisms/CustomNavigation";

function JoinInfoTemplate(props) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <CustomNavigation navigation={props.navigation} type="joinSettingNavbar" title={props.route.params==="setting"?"설정페이지":"회원가입"}/>
            </View>
            <View style={{flex: 10, justifyContent: "center", alignItems: 'center'}}>
                <JoinInputForm props={props} center_id={props.route.params}/>
            </View>
        </SafeAreaView>
    );
}

export default JoinInfoTemplate;