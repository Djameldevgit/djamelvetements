import React from 'react';
import { Form, Card, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// 🔧 IMPORTACIONES CORREGIDAS
import VetementsHomme from './VetementsHomme';
import VetementsFemme from './VetementsFemme';
import ChaussuresHomme from './ChaussureHome';
import ChaussuresFemme from './ChaussureFemme';
import Montres from './Montres';
import Lunettes from './Lunettes';
import Bijoux from './Bijoux';
import Garcons from './Garcons';
import Filles from './Filles';
import Bebe from './Bebe';
import TennueProfesionelle from './TennueProfesionelle';
import SacsValises from './SacsValises';

const CategorySelector = ({ postData = {}, handleChangeInput, theme }) => {
  const { t, i18n } = useTranslation(['category', 'common']);
  const isRTL = i18n.language === 'ar';
  const isFrench = i18n.language === 'fr';

  // 🔧 Asegurarnos de que postData tenga valores por defecto
  const safePostData = {
    category: postData?.category || "",
    subCategory: postData?.subCategory || "",
    ...postData
  };

  // 🎯 CONFIGURACIÓN RTL MEJORADA
  const rtlStyles = {
    direction: isRTL ? 'rtl' : 'ltr',
    textAlign: isRTL ? 'right' : 'left',
    formLabel: {
      fontWeight: '600',
      marginBottom: '6px',
      display: 'block',
      textAlign: isRTL ? 'right' : 'left'
    },
    formSelect: {
      border: 'none',
      backgroundColor: theme ? '#333' : '#f8f9fa',
      padding: '12px 16px',
      borderRadius: '8px',
      color: theme ? 'white' : '#111',
      width: '100%',
      textAlign: isRTL ? 'right' : 'left',
      // 🚨 IMPORTANTE: Forzar dirección del texto en selects
      direction: isRTL ? 'rtl' : 'ltr'
    },
    card: {
      border: 'none',
      borderRadius: '12px',
      backgroundColor: theme ? '#1a1a1a' : 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    selectedIndicator: {
      backgroundColor: theme ? '#2d3748' : '#3b82f6',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '8px',
      fontSize: '14px',
      textAlign: isRTL ? 'right' : 'left',
      marginTop: '12px'
    }
  };

  // 🌍 CATEGORÍAS CON MEJOR TRADUCCIÓN
  const categories = [
    { 
      value: 'vetements_homme', 
      label: t('category:mens_clothing', 'Vêtements Homme'),
      emoji: '👔',
      component: VetementsHomme,
      group: 'clothing'
    },
    { 
      value: 'vetements_femme', 
      label: t('category:womens_clothing', 'Vêtements Femme'),
      emoji: '👗',
      component: VetementsFemme,
      group: 'clothing'
    },
    { 
      value: 'chaussures_homme', 
      label: t('category:mens_shoes', 'Chaussures Homme'),
      emoji: '👞',
      component: ChaussuresHomme,
      group: 'footwear'
    },
    { 
      value: 'chaussures_femme', 
      label: t('category:womens_shoes', 'Chaussures Femme'),
      emoji: '👠',
      component: ChaussuresFemme,
      group: 'footwear'
    },
    { 
      value: 'montres', 
      label: t('category:watches', 'Montres'),
      emoji: '⌚',
      component: Montres,
      group: 'accessories'
    },
    { 
      value: 'lunettes', 
      label: t('category:glasses', 'Lunettes'),
      emoji: '👓',
      component: Lunettes,
      group: 'accessories'
    },
    { 
      value: 'bijoux', 
      label: t('category:jewelry', 'Bijoux'),
      emoji: '💎',
      component: Bijoux,
      group: 'accessories'
    },
    { 
      value: 'garcons', 
      label: t('category:boys', 'Garçons'),
      emoji: '👦',
      component: Garcons,
      group: 'children'
    },
    { 
      value: 'filles', 
      label: t('category:girls', 'Filles'),
      emoji: '👧',
      component: Filles,
      group: 'children'
    },
    { 
      value: 'bebe', 
      label: t('category:baby', 'Bébé'),
      emoji: '👶',
      component: Bebe,
      group: 'children'
    },
    { 
      value: 'tenues_professionnelles', 
      label: t('category:professional_clothing', 'Tenues Professionnelles'),
      emoji: '💼',
      component: TennueProfesionelle,
      group: 'professional'
    },
    { 
      value: 'sacs_valises', 
      label: t('category:bags_luggage', 'Sacs & Valises'),
      emoji: '👜',
      component: SacsValises,
      group: 'accessories'
    }
  ];

  // 🎯 Asegurar que selectedCategory no sea undefined
  const selectedCategory = categories.find(cat => cat.value === safePostData.category) || null;
  const SubCategoryComponent = selectedCategory?.component;

  // 🌍 GRUPOS DE CATEGORÍAS MEJOR TRADUCIDOS
  const categoryGroups = {
    clothing: t('category:clothing', 'Vêtements'),
    footwear: t('category:footwear', 'Chaussures'),
    accessories: t('category:accessories', 'Accessoires'),
    children: t('category:children', 'Enfants'),
    professional: t('category:professional', 'Professionnel')
  };

  return (
    <Card style={rtlStyles.card}>
      <Card.Body className="p-3" style={{ direction: rtlStyles.direction }}>
        
        {/* 📂 CATEGORÍA PRINCIPAL - MEJORADO RTL */}
        <div className="mb-3">
          <Form.Label style={rtlStyles.formLabel}>
            📂 {t('category:select_category', 'Catégorie Principale')}
          </Form.Label>
          <Form.Select
            name="category"
            value={safePostData.category}
            onChange={handleChangeInput}
            style={rtlStyles.formSelect}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <option value="">
              {t('category:select_category_placeholder', '👉 Choisissez une catégorie')}
            </option>
            
            {/* 👕 VÊTEMENTS */}
            <optgroup label={categoryGroups.clothing}>
              <option value="vetements_homme">👔 {t('category:mens_clothing', 'Vêtements Homme')}</option>
              <option value="vetements_femme">👗 {t('category:womens_clothing', 'Vêtements Femme')}</option>
            </optgroup>
            
            {/* 👟 CHAUSSURES */}
            <optgroup label={categoryGroups.footwear}>
              <option value="chaussures_homme">👞 {t('category:mens_shoes', 'Chaussures Homme')}</option>
              <option value="chaussures_femme">👠 {t('category:womens_shoes', 'Chaussures Femme')}</option>
            </optgroup>
            
            {/* 💎 ACCESSOIRES */}
            <optgroup label={categoryGroups.accessories}>
              <option value="montres">⌚ {t('category:watches', 'Montres')}</option>
              <option value="lunettes">👓 {t('category:glasses', 'Lunettes')}</option>
              <option value="bijoux">💎 {t('category:jewelry', 'Bijoux')}</option>
              <option value="sacs_valises">👜 {t('category:bags_luggage', 'Sacs & Valises')}</option>
            </optgroup>
            
            {/* 👶 ENFANTS */}
            <optgroup label={categoryGroups.children}>
              <option value="garcons">👦 {t('category:boys', 'Garçons')}</option>
              <option value="filles">👧 {t('category:girls', 'Filles')}</option>
              <option value="bebe">👶 {t('category:baby', 'Bébé')}</option>
            </optgroup>
            
            {/* 💼 PROFESSIONNEL */}
            <optgroup label={categoryGroups.professional}>
              <option value="tenues_professionnelles">💼 {t('category:professional_clothing', 'Tenues Professionnelles')}</option>
            </optgroup>
          </Form.Select>
        </div>

        {/* 📋 SUBCATEGORÍA - MEJORADO RTL */}
        <div>
          <Form.Label style={rtlStyles.formLabel}>
            📋 {t('category:select_subcategory', 'Sous-Catégorie')}
          </Form.Label>
          
          {selectedCategory && SubCategoryComponent ? (
            <div style={{ width: '100%', direction: rtlStyles.direction }}>
              <SubCategoryComponent 
                postData={safePostData} 
                handleChangeInput={handleChangeInput} 
                theme={theme}
              />
            </div>
          ) : (
            <Form.Select
              name="subCategory"
              value={safePostData.subCategory}
              onChange={handleChangeInput}
              style={rtlStyles.formSelect}
              dir={isRTL ? 'rtl' : 'ltr'}
              disabled={!safePostData.category}
            >
              <option value="">
                {t('category:select_subcategory_placeholder', '📝 Choisissez une sous-catégorie')}
              </option>
              {safePostData.category && (
                <>
                  <option value="standard">🔄 {t('category:standard', 'Standard')}</option>
                  <option value="premium">⭐ {t('category:premium', 'Premium')}</option>
                  <option value="basique">🔹 {t('category:basic', 'Basique')}</option>
                </>
              )}
            </Form.Select>
          )}
        </div>

        {/* 🎯 INDICADOR DE SELECCIÓN ACTUAL - MEJORADO RTL */}
        {(safePostData.category || safePostData.subCategory) && (
          <div style={rtlStyles.selectedIndicator}>
            <div className="fw-semibold">
              {safePostData.category && (
                <span>
                  {categories.find(cat => cat.value === safePostData.category)?.emoji} 
                  {' '}
                  {categories.find(cat => cat.value === safePostData.category)?.label}
                </span>
              )}
              {safePostData.subCategory && (
                <span>
                  {safePostData.category && ' • '}
                  {safePostData.subCategory}
                </span>
              )}
            </div>
          </div>
        )}

        {/* ℹ️ TEXTO DE AYUDA MEJORADO */}
        {!safePostData.category && (
          <div className={`mt-2 text-muted small ${isRTL ? 'text-end' : ''}`}>
            {t('category:category_help', 'Sélectionnez une catégorie pour voir les sous-catégories disponibles')}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default React.memo(CategorySelector);