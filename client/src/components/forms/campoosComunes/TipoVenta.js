import React from 'react'
import { Form, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const TipoVenta = ({ postData = {}, handleChangeInput, theme }) => {
    const { t, i18n } = useTranslation('tipoventa')
    const isRTL = i18n.language === 'ar' || i18n.language === 'he'

    const safePostData = {
        tipoventa: postData?.tipoventa || "",
        ...postData
    }

    // Función segura para obtener traducciones
    const getTranslation = (key, fallback) => {
        try {
            return t(key, fallback)
        } catch (error) {
            return fallback
        }
    }

    const tiposVenta = [
        { 
            value: "retail", 
            label: getTranslation('retail', 'Venta al Detalle'),
            description: getTranslation('retail_description', 'Venta de productos individuales'),
            icon: "🛍️"
        },
        { 
            value: "wholesale", 
            label: getTranslation('wholesale', 'Venta al por Mayor'),
            description: getTranslation('wholesale_description', 'Venta en grandes cantidades'),
            icon: "📦"
        },
        { 
            value: "both", 
            label: getTranslation('both', 'Venta Detalle y Mayor'),
            description: getTranslation('both_description', 'Disponible para ambos tipos'),
            icon: "🏪"
        }
    ]

    return (
        <Card className="p-3 mb-3">
            <Form.Group>
                {/* 📄 TÍTULO SIMPLE */}
                <Form.Label className="fw-bold mb-2">
                    {getTranslation('sale_type', 'Tipo de Venta')}
                </Form.Label>
                
                {/* 📝 SELECT SIMPLE */}
                <Form.Select
                    name="tipoventa"
                    value={safePostData.tipoventa}
                    onChange={handleChangeInput}
                    style={{
                        textAlign: isRTL ? 'right' : 'left',
                        direction: isRTL ? 'rtl' : 'ltr'
                    }}
                >
                    <option value="">{getTranslation('select_sale_type', 'Selecciona el tipo de venta')}</option>
                    {tiposVenta.map(tipo => (
                        <option key={tipo.value} value={tipo.value}>
                            {tipo.label}
                        </option>
                    ))}
                </Form.Select>
                
                {/* 🔢 INFO SIMPLE */}
                {safePostData.tipoventa && (
                    <div className="text-muted small mt-1" style={{
                        textAlign: isRTL ? 'right' : 'left',
                        direction: isRTL ? 'rtl' : 'ltr'
                    }}>
                        {tiposVenta.find(tipo => tipo.value === safePostData.tipoventa)?.description}
                    </div>
                )}
            </Form.Group>
        </Card>
    )
}

export default TipoVenta