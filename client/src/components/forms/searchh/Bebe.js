import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Bebe = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('bebes');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* TIPO PRINCIPAL DE ARTÍCULOS PARA BEBÉ */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          👶 {t('baby_products', 'Artículos para bebé')}
        </Form.Label>
        <Form.Select
          name="subCategory"
          value={postData.subCategory}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">{t('select_subcategory', 'Selecciona la subcategoría')}</option>
          
          {/* ROPA DE BEBÉ */}
          <optgroup label={t('baby_clothing', 'Ropa de bebé')}>
            <option value="bodys">{t('bodysuits', 'Bodies')}</option>
            <option value="pyjamas">{t('pajamas', 'Pijamas')}</option>
            <option value="combinaisons">{t('rompers', 'Mono bodies')}</option>
            <option value="robes">{t('dresses', 'Vestidos')}</option>
            <option value="pantalons">{t('pants', 'Pantalones')}</option>
            <option value="hauts">{t('tops', 'Camisetas')}</option>
            <option value="ensembles">{t('outfits', 'Conjuntos')}</option>
            <option value="manteaux">{t('coats', 'Abrigos')}</option>
            <option value="bonnets">{t('hats', 'Gorros')}</option>
            <option value="chaussettes">{t('socks', 'Calcetines')}</option>
          </optgroup>
          
          {/* CALZADO DE BEBÉ */}
          <optgroup label={t('baby_footwear', 'Calzado de bebé')}>
            <option value="chaussons">{t('booties', 'Patucos')}</option>
            <option value="sandales">{t('sandals', 'Sandalias')}</option>
            <option value="baskets">{t('sneakers', 'Zapatillas')}</option>
            <option value="chaussures_marche">{t('walking_shoes', 'Zapatos de caminar')}</option>
            <option value="bottes">{t('boots', 'Botas')}</option>
          </optgroup>
          
          {/* ACCESORIOS PARA BEBÉ */}
          <optgroup label={t('baby_accessories', 'Accesorios para bebé')}>
            <option value="bavoirs">{t('bibs', 'Babis')}</option>
            <option value="couches">{t('diapers', 'Pañales')}</option>
            <option value="doudous">{t('comforters', 'Peluches')}</option>
            <option value="sucettes">{t('pacifiers', 'Chupetes')}</option>
            <option value="biberons">{t('bottles', 'Biberones')}</option>
          </optgroup>
          
          {/* EQUIPAMIENTO PARA BEBÉ */}
          <optgroup label={t('baby_equipment', 'Equipamiento para bebé')}>
            <option value="poussettes">{t('strollers', 'Coches')}</option>
            <option value="sieges_auto">{t('car_seats', 'Sillas de coche')}</option>
            <option value="lits">{t('cribs', 'Cunas')}</option>
            <option value="parcs">{t('playpens', 'Parques')}</option>
            <option value="transats">{t('bouncers', 'Hamacas')}</option>
            <option value="tapis_eveil">{t('play_mats', 'Tapetes de juego')}</option>
          </optgroup>
          
          {/* HIGIENE Y CUIDADO */}
          <optgroup label={t('hygiene_care', 'Higiene y cuidado')}>
            <option value="soins_peau">{t('skin_care', 'Cuidado de la piel')}</option>
            <option value="produits_bain">{t('bath_products', 'Productos de baño')}</option>
            <option value="cosmetiques">{t('cosmetics', 'Cosméticos')}</option>
            <option value="sante">{t('health', 'Salud')}</option>
          </optgroup>
          
          {/* JUGUETES Y EDUCACIÓN */}
          <optgroup label={t('toys_education', 'Juguetes y educación')}>
            <option value="jouets_eveil">{t('developmental_toys', 'Juguetes de desarrollo')}</option>
            <option value="peluches">{t('stuffed_toys', 'Juguetes de peluche')}</option>
            <option value="livres">{t('books', 'Libros')}</option>
            <option value="jeux_musique">{t('music_toys', 'Juguetes musicales')}</option>
            <option value="mobiles">{t('mobiles', 'Móviles')}</option>
          </optgroup>
          
          {/* ALIMENTACIÓN */}
          <optgroup label={t('feeding', 'Alimentación')}>
            <option value="vaisselle">{t('dishware', 'Vajilla')}</option>
            <option value="ustensiles">{t('utensils', 'Utensilios')}</option>
            <option value="chaise_haute">{t('high_chairs', 'Tronas')}</option>
            <option value="chauffe_biberon">{t('bottle_warmers', 'Calientabiberones')}</option>
          </optgroup>
          
          {/* SEGURIDAD */}
          <optgroup label={t('safety', 'Seguridad')}>
            <option value="securite_maison">{t('home_safety', 'Seguridad en casa')}</option>
            <option value="moniteurs">{t('monitors', 'Monitores')}</option>
            <option value="barrieres">{t('gates', 'Barreras')}</option>
            <option value="protections">{t('protectors', 'Protectores')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

      {/* EDAD Y TAMAÑO */}
      <Row className="g-3">
        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('age_range', 'Rango de edad')}
            </Form.Label>
            <Form.Select
              name="edadBebes"
              value={postData.edadBebes}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select_age', 'Selecciona edad')}</option>
              <option value="newborn">{t('newborn', 'Recién nacido (0-3 meses)')}</option>
              <option value="3_6_months">{t('3_6_months', '3-6 meses')}</option>
              <option value="6_9_months">{t('6_9_months', '6-9 meses')}</option>
              <option value="9_12_months">{t('9_12_months', '9-12 meses')}</option>
              <option value="12_18_months">{t('12_18_months', '12-18 meses')}</option>
              <option value="18_24_months">{t('18_24_months', '18-24 meses')}</option>
              <option value="2_3_years">{t('2_3_years', '2-3 años')}</option>
            </Form.Select>
          </Form.Group>
        </Col>

        
      </Row>
  

      <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
        {t('choose_baby_product', 'Elige el tipo de artículo para bebé y especifica sus características')}
      </Form.Text>
    </div>
  );
};

export default React.memo(Bebe);