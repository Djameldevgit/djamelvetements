import React from 'react';
import { Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Description = ({ postData = {}, handleChangeInput }) => {
    const { t, i18n } = useTranslation('des');
    const isRTL = i18n.language === 'ar';

    const safePostData = {
        description: postData?.description || "",
        ...postData
    };

    return (
        <Card className="p-3 mb-3">
            <Form.Group>
                {/* 📄 TÍTULO SIMPLE */}
                <Form.Label className="fw-bold mb-2">
                    {t('description.title', 'Descripción')}
                </Form.Label>
                
                {/* 📝 TEXTAREA SIMPLE */}
                <Form.Control
                    as="textarea"
                    name="description"
                    rows={4}
                    placeholder={t('description.placeholder', 'Describe tu producto...')}
                    value={safePostData.description}
                    onChange={handleChangeInput}
                    style={{
                        textAlign: isRTL ? 'right' : 'left',
                        direction: isRTL ? 'rtl' : 'ltr'
                    }}
                    maxLength={500}
                />
                
                {/* 🔢 CONTADOR SIMPLE */}
                <div className="text-muted small mt-1" style={{
                    textAlign: isRTL ? 'left' : 'right',
                    direction: 'ltr'
                }}>
                    {safePostData.description.length}/500
                </div>
            </Form.Group>
        </Card>
    );
};

export default Description;