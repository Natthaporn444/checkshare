import * as React from "react";
import styles from "../template/theme";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { itemData, setModalVisible } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";
import ModalViewItemEdit from "../components/ModalViewItemEdit";
import { useState } from "react";

function SwipeListItem({ props }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.swipeList]}>
      <ModalViewItemEdit />
      <TouchableOpacity
        style={[styles.EditSwipe, { backgroundColor: "#A6DFF2" }]}
        onPress={() => {
          dispatch(setModalVisible({ state: true, props: props }));
        }}
      >
        <Ionicons
          name="pencil-outline"
          style={[styles.SwipeIcon, { color: "#1B79DB" }]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.DeleteSwipe, { backgroundColor: "#fff" }]}
        onPress={() => {
          Alert.alert("ลบรายการ", "ต้องการลบรายการ หรือไม่?", [
            {
              text: "ยกเลิก",
              // onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "ลบ",
              onPress: () => {
                // console.log(props)
                dispatch(itemData({ delete_id: props.id }));
              },
            },
          ]);
        }}
      >
        <Ionicons name="trash-outline" style={[styles.SwipeIcon]} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.DeleteSwipe,
          { marginLeft: "3%", width: "19%", backgroundColor: "#1B79DB" },
        ]}
        onPress={() => {
          dispatch(itemData({ push_id: props.id }));
        }}
      >
        <Ionicons
          name="ios-checkmark"
          style={[styles.SwipeIcon, { color: "#fff" }]}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default SwipeListItem;
