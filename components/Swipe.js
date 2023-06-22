import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { Text, View } from "react-native";

export default SwipeList = () => {
  const [listData, setListData] = useState(
    Array(20)
      .fill("")
      .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
  );

  return (
    <View>
      <SwipeListView
        data={listData}
        renderItem={(item) => {
          return <Text>hello</Text>;
        }}
        renderHiddenItem={(item) => {
          return <Text>bye</Text>;
        }}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={(item) => {
          console.log(item);
        }}
      />
    </View>
  );
};
