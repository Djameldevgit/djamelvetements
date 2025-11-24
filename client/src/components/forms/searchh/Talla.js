import React, { useMemo } from 'react';
import { Form, Row, Col, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Talla = ({ postData, handleArrayChange }) => {
  const { t, i18n } = useTranslation('talla');
  const isRTL = i18n.language === 'ar';

  // 🎯 FUNCIONES SEGURAS MEJORADAS
  const safeArray = (potentialArray) => {
    if (!potentialArray) return [];
    if (Array.isArray(potentialArray)) return potentialArray;
    if (typeof potentialArray === 'string') {
      return potentialArray.split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
  };

  const safeIncludes = (array, value) => {
    const safeArrayValue = safeArray(array);
    return safeArrayValue.includes(value);
  };

  // 🎯 DEFINICIÓN COMPLETA DE TALLAS POR CATEGORÍA Y SUBCATEGORÍA
  const getFilteredSizes = useMemo(() => {
    if (!postData?.subCategory) return [];

    const subCategory = postData.subCategory.toLowerCase();
    const category = postData.category;
    let allSizes = [];

    // 👔 ROPA HOMBRE
    if (category === 'vetements_homme') {
      if (subCategory.includes('chemise') || subCategory.includes('shirt') || subCategory.includes('camisa')) {
        allSizes = ['xs_hombre', 's_hombre', 'm_hombre', 'l_hombre', 'xl_hombre', 'xxl_hombre', 'xxxl_hombre'];
      }
      else if (subCategory.includes('pantalon') || subCategory.includes('pants') || subCategory.includes('jeans')) {
        allSizes = ['28', '30', '32', '34', '36', '38', '40', '42', '44'];
      }
      else if (subCategory.includes('costume') || subCategory.includes('suit') || subCategory.includes('traje')) {
        allSizes = ['46', '48', '50', '52', '54', '56', '58'];
      }
      else if (subCategory.includes('tshirt') || subCategory.includes('t-shirt') || subCategory.includes('polo')) {
        allSizes = ['xs_hombre', 's_hombre', 'm_hombre', 'l_hombre', 'xl_hombre', 'xxl_hombre', 'xxxl_hombre'];
      }
      else {
        allSizes = ['xs_hombre', 's_hombre', 'm_hombre', 'l_hombre', 'xl_hombre', 'xxl_hombre', 'xxxl_hombre'];
      }
    }

    // 👗 ROPA MUJER
    else if (category === 'vetements_femme') {
      if (subCategory.includes('robe') || subCategory.includes('dress') || subCategory.includes('vestido')) {
        allSizes = ['xs_mujer', 's_mujer', 'm_mujer', 'l_mujer', 'xl_mujer', 'xxl_mujer', 'xxxl_mujer'];
      }
      else if (subCategory.includes('jupe') || subCategory.includes('skirt') || subCategory.includes('falda')) {
        allSizes = ['xs_mujer', 's_mujer', 'm_mujer', 'l_mujer', 'xl_mujer', 'xxl_mujer'];
      }
      else if (subCategory.includes('blouse') || subCategory.includes('blusa') || subCategory.includes('top')) {
        allSizes = ['xs_mujer', 's_mujer', 'm_mujer', 'l_mujer', 'xl_mujer', 'xxl_mujer'];
      }
      else if (subCategory.includes('tshirt') || subCategory.includes('t-shirt')) {
        allSizes = ['xs_mujer', 's_mujer', 'm_mujer', 'l_mujer', 'xl_mujer', 'xxl_mujer'];
      }
      else {
        allSizes = ['xs_mujer', 's_mujer', 'm_mujer', 'l_mujer', 'xl_mujer', 'xxl_mujer', 'xxxl_mujer'];
      }
    }

    // 👞 CALZADO HOMBRE
    else if (category === 'chaussures_homme') {
      allSizes = ['39', '40', '41', '42', '43', '44', '45', '46'];
    }

    // 👠 CALZADO MUJER
    else if (category === 'chaussures_femme') {
      allSizes = ['35', '36', '37', '38', '39', '40', '41', '42'];
    }

    // 👶 BEBÉS
    else if (category === 'bebe') {
      allSizes = ['prematuro', 'recien_nacido', '0_3_meses', '3_6_meses', '6_9_meses', '9_12_meses', '12_18_meses', '18_24_meses'];
    }

    // 👦 NIÑOS
    else if (category === 'garcons') {
      allSizes = ['2_3_años', '3_4_años', '4_5_años', '5_6_años', '6_7_años', '7_8_años', '8_9_años', '9_10_años', '10_11_años', '11_12_años', '12_13_años', '13_14_años'];
    }

    // 👧 NIÑAS
    else if (category === 'filles') {
      allSizes = ['2_3_años', '3_4_años', '4_5_años', '5_6_años', '6_7_años', '7_8_años', '8_9_años', '9_10_años', '10_11_años', '11_12_años', '12_13_años', '13_14_años'];
    }

    // ⌚ RELOJES
    else if (category === 'montres') {
      allSizes = ['28mm', '32mm', '36mm', '38mm', '40mm', '42mm', '44mm', '46mm'];
    }

    // 👓 GAFAS
    else if (category === 'lunettes') {
      allSizes = ['pequeño', 'mediano', 'grande', 'xs_gafas', 's_gafas', 'm_gafas', 'l_gafas'];
    }

    // 💎 JOYERÍA
    else if (category === 'bijoux') {
      allSizes = ['15cm', '16cm', '17cm', '18cm', '19cm', '20cm', '21cm', '22cm', 'talla_16', 'talla_17', 'talla_18', 'talla_19', 'talla_20'];
    }

    // 👜 BOLSOS Y MALETAS
    else if (category === 'sacs_valises') {
      allSizes = ['universal', 'unica', 'unico_tamaño', 'ajustable', 'pequeño', 'mediano', 'grande'];
    }

    // 💼 ROPA PROFESIONAL
    else if (category === 'tenues_professionnelles') {
      allSizes = ['s_pro', 'm_pro', 'l_pro', 'xl_pro', 'xxl_pro'];
    }

    // ⭐ DEFAULT
    else {
      allSizes = ['universal', 'unica', 'unico_tamaño', 'ajustable', 'personalizada'];
    }

    return allSizes;
  }, [postData?.category, postData?.subCategory, t]);

  // ✅ Manejar cambios en los checkboxes - MEJORADO
  const handleSizeChange = (sizeValue) => {
    if (!handleArrayChange) {
      console.error('❌ handleArrayChange no está disponible');
      return;
    }

    const currentSizes = safeArray(postData?.talla);
    const isCurrentlySelected = safeIncludes(postData?.talla, sizeValue);
    
    // 🎯 LLAMADA CORRECTA A handleArrayChange con el estado actual
    handleArrayChange('talla', sizeValue, !isCurrentlySelected);
  };

  // ✅ Verificar si una talla está seleccionada - SEGURO
  const isSizeSelected = (sizeValue) => {
    return safeIncludes(postData?.talla, sizeValue);
  };

  // ✅ Contar tallas seleccionadas - SEGURO
  const getSelectedCount = () => {
    return safeArray(postData?.talla).length;
  };

  // 🎯 FUNCIÓN PARA OBTENER TEXTO TRADUCIDO DE TALLA
  const getTranslatedSize = (sizeKey) => {
    const translations = {
      'xs_hombre': t('xs_men', 'XS Hombre'),
      's_hombre': t('s_men', 'S Hombre'),
      'm_hombre': t('m_men', 'M Hombre'),
      'l_hombre': t('l_men', 'L Hombre'),
      'xl_hombre': t('xl_men', 'XL Hombre'),
      'xxl_hombre': t('xxl_men', 'XXL Hombre'),
      'xxxl_hombre': t('xxxl_men', 'XXXL Hombre'),
      'xs_mujer': t('xs_women', 'XS Mujer'),
      's_mujer': t('s_women', 'S Mujer'),
      'm_mujer': t('m_women', 'M Mujer'),
      'l_mujer': t('l_women', 'L Mujer'),
      'xl_mujer': t('xl_women', 'XL Mujer'),
      'xxl_mujer': t('xxl_women', 'XXL Mujer'),
      'xxxl_mujer': t('xxxl_women', 'XXXL Mujer'),
      'prematuro': t('premature', 'Prematuro'),
      'recien_nacido': t('newborn', 'Recién Nacido'),
      '0_3_meses': t('0_3_months', '0-3 Meses'),
      '3_6_meses': t('3_6_months', '3-6 Meses'),
      '6_9_meses': t('6_9_months', '6-9 Meses'),
      '9_12_meses': t('9_12_months', '9-12 Meses'),
      '12_18_meses': t('12_18_months', '12-18 Meses'),
      '18_24_meses': t('18_24_months', '18-24 Meses'),
      'pequeño': t('small', 'Pequeño'),
      'mediano': t('medium', 'Mediano'),
      'grande': t('large', 'Grande'),
      'universal': t('universal', 'Universal'),
      'unica': t('unique', 'Única'),
      'unico_tamaño': t('one_size', 'Único Tamaño'),
      'ajustable': t('adjustable', 'Ajustable'),
      'personalizada': t('custom', 'Personalizada'),
      's_pro': t('s_pro', 'S Profesional'),
      'm_pro': t('m_pro', 'M Profesional'),
      'l_pro': t('l_pro', 'L Profesional'),
      'xl_pro': t('xl_pro', 'XL Profesional'),
      'xxl_pro': t('xxl_pro', 'XXL Profesional')
    };
    
    return translations[sizeKey] || sizeKey.replace(/_/g, ' ');
  };

  if (!postData?.subCategory) {
    return (
      <div className="text-center py-4 text-muted">
        <div className="mb-2" style={{ fontSize: '2rem' }}>📏</div>
        <p className="mb-0">
          {t('select_subcategory_first', 'Selecciona una subcategoría para ver las tallas disponibles')}
        </p>
      </div>
    )
  }

  return (
    <div className="mb-3 w-100" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={`d-flex justify-content-between align-items-center mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span className="fw-bold fs-6">
          📏 {t('available_sizes', 'Tallas disponibles')}
        </span>
        {getSelectedCount() > 0 && (
          <Badge bg="primary" className="fs-6">
            {getSelectedCount()} {t('selected', 'seleccionadas')}
          </Badge>
        )}
      </div>

      <Row className="g-2" dir={isRTL ? 'rtl' : 'ltr'}>
        {getFilteredSizes.map((size) => (
          <Col key={size} xs={6} sm={4} md={3} lg={2}>
            <Form.Check
              type="checkbox"
              id={`size-${size}`}
              name="talla"
              value={size}
              checked={isSizeSelected(size)}
              onChange={() => handleSizeChange(size)}
              className={`mb-2 ${isRTL ? 'text-end' : ''}`}
              label={
                <span className="fw-semibold">
                  {getTranslatedSize(size)}
                </span>
              }
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default React.memo(Talla);