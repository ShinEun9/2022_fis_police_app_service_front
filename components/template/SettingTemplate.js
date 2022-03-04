import React from 'react';
import {SafeAreaView, View} from "react-native";
import CustomNavigation from "../CustomNavigation";
import JoinInputForm from "../organisms/JoinInputForm";
import SettingInputForm from "../organisms/SettingInputForm";

function SettingTemplate(props) {
    console.log(props.route.params)
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <CustomNavigation navigation={props.navigation} type="noGearTitleNavbar" title={"설정페이지"} />
            </View>
            <View style={{flex: 10, justifyContent: "center", alignItems: 'center'}}>
                <SettingInputForm props={props} centerInfo={props.route.params}/>
            </View>
        </SafeAreaView>
    );
}

export default SettingTemplate;