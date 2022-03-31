import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    useWindowDimensions,
    ActivityIndicator, Alert
} from "react-native";
import CustomInput from "../atom/CustomInput";
import DatePicker from "../atom/DatePicker";
import CustomMultilineInput from "../atom/CustomMultilineInput";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";
import Select from "../atom/Select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {showErrorMessage} from "../showErrorMessage";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";


function ApplyInputForm({ setModalVisible, props, refresh}) {
    const [isLoading,setIsLoading] =useState(false)
    const [currentInfo, setCurrentInfo] = useState({
        accept: "",
        h_date: null,
        h_mail: "",
        h_name: "",
        h_ph: "",
        h_address: ""
    })
    const [login, setLogin] = useRecoilState(loginState);

    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token");
        return t;
    }

    useEffect(() => {
        getToken().then((token) => {
            getCurrentInfo(token)
        })
    }, [])

    const onPress=()=>{
        getToken().then((token) => {
            sendApplication(token)
        })
    }
    const handleChange = (name, value) => {
        setCurrentInfo({
            ...currentInfo,
            [name]: value
        })
    }

    const getCurrentInfo = async (token) => { // 신청서에 적힐 기본 정보를 받아오는 코드
        await axios.get(`http://3.35.135.214:8080/app/official/setting`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res.data)
                setIsLoading(false)
                setCurrentInfo({
                    ...currentInfo,
                    h_name: res.data.center_name,
                    h_address: res.data.center_address,
                    h_ph: res.data.o_ph,
                    h_mail: res.data.o_email
                })
            }).catch((err) => {
                console.log(err)
                setIsLoading(false)
                showErrorMessage(err.response.data.message, setLogin, props, getCurrentInfo)
            })
    }
    const sendApplication = async (token) => { // 작성한 신청서를 제출하는 코드
        if(currentInfo.accept===""||currentInfo.accept===null||currentInfo.h_date===null){ // 모든 항목이 채워지지 않으면 경고창이 뜸
            Alert.alert("모든 항목을 입력해주세요","",[{text:"확인"}])
        }else{ // 날짜 표현 방식을 바꿔주는 코드
            let buf = currentInfo.h_date
            let year = buf.getFullYear()
            let month = '' + (buf.getMonth() + 1)
            let day = '' + buf.getDate()

            if (month.length < 2) {
                month = '0' + month
            }
            if (day.length < 2) {
                day = '0' + day
            }
            buf = [year, month, day].join('-')
            setIsLoading( true)
            await axios.post(`http://3.35.135.214:8080/app/hope`, {
                ...currentInfo,
                h_date: buf
            }, {headers: {Authorization: `Bearer ${token}`}})
                .then((res) => {
                    console.log("전송")
                    Alert.alert("신청완료 되었습니다", "", [{text: "확인"}]);
                    setIsLoading(false)
                    setModalVisible(false)
                    refresh();
                }).catch((err) => {
                    console.log(err)
                    setIsLoading(false)
                    showErrorMessage(err.response.data.message, setLogin, props, sendApplication);

                })
        }
    }

    return ( // 신청서 양식
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
            <View style={styles.Input}>
                <Text style={styles.Text}>지문 등록 참여 여부 : </Text>
                <View style={{...styles.picker, display: "flex", justifyContent: "center", }}>
                    <Select id="accept" label="참여 여부 선택" items={[{label: '참여', value: "accept"}, {
                        label: '미참여',
                        value: "reject"
                    }]}
                            width={useWindowDimensions().width * 0.60}
                            handleChange={handleChange} currentInfo={currentInfo}/>
                </View>
            </View>
            <View style={styles.Input}>
                <Text style={styles.Text}>지문 등록 희망 날짜 : </Text>
                <View style={{...styles.picker,display: "flex", justifyContent: "center"}}>
                    <DatePicker id="h_date" handleChange={handleChange} currentInfo={currentInfo}
                                width={useWindowDimensions().width * 0.6}/>
                </View>
            </View>
            <View style={styles.Button}>
                <CustomButton backgroundColor={Style.color2} onPress={onPress} width="100" height="40"
                              content={isLoading ? <ActivityIndicator color="gray"/> : "제출"}/>
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
    picker: {
        paddingHorizontal: 4,
        paddingVertical: 9
    },
    Button: {
        paddingVertical:5
    }
})

export default ApplyInputForm;