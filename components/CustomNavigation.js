import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Button, useWindowDimensions, Dimensions, StyleSheet} from 'react-native'
import {FontAwesome} from "@expo/vector-icons";
import CustomImageButton from "./atom/CustomImageButton";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import CustomImageModal from "./atom/CustomImageModal";
import CustomCalendar from "./atom/CustomCalendar";
import Modal from "react-native-modal";
import ConfirmationModal from "./ConfirmationModal";
import ConfirmationForm from "./organisms/ConfirmationForm";

function CustomNavigation({navigation, type, title, setLogin}) {
    const [openNavigation, setOpenNavigation] = useState(false);

    const handleOpenNavigation = () => {
        console.log("hi")
        setOpenNavigation(prev => !prev);
    }

    const onPressSetting = () => {
        let page = "setting"
        navigation.navigate("JoinInfoTemplate", page)
    }

    let element;

    if (type === "noGearTitleNavbar" || type === "titleNavbar") {
        element =
            <>
                <View style={{
                    width: useWindowDimensions().width,
                    height: 50,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    backgroundColor: "pink",
                    position: "relative",

                }}>
                    <TouchableOpacity style={{backgroundColor: "orange"}} activeOpacity={0.6}
                                      onPress={() => navigation.goBack()} style={{flex: 1}}>
                        <FontAwesome name="angle-left" size={30} color="black" style={{fontWeight: "600"}}/>
                    </TouchableOpacity>
                    <View style={{flex: 3, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
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
                        {type === "titleNavbar" ?
                            <CustomImageButton onPress={onPressSetting} name={"gear"} color={"black"} size={30}/>
                            : null
                        }
                    </View>

                </View>
                {/*{*/}
                {/*    openNavigation ?*/}
                {/*        <View style={{*/}
                {/*            width: Dimensions.get('window').width, height: "auto", backgroundColor: "yellow",*/}
                {/*            position: "absolute", top: 50*/}
                {/*        }}>*/}
                {/*            <Button*/}
                {/*                title="Right button"*/}
                {/*                onPress={() => {*/}
                {/*                    props.navigation.navigate("ScheduleAcceptTemplate")*/}
                {/*                }}*/}
                {/*            />*/}
                {/*        </View>*/}

                {/*        : null*/}
                {/*}*/}
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

            {type === "agentMain" ? <View style={{marginRight: 15}}>
                <CustomImageModal name={"calendar-o"} color="black" size={30}
                                  modalContent={<CustomCalendar/>}/>
            </View> : null}
            {type === "agentMain" ? null :
                <CustomImageButton onPress={onPressSetting} name={"gear"} color={"black"} size={30}/>
            }

            <CustomImageButton onPress={()=>{setLogin(null)}}name="sign-out" color={"black"} size={30} />
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

const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 10,
            paddingVertical: 20
        },

    }
)