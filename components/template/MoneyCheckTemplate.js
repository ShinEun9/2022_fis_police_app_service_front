import React from 'react';
import {SafeAreaView, ScrollView, View} from "react-native";
import CustomNavigation from "../CustomNavigation";

function MoneyCheckTemplate(props) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{backgroundColor: "pink"}}>
                <CustomNavigation navigation={props.navigation} type="titleNavbar" title="급여 확인하러 가기"/>
            </View>
            <ScrollView contentContainerStyle={{flex: 9, backgroundColor: "orange", marginBottom: 10}}>
            </ScrollView>
        </SafeAreaView>    );
}

export default MoneyCheckTemplate;