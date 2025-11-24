import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Filles = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('filles');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* TIPO PRINCIPAL DE ROPA PARA NIÑAS */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          👧 {t('girls_clothing', 'Ropa para niñas')}
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
            <option value="sandales">{t('sandals', 'Sandalias')}</option>
            <option value="baskets">{t('sneakers', 'Zapatillas deportivas')}</option>
            <option value="ballerines">{t('ballet_flats', 'Bailarinas')}</option>
            <option value="bottes">{t('boots', 'Botas')}</option>
            <option value="escarpins">{t('dress_shoes', 'Zapatos de vestir')}</option>
            <option value="chaussures_ecole">{t('school_shoes', 'Zapatos de colegio')}</option>
            <option value="nu_pieds">{t('flip_flops', 'Chanclas')}</option>
          </optgroup>
          
          {/* PARTES SUPERIORES */}
          <optgroup label={t('tops', 'Partes superiores')}>
            <option value="t_shirts">{t('t_shirts', 'Camisetas')}</option>
            <option value="hauts_manches_courtes">{t('short_sleeve_tops', 'Tops manga corta')}</option>
            <option value="hauts_manches_longues">{t('long_sleeve_tops', 'Tops manga larga')}</option>
            <option value="chemises">{t('blouses', 'Blusas')}</option>
            <option value="pulls">{t('sweaters', 'Jerséis')}</option>
            <option value="sweats">{t('hoodies', 'Sudadera con capucha')}</option>
            <option value="tops_sans_manches">{t('sleeveless_tops', 'Tops sin mangas')}</option>
            <option value="corsaires">{t('crop_tops', 'Tops cortos')}</option>
          </optgroup>
          
          {/* PARTES INFERIORES */}
          <optgroup label={t('bottoms', 'Partes inferiores')}>
            <option value="jeans">{t('jeans', 'Jeans')}</option>
            <option value="pantalons">{t('pants', 'Pantalones')}</option>
            <option value="shorts">{t('shorts', 'Shorts')}</option>
            <option value="leggings">{t('leggings', 'Leggings')}</option>
            <option value="pantalons_sport">{t('sport_pants', 'Pantalones deportivos')}</option>
            <option value="pantalons_costume">{t('dress_pants', 'Pantalones de vestir')}</option>
          </optgroup>
          
          {/* VESTIDOS */}
          <optgroup label={t('dresses', 'Vestidos')}>
            <option value="robes_soiree">{t('evening_dresses', 'Vestidos de noche')}</option>
            <option value="robes_ete">{t('summer_dresses', 'Vestidos de verano')}</option>
            <option value="robes_quotidiennes">{t('casual_dresses', 'Vestidos casuales')}</option>
            <option value="robes_fete">{t('party_dresses', 'Vestidos de fiesta')}</option>
            <option value="robes_manches_longues">{t('long_sleeve_dresses', 'Vestidos manga larga')}</option>
            <option value="robes_sans_manches">{t('sleeveless_dresses', 'Vestidos sin mangas')}</option>
            <option value="robes_imprimees">{t('printed_dresses', 'Vestidos estampados')}</option>
          </optgroup>
          
          {/* FALDAS */}
          <optgroup label={t('skirts', 'Faldas')}>
            <option value="jupes_courtes">{t('short_skirts', 'Faldas cortas')}</option>
            <option value="jupes_longues">{t('long_skirts', 'Faldas largas')}</option>
            <option value="jupes_plissees">{t('pleated_skirts', 'Faldas plisadas')}</option>
            <option value="jupes_evasees">{t('flared_skirts', 'Faldas acampanadas')}</option>
            <option value="jupes_droites">{t('straight_skirts', 'Faldas rectas')}</option>
            <option value="jupes_imprimees">{t('printed_skirts', 'Faldas estampadas')}</option>
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
          
          {/* CONJUNTOS */}
          <optgroup label={t('sets_outfits', 'Conjuntos')}>
            <option value="ensembles_coordinates">{t('coordinated_sets', 'Conjuntos coordinados')}</option>
            <option value="tenues_completes">{t('complete_outfits', 'Vestidos completos')}</option>
            <option value="jupes_hauts">{t('skirt_top_sets', 'Conjuntos falda-top')}</option>
            <option value="pantalon_hauts">{t('pants_top_sets', 'Conjuntos pantalón-top')}</option>
            <option value="ensembles_fete">{t('party_sets', 'Conjuntos de fiesta')}</option>
          </optgroup>
          
          {/* ROPA DEPORTIVA */}
          <optgroup label={t('sportswear', 'Ropa deportiva')}>
            <option value="survetements">{t('tracksuits', 'Chándales')}</option>
            <option value="joggings">{t('joggers', 'Pantalones de chándal')}</option>
            <option value="shorts_sport">{t('sport_shorts', 'Shorts deportivos')}</option>
            <option value="maillots_gymnastique">{t('gymnastics_leotards', 'Mallas de gimnasia')}</option>
            <option value="vetements_danse">{t('dancewear', 'Ropa de danza')}</option>
          </optgroup>
          
          {/* ROPA DE DORMIR */}
          <optgroup label={t('sleepwear', 'Ropa de dormir')}>
            <option value="pyjamas">{t('pajamas', 'Pijamas')}</option>
            <option value="chemises_nuit">{t('nightgowns', 'Camisones')}</option>
            <option value="pyjamas_une_piece">{t('onesie_pajamas', 'Pijamas enterizos')}</option>
            <option value="robes_chambres">{t('bathrobes', 'Albornoces')}</option>
            <option value="nuisettes">{t('nighties', 'Camisolas')}</option>
          </optgroup>
          
          {/* ROPA INTERIOR */}
          <optgroup label={t('underwear', 'Ropa interior')}>
            <option value="culottes">{t('panties', 'Bragas')}</option>
            <option value="soutiens_gorge">{t('training_bras', 'Sujetadores de entrenamiento')}</option>
            <option value="combinaisons">{t('slips', 'Combinaisons')}</option>
            <option value="chaussettes">{t('socks', 'Calcetines')}</option>
            <option value="collants">{t('tights', 'Medias')}</option>
          </optgroup>
          
          {/* ROPA DE BAÑO */}
          <optgroup label={t('swimwear', 'Ropa de baño')}>
            <option value="maillots_une_piece">{t('one_piece_swimsuits', 'Bañadores enteros')}</option>
            <option value="maillots_deux_pieces">{t('bikinis', 'Bikinis')}</option>
            <option value="paréos">{t('beach_coverups', 'Pareos')}</option>
            <option value="brassards">{t('swim_armbands', 'Manguitos')}</option>
            <option value="bonnets_bain">{t('swim_caps', 'Gorros de baño')}</option>
          </optgroup>
          
          {/* ROPA TRADICIONAL */}
          <optgroup label={t('traditional_clothing', 'Ropa tradicional')}>
            <option value="djellaba_filles">{t('girls_djellaba', 'Yelaba para niñas')}</option>
            <option value="caftans">{t('kaftans', 'Caftanes')}</option>
            <option value="takchitas">{t('takchitas', 'Takchitas')}</option>
            <option value="foutas">{t('foutas', 'Foutas')}</option>
            <option value="voiles">{t('headscarves', 'Velos')}</option>
          </optgroup>
          
          {/* ACCESORIOS */}
          <optgroup label={t('accessories', 'Accesorios')}>
            <option value="casquettes">{t('caps', 'Gorras')}</option>
            <option value="chapeaux">{t('hats', 'Sombreros')}</option>
            <option value="bandeaux">{t('headbands', 'Cintas para el cabello')}</option>
            <option value="bijoux_filles">{t('girls_jewelry', 'Joyería para niñas')}</option>
            <option value="sacs">{t('bags', 'Bolsos')}</option>
            <option value="foulards">{t('scarves', 'Pañuelos')}</option>
            <option value="ceintures">{t('belts', 'Cinturones')}</option>
          </optgroup>
          
          {/* UNIFORMES */}
          <optgroup label={t('uniforms', 'Uniformes')}>
            <option value="uniformes_scolaires">{t('school_uniforms', 'Uniformes escolares')}</option>
            <option value="uniformes_danse">{t('dance_uniforms', 'Uniformes de danza')}</option>
            <option value="uniformes_sport">{t('sports_uniforms', 'Uniformes deportivos')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

    

      
 
      <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
        {t('choose_girls_clothing', 'Elige el tipo de ropa para niñas y especifica sus características')}
      </Form.Text>
    </div>
  );
};

export default React.memo(Filles);