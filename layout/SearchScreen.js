import React from "react";
import styles from "../template/theme";
import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Pressable,
  FlatList,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { isUpdate } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/compat";
import SearchItemSh from "../components/searchItem";
import * as Location from "expo-location";
import LottieView from "lottie-react-native";

const SearchScreen = () => {
  const { is_update, login, search } = useSelector(
    (state) => state.userReducer
  );
  const [itemSearch, setItemSearch] = useState([]);
  const [check, setCheck] = useState(false);
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

  console.log(login.location);
  const setSearchItem = async () => {
    const dbRef_itemsearch = await firebase
      .firestore()
      .collection("food_share");
    const snapshot_itemsearch = await dbRef_itemsearch.get();
    var val_itemsearch = [];

    snapshot_itemsearch.forEach((doc) => {
      if (doc.data().props.category_name.search(search) !== -1) {
        if (login.user_id !== doc.id) {
          let checkLa = login.location.latitude - doc.data().location.latitude;
          let checkLo =
            login.location.longitude - doc.data().location.longitude;

          checkLa = Math.abs(checkLa);
          checkLo = Math.abs(checkLo);
          console.log(checkLa, checkLo);
          if (checkLa <= 0.01 && checkLo <= 0.01) {
            var val = doc.data();
            val["foodshare_id"] = doc.id;
            val_itemsearch.push(val);
          }
        }
      }
    });
    setItemSearch(val_itemsearch);

    //var val_itemsearch = []
    // dbRef_itemsearch.onSnapshot((snapShot) => {
    //   const val_itemsearch = snapShot.docs.map((snap) => {
    //     if (snap.data().props.category_name.search(search) !== -1) {
    //       var val = { ...snap.data(), foodShare_id: snap.id };
    //       return val;
    //     }
    //     return;
    //   });
    //   // if (itemSearch.length <= 0) {
    //   //   setCheck(false);
    //   //   dispatch(isUpdate(false));
    //   // } else {
    //   //   setCheck(true);
    //   // }
    //   // console.log('onsnapshot :',check)
    //   setItemSearch(val_itemsearch);
    //   console.log(val_itemsearch);
    // });
  };
  const setPins = async () => {
    // let { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== 'granted') {
    //     // console.log('Permission to access location was denied');
    //     return;
    // }

    let location = await Location.getCurrentPositionAsync({});
    //   console.log('lo',location);
  };

  useEffect(() => {
    if (!is_update && !check) {
      setSearchItem();
      setPins();
      setRefreshing(false);
      dispatch(isUpdate(true));
    }
    ListSearch();
  });

  const ListSearch = () => {
    if (itemSearch.length > 0) {
      return (
        <View style={styles.container}>
          <FlatList
            data={itemSearch}
            style={[styles.container_Menu, { width: "98%" }]}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <Pressable
                style={[styles.listSearchMain]}
                onPress={() => {
                  dispatch(isUpdate(false));
                  navigation.navigate("รายละเอียด", { props: item });
                }}
              >
                <Image
                  style={[styles.listItemShImg]}
                  source={item.props.category_img}
                />
                <View style={[styles.MenulistShareDetail, { marginLeft: 3 }]}>
                  <Text style={[styles.nameItemShare]}>
                    {item.props.category_name}
                  </Text>
                  <Text
                    style={[
                      {
                        paddingLeft: 10,
                        marginTop: 8,
                        marginLeft: 10,
                        fontSize: 16,
                        fontFamily: "NotoSansThaiMedium",
                      },
                    ]}
                  >
                    {item.props.category_num} {item.props.category_unit}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.boxAni}>
          <LottieView
            source={require("../assets/49859-searching-star-animation.json")}
            style={styles.animateSearch}
            autoPlay
            loop
          />
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.container_Menu}>
      <SearchItemSh />

      <Text
        style={{
          alignSelf: "flex-start",
          marginHorizontal: 15,
          marginTop: 30,
          fontSize: 18,
          // fontWeight: '500',
          fontFamily: "NotoSansThaiSemiBold",
        }}
      >
        การแบ่งปันใกล้ฉัน:{" "}
      </Text>
      <ListSearch />
    </SafeAreaView>
  );
};
export default SearchScreen;
