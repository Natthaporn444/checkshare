import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Pressable,
} from "react-native";
import styles from "../template/theme";
import { useDispatch, useSelector } from "react-redux";
import { isUpdate, setLogin } from "../redux/action";
import firebase from "../Database/config";
import { useNavigation } from "@react-navigation/native";

export default NotiScreen = () => {
  const { login, is_update } = useSelector((state) => state.userReducer);
  const navigation = useNavigation();
  const [popup, setPopup] = useState(false);
  const [popupComp, setPopupComp] = useState(false);
  const dispatch = useDispatch();
  const [message, setMessage] = useState([]);
  const [userNoti, setUserNoti] = useState({});
  const [itemShare, setItemShare] = useState([]);
  const [user, setUser] = useState([]);

  const NotiMessage = async () => {
    const dbRef_noti = await firebase.firestore().collection("messengerNoti");
    const dbRef_user = await firebase.firestore().collection("user");
    const dbRef_itemShare = await firebase.firestore().collection("food_share");

    const snapshot_noti = await dbRef_noti.get();
    const snapshot_user = await dbRef_user.get();
    const snapshot_itemShare = await dbRef_itemShare.get();
    var val_noti = [];
    var val_user = [];
    var val_itemShare = [];
    //แสดงการแจ้งเตือนให้ตรง type และตาม user id
    snapshot_noti.forEach((doc) => {
      if (
        doc.data().userShare_id === login.user_id &&
        doc.data().type === "share"
      ) {
        var val = doc.data();
        val["id_noti"] = doc.id;
        val_noti.push(val);
      }
      if (
        doc.data().userPick_id === login.user_id &&
        doc.data().type === "callback"
      ) {
        var val = doc.data();
        val["id_noti"] = doc.id;
        val_noti.push(val);
      }
      if (
        doc.data().userShare_id === login.user_id &&
        doc.data().type === "arrived"
      ) {
        var val = doc.data();
        val["id_noti"] = doc.id;
        val_noti.push(val);
      }
      if (
        doc.data().userShare_id === login.user_id &&
        doc.data().type === "confirm"
      ) {
        var val = doc.data();
        val["id_noti"] = doc.id;
        val_noti.push(val);
      }
    });
    snapshot_user.forEach((doc) => {
      var val = doc.data();
      val["key"] = doc.id;
      val_user.push(val);
    });
    snapshot_itemShare.forEach((doc) => {
      var val = doc.data();
      val["key"] = doc.id;
      val_itemShare.push(val);
    });

    setMessage(val_noti);
    setUser(val_user);
    setItemShare(val_itemShare);
    dispatch(isUpdate(true));
  };
  useEffect(() => {
    if (!is_update) {
      NotiMessage();
    }
  });

  if (user.length > 0) {
    // console.log("user", userNoti.user_avatar);
    // console.log("message", message);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={popup}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setPopup(false);
        }}
      >
        <View behavior="padding" style={styles.centeredView}>
          <View style={[styles.modalView, { height: 200 }]}>
            <Text style={[styles.modalText]}>
              ยืนยันการแบ่งปัน{" "}
              {userNoti.itemShare_name ? userNoti.itemShare_name : ""} ให้กับ{" "}
              {userNoti.user_name ? userNoti.user_name : ""} หรือไม่
            </Text>
            <View style={[styles.btCreatlist, { marginTop: 30 }]}>
              <Pressable
                style={[styles.button, { backgroundColor: "#1B79DB" }]}
                onPress={() => {
                  const lineNotify = require("line-notify-nodejs")(
                    userNoti.token
                  );
                  lineNotify
                    .notify({
                      message:
                        login.user_name +
                        " ตอบรับคำขอแบ่งปัน " +
                        userNoti.itemShare_name +
                        " ของคุณแล้ว",
                    })
                    .then(() => {
                      firebase
                        .firestore()
                        .collection("messengerNoti")
                        .add({
                          foodShare_id: userNoti.item,
                          userPick_id: userNoti.id,
                          userShare_id: login.user_id,
                          type: "callback",
                          text:
                            "ตอบรับคำขอแบ่งปัน " +
                            userNoti.itemShare_name +
                            " \nของคุณแล้ว",
                          profile: login.user_avatar,
                          user_name: login.user_name,
                        });
                      console.log("send completed!");
                    })
                    .catch(() => {
                      console.log("ไม่สำเร็จ");
                    });
                  setPopup(false);
                }}
              >
                <Text style={[styles.textStyle, { color: "#fff" }]}>
                  ยืนยัน
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setPopup(false);
                }}
              >
                <Text style={[styles.textStyle]}>ไม่ต้องการ</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={popupComp}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setPopupComp(false);
        }}
      >
        <View behavior="padding" style={[styles.centeredView]}>
          <View style={[styles.modalView, { height: 200 }]}>
            <Text style={[styles.modalText]}>
              แบ่งปัน {userNoti.itemShare_name ? userNoti.itemShare_name : ""}{" "}
              ให้กับ {userNoti.user_name ? userNoti.user_name : ""}{" "}
              สำเร็จแล้วหรือไม่
            </Text>
            <View style={[styles.btCreatlist, { marginTop: 30 }]}>
              <Pressable
                style={[styles.button, { backgroundColor: "#1B79DB" }]}
                onPress={async () => {
                  dispatch(
                    setLogin({
                      user_name: login.user_name,
                      state: true,
                      user_id: login.user_id,
                      user_avatar: login.user_avatar,
                      location: {
                        latitude: login.location.latitude,
                        longitude: login.location.longitude,
                      },
                      score: parseInt(login.score) + parseInt(10),
                      scoreList: parseInt(login.scoreList) + parseInt(1),
                    })
                  );
                  firebase
                    .firestore()
                    .collection("user")
                    .doc(login.user_id)
                    .update({
                      score: parseInt(login.score) + parseInt(10),
                      scoreList: parseInt(login.scoreList) + parseInt(1),
                    });

                  const dbRef_foodShare = await firebase
                    .firestore()
                    .collection("food_share")
                    .doc(userNoti.item);
                  const snapshot_foodShare = await dbRef_foodShare.get();

                  //เพิ่มข้อมูลลง itemShare_his เพื่อแสดงประวัติหน้าโปร
                  await firebase
                    .firestore()
                    .collection("itemShare_his")
                    .add(snapshot_foodShare.data());

                  //ลบข้อมูลใน food_share หลังจากแบ่งปันแล้ว
                  await firebase
                    .firestore()
                    .collection("food_share")
                    .doc(userNoti.item)
                    .delete();

                  // dispatch(isUpdate(false));
                  navigation.navigate("สำเร็จ", { props: userNoti });

                  // console.log(message);
                  setPopupComp(false);
                }}
              >
                <Text style={[styles.textStyle, { color: "#fff" }]}>
                  สำเร็จ
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setPopupComp(false);
                }}
              >
                <Text style={[styles.textStyle]}>ไม่สำเร็จ</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={[styles.container_Menu, { width: "98%" }]}>
        <FlatList
          data={message}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.listNoti]}
              onPress={async () => {
                const dbRef_user = await firebase
                  .firestore()
                  .collection("user")
                  .doc(item.userPick_id)
                  .get();
                var val = dbRef_user.data();

                val["id"] = dbRef_user.id;
                val["item"] = item.foodShare_id;
                val["id_noti"] = item.id_noti;
                val["itemShare_name"] =
                  itemShare.length > 0
                    ? itemShare[
                        itemShare.findIndex(
                          (key) => key.key === item.foodShare_id
                        )
                      ].props.category_name
                    : "";

                setUserNoti(val);

                if (item.type === "confirm") {
                  setPopupComp(true);
                } else if (item.type === "share") {
                  setPopup(true);
                } else if (item.type === "callback") {
                  navigation.navigate("โลเคชั่น", {
                    item: item,
                    category: val,
                  });
                }
              }}
            >
              <Image
                style={[styles.listItemShImg, { borderRadius: 30 }]}
                source={{
                  uri: item.profile,
                }}
              />
              <View style={[styles.MenulistShareDetail]}>
                <Text style={[styles.nameItemShare, { marginLeft: 15 }]}>
                  {item.user_name}
                </Text>

                <Text
                  style={[
                    {
                      marginTop: 8,
                      marginLeft: 15,
                      marginBottom: 10,
                      fontSize: 16,
                      fontFamily: "NotoSansThaiMedium",
                      width: "98%",
                    },
                  ]}
                >
                  {item.text}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};
