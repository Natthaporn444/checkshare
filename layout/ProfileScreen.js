import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import styles from "../template/theme";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setLogin, isUpdate } from "../redux/action";
import EditProfileScreen from "./EditProfileScreen";
import firebase from "../Database/config";

export default ProfileScreen = ({ route, navigate }) => {
  const { login, is_update } = useSelector((state) => state.userReducer);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(true);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
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

  const setHistoryItem = async () => {
    const dbRef_his = await firebase.firestore().collection("itemShare_his");
    const snapshot_his = await dbRef_his.get();
    var val_his = [];

    snapshot_his.forEach((doc) => {
      var date = new Date(
        doc.data().dateTime.date.seconds * 1000 +
          doc.data().dateTime.date.nanoseconds / 1000000
      );

      if (doc.data().user_id === login.user_id) {
        var data = doc.data();
        data["date"] = date;
        val_his.push(data);
      }
    });
    // dispatch(isUpdate(true));

    setHistory(val_his);
  };
  // console.log("his", history);
  useEffect(() => {
    if (!is_update) {
      setHistoryItem();
      setRefreshing(false);
    }
  });
  //Logout
  const logout = () => {
    dispatch(
      setLogin({
        state: false,
        user_name: "",
        user_id: "",
        user_avatar: "",
        location: {
          latitude: "",
          longitude: "",
        },
        token: "",
        score: "",
        scoreList: "",
      })
    );
    dispatch(isUpdate(true));
    // console.log("case2", login.user_avatar);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri: login.user_avatar,
        }}
      />
      <View style={styles.Yourname}>
        <Text style={[styles.name, { color: "#1B79DB" }]}>
          {login.user_name}
          <Ionicons name="pencil-outline" style={{ fontSize: 20 }} />
        </Text>
        <Text style={styles.info}>{login.score} คะแนน</Text>
      </View>

      <View style={[styles.historyShare, { width: "96%", marginTop: 20 }]}>
        <Text
          style={{
            marginLeft: "3%",
            fontSize: 16,
            fontFamily: "NotoSansThaiMedium",
          }}
        >
          รายการที่เคยแบ่งปัน :{" "}
        </Text>
        <View style={{ height: "70%" }}>
          <FlatList
            data={history}
            style={styles.container_Menu}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.listItemHis]}>
                <Image
                  style={[styles.listItemImg, { marginRight: "5%" }]}
                  source={item.props.category_img}
                />
                <View style={[styles.listShareProfile, {}]}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={[styles.nameItemShareHis, {}]}>
                      {item.props.category_name}
                    </Text>
                    <Text
                      style={[
                        {
                          marginTop: 12,
                          fontSize: 16,
                          fontFamily: "NotoSansThaiMedium",
                          marginLeft: "10%",
                        },
                      ]}
                    >
                      {item.props.category_num} {item.props.category_unit}
                    </Text>
                  </View>

                  <Text
                    style={[
                      {
                        fontSize: 16,
                        marginHorizontal: 5,
                        fontFamily: "NotoSansThaiMedium",
                      },
                    ]}
                  >
                    แบ่งปันเมื่อ:
                    {" " +
                      item.date.getDate() +
                      " " +
                      monthNamesThai[item.date.getMonth()] +
                      " " +
                      [item.date.getFullYear() + 543]}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <View style={styles.summary}>
        <TouchableOpacity
          style={[
            styles.btFinish,
            {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#EF4665",
            },
          ]}
          onPress={() => {
            logout();
            navigation.navigate("โปรไฟล์");
          }}
        >
          <Text style={[styles.textFinish, { color: "#EF4665" }]}>
            ออกจากระบบ
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
