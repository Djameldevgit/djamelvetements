import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { Shield, Save, ArrowLeft, Eye, EyeSlash, People, FileText, Heart, Envelope, Phone, House, PersonCheck, CheckCircle } from 'react-bootstrap-icons';
import { getPrivacySettings, updatePrivacySettings } from '../../redux/actions/privacyAction';
import { useHistory } from 'react-router-dom';

const PrivacySettings = () => {
    const { auth, privacy, languageReducer } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation('profile');
    const lang = languageReducer?.language || 'es';

    const initialSettings = {
        profile: 'public',
        posts: 'public',
        followers: 'public',
        following: 'public',
        likes: 'public',
        email: 'private',
        address: 'private',
        mobile: 'private'
    };

    const [settings, setSettings] = useState(initialSettings);
    const [saving, setSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (auth.token) {
            dispatch(getPrivacySettings(auth.token));
        }
    }, [dispatch, auth.token]);

    useEffect(() => {
        if (privacy?.privacySettings) {
            const mergedSettings = {
                ...initialSettings,
                ...privacy.privacySettings
            };
            setSettings(mergedSettings);
        }
    }, [privacy?.privacySettings]);

    const getCurrentSettings = () => {
        if (privacy?.privacySettings) {
            return { ...initialSettings, ...privacy.privacySettings };
        }
        return initialSettings;
    };

    const handleSettingChange = (category, value) => {
        setSettings(prev => ({
            ...prev,
            [category]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setShowSuccess(false);

        try {
            if (auth.token) {
                await dispatch(updatePrivacySettings(settings, auth.token));
                dispatch(getPrivacySettings(auth.token));
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            }
        } catch (error) {
            console.error('Error al guardar:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        setSettings(getCurrentSettings());
    };

    // Configuración de cada categoría de privacidad
    const privacyCategories = [
        {
            key: 'profile',
            icon: Eye,
            title: t('profileVisibility'),
            description: t('profileVisibilityDesc'),
            color: '#0d6efd',
            bgLight: '#e7f1ff'
        },
        {
            key: 'posts',
            icon: FileText,
            title: t('postsVisibility'),
            description: t('postsVisibilityDesc'),
            color: '#0dcaf0',
            bgLight: '#cff4fc'
        },
        {
            key: 'followers',
            icon: People,
            title: t('followersVisibility'),
            description: t('followersVisibilityDesc'),
            color: '#198754',
            bgLight: '#d1e7dd'
        },
        {
            key: 'following',
            icon: PersonCheck,
            title: t('followingVisibility'),
            description: t('followingVisibilityDesc'),
            color: '#ffc107',
            bgLight: '#fff3cd'
        },
        {
            key: 'likes',
            icon: Heart,
            title: t('likesVisibility'),
            description: t('likesVisibilityDesc'),
            color: '#dc3545',
            bgLight: '#f8d7da'
        },
        {
            key: 'email',
            icon: Envelope,
            title: t('emailVisibility'),
            description: t('emailVisibilityDesc'),
            color: '#6c757d',
            bgLight: '#e2e3e5'
        },
        {
            key: 'mobile',
            icon: Phone,
            title: t('mobileVisibility'),
            description: t('mobileVisibilityDesc'),
            color: '#6610f2',
            bgLight: '#e0cffc'
        },
        {
            key: 'address',
            icon: House,
            title: t('addressVisibility'),
            description: t('addressVisibilityDesc'),
            color: '#d63384',
            bgLight: '#f7d6e6'
        }
    ];

    const getVisibilityBadge = (value) => {
        const badges = {
            public: { variant: 'success', icon: Eye, text: t('public') },
            followers: { variant: 'warning', icon: People, text: t('followersOnly') },
            private: { variant: 'secondary', icon: EyeSlash, text: t('onlyMe') }
        };
        return badges[value] || badges.private;
    };

    if (privacy?.loading && !privacy?.privacySettings) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                <p className="mt-3 text-muted">{t('loading')}</p>
            </Container>
        );
    }

    if (!auth.user || !auth.token) {
        return (
            <Container className="py-5 text-center">
                <Alert variant="warning" className="shadow-sm">
                    <Alert.Heading>{t('loginRequired')}</Alert.Heading>
                    <Button variant="primary" onClick={() => history.push('/login')} className="mt-3">
                        Ir al Login
                    </Button>
                </Alert>
            </Container>
        );
    }

    return (
        <Container 
            className="py-4" 
            style={{
                direction: lang === 'ar' ? 'rtl' : 'ltr',
                textAlign: lang === 'ar' ? 'right' : 'left',
                maxWidth: '1200px'
            }}
        >
            {/* Header Section */}
            <Row className="mb-4">
                <Col>
                    <Button
                        variant="light"
                        onClick={() => history.goBack()}
                        className="mb-4 shadow-sm"
                        style={{ borderRadius: '10px' }}
                    >
                        <ArrowLeft className={lang === 'ar' ? 'ms-2' : 'me-2'} />
                        {t('back')}
                    </Button>

                    <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '15px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center text-white">
                                <div 
                                    className="d-flex align-items-center justify-content-center me-3"
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '15px',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                >
                                    <Shield size={32} />
                                </div>
                                <div>
                                    <h1 className="h2 mb-1 fw-bold">{t('privacySettings')}</h1>
                                    <p className="mb-0 opacity-75">{t('privacyDescription')}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Success Alert */}
            {showSuccess && (
                <Alert variant="success" className="shadow-sm mb-4" style={{ borderRadius: '12px' }}>
                    <div className="d-flex align-items-center">
                        <CheckCircle size={24} className="me-2" />
                        <strong>¡Cambios guardados exitosamente!</strong>
                    </div>
                </Alert>
            )}

            {/* Privacy Settings Grid */}
            <Form onSubmit={handleSubmit}>
                <Row className="g-4 mb-4">
                    {privacyCategories.map((category) => {
                        const Icon = category.icon;
                        const badge = getVisibilityBadge(settings[category.key]);
                        const BadgeIcon = badge.icon;

                        return (
                            <Col key={category.key} xs={12} md={6} lg={4}>
                                <Card 
                                    className="h-100 border-0 shadow-sm"
                                    style={{
                                        borderRadius: '15px',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        cursor: 'default'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
                                    }}
                                >
                                    <Card.Body className="p-4">
                                        <div className="d-flex align-items-start mb-3">
                                            <div
                                                className="d-flex align-items-center justify-content-center me-3"
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '12px',
                                                    background: category.bgLight,
                                                    color: category.color
                                                }}
                                            >
                                                <Icon size={24} />
                                            </div>
                                            <div className="flex-grow-1">
                                                <Badge 
                                                    bg={badge.variant}
                                                    className="float-end"
                                                    style={{ borderRadius: '8px' }}
                                                >
                                                    <BadgeIcon size={12} className="me-1" />
                                                    {badge.text}
                                                </Badge>
                                                <h6 className="fw-bold mb-1">{category.title}</h6>
                                            </div>
                                        </div>
                                        
                                        <p className="text-muted small mb-3" style={{ fontSize: '0.85rem' }}>
                                            {category.description}
                                        </p>

                                        <Form.Select
                                            value={settings[category.key]}
                                            onChange={(e) => handleSettingChange(category.key, e.target.value)}
                                            style={{
                                                borderRadius: '10px',
                                                border: '2px solid #e9ecef',
                                                padding: '0.6rem'
                                            }}
                                        >
                                            {category.key === 'email' || category.key === 'mobile' || category.key === 'address' ? (
                                                <>
                                                    <option value="private">{t('onlyMe')}</option>
                                                    <option value="followers">{t('followersOnly')}</option>
                                                    <option value="public">{t('public')}</option>
                                                </>
                                            ) : (
                                                <>
                                                    <option value="public">{t('public')}</option>
                                                    <option value="followers">{t('followersOnly')}</option>
                                                    <option value="private">{t('onlyMe')}</option>
                                                </>
                                            )}
                                        </Form.Select>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>

                {/* Action Buttons */}
                <Row>
                    <Col>
                        <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                            <Card.Body className="p-4">
                                <div className="d-flex flex-wrap gap-3 justify-content-end">
                                    <Button
                                        variant="outline-secondary"
                                        onClick={handleReset}
                                        disabled={saving}
                                        style={{
                                            borderRadius: '10px',
                                            padding: '0.6rem 1.5rem',
                                            border: '2px solid #6c757d'
                                        }}
                                    >
                                        {t('reset')}
                                    </Button>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={saving}
                                        className="d-flex align-items-center"
                                        style={{
                                            borderRadius: '10px',
                                            padding: '0.6rem 2rem',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            border: 'none',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {saving ? (
                                            <>
                                                <Spinner animation="border" size="sm" className="me-2" />
                                                {t('saving')}
                                            </>
                                        ) : (
                                            <>
                                                <Save className="me-2" size={18} />
                                                {t('saveChanges')}
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default PrivacySettings;