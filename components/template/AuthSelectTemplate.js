import React from 'react';
import {Text, View, SafeAreaView, useWindowDimensions} from "react-native";
import CustomRightImageButton from "../atom/CustomRightImageButton";
import CustomNavigation from "../organisms/CustomNavigation";

function AuthSelectTemplate(props) {
    const goSomePage = () => {
        props.navigation.navigate('SearchCenterTemplate', props)
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <CustomNavigation props={props} type="joinSettingNavbar" title="회원가입"/>
            </View>
          <View style={{flex: 9, justifyContent: "center", alignItems: "center"}}>
              <View style={{marginBottom: 20}}>
                  <CustomRightImageButton onPress={goSomePage} name={"right"} size={20} content="시설" color="black"/>
              </View>
              <View style={{marginBottom: 20}}>
                  <CustomRightImageButton onPress={goSomePage} name={"right"} size={20} content="학부모" color="black"/>
              </View>
              <View style={{marginBottom: 20}}>
                  <CustomRightImageButton onPress={goSomePage} name={"right"} size={20} content="일반" color="black"/>
              </View>
          </View>


        </SafeAreaView>);
}

export default AuthSelectTemplate;