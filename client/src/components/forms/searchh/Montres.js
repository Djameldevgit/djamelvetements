import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Montres = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('relojes');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          ⌚ {t('watch_type', 'Tipo de reloj')}
        </Form.Label>
        <Form.Select
          name="tiporeloj"
          value={postData.tiporeloj}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">{t('select_type', 'Selecciona el tipo')}</option>
          <option value="analogique">{t('analog', 'Analógico')}</option>
          <option value="numerique">{t('digital', 'Digital')}</option>
          <option value="connectee">{t('smart', 'Inteligente')}</option>
          <option value="chronographe">{t('chronograph', 'Cronógrafo')}</option>
          <option value="plonge">{t('diving', 'Buceo')}</option>
          <option value="sport">{t('sport', 'Deportivo')}</option>
          <option value="luxe">{t('luxury', 'Lujo')}</option>
        </Form.Select>
      </Form.Group>

      <Row className="g-3">
        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('movement', 'Movimiento')}
            </Form.Label>
            <Form.Select
              name="movimientoreloj"
              value={postData.movimientoreloj}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select', 'Selecciona')}</option>
              <option value="quartz">{t('quartz', 'Cuarzo')}</option>
              <option value="automatique">{t('automatic', 'Automático')}</option>
              <option value="manuel">{t('manual', 'Manual')}</option>
              <option value="solaire">{t('solar', 'Solar')}</option>
              <option value="connecte">{t('connected', 'Conectado')}</option>
            </Form.Select>
          </Form.Group>
        </Col>

        
      </Row>
 

      
    </div>
  );
};

export default React.memo(Montres);