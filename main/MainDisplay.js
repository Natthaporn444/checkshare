import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import RouteHomeScreen from "./RouteHomeScreen";
import RouteShareScreen from "./RouteShareScreen";
import RouteSearchScreen from "./RouteSearchScreen";
import RouteProfileScreen from "./RouteProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainDisplay() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "หน้าหลัก") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "รายการของฉัน") {
              iconName = focused ? "ios-receipt" : "ios-receipt-outline";
            } else if (route.name === "แบ่งปัน") {
              iconName = focused ? "create-sharp" : "create-outline";
            } else if (route.name === "ค้นหา") {
              iconName = focused ? "search-sharp" : "search-outline";
            } else if (route.name === "โปรไฟล์") {
              iconName = focused ? "person" : "person-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#1B79DB",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="หน้าหลัก"
          component={RouteHomeScreen}
          options={{
            // tabBarStyle: { display: "none" },
            tabBarLabelStyle: { fontFamily: "NotoSansThaiMedium" },
            // headerRight: () => (
            //   <Ionicons name="notifications" size={24} style={{alignItems: 'left',justifyContent: 'center', right: 20,}}/>
            // ),
            // headerLeft: () => (
            //   <Ionicons name="md-menu" size={24} style={{alignItems: 'left',justifyContent: 'center', right: -20,}}/>
            // )
          }}
        />
        {/* <Tab.Screen name="รายการของฉัน" component={RouteHistoryScreen} options={{
            headerRight: () => (
              <Ionicons name="notifications" size={24} style={{alignItems: 'left',justifyContent: 'center', right: 20,}}/>
            ),
            headerLeft: () => (
              <Ionicons name="md-menu" size={24} style={{alignItems: 'left',justifyContent: 'center', right: -20,}}/>
            )
          }}/> */}
        <Tab.Screen
          name="แบ่งปัน"
          component={RouteShareScreen}
          options={{
            tabBarLabelStyle: { fontFamily: "NotoSansThaiMedium" },
          }}
        />
        <Tab.Screen
          name="ค้นหา"
          component={RouteSearchScreen}
          options={{
            tabBarLabelStyle: { fontFamily: "NotoSansThaiMedium" },
          }}
        />
        <Tab.Screen
          name="โปรไฟล์"
          component={RouteProfileScreen}
          options={{
            tabBarLabelStyle: { fontFamily: "NotoSansThaiMedium" },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
