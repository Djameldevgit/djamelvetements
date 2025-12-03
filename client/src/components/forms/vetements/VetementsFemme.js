import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const VetementsFemme = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('vetementsfemme');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* TIPO PRINCIPAL DE ROPA FEMENINA */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          👗 {t('womens_clothing', 'Ropa Femenina')}
        </Form.Label>
        <Form.Select
          name="tipoArticulo"
          value={postData.tipoArticulo}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">{t('select_subcategory', 'Selecciona la subcategoría')}</option>
          
          {/* PARTES SUPERIORES */}
          <optgroup label={t('tops_blouses', 'Blusas y Tops')}>
            <option value="t_shirts_femme">{t('t_shirts', 'Camisetas')}</option>
            <option value="chemises_femme">{t('shirts', 'Camisas')}</option>
            <option value="tops_debardeurs">{t('tops_tank_tops', 'Tops y Camisetas de Tirantes')}</option>
            <option value="blouses_femme">{t('blouses', 'Blusas')}</option>
            <option value="tuniques_femme">{t('tunics', 'Túnicas')}</option>
            <option value="corsets_bustiers">{t('corsets_bustiers', 'Corsés y Bustiers')}</option>
            <option value="bodys_femme">{t('bodysuits', 'Bodies')}</option>
            <option value="crop_tops_femme">{t('crop_tops', 'Tops Cortos')}</option>
            <option value="chemisiers_femme">{t('blouses_dressy', 'Blusas de Vestir')}</option>
          </optgroup>

          {/* VESTIDOS */}
          <optgroup label={t('dresses', 'Vestidos')}>
            <option value="robes_soiree">{t('evening_dresses', 'Vestidos de Noche')}</option>
            <option value="robes_ete">{t('summer_dresses', 'Vestidos de Verano')}</option>
            <option value="robes_travail">{t('work_dresses', 'Vestidos de Trabajo')}</option>
            <option value="robes_mariage">{t('wedding_dresses', 'Vestidos de Novia')}</option>
            <option value="robes_cocktail">{t('cocktail_dresses', 'Vestidos de Cóctel')}</option>
            <option value="robes_maxi">{t('maxi_dresses', 'Vestidos Largos')}</option>
            <option value="robes_midi">{t('midi_dresses', 'Vestidos Midi')}</option>
            <option value="robes_mini">{t('mini_dresses', 'Vestidos Cortos')}</option>
            <option value="robes_imprimees">{t('printed_dresses', 'Vestidos Estampados')}</option>
            <option value="robes_fluides">{t('flowy_dresses', 'Vestidos Fluidos')}</option>
          </optgroup>

          {/* FALDAS */}
          <optgroup label={t('skirts', 'Faldas')}>
            <option value="jupes_crayon">{t('pencil_skirts', 'Faldas Lápiz')}</option>
            <option value="jupes_evasees">{t('flared_skirts', 'Faldas Acampanadas')}</option>
            <option value="jupes_longues">{t('long_skirts', 'Faldas Largas')}</option>
            <option value="jupes_midi">{t('midi_skirts', 'Faldas Midi')}</option>
            <option value="jupes_mini">{t('mini_skirts', 'Faldas Mini')}</option>
            <option value="jupes_plissees">{t('pleated_skirts', 'Faldas Plisadas')}</option>
            <option value="jupes_tulles">{t('tulle_skirts', 'Faldas de Tul')}</option>
            <option value="jupes_portefeuille">{t('wrap_skirts', 'Faldas Envuelve')}</option>
          </optgroup>

          {/* PANTALONES Y JEANS */}
          <optgroup label={t('pants_jeans', 'Pantalones y Jeans')}>
            <option value="jeans_femme">{t('jeans', 'Jeans')}</option>
            <option value="pantalons_taille_haute">{t('high_waist_pants', 'Pantalones de Tiro Alto')}</option>
            <option value="pantalons_taille_basse">{t('low_waist_pants', 'Pantalones de Tiro Bajo')}</option>
            <option value="pantalons_larges">{t('wide_leg_pants', 'Pantalones Anchos')}</option>
            <option value="pantalons_droit">{t('straight_pants', 'Pantalones Rectos')}</option>
            <option value="pantalons_fuseau">{t('skinny_pants', 'Pantalones Pitillo')}</option>
            <option value="pantalons_costume">{t('dress_pants', 'Pantalones de Traje')}</option>
            <option value="pantalons_palazzo">{t('palazzo_pants', 'Pantalones Palazzo')}</option>
            <option value="pantalons_cargo">{t('cargo_pants', 'Pantalones Cargo')}</option>
          </optgroup>

          {/* SHORTS Y PANTACORTOS */}
          <optgroup label={t('shorts_capris', 'Shorts y Pantacortos')}>
            <option value="shorts_femme">{t('shorts', 'Shorts')}</option>
            <option value="bermudas_femme">{t('bermudas', 'Bermudas')}</option>
            <option value="pantacourts_femme">{t('capri_pants', 'Pantalones Cortos')}</option>
            <option value="shorts_denim">{t('denim_shorts', 'Shorts de Mezclilla')}</option>
            <option value="shorts_sport">{t('sport_shorts', 'Shorts Deportivos')}</option>
            <option value="shorts_taille_haute">{t('high_waist_shorts', 'Shorts de Tiro Alto')}</option>
            <option value="shorts_cycliste">{t('biker_shorts', 'Shorts de Ciclista')}</option>
          </optgroup>

          {/* CHAQUETAS Y ABRIGOS */}
          <optgroup label={t('jackets_coats', 'Chaquetas y Abrigos')}>
            <option value="vestes_femme">{t('jackets', 'Chaquetas')}</option>
            <option value="manteaux_femme">{t('coats', 'Abrigos')}</option>
            <option value="blazers_femme">{t('blazers', 'Blazers')}</option>
            <option value="doudounes_femme">{t('puffer_jackets', 'Plumíferos')}</option>
            <option value="trenchs_femme">{t('trench_coats', 'Trenchs')}</option>
            <option value="gilets_femme">{t('vests', 'Chalecos')}</option>
            <option value="kaban_femme">{t('trench_coats', 'Gabardinas')}</option>
            <option value="vestes_cuir">{t('leather_jackets', 'Chaquetas de Cuero')}</option>
            <option value="vestes_denim">{t('denim_jackets', 'Chaquetas de Mezclilla')}</option>
          </optgroup>

          {/* CONJUNTOS Y MONOS */}
          <optgroup label={t('sets_jumpsuits', 'Conjuntos y Monos')}>
            <option value="ensembles_femme">{t('sets', 'Conjuntos')}</option>
            <option value="combinaisons_femme">{t('overalls', 'Monos')}</option>
            <option value="costumes_femme">{t('womens_suits', 'Trajes de Mujer')}</option>
            <option value="jumpsuits_femme">{t('jumpsuits', 'Monoenterizos')}</option>
            <option value="tailleurs_femme">{t('tailored_suits', 'Trajes Sastrería')}</option>
            <option value="co_ords">{t('coordinated_sets', 'Conjuntos Coordinados')}</option>
            <option value="ensembles_pantalon">{t('pants_sets', 'Conjuntos de Pantalón')}</option>
            <option value="ensembles_jupe">{t('skirt_sets', 'Conjuntos de Falda')}</option>
          </optgroup>

          {/* ROPA TRADICIONAL */}
          <optgroup label={t('traditional_clothing', 'Ropa Tradicional')}>
            <option value="caftans_femme">{t('kaftans', 'Caftanes')}</option>
            <option value="takchitas_femme">{t('takchitas', 'Takchitas')}</option>
            <option value="djebbas_femme">{t('djellabas', 'Yebbas')}</option>
            <option value="gandouras_femme">{t('gandouras', 'Ganduras')}</option>
            <option value="sarouels_femme">{t('sarouels', 'Saroueles')}</option>
            <option value="abayas_femme">{t('abayas', 'Abayas')}</option>
            <option value="jellabas_femme">{t('jellabas', 'Yelabas')}</option>
            <option value="kamis_femme">{t('kamis', 'Kamis')}</option>
            <option value="foutas_femme">{t('foutas', 'Foutas')}</option>
          </optgroup>

          {/* DEPORTE Y OCIO */}
          <optgroup label={t('sport_leisure', 'Deporte y Ocio')}>
            <option value="survetements_femme">{t('tracksuits', 'Ropa Deportiva')}</option>
            <option value="joggings_femme">{t('joggers', 'Pantalones de Chándal')}</option>
            <option value="leggings_femme">{t('leggings', 'Leggings')}</option>
            <option value="tenues_gym">{t('gym_wear', 'Ropa de Gimnasio')}</option>
            <option value="maillots_sport">{t('sport_jerseys', 'Equipaciones Deportivas')}</option>
            <option value="vetements_yoga">{t('yoga_wear', 'Ropa de Yoga')}</option>
            <option value="vetements_running">{t('running_wear', 'Ropa de Running')}</option>
          </optgroup>

          {/* TRAJES DE BAÑO */}
          <optgroup label={t('swimwear', 'Trajes de Baño')}>
            <option value="maillots_une_piece">{t('one_piece', 'Bañador Entero')}</option>
            <option value="maillots_deux_pieces">{t('two_piece', 'Bikini')}</option>
            <option value="pareos_femme">{t('beach_wraps', 'Pareos')}</option>
            <option value="robes_plage">{t('beach_dresses', 'Vestidos de Playa')}</option>
            <option value="maillots_tankini">{t('tankinis', 'Tankinis')}</option>
            <option value="maillots_monokini">{t('monokinis', 'Monokinis')}</option>
            <option value="couvre_maillots">{t('swim_coverups', 'Cubretrajes')}</option>
          </optgroup>

          {/* ROPA INTERIOR Y LENCERÍA */}
          <optgroup label={t('underwear_lingerie', 'Ropa Interior y Lencería')}>
            <option value="soutiens_gorge">{t('bras', 'Sostenes')}</option>
            <option value="culottes_femme">{t('panties', 'Bragas')}</option>
            <option value="ensembles_lingerie">{t('lingerie_sets', 'Conjuntos de Lencería')}</option>
            <option value="nuisettes_femme">{t('chemises', 'Camisones')}</option>
            <option value="pyjamas_femme">{t('pajamas', 'Pijamas')}</option>
            <option value="peignoirs_femme">{t('robes', 'Batas')}</option>
            <option value="collants_femme">{t('tights', 'Medias')}</option>
            <option value="bas_femme">{t('stockings', 'Medias Largas')}</option>
            <option value="body_femme">{t('bodysuits', 'Bodies')}</option>
          </optgroup>

          {/* MATERNIDAD */}
          <optgroup label={t('maternity', 'Maternidad')}>
            <option value="robes_maternite">{t('maternity_dresses', 'Vestidos de Maternidad')}</option>
            <option value="jeans_maternite">{t('maternity_jeans', 'Jeans de Maternidad')}</option>
            <option value="hauts_maternite">{t('maternity_tops', 'Tops de Maternidad')}</option>
            <option value="sous_vetements_maternite">{t('maternity_underwear', 'Ropa Interior de Maternidad')}</option>
            <option value="leggings_maternite">{t('maternity_leggings', 'Leggings de Maternidad')}</option>
            <option value="pyjamas_maternite">{t('maternity_pajamas', 'Pijamas de Maternidad')}</option>
          </optgroup>

          {/* ACCESORIOS DE MODA */}
          <optgroup label={t('fashion_accessories', 'Accesorios de Moda')}>
            <option value="echarpes_femme">{t('scarves', 'Bufandas')}</option>
            <option value="foulards_femme">{t('scarves_silk', 'Pañuelos de Seda')}</option>
            <option value="ceintures_femme">{t('belts', 'Cinturones')}</option>
            <option value="gants_femme">{t('gloves', 'Guantes')}</option>
            <option value="chapeaux_femme">{t('hats', 'Sombreros')}</option>
            <option value="bijoux_femme">{t('jewelry', 'Joyas')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>
 
      
    </div>
  );
};

export default React.memo(VetementsFemme);