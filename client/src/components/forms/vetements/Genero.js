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
        { value: "man", label: getTranslation('man', '👨 Hombre') },
        { value: "woman", label: getTranslation('woman', '👩 Mujer') },
        { value: "unisex", label: getTranslation('unisex', '⚧ Unisex') },
        { value: "boy", label: getTranslation('boy', '👦 Niño') },
        { value: "girl", label: getTranslation('girl', '👧 Niña') }
    ]

    return (
        <Card className="mb-3 border-0 shadow-sm w-100">
            <Card.Body className="p-4 w-100"  >
                <Form.Group className="w-100">
                    <Form.Label className={`fw-bold fs-6 mb-3 ${isRTL ? 'text-end d-block w-100' : 'w-100'}`}>
                      <div  dir={isRTL ? 'rtl' : 'ltr'}> {getTranslation('gender', 'Género')}</div> 
                    </Form.Label>
                    <Form.Select
                        name="genero"
                        value={safePostData.genero}
                        onChange={handleChangeInput}
                        className={`w-100 border-0 bg-light py-3 ${isRTL ? 'text-end' : ''}`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                        style={{
                            borderRadius: '12px',
                            fontSize: '16px',
                            width: '100%'
                        }}
                    >
                        <option value="">{getTranslation('select_gender', 'Selecciona género')}</option>
                        {opcionesGenero.map(opcion => (
                            <option key={opcion.value} value={opcion.value}>
                                {opcion.label}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Card.Body>
            
            <style jsx>{`
                /* Estilos específicos para RTL */
                .form-select[dir="rtl"] {
                    text-align: right;
                    padding-right: 1rem;
                    padding-left: 2.5rem;
                    background-position: left 0.75rem center;
                }
                
                .form-select[dir="rtl"] option {
                    text-align: right;
                    direction: rtl;
                }
                
                /* Asegurar ancho completo */
                .card, .card-body, .form-group, .form-select {
                    width: 100% !important;
                }
                
                /* Mejorar la flecha del select en RTL */
                .form-select[dir="rtl"] {
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
                    background-position: left 0.75rem center;
                    background-repeat: no-repeat;
                    background-size: 16px 12px;
                }
            `}</style>
        </Card>
    )
}

export default Genero