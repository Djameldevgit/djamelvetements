import React from 'react'
import { Form, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Genero = ({ postData = {}, handleChangeInput, theme }) => {
    const { t, i18n } = useTranslation('genero')
    const isRTL = i18n.language === 'ar' || i18n.language === 'he'

    const safePostData = {
        genero: postData?.genero || "",
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

    const opcionesGenero = [
        { value: "man", label: getTranslation('man', 'Hombre') },
        { value: "woman", label: getTranslation('woman', 'Mujer') },
        { value: "unisex", label: getTranslation('unisex', 'Unisex') },
        { value: "boy", label: getTranslation('boy', 'Niño') },
        { value: "girl", label: getTranslation('girl', 'Niña') }
    ]

    return (
        <Card className="p-3 mb-3">
            <Form.Group>
                {/* 📄 TÍTULO SIMPLE */}
                <Form.Label className="fw-bold mb-2">
                    {getTranslation('gender', 'Género')}
                </Form.Label>
                
                {/* 📝 SELECT SIMPLE */}
                <Form.Select
                    name="genero"
                    value={safePostData.genero}
                    onChange={handleChangeInput}
                    style={{
                        textAlign: isRTL ? 'right' : 'left',
                        direction: isRTL ? 'rtl' : 'ltr'
                    }}
                >
                    <option value="">{getTranslation('select_gender', 'Selecciona género')}</option>
                    {opcionesGenero.map(opcion => (
                        <option key={opcion.value} value={opcion.value}>
                            {opcion.label}
                        </option>
                    ))}
                </Form.Select>
                
                {/* 🔢 INFO SIMPLE */}
                <div className="text-muted small mt-1" style={{
                    textAlign: isRTL ? 'left' : 'right',
                    direction: 'ltr'
                }}>
                    {getTranslation('gender_info', 'Para quién es el producto')}
                </div>
            </Form.Group>
        </Card>
    )
}

export default Genero