import React from 'react'
import { Form, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Description = ({ postData = {}, handleChangeInput, theme }) => {
    const { t, i18n } = useTranslation('descripcion')
    const isRTL = i18n.language === 'ar'
    const isFrench = i18n.language === 'fr'

    const safePostData = {
        description: postData?.description || "",
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
        textarea: {
            border: 'none',
            backgroundColor: theme ? '#2d3748' : '#f8f9fa',
            padding: '16px',
            borderRadius: '12px',
            color: theme ? 'white' : '#111',
            fontSize: '16px',
            lineHeight: '1.6',
            resize: 'vertical',
            textAlign: isRTL ? 'right' : 'left',
            // 🚨 IMPORTANTE: Dirección del texto
            direction: isRTL ? 'rtl' : 'ltr',
            minHeight: '120px'
        },
        characterCount: {
            color: theme ? '#9ca3af' : '#6b7280',
            fontSize: '14px',
            textAlign: isRTL ? 'left' : 'right', // Invertido en RTL
            marginTop: '8px',
            direction: 'ltr' // Mantener dirección ltr para números
        },
        helpText: {
            backgroundColor: theme ? '#374151' : '#f3f4f6',
            borderLeft: isRTL ? 'none' : '4px solid #3b82f6',
            borderRight: isRTL ? '4px solid #3b82f6' : 'none',
            padding: '12px 16px',
            borderRadius: '8px',
            marginTop: '16px'
        }
    }

    // 🌍 PLACEHOLDERS POR IDIOMA
    const getPlaceholder = () => {
        if (isRTL) {
            return "صف منتجك... اذكر المواد، القياسات المتاحة، الحالة، وميزات أخرى مهمة."
        } else if (isFrench) {
            return "Décrivez votre produit... Mentionnez les matériaux, tailles disponibles, état, et autres caractéristiques importantes."
        } else {
            return "Describe tu producto... Menciona materiales, tallas disponibles, condición y otras características importantes."
        }
    }

    return (
        <Card style={rtlStyles.card}>
            <Card.Body className="p-4" style={{ direction: rtlStyles.direction }}>
                <Form.Group>
                    {/* 📄 DESCRIPCIÓN CON EMOJI Y TRADUCCIÓN */}
                    <Form.Label style={rtlStyles.formLabel}>
                        📄 {t('product_description', 'Descripción del Producto')}
                    </Form.Label>
                    
                    <Form.Control
                        as="textarea"
                        name="description"
                        rows={4}
                        placeholder={getPlaceholder()}
                        value={safePostData.description}
                        onChange={handleChangeInput}
                        style={rtlStyles.textarea}
                        dir={isRTL ? 'rtl' : 'ltr'} // 🚨 Control importante
                        maxLength={500}
                    />
                    
                    {/* 🔢 CONTADOR DE CARACTERES - DIRECCIÓN FIJA PARA NÚMEROS */}
                    <Form.Text style={rtlStyles.characterCount}>
                        {safePostData.description.length}/500 {t('createpost:characters', 'caracteres')}
                    </Form.Text>
                </Form.Group>
 
              
            </Card.Body>
        </Card>
    )
}

export default Description