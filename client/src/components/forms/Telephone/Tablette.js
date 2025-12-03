import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Tablettes = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('telephones');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* TIPO PRINCIPAL DE TABLETTE */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          💻 {t('tablet_type', 'Tipo de tablette')}
        </Form.Label>
        <Form.Select
          name="tipoArticulo"
          value={postData.tipoArticulo}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
          required
        >
          <option value="">{t('select_subcategory', 'Selecciona el tipo de tablette')}</option>
          
          {/* iPAD */}
          <optgroup label="🍎 iPad">
            <option value="iPad Pro 11/12.9">{t('ipad_pro', 'iPad Pro 11" / 12.9"')}</option>
            <option value="iPad Air">{t('ipad_air', 'iPad Air')}</option>
            <option value="iPad 10ème génération">{t('ipad_10th', 'iPad 10ème génération')}</option>
            <option value="iPad 9ème génération">{t('ipad_9th', 'iPad 9ème génération')}</option>
            <option value="iPad mini">{t('ipad_mini', 'iPad mini')}</option>
            <option value="iPad d'occasion">{t('ipad_used', 'iPad d\'occasion')}</option>
            <option value="iPad reconditionné">{t('ipad_refurbished', 'iPad reconditionné')}</option>
          </optgroup>
          
          {/* TABLETTES ANDROID */}
          <optgroup label="🤖 Tablettes Android">
            <option value="Samsung Galaxy Tab S">{t('samsung_tab_s', 'Samsung Galaxy Tab S/S+/Ultra')}</option>
            <option value="Samsung Galaxy Tab A">{t('samsung_tab_a', 'Samsung Galaxy Tab A')}</option>
            <option value="Lenovo Tab">{t('lenovo_tab', 'Lenovo Tab P/M Series')}</option>
            <option value="Xiaomi Pad">{t('xiaomi_pad', 'Xiaomi Pad 6/Pro')}</option>
            <option value="Huawei MatePad">{t('huawei_matepad', 'Huawei MatePad')}</option>
            <option value="Realme Pad">{t('realme_pad', 'Realme Pad')}</option>
            <option value="Tablette Android générique">{t('generic_android', 'Tablette Android générique')}</option>
          </optgroup>
          
          {/* TABLETTES WINDOWS */}
          <optgroup label="⊞ Tablettes Windows">
            <option value="Microsoft Surface Pro">{t('surface_pro', 'Microsoft Surface Pro')}</option>
            <option value="Microsoft Surface Go">{t('surface_go', 'Microsoft Surface Go')}</option>
            <option value="Tablette Windows 2-en-1">{t('windows_2in1', 'Tablette Windows 2-en-1')}</option>
            <option value="Tablette avec clavier détachable">{t('detachable_keyboard', 'Avec clavier détachable')}</option>
            <option value="Tablette Windows gaming">{t('windows_gaming', 'Tablette Windows gaming')}</option>
          </optgroup>
          
          {/* TABLETTES SPÉCIALISÉES */}
          <optgroup label="🎯 Tablettes spécialisées">
            <option value="Tablette gaming">{t('gaming_tablet', 'Tablette gaming (Razer, etc.)')}</option>
            <option value="Tablette lecture">{t('reading_tablet', 'Tablette lecture (Kindle, Kobo)')}</option>
            <option value="Tablette dessin">{t('drawing_tablet', 'Tablette dessin numérique (Wacom)')}</option>
            <option value="Tablette enfant">{t('kids_tablet', 'Tablette pour enfant')}</option>
            <option value="Tablette senior">{t('senior_tablet', 'Tablette pour senior')}</option>
            <option value="Tablette professionnelle">{t('pro_tablet', 'Tablette professionnelle')}</option>
            <option value="Tablette économique">{t('budget_tablet', 'Tablette économique')}</option>
          </optgroup>
          
          {/* TABLETTES PLIABLES */}
          <optgroup label="📲 Tablettes pliables">
            <option value="Tablette pliable">{t('foldable_tablet', 'Tablette pliable')}</option>
            <option value="Smartphone pliable tablette">{t('foldable_phone_tablet', 'Smartphone pliable tablette')}</option>
          </optgroup>
          
          {/* TABLETTES ANCIENNES */}
          <optgroup label="🕰️ Tablettes anciennes">
            <option value="iPad ancien modèle">{t('old_ipad', 'iPad ancien modèle')}</option>
            <option value="Tablette Android ancienne">{t('old_android', 'Tablette Android ancienne')}</option>
            <option value="Tablette Windows RT">{t('windows_rt', 'Tablette Windows RT')}</option>
            <option value="Tablette BlackBerry">{t('blackberry_tablet', 'Tablette BlackBerry')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

      {/* CARACTERÍSTIQUES TECHNIQUES (OPCIONALES) */}
      <Row className="g-3">
        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              📏 {t('screen_size', 'Taille d\'écran')}
            </Form.Label>
            <Form.Select
              name="tailleEcranTablette"
              value={postData.tailleEcranTablette}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('optional', 'Optionnel')}</option>
              <option value="7 pouces">7" (17.8 cm)</option>
              <option value="8 pouces">8" (20.3 cm)</option>
              <option value="9 pouces">9" (22.9 cm)</option>
              <option value="10 pouces">10" (25.4 cm)</option>
              <option value="10.1 pouces">10.1" (25.7 cm)</option>
              <option value="10.5 pouces">10.5" (26.7 cm)</option>
              <option value="11 pouces">11" (27.9 cm)</option>
              <option value="12 pouces">12" (30.5 cm)</option>
              <option value="12.9 pouces">12.9" (32.8 cm)</option>
              <option value="13 pouces">13" (33.0 cm)</option>
              <option value="14 pouces+">14"+ (35.6 cm+)</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              🛡️ {t('tablet_condition', 'État')}
            </Form.Label>
            <Form.Select
              name="etatTablette"
              value={postData.etatTablette}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('optional', 'Optionnel')}</option>
              <option value="Neuf">🆕 {t('new', 'Neuf')}</option>
              <option value="Comme neuf">✨ {t('like_new', 'Comme neuf')}</option>
              <option value="Très bon état">👍 {t('very_good', 'Très bon état')}</option>
              <option value="Bon état">✅ {t('good', 'Bon état')}</option>
              <option value="État correct">🆗 {t('fair', 'État correct')}</option>
              <option value="À réparer">🔧 {t('needs_repair', 'À réparer')}</option>
              <option value="Reconditionné">🔄 {t('refurbished', 'Reconditionné')}</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
        {t('tablet_selection_note', 'Sélectionnez le type de tablette. Les autres champs sont optionnels.')}
      </Form.Text>
    </div>
  );
};

export default React.memo(Tablettes);