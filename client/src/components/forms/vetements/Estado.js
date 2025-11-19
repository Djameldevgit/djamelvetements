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
            label: getTranslation('new', '🆕 Nuevo'),
            description: getTranslation('new_description', 'Producto sin usar, en su empaque original')
        },
        { 
            value: "used", 
            label: getTranslation('used', '🔧 Usado'),
            description: getTranslation('used_description', 'Producto usado pero en buen estado')
        },
        { 
            value: "like_new", 
            label: getTranslation('like_new', '✨ Como nuevo'),
            description: getTranslation('like_new_description', 'Casi sin señales de uso, muy buen estado')
        },
        { 
            value: "refurbished", 
            label: getTranslation('refurbished', '🔄 Reacondicionado'),
            description: getTranslation('refurbished_description', 'Producto restaurado por profesional')
        }
    ]

    return (
        <Card className="mb-3 border-0 shadow-sm w-100">
            <Card.Body 
                className="p-4 w-100" 
                dir={isRTL ? 'rtl' : 'ltr'}
            >
                <Form.Group className="w-100">
                    <Form.Label 
                        className={`fw-bold fs-6 mb-3 d-block w-100 ${isRTL ? 'text-end' : ''}`}
                    >
                        {getTranslation('condition', 'Estado del Producto')}
                    </Form.Label>
                    <div className="position-relative w-100">
                        <Form.Select
                            name="etat"
                            value={safePostData.etat}
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
                                backgroundPosition: isRTL ? 'left 0.75rem center' : 'right 0.75rem center',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="">{getTranslation('select_condition', 'Selecciona el estado del producto')}</option>
                            {opcionesEstado.map(opcion => (
                                <option key={opcion.value} value={opcion.value}>
                                    {opcion.label}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                    
                    {/* Descripción del estado seleccionado */}
                    {safePostData.etat && (
                        <div className={`mt-2 text-muted small ${isRTL ? 'text-end' : ''}`}>
                            {opcionesEstado.find(op => op.value === safePostData.etat)?.description}
                        </div>
                    )}
                </Form.Group>
            </Card.Body>

            {/* Estilos CSS para RTL */}
            <style jsx>{`
                .form-select[dir="rtl"] {
                    text-align: right !important;
                }
                
                .form-select[dir="rtl"] option {
                    text-align: right;
                    direction: rtl;
                }
                
                .card, .card-body, .form-group, .form-select {
                    width: 100% !important;
                }
                
                /* Efecto hover mejorado */
                .form-select:hover {
                    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
                    transition: all 0.2s ease-in-out;
                }
            `}</style>
        </Card>
    )
}

export default Estado