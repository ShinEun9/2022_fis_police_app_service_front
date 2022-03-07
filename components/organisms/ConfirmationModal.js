import React, {useEffect, useState} from 'react';
import {Text, useWindowDimensions, View, StyleSheet, Dimensions} from 'react-native'
import {Style} from "../../Style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function ConfirmationModal({schedule_id,name,content}) {
    // const [confirmInfo, setConfirmInfo] = useState();
    // const getToken = async () => {
    //     const t = await AsyncStorage.getItem("@token");
    //     return t;
    // }

    // const getData = async (token) => {
    //     await axios.get(`http://localhost:8080/app/confirm/${schedule_id}`, {headers: {Authorization: `Bearer ${token}`}})
    //         .then((res) => {
    //             setConfirmInfo(res.data);
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    // }
    //
    // useEffect(() => {
    //     getToken().then((token) => {
    //         getData(token)
    //     })
    // }, [])

    return (
        <View style={styles.mainContainer}>
            <Text style={{fontSize: 18, fontWeight: "bold", marginBottom: 15}}>현장 등록 확인서</Text>
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.title}>시설이름</Text>
                    <Text style={styles.content}>{content.center_name}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>시설주소</Text>
                    <Text style={styles.content}>{content.center_address}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>연락처</Text>
                    <Text style={styles.content}>{content.center_ph}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>방문시간</Text>
                    <Text style={styles.content}>{content.visit_date} {content.visit_time}</Text>
                </View>
                {/*<View style={styles.item}>*/}
                {/*    <Text style={styles.title}>종료시간</Text>*/}
                {/*    <Text style={styles.content}>2022.05.04 15:30</Text>*/}
                {/*</View>*/}
                <View style={styles.item}>
                    <Text style={{...styles.title, flex: 1}}>신규인원</Text>
                    <Text style={{...styles.content, flex: 1}}>{content.new_child===null ? 0 : content.new_child} 명</Text>
                    <Text style={{...styles.title, flex: 1}}>기존인원</Text>
                    <Text style={{...styles.content, flex: 1}}>{content.old_child === null ? 0 : content.old_child} 명</Text>

                </View>

            </View>
            <View style={styles.container}>
                <Text style={{...styles.title, flex: undefined, marginBottom: 5}}>
                    특이사항
                </Text>
                <View style={{borderWidth: 2, borderColor: Style.color5, padding: 5, minHeight: 100}}>
                    <Text>
                        {content.etc}
                    </Text>
                </View>

            </View>
            <View style={{...styles.container, width: "50%", justifyContent: "flex-end", alignSelf: "flex-end"}}>
                <View style={{...styles.item, flex: undefined, justifyContent: "center"}}>
                    <Text style={{...styles.title, flex: undefined, marginRight: 10}}>현장요원</Text>
                    <Text style={{...styles.content, flex: undefined, fontSize: 16}}>{name}</Text>
                </View>
                <View style={{...styles.item, flex: undefined, justifyContent: "center"}}>
                    <Text style={{...styles.title, flex: undefined, marginRight: 10}}>시설담당자</Text>
                    <Text style={{...styles.content, flex: undefined, fontSize: 16}}>담당자 이름</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width * 0.9,
        height: "auto",
        padding: 10,
        alignItems: "center",
        backgroundColor: "white"
    },
    container: {
        width: "100%",
        marginBottom: 10,
    },
    item: {
        width: "100%",
        height: "auto",
        paddingVertical: 10,
        flexDirection: "row",
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: "bold",
    },
    content: {
        flex: 2,
    }

})


export default ConfirmationModal;