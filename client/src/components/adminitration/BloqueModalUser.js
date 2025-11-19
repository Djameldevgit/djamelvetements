import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  Button,
  Form,
  Alert,
  CloseButton
} from "react-bootstrap";
import {
  ExclamationTriangleFill,
  XCircleFill,
  Calendar2EventFill,
  InfoCircleFill,
  PersonFill,
  EnvelopeFill
} from "react-bootstrap-icons";
import { bloquearUsuario } from "../../redux/actions/userAction";

const BloqueModalUser = ({ show, handleClose, user, closeOnOverlayClick = true }) => {
  const { auth, languageReducer } = useSelector(state => state);
  const dispatch = useDispatch();
  const { t } = useTranslation('bloqueomodaluser');
  const lang = languageReducer.language || 'es';
  const [errorrr, setError] = useState(null);
  const modalRef = useRef(null);

  const [datosBloqueo, setDatosBloqueo] = useState({
    motivo: "",
    content: "",
    fecha: "",
    hora: "",
  });

  // Función para cerrar al hacer clic fuera del modal
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  // Función para cerrar con la tecla Escape
  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  useEffect(() => {
    if (show) {
      // Agregar event listeners cuando el modal se muestra
      document.addEventListener('mousedown', handleOverlayClick);
      document.addEventListener('keydown', handleEscapeKey);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    // Cleanup function
    return () => {
      document.removeEventListener('mousedown', handleOverlayClick);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [show, closeOnOverlayClick]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setDatosBloqueo({ ...datosBloqueo, [name]: value });
  };

  const handleBloqueo = (e) => {
    e.preventDefault();
    setError(null);

    const { motivo, fecha, hora, content } = datosBloqueo;

    if (!motivo || !fecha || !hora || !content) {
      setError(t('errors.missingFields'));
      return;
    }

    // Validar que la fecha/hora no sea en el pasado
    const fechaLimite = `${fecha}T${hora}`;
    const now = new Date();
    const selectedDate = new Date(fechaLimite);

    if (selectedDate <= now) {
      setError(t('errors.futureDate'));
      return;
    }

    dispatch(bloquearUsuario({
      auth,
      datosBloqueo: { motivo, content, fechaLimite },
      user
    }));
    handleClose();
  };

  // Resetear formulario cuando se cierra el modal
  useEffect(() => {
    if (!show) {
      setDatosBloqueo({
        motivo: "",
        content: "",
        fecha: "",
        hora: "",
      });
      setError(null);
    }
  }, [show]);

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered 
      backdrop="static" 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      style={{ backdropFilter: "blur(3px)" }}
    >
      <Modal.Header className="bg-danger text-white position-relative">
        <Modal.Title className="d-flex align-items-center">
          <ExclamationTriangleFill className={`${lang === 'ar' ? 'ms-2' : 'me-2'}`} />
          {t('header.title')}
        </Modal.Title>
        <CloseButton
          variant="white"
          onClick={handleClose}
          aria-label={t('actions.close')}
          className="position-absolute"
          style={lang === 'ar' ? { left: '1rem', top: '1rem' } : { right: '1rem', top: '1rem' }}
        />
      </Modal.Header>

      <Form onSubmit={handleBloqueo}>
        <Modal.Body>
          {/* Información del usuario - ESTILOS MEJORADOS */}
          <Alert variant="info" style={{ 
            padding: '12px', 
            marginBottom: '15px',
            border: '1px solid #bee5eb',
            borderRadius: '8px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'space-between'
            }}>
              {/* Username */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flex: '1 1 200px',
                minWidth: '0',
                marginBottom: '8px'
              }}>
                <PersonFill style={{ 
                  color: '#6c757d', 
                  fontSize: '16px',
                  marginRight: lang === 'ar' ? '0' : '8px',
                  marginLeft: lang === 'ar' ? '8px' : '0',
                  flexShrink: '0'
                }} />
                <span style={{ 
                  fontWeight: 'bold', 
                  marginRight: lang === 'ar' ? '0' : '6px',
                  marginLeft: lang === 'ar' ? '6px' : '0',
                  flexShrink: '0',
                  fontSize: '14px'
                }}>
                  {t('userInfo.username')}:
                </span>
                <span style={{ 
                  color: '#495057',
                  fontSize: '14px',
                  fontWeight: '500',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {user?.username || user?.name || user?.fullname || 'N/A'}
                </span>
              </div>

              {/* Email */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flex: '1 1 250px',
                minWidth: '0',
                marginBottom: '8px'
              }}>
                <EnvelopeFill style={{ 
                  color: '#6c757d', 
                  fontSize: '16px',
                  marginRight: lang === 'ar' ? '0' : '8px',
                  marginLeft: lang === 'ar' ? '8px' : '0',
                  flexShrink: '0'
                }} />
                <span style={{ 
                  fontWeight: 'bold', 
                  marginRight: lang === 'ar' ? '0' : '6px',
                  marginLeft: lang === 'ar' ? '6px' : '0',
                  flexShrink: '0',
                  fontSize: '14px'
                }}>
                  {t('userInfo.email')}:
                </span>
                <span style={{ 
                  color: '#495057',
                  fontSize: '14px',
                  fontWeight: '500',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {user?.email || user?.mail || 'N/A'}
                </span>
              </div>
            </div>
          </Alert>

          {errorrr && (
            <Alert variant="danger" className="d-flex align-items-center">
              <XCircleFill className={`${lang === 'ar' ? 'ms-2' : 'me-2'}`} />
              {errorrr}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">
              <InfoCircleFill className={`${lang === 'ar' ? 'ms-2' : 'me-2'} text-warning`} />
              {t('form.reasonLabel')}
            </Form.Label>
            <Form.Select
              name="motivo"
              value={datosBloqueo.motivo}
              onChange={handleChangeInput}
              required
              className="border-2"
            >
              <option value="">{t('form.selectReason')}</option>
              <option value="Comportement abusif">{t('reasons.abusiveBehavior')}</option>
              <option value="Spam">{t('reasons.spam')}</option>
              <option value="Violation des conditions d'utilisation">{t('reasons.termsViolation')}</option>
              <option value="Langage offensant">{t('reasons.offensiveLanguage')}</option>
              <option value="Fraude">{t('reasons.fraud')}</option>
              <option value="Usurpation d'identité">{t('reasons.identityTheft')}</option>
              <option value="Contenu inapproprié">{t('reasons.inappropriateContent')}</option>
              <option value="Violation de la vie privée">{t('reasons.privacyViolation')}</option>
              <option value="Interruption du service">{t('reasons.serviceDisruption')}</option>
              <option value="Activité suspecte">{t('reasons.suspiciousActivity')}</option>
              <option value="Autre">{t('reasons.other')}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">{t('form.detailsLabel')}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              value={datosBloqueo.content}
              onChange={handleChangeInput}
              placeholder={t('form.detailsPlaceholder')}
              required
              className="border-2"
            />
            <Form.Text className="text-muted">
              {t('form.detailsHelp')}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">
              <Calendar2EventFill className={`${lang === 'ar' ? 'ms-2' : 'me-2'} text-primary`} />
              {t('form.blockDuration')}
            </Form.Label>
            
            <Form.Group className="mb-2">
              <Form.Label>{t('form.dateLabel')}</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={datosBloqueo.fecha}
                onChange={handleChangeInput}
                required
                min={new Date().toISOString().split('T')[0]}
                className="border-2"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>{t('form.timeLabel')}</Form.Label>
              <Form.Control
                type="time"
                name="hora"
                value={datosBloqueo.hora}
                onChange={handleChangeInput}
                required
                className="border-2"
              />
            </Form.Group>
            
            <Form.Text className="text-muted">
              {t('form.durationHelp')}
            </Form.Text>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button 
            variant="outline-secondary" 
            onClick={handleClose}
            className="px-4"
          >
            {t('actions.cancel')}
          </Button>
          <Button 
            variant="danger" 
            type="submit"
            className="px-4"
          >
            {t('actions.confirmBlock')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BloqueModalUser;