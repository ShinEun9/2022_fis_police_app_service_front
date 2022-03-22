import React, {useState} from 'react';
import {
    Text,
    SafeAreaView,
    View,
    Dimensions,
    StyleSheet,
    useWindowDimensions,
    Platform,
    ActivityIndicator
} from "react-native";
import CustomInput from "../atom/CustomInput";
import DatePicker from "../atom/DatePicker";
import CustomMultilineInput from "../atom/CustomMultilineInput";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";
import Select from "../atom/Select";




function ApplyInputForm({onPress, handleChange, currentInfo, isLoading}) {
    return (
        <View style={{alignItems: "center"}}>
            <View style={styles.Input}>
                <Text style={styles.Text}>시설 이름 :</Text>
                <CustomInput id="h_name" width={`${useWindowDimensions().width * 0.74}`} height="40"
                             handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>시설 주소 :</Text>
                <CustomMultilineInput id="h_address" width={`${useWindowDimensions().width * 0.74}`} height="40"
                                      handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>시설 전화번호 :</Text>
                <CustomInput id="h_ph" width={`${useWindowDimensions().width * 0.675}`} height="40"
                             keyboardType="phone-pad" handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>이메일 :</Text>
                <CustomInput id="h_mail" width={`${useWindowDimensions().width * 0.79}`} height="40"
                             keyboardType="email-address"
                             handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.Text}>지문 등록 참여 여부 :</Text>
                <View style={{display: "flex",justifyContent: "center",marginLeft:10}}>
                    <Select id="accept" label="참여 여부 선택" items={[{label: '참여', value: "accept"}, {
                        label: '미참여',
                        value: "reject"
                    }]}
                            width={useWindowDimensions().width * 0.60}
                            handleChange={handleChange} currentInfo={currentInfo}/>
                </View>


            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>지문 등록 희망 날짜 :</Text>
                <View style={styles.datePicker}>
                    <DatePicker id="h_date" handleChange={handleChange} currentInfo={currentInfo} width={useWindowDimensions().width * 0.60} />
                </View>
            </View>
            <View style={styles.Button}>
                <CustomButton backgroundColor={Style.color2} onPress={onPress} width="100" height="40" content={isLoading?<ActivityIndicator color="gray"/>:"제출"}/>
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
        paddingHorizontal: 8,
        paddingVertical: 9
    },
    Button: {
        marginTop: 18
    }
})

export default ApplyInputForm;