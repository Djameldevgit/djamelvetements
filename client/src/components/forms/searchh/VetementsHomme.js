import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const VetementsHomme = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('vetementshomme');
  const isRTL = i18n.language === 'ar';

  return (
    <Card className="border-0 rounded-0 mb-3 shadow-sm" dir={isRTL ? "rtl" : "ltr"}>
      <Card.Body className="p-4">
        {/* TIPO PRINCIPAL DE ROPA MASCULINA */}
        <Form.Group className="mb-4 w-100">
          <Form.Label className="fw-bold text-dark mb-3 fs-6" style={{ textAlign: isRTL ? 'right' : 'left' }}>
            👔 {t('mens_clothing')}
          </Form.Label>
          <Form.Select
            name="subCategory"
            value={postData.subCategory}
            onChange={handleChangeInput}
            className="form-control border-0 shadow-sm"
            style={{ 
              textAlign: isRTL ? 'right' : 'left',
              width: '100%'
            }}
            dir={isRTL ? 'rtl' : 'ltr'}
            size="lg"
          >
            <option value="">{t('select_subcategory')}</option>
            
            {/* PARTES SUPERIORES */}
            <optgroup label={t('tops')}>
              <option value="chemises">{t('dress_shirts')}</option>
              <option value="chemises_casual">{t('casual_shirts')}</option>
              <option value="t_shirts">{t('t_shirts')}</option>
              <option value="polo">{t('polo_shirts')}</option>
              <option value="chemises_manches_longues">{t('long_sleeve_shirts')}</option>
              <option value="chemises_manches_courtes">{t('short_sleeve_shirts')}</option>
              <option value="chemises_hawaiennes">{t('hawaiian_shirts')}</option>
              <option value="sweats">{t('hoodies')}</option>
              <option value="pulls">{t('sweaters')}</option>
              <option value="gilets">{t('sweater_vests')}</option>
            </optgroup>
            
            {/* PANTALONES Y JEANS */}
            <optgroup label={t('pants_jeans')}>
              <option value="jeans">{t('jeans')}</option>
              <option value="pantalons_costume">{t('dress_pants')}</option>
              <option value="pantalons_chinos">{t('chinos')}</option>
              <option value="pantalons_cargo">{t('cargo_pants')}</option>
              <option value="pantalons_sport">{t('sport_pants')}</option>
              <option value="pantalons_lin">{t('linen_pants')}</option>
              <option value="pantalons_classiques">{t('classic_pants')}</option>
            </optgroup>
            
            {/* SHORTS Y PANTACORTOS */}
            <optgroup label={t('shorts_capris')}>
              <option value="shorts">{t('shorts')}</option>
              <option value="shorts_denim">{t('denim_shorts')}</option>
              <option value="shorts_sport">{t('sport_shorts')}</option>
              <option value="shorts_cargo">{t('cargo_shorts')}</option>
              <option value="pantacourts">{t('capri_pants')}</option>
              <option value="bermudas">{t('bermuda_shorts')}</option>
            </optgroup>
            
            {/* CHAQUETAS Y ABRIGOS */}
            <optgroup label={t('jackets_coats')}>
              <option value="vestes_cuir">{t('leather_jackets')}</option>
              <option value="vestes_denim">{t('denim_jackets')}</option>
              <option value="blousons">{t('bomber_jackets')}</option>
              <option value="manteaux">{t('coats')}</option>
              <option value="doudounes">{t('puffer_jackets')}</option>
              <option value="vestes_sport">{t('sport_jackets')}</option>
              <option value="vestes_costume">{t('suit_jackets')}</option>
              <option value="kway">{t('rain_jackets')}</option>
            </optgroup>
            
            {/* TRAJES FORMALES */}
            <optgroup label={t('formal_suits')}>
              <option value="costumes_complets">{t('full_suits')}</option>
              <option value="vestons">{t('blazers')}</option>
              <option value="costumes_trois_pieces">{t('three_piece_suits')}</option>
              <option value="costumes_marriage">{t('wedding_suits')}</option>
              <option value="costumes_affaires">{t('business_suits')}</option>
              <option value="smokings">{t('tuxedos')}</option>
            </optgroup>
            
            {/* ROPA DEPORTIVA */}
            <optgroup label={t('sportswear')}>
              <option value="survetements">{t('tracksuits')}</option>
              <option value="joggings">{t('joggers')}</option>
              <option value="maillots_sport">{t('sport_jerseys')}</option>
              <option value="vetements_fitness">{t('fitness_wear')}</option>
              <option value="vetements_running">{t('running_wear')}</option>
            </optgroup>
            
            {/* ROPA TRADICIONAL */}
            <optgroup label={t('traditional_clothing')}>
              <option value="kamiss">{t('traditional_kamiss')}</option>
              <option value="djellaba">{t('djellaba')}</option>
              <option value="gandoura">{t('gandoura')}</option>
              <option value="burnous">{t('burnous')}</option>
              <option value="chechia">{t('chechia')}</option>
              <option value="serouel">{t('sarouel')}</option>
            </optgroup>
            
            {/* ROPA INTERIOR */}
            <optgroup label={t('underwear')}>
              <option value="calecons">{t('boxer_briefs')}</option>
              <option value="boxers">{t('boxers')}</option>
              <option value="slips">{t('briefs')}</option>
              <option value="sous_chemises">{t('undershirts')}</option>
              <option value="maillots_corps">{t('bodysuits')}</option>
            </optgroup>
            
            {/* ROPA DE DORMIR */}
            <optgroup label={t('sleepwear')}>
              <option value="pyjamas">{t('pajamas')}</option>
              <option value="chemises_nuit">{t('night_shirts')}</option>
              <option value="peignoirs">{t('bathrobes')}</option>
              <option value="pantalons_pyjama">{t('pajama_pants')}</option>
            </optgroup>
            
            {/* ROPA DE BAÑO */}
            <optgroup label={t('swimwear')}>
              <option value="maillots_bain">{t('swim_trunks')}</option>
              <option value="slips_bain">{t('swim_briefs')}</option>
              <option value="shorts_bain">{t('swim_shorts')}</option>
              <option value="paréos">{t('beach_wraps')}</option>
            </optgroup>
            
            {/* ACCESORIOS */}
            <optgroup label={t('accessories')}>
              <option value="casquettes">{t('caps')}</option>
              <option value="chapeaux">{t('hats')}</option>
              <option value="chaussettes">{t('socks')}</option>
              <option value="ceintures">{t('belts')}</option>
              <option value="gants">{t('gloves')}</option>
              <option value="cravates">{t('ties')}</option>
              <option value="noeuds_papillon">{t('bow_ties')}</option>
              <option value="foulards">{t('scarves')}</option>
              <option value="echarpes">{t('mufflers')}</option>
              <option value="porte_cles">{t('keychains')}</option>
              <option value="lunettes_soleil">{t('sunglasses')}</option>
            </optgroup>
            
            {/* ROPA DE TRABAJO */}
            <optgroup label={t('workwear')}>
              <option value="uniformes">{t('uniforms')}</option>
              <option value="vetements_securite">{t('safety_clothing')}</option>
              <option value="bleus_travail">{t('work_overalls')}</option>
              <option value="vestes_reflechissantes">{t('reflective_jackets')}</option>
            </optgroup>
          </Form.Select>
        </Form.Group>

      
      </Card.Body>
    </Card>
  );
};

export default React.memo(VetementsHomme);