import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '../Avatar';
import Card from 'react-bootstrap/Card';
import {
  FaPlus,
  FaHome,
  FaUserCircle,
  FaSignInAlt,
  FaUserPlus,
  FaBell,
  FaInfoCircle,
  FaFacebookMessenger,
  FaDownload,
  FaRocket,
  FaUserCog, // ✅ NUEVO ICONO PARA ROLES
  FaUsers    // ✅ ICONO ALTERNATIVO PARA ROLES
} from 'react-icons/fa';
import { Navbar, Container, NavDropdown, Badge, Alert } from 'react-bootstrap';
import LanguageSelectorpc from '../LanguageSelectorpc';

const Navbar2 = () => {
  const { auth, cart, notify, settings } = useSelector((state) => state);
  const history = useHistory();
  const { languageReducer } = useSelector(state => state);
  const { t, i18n } = useTranslation('navbar2');
  const lang = languageReducer.language || 'es';
  
  const [userRole, setUserRole] = useState(auth.user?.role);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  
  // ✅ Estados para instalación PWA
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [showInstallAlert, setShowInstallAlert] = useState(false);
  const [installAlertMessage, setInstallAlertMessage] = useState('');

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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Effect para capturar el evento de instalación PWA
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
      console.log('PWA: beforeinstallprompt event captured');
    };

    const handleAppInstalled = () => {
      console.log('PWA: App installed successfully');
      setDeferredPrompt(null);
      setCanInstall(false);
      showInstallMessage(t('pwa_install_success') || '¡App instalada correctamente!', 'success');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [t]);

  // ✅ Función para mostrar mensajes de instalación
  const showInstallMessage = (message, variant = 'info') => {
    setInstallAlertMessage(message);
    setShowInstallAlert(true);
    setTimeout(() => {
      setShowInstallAlert(false);
    }, 4000);
  };

  // ✅ Función principal para instalar PWA
  const handleInstallPWA = async () => {
    if (!deferredPrompt) {
      showInstallMessage(
        t('pwa_not_supported') || 'Tu navegador no soporta instalación de apps', 
        'warning'
      );
      return;
    }

    if (isInstalling) return;

    setIsInstalling(true);

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA: User accepted the install prompt');
        showInstallMessage(
          t('pwa_install_started') || 'Instalación iniciada...', 
          'success'
        );
      } else {
        console.log('PWA: User dismissed the install prompt');
        showInstallMessage(
          t('pwa_install_declined') || 'Instalación cancelada', 
          'info'
        );
      }
      
      setDeferredPrompt(null);
      setCanInstall(false);
      
    } catch (error) {
      console.error('PWA: Error during installation:', error);
      showInstallMessage(
        t('pwa_install_error') || 'Error durante la instalación', 
        'danger'
      );
    } finally {
      setIsInstalling(false);
    }
  };

  // ✅ Verificar si ya está instalado
  const isAppInstalled = () => {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone ||
           document.referrer.includes('android-app://');
  };

  // ✅ Función para navegar a gestión de roles (solo admin)
  const handleRolesManagement = () => {
    history.push('/admin/roles');
  };

  if (!settings) {
    return (
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand">{t('loading')}</span>
      </nav>
    );
  }

  const handleCreatePost = () => {
    history.push('/createpost');
  };

  const unreadNotifications = notify.data.filter(n => !n.isRead).length;
  const unreadMessages = 0;

  // MenuItem simplificado
  const MenuItem = ({ icon: Icon, iconColor, to, onClick, children }) => (
    <NavDropdown.Item
      as={to ? Link : 'button'}
      to={to}
      onClick={onClick}
      className="custom-menu-item"
      style={{
        padding: '12px 20px',
        transition: 'all 0.2s ease',
        borderRadius: '8px',
        margin: '2px 8px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500',
        direction: lang === 'ar' ? 'rtl' : 'ltr',
        textAlign: lang === 'ar' ? 'right' : 'left'
      }}
    >
      <Icon className={lang === 'ar' ? "ms-3" : "me-3"} style={{ color: iconColor, fontSize: '1.1rem' }} />
      <span>{children}</span>
    </NavDropdown.Item>
  );

  return (
    <div>
      {/* ✅ Alert para mensajes de instalación */}
      {showInstallAlert && (
        <Alert 
          variant={installAlertMessage.includes('éxito') || installAlertMessage.includes('correctamente') ? 'success' : 
                  installAlertMessage.includes('Error') ? 'danger' : 'info'}
          className="mb-0 text-center py-2"
          style={{
            position: 'fixed',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            minWidth: '300px',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          {installAlertMessage}
        </Alert>
      )}

      <Navbar
        expand="lg"
        style={{
          zIndex: 1030,
          marginTop: isMobile ? '55px' : '0',
          background: settings.style
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
          padding: isMobile ? '8px 0' : '12px 0',
          boxShadow: '0 4px 25px rgba(0,0,0,0.1)',
          borderBottom: settings.style 
            ? '1px solid rgba(255,255,255,0.1)' 
            : '1px solid rgba(226, 232, 240, 0.8)'
        }}
        className={settings.style ? "navbar-dark" : "navbar-light"}
      >
        <Container fluid className="align-items-center justify-content-between">
          {/* Logo y título - NUEVO DISEÑO */}
          <div className="d-flex align-items-center">
            <Link
              to="/"
              className="btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '42px' : '50px',
                height: isMobile ? '42px' : '50px',
                marginLeft: lang === 'ar' ? '0' : '8px',
                marginRight: lang === 'ar' ? '8px' : (isMobile ? '8px' : '12px'),
                padding: '0',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                border: 'none',
                borderRadius: '14px',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 20px rgba(139, 92, 246, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(139, 92, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.3)';
              }}
            >
              <FaHome size={isMobile ? 20 : 22} style={{ color: 'white' }} />
            </Link>

            <Navbar.Brand href="/" className="py-2 d-none d-lg-block mb-0">
              <Card.Title
                className="mb-0"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '800',
                  fontSize: '1.6rem',
                  letterSpacing: '-0.5px'
                }}
              >
                {t('appName')}
              </Card.Title>
            </Navbar.Brand>
          </div>

          {/* Iconos de navegación - NUEVO DISEÑO */}
          <div className="d-flex align-items-center" style={{ gap: isMobile ? '10px' : '18px' }}>
            {/* Selector de idioma para desktop */}
            <div className="d-none d-lg-block">
              <LanguageSelectorpc />
            </div>

            {/* ✅ Botón Instalar App PWA */}
            {canInstall && !isAppInstalled() && (
              <div
                onClick={handleInstallPWA}
                className="d-flex align-items-center justify-content-center icon-button"
                style={{
                  cursor: isInstalling ? 'not-allowed' : 'pointer',
                  width: isMobile ? '38px' : '42px',
                  height: isMobile ? '38px' : '42px',
                  borderRadius: '14px',
                  background: isInstalling 
                    ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 18px rgba(16, 185, 129, 0.3)',
                  opacity: isInstalling ? 0.7 : 1
                }}
                title={isInstalling 
                  ? (t('pwa_installing') || 'Instalando...') 
                  : (t('install_app') || 'Instalar App')
                }
              >
                {isInstalling ? (
                  <div className="spinner-border spinner-border-sm" style={{ color: 'white' }} />
                ) : (
                  <FaDownload
                    size={isMobile ? 16 : 18}
                    style={{ color: 'white' }}
                  />
                )}
              </div>
            )}

            {/* ✅ Botón Gestión de Roles (SOLO para admin) */}
            {auth.user && userRole === "admin" && (
              <div
                onClick={handleRolesManagement}
                className="d-flex align-items-center justify-content-center icon-button"
                style={{
                  cursor: 'pointer',
                  width: isMobile ? '38px' : '42px',
                  height: isMobile ? '38px' : '42px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 18px rgba(249, 115, 22, 0.3)'
                }}
                title={t('manage_roles') || 'Gestión de Roles'}
              >
                <FaUserCog
                  size={isMobile ? 16 : 18}
                  style={{ color: 'white' }}
                />
              </div>
            )}

            {/* Botón Agregar Post (solo para usuarios autenticados con rol especial) */}
            {auth.user && (userRole === "Super-utilisateur" || userRole === "admin") && (
              <div
                onClick={handleCreatePost}
                className="d-flex align-items-center justify-content-center icon-button"
                style={{
                  cursor: 'pointer',
                  width: isMobile ? '38px' : '42px',
                  height: isMobile ? '38px' : '42px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 18px rgba(139, 92, 246, 0.3)'
                }}
                title={t('addPost')}
              >
                <FaPlus
                  size={isMobile ? 16 : 18}
                  style={{ color: 'white' }}
                />
              </div>
            )}

            {/* Messenger (solo usuarios autenticados) */}
            {auth.user && (
              <Link
                to="/message"
                className="position-relative d-flex align-items-center justify-content-center icon-button text-decoration-none"
                style={{
                  width: isMobile ? '38px' : '42px',
                  height: isMobile ? '38px' : '42px',
                  borderRadius: '14px',
                  backgroundColor: settings.style ? 'rgba(255,255,255,0.08)' : 'rgba(139, 92, 246, 0.08)',
                  border: settings.style ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(139, 92, 246, 0.1)',
                  transition: 'all 0.3s ease',
                }}
                title={t('messages')}
              >
                <FaFacebookMessenger
                  size={isMobile ? 18 : 20}
                  style={{ 
                    color: unreadMessages > 0 ? '#06b6d4' : 
                           settings.style ? '#cbd5e1' : '#64748b'
                  }}
                />
                {unreadMessages > 0 && (
                  <Badge
                    pill
                    style={{
                      fontSize: '0.6rem',
                      position: 'absolute',
                      top: '-4px',
                      [lang === 'ar' ? 'left' : 'right']: '-4px',
                      padding: '3px 6px',
                      background: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
                      border: '2px solid' + (settings.style ? '#1e293b' : '#ffffff'),
                      boxShadow: '0 3px 10px rgba(6, 182, 212, 0.4)'
                    }}
                  >
                    {unreadMessages > 9 ? '9+' : unreadMessages}
                  </Badge>
                )}
              </Link>
            )}

            {/* Notificaciones (solo usuarios autenticados) */}
            {auth.user && (
              <Link
                to="/notify"
                className="position-relative d-flex align-items-center justify-content-center icon-button text-decoration-none"
                style={{
                  width: isMobile ? '38px' : '42px',
                  height: isMobile ? '38px' : '42px',
                  borderRadius: '14px',
                  backgroundColor: settings.style ? 'rgba(255,255,255,0.08)' : 'rgba(239, 68, 68, 0.08)',
                  border: settings.style ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(239, 68, 68, 0.1)',
                  transition: 'all 0.3s ease',
                }}
                title={t('notifications')}
              >
                <FaBell
                  size={isMobile ? 18 : 20}
                  style={{ 
                    color: unreadNotifications > 0 ? '#ef4444' : 
                           settings.style ? '#cbd5e1' : '#64748b'
                  }}
                />
                {unreadNotifications > 0 && (
                  <Badge
                    pill
                    style={{
                      fontSize: '0.6rem',
                      position: 'absolute',
                      top: '-4px',
                      [lang === 'ar' ? 'left' : 'right']: '-4px',
                      padding: '3px 6px',
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      border: '2px solid' + (settings.style ? '#1e293b' : '#ffffff'),
                      boxShadow: '0 3px 10px rgba(239, 68, 68, 0.4)'
                    }}
                  >
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </Badge>
                )}
              </Link>
            )}

            {/* Avatar o Dropdown según autenticación */}
            {auth.user ? (
              <Link
                to="/profileinfouser"
                className="text-decoration-none"
                title={t('profile')}
              >
                <div
                  className="dropdown-avatar icon-button"
                  style={{
                    width: isMobile ? '38px' : '42px',
                    height: isMobile ? '38px' : '42px',
                    borderRadius: '14px',
                    padding: '2px',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                    boxShadow: '0 6px 20px rgba(139, 92, 246, 0.3)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: settings.style ? '#1e293b' : '#ffffff'
                    }}
                  >
                    <Avatar
                      src={auth.user.avatar}
                      size="medium-avatar"
                      style={{
                        borderRadius: '12px',
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  </div>
                </div>
              </Link>
            ) : (
              <NavDropdown
                align="end"
                title={
                  <div
                    style={{
                      width: isMobile ? '38px' : '42px',
                      height: isMobile ? '38px' : '42px',
                      borderRadius: '14px',
                      backgroundColor: settings.style ? 'rgba(255,255,255,0.08)' : 'rgba(139, 92, 246, 0.08)',
                      border: settings.style ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(139, 92, 246, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    className="icon-button"
                  >
                    <FaUserCircle 
                      size={isMobile ? 20 : 22} 
                      style={{ 
                        color: settings.style ? '#cbd5e1' : '#8b5cf6'
                      }} 
                    />
                  </div>
                }
                id="nav-guest-dropdown"
                className="custom-dropdown"
              >
                <MenuItem icon={FaSignInAlt} iconColor="#10b981" to="/login">
                  {t('login')}
                </MenuItem>
                <MenuItem icon={FaUserPlus} iconColor="#8b5cf6" to="/register">
                  {t('register')}
                </MenuItem>
                <NavDropdown.Divider style={{ margin: '8px 16px' }} />
                <MenuItem icon={FaInfoCircle} iconColor="#64748b" to="/infoaplicacionn">
                  {t('appInfo')}
                </MenuItem>
              </NavDropdown>
            )}
          </div>
        </Container>
      </Navbar>

      {/* CSS personalizado */}
      <style jsx>{`
        .icon-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 12px 25px rgba(139, 92, 246, 0.2) !important;
        }

        .custom-menu-item:hover {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%) !important;
          transform: translateX(5px);
          border-left: 3px solid #8b5cf6;
        }

        .dropdown-menu {
          border: none !important;
          box-shadow: 0 15px 50px rgba(0,0,0,0.15) !important;
          border-radius: 18px !important;
          backdrop-filter: blur(10px);
          background: rgba(255,255,255,0.95) !important;
        }
      `}</style>
    </div>
  );
};

export default Navbar2;