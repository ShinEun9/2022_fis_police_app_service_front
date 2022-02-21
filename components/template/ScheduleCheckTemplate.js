import React, {useState} from 'react';
import {Text, SafeAreaView, View, Alert, Pressable, StyleSheet, ScrollView} from "react-native";
import CustomNavigation from "../CustomNavigation";

function ScheduleCheckTemplate(props) {

    return (
        <SafeAreaView>
            <View style={{backgroundColor: "pink"}}>
                <CustomNavigation navigation={props.navigation} type="titleNavbar" title="확정된 일정 열람하러 가기"/>
            </View>
            <ScrollView contentContainerStyle={{flex: 9, backgroundColor: "orange", marginBottom: 10}}>
                {/*{todaySchedule.map((item) =>*/}
                {/*    <View style={{height: useWindowDimensions().height * 0.5}}>*/}
                {/*        <View style={styles.label}>*/}
                {/*            <Text style={styles.labelText}>2/17 목요일</Text>*/}
                {/*        </View>*/}
                {/*        <ListContainer onPress={onPress} info={item}/>*/}
                {/*     </View>)*/}
                {/*}*/}
            </ScrollView>
        </SafeAreaView>
    );
}

export default ScheduleCheckTemplate;

