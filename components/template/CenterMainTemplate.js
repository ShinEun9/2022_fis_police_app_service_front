import React from 'react';
import {SafeAreaView, View, useWindowDimensions, Platform} from "react-native";
import CustomLeftImageButton from "../atom/CustomLeftImageButton";
import CustomNavigation from "../organisms/CustomNavigation";
import {Style} from "../../Style";

function CenterMainTemplate({props}) {
    const goApplyCenterTemplate = () => {
        props.navigation.navigate("ApplyCenterTemplate")
    }
    const goCheckReservationTemplate = () => {
        props.navigation.navigate("CheckReservationTemplate")
    }
    const goStartupSupportTemplate = () => {
        props.navigation.navigate("StartupSupportTemplate")
    }
    const goOffenderAlertTemplate = () => {
        props.navigation.navigate("OffenderAlertTemplate")
    }


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{paddingTop: Platform.OS === 'ios' ? 0 : 30, flex: 0.5}}>
                <CustomNavigation props={props} type="centerMain"  />
            </View>

            <View style={{flex: 4, justifyContent: "center", alignItems: "center" }}>
                <View style={{width: useWindowDimensions().width * 0.95, height: "80%", backgroundColor: Style.color3}}></View>
            </View>
            <View style={{flex: 5, alignItems: "center", justifyContent: "center"}}>
                <CustomLeftImageButton onPress={goApplyCenterTemplate} content="지문 등록 신청하러 가기" name="pencil-square-o" size={30} color={"black"}/>
                <CustomLeftImageButton onPress={goCheckReservationTemplate} content="내 예약 확인하러 가기" name="list-alt" size={30} color={"black"}/>
                <CustomLeftImageButton onPress={goStartupSupportTemplate} content="창업 지원 서비스" name="lightbulb-o" size={30} color={"black"}/>
                <CustomLeftImageButton onPress={goOffenderAlertTemplate} content="성범죄자 알리미" name="id-badge" size={30} color={"black"}/>
            </View>

        </SafeAreaView>
    );
}

export default CenterMainTemplate;