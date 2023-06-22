import * as React from "react";
import styles from "../template/theme";
import {
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { setModalVisible, setMenuItem, isUpdate } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import { useState, useEffect, useCallback } from "react";
import firebase from "../Database/config";
import { useFonts } from "expo-font";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function ModalViewItemEdit({ props }) {
  const navigation = useNavigation();
  const { modalVisible, modal_dataID, item } = useSelector(
    (state) => state.userReducer
  );
  const [num, setNum] = useState("");
  const [price, setPrice] = useState("");
  const [open, setOpen] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    { label: "ทั่วไป", value: "0" },
    { label: "น้ำหนัก", value: "1" },
    { label: "ปริมาณ", value: "2" },
  ];
  const [value, setValue] = useState("1");
  const [units, setUnits] = useState("กรัม");
  const [propData, setPropData] = useState({
    item_name: "",
    item_img: "",
  });

  var Units = () => {
    if (value === "0") {
      return (
        <View style={[styles.unitSet]}>
          {/* <Text style={styles.unit}>หน่วย</Text> */}
          <ScrollView>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "ขวด" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ขวด" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ขวด")}
              >
                <Text style={styles.textUnit}>ขวด</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "แพ็ค" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "แพ็ค" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("แพ็ค")}
              >
                <Text style={styles.textUnit}>แพ็ค</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "ถุง" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ถุง" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ถุง")}
              >
                <Text style={styles.textUnit}>ถุง</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "ชุด" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ชุด" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ชุด")}
              >
                <Text style={styles.textUnit}>ชุด</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "ถาด" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ถาด" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ถาด")}
              >
                <Text style={styles.textUnit}>ถาด</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "ชิ้น" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ชิ้น" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ชิ้น")}
              >
                <Text style={styles.textUnit}>ชิ้น</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "ตัว" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ตัว" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ตัว")}
              >
                <Text style={styles.textUnit}>ตัว</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "กำ" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "กำ" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("กำ")}
              >
                <Text style={styles.textUnit}>กำ</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "เข่ง" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "เข่ง" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("เข่ง")}
              >
                <Text style={styles.textUnit}>เข่ง</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "ตะกร้า" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ตะกร้า" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ตะกร้า")}
              >
                <Text style={styles.textUnit}>ตะกร้า</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "จาน" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "จาน" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("จาน")}
              >
                <Text style={styles.textUnit}>จาน</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "กล่อง" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "กล่อง" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("กล่อง")}
              >
                <Text style={styles.textUnit}>กล่อง</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "ลัง" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ลัง" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ลัง")}
              >
                <Text style={styles.textUnit}>ลัง</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "ห่อ" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ห่อ" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ห่อ")}
              >
                <Text style={styles.textUnit}>ห่อ</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "แก้ว" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "แก้ว" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("แก้ว")}
              >
                <Text style={styles.textUnit}>แก้ว</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "ใบ" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ใบ" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ใบ")}
              >
                <Text style={styles.textUnit}>ใบ</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "หวี" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "หวี" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("หวี")}
              >
                <Text style={styles.textUnit}>หวี</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "ลูก" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ลูก" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ลูก")}
              >
                <Text style={styles.textUnit}>ลูก</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "หัว" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "หัว" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("หัว")}
              >
                <Text style={styles.textUnit}>หัว</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "ฝัก" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ฝัก" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ฝัก")}
              >
                <Text style={styles.textUnit}>ฝัก</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "หลอด" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "หลอด" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("หลอด")}
              >
                <Text style={styles.textUnit}>หลอด</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnit,
                  { backgroundColor: units === "กระป๋อง" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "กระป๋อง" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("กระป๋อง")}
              >
                <Text style={styles.textUnit}>กระป๋อง</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      );
    } else if (value === "1") {
      return (
        <View style={styles.unitSet}>
          {/* <Text style={styles.unit}>หน่วย</Text> */}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Pressable
              style={[
                styles.btUnit2,
                { backgroundColor: units === "กรัม" ? "#BAF0F9" : "#fff" },
                { borderColor: units === "กรัม" ? "#fff" : "#c2c2c2" },
              ]}
              onPress={() => setUnits("กรัม")}
            >
              <Text style={styles.textUnit}>กรัม</Text>
            </Pressable>
            <Pressable
              style={[
                styles.btUnit2,
                { backgroundColor: units === "กิโลกรัม" ? "#BAF0F9" : "#fff" },
                { borderColor: units === "กิโลกรัม" ? "#fff" : "#c2c2c2" },
              ]}
              onPress={() => setUnits("กิโลกรัม")}
            >
              <Text style={styles.textUnit}>กิโลกรัม</Text>
            </Pressable>
          </View>
        </View>
      );
    } else if (value === "2") {
      return (
        <View style={styles.unitSet}>
          {/* <Text style={styles.unit}>หน่วย</Text> */}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Pressable
              style={[
                styles.btUnit2,
                { backgroundColor: units === "มิลลิลิตร" ? "#BAF0F9" : "#fff" },
                { borderColor: units === "มิลลิลิตร" ? "#fff" : "#c2c2c2" },
              ]}
              onPress={() => setUnits("มิลลิลิตร")}
            >
              <Text style={styles.textUnit}>มิลลิลิตร</Text>
            </Pressable>
            <Pressable
              style={[
                styles.btUnit2,
                { backgroundColor: units === "ลิตร" ? "#BAF0F9" : "#fff" },
                { borderColor: units === "ลิตร" ? "#fff" : "#c2c2c2" },
              ]}
              onPress={() => setUnits("ลิตร")}
            >
              <Text style={styles.textUnit}>ลิตร</Text>
            </Pressable>
          </View>
        </View>
      );
    }
  };

  useEffect(() => {
    if (open !== modalVisible.props.id) {
      if (modalVisible.props.id) {
        setUnits("กรัม");
        setNum(modalVisible.props.category_num + "");
        setPrice(modalVisible.props.category_price + "");
        if (modalVisible.props.units !== "กรัม") {
          setUnits("กิโลกรัม");
        }
        setOpen(modalVisible.props.id);
      }
    }
  });

  const dispatch = useDispatch();
  const modal = () => {
    var c = {};
    var inpT = {};
    if (num && price) {
      c = { backgroundColor: "#2196F3", borderWidth: 0 };
      inpT = { color: "#fff" };
    }

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.state}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          dispatch(setModalVisible({ state: false, props: "" }));
        }}
      >
        <DismissKeyboard>
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.centeredViewItem}
          >
            <View style={styles.modalViewItem}>
              <Image
                style={styles.picMenu}
                source={modalVisible.props.category_img}
              />
              <Text style={[styles.modalText, { paddingTop: 40 }]}>
                {modalVisible.props.category_name}
              </Text>
              <Text style={styles.putNum}>ระบุปริมาณ</Text>
              <View style={[styles.popup]}>
                <TextInput
                  style={styles.input_popup}
                  placeholder="1"
                  placeholderTextColor={"#c2c2c2"}
                  keyboardType="numeric"
                  onChangeText={(newText) => setNum(newText)}
                  value={num}
                />
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && { borderColor: "#2196F3" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={data}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "เลือกหน่วย" : "..."}
                  value={value}
                  onFocus={() => {
                    setIsFocus(true);
                  }}
                  onBlur={() => {
                    setIsFocus(false);
                    console.log("test");
                  }}
                  onChange={(item) => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
              <Text style={[styles.unit, { marginTop: -10 }]}>เลือกหน่วย</Text>
              <Units />

              <View style={{ width: "100%" }}>
                <Text style={styles.putNumlist}>ราคา</Text>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={styles.input_popup}
                    placeholder="0.00"
                    placeholderTextColor={"#c2c2c2"}
                    keyboardType="numeric"
                    onChangeText={(newText) => setPrice(newText)}
                    value={price}
                  />
                  <Text style={[styles.putNumlist, { marginTop: 30 }]}>
                    บาท/กิโลกรัม/หน่วย
                  </Text>
                </View>
              </View>

              <View style={styles.btItem}>
                <Pressable
                  style={[styles.buttonmd_Item, styles.buttonClose, c]}
                  onPress={() => {
                    setValue(null);
                    dispatch(setModalVisible({ state: false, props: "" }));
                    dispatch(setMenuItem({ id: modal_dataID, isPut: true }));
                    //อัพเดทค่าหากมีการแก้ไข
                    firebase
                      .firestore()
                      .collection("basket")
                      .doc(modalVisible.props.id)
                      .update({
                        category_num: num,
                        category_price: price,
                        category_unit: units,
                      });
                    dispatch(isUpdate(false));
                  }}
                >
                  <Text style={[styles.textStyle, inpT]}>บันทึก</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.buttonmd_Item,
                    styles.buttonClose,
                    {
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "#979797",
                    },
                  ]}
                  onPress={() => {
                    dispatch(setModalVisible({ state: false, props: "" }));
                    dispatch(setMenuItem({ id: modal_dataID, isPut: false }));
                  }}
                >
                  <Text style={[styles.textStyle, { color: "#000" }]}>
                    ยกเลิก
                  </Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </DismissKeyboard>
      </Modal>
    );
  };
  return modal();
}

export default ModalViewItemEdit;
