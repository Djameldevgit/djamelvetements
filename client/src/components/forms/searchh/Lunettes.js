import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Lunettes = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('gafas');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* TIPO PRINCIPAL DE LENTES */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          👓 {t('glasses_type', 'Tipo de gafas')}
        </Form.Label>
        <Form.Select
          name="subCategory"
          value={postData.subCategory}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">{t('select_subcategory', 'Selecciona la subcategoría')}</option>
          
          {/* LENTES DE VISTA */}
          <optgroup label={t('prescription_glasses', 'Gafas de vista')}>
            <option value="lunettes_vue_hommes">{t('mens_prescription', 'Gafas de vista hombres')}</option>
            <option value="lunettes_vue_femmes">{t('womens_prescription', 'Gafas de vista mujeres')}</option>
            <option value="lunettes_vue_enfants">{t('kids_prescription', 'Gafas de vista niños')}</option>
            <option value="lunettes_vue_unisex">{t('unisex_prescription', 'Gafas de vista unisex')}</option>
          </optgroup>
          
          {/* GAFAS DE SOL */}
          <optgroup label={t('sunglasses', 'Gafas de sol')}>
            <option value="lunettes_soleil_hommes">{t('mens_sunglasses', 'Gafas de sol hombres')}</option>
            <option value="lunettes_soleil_femmes">{t('womens_sunglasses', 'Gafas de sol mujeres')}</option>
            <option value="lunettes_soleil_enfants">{t('kids_sunglasses', 'Gafas de sol niños')}</option>
            <option value="lunettes_soleil_designer">{t('designer_sunglasses', 'Gafas de sol de diseñador')}</option>
            <option value="lunettes_soleil_sport">{t('sport_sunglasses', 'Gafas de sol deportivas')}</option>
          </optgroup>
          
          {/* LENTES ESPECIALES */}
          <optgroup label={t('special_lenses', 'Lentes especiales')}>
            <option value="lunettes_ordinateur">{t('computer_glasses', 'Gafas para ordenador')}</option>
            <option value="lunettes_conduite">{t('driving_glasses', 'Gafas para conducir')}</option>
            <option value="lunettes_protection">{t('safety_glasses', 'Gafas de protección')}</option>
            <option value="lunettes_nuit">{t('night_glasses', 'Gafas para conducción nocturna')}</option>
          </optgroup>
          
          {/* ACCESORIOS */}
          <optgroup label={t('accessories', 'Accesorios')}>
            <option value="etuis_lunettes">{t('glasses_cases', 'Estuches para gafas')}</option>
            <option value="chiffons_lunettes">{t('cleaning_cloths', 'Paños de limpieza')}</option>
            <option value="cordons_lunettes">{t('glasses_chains', 'Cadenas para gafas')}</option>
            <option value="pieces_detachees">{t('spare_parts', 'Piezas de repuesto')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

     

      {/* TIPO DE LENTE */}
      <Row className="g-3">
        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('lens_type', 'Tipo de lente')}
            </Form.Label>
            <Form.Select
              name="tipodelente"
              value={postData.tipodelente}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select_lens_type', 'Selecciona tipo')}</option>
              <option value="monofocal">{t('single_vision', 'Monofocal')}</option>
              <option value="progressif">{t('progressive', 'Progresivo')}</option>
              <option value="bifocal">{t('bifocal', 'Bifocal')}</option>
              <option value="photochromique">{t('photochromic', 'Fotocromático')}</option>
              <option value="polarise">{t('polarized', 'Polarizado')}</option>
              <option value="anti_reflet">{t('anti_reflective', 'Antirreflejante')}</option>
              <option value="blue_light">{t('blue_light', 'Filtro luz azul')}</option>
            </Form.Select>
          </Form.Group>
        </Col>

        
      </Row>

      {/* MEDIDAS Y MARCAS */}
      <Row className="g-3">
    

        <Col md={4}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('bridge_width', 'Ancho del puente (mm)')}
            </Form.Label>
            <Form.Control
              type="number"
              name="anchopuente"
              value={postData.anchopuente}
              onChange={handleChangeInput}
              placeholder="18"
              min="14"
              max="24"
              className="form-control border-0 shadow-sm"
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('temple_length', 'Longitud patilla (mm)')}
            </Form.Label>
            <Form.Control
              type="text"
              name="langitudpatilla"
              value={postData.langitudpatilla}
              onChange={handleChangeInput}
              placeholder="140"
              min="120"
              max="160"
              className="form-control border-0 shadow-sm"
            />
          </Form.Group>
        </Col>
      </Row>

     
    </div>
  );
};

export default React.memo(Lunettes);