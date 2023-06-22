import * as React from "react";
import { useState, useEffect } from "react";
import styles from "../template/theme";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { isUpdate, addDataF, addBasket } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default Basket = ({ navigate, route }) => {
  const navigation = useNavigation();
  const { basket, list_id } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const total_price = () => {
    var sum = 0;
    basket.forEach((data) => {
      if (data.category_price !== "-") {
        if (data.category_unit === "กรัม") {
          sum += (data.category_price / 1000) * parseInt(data.category_num);
        } else {
          sum += data.category_price * parseInt(data.category_num);
        }
      }
    });
    return sum;
  };
  // console.log(basket);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: "78%" }}>
        <FlatList
          data={basket}
          style={[styles.container_Menu]}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem}>
              <Image style={[styles.listItemImg]} source={item.category_img} />
              <View style={styles.MenulistDetail}>
                <Text style={[styles.listItemText]}>{item.category_name}</Text>
                <Text
                  style={[
                    {
                      fontSize: 16,
                      fontFamily: "NotoSansThaiMedium",
                      paddingLeft: 10,
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
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.summary}>
        <View style={[styles.boxTotal, { padding: 10 }]}>
          <Text style={styles.textTotal}>รวม</Text>
          {/* คำนวณราคา */}
          <Text style={styles.textTotal_2}>{total_price()} บาท</Text>
        </View>

        <TouchableOpacity
          style={[styles.btFinish, { backgroundColor: "#1B79DB" }]}
          onPress={() => {
            basket.forEach((value) => {
              value["list_id"] = list_id;
              dispatch(
                addDataF({
                  topic: "basket",
                  data: value,
                })
              );
            });
            navigation.navigate("หน้าหลัก");
          }}
        >
          <Text style={[styles.textFinish, { color: "#fff" }]}>บันทึก</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
