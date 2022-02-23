import React from 'react';
import {Text, useWindowDimensions, View, StyleSheet, Dimensions} from 'react-native'
import {Style} from "../Style";

function ConfirmationModal(props) {
    return (
        <View style={styles.mainContainer}>
            <Text style={{fontSize: 20}}>현장 등록 확인서</Text>
            <Text>시설명: 타요타요 어린이집</Text>
            <Text>주소: </Text>
            <Text>시설명</Text>
            <Text>시설명</Text>
            <Text>시설명</Text>
            <Text>시설명</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width * 0.9,
        backgroundColor: Style.color3,
        padding: 10,
        alignItems: "center"
    }
})


export default ConfirmationModal;