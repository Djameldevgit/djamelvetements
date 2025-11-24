import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
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

    const getCurrencySymbol = () => {
        const symbols = {
            'USD': '💵',
            'EUR': '💶', 
            'MXN': '💷',
            'COP': '💴',
            'MAD': '🇲🇦'
        }
        return symbols[safePostData.tipodemoneda] || '💵'
    }

    return (
        <div className="mb-3 w-100" dir={isRTL ? 'rtl' : 'ltr'}>
            <Form.Label className={`fw-bold fs-6 mb-3 d-block w-100 ${isRTL ? 'text-end' : ''}`}>
                💰 {getTranslation('product_price', 'Precio del Producto')}
            </Form.Label>
            
            <InputGroup>
                <InputGroup.Text className="border-0 bg-light">
                    {getCurrencySymbol()}
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    name="price"
                    placeholder={getTranslation('price_placeholder', '0.00')}
                    value={safePostData.price}
                    onChange={handlePriceChange}
                    className={`border-0 bg-light py-3 ${isRTL ? 'text-end' : ''}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    style={{
                        fontSize: '16px'
                    }}
                />
            </InputGroup>
        </div>
    )
}

export default Price