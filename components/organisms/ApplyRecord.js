import React from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions} from "react-native";
import {Style} from "../../Style";

function ApplyRecord({content}) { //과거 신청 이력을 띄움

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={{width: "100%", marginBottom: 20,}}
                        contentContainerStyle={{alignItems: "center"}}>
                {content ? // 과거 신청 이력이 없으면 과거 신청 이력 없음 이라고 띄움
                    <>
                        {content.map((data, index) => {
                            return <View key={index} style={styles.container2}>
                                <Text>{data.visit_date}</Text>
                                <Text>신규 {data.new_child === null ? 0 : data.new_child} 명 /
                                    기존 {data.old_child === null ? 0 : data.old_child} 명</Text>
                            </View>
                        })}
                    </>
                    :
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <Text>과거 신청 이력 없음</Text>
                    </View>

                }


            </ScrollView>
        </View>
    );
}

export default ApplyRecord;

const styles = StyleSheet.create(
    {
        mainContainer: {
            width: Dimensions.get("window").width * 0.83,
            height: Dimensions.get("window").height * 0.49,
            alignItems: "center",
            paddingHorizontal: 0,
            paddingBottom: 20,
            paddingTop: 30,
            justifyContent: "center"
        },
        container2: {
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