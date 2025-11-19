import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Button, InputGroup, ListGroup, Card, Badge, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaSearch, FaCircle, FaRegClock, FaInbox } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { getDataAPI } from '../../utils/fetchData';
import { MESS_TYPES } from '../../redux/actions/messageAction';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { getConversations } from '../../redux/actions/messageAction';

const LeftSide = () => {
  const { auth, message, online, languageReducer, theme, socket } = useSelector(state => state);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [searchUsers, setSearchUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  const { t, i18n } = useTranslation('message');
  const lang = languageReducer?.language || 'es';

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  // 🔹 SOCKET LISTENERS MEJORADOS - Actualización en tiempo real
  useEffect(() => {
    if (!socket) return;

    // Usuario conectado
    socket.on('userOnline', (data) => {
      console.log('🟢 Usuario online:', data.userId);
      dispatch({
        type: MESS_TYPES.UPDATE_USER_STATUS,
        payload: {
          userId: data.userId,
          isOnline: true,
          lastOnline: data.lastOnline || new Date().toISOString(),
          lastConnectedAt: data.lastConnectedAt || new Date().toISOString()
        }
      });
    });

    // Usuario desconectado - CORREGIDO
    socket.on('userOffline', (data) => {
      console.log('🔴 Usuario offline:', data.userId);
      const offlineTime = new Date().toISOString();
      dispatch({
        type: MESS_TYPES.UPDATE_USER_STATUS,
        payload: {
          userId: data.userId,
          isOnline: false,
          lastOnline: data.lastOnline || offlineTime, // 🔹 PRIORIDAD: usar lastOnline del servidor
          lastDisconnectedAt: data.lastDisconnectedAt || offlineTime
        }
      });
    });

    // Evento de compatibilidad
    socket.on('CheckUserOffline', (userId) => {
      console.log('🔴 Usuario offline (legacy):', userId);
      const offlineTime = new Date().toISOString();
      dispatch({
        type: MESS_TYPES.UPDATE_USER_STATUS,
        payload: {
          userId: userId,
          isOnline: false,
          lastOnline: offlineTime,
          lastDisconnectedAt: offlineTime
        }
      });
    });

    return () => {
      socket.off('userOnline');
      socket.off('userOffline');
      socket.off('CheckUserOffline');
    };
  }, [socket, dispatch]);

  // 🔹 FUNCIÓN MEJORADA: Calcular tiempo desde última conexión
  const getLastSeenTime = (user) => {
    if (!user) return t('neverConnected', { lng: lang }) || 'Nunca conectado';

    // 🔹 CORRECCIÓN: Verificar si está online primero
    const isUserOnline = user.online || online.includes(user._id);
    if (isUserOnline) {
      return t('online', { lng: lang }) || 'En línea';
    }

    // 🔹 ORDEN DE PRIORIDAD CORREGIDO para lastOnline
    const possibleDates = [
      user.lastDisconnectedAt, // 🔹 PRIORIDAD 1: Última desconexión
      user.lastOnline,         // 🔹 PRIORIDAD 2: Campo específico lastOnline
      user.lastActivity,       // 🔹 PRIORIDAD 3: Última actividad
      user.lastConnectedAt,    // 🔹 PRIORIDAD 4: Última conexión
      user.lastLogin           // 🔹 PRIORIDAD 5: Último login
    ].filter(date => date && !isNaN(new Date(date).getTime()));

    if (possibleDates.length === 0) {
      return t('neverConnected', { lng: lang }) || 'Nunca conectado';
    }

    // Encontrar la fecha más reciente
    const latestDate = possibleDates.reduce((latest, current) => {
      return new Date(current) > new Date(latest) ? current : latest;
    });

    return formatTimeDifference(latestDate, lang, t);
  };

  // 🔹 FUNCIÓN AUXILIAR: Formatear diferencia de tiempo
  const formatTimeDifference = (dateString, lang, t) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return t('justNow', { lng: lang }) || 'Ahora mismo';
    if (diffMins < 60) return t('minutesAgo', { minutes: diffMins, lng: lang }) || `hace ${diffMins} min`;
    if (diffHours < 24) return t('hoursAgo', { hours: diffHours, lng: lang }) || `hace ${diffHours} h`;
    if (diffDays === 1) return t('yesterday', { lng: lang }) || 'Ayer';
    if (diffDays < 7) return t('daysAgo', { days: diffDays, lng: lang }) || `hace ${diffDays} días`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return t('weeksAgo', { weeks, lng: lang }) || `hace ${weeks} semana${weeks > 1 ? 's' : ''}`;
    }

    // Para más de un mes, mostrar fecha localizada
    return date.toLocaleDateString(lang, {
      day: 'numeric',
      month: 'short',
      year: diffDays > 365 ? 'numeric' : undefined
    });
  };

  // 🔹 FUNCIÓN MEJORADA: Determinar estado del usuario
  const getUserStatus = (user) => {
    const isUserOnline = user.online || online.includes(user._id);

    if (isUserOnline) {
      return {
        status: 'online',
        text: t('online', { lng: lang }),
        color: '#28a745',
        icon: <FaCircle size={8} className="status-online" />
      };
    }

    // Para usuarios seguidos, mostrar última conexión detallada
    if (auth.user?.following?.find(item => item._id === user._id)) {
      const lastSeen = getLastSeenTime(user);
      return {
        status: 'offline',
        text: lastSeen,
        color: theme ? '#6c757d' : '#adb5bd',
        icon: <FaRegClock size={8} />
      };
    }

    // Para usuarios no seguidos, mostrar genérico
    return {
      status: 'unknown',
      text: t('offline', { lng: lang }),
      color: theme ? '#495057' : '#dee2e6',
      icon: <FaCircle size={8} />
    };
  };

  const handleSearch = async e => {
    e.preventDefault();
    if (!search) return setSearchUsers([]);

    try {
      setIsSearching(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setSearchUsers(res.data.users);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response?.data?.msg || t('searchError') }
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddUser = (user) => {
    setSearch('');
    setSearchUsers([]);
    dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: '', media: [] } });
    dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    return history.push(`/message/${user._id}`);
  };

  const handleAvatarClick = (e, user) => {
    e.stopPropagation();
    history.push(`/profile/${user._id}`);
  };

  const isActive = (user) => {
    return id === user._id ? 'active' : '';
  };

  // 🔹 Cargar conversaciones
  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [dispatch, auth, message.firstLoad]);

  // 🔹 Paginación
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(p => p + 1);
      }
    }, { threshold: 0.1 });

    if (pageEnd.current) {
      observer.observe(pageEnd.current);
    }

    return () => observer.disconnect();
  }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [message.resultUsers, page, auth, dispatch]);

  // 🔹 Sincronizar estado online
  useEffect(() => {
    if (message.firstLoad) {
      dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    }
  }, [online, message.firstLoad, dispatch]);

  // 🔹 COMPONENTE: Indicador de estado
  const StatusIndicator = ({ user, compact = false }) => {
    const status = getUserStatus(user);
    
    if (compact) {
      return (
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip>
              <div>
                <strong>{status.text}</strong>
                {!user.online && (
                  <>
                    <br />
                    {t('lastSeen', { lng: lang }) || 'Última vez'}: {getLastSeenTime(user)}
                  </>
                )}
              </div>
            </Tooltip>
          }
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {status.icon}
          </div>
        </OverlayTrigger>
      );
    }

    return (
      <div className="d-flex flex-column align-items-end">
        <Badge
          bg={status.status === 'online' ? 'success' : 'secondary'}
          pill
          style={{
            fontSize: '0.65rem',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: status.status === 'online' 
              ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
              : theme ? '#495057' : '#6c757d',
            boxShadow: status.status === 'online' 
              ? '0 2px 8px rgba(40, 167, 69, 0.4)'
              : 'none',
            border: status.status === 'online' ? '1px solid rgba(255,255,255,0.2)' : 'none',
            marginBottom: '2px'
          }}
        >
          {status.icon}
          {status.text}
        </Badge>
        
        {!user.online && auth.user?.following?.find(item => item._id === user._id) && (
          <small 
            style={{ 
              fontSize: '0.6rem',
              color: theme ? '#6c757d' : '#868e96',
              textAlign: 'right',
              lineHeight: '1.2',
              maxWidth: '120px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {t('lastSeen', { lng: lang }) || 'Visto'}: {getLastSeenTime(user)}
          </small>
        )}
      </div>
    );
  };

  // 🔹 COMPONENTE: UserCard con información mejorada
  const UserCardWithAvatarLink = ({ user, msg = false }) => {
    const isUserOnline = user.online || online.includes(user._id);
    
    return (
      <div className="d-flex align-items-center" style={{ flex: 1 }}>
        <div 
          className="me-3"
          style={{ cursor: 'pointer' }}
          onClick={(e) => handleAvatarClick(e, user)}
        >
          <img 
            src={user.avatar} 
            alt={user.username}
            className="rounded-circle"
            style={{
              width: '45px',
              height: '45px',
              objectFit: 'cover',
              border: isUserOnline ? '2px solid #28a745' : '2px solid transparent',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.borderColor = '#667eea';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.borderColor = isUserOnline ? '#28a745' : 'transparent';
            }}
          />
        </div>
        
        <div className="flex-grow-1">
          <div className="d-flex align-items-center">
            <h6 className="mb-0 me-2" style={{ 
              fontSize: '0.9rem', 
              fontWeight: '600',
              color: theme ? '#fff' : '#333'
            }}>
              {user.username}
            </h6>
            
            {isUserOnline && (
              <FaCircle 
                size={6} 
                className="status-online" 
                style={{ color: '#28a745' }}
              />
            )}
          </div>
          
          {msg && user.text && (
            <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>
              {user.text.length > 35 ? user.text.substring(0, 35) + '...' : user.text}
            </p>
          )}
          
          {!isUserOnline && auth.user?.following?.find(item => item._id === user._id) && (
            <small 
              style={{ 
                fontSize: '0.65rem',
                color: theme ? '#6c757d' : '#868e96',
                display: 'block',
                marginTop: '2px'
              }}
            >
              {getLastSeenTime(user)}
            </small>
          )}
        </div>
      </div>
    );
  };

  // 🔹 CONTADOR de usuarios online
  const onlineUsersCount = message.users.filter(user => 
    user.online || online.includes(user._id)
  ).length;

  return (
    <div 
      style={{ 
        direction: lang === 'ar' ? 'rtl' : 'ltr',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: theme ? '#0f0f1e' : '#ffffff'
      }}
    >
      {/* HEADER CON BÚSQUEDA */}
      {auth.user?.role === "admin" && (
        <Card 
          className="border-0 shadow-sm"
          style={{
            borderRadius: '0',
            background: theme 
              ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <Card.Body className="p-2">
            <Form onSubmit={handleSearch}>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={search}
                  placeholder={t('searchPlaceholder', { lng: lang }) || 'Buscar usuarios...'}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    borderRadius: '25px 0 0 25px',
                    border: 'none',
                    padding: '12px 20px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    direction: lang === 'ar' ? 'rtl' : 'ltr',
                    textAlign: lang === 'ar' ? 'right' : 'left',
                    fontSize: '0.95rem'
                  }}
                />
                <Button
                  type="submit"
                  style={{
                    borderRadius: '0 25px 25px 0',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '0 20px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isSearching ? (
                    <Spinner animation="border" size="sm" style={{ color: 'white' }} />
                  ) : (
                    <FaSearch size={16} style={{ color: 'white' }} />
                  )}
                </Button>
              </InputGroup>
            </Form>

            <div className="d-flex justify-content-between align-items-center mt-2 px-1">
              <small style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>
                {t('online', { lng: lang })}: {onlineUsersCount}
              </small>
              <small style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
                {t('total', { lng: lang })}: {message.users.length}
              </small>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* LISTA DE CONVERSACIONES */}
      <div 
        className="message_chat_list"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px',
          background: theme ? '#0f0f1e' : '#f8f9fa'
        }}
      >
        {searchUsers.length !== 0 ? (
          <>
            <div 
              className="mb-2 px-2"
              style={{
                fontSize: '0.85rem',
                color: theme ? '#aaa' : '#666',
                fontWeight: '600'
              }}
            >
              {t('searchResults', { lng: lang }) || 'Resultados de búsqueda'} ({searchUsers.length})
            </div>
            <ListGroup variant="flush">
              {searchUsers.map(user => (
                <ListGroup.Item
                  key={user._id}
                  onClick={() => handleAddUser(user)}
                  style={{
                    cursor: 'pointer',
                    border: 'none',
                    borderRadius: '12px',
                    marginBottom: '8px',
                    padding: '12px',
                    background: theme ? '#16213e' : 'white',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <UserCardWithAvatarLink user={user} />
                    <StatusIndicator user={user} compact={true} />
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        ) : (
          <>
            {message.users.length === 0 ? (
              <div 
                className="text-center p-5"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: theme ? '#aaa' : '#999'
                }}
              >
                <div>
                 <i className='fas fa-user'></i>
                </div>
                <h6 style={{ fontWeight: '600', marginBottom: '8px' }}>
                  {t('noUsersFound', { lng: lang }) || 'No hay conversaciones'}
                </h6>
               
              </div>
            ) : (
              <ListGroup variant="flush">
                {message.users.map(user => (
                  <ListGroup.Item
                    key={user._id}
                    onClick={() => handleAddUser(user)}
                    className={isActive(user)}
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      borderRadius: '12px',
                      marginBottom: '8px',
                      padding: '12px',
                      background: id === user._id
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : theme ? '#16213e' : 'white'
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <div className="d-flex align-items-center justify-content-between">
                        <UserCardWithAvatarLink user={user} msg={true} />
                        <StatusIndicator user={user} compact={false} />
                      </div>

                      {user.unread > 0 && (
                        <Badge
                          bg="danger"
                          pill
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: lang === 'ar' ? 'auto' : '8px',
                            left: lang === 'ar' ? '8px' : 'auto',
                            fontSize: '0.7rem',
                            padding: '4px 8px',
                            minWidth: '24px'
                          }}
                        >
                          {user.unread > 9 ? '9+' : user.unread}
                        </Badge>
                      )}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </>
        )}

        <button
          ref={pageEnd}
          style={{ opacity: 0, height: '1px', border: 'none', background: 'transparent' }}
          aria-label={t('loadMore2', { lng: lang })}
        >
          {t('loadMore2', { lng: lang })}
        </button>
      </div>

      <style>{`
        .message_chat_list::-webkit-scrollbar {
          width: 6px;
        }
        .message_chat_list::-webkit-scrollbar-track {
          background: ${theme ? '#0f0f1e' : '#f1f1f1'};
        }
        .message_chat_list::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
        }
        .list-group-item.active {
          color: white !important;
        }
        .list-group-item.active * {
          color: white !important;
        }
        @keyframes pulse-online {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        .status-online {
          animation: pulse-online 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LeftSide;