import React from 'react';
import { Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const VR = ({ postData = {}, handleChangeInput, theme }) => {
  const { t, i18n } = useTranslation(['vr', 'common']);
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
      {/* 🕶️ TIPO DE ARTÍCULO VR */}
      <Card style={rtlStyles.card}>
        <h6 className="text-primary mb-3">🕶️ {t('vr:vr_equipment', 'Equipos de Realidad Virtual')}</h6>
        
        {/* CAMPO 1: TIPO DE ARTÍCULO (PRINCIPAL) */}
        <Form.Group className="mb-4">
          <Form.Label style={rtlStyles.formLabel}>
            📦 {t('vr:article_type', 'Tipo de Artículo VR')} *
          </Form.Label>
          <Form.Select
            name="tipoArticulo"
            value={postData.tipoArticulo || ''}
            onChange={handleChangeInput}
            style={rtlStyles.formControl}
            required
          >
            <option value="">{t('vr:select_article_type', 'Selecciona el tipo de equipo VR')}</option>
            <option value="Gafas VR Standalone">🕶️ {t('vr:standalone_vr', 'Gafas VR Autónomas')}</option>
            <option value="Gafas VR para PC">💻 {t('vr:pc_vr', 'Gafas VR para PC')}</option>
            <option value="Gafas VR para Consola">🎮 {t('vr:console_vr', 'Gafas VR para Consola')}</option>
            <option value="Gafas VR para Smartphone">📱 {t('vr:smartphone_vr', 'Gafas VR para Smartphone')}</option>
            <option value="Gafas VR Profesionales">👨‍💼 {t('vr:professional_vr', 'Gafas VR Profesionales')}</option>
            <option value="Gafas AR/VR Mixta">🔮 {t('vr:mixed_reality', 'Gafas AR/VR Mixta')}</option>
            <option value="Controladores VR">🎮 {t('vr:vr_controllers', 'Controladores VR')}</option>
            <option value="Sensores de Seguimiento">📡 {t('vr:tracking_sensors', 'Sensores de Seguimiento')}</option>
            <option value="Cascos VR Completos">🎧 {t('vr:complete_vr_headsets', 'Cascos VR Completos')}</option>
            <option value="Accesorios VR">🔧 {t('vr:vr_accessories', 'Accesorios VR')}</option>
          </Form.Select>
        </Form.Group>

        {/* CAMPO 2: MARCA VR (OPCIONAL) */}
        <Form.Group className="mb-3">
          <Form.Label style={rtlStyles.formLabel}>
            🏷️ {t('vr:vr_brand', 'Marca VR')}
          </Form.Label>
          <Form.Select
            name="marcaVR"
            value={postData.marcaVR || ''}
            onChange={handleChangeInput}
            style={rtlStyles.formControl}
          >
            <option value="">{t('vr:select_vr_brand', 'Selecciona marca (opcional)')}</option>
            <option value="Meta (Oculus)">🔵 {t('vr:meta_oculus', 'Meta (Oculus)')}</option>
            <option value="HTC Vive">🟠 {t('vr:htc_vive', 'HTC Vive')}</option>
            <option value="Valve">🎮 {t('vr:valve', 'Valve Index')}</option>
            <option value="Sony">🔵 {t('vr:sony', 'Sony PlayStation VR')}</option>
            <option value="Pico">🇨🇳 {t('vr:pico', 'Pico VR')}</option>
            <option value="HP">💻 {t('vr:hp', 'HP Reverb')}</option>
            <option value="Varjo">👨‍💼 {t('vr:varjo', 'Varjo')}</option>
            <option value="Google">🔍 {t('vr:google', 'Google Cardboard/Daydream')}</option>
            <option value="Samsung">📱 {t('vr:samsung', 'Samsung Gear VR')}</option>
            <option value="Apple">🍎 {t('vr:apple', 'Apple Vision Pro')}</option>
            <option value="Microsoft">🪟 {t('vr:microsoft', 'Microsoft HoloLens')}</option>
            <option value="Otras Marcas">🎯 {t('vr:other_brands', 'Otras Marcas')}</option>
          </Form.Select>
        </Form.Group>
      </Card>
    </div>
  );
};

export default React.memo(VR);