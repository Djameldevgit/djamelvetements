import React, { useState, useEffect } from 'react'
import PostThumb from '../PostThumb'
import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { PROFILE_TYPES } from '../../redux/actions/profileAction'

const Posts = ({auth, id, dispatch, profile}) => {
    const [posts, setPosts] = useState([])
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(0)
    const [load, setLoad] = useState(false)

    // 🎯 VERIFICACIÓN DE SEGURIDAD
    console.log('🔍 Posts component - profile:', {
        profilePosts: profile.posts,
        isArray: Array.isArray(profile.posts),
        profilePostsData: profile.postsData,
        id: id
    })

    useEffect(() => {
        // 🎯 VERIFICACIÓN SEGURA ANTES DE forEach
        if (!profile.posts) {
            console.warn('❌ profile.posts es undefined, no se pueden cargar posts')
            setPosts([])
            setResult(0)
            return
        }

        if (!Array.isArray(profile.posts)) {
            console.warn('❌ profile.posts no es un array:', typeof profile.posts)
            setPosts([])
            setResult(0)
            return
        }

        console.log('✅ profile.posts es válido, buscando posts para id:', id)

        let postsFound = false
        
        // 🎯 forEach SEGURO
        profile.posts.forEach(data => {
            if(data && data._id === id){
                console.log('✅ Posts encontrados para usuario:', id, data)
                setPosts(data.posts || [])
                setResult(data.result || 0)
                setPage(data.page || 0)
                postsFound = true
            }
        })

        if (!postsFound) {
            console.warn('⚠️ No se encontraron posts para el usuario:', id)
            setPosts([])
            setResult(0)
        }

    },[profile.posts, id])

    const handleLoadMore = async () => {
        setLoad(true)
        try {
            const res = await getDataAPI(`user_posts/${id}?limit=${page * 9}`, auth.token)
            const newData = {...res.data, page: page + 1, _id: id}
            dispatch({type: PROFILE_TYPES.UPDATE_POST, payload: newData})
        } catch (error) {
            console.error('Error cargando más posts:', error)
        }
        setLoad(false)
    }

    // 🎯 RENDER SEGURO
    console.log('✅ Posts a renderizar:', posts.length)

    return (
        <div className='mx-3'>
            <PostThumb posts={posts} result={result} />

            {
                load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
            }

            {
                result > 0 && !load && (
                    <LoadMoreBtn result={result} page={page}
                    load={load} handleLoadMore={handleLoadMore} />
                )
            }
        </div>
    )
}

export default Posts