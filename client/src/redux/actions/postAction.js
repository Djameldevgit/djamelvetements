import { GLOBALTYPES } from './globalTypes'
import { imageUpload } from '../../utils/imageUpload'
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData'
import { createNotify, removeNotify } from './notifyAction'

export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    DELETE_POST: 'DELETE_POST',
    VIEW_POST: 'VIEW_POST'

}


 
  
export const createPost = ({ 
    postData, 
    images, 
    auth, 
    socket 
}) => async (dispatch) => {
    let media = []
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        
        if(images.length > 0) media = await imageUpload(images)

        console.log('🔍 createPost - Enviando datos:', {
            postData: postData,
            imagesCount: images.length,
            mediaCount: media.length
        });

        // ✅ Enviar postData e images en el body
        const res = await postDataAPI('posts', { 
            postData: {
                ...postData,
                content: postData.description || postData.content || '' // Mantener compatibilidad
            },
            images: media 
        }, auth.token)

        console.log('🔍 createPost - Respuesta del servidor:', {
            newPost: res.data.newPost,
            user: res.data.newPost?.user,
            followers: res.data.newPost?.user?.followers
        });

        dispatch({ 
            type: POST_TYPES.CREATE_POST, 
            payload: {...res.data.newPost, user: auth.user} 
        })

        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: false} })

        // 🎯 NOTIFY SEGURO - Con verificaciones
        const msg = {
            id: res.data.newPost._id,
            text: 'added a new post.',
            // 🎯 VERIFICACIÓN SEGURA DE FOLLOWERS
            recipients: Array.isArray(res.data.newPost?.user?.followers) 
                ? res.data.newPost.user.followers 
                : [],
            url: `/post/${res.data.newPost._id}`,
            content: postData.description || postData.content || postData.title || '', 
            image: media[0]?.url || ''
        }

        console.log('🔍 createPost - Notify msg:', msg);

        // 🎯 SOLO CREAR NOTIFY SI HAY RECIPIENTS
        if (msg.recipients.length > 0) {
            dispatch(createNotify({msg, auth, socket}))
        } else {
            console.log('⏭️ Notify omitido - No hay recipients');
        }

    } catch (err) {
        console.error('❌ Error en createPost:', err);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response?.data?.msg || 'Error creating post'}
        })
    }
}
export const updatePost = ({
    postData,
    images, 
    auth, 
    status
}) => async (dispatch) => {
    let media = []
    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        
        if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);

        // ✅ Asegúrate que status._id existe
        if (!status?._id) {
            throw new Error('ID del post no disponible');
        }

        const res = await patchDataAPI(`post/${status._id}`, { 
            ...postData, // ✅ Enviar datos directamente
            images: [...imgOldUrl, ...media] 
        }, auth.token);

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost });
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: { 
                success: res.data.msg,
                loading: false 
            } 
        });
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { 
                error: err.response?.data?.msg || err.message || 'Échec de la mise à jour',
                loading: false 
            }
        });
    }
}
export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: true })
        const res = await getDataAPI('posts')
        
        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: {...res.data, page: 2}
        })

        dispatch({ type: POST_TYPES.LOADING_POST, payload: false })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

 
 

export const likePost = ({post, auth, socket}) => async (dispatch) => {
    const newPost = {...post, likes: [...post.likes, auth.user]}
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost})

    socket.emit('likePost', newPost)

    try {
        await patchDataAPI(`post/${post._id}/like`, null, auth.token)
        
        // Notify
        const msg = {
            id: auth.user._id,
            text: 'like your post.',
            recipients: [post.user._id],
            url: `/post/${post._id}`,
            content: post.content, 
            image: post.images[0].url
        }

        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const unLikePost = ({post, auth, socket}) => async (dispatch) => {
    const newPost = {...post, likes: post.likes.filter(like => like._id !== auth.user._id)}
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost})

    socket.emit('unLikePost', newPost)

    try {
        await patchDataAPI(`post/${post._id}/unlike`, null, auth.token)

        // Notify
        const msg = {
            id: auth.user._id,
            text: 'like your post.',
            recipients: [post.user._id],
            url: `/post/${post._id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const getPost = ({detailPost, id }) => async (dispatch) => {
    if(detailPost.every(post => post._id !== id)){
        try {
            const res = await getDataAPI(`post/${id}`)
            dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post })
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: err.response.data.msg}
            })
        }
    }
}

export const deletePost = ({post, auth, socket}) => async (dispatch) => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: post })

    try {
        const res = await deleteDataAPI(`post/${post._id}`, auth.token)

        // Notify
        const msg = {
            id: post._id,
            text: 'added a new post.',
            recipients: res.data.newPost.user.followers,
            url: `/post/${post._id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const savePost = ({post, auth}) => async (dispatch) => {
    const newUser = {...auth.user, saved: [...auth.user.saved, post._id]}
    dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})

    try {
        await patchDataAPI(`savePost/${post._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const unSavePost = ({post, auth}) => async (dispatch) => {
    const newUser = {...auth.user, saved: auth.user.saved.filter(id => id !== post._id) }
    dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})

    try {
        await patchDataAPI(`unSavePost/${post._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}