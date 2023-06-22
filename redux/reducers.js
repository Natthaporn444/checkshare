import firebase from "../Database/config";
import {
  SET_MODALVISIBLE,
  SET_MENUITEM,
  ADD_LISTITEM,
  ADD_BASKET,
  ADD_DATAFIREBASE,
  DELEST_DATA,
  IS_UPDATE,
  SET_CATETYPE,
  PUSH_ITEM,
  SEARCH_ITEM,
  ITEM_DATA,
  SET_MODALPOP,
  LOGIN,
  PUSH_LIST,
  ITEM_NAME,
} from "./action";

var initialState = {
  open: false,
  is_update: false,
  modalVisible: {
    state: false,
    props: {},
  },
  modal_dataID: "",
  item: [],
  listItem: [],
  basket: [],
  list_id: "",
  search: "",
  item_Data: [],
  item_share: [],
  login: {
    user_name: "",
    state: false,
    user_id: "",
    user_avatar: "",
    location: {
      latitude: "",
      longitude: "",
    },
    token: "",
    score: "",
    scoreList: "",
  },
  item_name: "",
};

const addData = async (topic, data) => {
  const res = await firebase.firestore().collection(topic).add(data);
};

const updateData = async () => {
  const res = await firebase
    .firestore()
    .collection("menu_list")
    .doc("HmXe5dzgXUBaDc57IdG4")
    .update({ state: false });
};

const deleteData = async (id, topic, key) => {
  // const res = await firebase.firestore().collection(topic).doc(id).delete()
  const dbRef = await firebase.firestore().collection(topic);
  const snapshot = await dbRef.get();

  snapshot.forEach((doc) => {
    // console.log(doc.data())
    if (id === doc.data()[key]) {
      firebase.firestore().collection(topic).doc(doc.id).delete();
    }
  });
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case IS_UPDATE:
      return { ...state, is_update: action.payload };

    case SET_MODALVISIBLE:
      return {
        ...state,
        modalVisible: {
          state: action.payload.state,
          props: action.payload.props,
        },
      };

    case SET_MODALPOP:
      return {
        ...state,
        modalPop: { state: action.payload.state, props: action.payload.props },
      };

    case SET_MENUITEM:
      state.modal_dataID = action.payload.id;
      const PutButton = state.item.map((obj) => {
        if (obj.item_id === action.payload.id) {
          return { ...obj, isPut: action.payload.isPut };
        }
        return obj;
      });
      return { ...state, item_veget: PutButton };

    case SET_CATETYPE:
      state.modal_dataID = action.payload.id;
      const PutButton_cate = state.cate_type.map((obj) => {
        if (obj.id === action.payload.id) {
          return { ...obj, isPut: action.payload.isPut };
        }
        return obj;
      });
      return { ...state, cate_type: PutButton_cate };

    case ADD_BASKET:
      const check = state.basket.find(
        (data) => data.category_name === action.payload.cate_name
      );
      if (check) {
        check["category_num"] += action.payload.cate_num;
        return {
          ...state,
          basket: [
            ...state.basket.filter(
              (data) => data.category_name !== action.payload.cate_name
            ),
            check,
          ],
        };
      }
      return {
        ...state,
        basket: [
          ...state.basket,
          {
            list_id: action.payload.list_id,
            category_id: action.payload.cate_id,
            category_name: action.payload.cate_name,
            category_img: action.payload.cate_img,
            category_num: action.payload.cate_num,
            category_unit: action.payload.cate_unit,
            category_price: action.payload.cate_price,
            push_button: false,
            units: action.payload.units,
          },
        ],
      };

    case ADD_DATAFIREBASE:
      addData(action.payload.topic, action.payload.data);
      if (action.payload.topic === "basket") {
        return { ...state, basket: [] };
      }
      return {
        ...state,
        listItem: [...state.listItem, action.payload.data],
        list_id: action.payload.data.menuList_id,
      };

    case DELEST_DATA:
      deleteData(action.payload.id, action.payload.topic, action.payload.key);
      return {
        ...state,
        is_update: false,
        listItem: state.listItem.filter(
          (data) => data.menuList_id !== action.payload.id
        ),
      };

    case PUSH_ITEM:
      return { ...state, item: action.payload.item };

    case PUSH_LIST:
      return { ...state, listItem: action.payload.listItem };

    case ITEM_NAME:
      return { ...state, item_name: action.payload };

    case SEARCH_ITEM:
      return { ...state, search: action.payload };

    case ITEM_DATA:
      if (action.payload.push_id) {
        const update_item_Data = state.item_Data.map((data) => {
          if (data.id === action.payload.push_id) {
            return { ...data, push_button: !data.push_button };
          }
          return data;
        });

        return { ...state, item_Data: update_item_Data };
      }
      if (action.payload.delete_id) {
        firebase
          .firestore()
          .collection("basket")
          .doc(action.payload.delete_id)
          .delete();
        return {
          ...state,
          item_Data: state.item_Data.filter(
            (data) => data.id !== action.payload.delete_id
          ),
        };
      }
      return { ...state, item_Data: action.payload };

    case LOGIN:
      // console.log(action.payload);
      return {
        ...state,
        login: {
          user_name: action.payload.user_name,
          state: action.payload.state,
          user_id: action.payload.user_id,
          user_avatar: action.payload.user_avatar,
          location: {
            latitude: action.payload.location.latitude,
            longitude: action.payload.location.longitude,
          },
          token: action.payload.token,
          score: action.payload.score,
          scoreList: action.payload.scoreList,
        },
      };

    default:
      return state;
  }
}
export default userReducer;
