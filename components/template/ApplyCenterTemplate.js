import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, StyleSheet} from "react-native";
import ApplyInputForm from "../organisms/ApplyInputForm";
import CustomNavigation from "../CustomNavigation";

function ApplyCenterTemplate(props) {
    const [currentInfo, setCurrentInfo] = useState({
        c_name: "",
        c_address: "",
        c_email: "",
        c_participation: "",
        c_date: null,
    })
    const handleChange = (name, value) => {
        setCurrentInfo({
            ...currentInfo,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(currentInfo)
    }, [currentInfo])

    const sendApplication = () => {
        console.log("send")
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1}}>
                <CustomNavigation navigation={props.navigation} type="titleNavbar" title="지문 등록 신청하러 가기"/>
            </View>
            <View style={styles.Guide}>
                <Text>가이드가이드가이드</Text>
            </View>
            <View style={styles.InputForm}>
                <ApplyInputForm onPress={sendApplication} handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
        </SafeAreaView>
    );
}

export default ApplyCenterTemplate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Guide: {
        flex: 3,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    InputForm: {
        flex: 6.7,

    }
})