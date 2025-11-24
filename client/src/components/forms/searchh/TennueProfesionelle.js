import React from 'react';
import { Card, Form, Row, Col, Badge, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TennueProfesionelle = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('ropatrabajo');
  const isRTL = i18n.language === 'ar';

  return (
    <Card className="border-0 rounded-0 mb-3 shadow-sm" dir={isRTL ? "rtl" : "ltr"}>
      <Card.Header className="bg-light border-0 py-3">
        <h5 className="mb-0 fw-bold text-dark fs-6" style={{ textAlign: isRTL ? 'right' : 'left' }}>
          💼 {t('professional_clothing')}
        </h5>
      </Card.Header>
      <Card.Body className="p-4">
        {/* TIPO DE UNIFORME Y SECTOR */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                🎯 {t('uniform_type')}
              </Form.Label>
              <Form.Select
                name="tipodelabata"
                value={postData.tipodelabata}
                onChange={handleChangeInput}
                className="form-control border-0 shadow-sm"
                style={{ textAlign: isRTL ? 'right' : 'left' }}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">{t('select_uniform_type')}</option>
                <option value="medical">{t('medical')}</option>
                <option value="restaurant">{t('restaurant')}</option>
                <option value="office">{t('office')}</option>
                <option value="industrial">{t('industrial')}</option>
                <option value="security">{t('security')}</option>
                <option value="hotel">{t('hotel')}</option>
                <option value="construction">{t('construction')}</option>
                <option value="education">{t('education')}</option>
                <option value="retail">{t('retail')}</option>
                <option value="other">{t('other')}</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                🏭 {t('professional_sector')}
              </Form.Label>
              <Form.Select
                name="sectordetrabajo"
                value={postData.sectordetrabajo}
                onChange={handleChangeInput}
                className="form-control border-0 shadow-sm"
                style={{ textAlign: isRTL ? 'right' : 'left' }}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">{t('select_sector')}</option>
                <option value="healthcare">{t('healthcare')}</option>
                <option value="food_service">{t('food_service')}</option>
                <option value="corporate_office">{t('corporate_office')}</option>
                <option value="manufacturing">{t('manufacturing')}</option>
                <option value="safety">{t('safety')}</option>
                <option value="hospitality">{t('hospitality')}</option>
                <option value="construction">{t('construction')}</option>
                <option value="education">{t('education')}</option>
                <option value="commerce">{t('commerce')}</option>
                <option value="other">{t('other')}</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
 
  
      </Card.Body>

      {/* ESTILOS RTL ESPECÍFICOS */}
      <style jsx>{`
        [dir="rtl"] .form-check-input {
          margin-right: 0;
          margin-left: 0.5rem;
        }
        .badge {
          font-size: 0.75rem;
        }
        .form-control {
          border-radius: 8px;
        }
      `}</style>
    </Card>
  );
};

export default React.memo(TennueProfesionelle);