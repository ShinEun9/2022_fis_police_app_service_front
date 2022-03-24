import React from 'react';
import {Image, ScrollView, Text, View} from "react-native";
import CustomMap from "../molecule/CustomMap";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";
import Modal from "react-native-modal";
import ConfirmationModal from "../organisms/ConfirmationModal";

function MapTemplate(props) {
    return (
        <>
            <View style={styles.map}>
                <CustomMap c_latitude={c_latitude} c_longitude={c_longitude} c_name={centerName}/>
            </View>
            <View style={styles.info}>
                <ScrollView horizontal pagingEnabled>

                    {agentList.map((data, index) => {
                        return <View key={index}>
                            <View style={{...styles.agent, paddingVertical: 3}}>
                                <Image
                                    style={styles.image}
                                    source={{uri: data.a_picture}}/>
                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>현장요원 이름 : {data.a_name}</Text>
                                    <Text style={styles.text}>전화번호 : {data.a_ph}</Text>
                                </View>
                            </View>
                            <ScrollView pagingEnabled>
                                <View style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingVertical: 3,
                                    width: screen.width
                                }}>
                                    <Text style={{
                                        ...styles.text,
                                        fontWeight: "700"
                                    }}>{data.late_comment}</Text>
                                </View>
                            </ScrollView>

                        </View>
                    })}

                </ScrollView>
                <View style={{alignItems: 'center', marginTop: 7}}>
                    <CustomButton keyValue={nowSchedule} width={150} height={40}
                                  backgroundColor={Style.color2}
                                  onPress={onPress} content={"확인서 열람"}/>
                </View>

                <Modal
                    isVisible={modalVisible}
                    useNativeDriver={true}
                    hideModalContentWhileAnimating={true}
                    onBackdropPress={() => {
                        setModalVisible(false)
                    }}
                    style={{flex: 1, justifyContent: "center", alignItems: "center",}}
                >
                    <View style={{
                        ...styles.modalContainer,
                        width: screen.width * 0.95,
                        height: "auto"
                    }}>
                        <ConfirmationModal setModalVisible={setModalVisible}
                                           schedule_id={selectedSchedule}
                                           agentList={agentList}/>


                    </View>
                </Modal>
            </View>
        </>
    );
}

export default MapTemplate;