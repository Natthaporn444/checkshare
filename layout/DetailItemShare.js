import * as React from "react";
import styles from "../template/theme";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import firebase from "../Database/config";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function DetailItemShare({ navigate, route }) {
  const navigation = useNavigation();
  const [number, onChangeNumber] = React.useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const { item_name } = useSelector((state) => state.userReducer);
  const data = [
    { label: "ทั่วไป", value: "0" },
    { label: "น้ำหนัก", value: "1" },
    { label: "ปริมาณ", value: "2" },
  ];
  const [value, setValue] = useState(null);
  const [units, setUnits] = useState("");
  const [test, setTest] = useState("");
  const [num, setNum] = useState("");
  var Units = () => {
    if (value === "0") {
      return (
        <View style={[styles.unitSet, { width: "90%" }]}>
          <Text style={styles.unit}>เลือกหน่วย</Text>
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
        <View style={[styles.unitSet, { width: "90%" }]}>
          <Text style={styles.unit}>เลือกหน่วย</Text>
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
        <View style={[styles.unitSet, { width: "90%" }]}>
          <Text style={styles.unit}>เลือกหน่วย</Text>
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
  console.log(item_name);
  const modal = () => {
    var bgNoInput = {};
    var colorNoInput = {};
    if (num) {
      bgNoInput = { backgroundColor: "#1B79DB", borderWidth: 0 };
      colorNoInput = { color: "#fff" };
    }

    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <View style={{ marginBottom: 40 }}>
            <Pressable
              style={[styles.listItem, { backgroundColor: "#1B79DB" }]}
            >
              <View style={styles.listItemView}>
                <View>
                  <Image
                    style={[styles.listItemImg, { marginLeft: 10 }]}
                    source={route.params.props.category_img}
                  />
                </View>
                <View>
                  <Text style={[styles.ItemShareText]}>
                    {route.params.props.category_name}
                  </Text>
                  <Text style={{ color: "#fff", marginLeft: 10 }}>
                    {route.params.props.category_num}{" "}
                    {route.params.props.category_unit}
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>

          <KeyboardAvoidingView
            behavior="padding"
            style={{ alignItems: "center" }}
          >
            <SafeAreaView style={{ alignItems: "center" }}>
              <Text style={[styles.putNum]}>ระบุปริมาณที่ต้องการแบ่งปัน</Text>
              <View style={styles.popup}>
                <TextInput
                  style={styles.input_popup}
                  placeholder="1"
                  placeholderTextColor={"#c2c2c2"}
                  keyboardType="numeric"
                  onChangeText={(newText) => setNum(newText)}
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
                  fontFamily="NotoSansThaiMedium"
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
              <Units />
            </SafeAreaView>
          </KeyboardAvoidingView>

          <View style={styles.summary}>
            <TouchableOpacity
              style={[styles.btFinish, bgNoInput]}
              onPress={() => {
                if (route.params.props.category_num < num) {
                  Alert.alert(
                    "ปริมาณที่ต้องการแบ่งปันไม่เพียงพอ",
                    "กรุณาระบุปริมาณใหม่",
                    [
                      {
                        text: "ตกลง",
                        // onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                    ]
                  );
                } else {
                  navigation.navigate("รายละเอียด", {
                    //ส่งข้อมูลที่มีก่อนหน้า
                    props: route.params.props,
                    num: num,
                  });
                }
              }}
            >
              <Text style={[styles.textFinish, colorNoInput]}>ต่อไป</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DismissKeyboard>
    );
  };
  return modal();
}
export default DetailItemShare;
