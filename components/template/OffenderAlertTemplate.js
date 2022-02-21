import React from 'react';
import {SafeAreaView, Text, View} from "react-native";
import CustomNavigation from "../CustomNavigation";

function OffenderAlertTemplate(props) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <CustomNavigation navigation={props.navigation} type="titleNavbar" title="성범죄자 알리미"/>
            </View>
            <View style={{flex: 9, backgroundColor: "pink"}}>

            </View>
        </SafeAreaView>
    );
}

export default OffenderAlertTemplate;