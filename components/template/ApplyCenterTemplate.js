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
    const [isLoading, setIsLoading] = useState(true)
    const [login, setLogin] = useRecoilState(loginState);
    const [applyData, setApplyData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);

    const handleChange = (name, value) => {
        setCurrentInfo({
            ...currentInfo,
            [name]: value
        })
    }

    const getApplyData = async (token) => {
        await axios.get(`http://3.35.135.214:8080/app/hope/status`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log("신청현황")
                console.log(res.data.data)
                setIsLoading(false)
                let buf=[]
                res.data.data.map((data,index)=>{
                    if(data.accept==="accept"){
                        buf[index]={
                            ...data,
                            accept:"참여"
                        }
                    }
                    else{
                        buf[index]={
                            ...data,
                            accept:"미참여"
                        }
                    }
                })
                let rBuf=buf.reverse()
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
        console.log("clicked")
        setModalVisible(true)
    };
    console.log(applyData)
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 0.6, zIndex: 1, paddingTop: Platform.OS === 'ios' ? 0 : 30,}}>
                <CustomNavigation props={props} type="CenterTitleNavbar" title="지문 등록 신청하러 가기"/>
            </View>
                <View style={{flex:6,marginTop:60}}>
                    <View style={{flex:1,alignItems: "center",marginBottom:10}}>
                        <View style={styles.list}>
                            <View>
                                <Text style={{fontSize: Platform.OS==="ios"?30:24,paddingVertical:20}}>최근 신청 현황</Text>
                            </View>
                                <ScrollView  >
                                    {applyData.map((data, index) => {
                                        if (index < 5) {
                                            return <View key={index}
                                                         style={{...styles.container2}}>
                                                <Text style={{fontSize: Platform.OS==="ios"?19:17}}>지문 등록 참여 여부 : {data.accept}</Text>
                                                <Text style={{fontSize: Platform.OS==="ios"?19:17}}>지문 등록 희망 날짜 : {data.h_date}</Text>
                                            </View>
                                        }
                                    })}
                                </ScrollView>
                        </View>
                    </View>
                        <View style={{paddingVertical:70}}>
                            {/*<View style={{alignItems: 'center', justifyContent: 'center',marginBottom:10}}>*/}
                            {/*    <Text style={styles.text}>1. 본인의 기본 정보가 맞는지 확인한다.</Text>*/}
                            {/*    <Text style={styles.text}>2. 지문 등록 참여 여부를 선택한다.</Text>*/}
                            {/*    <Text style={styles.text}>3. 희망하는 날짜를 선택한다.</Text>*/}
                            {/*    <Text style={styles.text}>( 추후 전화를 통해 방문 날짜 확정 예정 )</Text>*/}
                            {/*    <Text style={styles.text}>4. 제출 버튼을 눌러 신청서를 제출한다.</Text>*/}
                            {/*</View>*/}
                            <View style={{justifyContent: 'center', alignItems: 'center',paddingVertical:20}}>
                                <CustomButton width={screen.width * 0.75} height={Platform.OS==="ios"?40:35}
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
        alignItems:"center"
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
        fontSize: Platform.OS==="ios"?22:19,
        paddingVertical:2
    },
    container2: {
        justifyContent:"center",
        alignItems: "center",
        paddingHorizontal: 25,
        paddingVertical:Platform.OS==="ios"?10:7.4,
        backgroundColor: Style.color5,
        borderRadius: 20,
        width: "auto",
        height: "auto",
        marginBottom: 20
    },
    list:{
        width: screen.width * 0.95,
        height: "auto",
        backgroundColor: Style.color3,
        justifyContent: "center",
        alignItems: "center",
        flex:5
    }
})