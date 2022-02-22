import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Dimensions} from 'react-native';
import {TouchableOpacity} from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components/native";
import {Style} from "../../Style";


const screen = Dimensions.get("window");
const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledModalButton = styled.TouchableOpacity`
  /* Modal Button들의 모달창 내의 높이를 균일하게 하기 위하여 flex를 줌 */
  flex: 1;
  width: 320px;
  justify-content: center;
`;

// 모달창 내에서 버튼으로 활용되지 않는 타이틀 부분은 View 만듬
const StyledModalGradeWrapper = styled.View`
  flex: 1;
  width: 320px;
  justify-content: center;
`;


const StyledModalText = styled.Text`
  align-self: center;
  color: blue;
  font-size: 15px;
`;

//React Native 요소 중에서 CSS에서 hr 태그 같은 요소를 몰라서 View로 구현... 더 좋은 방법이 있다면 알려주세요
const HorizentalLine = styled.View`
  background-color: black;
  height: 1px;
  align-self: stretch;
`;

const StyledModalOpenButton = styled.TouchableOpacity`
  height: 50px;
  width: 60%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 1);
`;

const StyledModalOutputText = styled.Text`
  color: black;
  font-size: 30px;
`;

function CustomButton({width, height, backgroundColor, onPress, content, modal, modalContent}) {

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
    const send = () => {
        console.log("제출")
        setModalVisible(!modalVisible)
    }
    if (!modal) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
                <View style={{...styles.button, width: parseInt(width), height: parseInt(height), backgroundColor}}>
                    <Text style={styles.buttonText}>{content}</Text>
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <View style={{flex: 1}}>
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
                    <View style={styles.container}>
                        <StyledModalGradeWrapper>
                            <View style={styles.content}>{modalContent}</View>
                        </StyledModalGradeWrapper>
                        <View style={styles.customButton}>
                            <CustomButton backgroundColor={Style.color2} onPress={send} width="100" height="40"
                                          content={"제출"}/>
                        </View>

                    </View>
                </Modal>
            </View>
        )
    }


}

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        color: "white",
        textAlign: "center"

    },
    content: {
        display: "flex",
        justifyContent: "center",
        marginTop: 30
    },
    customButton: {
        display: "flex",
        paddingVertical: 7,
        marginBottom: 10
    },
    container: {
        flexDirection: "column",
        alignItems: "center",
        /* 모달창 크기 조절 */
        width: screen.width * 0.9,
        height: screen.height * 0.9,
        backgroundColor: "white",
        borderRadius: 10,
    }
})