import * as React from "react";
import styles from "../template/theme";
import {
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function CreateMenuShareScreen() {
  const navigation = useNavigation();
  const { modalVisible, modal_dataID } = useSelector(
    (state) => state.userReducer
  );
  const [number, onChangeNumber] = React.useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const data = [
    { label: "ทั่วไป", value: "0" },
    { label: "น้ำหนัก", value: "1" },
    { label: "ปริมาณ", value: "2" },
  ];
  const [value, setValue] = useState(null);
  const [units, setUnits] = useState("");

  var Units = () => {
    if (value === "0") {
      return (
        <View style={styles.unitSetShare}>
          {/* <Text style={styles.unit}>หน่วย</Text> */}
          <Text style={styles.unit}>เลือกหน่วย</Text>
          <ScrollView>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "ขวด" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ขวด" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ขวด")}
              >
                <Text style={styles.textUnit}>ขวด</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "แพ็ค" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "แพ็ค" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("แพ็ค")}
              >
                <Text style={styles.textUnit}>แพ็ค</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "ถุง" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ถุง" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ถุง")}
              >
                <Text style={styles.textUnit}>ถุง</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "ชุด" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ชุด" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ชุด")}
              >
                <Text style={styles.textUnit}>ชุด</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "ถาด" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ถาด" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ถาด")}
              >
                <Text style={styles.textUnit}>ถาด</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "ชิ้น" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ชิ้น" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ชิ้น")}
              >
                <Text style={styles.textUnit}>ชิ้น</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "ตัว" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ตัว" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ตัว")}
              >
                <Text style={styles.textUnit}>ตัว</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "กำ" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "กำ" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("กำ")}
              >
                <Text style={styles.textUnit}>กำ</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "เข่ง" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "เข่ง" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("เข่ง")}
              >
                <Text style={styles.textUnit}>เข่ง</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "ตะกร้า" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ตะกร้า" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ตะกร้า")}
              >
                <Text style={styles.textUnit}>ตะกร้า</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "จาน" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "จาน" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("จาน")}
              >
                <Text style={styles.textUnit}>จาน</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "กล่อง" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "กล่อง" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("กล่อง")}
              >
                <Text style={styles.textUnit}>กล่อง</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "ลัง" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ลัง" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ลัง")}
              >
                <Text style={styles.textUnit}>ลัง</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "ห่อ" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ห่อ" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ห่อ")}
              >
                <Text style={styles.textUnit}>ห่อ</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "แก้ว" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "แก้ว" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("แก้ว")}
              >
                <Text style={styles.textUnit}>แก้ว</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "ใบ" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ใบ" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ใบ")}
              >
                <Text style={styles.textUnit}>ใบ</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "หวี" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "หวี" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("หวี")}
              >
                <Text style={styles.textUnit}>หวี</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "ลูก" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ลูก" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ลูก")}
              >
                <Text style={styles.textUnit}>ลูก</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "หัว" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "หัว" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("หัว")}
              >
                <Text style={styles.textUnit}>หัว</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "ฝัก" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "ฝัก" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("ฝัก")}
              >
                <Text style={styles.textUnit}>ฝัก</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
                  { backgroundColor: units === "หลอด" ? "#BAF0F9" : "#fff" },
                  { borderColor: units === "หลอด" ? "#fff" : "#c2c2c2" },
                ]}
                onPress={() => setUnits("หลอด")}
              >
                <Text style={styles.textUnit}>หลอด</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btUnitShare,
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
        <View style={styles.unitSetShare}>
          <Text style={styles.unit}>เลือกหน่วย</Text>
          {/* <Text style={styles.unit}>หน่วย</Text> */}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Pressable
              style={[
                styles.btUnitShare2,
                { backgroundColor: units === "กรัม" ? "#BAF0F9" : "#fff" },
                { borderColor: units === "กรัม" ? "#fff" : "#c2c2c2" },
              ]}
              onPress={() => setUnits("กรัม")}
            >
              <Text style={styles.textUnit}>กรัม</Text>
            </Pressable>
            <Pressable
              style={[
                styles.btUnitShare2,
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
        <View style={styles.unitSetShare}>
          <Text style={styles.unit}>เลือกหน่วย</Text>
          {/* <Text style={styles.unit}>หน่วย</Text> */}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Pressable
              style={[
                styles.btUnitShare2,
                { backgroundColor: units === "มิลลิลิตร" ? "#BAF0F9" : "#fff" },
                { borderColor: units === "มิลลิลิตร" ? "#fff" : "#c2c2c2" },
              ]}
              onPress={() => setUnits("มิลลิลิตร")}
            >
              <Text style={styles.textUnit}>มิลลิลิตร</Text>
            </Pressable>
            <Pressable
              style={[
                styles.btUnitShare2,
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

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btCamera}
          onPress={() => {
            // dispatch(setModalVisible({state: false, props: ""}));
            navigation.navigate("ถ่ายภาพ");
          }}
        >
          <Ionicons name="camera-outline" style={{ fontSize: 50 }} />
        </TouchableOpacity>
        <TextInput
          placeholder="ชื่อรายการ"
          placeholderTextColor="#979797"
          style={styles.inputCreateSh}
        />

        <View style={styles.detailMenu}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.putAmount}>ระบุปริมาณ</Text>
            <Text style={[styles.putAmount, { paddingHorizontal: 140 }]}>
              หน่วย
            </Text>
          </View>
          <View style={styles.popup}>
            <TextInput
              style={[styles.input_popup, { width: 190, borderWidth: 0.5 }]}
              onChangeText={onChangeNumber}
              value={number}
              keyboardType="numeric"
            />
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && { borderColor: "blue" },
                { marginLeft: 15, width: 140 },
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
        </View>

        <View style={styles.summary}>
          {/* <View style={styles.calendar}> */}
          {/* <Ionicons name='ios-calendar-sharp'
                      style={{
                        fontSize: 25, 
                        padding:5,
                        marginLeft:5
                        }}
                    /> */}
          {/* <Text style={styles.dateEXP}>วันหมดอายุ: </Text>
                  </View> */}
          <TouchableOpacity style={styles.btFinish}>
            <Text style={styles.textFinish}>สร้าง</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboard>
  );
}
export default CreateMenuShareScreen;
