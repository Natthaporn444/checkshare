import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import styles from "../template/theme";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setItemName } from "../redux/action";
import { useNavigation } from "@react-navigation/native";
import firebase from "../Database/config";

function ListShareScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.userReducer);
  const [item_share, setItem_share] = useState();
  const [open, setOpen] = useState(false);

  const setItemShare = async () => {
    const dbRef_itemShare = await firebase.firestore().collection("item_share");
    const snapshot_itemShare = await dbRef_itemShare.get();
    var val_itemShare = [];

    snapshot_itemShare.forEach((doc) => {
      if (login.user_id !== doc.data().user_id) {
        return;
      }

      var val_line = doc.data();
      val_line["item_id"] = doc.id;
      val_itemShare.push(val_line);
    });
    setItem_share(val_itemShare);
  };

  useEffect(() => {
    if (!open) {
      setItemShare();
      setOpen(true);
    }
  });

  return (
    <View style={styles.container}>
      <FlatList
        // horizontal
        data={item_share}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItemMain}
            onPress={() => {
              dispatch(setItemName(item.category_name));
              navigation.navigate("ระบุปริมาณ", { props: item });
            }}
          >
            <View style={styles.listItemView}>
              <View style={{ width: "20%", height: "70%" }}>
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={item.category_img}
                />
              </View>
              <View>
                <Text style={styles.listItemShareText}>
                  {item.category_name}
                </Text>
                <Text style={styles.unitItemShare}>
                  {item.category_num} {item.category_unit}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
export default ListShareScreen;
