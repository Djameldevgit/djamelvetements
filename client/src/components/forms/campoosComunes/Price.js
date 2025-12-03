import React from 'react'
import { Form, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Price = ({ postData = {}, handleChangeInput, theme }) => {
    const { t, i18n } = useTranslation('price')
    const isRTL = i18n.language === 'ar' || i18n.language === 'he'

    const safePostData = {
        price: postData?.price || "",
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

    const formatPrice = (value) => {
        if (!value) return ""
        // Remover cualquier formato previo y permitir solo números y punto decimal
        const numericValue = value.replace(/[^\d.]/g, '')
        // Asegurar que solo haya un punto decimal
        const parts = numericValue.split('.')
        if (parts.length > 2) {
            return parts[0] + '.' + parts.slice(1).join('')
        }
        return numericValue
    }

    const handlePriceChange = (e) => {
        const formattedValue = formatPrice(e.target.value)
        handleChangeInput({
            target: {
                name: 'price',
                value: formattedValue
            }
        })
    }

    return (
        <Card className="p-3 mb-3">
            <Form.Group>
                {/* 📄 TÍTULO SIMPLE */}
                <Form.Label className="fw-bold mb-2">
                    {getTranslation('product_price', 'Precio del Producto')}
                </Form.Label>
                
                {/* 📝 INPUT SIMPLE */}
                <Form.Control
                    type="text"
                    name="price"
                    placeholder={getTranslation('price_placeholder', '0.00')}
                    value={safePostData.price}
                    onChange={handlePriceChange}
                    style={{
                        textAlign: isRTL ? 'right' : 'left',
                        direction: isRTL ? 'rtl' : 'ltr'
                    }}
                />
                
                {/* 🔢 INFO SIMPLE */}
                <div className="text-muted small mt-1" style={{
                    textAlign: isRTL ? 'left' : 'right',
                    direction: 'ltr'
                }}>
                    {getTranslation('price_info', 'Ej: 99.99')}
                </div>
            </Form.Group>
        </Card>
    )
}

export default Price