import styles from "../template/theme";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

function MainlistShare({ props }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.listShareMain}>
      <Image style={[styles.listItemShImg]} source={props.category_img} />
      <View style={[styles.MenulistShareDetail, { marginLeft: 3 }]}>
        <Text style={[styles.nameItemShare]}>{props.category_name}</Text>
        <Text
          style={[
            { paddingLeft: 10, marginTop: 8, marginLeft: 10, fontSize: 16 },
          ]}
        >
          {props.category_num} {props.category_unit}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export default MainlistShare;
