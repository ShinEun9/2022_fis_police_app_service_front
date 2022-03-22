import React from 'react';
import {Platform, SafeAreaView, ScrollView, Text, View} from "react-native";
import CustomNavigation from "../organisms/CustomNavigation";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";

function MoneyCheckTemplate(props) {
    const [login, setLogin] = useRecoilState(loginState);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{paddingTop: Platform.OS === 'ios' ? 0 : 30, flex: 1, zIndex: 1}}>

                <CustomNavigation props={props} type="AgentTitleNavbar" title="급여 확인하러 가기"/>
            </View>
            <View style={{flex: 9, marginBottom: 10, zIndex: 0}}>
                <Text>

                </Text>
            </View>
        </SafeAreaView>);
}

export default MoneyCheckTemplate;