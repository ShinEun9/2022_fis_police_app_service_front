import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native'
import {Style} from "../../Style";
import Checkbox from 'expo-checkbox';
import CustomButton from "../atom/CustomButton";

/*
    날짜 : 2022/02/23 11:23 AM
    작성자 : 신은수
    작성내용 : 어떤 스케쥴이 선택됐는지 schedule_id를 props로 건네주야하는데 넘 어려워ㅠㅠ
 */

function MessageInputForm(props) {
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
        console.log(message)
        // api 요청
    }

    // useEffect(() => {
    //     console.log(isChecked)
    // }, [isChecked])

    return (
        <View style={{alignItems: "center", }}>
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
            {/*<CustomButton width="100" height="50" onPress={onPress} content="전송" backgroundColor={Style.color2}/>*/}
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
