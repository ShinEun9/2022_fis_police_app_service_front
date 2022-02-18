import React from 'react';
import {SafeAreaView, View} from "react-native";
import JoinInputForm from "../organisms/JoinInputForm";

function JoinInfoTemplate(props) {
    const goSomePage = () => {
        props.navigation.navigate('CenterPage')
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
                <JoinInputForm props={props}/>
            </View>
        </SafeAreaView>
    );
}

export default JoinInfoTemplate;