import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { POST_TYPES } from './redux/actions/postAction'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import { NOTIFY_TYPES } from './redux/actions/notifyAction'
import { MESS_TYPES } from './redux/actions/messageAction'

import audiobell from './audio/got-it-done-613.mp3'

const spawnNotification = (body, icon, url, title) => {
    let options = {
        body, icon
    }
    let n = new Notification(title, options)

    n.onclick = e => {
        e.preventDefault()
        window.open(url, '_blank')
    }
}

const SocketClient = () => {
    const { auth, socket, notify, online, call } = useSelector(state => state)
    const dispatch = useDispatch()

    const audioRef = useRef()

    // joinUser
    useEffect(() => {
        socket.emit('joinUser', auth.user)
    },[socket, auth.user])

    // 🔹 NUEVOS EVENTOS: Online/Offline con base de datos
    useEffect(() => {
        socket.on('userOnline', (data) => {
            dispatch({type: GLOBALTYPES.ONLINE, payload: data.userId})
            
            dispatch({ 
                type: MESS_TYPES.UPDATE_USER_STATUS, 
                payload: {
                    userId: data.userId,
                    isOnline: true,
                    lastOnline: data.lastOnline
                }
            });
        })

        socket.on('userOffline', (data) => {
            dispatch({type: GLOBALTYPES.OFFLINE, payload: data.userId})
            
            dispatch({ 
                type: MESS_TYPES.UPDATE_USER_STATUS, 
                payload: {
                    userId: data.userId,
                    isOnline: false,
                    lastOnline: data.lastOnline,
                    lastDisconnectedAt: data.lastDisconnectedAt
                }
            });
        })

        return () => {
            socket.off('userOnline')
            socket.off('userOffline')
        }
    }, [socket, dispatch])

    // 🔹 ACTIVIDAD PERIÓDICA para actualizar lastOnline
    useEffect(() => {
        const activityInterval = setInterval(() => {
            if (auth.user && socket) {
                socket.emit('userActivity', auth.user._id);
            }
        }, 30000); // Cada 30 segundos

        return () => clearInterval(activityInterval);
    }, [auth.user, socket])

    // TYPING - Funciones existentes
    useEffect(() => {
        socket.on('typing-start-to-client', (data) => {
            console.log('TYPING START RECIBIDO:', data)
            dispatch({ type: MESS_TYPES.TYPING_START, payload: data })
        })
    
        return () => socket.off('typing-start-to-client')
    }, [socket, dispatch])
    
    useEffect(() => {
        socket.on('typing-stop-to-client', (data) => {
            console.log('TYPING STOP RECIBIDO:', data)
            dispatch({ type: MESS_TYPES.TYPING_STOP, payload: data })
        })
    
        return () => socket.off('typing-stop-to-client')
    }, [socket, dispatch])

    // Likes - Funciones existentes
    useEffect(() => {
        socket.on('likeToClient', newPost =>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })

        return () => socket.off('likeToClient')
    },[socket, dispatch])

    useEffect(() => {
        socket.on('unLikeToClient', newPost =>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })

        return () => socket.off('unLikeToClient')
    },[socket, dispatch])

    // Comments - Funciones existentes
    useEffect(() => {
        socket.on('createCommentToClient', newPost =>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })

        return () => socket.off('createCommentToClient')
    },[socket, dispatch])

    useEffect(() => {
        socket.on('deleteCommentToClient', newPost =>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })

        return () => socket.off('deleteCommentToClient')
    },[socket, dispatch])

    // Follow - Funciones existentes
    useEffect(() => {
        socket.on('followToClient', newUser =>{
            dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})
        })

        return () => socket.off('followToClient')
    },[socket, dispatch, auth])

    useEffect(() => {
        socket.on('unFollowToClient', newUser =>{
            dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})
        })

        return () => socket.off('unFollowToClient')
    },[socket, dispatch, auth])

    // Notification - Funciones existentes
    useEffect(() => {
        socket.on('createNotifyToClient', msg =>{
            dispatch({type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg})

            if(notify.sound) audioRef.current.play()
            spawnNotification(
                msg.user.username + ' ' + msg.text,
                msg.user.avatar,
                msg.url,
                'TASSILI-DHAMEL-ART'
            )
        })

        return () => socket.off('createNotifyToClient')
    },[socket, dispatch, notify.sound])

    useEffect(() => {
        socket.on('removeNotifyToClient', msg =>{
            dispatch({type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg})
        })

        return () => socket.off('removeNotifyToClient')
    },[socket, dispatch])

    // Message - Funciones existentes
    useEffect(() => {
        socket.on('addMessageToClient', msg =>{
            dispatch({type: MESS_TYPES.ADD_MESSAGE, payload: msg})

            dispatch({
                type: MESS_TYPES.ADD_USER, 
                payload: {
                    ...msg.user, 
                    text: msg.text, 
                    media: msg.media
                }
            })
        })

        return () => socket.off('addMessageToClient')
    },[socket, dispatch])

    // Check User Online / Offline - Funciones existentes
    useEffect(() => {
        socket.emit('checkUserOnline', auth.user)
    },[socket, auth.user])

    useEffect(() => {
        socket.on('checkUserOnlineToMe', data =>{
            data.forEach(item => {
                if(!online.includes(item.id)){
                    dispatch({type: GLOBALTYPES.ONLINE, payload: item.id})
                }
            })
        })

        return () => socket.off('checkUserOnlineToMe')
    },[socket, dispatch, online])

    useEffect(() => {
        socket.on('checkUserOnlineToClient', id =>{
            if(!online.includes(id)){
                dispatch({type: GLOBALTYPES.ONLINE, payload: id})
            }
        })

        return () => socket.off('checkUserOnlineToClient')
    },[socket, dispatch, online])

    // Check User Offline - Funciones existentes
    useEffect(() => {
        socket.on('CheckUserOffline', id =>{
            dispatch({type: GLOBALTYPES.OFFLINE, payload: id})
        })

        return () => socket.off('CheckUserOffline')
    },[socket, dispatch])

    // Call User - Funciones existentes
    useEffect(() => {
        socket.on('callUserToClient', data =>{
            dispatch({type: GLOBALTYPES.CALL, payload: data})
        })

        return () => socket.off('callUserToClient')
    },[socket, dispatch])

    useEffect(() => {
        socket.on('userBusy', data =>{
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: `${call.username} is busy!`}})
        })

        return () => socket.off('userBusy')
    },[socket, dispatch, call])

    return (
        <>
            <audio controls ref={audioRef} style={{display: 'none'}} >
                <source src={audiobell} type="audio/mp3" />
            </audio>
        </>
    )
}

export default SocketClient