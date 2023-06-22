import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  KeyboardAvoidingView,
} from "react-native";
import styles from "../template/theme";
import Mainlist from "../components/Mainlist";
import { setModalVisible, isUpdate, pushItem, pushList } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import ModalView from "../components/ModalView";
import firebase from "../Database/config";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import SwipeMainlist from "../components/SwipeMainlist";
import { SwipeListView } from "react-native-swipe-list-view";

export default HomeScreen = () => {
  const { listItem, is_update, item, login } = useSelector(
    (state) => state.userReducer
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(true);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const setListItem = async () => {
    // console.log('update')
    const dbRef_list = await firebase.firestore().collection("menu_list");
    const snapshot_list = await dbRef_list.get();

    var val_list = [];
    var count = 0;

    snapshot_list.forEach((doc) => {
      if (login.user_id !== doc.data().user_id) {
        return;
      }
      var data = doc.data();
      data["key"] = count.toString();
      count++;
      data["id"] = doc.id;
      val_list.push(data);
    });

    dispatch(pushList({ listItem: val_list }));
    dispatch(isUpdate(true));
  };

  const setItem = async () => {
    const dbRef_item = await firebase.firestore().collection("item");
    const snapshot_item = await dbRef_item.get();

    var val_item = [];
    snapshot_item.forEach((doc) => {
      var val_line = doc.data();
      val_line["item_id"] = doc.id;
      val_line["isPut"] = false;
      val_item.push(val_line);
      // console.log(doc.data())
    });

    dispatch(pushItem({ item: val_item }));
  };

  useEffect(() => {
    if (!is_update) {
      setListItem();
      setRefreshing(false);
      if (item.length === 0) {
        setItem();
      }
    }
    if (listItem.length > 0) {
      setisData(true);
    } else {
      setisData(false);
    }
    Listview();
  });

  const [isData, setisData] = useState(false);
  const Listview = () => {
    if (isData) {
      return (
        <SwipeListView
          data={listItem}
          style={styles.container_Menu}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => <Mainlist props={item} />}
          renderHiddenItem={({ item }) => <SwipeMainlist props={item} />}
          // leftOpenValue={75}
          rightOpenValue={-80}
          previewRowKey={"0"}
          previewOpenValue={-70}
          previewOpenDelay={3000}
          onRowDidOpen={(item) => {
            // console.log(item)
          }}
        />
      );
    }
    return (
      <SafeAreaView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
      >
        <View style={styles.boxAni}>
          <LottieView
            source={require("../assets/blank_shopping.json")}
            style={[styles.animate]}
            autoPlay
            loop
          />
          <View style={styles.how}>
            <Text style={[styles.text]}>
              กด{" "}
              <Ionicons
                name="add-circle-sharp"
                style={{ fontSize: 26, color: "#1B79DB" }}
              />{" "}
              เพื่อสร้าง
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ModalView />
      <Listview />

      <TouchableOpacity
        style={[styles.fab, styles.shadowProp]}
        onPress={() => {
          dispatch(setModalVisible({ state: true }));
        }}
      >
        {/* <Text style={styles.fabIcon}>+</Text> */}
        <Ionicons name="add-outline" style={styles.fabIcon} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
