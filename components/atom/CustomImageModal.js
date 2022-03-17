import React, {useState} from 'react';
import Modal from "react-native-modal";
import {View, StyleSheet, Dimensions, TouchableOpacity, Text, ScrollView} from "react-native";
import {Style} from "../../Style";
import styled from "styled-components/native";
import CustomButton from "./CustomButton";
import {FontAwesome} from "@expo/vector-icons";
import CustomImageButton from "./CustomImageButton";


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
            >

                <View style={styles.container}>
                    <View style={styles.customButton}>
                        <CustomImageButton name={"close"} size={30} onPress={send} color={"gray"}/>
                    </View>
                    {modalContent}
                </View>
            </Modal>
        </View>
    );
}

export default CustomImageModal;

const styles = StyleSheet.create({
        customButton: {
            alignSelf: "flex-end",
            marginRight: 10
        },
        container: {
            alignItems: "center",
            /* 모달창 크기 조절 */
            width: screen.width * 0.9,
            height: "auto",
            paddingTop: 10,
            paddingBottom: 20,
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
        content: {
            height: 400,
            width: 300,
        }

    }
)