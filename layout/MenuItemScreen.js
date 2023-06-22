import { View, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import styles from "../template/theme";
import ButtoncardVeget from "../components/ButtoncardVeget";
import BasKetButton from "../components/BasketButton";
import { useSelector, useDispatch } from "react-redux";
import { pushItem, isUpdate, searchItem } from "../redux/action";
import ModalViewItem from "../components/ModalViewItem";
import { useNavigation } from "@react-navigation/native";
import firebase from "../Database/config";
import uuid from "react-native-uuid";
import Search from "../components/search";

export default MenuItemScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { item, search, is_update } = useSelector((state) => state.userReducer);
  const [itemData, setItemData] = useState([]);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const updateData = async (key, value) => {
    const res = await firebase
      .firestore()
      .collection("item")
      .doc(key)
      .update({ price: value });
  };

  const componentDidMount = async () => {
    var val = [];
    for (let data in item) {
      if (item[data].cateType_id === route.params.type) {
        var price = 0;
        if (item[data].price <= 0) {
          item[data]["price"] = price;
        }
        if (search) {
          if (item[data].item_name.search(search) < 0) {
            continue;
          }
        }
        val.push(item[data]);
      }
    }

    if (val.length % 2 !== 0) {
      val.push({ item_id: uuid.v4(), item_name: "" });
    }
    setItemData(val);
    dispatch(isUpdate(true));
  };

  useEffect(() => {
    if (!is_update) {
      wait(50).then(() => componentDidMount());
    }
    if (route.params.click) {
      route.params["click"] = false;
      dispatch(searchItem(""));
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Search />
      <View style={styles.container_Card}>
        <ModalViewItem />
        <FlatList
          style={styles.container_Menu}
          data={itemData}
          numColumns={2}
          renderItem={({ item }) => <ButtoncardVeget props={item} />}
        />
        <BasKetButton />
      </View>
    </SafeAreaView>
  );
};
