import React, {useEffect, useState} from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    Image,
    Modal,
    Alert,
    ActivityIndicator,
    useWindowDimensions
} from "react-native";
import CustomMap from "../molecule/CustomMap";
import {Style} from "../../Style";
import CustomNavigation from "../organisms/CustomNavigation";
import CustomModal from "../atom/CustomModal";
import CustomImageModal from "../atom/CustomImageModal";
import ConfirmationModal from "../organisms/ConfirmationModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ApplyRecord from "../organisms/ApplyRecord";
import ConfirmationForm from "../organisms/ConfirmationForm";



const screen = Dimensions.get("window");
let nowSchedule;


function CheckReservationTemplate(props) {
    const [historyList,setHistoryList]=useState([])
    const [agentList,setAgentList]=useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [confirmation,setConfirmation]=useState([])

    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token");
        return t;
    }
    useEffect(() => {
        getToken().then((token) => {
            getHistoryList(token)
            getAgentList(token)
        })
    }, [])


    const getHistoryList = async (token) => {
        await axios.get(`http://localhost:8080/app/confirm/center`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log("과거기록")
                console.log(res.data)
                const buf = []
                res.data.data.map((data, index) => {
                    buf[index] = {
                        key: index,
                        visit_date: data.visit_date,
                        new_child: data.new_child,
                        old_child: data.old_child
                    }
                })
                setIsLoading(false)
                setHistoryList(buf)
            }).catch((err) => {
                setIsLoading(false)
                console.log(err)
            })
    }

    const getAgentList=async (token)=>{
        await axios.get(`http://localhost:8080/app/schedule/confirm`,{headers: {Authorization: `Bearer ${token}`}})
            .then((res)=>{
                console.log("현장요원")
                console.log(res.data)
                let list=[]
                res.data.map((data,index)=>{
                    list[index]={
                        key:index,
                        a_name:data.a_name,
                        a_ph:data.a_ph,
                        a_picture:'data:image/png;base64,'+data.a_picture,
                        late_comment:data.late_comment,
                        schedule_id:data.schedule_id,
                    }
                    nowSchedule=data.schedule_id
                })
                setAgentList(list)
                getToken().then((token)=>{
                    getConfirmation(token)
                })
            }).catch((err)=>{
                console.log(err)
            })
    }
    const getConfirmation=async(token)=>{
        await axios.get(`http://localhost:8080/app/confirm/${nowSchedule}`,{headers: {Authorization: `Bearer ${token}`}})
            .then((res)=>{
                console.log("확인서")
                console.log(res.data)
                setConfirmation(res.data)
            }).catch((err)=>{
                console.log(err)
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.nav}>
                <CustomNavigation navigation={props.navigation} type="titleNavbar" title="내 예약 확인하러 가기"/>
            </View>
            <View style={styles.comment}>
                <Text style={styles.text}>{agentList.late_comment}</Text>
            </View>
            <View style={styles.map}>
                <CustomMap/>
            </View>
            <View style={styles.info}>
                <ScrollView horizontal pagingEnabled>
                    {agentList.map((data,index)=>{

                        return <View key={index} style={styles.agent}>
                            <Image
                                style={styles.image}
                                source={{uri: data.a_picture}}/>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>현장요원 이름 : {data.a_name}</Text>
                                <Text style={styles.text}>전화번호 : {data.a_ph}</Text>
                                <View style={styles.buttonContainer}>
                                    <CustomModal backgroundColor={Style.color2} width={120}
                                                 height={35} content={"확인서 열람"} modalWidth={screen.width * 0.93}
                                                 modalHeight={screen.height * 0.7} modalButtonContent={"확인"}
                                                 modalContent={<ConfirmationModal name={data.a_name} content={confirmation} schedule_id={nowSchedule}/>}/>
                                </View>

                            </View>
                        </View>
                    })}
                </ScrollView>
            </View>

            <View style={styles.history}>
                <View style={{paddingVertical: 8}}>
                    <Text style={{fontSize: 25}}>내 과거 신청 이력</Text>
                </View>
                {/*<Text style={styles.text}>과거이력</Text>*/}
                {/*<Text style={styles.text}>과거이력</Text>*/}
                {/*<Text style={styles.text}>과거이력</Text>*/}
                {/*<Text style={styles.text}>과거이력</Text>*/}
                {isLoading ? <ActivityIndicator/> :
                    <>
                        {historyList.map((data, a) => {
                            return <Text key={a} style={styles.text}>{data.visit_date}</Text>
                        })}
                        <View style={styles.button}>
                            <CustomImageModal name={"plus-square-o"}  size={24} color={"black"}
                                              modalContent={<ApplyRecord content={historyList}/>} />
                        </View>
                    </>
                }


            </View>
        </SafeAreaView>
    );
}

export default CheckReservationTemplate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 4,
    },
    comment: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    info: {
        flex: 3,
    },
    agent: {
        // justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 5,
    },
    history: {
        flex: 2.9,
        alignItems: "center",
    },
    nav: {
        flex: 0.7,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        marginTop: 5
    },
    text: {
        fontSize: 20,
        paddingVertical: 3,
    },
    image: {
        width: 130,
        height: 130,
    },
    textContainer: {
        paddingHorizontal: 30,
    },
    buttonContainer: {

        paddingHorizontal: 55,
        marginTop: 10
    },
    modalContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 20
    },

})