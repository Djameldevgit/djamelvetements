import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostCard from '../PostCard'
import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { POST_TYPES } from '../../redux/actions/postAction'

const Posts = ({ filters = {} }) => {
    const { homePosts, auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

    // 🔹 PAGINACIÓN - SIN CAMBIOS
    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token)

        dispatch({
            type: POST_TYPES.GET_POSTS, 
            payload: {...res.data, page: homePosts.page + 1}
        })

        setLoad(false)
    }

    // 🔹 FUNCIÓN DE FILTRADO SIMPLIFICADA
    const filterPosts = (posts, searchFilters) => {
        if (!posts || posts.length === 0) return posts;
        if (!searchFilters || Object.keys(searchFilters).length === 0) {
            return posts;
        }

        return posts.filter(post => {
            // ✅ FILTRO CATEGORÍA (vetements, telephones)
            if (searchFilters.category && searchFilters.category.trim() !== "") {
                const postCategory = post.category?.toLowerCase() || '';
                const filterCategory = searchFilters.category.toLowerCase();
                if (postCategory !== filterCategory) return false;
            }

            // ✅ FILTRO SUBCATEGORÍA
            if (searchFilters.subCategory && searchFilters.subCategory.trim() !== "") {
                const postSubCategory = post.subCategory?.toLowerCase() || '';
                const filterSubCategory = searchFilters.subCategory.toLowerCase();
                if (postSubCategory !== filterSubCategory) return false;
            }

            // ✅ FILTRO TIPO ARTÍCULO
            if (searchFilters.tipoArticulo && searchFilters.tipoArticulo.trim() !== "") {
                const postTipoArticulo = post.tipoArticulo?.toLowerCase() || '';
                const filterTipoArticulo = searchFilters.tipoArticulo.toLowerCase();
                if (postTipoArticulo !== filterTipoArticulo) return false;
            }

            return true;
        })
    }

    // 🔹 DETERMINAR QUÉ POSTS MOSTRAR
    const postsToDisplay = filters && Object.keys(filters).length > 0 
        ? filterPosts(homePosts.posts, filters) 
        : homePosts.posts

    return (
        <div>
            <div className="post_thumb">
                {/* 🔹 MENSAJE SI NO HAY RESULTADOS CON FILTROS */}
                {(filters && Object.keys(filters).length > 0 && postsToDisplay.length === 0) && (
                    <div className="text-center py-5">
                        <div className="text-muted">
                            <p className="mb-1">Aucun produit trouvé qui correspond à votre recherche.</p>
                        </div>
                    </div>
                )}

                {/* 🔹 MOSTRAR POSTS (FILTRADOS O NORMALES) */}
                {
                    postsToDisplay.map(post => (
                        <PostCard key={post._id} post={post} theme={theme} />
                    ))
                }

                {/* 🔹 LOADING INDICATOR */}
                {
                    load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                }
            </div>
            
            {/* 🔹 IMPORTANTE: BOTÓN LOAD MORE SOLO SIN FILTROS ACTIVOS
                Si hay filtros, se debe hacer la paginación desde el backend */}
            {(filters && Object.keys(filters).length === 0) && (
                <LoadMoreBtn 
                    result={homePosts.result} 
                    page={homePosts.page}
                    load={load} 
                    handleLoadMore={handleLoadMore} 
                />
            )}
        </div>
    )
}

export default Posts