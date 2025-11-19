import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
 import Avatar from '../../components/Avatar'
 import Followers from '../../components/profile/Followers'
import Following from '../../components/profile/Following'

import FollowBtn from '../../components/FollowBtn'
 
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { Card, Row, Col, Button, Spinner, Container } from 'react-bootstrap'
import { Person, Link45deg, Journal, Pencil, GeoAlt, Envelope, Telephone,  EyeSlash, People,  Heart, Grid3x3, ChatDots } from 'react-bootstrap-icons'
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

    // Detectar si es móvil
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

    // Cargar userData
    useEffect(() => {
        setLoading(true)

        if (id === auth.user._id) {
            setUserData(auth.user)
            setLoading(false)
        }
        else if (profile.users && profile.users.length > 0) {
            const user = profile.users.find(user => user._id === id)
            if (user) {
                setUserData(user)
            }
            setLoading(false)
        }
        else if (profile.loading) {
            setLoading(true)
        }
        else {
            setLoading(false)
        }
    }, [id, auth.user, profile.users, profile.loading])

    // Control del modal
    useEffect(() => {
        if (showFollowers || showFollowing) {
            dispatch({ type: GLOBALTYPES.MODAL, payload: true })
        } else {
            dispatch({ type: GLOBALTYPES.MODAL, payload: false })
        }
    }, [showFollowers, showFollowing, dispatch])

    // Helpers de privacidad
    const normalizeLevel = (level) => {
        if (!level) return level
        if (level === 'friends') return 'followers'
        return level
    }

    const isFollowerOf = (user, authId) => {
        if (!user || !user.followers) return false
        return user.followers.some(f => {
            if (!f) return false
            if (typeof f === 'object') return String(f._id) === String(authId)
            return String(f) === String(authId)
        })
    }

    const getPrivacyColor = (level) => {
        const l = normalizeLevel(level)
        switch (l) {
            case 'public':
                return '#10b981'
            case 'followers':
                return '#f59e0b'
            case 'private':
                return '#ef4444'
            default:
                return '#6b7280'
        }
    }

    
 

    const getCurrentPrivacySettings = () => {
        if (userData && userData.privacySettings) {
            return userData.privacySettings
        }
        return privacy?.privacySettings || {
            profile: 'public',
            posts: 'public',
            followers: 'public',
            following: 'public',
            likes: 'public',
            email: 'private',
            address: 'private',
            mobile: 'private'
        }
    }

    // Funciones de verificación
    const canViewProfile = () => {
        if (!userData) return false
        if (auth.user._id === userData._id) return true

        const profilePrivacy = normalizeLevel(getCurrentPrivacySettings().profile || 'public')

        if (profilePrivacy === 'public') return true
        if (profilePrivacy === 'private') return false
        if (profilePrivacy === 'followers') {
            return isFollowerOf(userData, auth.user._id)
        }
        return true
    }

    const canViewPosts = () => {
        if (!userData) return false
        if (auth.user._id === userData._id) return true
        const postsPrivacy = normalizeLevel(getCurrentPrivacySettings().posts || 'public')
        if (postsPrivacy === 'public') return true
        if (postsPrivacy === 'private') return false
        if (postsPrivacy === 'followers') return isFollowerOf(userData, auth.user._id)
        return true
    }

    const canViewFollowers = () => {
        if (!userData) return false
        if (auth.user._id === userData._id) return true
        const followersPrivacy = normalizeLevel(getCurrentPrivacySettings().followers || 'public')
        if (followersPrivacy === 'public') return true
        if (followersPrivacy === 'private') return false
        if (followersPrivacy === 'followers') return isFollowerOf(userData, auth.user._id)
        return true
    }

    const canViewFollowing = () => {
        if (!userData) return false
        if (auth.user._id === userData._id) return true
        const followingPrivacy = normalizeLevel(getCurrentPrivacySettings().following || 'public')
        if (followingPrivacy === 'public') return true
        if (followingPrivacy === 'private') return false
        if (followingPrivacy === 'followers') return isFollowerOf(userData, auth.user._id)
        return true
    }

    const canViewLikes = () => {
        if (!userData) return false
        if (auth.user._id === userData._id) return true
        const likesPrivacy = normalizeLevel(getCurrentPrivacySettings().likes || 'public')
        if (likesPrivacy === 'public') return true
        if (likesPrivacy === 'private') return false
        if (likesPrivacy === 'followers') return isFollowerOf(userData, auth.user._id)
        return true
    }

    const canViewEmail = () => {
        if (!userData) return false
        if (auth.user._id === userData._id) return true
        const emailPrivacy = normalizeLevel(getCurrentPrivacySettings().email || 'private')
        if (emailPrivacy === 'public') return true
        if (emailPrivacy === 'private') return false
        if (emailPrivacy === 'followers') return isFollowerOf(userData, auth.user._id)
        return false
    }

    const canViewMobile = () => {
        if (!userData) return false
        if (auth.user._id === userData._id) return true
        const mobilePrivacy = normalizeLevel(getCurrentPrivacySettings().mobile || 'private')
        if (mobilePrivacy === 'public') return true
        if (mobilePrivacy === 'private') return false
        if (mobilePrivacy === 'followers') return isFollowerOf(userData, auth.user._id)
        return false
    }

    const canViewAddress = () => {
        if (!userData) return false
        if (auth.user._id === userData._id) return true
        const addressPrivacy = normalizeLevel(getCurrentPrivacySettings().address || 'private')
        if (addressPrivacy === 'public') return true
        if (addressPrivacy === 'private') return false
        if (addressPrivacy === 'followers') return isFollowerOf(userData, auth.user._id)
        return false
    }


    // Handlers
    const handleShowFollowers = (e) => {
        if (!canViewFollowers()) return

        if (e) {
            e.preventDefault()
            e.stopPropagation()
            e.nativeEvent?.stopImmediatePropagation()
        }

        if (isMobile) {
            setTimeout(() => setShowFollowers(true), 50)
        } else {
            setShowFollowers(true)
        }
    }

    const handleShowFollowing = (e) => {
        if (!canViewFollowing()) return

        if (e) {
            e.preventDefault()
            e.stopPropagation()
            e.nativeEvent?.stopImmediatePropagation()
        }

        if (isMobile) {
            setTimeout(() => setShowFollowing(true), 50)
        } else {
            setShowFollowing(true)
        }
    }

    const calculateStats = (user) => {
        if (!user) return { followers: 0, following: 0, totalPosts: 0, totalLikes: 0 }

        const userPosts = profile.posts?.find(p => p._id === id)
        const totalPosts = userPosts ? userPosts.posts?.length || 0 : 0
        const totalLikes = userPosts ? userPosts.posts?.reduce((sum, post) => sum + (post.likes?.length || 0), 0) : 0

        return {
            followers: user.followers?.length || 0,
            following: user.following?.length || 0,
            totalPosts,
            totalLikes
        }
    }

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

    if (!userData || !canViewProfile()) {
        return (
            <Card className="border-0 shadow-lg" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                <Card.Body className="text-center py-5">
                    <div
                        className="mb-4 d-inline-flex align-items-center justify-content-center"
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        }}
                    >
                        <EyeSlash size={40} className="text-white" />
                    </div>
                    <h5 className="fw-bold mb-2">{t('profilePrivate')}</h5>
                    <p className="text-muted">{t('profileNotAccessible')}</p>
                </Card.Body>
            </Card>
        )
    }

    const stats = calculateStats(userData)
    const isCurrentUser = userData._id === auth.user._id
    const currentPrivacy = getCurrentPrivacySettings()

    return (
        <div style={{
            background: theme ? '#1a202c' : '#f8f9fa',
            paddingBottom: '0.5rem'
        }}>
            <Container fluid className="px-0">
                {/* Hero Section con Cover Image Simulado */}
                <div
                    style={{
                        height: isMobile ? '75px' : '130px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        position: 'relative',
                        overflow: 'hidden',
                         
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            opacity: 0.3
                        }}
                    />
                </div>

                {/* Profile Card */}
                <Container style={{ marginTop: isMobile ? '-60px' : '-80px' }}>
                    <Card
                        className="border-0 shadow-lg"
                        style={{
                            borderRadius: '24px',
                            overflow: 'visible',
                            background: theme ? '#2d3748' : 'white'
                        }}
                    >
                        <Card.Body className="p-1">
                            {/* Avatar y Nombre */}
                            <Row className="align-items-start">
                                <Col xs={12} className="text-center mb-1">
                                    <div className="position-relative d-inline-block">
                                        <div
                                            style={{
                                                padding: '6px',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                borderRadius: '50%',
                                                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
                                            }}
                                        >
                                            <Avatar
                                                src={userData.avatar}
                                                size="supper-avatar"
                                                style={{
                                                    width: isMobile ? '100px' : '140px',
                                                    height: isMobile ? '100px' : '140px',
                                                    border: '5px solid white'
                                                }}
                                            />
                                        </div>

                                        {isCurrentUser && (
                                            <Button
                                                size="sm"
                                                className="position-absolute shadow-lg"
                                                style={{
                                                    bottom: '5px',
                                                    right: '5px',
                                                    width: '44px',
                                                    height: '44px',
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    border: '3px solid white',
                                                    padding: 0
                                                }}
                                                onClick={() => window.location.href = `/profile/${id}/editprofilepage`}
                                            >
                                                <Pencil size={18} />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="mt-3">
                                        <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                                            <h2 className="fw-bold mb-0" style={{
                                                color: theme ? '#f7fafc' : '#1a202c',
                                                fontSize: isMobile ? '1.5rem' : '2rem'
                                            }}>
                                                {userData.username}
                                            </h2>

                                        </div>

                                        {userData.fullname && (
                                            <p className="text-muted mb-3" style={{ fontSize: '1.4rem' }}>
                                                {userData.fullname}
                                            </p>
                                        )}

                                        {userData.presentacion && (
                                            <Card
                                                className="border-0 mb-3 mx-auto"
                                                style={{
                                                    maxWidth: '600px',
                                                    background: `linear-gradient(135deg, ${getPrivacyColor(currentPrivacy.profile)}15 0%, ${getPrivacyColor(currentPrivacy.profile)}08 100%)`,
                                                    borderRadius: '13px',
                                                    border: `1.5px solid ${getPrivacyColor(currentPrivacy.profile)}30`
                                                }}
                                            >
                                                <Card.Body className="p-2">
                                                    <div className="d-flex justify-content-between align-items-start">
                                                        <p className="mb-0 fst-italic" style={{
                                                            color: theme ? '#e2e8f0' : '#4a5568',
                                                            fontSize: '1.2rem'
                                                        }}>
                                                            <ChatDots className="me-1" size={16} />
                                                            "{userData.presentacion}"
                                                        </p>

                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        )}

                                        {!isCurrentUser && (
                                            <div className="mt-3">
                                                <FollowBtn user={userData} />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </Row>

                            {/* Estadísticas Mejoradas */}
                            <Row className="g-3 mb-4">
                                {/* Seguidores */}
                                <Col xs={6} md={3}>
                                    <Card
                                        className={`border-0 h-100 ${canViewFollowers() ? 'cursor-pointer' : 'opacity-50'}`}
                                        onClick={canViewFollowers() ? handleShowFollowers : undefined}
                                        style={{
                                            background: `linear-gradient(135deg, ${getPrivacyColor(currentPrivacy.followers)}15 0%, ${getPrivacyColor(currentPrivacy.followers)}08 100%)`,
                                            borderRadius: '16px',
                                            border: `2px solid ${getPrivacyColor(currentPrivacy.followers)}`,
                                            transition: 'all 0.3s ease',
                                            cursor: canViewFollowers() ? 'pointer' : 'not-allowed'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (canViewFollowers()) {
                                                e.currentTarget.style.transform = 'translateY(-4px)'
                                                e.currentTarget.style.boxShadow = `0 8px 24px ${getPrivacyColor(currentPrivacy.followers)}40`
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)'
                                            e.currentTarget.style.boxShadow = 'none'
                                        }}
                                    >
                                        <Card.Body className="p-3 text-center">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <People size={20} style={{ color: getPrivacyColor(currentPrivacy.followers) }} />

                                            </div>
                                            <h3 className="fw-bold mb-1" style={{
                                                color: canViewFollowers()
                                                    ? getPrivacyColor(currentPrivacy.followers)
                                                    : theme ? '#718096' : '#a0aec0',
                                                fontSize: '1.75rem'
                                            }}>
                                                {canViewFollowers() ? stats.followers : <EyeSlash size={20} />}
                                            </h3>
                                            <p className="mb-0 small fw-medium" style={{
                                                color: theme ? '#cbd5e0' : '#6c757d'
                                            }}>
                                                {t('followers')}
                                            </p>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                {/* Siguiendo */}
                                <Col xs={6} md={3}>
                                    <Card
                                        className={`border-0 h-100 ${canViewFollowing() ? 'cursor-pointer' : 'opacity-50'}`}
                                        onClick={canViewFollowing() ? handleShowFollowing : undefined}
                                        style={{
                                            background: `linear-gradient(135deg, ${getPrivacyColor(currentPrivacy.following)}15 0%, ${getPrivacyColor(currentPrivacy.following)}08 100%)`,
                                            borderRadius: '16px',
                                            border: `2px solid ${getPrivacyColor(currentPrivacy.following)}`,
                                            transition: 'all 0.3s ease',
                                            cursor: canViewFollowing() ? 'pointer' : 'not-allowed'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (canViewFollowing()) {
                                                e.currentTarget.style.transform = 'translateY(-4px)'
                                                e.currentTarget.style.boxShadow = `0 8px 24px ${getPrivacyColor(currentPrivacy.following)}40`
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)'
                                            e.currentTarget.style.boxShadow = 'none'
                                        }}
                                    >
                                        <Card.Body className="p-3 text-center">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <Person size={20} style={{ color: getPrivacyColor(currentPrivacy.following) }} />

                                            </div>
                                            <h3 className="fw-bold mb-1" style={{
                                                color: canViewFollowing()
                                                    ? getPrivacyColor(currentPrivacy.following)
                                                    : theme ? '#718096' : '#a0aec0',
                                                fontSize: '1.75rem'
                                            }}>
                                                {canViewFollowing() ? stats.following : <EyeSlash size={20} />}
                                            </h3>
                                            <p className="mb-0 small fw-medium" style={{
                                                color: theme ? '#cbd5e0' : '#6c757d'
                                            }}>
                                                {t('following')}
                                            </p>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                {/* Posts */}
                                <Col xs={6} md={3}>
                                    <Card
                                        className={`border-0 h-100 ${!canViewPosts() && 'opacity-50'}`}
                                        style={{
                                            background: `linear-gradient(135deg, ${getPrivacyColor(currentPrivacy.posts)}15 0%, ${getPrivacyColor(currentPrivacy.posts)}08 100%)`,
                                            borderRadius: '16px',
                                            border: `2px solid ${getPrivacyColor(currentPrivacy.posts)}`
                                        }}
                                    >
                                        <Card.Body className="p-3 text-center">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <Grid3x3 size={20} style={{ color: getPrivacyColor(currentPrivacy.posts) }} />

                                            </div>
                                            <h3 className="fw-bold mb-1" style={{
                                                color: canViewPosts()
                                                    ? getPrivacyColor(currentPrivacy.posts)
                                                    : theme ? '#718096' : '#a0aec0',
                                                fontSize: '1.75rem'
                                            }}>
                                                {canViewPosts() ? stats.totalPosts : <EyeSlash size={20} />}
                                            </h3>
                                            <p className="mb-0 small fw-medium" style={{
                                                color: theme ? '#cbd5e0' : '#6c757d'
                                            }}>
                                                {t('posts')}
                                            </p>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                {/* Likes */}
                                <Col xs={6} md={3}>
                                    <Card
                                        className={`border-0 h-100 ${!canViewLikes() && 'opacity-50'}`}
                                        style={{
                                            background: `linear-gradient(135deg, ${getPrivacyColor(currentPrivacy.likes)}15 0%, ${getPrivacyColor(currentPrivacy.likes)}08 100%)`,
                                            borderRadius: '16px',
                                            border: `2px solid ${getPrivacyColor(currentPrivacy.likes)}`
                                        }}
                                    >
                                        <Card.Body className="p-3 text-center">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <Heart size={20} style={{ color: getPrivacyColor(currentPrivacy.likes) }} />

                                            </div>
                                            <h3 className="fw-bold mb-1" style={{
                                                color: canViewLikes()
                                                    ? getPrivacyColor(currentPrivacy.likes)
                                                    : theme ? '#718096' : '#a0aec0',
                                                fontSize: '1.75rem'
                                            }}>
                                                {canViewLikes() ? stats.totalLikes : <EyeSlash size={20} />}
                                            </h3>
                                            <p className="mb-0 small fw-medium" style={{
                                                color: theme ? '#cbd5e0' : '#6c757d'
                                            }}>
                                                {t('likes')}
                                            </p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            {/* Biografía */}
                            {userData.story && canViewProfile() && (
                                <Card className="border-0 mb-4" style={{
                                    background: `linear-gradient(135deg, ${getPrivacyColor(currentPrivacy.profile)}15 0%, ${getPrivacyColor(currentPrivacy.profile)}08 100%)`,
                                    borderRadius: '16px',
                                    border: `2px solid ${getPrivacyColor(currentPrivacy.profile)}30`
                                }}>
                                    <Card.Body className="p-1">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <div
                                                    className="d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '5px',
                                                        background: getPrivacyColor(currentPrivacy.profile)
                                                    }}
                                                >
                                                    <Journal size={18} className="text-white" />
                                                </div>
                                                <h6 className="mb-0 fw-bold" style={{
                                                    color: theme ? '#f7fafc' : '#2d3748'
                                                }}>
                                                    {t('biography')}
                                                </h6>
                                            </div>

                                        </div>
                                        <p className="mb-0" style={{
                                            color: theme ? '#e2e8f0' : '#4a5568',
                                            fontSize: '0.95rem',
                                            lineHeight: '1.6'
                                        }}>
                                            {userData.story}
                                        </p>
                                    </Card.Body>
                                </Card>
                            )}

                            {/* Información de Contacto y Enlaces */}
                            <Row className="g-1">
                                {/* Contacto */}
                                {(userData.email || userData.address || userData.mobile) && (
                                    <Col md={6}>
                                        <Card className="border-0 h-100" style={{
                                            background: theme ? 'rgba(255,255,255,0.05)' : '#f8f9fa',
                                            borderRadius: '16px'
                                        }}>
                                            <Card.Body className="p-1">
                                                <div className="d-flex align-items-center gap-2 mb-3">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center"
                                                        style={{
                                                            width: '20px',
                                                            height: '20px',
                                                            borderRadius: '5px',
                                                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                                        }}
                                                    >
                                                        <Person size={18} className="text-white" />
                                                    </div>
                                                    <h6 className="mb-0 fw-bold" style={{
                                                        color: theme ? '#f7fafc' : '#2d3748'
                                                    }}>
                                                        {t('contactInfo')}
                                                    </h6>
                                                </div>

                                                {/* Email */}
                                                {userData.email && (
                                                    <div className="mb-3 p-3 rounded-3" style={{
                                                        background: theme ? 'rgba(255,255,255,0.03)' : 'white',
                                                        border: `2px solid ${getPrivacyColor(currentPrivacy.email)}30`
                                                    }}>
                                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <Envelope size={16} style={{
                                                                    color: getPrivacyColor(currentPrivacy.email)
                                                                }} />
                                                                <small className="text-muted fw-medium">{t('email')}</small>
                                                            </div>

                                                        </div>
                                                        <div style={{
                                                            color: theme ? '#e2e8f0' : '#2d3748',
                                                            fontSize: '0.9rem',
                                                            wordBreak: 'break-word'
                                                        }}>
                                                            {canViewEmail()
                                                                ? userData.email
                                                                : '••••••@••••••.com'}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Teléfono */}
                                                {userData.mobile && (
                                                    <div className="mb-3 p-3 rounded-3" style={{
                                                        background: theme ? 'rgba(255,255,255,0.03)' : 'white',
                                                        border: `2px solid ${getPrivacyColor(currentPrivacy.mobile)}30`
                                                    }}>
                                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <Telephone size={16} style={{
                                                                    color: getPrivacyColor(currentPrivacy.mobile)
                                                                }} />
                                                                <small className="text-muted fw-medium">{t('mobile')}</small>
                                                            </div>

                                                        </div>
                                                        <div style={{
                                                            color: theme ? '#e2e8f0' : '#2d3748',
                                                            fontSize: '0.9rem'
                                                        }}>
                                                            {canViewMobile()
                                                                ? userData.mobile
                                                                : '•••••••••'}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Dirección */}
                                                {userData.address && (
                                                    <div className="p-3 rounded-3" style={{
                                                        background: theme ? 'rgba(255,255,255,0.03)' : 'white',
                                                        border: `2px solid ${getPrivacyColor(currentPrivacy.address)}30`
                                                    }}>
                                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <GeoAlt size={16} style={{
                                                                    color: getPrivacyColor(currentPrivacy.address)
                                                                }} />
                                                                <small className="text-muted fw-medium"> {t('address')} </small>
                                                            </div>

                                                        </div>
                                                        <div style={{
                                                            color: theme ? '#e2e8f0' : '#2d3748',
                                                            fontSize: '0.9rem'
                                                        }}>
                                                            {canViewAddress()
                                                                ? userData.address
                                                                : '•••••••••••••••'}
                                                        </div>
                                                    </div>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )}

                                {/* Enlaces */}
                                {userData.website && canViewProfile() && (
                                    <Col md={6}>
                                        <Card className="border-0 h-100" style={{
                                            background: theme ? 'rgba(255,255,255,0.05)' : '#f8f9fa',
                                            borderRadius: '16px'
                                        }}>
                                            <Card.Body className="p-1 mb-2">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div
                                                            className="d-flex align-items-center justify-content-center"
                                                            style={{
                                                                width: '20px',
                                                                height: '20px',
                                                                borderRadius: '5px',
                                                                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                                                            }}
                                                        >
                                                            <Link45deg size={18} className="text-white" />
                                                        </div>
                                                        <h6 className="mb-0 fw-bold" style={{
                                                            color: theme ? '#f7fafc' : '#2d3748'
                                                        }}>
                                                            {t('links')}
                                                        </h6>
                                                    </div>

                                                </div>

                                                <a
                                                    href={userData.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="d-block p-3 rounded-3 text-decoration-none"
                                                    style={{
                                                        background: theme ? 'rgba(255,255,255,0.03)' : 'white',
                                                        border: `2px solid ${getPrivacyColor(currentPrivacy.profile)}30`,
                                                        color: '#8b5cf6',
                                                        fontSize: '0.9rem',
                                                        wordBreak: 'break-all',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = '#8b5cf620'
                                                        e.currentTarget.style.transform = 'translateX(4px)'
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = theme ? 'rgba(255,255,255,0.03)' : 'white'
                                                        e.currentTarget.style.transform = 'translateX(0)'
                                                    }}
                                                >
                                                    {userData.website}
                                                </a>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )}
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>

                {/* Modals */}
                {showFollowers && (
                    <div style={{ position: 'fixed', zIndex: 1050, top: 0, left: 0, right: 0, bottom: 0 }}>
                        <Followers
                            users={userData.followers}
                            setShowFollowers={setShowFollowers}
                        />
                    </div>
                )}

                {showFollowing && (
                    <div style={{ position: 'fixed', zIndex: 1050, top: 0, left: 0, right: 0, bottom: 0 }}>
                        <Following
                            users={userData.following}
                            setShowFollowing={setShowFollowing}
                        />
                    </div>
                )}
            </Container>

            {/* CSS personalizado */}
            <style jsx>{`
                .cursor-pointer {
                    cursor: pointer;
                }
                .cursor-not-allowed {
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    )
}

export default Info