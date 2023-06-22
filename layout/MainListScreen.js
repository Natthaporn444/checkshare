import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import styles from "../template/theme";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import firebase from "../Database/config";
import SwipeListItem from "../components/SwipeListItem";
import { isUpdate, itemData } from "../redux/action";
import { SwipeListView } from "react-native-swipe-list-view";
export default ListScreen = ({ navigate, route }) => {
  const navigation = useNavigation();
  const { is_update, item_Data } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [stateData, setStateData] = useState({
    totalPrice: 0,
  });

  const setBasket = async () => {
    const dbRef = await firebase.firestore().collection("basket");
    const snapshot = await dbRef.get();
    await setStateData({
      totalPrice: 0,
    });

    var val = [];
    var sum = 0;

    snapshot.forEach((doc) => {
      if (route.params.list_id === doc.data().list_id) {
        val_line = doc.data();
        val_line["id"] = doc.id;
        val.push(val_line);
        if (doc.data().category_price !== "-") {
          if (doc.data().category_unit === "กรัม") {
            sum +=
              (doc.data().category_price / 1000) *
              parseInt(doc.data().category_num);
          } else {
            sum +=
              doc.data().category_price * parseInt(doc.data().category_num);
          }
        }
      }
    });
    dispatch(itemData(val));

    await setStateData((arr) => {
      return { ...arr, totalPrice: sum };
    });
  };

  useEffect(() => {
    if (!is_update) {
      setBasket();
      dispatch(isUpdate(true));
    }
  });

  return (
    <View style={styles.container}>
      <View style={{ height: "78%" }}>
        <SwipeListView
          data={item_Data}
          style={styles.container_Menu}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.listItem,
                { backgroundColor: item.push_button ? "#1B79DB" : "#fff" },
              ]}
            >
              <Image style={[styles.listItemImg]} source={item.category_img} />
              <View style={styles.MenulistDetail}>
                <Text
                  style={[
                    styles.listItemText,
                    { color: item.push_button ? "#fff" : "#000" },
                  ]}
                >
                  {item.category_name}
                </Text>
                <Text
                  style={[
                    {
                      fontSize: 16,
                      fontFamily: "NotoSansThaiMedium",
                      paddingLeft: 10,
                      color: item.push_button ? "#fff" : "#000",
                    },
                  ]}
                >
                  ราคาเฉลี่ย : {item.category_price} บาท/กก.
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={[
                      {
                        alignSelf: "flex-start",
                        paddingLeft: 10,
                        marginTop: 8,
                        fontSize: 16,
                        fontFamily: "NotoSansThaiSemiBold",
                        color: item.push_button ? "#fff" : "#000",
                      },
                    ]}
                  >
                    {item.category_num} {item.category_unit}
                  </Text>
                  <Text
                    style={[
                      {
                        alignSelf: "flex-end",
                        marginRight: "19%",
                        fontSize: 16,
                        fontWeight: "500",
                        fontFamily: "NotoSansThaiSemiBold",
                        color: item.push_button ? "#fff" : "#000",
                      },
                    ]}
                  >
                    {item.category_price !== "-"
                      ? item.units === "กรัม"
                        ? (item.category_price / 1000) *
                          parseInt(item.category_num)
                        : item.category_price * parseInt(item.category_num)
                      : "-"}{" "}
                    บาท
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
          renderHiddenItem={({ item }) => <SwipeListItem props={item} />}
          leftOpenValue={80}
          rightOpenValue={-160}
          previewRowKey={"0"}
          previewOpenValue={-120}
          previewOpenDelay={3000}
          onRowDidOpen={(item) => {
            // console.log(item)
          }}
        />
      </View>

      <View style={styles.summary}>
        <View style={[styles.boxTotal, { padding: 10 }]}>
          <Text style={[styles.textTotal]}>รวม</Text>
          <Text style={styles.textTotal_2}>
            {parseFloat(stateData.totalPrice).toFixed(2)} บาท
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.btFinish,
            {
              backgroundColor: item_Data.filter((bool) => !bool.push_button)
                .length
                ? "#ccc"
                : "#1B79DB",
            },
          ]}
          onPress={() => {
            dispatch(isUpdate(false));
            navigation.navigate("สรุปรายการ", {
              item: stateData.itemData,
              totalPrice: stateData.totalPrice,
            });
          }}
        >
          <Text
            style={[
              styles.textFinish,
              {
                color: item_Data.filter((bool) => !bool.push_button).length
                  ? "#000"
                  : "#fff",
              },
            ]}
          >
            เสร็จสิ้น
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
