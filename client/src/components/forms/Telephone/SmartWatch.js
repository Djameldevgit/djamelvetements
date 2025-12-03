import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Smartwatchs = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('telephones');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* TIPO PRINCIPAL DE SMARTWATCH */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          ⌚ {t('smartwatch_type', 'Tipo de smartwatch')}
        </Form.Label>
        <Form.Select
          name="tipoArticulo"
          value={postData.tipoArticulo}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">{t('select_subcategory', 'Selecciona el tipo de smartwatch')}</option>
          
          {/* APPLE WATCH */}
          <optgroup label={t('apple_watch', 'Apple Watch')}>
            <option value="Apple Watch Series 9">{t('watch_series_9', 'Apple Watch Series 9')}</option>
            <option value="Apple Watch Ultra 2">{t('watch_ultra_2', 'Apple Watch Ultra 2')}</option>
            <option value="Apple Watch SE">{t('watch_se', 'Apple Watch SE')}</option>
            <option value="Apple Watch Hermès">{t('watch_hermes', 'Apple Watch Hermès')}</option>
          </optgroup>
          
          {/* SAMSUNG GALAXY WATCH */}
          <optgroup label={t('samsung_watch', 'Samsung Galaxy Watch')}>
            <option value="Galaxy Watch 6">{t('galaxy_watch_6', 'Galaxy Watch 6/6 Classic')}</option>
            <option value="Galaxy Watch 5 Pro">{t('galaxy_watch_5pro', 'Galaxy Watch 5 Pro')}</option>
            <option value="Galaxy Watch Active">{t('galaxy_active', 'Galaxy Watch Active')}</option>
          </optgroup>
          
          {/* FITNESS TRACKERS */}
          <optgroup label={t('fitness_trackers', 'Fitness Trackers')}>
            <option value="Fitbit Charge 6">{t('fitbit_charge6', 'Fitbit Charge 6')}</option>
            <option value="Garmin Forerunner">{t('garmin_forerunner', 'Garmin Forerunner')}</option>
            <option value="Xiaomi Mi Band">{t('xiaomi_miband', 'Xiaomi Mi Band 8/Pro')}</option>
            <option value="Huawei Band">{t('huawei_band', 'Huawei Band 8')}</option>
          </optgroup>
          
          {/* TYPES SPÉCIAUX */}
          <optgroup label={t('special_watches', 'Montres spéciales')}>
            <option value="Montre enfant">{t('kids_watch', 'Montre enfant avec GPS')}</option>
            <option value="Montre luxe">{t('luxury_watch', 'Montre luxe connectée')}</option>
            <option value="Montre sport">{t('sport_watch', 'Montre sport étanche')}</option>
            <option value="Montre santé">{t('health_watch', 'Montre santé avec ECG')}</option>
            <option value="Montre basique">{t('basic_watch', 'Montre connectée basique')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

      {/* CARACTERÍSTIQUES TECHNIQUES */}
      <Row className="g-3">
        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('watch_size', 'Taille d\'écran')}
            </Form.Label>
            <Form.Select
              name="tailleEcranWatch"
              value={postData.tailleEcranWatch}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select_screen_size', 'Sélectionnez taille')}</option>
              <option value="40mm">📱 40 mm</option>
              <option value="41mm">📱 41 mm</option>
              <option value="42mm">📱 42 mm</option>
              <option value="44mm">📱 44 mm</option>
              <option value="45mm">📱 45 mm</option>
              <option value="46mm">📱 46 mm</option>
              <option value="47mm">📱 47 mm</option>
              <option value="49mm">📱 49 mm</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('watch_features', 'Fonctionnalités')}
            </Form.Label>
            <Form.Select
              name="fonctionnalitesWatch"
              value={postData.fonctionnalitesWatch}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select_features', 'Sélectionnez fonctionnalités')}</option>
              <option value="GPS">🗺️ GPS</option>
              <option value="ECG">🫀 ECG</option>
              <option value="Oxymètre">🩸 Oxymètre</option>
              <option value="Paiement sans contact">💳 Paiement sans contact</option>
              <option value="Appels">📞 Appels téléphoniques</option>
              <option value="Étanche 50m">💧 Étanche 50m</option>
              <option value="Sport tracking">🏃 Suivi sportif</option>
              <option value="Sommeil">😴 Suivi sommeil</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
        {t('choose_watch_type', 'Sélectionnez le type de smartwatch et ses caractéristiques')}
      </Form.Text>
    </div>
  );
};

export default React.memo(Smartwatchs);