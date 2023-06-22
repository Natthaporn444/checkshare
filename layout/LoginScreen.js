import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import styles from "../template/theme";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SocialIcon } from "react-native-elements";
import firebase from "firebase/compat";
import { setLogin, isUpdate } from "../redux/action";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Location from "expo-location";
import ProfileScreen from "./ProfileScreen";

export default LoginScreen = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useSelector((state) => state.userReducer);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const setUser = async () => {
    const dbRef_user = await firebase.firestore().collection("user");
    const snapshot_user = await dbRef_user.get();
    let location = await Location.getCurrentPositionAsync({});
    snapshot_user.forEach((doc) => {
      if (doc.data().user_name === userName) {
        if (doc.data().password === password) {
          Alert.alert("เข้าสู่ระบบสำเร็จ", "", [
            {
              text: "ตกลง",
              style: "cancel",
            },
          ]);
          console.log("Login Success");
          dispatch(
            setLogin({
              user_name: doc.data().user_name,
              state: true,
              user_id: doc.id,
              user_avatar: doc.data().user_avatar,
              location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              token: doc.data().token,
              score: doc.data().score,
              scoreList: doc.data().scoreList,
            })
          );
          dispatch(isUpdate(false));
        } else {
          Alert.alert("รหัสผ่านไม่ถูกต้อง", "กรุณาลองใหม่อีกครั้ง", [
            {
              text: "ตกลง",
              style: "cancel",
            },
          ]);
          console.log("Invalid password");
        }
      }
    });
  };

  if (!login.state) {
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
            เข้าสู่ระบบ
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
          <View style={{ width: "90%", alignSelf: "center", padding: 10 }}>
            <View style={{ marginTop: 25 }}>
              <Text style={{ fontSize: 18, fontFamily: "NotoSansThaiMedium" }}>
                <Ionicons name="person-outline" style={{ fontSize: 18 }} />{" "}
                ชื่อผู้ใช้
              </Text>
              <TextInput
                style={styles.inputLogin}
                placeholder="ชื่อผู้ใช้"
                placeholderStyle={styles.placeholderStyle}
                onChangeText={(newText) => setUsername(newText)}
              />
            </View>

            <View style={{ marginTop: 30, marginBottom: 20 }}>
              <Text style={{ fontSize: 18, fontFamily: "NotoSansThaiMedium" }}>
                <Ionicons name="lock-closed-outline" style={{ fontSize: 18 }} />{" "}
                รหัสผ่าน
              </Text>

              <TextInput
                style={[styles.inputLogin]}
                placeholder="รหัสผ่าน"
                onChangeText={(newText) => setPassword(newText)}
                placeholderStyle={styles.placeholderStyle}
                secureTextEntry
                right={<TextInput.Icon icon="eye" />}
              />
            </View>

            <View
              style={{ flexDirection: "row", marginBottom: 30, width: "90%" }}
            >
              <TouchableOpacity>
                <Text style={{ fontFamily: "NotoSansThaiMedium" }}>
                  <Ionicons
                    name="square-outline"
                    // name='checkbox'
                    style={[
                      styles.listIconHis,
                      { fontSize: 24, color: "#000" },
                    ]}
                  />{" "}
                  จำฉันไว้
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ justifyContent: "flex-end", marginLeft: "55%" }}
              >
                <Text style={{ fontFamily: "NotoSansThaiMedium" }}>
                  ลืมรหัสผ่าน?
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.btLogin, { backgroundColor: "#1B79DB" }]}
              onPress={async () => {
                setUser();
                isUpdate(false);
              }}
            >
              <Text
                style={[
                  styles.textFinish,
                  { color: "#fff", fontFamily: "NotoSansThaiMedium" },
                ]}
              >
                เข้าสู่ระบบ
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "90%",
              alignSelf: "center",
              alignItems: "center",
              paddingTop: 20,
            }}
          >
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text style={{ fontSize: 18, fontFamily: "NotoSansThaiMedium" }}>
                มีบัญชีหรือยัง? ลงทะเบียน
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ลงทะเบียน");
                }}
              >
                <Text
                  style={{
                    color: "#1B79DB",
                    fontWeight: "400",
                    fontSize: 18,
                    fontFamily: "NotoSansThaiMedium",
                  }}
                >
                  ที่นี่
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{ fontSize: 18, fontFamily: "NotoSansThaiMedium" }}>
                หรือเข้าสู่ระบบด้วย
              </Text>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <SocialIcon
                  style={{ width: 52, marginRight: 20 }}
                  button
                  type="google-plus-official"
                  onPress={() => {
                    alert("google");
                  }}
                />
                <SocialIcon
                  style={{ width: 52 }}
                  button
                  type="facebook"
                  onPress={() => {
                    //Action to perform on press of Social Icon
                    alert("facebook");
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  } else {
    return <ProfileScreen />;
  }
};
