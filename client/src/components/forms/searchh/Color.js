import React, { useMemo } from 'react'
import { Form, Badge } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Color = ({ postData = {}, handleArrayChange }) => {
    const { t, i18n } = useTranslation('color')
    const isRTL = i18n.language === 'ar' || i18n.language === 'he'

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

    // Función segura para obtener traducciones
    const getTranslation = (key, fallback) => {
        try {
            return t(key, fallback)
        } catch (error) {
            return fallback
        }
    }

    // 🎯 DEFINICIÓN COMPLETA DE COLORES POR CATEGORÍA
    const getFilteredColors = useMemo(() => {
        if (!postData?.subCategory) return []

        const subCategory = postData.subCategory.toLowerCase();
        const category = postData.category;
        let allColors = [];

        // 👔 ROPA HOMBRE
        if (category === 'vetements_homme') {
            allColors = [
                { value: "black", label: getTranslation('black', '⚫ Negro') },
                { value: "white", label: getTranslation('white', '⚪ Blanco') },
                { value: "blue", label: getTranslation('blue', '🔵 Azul') },
                { value: "gray", label: getTranslation('gray', '⚪ Gris') },
                { value: "brown", label: getTranslation('brown', '🟤 Marrón') },
                { value: "green", label: getTranslation('green', '🟢 Verde') },
                { value: "red", label: getTranslation('red', '🔴 Rojo') },
                { value: "beige", label: getTranslation('beige', '🏾 Beige') },
                { value: "orange", label: getTranslation('orange', '🟠 Naranja') },
                { value: "purple", label: getTranslation('purple', '🟣 Morado') }
            ];
        }

        // 👗 ROPA MUJER
        else if (category === 'vetements_femme') {
            allColors = [
                { value: "black", label: getTranslation('black', '⚫ Negro') },
                { value: "white", label: getTranslation('white', '⚪ Blanco') },
                { value: "pink", label: getTranslation('pink', '💗 Rosa') },
                { value: "purple", label: getTranslation('purple', '🟣 Morado') },
                { value: "blue", label: getTranslation('blue', '🔵 Azul') },
                { value: "red", label: getTranslation('red', '🔴 Rojo') },
                { value: "green", label: getTranslation('green', '🟢 Verde') },
                { value: "yellow", label: getTranslation('yellow', '🟡 Amarillo') },
                { value: "orange", label: getTranslation('orange', '🟠 Naranja') },
                { value: "beige", label: getTranslation('beige', '🏾 Beige') }
            ];
        }

        // ⌚ RELOJES
        else if (category === 'montres') {
            allColors = [
                { value: "silver", label: getTranslation('silver', '🥈 Plata') },
                { value: "gold", label: getTranslation('gold', '🥇 Oro') },
                { value: "rose_gold", label: getTranslation('rose_gold', '🌹 Oro Rosa') },
                { value: "black", label: getTranslation('black', '⚫ Negro') },
                { value: "brown", label: getTranslation('brown', '🟤 Marrón') },
                { value: "blue", label: getTranslation('blue', '🔵 Azul') },
                { value: "white", label: getTranslation('white', '⚪ Blanco') },
                { value: "metallic", label: getTranslation('metallic', '✨ Metálico') },
                { value: "bronze", label: getTranslation('bronze', '🥉 Bronce') }
            ];
        }

        // 👓 GAFAS
        else if (category === 'lunettes') {
            allColors = [
                { value: "black", label: getTranslation('black', '⚫ Negro') },
                { value: "brown", label: getTranslation('brown', '🟤 Marrón') },
                { value: "tortoise", label: getTranslation('tortoise', '🐢 Carey') },
                { value: "silver", label: getTranslation('silver', '🥈 Plata') },
                { value: "gold", label: getTranslation('gold', '🥇 Oro') },
                { value: "blue", label: getTranslation('blue', '🔵 Azul') },
                { value: "red", label: getTranslation('red', '🔴 Rojo') },
                { value: "transparent", label: getTranslation('transparent', '🔍 Transparente') },
                { value: "multicolor", label: getTranslation('multicolor', '🌈 Multicolor') }
            ];
        }

        // 💎 JOYERÍA
        else if (category === 'bijoux') {
            allColors = [
                { value: "gold", label: getTranslation('gold', '🥇 Oro') },
                { value: "silver", label: getTranslation('silver', '🥈 Plata') },
                { value: "rose_gold", label: getTranslation('rose_gold', '🌹 Oro Rosa') },
                { value: "white", label: getTranslation('white', '⚪ Blanco') },
                { value: "black", label: getTranslation('black', '⚫ Negro') },
                { value: "crystal", label: getTranslation('crystal', '💎 Cristal') },
                { value: "pearl", label: getTranslation('pearl', '🐚 Perla') },
                { value: "diamond", label: getTranslation('diamond', '💎 Diamante') },
                { value: "multicolor", label: getTranslation('multicolor', '🌈 Multicolor') }
            ];
        }

        // ⭐ DEFAULT - Colores generales para otras categorías
        else {
            allColors = [
                { value: "black", label: getTranslation('black', '⚫ Negro') },
                { value: "white", label: getTranslation('white', '⚪ Blanco') },
                { value: "blue", label: getTranslation('blue', '🔵 Azul') },
                { value: "red", label: getTranslation('red', '🔴 Rojo') },
                { value: "green", label: getTranslation('green', '🟢 Verde') },
                { value: "yellow", label: getTranslation('yellow', '🟡 Amarillo') },
                { value: "pink", label: getTranslation('pink', '💗 Rosa') },
                { value: "purple", label: getTranslation('purple', '🟣 Morado') },
                { value: "orange", label: getTranslation('orange', '🟠 Naranja') },
                { value: "gray", label: getTranslation('gray', '⚪ Gris') },
                { value: "brown", label: getTranslation('brown', '🟤 Marrón') },
                { value: "beige", label: getTranslation('beige', '🏾 Beige') }
            ];
        }

        return allColors;
    }, [postData?.category, postData?.subCategory, t]);

    // ✅ Manejar cambios en los checkboxes - MEJORADO
    const handleColorToggle = (colorValue) => {
        if (!handleArrayChange) return;
        
        const currentColors = safeArray(postData?.color);
        const isCurrentlySelected = safeIncludes(postData?.color, colorValue);
        
        // 🎯 LLAMADA CORRECTA A handleArrayChange con el estado actual
        handleArrayChange('color', colorValue, !isCurrentlySelected);
    }

    // ✅ Verificar si un color está seleccionado - SEGURO
    const isColorSelected = (colorValue) => {
        return safeIncludes(postData?.color, colorValue);
    }

    // ✅ Contar colores seleccionados - SEGURO
    const getSelectedCount = () => {
        return safeArray(postData?.color).length;
    }

    if (!postData?.subCategory) {
        return (
            <div className="text-center py-4 text-muted">
                <div className="mb-2" style={{ fontSize: '2rem' }}>🎨</div>
                <p className="mb-0">
                    {isRTL ? 'اختر فئة فرعية لرؤية الألوان المتاحة' : 'Selecciona una subcategoría para ver los colores disponibles'}
                </p>
            </div>
        )
    }

    return (
        <div className="mb-3 w-100" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className={`d-flex justify-content-between align-items-center mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="fw-bold fs-6">
                    🎨 {getTranslation('colors', 'Colores')}
                </span>
                {getSelectedCount() > 0 && (
                    <Badge bg="primary" className="fs-6">
                        {getSelectedCount()} {getTranslation('selected', 'seleccionados')}
                    </Badge>
                )}
            </div>

            <div className="row g-3">
                {getFilteredColors.map((color) => (
                    <div key={color.value} className="col-6 col-sm-4 col-md-3 col-lg-2">
                        <div className={`d-flex align-items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Form.Check
                                type="checkbox"
                                id={`color-${color.value}`}
                                name="color"
                                value={color.value}
                                checked={isColorSelected(color.value)}
                                onChange={() => handleColorToggle(color.value)}
                                className={`flex-shrink-0 ${isRTL ? 'ms-2' : 'me-2'}`}
                            />
                            <Form.Label 
                                htmlFor={`color-${color.value}`}
                                className="mb-0 fw-semibold cursor-pointer"
                                style={{ cursor: 'pointer' }}
                            >
                                {color.label}
                            </Form.Label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Color