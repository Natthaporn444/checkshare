import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  RefreshControl,
  Pressable,
} from "react-native";
import styles from "../template/theme";
import { useDispatch, useSelector } from "react-redux";
import { isUpdate, setLogin } from "../redux/action";
import Ionicons from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";

export default ShareScreen = () => {
  const { is_update, login } = useSelector((state) => state.userReducer);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [itemShare, setItemShare] = useState([]);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(true);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(10000).then(() => setRefreshing(false));
  }, []);

  const setShareItem = async () => {
    const dbRef_itemshare = await firebase.firestore().collection("food_share");
    const snapshot_itemshare = await dbRef_itemshare.get();
    var val_itemShare = [];

    snapshot_itemshare.forEach((doc) => {
      var date = new Date(
        doc.data().dateTime.date.seconds * 1000 +
          doc.data().dateTime.date.nanoseconds / 1000000
      );
      var time = new Date(
        doc.data().dateTime.time.seconds * 1000 +
          doc.data().dateTime.time.nanoseconds / 1000000
      );
      var timeEnd = new Date(
        doc.data().dateTime.timeEnd.seconds * 1000 +
          doc.data().dateTime.timeEnd.nanoseconds / 1000000
      );

      if (login.user_id === doc.data().user_id) {
        var data = doc.data();
        data["date"] = date;
        data["time"] = time;
        data["timeEnd"] = timeEnd;
        val_itemShare.push(data);
      }
    });
    dispatch(isUpdate(true));
    setItemShare(val_itemShare);
  };

  //ถ้ายังไม่เข้าสู่ระบบจะแสดงหน้า login
  if (!login.token) {
    navigation.navigate("โปรไฟล์");
  }
  useEffect(() => {
    if (!is_update) {
      setShareItem();
      setRefreshing(false);
    }
    if (itemShare.length > 0) {
      setisData(true);
    } else {
      setisData(false);
    }
    ListviewShare();
  });
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

  const [isData, setisData] = useState(false);
  const ListviewShare = () => {
    if (isData) {
      return (
        <FlatList
          data={itemShare}
          RefreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.container_Menu}
          renderItem={({ item }) => (
            <Pressable style={[styles.listShareMain]}>
              <Image
                style={[styles.listItemShImg]}
                source={item.props.category_img}
              />
              <View style={[styles.MenulistShareDetail, { marginLeft: 3 }]}>
                <View
                  style={{
                    flexDirection: "row",
                    // justifyContent: "space-between",
                  }}
                >
                  <Text style={[styles.nameItemShare]}>
                    {item.props.category_name}
                  </Text>
                  <Text
                    style={[
                      {
                        // paddingLeft: 10,
                        marginTop: 12,
                        marginLeft: 5,
                        fontSize: 16,
                        fontFamily: "NotoSansThaiMedium",
                      },
                    ]}
                  >
                    {item.props.category_num} {item.props.category_unit}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={[
                      {
                        paddingLeft: 10,
                        marginLeft: 10,
                        fontSize: 14,
                        fontFamily: "NotoSansThaiRegular",
                      },
                    ]}
                  >
                    {"วันส่ง: " +
                      item.date.getDate() +
                      " " +
                      monthNamesThai[item.date.getMonth()] +
                      " " +
                      [item.date.getFullYear() + 543]}
                  </Text>
                  <Text
                    style={[
                      {
                        paddingLeft: 10,
                        marginLeft: 5,
                        fontSize: 14,
                        fontFamily: "NotoSansThaiRegular",
                      },
                    ]}
                  >
                    {item.time.getHours() + ":" + item.time.getMinutes()} น. -{" "}
                    {item.timeEnd.getHours() + ":" + item.timeEnd.getMinutes()}{" "}
                    น.
                  </Text>
                </View>
                {/* <Text style={[styles.titleTextDe]}>{item.textmore}</Text> */}
              </View>
            </Pressable>
          )}
        />
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.boxAni}>
          <LottieView
            source={require("../assets/124102-loading-screen.json")}
            style={styles.animate}
            autoPlay
            loop
          />
          <View style={styles.how}>
            <Text style={[styles.text]}>
              กด{" "}
              <Ionicons
                name="pencil-outline"
                style={{ fontSize: 26, color: "#1B79DB" }}
              />{" "}
              เพื่อแบ่งปัน
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.container_Menu}>
      <ListviewShare />
      <TouchableOpacity
        style={[styles.fab, styles.shadowProp]}
        onPress={() => {
          // dispatch(setModalVisible({state: false, props: ""}));
          navigation.navigate("รายการที่คุณแบ่งปันได้");
        }}
      >
        <Ionicons
          name="pencil-outline"
          style={{ fontSize: 38, color: "#fff", textAlign: "center" }}
        />
        {/* <Ionicons name='md-create-outline' style={{fontSize: 38, color: '#fff', textAlign: 'center'}}/> */}
      </TouchableOpacity>
    </SafeAreaView>
  );
};
