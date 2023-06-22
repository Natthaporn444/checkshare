import * as React from "react";
import ProfileScreen from "../layout/ProfileScreen";
import LoginScreen from "../layout/LoginScreen";
import RegisScreen from "../layout/RegisScreen";
import NotiScreen from "../layout/NotiScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import EditProfileScreen from "../layout/EditProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
export default function RouteProfileScreen({ navigation }) {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="โปรไฟล์" component={ProfileScreen}/> */}
      <Stack.Screen
        name="โปรไฟล์"
        component={LoginScreen}
        options={{
          // headerRight: () => (
          //   <Ionicons
          //     name="notifications-outline"
          //     size={24}
          //     style={{ justifyContent: "center", right: 20 }}
          //     onPress={() => {
          //       // dispatch(setModalVisible({state: false, props: ""}));
          //       navigation.navigate("การแจ้งเตือน");
          //     }}
          //   />
          // ),
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      />
      {/* <Stack.Screen name="โปรไฟล์" component={ProfileScreen}
                options={{
                    headerRight: () => (    
                            <Ionicons name="notifications" size={24} style={{alignItems: 'left',justifyContent: 'center', right: 20,}}/>
                    ),
                    headerLeft: () => (
                            <Ionicons name="md-menu" size={24} style={{alignItems: 'left',justifyContent: 'center', right: -20,}}/>
                            
                    )
                }}
            /> */}
      {/* <Stack.Screen name="โปรไฟล์" component={ProfileScreen}/> */}
      <Stack.Screen
        name="ลงทะเบียน"
        component={RegisScreen}
        options={{
          headerTitleStyle: { fontFamily: "NotoSansThaiMedium", fontSize: 18 },
        }}
      />
      <Stack.Screen
        name="แก้ไขโปรไฟล์"
        component={EditProfileScreen}
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
