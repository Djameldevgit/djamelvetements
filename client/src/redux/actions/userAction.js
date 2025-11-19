import { GLOBALTYPES } from './globalTypes';
import { imageUpload } from '../../utils/imageUpload';
import {postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI  } from '../../utils/fetchData';
 
export const USER_TYPES = {
    LOADING_USERS: 'LOADING_USERS',
    GET_USERS: 'GET_USERS',
    UPDATE_USER: 'UPDATE_USER',
   
    DELETE_USER: 'DELETE_USER',
    BLOCK_USER_SUCCESS: 'BLOCK_USER_SUCCESS',
    UNBLOCK_USER_SUCCESS: 'UNBLOCK_USER_SUCCESS',
    UPDATE_PRIVILEGIOS: 'UPDATE_PRIVILEGIOS',
CREATE_COMMENT:'CREATE_COMMENT',
GET_ADMIN_COMMENTS:'GET_ADMIN_COMMENTS',
DELETE_ADMIN_COMMENT:'DELETE_ADMIN_COMMENT',
UPDATE_USER_VERIFICATION:'UPDATE_USER_VERIFICATION'

    
};










export const updateUserFeatures = ({ userId, features, token }) => async (dispatch) => {
  try {
    const res = await fetch(`/api/users/${userId}/features`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(features)
    });

    const data = await res.json();
    if (data.msg) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: data.msg }
      });
    }

    dispatch({
      type: "UPDATE_USER",
      payload: { ...data.user }
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.message }
    });
  }
};





export const toggleVerification = (userId, token) => async (dispatch) => {
  try {
    const res = await patchDataAPI(`users/${userId}/toggle-verify`, {}, token);

    // Actualiza el usuario en el store
    dispatch({
      type: USER_TYPES.UPDATE_USER_VERIFICATION,
      payload: res.data.user, // { _id, isVerified, ... }
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.msg },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response?.data?.msg || "Error al cambiar verificación" },
    });
  }
};

export const getUsers = (token) => async (dispatch) => {
    try {
        // Usa exactamente el mismo nombre que definiste en USER_TYPES
        dispatch({ type: USER_TYPES.LOADING_USERS, payload: true });
       
        const res = await getDataAPI('users', token);
         if (!res || !res.data) {
          console.error("Respuesta inválida en getUsers:", res);
          return;
        }
        // Verifica que la respuesta tenga datos antes de dispatch
        if (!res.data) {
            throw new Error('No data received');
        }

        dispatch({
          type: USER_TYPES.GET_USERS,
          payload: { ...res.data, page: 1 },
        });

    } catch (err) {
        console.error('Error in getUsers:', err);
        
        dispatch({
            type: GLOBALTYPES.ALERT,  // Verifica también esta constante
            payload: {
                error: err.response?.data?.msg || 
                      err.message || 
                      'Error loading users'
            }
        });
    } finally {
        dispatch({ type: USER_TYPES.LOADING_USERS, payload: false });
    }
};
export const getUsersAction= (token) => async (dispatch) => {
  try {
      dispatch({ type: USER_TYPES.LOADING_USER, payload: true });
      const res = await getDataAPI(`users/usersaction`, token);
    
      dispatch({
        type: USER_TYPES.GET_USERS,
        payload: { ...res.data, page: 1 },
      });

      
      dispatch({ type: USER_TYPES.LOADING_USERS, payload: false });
  } catch (err) {
      dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg }
      });
  }
};
// Acción para actualizar un usuario
export const updateUser = ({ content, images, auth, status }) => async (dispatch) => {
    let media = [];
    const imgNewUrl = images.filter(img => !img.url);
    const imgOldUrl = images.filter(img => img.url);

    if (status.content === content
        && imgNewUrl.length === 0
        && imgOldUrl.length === status.images.length
    ) return;

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);

        const res = await patchDataAPI(`user/${status._id}`, {
            content, images: [...imgOldUrl, ...media]
        }, auth.token);

        dispatch({ type: USER_TYPES.UPDATE_USER, payload: res.data.newUser });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
};
export const toggleActiveStatus = (userId, token) => async (dispatch) => {
  try {
    const res = await patchDataAPI(`toggle_active/${userId}`, null, token);
    dispatch({
      type: USER_TYPES.UPDATE_USER,
      payload: res.data.user,
    });
  } catch (err) {
    console.error(err);
  }
};


