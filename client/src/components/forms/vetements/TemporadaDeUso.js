import React from 'react'
import { Form, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const TemporadaDeUso = ({ postData = {}, handleChangeInput, theme }) => {
    const { t, i18n } = useTranslation('temporadauso')
    const isRTL = i18n.language === 'ar' || i18n.language === 'he'

    const safePostData = {
        temporada: postData?.temporada || "",
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

    const opcionesTemporada = [
        { value: "spring", label: getTranslation('spring', 'Primavera') },
        { value: "summer", label: getTranslation('summer', 'Verano') },
        { value: "autumn", label: getTranslation('autumn', 'Otoño') },
        { value: "winter", label: getTranslation('winter', 'Invierno') },
        { value: "all_year", label: getTranslation('all_year', 'Todo el año') }
    ]

    return (
        <Card className="p-3 mb-3">
            <Form.Group>
                {/* 📄 TÍTULO SIMPLE */}
                <Form.Label className="fw-bold mb-2">
                    {getTranslation('season', 'Temporada de Uso')}
                </Form.Label>
                
                {/* 📝 SELECT SIMPLE */}
                <Form.Select
                    name="temporada"
                    value={safePostData.temporada}
                    onChange={handleChangeInput}
                    style={{
                        textAlign: isRTL ? 'right' : 'left',
                        direction: isRTL ? 'rtl' : 'ltr'
                    }}
                >
                    <option value="">{getTranslation('select_season', 'Selecciona temporada')}</option>
                    {opcionesTemporada.map(opcion => (
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
                    {getTranslation('season_info', 'Indica la temporada de uso principal')}
                </div>
            </Form.Group>
        </Card>
    )
}

export default TemporadaDeUso