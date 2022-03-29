import React from 'react';
import {Platform, SafeAreaView, View} from "react-native";
import CustomNavigation from "../organisms/CustomNavigation";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";

function OffenderAlertTemplate(props) {
    const [login, setLogin] = useRecoilState(loginState);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{paddingTop: Platform.OS === 'ios' ? 0 : 30, flex: 0.5, zIndex: 1}}>

                <CustomNavigation props={props} type="CenterTitleNavbar" title="성범죄자 알리미"/>
            </View>
            <View style={{flex: 9, zIndex: 0}}>

            </View>
        </SafeAreaView>
    );
}

export default OffenderAlertTemplate;