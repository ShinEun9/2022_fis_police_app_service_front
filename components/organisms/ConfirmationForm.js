import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    useWindowDimensions,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator, Dimensions, Alert
} from "react-native";
import CustomInput from "../atom/CustomInput";
import CustomMultilineInput from "../atom/CustomMultilineInput";
import Timepicker from "../atom/Timepicker";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";
import {FontAwesome} from "@expo/vector-icons";
import DatePicker from "../atom/DatePicker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {showErrorMessage} from "../showErrorMessage";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";

function ConfirmationForm({setModalVisible, defaultValue, props, getDataFunction}) {
    const [login, setLogin] = useRecoilState(loginState)
    const [currentInfo, setCurrentInfo] = useState({ // 확인서 내용 초기화
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
        // visit_date와 visit_time을 string type에서 date type으로 변경하여 setCurrentInfo
        // setCurrentInfo하는 이유는 확인서에 적힐 기본 정보를 받아오기 위함
        let date = new Date();
        let tmp = defaultValue['visit_time'].split(":")
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), tmp[0], tmp[1])
        setCurrentInfo({
            ...currentInfo,
            c_name: defaultValue.c_name,
            c_address: defaultValue.c_address,
            c_ph: defaultValue.c_ph,
            visit_date: new Date(defaultValue.visit_date),
            visit_time: date
        })

    }, [])

    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token");
        return t;
    }

    // 확인서 제출하는 api 요청
    const sendRequest = async (token) => {
        const {new_child, old_child, senile, disabled, etc} = currentInfo
        let info = {
            new_child, old_child, senile, disabled, etc
        }
        const {schedule_id} = defaultValue;

        await axios.post(`http://3.35.135.214:8080/app/confirm/write/${schedule_id}`, info, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res)
                setIsLoading(false)
                Alert.alert("확인서 제출 완료되었습니다","",[{
                    text:"확인",onPress: ()=>{
                        setModalVisible(false)
                        getDataFunction();
                    }
                }])
            }).catch((err) => {
                console.log(err)
                showErrorMessage(err.response.data.message, setLogin, props, sendRequest)
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
                    <DatePicker id="visit_date" handleChange={handleChange} currentInfo={currentInfo}
                                width={`${Dimensions.get('window').width * 0.595}`}/>
                </View>

            </View>

            <View style={styles.Input}>
                <Text style={styles.Text}>방문 시간 :</Text>
                <View style={styles.timepicker}>
                    <Timepicker id="visit_time" handleChange={handleChange} currentInfo={currentInfo}
                                width={`${Dimensions.get('window').width * 0.595}`}/>
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
            <View style={styles.Button}>
                <CustomButton backgroundColor={Style.color2} onPress={onPress} width="100" height="40"
                              content={isLoading ? <ActivityIndicator color="gray"/> : "제출"}/>
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