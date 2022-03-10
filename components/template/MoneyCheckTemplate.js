import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from "react-native";
import CustomNavigation from "../organisms/CustomNavigation";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";

function MoneyCheckTemplate(props) {
    const [login, setLogin] = useRecoilState(loginState);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{backgroundColor: "pink"}}>
                <CustomNavigation navigation={props.navigation} type="AgentTitleNavbar" title="급여 확인하러 가기"/>
            </View>
            <View style={{flex: 9, backgroundColor: "orange", marginBottom: 10}}>
                <Text>

                </Text>
            </View>
        </SafeAreaView>);
}

export default MoneyCheckTemplate;