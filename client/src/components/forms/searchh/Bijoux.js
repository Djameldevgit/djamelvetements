import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Bijoux = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('oro');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* TIPO PRINCIPAL DE BIJOUX */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          💎 {t('jewelry_type', 'Tipo de joyería')}
        </Form.Label>
        <Form.Select
          name="subCategory"
          value={postData.subCategory}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">{t('select_subcategory', 'Selecciona la subcategoría')}</option>
          
          {/* CONJUNTOS Y PARURES */}
          <optgroup label={t('sets_parures', 'Conjuntos y Parures')}>
            <option value="parures_completes">{t('complete_sets', 'Parures completas')}</option>
            <option value="parures_mariage">{t('wedding_sets', 'Conjuntos de boda')}</option>
            <option value="parures_soiree">{t('evening_sets', 'Conjuntos de noche')}</option>
            <option value="coffrets">{t('jewelry_sets', 'Cofres de joyería')}</option>
          </optgroup>
          
          {/* COLLARES Y COLGANTES */}
          <optgroup label={t('necklaces_pendants', 'Collares y Colgantes')}>
            <option value="colliers">{t('necklaces', 'Collares')}</option>
            <option value="pendentifs">{t('pendants', 'Colgantes')}</option>
            <option value="sautoirs">{t('sautoirs', 'Sautoirs')}</option>
            <option value="ras_de_cou">{t('chokers', 'Gargantillas')}</option>
            <option value="colliers_pierre">{t('gemstone_necklaces', 'Collares con piedras')}</option>
          </optgroup>
          
          {/* PULSERAS Y BRAZALETES */}
          <optgroup label={t('bracelets_bangles', 'Pulseras y Brazaletes')}>
            <option value="bracelets">{t('bracelets', 'Pulseras')}</option>
            <option value="bracelets_charme">{t('charm_bracelets', 'Pulseras de dijes')}</option>
            <option value="bracelets_pierre">{t('gemstone_bracelets', 'Pulseras con piedras')}</option>
            <option value="bracelets_cheville">{t('ankle_bracelets', 'Tobilleras')}</option>
            <option value="bracelets_main">{t('hand_bracelets', 'Pulseras de mano')}</option>
          </optgroup>
          
          {/* ANILLOS */}
          <optgroup label={t('rings', 'Anillos')}>
            <option value="bagues">{t('rings', 'Anillos')}</option>
            <option value="alliances">{t('wedding_bands', 'Alianzas')}</option>
            <option value="bagues_fiancailles">{t('engagement_rings', 'Anillos de compromiso')}</option>
            <option value="bagues_pierre">{t('gemstone_rings', 'Anillos con piedras')}</option>
            <option value="chevalieres">{t('signet_rings', 'Anillos de sello')}</option>
          </optgroup>
          
          {/* ARETES */}
          <optgroup label={t('earrings', 'Aretes')}>
            <option value="boucles_oreilles">{t('earrings', 'Aretes')}</option>
            <option value="creoles">{t('hoop_earrings', 'Aretes de aro')}</option>
            <option value="pendentifs_oreille">{t('drop_earrings', 'Aretes colgantes')}</option>
            <option value="clous_d_oreilles">{t('stud_earrings', 'Aretes de tornillo')}</option>
            <option value="boucles_pierre">{t('gemstone_earrings', 'Aretes con piedras')}</option>
          </optgroup>
          
          {/* PIERCINGS */}
          <optgroup label={t('piercings', 'Piercings')}>
            <option value="piercings_nez">{t('nose_piercings', 'Piercings de nariz')}</option>
            <option value="piercings_oreille">{t('ear_piercings', 'Piercings de oreja')}</option>
            <option value="piercings_langue">{t('tongue_piercings', 'Piercings de lengua')}</option>
            <option value="piercings_nombril">{t('navel_piercings', 'Piercings de ombligo')}</option>
            <option value="piercings_sourcil">{t('eyebrow_piercings', 'Piercings de ceja')}</option>
          </optgroup>
          
          {/* ACCESORIOS PARA EL CABELLO */}
          <optgroup label={t('hair_accessories', 'Accesorios para el cabello')}>
            <option value="barrettes">{t('hair_clips', 'Horquillas')}</option>
            <option value="diademes">{t('tiaras', 'Diademas')}</option>
            <option value="serre_tete">{t('headbands', 'Cintas para el cabello')}</option>
            <option value="epingles">{t('hair_pins', 'Pinzas para el cabello')}</option>
            <option value="accessoires_cheveux_art">{t('artistic_hair', 'Accesorios artísticos')}</option>
          </optgroup>
          
          {/* OTROS ACCESORIOS */}
          <optgroup label={t('other_accessories', 'Otros accesorios')}>
            <option value="broches">{t('brooches', 'Broches')}</option>
            <option value="montres_bijou">{t('jewelry_watches', 'Relojes de joyería')}</option>
            <option value="ceintures_bijou">{t('jewelry_belts', 'Cinturones de joyería')}</option>
            <option value="lunettes_bijou">{t('jewelry_glasses', 'Gafas de joyería')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

      {/* CARACTERÍSTICAS DEL MATERIAL */}
      <Row className="g-3">
        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('material_type', 'Tipo de material')}
            </Form.Label>
            <Form.Select
              name="tipomaterialbijoux"
              value={postData.tipomaterialbijoux}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select_material', 'Selecciona material')}</option>
              <option value="or">{t('gold', 'Oro')}</option>
              <option value="argent">{t('silver', 'Plata')}</option>
              <option value="platine">{t('platinum', 'Platino')}</option>
              <option value="acier">{t('steel', 'Acero')}</option>
              <option value="laiton">{t('brass', 'Latón')}</option>
              <option value="bronze">{t('bronze', 'Bronce')}</option>
              <option value="pierre_naturelle">{t('natural_stone', 'Piedra natural')}</option>
              <option value="pierre_synthetique">{t('synthetic_stone', 'Piedra sintética')}</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('gemstone_type', 'Tipo de piedra')}
            </Form.Label>
            <Form.Select
              name="tipopiedra"
              value={postData.tipopiedra}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select_gemstone', 'Selecciona piedra')}</option>
              <option value="diamant">{t('diamond', 'Diamante')}</option>
              <option value="rubis">{t('ruby', 'Rubí')}</option>
              <option value="emeraude">{t('emerald', 'Esmeralda')}</option>
              <option value="saphir">{t('sapphire', 'Zafiro')}</option>
              <option value="amethyste">{t('amethyst', 'Amatista')}</option>
              <option value="topaze">{t('topaz', 'Topacio')}</option>
              <option value="perle">{t('pearl', 'Perla')}</option>
              <option value="turquoise">{t('turquoise', 'Turquesa')}</option>
              <option value="ambre">{t('amber', 'Ámbar')}</option>
              <option value="cristal">{t('crystal', 'Cristal')}</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

     

      <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
        {t('choose_jewelry_type', 'Elige el tipo de joyería y especifica sus características')}
      </Form.Text>
    </div>
  );
};

export default React.memo(Bijoux);