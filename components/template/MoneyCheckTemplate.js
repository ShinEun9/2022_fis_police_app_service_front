import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from "react-native";
import CustomNavigation from "../CustomNavigation";
import EmptyPage from "../EmptyPage";

function MoneyCheckTemplate(props) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{backgroundColor: "pink"}}>
                <CustomNavigation navigation={props.navigation} type="noGearTitleNavbar" title="급여 확인하러 가기"/>
            </View>
            <View style={{flex: 9, backgroundColor: "orange", marginBottom: 10}}>
                <Text>
                    <EmptyPage />
                </Text>
            </View>
        </SafeAreaView>);
}

export default MoneyCheckTemplate;