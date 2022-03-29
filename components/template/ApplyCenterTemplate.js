import React, {useEffect, useState} from 'react';
import {
    Text,
    SafeAreaView,
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Platform,
} from "react-native";
import ApplyInputForm from "../organisms/ApplyInputForm";
import CustomNavigation from "../organisms/CustomNavigation";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";
import {showErrorMessage} from "../showErrorMessage";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";
import Modal from "react-native-modal";


const screen = Dimensions.get("window");


function ApplyCenterTemplate(props) { //센터가 지문등록을 하는 템플릿
    const [isLoading, setIsLoading] = useState(true) // loading 구현을 위해
    const [login, setLogin] = useRecoilState(loginState);
    const [applyData, setApplyData] = useState([]) //과거에 신청했던 내용 저장
    const [modalVisible, setModalVisible] = useState(false); // modal을 띄울지 말지 결정


    const getApplyData = async (token) => { // 과거 신청 이력을 받아오는 코드
        await axios.get(`http://3.35.135.214:8080/app/hope/status`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                setIsLoading(false)
                let buf = []
                res.data.data.map((data, index) => { // 영어로 넘어오는 항목을 한글로 변경해줘야 함
                    if (data.accept === "accept") {
                        buf[index] = {
                            ...data,
                            accept: "참여"
                        }
                    } else {
                        buf[index] = {
                            ...data,
                            accept: "미참여"
                        }
                    }
                })
                let rBuf = buf.reverse() // 최신순으로 정렬
                setApplyData(rBuf)
            }).catch((err) => {
                console.log(err)
                showErrorMessage(err.response.data.message, setLogin, props, getApplyData)
                setIsLoading(false)

            })
    }

    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token");
        return t;
    }
    useEffect(() => {
        getToken().then((token) => {
            getApplyData(token)
        })
    }, [])


    const onPressFunc = () => {
        setModalVisible(true)
    };
    console.log(applyData)
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 0.6, zIndex: 1, paddingTop: Platform.OS === 'ios' ? 0 : 30,}}>
                <CustomNavigation props={props} type="CenterTitleNavbar" title="지문 등록 신청하러 가기"/>
            </View>
            <View style={{flex: 6, marginTop: 60}}>
                <View style={{flex: 1, alignItems: "center", marginBottom: 10}}>
                    <View style={styles.list}>
                        <View>
                            <Text style={{fontSize: Platform.OS === "ios" ? 30 : 24, paddingVertical: 20}}>최근 신청
                                현황</Text>
                        </View>
                        <ScrollView>
                            {applyData.map((data, index) => { // 최근 5개 신청 이력만 띄워주기 위해 map 함수 사용
                                if (index < 5) {
                                    return <View key={index}
                                                 style={{...styles.container2}}>
                                        <Text style={{fontSize: Platform.OS === "ios" ? 19 : 17}}>지문 등록 참여 여부
                                            : {data.accept}</Text>
                                        <Text style={{fontSize: Platform.OS === "ios" ? 19 : 17}}>지문 등록 희망 날짜
                                            : {data.h_date}</Text>
                                    </View>
                                }
                            })}
                        </ScrollView>
                    </View>
                </View>
                <View style={{paddingVertical: 70}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 20}}>
                        <CustomButton width={screen.width * 0.75} height={Platform.OS === "ios" ? 40 : 35}
                                      backgroundColor={Style.color2} onPress={onPressFunc} content={"지문 등록 신청하러 가기"}/>
                    </View>
                </View>
            </View>
            <Modal
                isVisible={modalVisible}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                onBackdropPress={() => {
                    setModalVisible(false)
                }}
                style={{flex: 1, justifyContent: "center", alignItems: "center",}}
            >
                <View style={{
                    ...styles.modalContainer,
                    width: "auto",
                    height: "auto",
                    paddingHorizontal: 3
                }}>
                    <ApplyInputForm setModalVisible={setModalVisible} props={props} refresh={()=>{
                        getToken().then((token) => {
                            getApplyData(token)
                        })
                    }}/>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

export default ApplyCenterTemplate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    modalContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 20,

    }
    ,
    text: {
        fontSize: Platform.OS === "ios" ? 22 : 19,
        paddingVertical: 2
    },
    container2: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 25,
        paddingVertical: Platform.OS === "ios" ? 10 : 7.4,
        backgroundColor: Style.color5,
        borderRadius: 20,
        width: "auto",
        height: "auto",
        marginBottom: 20
    },
    list: {
        width: screen.width * 0.95,
        height: "auto",
        backgroundColor: Style.color3,
        justifyContent: "center",
        alignItems: "center",
        flex: 5
    }
})