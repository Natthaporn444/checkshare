import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isUpdate, searchItem } from "../redux/action";
import styles from "../template/theme";
import {
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
// const {search} = useSelector(state=>state.userReducer);
const Search = ({ clicked, searchPhrase, setSearchPhrase }) => {
  const dispatch = useDispatch();
  return (
    <DismissKeyboard>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        {/* Input field */}
        <TextInput
          style={styles.input_search}
          placeholder="ค้นหา"
          placeholderTextColor="#c2c2c2"
          value={searchPhrase}
          onChangeText={(newText) => {
            dispatch(searchItem(newText));
            dispatch(isUpdate(false));
          }}
        />
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="#000"
          style={{ marginLeft: 1 }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        )}
      </View>
    </DismissKeyboard>
  );
};
export default Search;
