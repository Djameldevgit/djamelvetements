import React from 'react'
import { Form, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const TipoVenta = ({ postData = {}, handleChangeInput, theme }) => {
    const { t, i18n } = useTranslation('tipoventa')
    const isRTL = i18n.language === 'ar' || i18n.language === 'he'

    const safePostData = {
        tipoventa: postData?.tipoventa || "",
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

    const tiposVenta = [
        { 
            value: "retail", 
            label: getTranslation('retail', 'Venta al Detalle'),
            description: getTranslation('retail_description', 'Venta de productos individuales o en pequeñas cantidades'),
            icon: "🛍️"
        },
        { 
            value: "wholesale", 
            label: getTranslation('wholesale', 'Venta al por Mayor (Gross)'),
            description: getTranslation('wholesale_description', 'Venta en grandes cantidades con precios mayoristas'),
            icon: "📦"
        },
        { 
            value: "both", 
            label: getTranslation('both', 'Venta Detalle y Gross'),
            description: getTranslation('both_description', 'Disponible para venta al detalle y por mayor'),
            icon: "🏪"
        }
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
                        🏷️ {getTranslation('sale_type', 'Tipo de Venta')}
                    </Form.Label>
                    
                    <div className="position-relative w-100">
                        <Form.Select
                            name="tipoventa"
                            value={safePostData.tipoventa}
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
                            <option value="">{getTranslation('select_sale_type', 'Selecciona el tipo de venta')}</option>
                            {tiposVenta.map(tipo => (
                                <option key={tipo.value} value={tipo.value}>
                                    {tipo.icon} {tipo.label}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    {/* Descripción del tipo de venta seleccionado */}
                    {safePostData.tipoventa && (
                        <div className={`mt-3 p-3 bg-light rounded ${isRTL ? 'text-end' : ''}`}>
                            <small className="text-muted">
                                {tiposVenta.find(tipo => tipo.value === safePostData.tipoventa)?.description}
                            </small>
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

export default TipoVenta