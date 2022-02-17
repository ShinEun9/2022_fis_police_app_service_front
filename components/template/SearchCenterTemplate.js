import React from 'react';
import {View, SafeAreaView} from "react-native";
import Select from "../atom/Select";
import CustomInput3 from "../atom/CustomInput3";
import CustomInput from "../atom/CustomInput";
import CustomRightImageButton from "../atom/CustomRightImageButton";

function SearchCenterTemplate(props) {
    const submitFunction = ()=>{
        // 시설 search api 요청
        console.log("hi")
    }
    const goSomePage = ()=>{
        props.navigation.navigate('JoinInfoTemplate', props)
    }

    return (
        <SafeAreaView>
            <View>

            </View>
            {/*<CustomInput3 onSubmitFunction={submitFunction}/>*/}

            {/*<CustomRightImageButton onPress={goSomePage} name={"right"} size={20} content="시설" color="black"/>*/}
        </SafeAreaView>
    );
}

export default SearchCenterTemplate;