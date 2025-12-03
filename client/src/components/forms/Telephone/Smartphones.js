// components/forms/telephones/Smartphones.js
import React from 'react';
import { Form, Card, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

 

const Smartphones = ({ 
  postData = {}, 
  handleChangeInput,
 
}) => {
  const { t, i18n } = useTranslation(['smartphone', 'memory', 'common']);
  const isRTL = i18n.language === 'ar';

  const rtlStyles = {
    formLabel: { 
      textAlign: isRTL ? 'right' : 'left',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },
    formControl: {
      textAlign: isRTL ? 'right' : 'left',
      direction: isRTL ? 'rtl' : 'ltr'
    }
  };

  return (
    <div>
      {/* 📱 SISTEMA OPERATIVO Y CÁMARAS - CAMPOS ESPECÍFICOS DE SMARTPHONES */}
      <Card className="p-3 mb-3">
        <Card.Title className="mb-3">🖥️ {t('smartphone:operating_system', 'Sistema Operativo')}</Card.Title>
        
        <Form.Group className="mb-3">
          <Form.Label style={rtlStyles.formLabel}>
            {t('smartphone:operating_system', 'Sistema operativo')}
          </Form.Label>
          <Form.Select
            name="os"
            value={postData.os || ''}
            onChange={handleChangeInput}
            style={rtlStyles.formControl}
            required
          >
            <option value="">{t('smartphone:select_os', 'Seleccione sistema operativo')}</option>
            <option value="IOS">iOS</option>
            <option value="IOS (version spécifique)">{t('smartphone:ios_specific', 'iOS (versión específica)')}</option>
            <option value="Android">Android</option>
            <option value="Android (version spécifique)">{t('smartphone:android_specific', 'Android (versión específica)')}</option>
            <option value="Windows Phone">Windows Phone</option>
            <option value="BlackBerry OS">BlackBerry OS</option>
            <option value="KaiOS">KaiOS</option>
            <option value="HarmonyOS">HarmonyOS</option>
            <option value="Ubuntu Touch">Ubuntu Touch</option>
            <option value="Sailfish OS">Sailfish OS</option>
            <option value="Autre">{t('smartphone:other', 'Otro')}</option>
          </Form.Select>
        </Form.Group>
      </Card>

      {/* 📸 SISTEMA DE CÁMARAS */}
      <Card className="p-3 mb-3">
        <Card.Title className="mb-3">📸 {t('smartphone:camera_system', 'Sistema de Cámaras')}</Card.Title>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label style={rtlStyles.formLabel}>
                📷 {t('smartphone:main_camera', 'Cámara principal')}
              </Form.Label>
              <Form.Control
                type="number"
                name="appareil"
                value={postData.appareil || ''}
                onChange={handleChangeInput}
                placeholder={t('smartphone:camera_megapixel', 'En Megapíxeles')}
                style={rtlStyles.formControl}
                min="0"
                step="0.1"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label style={rtlStyles.formLabel}>
                📸 {t('smartphone:front_camera', 'Cámara frontal')}
              </Form.Label>
              <Form.Control
                type="number"
                name="camerafrontal"
                value={postData.camerafrontal || ''}
                onChange={handleChangeInput}
                placeholder={t('smartphone:camera_megapixel', 'En Megapíxeles')}
                style={rtlStyles.formControl}
                min="0"
                step="0.1"
                required
              />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      {/* 📡 CONECTIVIDAD */}
      <Card className="p-3 mb-3">
        <Card.Title className="mb-3">📡 {t('smartphone:connectivity', 'Conectividad')}</Card.Title>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label style={rtlStyles.formLabel}>
                📶 {t('smartphone:network', 'Red móvil')}
              </Form.Label>
              <Form.Select
                name="gigas"
                value={postData.gigas || ''}
                onChange={handleChangeInput}
                style={rtlStyles.formControl}
                required
              >
                <option value="">{t('smartphone:select_network', 'Seleccione red')}</option>
                <option value="Sans réseau">{t('smartphone:no_network', 'Sin red')}</option>
                <option value="Avec 2G">2G {t('smartphone:with_2g', 'Con 2G')}</option>
                <option value="Avec 3G">3G {t('smartphone:with_3g', 'Con 3G')}</option>
                <option value="Avec 4G">4G {t('smartphone:with_4g', 'Con 4G')}</option>
                <option value="Avec 5G">5G {t('smartphone:with_5g', 'Con 5G')}</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label style={rtlStyles.formLabel}>
                📲 {t('smartphone:sim_slots', 'Ranuras SIM')}
              </Form.Label>
              <Form.Select
                name="doublepuces"
                value={postData.doublepuces || ''}
                onChange={handleChangeInput}
                style={rtlStyles.formControl}
                required
              >
                <option value="">{t('smartphone:select_sim', 'Seleccione ranuras SIM')}</option>
                <option value="Avec une seule puce">{t('smartphone:single_sim', 'Una sola ranura')}</option>
                <option value="Avec double puce">{t('smartphone:dual_sim', 'Doble ranura')}</option>
                <option value="Avec triple puce">{t('smartphone:triple_sim', 'Triple ranura')}</option>
                <option value="Avec eSIM + SIM physique">{t('smartphone:esim_physical', 'eSIM + SIM físico')}</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card>

      {/* 🔋 BATERÍA Y OTROS */}
      <Card className="p-3 mb-3">
        <Card.Title className="mb-3">🔋 {t('smartphone:battery_other', 'Batería y Otros')}</Card.Title>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label style={rtlStyles.formLabel}>
                🔋 {t('smartphone:battery_capacity', 'Capacidad de batería')}
              </Form.Label>
              <Form.Control
                type="text"
                name="bateria"
                value={postData.bateria || ''}
                onChange={handleChangeInput}
                placeholder={t('smartphone:battery_placeholder', 'Ej: 4000 mAh')}
                style={rtlStyles.formControl}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label style={rtlStyles.formLabel}>
                ⚡ {t('smartphone:charging_type', 'Tipo de carga')}
              </Form.Label>
              <Form.Select
                name="charging_type"
                value={postData.charging_type || ''}
                onChange={handleChangeInput}
                style={rtlStyles.formControl}
              >
                <option value="">{t('smartphone:select_charging', 'Seleccione tipo')}</option>
                <option value="Cable">{t('smartphone:cable_charging', 'Carga por cable')}</option>
                <option value="Inalámbrico">{t('smartphone:wireless_charging', 'Carga inalámbrica')}</option>
                <option value="Rápida">{t('smartphone:fast_charging', 'Carga rápida')}</option>
                <option value="Super Rápida">{t('smartphone:super_fast_charging', 'Carga super rápida')}</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Smartphones;