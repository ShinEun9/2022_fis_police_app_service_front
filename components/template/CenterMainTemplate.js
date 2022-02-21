import React from 'react';
import {Text, SafeAreaView} from "react-native";
import CustomLeftImageButton from "../atom/CustomLeftImageButton";

function CenterMainTemplate(props) {
    const goSomePageA=()=>{
        props.navigation.navigate("ApplyCenterTemplate")
    }
    const goSomePageB=()=>{
        props.navigation.navigate("CheckReservationTemplate")
    }


    return (
        <SafeAreaView>
            <CustomLeftImageButton onPress={goSomePageA} content="a" />
            <CustomLeftImageButton onPress={goSomePageB} content="b" />
            <CustomLeftImageButton onPress={goSomePageB} content="c" />
            <CustomLeftImageButton onPress={goSomePageB} content="d" />

        </SafeAreaView>
    );
}

export default CenterMainTemplate;