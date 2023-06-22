import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import styles from "../template/theme";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../Database/config";
import { useNavigation } from "@react-navigation/native";
import { setLogin, isUpdate } from "../redux/action";
import LottieView from "lottie-react-native";

export default PointScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { login, is_update } = useSelector((state) => state.userReducer);
  const [score, setScore] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.boxAni}>
        <View style={styles.comp}>
          <Text
            style={[
              styles.text,
              {
                color: "#000",
                fontFamily: "NotoSansThaiSemiBold",
                fontSize: 20,
              },
            ]}
          >
            แบ่งปันสำเร็จ
          </Text>
        </View>
        <LottieView
          source={require("../assets/93913-task-completed.json")}
          style={[styles.animatecomp]}
          autoPlay
          loop
        />
        <View style={styles.how}>
          <Text style={[styles.text]}>ได้รับ 10 คะแนน จากการแบ่งปัน</Text>
        </View>
      </View>
      <View style={styles.summary}>
        <TouchableOpacity
          style={[styles.btFinish, { backgroundColor: "#1B79DB" }]}
          onPress={() => {
            dispatch(isUpdate(false));
            navigation.navigate("แบ่งปัน");
          }}
        >
          <Text style={[styles.textFinish, { color: "#fff" }]}>
            กลับสู่หน้าหลัก
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
