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
        { value: "spring", label: getTranslation('spring', '🌷 Primavera') },
        { value: "summer", label: getTranslation('summer', '☀️ Verano') },
        { value: "autumn", label: getTranslation('autumn', '🍂 Otoño') },
        { value: "winter", label: getTranslation('winter', '❄️ Invierno') },
        { value: "all_year", label: getTranslation('all_year', '🔄 Todo el año') }
    ]

    return (
        <Card className="mb-3 border-0 shadow-sm" style={{ width: '100%' }}>
            <Card.Body 
                className="p-4" 
                dir={isRTL ? 'rtl' : 'ltr'}
                style={{ width: '100%' }}
            >
                <Form.Group style={{ width: '100%' }}>
                    <Form.Label 
                        className={`fw-bold fs-6 mb-3 d-block w-100 ${isRTL ? 'text-end' : ''}`}
                    >
                        {getTranslation('season', 'Temporada de Uso')}
                    </Form.Label>
                    <div className="position-relative w-100">
                        <Form.Select
                            name="temporada"
                            value={safePostData.temporada}
                            onChange={handleChangeInput}
                            className="w-100 border-0 bg-light py-3"
                            dir={isRTL ? 'rtl' : 'ltr'}
                            style={{
                                borderRadius: '12px',
                                fontSize: '16px',
                                width: '100%',
                                textAlign: isRTL ? 'right' : 'left',
                                paddingLeft: isRTL ? '2.5rem' : '1rem',
                                paddingRight: isRTL ? '1rem' : '2.5rem',
                                backgroundPosition: isRTL ? 'left 0.75rem center' : 'right 0.75rem center'
                            }}
                        >
                            <option value="">{getTranslation('select_season', 'Selecciona temporada')}</option>
                            {opcionesTemporada.map(opcion => (
                                <option key={opcion.value} value={opcion.value}>
                                    {opcion.label}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </Form.Group>
            </Card.Body>

            {/* Estilos CSS para RTL */}
            <style jsx>{`
                /* Estilos RTL mejorados */
                .form-select[dir="rtl"] {
                    text-align: right !important;
                }
                
                .form-select[dir="rtl"] option {
                    text-align: right;
                    direction: rtl;
                }
                
                /* Asegurar que todo ocupe el 100% del ancho */
                .card {
                    width: 100% !important;
                }
                
                .card-body {
                    width: 100% !important;
                }
                
                .form-group {
                    width: 100% !important;
                }
                
                .form-select {
                    width: 100% !important;
                }
            `}</style>
        </Card>
    )
}

export default TemporadaDeUso