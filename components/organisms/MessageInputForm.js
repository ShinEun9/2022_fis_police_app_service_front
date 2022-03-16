import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, useWindowDimensions, Alert} from 'react-native'
import {Style} from "../../Style";
import Checkbox from 'expo-checkbox';
import CustomButton from "../atom/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {showErrorMessage} from "../showErrorMessage";

/*
    날짜 : 2022/02/23 11:23 AM
    작성자 : 신은수
    작성내용 : 어떤 스케쥴이 선택됐는지 schedule_id를 props로 건네주야하는데 넘 어려워ㅠㅠ
 */

function MessageInputForm({setModalVisible, selectedScheduleId}) {
    const [isChecked, setChecked] = useState({lateCenter: false, trafficJam: false, etc: false});
    const [inputValue, setInputValue] = useState("")
    const handleChange = (key, value) => {
        setInputValue("");
        setChecked({
            lateCenter: false,
            trafficJam: false,
            etc: false,
            [key]: value
        })
    }

    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token")
        return t
    }

    const sendMessageRequest = async(token, message)=>{
        await axios.post(`http://localhost:8080/app/schedule/late`,
            {schedule_id: selectedScheduleId, late_comment: message},
            {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res)
                Alert.alert("메세지 전송에 성공하였습니다","",[{text:"확인"}])
            })
            .catch((err) => {
                // 실패했다고 alert 띄우기
                // Alert.alert("메세지 전송에 실패하였습니다","다시 시도해주세요.",[{text:"확인"}])
                console.log(err)
                console.log(err.response.data.message);
                showErrorMessage(err.response.data.message);
            })
    }


    const onPress = () => {
        const {lateCenter, trafficJam, etc} = isChecked
        let message;
        if(lateCenter === false && trafficJam === false && etc===false){
            // alert 창 띄우기
        }
        else if (lateCenter === true) {
            message = "이전 시설의 지문등록이 늦어지고 있어요!"
        } else if (trafficJam === true) {
            message = "교통체증으로 인해 늦어지고 있어요!"
        } else if(etc === true){
            message = inputValue;
        }

        // api 요청
        getToken().then((token)=>{
            sendMessageRequest(token, message)
        })


        setModalVisible(false)
    }


    return (
        <View style={{alignItems: "center", width: useWindowDimensions().width*0.8}}>
            <View style={{marginBottom: 40}}>
                <View style={styles.container}>
                    <Text style={styles.text}>이전 시설의 지문 등록이 늦어지고 있어요!</Text>
                    <Checkbox style={styles.checkbox} value={isChecked.lateCenter} onValueChange={(value) => {
                        handleChange("lateCenter", value)
                    }}/>
                </View>
                <View style={styles.container}>
                    <Text style={styles.text}>교통 체증으로 인해 늦어지고 있어요!</Text>
                    <Checkbox style={styles.checkbox} value={isChecked.trafficJam} onValueChange={(value) => {
                        handleChange("trafficJam", value)
                    }}/>
                </View>
                <View style={styles.container}>
                    <TextInput style={styles.text} placeholder="직접 입력" value={inputValue}
                               onChangeText={(value) => {
                                   setChecked({
                                       lateCenter: false,
                                       trafficJam: false,
                                       etc: true
                                   })
                                   setInputValue(value);
                               }}/>
                    <Checkbox style={styles.checkbox} value={isChecked.etc} onValueChange={(value) => {
                        handleChange("etc", value)
                    }}/>
                </View>
            </View>
            <CustomButton width="100" height="50" onPress={onPress} content="전송" backgroundColor={Style.color2}/>
        </View>
    );
}


export default MessageInputForm;
const styles = StyleSheet.create({
        container: {
            backgroundColor: Style.color5,
            width: "100%",
            height: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 10,
            paddingHorizontal: 10,
            marginBottom: 10
        },
        text: {
            flex: 1,
            fontSize: 16,
            textAlign: "center"
        }
    }
);
