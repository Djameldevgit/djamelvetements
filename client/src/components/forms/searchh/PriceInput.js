 
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const PriceInput = ({ postData, setPostData }) => {
  const { t  } = useTranslation([  "categories"]);

  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setPostData((prev) => ({
      ...prev,
      price: Math.max(0, value),
    }));
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{t('precioPorPersona')}</Form.Label>
      <InputGroup>
        <Form.Control
          type="number"
          min="0"
          value={postData.price || ''}
          onChange={handleChange}
          placeholder={t('ingresePrecio')}
        />
        <InputGroup.Text>{t('moneda')}</InputGroup.Text>
      </InputGroup>
    </Form.Group>
  );
};

export default PriceInput;
 