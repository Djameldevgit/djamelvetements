import React from 'react';
import { Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const SuportStabilizateurs = ({ postData = {}, handleChangeInput, theme }) => {
  const { t, i18n } = useTranslation(['support', 'common']);
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
      {/* 📝 TIPO DE ARTÍCULO - CAMPO PRINCIPAL */}
      <Card style={rtlStyles.card}>
        <h6 className="text-primary mb-3">📦 {t('support:article_type', 'Tipo de Artículo')}</h6>
        
        <Form.Group className="mb-4">
          <Form.Label style={rtlStyles.formLabel}>
            🏷️ {t('support:article_type', 'Tipo de Artículo')} *
          </Form.Label>
          <Form.Select
            name="tipoArticulo"
            value={postData.tipoArticulo || ''}
            onChange={handleChangeInput}
            style={rtlStyles.formControl}
            required
          >
            <option value="">{t('support:select_article_type', 'Selecciona el tipo de artículo')}</option>
            <option value="Support voiture">🚗 {t('support:car_mount', 'Soporte para coche')}</option>
            <option value="Support vélo">🚲 {t('support:bike_mount', 'Soporte para bicicleta')}</option>
            <option value="Stabilisateur 3 axes">🎥 {t('support:3axis_gimbal', 'Estabilizador 3 ejes')}</option>
            <option value="Trépied">📸 {t('support:tripod', 'Trípode')}</option>
            <option value="Support magnétique">🧲 {t('support:magnetic_mount', 'Soporte magnético')}</option>
            <option value="Support bureau">💻 {t('support:desk_stand', 'Soporte de escritorio')}</option>
            <option value="Support ventouse">🔘 {t('support:suction_mount', 'Soporte de ventosa')}</option>
            <option value="Monopod">🎯 {t('support:monopod', 'Monopié')}</option>
            <option value="Stabilisateur selfie">🤳 {t('support:selfie_stick_gimbal', 'Estabilizador selfie')}</option>
            <option value="Support pliant">📱 {t('support:foldable_stand', 'Soporte plegable')}</option>
            <option value="Support mural">🏠 {t('support:wall_mount', 'Soporte mural')}</option>
            <option value="Support plancher">📺 {t('support:floor_stand', 'Soporte de suelo')}</option>
            <option value="Support universel">🌍 {t('support:universal_stand', 'Soporte universal')}</option>
          </Form.Select>
        </Form.Group>

        {/* 📱 COMPATIBILIDAD - CAMPO OPCIONAL */}
        <Form.Group className="mb-3">
          <Form.Label style={rtlStyles.formLabel}>
            📱 {t('support:compatibility', 'Compatibilidad')}
          </Form.Label>
          <Form.Select
            name="compatibilite"
            value={postData.compatibilite || ''}
            onChange={handleChangeInput}
            style={rtlStyles.formControl}
          >
            <option value="">{t('support:select_compatibility', 'Selecciona compatibilidad (opcional)')}</option>
            <option value="Smartphones uniquement">📱 {t('support:smartphones_only', 'Solo smartphones')}</option>
            <option value="Smartphones et tablettes">📱📟 {t('support:phones_tablets', 'Smartphones y tablets')}</option>
            <option value="Action cameras">🎥 {t('support:action_cameras', 'Cámaras de acción')}</option>
            <option value="Appareils photo">📸 {t('support:cameras', 'Cámaras fotográficas')}</option>
            <option value="Universal">🌍 {t('support:universal', 'Universal')}</option>
          </Form.Select>
        </Form.Group>
      </Card>
    </div>
  );
};

export default React.memo(SuportStabilizateurs);