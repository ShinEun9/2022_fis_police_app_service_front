import React from 'react';
import {ScrollView, Text, useWindowDimensions, View} from 'react-native'
import List from "../molecule/List";
import {Style} from "../../Style";
import CustomButton from "../atom/CustomButton";

function ListContainer({type = "noButtonListContainer", onPress, minHeight = 0, listButtonContent, info, keyValue}) {
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
                <View style={{ flexDirection: "row", justifyContent: "flex-end"}}>
                    <View style={{marginRight: 5}}>
                        <CustomButton keyValue={["accept", keyValue]} onPress={onPress} backgroundColor={Style.color2}
                                      width="60" height="50"
                                      content={"수락"}/>
                    </View>
                    <CustomButton keyValue={["reject", keyValue]} onPress={onPress} backgroundColor={Style.color6}
                                  width="60" height="50"
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
            <ScrollView contentContainerStyle={{
                alignItems: `${info.length === 0 ? "center" : "center"}`,
                justifyContent: `${info.length === 0 ? "center" : "center"}`
            }}>
                {info.length === 0 ? <Text style={{fontSize: 20, color:"gray"}}>일정이 존재하지 않습니다</Text> :
                    info.map((item) => {
                            let a;
                            if (item.complete === "complete") {
                                a = "확인서 열람"
                            } else if (item.complete === "incomplete") {
                                a = "확인서 작성"
                            } else {
                                a = "확인 대기중"
                            }

                            return <List key={item.schedule_id} onPress={onPress}
                                         listButtonContent={listButtonContent === "늦음" ? "늦음" : a}
                                         info={item}/>
                        }
                    )
                }
            </ScrollView>
        </View>
    }

    return (
        element
    );
}

export default ListContainer;