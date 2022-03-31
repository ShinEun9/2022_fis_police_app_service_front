import React, {useState} from 'react';
import {View, Text, TouchableOpacity,Dimensions, StyleSheet, Platform} from 'react-native'
import {FontAwesome} from "@expo/vector-icons";
import CustomImageButton from "../atom/CustomImageButton";
import CustomImageModal from "../atom/CustomImageModal";
import CustomCalendar from "../atom/CustomCalendar";
import NavBarItem from "../molecule/NavBarItem";


function CustomNavigation({props, type, title}) {
    const [openNavigation, setOpenNavigation] = useState(false);


    const handleOpenNavigation = () => {
        setOpenNavigation(prev => !prev);
    }

    const onPressOfficialSetting = () => {
        props.navigation.navigate("SettingTemplate")
    }
    const onPressAgentSetting = () => {
        props.navigation.navigate("AgentSettingTemp")

    }

    let element;

    if (type === "AgentTitleNavbar" || type === "CenterTitleNavbar") {
        element =
            <>
                <View style={styles.mainContainer}>
                    <TouchableOpacity activeOpacity={0.6}
                                      onPress={() => {
                                          props.navigation.goBack()
                                      }} style={{flex: 1}}>
                        <FontAwesome name="angle-left" size={30} color="black" style={{fontWeight: "600"}}/>
                    </TouchableOpacity>
                    {Platform.OS === "ios" ?
                        <TouchableOpacity onPress={handleOpenNavigation} style={styles.title} activeOpacity={0.9}>
                            <Text style={styles.titleText}>{title}</Text>
                            {
                                openNavigation ?
                                    <FontAwesome name="angle-up" size={30} color="black" style={{fontWeight: "600"}}/> :
                                    <FontAwesome name="angle-down" size={30} color="black" style={{fontWeight: "600"}}/>
                            }
                        </TouchableOpacity> :
                        <Text style={styles.titleText}>{title}</Text>}
                    <View style={{flex: 1, alignItems: "flex-end"}}>
                        <CustomImageButton
                            onPress={type === "AgentTitleNavbar" ? onPressAgentSetting : onPressOfficialSetting}
                            name={"gear"} color={"black"} size={30}/>
                    </View>

                </View>
                {

                    openNavigation ?
                        <>
                            <View style={styles.modal}>
                                {type === "AgentTitleNavbar" ?
                                    <>
                                        <TouchableOpacity onPress={() => {
                                            props.navigation.navigate("ScheduleAcceptTemplate")
                                        }} style={{
                                            marginTop: 20,
                                            width: Dimensions.get('window').width,
                                            alignItems: "center"
                                        }}>
                                            <NavBarItem name="calendar-check-o" title1={title} title2={"내 일정 수락하러 가기"}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            props.navigation.navigate("ScheduleCheckTemplate")
                                        }} style={{
                                            marginTop: 20,
                                            width: Dimensions.get('window').width,
                                            alignItems: "center"
                                        }}>
                                            <NavBarItem name="calendar" title1={title} title2={"확정된 일정 열람하러 가기"}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            props.navigation.navigate("MoneyCheckTemplate");
                                        }} style={{
                                            marginTop: 20,
                                            marginBottom: 20,
                                            width: Dimensions.get('window').width,
                                            alignItems: "center"
                                        }}>
                                            <NavBarItem name="dollar" title1={title} title2={"급여 확인하러 가기"}/>
                                        </TouchableOpacity>
                                    </>
                                    :
                                    <>
                                        <TouchableOpacity onPress={() => {
                                            props.navigation.navigate("ApplyCenterTemplate")
                                        }} style={{
                                            marginTop: 20,
                                            width: Dimensions.get('window').width,
                                            alignItems: "center"
                                        }}>
                                            <NavBarItem name="pencil-square-o" title1={title} title2={"지문 등록 신청하러 가기"}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            props.navigation.navigate("CheckReservationTemplate")
                                        }} style={{
                                            marginTop: 20,
                                            width: Dimensions.get('window').width,
                                            alignItems: "center"
                                        }}>
                                            <NavBarItem name="list-alt" title1={title} title2={"내 예약 확인하러 가기"}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            props.navigation.navigate("StartupSupportTemplate");
                                        }} style={{
                                            marginTop: 20,
                                            width: Dimensions.get('window').width,
                                            alignItems: "center"
                                        }}>
                                            <NavBarItem name="lightbulb-o" title1={title} title2={"창업지원 서비스"}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            props.navigation.navigate("OffenderAlertTemplate")
                                        }} style={{
                                            marginTop: 20,
                                            marginBottom: 20,
                                            width: Dimensions.get('window').width,
                                            alignItems: "center"
                                        }}>
                                            <NavBarItem name="id-badge" title1={title} title2={"성범죄자 알리미"}/>
                                        </TouchableOpacity>
                                    </>

                                }
                            </View>
                            <TouchableOpacity style={styles.backdrop} onPress={() => handleOpenNavigation()}>
                            </TouchableOpacity>
                        </>
                        : null
                }
            </>
    } else if (type === "agentMain" || type === "centerMain") {
        element = <View style={{
            ...styles.mainContainer, justifyContent: "flex-end"
        }}>
            {type === "agentMain" ?
                <View style={{marginRight: 20}}>
                    <CustomImageModal name={"calendar-o"} color="black" size={30}
                                      modalContent={<CustomCalendar props={props}/>}/>
                </View>
                : null
            }
            <CustomImageButton onPress={type === "agentMain" ? onPressAgentSetting : onPressOfficialSetting}
                               name={"gear"} color={"black"} size={30}/>
        </View>
    } else if (type === "joinSettingNavbar") {
        element =
            <View style={styles.mainContainer}>
                <TouchableOpacity activeOpacity={0.6}
                                  onPress={() => props.navigation.goBack()} style={{flex: 1}}>
                    <FontAwesome name="angle-left" size={30} color="black"
                                 style={{fontWeight: "600"}}/>
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <View style={{flex: 1}}>
                </View>
            </View>
    }


    return (
        element
    );
}

export default CustomNavigation;

const styles = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get("window").width,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        position: "relative",
    },
    title: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 5
    },
    titleText: {
        fontSize: Dimensions.get("window").width > 360 ? 21 : 16,
        fontWeight: "600",
        textAlign: "center",
        marginRight: 5
    },
    modal: {
        width: Dimensions.get('window').width,
        height: "auto",
        backgroundColor: "white",
        position: "absolute",
        top: Platform.OS === "ios" ? 50 : 80,
        zIndex: 2,
        alignItems: "center"
    },
    navBarItem: {
        flexDirection: "row",
        alignItems: "center",
        width: Dimensions.get('window').width * 0.6,
    },
    backdrop: {
        backgroundColor: `black`,
        opacity: 0.6,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        position: "absolute",
        top: Platform.OS === "ios" ? 50 : 80,
    }
})