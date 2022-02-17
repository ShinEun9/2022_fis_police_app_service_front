import React from "react";
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import CustomInput from "./components/atom/CustomInput";
import CustomButton from "./components/atom/CustomButton";
import CustomLeftImageButton from "./components/atom/CustomLeftImageButton";
import CustomRightImageButton from "./components/atom/CustomRightImageButton";
import CustomImageButton from "./components/atom/CustomImageButton";
import CustomMap from "./components/molecule/CustomMap";

export default function App() {


    return (
        <View style={styles.container}>
            <CustomMap/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
