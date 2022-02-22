import React from 'react';
import {ScrollView, Text, useWindowDimensions, View} from 'react-native'
import List from "../molecule/List";
import {Style} from "../../Style";
import CustomButton from "../atom/CustomButton";
import button from "react-native-web/dist/exports/Button";

function ListContainer({type = "noButtonListContainer", onPress, minHeight = 0, listButtonContent, info}) {
    let element;

    if (type === "buttonListContainer") {
        element = <View style={{
            backgroundColor: `${Style.color3}`,
            padding: 10,
            minHeight: parseInt(`${minHeight === 0 ? 0 : minHeight}`),
            marginBottom: 20,
            height: "auto",
            width: useWindowDimensions().width * 0.96,
            justifyContent: "center"
        }}>
            <ScrollView>
                {info.map((item) => <List key={item.schedule_id} onPress={onPress} info={item} type="noButtonList"/>)}
                <View style={{backgroundColor: "pink", flexDirection: "row", justifyContent: "flex-end"}}>
                    <View style={{marginRight: 5}}>
                        <CustomButton onPress={onPress} backgroundColor={Style.color2} width="60" height="50"
                                      content={"수락"}/>
                    </View>
                    <CustomButton onPress={onPress} backgroundColor={Style.color6} width="60" height="50"
                                  content={"거절"}/>
                </View>

            </ScrollView>
        </View>
    } else if (type === "noButtonListContainer") {
        element = <View style={{
            backgroundColor: `${Style.color3}`,
            padding: 10,
            paddingBottom: 0,
            minHeight: parseInt(`${minHeight === 0 ? 0 : minHeight}`),
            marginBottom: 20,
            height: "auto",
            width: useWindowDimensions().width * 0.96,
            justifyContent: "center"
        }}>
            <ScrollView>
                {info.map((item) => <List key={item.schedule_id} onPress={onPress} listButtonContent={listButtonContent}
                                          info={item}/>)}
            </ScrollView>
        </View>
    }

    return (
        element
    );
}

export default ListContainer;