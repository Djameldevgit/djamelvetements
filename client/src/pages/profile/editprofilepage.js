import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { checkImage } from '../../utils/imageUpload'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { updateProfileUser, getProfileUsers } from '../../redux/actions/profileAction'
import { Button, Container, Row, Col, Card, Form, Alert } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'

const EditProfilePage = () => {
    const initState = {
        presentacion: '', 
        fullname: '', 
        mobile: '', 
        address: '', 
        email: '', 
        website: '', 
        story: '' 
    }
    const [userData, setUserData] = useState(initState)
    const { presentacion, mobile, email, fullname, address, website, story } = userData

    const [avatar, setAvatar] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [formErrors, setFormErrors] = useState({})

    const { auth, theme, profile, languageReducer, alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const { t } = useTranslation('profile')
    const lang = languageReducer?.language || 'es'

    // Verificar que el usuario solo pueda editar su propio perfil
    useEffect(() => {
        if (auth.user?._id && auth.user?._id !== id) {
            history.push(`/profile/${auth.user?._id}/edit`)
        }
    }, [auth.user?._id, id, history])

    // CORRECCIÓN 1: Mejor inicialización de userData
    // VERSIÓN MÁS ROBUSTA
// CORRECCIÓN EN TU COMPONENTE - Reemplaza este useEffect:
useEffect(() => {
    if (auth.user) {
        setUserData({
            presentacion: auth.user.presentacion || '',
            fullname: auth.user.fullname || '',
            mobile: auth.user.mobile || '',
            address: auth.user.address || '',
            email: auth.user.email || '',
            website: auth.user.website || '',
            story: auth.user.story || ''
        })
    }
}, [auth.user])
    useEffect(() => {
        if (id && profile.ids?.every(item => item !== id)) {
            dispatch(getProfileUsers({ id, auth }))
        }
    }, [id, auth, dispatch, profile.ids])

    const changeAvatar = (e) => {
        const file = e.target.files[0]

        const err = checkImage(file)
        if (err) return dispatch({
            type: GLOBALTYPES.ALERT, payload: { error: err }
        })

        setAvatar(file)
    }

    const handleInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
        
        // Limpiar errores cuando el usuario escribe
        if (name === 'email') {
            setEmailError('')
        }
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    // CORRECCIÓN 2: Validación de email más flexible
    const validateForm = () => {
        const errors = {}
        
        // Validación de email más flexible
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = t('invalidEmail')
        }
        
        // Validar fullname (requerido)
        if (!fullname?.trim()) {
            errors.fullname = t('fullnameRequired')
        }
        
        // Validación de website opcional y más flexible
        if (website && website.trim() !== '') {
            // Permitir URLs sin http/https y validar dominio básico
            const websiteValue = website.trim()
            if (!/^https?:\/\/.+\..+/.test(websiteValue) && !/^.+\..+/.test(websiteValue)) {
                errors.website = t('invalidWebsite')
            }
        }
        
        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    // CORRECCIÓN 3: Manejo mejorado del submit
    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        setEmailError('')
        setFormErrors({})

        // Validar formulario
        if (!validateForm()) {
            setLoading(false)
            return
        }

        try {
            // Preparar datos para enviar - CORRECCIÓN CLAVE
            const dataToSend = {
                ...userData,
                // Asegurar que todos los campos tengan valor
                presentacion: presentacion?.trim() || '',
                fullname: fullname?.trim() || '',
                mobile: mobile?.trim() || '',
                address: address?.trim() || '',
                email: email?.trim() || '',
                website: website?.trim() || '',
                story: story?.trim() || ''
            }

        

            const result = await dispatch(updateProfileUser({ 
                userData: dataToSend,
                avatar, 
                auth 
            }))

            // Si la acción fue exitosa y no hay error
            if (result?.type !== GLOBALTYPES.ALERT || 
                (result?.payload?.error === undefined && result?.payload?.success)) {
                
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { success: t('profileUpdated') }
                })

                // Redirigir después de un breve delay
                setTimeout(() => {
                    history.push(`/profile/${id}`)
                }, 1500)
            } else {
                // Manejar errores del servidor
                const errorMsg = result.payload?.error?.toLowerCase() || ''
                if (errorMsg.includes('email') || errorMsg.includes('correo')) {
                    setEmailError(t('emailAlreadyExists'))
                } else {
                    dispatch({
                        type: GLOBALTYPES.ALERT,
                        payload: { error: errorMsg || t('updateError') }
                    })
                }
            }

        } catch (error) {
            console.error('Error updating profile:', error)
            
            // Manejar errores de red o del servidor
            const errorMsg = error?.response?.data?.error?.toLowerCase() || error.message?.toLowerCase() || ''
            if (errorMsg.includes('email') || errorMsg.includes('correo')) {
                setEmailError(t('emailAlreadyExists'))
            } else {
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { error: t('updateError') }
                })
            }
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        history.push(`/profile/${id}`)
    }

    // Estilos para RTL (árabe)
    const isRTL = lang === 'ar'
    const containerStyle = {
        direction: isRTL ? 'rtl' : 'ltr',
        textAlign: isRTL ? 'right' : 'left'
    }

    // Verificación segura del usuario
    if (!auth.user || !auth.user._id || auth.user._id !== id) {
        return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '60vh', ...containerStyle }}
            >
                <div className="text-center">
                    <h4>{t('accessDenied')}</h4>
                    <Button variant="primary" onClick={handleBack}>
                        {t('backToProfile')}
                    </Button>
                </div>
            </Container>
        )
    }

    // Funciones seguras para obtener la longitud
    const getPresentacionLength = () => {
        return presentacion ? presentacion.length : 0
    }

    const getStoryLength = () => {
        return story ? story.length : 0
    }

    return (
        <Container className="py-5" style={containerStyle}>
            {/* Header */}
            <Row className="mb-4">
                <Col>
                    <Button
                        variant="outline-secondary"
                        onClick={handleBack}
                        className="d-flex align-items-center"
                    >
                        <ArrowLeft className={isRTL ? "ms-2" : "me-2"} />
                        {t('backToProfile')}
                    </Button>
                    <h1 className="h3 mt-3">{t('editProfile')}</h1>
                    <p className="text-muted">{t('updatePersonalInfo')}</p>
                </Col>
            </Row>

            {/* Formulario */}
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    {/* Mostrar alertas globales */}
                    {alert.error && (
                        <Alert variant="danger" className="mb-3">
                            {alert.error}
                        </Alert>
                    )}
                    
                    {alert.success && (
                        <Alert variant="success" className="mb-3">
                            {alert.success}
                        </Alert>
                    )}

                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                {/* Avatar */}
                                <div className="text-center mb-4">
                                    <div className="position-relative d-inline-block">
                                        <img
                                            src={avatar ? URL.createObjectURL(avatar) : auth.user?.avatar || ''}
                                            alt="avatar"
                                            className="rounded-circle"
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                                objectFit: 'cover',
                                                filter: theme ? 'invert(1)' : 'invert(0)'
                                            }}
                                        />
                                        <label
                                            htmlFor="avatar-upload"
                                            className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2 cursor-pointer"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <i className="fas fa-camera" />
                                        </label>
                                        <input
                                            type="file"
                                            id="avatar-upload"
                                            accept="image/*"
                                            onChange={changeAvatar}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <small className="text-muted">{t('changeAvatarHint')}</small>
                                    </div>
                                </div>

                                {/* CORRECCIÓN: Campo presentacion */}
                                <Form.Group className="mb-3">
                                    <Form.Label>{t('presentacion')}</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        name="presentacion"
                                        value={presentacion}
                                        onChange={handleInput}
                                        placeholder={t('presentacionPlaceholder')}
                                        maxLength={150}
                                        dir={isRTL ? "rtl" : "ltr"}
                                        style={{ textAlign: isRTL ? 'right' : 'left' }}
                                        isInvalid={!!formErrors.presentacion}
                                    />
                                    <Form.Text className="text-muted">
                                        {getPresentacionLength()}/150 {t('characters')}
                                    </Form.Text>
                                </Form.Group>

                                {/* CORRECCIÓN: Campo fullname */}
                                <Form.Group className="mb-3">
                                    <Form.Label>{t('fullname')} *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fullname"
                                        value={fullname}
                                        onChange={handleInput}
                                        placeholder={t('fullnamePlaceholder')}
                                        dir={isRTL ? "rtl" : "ltr"}
                                        isInvalid={!!formErrors.fullname}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.fullname}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* CORRECCIÓN: Campo email más flexible */}
                                <Form.Group className="mb-3">
                                    <Form.Label>{t('email')}</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={handleInput}
                                        placeholder={t('emailPlaceholder')}
                                        dir="ltr" // Email siempre LTR
                                        isInvalid={!!emailError || !!formErrors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {emailError || formErrors.email}
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted">
                                        {t('emailOptionalHint')}
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>{t('address')}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={address}
                                        onChange={handleInput}
                                        placeholder={t('addressPlaceholder')}
                                        dir={isRTL ? "rtl" : "ltr"}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>{t('mobile')}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="mobile"
                                        value={mobile}
                                        onChange={handleInput}
                                        placeholder={t('mobilePlaceholder')}
                                        dir="ltr" // Teléfono siempre LTR
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>{t('website')}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="website"
                                        value={website}
                                        onChange={handleInput}
                                        placeholder={t('websitePlaceholder')}
                                        dir="ltr" // Website siempre LTR
                                        isInvalid={!!formErrors.website}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.website}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>{t('bio')}</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="story"
                                        value={story}
                                        onChange={handleInput}
                                        placeholder={t('bioPlaceholder')}
                                        maxLength={200}
                                        dir={isRTL ? "rtl" : "ltr"}
                                        style={{ textAlign: isRTL ? 'right' : 'left' }}
                                    />
                                    <Form.Text className="text-muted">
                                        {getStoryLength()}/200 {t('characters')}
                                    </Form.Text>
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        size="lg"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" />
                                                {t('saving')}
                                            </>
                                        ) : (
                                            t('saveChanges')
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={handleBack}
                                        disabled={loading}
                                    >
                                        {t('cancel')}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default EditProfilePage