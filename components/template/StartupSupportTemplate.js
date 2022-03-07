import React from 'react';
import {SafeAreaView, Text, View} from "react-native";
import CustomNavigation from "../organisms/CustomNavigation";

function StartupSupportTemplate(props) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <CustomNavigation navigation={props.navigation} type="titleNavbar" title="창업 지원 서비스"/>
            </View>
            <View style={{flex: 9, backgroundColor: "pink"}}>

            </View>
        </SafeAreaView>
    );
}

export default StartupSupportTemplate;