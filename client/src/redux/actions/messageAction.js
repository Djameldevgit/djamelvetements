import { GLOBALTYPES, DeleteData } from '../actions/globalTypes'
import { postDataAPI, getDataAPI, deleteDataAPI } from '../../utils/fetchData'
import { createNotify } from './notifyAction'


export const MESS_TYPES = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',
    GET_CONVERSATIONS: 'GET_CONVERSATIONS',
    GET_MESSAGES: 'GET_MESSAGES',
    UPDATE_MESSAGES: 'UPDATE_MESSAGES',
    DELETE_MESSAGES: 'DELETE_MESSAGES',
    DELETE_CONVERSATION: 'DELETE_CONVERSATION',
    CHECK_ONLINE_OFFLINE: 'CHECK_ONLINE_OFFLINE',
    TYPING_START: 'TYPING_START',
    TYPING_STOP: 'TYPING_STOP',
    SET_TYPING: 'SET_TYPING',
    UPDATE_USER_STATUS: 'UPDATE_USER_STATUS' // 🔹 AGREGADO DENTRO del objeto
}

// 🔹 LUEGO las acciones que usan MESS_TYPES
export const updateUserStatus = (data) => (dispatch) => {
    dispatch({
        type: MESS_TYPES.UPDATE_USER_STATUS,
        payload: data
    });
};


export const stopTyping = ({ sender, recipient, chatId }) => ({
    type: MESS_TYPES.TYPING_STOP,
    payload: { sender, recipient, chatId }
});

export const setTyping = (typingData) => ({
    type: MESS_TYPES.SET_TYPING,
    payload: typingData
});


export const addMessage = ({ msg, auth, socket }) => async (dispatch) => {
    

    dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg })

    const { _id, avatar, fullname, username } = auth.user;
    socket.emit('addMessage', { ...msg, user: { _id, avatar, fullname, username } })

    try {
        const response = await postDataAPI('message', msg, auth.token);

        // Notificación solo si la API fue exitosa
        if (response && response.data) {
            const notifyMsg = {
                id: _id,
                text: 'sentyouamessage',
                textNs: 'notify',
                recipients: [msg.recipient],
                url: `/message/${_id}`,
                content: msg.text.substring(0, 50), // Primeros 50 caracteres
                image: avatar
            }
            dispatch(createNotify({ msg: notifyMsg, auth, socket }))
        }

    } catch (err) {
        // Manejo seguro del error
        const errorMessage = err.response?.data?.msg ||
            err.message ||
            'Error sending message';

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: errorMessage }
        })
    }
}
export const getConversations = ({ auth, page = 1 }) => async (dispatch) => {
    try {
        const res = await getDataAPI(`conversations?limit=${page * 9}`, auth.token)

        let newArr = [];
        res.data.conversations.forEach(item => {
            item.recipients.forEach(cv => {
                if (cv._id !== auth.user._id) {
                    newArr.push({ ...cv, text: item.text, media: item.media, call: item.call })
                }
            })
        })

        dispatch({
            type: MESS_TYPES.GET_CONVERSATIONS,
            payload: { newArr, result: res.data.result }
        })

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const getMessages = ({ auth, id, page = 1 }) => async (dispatch) => {
    try {
        const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.token)
        const newData = { ...res.data, messages: res.data.messages.reverse() }

        dispatch({ type: MESS_TYPES.GET_MESSAGES, payload: { ...newData, _id: id, page } })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const loadMoreMessages = ({ auth, id, page = 1 }) => async (dispatch) => {
    try {
        const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.token)
        const newData = { ...res.data, messages: res.data.messages.reverse() }

        dispatch({ type: MESS_TYPES.UPDATE_MESSAGES, payload: { ...newData, _id: id, page } })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const deleteMessages = ({ msg, data, auth }) => async (dispatch) => {
    const newData = DeleteData(data, msg._id)
    dispatch({ type: MESS_TYPES.DELETE_MESSAGES, payload: { newData, _id: msg.recipient } })
    try {
        await deleteDataAPI(`message/${msg._id}`, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const deleteConversation = ({ auth, id }) => async (dispatch) => {
    dispatch({ type: MESS_TYPES.DELETE_CONVERSATION, payload: id })
    try {
        await deleteDataAPI(`conversation/${id}`, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}