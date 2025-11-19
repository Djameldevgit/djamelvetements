export const GLOBALTYPES = {
    AUTH: "AUTH",
    ALERT: "ALERT",
    THEME: 'THEME',
    STATUS: 'STATUS',
    MODAL: 'MODAL',
    SOCKET: 'SOCKET',
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE',
    CALL: 'CALL',
    PEER: 'PEER',
    SETTINGS:'SETTINGS',
    GET_PRIVACY:'GET_PRIVACY',
    UPDATE_PRIVACY:'UPDATE_PRIVACY',
    LOADING_PRIVACY:'LOADING_PRIVACY',
    
    LOADING_CART: 'LOADING_CART',
    GET_CART: 'GET_CART',
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
    LOAD_CART: 'LOAD_CART', // si decides mantenerlo
    GET_ORDERS: 'GET_ORDERS',
    CREATE_ORDER: 'CREATE_ORDER',
   
    UPDATE_USER_ROLE: "UPDATE_USER_ROLE",
    
    CREATE_COMMENT: 'CREATE_COMMENT',
    GET_COMMENTS: 'GET_COMMENTS',
    DELETE_COMMENT: 'DELETE_COMMENT',
    UPDATE_COMMENT: 'UPDATE_COMMENT'


}

export const EditData = (data, id, post) => {
    const newData = data.map(item => 
        (item._id === id ? post : item)
    )
    return newData;
}

export const DeleteData = (data, id) => {
    const newData = data.filter(item => item._id !== id)
    return newData;
}