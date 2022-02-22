import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {Style} from "../../Style";
import CustomButton from "../atom/CustomButton";

function List({type="buttonList", onPress, listButtonContent, info}) {
    let element;
    if (type === "buttonList") {
        element = <View style={{
            backgroundColor: `${Style.color5}`,
            width: "auto",
            height: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginBottom: 10,
            borderRadius: 10
        }}>
            <View style={{marginRight: 10, width: useWindowDimensions().width*0.7,  justifyContent: "space-between"}}>
                <Text style={{fontSize: 20,marginBottom: 10}}>{info.c_name} {info.visit_time}</Text>
                <Text style={{marginBottom: 10}}>{info.c_address}</Text>
                <Text>{info.estimate_num}명</Text>
            </View>
            <CustomButton onPress={onPress} backgroundColor={Style.color2} width="50" height="70" content={listButtonContent}/>
        </View>
    } else if(type==="noButtonList"){
        element = <View style={{
            backgroundColor: `${Style.color5}`,
            width: "auto",
            height: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginBottom: 10,
            borderRadius: 10
        }}>
            <View style={{marginRight: 10, width: useWindowDimensions().width*0.7,  justifyContent: "space-between"}}>
                <Text style={{fontSize: 20,marginBottom: 10}}>{info.c_name} {info.visit_time}</Text>
                <Text style={{marginBottom: 10}}>{info.c_address}</Text>
                <Text>{info.estimate_num}명</Text>
            </View>
        </View>
    }
    return (
        element

    );
}

export default List;