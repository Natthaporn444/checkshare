import * as React from "react";
import HistoryScreen from "../layout/HistoryListScreen";
import NotiScreen from "../layout/NotiScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

export default function RouteHistoryScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="รายการของฉัน"
        component={HistoryScreen}
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
        name="การแจ้งเตือน"
        component={NotiScreen}
        options={{
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      />
    </Stack.Navigator>
  );
}
