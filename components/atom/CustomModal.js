import React, {useState} from 'react';
import Modal from "react-native-modal";
import {View, Text, Button} from "react-native";

function CustomModal(props) {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={{ flex: 1 }}>
            <Button title="Show modal" onPress={toggleModal} />
            <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1 }}>
                    <Text>Hello!</Text>
                    <Button title="Hide modal" onPress={toggleModal} />
                </View>
            </Modal>
        </View>
    );
}

export default CustomModal;