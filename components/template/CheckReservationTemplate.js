import React from 'react';
import {Text, SafeAreaView, StyleSheet,View} from "react-native";
import CustomButton from "../atom/CustomButton";
import CustomMap from "../molecule/CustomMap";

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
                <Text>현장요원 사진</Text>
            </View>
            <View style={styles.history}>
                <Text>과거이력</Text>
            </View>
        </SafeAreaView>
    );
}

export default CheckReservationTemplate;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    map:{
        flex:5,

    },
    comment:{
        flex:0.5,
    },
    info:{
        flex:3,
    },
    history:{
      flex:2
    },
    nav:{
        flex:0.7
    }
})