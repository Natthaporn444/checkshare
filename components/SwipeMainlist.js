import styles from "../template/theme";
import { Text, View, TouchableOpacity, Alert, Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { deleteData, isUpdate } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";

function SwipeMainlist({ props }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.swipeMain]}
      onPress={() => {
        Alert.alert("ลบรายการ", "ต้องการลบรายการ หรือไม่?", [
          {
            text: "ยกเลิก",
            // onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "ลบ",
            color: "#000",
            onPress: () => {
              // console.log(props)
              dispatch(
                deleteData({
                  id: props.menuList_id,
                  topic: "menu_list",
                  key: "menuList_id",
                })
              );
              dispatch(
                deleteData({
                  id: props.menuList_id,
                  topic: "basket",
                  key: "list_id",
                })
              );
              dispatch(isUpdate(false));
            },
          },
        ]);
      }}
    >
      {/* <View style={styles.swipeView} > */}
      {/* <Text style={[styles.mainlistText]}></Text> */}
      <Ionicons
        name="trash-outline"
        style={[styles.SwipeIcon, { color: "#fff" }]}
      />
      {/* </View> */}
    </TouchableOpacity>
  );
}
export default SwipeMainlist;
