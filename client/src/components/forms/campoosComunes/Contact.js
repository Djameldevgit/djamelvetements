import React from 'react'
import { Form, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Contact = ({ postData = {}, handleChangeInput }) => {
    const { t, i18n } = useTranslation('telefono')
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
        <Card className="p-3 mb-3">
            <Form.Group>
                {/* 📄 TÍTULO SIMPLE */}
                <Form.Label className="fw-bold mb-2">
                    {getTranslation('phone_number', 'Número de Teléfono')}
                </Form.Label>
                
                {/* 📝 INPUT SIMPLE */}
                <Form.Control
                    type="tel"
                    name="telefono"
                    placeholder={getTranslation('phone_placeholder', '+1 234 567 8900')}
                    value={safePostData.telefono}
                    onChange={handlePhoneChange}
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
                    {getTranslation('phone_info', 'Ej: +212 612-345678')}
                </div>
            </Form.Group>
        </Card>
    )
}

export default Contact