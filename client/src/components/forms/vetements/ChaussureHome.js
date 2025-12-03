import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ChaussuresHomme = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('chaussureshomme');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* TIPO PRINCIPAL DE ZAPATOS PARA HOMBRE */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          👞 {t('mens_shoes', 'Zapatos Hombre')}
        </Form.Label>
        <Form.Select
          name="tipoArticulo"
          value={postData.tipoArticulo}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">{t('select_subcategory', 'Selecciona la subcategoría')}</option>
          
          {/* ZAPATILLAS DEPORTIVAS */}
          <optgroup label={t('sneakers', 'Zapatillas Deportivas')}>
            <option value="baskets_course">{t('running_shoes', 'Zapatillas de Running')}</option>
            <option value="baskets_basket">{t('basketball_shoes', 'Zapatillas de Baloncesto')}</option>
            <option value="baskets_football">{t('soccer_shoes', 'Zapatillas de Fútbol')}</option>
            <option value="baskets_training">{t('training_shoes', 'Zapatillas de Entrenamiento')}</option>
            <option value="baskets_lifestyle">{t('lifestyle_sneakers', 'Zapatillas Casuales')}</option>
            <option value="baskets_skate">{t('skate_shoes', 'Zapatillas de Skate')}</option>
            <option value="baskets_hautes">{t('high_top_sneakers', 'Zapatillas Alto Top')}</option>
            <option value="baskets_tennis">{t('tennis_shoes', 'Zapatillas de Tenis')}</option>
          </optgroup>
          
          {/* BOTAS */}
          <optgroup label={t('boots', 'Botas')}>
            <option value="bottes_cuir">{t('leather_boots', 'Botas de Cuero')}</option>
            <option value="bottes_rangers">{t('combat_boots', 'Botas Militares')}</option>
            <option value="bottes_hiver">{t('winter_boots', 'Botas de Invierno')}</option>
            <option value="bottes_work">{t('work_boots', 'Botas de Trabajo')}</option>
            <option value="bottes_chelsea">{t('chelsea_boots', 'Botas Chelsea')}</option>
            <option value="bottes_chukka">{t('chukka_boots', 'Botas Chukka')}</option>
            <option value="bottes_montagne">{t('hiking_boots', 'Botas de Senderismo')}</option>
            <option value="bottes_motard">{t('biker_boots', 'Botas de Motero')}</option>
          </optgroup>
          
          {/* ZAPATOS CLÁSICOS */}
          <optgroup label={t('dress_shoes', 'Zapatos Clásicos')}>
            <option value="derbies">{t('derby_shoes', 'Derbys')}</option>
            <option value="oxfords">{t('oxford_shoes', 'Oxfords')}</option>
            <option value="brogues">{t('brogue_shoes', 'Brogues')}</option>
            <option value="richelieus">{t('lace_up_shoes', 'Richelieu')}</option>
            <option value="escarpins_homme">{t('dress_slippers', 'Zapatos de Vestir')}</option>
            <option value="chaussures_affaires">{t('business_shoes', 'Zapatos de Negocios')}</option>
            <option value="chaussures_ceremonie">{t('ceremony_shoes', 'Zapatos de Ceremonia')}</option>
          </optgroup>
          
          {/* MOCASINES */}
          <optgroup label={t('loafers', 'Mocasines')}>
            <option value="mocassins_classiques">{t('classic_loafers', 'Mocasines Clásicos')}</option>
            <option value="mocassins_driving">{t('driving_loafers', 'Mocasines de Conducir')}</option>
            <option value="mocassins_guingamp">{t('penny_loafers', 'Penny Loafers')}</option>
            <option value="mocassins_tassel">{t('tassel_loafers', 'Mocasines con Borlas')}</option>
            <option value="mocassins_velours">{t('suede_loafers', 'Mocasines de Ante')}</option>
          </optgroup>
          
          {/* SANDALIAS */}
          <optgroup label={t('sandals', 'Sandalias')}>
            <option value="sandales_ville">{t('city_sandals', 'Sandalias Urbanas')}</option>
            <option value="sandales_plage">{t('beach_sandals', 'Sandalias de Playa')}</option>
            <option value="sandales_sport">{t('sport_sandals', 'Sandalias Deportivas')}</option>
            <option value="sandales_randonnee">{t('hiking_sandals', 'Sandalias de Senderismo')}</option>
            <option value="nu_pieds">{t('flip_flops', 'Chanclas')}</option>
            <option value="sandales_gladiateur">{t('gladiator_sandals', 'Sandalias Gladiador')}</option>
          </optgroup>
          
          {/* ZAPATILLAS Y PANTUFLAS */}
          <optgroup label={t('slippers', 'Zapatillas y Pantuflas')}>
            <option value="pantoufles_maison">{t('house_slippers', 'Pantuflas de Casa')}</option>
            <option value="chaussons_cuir">{t('leather_slippers', 'Zapatillas de Cuero')}</option>
            <option value="mules_homme">{t('mules', 'Mulas')}</option>
            <option value="chaussons_douillets">{t('comfort_slippers', 'Zapatillas Cómodas')}</option>
            <option value="pantoufles_bain">{t('bath_slippers', 'Pantuflas de Baño')}</option>
          </optgroup>
          
          {/* ZAPATOS ESPECIALES */}
          <optgroup label={t('special_shoes', 'Zapatos Especiales')}>
            <option value="chaussures_securite">{t('safety_shoes', 'Zapatos de Seguridad')}</option>
            <option value="chaussures_medicales">{t('medical_shoes', 'Zapatos Médicos')}</option>
            <option value="chaussures_orthopediques">{t('orthopedic_shoes', 'Zapatos Ortopédicos')}</option>
            <option value="chaussures_taille_grande">{t('big_size_shoes', 'Zapatos de Talla Grande')}</option>
            <option value="chaussures_traditionnelles">{t('traditional_shoes', 'Zapatos Tradicionales')}</option>
          </optgroup>
          
          {/* CALZADO DE TEMPORADA */}
          <optgroup label={t('seasonal_footwear', 'Calzado de Temporada')}>
            <option value="apres_ski">{t('after_ski_boots', 'Botas de After-Ski')}</option>
            <option value="chaussures_pluie">{t('rain_shoes', 'Zapatos para Lluvia')}</option>
            <option value="bottes_neige">{t('snow_boots', 'Botas de Nieve')}</option>
            <option value="sandales_ete">{t('summer_shoes', 'Calzado de Verano')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

 
      

      {/* CARACTERÍSTICAS ESPECÍFICAS */}
      <Row className="g-3">
        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('sole_type', 'Tipo de suela')}
            </Form.Label>
            <Form.Select
              name="tipodesuela"
              value={postData.tipodesuela}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select_sole', 'Selecciona suela')}</option>
              <option value="caoutchouc">{t('rubber_sole', 'Suela de Caucho')}</option>
              <option value="crepe">{t('crepe_sole', 'Suela de Crepe')}</option>
              <option value="cuir">{t('leather_sole', 'Suela de Cuero')}</option>
              <option value="gomme">{t('gum_sole', 'Suela de Goma')}</option>
              <option value="eva">{t('eva_sole', 'Suela de EVA')}</option>
              <option value="polyurethane">{t('polyurethane_sole', 'Suela de Poliuretano')}</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('closure_type', 'Tipo de cierre')}
            </Form.Label>
            <Form.Select
              name="tipodecierre"
              value={postData.tipodecierre}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select_closure', 'Selecciona cierre')}</option>
              <option value="lacets">{t('laces', 'Cordones')}</option>
              <option value="velcro">{t('velcro', 'Velcro')}</option>
              <option value="fermeture_eclair">{t('zipper', 'Cremallera')}</option>
              <option value="slip_on">{t('slip_on', 'Slip-On')}</option>
              <option value="buckle">{t('buckle', 'Hebilla')}</option>
              <option value="elastic">{t('elastic', 'Elástico')}</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
        {t('choose_mens_shoes', 'Elige el tipo de zapatos para hombre y especifica sus características')}
      </Form.Text>
    </div>
  );
};

export default React.memo(ChaussuresHomme);