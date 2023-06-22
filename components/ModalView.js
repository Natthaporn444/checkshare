import * as React from "react";
import styles from "../template/theme";
import {
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { setModalVisible, addDataF, isUpdate } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import uuid from "react-native-uuid";
import { useState, useEffect, useCallback } from "react";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function ModalView({ props }) {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const { modalVisible, modal_dataID, login } = useSelector(
    (state) => state.userReducer
  );

  //HomeScreen
  const dispatch = useDispatch();
  //เปลี่ยนสีถ้ามีการใส่ข้อมูลแล้ว
  const modal = () => {
    var c = {};
    var inpT = {};
    if (text) {
      c = { backgroundColor: "#1B79DB", borderWidth: 0 };
      inpT = { color: "#fff" };
    }
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.state}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          dispatch(setModalVisible({ state: false }));
        }}
      >
        <DismissKeyboard>
          <KeyboardAvoidingView behavior="padding" style={styles.centeredView}>
            <View style={[styles.modalView]}>
              <Text style={[styles.modalText]}>
                <Ionicons name="create-outline" style={{ fontSize: 24 }} />
                สร้างรายการ
              </Text>
              <TextInput
                style={[styles.inputPopup2]}
                placeholder="ตั้งชื่อรายการ (เช่น งานเลี้ยงวันเกิด)"
                placeholderTextColor={"#c2c2c2"}
                onChangeText={(newText) => setText(newText)}
              />

              <View style={styles.btCreatlist}>
                <Pressable
                  style={[styles.button, styles.buttonClose, c]}
                  onPress={() => {
                    if (text) {
                      dispatch(
                        //เก็บข้อมูลลงดาต้าเบส
                        addDataF({
                          topic: "menu_list",
                          data: {
                            menuList_id: uuid.v4(),
                            menuList_name: text,
                            user_id: login.user_id,
                          },
                        })
                      ),
                        dispatch(isUpdate(false)),
                        dispatch(setModalVisible({ state: false, props: "" }));
                      setText("");
                      navigation.navigate("เลือกหมวดหมู่");
                    } else {
                      Alert.alert(
                        "คุณยังไม่ได้ตั้งชื่อรายการ",
                        "กรุณาตั้งชื่อ",
                        [
                          {
                            text: "ตกลง",
                            style: "cancel",
                          },
                        ]
                      );
                    }
                  }}
                >
                  <Text style={[styles.textStyle, inpT]}>
                    <Ionicons name="save-outline" style={{ fontSize: 24 }} />{" "}
                    บันทึก
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    { backgroundColor: "#DADADA" },
                  ]}
                  onPress={() => {
                    dispatch(setModalVisible({ state: false, props: "" }));
                  }}
                >
                  <Text style={[styles.textStyleCel, { color: "#000" }]}>
                    ยกเลิก
                  </Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
          {/* </View> */}
        </DismissKeyboard>
      </Modal>
    );
  };
  return modal();
}

export default ModalView;
