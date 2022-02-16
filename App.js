import React from "react";
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import CustomInput from "./components/atom/CustomInput";
import CustomButton from "./components/atom/CustomButton";
import CustomLeftImageButton from "./components/atom/CustomLeftImageButton";
import CustomRightImageButton from "./components/atom/CustomRightImageButton";
import CustomImageButton from "./components/atom/CustomImageButton";

export default function App() {


    return (

        <View style={styles.container}>
            <StatusBar style="auto"/>
            <CustomInput width="300" height="400" />
            {/*<CustomButton width="300" height="300" backgroundColor={"#000"} content={"hi"} />*/}
            {/*<CustomLeftImageButton content={"지문등록 하러가기"} name={"solution1"} size={24} color={"black"} onPress={()=>{console.log("pressed")}}/>*/}
            {/*<CustomRightImageButton content={"시설"} name={"caretright"} size={24} color={"gray"} onPress={()=>{console.log("pressed")}}/>*/}
            {/*<CustomImageButton name={"calendar"} size={24} color={"black"} onPress={()=>{console.log("pressed")}}/>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
