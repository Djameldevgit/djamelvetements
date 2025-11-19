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
  FaCheckCircle,
  FaDownload
} from 'react-icons/fa';

import { Navbar, Container, NavDropdown, Badge } from 'react-bootstrap';

import LanguageSelectorpc from '../LanguageSelectorpc';
 
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

  // 🔥 ESTADOS PWA OPTIMIZADOS
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(false);

  // 🔥 DETECCIÓN RÁPIDA DE PWA
 
  useEffect(() => {
    // Verificar si ya está instalada al cargar
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPWAInstalled(true);
    }

    // Escuchar el evento personalizado de que la PWA se puede instalar
    const handleInstallAvailable = () => {
      setShowInstallButton(true);
    };

    // Escuchar cuando se instala la PWA
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

  


  // 🔥 FORZAR MOSTRAR BOTÓN EN DESARROLLO (para testing)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => {
        if (!showInstallButton && !isPWAInstalled) {
          console.log('🧪 PWA: Development mode - showing install button');
          setShowInstallButton(true);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showInstallButton, isPWAInstalled]);

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

 
  // 🔥 DETECCIÓN PWA MEJORADA
  useEffect(() => {
    // Verificar si ya está instalada
    const checkPWAInstallation = () => {
      const isInstalled = 
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone ||
        localStorage.getItem('pwaInstalled') === 'true';
      
      setIsPWAInstalled(isInstalled);
      return isInstalled;
    };
  
    // Verificar al cargar
    const installed = checkPWAInstallation();
    
    if (!installed) {
      // Escuchar eventos de instalación PWA
      const handleInstallAvailable = () => {
        console.log('🎯 Mostrar botón de instalación');
        setShowInstallButton(true);
      };
  
      const handleInstalled = () => {
        console.log('🎉 PWA instalada, ocultar botón');
        setIsPWAInstalled(true);
        setShowInstallButton(false);
      };
  
      window.addEventListener('pwaInstallAvailable', handleInstallAvailable);
      window.addEventListener('pwaInstalled', handleInstalled);
  
      // Verificar periodicamente (fallback)
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
  
  // 🔥 MANEJADOR DE INSTALACIÓN MEJORADO
  const handleInstallPWA = async () => {
    try {
      if (window.installPWA) {
        const installed = await window.installPWA();
        if (installed) {
          setShowInstallButton(false);
          setIsPWAInstalled(true);
        }
      } else {
        console.error('❌ Función installPWA no disponible');
        // Fallback: abrir en nueva pestaña con instrucciones
        window.open('/?install-pwa=true', '_blank');
      }
    } catch (error) {
      console.error('❌ Error instalando PWA:', error);
    }
  };

  // Verificaciones de settings
  if (!settings) {
    return (
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand">{t('loading')}</span>
      </nav>
    );
  }

  const totalItems = (cart?.items && Array.isArray(cart.items))
    ? cart.items.reduce((acc, item) => acc + (item?.quantity || 0), 0)
    : 0;

  if (!settings || Object.keys(settings).length === 0) {
    return (
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand">{t('loadingSettings')}</span>
      </nav>
    );
  }

  const unreadNotifications = notify.data.filter(n => !n.isRead).length;

  // Función helper para items del menú
  const MenuItem = ({ icon: Icon, iconColor, to, onClick, children, danger = false }) => (
    <NavDropdown.Item
      as={to ? Link : 'button'}
      to={to}
      onClick={onClick}
      className={`custom-menu-item ${danger ? 'text-danger' : ''}`}
      style={{
        padding: '12px 20px',
        transition: 'all 0.2s ease',
        borderRadius: '8px',
        margin: '2px 8px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500'
      }}
    >
      <Icon className="me-3" style={{ color: iconColor, fontSize: '1.1rem' }} />
      <span>{children}</span>
    </NavDropdown.Item>
  );

  return (
    <div>
      <Navbar
        expand="lg"
        style={{
          zIndex: 1030,
          marginTop: isMobile ? '55px' : '0',
          background: settings.style
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          padding: isMobile ? '4px 0' : '2px 0',
          boxShadow: '0 2px 20px rgba(0,0,0,0.08)'
        }}
        className={settings.style ? "navbar-dark" : "navbar-light"}
      >
        <Container fluid className="align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Link
              to="/"
              className="btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '40px' : '55px',
                height: isMobile ? '40px' : '55px',
                marginLeft: '8px',
                padding: isMobile ? '2px' : '0',
                marginRight: isMobile ? '6px' : '12px',
                background: 'transparent',
                border: 'none',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                overflow: 'hidden'
              }}
            >
              <img
                src="/images/logo.png"
                alt="Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Link>

            <Navbar.Brand href="/" className="py-2 d-none d-lg-block mb-0">
              <Card.Title
                className="mb-0"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  letterSpacing: '0.5px'
                }}
              >
                {t('appName')}
              </Card.Title>
            </Navbar.Brand>
          </div>

          <div className="d-flex align-items-center" style={{ gap: isMobile ? '12px' : '16px' }}>
            {/* Selector de idioma para desktop */}
            <div className="d-none d-lg-block">
              <LanguageSelectorpc />
            </div>

            {/* Búsqueda */}
            <Link
              to="/search"
              className="text-decoration-none d-flex align-items-center justify-content-center icon-button"
              style={{
                width: isMobile ? '40px' : '45px',
                height: isMobile ? '40px' : '45px',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                backgroundColor: settings.style ? 'rgba(255,255,255,0.1)' : 'rgba(102, 126, 234, 0.1)'
              }}
            >
              <FaSearch
                size={isMobile ? 18 : 20}
                style={{ color: '#667eea' }}
                title={t('search')}
              />
            </Link>

            {/* 🔥 BOTÓN INSTALAR PWA MEJORADO */}
            {showInstallButton && !isPWAInstalled && (
  <button
    className="d-flex align-items-center justify-content-center icon-button text-decoration-none"
    onClick={handleInstallPWA}
    style={{
      width: isMobile ? '40px' : '45px',
      height: isMobile ? '40px' : '45px',
      borderRadius: '12px',
      backgroundColor: settings.style ? 'rgba(255,255,255,0.1)' : 'rgba(40, 167, 69, 0.1)',
      border: '2px solid #28a745',
      transition: 'all 0.3s ease',
      animation: 'pulse 2s infinite'
    }}
    title={t('installPWA')}
  >
    <FaDownload
      size={isMobile ? 18 : 20}
      style={{ color: '#28a745' }}
    />
  </button>
)}
            {/* 🔥 INDICADOR PWA INSTALADA */}
            {isPWAInstalled && (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: isMobile ? '40px' : '45px',
                  height: isMobile ? '40px' : '45px',
                }}
                title={t('appInstalled')}
              >
                <FaCheckCircle
                  size={isMobile ? 18 : 20}
                  style={{ color: '#28a745' }}
                />
              </div>
            )}

            {/* Botón Agregar Post */}
            {(userRole === "Super-utilisateur" || userRole === "admin") && (
              <Link
                to="/createpost"
                className="d-flex align-items-center justify-content-center icon-button text-decoration-none"
                style={{
                  width: isMobile ? '38px' : '42px',
                  height: isMobile ? '38px' : '42px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  flexShrink: 0
                }}
                title={t('addPost')}
              >
                <FaPlus
                  size={isMobile ? 16 : 18}
                  style={{ color: 'white' }}
                />
              </Link>
            )}

            {/* Notificaciones */}
            {auth.user && (
              <div
                className="position-relative d-flex align-items-center justify-content-center icon-button"
                ref={notifyDropdownRef}
                style={{
                  width: isMobile ? '40px' : '45px',
                  height: isMobile ? '40px' : '45px',
                  borderRadius: '12px',
                  backgroundColor: settings.style ? 'rgba(255,255,255,0.1)' : 'rgba(102, 126, 234, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                <Link to={'/notify'}>
                  <FaBell
                    size={isMobile ? 20 : 22}
                    style={{ color: unreadNotifications > 0 ? '#f5576c' : '#667eea' }}
                    onClick={() => setShowNotifyDropdown(!showNotifyDropdown)}
                  />
                </Link>

                {unreadNotifications > 0 && (
                  <Badge
                    pill
                    style={{
                      fontSize: '0.65rem',
                      position: 'absolute',
                      top: '-2px',
                      right: '-2px',
                      padding: '4px 7px',
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      border: '2px solid white',
                      boxShadow: '0 2px 8px rgba(245, 87, 108, 0.4)'
                    }}
                  >
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </Badge>
                )}
              </div>
            )}

            {/* Dropdown de usuario */}
            <NavDropdown
              align="end"
              title={
                auth.user ? (
                  <div
                    className="d-flex dropdown-avatar"
                    style={{
                      width: isMobile ? '40px' : '45px',
                      height: isMobile ? '40px' : '45px',
                      borderRadius: '12px',
                      padding: '2px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                    }}
                  >
                    <Avatar
                      src={auth.user.avatar}
                      size="medium-avatar"
                      style={{
                        borderRadius: '10px',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: isMobile ? '40px' : '45px',
                      height: isMobile ? '40px' : '45px',
                      borderRadius: '12px',
                      backgroundColor: settings.style ? 'rgba(255,255,255,0.1)' : 'rgba(102, 126, 234, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FaUserCircle size={isMobile ? 24 : 28} style={{ color: '#667eea' }} />
                  </div>
                )
              }
              id="nav-user-dropdown"
              className="custom-dropdown"
              key={`nav-role-${userRole}`}
              style={{
                '--bs-dropdown-border-radius': '15px',
                '--bs-dropdown-box-shadow': '0 10px 40px rgba(0,0,0,0.15)'
              }}
            >
              <div
                className="dropdown-scroll-wrapper"
                style={{
                  maxHeight: '70vh',
                  overflowY: 'auto',
                  padding: '8px 0'
                }}
              >
                {auth.user ? (
                  <>
                    {/* Header del usuario */}
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        padding: '20px',
                        margin: '0 0 8px 0',
                        borderRadius: '12px 12px 0 0'
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div
                          style={{
                            width: '55px',
                            height: '55px',
                            borderRadius: '50%',
                            border: '3px solid white',
                            padding: '2px',
                            background: 'white'
                          }}
                        >
                          <Avatar src={auth.user.avatar} size="medium-avatar" />
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-bold text-white" style={{ fontSize: '1.1rem' }}>
                            {auth.user.username}
                          </div>
                          <div
                            style={{
                              fontSize: '0.85rem',
                              backgroundColor: 'rgba(255,255,255,0.2)',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              display: 'inline-block',
                              marginTop: '4px',
                              color: 'white',
                              fontWeight: '600'
                            }}
                          >
                            {userRole === 'admin' ? `👑 ${t('admin')}` :
                              userRole === 'Moderateur' ? `🛡️ ${t('moderator')}` :
                                userRole === 'Super-utilisateur' ? `⭐ ${t('superUser')}` :
                                  `👤 ${t('user')}`}
                          </div>
                        </div>
                      </div>
                    </div>

                  
                    <MenuItem icon={FaInfoCircle} iconColor="#6c757d" to="/infoaplicacionn">
                      {t('appInfo')}
                    </MenuItem>
                    <MenuItem icon={FaTools} iconColor="#6c757d" to="/users/roles">
                      {t('roles')}
                    </MenuItem>

                    <MenuItem icon={FaShareAlt} iconColor="#ffc107" onClick={() => setShowShareModal(true)}>
                      {t('shareApp')}
                    </MenuItem>
                    <MenuItem icon={FaUserCircle} iconColor="#667eea" to={`/profile/${auth.user._id}`}>
                      {t('profile')}
                    </MenuItem>

                    <NavDropdown.Divider style={{ margin: '8px 16px' }} />

                    {/* Panel de Admin */}
                    {userRole === "admin" && (
                      <>
                        <NavDropdown.Divider style={{ margin: '8px 16px' }} />

                        <div
                          style={{
                            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                            padding: '12px 20px',
                            margin: '4px 16px 8px 16px',
                            borderRadius: '10px',
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)'
                          }}
                        >
                          <FaShieldAlt className="me-2" size={18} />
                          {t('adminPanel')}
                        </div>

                        <MenuItem icon={FaTools} iconColor="#6c757d" to="/users/roles">
                          {t('roles')}
                        </MenuItem>

                        <MenuItem icon={FaUsers} iconColor="#28a745" to="/users">
                          {t('users')}
                        </MenuItem>

                        <MenuItem icon={FaUserCog} iconColor="#667eea" to="/usersactionn">
                          {t('userActions')}
                        </MenuItem>
                      </>
                    )}

                    <NavDropdown.Divider style={{ margin: '8px 16px' }} />

                    <MenuItem
                      icon={FaSignOutAlt}
                      iconColor="#dc3545"
                      onClick={handleLogout}
                      danger
                    >
                      <span className="fw-bold">{t('logout')}</span>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem icon={FaSignInAlt} iconColor="#28a745" to="/login">
                      {t('login')}
                    </MenuItem>
                    <MenuItem icon={FaUserPlus} iconColor="#667eea" to="/register">
                      {t('register')}
                    </MenuItem>
                   
                    <MenuItem icon={FaInfoCircle} iconColor="#6c757d" to="/infoaplicacionn">
                      {t('appInfo')}
                    </MenuItem>

                    <MenuItem icon={FaShareAlt} iconColor="#ffc107" onClick={() => setShowShareModal(true)}>
                      {t('shareApp')}
                    </MenuItem>
                  </>
                )}
              </div>
            </NavDropdown>
          </div>
        </Container>
      </Navbar>

      {/* 🔥 ESTILOS PARA ANIMACIÓN PWA */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .icon-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3) !important;
        }

        .custom-menu-item:hover {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%) !important;
          transform: translateX(4px);
        }

        .custom-menu-item.text-danger:hover {
          background: linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%) !important;
        }

        .dropdown-scroll-wrapper::-webkit-scrollbar {
          width: 6px;
        }

        .dropdown-scroll-wrapper::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .dropdown-scroll-wrapper::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
        }

        .dropdown-menu {
          border: none !important;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15) !important;
        }
      `}</style>

      {/* Modal de idioma */}
      {showLanguageModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          onClick={() => setShowLanguageModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ borderRadius: '15px', border: 'none' }}>
              <div
                className="modal-header"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '15px 15px 0 0'
                }}
              >
                <h5 className="modal-title fw-bold">
                  <FaGlobe className="me-2" />
                  {t('selectLanguage')}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowLanguageModal(false)}
                ></button>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default Navbar2;