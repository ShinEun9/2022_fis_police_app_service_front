import React, {useState} from 'react';
import {Text, SafeAreaView, View, Dimensions, StyleSheet, useWindowDimensions, Platform} from "react-native";
import CustomInput from "../atom/CustomInput";
import DatePicker from "../atom/DatePicker";
import CustomMultilineInput from "../atom/CustomMultilineInput";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";
import Select from "../atom/Select";




function ApplyInputForm({onPress, handleChange, currentInfo}) {
    return (
        <View style={{alignItems: "center"}}>
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
                <Text style={styles.Text}>이메일 :</Text>
                <CustomInput id="c_email" width={`${useWindowDimensions().width * 0.79}`} height="40"
                             keyboardType="email-address"
                             handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.Text}>지문 등록 참여 여부 :</Text>
                <View style={{display: "flex",justifyContent: "center",marginLeft:10}}>
                    <Select id="c_participation" label="참여 여부 선택" items={[{label: '참여', value: true}, {
                        label: '미참여',
                        value: false
                    }]}

                            width={useWindowDimensions().width * 0.60}

                            handleChange={handleChange} currentInfo={currentInfo}/>
                </View>


            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>지문 등록 희망 날짜 :</Text>
                <View style={styles.datePicker}>
                    <DatePicker id="c_date" handleChange={handleChange} currentInfo={currentInfo}/>
                </View>
            </View>
            <View style={styles.Button}>
                <CustomButton backgroundColor={Style.color2} onPress={onPress} width="100" height="40" content={"제출"}/>
            </View>

        </View>


    );
}

const styles = StyleSheet.create({
    Input: {
        marginBottom: 10,
        flexDirection: "row",
        display: "flex",
        alignItems: "center",

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

export default ApplyInputForm;