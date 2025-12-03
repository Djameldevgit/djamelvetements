import React from 'react';
import { Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Talla = ({ postData, tallaData, onTallaChange }) => {
  const { t, i18n } = useTranslation('talla');
  const isRTL = i18n.language === 'ar';

  // ✅ Tallas disponibles (simplificado)
  const availableSizes = {
    ropahombre: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    ropamujer: ['XS', 'S', 'M', 'L', 'XL'],
    zapatoshombre: ['39', '40', '41', '42', '43', '44'],
    zapatosmujer: ['35', '36', '37', '38', '39', '40'],
    bebes: ['0-3M', '3-6M', '6-9M', '9-12M', '12-18M'],
    garcons: ['2-3A', '4-5A', '6-7A', '8-9A', '10-11A'],
    filles: ['2-3A', '4-5A', '6-7A', '8-9A', '10-11A'],
    reloj: ['38mm', '40mm', '42mm', '44mm'],
    gafas: ['Pequeño', 'Mediano', 'Grande'],
    bijoux: ['16cm', '17cm', '18cm', '19cm'],
    sacvalise: ['Pequeño', 'Mediano', 'Grande'],
    TennueProfesionelle: ['S', 'M', 'L', 'XL']
  };

  // ✅ Obtener tallas según subcategoría
  const getSizes = () => {
    const subCat = postData?.subCategory;
    return availableSizes[subCat] || ['Único Tamaño'];
  };

  // ✅ Manejar cambio de checkbox
  const handleCheckboxChange = (size) => {
    if (!onTallaChange) {
      console.error('❌ onTallaChange no disponible');
      return;
    }
    
    const isSelected = Array.isArray(tallaData) && tallaData.includes(size);
    onTallaChange(size, !isSelected);
  };

  // ✅ Verificar si está seleccionado
  const isSelected = (size) => {
    return Array.isArray(tallaData) && tallaData.includes(size);
  };

  if (!postData?.subCategory) {
    return (
      <Card className="p-3 mb-3">
        <div className="text-center py-2 text-muted">
          <p className="mb-0">
            {isRTL ? 'اختر فئة فرعية لرؤية المقاسات' : 'Selecciona una subcategoría para ver las tallas'}
          </p>
        </div>
      </Card>
    );
  }

  const sizes = getSizes();
  const selectedCount = Array.isArray(tallaData) ? tallaData.length : 0;

  return (
    <Card className="p-3 mb-3">
      <Form.Group>
        {/* 📄 TÍTULO SIMPLE */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Form.Label className="fw-bold mb-0">
            {t('size', 'Tallas Disponibles')}
          </Form.Label>
          {selectedCount > 0 && (
            <small className="text-muted">
              {selectedCount} {t('selected', 'seleccionadas')}
            </small>
          )}
        </div>
        
        {/* 📝 CHECKBOXES SIMPLES */}
        <div className="d-flex flex-wrap gap-2">
          {sizes.map((size) => (
            <Form.Check
              key={size}
              type="checkbox"
              id={`talla-${size}`}
              label={size}
              checked={isSelected(size)}
              onChange={() => handleCheckboxChange(size)}
              style={{
                marginRight: isRTL ? '0' : '1rem',
                marginLeft: isRTL ? '1rem' : '0'
              }}
            />
          ))}
        </div>
        
        {/* 🔢 INFO SIMPLE */}
        <div className="text-muted small mt-2" style={{
          textAlign: isRTL ? 'right' : 'left',
          direction: isRTL ? 'rtl' : 'ltr'
        }}>
          {t('size_info', 'Selecciona las tallas disponibles')}
        </div>
      </Form.Group>
    </Card>
  );
};

export default React.memo(Talla);