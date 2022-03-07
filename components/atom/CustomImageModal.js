import React, {useState} from 'react';
import Modal from "react-native-modal";
import {View, StyleSheet, Dimensions, TouchableOpacity, Text, ScrollView} from "react-native";
import {Style} from "../../Style";
import styled from "styled-components/native";
import CustomButton from "./CustomButton";
import {FontAwesome} from "@expo/vector-icons";
import CustomImageButton from "./CustomImageButton";


const StyledModalGradeWrapper = styled.View`
  flex: 1;
  width: 320px;
  justify-content: center;
`;
const screen = Dimensions.get("window");


function CustomImageModal({modalContent, onPress, name, size, color, content}) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    const send = () => {
        console.log("끄기")
        setIsModalVisible(!isModalVisible)
    }
    return (
        <View>
            <TouchableOpacity onPress={toggleModal} activeOpacity={0.7}>
                <FontAwesome name={name} size={size} color={color}></FontAwesome>
            </TouchableOpacity>
            <Modal
                //isVisible Props에 State 값을 물려주어 On/off control
                isVisible={isModalVisible}
                //아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                onBackdropPress={() => {
                    setIsModalVisible(false)
                }}
                style={{flex: 1, justifyContent: "center", alignItems: "center"}}
            >

                <View style={styles.container}>
                    <View style={styles.customButton}>
                        <CustomImageButton name={"close"} size={30} onPress={send} color={"gray"}/>
                    </View>
                    <StyledModalGradeWrapper>
                        <View style={styles.content}>
                            <View style={styles.mainContainer}>
                                <ScrollView style={{width: "100%", marginBottom: 20,}}
                                            contentContainerStyle={{alignItems: "center"}}>
                                    {/*{content.map((data) => {*/}
                                    {/*    return <View style={styles.container2}>*/}
                                    {/*        <Text>{data.visit_date}</Text>*/}
                                    {/*        <Text>신규 {data.new_child} 기존 {data.old_child}</Text>*/}
                                    {/*    </View>*/}
                                    {/*})}*/}
                                </ScrollView>
                            </View>
                        </View>
                    </StyledModalGradeWrapper>


                </View>
            </Modal>
        </View>
    );
}

export default CustomImageModal;

const styles = StyleSheet.create({
        customButton: {
            paddingVertical: 10,
            marginLeft: 300
        },
        container: {
            flexDirection: "column",
            alignItems: "center",
            /* 모달창 크기 조절 */
            width: screen.width * 0.9,
            height: screen.height * 0.55,
            backgroundColor: "white",
            borderRadius: 10,
        },
        button: {
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
        },
        buttonText: {
            fontSize: 20,
            color: "white"
        },
        mainContainer: {
            // backgroundColor: Style.color3,
            width: Dimensions.get("window").width * 0.83,
            height: Dimensions.get("window").height * 0.49,
            alignItems: "center",
            paddingHorizontal: 0,
            paddingBottom: 20,
            paddingTop: 30,
        },
        container2: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 27,
            backgroundColor: Style.color5,
            borderRadius: 20,
            width: "80%",
            height: 50,
            marginBottom: 20
        }
    }
)