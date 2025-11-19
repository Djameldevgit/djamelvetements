import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
 
import { likePost, unLikePost, savePost, unSavePost, deletePost } from '../../../redux/actions/postAction';
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import ShareModal from '../../ShareModal';
import VerifyModal from '../../authAndVerify/VerifyModal';
import DesactivateModal from '../../authAndVerify/DesactivateModal';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';
import moment from 'moment';
import HeaderAgencia from '../../HeaderAgencia';
import { MESS_TYPES } from '../../../redux/actions/messageAction';
import ImageOverlay from './ImageOverlay'; // Importar el nuevo componente

const CardBodyCarousel = ({ post }) => {
  const { languageReducer, auth, socket } = useSelector((state) => state);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);
  const [viewsCount, setViewsCount] = useState(post.views || 0);

  const [showModal, setShowModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showDeactivatedModal, setShowDeactivatedModal] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const optionsModalRef = useRef(null);

  const { t } = useTranslation(['cardbodycarousel', 'common']);
  const lang = languageReducer.language || 'en';
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [showInfo, setShowInfo] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  

  const isDetailPage = useMemo(() => location.pathname.includes('/post/'), [location.pathname]);
  const isPostOwner = useMemo(() =>
    auth.user && post.user && auth.user._id === post.user._id,
    [auth.user, post.user]
  );
  const isAdmin = useMemo(() =>
    auth.user && auth.user.role === 'admin',
    [auth.user]
  );

  // Memoizar estilos estáticos
  const styles = useMemo(() => ({
    carouselContainer: {
      position: "relative",
      height: isDetailPage ? "auto" : "400px",
      maxHeight: isDetailPage ? "none" : "80vh",
      overflow: 'hidden',
      cursor: isDetailPage ? 'default' : 'pointer'
    },
    optionsButton: {
      position: "absolute",
      top: "10px",
      right: "19px",
      zIndex: 10,
      opacity: showInfo ? 1 : 0.8,
      transition: 'opacity 0.3s ease'
    },
    iconCircle: {
      cursor: "pointer",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      borderRadius: "50%",
      padding: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "32px",
      height: "32px",
      transition: "all 0.2s ease",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)"
    },
    infoContainer: {
      position: "absolute",
      bottom: "0",
      left: "0",
      right: "0",
      zIndex: 2,
      color: "white",
      background: showInfo
        ? "linear-gradient(transparent 0%, rgba(0, 0, 0, 0.8) 100%)"
        : "transparent",
      padding: showInfo ? "16px 12px 12px 12px" : "0px 12px",
      backdropFilter: showInfo ? "blur(10px)" : "none",
      borderTop: showInfo ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
      height: showInfo ? "auto" : "0px",
      opacity: showInfo ? 1 : 0,
      transform: showInfo ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      overflow: 'hidden'
    },
    actionButtonContainer: {
      position: "absolute",
      right: "12px",
      bottom: "70px",
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
      justifyContent: "center",
      padding: "10px 0"
    },
    actionButton: {
      cursor: "pointer",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      borderRadius: "50%",
      padding: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "44px",
      height: "44px",
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)"
    }
  }), [isDetailPage, showInfo]);

  // CONTADOR DE VIEWS - Solo una vez
  useEffect(() => {
    const incrementViewCount = async () => {
      if (post._id && !isDetailPage) {
        try {
          const viewedPosts = JSON.parse(sessionStorage.getItem('viewedPosts') || '[]');

          if (!viewedPosts.includes(post._id)) {
            viewedPosts.push(post._id);
            sessionStorage.setItem('viewedPosts', JSON.stringify(viewedPosts));
            setViewsCount(prev => prev + 1);
            console.log(`✅ Vista contada para post: ${post._id} - Vistas: ${viewsCount + 1}`);
          }
        } catch (error) {
          console.error('Error incrementing view count:', error);
          setViewsCount(prev => prev + 1);
        }
      }
    };

    incrementViewCount();
  }, [post._id, isDetailPage]);

  // Callbacks memoizados
  const handleImageClick = useCallback(() => {
    if (!isDetailPage) {
      setShowInfo(prev => !prev);
    }
  }, [isDetailPage]);

  const handleTouchStart = useCallback(() => {
    if (!isDetailPage) {
      setIsTouching(true);
    }
  }, [isDetailPage]);

  const handleTouchEnd = useCallback(() => {
    if (!isDetailPage) {
      setIsTouching(false);
      setTimeout(() => setShowInfo(prev => !prev), 100);
    }
  }, [isDetailPage]);

  const canProceed = useCallback(() => {
    if (!auth.token || !auth.user) {
      setShowModal(true);
      return false;
    }
    return true;
  }, [auth.token, auth.user]);

  const showAlert = useCallback((message, variant = 'info') => {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { [variant]: message }
    });
  }, [dispatch]);

  const handleDeletePost = useCallback(async () => {
    if (!auth.user) {
      setShowModal(true);
      return;
    }

    if (!isPostOwner && !isAdmin) {
      showAlert(t('no_permission_delete'), 'warning');
      return;
    }

    try {
      setShowDeleteModal(false);
      showAlert(t('deleting_post'), 'info');
      await dispatch(deletePost({ post, auth }));
      showAlert(t('post_deleted_success'), 'success');
      setTimeout(() => history.push('/'), 1500);
    } catch (error) {
      console.error('Error eliminando publicación:', error);
      showAlert(t('error_deleting_post'), 'danger');
    }
  }, [auth, isPostOwner, isAdmin, post, dispatch, history, showAlert, t]);

  const handleDeleteClick = useCallback((e) => {
    e?.stopPropagation();
    if (!auth.user) {
      setShowModal(true);
      return;
    }
    if (!isPostOwner && !isAdmin) {
      showAlert(t('no_permission_delete'), 'warning');
      return;
    }
    setShowDeleteModal(true);
  }, [auth.user, isPostOwner, isAdmin, showAlert, t]);

  const handleEditPost = useCallback((e) => {
    e?.stopPropagation();
    if (!auth.user) {
      setShowModal(true);
      return;
    }
    if (!isPostOwner && !isAdmin) {
      showAlert(t('no_permission_edit'), 'warning');
      return;
    }
    history.push('/createpost', {
      isEdit: true,
      postData: {
        ...post,
        title: post.title || '',
        description: post.description || post.content || '',
        images: post.images || [],
        category: post.category || 'Agence de Voyage',
        subCategory: post.subCategory || '',
        price: post.price || '',
        wilaya: post.wilaya || '',
        commune: post.commune || '',
        contacto: post.contacto || '',
        datedepar: post.datedepar || '',
        destinacionvoyage1: post.destinacionvoyage1 || '',
        destinacionhadj: post.destinacionhadj || '',
        duracionviaje: post.duracionviaje || '',
        transporte: post.transporte || '',
      }
    });
  }, [auth.user, isPostOwner, isAdmin, post, history, showAlert, t]);

  useEffect(() => {
    if (auth.user && post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user]);

  useEffect(() => {
    if (auth.user?.saved?.includes(post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user, post._id]);

  const handleLike = useCallback(async () => {
    if (!canProceed()) return;
    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket, t, languageReducer }));
    setLoadLike(false);
  }, [canProceed, dispatch, post, auth, socket, t, languageReducer]);

  const handleUnLike = useCallback(async () => {
    if (!canProceed()) return;
    setLoadLike(true);
    await dispatch(unLikePost({ post, auth, socket, t, languageReducer }));
    setLoadLike(false);
  }, [canProceed, dispatch, post, auth, socket, t, languageReducer]);

  const handleSavePost = useCallback(async () => {
    if (!canProceed()) return;
    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  }, [canProceed, dispatch, post, auth]);

  const handleUnSavePost = useCallback(async () => {
    if (!canProceed()) return;
    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  }, [canProceed, dispatch, post, auth]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: post.title || t('default_share_title'),
        text: post.content || t('default_share_text'),
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      setShowShareOptions(true);
    }
  }, [post.title, post.content, t]);

  const navigateToDetail = useCallback((e) => {
    e.stopPropagation();
    history.push(`/post/${post._id}`);
  }, [history, post._id]);

  const handleAddUser = useCallback((user) => {
    if (!canProceed()) return;
  
    dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: '', media: [] } });
    history.push(`/message/${user._id}`);
  }, [canProceed, dispatch, history]);
  
  const handleContactSeller = useCallback(() => {
    if (!canProceed()) return;
    handleAddUser(post.user);
    setShowOptionsModal(false);
  }, [canProceed, post.user, handleAddUser]);

  // MODAL DE OPCIONES MEJORADO
  const OptionsModal = React.memo(() => {
    if (!showOptionsModal) return null;

    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        zIndex: 9999,
        backdropFilter: "blur(10px)"
      }}>
        <div ref={optionsModalRef} style={{
          background: "white",
          width: "100%",
          maxWidth: "500px",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          padding: "20px 0",
          transform: "translateY(0)",
          animation: "slideUp 0.3s ease",
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {(isPostOwner || isAdmin) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditPost(e);
                  setShowOptionsModal(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  padding: "16px 24px",
                  textAlign: "left",
                  fontSize: "16px",
                  color: "#333",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "background-color 0.2s ease",
                  backgroundColor: "rgba(255, 193, 7, 0.1)",
                  borderLeft: "3px solid #ffc107"
                }}
              >
                <span className="material-icons" style={{ color: "#ffc107" }}>edit</span>
                {isAdmin && !isPostOwner ? t('edit_post_admin') : t('edit_post')}
              </button>
            )}

            {(isPostOwner || isAdmin) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(e);
                  setShowOptionsModal(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  padding: "16px 24px",
                  textAlign: "left",
                  fontSize: "16px",
                  color: "#e74c3c",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "background-color 0.2s ease"
                }}
              >
                <span className="material-icons" style={{ color: "#e74c3c" }}>delete</span>
                {isAdmin && !isPostOwner ? t('delete_post_admin') : t('delete_post')}
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleContactSeller();
                setShowOptionsModal(false);
              }}
              style={{
                background: "none",
                border: "none",
                padding: "16px 24px",
                textAlign: "left",
                fontSize: "16px",
                color: "#333",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "background-color 0.2s ease"
              }}
            >
              <span className="material-icons" style={{ color: "#007bff" }}>chat</span>
              {t('contact_seller')}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
                setShowOptionsModal(false);
              }}
              style={{
                background: "none",
                border: "none",
                padding: "16px 24px",
                textAlign: "left",
                fontSize: "16px",
                color: "#333",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "background-color 0.2s ease"
              }}
            >
              <span className="material-icons" style={{ color: "#007bff" }}>share</span>
              {t('share')}
            </button>

            {auth.user && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  saved ? handleUnSavePost() : handleSavePost();
                  setShowOptionsModal(false);
                }}
                disabled={saveLoad}
                style={{
                  background: "none",
                  border: "none",
                  padding: "16px 24px",
                  textAlign: "left",
                  fontSize: "16px",
                  color: saveLoad ? "#999" : "#333",
                  cursor: saveLoad ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "background-color 0.2s ease",
                  opacity: saveLoad ? 0.6 : 1
                }}
              >
                <span className="material-icons" style={{ color: saved ? "#ff8c00" : "#666" }}>
                  {saved ? 'bookmark' : 'bookmark_border'}
                </span>
                {saveLoad ? t('saving') : (saved ? t('saved') : t('save'))}
              </button>
            )}

            <div style={{ padding: "8px 16px", marginTop: "8px" }}>
              <button
                onClick={() => setShowOptionsModal(false)}
                style={{
                  background: "rgba(0, 0, 0, 0.05)",
                  border: "none",
                  padding: "16px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  color: "#333",
                  cursor: "pointer",
                  width: "100%",
                  fontWeight: "600",
                  transition: "background-color 0.2s ease"
                }}
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="card_body">
        {post.images.length > 0 && (
          <div
            className="carousel-container"
            style={styles.carouselContainer}
            onClick={handleImageClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {isDetailPage ? (
              <div style={{ marginBottom: '20px' }}>
                <HeaderAgencia
                  componentHeight="180px"
                  imageColumns={3}
                  cardColumns={9}
                  imageSrc={post.images[0]?.url || "/images/agencia.jpg"}
                />
              </div>
            ) : (
              <ImageOverlay
                post={post}
                isDetailPage={isDetailPage}
                showInfo={showInfo}
                styles={styles}
                handleImageClick={handleImageClick}
                handleTouchStart={handleTouchStart}
                handleTouchEnd={handleTouchEnd}
                navigateToDetail={navigateToDetail}
                setShowOptionsModal={setShowOptionsModal}
                isLike={isLike}
                loadLike={loadLike}
                saved={saved}
                saveLoad={saveLoad}
                handleLike={handleLike}
                handleUnLike={handleUnLike}
                handleSavePost={handleSavePost}
                handleUnSavePost={handleUnSavePost}
                handleShare={handleShare}
                viewsCount={viewsCount}
                t={t}
                auth={auth}
                isPostOwner={isPostOwner}
                isAdmin={isAdmin}
                handleEditPost={handleEditPost}
                handleDeleteClick={handleDeleteClick}
                handleContactSeller={handleContactSeller}
              />
            )}
          </div>
        )}
      </div>

      {!isDetailPage && <OptionsModal />}

      {/* Modales simplificados */}
      {showDeleteModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          backdropFilter: "blur(10px)"
        }}>
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            maxWidth: "400px",
            width: "90vw",
            textAlign: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
          }}>
            <div style={{ fontSize: "48px", color: "#e74c3c", marginBottom: "20px" }}>
              <span className="material-icons">delete_forever</span>
            </div>
            <h3 style={{ marginBottom: "15px", color: "#2c3e50", fontWeight: "700" }}>
              {t('confirm_delete')}
            </h3>
            <p style={{ marginBottom: "25px", color: "#7f8c8d", lineHeight: "1.5" }}>
              {t('delete_confirmation_message')}
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: "12px 24px",
                  background: "rgba(0, 0, 0, 0.05)",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "#2c3e50",
                  transition: "all 0.3s ease"
                }}
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleDeletePost}
                style={{
                  padding: "12px 24px",
                  background: "linear-gradient(135deg, #e74c3c, #c0392b)",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "white",
                  transition: "all 0.3s ease"
                }}
              >
                {t('delete_post')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showShareOptions && (
        <ShareModal
          show={showShareOptions}
          onClose={() => setShowShareOptions(false)}
          post={post}
        />
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content" style={{ position: 'relative' }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '1.8rem',
                color: '#333',
                cursor: 'pointer',
                fontWeight: 'bold',
                lineHeight: '1',
              }}
              aria-label={t('close')}
            >
              ×
            </button>

            <h4>{t("title2", { lng: languageReducer.language })}</h4>
            <p>{t("message2", { lng: languageReducer.language })}</p>
            <div className="modal-buttons">
              <button onClick={() => history.push("/login")}>
                {t("login2", { lng: languageReducer.language })}
              </button>
              <button onClick={() => history.push("/register")}>
                {t("register2", { lng: languageReducer.language })}
              </button>
              <button onClick={() => setShowModal(false)}>
                {t("close2", { lng: languageReducer.language })}
              </button>
            </div>
          </div>
        </div>
      )}

      {showVerifyModal && (
        <VerifyModal show={showVerifyModal} onClose={() => setShowVerifyModal(false)} />
      )}
      <DesactivateModal show={showDeactivatedModal} onClose={() => setShowDeactivatedModal(false)} />
    </div>
  );
};

export default React.memo(CardBodyCarousel);