import React from 'react';
import {SafeAreaView, View} from "react-native";
import JoinInputForm from "../organisms/JoinInputForm";
import CustomNavigation from "../CustomNavigation";

function JoinInfoTemplate(props) {
    const goSomePage = () => {
        props.navigation.navigate('CenterPage')
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <CustomNavigation navigation={props.navigation} type="join" title="회원가입"/>
            </View>
            <View style={{flex: 10, justifyContent: "center", alignItems: 'center'}}>
                <JoinInputForm props={props}/>
            </View>
        </SafeAreaView>
    );
}

export default JoinInfoTemplate;