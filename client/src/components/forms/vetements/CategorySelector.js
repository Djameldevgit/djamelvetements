import React from 'react';
import { Form, Card, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// 📦 IMPORTACIONES CORREGIDAS - USANDO NOMBRES EXACTOS
import VetementsHomme from './VetementsHomme';
import VetementsFemme from './VetementsFemme';
import ChaussuresHomme from './ChaussureHome';        // 🔥 Nombre real
import ChaussuresFemme from './ChaussureFemme';       // 🔥 Nombre real  
import Montres from './Montres';
import Lunettes from './Lunettes';
import Bijoux from './Bijoux';
import Garcons from './Garcons';
import Filles from './Filles';
import Bebe from './Bebe';
import TenueProfessionnelle from './TennueProfesionelle'; // 🔥 Nombre real
import SacsValises from './SacsValises';

const CategorySelector = ({ postData = {}, handleChangeInput, theme }) => {
  const { t, i18n } = useTranslation(['category', 'common']);
  const isRTL = i18n.language === 'ar';
  const isFrench = i18n.language === 'fr';

  // 🛡️ DATOS SEGUROS CON VALORES POR DEFECTO
  const safePostData = {
    category: postData?.category || "",
    subCategory: postData?.subCategory || "",
    ...postData
  };

  // 🎨 CONFIGURACIÓN RTL MEJORADA
  const rtlStyles = {
    direction: isRTL ? 'rtl' : 'ltr',
    textAlign: isRTL ? 'right' : 'left',
    formLabel: {
      fontWeight: '600',
      marginBottom: '8px',
      display: 'block',
      textAlign: isRTL ? 'right' : 'left',
      color: theme ? '#e2e8f0' : '#2d3748'
    },
    formSelect: {
      border: `1px solid ${theme ? '#4a5568' : '#cbd5e0'}`,
      backgroundColor: theme ? '#2d3748' : '#ffffff',
      padding: '12px 16px',
      borderRadius: '8px',
      color: theme ? 'white' : '#2d3748',
      width: '100%',
      textAlign: isRTL ? 'right' : 'left',
      direction: isRTL ? 'rtl' : 'ltr',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    card: {
      border: `1px solid ${theme ? '#4a5568' : '#e2e8f0'}`,
      borderRadius: '12px',
      backgroundColor: theme ? '#1a202c' : '#ffffff',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
    },
    selectedIndicator: {
      backgroundColor: theme ? '#2d3748' : '#3b82f6',
      color: 'white',
      padding: '10px 14px',
      borderRadius: '8px',
      fontSize: '14px',
      textAlign: isRTL ? 'right' : 'left',
      marginTop: '15px',
      fontWeight: '500'
    },
    optgroup: {
      fontWeight: '600',
      color: theme ? '#90cdf4' : '#2b6cb0',
      fontSize: '13px'
    }
  };

  // 🌍 CONFIGURACIÓN DE CATEGORÍAS COMPLETA
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
      component: TenueProfessionnelle,
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

  // 🎯 CATEGORÍA SELECCIONADA
  const selectedCategory = categories.find(cat => cat.value === safePostData.category) || null;
  const SubCategoryComponent = selectedCategory?.component;

  // 🌍 GRUPOS DE CATEGORÍAS
  const categoryGroups = {
    clothing: t('category:clothing', 'Vêtements'),
    footwear: t('category:footwear', 'Chaussures'),
    accessories: t('category:accessories', 'Accessoires'),
    children: t('category:children', 'Enfants'),
    professional: t('category:professional', 'Professionnel')
  };

  return (
    <Card style={rtlStyles.card}>
      <Card className=" " style={{ direction: rtlStyles.direction }}>
        
        {/* 📂 CATEGORÍA PRINCIPAL - COMPLETA */}
        <div className=" ">
          <Form.Label style={rtlStyles.formLabel}>
            📂 {t('category:select_category', 'Catégorie Principale')} *
          </Form.Label>
          <Form.Select
            name="category"
            value={safePostData.category}
            onChange={handleChangeInput}
            style={rtlStyles.formSelect}
            dir={isRTL ? 'rtl' : 'ltr'}
            required
          >
            <option value="">
              {t('Selectionnezcatégorie')}
            </option>
            
            {/* 👔 VÊTEMENTS - AHORA COMPLETO */}
            <optgroup label={categoryGroups.clothing} style={rtlStyles.optgroup}>
              <option value="vetements_homme">👔 {t('category:mens_clothing', 'Vêtements Homme')}</option>
              <option value="vetements_femme">👗 {t('category:womens_clothing', 'Vêtements Femme')}</option>
            </optgroup>
            
            {/* 👟 CHAUSSURES */}
            <optgroup label={categoryGroups.footwear} style={rtlStyles.optgroup}>
              <option value="chaussures_homme">👞 {t('category:mens_shoes', 'Chaussures Homme')}</option>
              <option value="chaussures_femme">👠 {t('category:womens_shoes', 'Chaussures Femme')}</option>
            </optgroup>
            
            {/* 💎 ACCESSOIRES */}
            <optgroup label={categoryGroups.accessories} style={rtlStyles.optgroup}>
              <option value="montres">⌚ {t('category:watches', 'Montres')}</option>
              <option value="lunettes">👓 {t('category:glasses', 'Lunettes')}</option>
              <option value="bijoux">💎 {t('category:jewelry', 'Bijoux')}</option>
              <option value="sacs_valises">👜 {t('category:bags_luggage', 'Sacs & Valises')}</option>
            </optgroup>
            
            {/* 👶 ENFANTS */}
            <optgroup label={categoryGroups.children} style={rtlStyles.optgroup}>
              <option value="garcons">👦 {t('category:boys', 'Garçons')}</option>
              <option value="filles">👧 {t('category:girls', 'Filles')}</option>
              <option value="bebe">👶 {t('category:baby', 'Bébé')}</option>
            </optgroup>
            
            {/* 💼 PROFESSIONNEL */}
            <optgroup label={categoryGroups.professional} style={rtlStyles.optgroup}>
              <option value="tenues_professionnelles">💼 {t('category:professional_clothing', 'Tenues Professionnelles')}</option>
            </optgroup>
          </Form.Select>
        </div>

        {/* 📋 SUBCATEGORÍA - MEJORADA */}
        <div className=" ">
     
          
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
              required={!!safePostData.category}
            >
              <option value="">
                {safePostData.category 
                  ? t('Choisissezsouscatégorie')
                  : t('category:select_subcategory_placeholder', '📝 Sélectionnez d\'abord une catégorie')
                }
              </option>
              {safePostData.category && (
                <>
                  <option value="standard">🔄 {t('category:standard', 'Standard')}</option>
                  <option value="premium">⭐ {t('category:premium', 'Premium')}</option>
                  <option value="basique">🔹 {t('category:basic', 'Basique')}</option>
                  <option value="luxe">💎 {t('category:luxury', 'Luxe')}</option>
                </>
              )}
            </Form.Select>
          )}
        </div>
 
      </Card >
    </Card>
  );
};

export default React.memo(CategorySelector);