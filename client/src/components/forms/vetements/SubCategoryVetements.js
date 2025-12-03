import React from 'react'
import { Form, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const SubCategorySelector = ({ postData = {}, handleChangeInput, theme }) => {
  const { t, i18n } = useTranslation(['category', 'common'])
  const isRTL = i18n.language === 'ar'

  const safePostData = {
    category: "vetements",
    subCategory: postData?.subCategory || "",
    ...postData
  }

  // 🔧 MANEJADOR DE CAMBIO
  const handleSubCategoryChange = (e) => {
    handleChangeInput(e)
    handleChangeInput({
      target: {
        name: 'category',
        value: 'vetements'
      }
    })
  }

  return (
    <Card className="p-3 mb-3">
      <Form.Group>
        {/* 📄 TÍTULO SIMPLE */}
        <Form.Label className="fw-bold mb-2">
          {t('category:select_subcategory', 'Subcategoría Principal')}
        </Form.Label>
        
        {/* 📂 CATEGORÍA PRINCIPAL - OCULTA */}
        <input 
          type="hidden" 
          name="category" 
          value="vetements" 
        />

        {/* 📝 SELECT SIMPLE */}
        <Form.Select
          name="subCategory"
          value={safePostData.subCategory}
          onChange={handleSubCategoryChange}
          style={{
            textAlign: isRTL ? 'right' : 'left',
            direction: isRTL ? 'rtl' : 'ltr'
          }}
        >
          <option value="">
            {t('category:choose_subcategory', 'Selecciona una subcategoría')}
          </option>
          
          {/* 👕 ROPA */}
          <optgroup label={t('category:clothing', 'Ropa')}>
            <option value="ropahombre">
              {t('category:mens_clothing', 'Ropa Hombre')}
            </option>
            <option value="ropamujer">
              {t('category:womens_clothing', 'Ropa Mujer')}
            </option>
          </optgroup>
          
          {/* 👟 CALZADO */}
          <optgroup label={t('category:footwear', 'Calzado')}>
            <option value="zapatoshombre">
              {t('category:mens_shoes', 'Calzado Hombre')}
            </option>
            <option value="zapatosmujer">
              {t('category:womens_shoes', 'Calzado Mujer')}
            </option>
          </optgroup>
          
          {/* 💎 ACCESORIOS */}
          <optgroup label={t('category:accessories', 'Accesorios')}>
            <option value="reloj">
              {t('category:watches', 'Relojes')}
            </option>
            <option value="gafas">
              {t('category:glasses', 'Gafas')}
            </option>
            <option value="bijoux">
              {t('category:jewelry', 'Joyería')}
            </option>
            <option value="sacvalise">
              {t('category:bags_luggage', 'Bolsos y Maletas')}
            </option>
          </optgroup>
          
          {/* 👶 INFANTIL */}
          <optgroup label={t('category:children_clothing', 'Ropa Infantil')}>
            <option value="garcons">
              {t('category:boys_clothing', 'Ropa Niños')}
            </option>
            <option value="filles">
              {t('category:girls_clothing', 'Ropa Niñas')}
            </option>
            <option value="bebes">
              {t('category:baby_clothing', 'Ropa Bebé')}
            </option>
          </optgroup>
          
          {/* 💼 PROFESIONAL */}
          <optgroup label={t('category:professional', 'Profesional')}>
            <option value="TennueProfesionelle">
              {t('category:professional_clothing', 'Ropa Profesional')}
            </option>
          </optgroup>
        </Form.Select>
        
        {/* 🔢 INFO SIMPLE */}
        <div className="text-muted small mt-1" style={{
          textAlign: isRTL ? 'left' : 'right',
          direction: 'ltr'
        }}>
          {t('category:subcategory_info', 'Selecciona una opción')}
        </div>
      </Form.Group>
    </Card>
  )
}

export default React.memo(SubCategorySelector)