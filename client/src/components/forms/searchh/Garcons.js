import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Garcons = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('garsons');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* TIPO PRINCIPAL DE ROPA PARA NIÑOS */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          👦 {t('boys_clothing', 'Ropa para niños')}
        </Form.Label>
        <Form.Select
          name="subCategory"
          value={postData.subCategory}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">{t('select_subcategory', 'Selecciona la subcategoría')}</option>
          
          {/* CALZADO */}
          <optgroup label={t('footwear', 'Calzado')}>
            <option value="baskets">{t('sneakers', 'Zapatillas deportivas')}</option>
            <option value="sandales">{t('sandals', 'Sandalias')}</option>
            <option value="bottes">{t('boots', 'Botas')}</option>
            <option value="chaussures_ecole">{t('school_shoes', 'Zapatos de colegio')}</option>
            <option value="chaussures_formelles">{t('formal_shoes', 'Zapatos formales')}</option>
            <option value="chaussons">{t('slippers', 'Zapatillas de casa')}</option>
          </optgroup>
          
          {/* PARTES SUPERIORES */}
          <optgroup label={t('tops', 'Partes superiores')}>
            <option value="t_shirts">{t('t_shirts', 'Camisetas')}</option>
            <option value="chemises">{t('shirts', 'Camisas')}</option>
            <option value="pulls">{t('sweaters', 'Jerséis')}</option>
            <option value="sweats">{t('hoodies', 'Sudadera con capucha')}</option>
            <option value="polo">{t('polo_shirts', 'Camisas polo')}</option>
            <option value="debardeurs">{t('tank_tops', 'Camisetas sin mangas')}</option>
            <option value="chemises_manches_longues">{t('long_sleeve_shirts', 'Camisas manga larga')}</option>
          </optgroup>
          
          {/* PARTES INFERIORES */}
          <optgroup label={t('bottoms', 'Partes inferiores')}>
            <option value="jeans">{t('jeans', 'Jeans')}</option>
            <option value="pantalons">{t('pants', 'Pantalones')}</option>
            <option value="shorts">{t('shorts', 'Shorts')}</option>
            <option value="pantalons_sport">{t('sport_pants', 'Pantalones deportivos')}</option>
            <option value="pantalons_costume">{t('dress_pants', 'Pantalones de vestir')}</option>
            <option value="leggings">{t('leggings', 'Leggings')}</option>
          </optgroup>
          
          {/* CHAQUETAS Y ABRIGOS */}
          <optgroup label={t('jackets_coats', 'Chaquetas y abrigos')}>
            <option value="vestes">{t('jackets', 'Chaquetas')}</option>
            <option value="manteaux">{t('coats', 'Abrigos')}</option>
            <option value="gilets">{t('vests', 'Chalecos')}</option>
            <option value="blousons">{t('windbreakers', 'Cazadoras')}</option>
            <option value="doudounes">{t('puffer_jackets', 'Plumíferos')}</option>
            <option value="kway">{t('rain_jackets', 'Impermeables')}</option>
          </optgroup>
          
          {/* TRAJES Y ROPA FORMAL */}
          <optgroup label={t('suits_formal', 'Trajes y ropa formal')}>
            <option value="costumes_complets">{t('full_suits', 'Trajes completos')}</option>
            <option value="vestons">{t('blazers', 'Blazers')}</option>
            <option value="pantalons_costume">{t('suit_pants', 'Pantalones de traje')}</option>
            <option value="cravates">{t('ties', 'Corbatas')}</option>
            <option value="nocuds_papillon">{t('bow_ties', 'Pajaritas')}</option>
          </optgroup>
          
          {/* ROPA DEPORTIVA */}
          <optgroup label={t('sportswear', 'Ropa deportiva')}>
            <option value="survetements">{t('tracksuits', 'Chándales')}</option>
            <option value="joggings">{t('joggers', 'Pantalones de chándal')}</option>
            <option value="maillots_foot">{t('soccer_jerseys', 'Camisetas de fútbol')}</option>
            <option value="shorts_sport">{t('sport_shorts', 'Shorts deportivos')}</option>
            <option value="vetements_natation">{t('swimwear', 'Ropa de natación')}</option>
          </optgroup>
          
          {/* ROPA DE DORMIR */}
          <optgroup label={t('sleepwear', 'Ropa de dormir')}>
            <option value="pyjamas">{t('pajamas', 'Pijamas')}</option>
            <option value="chemises_nuit">{t('night_shirts', 'Camisones')}</option>
            <option value="pyjamas_une_piece">{t('onesie_pajamas', 'Pijamas enterizos')}</option>
            <option value="robes_chambres">{t('bathrobes', 'Albornoces')}</option>
          </optgroup>
          
          {/* ROPA INTERIOR */}
          <optgroup label={t('underwear', 'Ropa interior')}>
            <option value="calecons">{t('underpants', 'Calzoncillos')}</option>
            <option value="boxers">{t('boxers', 'Bóxers')}</option>
            <option value="slips">{t('briefs', 'Slips')}</option>
            <option value="chaussettes">{t('socks', 'Calcetines')}</option>
            <option value="sous_chemises">{t('undershirts', 'Camisetas interiores')}</option>
          </optgroup>
          
          {/* ROPA TRADICIONAL */}
          <optgroup label={t('traditional_clothing', 'Ropa tradicional')}>
            <option value="kamiss">{t('traditional_kamiss', 'Kamiss tradicionales')}</option>
            <option value="djellaba">{t('djellaba', 'Yelaba')}</option>
            <option value="gandoura">{t('gandoura', 'Gandura')}</option>
            <option value="burnous">{t('burnous', 'Burnús')}</option>
            <option value="chechia">{t('chechia', 'Chechia')}</option>
          </optgroup>
          
          {/* ACCESORIOS */}
          <optgroup label={t('accessories', 'Accesorios')}>
            <option value="casquettes">{t('caps', 'Gorras')}</option>
            <option value="chapeaux">{t('hats', 'Sombreros')}</option>
            <option value="echarpes">{t('scarves', 'Bufandas')}</option>
            <option value="gants">{t('gloves', 'Guantes')}</option>
            <option value="ceintures">{t('belts', 'Cinturones')}</option>
            <option value="lunettes_soleil">{t('sunglasses', 'Gafas de sol')}</option>
          </optgroup>
          
          {/* UNIFORMES */}
          <optgroup label={t('uniforms', 'Uniformes')}>
            <option value="uniformes_scolaires">{t('school_uniforms', 'Uniformes escolares')}</option>
            <option value="uniformes_sport">{t('sports_uniforms', 'Uniformes deportivos')}</option>
            <option value="uniformes_musique">{t('music_uniforms', 'Uniformes de música')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

  

      <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
        {t('choose_boys_clothing', 'Elige el tipo de ropa para niños y especifica sus características')}
      </Form.Text>
    </div>
  );
};

export default React.memo(Garcons);