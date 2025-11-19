import React, { useState, useEffect } from 'react';
import Carousel from '../../Carousel';
import { likePost, unLikePost, savePost, unSavePost } from '../../../redux/actions/postAction';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CardBodyCarousel = ({ post }) => {
    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const [saveLoad, setSaveLoad] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    const { languageReducer } = useSelector((state) => state);
    const { t } = useTranslation();
    const history = useHistory();
    const { auth, socket } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.user && post.likes.find(like => like._id === auth.user._id)) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }
    }, [post.likes, auth.user]);

    const handleLike = async () => {
        if (!auth.token) return setShowModal(true);
        if (loadLike) return;

        setLoadLike(true);
        dispatch(likePost({ post, auth, socket, t, languageReducer }));
        setLoadLike(false);
    };

    const handleUnLike = async () => {
        if (!auth.token) return setShowModal(true);
        if (loadLike) return;

        setLoadLike(true);
        dispatch(unLikePost({ post, auth, socket, t, languageReducer }));
        setLoadLike(false);
    };

    useEffect(() => {
        if (auth.user && auth.user.saved.find(id => id === post._id)) {
            setSaved(true);
        } else {
            setSaved(false);
        }
    }, [auth.user, post._id]);

    const handleSavePost = async () => {
        if (!auth.token) return setShowModal(true);
        if (saveLoad) return;

        setSaveLoad(true);
        await dispatch(savePost({ post, auth }));
        setSaveLoad(false);
    };

    const handleUnSavePost = async () => {
        if (!auth.token) return setShowModal(true);
        if (saveLoad) return;

        setSaveLoad(true);
        await dispatch(unSavePost({ post, auth }));
        setSaveLoad(false);
    };

    return (
        <div>
            <div className="card_body">
                {post.images.length > 0 && (
                    <div className="carousel-container" style={{ position: 'relative' }}>
                        {/* Botón Save - Más pequeño */}
                        {/* Botón Save - Color de fondo cambiado */}
<div
    style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        zIndex: 1,
        cursor: 'pointer',
        backgroundColor: 'rgba(255, 235, 205, 0.9)', // Color blanco hueso
        borderRadius: '50%',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px'
    }}
    onClick={saved ? handleUnSavePost : handleSavePost}
>
    <span
        className="material-icons"
        style={{
            fontSize: '18px',
            color: saved ? '#ff8c00' : '#000',
        }}
    >
        bookmark
    </span>
</div>

{/* Botón Like y contador - Contador sobre el icono */}
<div
    style={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }}
>
    <div
        style={{
            cursor: 'pointer',
            backgroundColor: 'rgba(173, 216, 230, 0.9)', // Color azul claro
            borderRadius: '50%',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            position: 'relative'
        }}
        onClick={isLike ? handleUnLike : handleLike}
    >
        {/* Contador de likes sobre el icono */}
        <span
            style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                fontSize: '10px',
                fontWeight: 'bold',
                color: 'red',
              
                borderRadius: '50%',
                padding: '1px 4px',
                minWidth: '16px',
                textAlign: 'center',
                 
            }}
        >
            {post.likes.length}
        </span>

        <span
            className="material-icons"
            style={{
                fontSize: '18px',
                color: isLike ? 'red' : '#000',
            }}
        >
            favorite
        </span>
    </div>
</div>

                        <div className="card">
                            <div className="card__image" onClick={() => history.push(`/post/${post._id}`)}>
                                <Carousel images={post.images} id={post._id} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>{t("title", { lng: languageReducer.language })}</h4>
                        <p>{t("message", { lng: languageReducer.language })}</p>
                        <div className="modal-buttons">
                            <button onClick={() => history.push("/login")}> 
                                {t("login", { lng: languageReducer.language })}
                            </button>
                            <button onClick={() => history.push("/register")}>
                                {t("register", { lng: languageReducer.language })}
                            </button>
                            <button onClick={() => setShowModal(false)}>
                                {t("close", { lng: languageReducer.language })}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardBodyCarousel;