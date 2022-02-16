import React from "react";
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import CustomInput from "./components/atom/CustomInput";
import CustomButton from "./components/atom/CustomButton";
import Select from "./components/atom/Select";
import DatePicker from "./components/atom/DatePicker";
import Timepicker from "./components/atom/Timepicker";

export default function App() {


    return (

        <View style={styles.container}>
            <StatusBar style="auto"/>
            <CustomInput width="300" height="400" />
            <Select />
            <DatePicker />
            <Timepicker />
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
