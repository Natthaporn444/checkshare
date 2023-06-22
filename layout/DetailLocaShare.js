import * as React from "react";
import styles from "../template/theme";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { isUpdate } from "../redux/action";
import moment from "moment";
import firebase from "firebase/compat";
import * as Location from "expo-location";
import MapView, { Marker, Callout, Circle } from "react-native-maps";

function DetailLocaShare({ navigate, route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { is_update, login } = useSelector((state) => state.userReducer);
  const [textPoint, setTextPoint] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedTimeEnd, setSelectedTimeEnd] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isTimeEndPickerVisible, setTimeEndPickerVisibility] = useState(false);

  const [popup, setPopup] = useState(false);
  const [pin, setPin] = React.useState({
    latitude: 13.7563,
    longitude: 100.5018,
    latitudeDelta: 0.0962,
    longitudeDelta: 0.0421,
  });
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const showTimeEndPicker = () => {
    setTimeEndPickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setTimePickerVisibility(false);
    setTimeEndPickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const m = new Date(date);
    var dateString =
      m.getUTCFullYear() +
      "/" +
      (m.getUTCMonth() + 1) +
      "/" +
      (m.getUTCDate() + 543);

    setSelectedDate(date);
    hideDatePicker();
  };
  const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 7);

  const handleConfirmTime = (date) => {
    const m = new Date(date);
    var dateString = m.getUTCHours() + ":" + m.getUTCMinutes();

    setSelectedTime(date);
    hideDatePicker();
  };
  const handleConfirmTimeEnd = (date) => {
    const m = new Date(date);
    var dateString = m.getUTCHours() + ":" + m.getUTCMinutes();

    setSelectedTimeEnd(date);
    hideDatePicker();
  };

  const Map = () => {
    return (
      <MapView
        style={{
          width: "96%",
          height: 145,
          borderRadius: 15,
          marginBottom: 10,
        }}
        initialRegion={pin}
        provider="google"
        center={pin}
        // showsUserLocation={false}
      >
        <Marker center={pin} coordinate={pin} draggable={true}>
          <Callout>
            <Text>This is a Callout</Text>
          </Callout>
        </Marker>
        <Circle center={pin} radius={1000} fillColor="rgba(0,0,0,0.3)" />
      </MapView>
    );
  };
  useEffect(() => {
    if (!is_update) {
      (async () => {
        if (route.params.pin) {
          setPin({
            ...pin,
            latitude: route.params.pin.latitude,
            longitude: route.params.pin.longitude,
          });
        } else {
          let location = await Location.getCurrentPositionAsync({});
          //   console.log('lo',location);
          setPin({
            ...pin,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
        dispatch(isUpdate(true));
      })();
    }
  });

  const modal = () => {
    var bgNoInput = {};
    var colorNoInput = {};
    if (textPoint) {
      bgNoInput = { backgroundColor: "#1B79DB", borderWidth: 0 };
      colorNoInput = { color: "#fff" };
    }
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={{ marginBottom: 10 }}>
          <Pressable style={[styles.listItem, { backgroundColor: "#1B79DB" }]}>
            <View style={styles.listItemView}>
              <View>
                <Image
                  style={[styles.listItemImg, { marginLeft: 10 }]}
                  source={route.params.props.category_img}
                />
              </View>
              <View>
                <Text style={[styles.ItemShareText]}>
                  {route.params.props.category_name}
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    marginLeft: 10,
                    fontFamily: "NotoSansThaiMedium",
                  }}
                >
                  {route.params.num} {route.params.props.category_unit}
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
        <ScrollView style={{ width: "100%" }}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.selectDT]}
              onPress={showDatePicker}
            >
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="calendar-outline"
                  style={[
                    styles.listIconHis,
                    { fontSize: 24, color: "#000", marginTop: -20 },
                  ]}
                />
                <Text
                  style={{
                    width: 200,
                    marginTop: 5,
                    marginLeft: 10,
                    fontFamily: "NotoSansThaiMedium",
                  }}
                >{`วันที่นัด: ${
                  selectedDate
                    ? moment(selectedDate).format("DD MMMM YYYY")
                    : moment(selectedDate).format("DD MMMM YYYY")
                }`}</Text>
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                locale="th_GB"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </TouchableOpacity>

            <KeyboardAvoidingView behavior="padding">
              <View
                style={{
                  width: "98%",
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "flex-start",
                }}
              >
                <TouchableOpacity
                  style={styles.selectTime}
                  onPress={showTimePicker}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      name="ios-time-outline"
                      style={[
                        styles.listIconHis,
                        { fontSize: 24, color: "#000", marginTop: -20 },
                      ]}
                    />
                    <Text
                      style={{
                        width: 200,
                        marginTop: 5,
                        marginLeft: 10,
                        fontFamily: "NotoSansThaiMedium",
                      }}
                    >{`${
                      selectedTime
                        ? moment(selectedTime).format("HH:mm น.")
                        : moment(selectedTime).format("HH:mm น.")
                    }`}</Text>
                  </View>

                  <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmTime}
                    onCancel={hideDatePicker}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    marginHorizontal: 20,
                    marginTop: "5%",
                    fontFamily: "NotoSansThaiMedium",
                  }}
                >
                  ถึง
                </Text>
                <TouchableOpacity
                  style={styles.selectTime}
                  onPress={showTimeEndPicker}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      name="ios-time-outline"
                      style={[
                        styles.listIconHis,
                        { fontSize: 24, color: "#000", marginTop: -20 },
                      ]}
                    />
                    <Text
                      style={{
                        width: 200,
                        marginTop: 5,
                        marginLeft: 10,
                        fontFamily: "NotoSansThaiMedium",
                      }}
                    >{`${
                      selectedTimeEnd
                        ? moment(selectedTimeEnd).format("HH:mm น.")
                        : moment(selectedTimeEnd).format("HH:mm น.")
                    }`}</Text>
                  </View>

                  <DateTimePickerModal
                    isVisible={isTimeEndPickerVisible}
                    mode="time"
                    onConfirm={handleConfirmTimeEnd}
                    onCancel={hideDatePicker}
                  />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
              style={[styles.selectDT, { marginBottom: 10 }]}
              onPress={async () => {
                let { status } =
                  await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                  // console.log('Permission to access location was denied');
                  return;
                }
                let location = await Location.getCurrentPositionAsync({});
                dispatch(isUpdate(false));
                navigation.navigate("เลือกที่อยู่", {
                  pin: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  },
                  props: route.params.props,
                  num: route.params.num,
                });
              }}
            >
              <Text
                style={{ marginLeft: 20, fontFamily: "NotoSansThaiMedium" }}
              >
                เลือกจุดนัดพบเพื่อนัดรับ
              </Text>
            </TouchableOpacity>

            <Map />

            <TextInput
              style={[
                styles.input_popup,
                { width: "96%", marginLeft: 10, marginTop: 15 },
              ]}
              placeholder="สถานที่ใกล้เคียง/จุดสังเกตุ/เพิ่มเติม"
              placeholderTextColor={"#c2c2c2"}
              onChangeText={(newText) => setTextPoint(newText)}
            />
          </View>
        </ScrollView>

        <View style={[styles.summary]}>
          <TouchableOpacity
            style={[styles.btFinish, bgNoInput]}
            onPress={() => {
              firebase
                .firestore()
                .collection("item_share")
                .doc(route.params.props.item_id)
                .update({
                  //ลบปริมาณ
                  category_num:
                    parseInt(route.params.props.category_num) -
                    parseInt(route.params.num),
                });

              var props = route.params.props;
              props["category_num"] = route.params.num;

              firebase
                .firestore()
                .collection("food_share")
                .add({
                  props: props,
                  dateTime: {
                    date: selectedDate,
                    time: selectedTime,
                    timeEnd: selectedTimeEnd,
                  },
                  location: route.params.pin,
                  textmore: textPoint,
                  user_id: login.user_id,
                });
              // setPopup(true);
              dispatch(isUpdate(false));
              navigation.navigate("แบ่งปัน");
            }}
          >
            <Text style={[styles.textFinish, colorNoInput]}>โพส</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };
  return modal();
}
export default DetailLocaShare;
