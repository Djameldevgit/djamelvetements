import React from 'react';
import { Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Title = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('title');
  const isRTL = i18n.language === 'ar';
  
  const charCount = postData.title?.length || 0;
  const maxLength = 100;

  return (
    <Card className="p-3 mb-3">
      <Form.Group>
        {/* 📄 TÍTULO SIMPLE */}
        <Form.Label className="fw-bold mb-2">
          {t('title', 'Título')}
        </Form.Label>
        
        {/* 📝 INPUT SIMPLE */}
        <Form.Control
          type="text"
          name="title"
          placeholder={t('enter_title', 'Título del producto...')}
          value={postData.title || ''}
          onChange={handleChangeInput}
          maxLength={maxLength}
          style={{
            textAlign: isRTL ? 'right' : 'left',
            direction: isRTL ? 'rtl' : 'ltr'
          }}
        />
        
        {/* 🔢 CONTADOR SIMPLE */}
        <div className="text-muted small mt-1" style={{
          textAlign: isRTL ? 'left' : 'right',
          direction: 'ltr'
        }}>
          {charCount}/{maxLength}
        </div>
      </Form.Group>
    </Card>
  );
};

export default Title;