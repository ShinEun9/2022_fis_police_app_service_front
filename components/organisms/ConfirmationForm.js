import React, {useState} from 'react';
import {View, Text, useWindowDimensions, StyleSheet} from "react-native";
import CustomInput from "../atom/CustomInput";
import CustomMultilineInput from "../atom/CustomMultilineInput";
import Timepicker from "../atom/Timepicker";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";

function ConfirmationForm() {

    const [currentInfo,setCurrentInfo]=useState({
        c_name:"",
        c_address:"",
        c_ph:"",
        c_newP:"",
        c_oldP:"",
        c_sign:"",
        c_agentCheck:"",
        c_centerCheck:""
    })
    const onPress=()=>{
        console.log("send")
    }
    const handleChange = (name, value) => {
        setCurrentInfo({
            ...currentInfo,
            [name]: value
        })
    }
    return (
        <View style={styles.container}>
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
                <Text style={styles.Text}>방문 시간 :</Text>
                <View style={styles.timepicker}>
                    <Timepicker />
                </View>

            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>종료 시간 :</Text>
                <View style={styles.timepicker}>
                    <Timepicker/>
                </View>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>신규 인원 :</Text>
                <CustomInput id="c_newP" width={`${useWindowDimensions().width * 0.6}`} height="40"
                             keyboardType="phone-pad" handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>기존 인원 :</Text>
                <CustomInput id="c_oldP" width={`${useWindowDimensions().width * 0.6}`} height="40"
                             keyboardType="phone-pad" handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>특이 사항 :</Text>
                <CustomMultilineInput id="c_sign"width={`${useWindowDimensions().width * 0.6}`} height="40"
                                      handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>현장 요원 확인 :</Text>
                <CustomInput id="c_agentCheck" width={`${useWindowDimensions().width * 0.528}`} height="40"
                             handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>시설 담당자 확인 :</Text>
                <CustomInput id="c_centerCheck" width={`${useWindowDimensions().width * 0.495}`} height="40"
                             handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Button}>
                {/*<CustomButton backgroundColor={Style.color2} onPress={onPress} width="100" height="40" content={"제출"}/>*/}
            </View>
        </View>
    );
}

export default ConfirmationForm;

const styles = StyleSheet.create({
    timepicker:{
        display: "flex",
        justifyContent: "center",
        marginLeft:13,
        paddingVertical:7
    },
    container:{
        display: "flex",
        justifyContent:"center",

    },
    Input: {
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        paddingVertical:-30
    },
    Text: {
        fontSize: 15,

    },

    Button: {
        marginTop: 18,
        alignItems:"center"
    }
})