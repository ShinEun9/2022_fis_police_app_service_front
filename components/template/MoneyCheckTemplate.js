import React from 'react';
import {SafeAreaView, ScrollView, View} from "react-native";
import CustomNavigation from "../CustomNavigation";
import CustomCalendar from "../atom/CustomCalendar";

function MoneyCheckTemplate(props) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{backgroundColor: "pink"}}>
                <CustomNavigation navigation={props.navigation} type="noGearTitleNavbar" title="급여 확인하러 가기"/>
            </View>
            <ScrollView contentContainerStyle={{flex: 9, backgroundColor: "orange", marginBottom: 10}}>
                <CustomCalendar/>
            </ScrollView>
        </SafeAreaView>);
}

export default MoneyCheckTemplate;