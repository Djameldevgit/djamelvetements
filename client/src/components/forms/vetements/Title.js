import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Title = ({ postData, handleChangeInput }) => {
  const { t } = useTranslation('categories');
  
  // DEBUG adicional
  useEffect(() => {
    console.log('🔤 Title Component Mounted/Updated:', {
      title: postData.title,
      hasHandleChangeInput: !!handleChangeInput
    });
  }, [postData.title, handleChangeInput]);

  const handleLocalChange = (e) => {
    console.log('📍 Title input change:', e.target.value);
    handleChangeInput(e);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold">
        {t('title', 'Título')} *
        <small className="text-muted ms-2">
          (Actual: "{postData.title || 'vacío'}")
        </small>
      </Form.Label>
      <Form.Control
        type="text"
        name="title"
        value={postData.title || ''}
        onChange={handleLocalChange}
        placeholder={t('enter_title', 'Ingresa el título del producto')}
        required
        maxLength={100}
        className="border-0 border-bottom rounded-0 shadow-none"
        id="title-input-debug" // ID para debugging
      />
      <Form.Text className="text-muted">
        {postData.title ? `${postData.title.length}/100 caracteres` : 'Máximo 100 caracteres'}
      </Form.Text>
    </Form.Group>
  );
};

export default Title;