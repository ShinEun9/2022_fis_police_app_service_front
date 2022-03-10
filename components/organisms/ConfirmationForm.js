import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    useWindowDimensions,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from "react-native";
import CustomInput from "../atom/CustomInput";
import CustomMultilineInput from "../atom/CustomMultilineInput";
import Timepicker from "../atom/Timepicker";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";
import CustomImageButton from "../atom/CustomImageButton";
import {FontAwesome} from "@expo/vector-icons";
import DatePicker from "../atom/DatePicker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ConfirmationForm({setModalVisible, defaultValue}) {
    const [currentInfo, setCurrentInfo] = useState({
        c_name: "",
        c_address: "",
        c_ph: "",
        visit_date: null,
        visit_time: null,
        new_child: "",
        old_child: "",
        senile: "",
        disabled: "",
        etc: "",
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let date = new Date()
        let fullDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}.`

        setCurrentInfo({
            ...currentInfo,
            c_name: defaultValue.c_name,
            c_address: defaultValue.c_address,
            c_ph: defaultValue.c_ph,
            visit_date: new Date(defaultValue.visit_date),
            visit_time: new Date(`${fullDate}${defaultValue.visit_time}`)
        })

    }, [])

    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token");
        return t;
    }

    const sendRequest = async (token) => {
        const {new_child, old_child, senile, disabled, etc} = currentInfo
        let info = {
            new_child, old_child, senile, disabled, etc
        }
        console.log("안되면 화날듯", info)

        const {schedule_id} = defaultValue;
        const {visit_time} = currentInfo
        console.log(currentInfo)
        await axios.post(`http://localhost:8080/app/confirm/write/${schedule_id}`, info, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res)
                setIsLoading(false)
                setModalVisible(false)
            }).catch((err) => {
                console.log(err)
                setIsLoading(false)

            })
    }


    const onPress = () => {
        setIsLoading(true)
        getToken().then((token) => {
            sendRequest(token)
        })
    }

    const handleChange = (name, value) => {
        setCurrentInfo({
            ...currentInfo,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(currentInfo);
    }, [currentInfo])

    return (
        <ScrollView style={{width: "100%", paddingHorizontal: 20}}>
            <TouchableOpacity style={{alignItems: "flex-end"}} onPress={() => {
                setModalVisible(false)
            }}>
                <FontAwesome name={"close"} size={30} color={"gray"}/>
            </TouchableOpacity>
            <View style={styles.Input}>
                <Text style={styles.Text}>시설 이름 :</Text>
                <CustomInput id="c_name" width={`${useWindowDimensions().width * 0.6}`} height="40"
                             handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>시설 주소 :</Text>
                <CustomMultilineInput id="c_address" width={`${useWindowDimensions().width * 0.6}`} height="40"
                                      handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>시설 전화번호 :</Text>
                <CustomInput id="c_ph" width={`${useWindowDimensions().width * 0.535}`} height="40"
                             keyboardType="phone-pad" handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>방문 날짜 :</Text>
                <View style={styles.timepicker}>
                    <DatePicker id="visit_date" handleChange={handleChange} currentInfo={currentInfo}/>
                </View>

            </View>

            <View style={styles.Input}>
                <Text style={styles.Text}>방문 시간 :</Text>
                <View style={styles.timepicker}>
                    <Timepicker id="visit_time" handleChange={handleChange} currentInfo={currentInfo}/>
                </View>

            </View>

            <View style={styles.Input}>
                <Text style={styles.Text}>신규 인원 :</Text>
                <CustomInput id="new_child" width={`${useWindowDimensions().width * 0.6}`} height="40"
                             keyboardType="phone-pad" handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>기존 인원 :</Text>
                <CustomInput id="old_child" width={`${useWindowDimensions().width * 0.6}`} height="40"
                             keyboardType="phone-pad" handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>치매:</Text>
                <CustomInput id="senile" width={`${useWindowDimensions().width * 0.69}`} height="40"
                             keyboardType="phone-pad" handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>장애:</Text>
                <CustomInput id="disabled" width={`${useWindowDimensions().width * 0.69}`} height="40"
                             keyboardType="phone-pad" handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>특이 사항 :</Text>
                <CustomMultilineInput id="etc" width={`${useWindowDimensions().width * 0.6}`} height="40"
                                      handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            {/*<View style={styles.Input}>*/}
            {/*    <Text style={styles.Text}>현장 요원 확인 :</Text>*/}
            {/*    <CustomInput id="c_agentCheck" width={`${useWindowDimensions().width * 0.528}`} height="40"*/}
            {/*                 handleChange={handleChange} currentInfo={currentInfo}/>*/}
            {/*</View>*/}
            {/*<View style={styles.Input}>*/}
            {/*    <Text style={styles.Text}>시설 담당자 확인 :</Text>*/}
            {/*    <CustomInput id="c_centerCheck" width={`${useWindowDimensions().width * 0.495}`} height="40"*/}
            {/*                 handleChange={handleChange} currentInfo={currentInfo}/>*/}
            {/*</View>*/}
            <View style={styles.Button}>
                <CustomButton backgroundColor={Style.color2} onPress={onPress} width="100" height="40"
                              content={isLoading ? <ActivityIndicator/> : "제출"}/>
            </View>
        </ScrollView>
    );
}

export default ConfirmationForm;

const styles = StyleSheet.create({
    timepicker: {
        display: "flex",
        justifyContent: "center",
        marginLeft: 13,
        paddingVertical: 7
    },
    container: {
        display: "flex",
        justifyContent: "center",

    },
    Input: {
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        paddingVertical: -30
    },
    Text: {
        fontSize: 15,

    },

    Button: {
        marginTop: 18,
        alignItems: "center"
    }
})