import React from 'react';
import {View, Text, useWindowDimensions, StyleSheet} from "react-native";
import CustomInput from "../atom/CustomInput";
import CustomMultilineInput from "../atom/CustomMultilineInput";
import Timepicker from "../atom/Timepicker";

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