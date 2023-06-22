import * as React from "react";
import styles from "../template/theme";
import { Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector, useRef } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { isUpdate } from "../redux/action";
import * as Location from "expo-location";

function MapScreen({ navigate, route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { is_update } = useSelector((state) => state.userReducer);
  const [pin, setPin] = React.useState({
    latitude: route.params.pin.latitude,
    longitude: route.params.pin.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [mark, setMark] = React.useState([
    {
      latitude: route.params.pin.latitude - 0.002,
      longitude: route.params.pin.longitude - 0.01,
    },
    {
      latitude: route.params.pin.latitude - 0.01,
      longitude: route.params.pin.longitude,
    },
    {
      latitude: route.params.pin.latitude - 0.008,
      longitude: route.params.pin.longitude - 0.003,
    },
    {
      latitude: route.params.pin.latitude - 0.012,
      longitude: route.params.pin.longitude - 0.008,
    },
  ]);

  const MarkerOther = () => {
    return mark.map((point) => {
      return (
        <Marker
          coordinate={{ latitude: point.latitude, longitude: point.longitude }}
          draggable={false}
          pinColor="#1B79DB"
        />
      );
    });
  };

  React.useEffect(() => {
    if (!is_update) {
      (async () => {
        let location = await Location.getCurrentPositionAsync({});
        //   console.log('lo',location);
        setPin({
          ...pin,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        dispatch(isUpdate(true));
      })();
    }
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={pin}
        provider="google"
        showsUserLocation={true}
        onUserLocationChange={(e) => {
          // console.log('onUserLocationChange', e.nativeEvent.coordinate)
          // setPin({
          //     latitude: e.nativeEvent.coordinate.latitude,
          //     longitude: e.nativeEvent.coordinate.longitude,
          //     latitudeDelta: 0.0922,
          //     longitudeDelta: 0.0421,
          // })
        }}
      >
        <Marker
          coordinate={pin}
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag Start", e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            console.log("Drag End", e.nativeEvent.coordinate);
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout>
            <Text>This is a Callout</Text>
          </Callout>
        </Marker>

        {mark.map((point) => {
          let checkLa = pin.latitude - point.latitude;
          let checkLo = pin.longitude - point.longitude;
          let color = "#1B79DB";
          if (checkLa > 0.01 || checkLo > 0.01) {
            color = "#878787";
          }
          return (
            <Marker
              coordinate={{
                latitude: point.latitude,
                longitude: point.longitude,
              }}
              draggable={false}
              pinColor={color}
            />
          );
        })}

        <Circle center={pin} radius={1000} fillColor="rgba(0,0,0,0.3)" />
      </MapView>
      <View style={styles.summary}>
        <TouchableOpacity
          style={[styles.btFinish, { backgroundColor: "#1B79DB" }]}
          onPress={() => {
            navigation.navigate("รายละเอียด", {
              pin: pin,
              props: route.params.props,
              num: route.params.num,
            });
            dispatch(isUpdate(false));
          }}
        >
          <Text style={[styles.textFinish, { color: "#fff" }]}>
            บันทึกที่อยู่
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default MapScreen;
