import React, { useEffect, useState } from 'react'
import Info from './Info'
import Posts from '../../components/profile/Posts'
import Saved from '../../components/profile/Saved'
import { useSelector, useDispatch } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, ButtonGroup, Row, Col, Container, Card, Spinner } from 'react-bootstrap'
import {
    Grid3x3Gap,
    Bookmark,
    Gear,
    PersonLinesFill,
    ArrowRight
} from 'react-bootstrap-icons'

const Profile = () => {
    const { profile, auth, languageReducer } = useSelector(state => state)
    const dispatch = useDispatch()
    const { t } = useTranslation('profile')
    const history = useHistory()
    const lang = languageReducer?.language || 'en'

    const { id } = useParams()
    const [activeTab, setActiveTab] = useState('posts')
    const [isMobile, setIsMobile] = useState(false)

    // Detectar si es pantalla pequeña
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        
        return () => {
            window.removeEventListener('resize', checkMobile)
        }
    }, [])

    useEffect(() => {
        if (profile.ids.every(item => item !== id)) {
            dispatch(getProfileUsers({ id, auth }))
        }
    }, [id, auth, dispatch, profile.ids])

    const isCurrentUser = auth.user._id === id;

    // Función segura para redirección que previene conflictos
    const handleEditProfile = (e) => {
        if (e) e.stopPropagation()
        setTimeout(() => {
            history.push(`/profile/${id}/privacysettings`)
        }, isMobile ? 100 : 0)
    }

    const handleProfileInfo = (e) => {
        if (e) e.stopPropagation()
        setTimeout(() => {
            history.push(`/profile/${id}/infouser`)
        }, isMobile ? 100 : 0)
    }

    // Manejo seguro de clicks en pestañas
    const handleTabClick = (tabName, e) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        
        setActiveTab(tabName)
        
        if (isMobile) {
            setTimeout(() => {
                if (tabName === 'edit') {
                    history.push(`/profile/${id}/privacysettings`)
                } else if (tabName === 'profile_info') {
                    history.push(`/profile/${id}/infouser`)
                }
            }, 150)
        } else {
            if (tabName === 'edit') {
                history.push(`/profile/${id}/privacysettings`)
            } else if (tabName === 'profile_info') {
                history.push(`/profile/${id}/infouser`)
            }
        }
    }

    // Configuración de tabs con estilos
    const tabs = [
        {
            key: 'posts',
            icon: Grid3x3Gap,
            label: t('posts', { lng: lang }),
            color: '#0d6efd',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            showForAll: true
        },
        {
            key: 'saved',
            icon: Bookmark,
            label: t('saved', { lng: lang }),
            color: '#ffc107',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            showForAll: false
        },
        {
            key: 'edit',
            icon: Gear,
            label: t('privacysettings', { lng: lang }),
            color: '#6c757d',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            showForAll: false
        },
        {
            key: 'profile_info',
            icon: PersonLinesFill,
            label: t('profile_info', { lng: lang }),
            color: '#198754',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            showForAll: false
        }
    ]

    return (
        <div className="profile" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Container fluid className="px-0">
                {/* Componente Info */}
                <div style={{ 
                    background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                    <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
                </div>

                {/* Barra de pestañas mejorada */}
                <div 
                    className="profile_tab sticky-top bg-white shadow-sm" 
                    style={{ 
                        top: '36px',
                        zIndex: 100,
                        borderBottom: '1px solid #e9ecef',
                        padding: '1rem 0'
                    }}
                >
                    <Container>
                        <div className="d-flex justify-content-center">
                            <ButtonGroup 
                                className="flex-nowrap" 
                                role="group"
                                style={{
                                    gap: isMobile ? '0.5rem' : '0.75rem',
                                    display: 'flex',
                                    border: 'none'
                                }}
                            >
                                {tabs.map((tab) => {
                                    const Icon = tab.icon
                                    const isActive = activeTab === tab.key
                                    
                                    // Solo mostrar tabs apropiados
                                    if (!tab.showForAll && !isCurrentUser) return null

                                    return (
                                        <Button
                                            key={tab.key}
                                            variant="light"
                                            onClick={(e) => handleTabClick(tab.key, e)}
                                            className="d-flex flex-column align-items-center position-relative"
                                            style={{
                                                border: 'none',
                                                borderRadius: '12px',
                                                padding: isMobile ? '0.75rem 1rem' : '0.875rem 1.5rem',
                                                background: isActive ? tab.gradient : 'transparent',
                                                color: isActive ? '#ffffff' : '#6c757d',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                                                boxShadow: isActive 
                                                    ? '0 8px 16px rgba(0,0,0,0.15)' 
                                                    : '0 2px 4px rgba(0,0,0,0.05)',
                                                fontWeight: isActive ? '600' : '500',
                                                minWidth: isMobile ? 'auto' : '120px'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.background = '#f8f9fa'
                                                    e.currentTarget.style.transform = 'translateY(-2px)'
                                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) {
                                                    e.currentTarget.style.background = 'transparent'
                                                    e.currentTarget.style.transform = 'translateY(0)'
                                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'
                                                }
                                            }}
                                        >
                                            <Icon 
                                                size={isMobile ? 20 : 22} 
                                                className="mb-1"
                                                style={{
                                                    filter: isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none'
                                                }}
                                            />
                                            <span 
                                                className={`${isMobile ? 'd-none' : 'd-block'} small`}
                                                style={{ 
                                                    fontSize: '0.75rem',
                                                    letterSpacing: '0.5px',
                                                    textShadow: isActive ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                                                }}
                                            >
                                                {tab.label}
                                            </span>
                                            
                                            {/* Indicador activo en la parte inferior */}
                                            {isActive && (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: '-1rem',
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        width: '60%',
                                                        height: '3px',
                                                        background: '#ffffff',
                                                        borderRadius: '2px 2px 0 0',
                                                        boxShadow: '0 -2px 8px rgba(255,255,255,0.5)'
                                                    }}
                                                />
                                            )}
                                        </Button>
                                    )
                                })}
                            </ButtonGroup>
                        </div>
                    </Container>
                </div>

                {/* Contenido del perfil */}
                <Container className="py-4">
                    {profile.loading ? (
                        <div className="text-center py-3">
                            <img 
                                className="d-block mx-auto" 
                                src={LoadIcon} 
                                alt="loading"
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                                }}
                            />
                            <p className="mt-3 text-muted fw-medium">Cargando perfil...</p>
                        </div>
                    ) : (
                        <div className="profile-content">
                            {isCurrentUser ? (
                                <Row className="g-0">
                                    {/* Posts */}
                                    <Col xs={12} className={activeTab !== 'posts' ? 'd-none' : ''}>
                                        <div 
                                            style={{
                                                animation: 'fadeIn 0.4s ease-in-out'
                                            }}
                                        >
                                            <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
                                        </div>
                                    </Col>

                                    {/* Saved Posts */}
                                    <Col xs={12} className={activeTab !== 'saved' ? 'd-none' : ''}>
                                        <div 
                                            style={{
                                                animation: 'fadeIn 0.4s ease-in-out'
                                            }}
                                        >
                                            <Saved auth={auth} dispatch={dispatch} />
                                        </div>
                                    </Col>

                                    {/* Mensajes de redirección mejorados */}
                                    <Col xs={12} className={activeTab !== 'edit' && activeTab !== 'profile_info' ? 'd-none' : ''}>
                                        <Card 
                                            className="border-0 shadow-sm mt-4"
                                            style={{
                                                borderRadius: '20px',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                animation: 'fadeIn 0.4s ease-in-out'
                                            }}
                                        >
                                            <Card.Body className="p-5 text-center text-white">
                                                <div 
                                                    className="mb-4"
                                                    style={{
                                                        animation: 'pulse 1.5s ease-in-out infinite'
                                                    }}
                                                >
                                                    <Spinner 
                                                        animation="border" 
                                                        style={{
                                                            width: '3rem',
                                                            height: '3rem',
                                                            borderWidth: '3px'
                                                        }}
                                                    />
                                                </div>
                                                
                                                <h4 className="fw-bold mb-3">
                                                    {activeTab === 'edit' 
                                                        ? '🔒 Configuración de Privacidad' 
                                                        : '👤 Información del Perfil'
                                                    }
                                                </h4>
                                                
                                                <p className="mb-4 opacity-90" style={{ fontSize: '1.1rem' }}>
                                                    {activeTab === 'edit' 
                                                        ? 'Redirigiendo a tu configuración de privacidad...' 
                                                        : 'Redirigiendo a la información de tu perfil...'
                                                    }
                                                </p>
                                                
                                                <Button
                                                    variant="light"
                                                    size="lg"
                                                    onClick={activeTab === 'edit' ? handleEditProfile : handleProfileInfo}
                                                    className="d-inline-flex align-items-center"
                                                    style={{
                                                        borderRadius: '12px',
                                                        padding: '0.75rem 2rem',
                                                        fontWeight: '600',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(-2px)'
                                                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)'
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(0)'
                                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
                                                    }}
                                                >
                                                    Continuar
                                                    <ArrowRight className="ms-2" size={20} />
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            ) : (
                                // Para otros usuarios - Solo pueden ver posts
                                <Row className="g-0">
                                    <Col xs={12}>
                                        <div 
                                            style={{
                                                animation: 'fadeIn 0.4s ease-in-out'
                                            }}
                                        >
                                            <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
                                        </div>
                                    </Col>
                                </Row>
                            )}
                        </div>
                    )}
                </Container>

                {/* Overlay protector para móviles */}
                {isMobile && (activeTab === 'edit' || activeTab === 'profile_info') && (
                    <div 
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.01)',
                            zIndex: 9999
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />
                )}
            </Container>

            {/* Estilos CSS adicionales */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.05);
                    }
                }

                .profile_tab .btn-group {
                    border: none !important;
                }

                .profile_tab .btn-group button {
                    border: none !important;
                }

                /* Scrollbar personalizado para móviles */
                @media (max-width: 767px) {
                    .overflow-auto::-webkit-scrollbar {
                        height: 4px;
                    }

                    .overflow-auto::-webkit-scrollbar-track {
                        background: transparent;
                    }

                    .overflow-auto::-webkit-scrollbar-thumb {
                        background: #dee2e6;
                        border-radius: 2px;
                    }
                }
            `}</style>
        </div>
    )
}

export default Profile