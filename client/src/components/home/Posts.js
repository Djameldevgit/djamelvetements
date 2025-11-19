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

    // 🔹 FUNCIÓN DE FILTRADO ACTUALIZADA PARA ROPA
    const filterPosts = (posts, searchFilters) => {
        if (!posts || posts.length === 0) return posts;
        if (!searchFilters || Object.keys(searchFilters).length === 0) {
            return posts;
        }

        return posts.filter(post => {
            // FILTRO SUBCATEGORÍA
            if (searchFilters.subCategory && searchFilters.subCategory.trim() !== "") {
                const postSubCategory = post.subCategory?.toLowerCase() || '';
                const filterSubCategory = searchFilters.subCategory.toLowerCase();
                if (postSubCategory !== filterSubCategory) return false;
            }

            // FILTRO SUB-SUBCATEGORÍA (Tipo específico)
            if (searchFilters.subSubCategory && searchFilters.subSubCategory.trim() !== "") {
                const postSubSubCategory = post.subSubCategory?.toLowerCase() || '';
                const filterSubSubCategory = searchFilters.subSubCategory.toLowerCase();
                if (postSubSubCategory !== filterSubSubCategory) return false;
            }

            // FILTRO MARCA
            if (searchFilters.brand && searchFilters.brand.trim() !== "") {
                const filterBrand = searchFilters.brand.toLowerCase();
                const postBrand = post.brand?.toLowerCase() || '';
                if (!postBrand.includes(filterBrand)) return false;
            }

            // FILTRO CONDICIÓN
            if (searchFilters.condition && searchFilters.condition.trim() !== "") {
                const postCondition = post.condition?.toLowerCase() || '';
                const filterCondition = searchFilters.condition.toLowerCase();
                if (postCondition !== filterCondition) return false;
            }

            // FILTRO GÉNERO
            if (searchFilters.gender && searchFilters.gender.trim() !== "") {
                const postGender = post.gender?.toLowerCase() || '';
                const filterGender = searchFilters.gender.toLowerCase();
                if (postGender !== filterGender) return false;
            }

            // FILTRO TALLA
            if (searchFilters.size && searchFilters.size.trim() !== "") {
                const filterSize = searchFilters.size.toLowerCase();
                const postSizes = Array.isArray(post.sizes) 
                    ? post.sizes.map(size => size?.toLowerCase() || '')
                    : [];
                
                if (!postSizes.includes(filterSize)) return false;
            }

            // FILTRO COLOR
            if (searchFilters.color && searchFilters.color.trim() !== "") {
                const filterColor = searchFilters.color.toLowerCase();
                const postColors = Array.isArray(post.colors) 
                    ? post.colors.map(color => color?.toLowerCase() || '')
                    : [];
                
                if (!postColors.includes(filterColor)) return false;
            }

            // FILTRO MATERIAL
            if (searchFilters.material && searchFilters.material.trim() !== "") {
                const filterMaterial = searchFilters.material.toLowerCase();
                const postMaterial = post.material?.toLowerCase() || '';
                if (!postMaterial.includes(filterMaterial)) return false;
            }

            // FILTRO TEMPORADA
            if (searchFilters.season && searchFilters.season.trim() !== "") {
                const postSeason = post.season?.toLowerCase() || '';
                const filterSeason = searchFilters.season.toLowerCase();
                if (postSeason !== filterSeason) return false;
            }

            // FILTRO UBICACIÓN
            if (searchFilters.location && searchFilters.location.trim() !== "") {
                const filterLocation = searchFilters.location.toLowerCase();
                const postLocation = post.location?.toLowerCase() || '';
                const postWilaya = post.wilaya?.toLowerCase() || '';
                const postCommune = post.commune?.toLowerCase() || '';
                
                const matchesLocation = 
                    postLocation.includes(filterLocation) ||
                    postWilaya.includes(filterLocation) ||
                    postCommune.includes(filterLocation);
                
                if (!matchesLocation) return false;
            }

            // FILTRO PRECIOS
            if (searchFilters.minPrice || searchFilters.maxPrice) {
                const postPrice = post.price || post.precioBase || 0;
                const priceValue = parseFloat(postPrice) || 0;
                
                if (searchFilters.minPrice) {
                    const minPrice = parseFloat(searchFilters.minPrice);
                    if (priceValue < minPrice) return false;
                }
                
                if (searchFilters.maxPrice) {
                    const maxPrice = parseFloat(searchFilters.maxPrice);
                    if (priceValue > maxPrice) return false;
                }
            }

            // FILTRO ÚLTIMOS PRODUCTOS
            if (searchFilters.latest) {
                // Si es filtro de últimos, no aplicamos otros filtros de fecha
                // ya que se ordena por createdAt en el backend
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
                            <i className="fas fa-tshirt fa-2x mb-3"></i>
                            <p className="mb-1">Aucun produit trouvé qui correspond à votre recherche.</p>
                            <small>Essayez d'ajuster les filtres de recherche</small>
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