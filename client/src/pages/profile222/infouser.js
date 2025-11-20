import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaArrowLeft } from "react-icons/fa";
import { Container, Row, Col, Button, Badge, Card, Spinner, Alert } from 'react-bootstrap'
import {
  Person,
  Envelope,
  People,
  PersonCheck,
  PatchCheck,
  PatchQuestion,
  Heart,
  FilePost,
  ShieldCheck,
  Clock,
  XCircle,
  CheckCircle,
 
  Calendar,
  Activity,
  JournalText,
  Gear,
  Eye
} from 'react-bootstrap-icons'
import { getProfileUsers } from '../../redux/actions/profileAction'

const infouser = () => {
  const { profile, auth, languageReducer } = useSelector(state => state)
  const dispatch = useDispatch()
  const { t } = useTranslation('profile')
  const history = useHistory()
  const lang = languageReducer?.language || 'en'
  const { id } = useParams()

  const [userStats, setUserStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Verificar permisos - solo el usuario puede ver su info privada
  const isCurrentUser = auth.user._id === id

  useEffect(() => {
    if (!isCurrentUser) {
      setError(t('accessDenied', { lng: lang }))
      setLoading(false)
      return
    }

    if (profile.ids.every(item => item !== id)) {
      dispatch(getProfileUsers({ id, auth }))
    }
  }, [id, auth, dispatch, profile.ids, isCurrentUser, lang, t])

  useEffect(() => {
    if (profile.users.length > 0 && !profile.loading) {
      const stats = calculateUserStats()
      setUserStats(stats)
      setLoading(false)
    } else if (profile.loading === false) {
      setLoading(false)
    }
  }, [profile.users, profile.loading, id, auth.user])

  const calculateUserStats = () => {
    const user = profile.users.find(u => u._id === id) || auth.user
    const userPosts = profile.posts.find(p => p._id === id)

    let totalLikes = 0
    let totalPosts = 0
    let totalComments = 0

    if (userPosts) {
      totalPosts = userPosts.posts.length
      totalLikes = userPosts.posts.reduce(
        (sum, post) => sum + (post.likes?.length || 0),
        0
      )
      totalComments = userPosts.posts.reduce(
        (sum, post) => sum + (post.comments?.length || 0),
        0
      )
    }

    return {
      username: user.username,
      fullname: user.fullname || user.username,
      email: user.email,
      mobile: user.mobile || 'No proporcionado',
      address: user.address || 'No proporcionada',
      website: user.website || 'No proporcionado',
      story: user.story || 'No hay biografía',
      gender: user.gender || 'No especificado',
      followers: user.followers?.length || 0,
      following: user.following?.length || 0,
      role: user.role || 'user',
      userId: user._id,
      totalPosts,
      totalLikes,
      totalComments,
      isVerified: user.isVerified || false,
      isActive: user.isActive !== false,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      avatar: user.avatar,
      bio: user.story // Usamos story como bio
    }
  }

  const getVerificationStatus = isVerified => {
    return isVerified
      ? {
        variant: 'success',
        icon: <PatchCheck className="me-1" />,
        text: t('verified', { lng: lang })
      }
      : {
        variant: 'warning',
        icon: <PatchQuestion className="me-1" />,
        text: t('pending', { lng: lang })
      }
  }

  const getAccountStatus = isActive => {
    return isActive
      ? {
        variant: 'success',
        icon: <CheckCircle className="me-1" />,
        text: t('active', { lng: lang })
      }
      : {
        variant: 'danger',
        icon: <XCircle className="me-1" />,
        text: t('inactive', { lng: lang })
      }
  }

  const getRoleBadge = role => {
    const roles = {
      admin: { variant: 'danger', text: t('admin', { lng: lang }), icon: <ShieldCheck /> },
      user: { variant: 'primary', text: t('user', { lng: lang }), icon: <Person /> },
      moderator: { variant: 'warning', text: t('moderator', { lng: lang }), icon: <Gear /> },
      vip: { variant: 'info', text: t('vip', { lng: lang }), icon: <PatchCheck /> }
    }
    return roles[role] || roles.user
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca'
    return new Date(dateString).toLocaleDateString(lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isCurrentUser) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Alert variant="danger" className="text-center">
              <Eye size={48} className="mb-3" />
              <h4>{t('accessDenied', { lng: lang })}</h4>
              <p>{t('accessDeniedMessage', { lng: lang })}</p>
              <Button variant="primary" onClick={() => history.push(`/profile/${auth.user._id}/info`)}>
                {t('viewMyInfo', { lng: lang })}
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    )
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">{t('loadingProfile', { lng: lang })}</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    )
  }

  if (!userStats) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">
          {t('userNotFound', { lng: lang })}
        </Alert>
        <Button variant="primary" onClick={() => history.push('/')}>
          {t('backToHome', { lng: lang })}
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between">
            <Button
              variant="outline-primary"
              onClick={() => history.push(`/profile/${id}`)}
              className="d-flex align-items-center"
              style={{
                borderRadius: "20px",
                padding: "0.3rem 1rem",
                fontSize: "0.9rem",
                fontWeight: "500"
              }}
            >
              <FaArrowLeft className="me-1 mt-1 d-none d-sm-inline" />
              {t('backToProfile', { lng: lang })}
            </Button>


            <div className="d-flex" style={{
              direction: lang === 'ar' ? 'rtl' : 'ltr',
              textAlign: lang === 'ar' ? 'right' : 'left'
            }}>
              <Eye className="me-2 text-primary" size={24} />
              <h4 className="d-flex align-items-flex-end">{t('profileInfo', { lng: lang })}</h4>
            </div>

            <div style={{ width: '100px' }}></div> {/* Espaciador para centrar */}
          </div>
        </Col>
      </Row>

      {/* Información del usuario */}
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              {/* Header del perfil */}
              <div className="text-center mb-4">
                {userStats.avatar ? (
                  <img
                    src={userStats.avatar}
                    alt={userStats.username}
                    className="rounded-circle mb-3 shadow"
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div
                    className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow"
                    style={{ width: '120px', height: '120px' }}
                  >
                    <Person size={48} className="text-white" />
                  </div>
                )}

                <h4 className="mb-1">{userStats.fullname}</h4>
                <p className="text-muted mb-2">@{userStats.username}</p>

                <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
                  <Badge bg={getRoleBadge(userStats.role).variant} className="d-flex align-items-center">
                    {getRoleBadge(userStats.role).icon}
                    <span className="ms-1">{getRoleBadge(userStats.role).text}</span>
                  </Badge>

                  <Badge bg={getVerificationStatus(userStats.isVerified).variant} className="d-flex align-items-center">
                    {getVerificationStatus(userStats.isVerified).icon}
                    <span className="ms-1">{getVerificationStatus(userStats.isVerified).text}</span>
                  </Badge>

                  <Badge bg={getAccountStatus(userStats.isActive).variant} className="d-flex align-items-center">
                    {getAccountStatus(userStats.isActive).icon}
                    <span className="ms-1">{getAccountStatus(userStats.isActive).text}</span>
                  </Badge>
                </div>
              </div>

              {/* Estadísticas rápidas */}
              <Row className="text-center mb-4">
                <Col xs={6} md={3} className="mb-3">
                  <Card className="border-0 bg-primary bg-opacity-10">
                    <Card.Body>
                      <FilePost size={28} className="mb-2 text-primary" />
                      <h5 className="text-primary">{userStats.totalPosts}</h5>
                      <small className="text-muted">{t('posts', { lng: lang })}</small>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={6} md={3} className="mb-3">
                  <Card className="border-0 bg-success bg-opacity-10">
                    <Card.Body>
                      <Heart size={28} className="mb-2 text-success" />
                      <h5 className="text-success">{userStats.totalLikes}</h5>
                      <small className="text-muted">{t('likes', { lng: lang })}</small>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={6} md={3} className="mb-3">
                  <Card className="border-0 bg-info bg-opacity-10">
                    <Card.Body>
                      <People size={28} className="mb-2 text-info" />
                      <h5 className="text-info">{userStats.followers}</h5>
                      <small className="text-muted">{t('followers', { lng: lang })}</small>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={6} md={3} className="mb-3">
                  <Card className="border-0 bg-warning bg-opacity-10">
                    <Card.Body>
                      <PersonCheck size={28} className="mb-2 text-warning" />
                      <h5 className="text-warning">{userStats.following}</h5>
                      <small className="text-muted">{t('following', { lng: lang })}</small>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Información detallada */}
              <Row>
                <Col md={6}>
                  <Card className="h-100 border-0 bg-light">
                    <Card.Header className="bg-transparent border-0">
                      <h6 className="mb-0">
                        <Activity className="me-2" />
                        {t('accountInfo', { lng: lang })}
                      </h6>
                    </Card.Header>
                    <Card.Body>
                      <div className="info-item mb-3">
                        <strong>
                          <Envelope className="me-2" />
                          {t('email', { lng: lang })}:
                        </strong>
                        <div className="ms-2 text-muted">{userStats.email}</div>
                      </div>

                      <div className="info-item mb-3">
                        <strong>
                          <Person className="me-2" />
                          {t('mobile', { lng: lang })}:
                        </strong>
                        <div className="ms-2 text-muted">{userStats.mobile}</div>
                      </div>

                      <div className="info-item mb-3">
                        <strong>
                          <Calendar className="me-2" />
                          {t('memberSince', { lng: lang })}:
                        </strong>
                        <div className="ms-2 text-muted">{formatDate(userStats.createdAt)}</div>
                      </div>

                      <div className="info-item">
                        <strong>
                          <Clock className="me-2" />
                          {t('lastLogin', { lng: lang })}:
                        </strong>
                        <div className="ms-2 text-muted">{formatDate(userStats.lastLogin)}</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="h-100 border-0 bg-light">
                    <Card.Header className="bg-transparent border-0">
                      <h6 className="mb-0">
                        <JournalText className="me-2" />
                        {t('personalInfo', { lng: lang })}
                      </h6>
                    </Card.Header>
                    <Card.Body>
                      <div className="info-item mb-3">
                        <strong>{t('address', { lng: lang })}:</strong>
                        <div className="ms-2 text-muted">{userStats.address}</div>
                      </div>

                      <div className="info-item mb-3">
                        <strong>{t('website', { lng: lang })}:</strong>
                        <div className="ms-2 text-muted">{userStats.website}</div>
                      </div>

                      <div className="info-item mb-3">
                        <strong>{t('gender', { lng: lang })}:</strong>
                        <div className="ms-2 text-muted">{userStats.gender}</div>
                      </div>

                      <div className="info-item">
                        <strong>{t('userID', { lng: lang })}:</strong>
                        <div className="ms-2">
                          <small className="text-muted font-monospace">{userStats.userId}</small>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Biografía */}
              {userStats.bio && userStats.bio !== 'No hay biografía' && (
                <Card className="mt-4 border-0 bg-light">
                  <Card.Header className="bg-transparent border-0">
                    <h6 className="mb-0">
                      <JournalText className="me-2" />
                      {t('bio', { lng: lang })}
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <p className="mb-0">{userStats.bio}</p>
                  </Card.Body>
                </Card>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default infouser
