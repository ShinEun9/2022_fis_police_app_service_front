import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Dimensions} from 'react-native';
import {TouchableOpacity} from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components/native";


const screen = Dimensions.get("window");
const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledModalContainer = styled.View`
  flex-direction: column;
  align-items: center;
  /* 모달창 크기 조절 */
  width: 320px;
  height: 220px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
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

const StyledModalGradeText = styled.Text`
  align-self: center;
  font-size: 15px;
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

function CustomButton({width, height, backgroundColor, onPress, content, modal}) {

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

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
                    onBackdropPress={()=>{setModalVisible(false)}}
                    style={{flex: 1, justifyContent: "center", alignItems: "center"}}
                >
                    <StyledModalContainer>
                        <StyledModalGradeWrapper>
                            <StyledModalGradeText>선택지</StyledModalGradeText>
                        </StyledModalGradeWrapper>
                        <StyledModalButton
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <Text style={{ alignSelf: "center" }}>닫기</Text>
                        </StyledModalButton>
                    </StyledModalContainer>
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
        fontSize: 20,
        color: "white"
    }
})