import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LikeButton from '../../LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import { likePost, unLikePost, savePost, unSavePost, deletePost } from '../../../redux/actions/postAction';
import Carousel from '../../Carousel';
import AuthModalAddLikesCommentsSave from '../../AuthModalAddLikesCommentsSave';
import CardFooterPost from './CardFooterPost';
import ShareModal from '../../ShareModal';
import { BASE_URL } from '../../../utils/config';
import { useTranslation } from 'react-i18next';

const CardBodyCarousel = ({ post }) => {
    const history = useHistory();
    const location = useLocation();
    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const { auth, socket } = useSelector(state => state);
    const dispatch = useDispatch();
    const [saved, setSaved] = useState(false);
    const [saveLoad, setSaveLoad] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isShare, setIsShare] = useState(false);

    // ✅ useTranslation con namespace específico
    const { t, i18n } = useTranslation(['cardbodycarousel', 'common']);
    const isRTL = i18n.language === 'ar';

    // Estados para el dropdown de opciones
    const [showOptions, setShowOptions] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Verificar si estamos en detailPost
    const isDetailPage = location.pathname.includes('/post/');

    // Verificar permisos de usuario
    const isPostOwner = auth.user && post.user && auth.user._id === post.user._id;
    const isAdmin = auth.user && auth.user.role === "admin";

    // ========== EFFECTS ==========

    // Likes
    useEffect(() => {
        if (post.likes.find(like => like._id === auth.user?._id)) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }
    }, [post.likes, auth.user?._id]);

    // Saved posts
    useEffect(() => {
        if (auth.user?.saved.find(id => id === post._id)) {
            setSaved(true);
        } else {
            setSaved(false);
        }
    }, [auth.user?.saved, post._id]);

    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showOptions && !event.target.closest('.card__options-container')) {
                setShowOptions(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showOptions]);

    // ========== FUNCIONES DE FORMATEO ==========

    const formatDate = (dateString) => {
        if (!dateString) return t('date.notSpecified', 'Fecha no especificada');

        const options = {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };
        
        const locales = {
            'es': 'es-ES',
            'fr': 'fr-FR', 
            'ar': 'ar-EG'
        };
        
        return new Date(dateString).toLocaleDateString(locales[i18n.language] || 'es-ES', options);
    };

    const getSubCategoryIcon = (subCategory) => {
        const icons = {
            'Location_Vacances': '🏖️',
            'hadj_Omra': '🕋',
            'Voyage Organise': '✈️',
            'voyage affaires': '💼',
            'tourisme': '🗺️',
            'aventure': '🧭',
            'culturel': '🏛️',
            'balnéaire': '🌊',
            'montagne': '⛰️',
            'désert': '🏜️'
        };
        return icons[subCategory] || '✈️';
    };

    const formatSubCategory = (subCategory) => {
        return t(`travelTypes.${subCategory}`, { 
            defaultValue: subCategory 
        });
    };

    // ========== HANDLERS DE INTERACCIÓN ==========

    const handleCommentClick = () => {
        if (!auth.token) {
            setShowAuthModal(true);
        } else {
            history.push(`/post/${post._id}`);
        }
    };

    const handleLike = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        if (loadLike) return;
        setLoadLike(true);
        await dispatch(likePost({ post, auth, socket }));
        setLoadLike(false);
    };

    const handleUnLike = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        if (loadLike) return;
        setLoadLike(true);
        await dispatch(unLikePost({ post, auth, socket }));
        setLoadLike(false);
    };

    const handleSavePost = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        if (saveLoad) return;
        setSaveLoad(true);
        await dispatch(savePost({ post, auth }));
        setSaveLoad(false);
    };

    const handleUnSavePost = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        if (saveLoad) return;
        setSaveLoad(true);
        await dispatch(unSavePost({ post, auth }));
        setSaveLoad(false);
    };

    // ========== HANDLERS DEL DROPDOWN (TRES PUNTOS) ==========

    const handleOptionsClick = (e) => {
        e.stopPropagation();
        setShowOptions(!showOptions);
    };

    const handleEditPost = (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }

        history.push('/createpost', {
            isEdit: true,
            postData: post
        });

        dispatch({
            type: 'GLOBALTYPES.STATUS',
            payload: { ...post, onEdit: true }
        });

        setShowOptions(false);
    };

    const handleDeletePost = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }

        if (window.confirm(t('post.deleteConfirmation', '¿Estás seguro de que quieres eliminar esta publicación?'))) {
            setIsDeleting(true);
            try {
                await dispatch(deletePost({ post, auth, socket }));
            } catch (error) {
                console.error('Error al eliminar el post:', error);
            } finally {
                setIsDeleting(false);
                setShowOptions(false);
            }
        }
    };

    const handleChatWithAgency = (e) => {
        e.stopPropagation();

        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }

        if (!post.user || !post.user._id) {
            alert(t('agency.contactError', 'No se puede contactar con esta agencia'));
            return;
        }

        // ✅ AGREGAR USUARIO PARA CHAT
        dispatch({
            type: 'MESS_TYPES.ADD_USER',
            payload: {
                ...post.user,
                text: '',
                media: []
            }
        });

        history.push(`/message/${post.user._id}`);
        setShowOptions(false);
    };

    const handleViewAgencyProfile = (e) => {
        e.stopPropagation();

        if (!post.user || !post.user._id) {
            alert(t('agency.profileError', 'No se puede ver el perfil de esta agencia'));
            return;
        }

        history.push(`/profile/${post.user._id}`);
        setShowOptions(false);
    };

    const handleSharePost = () => {
        setIsShare(true);
        setShowOptions(false);
    };

    // ========== HANDLERS DE AUTENTICACIÓN ==========

    const redirectToLogin = () => {
        history.push('/login');
        setShowAuthModal(false);
    };

    const redirectToRegister = () => {
        history.push('/register');
        setShowAuthModal(false);
    };

    const closeModal = () => setShowAuthModal(false);

    // ========== RENDERIZADO DEL DROPDOWN ==========

    const renderOptionsDropdown = () => {
        if (!showOptions) return null;

        return (
            <div className="card__options-modal">
                {/* OPCIÓN 1: Contactar con agencia (solo para no propietarios) */}
                {!isPostOwner && (
                    <button
                        className="card__option-item card__option-chat"
                        onClick={handleChatWithAgency}
                    >
                        <i className="fas fa-comments"></i>
                        {t('post.contactAgency', 'Contactar con la agencia')}
                    </button>
                )}

                {/* OPCIÓN 2: Ver perfil de agencia (siempre disponible) */}
                <button
                    className="card__option-item card__option-profile"
                    onClick={handleViewAgencyProfile}
                >
                    <i className="fas fa-building"></i>
                    {t('post.viewAgencyProfile', 'Ver perfil de la agencia')}
                </button>

                {/* OPCIÓN 3: Editar publicación (propietario o admin) */}
                {(isPostOwner || isAdmin) && (
                    <button
                        className="card__option-item card__option-edit"
                        onClick={handleEditPost}
                    >
                        <i className="fas fa-edit"></i>
                        {isAdmin && !isPostOwner 
                            ? t('post.editAdmin', 'Editar publicación (Admin)')
                            : t('post.edit', 'Editar publicación')
                        }
                    </button>
                )}

                {/* OPCIÓN 4: Eliminar publicación (propietario o admin) */}
                {(isPostOwner || isAdmin) && (
                    <button
                        className="card__option-item card__option-delete"
                        onClick={handleDeletePost}
                        disabled={isDeleting}
                    >
                        <i className="fas fa-trash"></i>
                        {isDeleting 
                            ? t('post.deleting', 'Eliminando...')
                            : (isAdmin && !isPostOwner 
                                ? t('post.deleteAdmin', 'Eliminar publicación (Admin)')
                                : t('post.delete', 'Eliminar publicación')
                              )
                        }
                    </button>
                )}

                {/* Divisor antes de opciones generales */}
                {(isPostOwner || isAdmin || !isPostOwner) && (
                    <div className="card__option-divider"></div>
                )}

                {/* OPCIÓN 5: Compartir publicación (siempre disponible) */}
                <button
                    className="card__option-item card__option-share"
                    onClick={handleSharePost}
                >
                    <i className="fas fa-share"></i>
                    {t('post.share', 'Compartir publicación')}
                </button>

                {/* OPCIÓN 6: Guardar/Quitar de guardados */}
                <button
                    className="card__option-item card__option-save"
                    onClick={saved ? handleUnSavePost : handleSavePost}
                >
                    <i className={saved ? "fas fa-bookmark" : "far fa-bookmark"}></i>
                    {saved 
                        ? t('actions.unsave', 'Quitar de guardados')
                        : t('actions.save', 'Guardar publicación')
                    }
                </button>

                {/* OPCIÓN 7: Ver detalles del viaje */}
                <button
                    className="card__option-item card__option-details"
                    onClick={() => history.push(`/post/${post._id}`)}
                >
                    <i className="fas fa-info-circle"></i>
                    {t('post.viewDetails', 'Ver detalles del viaje')}
                </button>
            </div>
        );
    };

    return (
        <>
            <div className="card" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                {/* HEADER CON INFORMACIÓN DEL VIAJE */}
                <div className="card__header">
                    <div className="card__user-info">
                        <div className="card__travel-details">
                            {/* Primera fila: Subcategoría con icono */}
                            <div className="card__subcategory">
                                <span className="card__subcategory-icon">
                                    {getSubCategoryIcon(post.subCategory)}
                                </span>
                                <span className="card__subcategory-text">
                                    {formatSubCategory(post.subCategory)}
                                </span>
                            </div>

                            {/* Segunda fila: Información de ruta */}
                            <div className="card__travel-route">
                                <div className="card__route-section">
                                    <span className="card__route-label">
                                        {t('post.departure', 'Salida')}:
                                    </span>
                                    <span className="card__travel-wilaya">
                                        {post.wilaya || t('post.departurePlace', 'Lugar de salida')}
                                    </span>
                                </div>
                                
                                <div className="card__route-section">
                                    <span className="card__route-label">
                                        {t('post.date', 'Fecha')}:
                                    </span>
                                    <span className="card__travel-date">
                                        {formatDate(post.datedepar)}
                                    </span>
                                </div>

                                {post.destinacion && (
                                    <div className="card__route-section">
                                        <span className="card__route-label">
                                            {t('post.destination', 'Destino')}:
                                        </span>
                                        <span className="card__travel-destination">
                                            {post.destinacion}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* BOTÓN DE TRES PUNTOS CON DROPDOWN - POSICIONADO CORRECTAMENTE */}
                    <div className="card__options-container">
                        <button
                            className="card__options-btn"
                            onClick={handleOptionsClick}
                            disabled={isDeleting}
                            aria-label={t('actions.options', 'Opciones')}
                        >
                            <i className="fas fa-ellipsis-h"></i>
                        </button>
                        {renderOptionsDropdown()}
                    </div>
                </div>

                {/* IMAGEN DEL POST */}
                <div className="card__image" onClick={() => history.push(`/post/${post._id}`)}>
                    <Carousel images={post.images} id={post._id} />
                </div>

                {/* ACCIONES DEL POST (LIKES, COMENTARIOS, SHARE, SAVE) */}
                {!isDetailPage && (
                    <div className="card__actions">
                        <div className="card__actions-left">
                            <LikeButton
                                isLike={isLike}
                                handleLike={handleLike}
                                handleUnLike={handleUnLike}
                            />
                            <span className="card__action-count">{post.likes.length}</span>

                            <i 
                                className="far fa-comment card__action-icon" 
                                onClick={handleCommentClick}
                                title={t('actions.comment', 'Comentar')}
                            />
                            <span className="card__action-count">{post.comments.length}</span>

                            <i 
                                className="fas fa-share card__action-icon" 
                                onClick={() => setIsShare(!isShare)}
                                title={t('actions.share', 'Compartir')}
                            />
                        </div>

                        <div className="card__actions-right">
                            {saved
                                ? <i 
                                    className="fas fa-bookmark card__action-icon" 
                                    onClick={handleUnSavePost}
                                    title={t('actions.unsave', 'Quitar de guardados')}
                                  />
                                : <i 
                                    className="far fa-bookmark card__action-icon" 
                                    onClick={handleSavePost}
                                    title={t('actions.save', 'Guardar')}
                                  />
                            }
                            <span className="card__action-count">{post.saves || 0}</span>
                        </div>
                    </div>
                )}

                {/* MODAL DE COMPARTIR */}
                {isShare && (
                    <ShareModal 
                        url={`${BASE_URL}/post/${post._id}`}
                        onClose={() => setIsShare(false)}
                    />
                )}

                {/* FOOTER DEL POST */}
                {!isDetailPage && <CardFooterPost post={post} />}
            </div>

            {/* MODAL DE AUTENTICACIÓN */}
            <AuthModalAddLikesCommentsSave
                showModal={showAuthModal}
                closeModal={closeModal}
                redirectToLogin={redirectToLogin}
                redirectToRegister={redirectToRegister}
            />

            {/* ESTILOS CSS CORREGIDOS - ENFOQUE EN EL DROPDOWN */}
            <style jsx>{`
    .card {
        position: relative;
        background: white;
        border-radius: 12px;
        overflow: visible;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        margin-bottom: 5px;
        transition: all 0.3s ease;
    }

    .card:hover {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
    }

    .card__header {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 16px 20px;
        border-bottom: 1px solid #f0f0f0;
        gap: 16px;
        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    }

    .card__user-info {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        flex: 1;
        min-width: 0;
    }

    .card__travel-details {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
        min-width: 0;
    }

    .card__subcategory {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 700;
        color: #2c3e50;
    }

    .card__subcategory-icon {
        font-size: 18px;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
    }

    .card__subcategory-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
        background: linear-gradient(135deg, #2c3e50, #3498db);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .card__travel-route {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .card__route-section {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: #555;
        flex-wrap: wrap;
    }

    .card__route-label {
        font-weight: 500;
        color: #666;
        white-space: nowrap;
    }

    .card__travel-date {
        font-weight: 600;
        color: #e74c3c;
        background: linear-gradient(135deg, #fdf2f2, #fed7d7);
        padding: 4px 8px;
        border-radius: 6px;
        white-space: nowrap;
        font-size: 13px;
        border: 1px solid #fed7d7;
    }

    .card__travel-wilaya {
        font-weight: 600;
        color: #3498db;
        background: linear-gradient(135deg, #f0f8ff, #e1f0ff);
        padding: 4px 8px;
        border-radius: 6px;
        white-space: nowrap;
        font-size: 13px;
        border: 1px solid #e1f0ff;
    }

    .card__travel-destination {
        font-weight: 600;
        color: #27ae60;
        background: linear-gradient(135deg, #f0f9f4, #d4edda);
        padding: 4px 8px;
        border-radius: 6px;
        white-space: nowrap;
        font-size: 13px;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        border: 1px solid #d4edda;
    }

    /* ⭐⭐ CONTENEDOR DE OPCIONES - AJUSTADO ⭐⭐ */
    .card__options-container {
        position: relative;
        flex-shrink: 0;
        align-self: flex-start;
        margin-top: -10px;
        z-index: 9998;
    }

    .card__options-btn {
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        position: relative;
        z-index: 9999;
    }

    .card__options-btn:hover {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        transform: scale(1.1);
    }

    .card__options-btn:active {
        transform: scale(0.95);
    }

    /* ⭐⭐ DROPDOWN MODAL - POSICIONAMIENTO CORREGIDO ⭐⭐ */
    .card__options-modal {
        position: absolute;
        top: 100%;
        ${isRTL ? 'left: 0;' : 'right: 0;'}
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        padding: 8px 0;
        min-width: 260px;
        z-index: 10000;
        animation: slideDown 0.3s ease;
        border: 1px solid #e9ecef;
        backdrop-filter: blur(10px);
        margin-top: 4px;
    }

    .card__option-item {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 12px 16px;
        background: none;
        border: none;
        text-align: left;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #333;
        border-bottom: 1px solid #f8f9fa;
    }

    .card__option-item:last-child {
        border-bottom: none;
    }

    .card__option-item:hover {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        transform: translateX(4px);
    }

    .card__option-item:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }

    .card__option-chat {
        color: #28a745;
    }

    .card__option-profile {
        color: #6f42c1;
    }

    .card__option-edit {
        color: #007bff;
    }

    .card__option-delete {
        color: #e74c3c;
    }

    .card__option-share {
        color: #17a2b8;
    }

    .card__option-save {
        color: #ffc107;
    }

    .card__option-details {
        color: #20c997;
    }

    .card__option-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent 0%, #e9ecef 50%, transparent 100%);
        margin: 8px 0;
    }

    .card__image {
        cursor: pointer;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        transition: all 0.3s ease;
        position: relative;
        z-index: 1;
    }

    .card__image:hover {
        transform: scale(1.02);
    }

    .card__actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid #f0f0f0;
        background: #fafafa;
        position: relative;
        z-index: 1;
    }

    .card__actions-left,
    .card__actions-right {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .card__action-icon {
        font-size: 20px;
        cursor: pointer;
        color: #666;
        transition: all 0.3s ease;
        padding: 8px;
        border-radius: 50%;
        position: relative;
    }

    .card__action-icon:hover {
        color: #667eea;
        background: rgba(102, 126, 234, 0.1);
        transform: scale(1.1);
    }

    .card__action-count {
        font-size: 14px;
        color: #666;
        font-weight: 600;
        min-width: 20px;
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    /* ⭐⭐ CORRECCIÓN ESPECÍFICA PARA ANDROID ⭐⭐ */
    
    @media (max-width: 768px) {
        .card__header {
            padding: 12px 14px;
            flex-direction: row;
            gap: 10px;
            position: relative;
            align-items: flex-start;
        }

        .card__user-info {
            flex: 1;
            min-width: 0;
            overflow: hidden;
        }

        .card__travel-details {
            gap: 6px;
            width: 100%;
        }

        .card__subcategory {
            font-size: 14px;
            gap: 6px;
            margin-bottom: 4px;
        }

        .card__subcategory-icon {
            font-size: 16px;
        }

        .card__subcategory-text {
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .card__travel-route {
            gap: 4px;
        }

        .card__route-section {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            flex-wrap: nowrap; /* ⭐ IMPEDIR SALTO DE LÍNEA */
            width: 100%;
            min-height: 20px;
        }

        .card__route-label {
            font-weight: 600;
            color: #555;
            white-space: nowrap;
            flex-shrink: 0; /* ⭐ EVITA QUE SE ENCOJA */
            min-width: 60px; /* ⭐ ANCHO MÍNIMO PARA ETIQUETAS */
        }

        .card__travel-date,
        .card__travel-wilaya,
        .card__travel-destination {
            font-size: 11px;
            padding: 3px 6px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex: 1; /* ⭐ OCUPAR ESPACIO DISPONIBLE */
            min-width: 0; /* ⭐ PERMITIR QUE SE ENCOJA */
        }

        .card__travel-date {
            background: linear-gradient(135deg, #fdf2f2, #fed7d7);
            border: 1px solid #fed7d7;
        }

        .card__travel-wilaya {
            background: linear-gradient(135deg, #f0f8ff, #e1f0ff);
            border: 1px solid #e1f0ff;
        }

        .card__travel-destination {
            background: linear-gradient(135deg, #f0f9f4, #d4edda);
            border: 1px solid #d4edda;
            max-width: none; /* ⭐ REMOVER MAX-WIDTH FIJO */
        }

        /* Contenedor de opciones mantiene su posición */
        .card__options-container {
            position: relative;
            align-self: flex-start;
            margin-top: -10px;
            z-index: 10001;
            flex-shrink: 0;
        }
    }

    /* Para móviles pequeños - AJUSTES MÁS FINOS */
    @media (max-width: 768px) {
        .card__header {
            padding: 14px 16px; /* ⭐ MÁS PADDING */
            flex-direction: row;
            gap: 12px;
            position: relative;
            align-items: flex-start;
        }

        .card__user-info {
            flex: 1;
            min-width: 0;
            overflow: hidden;
        }

        .card__travel-details {
            gap: 8px; /* ⭐ MÁS ESPACIO */
            width: 100%;
        }

        .card__subcategory {
            font-size: 16px; /* ⭐ MÁS GRANDE */
            gap: 8px;
            margin-bottom: 6px;
        }

        .card__subcategory-icon {
            font-size: 18px; /* ⭐ MÁS GRANDE */
        }

        .card__subcategory-text {
            font-size: 16px; /* ⭐ MÁS GRANDE */
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .card__travel-route {
            gap: 6px; /* ⭐ MÁS ESPACIO */
        }

        .card__route-section {
            display: flex;
            align-items: center;
            gap: 8px; /* ⭐ MÁS ESPACIO */
            font-size: 14px; /* ⭐ MÁS GRANDE */
            flex-wrap: nowrap;
            width: 100%;
            min-height: 24px; /* ⭐ MÁS ALTURA */
        }

        .card__route-label {
            font-weight: 600;
            color: #555;
            white-space: nowrap;
            flex-shrink: 0;
            min-width: 70px; /* ⭐ MÁS ANCHO */
            font-size: 14px; /* ⭐ MÁS GRANDE */
        }

        .card__travel-date,
        .card__travel-wilaya,
        .card__travel-destination {
            font-size: 13px; /* ⭐ MÁS GRANDE */
            padding: 5px 8px; /* ⭐ MÁS PADDING */
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex: 1;
            min-width: 0;
            font-weight: 600;
        }

        .card__travel-date {
            background: linear-gradient(135deg, #fdf2f2, #fed7d7);
            border: 1px solid #fed7d7;
        }

        .card__travel-wilaya {
            background: linear-gradient(135deg, #f0f8ff, #e1f0ff);
            border: 1px solid #e1f0ff;
        }

        .card__travel-destination {
            background: linear-gradient(135deg, #f0f9f4, #d4edda);
            border: 1px solid #d4edda;
            max-width: none;
        }
    }

    /* Para móviles pequeños - TEXTO MÁS GRANDE TAMBIÉN */
    @media (max-width: 480px) {
        .card__header {
            padding: 12px 14px; /* ⭐ MÁS PADDING */
            gap: 10px;
        }

        .card__route-section {
            font-size: 13px; /* ⭐ MÁS GRANDE */
            gap: 6px;
            min-height: 22px; /* ⭐ MÁS ALTURA */
        }

        .card__route-label {
            min-width: 65px; /* ⭐ MÁS ANCHO */
            font-size: 13px; /* ⭐ MÁS GRANDE */
        }

        .card__travel-date,
        .card__travel-wilaya,
        .card__travel-destination {
            font-size: 12px; /* ⭐ MÁS GRANDE */
            padding: 4px 7px; /* ⭐ MÁS PADDING */
        }

        .card__subcategory {
            font-size: 15px; /* ⭐ MÁS GRANDE */
        }

        .card__subcategory-text {
            font-size: 15px; /* ⭐ MÁS GRANDE */
        }
    }

    /* Para móviles extra pequeños - TEXTO AÚN LEGIBLE */
    @media (max-width: 360px) {
        .card__header {
            padding: 10px 12px;
        }

        .card__route-section {
            font-size: 12px; /* ⭐ MANTENER LEGIBLE */
            min-height: 20px;
        }

        .card__route-label {
            min-width: 60px;
            font-size: 12px; /* ⭐ MANTENER LEGIBLE */
        }

        .card__travel-date,
        .card__travel-wilaya,
        .card__travel-destination {
            font-size: 11px; /* ⭐ MANTENER LEGIBLE */
            padding: 3px 6px;
        }

        .card__subcategory {
            font-size: 14px; /* ⭐ MANTENER LEGIBLE */
        }

        .card__subcategory-text {
            font-size: 14px; /* ⭐ MANTENER LEGIBLE */
        }
    }

`}</style>
        </>
    );
};

export default CardBodyCarousel;