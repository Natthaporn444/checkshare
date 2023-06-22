import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styles from "../template/theme";
import uuid from "react-native-uuid";
import { useSelector, useDispatch } from "react-redux";
import { isUpdate, searchItem } from "../redux/action";
import { useNavigation } from "@react-navigation/native";
import Buttoncard from "../components/Buttoncard";
import BasKetButton from "../components/BasketButton";
import { useEffect } from "react";

export default MenuList = ({ navigate, route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { search } = useSelector((state) => state.userReducer);

  const menuitem = [
    {
      id: uuid.v4(),
      text: "ผัก",
      image: {
        uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/icon-veget-01.png?alt=media&token=4bde5994-368f-4e7d-8c7c-c20c20b13c2f",
      },
      id: 1,
    },
    {
      id: uuid.v4(),
      text: "ผลไม้",
      image: {
        uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/icon-fruit-01.png?alt=media&token=f4547860-868f-4784-96cb-bab5a03b2c02",
      },
      id: 2,
    },
    {
      id: uuid.v4(),
      text: "เนื้อหมู",
      image: {
        uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/icon-pork-01.png?alt=media&token=f6a0bed9-7342-493d-8891-d918e8381826",
      },
      id: 3,
    },
    {
      id: uuid.v4(),
      text: "เนื้อไก่",
      image: {
        uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/icon-chicken-01.png?alt=media&token=2faf5c6c-65a9-4ee3-92ca-38ecb4d27c88",
      },
      id: 4,
    },
    {
      id: uuid.v4(),
      text: "เป็ด",
      image: {
        uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/icon-duck-01.png?alt=media&token=cc999f23-2a0b-4f64-9c4f-314d78f7f16d",
      },
      id: 5,
    },
    {
      id: uuid.v4(),
      text: "เนื้อวัว",
      image: {
        uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/icon-meat-01.png?alt=media&token=d62dabeb-5ac5-4e5e-8aec-6c2a802cbafd",
      },
      id: 6,
    },
    {
      id: uuid.v4(),
      text: "ไข่",
      image: {
        uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/icon-egg-01.png?alt=media&token=19c71f83-104c-4d37-8091-43a938617fe7",
      },
      id: 7,
    },
    {
      id: uuid.v4(),
      text: "ไส้กรอก",
      image: {
        uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/icon-sausage-01.png?alt=media&token=4d6fe345-48ba-4ea3-a936-d4e8b130d80d",
      },
      id: 8,
    },
    {
      id: uuid.v4(),
      text: "อาหารทะเล",
      image: {
        uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/icon-shrimp-01.png?alt=media&token=c8c23414-a82a-42c7-9cb5-891e1b58a465",
      },
      id: 9,
    },
    {
      id: uuid.v4(),
      text: "ปลา",
      image: {
        uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/icon-fish-01.png?alt=media&token=15417e92-524d-4e26-b9f7-293ce04c835b",
      },
      id: 10,
    },
    {
      id: uuid.v4(),
      text: "เครื่องปรุง",
      image: {
        uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/condi-01.png?alt=media&token=4c8b452b-2d1a-4d2f-8956-c4a15daeccd2",
      },
      id: 11,
    },
    {
      id: uuid.v4(),
      text: "ข้าวสาร&แป้ง",
      image: {
        uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/iconSNP-rice-01.png?alt=media&token=58314061-5d68-4670-b931-6acfc7b57dfd",
      },
      id: 12,
    },
    {
      id: uuid.v4(),
      text: "ธัญพืช",
      image: {
        uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/icon-Cerealspng-01.png?alt=media&token=0b2a0efd-60d9-4007-ad1d-b222ef3a5010",
      },
      id: 13,
    },
    {
      id: uuid.v4(),
      text: "น้ำมัน",
      image: {
        uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/icon-oil-01.png?alt=media&token=ecd6d982-f3c5-461d-9f93-f068a80beb21",
      },
      id: 14,
    },
    {
      id: uuid.v4(),
      text: "จิปาถะ",
      image: {
        uri: "https://firebasestorage.googleapis.com/v0/b/snp-65.appspot.com/o/iconSNP-water-01.png?alt=media&token=d1a21dfd-5311-4d5b-8fe0-e00874da6b28",
      },
      id: 15,
    },
  ];

  if (menuitem.length % 2 !== 0) {
    menuitem.push({ id: uuid.v4(), text: "" });
  }
  return (
    <View style={styles.container}>
      <View style={styles.container_Card}>
        <FlatList
          style={styles.container_Menu}
          data={menuitem}
          numColumns={2}
          renderItem={({ item }) => <Buttoncard props={item} />}
        />
        <BasKetButton />
      </View>
    </View>
  );
};
