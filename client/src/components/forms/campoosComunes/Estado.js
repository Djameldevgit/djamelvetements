import React from 'react'
import { Form, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Estado = ({ postData = {}, handleChangeInput, theme }) => {
    const { t, i18n } = useTranslation('etat')
    const isRTL = i18n.language === 'ar' || i18n.language === 'he'

    const safePostData = {
        etat: postData?.etat || "",
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

    const opcionesEstado = [
        { 
            value: "new", 
            label: getTranslation('new', 'Nuevo'),
            description: getTranslation('new_description', 'Producto sin usar')
        },
        { 
            value: "used", 
            label: getTranslation('used', 'Usado'),
            description: getTranslation('used_description', 'Producto usado')
        },
        { 
            value: "like_new", 
            label: getTranslation('like_new', 'Como nuevo'),
            description: getTranslation('like_new_description', 'Casi sin uso')
        },
        { 
            value: "refurbished", 
            label: getTranslation('refurbished', 'Reacondicionado'),
            description: getTranslation('refurbished_description', 'Restaurado por profesional')
        }
    ]

    return (
        <Card className="p-3 mb-3">
            <Form.Group>
                {/* 📄 TÍTULO SIMPLE */}
                <Form.Label className="fw-bold mb-2">
                    {getTranslation('condition', 'Estado del Producto')}
                </Form.Label>
                
                {/* 📝 SELECT SIMPLE */}
                <Form.Select
                    name="etat"
                    value={safePostData.etat}
                    onChange={handleChangeInput}
                    style={{
                        textAlign: isRTL ? 'right' : 'left',
                        direction: isRTL ? 'rtl' : 'ltr'
                    }}
                >
                    <option value="">{getTranslation('select_condition', 'Selecciona el estado')}</option>
                    {opcionesEstado.map(opcion => (
                        <option key={opcion.value} value={opcion.value}>
                            {opcion.label}
                        </option>
                    ))}
                </Form.Select>
                
                {/* 🔢 INFO SIMPLE */}
                {safePostData.etat && (
                    <div className="text-muted small mt-1" style={{
                        textAlign: isRTL ? 'right' : 'left',
                        direction: isRTL ? 'rtl' : 'ltr'
                    }}>
                        {opcionesEstado.find(op => op.value === safePostData.etat)?.description}
                    </div>
                )}
            </Form.Group>
        </Card>
    )
}

export default Estado