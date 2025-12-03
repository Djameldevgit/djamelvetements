import React from 'react'
import { Form, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const SubCategoryTelephone = ({ postData = {}, handleChangeInput }) => {
  const { t, i18n } = useTranslation(['category', 'common'])
  const isRTL = i18n.language === 'ar'

  const safePostData = {
    category: "telephones", // Categoría fija para teléfonos
    subCategory: postData?.subCategory || "",
    ...postData
  }

  // 🔧 MANEJADOR DE CAMBIO
  const handleSubCategoryChange = (e) => {
    handleChangeInput(e)
    handleChangeInput({
      target: {
        name: 'category',
        value: 'telephones' // Siempre establece la categoría como 'telephones'
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
          value="telephones" 
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
          
          {/* 📱 TELÉFONOS */}
          <optgroup label={t('category:phones', 'Teléfonos')}>
            <option value="Smartphones">
              {t('category:smartphones', 'Smartphones')}
            </option>
            <option value="Telephones">
              {t('category:cell_phones', 'Téléphones cellulaires')}
            </option>
            <option value="FixFax">
              {t('category:landline_fax', 'Fixes & Fax')}
            </option>
          </optgroup>
          
          {/* 💻 TABLETAS */}
          <optgroup label={t('category:tablets', 'Tabletas')}>
            <option value="Tablettes">
              {t('category:tablets', 'Tablettes')}
            </option>
          </optgroup>
          
          {/* ⌚ SMARTWATCHES */}
          <optgroup label={t('category:smartwatches', 'Smartwatches')}>
            <option value="Smartwatchs">
              {t('category:smartwatches', 'Smartwatchs')}
            </option>
          </optgroup>
          
          {/* 🎧 AUDIO */}
          <optgroup label={t('category:audio', 'Audio')}>
            <option value="EcouteursSon">
              {t('category:headphones', 'Casques & Écouteurs')}
            </option>
            <option value="Baffle">
              {t('category:speakers', 'Baffle & Enceintes')}
            </option>
          </optgroup>
          
          {/* 🔌 CARGA Y ENERGÍA */}
          <optgroup label={t('category:charging', 'Carga & Energía')}>
            <option value="ChargeursCables">
              {t('category:chargers_cables', 'Chargeurs & Câbles')}
            </option>
            <option value="Powerbanks">
              {t('category:power_banks', 'Power Banks')}
            </option>
            <option value="StationChargement">
              {t('category:charging_stations', 'Stations de charge')}
            </option>
          </optgroup>
          
          {/* 🛡️ PROTECCIÓN */}
          <optgroup label={t('category:protection', 'Protection')}>
            <option value="ProtectionAntichoc">
              {t('category:protection', 'Protection & Antichoc')}
            </option>
            <option value="Coques">
              {t('category:covers', 'Coques & Étuis')}
            </option>
            <option value="ProtectionEcran">
              {t('category:screen_protectors', 'Protections d\'écran')}
            </option>
          </optgroup>
          
          {/* 🎮 GAMING Y ACCESORIOS */}
          <optgroup label={t('category:gaming_accessories', 'Gaming & Accesorios')}>
            <option value="Manettes">
              {t('category:gamepads', 'Manettes & Contrôleurs')}
            </option>
            <option value="VR">
              {t('category:vr', 'Réalité Virtuelle')}
            </option>
            <option value="SupportsStabilisateurs">
              {t('category:holders_stabilizers', 'Supports & Stabilisateurs')}
            </option>
          </optgroup>
          
          {/* 💾 ALMACENAMIENTO */}
          <optgroup label={t('category:storage', 'Almacenamiento')}>
            <option value="CartesMemoire">
              {t('category:memory_cards', 'Cartes Mémoire')}
            </option>
          </optgroup>
          
          {/* ✏️ ACCESORIOS */}
          <optgroup label={t('category:accessories', 'Accesorios')}>
            <option value="Stylets">
              {t('category:styli', 'Stylets & Stylets')}
            </option>
            <option value="Accessoires">
              {t('category:general_accessories', 'Accessoires divers')}
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

export default React.memo(SubCategoryTelephone)