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
} from "react-native";
import styles from "../template/theme";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/compat";
import { isUpdate } from "../redux/action";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Callout, Circle } from "react-native-maps";

export default ItemSearchDe = ({ route }) => {
  const navigation = useNavigation();
  const { login, is_update } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [userShare, setUserShare] = useState({});
  // console.log(route);
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
  var item = route.params.props;
  var date = new Date(
    item.dateTime.date.seconds * 1000 + item.dateTime.date.nanoseconds / 1000000
  );
  var time = new Date(
    item.dateTime.time.seconds * 1000 + item.dateTime.time.nanoseconds / 1000000
  );
  var timeEnd = new Date(
    item.dateTime.timeEnd.seconds * 1000 +
      item.dateTime.timeEnd.nanoseconds / 1000000
  );

  const Map = () => {
    return (
      <MapView
        style={{
          width: "100%",
          height: "40%",
          borderRadius: 15,
          // marginBottom: 10,
        }}
        initialRegion={{
          latitude: item.location.latitude,
          longitude: item.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
        center={item.location}
      >
        <Marker
          center={item.location}
          coordinate={item.location}
          draggable={true}
        >
          <Callout>
            <Text>This is a Callout</Text>
          </Callout>
        </Marker>
        <Circle
          center={item.location}
          radius={1000}
          fillColor="rgba(0,0,0,0.3)"
        />
      </MapView>
    );
  };
  const getUserName = async () => {
    const dbRef_user = await firebase
      .firestore()
      .collection("user")
      .doc(item.user_id)
      .get();
    // const snapshot_user = await dbRef_user.get();
    var val = {};

    val["user_name"] = dbRef_user.data().user_name;
    val["user_avatar"] = dbRef_user.data().user_avatar;
    setUserShare(val);
    dispatch(isUpdate(true));
  };

  useEffect(() => {
    if (!is_update) {
      getUserName();
    }
    // console.log("test");
  });

  return (
    <SafeAreaView style={[styles.containerSlip, { paddingTop: 10 }]}>
      <View style={[styles.slip_Box]}>
        <View style={{ paddingLeft: 10, marginBottom: 20 }}>
          <Image
            style={styles.logoSlip}
            source={{
              uri: userShare.user_avatar,
              // uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/LOGO-33-01.png?alt=media&token=4e33954a-9e6a-40b6-a85f-eece4dcfd55c",
            }}
          />
          <Text style={[styles.date_time]}>{userShare.user_name} </Text>
          <Text style={[styles.date_time, { marginLeft: 3 }]}>
            ต้องการแบ่งปัน : {item.props.category_name}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.titleText]}>ช่วงเวลานัด : </Text>
          <Text style={[styles.titleTextDe]}>
            {time.getHours() + ":" + time.getMinutes()} น. ถึง{" "}
            {timeEnd.getHours() + ":" + timeEnd.getMinutes()} น.
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.titleText]}>วันที่นัด : </Text>
          <Text style={[styles.titleTextDe]}>
            {date.getDate() +
              " " +
              monthNamesThai[date.getMonth()] +
              " " +
              [date.getFullYear() + 543]}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.titleText]}>ปริมาณ : </Text>
          <Text style={[styles.titleTextDe]}>
            {item.props.category_num} {item.props.category_unit}
          </Text>
        </View>

        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <Text style={[styles.titleText]}>จุดสักเกตุ/เพิ่มเติม :</Text>
          <Text style={[styles.titleTextDe]}> {item.textmore}</Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.titleText}>สถานที่นัดพบ: </Text>
        </View>
        <Map />
      </View>

      <View style={styles.summary}>
        <TouchableOpacity
          style={[styles.btFinish, { backgroundColor: "#1B79DB" }]}
          onPress={async () => {
            const dbRef_user = await firebase
              .firestore()
              .collection("user")
              .doc(item.user_id)
              .onSnapshot((data) => {
                firebase
                  .firestore()
                  .collection("messengerNoti")
                  .add({
                    foodShare_id: item.foodshare_id,
                    userPick_id: login.user_id,
                    userShare_id: item.user_id,
                    type: "share",
                    text:
                      "สนใจรับการแบ่งปัน " +
                      item.props.category_name +
                      " ของคุณ",
                    profile: login.user_avatar,
                    user_name: login.user_name,
                  });

                const lineNotify = require("line-notify-nodejs")(
                  data.data().token
                );

                lineNotify
                  .notify({
                    message:
                      login.user_name +
                      " สนใจรับการแบ่งปัน " +
                      item.props.category_name +
                      " ของคุณ",
                  })
                  .then(() => {
                    console.log("send completed!");
                  })
                  .catch(() => {
                    console.log("ไม่สำเร็จ");
                  });
              });
          }}
        >
          <Text style={[styles.textFinish, { color: "#fff" }]}>สนใจ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
