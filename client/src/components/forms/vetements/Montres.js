import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Montres = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('relojes');
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`p-3 ${isRTL ? 'text-end' : ''}`}>
      {/* Sección Principal - Tipo de Reloj */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <Form.Group className="mb-0">
            <Form.Label className={`fw-bold text-primary mb-2 d-flex align-items-center ${isRTL ? 'justify-content-end' : ''}`}>
              <span className="me-2">⌚</span>
              {t('watch_type', 'Tipo de reloj')}
            </Form.Label>
            <Form.Select
              name="tipoArticulo"
              value={postData.tipoArticulo}
              onChange={handleChangeInput}
              className="form-control-lg border-primary-subtle rounded-3"
              style={{ backgroundColor: '#f8f9fa' }}
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
        </Card.Body>
      </Card>

      {/* Características Técnicas */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-transparent border-0 py-3">
          <h6 className={`fw-bold text-secondary mb-0 ${isRTL ? 'text-end' : ''}`}>
            ⚙️ {t('technical_specs', 'Especificaciones técnicas')}
          </h6>
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="g-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className={`fw-semibold text-muted small mb-2 ${isRTL ? 'text-end d-block' : ''}`}>
                  {t('movement', 'Movimiento')}
                </Form.Label>
                <Form.Select
                  name="movimientoreloj"
                  value={postData.movimientoreloj}
                  onChange={handleChangeInput}
                  className="border-secondary-subtle rounded-2"
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
        </Card.Body>
      </Card>

      {/* Características de Diseño */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-transparent border-0 py-3">
          <h6 className={`fw-bold text-secondary mb-0 ${isRTL ? 'text-end' : ''}`}>
            ✨ {t('design_features', 'Características de diseño')}
          </h6>
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="g-3">
            <Col md={6} lg={4}>
              <Form.Group className="mb-3">
                <Form.Label className={`fw-semibold text-muted small mb-2 ${isRTL ? 'text-end d-block' : ''}`}>
                  {t('strap_material', 'Material de la correa')}
                </Form.Label>
                <Form.Select
                  name="materialcorrea"
                  value={postData.materialcorrea}
                  onChange={handleChangeInput}
                  className="border-secondary-subtle rounded-2"
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

            <Col md={6} lg={4}>
              <Form.Group className="mb-3">
                <Form.Label className={`fw-semibold text-muted small mb-2 ${isRTL ? 'text-end d-block' : ''}`}>
                  {t('water_resistance', 'Resistencia al agua')}
                </Form.Label>
                <Form.Select
                  name="resistenciaagua"
                  value={postData.resistenciaagua}
                  onChange={handleChangeInput}
                  className="border-secondary-subtle rounded-2"
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

            <Col md={12} lg={4}>
              <Form.Group className="mb-3">
                <Form.Label className={`fw-semibold text-muted small mb-2 ${isRTL ? 'text-end d-block' : ''}`}>
                  {t('features', 'Funcionalidades')}
                </Form.Label>
                <Form.Select
                  name="funcionalidades"
                  value={postData.funcionalidades}
                  onChange={handleChangeInput}
                  className="border-secondary-subtle rounded-2"
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
        </Card.Body>
      </Card>
    </div>
  );
};

export default React.memo(Montres);