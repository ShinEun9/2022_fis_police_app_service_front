import React from 'react';
import {Text, SafeAreaView, StyleSheet, View, ScrollView, Dimensions, Image, Modal, Alert} from "react-native";
import CustomButton from "../atom/CustomButton";
import CustomMap from "../molecule/CustomMap";
import CustomImageButton from "../atom/CustomImageButton";
import {Style} from "../../Style";

import CustomModal from "../atom/CustomModal";
import CustomNavigation from "../CustomNavigation";


const screen = Dimensions.get("window");
const checkConfirmation = () => {
    return(
        console.log("확인서 열람")
    )
}
const checkHistory = () => {
    return (
        console.log("신청기록")
    )
}

function CheckReservationTemplate(props) {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.nav}>
                <CustomNavigation navigation={props.navigation} type="titleNavbar" title="내 예약 확인하러 가기"/>
            </View>
            <View style={styles.comment}>
                <Text style={styles.text}>현장요원이 배치 안 됨</Text>
            </View>
            <View style={styles.map}>
                <CustomMap/>
            </View>
            <View style={styles.info}>
                <ScrollView horizontal pagingEnabled>
                    <View style={styles.agent}>
                        <Image
                            style={styles.image}
                            source={{uri: 'https://ifh.cc/g/J91JZP.jpg'}}/>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>현장요원 이름 : 한마루</Text>
                            <Text style={styles.text}>전화번호 : 010-1234-5678</Text>
                            <View style={styles.buttonContainer}>
                                <CustomButton backgroundColor={Style.color2} onPress={checkConfirmation} width={120}
                                              height={35} content={"확인서 열람"} modal={true}  modalContent={<ConfirmationForm/>}/>
                                {/*modalContent 알맞은 파일로 변경 필요*/}

                            </View>

                        </View>
                    </View>
                    <View style={styles.agent}>
                        <Image
                            style={styles.image}
                            source={{uri: 'https://ifh.cc/g/bh1n6i.png'}}/>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>현장요원 이름 : 웰시코기</Text>
                            <Text style={styles.text}>전화번호 : 010-1234-5678</Text>
                            <View style={styles.buttonContainer}>
                                <CustomButton backgroundColor={Style.color2} onPress={checkConfirmation} width={120}
                                              height={35} content={"확인서 열람"} modal={true} modalContent={<ConfirmationForm/>} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>

            <View style={styles.history}>
                <View style={{paddingVertical: 8}}>
                    <Text style={{fontSize: 25}}>내 과거 신청 이력</Text>
                </View>
                <Text style={styles.text}>과거이력</Text>
                <Text style={styles.text}>과거이력</Text>
                <Text style={styles.text}>과거이력</Text>
                <Text style={styles.text}>과거이력</Text>
                <View style={styles.button}>
                    <CustomImageButton name={"plus-square-o"} onPress={checkHistory} size={24} color={"black"}/>
                </View>

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
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    history: {
        flex: 2.9,
        justifyContent: "center",
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
        paddingHorizontal: 15,
    },
    buttonContainer: {

        paddingHorizontal: 55,
        marginTop: 10
    },
})