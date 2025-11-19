import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updatePrivilegios } from '../../redux/actions/userAction';
import { useTranslation } from 'react-i18next';
 
const PRIVILEGIOS = [
  { 
    value: 'archivos', 
    icon: '📁',
    translationKey: 'subidaArchivos'
  },
  { 
    value: 'lenguaje', 
    icon: '🌐',
    translationKey: 'cambioIdioma'
  },
  { 
    value: 'chat', 
    icon: '💬',
    translationKey: 'accesoChat'
  },
  { 
    value: 'interfaz', 
    icon: '🎨',
    translationKey: 'personalizacion'
  },
];

const ModalPrivilegios = ({ user, setShowModal, token }) => {
  const dispatch = useDispatch();
  const { languageReducer } = useSelector(state => state);
  const { t } = useTranslation('privelegios');
  const lang = languageReducer.language || 'es';
  
  const [seleccionados, setSeleccionados] = useState(
    Array.isArray(user?.opcionesUser) ? user.opcionesUser : []
  );

  const handleToggle = (value) => {
    setSeleccionados(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value) 
        : [...prev, value]
    );
  };

  const handleSubmit = () => {
    dispatch(updatePrivilegios(user._id, seleccionados, token));
    setShowModal(false);
  };

  return (
    <Modal 
      show 
      onHide={() => setShowModal(false)} 
      centered
      size="lg"
      className="modern-privileges-modal"
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>
         
          <div>
            <h3>{t('configurarPrivilegios', { lng: lang })}</h3>
            <p className="user-email">{user.email}</p>
          </div>
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="modal-body">
        <div className="privileges-grid">
          {PRIVILEGIOS.map(privilegio => (
            <div 
              key={privilegio.value}
              className={`privilege-card ${seleccionados.includes(privilegio.value) ? 'active' : ''}`}
              onClick={() => handleToggle(privilegio.value)}
            >
              <div className="privilege-icon">{privilegio.icon}</div>
              <div className="privilege-content">
                <h4>{t(privilegio.translationKey + '.titulo', { lng: lang })}</h4>
                <p>{t(privilegio.translationKey + '.descripcion', { lng: lang })}</p>
              </div>
              <div className="checkmark">
                {seleccionados.includes(privilegio.value) ? '✓' : ''}
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      
      <Modal.Footer className="modal-footer">
        <Button 
          variant="outline-secondary" 
          onClick={() => setShowModal(false)}
          className="cancel-btn"
        >
          {t('cancelar', { lng: lang })}
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          className="save-btn"
          disabled={!seleccionados.length}
        >
          {t('guardarCambios', { lng: lang })}
          <span className="save-count">{seleccionados.length}</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPrivilegios;