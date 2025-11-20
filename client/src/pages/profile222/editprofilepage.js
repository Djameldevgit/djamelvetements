import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { checkImage } from '../../utils/imageUpload'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { updateProfileUser, getProfileUsers } from '../../redux/actions/profileAction'
import { Button, Container, Row, Col, Card, Form, Alert, Spinner } from 'react-bootstrap'
import { ArrowLeft, Camera } from 'react-bootstrap-icons'

const EditProfilePage = () => {
    // 🎯 ESTADO INICIAL COMPLETO Y SEGURO
    const initState = {
        fullname: '', 
        mobile: '', 
        address: '', 
        email: '', 
        website: '', 
        story: '',
        bio: '',
        avatar: ''
    }
    
    const [userData, setUserData] = useState(initState)
    const { fullname, mobile, email, address, website, story, bio } = userData

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const [isInitialized, setIsInitialized] = useState(false)

    const { auth, profile, languageReducer, alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const { t } = useTranslation('edicionprofile')
    const lang = languageReducer?.language || 'es'
    const isRTL = lang === 'ar'

    // 🎯 VERIFICACIÓN SEGURA DE AUTENTICACIÓN
    useEffect(() => {
        if (!auth.user || !auth.user._id) {
            console.log('No hay usuario autenticado')
            return
        }

        if (auth.user._id !== id) {
            console.log('Redirigiendo: ID no coincide', auth.user._id, id)
            history.push(`/profile/${auth.user._id}/edit`)
        }
    }, [auth.user, id, history])

    // 🎯 INICIALIZACIÓN SEGURA DE DATOS
    useEffect(() => {
        if (auth.user && auth.user._id) {
            console.log('Inicializando datos del usuario:', auth.user)
            
            const safeUserData = {
                fullname: auth.user.fullname || '',
                mobile: auth.user.mobile || '',
                address: auth.user.address || '',
                email: auth.user.email || '',
                website: auth.user.website || '',
                story: auth.user.story || '',
                bio: auth.user.bio || '',
                avatar: auth.user.avatar || ''
            }

            setUserData(safeUserData)
            setAvatarPreview(auth.user.avatar || '/default-avatar.png')
            setIsInitialized(true)
        }
    }, [auth.user])

    // 🎯 CARGA DEL PERFIL EXTERNO (si es necesario)
    useEffect(() => {
        if (id && auth.token) {
            const shouldLoadProfile = !profile.ids || 
                                   !profile.ids.includes(id) || 
                                   !profile.users || 
                                   !profile.users[id]
            
            if (shouldLoadProfile) {
                console.log('Cargando perfil externo:', id)
                dispatch(getProfileUsers({ id, auth }))
            }
        }
    }, [id, auth, dispatch, profile.ids, profile.users])

    // 🎯 MANEJO SEGURO DE CAMBIO DE AVATAR
    const changeAvatar = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const err = checkImage(file)
        if (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, 
                payload: { error: err }
            })
            return
        }

        setAvatar(file)
        setAvatarPreview(URL.createObjectURL(file))
    }

    // 🎯 MANEJO SEGURO DE INPUTS
    const handleInput = (e) => {
        const { name, value } = e.target
        
        setUserData(prev => ({ 
            ...prev, 
            [name]: value 
        }))
        
        // Limpiar errores específicos
        if (name === 'email') {
            setEmailError('')
        }
        
        if (formErrors[name]) {
            setFormErrors(prev => ({ 
                ...prev, 
                [name]: '' 
            }))
        }
    }

    // 🎯 VALIDACIÓN ROBUSTA DEL FORMULARIO
    const validateForm = () => {
        const errors = {}
        
        // Validación de nombre completo
        if (!fullname?.trim()) {
            errors.fullname = t('fullnameRequired') || 'Nombre completo es requerido'
        } else if (fullname.trim().length < 2) {
            errors.fullname = t('fullnameTooShort') || 'Nombre muy corto'
        }
        
        // Validación de email
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = t('invalidEmail') || 'Email inválido'
        }
        
        // Validación de móvil (opcional)
        if (mobile && !/^[\+]?[(]?[\d\s\-\(\)]{8,}$/.test(mobile)) {
            errors.mobile = t('invalidMobile') || 'Número de móvil inválido'
        }
        
        // Validación de website (opcional)
        if (website && !/^https?:\/\/.+\..+/.test(website)) {
            errors.website = t('invalidWebsite') || 'URL de website inválida'
        }
        
        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    // 🎯 MANEJO SEGURO DEL ENVÍO
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setEmailError('')
        setFormErrors({})

        console.log('Iniciando envío del formulario...')

        if (!validateForm()) {
            console.log('Validación fallida:', formErrors)
            setLoading(false)
            return
        }

        try {
            // 🎯 PREPARACIÓN SEGURA DE DATOS
            const dataToSend = {
                fullname: fullname?.trim() || '',
                mobile: mobile?.trim() || '',
                address: address?.trim() || '',
                email: email?.trim() || '',
                website: website?.trim() || '',
                story: story?.trim() || '',
                bio: bio?.trim() || '',
            }

            console.log('Datos a enviar:', dataToSend)

            // 🎯 EJECUCIÓN SEGURA DE LA ACTUALIZACIÓN
            const result = await dispatch(updateProfileUser({ 
                userData: dataToSend,
                avatar, 
                auth 
            }))

            console.log('Resultado de la actualización:', result)

            // 🎯 VERIFICACIÓN ROBUSTA DEL RESULTADO
            if (result && (result.type === 'SUCCESS' || 
                          (result.payload && result.payload.success) ||
                          (result.payload && !result.payload.error))) {
                
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { success: t('profileUpdated') || 'Perfil actualizado correctamente' }
                })

                console.log('Perfil actualizado, redirigiendo...')
                
                setTimeout(() => {
                    history.push(`/profile/${id}`)
                }, 1500)

            } else {
                const errorMsg = result?.payload?.error?.toLowerCase() || 
                               result?.payload?.msg?.toLowerCase() || 
                               'Error desconocido'
                
                console.log('Error en actualización:', errorMsg)
                
                if (errorMsg.includes('email') || errorMsg.includes('correo')) {
                    setEmailError(t('emailAlreadyExists') || 'El email ya está en uso')
                } else {
                    dispatch({
                        type: GLOBALTYPES.ALERT,
                        payload: { error: errorMsg }
                    })
                }
            }

        } catch (error) {
            console.error('Error crítico en handleSubmit:', error)
            
            const errorMsg = error?.response?.data?.error?.toLowerCase() || 
                           error?.response?.data?.msg?.toLowerCase() || 
                           error.message?.toLowerCase() || 
                           t('updateError') || 'Error al actualizar perfil'
            
            if (errorMsg.includes('email') || errorMsg.includes('correo')) {
                setEmailError(t('emailAlreadyExists') || 'El email ya está en uso')
            } else {
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { error: errorMsg }
                })
            }
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        history.push(`/profile/${id}`)
    }

    const containerStyle = {
        direction: isRTL ? 'rtl' : 'ltr',
        textAlign: isRTL ? 'right' : 'left'
    }

    // 🎯 ESTADOS DE CARGA MEJORADOS
    if (!auth.user || !isInitialized) {
        return (
            <Container style={{ minHeight: '60vh', ...containerStyle }} className="d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <Spinner animation="border" role="status" className="mb-3">
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                    <p>{t('loading') || 'Cargando...'}</p>
                </div>
            </Container>
        )
    }

    if (auth.user._id !== id) {
        return (
            <Container style={{ minHeight: '60vh', ...containerStyle }} className="d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <h4>{t('accessDenied') || 'Acceso denegado'}</h4>
                    <Button variant="primary" onClick={handleBack} className="mt-3">
                        {t('backToProfile') || 'Volver al perfil'}
                    </Button>
                </div>
            </Container>
        )
    }

    return (
        <Container className="py-4" style={containerStyle}>
            <Row className="mb-4">
                <Col>
                    <Button
                        variant="outline-secondary"
                        onClick={handleBack}
                        className="d-flex align-items-center mb-3"
                        disabled={loading}
                    >
                        <ArrowLeft className={isRTL ? "ms-2" : "me-2"} />
                        {t('backToProfile') || 'Volver al perfil'}
                    </Button>
                    
                    <div className="text-center mb-4">
                        <h1 className="h3 mb-2">
                            {t('editProfile') || 'Editar Perfil'}
                        </h1>
                        <p className="text-muted">
                            {t('updatePersonalInfo') || 'Actualiza tu información personal'}
                        </p>
                    </div>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col lg={8}>
                    {alert.error && (
                        <Alert variant="danger" className="mb-4" dismissible>
                            {alert.error}
                        </Alert>
                    )}
                    
                    {alert.success && (
                        <Alert variant="success" className="mb-4" dismissible>
                            {alert.success}
                        </Alert>
                    )}

                    <Card className="shadow-sm">
                        <Card.Body className="p-4">
                            <Form onSubmit={handleSubmit}>
                                {/* 🎯 SECCIÓN AVATAR MEJORADA */}
                                <div className="text-center mb-4">
                                    <div className="position-relative d-inline-block">
                                        <img
                                            src={avatarPreview}
                                            alt="avatar"
                                            className="rounded-circle border"
                                            style={{
                                                width: '120px',
                                                height: '120px',
                                                objectFit: 'cover'
                                            }}
                                            onError={(e) => {
                                                e.target.src = '/default-avatar.png'
                                            }}
                                        />
                                        <label
                                            htmlFor="avatar-upload"
                                            className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2 cursor-pointer"
                                            style={{ 
                                                cursor: 'pointer', 
                                                width: '40px', 
                                                height: '40px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Camera size={16} />
                                        </label>
                                        <input
                                            type="file"
                                            id="avatar-upload"
                                            accept="image/*"
                                            onChange={changeAvatar}
                                            style={{ display: 'none' }}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <small className="text-muted">
                                            {t('clickToChangeAvatar') || 'Haz clic en la cámara para cambiar la foto'}
                                        </small>
                                    </div>
                                </div>

                                {/* 🎯 INFORMACIÓN BÁSICA */}
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                {t('username') || 'Usuario'}
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={auth.user?.username || ''}
                                                readOnly
                                                disabled
                                                style={{ backgroundColor: '#f8f9fa' }}
                                            />
                                            <Form.Text className="text-muted">
                                                {t('usernameCannotChange') || 'El usuario no se puede cambiar'}
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                {t('fullname') || 'Nombre completo'} *
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="fullname"
                                                value={fullname}
                                                onChange={handleInput}
                                                placeholder={t('fullnamePlaceholder') || 'Tu nombre completo'}
                                                isInvalid={!!formErrors.fullname}
                                                disabled={loading}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formErrors.fullname}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* 🎯 BIOGRAFÍA */}
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        {t('bio') || 'Biografía'}
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="bio"
                                        value={bio}
                                        onChange={handleInput}
                                        placeholder={t('bioPlaceholder') || 'Cuéntanos sobre ti...'}  
                                        maxLength={200}
                                        disabled={loading}
                                        style={{ 
                                            textAlign: isRTL ? 'right' : 'left',
                                            resize: 'none'
                                        }}
                                    />
                                    <Form.Text className="text-muted">
                                        {bio ? bio.length : 0}/200 {t('characters') || 'caracteres'}
                                    </Form.Text>
                                </Form.Group>

                                {/* 🎯 HISTORIA/STORY */}
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        {t('story') || 'Tu historia'}
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="story"
                                        value={story}
                                        onChange={handleInput}
                                        placeholder={t('storyPlaceholder') || 'Comparte tu historia...'}  
                                        maxLength={500}
                                        disabled={loading}
                                        style={{ 
                                            textAlign: isRTL ? 'right' : 'left',
                                            resize: 'none'
                                        }}
                                    />
                                    <Form.Text className="text-muted">
                                        {story ? story.length : 0}/500 {t('characters') || 'caracteres'}
                                    </Form.Text>
                                </Form.Group>

                                {/* 🎯 INFORMACIÓN DE CONTACTO */}
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                {t('email') || 'Email'}
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={handleInput}
                                                placeholder={t('emailPlaceholder') || 'tu@email.com'}
                                                isInvalid={!!emailError || !!formErrors.email}
                                                disabled={loading}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {emailError || formErrors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                {t('mobile') || 'Móvil'}
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="mobile"
                                                value={mobile}
                                                onChange={handleInput}
                                                placeholder={t('mobilePlaceholder') || '+34 123 456 789'}
                                                isInvalid={!!formErrors.mobile}
                                                disabled={loading}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formErrors.mobile}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* 🎯 WEBSITE Y DIRECCIÓN */}
                                <Row className="mb-4">
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                {t('website') || 'Sitio web'}
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="website"
                                                value={website}
                                                onChange={handleInput}
                                                placeholder={t('websitePlaceholder') || 'https://tusitio.com'}
                                                isInvalid={!!formErrors.website}
                                                disabled={loading}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formErrors.website}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                {t('address') || 'Dirección'}
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="address"
                                                value={address}
                                                onChange={handleInput}
                                                placeholder={t('addressPlaceholder') || 'Tu dirección'}
                                                disabled={loading}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* 🎯 BOTONES MEJORADOS */}
                                <div className="d-flex gap-2 justify-content-end pt-3 border-top">
                                    <Button
                                        variant="outline-secondary"
                                        onClick={handleBack}
                                        disabled={loading}
                                        size="lg"
                                    >
                                        {t('cancel') || 'Cancelar'}
                                    </Button>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={loading}
                                        size="lg"
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className={isRTL ? "ms-2" : "me-2"}
                                                />
                                                {t('saving') || 'Guardando...'}
                                            </>
                                        ) : (
                                            t('saveChanges') || 'Guardar Cambios'
                                        )}
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