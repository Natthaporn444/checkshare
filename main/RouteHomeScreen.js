import * as React from "react";
import HomeMainScreen from "../layout/HomeMainScreen";
import MenuScreen from "../layout/MenuScreen";
import ListScreen from "../layout/MainListScreen";
import SlipScreen from "../layout/SlipScreen";
import MenuItemScreen from "../layout/MenuItemScreen";
import Basket from "../layout/Basket";
import NotiScreen from "../layout/NotiScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function RouteHomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="หน้าหลัก"
        component={HomeMainScreen}
        options={{
          headerRight: () => (
            <Ionicons
              name="notifications-outline"
              size={24}
              style={{ justifyContent: "center", right: 20 }}
              onPress={() => {
                // dispatch(setModalVisible({state: false, props: ""}));
                navigation.navigate("การแจ้งเตือน");
              }}
            />
          ),
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      />
      <Stack.Screen
        name="เลือกหมวดหมู่"
        component={MenuScreen}
        options={{
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      />
      <Stack.Screen
        name="รายการที่เลือก"
        component={Basket}
        options={{
          tabBarStyle: { display: "none" },
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      />
      <Stack.Screen
        name="รายการที่ต้องซื้อ"
        component={ListScreen}
        options={{
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      />
      <Stack.Screen
        name="สรุปรายการ"
        component={SlipScreen}
        options={{
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      />
      <Stack.Screen
        name="รายการ"
        component={MenuItemScreen}
        options={{
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      />
      {/* <Stack.Screen
        name="การแจ้งเตือน"
        component={NotiScreen}
        options={{
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      /> */}
    </Stack.Navigator>
  );
}
