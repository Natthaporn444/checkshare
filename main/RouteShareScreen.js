import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShareScreen from "../layout/ShareMainScreen";
import ListShareScreen from "../layout/ListShareScreen";
import MapScreen from "../layout/MapScreen";
import DetailItemShare from "../layout/DetailItemShare";
import { isUpdate } from "../redux/action";
import DetailLocaShare from "../layout/DetailLocaShare";
import PointScreen from "../layout/PointShareScreen";
import NotiScreen from "../layout/NotiScreen";
import MapTest from "../layout/MapTScreen";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function RouteShareScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { item_name } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(isUpdate(false));
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="แบ่งปัน"
        component={ShareScreen}
        options={{
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
          headerRight: () => (
            <Ionicons
              name="notifications-outline"
              size={24}
              style={{ justifyContent: "center", right: 20 }}
              onPress={() => {
                // dispatch(setModalVisible({state: false, props: ""}));
                dispatch(isUpdate(false));
                navigation.navigate("การแจ้งเตือน");
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="รายการที่คุณแบ่งปันได้"
        component={ListShareScreen}
        options={{
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      />
      <Stack.Screen
        name="ระบุปริมาณ"
        component={DetailItemShare}
        options={{
          title: "ระบุปริมาณ (" + item_name + ")",
          headerRight: () => (
            <Ionicons
              name="notifications-outline"
              size={24}
              style={{ justifyContent: "center", right: 20 }}
              onPress={() => {
                navigation.navigate("การแจ้งเตือน");
              }}
            />
          ),
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      />
      <Stack.Screen
        name="รายละเอียด"
        component={DetailLocaShare}
        options={{
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      />
      <Stack.Screen
        name="เลือกที่อยู่"
        component={MapScreen}
        options={{
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      />
      <Stack.Screen
        name="โลเคชั่น"
        component={MapTest}
        options={{
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      />

      <Stack.Screen
        name="สำเร็จ"
        component={PointScreen}
        options={{
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      />
      <Stack.Screen
        name="การแจ้งเตือน"
        component={NotiScreen}
        options={{
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      />
    </Stack.Navigator>
  );
}
