export const SET_MODALVISIBLE = "SET_MODALVISIBLE";
export const SET_MENUITEM = "SET_MENUITEM";
export const ADD_LISTITEM = "ADD_LISTITEM";
export const ADD_BASKET = "ADD_BASKET";
export const ADD_DATAFIREBASE = "ADD_DATAFIREBASE";
export const DELEST_DATA = "DELEST_DATA";
export const IS_UPDATE = "IS_UPDATE";
export const SET_CATETYPE = "SET_CATETYPE";
export const PUSH_ITEM = "PUSH_ITEM";
export const SEARCH_ITEM = "SEARCH_ITEM";
export const ITEM_DATA = "ITEM_DATA";
export const SET_MODALPOP = "SET_MODALPOP";
export const LOGIN = "LOGIN";
export const PUSH_LIST = "PUSH_LIST";
export const ITEM_NAME = "ITEM_NAME";

export const isUpdate = (isUpdate) => (dispatch) => {
  dispatch({
    type: IS_UPDATE,
    payload: isUpdate,
  });
};

export const setModalVisible = (modalVisible) => (dispatch) => {
  dispatch({
    type: SET_MODALVISIBLE,
    payload: modalVisible,
  });
};

export const setModalPop = (modalPop) => (dispatch) => {
  dispatch({
    type: SET_MODALPOP,
    payload: modalPop,
  });
};

export const setMenuItem = (item_name) => (dispatch) => {
  dispatch({
    type: SET_MENUITEM,
    payload: item_name,
  });
};

export const setCateType = (cate_type) => (dispatch) => {
  dispatch({
    type: SET_CATETYPE,
    payload: cate_type,
  });
};

export const addListItem = (listItem) => (dispatch) => {
  dispatch({
    type: ADD_LISTITEM,
    payload: listItem,
  });
};

export const addBasket = (basket) => (dispatch) => {
  dispatch({
    type: ADD_BASKET,
    payload: basket,
  });
};

export const addDataF = (addDataF) => (dispatch) => {
  dispatch({
    type: ADD_DATAFIREBASE,
    payload: addDataF,
  });
};

export const deleteData = (deleteData) => (dispatch) => {
  dispatch({
    type: DELEST_DATA,
    payload: deleteData,
  });
};

export const pushItem = (pushItem) => (dispatch) => {
  dispatch({
    type: PUSH_ITEM,
    payload: pushItem,
  });
};
export const pushList = (pushList) => (dispatch) => {
  dispatch({
    type: PUSH_LIST,
    payload: pushList,
  });
};

export const searchItem = (searchItem) => (dispatch) => {
  dispatch({
    type: SEARCH_ITEM,
    payload: searchItem,
  });
};

export const itemData = (itemData) => (dispatch) => {
  dispatch({
    type: ITEM_DATA,
    payload: itemData,
  });
};

export const setLogin = (login) => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: login,
  });
};

export const setItemName = (item_name) => (dispatch) => {
  dispatch({
    type: ITEM_NAME,
    payload: item_name,
  });
};
