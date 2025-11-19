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

      <Row className="g-3">
        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('strap_material', 'Material de la correa')}
            </Form.Label>
            <Form.Select
              name="materialcorrea"
              value={postData.materialcorrea}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select', 'Selecciona')}</option>
              <option value="cuir">{t('leather', 'Cuero')}</option>
              <option value="metal">{t('metal', 'Metal')}</option>
              <option value="caoutchouc">{t('rubber', 'Caucho')}</option>
              <option value="nylon">{t('nylon', 'Nylon')}</option>
              <option value="tissu">{t('fabric', 'Tela')}</option>
              <option value="silicone">{t('silicone', 'Silicona')}</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('water_resistance', 'Resistencia al agua')}
            </Form.Label>
            <Form.Select
              name="resistenciaagua"
              value={postData.resistenciaagua}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('not_resistant', 'No resistente')}</option>
              <option value="30m">30m</option>
              <option value="50m">50m</option>
              <option value="100m">100m</option>
              <option value="200m">200m</option>
              <option value="300m">300m+</option>
            </Form.Select>
          </Form.Group>
        </Col>
       
 

        <Col md={4}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('features', 'Funcionalidades')}
            </Form.Label>
            <Form.Select
              name="funcionalidades"
              value={postData.funcionalidades}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select_features', 'Selecciona funcionalidades')}</option>
              <option value="calendar">{t('calendar', 'Calendario')}</option>
              <option value="luminous">{t('luminous_hands', 'Manecillas luminosas')}</option>
              <option value="chronograph">{t('chronograph', 'Cronógrafo')}</option>
              <option value="calendar_luminous">{t('calendar_luminous', 'Calendario + Luminosas')}</option>
              <option value="calendar_chronograph">{t('calendar_chronograph', 'Calendario + Cronógrafo')}</option>
              <option value="luminous_chronograph">{t('luminous_chronograph', 'Luminosas + Cronógrafo')}</option>
              <option value="all_features">{t('all_features', 'Todas las funcionalidades')}</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      
    </div>
  );
};

export default React.memo(Montres);