import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {Style} from "../../Style";
import CustomButton from "../atom/CustomButton";

function List({type = "buttonList", onPress, info}) {
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
            <View style={{marginRight: 10, width: useWindowDimensions().width*0.7}}>
                {Object.values(info).map((value, index) =>
                    <Text style={{fontSize: parseInt(`${index === 0 ? 20 : 14}`), marginBottom: 5}}>{value}</Text>
                )}
            </View>
            <CustomButton onPress={onPress} backgroundColor={Style.color2} width="50" height="50" content="늦음"/>
        </View>
    } else {
        element = <View style={{
            backgroundColor: `${Style.color5}`,
            padding: 10,
            marginBottom: 10,
            borderRadius: 10
        }}>
            {Object.values(info).map((value, index) =>
                <Text style={{fontSize: parseInt(`${index === 0 ? 20 : 14}`), marginBottom: 5}}>{value}</Text>
            )}
        </View>
    }
    return (
        element

    );
}

export default List;