import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Contact = ({ postData = {}, handleChangeInput }) => {
    const { t, i18n } = useTranslation('contact')
    const isRTL = i18n.language === 'ar' || i18n.language === 'he'

    // Número por defecto
    const DEFAULT_PHONE = "0658556296"

    const safePostData = {
        telefono: postData?.telefono || DEFAULT_PHONE,
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

    const formatPhone = (value) => {
        if (!value) return DEFAULT_PHONE
        // Remover todo excepto números y signo +
        return value.replace(/[^\d+]/g, '')
    }

    const handlePhoneChange = (e) => {
        const formattedValue = formatPhone(e.target.value)
        handleChangeInput({
            target: {
                name: 'telefono',
                value: formattedValue
            }
        })
    }

    return (
        <div className="mb-3 w-100" dir={isRTL ? 'rtl' : 'ltr'}>
            <Form.Label className={`fw-bold fs-6 mb-3 d-block w-100 ${isRTL ? 'text-end' : ''}`}>
                📞 {getTranslation('phone_number', 'Número de Teléfono')}
            </Form.Label>
            
            <InputGroup>
                <InputGroup.Text className="border-0 bg-light">
                    📞
                </InputGroup.Text>
                <Form.Control
                    type="tel"
                    name="telefono"
                    placeholder={getTranslation('phone_placeholder', '+1 234 567 8900')}
                    value={safePostData.telefono}
                    onChange={handlePhoneChange}
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

export default Contact