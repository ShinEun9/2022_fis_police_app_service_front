import React from 'react';
import {Text, View, SafeAreaView, Platform} from "react-native";
import CustomRightImageButton from "../atom/CustomRightImageButton";
import CustomNavigation from "../organisms/CustomNavigation";

function AuthSelectTemplate(props) {
    const goSomePage = () => {
        props.navigation.navigate('SearchCenterTemplate', props)
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{paddingTop: Platform.OS === 'ios' ? 0 : 30, flex: 1}}>

                <CustomNavigation props={props} type="joinSettingNavbar" title="회원가입"/>
            </View>
            <View style={{flex: 9, justifyContent: "center", alignItems: "center"}}>
                <View style={{marginBottom: 20}}>
                    <CustomRightImageButton onPress={goSomePage} name={"right"} size={20} content={<Text style={{fontSize: 24}}>시설</Text>} color="black"/>
                </View>
                <View style={{marginBottom: 20}}>
                    <CustomRightImageButton onPress={goSomePage} name={"right"} size={20} content={<Text style={{fontSize: 24}}>학부모</Text>} color="black"/>
                </View>
                <View style={{marginBottom: 20}}>
                    <CustomRightImageButton onPress={goSomePage} name={"right"} size={20} content={<Text style={{fontSize: 24}}>일반</Text>} color="black"/>
                </View>
            </View>


        </SafeAreaView>);
}

export default AuthSelectTemplate;