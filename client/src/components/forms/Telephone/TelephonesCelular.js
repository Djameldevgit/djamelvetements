import React from 'react';
import { Form, Card, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TelephonesCelular = ({ postData = {}, handleChangeInput, theme }) => {
  const { t, i18n } = useTranslation(['basicphone', 'common']);
  const isRTL = i18n.language === 'ar';

  // 🎨 ESTILOS RTL
  const rtlStyles = {
    direction: isRTL ? 'rtl' : 'ltr',
    textAlign: isRTL ? 'right' : 'left',
    formLabel: {
      fontWeight: '600',
      marginBottom: '8px',
      display: 'block',
      textAlign: isRTL ? 'right' : 'left',
      color: theme ? '#e2e8f0' : '#2d3748',
      fontSize: '14px'
    },
    formControl: {
      border: `1px solid ${theme ? '#4a5568' : '#cbd5e0'}`,
      backgroundColor: theme ? '#2d3748' : '#ffffff',
      padding: '12px 16px',
      borderRadius: '8px',
      color: theme ? 'white' : '#2d3748',
      width: '100%',
      textAlign: isRTL ? 'right' : 'left',
      direction: isRTL ? 'rtl' : 'ltr',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    card: {
      border: `1px solid ${theme ? '#4a5568' : '#e2e8f0'}`,
      borderRadius: '12px',
      backgroundColor: theme ? '#1a202c' : '#ffffff',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      padding: '20px',
      marginBottom: '20px'
    }
  };

  return (
    <div style={{ direction: rtlStyles.direction }}>
      {/* 📱 INFORMACIÓN ESENCIAL DEL TELÉFONO */}
      <Card style={rtlStyles.card}>
        <h6 className="text-primary mb-3">📱 {t('basicphone:phone_type', 'Información Esencial del Teléfono')}</h6>
        <Row>
          {/* CAMPO 1: TIPO DE ARTÍCULO (ESENCIAL) */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label style={rtlStyles.formLabel}>
                📦 {t('basicphone:article_type', 'Tipo de Artículo')} *
              </Form.Label>
              <Form.Select
                name="tipoArticulo"
                value={postData.tipoArticulo || ''}
                onChange={handleChangeInput}
                style={rtlStyles.formControl}
                required
              >
                <option value="">{t('basicphone:select_article_type', 'Selecciona el tipo')}</option>
                <option value="Smartphone">📱 {t('basicphone:smartphone', 'Smartphone')}</option>
                <option value="Teléfono Básico">📞 {t('basicphone:basic_phone', 'Teléfono Básico')}</option>
                <option value="Teléfono Senior">👴 {t('basicphone:senior_phone', 'Teléfono Senior')}</option>
                <option value="Teléfono Robusto">🛡️ {t('basicphone:rugged_phone', 'Teléfono Robusto')}</option>
                <option value="Teléfono Plegable">📱 {t('basicphone:flip_phone', 'Teléfono Plegable')}</option>
                <option value="Teléfono Empresarial">💼 {t('basicphone:business_phone', 'Teléfono Empresarial')}</option>
                <option value="Teléfono de Emergencia">🚨 {t('basicphone:emergency_phone', 'Teléfono de Emergencia')}</option>
                <option value="Teléfono Gama Media">⚡ {t('basicphone:mid_range_phone', 'Teléfono Gama Media')}</option>
                <option value="Teléfono Gama Alta">👑 {t('basicphone:high_end_phone', 'Teléfono Gama Alta')}</option>
                <option value="Teléfono Reacondicionado">♻️ {t('basicphone:refurbished_phone', 'Teléfono Reacondicionado')}</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* CAMPO 2: MARCA DEL TELÉFONO (IMPORTANTE PARA BÚSQUEDA) */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label style={rtlStyles.formLabel}>
                🏷️ {t('basicphone:brand', 'Marca')} *
              </Form.Label>
              <Form.Select
                name="marcacelular"
                value={postData.marcacelular || ''}
                onChange={handleChangeInput}
                style={rtlStyles.formControl}
                required
              >
                <option value="">{t('basicphone:select_brand', 'Selecciona la marca')}</option>
                <option value="Apple">🍎 {t('basicphone:apple', 'Apple iPhone')}</option>
                <option value="Samsung">📱 {t('basicphone:samsung', 'Samsung')}</option>
                <option value="Xiaomi">⚡ {t('basicphone:xiaomi', 'Xiaomi')}</option>
                <option value="Huawei">🇨🇳 {t('basicphone:huawei', 'Huawei')}</option>
                <option value="Nokia">📞 {t('basicphone:nokia', 'Nokia')}</option>
                <option value="Motorola">🦋 {t('basicphone:motorola', 'Motorola')}</option>
                <option value="OnePlus">🔥 {t('basicphone:oneplus', 'OnePlus')}</option>
                <option value="Google">🔍 {t('basicphone:google', 'Google Pixel')}</option>
                <option value="Sony">🎮 {t('basicphone:sony', 'Sony Xperia')}</option>
                <option value="Realme">⚡ {t('basicphone:realme', 'Realme')}</option>
                <option value="Oppo">🎨 {t('basicphone:oppo', 'Oppo')}</option>
                <option value="Vivo">📸 {t('basicphone:vivo', 'Vivo')}</option>
                <option value="Alcatel">📱 {t('basicphone:alcatel', 'Alcatel')}</option>
                <option value="ZTE">🇨🇳 {t('basicphone:zte', 'ZTE')}</option>
                <option value="Otro">🎯 {t('basicphone:other_brand', 'Otra marca')}</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

       
      </Card>
    </div>
  );
};

export default React.memo(TelephonesCelular);