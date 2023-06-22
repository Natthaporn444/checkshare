import * as React from 'react';
import styles from '../template/theme';
import { Text, View,TouchableOpacity, SafeAreaView} from 'react-native';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';

function HistoryScreen() {
    const [isFocus, setIsFocus] = useState(false);
    const data = [
    { label: '7 วัน', value: '0' },
    { label: '15 วัน', value: '1' },
    { label: '1 เดือน', value: '2' },
    { label: '3 เดือน', value: '3' },
    { label: '6 เดือน', value: '4' },
    { label: '1 ปี', value: '5' },
    ];
    const [value, setValue] = useState(null);
    return(
        <SafeAreaView style={styles.container}>
            <View style={[{marginTop: 20}]}>
                <Text style={styles.titleList}>ใกล้หมดอายุ: </Text>
                    <TouchableOpacity style={styles.listItem}>
                        <View style={styles.HistoryItemView} >
                            <Ionicons
                                name='image-outline'
                                style={styles.listIconHis}
                                />
                            <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.listTextHis, {fontWeight: '600',  marginLeft: 80,}]}>ผักกาดขาว</Text>
                                <Text style={[styles.listTextHis, {fontWeight: '450', marginLeft: 20}]}> 0.50 กก</Text>
                            </View>
                            <View style={{marginTop: 10, alignSelf: "flex-start", flexDirection: 'row'}}>
                                <Text style={styles.listItemdateEXP}>หมดอายุ: dd/mm/yyyy</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
            </View>

            <View style={{marginTop: 50}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.titleList}>ดูรายการย้อนหลัง: </Text>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue'}, {marginLeft: 95, borderRadius:40, marginTop:-15}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={data}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'วันนี้' : '...' }
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}/>
                </View>
                <TouchableOpacity style={styles.listItem}>
                    <View style={styles.HistoryItemView} >
                        <Ionicons
                            name='image-outline'
                            style={styles.listIconHis}
                            />
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.listTextHis, {fontWeight: '600',  marginLeft: 80,}]}>ผักกาดขาว</Text>
                            <Text style={[styles.listTextHis, {fontWeight: '450', marginLeft: 20}]}> 0.50 กก</Text>
                        </View>
                        <View style={{marginTop: 10, alignSelf: "flex-start", flexDirection: 'row'}}>
                            <Text style={styles.listItemdateEXP}>หมดอายุ: dd/mm/yyyy</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}
export default HistoryScreen;