import React from "react";
import * as MediaLibrary from "expo-media-library";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { captureRef } from "react-native-view-shot";
import styles from "../template/theme";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { isUpdate, setModalVisible } from "../redux/action";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "../Database/config";
import moment from "moment";

export default SlipScreen = ({ route }) => {
  const { item_Data, login } = useSelector((state) => state.userReducer);
  const [currentDate, setCurrentDate] = useState("");
  const [popup, setPopup] = useState(false);
  const imageRef = useRef();
  // const [currentTime, setCurrentTime] = useState("");
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentTime = moment().format("HH:mm");
  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });
      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        Alert.alert(
          "บันทึกลงในอัลบั้มภาพสำเร็จแล้ว",
          "คุณสามารถไปดูได้ที่อัลบั้มรูปภาพ",
          [
            {
              text: "ตกลง",
              style: "cancel",
            },
          ]
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    var monthNamesThai = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤษจิกายน",
      "ธันวาคม",
    ];
    var date = new Date().getDate(); //Current Date
    var month = monthNamesThai[new Date().getMonth()]; //Current Month
    var year = new Date().getFullYear() + 543; //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    // var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(date + "  " + month + "  " + year);
    // setCurrentTime(
    //   hours + ":" + min + " น."
    //   // hours + ':' + min + ':' + sec
    // );
  }, []);
  if (status === null) {
    requestPermission();
  }

  return (
    <View style={[styles.containerSlip, { paddingTop: 10 }]}>
      <ScrollView style={{ alignContent: "center" }}>
        <View style={[styles.slip_Boxx]} ref={imageRef} collapsable={false}>
          <View style={{ paddingLeft: 10, marginBottom: 30 }}>
            <Image
              style={styles.logoSlip}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/icon.png?alt=media&token=59c5a3de-8ff4-4b16-91c5-406db3d0e919",
              }}
            />
            <Text style={[styles.date_time]}>{currentDate}</Text>
            <Text style={styles.date_time}>{currentTime} น.</Text>
          </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              marginBottom: 15,
              fontFamily: "NotoSansThaiSemiBold",
            }}
          >
            รายการ :
          </Text>

          <FlatList
            data={item_Data}
            renderItem={({ item }) => (
              <SafeAreaView style={[styles.detailList]}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    marginBottom: "2%",
                    fontFamily: "NotoSansThaiMedium",
                  }}
                >
                  {item.category_name} {item.category_num} {item.category_unit}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    marginBottom: "2%",
                    fontFamily: "NotoSansThaiMedium",
                  }}
                >
                  {item.category_price !== "-"
                    ? item.category_unit === "กรัม"
                      ? (
                          (item.category_price / 1000) *
                          parseInt(item.category_num)
                        ).toFixed(2)
                      : item.category_price * parseInt(item.category_num)
                    : "-"}{" "}
                  บาท
                </Text>
              </SafeAreaView>
            )}
          />
          <View style={[styles.boxTotalSlip, { padding: 10 }]}>
            <Text style={[styles.textTotal]}>รวม</Text>
            {/* // คำนวณราคา */}
            <Text style={[styles.textTotal_2]}>
              {route.params.totalPrice} บาท
            </Text>
          </View>
        </View>
        <View>
          <View style={{ alignItems: "center", marginBottom: "30%" }}>
            <TouchableOpacity
              style={[
                styles.btFinish,
                {
                  backgroundColor: "#1B79DB",
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginTop: 20,
                },
              ]}
              onPress={() => onSaveImageAsync()}
            >
              <Ionicons
                name="ios-download-outline"
                style={[{ fontSize: 24, color: "#fff", textAlign: "center" }]}
              />
            </TouchableOpacity>
            <Text style={[styles.textFinish, { color: "#000" }]}>บันทึก</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.summary}>
        <TouchableOpacity
          style={[styles.btFinish, { backgroundColor: "#1B79DB" }]}
          onPress={async () => {
            const dbRef_list = await firebase
              .firestore()
              .collection("menu_list");
            const snapshot_list = await dbRef_list.get();

            snapshot_list.forEach((doc) => {
              if (doc.data().menuList_id === item_Data[0].list_id) {
                firebase
                  .firestore()
                  .collection("menu_list")
                  .doc(doc.id)
                  .delete();
              }
            });
            item_Data.forEach((data) => {
              var val = data;
              val["user_id"] = login.user_id;
              firebase.firestore().collection("item_share").add(val);
              firebase.firestore().collection("basket").doc(data.id).delete();
            });

            // setPopup(true)
            dispatch(isUpdate(false));
            navigation.navigate("หน้าหลัก");
          }}
        >
          <Text style={[styles.textFinish, { color: "#fff" }]}>
            กลับสู่หน้าหลัก
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
