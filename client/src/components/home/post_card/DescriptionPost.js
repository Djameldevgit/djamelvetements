import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DescriptionPost = ({ post }) => {
    const { t, i18n } = useTranslation(['descripcion', 'categories']);
    const isRTL = i18n.language === 'ar';
    const [readMore, setReadMore] = useState(false);     
    
    // 🎨 COLORES MEJORADOS - SIN AZULES EN TEXTO
    const styles = {
        primaryColor: "#1e293b",
        accentColor: "#0f172a",
        successColor: "#065f46",
        warningColor: "#92400e",
        purpleColor: "#7c3aed",
        textDark: "#000000",
        textMedium: "#1f2937",
        textLight: "#374151",
        mainGradient: "linear-gradient(135deg, #1e293b 0%, #7c3aed 100%)",
        contactGradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        cardShadow: "0 2px 8px rgba(0, 0, 0, 0.12)"
    };

    // 🏷️ Información de categoría para tienda de ropa
    const getCategoryInfo = () => {
        const categories = {
            "vetements_homme": {
                icon: "👔",
                title: t('categories.mensClothing', 'Vêtements Homme'),
                color: "#1e40af",
                description: t('categories.mensDescription', 'Style et élégance pour homme')
            },
            "vetements_femme": {
                icon: "👗",
                title: t('categories.womensClothing', 'Vêtements Femme'),
                color: "#be185d",
                description: t('categories.womensDescription', 'Mode et tendances pour femme')
            },
            "chaussures_homme": {
                icon: "👞",
                title: t('categories.mensShoes', 'Chaussures Homme'),
                color: "#78350f",
                description: t('categories.mensShoesDescription', 'Chaussures de qualité pour homme')
            },
            "chaussures_femme": {
                icon: "👠",
                title: t('categories.womensShoes', 'Chaussures Femme'),
                color: "#7c3aed",
                description: t('categories.womensShoesDescription', 'Chaussures élégantes pour femme')
            },
            "montres": {
                icon: "⌚",
                title: t('categories.watches', 'Montres'),
                color: "#0f766e",
                description: t('categories.watchesDescription', 'Montres de prestige et style')
            },
            "lunettes": {
                icon: "👓",
                title: t('categories.glasses', 'Lunettes'),
                color: "#4338ca",
                description: t('categories.glassesDescription', 'Lunettes de vue et solaire')
            },
            "bijoux": {
                icon: "💎",
                title: t('categories.jewelry', 'Bijoux'),
                color: "#f59e0b",
                description: t('categories.jewelryDescription', 'Bijoux et accessoires précieux')
            },
            "sacs_valises": {
                icon: "👜",
                title: t('categories.bags', 'Sacs & Valises'),
                color: "#dc2626",
                description: t('categories.bagsDescription', 'Sacs et bagages de qualité')
            },
            "garcons": {
                icon: "👦",
                title: t('categories.boys', 'Garçons'),
                color: "#2563eb",
                description: t('categories.boysDescription', 'Vêtements pour garçons')
            },
            "filles": {
                icon: "👧",
                title: t('categories.girls', 'Filles'),
                color: "#db2777",
                description: t('categories.girlsDescription', 'Vêtements pour filles')
            },
            "bebe": {
                icon: "👶",
                title: t('categories.baby', 'Bébé'),
                color: "#f97316",
                description: t('categories.babyDescription', 'Vêtements et accessoires bébé')
            },
            "tenues_professionnelles": {
                icon: "💼",
                title: t('categories.professional', 'Tenues Professionnelles'),
                color: "#475569",
                description: t('categories.professionalDescription', 'Vêtements de travail et professionnels')
            }
        };

        return categories[post.category] || {
            icon: "🛍️",
            title: post.category || t('categories.general', 'Produit Mode'),
            color: "#7c3aed",
            description: t('categories.generalDescription', 'Article de mode de qualité')
        };
    };

    // ✨ HIGHLIGHT MEJORADO - SIN COLOR AZUL
    const Highlight = ({ children, type = "default" }) => {
        const typeStyles = {
            default: { 
                backgroundColor: '#f3f4f6',
                color: '#1f2937',
                fontWeight: '700'
            },
            price: { 
                backgroundColor: '#d1fae5', 
                color: '#065f46',
                fontWeight: '800',
                border: '1px solid #10b981'
            },
            feature: { 
                backgroundColor: '#fef3c7', 
                color: '#92400e',
                fontWeight: '700'
            },
            contact: { 
                backgroundColor: '#f3f4f6',
                color: '#1f2937',
                fontWeight: '800'
            }
        };

        const style = typeStyles[type] || typeStyles.default;

        return (
            <span style={{
                ...style,
                padding: '4px 10px',
                borderRadius: '6px',
                margin: '0 3px',
                fontSize: '15px',
                display: 'inline-block',
                wordBreak: 'break-word',
                maxWidth: '100%',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                lineHeight: '1.4'
            }}>
                {children}
            </span>
        );
    };

    // 🆕 FIELDDISPLAY MEJORADO - TEXTO MÁS GRANDE Y NEGRITA
    const FieldDisplay = ({ label, value, icon, type = "text" }) => {
        if (!value && type !== "boolean") return null;

        return (
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '12px',
                padding: '10px 0',
                borderBottom: '1px solid #e5e7eb',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                width: '100%',
                wordBreak: 'break-word'
            }}>
                <span style={{
                    fontWeight: '800',
                    color: '#000000',
                    minWidth: isRTL ? 'auto' : '140px',
                    maxWidth: isRTL ? '160px' : '160px',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexShrink: 0,
                    textAlign: isRTL ? 'right' : 'left',
                    lineHeight: '1.5'
                }}>
                    {isRTL ? <>{label} {icon}</> : <>{icon} {label}</>}:
                </span>
                <span style={{ 
                    fontSize: '16px',
                    color: '#1f2937',
                    fontWeight: '600',
                    flex: 1,
                    textAlign: isRTL ? 'right' : 'left',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    lineHeight: '1.6'
                }}>
                    {type === "boolean" ? (
                        <span style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '700',
                            backgroundColor: value ? '#d1fae5' : '#fee2e2',
                            color: value ? '#065f46' : '#991b1b',
                            display: 'inline-block'
                        }}>
                            {value ? "✅ Oui" : "❌ Non"}
                        </span>
                    ) : (
                        <Highlight>{value}</Highlight>
                    )}
                </span>
            </div>
        );
    };

    // 💰 PRICEDISPLAY MEJORADO - TEXTO MÁS GRANDE
    const PriceDisplay = ({ label, value, currency = "USD" }) => {
        if (!value) return null;

        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                backgroundColor: '#ecfdf5',
                borderRadius: '8px',
                border: '2px solid #10b981',
                marginBottom: '12px',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                width: '100%',
                boxSizing: 'border-box',
                boxShadow: '0 2px 4px rgba(16, 185, 129, 0.15)'
            }}>
                <span style={{ 
                    fontWeight: '800',
                    color: '#000000',
                    fontSize: '16px',
                    textAlign: isRTL ? 'right' : 'left'
                }}>
                    {isRTL ? <>{label} 💰</> : <>💰 {label}</>}:
                </span>
                <div style={{ textAlign: isRTL ? 'left' : 'right' }}>
                    <div style={{ 
                        fontSize: '20px',
                        fontWeight: '900',
                        color: '#065f46',
                        whiteSpace: 'nowrap',
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}>
                        {value} {currency}
                    </div>
                </div>
            </div>
        );
    };

    // 📋 ARRAYDISPLAY MEJORADO - TEXTO MÁS GRANDE
    const ArrayDisplay = ({ label, items, icon }) => {
        if (!items || items.length === 0) return null;

        return (
            <div style={{ marginBottom: '16px', width: '100%' }}>
                <div style={{
                    fontWeight: '800',
                    color: '#000000',
                    marginBottom: '12px',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    padding: '8px 0',
                    borderBottom: '2px solid #e5e7eb'
                }}>
                    {isRTL ? <>{label} {icon}</> : <>{icon} {label}</>}:
                </div>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    justifyContent: isRTL ? 'flex-end' : 'flex-start',
                    marginTop: '10px'
                }}>
                    {items.map((item, index) => (
                        <span key={index} style={{
                            backgroundColor: '#f3f4f6',
                            color: '#1f2937',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            fontSize: '15px',
                            fontWeight: '700',
                            wordBreak: 'break-word',
                            textAlign: isRTL ? 'right' : 'left',
                            border: '1px solid #d1d5db',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}>
                            {isRTL ? <>{item} ✅</> : <>✅ {item}</>}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    // 🔹 SECCIÓN 1: ANUNCIO PRINCIPAL - ACTUALIZADO PARA MODA
    const generateMainAnnouncement = () => {
        const categoryInfo = getCategoryInfo();

        return (
            <div style={{
                background: styles.mainGradient,
                color: 'white',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '16px',
                textAlign: 'center',
                width: '100%',
                boxSizing: 'border-box',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>
                    {categoryInfo.icon}
                </div>
                <h1 style={{
                    margin: '0 0 10px 0',
                    fontSize: '24px',
                    fontWeight: '900',
                    wordBreak: 'break-word',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                    {t('excitingProduct', '🎉 Nouveau Produit Exclusif !')}
                </h1>
                <p style={{
                    fontSize: '17px',
                    opacity: '0.98',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                    padding: '0 12px',
                    wordBreak: 'break-word',
                    fontWeight: '600'
                }}>
                    <strong style={{ fontSize: '18px' }}>{categoryInfo.title}</strong> {t('proudlyPresents', 'vous présente un')}
                    <strong style={{ fontSize: '18px' }}> {post.title}</strong> {t('carefullySelected', 'soigneusement sélectionné pour votre style.')}
                </p>

                {/* Información clave del producto */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '16px',
                    flexWrap: 'wrap',
                    marginTop: '16px'
                }}>
                    {post.price && (
                        <div style={{ 
                            textAlign: 'center', 
                            minWidth: '160px',
                            flex: '1 1 auto', 
                            maxWidth: '240px',
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            padding: '12px',
                            borderRadius: '8px'
                        }}>
                            <div style={{ 
                                fontSize: '14px',
                                opacity: '0.9',
                                fontWeight: '700'
                            }}>
                                {isRTL ? 'السعر 💰' : '💰 Prix'}
                            </div>
                            <div style={{ 
                                fontSize: '15px',
                                fontWeight: '800',
                                wordBreak: 'break-word',
                                padding: '6px',
                                marginTop: '6px'
                            }}>
                                {post.price} {post.tipodemoneda || 'USD'}
                            </div>
                        </div>
                    )}

                    {post.etat && (
                        <div style={{ 
                            textAlign: 'center',
                            minWidth: '140px',
                            flex: '1 1 auto',
                            maxWidth: '240px',
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            padding: '12px',
                            borderRadius: '8px'
                        }}>
                            <div style={{ 
                                fontSize: '14px',
                                opacity: '0.9',
                                fontWeight: '700'
                            }}>
                                {isRTL ? 'الحالة 📊' : '📊 État'}
                            </div>
                            <div style={{
                                fontSize: '15px',
                                fontWeight: '800',
                                wordBreak: 'break-word',
                                padding: '6px',
                                marginTop: '6px'
                            }}>
                                {post.etat}
                            </div>
                        </div>
                    )}

                    {post.marca && (
                        <div style={{ 
                            textAlign: 'center', 
                            minWidth: '120px',
                            flex: '1 1 auto', 
                            maxWidth: '180px',
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            padding: '12px',
                            borderRadius: '8px'
                        }}>
                            <div style={{ 
                                fontSize: '14px',
                                opacity: '0.9',
                                fontWeight: '700'
                            }}>
                                {isRTL ? 'العلامة التجارية 🏷️' : '🏷️ Marque'}
                            </div>
                            <div style={{ 
                                fontSize: '15px',
                                fontWeight: '800',
                                marginTop: '6px'
                            }}>
                                {post.marca}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 🔹 SECCIÓN 2: DESCRIPCIÓN DEL PRODUCTO
    const generateDescriptionSection = () => {
        if (!post.description) return null;

        return (
            <div style={{
                backgroundColor: '#f8fafc',
                padding: '18px',
                borderRadius: '12px',
                marginBottom: '16px',
                border: '2px solid #cbd5e1',
                width: '100%',
                boxSizing: 'border-box',
                boxShadow: styles.cardShadow
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '14px',
                    color: styles.primaryColor,
                    fontSize: '20px',
                    fontWeight: '900',
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    borderBottom: '2px solid #cbd5e1',
                    paddingBottom: '10px'
                }}>
                    {isRTL ? 'وصف المنتج 📝' : '📝 Description du Produit'}
                </h2>
                <div style={{
                    fontSize: '16px',
                    color: '#374151',
                    lineHeight: '1.7',
                    textAlign: isRTL ? 'right' : 'left',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    fontWeight: '600'
                }}>
                    <span>
                        {
                            post.description.length < 120
                                ? post.description
                                : readMore ? post.description + ' ' : post.description.slice(0, 120) + '...'
                        }
                    </span>
                    {post.description.length > 120 && (
                        <span
                            style={{
                                color: '#1e293b',
                                cursor: 'pointer',
                                fontWeight: '800',
                                marginLeft: isRTL ? '0' : '10px',
                                marginRight: isRTL ? '10px' : '0',
                                fontSize: '15px',
                                display: 'inline-block',
                                marginTop: '8px',
                                textDecoration: 'underline'
                            }}
                            onClick={() => setReadMore(!readMore)}
                        >
                            {readMore ?
                                (isRTL ? 'عرض أقل ▲' : '▲ Voir moins') :
                                (isRTL ? 'قراءة المزيد ▼' : '▼ Lire la suite')}
                        </span>
                    )}
                </div>
            </div>
        );
    };

    // 🔹 SECCIÓN 3: INFORMACIÓN BÁSICA DEL PRODUCTO
    const generateBasicInfoSection = () => {
        return (
            <div style={{
                backgroundColor: '#eff6ff',
                padding: '18px',
                borderRadius: '12px',
                marginBottom: '16px',
                border: '2px solid #93c5fd',
                width: '100%',
                boxSizing: 'border-box',
                boxShadow: styles.cardShadow
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '14px',
                    color: styles.primaryColor,
                    fontSize: '20px',
                    fontWeight: '900',
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    borderBottom: '2px solid #93c5fd',
                    paddingBottom: '10px'
                }}>
                    {isRTL ? 'معلومات المنتج 🎯' : '🎯 Informations du Produit'}
                </h2>
                
                <FieldDisplay
                    label={isRTL ? "العنوان" : "Titre"}
                    value={post.title}
                    icon="🏷️"
                />
                <FieldDisplay
                    label={isRTL ? "الفئة" : "Catégorie"}
                    value={post.category}
                    icon="📂"
                />
                <FieldDisplay
                    label={isRTL ? "الفئة الفرعية" : "Sous-catégorie"}
                    value={post.subCategory}
                    icon="📁"
                />
                
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '0',
                    marginTop: '6px'
                }}>
                    <FieldDisplay
                        label={isRTL ? "الجنس" : "Genre"}
                        value={post.genero}
                        icon="👤"
                    />
                    <FieldDisplay
                        label={isRTL ? "الحالة" : "État"}
                        value={post.etat}
                        icon="📊"
                    />
                    <FieldDisplay
                        label={isRTL ? "الماركة" : "Marque"}
                        value={post.marca}
                        icon="🏷️"
                    />
                    <FieldDisplay
                        label={isRTL ? "المادة" : "Matière"}
                        value={post.material}
                        icon="🧵"
                    />
                </div>
            </div>
        );
    };

    // 🔹 SECCIÓN 4: COLORES Y TALLAS
    const generateColorsSizesSection = () => {
        const hasColors = post.color && post.color.length > 0;
        const hasSizes = post.talla && post.talla.length > 0;

        if (!hasColors && !hasSizes) return null;

        return (
            <div style={{
                backgroundColor: '#f0fdf4',
                padding: '18px',
                borderRadius: '12px',
                marginBottom: '16px',
                border: '2px solid #86efac',
                width: '100%',
                boxSizing: 'border-box',
                boxShadow: styles.cardShadow
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '14px',
                    color: styles.successColor,
                    fontSize: '20px',
                    fontWeight: '900',
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    borderBottom: '2px solid #86efac',
                    paddingBottom: '10px'
                }}>
                    {isRTL ? 'الألوان والمقاسات 🎨' : '🎨 Couleurs & Tailles'}
                </h2>

                {hasColors && (
                    <ArrayDisplay
                        label={isRTL ? "الألوان المتاحة" : "Couleurs Disponibles"}
                        items={post.color}
                        icon="🎨"
                    />
                )}

                {hasSizes && (
                    <ArrayDisplay
                        label={isRTL ? "المقاسات المتاحة" : "Tailles Disponibles"}
                        items={post.talla}
                        icon="📏"
                    />
                )}

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '0',
                    marginTop: '12px'
                }}>
                    <FieldDisplay
                        label={isRTL ? "الموسم" : "Saison"}
                        value={post.temporada}
                        icon="🌸"
                    />
                    <FieldDisplay
                        label={isRTL ? "نوع اللون" : "Type de Couleur"}
                        value={post.tipocolor}
                        icon="🎨"
                    />
                    <FieldDisplay
                        label={isRTL ? "المناسبة" : "Occasion"}
                        value={post.ocasion}
                        icon="🎉"
                    />
                    <FieldDisplay
                        label={isRTL ? "النمط" : "Style"}
                        value={post.estilo}
                        icon="👔"
                    />
                </div>
            </div>
        );
    };

    // 🔹 SECCIÓN 5: PRECIO Y TIPO DE VENTA
    const generatePricingSection = () => {
        if (!post.price && !post.tipoventa) return null;

        return (
            <div style={{
                backgroundColor: '#fffbeb',
                padding: '18px',
                borderRadius: '12px',
                marginBottom: '16px',
                border: '2px solid #fbbf24',
                width: '100%',
                boxSizing: 'border-box',
                boxShadow: styles.cardShadow
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '14px',
                    color: styles.warningColor,
                    fontSize: '20px',
                    fontWeight: '900',
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    borderBottom: '2px solid #fbbf24',
                    paddingBottom: '10px'
                }}>
                    {isRTL ? 'التسعير 💰' : '💰 Tarification'}
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '10px'
                }}>
                    <PriceDisplay
                        label={isRTL ? "السعر" : "Prix"}
                        value={post.price}
                        currency={post.tipodemoneda || 'USD'}
                    />
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '0',
                    marginTop: '12px'
                }}>
                    <FieldDisplay 
                        label={isRTL ? "نوع البيع" : "Type de Vente"} 
                        value={post.tipoventa}
                        icon="🏷️"
                    />
                    <FieldDisplay 
                        label={isRTL ? "العملة" : "Devise"} 
                        value={post.tipodemoneda}
                        icon="💱"
                    />
                </div>
            </div>
        );
    };

    // 🔹 SECCIÓN 6: CAMPOS ESPECÍFICOS POR CATEGORÍA
    const generateCategorySpecificSection = () => {
        const hasSpecificFields = post.edadbebes || post.tipomaterialbijoux || post.tipopiedra ||
            post.alturatacon || post.tipodecierre || post.formadepunta || post.tipodesuela ||
            post.tipodecierre_hombre || post.tipodelente || post.anchopuente || post.langitudpatilla ||
            post.movimientoreloj || post.materialcorrea || post.resistenciaagua || post.funcionalidades ||
            post.tiporeloj || post.tipodsangle || post.correa || post.tallasaco || post.tipodelabata ||
            post.sectordetrabajo;

        if (!hasSpecificFields) return null;

        return (
            <div style={{
                backgroundColor: '#faf5ff',
                padding: '18px',
                borderRadius: '12px',
                marginBottom: '16px',
                border: '2px solid #e9d5ff',
                width: '100%',
                boxSizing: 'border-box',
                boxShadow: styles.cardShadow
            }}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '14px',
                    color: styles.purpleColor,
                    fontSize: '20px',
                    fontWeight: '900',
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    borderBottom: '2px solid #e9d5ff',
                    paddingBottom: '10px'
                }}>
                    {isRTL ? 'مواصفات إضافية 🔧' : '🔧 Spécifications Additionnelles'}
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '0'
                }}>
                    {/* Bebés */}
                    <FieldDisplay
                        label={isRTL ? "عمر الأطفال" : "Âge Bébés"}
                        value={post.edadbebes}
                        icon="👶"
                    />

                    {/* Bijoux */}
                    <FieldDisplay
                        label={isRTL ? "نوع الحجر" : "Type de Pierre"}
                        value={post.tipopiedra}
                        icon="💎"
                    />
                    <FieldDisplay
                        label={isRTL ? "نوع المادة" : "Type de Matériau"}
                        value={post.tipomaterialbijoux}
                        icon="🔧"
                    />

                    {/* Zapatos Mujer */}
                    <FieldDisplay
                        label={isRTL ? "ارتفاع الكعب" : "Hauteur Talon"}
                        value={post.alturatacon}
                        icon="👠"
                    />
                    <FieldDisplay
                        label={isRTL ? "نوع الإغلاق" : "Type de Fermeture"}
                        value={post.tipodecierre}
                        icon="🔒"
                    />
                    <FieldDisplay
                        label={isRTL ? "شكل المقدمة" : "Forme de la Pointe"}
                        value={post.formadepunta}
                        icon="👞"
                    />

                    {/* Zapatos Hombre */}
                    <FieldDisplay
                        label={isRTL ? "نوع النعل" : "Type de Semelle"}
                        value={post.tipodesuela}
                        icon="👟"
                    />
                    <FieldDisplay
                        label={isRTL ? "نوع الإغلاق" : "Type de Fermeture"}
                        value={post.tipodecierre_hombre}
                        icon="🔒"
                    />

                    {/* Gafas */}
                    <FieldDisplay
                        label={isRTL ? "نوع العدسة" : "Type de Verre"}
                        value={post.tipodelente}
                        icon="👓"
                    />
                    <FieldDisplay
                        label={isRTL ? "عرض الجسر" : "Largeur Pont"}
                        value={post.anchopuente}
                        icon="📏"
                    />
                    <FieldDisplay
                        label={isRTL ? "طول الذراع" : "Longueur Branche"}
                        value={post.langitudpatilla}
                        icon="📐"
                    />

                    {/* Relojes */}
                    <FieldDisplay
                        label={isRTL ? "نوع الحركة" : "Type de Mouvement"}
                        value={post.movimientoreloj}
                        icon="⚙️"
                    />
                    <FieldDisplay
                        label={isRTL ? "مادة السوار" : "Matière du Bracelet"}
                        value={post.materialcorrea}
                        icon="⌚"
                    />
                    <FieldDisplay
                        label={isRTL ? "مقاومة الماء" : "Résistance à l'Eau"}
                        value={post.resistenciaagua}
                        icon="💧"
                    />
                    <FieldDisplay
                        label={isRTL ? "الوظائف" : "Fonctionnalités"}
                        value={post.funcionalidades}
                        icon="🔧"
                    />
                    <FieldDisplay
                        label={isRTL ? "نوع الساعة" : "Type de Montre"}
                        value={post.tiporeloj}
                        icon="⏰"
                    />

                    {/* Sacs et Valises */}
                    <FieldDisplay
                        label={isRTL ? "نوع الحزام" : "Type de Sangle"}
                        value={post.tipodsangle}
                        icon="🎒"
                    />
                    <FieldDisplay
                        label={isRTL ? "الحزام" : "Correa"}
                        value={post.correa}
                        icon="👜"
                    />
                    <FieldDisplay
                        label={isRTL ? "مقاس الكيس" : "Taille du Sac"}
                        value={post.tallasaco}
                        icon="📦"
                    />

                    {/* Professionnel */}
                    <FieldDisplay
                        label={isRTL ? "نوع المعطف" : "Type de Blouse"}
                        value={post.tipodelabata}
                        icon="🥼"
                    />
                    <FieldDisplay
                        label={isRTL ? "قطاع العمل" : "Secteur de Travail"}
                        value={post.sectordetrabajo}
                        icon="💼"
                    />
                </div>
            </div>
        );
    };

    // 🔹 SECCIÓN 7: CONTACTO Y COMPRA - CON ICONOS DE TELÉFONO Y CÁMARA
    const generateContactSection = () => {
        return (
            <div style={{
                background: styles.contactGradient,
                color: 'white',
                padding: '18px',
                borderRadius: '10px',
                textAlign: 'center',
                width: '100%',
                boxSizing: 'border-box',
            }}>
                <h2 style={{
                    margin: '0 0 12px 0',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                    fontWeight: '800'
                }}>
                    {isRTL ? 'جاهز للشراء؟ 📞' : '📞 Prêt à Acheter ?'}
                </h2>

                <p style={{ 
                    marginBottom: '14px',
                    fontSize: '16px',
                    opacity: '0.95',
                    padding: '0 10px',
                    lineHeight: '1.5',
                    wordBreak: 'break-word',
                    fontWeight: '600'
                }}>
                    {isRTL 
                        ? 'لا تفوت هذه الفرصة الفريدة! اتصل بنا الآن.'
                        : t('contact.dontMiss', 'Ne manquez pas cette opportunité unique ! Contactez-nous dès maintenant.')
                    }
                </p>

                {post.user?.username && (
                    <div style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: '14px 18px',
                        borderRadius: '8px',
                        display: 'inline-block',
                        marginBottom: '14px',
                        maxWidth: '100%',
                        wordBreak: 'break-word'
                    }}>
                        <div style={{ 
                            fontSize: '13px',
                            opacity: '0.85', 
                            marginBottom: '6px',
                            fontWeight: '700'
                        }}>
                            {isRTL ? 'البائع 👤' : '👤 Vendeur'}
                        </div>
                        <div style={{ 
                            fontSize: '18px',
                            fontWeight: '900',
                            direction: 'ltr',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            display: 'inline-block',
                            minWidth: '200px',
                            border: '1px solid rgba(255,255,255,0.3)'
                        }}>
                            {post.user.username}
                        </div>
                    </div>
                )}

                {/* Sección de contacto telefónico con iconos de llamada y cámara */}
                {post.user?.mobile && (
                    <div style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: '18px',
                        borderRadius: '8px',
                        display: 'inline-block',
                        marginBottom: '14px',
                        maxWidth: '100%',
                        wordBreak: 'break-word'
                    }}>
                        <div style={{ 
                            fontSize: '13px',
                            opacity: '0.85', 
                            marginBottom: '12px',
                            fontWeight: '700'
                        }}>
                            {isRTL ? 'اتصل بنا 📞' : '📞 Contactez-nous'}
                        </div>
                        
                        {/* Número de teléfono principal */}
                        <div style={{ 
                            fontSize: '18px',
                            fontWeight: '900',
                            direction: 'ltr',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            display: 'inline-block',
                            minWidth: '200px',
                            border: '1px solid rgba(255,255,255,0.3)',
                            marginBottom: '12px'
                        }}>
                            {post.user.mobile}
                        </div>

                        {/* Botones de acción */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '12px',
                            flexWrap: 'wrap',
                            marginTop: '12px'
                        }}>
                            {/* Botón de llamada directa */}
                            <div 
                                style={{ 
                                    backgroundColor: '#10b981',
                                    color: 'white',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontWeight: '800',
                                    fontSize: '14px',
                                    transition: 'all 0.3s ease',
                                    minWidth: '140px',
                                    justifyContent: 'center',
                                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                                }}
                                onClick={() => {
                                    // ✅ Abre el dialer del teléfono para llamada directa
                                    window.location.href = `tel:${post.user.mobile}`;
                                }}
                                onTouchStart={(e) => {
                                    e.currentTarget.style.backgroundColor = '#059669';
                                    e.currentTarget.style.transform = 'scale(0.98)';
                                }}
                                onTouchEnd={(e) => {
                                    e.currentTarget.style.backgroundColor = '#10b981';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                📞 {isRTL ? 'اتصال' : 'Appeler'}
                            </div>

                            {/* Botón de video llamada/cámara */}
                            <div 
                                style={{ 
                                    backgroundColor: '#8b5cf6',
                                    color: 'white',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontWeight: '800',
                                    fontSize: '14px',
                                    transition: 'all 0.3s ease',
                                    minWidth: '140px',
                                    justifyContent: 'center',
                                    boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
                                }}
                                onClick={() => {
                                    // ✅ Abre la cámara para streaming/video llamada
                                    // Puedes integrar con WebRTC, Zoom, Meet, etc.
                                    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                                        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                                            .then(() => {
                                                // Aquí puedes integrar con tu servicio de video llamada
                                                alert(isRTL ? 
                                                    'جاهز للاتصال المرئي! سيتم فتح الكاميرا.' : 
                                                    'Prêt pour la visioconférence ! La caméra sera activée.'
                                                );
                                                // Ejemplo: window.open(`https://meet.google.com/new?phone=${post.user.mobile}`, '_blank');
                                            })
                                            .catch(() => {
                                                alert(isRTL ? 
                                                    'تعذر الوصول إلى الكاميرا. يرجى التحقق من الأذونات.' : 
                                                    'Impossible d\'accéder à la caméra. Veuillez vérifier les permissions.'
                                                );
                                            });
                                    } else {
                                        // Fallback para dispositivos sin cámara
                                        alert(isRTL ? 
                                            'الاتصال المرئي غير متاح على هذا الجهاز.' : 
                                            'La visioconférence n\'est pas disponible sur cet appareil.'
                                        );
                                    }
                                }}
                                onTouchStart={(e) => {
                                    e.currentTarget.style.backgroundColor = '#7c3aed';
                                    e.currentTarget.style.transform = 'scale(0.98)';
                                }}
                                onTouchEnd={(e) => {
                                    e.currentTarget.style.backgroundColor = '#8b5cf6';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                📹 {isRTL ? 'فيديو' : 'Vidéo'}
                            </div>
                        </div>

                        <div style={{
                            fontSize: '12px',
                            opacity: '0.7',
                            marginTop: '10px',
                            fontStyle: 'italic'
                        }}>
                            {isRTL ? 'انقر للاتصال المباشر أو الفيديو' : 'Cliquez pour appeler ou vidéo'}
                        </div>
                    </div>
                )}

                <p style={{ 
                    fontSize: '15px',
                    opacity: '0.9', 
                    margin: '0',
                    wordBreak: 'break-word',
                    fontWeight: '700'
                }}>
                    {isRTL 
                        ? '🎉 اشتر بثقة تامة!'
                        : t('contact.guarantee', 'Achetez en toute confiance !') + ' 🎉'
                    }
                </p>
            </div>
        );
    };

    // 🎯 RENDER PRINCIPAL MEJORADO - CORRECCIÓN RTL COMPLETA
    return (
        <div style={{
            direction: isRTL ? 'rtl' : 'ltr',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            lineHeight: '1.5',
            color: '#2d3748',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '14px',
            width: '100%',
            boxSizing: 'border-box',
            overflowX: 'hidden',
            textAlign: isRTL ? 'right' : 'left'
        }}>
            {generateMainAnnouncement()}
            {generateDescriptionSection()}
            {generateBasicInfoSection()}
            {generateColorsSizesSection()}
            {generatePricingSection()}
            {generateCategorySpecificSection()}
            {generateContactSection()}
        </div>
    );
};

export default DescriptionPost;