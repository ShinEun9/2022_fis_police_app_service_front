import React, {useState} from 'react';
import {Text, SafeAreaView, View, Dimensions, StyleSheet, useWindowDimensions, Platform} from "react-native";
import CustomInput from "../atom/CustomInput";
import DatePicker from "../atom/DatePicker";
import CustomMultilineInput from "../atom/CustomMultilineInput";
import CustomButton from "../atom/CustomButton";


const screen = Dimensions.get("window");
function ApplyInputForm(props) {
    const [date, setDate] = useState('09-10-2021');
    return (
        <View style={{alignItems: "center"}}>
            <View style={styles.Input}>
                <Text style={styles.Text}>시설 이름 :</Text>
                <CustomInput width={`${useWindowDimensions().width*0.74}`} height="40" />
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>시설 주소 :</Text>
                <CustomMultilineInput width={`${useWindowDimensions().width*0.74}`} height="40" />
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>시설 전화번호 :</Text>
                <CustomInput width={`${useWindowDimensions().width*0.675}`} height="40" />
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>이메일 :</Text>
                <CustomInput width={`${useWindowDimensions().width*0.79}`} height="40" />
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>지문 등록 참여 여부 :</Text>
                <CustomInput width={`${useWindowDimensions().width*0.6}`} height="40" />
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>지문 등록 희망 날짜 :</Text>
                <View style={styles.datePicker}>
                    <DatePicker/>
                </View>
            </View>
            <View style={styles.Button}>
                <CustomButton backgroundColor={"orange"} onPress={props.onPress}  content={"제출"}/>
            </View>

        </View>


);
}

const styles = StyleSheet.create({
    Input:{
        flexDirection:"row",
        display:"flex",
    },
    Text:{
        fontSize:15,
        paddingVertical:22
    },
    datePicker: {
        paddingHorizontal: 10,
        paddingVertical:9
    },
    Button:{
        marginTop:18
    }
})

export default ApplyInputForm;