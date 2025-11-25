import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import Card from 'react-bootstrap/Card';
import {
  FaPlus,
  FaInfoCircle,
  FaTools,
  FaShieldAlt,
  FaUsers,
  FaUserCog,
  FaSignOutAlt,
  FaUserCircle,
  FaSignInAlt,
  FaUserPlus,
  FaSearch,
  FaBell,
  FaShareAlt,
  FaGlobe,
  FaDownload,
  FaMapMarkerAlt
} from 'react-icons/fa';

import { Navbar, Container, NavDropdown, Badge, Dropdown } from 'react-bootstrap';
import LanguageSelectorandroid from '../LanguageSelectorandroid';
import VerifyModal from '../authAndVerify/VerifyModal';
import DesactivateModal from '../authAndVerify/DesactivateModal';
import MultiCheckboxModal from './MultiCheckboxModal.';
import ShareAppModal from '../shareAppModal';

const Navbar2 = () => {
  const { auth, theme, cart, notify, settings } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { languageReducer } = useSelector(state => state);
  const { t, i18n } = useTranslation('navbar2');
  const lang = languageReducer.language || 'es';

  // Estados PWA
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(false);

  // Estados del componente
  const [showShareModal, setShowShareModal] = useState(false);
  const [userRole, setUserRole] = useState(auth.user?.role);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showDeactivatedModal, setShowDeactivatedModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);
  const [showNotifyDropdown, setShowNotifyDropdown] = useState(false);

  const notifyDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  // 🔥 DETECCIÓN MEJORADA DE TAMAÑO DE PANTALLA
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detección PWA
  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPWAInstalled(true);
    }

    const handleInstallAvailable = () => setShowInstallButton(true);
    const handleInstalled = () => {
      setIsPWAInstalled(true);
      setShowInstallButton(false);
    };

    window.addEventListener('pwaInstallAvailable', handleInstallAvailable);
    window.addEventListener('pwaInstalled', handleInstalled);

    return () => {
      window.removeEventListener('pwaInstallAvailable', handleInstallAvailable);
      window.removeEventListener('pwaInstalled', handleInstalled);
    };
  }, []);

  // Forzar mostrar en desarrollo
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => {
        if (!showInstallButton && !isPWAInstalled) {
          setShowInstallButton(true);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showInstallButton, isPWAInstalled]);

  // Efectos de idioma y usuario
  useEffect(() => {
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  useEffect(() => {
    if (auth.user?.role && auth.user.role !== userRole) {
      setUserRole(auth.user.role);
    }
  }, [auth.user?.role, userRole]);

  // Handlers
  const handleLogout = () => {
    dispatch(logout());
  };

  // Verificación PWA mejorada
  useEffect(() => {
    const checkPWAInstallation = () => {
      const isInstalled =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone ||
        localStorage.getItem('pwaInstalled') === 'true';

      setIsPWAInstalled(isInstalled);
      return isInstalled;
    };

    const installed = checkPWAInstallation();

    if (!installed) {
      const handleInstallAvailable = () => setShowInstallButton(true);
      const handleInstalled = () => {
        setIsPWAInstalled(true);
        setShowInstallButton(false);
      };

      window.addEventListener('pwaInstallAvailable', handleInstallAvailable);
      window.addEventListener('pwaInstalled', handleInstalled);

      const installCheckInterval = setInterval(() => {
        if (checkPWAInstallation()) {
          clearInterval(installCheckInterval);
        } else if (window.deferredPrompt && !showInstallButton) {
          setShowInstallButton(true);
        }
      }, 2000);

      return () => {
        window.removeEventListener('pwaInstallAvailable', handleInstallAvailable);
        window.removeEventListener('pwaInstalled', handleInstalled);
        clearInterval(installCheckInterval);
      };
    }
  }, [showInstallButton]);

  // Manejador de instalación PWA
  const handleInstallPWA = async () => {
    try {
      if (window.installPWA) {
        const installed = await window.installPWA();
        if (installed) {
          setShowInstallButton(false);
          setIsPWAInstalled(true);
        }
      } else {
        window.open('/?install-pwa=true', '_blank');
      }
    } catch (error) {
      console.error('Error instalando PWA:', error);
    }
  };

  // Verificación de settings
  if (!settings || Object.keys(settings).length === 0) {
    return (
      <nav className="navbar navbar-light bg-light" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1030 }}>
        <span className="navbar-brand">{t('loading')}</span>
      </nav>
    );
  }

  const totalItems = (cart?.items && Array.isArray(cart.items))
    ? cart.items.reduce((acc, item) => acc + (item?.quantity || 0), 0)
    : 0;

  const unreadNotifications = notify.data.filter(n => !n.isRead).length;

  // 🔥 COMPONENTE MEJORADO MenuItem
  const MenuItem = ({
    icon: Icon,
    iconColor,
    to,
    onClick,
    children,
    danger = false,
    badge = null,
    description = null
  }) => (
    <NavDropdown.Item
      as={to ? Link : 'button'}
      to={to}
      onClick={onClick}
      className={`custom-menu-item ${danger ? 'text-danger' : ''}`}
      style={{
        padding: description ? '8px 12px' : '10px 12px',
        transition: 'all 0.2s ease',
        borderRadius: '6px',
        margin: '2px 6px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500',
        width: 'calc(100% - 12px)',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Icon className="me-2" style={{
          color: iconColor,
          fontSize: '0.9rem',
          flexShrink: 0,
          minWidth: '18px'
        }} />
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: description ? 'column' : 'row',
          alignItems: description ? 'flex-start' : 'center',
          minWidth: 0
        }}>
          <span style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: description ? '600' : '500',
            fontSize: '0.9rem'
          }}>
            {children}
          </span>
          {description && (
            <small style={{
              color: settings.style ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
              fontSize: '0.7rem',
              marginTop: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '100%'
            }}>
              {description}
            </small>
          )}
        </div>
        {badge && (
          <Badge
            bg={badge.color || 'primary'}
            style={{
              fontSize: '0.65rem',
              marginLeft: '6px',
              flexShrink: 0
            }}
          >
            {badge.text}
          </Badge>
        )}
      </div>
    </NavDropdown.Item>
  );

  return (
    <>
      {/* 🔥 NAVBAR COMPACTO - ALTURA REDUCIDA */}
      <Navbar
        fixed="top"
        expand="lg"
        style={{
          zIndex: 1030,
          background: settings.style
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          padding: isMobile ? '4px 0' : '6px 0', // 🔥 REDUCIDO
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          minHeight: isMobile ? '48px' : '56px' // 🔥 REDUCIDO
        }}
        className={settings.style ? "navbar-dark" : "navbar-light"}
      >
        <Container
          fluid
          className="align-items-center justify-content-between"
          style={{
            padding: isMobile ? '0 4px' : '0 8px', // 🔥 REDUCIDO
            maxWidth: '100%'
          }}
        >
          {/* Logo y Brand - COMPACTO */}
          <div className="d-flex align-items-center" style={{ minWidth: 0, flex: '0 1 auto' }}>
            <Link
              to="/"
              onDoubleClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
              className="btn p-0"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '32px' : '40px',
                height: isMobile ? '32px' : '40px',
                marginRight: isMobile ? '6px' : '10px',
                background: 'transparent',
                border: 'none',
                borderRadius: '8px',
                overflow: 'hidden',
                flexShrink: 0
              }}
              title="Click para ir al inicio - Doble click para recargar"
            >
              <img
                src="/images/logo.png"
                alt="Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '6px'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Link>

            {!isMobile && (
              <Link
                to="/"
                onDoubleClick={(e) => {
                  e.preventDefault();
                  window.location.reload();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  textDecoration: 'none',
                  display: 'flex', // 🔥 NUEVO: Para alinear verticalmente
                  alignItems: 'center' // 🔥 NUEVO: Centrar verticalmente
                }}
                title="Click para ir al inicio - Doble click para recargar"
              >
                <Navbar.Brand
                  className="py-0 mb-0" // 🔥 CAMBIADO: py-1 a py-0
                  style={{
                    flexShrink: 0,
                    display: 'flex', // 🔥 NUEVO
                    alignItems: 'center', // 🔥 NUEVO
                    height: '100%' // 🔥 NUEVO: Ocupar toda la altura disponible
                  }}
                >
                  <Card.Title
                    className="mb-0"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      letterSpacing: '0.3px',
                      margin: 0, // 🔥 NUEVO: Eliminar todos los márgenes
                      padding: 0, // 🔥 NUEVO: Eliminar padding
                      lineHeight: '1.2', // 🔥 NUEVO: Controlar altura de línea
                      display: 'flex', // 🔥 NUEVO
                      alignItems: 'center' // 🔥 NUEVO: Centrar verticalmente
                    }}
                  >
                    {t('appName')}
                  </Card.Title>
                </Navbar.Brand>
              </Link>
            )}
          </div>

          {/* Iconos de acción - COMPACTOS */}
          <div
            className="d-flex align-items-center"
            style={{
              gap: isMobile ? '4px' : '8px', // 🔥 REDUCIDO
              flexShrink: 0,
              marginLeft: 'auto'
            }}
          >
            {/* Botón de Localización/Mapa */}
            <Link
              to="/Map"
              className="icon-button"
              style={{
                width: isMobile ? '34px' : '38px', // 🔥 REDUCIDO
                height: isMobile ? '34px' : '38px', // 🔥 REDUCIDO
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                backgroundColor: settings.style ? 'rgba(255,255,255,0.1)' : 'rgba(234, 67, 53, 0.1)',
                textDecoration: 'none',
                border: '1px solid rgba(234, 67, 53, 0.2)'
              }}
              title={t('mapLocation') || "Ubicación en Mapa"}
            >
              <FaMapMarkerAlt
                size={isMobile ? 14 : 16} // 🔥 REDUCIDO
                style={{ color: '#ea4335' }}
              />
            </Link>

            {/* Búsqueda */}
            <Link
              to="/search"
              className="icon-button"
              style={{
                width: isMobile ? '34px' : '38px', // 🔥 REDUCIDO
                height: isMobile ? '34px' : '38px', // 🔥 REDUCIDO
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                backgroundColor: settings.style ? 'rgba(255,255,255,0.1)' : 'rgba(102, 126, 234, 0.1)',
                textDecoration: 'none'
              }}
            >
              <FaSearch
                size={isMobile ? 14 : 16} // 🔥 REDUCIDO
                style={{ color: '#667eea' }}
                title={t('search')}
              />
            </Link>

            {/* Botón Instalar PWA */}
            {showInstallButton && !isPWAInstalled && (
              <button
                className="icon-button"
                onClick={handleInstallPWA}
                style={{
                  width: isMobile ? '34px' : '38px', // 🔥 REDUCIDO
                  height: isMobile ? '34px' : '38px', // 🔥 REDUCIDO
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: settings.style ? 'rgba(255,255,255,0.1)' : 'rgba(40, 167, 69, 0.1)',
                  border: '1px solid #28a745', // 🔥 REDUCIDO
                  transition: 'all 0.3s ease',
                  animation: 'pulse 2s infinite',
                  cursor: 'pointer'
                }}
                title={t('installPWA')}
              >
                <FaDownload
                  size={isMobile ? 14 : 16} // 🔥 REDUCIDO
                  style={{ color: '#28a745' }}
                />
              </button>
            )}

            {/* Botón Agregar Post */}
            {(userRole === "Super-utilisateur" || userRole === "admin") && (
              <Link
                to="/create-post"
                className="icon-button"
                style={{
                  width: isMobile ? '34px' : '38px', // 🔥 REDUCIDO
                  height: isMobile ? '34px' : '38px', // 🔥 REDUCIDO
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 3px 10px rgba(102, 126, 234, 0.25)', // 🔥 REDUCIDO
                  textDecoration: 'none'
                }}
                title={t('addPost')}
              >
                <FaPlus
                  size={isMobile ? 12 : 14} // 🔥 REDUCIDO
                  style={{ color: 'white' }}
                />
              </Link>
            )}

            {/* Notificaciones */}
            {auth.user && (
              <div
                className="position-relative icon-button"
                ref={notifyDropdownRef}
                style={{
                  width: isMobile ? '34px' : '38px', // 🔥 REDUCIDO
                  height: isMobile ? '34px' : '38px', // 🔥 REDUCIDO
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: settings.style ? 'rgba(255,255,255,0.1)' : 'rgba(102, 126, 234, 0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                <Link to={'/notify'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FaBell
                    size={isMobile ? 16 : 18} // 🔥 REDUCIDO
                    style={{ color: unreadNotifications > 0 ? '#f5576c' : '#667eea' }}
                  />
                </Link>

                {unreadNotifications > 0 && (
                  <Badge
                    pill
                    style={{
                      fontSize: isMobile ? '0.55rem' : '0.6rem', // 🔥 REDUCIDO
                      position: 'absolute',
                      top: '-3px', // 🔥 REDUCIDO
                      right: '-3px', // 🔥 REDUCIDO
                      padding: isMobile ? '2px 4px' : '3px 5px', // 🔥 REDUCIDO
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      border: '1px solid white', // 🔥 REDUCIDO
                      boxShadow: '0 1px 6px rgba(245, 87, 108, 0.4)', // 🔥 REDUCIDO
                      minWidth: isMobile ? '16px' : '18px', // 🔥 REDUCIDO
                      height: isMobile ? '16px' : '18px', // 🔥 REDUCIDO
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </Badge>
                )}
              </div>
            )}

            {/* 🔥 DROPDOWN DE USUARIO COMPACTO */}
            <NavDropdown
              align="end"
              title={
                auth.user ? (
                  <div
                    style={{
                      width: isMobile ? '34px' : '38px', // 🔥 REDUCIDO
                      height: isMobile ? '34px' : '38px', // 🔥 REDUCIDO
                      borderRadius: '8px',
                      padding: '1px', // 🔥 REDUCIDO
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 3px 10px rgba(102, 126, 234, 0.25)', // 🔥 REDUCIDO
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                  >
                    <Avatar
                      src={auth.user.avatar}
                      size="medium-avatar"
                      style={{
                        borderRadius: '6px', // 🔥 REDUCIDO
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                    {/* Indicador de estado en línea */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-1px', // 🔥 REDUCIDO
                        right: '-1px', // 🔥 REDUCIDO
                        width: '10px', // 🔥 REDUCIDO
                        height: '10px', // 🔥 REDUCIDO
                        backgroundColor: '#28a745',
                        border: '1px solid white', // 🔥 REDUCIDO
                        borderRadius: '50%'
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: isMobile ? '34px' : '38px', // 🔥 REDUCIDO
                      height: isMobile ? '34px' : '38px', // 🔥 REDUCIDO
                      borderRadius: '8px',
                      backgroundColor: settings.style ? 'rgba(255,255,255,0.1)' : 'rgba(102, 126, 234, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FaUserCircle size={isMobile ? 18 : 22} style={{ color: '#667eea' }} /> {/* 🔥 REDUCIDO */}
                  </div>
                )
              }
              id="nav-user-dropdown"
              className="custom-dropdown"
              ref={userDropdownRef}
            >
              <div className="dropdown-scroll-wrapper">
                {auth.user ? (
                  <>
                    {/* Header del usuario COMPACTO */}
                    <div className="user-header">
                      <div className="d-flex align-items-center gap-2"> {/* 🔥 REDUCIDO */}
                        <div className="user-avatar-wrapper">
                          <Avatar src={auth.user.avatar} size="medium-avatar" />
                          <div className="online-indicator"></div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-bold text-white user-name">
                            {auth.user.username}
                          </div>
                          <div className="user-email" style={{
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: '0.75rem', // 🔥 REDUCIDO
                            marginBottom: '2px' // 🔥 REDUCIDO
                          }}>
                            {auth.user.email}
                          </div>
                          <div className="user-role-badge">
                            {userRole === 'admin' ? `👑 ${t('admin')}` :
                              userRole === 'Moderateur' ? `🛡️ ${t('moderator')}` :
                                userRole === 'Super-utilisateur' ? `⭐ ${t('superUser')}` :
                                  `👤 ${t('user')}`}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SELECTOR DE IDIOMA INTEGRADO */}
                    <LanguageSelectorandroid isMobile={isMobile} inDropdown={true} />

                    {/* SECCIÓN DE ACCIONES RÁPIDAS COMPACTA */}
                    <div style={{
                      padding: '6px 10px', // 🔥 REDUCIDO
                      borderBottom: `1px solid ${settings.style ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                    }}>
                      <div style={{
                        fontSize: '0.7rem', // 🔥 REDUCIDO
                        fontWeight: '600',
                        color: settings.style ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                        marginBottom: '4px', // 🔥 REDUCIDO
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px' // 🔥 REDUCIDO
                      }}>
                        Acciones Rápidas
                      </div>
                      <div className="d-flex gap-1"> {/* 🔥 REDUCIDO */}
                        <Link
                          to="/Map"
                          className="btn btn-sm"
                          style={{
                            flex: 1,
                            background: 'linear-gradient(135deg, #ea4335 0%, #d33426 100%)',
                            border: 'none',
                            color: 'white',
                            fontSize: '0.7rem', // 🔥 REDUCIDO
                            padding: '4px 6px', // 🔥 REDUCIDO
                            borderRadius: '4px', // 🔥 REDUCIDO
                            textDecoration: 'none',
                            textAlign: 'center'
                          }}
                        >
                          <FaMapMarkerAlt size={10} className="me-1" />
                          Mapa
                        </Link>
                        <Link
                          to="/search"
                          className="btn btn-sm"
                          style={{
                            flex: 1,
                            background: 'linear-gradient(135deg, #667eea 0%, #5a6fd8 100%)',
                            border: 'none',
                            color: 'white',
                            fontSize: '0.7rem', // 🔥 REDUCIDO
                            padding: '4px 6px', // 🔥 REDUCIDO
                            borderRadius: '4px', // 🔥 REDUCIDO
                            textDecoration: 'none',
                            textAlign: 'center'
                          }}
                        >
                          <FaSearch size={10} className="me-1" />
                          Buscar
                        </Link>
                      </div>
                    </div>

                    {/* TODOS LOS LINKS ORIGINALES SE MANTIENEN (ya compactos por el MenuItem) */}
                    <MenuItem
                      icon={FaUserCircle}
                      iconColor="#667eea"
                      to={`/profile/${auth.user._id}`}
                      description="Ver y editar tu perfil"
                    >
                      {t('profile')}
                    </MenuItem>

                    <MenuItem
                      icon={FaInfoCircle}
                      iconColor="#6c757d"
                      to="/infoaplicacionn"
                      description="Información sobre la aplicación"
                    >
                      {t('appInfo')}
                    </MenuItem>
                    <MenuItem
                      icon={FaInfoCircle}
                      iconColor="#6c757d"
                      to="/message"

                    >
                      conversation
                    </MenuItem>

                    <MenuItem
                      icon={FaTools}
                      iconColor="#6c757d"
                      to="/users/roles"
                      description="Gestionar roles de usuario"
                    >
                      {t('roles')}
                    </MenuItem>
                    <MenuItem
                      icon={FaInfoCircle}
                      iconColor="#6c757d"
                      to="/infoaplicacionn3"
                      description="Más información"
                    >
                      {t('appInfo3')}
                    </MenuItem>

                    <MenuItem
                      icon={FaShareAlt}
                      iconColor="#ffc107"
                      onClick={() => setShowShareModal(true)}
                      description="Compartir esta aplicación"
                    >
                      {t('shareApp')}
                    </MenuItem>


                    {userRole === "admin" && (
                      <>
                        <NavDropdown.Divider />
                        <div className="admin-panel-header">
                          <FaShieldAlt className="me-2" size={14} />
                          {t('adminPanel')}
                          <Badge bg="warning" text="dark" className="ms-1" style={{ fontSize: '0.65rem' }}>
                            Admin
                          </Badge>
                        </div>
                        <MenuItem
                          icon={FaInfoCircle}
                          iconColor="#6c757d"
                          to="/message"

                        >
                            Conversation
                        </MenuItem>
                      

                        <MenuItem
                          icon={FaTools}
                          iconColor="#6c757d"
                          to="/users/roles"
                          description="Gestionar roles de usuario"
                        >
                          {t('roles')}
                        </MenuItem>

                        <MenuItem
                          icon={FaUsers}
                          iconColor="#28a745"
                          to="/users"
                          description="Administrar todos los usuarios"
                        >
                          {t('users')}
                        </MenuItem>

                        <MenuItem
                          icon={FaUserCog}
                          iconColor="#667eea"
                          to="/usersactionn"
                          description="Acciones y logs de usuarios"
                        >
                          {t('userActions')}
                        </MenuItem>
                      </>
                    )}

                    <NavDropdown.Divider />

                    <MenuItem
                      icon={FaSignOutAlt}
                      iconColor="#dc3545"
                      onClick={handleLogout}
                      danger
                      description="Cerrar tu sesión"
                    >
                      <span className="fw-bold">{t('logout')}</span>
                    </MenuItem>
                  </>
                ) : (
                  <>

                    <div className="user-header">
                      <div className="d-flex align-items-center gap-2">
                        <div className="user-avatar-wrapper">
                          <FaUserCircle size={32} style={{ color: 'white' }} />
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-bold text-white">
                            Invitado
                          </div>
                          <div style={{
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: '0.75rem' // 🔥 REDUCIDO
                          }}>
                            Inicia sesión para más funciones
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SELECTOR DE IDIOMA TAMBIÉN PARA NO AUTENTICADOS */}
                    <LanguageSelectorandroid isMobile={isMobile} inDropdown={true} />

                    <MenuItem
                      icon={FaSignInAlt}
                      iconColor="#28a745"
                      to="/login"
                      description="Accede a tu cuenta"
                    >
                      {t('login')}
                    </MenuItem>

                    <MenuItem
                      icon={FaUserPlus}
                      iconColor="#667eea"
                      to="/register"
                      description="Crear nueva cuenta"
                    >
                      {t('register')}
                    </MenuItem>

                    <NavDropdown.Divider />

                    <MenuItem
                      icon={FaMapMarkerAlt}
                      iconColor="#ea4335"
                      to="/map"
                      description="Explora ubicaciones"
                    >
                      {t('mapLocation') || "Mapa"}
                    </MenuItem>

                    <MenuItem
                      icon={FaInfoCircle}
                      iconColor="#6c757d"
                      to="/infoaplicacionn"
                      description="Conoce la aplicación"
                    >
                      {t('appInfo')}
                    </MenuItem>

                    <MenuItem
                      icon={FaShareAlt}
                      iconColor="#ffc107"
                      onClick={() => setShowShareModal(true)}
                      description="Compartir con amigos"
                    >
                      {t('shareApp')}
                    </MenuItem>
                  </>
                )}
              </div>
            </NavDropdown>
          </div>
        </Container>
      </Navbar>

      {/* 🔥 ESPACIO COMPACTO PARA COMPENSAR EL NAVBAR FIJO */}
      <div style={{
        height: isMobile ? '48px' : '56px', // 🔥 REDUCIDO
        minHeight: isMobile ? '48px' : '56px' // 🔥 REDUCIDO
      }} />

      {/* Estilos optimizados COMPACTOS */}
      <style>{`
        /* Animación PWA */
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); } /* 🔥 REDUCIDO */
        }
        
        /* Iconos interactivos */
        .icon-button {
          cursor: pointer;
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .icon-button:hover,
        .icon-button:active {
          transform: translateY(-1px); /* 🔥 REDUCIDO */
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25) !important; /* 🔥 REDUCIDO */
        }

        /* Items del menú COMPACTOS */
        .custom-menu-item {
          color: ${settings.style ? '#ffffff' : '#333333'} !important;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          border: none !important;
        }

        .custom-menu-item:hover,
        .custom-menu-item:active,
        .custom-menu-item:focus {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%) !important;
          transform: translateX(3px); /* 🔥 REDUCIDO */
          color: ${settings.style ? '#ffffff' : '#333333'} !important;
        }

        .custom-menu-item.text-danger:hover,
        .custom-menu-item.text-danger:active {
          background: linear-gradient(135deg, rgba(220, 53, 69, 0.15) 0%, rgba(245, 87, 108, 0.15) 100%) !important;
        }

        /* Dropdown scroll */
        .dropdown-scroll-wrapper {
          max-height: 70vh; /* 🔥 REDUCIDO */
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0;
          width: 100%;
          -webkit-overflow-scrolling: touch;
        }

        .dropdown-scroll-wrapper::-webkit-scrollbar {
          width: 3px; /* 🔥 REDUCIDO */
        }

        .dropdown-scroll-wrapper::-webkit-scrollbar-track {
          background: ${settings.style ? 'rgba(255,255,255,0.05)' : '#f1f1f1'};
          border-radius: 8px; /* 🔥 REDUCIDO */
        }

        .dropdown-scroll-wrapper::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px; /* 🔥 REDUCIDO */
        }

        /* Header del usuario COMPACTO */
        .user-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 16px; /* 🔥 REDUCIDO */
          margin: 0;
          border-radius: 0;
        }

        .user-avatar-wrapper {
          width: 50px; /* 🔥 REDUCIDO */
          height: 50px; /* 🔥 REDUCIDO */
          border-radius: 50%;
          border: 2px solid white; /* 🔥 REDUCIDO */
          padding: 2px;
          background: white;
          flex-shrink: 0;
          position: relative;
        }

        .online-indicator {
          position: absolute;
          bottom: 3px; /* 🔥 REDUCIDO */
          right: 3px; /* 🔥 REDUCIDO */
          width: 12px; /* 🔥 REDUCIDO */
          height: 12px; /* 🔥 REDUCIDO */
          background-color: #28a745;
          border: 2px solid white;
          border-radius: 50%;
        }

        .user-name {
          font-size: 1rem; /* 🔥 REDUCIDO */
          word-break: break-word;
        }

        .user-role-badge {
          font-size: 0.7rem; /* 🔥 REDUCIDO */
          background-color: rgba(255,255,255,0.2);
          padding: 3px 10px; /* 🔥 REDUCIDO */
          border-radius: 16px; /* 🔥 REDUCIDO */
          display: inline-block;
          margin-top: 2px; /* 🔥 REDUCIDO */
          color: white;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        /* Admin panel header COMPACTO */
        .admin-panel-header {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
          padding: 10px 14px; /* 🔥 REDUCIDO */
          margin: 0;
          border-radius: 0;
          color: white;
          font-weight: 700;
          font-size: 0.85rem; /* 🔥 REDUCIDO */
          display: flex;
          align-items: center;
          box-shadow: 0 1px 6px rgba(255, 107, 107, 0.3); /* 🔥 REDUCIDO */
        }

        /* Dropdown posicionamiento COMPACTO */
        #nav-user-dropdown + .dropdown-menu {
          position: absolute !important;
          right: 0 !important;
          left: auto !important;
          top: 100% !important;
          margin-top: 6px !important; /* 🔥 REDUCIDO */
          width: 300px !important; /* 🔥 REDUCIDO */
          min-width: 300px !important; /* 🔥 REDUCIDO */
          max-width: 300px !important; /* 🔥 REDUCIDO */
          transform: none !important;
          border: none !important;
          border-radius: 14px !important; /* 🔥 REDUCIDO */
          box-shadow: 0 15px 30px rgba(0,0,0,0.15) !important; /* 🔥 REDUCIDO */
          background: ${settings.style ? '#2d3748' : '#ffffff'} !important;
          padding: 0 !important;
          overflow: hidden !important;
          backdrop-filter: blur(10px);
        }

        /* Divider */
        .dropdown-divider {
          border-color: ${settings.style ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} !important;
          margin: 0 !important;
        }

        /* Optimización para móviles COMPACTA */
        @media (max-width: 700px) {
          #nav-user-dropdown + .dropdown-menu {
            right: 6px !important; /* 🔥 REDUCIDO */
            width: 280px !important; /* 🔥 REDUCIDO */
            min-width: 280px !important; /* 🔥 REDUCIDO */
            max-width: 280px !important; /* 🔥 REDUCIDO */
          }

          .user-header {
            padding: 12px; /* 🔥 REDUCIDO */
          }

          .user-avatar-wrapper {
            width: 42px; /* 🔥 REDUCIDO */
            height: 42px; /* 🔥 REDUCIDO */
          }

          .user-name {
            font-size: 0.9rem; /* 🔥 REDUCIDO */
          }

          .user-email {
            font-size: 0.7rem !important; /* 🔥 REDUCIDO */
          }

          .user-role-badge {
            font-size: 0.65rem; /* 🔥 REDUCIDO */
            padding: 2px 8px; /* 🔥 REDUCIDO */
          }

          .custom-menu-item {
            padding: 8px 12px !important; /* 🔥 REDUCIDO */
            margin: 2px 6px !important; /* 🔥 REDUCIDO */
            width: calc(100% - 12px) !important; /* 🔥 REDUCIDO */
          }

          .admin-panel-header {
            padding: 8px 12px; /* 🔥 REDUCIDO */
            font-size: 0.8rem; /* 🔥 REDUCIDO */
          }
        }

        /* Fix para touch en móviles */
        @media (hover: none) and (pointer: coarse) {
          .icon-button:hover {
            transform: none;
          }

          .icon-button:active {
            transform: scale(0.95);
            opacity: 0.8;
          }

          .custom-menu-item:hover {
            transform: none;
          }

          .custom-menu-item:active {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%) !important;
            transform: scale(0.98);
          }
        }

        /* Prevenir zoom en doble tap */
        * {
          touch-action: manipulation;
        }

        /* Mejoras de accesibilidad */
        .custom-menu-item:focus {
          outline: 2px solid #667eea;
          outline-offset: -2px;
        }
      `}</style>

      {/* Modales */}
      <VerifyModal
        show={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
      />

      <DesactivateModal
        show={showDeactivatedModal}
        onClose={() => setShowDeactivatedModal(false)}
      />

      <MultiCheckboxModal
        show={showFeaturesModal}
        onClose={() => setShowFeaturesModal(false)}
      />

      <ShareAppModal
        show={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </>
  );
};

export default Navbar2;