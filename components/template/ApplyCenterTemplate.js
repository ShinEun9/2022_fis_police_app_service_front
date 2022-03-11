import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, StyleSheet, ActivityIndicator} from "react-native";
import ApplyInputForm from "../organisms/ApplyInputForm";
import CustomNavigation from "../organisms/CustomNavigation";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";
import {showErrorMessage} from "../showErrorMessage";

function ApplyCenterTemplate(props) {
    const [currentInfo, setCurrentInfo] = useState({
        accept: "",
        h_date: null,
        h_mail: "",
        h_name: "",
        h_ph: "",
        h_address: ""
    })
    const [isLoading, setIsLoading] = useState({getCurrentInfoLoading: true, sendApplicationLoading: false})
    const [login, setLogin] = useRecoilState(loginState);

    const handleChange = (name, value) => {
        setCurrentInfo({
            ...currentInfo,
            [name]: value
        })
    }
    const getCurrentInfo = async (token) => {
        await axios.get(`http://localhost:8080/app/official/setting`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res.data)
                setIsLoading({...isLoading, getCurrentInfoLoading: false})
                setCurrentInfo({
                    ...currentInfo,
                    h_name: res.data.center_name,
                    h_address: res.data.center_address,
                    h_ph: res.data.o_ph
                })
                AsyncStorage.removeItem("@token")
            }).catch((err) => {
                console.log(err)
                setIsLoading({...isLoading, getCurrentInfoLoading: false})
                showErrorMessage(err.response.data.message, setLogin, props)
            })
    }

    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token");
        return t;
    }
    useEffect(() => {
        getToken().then((token) => {
            getCurrentInfo(token)
        })
    }, [])
    const onPress = () => {
        getToken().then((token) => {
            sendApplication(token)
        })
    }

    const sendApplication = async (token) => {
        let buf = currentInfo.h_date
        let year = buf.getFullYear()
        let month = '' + (buf.getMonth() + 1)
        let day = '' + buf.getDate()

        if (month.length < 2) {
            month = '0' + month
        }
        if (day.length < 2) {
            day = '0' + day
        }
        buf = [year, month, day].join('-')

        console.log(buf)
        console.log({...currentInfo, h_date: buf})
        setIsLoading({...isLoading, sendApplicationLoading: true})
        await axios.post(`http://localhost:8080/app/hope`, {
            ...currentInfo,
            h_date: buf
        }, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log("전송")
                console.log(res.data)
                setIsLoading({...isLoading, sendApplicationLoading: false})

            }).catch((err) => {
                console.log(err)
                setIsLoading({...isLoading, sendApplicationLoading: false})
                showErrorMessage(err.response.data.message,setLogin,props);

            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1, zIndex:1}}>
                <CustomNavigation props={props} type="CenterTitleNavbar" title="지문 등록 신청하러 가기"/>
            </View>
            <View style={styles.Guide}>
                <Text>가이드가이드가이드</Text>
            </View>
            <View style={{...styles.InputForm, zIndex:0}}>
                {isLoading.getCurrentInfoLoading ? <ActivityIndicator/> :
                    <ApplyInputForm onPress={onPress} handleChange={handleChange} currentInfo={currentInfo} isLoading={isLoading.sendApplicationLoading}/>}
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
        justifyContent: "flex-start",
        backgroundColor:"pink"
    },
    InputForm: {
        flex: 6.7,
        justifyContent:"center",
        alignItems:"center"

    }
})