export const deleteUser = ({id, auth}) => async (dispatch) => {
    try {
      dispatch({ type: USER_TYPES.LOADING_USERS, payload: true });
      
      await deleteDataAPI(`user/${id}`, auth.token);
      
      dispatch({
        type: USER_TYPES.DELETE_USER,
        payload: id // Envía solo el ID string
      });
  
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: 'Usuario eliminado correctamente' }
      });
  
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response?.data?.msg || 'Error al eliminar usuario' }
      });
    } finally {
      dispatch({ type: USER_TYPES.LOADING_USERS, payload: false });
    }
  };



  export const bloquearUsuario = ({ auth, datosBloqueo, user }) => async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
  
      const res = await patchDataAPI(`user/${user._id}/block`, {
        motivo: datosBloqueo.motivo,
        content: datosBloqueo.content,
        fechaLimite: datosBloqueo.fechaLimite,
      }, auth.token);
  
      dispatch({
        type: USER_TYPES.BLOCK_USER_SUCCESS,
        payload: {
          userId: user._id,
          esBloqueado: true,
        }
      });
  
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response?.data?.msg || "Error al bloquear usuario" }
      });
    } finally {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }
  };



  export const unBlockUser = ({ user, auth }) => async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
  
      const res = await patchDataAPI(`user/${user._id}/unblock`, {}, auth.token);
  
      dispatch({
        type: USER_TYPES.UNBLOCK_USER_SUCCESS,
        payload: {
          userId: user._id,
          esBloqueado: false,
        }
      });
  
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response?.data?.msg || "Error al desbloquear usuario" }
      });
    } finally {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    }
  };

  export const updatePrivilegios = (id, opcionesUser, token) => async (dispatch) => {
    try {
      const res = await patchDataAPI(`user/${id}/privilegios`, { opcionesUser }, token);
  
      dispatch({
        type: USER_TYPES.UPDATE_USER,
        payload: res.data.user   // << usamos el usuario actualizado completo
      });
  
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg }
      });
  
    } catch (err) {
      const errorMsg = err.response?.data?.msg || err.message;
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: errorMsg }
      });
    }
  };
  export const createComment = ({ newComment, auth, socket }) => async (dispatch) => {
    try {
      const res = await postDataAPI('admin/comments', newComment, auth.token);
  
      // Emitir evento solo si socket está disponible
      if (socket) {
        socket.emit('createAdminComment', {
          ...res.data.newComment,
          user: auth.user // Info del creador
        });
      }
  
      dispatch({
        type: USER_TYPES.CREATE_COMMENT,
        payload: res.data.newComment
      });
  
      return res.data;
  
    } catch (err) {
      console.error("Error completo:", err.response?.data);
      throw err;
    }
  };
  
  export const getAdminComments = ({ adminUserId, auth }) => async (dispatch) => {
    try {
      console.log('[FRONTEND] Solicitando comentarios para:', adminUserId);
      
      const res = await getDataAPI(`admin/comments/${adminUserId}`, auth.token);
      
      if (!res.data?.success) {
        throw new Error(res.data?.error || 'Error en la respuesta del servidor');
      }
  
      dispatch({
        type:  USER_TYPES.GET_ADMIN_COMMENTS,
                payload: {
          adminUserId,
          comments: res.data.comments
        }
      });
  
    } catch (err) {
      console.error('[FRONTEND] Error completo:', {
        url: err.config?.url,
        status: err.response?.status,
        data: err.response?.data,
        stack: err.stack
      });
      
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: 'Error al cargar comentarios',
          details: process.env.NODE_ENV === 'development' ? 
            `${err.message} - ${err.response?.data?.details}` : 
            undefined
        }
      });
      
      throw err; // Para manejo adicional en componentes
    }
  };
  
  export const deleteAdminComment = ({ commentId, auth, socket }) => async (dispatch) => {
    try {
      await deleteDataAPI(`admin/comments/${commentId}`, auth.token);
      
      if (socket) {
        socket.emit('deleteAdminComment', { commentId });
      }
  
      dispatch({
        type: USER_TYPES.DELETE_ADMIN_COMMENT,
        payload: commentId
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response?.data?.msg || 'Error al eliminar comentario' }
      });
      throw err;
    }
  };