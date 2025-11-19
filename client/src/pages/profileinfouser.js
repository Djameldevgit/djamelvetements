import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authAction';
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Modal, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap';
import {
  FaUserCircle, FaEnvelope, FaInfoCircle, FaComments, FaShareAlt,
  FaTools, FaShieldAlt, FaCog, FaBlog, FaUsers, FaClipboardList,
  FaUserCog, FaUserSlash, FaFlag, FaBan, FaShoppingCart, FaSignOutAlt,
  FaPlus, FaCheckCircle, FaGlobe, FaSun, FaMoon,
  FaDownload, FaMobileAlt // ✅ Iconos PWA agregados
} from 'react-icons/fa';

// Componente MenuOption
const MenuOption = ({ icon: Icon, iconColor, title, onClick, to, danger, badge }) => {
  const history = useHistory();

  const handleClick = () => {
    if (to) {
      history.push(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Card
      className="mb-3 border-0 shadow-sm"
      style={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        borderRadius: '12px',
        position: 'relative'
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      }}
    >
      <Card.Body className="d-flex align-items-center p-3">
        <div
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '10px',
            backgroundColor: danger ? 'rgba(220, 53, 69, 0.1)' : `${iconColor}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '15px'
          }}
        >
          <Icon size={22} style={{ color: danger ? '#dc3545' : iconColor }} />
        </div>
        <span className={`fw-${danger ? 'bold' : '500'}`} style={{ color: danger ? '#dc3545' : 'inherit' }}>
          {title}
        </span>
        
        {/* Badge para indicadores */}
        {badge && (
          <span
            style={{
              position: 'absolute',
              top: '10px',
              right: '15px',
              background: badge.color || '#28a745',
              color: 'white',
              borderRadius: '10px',
              padding: '2px 8px',
              fontSize: '0.7rem',
              fontWeight: 'bold'
            }}
          >
            {badge.text}
          </span>
        )}
      </Card.Body>
    </Card>
  );
};

// Componente Section
const Section = ({ title, children, gradient }) => (
  <div className="mb-4">
    {title && (
      <div
        style={{
          background: gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '12px 20px',
          borderRadius: '10px',
          color: 'white',
          fontWeight: '700',
          fontSize: '0.95rem',
          marginBottom: '15px',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
        }}
      >
        {title}
      </div>
    )}
    {children}
  </div>
);

const ProfileInfoUser = () => {
  const { auth, theme, cart, notify, settings } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { languageReducer } = useSelector(state => state);
  const { t, i18n } = useTranslation('profile');
  const lang = languageReducer.language || 'es';
  const history = useHistory();
  const notifyDropdownRef = useRef(null);

  const [userRole, setUserRole] = useState(auth.user?.role);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [showNotifyDropdown, setShowNotifyDropdown] = useState(false);

  // ✅ Estados para instalación PWA
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [showInstallAlert, setShowInstallAlert] = useState(false);
  const [installAlertMessage, setInstallAlertMessage] = useState('');
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(true);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifyDropdownRef.current && !notifyDropdownRef.current.contains(event.target)) {
        setShowNotifyDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Effect para PWA (mantenemos la funcionalidad)
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log('📱 PWA: beforeinstallprompt event captured');
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
      
      setTimeout(() => setShowInstallButton(true), 1000);
    };

    const handleAppInstalled = () => {
      console.log('✅ PWA: App installed successfully');
      setDeferredPrompt(null);
      setCanInstall(false);
      setIsAppInstalled(true);
      setShowInstallButton(false);
      showInstallMessage(
        t('pwa_install_success') || '¡App instalada correctamente! 🎉', 
        'success'
      );
    };

    const checkIfInstalled = () => {
      const isInstalled = 
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone ||
        document.referrer.includes('android-app://');
      
      console.log('🔍 PWA: Checking if installed:', isInstalled);
      setIsAppInstalled(isInstalled);
      if (isInstalled) {
        setShowInstallButton(false);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    checkIfInstalled();
    
    const interval = setInterval(checkIfInstalled, 30000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearInterval(interval);
    };
  }, [t]);

  // ✅ Función para mostrar mensajes
  const showInstallMessage = (message, variant = 'info') => {
    setInstallAlertMessage(message);
    setShowInstallAlert(true);
    
    setTimeout(() => {
      setShowInstallAlert(false);
    }, 4000);
  };

  // ✅ Función para instalar PWA
  const handleInstallPWA = async () => {
    if (!deferredPrompt) {
      showInstallMessage(
        'Para instalar la app, usa el menú de Chrome y selecciona "Agregar a pantalla de inicio"', 
        'info'
      );
      return;
    }

    if (isInstalling) return;

    setIsInstalling(true);

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        showInstallMessage('📥 Instalación iniciada...', 'success');
      } else {
        showInstallMessage('Instalación cancelada', 'info');
      }
      
      setDeferredPrompt(null);
      setCanInstall(false);
      
    } catch (error) {
      console.error('PWA: Error during installation:', error);
      showInstallMessage('Error durante la instalación', 'warning');
    } finally {
      setIsInstalling(false);
    }
  };

  const openStatusModal = () => dispatch({ type: GLOBALTYPES.STATUS, payload: true });

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleTheme = () => dispatch({ type: GLOBALTYPES.THEME, payload: !theme });

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageModal(false);
  };

  if (!settings) {
    return (
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand">{t('loading', 'Cargando...')}</span>
      </nav>
    );
  }

  const getRoleDisplay = () => {
    switch (userRole) {
      case 'admin':
        return t('adminRole', '👑 Admin');
      case 'Moderateur':
        return t('moderatorRole', '🛡️ Moderador');
      case 'Super-utilisateur':
        return t('superUserRole', '⭐ Super User');
      default:
        return t('userRole', '👤 Usuario');
    }
  };

  // ✅ Definir qué roles pueden agregar posts
  const canAddPost = userRole === "admin" || userRole === "Super-utilisateur";

  return (
    <div>
      {/* Alert para mensajes */}
      {showInstallAlert && (
        <Alert 
          variant={
            installAlertMessage.includes('éxito') || 
            installAlertMessage.includes('correctamente') ? 'success' : 
            installAlertMessage.includes('Error') ? 'warning' : 'info'
          }
          className="mb-0 text-center py-2"
          style={{
            position: 'fixed',
            top: '70px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            minWidth: '300px',
            borderRadius: '12px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            border: 'none'
          }}
        >
          {installAlertMessage}
        </Alert>
      )}

      <Container className="py-4" style={{
        direction: lang === 'ar' ? 'rtl' : 'ltr',
        textAlign: lang === 'ar' ? 'right' : 'left'
      }}>
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            {/* Header del Usuario */}
            <Card
              className="mb-4 border-0 shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '15px',
                overflow: 'hidden'
              }}
            >
              <Card.Body className="p-4">
                <div className="d-flex align-items-center gap-3">
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      border: '4px solid white',
                      padding: '3px',
                      background: 'white'
                    }} >
                    <Link to={`/profile/${auth.user?._id}`}>
                      <img
                        src={auth.user?.avatar}
                        alt="Avatar"
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }} />
                    </Link>
                  </div>
                  <div className="flex-grow-1">
                    <h3 className="text-white mb-2">{auth.user?.username}</h3>
                    <div
                      style={{
                        fontSize: '0.9rem',
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        display: 'inline-block',
                        color: 'white',
                        fontWeight: '600'
                      }}
                    >
                      {getRoleDisplay()}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Row>
              <Col lg={6}>
                {/* ✅ SECCIÓN PWA - Disponible para todos */}
                <Section title={t('pwaSection', '📱 Instalar App')}>
                  {canInstall && showInstallButton && !isAppInstalled && (
                    <MenuOption
                      icon={isInstalling ? FaMobileAlt : FaDownload}
                      iconColor={isInstalling ? "#f59e0b" : "#10b981"}
                      title={isInstalling ? 'Instalando...' : 'Instalar App'}
                      onClick={handleInstallPWA}
                      badge={isInstalling ? { text: '⏳', color: '#f59e0b' } : { text: '✨', color: '#10b981' }}
                    />
                  )}

                  {isAppInstalled && (
                    <MenuOption
                      icon={FaCheckCircle}
                      iconColor="#6b7280"
                      title="App ya instalada"
                      badge={{ text: '✅', color: '#6b7280' }}
                    />
                  )}

                  {!canInstall && !isAppInstalled && (
                    <MenuOption
                      icon={FaInfoCircle}
                      iconColor="#6c757d"
                      title="Instalar App"
                      onClick={() => showInstallMessage(
                        'Para instalar: Usa el menú de Chrome > "Agregar a pantalla de inicio"',
                        'info'
                      )}
                    />
                  )}
                </Section>

  

 
                {/* ✅ Agregar Post - SOLO para roles autorizados */}
                {canAddPost && (
                  <Section>
                    <MenuOption
                      icon={FaPlus}
                      iconColor="#667eea"
                      title={t('addPost', 'Agregar Post')}
                      onClick={openStatusModal}
                    />
                  </Section>
                )}

                {/* Menú Principal - Disponible para todos */}
                <Section title={t('mainSection', '🌐 Navegación')}>
 
                  <MenuOption
                    icon={FaInfoCircle}
                    iconColor="#6c757d"
                    title={t('appInfo', 'Información de la App')}
                    to="/appinfo2"
                  />
                  
                  {/* ✅ Opciones adicionales que podrías agregar */}
                  {auth.user && (
                    <>
 


                      <MenuOption
                        icon={FaUserCircle}
                        iconColor="#667eea"
                        title={t('myProfile', 'Mi Perfil')}
                        to={`/profile/${auth.user._id}`}
                      />
                      <MenuOption
                        icon={FaComments}
                        iconColor="#28a745"
                        title={t('messages', 'Mensajes')}
                        to="/message"
                      />
                    </>
                  )}
                </Section>
              </Col>

              <Col lg={6}>
                {/* Compartir - Disponible para todos */}
                <Section>
                  <MenuOption
                    icon={FaShareAlt}
                    iconColor="#ffc107"
                    title={t('shareApp', 'Compartir Aplicación')}
                    onClick={() => setShowModal(true)}
                  />
 




















<MenuOption
                      icon={FaTools}
                      iconColor="#6c757d"
                      title={t('roles', 'Roles')}
                      to="/users/roles"
                    />











 
 
                </Section>

                {/* ✅ Panel de Admin - EXCLUSIVO para admin */}
                {userRole === "admin" && (
                  <Section
                    title={
                      <div className="d-flex align-items-center">
                        <FaShieldAlt className="me-2" size={18} />
                        {t('adminPanel', 'Panel de Administración')}
                      </div>
                    }
                    gradient="linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)"
                  >
                   
                    <MenuOption
                      icon={FaTools}
                      iconColor="#6c757d"
                      title={t('roles', 'Gestión de Roles')}
                      to="/users/roles"
                    />

                    
                    
                   
                    
                    <MenuOption
                      icon={FaUsers}
                      iconColor="#28a745"
                      title={t('users', 'Gestión de Usuarios')}
                      to="/users"
                    />

                    <MenuOption
                      icon={FaUserCog}
                      iconColor="#667eea"
                      title={t('userActions', 'Acciones de Usuario')}
                      to="/usersactionn"
                    />
                    
                   
               
                  </Section>
                )}

                {/* Cerrar Sesión - Disponible para todos los usuarios autenticados */}
                {auth.user && (
                  <Section>
                    <MenuOption
                      icon={FaSignOutAlt}
                      iconColor="#dc3545"
                      title={t('logout', 'Cerrar Sesión')}
                      onClick={handleLogout}
                      danger
                    />
 <MenuOption
                    icon={FaInfoCircle}
                    iconColor="#6c757d"
                    title={t('appInfo', 'Información de la App')}
                    to="/appinfo2"
                  />

                  </Section>

                  
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Modal de Compartir */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('shareApp', 'Compartir Aplicación')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('shareAppDescription', 'Comparte esta increíble aplicación con tus amigos y familiares.')}</p>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'DJAMEL APS',
                  text: '¡Mira esta increíble aplicación!',
                  url: window.location.origin,
                });
              } else {
                navigator.clipboard.writeText(window.location.origin);
                alert('Enlace copiado al portapapeles');
              }
              setShowModal(false);
            }}>
              {t('shareNow', 'Compartir Ahora')}
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal de Configuración Global */}
      <Modal show={showFeaturesModal} onHide={() => setShowFeaturesModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t('globalSettings', 'Configuración Global')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('globalSettingsDescription', 'Configura las características globales de la aplicación.')}</p>
          {/* Aquí puedes agregar más opciones de configuración global */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFeaturesModal(false)}>
            {t('close', 'Cerrar')}
          </Button>
          <Button variant="primary">
            {t('saveChanges', 'Guardar Cambios')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileInfoUser;