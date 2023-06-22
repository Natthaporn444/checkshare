import * as React from 'react';
import { useState,useCallback } from 'react';
import { RefreshControl} from 'react-native';
import { useDispatch } from 'react-redux';
import { isUpdate } from '../redux/action';

function Refresh({props}){
    const dispatch = useDispatch();
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        dispatch(isUpdate(false))
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);

        return(
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        )
}
export default Refresh;