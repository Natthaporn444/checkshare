import * as React from 'react';
import { TouchableOpacity} from 'react-native';
import styles  from '../template/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { isUpdate } from '../redux/action';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

function BasKetButton({props}){
const dispatch = useDispatch();
  const navigation = useNavigation(); 
    return( 
        <TouchableOpacity style={[styles.fab, styles.shadowProp]}
              onPress={() => {
                dispatch(isUpdate(false))
                navigation.navigate('รายการที่เลือก');
               }}>
                <Ionicons name="ios-basket-outline" style={styles.fabIcon}/>
        </TouchableOpacity>
    )
}
export default BasKetButton;
