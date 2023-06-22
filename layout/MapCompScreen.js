import * as React from "react";
import styles from "../template/theme";
import { Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector, useRef } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { isUpdate } from "../redux/action";
import firebase from "../Database/config";
import * as Location from "expo-location";

function MapCompScreen({ navigate, route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { is_update, login } = useSelector((state) => state.userReducer);
  const [pin, setPin] = React.useState({
    latitude: 13.7563,
    longitude: 100.5018,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  React.useEffect(() => {
    if (!is_update) {
      (async () => {
        let location = await Location.getCurrentPositionAsync({});
        //   console.log('lo',location);
        setPin({
          ...pin,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        dispatch(isUpdate(true));
      })();
    }
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={pin}
        provider="google"
        showsUserLocation={true}
        onUserLocationChange={(e) => {
          // console.log('onUserLocationChange', e.nativeEvent.coordinate)
          // setPin({
          //     latitude: e.nativeEvent.coordinate.latitude,
          //     longitude: e.nativeEvent.coordinate.longitude,
          //     latitudeDelta: 0.0922,
          //     longitudeDelta: 0.0421,
          // })
        }}
      >
        <Marker
          coordinate={pin}
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag Start", e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            console.log("Drag End", e.nativeEvent.coordinate);
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout>
            <Text>This is a Callout</Text>
          </Callout>
        </Marker>

        <Circle center={pin} radius={1000} fillColor="rgba(0,0,0,0.3)" />
      </MapView>
      <View style={styles.summaryLo}>
        <TouchableOpacity
          style={[styles.btFinishLo, styles.btLocaComp]}
          onPress={async () => {
            const dbRef_user = await firebase
              .firestore()
              .collection("user")
              .doc(item.user_id)
              .onSnapshot((data) => {
                // console.log(data.data())
                firebase.firestore().collection("messengerNoti").add({
                  foodShare_id: item.props.item_id,
                  userPick_id: login.user_id,
                  userShare_id: item.user_id,
                  type: "arrived",
                });

                console.log(data.data());
                const lineNotify = require("line-notify-nodejs")(
                  data.data().token
                );

                lineNotify
                  .notify({
                    message: "ถึงจุดนัดพบแล้ว",
                  })
                  .then(() => {
                    console.log("send completed!");
                  })
                  .catch(() => {
                    console.log("ไม่สำเร็จ");
                  });
              });
            // navigation.navigate("รายละเอียด");
            // dispatch(isUpdate(false));
          }}
        >
          <Text style={[styles.textFinish, { color: "#000" }]}>
            ถึงจุดนัดพบแล้ว
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btFinishLoComp,
            styles.btLocaComp,
            { backgroundColor: "#1B79DB" },
          ]}
          onPress={async () => {
            const dbRef_user = await firebase
              .firestore()
              .collection("user")
              .doc(item.user_id)
              .onSnapshot((data) => {
                // console.log(data.data())
                firebase.firestore().collection("messengerNoti").add({
                  foodShare_id: item.props.item_id,
                  userPick_id: login.user_id,
                  userShare_id: item.user_id,
                  type: "arrived",
                });

                console.log(data.data());
                const lineNotify = require("line-notify-nodejs")(
                  data.data().token
                );

                lineNotify
                  .notify({
                    message: "ถึงจุดนัดพบแล้ว",
                  })
                  .then(() => {
                    console.log("send completed!");
                  })
                  .catch(() => {
                    console.log("ไม่สำเร็จ");
                  });
              });
            // navigation.navigate("รายละเอียด");
            // dispatch(isUpdate(false));
          }}
        >
          <Text style={[styles.textFinish, { color: "#fff" }]}>ได้รับแล้ว</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default MapCompScreen;
