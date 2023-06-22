import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import styles from "../template/theme";
import MapViewDirections from "react-native-maps-directions";
import firebase from "../Database/config";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.2;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 13.249935130601049,
  longitude: 99.82469919146953,
  // latitudeDelta: 0.0922,
  // longitudeDelta: 0.0421,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};
var origin = { latitude: 13.916459083569517, longitude: 100.55469120862014 };
var destination = {
  latitude: 13.249935130601049,
  longitude: 99.82469919146953,
  // latitude: 13.249935130601049,
  // longitude: 99.82469919146953,
  // latitude: 13.919459083569517
  // longitude: 100.55369120862014,
};

export default function MapTest({ navigate, route }) {
  const { login } = useSelector((state) => state.userReducer);
  const [update, setUpdate] = useState(false);
  const [userNoti, setUserNoti] = useState();
  const [user, setUser] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //ที่อยู่ปัจจุบัน
  origin = login.location;
  // console.log(route.params.item);
  const getLocation = async () => {
    const dbRef_user = await firebase
      .firestore()
      .collection("food_share")
      .doc(route.params.item.foodShare_id.trim())
      .get();

    const dbRef_userShare = await firebase
      .firestore()
      .collection("user")
      .doc(route.params.item.userShare_id.trim())
      .get();
    //ที่อยู่ปักหมุด
    destination = {
      latitude: dbRef_user.data().location.latitude,
      longitude: dbRef_user.data().location.longitude,
    };
    await setUserNoti(dbRef_userShare.data());
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.containerMap}>
      <MapView
        style={styles.mapComp}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
        // showsUserLocation={true}
      >
        <Marker
          coordinate={destination}
          draggable={false}
          onDragStart={(e) => {
            // console.log("Drag Start", e.nativeEvent.coordinate);
          }}
        ></Marker>
        <Marker
          coordinate={origin}
          draggable={false}
          onDragStart={(e) => {
            // console.log("Drag Start", e.nativeEvent.coordinate);
          }}
          pinColor="#1B79DB"
        ></Marker>
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey="AIzaSyDes7dkyG_qTZbdVYdHR8c5HLAHeYVRWzY"
          strokeWidth={5}
          strokeColor="#EF4665"
        />
      </MapView>
      <View style={styles.summaryLoComp}>
        <Pressable
          style={[styles.btFinishLo, styles.btLocaComp]}
          onPress={() => {
            const lineNotify = require("line-notify-nodejs")(userNoti.token);
            lineNotify
              .notify({
                message:
                  login.user_name +
                  " ผู้สนใจรับ " +
                  route.params.category.itemShare_name +
                  " ถึงจุดนัดพบแล้ว",
              })
              .then(() => {
                firebase
                  .firestore()
                  .collection("messengerNoti")
                  .add({
                    foodShare_id: route.params.item.foodShare_id,
                    userPick_id: route.params.item.userPick_id,
                    userShare_id: route.params.item.userShare_id,
                    type: "arrived",
                    text:
                      "ผู้รับ " +
                      route.params.category.itemShare_name +
                      " ถึงจุดนัดพบแล้ว",
                    profile: login.user_avatar,
                    user_name: login.user_name,
                  });
                console.log("send completed!");
              })
              .catch(() => {
                console.log("ไม่สำเร็จ");
              });
          }}
        >
          <Text style={[styles.textFinishLo, { color: "#000" }]}>
            ถึงจุดนัดพบแล้ว
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.btFinishLoComp,
            styles.btLocaComp,
            { backgroundColor: "#1B79DB" },
          ]}
          onPress={async () => {
            const lineNotify = require("line-notify-nodejs")(userNoti.token);
            lineNotify
              .notify({
                // message: "ได้รับของจากการแบ่งปันของคุณแล้ว",
                message:
                  login.user_name +
                  " ได้รับ " +
                  route.params.category.itemShare_name +
                  " จากการแบ่งปันของคุณแล้ว",
              })
              .then(() => {
                firebase
                  .firestore()
                  .collection("messengerNoti")
                  .add({
                    foodShare_id: route.params.item.foodShare_id,
                    userPick_id: route.params.item.userPick_id,
                    userShare_id: route.params.item.userShare_id,
                    type: "confirm",
                    text:
                      "ได้รับ " +
                      route.params.category.itemShare_name +
                      " ของคุณแล้ว",
                    profile: login.user_avatar,
                    user_name: login.user_name,
                  });
                console.log("send completed!");
              })
              .catch(() => {
                console.log("ไม่สำเร็จ");
              });
            navigation.navigate("แบ่งปัน");
            // dispatch(isUpdate(false));
          }}
        >
          <Text style={[styles.textFinishLo, { color: "#fff" }]}>
            ได้รับแล้ว
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
