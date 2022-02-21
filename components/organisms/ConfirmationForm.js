import React from 'react';
import {View, Text, useWindowDimensions, StyleSheet} from "react-native";
import CustomInput from "../atom/CustomInput";
import CustomMultilineInput from "../atom/CustomMultilineInput";
import Timepicker from "../atom/Timepicker";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";

function ConfirmationForm(onPress, handleChange, currentInfo) {
    return (
        <View>
            <View style={styles.Input}>
                <Text style={styles.Text}>시설 이름 :</Text>
                <CustomInput id="c_name" width={`${useWindowDimensions().width * 0.74}`} height="40"
                             handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>시설 주소 :</Text>
                <CustomMultilineInput width={`${useWindowDimensions().width * 0.74}`} height="40"
                                      handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>시설 전화번호 :</Text>
                <CustomInput id="c_ph" width={`${useWindowDimensions().width * 0.675}`} height="40"
                             keyboardType="phone-pad" handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>방문 시간 :</Text>
                <Timepicker/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>종료 시간 :</Text>
                <Timepicker/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>신규 인원 :</Text>
                <CustomInput id="c_ph" width={`${useWindowDimensions().width * 0.675}`} height="40"
                             keyboardType="phone-pad" handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>기존 인원 :</Text>
                <CustomInput id="c_ph" width={`${useWindowDimensions().width * 0.675}`} height="40"
                             keyboardType="phone-pad" handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>특이사항 :</Text>
                <CustomMultilineInput width={`${useWindowDimensions().width * 0.74}`} height="40"
                                      handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>현장 요원 확인 :</Text>
                <CustomInput id="c_name" width={`${useWindowDimensions().width * 0.74}`} height="40"
                             handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>시설 담당자 확인 :</Text>
                <CustomInput id="c_name" width={`${useWindowDimensions().width * 0.74}`} height="40"
                             handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Button}>
                <CustomButton backgroundColor={Style.color2} onPress={onPress} width="100" height="40" content={"제출"}/>
            </View>
        </View>
    );
}

export default ConfirmationForm;

const styles = StyleSheet.create({
    Input: {
        flexDirection: "row",
        display: "flex",
        alignItems: "center"
    },
    Text: {
        fontSize: 15,
        paddingVertical: 22
    },
    datePicker: {
        paddingHorizontal: 10,
        paddingVertical: 9
    },
    Button: {
        marginTop: 18
    }
})