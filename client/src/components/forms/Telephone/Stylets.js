import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Stylets = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('telephones');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* TIPO PRINCIPAL DE STYLET */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          ✏️ {t('stylus_type', 'Tipo de stylet')}
        </Form.Label>
        <Form.Select
          name="tipoArticulo"
          value={postData.tipoArticulo}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">{t('select_subcategory', 'Selecciona el tipo de stylet')}</option>
          
          {/* APPLE PENCIL */}
          <optgroup label={t('apple_pencil', 'Apple Pencil')}>
            <option value="Apple Pencil 1ère génération">{t('apple_pencil_1', 'Apple Pencil 1ère génération')}</option>
            <option value="Apple Pencil 2ème génération">{t('apple_pencil_2', 'Apple Pencil 2ème génération')}</option>
            <option value="Apple Pencil USB-C">{t('apple_pencil_usbc', 'Apple Pencil USB-C')}</option>
            <option value="Accessoires Apple Pencil">{t('apple_pencil_accessories', 'Accessoires Apple Pencil')}</option>
          </optgroup>
          
          {/* SAMSUNG S PEN */}
          <optgroup label={t('samsung_spen', 'Samsung S Pen')}>
            <option value="S Pen Galaxy Tab">{t('spen_galaxy_tab', 'S Pen Galaxy Tab S/S+/Ultra')}</option>
            <option value="S Pen Galaxy Note">{t('spen_galaxy_note', 'S Pen Galaxy Note/Series')}</option>
            <option value="S Pen Fold Edition">{t('spen_fold', 'S Pen Fold Edition')}</option>
            <option value="S Pen Pro">{t('spen_pro', 'S Pen Pro')}</option>
          </optgroup>
          
          {/* STYLETS ACTIFS */}
          <optgroup label={t('active_stylus', 'Stylets actifs')}>
            <option value="Stylet actif Bluetooth">{t('stylus_active_bluetooth', 'Stylet actif avec Bluetooth')}</option>
            <option value="Stylet pression 8192 niveaux">{t('stylus_8192_pressure', 'Stylet pression 8192 niveaux')}</option>
            <option value="Stylet inclinaison">{t('stylus_tilt', 'Stylet avec détection d\'inclinaison')}</option>
            <option value="Stylet rechargeable">{t('stylus_rechargeable', 'Stylet rechargeable USB-C')}</option>
          </optgroup>
          
          {/* STYLETS PASSIFS */}
          <optgroup label={t('passive_stylus', 'Stylets passifs')}>
            <option value="Stylet capacitif standard">{t('stylus_capacitive', 'Stylet capacitif standard')}</option>
            <option value="Stylet avec pointe fine">{t('stylus_fine_tip', 'Stylet pointe fine (1.0mm)')}</option>
            <option value="Stylet avec gomme">{t('stylus_eraser', 'Stylet avec fonction gomme')}</option>
            <option value="Stylet à clip">{t('stylus_clip', 'Stylet avec clip de poche')}</option>
          </optgroup>
          
          {/* STYLETS SPÉCIAUX */}
          <optgroup label={t('special_stylus', 'Stylets spéciaux')}>
            <option value="Stylet gaming">{t('stylus_gaming', 'Stylet gaming avec RGB')}</option>
            <option value="Stylet dessin numérique">{t('stylus_drawing', 'Stylet pour dessin numérique')}</option>
            <option value="Stylet signature">{t('stylus_signature', 'Stylet signature électronique')}</option>
            <option value="Stylet enfant">{t('stylus_kids', 'Stylet enfant sécurisé')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

      {/* CARACTERÍSTIQUES TECHNIQUES */}
      <Row className="g-3">
        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('stylus_compatibility', 'Compatibilité')}
            </Form.Label>
            <Form.Select
              name="compatibiliteStylet"
              value={postData.compatibiliteStylet}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select_compatibility', 'Sélectionnez compatibilité')}</option>
              <option value="iPad">🍎 {t('ipad', 'iPad')}</option>
              <option value="Samsung">🔵 {t('samsung', 'Samsung Galaxy Tab')}</option>
              <option value="Android">🤖 {t('android_tablet', 'Tablette Android')}</option>
              <option value="Windows">⊞ {t('windows_tablet', 'Tablette Windows')}</option>
              <option value="Smartphone">📱 {t('smartphone', 'Smartphone')}</option>
              <option value="Universel">🌐 {t('universal', 'Tous appareils')}</option>
              <option value="Spécifique">🔧 {t('specific_model', 'Modèle spécifique')}</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('stylus_features', 'Fonctionnalités')}
            </Form.Label>
            <Form.Select
              name="caracteristiquesStylet"
              value={postData.caracteristiquesStylet}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select_features', 'Sélectionnez fonctionnalités')}</option>
              <option value="Pression sensible">{t('pressure_sensitive', 'Pression sensible')}</option>
              <option value="Inclinaison">{t('tilt_detection', 'Détection d\'inclinaison')}</option>
              <option value="Boutons programmables">{t('programmable_buttons', 'Boutons programmables')}</option>
              <option value="Fonction gomme">{t('eraser_function', 'Fonction gomme')}</option>
              <option value="Chargement sans fil">{t('wireless_charging', 'Chargement sans fil')}</option>
              <option value="Écran LCD">{t('lcd_screen', 'Écran LCD intégré')}</option>
              <option value="RGB">{t('rgb_lights', 'Éclairage RGB')}</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

     
    </div>
  );
};

export default React.memo(Stylets);