import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import styles from "../template/theme";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import "moment/locale/th";
import * as Location from "expo-location";

export default RegisScreen = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [dateTime, setDateTime] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dateTime = new Date();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ height: "40%", backgroundColor: "#1B79DB" }}>
        <View style={[styles.rectangleParent]}>
          <View style={[styles.groupChild, styles.groupChildShadowBox]} />
          <View style={[styles.groupItem, styles.groupItemShadowBox]} />
          <View style={[styles.groupInner, styles.groupChildShadowBox]} />
          <View style={[styles.rectangleView, styles.groupItemShadowBox]} />
          <View style={[styles.groupChild1, styles.groupChildShadowBox]} />
        </View>
        <Text
          style={{
            fontSize: 36,
            color: "#fff",
            paddingLeft: "8%",
            paddingTop: "11%",
            fontWeight: "400",
            fontFamily: "NotoSansThaiSemiBold",
          }}
        >
          ลงทะเบียน
        </Text>
      </View>

      <ScrollView
        style={{
          marginTop: -20,
          backgroundColor: "#fff",
          width: "100%",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <KeyboardAvoidingView
          style={{ width: "90%", alignSelf: "center", padding: 10 }}
        >
          <View style={{ marginTop: 25, marginBottom: 30 }}>
            <Text style={{ fontSize: 18, fontFamily: "NotoSansThaiMedium" }}>
              <Ionicons name="person-outline" style={{ fontSize: 18 }} />{" "}
              ชื่อผู้ใช้
            </Text>
            <TextInput
              style={styles.inputLogin}
              placeholder="ชื่อผู้ใช้"
              onChangeText={(newText) => setUserName(newText)}
              // secureTextEntry
            />
          </View>

          <View style={{ marginBottom: 30 }}>
            <Text style={{ fontSize: 18, fontFamily: "NotoSansThaiMedium" }}>
              <Ionicons name="mail-outline" style={{ fontSize: 18 }} /> อีเมล
            </Text>

            <TextInput
              style={styles.inputLogin}
              placeholder="xxx@gmail.com"
              // secureTextEntry
              onChangeText={(newText) => setEmail(newText)}
              // right={<TextInput.Icon icon="eye"/>}
            />
          </View>
          <View style={{ marginBottom: 30 }}>
            <Text style={{ fontSize: 18, fontFamily: "NotoSansThaiMedium" }}>
              <Ionicons name="lock-closed-outline" style={{ fontSize: 18 }} />{" "}
              รหัสผ่าน
            </Text>
            <TextInput
              style={styles.inputLogin}
              placeholder="รหัสผ่านของคุณอย่างน้อย 8 ตัวอักษร"
              secureTextEntry
              onChangeText={(newText) => setPassword(newText)}
              right={<TextInput.Icon icon="eye" />}
            />
          </View>
          <View style={{ marginBottom: 50 }}>
            <Text style={{ fontSize: 18, fontFamily: "NotoSansThaiMedium" }}>
              <Ionicons name="lock-closed-outline" style={{ fontSize: 18 }} />{" "}
              ยืนยันรหัสผ่าน
            </Text>
            <TextInput
              style={styles.inputLogin}
              placeholder="กรุณาใส่รหัสผ่านยืนยัน"
              secureTextEntry
              onChangeText={(newText) => setConfirmPassword(newText)}
              right={<TextInput.Icon icon="eye" />}
            />
          </View>

          <TouchableOpacity
            style={[styles.btFinish, { backgroundColor: "#1B79DB" }]}
            onPress={() => {
              if (password === confirmPassword) {
                firebase.firestore().collection("user").add({
                  user_name: userName,
                  email: email,
                  password: password,
                  score: "0",
                  date_time: dateTime,
                });
              } else {
                Alert.alert("รหัสผ่านไม่ตรงกัน", "กรุณาลองใหม่อีกครั้ง", [
                  {
                    text: "ตกลง",
                    style: "cancel",
                  },
                ]);
              }
              navigation.navigate("โปรไฟล์");
            }}
          >
            <Text
              style={[
                styles.textFinish,
                { color: "#fff", fontFamily: "NotoSansThaiMedium" },
              ]}
            >
              ลงทะเบียน
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
