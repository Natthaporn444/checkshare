import * as React from 'react';
import styles from "../template/theme";
import { Text, View, Touchable, Image} from 'react-native';
import { Card } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setModalVisible, setMenuItem } from '../redux/action';

function ButtoncardVeget({props}){
    const navigation = useNavigation(); 
    var isPut = "item";
    const dispatch = useDispatch();
    if(props.isPut){
        isPut = "item_Put"
    }

    if(props.item_name === ''){
        return <View style={[styles[isPut], {backgroundColor: 'transparent'}]}></View>
    }
    
    return( 
        <Card button={true} 
            style={[styles[isPut], styles.CardStyle]}
            onPress={() => {
                dispatch(setMenuItem({id: props.item_id, isPut: props.isPut})),
                dispatch(setModalVisible({state: true}))
            }}>
            <View style={[styles.bgIconMenu, {backgroundColor: 'none'}]}>
                <Image style={styles.imgCate} source={props.item_img}/>
            </View>
                <Text style={styles.paragraph}>{props.item_name}</Text>
        </Card> 
    )
}
export default ButtoncardVeget;
