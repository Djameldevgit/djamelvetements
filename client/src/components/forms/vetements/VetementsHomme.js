import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const VetementsHomme = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('vetementshomme');
  const isRTL = i18n.language === 'ar';

  return (
    <Card className="border-0 rounded-0 mb-3 shadow-sm" dir={isRTL ? "rtl" : "ltr"}>
      <Card className="pr-4">
        {/* TIPO PRINCIPAL DE ROPA MASCULINA - CORREGIDO */}
        <Form.Group className="mb-4 w-100">
          <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
            👔 {t('mens_clothing', 'Ropa para Hombre')}
          </Form.Label>
          
          <Form.Select
            name="tipoArticulo"  // ← CAMBIADO: De "ropahombre" a "tipoArticulo"
            value={postData.tipoArticulo || ""}  // ← CAMBIADO
            onChange={handleChangeInput}
            className="form-control border-0 shadow-sm"
            style={{ 
              textAlign: isRTL ? 'right' : 'left',
              width: '100%'
            }}
            dir={isRTL ? 'rtl' : 'ltr'}
            size="lg"
            required
          >
            <option value="">{t('select_subcategory', 'Selecciona el tipo de prenda')}</option>
            
            {/* PARTES SUPERIORES */}
            <optgroup label={t('tops', '👕 Partes Superiores')}>
              <option value="chemises">{t('dress_shirts', 'Camisas formales')}</option>
              <option value="chemises_casual">{t('casual_shirts', 'Camisas casual')}</option>
              <option value="t_shirts">{t('t_shirts', 'Camisetas')}</option>
              <option value="polo">{t('polo_shirts', 'Polos')}</option>
              <option value="chemises_manches_longues">{t('long_sleeve_shirts', 'Camisas manga larga')}</option>
              <option value="chemises_manches_courtes">{t('short_sleeve_shirts', 'Camisas manga corta')}</option>
              <option value="chemises_hawaiennes">{t('hawaiian_shirts', 'Camisas hawaianas')}</option>
              <option value="sweats">{t('hoodies', 'Sudaderas con capucha')}</option>
              <option value="pulls">{t('sweaters', 'Suéteres')}</option>
              <option value="gilets">{t('sweater_vests', 'Chalecos')}</option>
            </optgroup>
            
            {/* PANTALONES Y JEANS */}
            <optgroup label={t('pants_jeans', '👖 Pantalones y Jeans')}>
              <option value="jeans">{t('jeans', 'Jeans')}</option>
              <option value="pantalons_costume">{t('dress_pants', 'Pantalones formales')}</option>
              <option value="pantalons_chinos">{t('chinos', 'Chinos')}</option>
              <option value="pantalons_cargo">{t('cargo_pants', 'Pantalones cargo')}</option>
              <option value="pantalons_sport">{t('sport_pants', 'Pantalones deportivos')}</option>
              <option value="pantalons_lin">{t('linen_pants', 'Pantalones de lino')}</option>
              <option value="pantalons_classiques">{t('classic_pants', 'Pantalones clásicos')}</option>
            </optgroup>
            
            {/* SHORTS Y PANTACORTOS */}
            <optgroup label={t('shorts_capris', '🩳 Shorts')}>
              <option value="shorts">{t('shorts', 'Shorts')}</option>
              <option value="shorts_denim">{t('denim_shorts', 'Shorts de mezclilla')}</option>
              <option value="shorts_sport">{t('sport_shorts', 'Shorts deportivos')}</option>
              <option value="shorts_cargo">{t('cargo_shorts', 'Shorts cargo')}</option>
              <option value="pantacourts">{t('capri_pants', 'Pantalones capri')}</option>
              <option value="bermudas">{t('bermuda_shorts', 'Bermudas')}</option>
            </optgroup>
            
            {/* CHAQUETAS Y ABRIGOS */}
            <optgroup label={t('jackets_coats', '🧥 Chaquetas y Abrigos')}>
              <option value="vestes_cuir">{t('leather_jackets', 'Chaquetas de cuero')}</option>
              <option value="vestes_denim">{t('denim_jackets', 'Chaquetas de mezclilla')}</option>
              <option value="blousons">{t('bomber_jackets', 'Chaquetas bomber')}</option>
              <option value="manteaux">{t('coats', 'Abrigos')}</option>
              <option value="doudounes">{t('puffer_jackets', 'Plumíferos')}</option>
              <option value="vestes_sport">{t('sport_jackets', 'Chaquetas deportivas')}</option>
              <option value="vestes_costume">{t('suit_jackets', 'Sacos')}</option>
              <option value="kway">{t('rain_jackets', 'Impermeables')}</option>
            </optgroup>
            
            {/* TRAJES FORMALES */}
            <optgroup label={t('formal_suits', '🤵 Trajes Formales')}>
              <option value="costumes_complets">{t('full_suits', 'Trajes completos')}</option>
              <option value="vestons">{t('blazers', 'Blazers')}</option>
              <option value="costumes_trois_pieces">{t('three_piece_suits', 'Trajes de tres piezas')}</option>
              <option value="costumes_marriage">{t('wedding_suits', 'Trajes de boda')}</option>
              <option value="costumes_affaires">{t('business_suits', 'Trajes de negocios')}</option>
              <option value="smokings">{t('tuxedos', 'Esmoquin')}</option>
            </optgroup>
            
            {/* ROPA DEPORTIVA */}
            <optgroup label={t('sportswear', '🏃‍♂️ Ropa Deportiva')}>
              <option value="survetements">{t('tracksuits', 'Chándales')}</option>
              <option value="joggings">{t('joggers', 'Joggers')}</option>
              <option value="maillots_sport">{t('sport_jerseys', 'Camisetas deportivas')}</option>
              <option value="vetements_fitness">{t('fitness_wear', 'Ropa de fitness')}</option>
              <option value="vetements_running">{t('running_wear', 'Ropa de running')}</option>
            </optgroup>
            
            {/* ROPA TRADICIONAL */}
            <optgroup label={t('traditional_clothing', '🧕 Ropa Tradicional')}>
              <option value="kamiss">{t('traditional_kamiss', 'Kamiss tradicional')}</option>
              <option value="djellaba">{t('djellaba', 'Djellaba')}</option>
              <option value="gandoura">{t('gandoura', 'Gandoura')}</option>
              <option value="burnous">{t('burnous', 'Burnous')}</option>
              <option value="chechia">{t('chechia', 'Chechia')}</option>
              <option value="serouel">{t('sarouel', 'Sarouel')}</option>
            </optgroup>
            
            {/* ROPA INTERIOR */}
            <optgroup label={t('underwear', '🩲 Ropa Interior')}>
              <option value="calecons">{t('boxer_briefs', 'Calzoncillos tipo boxer')}</option>
              <option value="boxers">{t('boxers', 'Boxers')}</option>
              <option value="slips">{t('briefs', 'Slips')}</option>
              <option value="sous_chemises">{t('undershirts', 'Camisetas interiores')}</option>
              <option value="maillots_corps">{t('bodysuits', 'Bodies')}</option>
            </optgroup>
            
            {/* ROPA DE DORMIR */}
            <optgroup label={t('sleepwear', '😴 Ropa de Dormir')}>
              <option value="pyjamas">{t('pajamas', 'Pijamas')}</option>
              <option value="chemises_nuit">{t('night_shirts', 'Camisas de noche')}</option>
              <option value="peignoirs">{t('bathrobes', 'Batones')}</option>
              <option value="pantalons_pyjama">{t('pajama_pants', 'Pantalones de pijama')}</option>
            </optgroup>
            
            {/* ROPA DE BAÑO */}
            <optgroup label={t('swimwear', '🏊‍♂️ Ropa de Baño')}>
              <option value="maillots_bain">{t('swim_trunks', 'Bañadores')}</option>
              <option value="slips_bain">{t('swim_briefs', 'Speedos')}</option>
              <option value="shorts_bain">{t('swim_shorts', 'Shorts de baño')}</option>
              <option value="paréos">{t('beach_wraps', 'Pareos')}</option>
            </optgroup>
            
            {/* ACCESORIOS */}
            <optgroup label={t('accessories', '🧢 Accesorios')}>
              <option value="casquettes">{t('caps', 'Gorras')}</option>
              <option value="chapeaux">{t('hats', 'Sombreros')}</option>
              <option value="chaussettes">{t('socks', 'Calcetines')}</option>
              <option value="ceintures">{t('belts', 'Cinturones')}</option>
              <option value="gants">{t('gloves', 'Guantes')}</option>
              <option value="cravates">{t('ties', 'Corbatas')}</option>
              <option value="noeuds_papillon">{t('bow_ties', 'Pajaritas')}</option>
              <option value="foulards">{t('scarves', 'Pañuelos')}</option>
              <option value="echarpes">{t('mufflers', 'Bufandas')}</option>
              <option value="porte_cles">{t('keychains', 'Llaveros')}</option>
              <option value="lunettes_soleil">{t('sunglasses', 'Gafas de sol')}</option>
            </optgroup>
            
            {/* ROPA DE TRABAJO */}
            <optgroup label={t('workwear', '👷‍♂️ Ropa de Trabajo')}>
              <option value="uniformes">{t('uniforms', 'Uniformes')}</option>
              <option value="vetements_securite">{t('safety_clothing', 'Ropa de seguridad')}</option>
              <option value="bleus_travail">{t('work_overalls', 'Overoles')}</option>
              <option value="vestes_reflechissantes">{t('reflective_jackets', 'Chaquetas reflectantes')}</option>
            </optgroup>
          </Form.Select>
        </Form.Group>

     

      </Card>
    </Card>
  );
};

export default React.memo(VetementsHomme);