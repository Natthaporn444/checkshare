import styles from "../template/theme";
import { Text, View,TouchableOpacity, Alert,Button,Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { deleteData, isUpdate, setModalVisible, setModalPop } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import React,{useCallback} from "react";

function Mainlist({props}){
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return(
          <Pressable style={[styles.listItemMain]}
          onPress={() => {
              dispatch(isUpdate(false))
              navigation.navigate("รายการที่ต้องซื้อ",{list_id: props.menuList_id, list_idF: props.id});
              }}>
                {/* <ModalViewPopup/> */}
              <View style={styles.listItemView} >
                  <Text style={[styles.mainlistText]}>{props.menuList_name}</Text>
              </View>
          </Pressable>
    )
}
export default Mainlist;