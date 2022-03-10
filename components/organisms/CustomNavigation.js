import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Button, useWindowDimensions, Dimensions, StyleSheet} from 'react-native'
import {FontAwesome} from "@expo/vector-icons";
import CustomImageButton from "../atom/CustomImageButton";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import CustomImageModal from "../atom/CustomImageModal";
import CustomCalendar from "../atom/CustomCalendar";
import Modal from "react-native-modal";
import ConfirmationModal from "./ConfirmationModal";
import ConfirmationForm from "./ConfirmationForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";
import {Style} from "../../Style";


function CustomNavigation({navigation, type, title}) {
    const [openNavigation, setOpenNavigation] = useState(false);
    const [login, setLogin] = useRecoilState(loginState);

    const handleOpenNavigation = () => {
        console.log("hi")
        setOpenNavigation(prev => !prev);
    }

    const onPressOfficialSetting = () => {
        navigation.navigate("SettingTemplate")
    }
    const onPressAgentSetting = ()=>{
        navigation.navigate("AgentSettingTemp")

    }

    let element;

    if (type === "AgentTitleNavbar" || type === "CenterTitleNavbar") {
        element =
            <>
                <View style={{
                    width: useWindowDimensions().width,
                    height: 50,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    position: "relative",

                }}>
                    <TouchableOpacity activeOpacity={0.6}
                                      onPress={() => navigation.goBack()} style={{flex: 1}}>
                        <FontAwesome name="angle-left" size={30} color="black" style={{fontWeight: "600"}}/>
                    </TouchableOpacity>
                    <View style={{flex: 3, flexDirection: "row", justifyContent: "center", alignItems: "center",}}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "600",
                            textAlign: "center",
                            marginRight: 5
                        }}>{title}</Text>
                        <TouchableOpacity onPress={handleOpenNavigation}>
                            {
                                openNavigation ?
                                    <FontAwesome name="angle-up" size={30} color="black" style={{fontWeight: "600"}}/> :
                                    <FontAwesome name="angle-down" size={30} color="black" style={{fontWeight: "600"}}/>
                            }
                        </TouchableOpacity>

                    </View>
                    <View style={{flex: 1, alignItems: "flex-end"}}>
                        {type === "AgentTitleNavbar" ?
                            <CustomImageButton onPress={onPressAgentSetting} name={"gear"} color={"black"} size={30}/>
                            : <CustomImageButton onPress={onPressOfficialSetting} name={"gear"} color={"black"} size={30}/>

                        }
                    </View>

                </View>
                {
                    openNavigation ?
                        <>
                            <View style={{
                                width: Dimensions.get('window').width, height: "auto", backgroundColor: "white",
                                position: "absolute", top: 50, zIndex: 2
                            }}>
                                <Button
                                    title="Right button"
                                    onPress={() => {
                                        props.navigation.navigate("ScheduleAcceptTemplate")
                                    }}
                                />
                            </View>
                            <TouchableOpacity style={{position: "absolute", top: 50}}
                                              onPress={() => handleOpenNavigation()}>
                                <View style={{
                                    backgroundColor: `black`,
                                    opacity: 0.6,
                                    width: Dimensions.get("window").width,
                                    height: Dimensions.get("window").height
                                }}></View>
                            </TouchableOpacity>
                        </>
                        : null
                }
            </>
    } else if (type === "agentMain" || type === "centerMain") {
        element = <View style={{
            width: useWindowDimensions().width,
            height: 50,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingHorizontal: 20
        }}>

            {type === "agentMain" ? <View style={{marginRight: 20}}>
                <CustomImageModal name={"calendar-o"} color="black" size={30}
                                  modalContent={<CustomCalendar/>}/>
            </View> : null}

            {type === "agentMain" ?  <CustomImageButton onPress={onPressAgentSetting} name={"gear"} color={"black"} size={30}/> :
                <CustomImageButton onPress={onPressOfficialSetting} name={"gear"} color={"black"} size={30}/>}
        </View>
    } else {
        element =
            <View style={{
                width: useWindowDimensions().width,
                height: 50,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                position: "relative",

            }}>
                <TouchableOpacity activeOpacity={0.6}
                                  onPress={() => navigation.goBack()} style={{flex: 1}}>
                    <FontAwesome name="angle-left" size={30} color="black" style={{fontWeight: "600"}}/>
                </TouchableOpacity>
                <View style={{flex: 3, flexDirection: "row", justifyContent: "center", alignItems: "center",}}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "600",
                        textAlign: "center",
                        marginRight: 5
                    }}>{title}</Text>
                </View>
                <View style={{flex: 1}}>
                </View>

            </View>
    }


    return (
        // <View>
        //     <TouchableOpacity onPress={handleOpen} style={{flexDirection: "row", alignItems: "center"}}>
        //         <Text>열기</Text>
        //         {open ? <FontAwesome name="angle-down" size={24} color="black"/> :
        //             <FontAwesome name="angle-up" size={24} color="black"/>}
        //     </TouchableOpacity>
        //     <View style={open ? {display: "block"} : {display: "none"}}>
        //         <Button title="Go back" onPress={() => navigation.goBack()}/>
        //
        //     </View>
        //
        // </View>

        element
    );
}

export default CustomNavigation;

