import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../../components/Avatar'
import Followers from '../../components/profile/Followers'
import Following from '../../components/profile/Following'
import FollowBtn from '../../components/FollowBtn'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { Card, Row, Col, Button, Spinner, Container } from 'react-bootstrap'
import { Person, Link45deg, Journal, Pencil, GeoAlt, Envelope, Telephone, EyeSlash, People, Heart, Grid3x3, ChatDots } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'

const Info = ({ id, auth, profile, dispatch }) => {
    const [userData, setUserData] = useState(null)
    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    const { theme, privacy } = useSelector(state => state)
    const { t, i18n } = useTranslation('profile')
    const lang = i18n.language || 'es'

    // Determinar el tipo de usuario
    const isAdminOrSuperUser = userData?.role === 'admin' || userData?.role === 'Super-utilisateur'
    const isRegularUser = userData?.role === 'user'

    // Detectar si es móvil
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // 🎯 CARGA SEGURA DE USERDATA - MEJORADA
    useEffect(() => {
        const loadUserData = async () => {
            setLoading(true)
            console.log('🔍 Cargando userData para ID:', id)
            
            try {
                let user = null
                
                // 🎯 PRIORIDAD 1: Usuario actual autenticado
                if (id === auth.user?._id) {
                    user = auth.user
                    console.log('✅ Usando datos de auth.user:', user)
                }
                // 🎯 PRIORIDAD 2: Usuario desde profile.users
                else if (profile.users && Array.isArray(profile.users) && profile.users.length > 0) {
                    user = profile.users.find(user => user && user._id === id)
                    console.log('✅ Usuario encontrado en profile.users:', user)
                }
                // 🎯 PRIORIDAD 3: Usuario desde profile (si existe estructura de objeto)
                else if (profile.users && typeof profile.users === 'object' && profile.users[id]) {
                    user = profile.users[id]
                    console.log('✅ Usuario encontrado en profile.users[ID]:', user)
                }
                
                // 🎯 ASEGURAR ESTRUCTURA CONSISTENTE
                if (user) {
                    const safeUserData = {
                        _id: user._id || id,
                        username: user.username || '',
                        fullname: user.fullname || '',
                        email: user.email || '',
                        mobile: user.mobile || '',
                        address: user.address || '',
                        website: user.website || '',
                        story: user.story || '',
                        bio: user.bio || '',
                        avatar: user.avatar || '',
                        role: user.role || 'user',
                        // 🎯 CAMPOS CRÍTICOS - ASEGURAR QUE SIEMPRE EXISTAN COMO ARRAYS
                        followers: Array.isArray(user.followers) ? user.followers : [],
                        following: Array.isArray(user.following) ? user.following : [],
                        posts: Array.isArray(user.posts) ? user.posts : [],
                        // 🎯 PRIVACIDAD
                        privacySettings: user.privacySettings || {
                            profile: 'public', posts: 'public', followers: 'public', following: 'public',
                            likes: 'public', email: 'private', address: 'private', mobile: 'private'
                        }
                    }
                    console.log('✅ UserData seguro creado:', safeUserData)
                    setUserData(safeUserData)
                } else {
                    console.log('❌ No se pudo cargar userData')
                    setUserData(null)
                }
            } catch (error) {
                console.error('❌ Error cargando userData:', error)
                setUserData(null)
            } finally {
                setLoading(false)
            }
        }

        loadUserData()
    }, [id, auth.user, profile.users, profile])

    // Control del modal
    useEffect(() => {
        dispatch({ type: GLOBALTYPES.MODAL, payload: !!(showFollowers || showFollowing) })
    }, [showFollowers, showFollowing, dispatch])

    // 🎯 HELPERS DE PRIVACIDAD - MEJORADOS
    const normalizeLevel = (level) => {
        if (!level) return 'public'
        return level === 'friends' ? 'followers' : level
    }

    const isFollowerOf = (user, authId) => {
        if (!user?.followers || !Array.isArray(user.followers)) return false
        return user.followers.some(f => {
            if (!f) return false
            return typeof f === 'object' ? String(f._id) === String(authId) : String(f) === String(authId)
        })
    }

    const getPrivacyColor = (level) => {
        const l = normalizeLevel(level)
        switch (l) {
            case 'public': return '#10b981'
            case 'followers': return '#f59e0b'
            case 'private': return '#ef4444'
            default: return '#6b7280'
        }
    }

    const getCurrentPrivacySettings = () => {
        return userData?.privacySettings || privacy?.privacySettings || {
            profile: 'public', posts: 'public', followers: 'public', following: 'public',
            likes: 'public', email: 'private', address: 'private', mobile: 'private'
        }
    }

    // 🎯 FUNCIONES DE VERIFICACIÓN - ROBUSTAS
    const canView = (field) => {
        if (!userData) return false
        if (auth.user?._id === userData._id) return true
        
        const privacyLevel = normalizeLevel(getCurrentPrivacySettings()[field] || 'public')
        if (privacyLevel === 'public') return true
        if (privacyLevel === 'private') return false
        if (privacyLevel === 'followers') return isFollowerOf(userData, auth.user?._id)
        return true
    }

    // 🎯 HANDLERS SEGUROS
    const handleShowFollowers = (e) => {
        if (!userData || !canView('followers')) return
        e?.preventDefault()
        setShowFollowers(true)
    }

    const handleShowFollowing = (e) => {
        if (!userData || !canView('following')) return
        e?.preventDefault()
        setShowFollowing(true)
    }

    // 🎯 CÁLCULO DE ESTADÍSTICAS - SEGURO
    const calculateStats = (user) => {
        if (!user) return { followers: 0, following: 0, totalPosts: 0, totalLikes: 0 }

        const userPosts = profile.posts?.find(p => p && p._id === id)
        const totalPosts = userPosts ? (userPosts.posts?.length || 0) : 0
        const totalLikes = userPosts ? (userPosts.posts?.reduce((sum, post) => sum + (post?.likes?.length || 0), 0) || 0) : 0

        return {
            followers: user.followers?.length || 0,
            following: user.following?.length || 0,
            totalPosts,
            totalLikes
        }
    }

    // 🎯 COMPONENTE DE ESTADÍSTICAS - MEJORADO
    const StatsSection = () => {
        if (!userData) return null

        const stats = calculateStats(userData)
        const currentPrivacy = getCurrentPrivacySettings()

        return (
            <Row className="g-3 mb-4">
                <Col xs={6} md={3}>
                    <Card className={`border-0 h-100 ${canView('followers') ? 'cursor-pointer' : 'opacity-50'}`}
                        onClick={canView('followers') ? handleShowFollowers : undefined}
                        style={{
                            background: `linear-gradient(135deg, ${getPrivacyColor(currentPrivacy.followers)}15 0%, ${getPrivacyColor(currentPrivacy.followers)}08 100%)`,
                            borderRadius: '16px', border: `2px solid ${getPrivacyColor(currentPrivacy.followers)}`,
                            transition: 'all 0.3s ease', cursor: canView('followers') ? 'pointer' : 'not-allowed'
                        }}>
                        <Card.Body className="p-3 text-center">
                            <People size={20} style={{ color: getPrivacyColor(currentPrivacy.followers) }} />
                            <h3 className="fw-bold mb-1" style={{
                                color: canView('followers') ? getPrivacyColor(currentPrivacy.followers) : theme ? '#718096' : '#a0aec0',
                                fontSize: '1.75rem'
                            }}>
                                {canView('followers') ? stats.followers : <EyeSlash size={20} />}
                            </h3>
                            <p className="mb-0 small fw-medium" style={{ color: theme ? '#cbd5e0' : '#6c757d' }}>
                                {t('followers')}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={6} md={3}>
                    <Card className={`border-0 h-100 ${canView('following') ? 'cursor-pointer' : 'opacity-50'}`}
                        onClick={canView('following') ? handleShowFollowing : undefined}
                        style={{
                            background: `linear-gradient(135deg, ${getPrivacyColor(currentPrivacy.following)}15 0%, ${getPrivacyColor(currentPrivacy.following)}08 100%)`,
                            borderRadius: '16px', border: `2px solid ${getPrivacyColor(currentPrivacy.following)}`,
                            transition: 'all 0.3s ease', cursor: canView('following') ? 'pointer' : 'not-allowed'
                        }}>
                        <Card.Body className="p-3 text-center">
                            <Person size={20} style={{ color: getPrivacyColor(currentPrivacy.following) }} />
                            <h3 className="fw-bold mb-1" style={{
                                color: canView('following') ? getPrivacyColor(currentPrivacy.following) : theme ? '#718096' : '#a0aec0',
                                fontSize: '1.75rem'
                            }}>
                                {canView('following') ? stats.following : <EyeSlash size={20} />}
                            </h3>
                            <p className="mb-0 small fw-medium" style={{ color: theme ? '#cbd5e0' : '#6c757d' }}>
                                {t('following')}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={6} md={3}>
                    <Card className={`border-0 h-100 ${!canView('posts') && 'opacity-50'}`}
                        style={{
                            background: `linear-gradient(135deg, ${getPrivacyColor(currentPrivacy.posts)}15 0%, ${getPrivacyColor(currentPrivacy.posts)}08 100%)`,
                            borderRadius: '16px', border: `2px solid ${getPrivacyColor(currentPrivacy.posts)}`
                        }}>
                        <Card.Body className="p-3 text-center">
                            <Grid3x3 size={20} style={{ color: getPrivacyColor(currentPrivacy.posts) }} />
                            <h3 className="fw-bold mb-1" style={{
                                color: canView('posts') ? getPrivacyColor(currentPrivacy.posts) : theme ? '#718096' : '#a0aec0',
                                fontSize: '1.75rem'
                            }}>
                                {canView('posts') ? stats.totalPosts : <EyeSlash size={20} />}
                            </h3>
                            <p className="mb-0 small fw-medium" style={{ color: theme ? '#cbd5e0' : '#6c757d' }}>
                                {t('posts')}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={6} md={3}>
                    <Card className={`border-0 h-100 ${!canView('likes') && 'opacity-50'}`}
                        style={{
                            background: `linear-gradient(135deg, ${getPrivacyColor(currentPrivacy.likes)}15 0%, ${getPrivacyColor(currentPrivacy.likes)}08 100%)`,
                            borderRadius: '16px', border: `2px solid ${getPrivacyColor(currentPrivacy.likes)}`
                        }}>
                        <Card.Body className="p-3 text-center">
                            <Heart size={20} style={{ color: getPrivacyColor(currentPrivacy.likes) }} />
                            <h3 className="fw-bold mb-1" style={{
                                color: canView('likes') ? getPrivacyColor(currentPrivacy.likes) : theme ? '#718096' : '#a0aec0',
                                fontSize: '1.75rem'
                            }}>
                                {canView('likes') ? stats.totalLikes : <EyeSlash size={20} />}
                            </h3>
                            <p className="mb-0 small fw-medium" style={{ color: theme ? '#cbd5e0' : '#6c757d' }}>
                                {t('likes')}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }

    // 🎯 COMPONENTE DE INFORMACIÓN DE CONTACTO - MEJORADO
    const ContactInfoSection = () => {
        if (!userData) return null

        const currentPrivacy = getCurrentPrivacySettings()
        const hasContactInfo = userData.email || userData.mobile || userData.address || userData.website

        if (!hasContactInfo) return null

        return (
            <Col md={6}>
                <Card className="border-0 h-100" style={{
                    background: theme ? 'rgba(255,255,255,0.05)' : '#f8f9fa', borderRadius: '16px'
                }}>
                    <Card.Body className="p-4">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <Person size={18} className="text-white" style={{
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                padding: '4px', borderRadius: '5px'
                            }} />
                            <h6 className="mb-0 fw-bold" style={{ color: theme ? '#f7fafc' : '#2d3748' }}>
                                {t('contactInfo')}
                            </h6>
                        </div>

                        {userData.email && (
                            <InfoItem 
                                icon={<Envelope size={16} />}
                                label={t('email')}
                                value={userData.email}
                                canView={canView('email')}
                                privacyColor={getPrivacyColor(currentPrivacy.email)}
                                theme={theme}
                            />
                        )}

                        {userData.mobile && (
                            <InfoItem 
                                icon={<Telephone size={16} />}
                                label={t('mobile')}
                                value={userData.mobile}
                                canView={canView('mobile')}
                                privacyColor={getPrivacyColor(currentPrivacy.mobile)}
                                theme={theme}
                            />
                        )}

                        {userData.address && (
                            <InfoItem 
                                icon={<GeoAlt size={16} />}
                                label={t('address')}
                                value={userData.address}
                                canView={canView('address')}
                                privacyColor={getPrivacyColor(currentPrivacy.address)}
                                theme={theme}
                            />
                        )}

                        {userData.website && canView('profile') && (
                            <div className="p-3 rounded-3 mb-3" style={{
                                background: theme ? 'rgba(255,255,255,0.03)' : 'white',
                                border: `2px solid ${getPrivacyColor(currentPrivacy.profile)}30`
                            }}>
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <Link45deg size={16} style={{ color: '#8b5cf6' }} />
                                    <small className="text-muted fw-medium">{t('website')}</small>
                                </div>
                                <a href={userData.website} target="_blank" rel="noopener noreferrer"
                                    className="text-decoration-none" style={{ color: '#8b5cf6', fontSize: '0.9rem', wordBreak: 'break-all' }}>
                                    {userData.website}
                                </a>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        )
    }

    // 🎯 COMPONENTE DE BIOGRAFÍA - MEJORADO
    const BiographySection = () => {
        if (!userData || !userData.story) return null

        const currentPrivacy = getCurrentPrivacySettings()

        return (
            <Card className="border-0 mb-4" style={{
                background: `linear-gradient(135deg, ${getPrivacyColor(currentPrivacy.profile)}15 0%, ${getPrivacyColor(currentPrivacy.profile)}08 100%)`,
                borderRadius: '16px', border: `2px solid ${getPrivacyColor(currentPrivacy.profile)}30`
            }}>
                <Card.Body className="p-4">
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <Journal size={18} style={{ color: getPrivacyColor(currentPrivacy.profile) }} />
                        <h6 className="mb-0 fw-bold" style={{ color: theme ? '#f7fafc' : '#2d3748' }}>
                            {t('biography')}
                        </h6>
                    </div>
                    <p className="mb-0" style={{
                        color: theme ? '#e2e8f0' : '#4a5568', fontSize: '0.95rem', lineHeight: '1.6'
                    }}>
                        {userData.story}
                    </p>
                </Card.Body>
            </Card>
        )
    }

    // 🎯 COMPONENTE REUTILIZABLE PARA ITEMS DE INFORMACIÓN
    const InfoItem = ({ icon, label, value, canView, privacyColor, theme }) => (
        <div className="mb-3 p-3 rounded-3" style={{
            background: theme ? 'rgba(255,255,255,0.03)' : 'white',
            border: `2px solid ${privacyColor}30`
        }}>
            <div className="d-flex align-items-center gap-2 mb-2">
                {React.cloneElement(icon, { style: { color: privacyColor } })}
                <small className="text-muted fw-medium">{label}</small>
            </div>
            <div style={{ color: theme ? '#e2e8f0' : '#2d3748', fontSize: '0.9rem' }}>
                {canView ? value : '••••••••••'}
            </div>
        </div>
    )

    // 🎯 RENDER PRINCIPAL CON VERIFICACIONES
    if (loading) {
        return (
            <Card className="border-0 shadow-lg" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                <Card.Body className="text-center py-5">
                    <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                    <p className="mt-3 fw-medium">{t('loadingProfile')}</p>
                </Card.Body>
            </Card>
        )
    }

    if (!userData || !canView('profile')) {
        return (
            <Card className="border-0 shadow-lg" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                <Card.Body className="text-center py-5">
                    <div className="mb-4 d-inline-flex align-items-center justify-content-center"
                        style={{
                            width: '80px', height: '80px', borderRadius: '20px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        }}>
                        <EyeSlash size={40} className="text-white" />
                    </div>
                    <h5 className="fw-bold mb-2">{t('profilePrivate')}</h5>
                    <p className="text-muted">{t('profileNotAccessible')}</p>
                </Card.Body>
            </Card>
        )
    }

    const stats = calculateStats(userData)
    const isCurrentUser = userData._id === auth.user?._id
    const currentPrivacy = getCurrentPrivacySettings()

    return (
        <div style={{ background: theme ? '#1a202c' : '#f8f9fa', paddingBottom: '0.5rem' }}>
            <Container fluid className="px-0">
                {/* Hero Section */}
                <div style={{
                    height: isMobile ? '75px' : '130px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        opacity: 0.3
                    }} />
                </div>

                {/* Profile Card */}
                <Container style={{ marginTop: isMobile ? '-60px' : '-80px' }}>
                    <Card className="border-0 shadow-lg" style={{
                        borderRadius: '24px', overflow: 'visible',
                        background: theme ? '#2d3748' : 'white'
                    }}>
                        <Card.Body className="p-4">
                            {/* Avatar y Información Básica */}
                            <Row className="align-items-start">
                                <Col xs={12} className="text-center mb-4">
                                    <div className="position-relative d-inline-block">
                                        <div style={{
                                            padding: '6px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            borderRadius: '50%', boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
                                        }}>
                                            <Avatar src={userData.avatar} size="supper-avatar" style={{
                                                width: isMobile ? '100px' : '140px',
                                                height: isMobile ? '100px' : '140px', border: '5px solid white'
                                            }} />
                                        </div>

                                        {isCurrentUser && (
                                            <Button size="sm" className="position-absolute shadow-lg" style={{
                                                bottom: '5px', right: '5px', width: '44px', height: '44px',
                                                borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                border: '3px solid white', padding: 0
                                            }} onClick={() => window.location.href = `/profile/${id}/editprofilepage`}>
                                                <Pencil size={18} />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                                            <h2 className="fw-bold mb-0" style={{
                                                color: theme ? '#f7fafc' : '#1a202c',
                                                fontSize: isMobile ? '1.5rem' : '2rem'
                                            }}>
                                                {userData.username}
                                            </h2>
                                            {isAdminOrSuperUser && (
                                                <span className="badge" style={{
                                                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                                    color: 'white', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '12px'
                                                }}>
                                                    {t('storeOwner')}
                                                </span>
                                            )}
                                        </div>

                                        {userData.fullname && (
                                            <p className="text-muted mb-3" style={{ fontSize: '1.1rem' }}>
                                                {userData.fullname}
                                            </p>
                                        )}

                                        {!isCurrentUser && <div className="mt-3"><FollowBtn user={userData} /></div>}
                                    </div>
                                </Col>
                            </Row>

                            {/* Estadísticas */}
                            <StatsSection />

                            {/* Biografía */}
                            <BiographySection />

                            {/* Información de Contacto */}
                            <Row className="g-4">
                                <ContactInfoSection />
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>

                {/* Modals */}
                {showFollowers && (
                    <Followers users={userData.followers} setShowFollowers={setShowFollowers} />
                )}
                {showFollowing && (
                    <Following users={userData.following} setShowFollowing={setShowFollowing} />
                )}
            </Container>
        </div>
    )
}

export default Info