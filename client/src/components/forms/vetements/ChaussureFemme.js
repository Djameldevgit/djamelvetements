import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ChaussuresFemme = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('chaussuresfemme');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* TIPO PRINCIPAL DE ZAPATOS PARA MUJER */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          👠 {t('womens_shoes', 'Zapatos Mujer')}
        </Form.Label>
        <Form.Select
          name="tipoArticulo"
          value={postData.tipoArticulo}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">{t('select_subcategory', 'Selecciona la subcategoría')}</option>
          
          {/* TACONES Y STILETTOS */}
          <optgroup label={t('heels_stilettos', 'Tacones y Stilettos')}>
            <option value="escarpins_hauts">{t('high_heels', 'Tacones Altos')}</option>
            <option value="escarpins_moyens">{t('medium_heels', 'Tacones Medios')}</option>
            <option value="escarpins_bas">{t('low_heels', 'Tacones Bajos')}</option>
            <option value="stilettos">{t('stilettos', 'Stilettos')}</option>
            <option value="talons_aiguilles">{t('needle_heels', 'Tacones de Aguja')}</option>
            <option value="talons_compenses">{t('wedge_heels', 'Cuñas')}</option>
            <option value="talons_blocs">{t('block_heels', 'Tacones de Bloque')}</option>
            <option value="talons_kitten">{t('kitten_heels', 'Tacones Gatito')}</option>
            <option value="escarpins_soiree">{t('evening_heels', 'Tacones de Noche')}</option>
            <option value="escarpins_travail">{t('work_heels', 'Tacones de Trabajo')}</option>
            <option value="escarpins_bout_ouvert">{t('open_toe_heels', 'Tacones Punta Abierta')}</option>
            <option value="escarpins_bout_ferme">{t('closed_toe_heels', 'Tacones Punta Cerrada')}</option>
          </optgroup>

          {/* SANDALIAS */}
          <optgroup label={t('sandals', 'Sandalias')}>
            <option value="sandales_talons">{t('heeled_sandals', 'Sandalias con Tacón')}</option>
            <option value="sandales_plates">{t('flat_sandals', 'Sandalias Planas')}</option>
            <option value="sandales_compensees">{t('wedge_sandals', 'Sandalias con Cuña')}</option>
            <option value="sandales_ete">{t('summer_sandals', 'Sandalias de Verano')}</option>
            <option value="sandales_plateforme">{t('platform_sandals', 'Sandalias Plataforma')}</option>
            <option value="mules">{t('mules', 'Mules')}</option>
            <option value="tongs">{t('flip_flops', 'Chancletas')}</option>
            <option value="sandales_romaines">{t('gladiator_sandals', 'Sandalias Gladiadoras')}</option>
            <option value="sandales_orthopediques">{t('orthopedic_sandals', 'Sandalias Ortopédicas')}</option>
            <option value="sandales_plage">{t('beach_sandals', 'Sandalias de Playa')}</option>
            <option value="sandales_ville">{t('city_sandals', 'Sandalias Urbanas')}</option>
          </optgroup>

          {/* BAILARINAS Y PLANOS */}
          <optgroup label={t('flats_ballerinas', 'Bailarinas y Planos')}>
            <option value="ballerines">{t('ballet_flats', 'Bailarinas')}</option>
            <option value="flats">{t('flats', 'Zapatos Planos')}</option>
            <option value="moccasins_femme">{t('moccasins', 'Mocasines')}</option>
            <option value="loafers_femme">{t('loafers', 'Loafers')}</option>
            <option value="ballerines_plateforme">{t('platform_ballet', 'Bailarinas Plataforma')}</option>
            <option value="ballerines_pailletees">{t('sequin_ballet', 'Bailarinas de Lentejuelas')}</option>
            <option value="ballerines_broderie">{t('embroidered_ballet', 'Bailarinas Bordadas')}</option>
            <option value="ballerines_lacets">{t('lace_up_ballet', 'Bailarinas de Cordones')}</option>
            <option value="ballerines_velours">{t('velvet_ballet', 'Bailarinas de Terciopelo')}</option>
            <option value="ballerines_perforees">{t('perforated_ballet', 'Bailarinas Perforadas')}</option>
          </optgroup>

          {/* BOTAS */}
          <optgroup label={t('boots', 'Botas')}>
            <option value="bottes_talons">{t('heeled_boots', 'Botas con Tacón')}</option>
            <option value="bottes_plates">{t('flat_boots', 'Botas Planas')}</option>
            <option value="bottes_courtes">{t('ankle_boots', 'Botas Cortas')}</option>
            <option value="bottes_longues">{t('long_boots', 'Botas Largas')}</option>
            <option value="bottes_montantes">{t('riding_boots', 'Botas de Montar')}</option>
            <option value="bottes_fourrees">{t('lined_boots', 'Botas Forradas')}</option>
            <option value="bottes_cheville">{t('booties', 'Botines')}</option>
            <option value="bottes_moto">{t('biker_boots', 'Botas Moteras')}</option>
            <option value="bottes_hiver">{t('winter_boots', 'Botas de Invierno')}</option>
            <option value="bottes_pluie">{t('rain_boots', 'Botas de Lluvia')}</option>
            <option value="bottes_cuir">{t('leather_boots', 'Botas de Cuero')}</option>
            <option value="bottes_suede">{t('suede_boots', 'Botas de Ante')}</option>
          </optgroup>

          {/* ZAPATILLAS Y DEPORTE */}
          <optgroup label={t('sneakers_sport', 'Zapatillas y Deporte')}>
            <option value="baskets_femme">{t('sneakers', 'Zapatillas Deportivas')}</option>
            <option value="baskets_mode">{t('fashion_sneakers', 'Zapatillas de Moda')}</option>
            <option value="baskets_sport">{t('sport_sneakers', 'Zapatillas Deportivas')}</option>
            <option value="running_femme">{t('running_shoes', 'Running')}</option>
            <option value="training_femme">{t('training_shoes', 'Training')}</option>
            <option value="baskets_plateforme">{t('platform_sneakers', 'Zapatillas Plataforma')}</option>
            <option value="baskets_converse">{t('converse_sneakers', 'Zapatillas Converse')}</option>
            <option value="baskets_vans">{t('vans_sneakers', 'Zapatillas Vans')}</option>
            <option value="baskets_basket">{t('basketball_shoes', 'Zapatillas de Baloncesto')}</option>
            <option value="baskets_fitness">{t('fitness_shoes', 'Zapatillas de Fitness')}</option>
            <option value="baskets_yoga">{t('yoga_shoes', 'Zapatillas de Yoga')}</option>
            <option value="baskets_tennis">{t('tennis_shoes', 'Zapatillas de Tenis')}</option>
          </optgroup>

          {/* ZAPATOS CERRADOS */}
          <optgroup label={t('closed_shoes', 'Zapatos Cerrados')}>
            <option value="derbies_femme">{t('derbies', 'Derbys')}</option>
            <option value="richelieus_femme">{t('oxfords', 'Oxfords')}</option>
            <option value="brogues_femme">{t('brogues', 'Brogues')}</option>
            <option value="chaussures_lacets">{t('lace_up_shoes', 'Zapatos de Cordones')}</option>
            <option value="chaussures_bout_pointu">{t('pointy_toe_shoes', 'Zapatos de Punta')}</option>
            <option value="chaussures_bout_rond">{t('round_toe_shoes', 'Zapatos de Punta Redonda')}</option>
            <option value="chaussures_bout_carre">{t('square_toe_shoes', 'Zapatos de Punta Cuadrada')}</option>
            <option value="chaussures_affaires">{t('business_shoes', 'Zapatos de Negocios')}</option>
            <option value="chaussures_classiques">{t('classic_shoes', 'Zapatos Clásicos')}</option>
          </optgroup>

          {/* ZAPATILLAS Y PANTUFLAS */}
          <optgroup label={t('slippers_house', 'Zapatillas y Pantuflas')}>
            <option value="tongues_maison">{t('house_slippers', 'Zapatillas de Casa')}</option>
            <option value="pantoufles">{t('slippers', 'Pantuflas')}</option>
            <option value="chaussons">{t('indoor_slippers', 'Zapatillas')}</option>
            <option value="claquettes">{t('flip_flops', 'Chancletas')}</option>
            <option value="tongues_ville">{t('urban_slippers', 'Zapatillas Urbanas')}</option>
            <option value="pantoufles_chauffantes">{t('heated_slippers', 'Pantuflas Calefactables')}</option>
            <option value="chaussons_massage">{t('massage_slippers', 'Zapatillas de Masaje')}</option>
            <option value="pantoufles_bain">{t('bath_slippers', 'Pantuflas de Baño')}</option>
          </optgroup>

          {/* ZAPATOS TRADICIONALES */}
          <optgroup label={t('traditional_shoes', 'Zapatos Tradicionales')}>
            <option value="babouches_femme">{t('babouches', 'Babuchas')}</option>
            <option value="chaussures_broderie">{t('embroidered_shoes', 'Zapatos Bordados')}</option>
            <option value="chaussures_orientales">{t('oriental_shoes', 'Zapatos Orientales')}</option>
            <option value="sarfils">{t('sarfils', 'Sarfiles')}</option>
            <option value="mules_traditionnelles">{t('traditional_mules', 'Mules Tradicionales')}</option>
            <option value="chaussures_berberes">{t('berber_shoes', 'Zapatos Bereberes')}</option>
            <option value="chaussures_indiennes">{t('indian_shoes', 'Zapatos Indios')}</option>
            <option value="chaussures_africaines">{t('african_shoes', 'Zapatos Africanos')}</option>
          </optgroup>

          {/* ZAPATOS ESPECIALES */}
          <optgroup label={t('special_shoes', 'Zapatos Especiales')}>
            <option value="chaussures_mariage">{t('wedding_shoes', 'Zapatos de Novia')}</option>
            <option value="chaussures_soiree">{t('evening_shoes', 'Zapatos de Fiesta')}</option>
            <option value="chaussures_fete">{t('party_shoes', 'Zapatos de Celebración')}</option>
            <option value="chaussures_danse">{t('dance_shoes', 'Zapatos de Baile')}</option>
            <option value="chaussures_scene">{t('stage_shoes', 'Zapatos de Escenario')}</option>
            <option value="chaussures_maternite">{t('maternity_shoes', 'Zapatos de Maternidad')}</option>
            <option value="chaussures_orthopediques">{t('orthopedic_shoes', 'Zapatos Ortopédicos')}</option>
            <option value="chaussures_confort">{t('comfort_shoes', 'Zapatos de Confort')}</option>
            <option value="chaussures_taille_grande">{t('large_size_shoes', 'Zapatos de Talla Grande')}</option>
          </optgroup>

          {/* CALZADO DE TEMPORADA */}
          <optgroup label={t('seasonal_footwear', 'Calzado de Temporada')}>
            <option value="chaussures_ete">{t('summer_shoes', 'Calzado de Verano')}</option>
            <option value="chaussures_hiver">{t('winter_shoes', 'Calzado de Invierno')}</option>
            <option value="chaussures_printemps">{t('spring_shoes', 'Calzado de Primavera')}</option>
            <option value="chaussures_automne">{t('autumn_shoes', 'Calzado de Otoño')}</option>
            <option value="chaussures_pluie">{t('rain_shoes', 'Calzado para Lluvia')}</option>
            <option value="chaussures_neige">{t('snow_shoes', 'Calzado para Nieve')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

      {/* TALLA Y TACÓN */}
      <Row className="g-3">
         

        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('heel_height', 'Altura de tacón')}
            </Form.Label>
            <Form.Select
              name="alturatacon"
              value={postData.alturatacon}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select_heel', 'Selecciona altura')}</option>
              <option value="flat">{t('flat', 'Plano (0 cm)')}</option>
              <option value="low">{t('low_heel', 'Bajo (1-3 cm)')}</option>
              <option value="medium">{t('medium_heel', 'Medio (4-6 cm)')}</option>
              <option value="high">{t('high_heel', 'Alto (7-9 cm)')}</option>
              <option value="very_high">{t('very_high_heel', 'Muy alto (10+ cm)')}</option>
              <option value="platform">{t('platform', 'Plataforma')}</option>
              <option value="wedge">{t('wedge', 'Cuña')}</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
 

      

      {/* CARACTERÍSTICAS ESPECÍFICAS */}
      <Row className="g-3">
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
              <option value="slip_on">{t('slip_on', 'Slip-On')}</option>
              <option value="lacets">{t('laces', 'Cordones')}</option>
              <option value="fermeture_eclair">{t('zipper', 'Cremallera')}</option>
              <option value="boucle">{t('buckle', 'Hebilla')}</option>
              <option value="velcro">{t('velcro', 'Velcro')}</option>
              <option value="sans_fermeture">{t('no_closure', 'Sin Cierre')}</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('toe_shape', 'Forma de la punta')}
            </Form.Label>
            <Form.Select
              name="formadepunta"
              value={postData.formadepunta}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select_toe', 'Selecciona punta')}</option>
              <option value="pointu">{t('pointy', 'Puntiaguda')}</option>
              <option value="rond">{t('round', 'Redonda')}</option>
              <option value="carre">{t('square', 'Cuadrada')}</option>
              <option value="ovale">{t('oval', 'Ovalada')}</option>
              <option value="ouvert">{t('open', 'Abierta')}</option>
              <option value="almond">{t('almond', 'Almendra')}</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
        {t('choose_womens_shoes', 'Elige el tipo de zapatos para mujer y especifica sus características')}
      </Form.Text>
    </div>
  );
};

export default React.memo(ChaussuresFemme);