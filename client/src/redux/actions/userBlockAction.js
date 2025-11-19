import { GLOBALTYPES } from './globalTypes';
import {  getDataAPI } from '../../utils/fetchData';

export const USER_TYPES_BLOCK = {
  LOADING_USER: 'LOADING_USER',
 
  GET_USERS_BLOCK: 'GET_USERS_BLOCK',
};
 

export const getBlockedUsers = (token) => async (dispatch) => {
  try {
    dispatch({ type: USER_TYPES_BLOCK.LOADING_USER, payload: true });

    const res = await getDataAPI('users/block', token);
 
    dispatch({
      type: USER_TYPES_BLOCK.GET_USERS_BLOCK,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response?.data?.msg || "Error al obtener usuarios bloqueados" }
    });
  } finally {
    dispatch({ type: USER_TYPES_BLOCK.LOADING_USER, payload: false });
  }
};
