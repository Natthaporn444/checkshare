import * as React from "react";
import SearchScreen from "../layout/SearchScreen";
import ItemSearchDe from "../layout/ItemSearchDe";
import { useDispatch } from "react-redux";
import NotiScreen from "../layout/NotiScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { isUpdate } from "../redux/action";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function RouteSearchScreen({ navigation }) {
  const dispatch = useDispatch();
  dispatch(isUpdate(false));
  console.log(navigation);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ค้นหา"
        component={SearchScreen}
        options={{
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
          headerRight: () => (
            <Ionicons
              name="notifications-outline"
              size={24}
              style={{ justifyContent: "center", right: 20 }}
              onPress={() => {
                dispatch(isUpdate(false));
                // dispatch(setModalVisible({state: false, props: ""}));
                navigation.navigate("การแจ้งเตือน");
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="รายละเอียด"
        component={ItemSearchDe}
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
