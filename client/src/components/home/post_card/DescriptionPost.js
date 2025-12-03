// src/components/DescriptionPost.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryFields from './Category';
 

const DescriptionPost = ({ post }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [readMore, setReadMore] = useState(false);
    
    // 🔹 VALIDACIÓN INICIAL
    if (!post) {
        return (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📭</div>
                <h3>Aucune donnée de post disponible</h3>
            </div>
        );
    }
    
    // 🔹 DESESTRUCTURAR FUNCIONES Y DATOS
    const { 
        categoryFields, 
        commonFields, 
        getFieldValue, 
        hasFieldValue,
        getCategoryConfig,
        getSubCategoryInfo 
    } = CategoryFields;
    
    // 🔹 OBTENER CONFIGURACIÓN DE CATEGORÍA DE FORMA SEGURA
    const category = post.category || 'vetements';
    let categoryConfig;
    
    try {
        categoryConfig = getCategoryConfig.call(CategoryFields, category);
    } catch (error) {
        console.error('Error obteniendo configuración:', error);
        categoryConfig = categoryFields.vetements || {
            name: "Article",
            icon: "📦",
            color: "#666",
            fields: [],
            subCategories: {}
        };
    }
    
    // 🔹 OBTENER INFO DE SUBCATEGORÍA DE FORMA SEGURA
    let subCategoryInfo;
    try {
        subCategoryInfo = getSubCategoryInfo.call(CategoryFields, post);
    } catch (error) {
        console.error('Error obteniendo subcategoría:', error);
        subCategoryInfo = {
            icon: "📦",
            name: "Article",
            color: "#666"
        };
    }
    
    // 🔹 ESTILOS
    const styles = {
        primaryColor: categoryConfig.color || '#3b82f6',
        mainGradient: `linear-gradient(135deg, ${categoryConfig.color || '#3b82f6'}20 0%, ${categoryConfig.color || '#3b82f6'}80 100%)`
    };

    // 🔹 FUNCIONES AUXILIARES
    const safeGetFieldValue = (path) => {
        try {
            return getFieldValue(post, path);
        } catch (error) {
            console.error(`Error en campo ${path}:`, error);
            return null;
        }
    };

    const safeHasFieldValue = (path) => {
        const value = safeGetFieldValue(path);
        return value !== null && value !== undefined && value !== '' && 
               (!Array.isArray(value) || value.length > 0);
    };

    // 🔹 RENDERIZAR UN CAMPO
    const renderField = (field) => {
        if (!field || !field.path) return null;
        
        const value = safeGetFieldValue(field.path);
        if (!value) return null;
        
        const displayValue = Array.isArray(value) ? value.join(', ') : value;
        
        return (
            <div key={field.path} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
                padding: '10px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                borderLeft: `4px solid ${categoryConfig.color}`
            }}>
                <span style={{ fontWeight: '600', color: '#1f2937', fontSize: '15px' }}>
                    {field.label}:
                </span>
                <span style={{
                    backgroundColor: '#e2e8f0',
                    color: '#1f2937',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '14px'
                }}>
                    {displayValue}
                </span>
            </div>
        );
    };

    // 🔹 SECCIÓN DE CABECERA
    const renderHeader = () => {
        const title = safeGetFieldValue('title') || 'Sans titre';
        const price = safeGetFieldValue('price');
        const currency = safeGetFieldValue('tipodemoneda') || 'DA';
        
        return (
            <div style={{
                background: styles.mainGradient,
                color: 'white',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>
                    {subCategoryInfo.icon}
                </div>
                <h1 style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: '800' }}>
                    {title}
                </h1>
                <div style={{ fontSize: '16px', opacity: '0.9', fontWeight: '600' }}>
                    {subCategoryInfo.name}
                </div>
                {price && (
                    <div style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        display: 'inline-block',
                        marginTop: '10px',
                        fontWeight: '800',
                        fontSize: '18px'
                    }}>
                        {price} {currency}
                    </div>
                )}
            </div>
        );
    };

    // 🔹 SECCIÓN DE DESCRIPCIÓN
    const renderDescription = () => {
        const description = safeGetFieldValue('description');
        if (!description) return null;
        
        const shouldTruncate = description.length > 200;
        const displayText = readMore ? description : 
            (shouldTruncate ? description.substring(0, 200) + '...' : description);

        return (
            <div style={{
                backgroundColor: '#f8fafc',
                padding: '18px',
                borderRadius: '10px',
                marginBottom: '18px'
            }}>
                <h2 style={{ margin: '0 0 12px 0', fontSize: '18px', color: styles.primaryColor }}>
                    📝 Description
                </h2>
                <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.6' }}>
                    {displayText}
                </p>
                {shouldTruncate && (
                    <button
                        onClick={() => setReadMore(!readMore)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: styles.primaryColor,
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '700',
                            marginTop: '10px'
                        }}
                    >
                        {readMore ? 'Voir moins' : 'Voir plus'}
                    </button>
                )}
            </div>
        );
    };

    // 🔹 SECCIÓN DE CAMPOS COMUNES
    const renderCommonFields = () => {
        const fieldsToShow = commonFields.filter(field => 
            field && field.path && safeHasFieldValue(field.path)
        );
        
        if (fieldsToShow.length === 0) return null;

        return (
            <div style={{
                backgroundColor: '#f8fafc',
                padding: '18px',
                borderRadius: '10px',
                marginBottom: '18px'
            }}>
                <h2 style={{ margin: '0 0 15px 0', fontSize: '18px', color: styles.primaryColor }}>
                    ℹ️ Informations Générales
                </h2>
                {fieldsToShow.map(renderField)}
            </div>
        );
    };

    // 🔹 SECCIÓN DE CAMPOS ESPECÍFICOS
    const renderSpecificFields = () => {
        const fieldsToShow = categoryConfig.fields.filter(field => 
            field && field.path && safeHasFieldValue(field.path)
        );
        
        if (fieldsToShow.length === 0) return null;

        return (
            <div style={{
                backgroundColor: '#f0f9ff',
                padding: '18px',
                borderRadius: '10px',
                marginBottom: '18px'
            }}>
                <h2 style={{ margin: '0 0 15px 0', fontSize: '18px', color: styles.primaryColor }}>
                    🔍 Caractéristiques {categoryConfig.name}
                </h2>
                {fieldsToShow.map(renderField)}
            </div>
        );
    };

    // 🔹 SECCIÓN DE CONTACTO
    const renderContact = () => {
        const phone = safeGetFieldValue('telefono') || safeGetFieldValue('user.mobile');
        const sellerName = safeGetFieldValue('user.username') || 'Vendeur';
        
        return (
            <div style={{
                background: `linear-gradient(135deg, ${categoryConfig.color} 0%, #1e293b 100%)`,
                color: 'white',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center'
            }}>
                <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '800' }}>
                    👑 Vendeur
                </h2>
                
                <div style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    padding: '16px',
                    borderRadius: '10px',
                    marginBottom: '20px'
                }}>
                    <div style={{ fontSize: '18px', fontWeight: '900', marginBottom: '12px' }}>
                        {sellerName}
                    </div>
                    {phone && (
                        <div style={{ fontSize: '16px', fontWeight: '600' }}>
                            📞 {phone}
                        </div>
                    )}
                </div>
                
                {phone && phone !== 'Non disponible' && (
                    <button
                        onClick={() => window.location.href = `tel:${phone}`}
                        style={{
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            width: '100%'
                        }}
                    >
                        📞 Appeler le vendeur
                    </button>
                )}
            </div>
        );
    };

    // 🎯 RENDER PRINCIPAL
    return (
        <div style={{
            direction: isRTL ? 'rtl' : 'ltr',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px'
        }}>
            {renderHeader()}
            {renderDescription()}
            {renderCommonFields()}
            {renderSpecificFields()}
            {renderContact()}
        </div>
    );
};

export default DescriptionPost;