import React, { useRef, useState } from 'react';
import { Card, ListGroup, Modal, Button } from 'react-bootstrap';
import { FaComment, FaPhone, FaVideo, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MESS_TYPES } from '../../../redux/actions/messageAction';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';

const CardFooter = ({ post }) => {
    const { auth, message } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    
    // Referencias y estados para el streaming
    const videoRef = useRef(null);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [stream, setStream] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);

    // 🎯 FUNCIONES DE COMUNICACIÓN MEJORADAS

    const handleChatWithOwner = () => {
        if (!auth.user) {
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: { error: 'Veuillez vous connecter pour démarrer une conversation' } 
            });
            return;
        }

        if (!post.user || !post.user._id) {
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: { error: 'Impossible de contacter ce vendeur' } 
            });
            return;
        }

        try {
            const existingConversation = message.data.find(item => item._id === post.user._id);
            
            if (existingConversation) {
                history.push(`/message/${post.user._id}`);
                return;
            }

            dispatch({
                type: MESS_TYPES.ADD_USER,
                payload: { 
                    ...post.user, 
                    text: '', 
                    media: [],
                    postTitle: post.title || 'Produit de mode',
                    postId: post._id
                }
            });

            history.push(`/message/${post.user._id}`);

            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { success: 'Conversation démarrée avec le vendeur' }
            });

        } catch (error) {
            console.error('Erreur lors du démarrage de la conversation:', error);
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: 'Erreur lors du démarrage de la conversation' }
            });
        }
    };

    const handleCallOwner = () => {
        // 🎯 BUSCAR TELÉFONO EN MÚLTIPLES UBICACIONES
        const phoneNumber = post.telefono || post.user?.mobile || post.phone;
        
        if (!phoneNumber) {
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: { error: 'Numéro de téléphone non disponible' } 
            });
            return;
        }
        
        // 🎯 LLAMADA DIRECTA MEJORADA
        const telUrl = `tel:${phoneNumber}`;
        
        // Intentar abrir el dialer nativo
        window.location.href = telUrl;
        
        // Feedback inmediato al usuario
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { 
                success: `Appel en cours vers ${phoneNumber}`,
                duration: 3000
            }
        });
    };

    // 🎯 NUEVA FUNCIÓN SIMPLIFICADA: VIDEO LLAMADA DIRECTA
    const handleVideoCall = () => {
        // 🎯 BUSCAR TELÉFONO EN MÚLTIPLES UBICACIONES
        const phoneNumber = post.telefono || post.user?.mobile || post.phone;
        
        if (!phoneNumber) {
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: { error: 'Numéro de téléphone non disponible pour la visioconférence' } 
            });
            return;
        }

        // 🎯 VIDEO LLAMADA DIRECTA USANDO PROTOCOLO NATIVO
        const videoCallUrl = `tel:${phoneNumber}`;
        
        // Intentar iniciar video llamada nativa
        window.location.href = videoCallUrl;
        
        // Feedback al usuario
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { 
                success: `Lancement de la visioconférence vers ${phoneNumber}`,
                duration: 3000
            }
        });

        // 🎯 FALLBACK: Si no funciona después de 2 segundos, mostrar opción alternativa
        setTimeout(() => {
            // Verificar si estamos aún en la misma página (la llamada no se inició)
            if (!document.hidden) {
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { 
                        info: 'Utilisez votre app de visioconférence habituelle pour appeler ce numéro',
                        duration: 5000
                    }
                });
            }
        }, 2000);
    };

    const startCamera = async () => {
        try {
            // Solicitar acceso a la cámara
            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "user"
                }, 
                audio: true
            });
            
            setStream(mediaStream);
            
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play().catch(e => console.log('Video play error:', e));
            }
            
            setIsCameraActive(true);
            
        } catch (error) {
            console.error('Erreur d\'accès à la caméra:', error);
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: 'Impossible d\'accéder à la caméra' }
            });
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        
        setIsCameraActive(false);
    };

    const closeVideoModal = () => {
        stopCamera();
        setShowVideoModal(false);
    };

    const toggleCamera = () => {
        if (isCameraActive) {
            stopCamera();
        } else {
            startCamera();
        }
    };

    // 🎯 DETECTAR DISPONIBILIDAD DE FUNCIONES
    const canMakeCall = post.telefono || post.user?.mobile || post.phone;
    const canVideoCall = post.telefono || post.user?.mobile || post.phone;
    const canChat = auth.user && post.user && post.user._id;

    return (
        <>
            <Card.Footer className="border-0 p-0 bg-white">
                <ListGroup variant="flush">
                    
                    {/* FILA 1: TÍTULO */}
                    <ListGroup.Item className="border-0 px-1 py-1">
                        <h6 
                            className="mb-0 fw-bold text-truncate"
                            style={{ fontSize: '15px' }}
                            title={post.title}
                        >
                            {post.title}
                        </h6>
                    </ListGroup.Item>

                    {/* FILA 2: PRECIO - NÚMERO ROJO A LA IZQUIERDA, "DA" A LA DERECHA */}
                    <ListGroup.Item className="border-0 px-1 py-1">
                        <div className="d-flex justify-content-between align-items-center">
                            {/* Número en rojo */}
                            {post.price && (
                                <span 
                                    className="fw-bold"
                                    style={{ 
                                        fontSize: '16px', 
                                        color: '#dc3545'
                                    }}
                                >
                                    {post.price}
                                </span>
                            )}
                            
                            {/* "DA" al extremo derecho */}
                            {post.price && (
                                <span 
                                    className="text-muted"
                                    style={{ 
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}
                                >
                                    DA
                                </span>
                            )}
                        </div>
                    </ListGroup.Item>

                    {/* FILA 3: BOTONES DE CONTACTO SIN BACKGROUND - SOLO COLORES DE TEXTO */}
                    <ListGroup.Item className="border-0 px-1 py-1">
                        <div className="d-flex justify-content-between align-items-center gap-3">
                            {/* 1. Teléfono - Solo color de texto */}
                            <div
                                className={`d-flex align-items-center justify-content-center ${
                                    canMakeCall ? 'text-primary' : 'text-muted'
                                }`}
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    cursor: canMakeCall ? 'pointer' : 'not-allowed',
                                    transition: 'all 0.2s ease'
                                }}
                                onClick={canMakeCall ? handleCallOwner : undefined}
                                title={canMakeCall ? `Appeler le vendeur` : "Numéro non disponible"}
                                onMouseEnter={(e) => {
                                    if (canMakeCall) {
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                        e.currentTarget.style.color = '#0056b3';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (canMakeCall) {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.color = '';
                                    }
                                }}
                            >
                                <FaPhone size={16} />
                            </div>

                            {/* 2. Chat - Solo color de texto */}
                            <div
                                className={`d-flex align-items-center justify-content-center ${
                                    canChat ? 'text-success' : 'text-muted'
                                }`}
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    cursor: canChat ? 'pointer' : 'not-allowed',
                                    transition: 'all 0.2s ease'
                                }}
                                onClick={canChat ? handleChatWithOwner : undefined}
                                title={canChat ? "Envoyer un message au vendeur" : "Connectez-vous pour chatter"}
                                onMouseEnter={(e) => {
                                    if (canChat) {
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                        e.currentTarget.style.color = '#198754';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (canChat) {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.color = '';
                                    }
                                }}
                            >
                                <FaComment size={16} />
                            </div>

                            {/* 3. Video llamada - Solo color de texto */}
                            <div
                                className={`d-flex align-items-center justify-content-center ${
                                    canVideoCall ? 'text-info' : 'text-muted'
                                }`}
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    cursor: canVideoCall ? 'pointer' : 'not-allowed',
                                    transition: 'all 0.2s ease'
                                }}
                                onClick={canVideoCall ? handleVideoCall : undefined}
                                title={
                                    canVideoCall 
                                        ? `Visioconférence avec ${post.telefono || post.user?.mobile || post.phone}` 
                                        : "Visioconférence non disponible"
                                }
                                onMouseEnter={(e) => {
                                    if (canVideoCall) {
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                        e.currentTarget.style.color = '#0dcaf0';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (canVideoCall) {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.color = '';
                                    }
                                }}
                            >
                                <FaVideo size={16} />
                            </div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Footer>

            {/* Modal para prueba de streaming (se mantiene por si acaso) */}
            <Modal 
                show={showVideoModal} 
                onHide={closeVideoModal}
                size="lg"
                centered
            >
                <Modal.Header className="bg-dark text-white">
                    <Modal.Title className="d-flex align-items-center">
                        <FaVideo className="me-2" />
                        Test de Streaming Vidéo
                    </Modal.Title>
                    <Button 
                        variant="outline-light" 
                        size="sm" 
                        onClick={closeVideoModal}
                    >
                        <FaTimes />
                    </Button>
                </Modal.Header>
                
                <Modal.Body className="p-0 bg-dark">
                    <div className="position-relative">
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            style={{
                                width: '100%',
                                height: '400px',
                                backgroundColor: '#000',
                                objectFit: 'cover'
                            }}
                        />
                        
                        {!isCameraActive && (
                            <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                                <FaVideo size={48} className="mb-3 opacity-50" />
                                <p className="mb-0">Caméra en attente d'activation...</p>
                            </div>
                        )}
                    </div>
                </Modal.Body>
                
                <Modal.Footer className="bg-light">
                    <div className="d-flex justify-content-between w-100 align-items-center">
                        <div>
                            <small className="text-muted">
                                {isCameraActive ? '✅ Caméra active' : '❌ Caméra inactive'}
                            </small>
                        </div>
                        
                        <div className="d-flex gap-2">
                            <Button
                                variant={isCameraActive ? "warning" : "success"}
                                size="sm"
                                onClick={toggleCamera}
                            >
                                {isCameraActive ? '🛑 Arrêter' : '🎥 Démarrer'}
                            </Button>
                            
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={closeVideoModal}
                            >
                                Fermer
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CardFooter;