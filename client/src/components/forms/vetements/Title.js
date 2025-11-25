import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Title = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('title');
  
  // 🆕 DETECCIÓN RTL
  const isRTL = i18n.language === 'ar';

  // DEBUG adicional
  useEffect(() => {
    console.log('🔤 Title Component Mounted/Updated:', {
      title: postData.title,
      hasHandleChangeInput: !!handleChangeInput,
      language: i18n.language,
      isRTL: isRTL
    });
  }, [postData.title, handleChangeInput, i18n.language, isRTL]);

  const handleLocalChange = (e) => {
    console.log('📍 Title input change:', e.target.value);
    handleChangeInput(e);
  };

  return (
    <Form.Group className="mb-3" dir={isRTL ? "rtl" : "ltr"}>

      <Form.Label className={isRTL ? "text-end d-block" : ""}>
        {/* 🆕 ICONO DIRECCIONAL */}
        {isRTL ? (
          <span>
            {t('title', 'العنوان')} 
            <i className="fas fa-heading ms-2 text-primary"></i>
          </span>
        ) : (
          <span>
            <i className="fas fa-heading me-2 text-primary"></i>
            {t('title', 'Título')}
          </span>
        )}
      </Form.Label>

      <Form.Control
        type="text"
        name="title"
        value={postData.title || ''}
        onChange={handleLocalChange}
        placeholder={t('enter_title', 'Ingresa el título del producto')}
        required
        maxLength={100}
        className={`border-0 border-bottom rounded-0 shadow-none ${isRTL ? 'text-end' : ''}`}
        id="title-input-debug"
        dir={isRTL ? "rtl" : "ltr"} // 🆕 DIRECCIÓN DEL TEXTO
        style={{ 
          textAlign: isRTL ? 'right' : 'left',
          fontSize: isRTL ? '16px' : '14px' // 🆕 TAMAÑO FUENTE PARA ÁRABE
        }}
      />

      {/* 🆕 MENSAJE DE VALIDACIÓN TRADUCIDO */}
      <Form.Text className={`text-muted small ${isRTL ? 'text-end d-block' : ''}`}>
        {t('title_max_length', 'Máximo 100 caracteres')}
      </Form.Text>

    </Form.Group>
  );
};

export default Title;