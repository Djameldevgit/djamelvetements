import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import MsgDisplay from './MsgDisplay'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { imageShow, videoShow } from '../../utils/mediaShow'
import { imageUpload } from '../../utils/imageUpload'
import { addMessage, getMessages, loadMoreMessages, deleteConversation } from '../../redux/actions/messageAction'
import { useTranslation } from 'react-i18next'
import Avatar from '../Avatar'
import { Card, Form, Button, Spinner } from 'react-bootstrap'
import { FaArrowLeft, FaTrash, FaImage, FaPaperPlane, FaTimes, FaSmile } from 'react-icons/fa'
import EmojiPicker from 'emoji-picker-react'

// 🔥 COMPONENTE PARA INDICADOR DE CONEXIÓN
const OnlineIndicator = ({ isOnline, size = 'small' }) => {
    const indicatorSize = size === 'large' ? '12px' : '8px'
    
    return (
        <div
            style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                width: indicatorSize,
                height: indicatorSize,
                borderRadius: '50%',
                background: isOnline ? '#4CAF50' : '#9E9E9E',
                border: `2px solid white`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                zIndex: 10
            }}
            title={isOnline ? 'En línea' : 'Desconectado'}
        />
    )
}

const RightSide = () => {
    const { auth, message, theme, socket, languageReducer } = useSelector(state => state)
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation('message')

    const { id } = useParams()
    const [user, setUser] = useState([])
    const [text, setText] = useState('')
    const [media, setMedia] = useState([])
    const [loadMedia, setLoadMedia] = useState(false)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [onlineUsers, setOnlineUsers] = useState([]) // 🔥 NUEVO: Estado para usuarios online

    const refDisplay = useRef()
    const pageEnd = useRef()
    const emojiPickerRef = useRef()
    const emojiButtonRef = useRef()

    const [data, setData] = useState([])
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(0)
    const [isLoadMore, setIsLoadMore] = useState(0)

    const history = useHistory()
    const typingTimeout = useRef()

    // Cambiar idioma
    const lang = languageReducer.language || 'es'
    useEffect(() => {
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang)
        }
    }, [lang, i18n])

    // 🔥 NUEVO: Effect para manejar usuarios en línea
    useEffect(() => {
        if (!socket) return

        // Escuchar estado de conexión del usuario
        socket.emit('check-user-online', { userId: id })
        
        socket.on('user-online-status', (data) => {
            if (data.userId === id) {
                setOnlineUsers(prev => {
                    const filtered = prev.filter(userId => userId !== data.userId)
                    if (data.isOnline) {
                        return [...filtered, data.userId]
                    }
                    return filtered
                })
            }
        })

        // Escuchar cuando usuarios se conectan
        socket.on('user-connected', (userId) => {
            if (userId === id) {
                setOnlineUsers(prev => [...prev, userId])
            }
        })

        // Escuchar cuando usuarios se desconectan
        socket.on('user-disconnected', (userId) => {
            if (userId === id) {
                setOnlineUsers(prev => prev.filter(userId => userId !== id))
            }
        })

        return () => {
            socket.off('user-online-status')
            socket.off('user-connected')
            socket.off('user-disconnected')
        }
    }, [socket, id])

    // 🔥 MEJORADO: Cerrar emoji picker al hacer clic fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiPickerRef.current && 
                !emojiPickerRef.current.contains(event.target) &&
                emojiButtonRef.current &&
                !emojiButtonRef.current.contains(event.target)) {
                setShowEmojiPicker(false)
            }
        }

        if (showEmojiPicker) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showEmojiPicker])

    // 🔥 MEJORADO: Manejo de typing simplificado
    const handleTyping = () => {
        if (socket && id && auth.user) {
            socket.emit('typing-start', {
                sender: auth.user._id,
                recipient: id,
                chatId: id
            })

            clearTimeout(typingTimeout.current)
            typingTimeout.current = setTimeout(() => {
                socket.emit('typing-stop', {
                    sender: auth.user._id,
                    recipient: id,
                    chatId: id
                })
            }, 1000)
        }
    }

    // 🔥 NUEVO: Función para verificar si el usuario está online
    const isUserOnline = onlineUsers.includes(id)

    // 🔥 NUEVO: Función mejorada para manejar emojis
    const handleEmojiClick = (emojiObject) => {
        setText(prevText => prevText + emojiObject.emoji)
    }

    // 🔥 MEJORADO: Toggle emoji picker más simple
    const toggleEmojiPicker = (e) => {
        e?.stopPropagation()
        setShowEmojiPicker(prev => !prev)
    }

    useEffect(() => {
        const newData = message.data.find(item => item._id === id)
        if (newData) {
            setData(newData.messages)
            setResult(newData.result)
            setPage(newData.page)
        }
    }, [message.data, id])

    useEffect(() => {
        if (id && message.users.length > 0) {
            setTimeout(() => {
                if (refDisplay.current) {
                    refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
                }
            }, 50)

            const newUser = message.users.find(user => user._id === id)
            if (newUser) setUser(newUser)
        }
    }, [message.users, id])

    // 🔥 CORREGIDO: Manejo de medios mejorado
    const handleChangeMedia = (e) => {
        const files = [...e.target.files]
        let err = ""
        let newMedia = []
    
        const isSuperUser = auth.user?.role === "Super-utilisateur"
        const isAdmin = auth.user?.role === "admin"
        
        const maxMedia = (isSuperUser || isAdmin) ? 4 : 0
        const totalAfterUpload = media.length + files.length
    
        if (totalAfterUpload > maxMedia) {
            err = t('maxFiles', { 
                max: maxMedia,
                extraInfo: maxMedia === 4 ? t('superAdminInfo') : ""
            })
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
            return
        }
    
        files.forEach(file => {
            if (!file) {
                err = t('fileNotFound')
                return
            }
    
            // Validar tipo de archivo
            if (!file.type.startsWith('image/')) {
                err = t('onlyImages')
                return
            }
    
            // Validar tamaño (5MB máximo)
            if (file.size > 5 * 1024 * 1024) {
                err = t('fileTooLarge')
                return
            }

            // Validar nombre de archivo
            const isValidFileName = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-_.()]+$/.test(file.name)
            if (!isValidFileName) {
                err = t('invalidFileName', { fileName: file.name })
                return
            }
    
            newMedia.push(file)
        })
    
        if (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        } else {
            setMedia([...media, ...newMedia])
        }
        
        // Limpiar input file
        e.target.value = ''
    }

    const handleDeleteMedia = (index) => {
        const newArr = [...media]
        newArr.splice(index, 1)
        setMedia(newArr)
    }

    // 🔥 CORREGIDO: Función de envío mejorada
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        setShowEmojiPicker(false)
        
        if (!text.trim() && media.length === 0) return

        setLoadMedia(true)

        let newArr = []
        if (media.length > 0) {
            try {
                newArr = await imageUpload(media)
            } catch (error) {
                dispatch({ 
                    type: GLOBALTYPES.ALERT, 
                    payload: { error: t('uploadError') } 
                })
                setLoadMedia(false)
                return
            }
        }

        // 🔥 ESTRUCTURA CORREGIDA del mensaje
        const msg = {
            sender: auth.user._id,
            recipient: id,
            text: text.trim(),
            media: newArr,
            createdAt: new Date().toISOString(),
            // Agregar estos campos si tu backend los requiere
            conversationId: id,
            type: media.length > 0 ? 'media' : 'text'
        }

        setText('')
        setMedia([])
        setLoadMedia(false)

        try {
            await dispatch(addMessage({ 
                msg, 
                auth, 
                socket,
                // Estructura alternativa que podría requerir tu backend
                messageData: {
                    ...msg,
                    user: auth.user // Incluir información del usuario si es necesario
                }
            }))
            
            if (refDisplay.current) {
                refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
            }
        } catch (error) {
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: { error: t('sendError') } 
            })
        }
    }

    useEffect(() => {
        const getMessagesData = async () => {
            if (message.data.every(item => item._id !== id)) {
                await dispatch(getMessages({ auth, id }))
                setTimeout(() => {
                    if (refDisplay.current) {
                        refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
                    }
                }, 50)
            }
        }
        getMessagesData()
    }, [id, dispatch, auth, message.data])

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setIsLoadMore(p => p + 1)
            }
        }, {
            threshold: 0.1
        })

        observer.observe(pageEnd.current)
    }, [setIsLoadMore])

    useEffect(() => {
        if (isLoadMore > 1) {
            if (result >= page * 9) {
                dispatch(loadMoreMessages({ auth, id, page: page + 1 }))
                setIsLoadMore(1)
            }
        }
    }, [isLoadMore, result, page, dispatch, auth, id])

    const handleDeleteConversation = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta conversación?')) {
            dispatch(deleteConversation({ auth, id }))
            return history.push('/message')
        }
    }

    const handleGoBack = () => {
        history.push('/message')
    }

    // 🔥 SIMPLIFICADO: Manejo de texto
    const handleTextChange = (e) => {
        setText(e.target.value)
        handleTyping()
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 170px)',
            background: theme ? '#1a1a2e' : '#f8f9fa',
            position: 'relative'
        }}>
            {/* HEADER MEJORADO CON INDICADOR DE CONEXIÓN */}
            <Card 
                className="border-0 shadow-sm"
                style={{
                    borderRadius: '0',
                    background: theme 
                        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    zIndex: 100,
                    position: 'relative'
                }}
            >
                <Card.Body className="p-3">
                    {user.length !== 0 && (
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-3">
                                {/* 🔥 AVATAR CON INDICADOR DE CONEXIÓN */}
                                <div 
                                    style={{
                                        position: 'relative',
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                    }}
                                >
                                    <Avatar src={user.avatar || "/default-avatar.png"} size="big-avatar" />
                                    {/* Indicador de conexión */}
                                    <OnlineIndicator 
                                        isOnline={isUserOnline} 
                                        size="large" 
                                    />
                                </div>
                                <div>
                                    <h6 className="mb-0 text-white fw-bold">{user.username || "Usuario desconocido"}</h6>
                                    <small className="text-white" style={{ opacity: 0.9 }}>
                                        {  user.username }
                                      
                                        
                                        {/* 🔥 MEJORADO: Indicador de typing */}
                                        {message.typing && Array.isArray(message.typing) && 
                                          message.typing.find(item => 
                                            item.chatId === id && 
                                            item.sender !== auth.user._id
                                          ) && (
                                            <span className="typing-indicator ms-2">
                                                <span className="typing-dots">
                                                    <span>.</span>
                                                    <span>.</span>
                                                    <span>.</span>
                                                </span>
                                                escribiendo
                                            </span>
                                        )}
                                    </small>


                                    
                                </div>
                              
                            </div>
                            <div className="d-flex gap-3">
                                <Button
                                    variant="light"
                                    size="sm"
                                    onClick={handleGoBack}
                                    style={{
                                        borderRadius: '10px',
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease'
                                    }}
                                    className="p-0"
                                >
                                    <FaArrowLeft size={18} />
                                </Button>
                                <Button
                                    variant="light"
                                    size="sm"
                                    onClick={handleDeleteConversation}
                                    style={{
                                        borderRadius: '10px',
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease'
                                    }}
                                    className="p-0"
                                >
                                    <FaTrash size={16} className="text-danger" />
                                </Button>
                            </div>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* ÁREA DE MENSAJES */}
            <div 
                className="chat_container" 
                style={{ 
                    flex: 1, 
                    overflowY: 'auto',
                    padding: '20px 15px',
                    background: theme ? '#0f0f1e' : '#ffffff',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <div className="chat_display" ref={refDisplay}>
                    <button 
                        style={{ 
                            marginTop: '-25px', 
                            opacity: 0,
                            height: '1px'
                        }} 
                        ref={pageEnd}
                    >
                        {t('loadMore')}
                    </button>

                    {data.map((msg, index) => (
                        <div key={index}>
                            {msg.sender !== auth.user._id && (
                                <div className="chat_row other_message mb-3">
                                    <MsgDisplay user={user} msg={msg} theme={theme} />
                                </div>
                            )}
                            {msg.sender === auth.user._id && (
                                <div className="chat_row you_message mb-3">
                                    <MsgDisplay user={auth.user} msg={msg} theme={theme} data={data} />
                                </div>
                            )}
                        </div>
                    ))}

                    {loadMedia && (
                        <div className="chat_row you_message text-end">
                            <div 
                                style={{
                                    display: 'inline-block',
                                    padding: '15px 20px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: '15px',
                                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                                }}
                            >
                                <Spinner animation="border" size="sm" style={{ color: 'white' }} />
                                <span className="ms-2 text-white">Subiendo archivos...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* PREVIEW DE MEDIOS */}
            {media.length > 0 && (
                <div 
                    style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                        gap: '10px',
                        padding: '15px',
                        background: theme ? '#16213e' : '#f8f9fa',
                        borderTop: `2px solid ${theme ? '#667eea' : '#e0e0e0'}`,
                        position: 'relative',
                        zIndex: 2
                    }}
                >
                    {media.map((item, index) => (
                        <div 
                            key={index} 
                            style={{
                                position: 'relative',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                aspectRatio: '1/1'
                            }}
                        >
                            {item.type.match(/video/i)
                                ? videoShow(URL.createObjectURL(item), theme)
                                : imageShow(URL.createObjectURL(item), theme)
                            }
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteMedia(index)}
                                style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    padding: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: 'none',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                                }}
                            >
                                <FaTimes size={14} />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            {/* FORMULARIO DE ENTRADA MEJORADO */}
            <Card 
                className="border-0"
                style={{
                    borderRadius: '0',
                    background: theme ? '#16213e' : 'white',
                    boxShadow: '0 -4px 12px rgba(0,0,0,0.08)',
                    position: 'relative',
                    zIndex: 10
                }}
            >
                <Card.Body className="p-3" style={{ position: 'relative' }}>
                    <Form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center">
                            <div className="position-relative flex-grow-1">
                                <Form.Control
                                    type="text"
                                    placeholder={t('placeholder', 'Escribe un mensaje...')}
                                    value={text}
                                    onChange={handleTextChange}
                                    style={{
                                        borderRadius: '25px',
                                        border: `2px solid ${theme ? '#667eea' : '#e0e0e0'}`,
                                        padding: '12px 20px',
                                        background: theme ? '#0f0f1e' : '#f8f9fa',
                                        color: theme ? 'white' : '#333',
                                        direction: lang === 'ar' ? 'rtl' : 'ltr',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#667eea'
                                        e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.15)'
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = theme ? '#667eea' : '#e0e0e0'
                                        e.target.style.boxShadow = 'none'
                                    }}
                                />
                            </div>

                            {/* 🔥 BOTÓN DE EMOJIS MEJORADO */}
                            <div className="position-relative">
                                <Button
                                    ref={emojiButtonRef}
                                    variant={theme ? "outline-light" : "outline-primary"}
                                    onClick={toggleEmojiPicker}
                                    style={{
                                        width: '45px',
                                        height: '45px',
                                        borderRadius: '50%',
                                        padding: '0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: `2px solid ${theme ? '#667eea' : '#667eea'}`,
                                        background: showEmojiPicker 
                                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                                            : theme ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.1)',
                                        transition: 'all 0.3s ease',
                                        zIndex: 1000
                                    }}
                                >
                                    <FaSmile size={18} style={{ 
                                        color: showEmojiPicker ? 'white' : '#667eea' 
                                    }} />
                                </Button>

                                {/* 🔥 EMOJI PICKER MEJORADO */}
                                {showEmojiPicker && (
                                    <div 
                                        ref={emojiPickerRef}
                                        style={{
                                            position: 'fixed',
                                            bottom: '100px',
                                            right: '20px',
                                            zIndex: 99999,
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                            border: `1px solid ${theme ? '#333' : '#ddd'}`,
                                            maxWidth: '90vw',
                                            maxHeight: '60vh'
                                        }}
                                    >
                                        <EmojiPicker
                                            onEmojiClick={handleEmojiClick}
                                            height={400}
                                            width={350}
                                            theme={theme ? 'dark' : 'light'}
                                            searchDisabled={false}
                                            skinTonesDisabled={true}
                                            previewConfig={{
                                                showPreview: false
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Botón de adjuntar imagen */}
                            {(auth.user?.role === "Super-utilisateur" || auth.user?.role === "admin") && (
                                <div className="position-relative">
                                    <Button
                                        variant={theme ? "outline-light" : "outline-primary"}
                                        style={{
                                            width: '45px',
                                            height: '45px',
                                            borderRadius: '50%',
                                            padding: '0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: `2px solid ${theme ? '#667eea' : '#667eea'}`,
                                            background: theme ? 'rgba(102, 126, 234, 0.1)' : 'rgba(102, 126, 234, 0.1)',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <FaImage size={18} style={{ color: '#667eea' }} />
                                    </Button>
                                    <Form.Control
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleChangeMedia}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            opacity: 0,
                                            cursor: 'pointer'
                                        }}
                                    />
                                </div>
                            )}

                            {/* Botón de enviar */}
                            <Button
                                type="submit"
                                disabled={!(text.trim() || media.length > 0)}
                                style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    padding: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: (text.trim() || media.length > 0)
                                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                        : '#ccc',
                                    border: 'none',
                                    transition: 'all 0.3s ease',
                                    boxShadow: (text.trim() || media.length > 0)
                                        ? '0 4px 12px rgba(102, 126, 234, 0.4)'
                                        : 'none'
                                }}
                            >
                                <FaPaperPlane size={16} style={{ color: 'white' }} />
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            {/* ESTILOS MEJORADOS */}
            <style>{`
                .typing-indicator {
                    display: inline-flex;
                    align-items: center;
                    font-size: 11px;
                    font-style: italic;
                    color: rgba(255,255,255,0.9);
                    margin-top: 4px;
                }

                .typing-dots {
                    display: flex;
                    margin-right: 4px;
                }

                .typing-dots span {
                    display: inline-block;
                    animation: typing-dot 1.2s infinite;
                    margin: 0 1px;
                    font-size: 16px;
                    font-weight: bold;
                }
                
                .typing-dots span:nth-child(2) {
                    animation-delay: 0.2s;
                }
                
                .typing-dots span:nth-child(3) {
                    animation-delay: 0.4s;
                }
                
                @keyframes typing-dot {
                    0%, 80%, 100% { 
                        transform: translateY(0); 
                        opacity: 0.4; 
                    }
                    40% { 
                        transform: translateY(-4px); 
                        opacity: 1; 
                    }
                }

                .chat_container::-webkit-scrollbar {
                    width: 8px;
                }

                .chat_container::-webkit-scrollbar-track {
                    background: ${theme ? '#0f0f1e' : '#f1f1f1'};
                }

                .chat_container::-webkit-scrollbar-thumb {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 10px;
                }

                .chat_container::-webkit-scrollbar-thumb:hover {
                    background: #667eea;
                }

                /* Animación para el indicador de conexión */
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }

                .online-indicator {
                    animation: pulse 2s infinite;
                }
            `}</style>
        </div>
    )
}

export default RightSide