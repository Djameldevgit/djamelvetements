import React from 'react'
import { Form, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const TipoMoneda = ({ postData = {}, handleChangeInput, theme }) => {
    const { t, i18n } = useTranslation('moneda')
    const isRTL = i18n.language === 'ar' || i18n.language === 'he'

    const safePostData = {
        tipodemoneda: postData?.tipodemoneda || "USD",
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

    const monedas = [
        { value: "USD", label: getTranslation('us_dollar', 'Dólar Americano (USD)') },
        { value: "EUR", label: getTranslation('euro', 'Euro (EUR)') },
        { value: "DZD", label: getTranslation('algerian_dinar', 'Dinar Argelino (DZD)') }
    ]

    return (
        <Card className="p-3 mb-3">
            <Form.Group>
                {/* 📄 TÍTULO SIMPLE */}
                <Form.Label className="fw-bold mb-2">
                    {getTranslation('currency_type', 'Tipo de Moneda')}
                </Form.Label>
                
                {/* 📝 SELECT SIMPLE */}
                <Form.Select
                    name="tipodemoneda"
                    value={safePostData.tipodemoneda}
                    onChange={handleChangeInput}
                    style={{
                        textAlign: isRTL ? 'right' : 'left',
                        direction: isRTL ? 'rtl' : 'ltr'
                    }}
                >
                    {monedas.map(moneda => (
                        <option key={moneda.value} value={moneda.value}>
                            {moneda.label}
                        </option>
                    ))}
                </Form.Select>
                
                {/* 🔢 INFO SIMPLE */}
                <div className="text-muted small mt-1" style={{
                    textAlign: isRTL ? 'left' : 'right',
                    direction: 'ltr'
                }}>
                    {getTranslation('currency_info', 'Moneda para los precios')}
                </div>
            </Form.Group>
        </Card>
    )
}

export default TipoMoneda