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

    // 🔹 PAGINACIÓN ORIGINAL - SIN CAMBIOS
    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token)

        dispatch({
            type: POST_TYPES.GET_POSTS, 
            payload: {...res.data, page: homePosts.page + 1}
        })

        setLoad(false)
    }

    // 🔹 FUNCIÓN DE FILTRADO ACTUALIZADA PARA PRODUCTOS/VETEMENTS
    const filterPosts = (posts, searchFilters) => {
        if (!posts || posts.length === 0) return posts;
        if (!searchFilters || Object.keys(searchFilters).length === 0) {
            return posts;
        }

        return posts.filter(post => {
            // ✅ FILTRO CATEGORÍA (vetements_homme, vetements_femme, etc.)
            if (searchFilters.category && searchFilters.category.trim() !== "") {
                const postCategory = post.category?.toLowerCase() || '';
                const filterCategory = searchFilters.category.toLowerCase();
                if (postCategory !== filterCategory) return false;
            }

            // ✅ FILTRO SUBCATEGORÍA (VetementsHomme, VetementsFemme, etc.)
            if (searchFilters.subCategory && searchFilters.subCategory.trim() !== "") {
                const postSubCategory = post.subCategory?.toLowerCase() || '';
                const filterSubCategory = searchFilters.subCategory.toLowerCase();
                if (postSubCategory !== filterSubCategory) return false;
            }

            // ✅ FILTRO TALLA (array)
            if (searchFilters.talla && searchFilters.talla.length > 0) {
                const postTallas = Array.isArray(post.talla) ? post.talla : [];
                const hasMatchingTalla = searchFilters.talla.some(talla => 
                    postTallas.includes(talla)
                );
                if (!hasMatchingTalla) return false;
            }

            // ✅ FILTRO COLOR (array)
            if (searchFilters.color && searchFilters.color.length > 0) {
                const postColores = Array.isArray(post.color) ? post.color : [];
                const hasMatchingColor = searchFilters.color.some(color => 
                    postColores.includes(color)
                );
                if (!hasMatchingColor) return false;
            }

            // ✅ FILTRO GÉNERO
            if (searchFilters.genero && searchFilters.genero.trim() !== "") {
                const postGenero = post.genero?.toLowerCase() || '';
                const filterGenero = searchFilters.genero.toLowerCase();
                if (postGenero !== filterGenero) return false;
            }

            // ✅ FILTRO ESTADO (etat)
            if (searchFilters.etat && searchFilters.etat.trim() !== "") {
                const postEtat = post.etat?.toLowerCase() || '';
                const filterEtat = searchFilters.etat.toLowerCase();
                if (postEtat !== filterEtat) return false;
            }

            // ✅ FILTRO TEMPORADA
            if (searchFilters.temporada && searchFilters.temporada.trim() !== "") {
                const postTemporada = post.temporada?.toLowerCase() || '';
                const filterTemporada = searchFilters.temporada.toLowerCase();
                if (postTemporada !== filterTemporada) return false;
            }

            // ✅ FILTRO MARCA
            if (searchFilters.marca && searchFilters.marca.trim() !== "") {
                const filterMarca = searchFilters.marca.toLowerCase();
                const postMarca = post.marca?.toLowerCase() || '';
                if (!postMarca.includes(filterMarca)) return false;
            }

            // ✅ FILTRO MATERIAL
            if (searchFilters.material && searchFilters.material.trim() !== "") {
                const filterMaterial = searchFilters.material.toLowerCase();
                const postMaterial = post.material?.toLowerCase() || '';
                if (!postMaterial.includes(filterMaterial)) return false;
            }

            // ✅ FILTRO PRECIOS
            if (searchFilters.minPrice || searchFilters.maxPrice) {
                const postPrice = parseFloat(post.price) || 0;
                
                if (searchFilters.minPrice) {
                    const minPrice = parseFloat(searchFilters.minPrice);
                    if (postPrice < minPrice) return false;
                }
                
                if (searchFilters.maxPrice) {
                    const maxPrice = parseFloat(searchFilters.maxPrice);
                    if (postPrice > maxPrice) return false;
                }
            }

            // ✅ FILTRO TIPO DE VENTA
            if (searchFilters.tipoventa && searchFilters.tipoventa.trim() !== "") {
                const postTipoVenta = post.tipoventa?.toLowerCase() || '';
                const filterTipoVenta = searchFilters.tipoventa.toLowerCase();
                if (postTipoVenta !== filterTipoVenta) return false;
            }

            // ✅ FILTRO ÚLTIMOS PRODUCTOS
            if (searchFilters.latest) {
                // Se ordena por createdAt en el backend
                return true;
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
            
            {/* 🔹 BOTÓN LOAD MORE SOLO SIN FILTROS */}
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