import React, {useEffect, useState} from 'react';
import {
    Text,
    SafeAreaView,
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    Platform,
    Alert, useWindowDimensions
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
import ConfirmationModal from "../organisms/ConfirmationModal";

const screen = Dimensions.get("window");

function ApplyCenterTemplate(props) {
    // const [currentInfo, setCurrentInfo] = useState({
    //     accept: "",
    //     h_date: null,
    //     h_mail: "",
    //     h_name: "",
    //     h_ph: "",
    //     h_address: ""
    // })
    const [isLoading, setIsLoading] = useState({getCurrentInfoLoading: true, sendApplicationLoading: false})
    const [login, setLogin] = useRecoilState(loginState);
    const [applyData, setApplyData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);

    const handleChange = (name, value) => {
        setCurrentInfo({
            ...currentInfo,
            [name]: value
        })
    }
    // const getCurrentInfo = async (token) => {
    //     await axios.get(`http://3.35.135.214:8080/app/official/setting`, {headers: {Authorization: `Bearer ${token}`}})
    //         .then((res) => {
    //             console.log(res.data)
    //             setIsLoading({...isLoading, getCurrentInfoLoading: false})
    //             setCurrentInfo({
    //                 ...currentInfo,
    //                 h_name: res.data.center_name,
    //                 h_address: res.data.center_address,
    //                 h_ph: res.data.o_ph,
    //                 h_mail: res.data.o_email
    //             })
    //         }).catch((err) => {
    //             console.log(err)
    //             setIsLoading({...isLoading, getCurrentInfoLoading: false})
    //             showErrorMessage(err.response.data.message, setLogin, props)
    //         })
    // }

    const getApplyData = async (token) => {
        await axios.get(`http://3.35.135.214:8080/app/hope/status`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log("신청현황")
                console.log(res.data.data)
                setApplyData(res.data.data)
            }).catch((err) => {
                console.log(err)
                showErrorMessage(err.response.data.message, setLogin, props, getApplyData)
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
        console.log("clicked")
        setModalVisible(true)
    };
    console.log(applyData)
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 0.6, zIndex: 1, paddingTop: Platform.OS === 'ios' ? 0 : 30,}}>
                <CustomNavigation props={props} type="CenterTitleNavbar" title="지문 등록 신청하러 가기"/>
            </View>
            <View style={{flex: 3.3,alignItems: "center"}}>
                <View style={{
                    width: useWindowDimensions().width * 0.95,
                    height: useWindowDimensions().width * 0.90,
                    backgroundColor: Style.color3,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <View>
                        <Text style={{fontSize: 30,paddingVertical:20}}>최근 신청 현황</Text>
                    </View>
                    <ScrollView >
                        {applyData.map((data, index) => {
                            if (index < 5) {
                                return <View key={index}
                                             style={{...styles.container2}}>
                                    <Text style={{fontSize: 19}}>지문 등록 참여 여부 : {data.accept}</Text>
                                    <Text style={{fontSize: 19}}>지문 등록 희망 날짜 : {data.h_date}</Text>
                                </View>
                            }
                        })}
                    </ScrollView>
                </View>
            </View>
            <View style={{...styles.Guide, flex: 2.9}}>
                <View style={{alignItems: 'center', justifyContent: 'center',paddingVertical:52}}>
                    <Text style={styles.text}>1. 본인의 기본 정보가 맞는지 확인한다.</Text>
                    <Text style={styles.text}>2. 지문 등록 참여 여부를 선택한다.</Text>
                    <Text style={styles.text}>3. 희망하는 날짜를 선택한다.</Text>
                    <Text style={styles.text}>( 추후 전화를 통해 날짜 확정 예정 )</Text>
                    <Text style={styles.text}>4. 제출 버튼을 눌러 신청서를 제출한다.</Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <CustomButton width={screen.width * 0.75} height={40}
                                  backgroundColor={Style.color2} onPress={onPressFunc} content={"지문 등록 신청하러 가기"}/>
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
                    width: screen.width * 0.97,
                    height: "auto",
                    paddingHorizontal:3
                }}>
                    <ScrollView>
                        <ApplyInputForm setModalVisible={setModalVisible}/>
                    </ScrollView>
                </View>
            </Modal>
            {/*<View style={{flex: 5 , justifyContent:"center"}}>*/}
            {/*    {isLoading.getCurrentInfoLoading ? <ActivityIndicator color="gray"/> :*/}
            {/*        <ScrollView contentContainerStyle={{paddingVertical: 20}}>*/}
            {/*            <ApplyInputForm onPress={onPress} handleChange={handleChange} currentInfo={currentInfo}*/}
            {/*                            isLoading={isLoading.sendApplicationLoading}/>*/}
            {/*        </ScrollView>*/}
            {/*    }*/}
            {/*</View>*/}
        </SafeAreaView>
    );
}

export default ApplyCenterTemplate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Guide: {
        width: Dimensions.get("window").width,
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: Style.color3
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
        fontSize: 22
    },
    container2: {
        justifyContent:"center",
        alignItems: "center",
        paddingHorizontal: 25,
        paddingVertical:10,
        backgroundColor: Style.color5,
        borderRadius: 20,
        width: "auto",
        height: "auto",
        marginBottom: 20
    },
})