import React from 'react'
import { Form, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Title = ({ postData = {}, handleChangeInput, theme }) => {
    const { t, i18n } = useTranslation('title')
    const isRTL = i18n.language === 'ar'
    const isFrench = i18n.language === 'fr'

    const safePostData = {
        title: postData?.title || "",
        ...postData
    }

    // 🎯 ESTILOS RTL MEJORADOS
    const rtlStyles = {
        direction: isRTL ? 'rtl' : 'ltr',
        textAlign: isRTL ? 'right' : 'left',
        card: {
            border: 'none',
            borderRadius: '12px',
            backgroundColor: theme ? '#1a1a1a' : 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        },
        formLabel: {
            fontWeight: '700',
            marginBottom: '12px',
            display: 'block',
            textAlign: isRTL ? 'right' : 'left',
            color: theme ? 'white' : '#1f2937',
            fontSize: '18px'
        },
        formControl: {
            border: 'none',
            backgroundColor: theme ? '#2d3748' : '#f8f9fa',
            padding: '16px',
            borderRadius: '12px',
            color: theme ? 'white' : '#111',
            fontSize: '16px',
            fontWeight: '500',
            textAlign: isRTL ? 'right' : 'left',
            // 🚨 IMPORTANTE: Dirección del texto
            direction: isRTL ? 'rtl' : 'ltr'
        },
        characterCount: {
            color: theme ? '#9ca3af' : '#6b7280',
            fontSize: '14px',
            textAlign: isRTL ? 'left' : 'right', // Invertido en RTL
            marginTop: '8px',
            direction: 'ltr' // Mantener dirección ltr para números
        }
    }

    // 🌍 PLACEHOLDERS POR IDIOMA
    const getPlaceholder = () => {
        if (isRTL) {
            return "مثال: قميص قطني عادي للرجال..."
        } else if (isFrench) {
            return "Ex: Chemise décontractée en coton pour homme..."
        } else {
            return "Ej: Camisa casual de algodón para hombre..."
        }
    }

    return (
        <Card style={rtlStyles.card}>
            <Card.Body className="p-4" style={{ direction: rtlStyles.direction }}>
                <Form.Group>
                    {/* 📝 TÍTULO CON EMOJI Y TRADUCCIÓN */}
                    <Form.Label style={rtlStyles.formLabel}>
                        📝 {t('product_title', 'Título del Producto')}
                    </Form.Label>
                    
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder={getPlaceholder()}
                        value={safePostData.title}
                        onChange={handleChangeInput}
                        style={rtlStyles.formControl}
                        dir={isRTL ? 'rtl' : 'ltr'} // 🚨 Control importante
                        maxLength={100}
                    />
                    
                    {/* 🔢 CONTADOR DE CARACTERES - DIRECCIÓN FIJA PARA NÚMEROS */}
                    <Form.Text style={rtlStyles.characterCount}>
                        {safePostData.title.length}/100 {t('characters', 'caracteres')}
                    </Form.Text>
                </Form.Group>

               
            </Card.Body>
        </Card>
    )
}

export default Title