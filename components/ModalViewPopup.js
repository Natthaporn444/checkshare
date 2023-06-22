import * as React from 'react';
import styles from "../template/theme";
import { Text, View,Modal,Pressable,TextInput,Alert,TouchableWithoutFeedback, Keyboard,KeyboardAvoidingView} from 'react-native';
import { setModalVisible, addDataF, isUpdate } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { useState, useEffect } from 'react';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function ModalViewPopup ({props}){
  const navigation = useNavigation(); 
  const [text, setText] = useState('');
  const {modalVisible, modal_dataID} = useSelector(state=>state.userReducer);

  //HomeScreen
    const dispatch = useDispatch();
    const modal = () => {
      var c = {}
      var inpT = {}
      if(text){
        c = {backgroundColor: '#1B79DB'}
        inpT = {color: '#fff'}
      }  
        return(      
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible.state}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            dispatch(setModalVisible({state: false}));
        }}>
          <DismissKeyboard>
          <KeyboardAvoidingView behavior="padding" style={styles.centeredView}>
            <View style={[styles.modalView, {height: 180 }]}>
              <Text style={[styles.modalText]}>ปัดขวาเพื่อเช็ค</Text>

                <View style={[styles.btCreatlist, {marginTop: 30}]}>
                  <Pressable
                    style={[styles.button, styles.buttonClose,c]}
                    onPress={() => {
                      dispatch(setModalVisible({state: false, props: ""}))
                      navigation.navigate('รายการที่ต้องซื้อ');
                    }}
                  >
                      <Text style={[styles.textStyle,inpT]}>ตกลง</Text>
                  </Pressable>
                </View>
            </View>
            </KeyboardAvoidingView>
          {/* </View> */}
          </DismissKeyboard>
        </Modal> 
    )
  }
  return modal();
}

export default ModalViewPopup;