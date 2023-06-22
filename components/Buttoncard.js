import * as React from "react";
import styles from "../template/theme";
import { Text, View, Touchable, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Card } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { isUpdate } from "../redux/action";

function Buttoncard({ props }) {
  const navigation = useNavigation();
  var isPut = "item";
  const dispatch = useDispatch();
  if (props.isPut) {
    isPut = "item_Put";
  }

  if (props.text === "") {
    return (
      <View style={[styles[isPut], { backgroundColor: "transparent" }]}></View>
    );
  }
  return (
    <Card
      button={true}
      style={[styles[isPut], styles.CardStyle]}
      onPress={() => {
        dispatch(isUpdate(false));
        navigation.navigate("รายการ", { type: props.id, click: true });
      }}
    >
      <View style={styles.bgIconMenu}>
        <Image style={styles.imgMenuCate} source={props.image} />
        {/* <Ionicons name="egg-outline" size={60} style={styles.IconStyle}/> */}
      </View>
      <Text style={styles.paragraph}>{props.text}</Text>
    </Card>
  );
}
export default Buttoncard;
