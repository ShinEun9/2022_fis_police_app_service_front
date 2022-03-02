import React, {useState} from 'react';
import Modal from "react-native-modal";
import {View, StyleSheet, Dimensions, TouchableOpacity, Text} from "react-native";
import {Style} from "../../Style";
import styled from "styled-components/native";
import CustomButton from "./CustomButton";


const StyledModalGradeWrapper = styled.View`

  flex: 1
  width: 350px;
  justify-content: center;
`;
const screen = Dimensions.get("window");


function CustomModal({
                         modalContent,
                         content,
                         width,
                         height,
                         backgroundColor,
                         modalWidth,
                         modalHeight,
                         modalButtonContent
                     }) {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
    const send = () => {
        console.log("제출")
        setModalVisible(!modalVisible)
    }

    return (
        <View>
            <TouchableOpacity onPress={toggleModal} activeOpacity={0.9}>
                <View style={{...styles.button, width: parseInt(width), height: parseInt(height), backgroundColor}}>
                    <Text style={styles.buttonText}>{content}</Text>
                </View>
            </TouchableOpacity>
            <Modal
                //isVisible Props에 State 값을 물려주어 On/off control
                isVisible={modalVisible}
                //아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                onBackdropPress={() => {
                    setModalVisible(false)
                }}
                style={{flex: 1, justifyContent: "center", alignItems: "center"}}
            >
                <View style={{...styles.container, width: modalWidth, height: modalHeight}}>
                    <StyledModalGradeWrapper>
                        <View style={styles.content}>{modalContent}</View>
                    </StyledModalGradeWrapper>
                    <View style={styles.customButton}>
                        <CustomButton backgroundColor={Style.color2} onPress={send} width="100" height="40"
                                      content={modalButtonContent}/>
                    </View>

                </View>
            </Modal>
        </View>
    );
}

export default CustomModal;


const styles = StyleSheet.create({

        content: {
            justifyContent: "center",
            marginTop: 40

        },
        customButton: {
            display: "flex",
            paddingVertical: 7,
            marginBottom: 15
        },
        container: {
            flexDirection: "column",
            alignItems: "center",
            /* 모달창 크기 조절 */
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
    }
)