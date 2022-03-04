import React, {useEffect} from 'react';
import {Text, View, StyleSheet, useWindowDimensions, ScrollView, Dimensions} from "react-native";
import CustomButton from "./atom/CustomButton";
import {Style} from "../Style";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ApplyRecord(props) {

    const onPress = () => {
        console.log("pressButton")
    }
    return (
        <View style={styles.mainContainer}>
            <ScrollView style={{width: "100%", marginBottom: 20, }}
                        contentContainerStyle={{alignItems: "center"}}>
                <View style={styles.container}>
                    <Text>2017.08.09</Text>
                    <Text>신규 14명 기존 9명</Text>
                </View>
                <View style={styles.container}>
                    <Text>2017.08.09</Text>
                    <Text>신규 14명 기존 9명</Text>
                </View>
                <View style={styles.container}>
                    <Text>2017.08.09</Text>
                    <Text>신규 14명 기존 9명</Text>
                </View>
                <View style={styles.container}>
                    <Text>2017.08.09</Text>
                    <Text>신규 14명 기존 9명</Text>
                </View>
                <View style={styles.container}>
                    <Text>2017.08.09</Text>
                    <Text>신규 14명 기존 9명</Text>
                </View>

            </ScrollView>
            {/*<CustomButton content="확인" width="100" height="50" backgroundColor={Style.color2} onPress={onPress}/>*/}
        </View>

    );
}

export default ApplyRecord;

const styles = StyleSheet.create(
    {
        mainContainer: {
            // backgroundColor: Style.color3,
            width: Dimensions.get("window").width * 0.83,
            height: Dimensions.get("window").height * 0.49,
            alignItems: "center",
            paddingHorizontal: 0,
            paddingBottom: 20,
            paddingTop: 30,
        },
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            backgroundColor: Style.color5,
            borderRadius: 20,
            width: "80%",
            height: 50,
            marginBottom: 20
        }
    }
)