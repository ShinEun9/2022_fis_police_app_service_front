import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, StyleSheet} from "react-native";
import ApplyInputForm from "../organisms/ApplyInputForm";
import CustomNavigation from "../organisms/CustomNavigation";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ApplyCenterTemplate(props) {
    const [currentInfo, setCurrentInfo] = useState({
        accept: "",
        h_date: null,
        h_mail: "",
        h_name: "",
        h_ph:"",
        h_address: ""
    })
    const handleChange = (name, value) => {
        setCurrentInfo({
            ...currentInfo,
            [name]: value
        })
    }
    const getCurrentInfo =async (token)=>{
        await axios.get(`http://localhost:8080/app/official/setting`,{headers: {Authorization: `Bearer ${token}`}})
            .then((res)=>{
                console.log(res.data)
                setCurrentInfo({
                    ...currentInfo,
                    h_name: res.data.center_name,
                    h_address: res.data.center_address,
                    h_ph: res.data.o_ph
                })
            }).catch((err)=>{
                console.log(err)
            })
    }

    const getToken = async() => {
        const t = await AsyncStorage.getItem("@token");
        return t;
    }
    useEffect(() => {
        getToken().then((token)=>{
            getCurrentInfo(token)
        })
    },[])
    const onPress=()=>{
        getToken().then((token)=>{
            sendApplication(token)
        })
    }

    const sendApplication = async (token) => {
        let buf=currentInfo.h_date
        let year=buf.getFullYear()
        let month=''+(buf.getMonth()+1)
        let day=''+buf.getDate()

        if(month.length<2){
            month='0'+month
        }
        if(day.length<2){
            day='0'+day
        }
        buf=[year,month,day].join('-')
        console.log(buf)
        console.log({...currentInfo,h_date:buf})
        await axios.post(`http://localhost:8080/app/hope`,{...currentInfo,h_date:buf},{headers: {Authorization: `Bearer ${token}`}})
            .then((res)=>{
                console.log("전송")
                console.log(res.data)
            }).catch((err)=>{
                console.log(err)
            })
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
                <ApplyInputForm onPress={onPress} handleChange={handleChange} currentInfo={currentInfo}/>
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