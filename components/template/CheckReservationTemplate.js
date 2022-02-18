import React from 'react';
import {Text, SafeAreaView, StyleSheet, View, ScrollView, Dimensions, Image} from "react-native";
import CustomButton from "../atom/CustomButton";
import CustomMap from "../molecule/CustomMap";
import CustomImageButton from "../atom/CustomImageButton";


const screen = Dimensions.get("window");

function CheckReservationTemplate(props) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.nav}>
                <Text>네비게이션 바</Text>
            </View>
            <View style={styles.comment}>
                <Text>현장요원이 배치 안 됨</Text>
            </View>
            <View style={styles.map}>
                <CustomMap/>
            </View>
            <View style={styles.info}>
                <ScrollView horizontal pagingEnabled>
                    <View style={styles.agent}>
                        <Image
                            style={styles.image}
                        source={{uri:'https://ifh.cc/g/bh1n6i.png'}}/>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>현장요원 이름 : 웰시코기</Text>
                            <Text style={styles.text}>전화번호 : 010-1234-5678</Text>
                            <View >
                                <CustomButton backgroundColor={"skyblue"} omPress={()=>{console.log("apply")}} content={"확인서 열람"}/>
                            </View>

                        </View>
                    </View>
                    <View style={styles.agent}>
                        <Image
                            style={styles.image}
                            source={{uri:'https://ifh.cc/g/bh1n6i.png'}}/>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>현장요원 이름 : 웰시코기</Text>
                            <Text style={styles.text}>전화번호 : 010-1234-5678</Text>
                            <View >
                                <CustomButton backgroundColor={"skyblue"} onPress={()=>{console.log("apply")}} content={"확인서 열람"}/>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </View>

            <View style={styles.history}>
                <Text style={styles.text}>과거이력</Text>
                <Text style={styles.text}>과거이력</Text>
                <Text style={styles.text}>과거이력</Text>
                <Text style={styles.text}>과거이력</Text>
                <View style={styles.button}>
                    <CustomImageButton name={"pluscircleo"} onPress={()=>{console.log("clicked")}} size={24} color={"black"}/>
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
        justifyContent:"center",
        alignItems:"center"
    },
    info: {
        flex: 3,
    },
    agent: {
        justifyContent:"space-between",
        alignItems:"center",
        width:screen.width,
        height:screen.height*0.25,
        flexDirection:"row",
    },
    history: {
        flex: 2.6,
        justifyContent:"center",
        alignItems:"center",
    },
    nav: {
        flex: 0.7,
        justifyContent:"center",
        alignItems:"center"
    },
    button:{
        marginTop:20
    },
    text:{
        fontSize:20,
        paddingVertical:4,
    },
    image:{
        width:130,
        height:130,
    },
    textContainer:{
        paddingHorizontal:20,
    },

})