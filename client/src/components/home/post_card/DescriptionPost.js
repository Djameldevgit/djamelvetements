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

    // 🎯 FUNCIONES DE CONTACTO
    const handleCallOwner = () => {
        const phoneNumber = post.telefono || post.user?.mobile;
        if (!phoneNumber) {
            alert(isRTL ? 'رقم الهاتف غير متاح' : 'Numéro de téléphone non disponible');
            return;
        }
        
        // 🎯 LLAMADA DIRECTA SIN CONFIRMACIÓN
        window.location.href = `tel:${phoneNumber}`;
    };

    const handleChatWithOwner = () => {
        if (!post.user || !post.user._id) {
            alert(isRTL ? 'لا يمكن بدء محادثة مع هذا البائع' : 'Impossible de démarrer une conversation avec ce vendeur');
            return;
        }
        
        // 🎯 REDIRIGIR AL CHAT - puedes integrar tu lógica de chat aquí
        alert(isRTL ? 
            `سيتم فتح الدردشة مع ${post.user.username}` : 
            `Ouverture de la conversation avec ${post.user.username}`
        );
        // Ejemplo: window.open(`/message/${post.user._id}`, '_blank');
    };

    const handleVideoCall = () => {
        // 🎯 INICIAR CÁMARA PARA STREAMING/VIDEO LLAMADA
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    alert(isRTL ? 
                        'الكاميرا جاهزة للاتصال المرئي!' : 
                        'Caméra activée pour la visioconférence !'
                    );
                    // Detener el stream después de mostrar el mensaje
                    stream.getTracks().forEach(track => track.stop());
                    // 🎯 Aquí puedes integrar con tu servicio de video llamada
                    // Ejemplo: window.open(`https://meet.google.com/new`, '_blank');
                })
                .catch((error) => {
                    console.error('Error accessing camera:', error);
                    alert(isRTL ? 
                        'تعذر الوصول إلى الكاميرا. يرجى التحقق من الأذونات.' : 
                        'Impossible d\'accéder à la caméra. Veuillez vérifier les permissions.'
                    );
                });
        } else {
            alert(isRTL ? 
                'الاتصال المرئي غير متاح على هذا الجهاز.' : 
                'La visioconférence n\'est pas disponible sur cet appareil.'
            );
        }
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

    // 🔹 SECCIÓN 1: ANUNCIO PRINCIPAL
    const generateMainAnnouncement = () => {
        return (
            <div style={{
                background: styles.mainGradient,
                color: 'white',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center',
                marginBottom: '20px',
                boxShadow: styles.cardShadow
            }}>
                <h1 style={{
                    margin: '0 0 10px 0',
                    fontSize: '22px',
                    fontWeight: '800',
                    wordBreak: 'break-word'
                }}>
                    {post.title || t('descripcion.noTitle', 'Sans titre')}
                </h1>
                
                <div style={{
                    fontSize: '16px',
                    opacity: '0.9',
                    fontWeight: '600'
                }}>
                    {getCategoryInfo().icon} {getCategoryInfo().title}
                </div>
            </div>
        );
    };

    // 🔹 SECCIÓN 2: DESCRIPCIÓN
    const generateDescriptionSection = () => {
        if (!post.description && !post.content) return null;

        const description = post.description || post.content;
        const shouldTruncate = description.length > 200;
        const displayText = readMore ? description : (shouldTruncate ? description.substring(0, 200) + '...' : description);

        return (
            <div style={{
                backgroundColor: '#f8fafc',
                padding: '18px',
                borderRadius: '10px',
                marginBottom: '18px',
                border: '1px solid #e2e8f0'
            }}>
                <h2 style={{
                    margin: '0 0 12px 0',
                    fontSize: '18px',
                    color: styles.primaryColor,
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    📝 {isRTL ? 'الوصف' : t('descripcion.description', 'Description')}
                </h2>
                
                <p style={{
                    margin: '0',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: styles.textMedium,
                    wordBreak: 'break-word'
                }}>
                    {displayText}
                </p>
                
                {shouldTruncate && (
                    <button
                        onClick={() => setReadMore(!readMore)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: styles.purpleColor,
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '700',
                            marginTop: '10px',
                            padding: '5px 0'
                        }}
                    >
                        {readMore ? 
                            (isRTL ? 'عرض أقل' : t('descripcion.showLess', 'Voir moins')) : 
                            (isRTL ? 'عرض المزيد' : t('descripcion.showMore', 'Voir plus'))
                        }
                    </button>
                )}
            </div>
        );
    };

    // 🔹 SECCIÓN 3: INFORMACIÓN BÁSICA
    const generateBasicInfoSection = () => {
        return (
            <div style={{
                backgroundColor: '#f8fafc',
                padding: '18px',
                borderRadius: '10px',
                marginBottom: '18px',
                border: '1px solid #e2e8f0'
            }}>
                <h2 style={{
                    margin: '0 0 15px 0',
                    fontSize: '18px',
                    color: styles.primaryColor,
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    ℹ️ {isRTL ? 'المعلومات الأساسية' : t('descripcion.basicInfo', 'Informations de Base')}
                </h2>
                
                <div style={{ display: 'grid', gap: '12px' }}>
                    {post.etat && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: styles.textDark }}>
                                {isRTL ? 'الحالة' : t('descripcion.condition', 'État')}:
                            </span>
                            <Highlight type="feature">{post.etat}</Highlight>
                        </div>
                    )}
                    
                    {post.genero && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: styles.textDark }}>
                                {isRTL ? 'الجنس' : t('descripcion.gender', 'Genre')}:
                            </span>
                            <Highlight>{post.genero}</Highlight>
                        </div>
                    )}
                    
                    {post.marca && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: styles.textDark }}>
                                {isRTL ? 'العلامة التجارية' : t('descripcion.brand', 'Marque')}:
                            </span>
                            <Highlight>{post.marca}</Highlight>
                        </div>
                    )}
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
                backgroundColor: '#f8fafc',
                padding: '18px',
                borderRadius: '10px',
                marginBottom: '18px',
                border: '1px solid #e2e8f0'
            }}>
                <h2 style={{
                    margin: '0 0 15px 0',
                    fontSize: '18px',
                    color: styles.primaryColor,
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    🎨 {isRTL ? 'الألوان والمقاسات' : t('descripcion.colorsSizes', 'Couleurs & Tailles')}
                </h2>
                
                <div style={{ display: 'grid', gap: '12px' }}>
                    {hasColors && (
                        <div>
                            <span style={{ fontWeight: '600', color: styles.textDark, display: 'block', marginBottom: '8px' }}>
                                {isRTL ? 'الألوان المتاحة' : t('descripcion.availableColors', 'Couleurs disponibles')}:
                            </span>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {post.color.map((color, index) => (
                                    <Highlight key={index} type="feature">{color}</Highlight>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {hasSizes && (
                        <div>
                            <span style={{ fontWeight: '600', color: styles.textDark, display: 'block', marginBottom: '8px' }}>
                                {isRTL ? 'المقاسات المتاحة' : t('descripcion.availableSizes', 'Tailles disponibles')}:
                            </span>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {post.talla.map((size, index) => (
                                    <Highlight key={index}>{size}</Highlight>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 🔹 SECCIÓN 5: PRECIO
    const generatePricingSection = () => {
        if (!post.price) return null;

        return (
            <div style={{
                backgroundColor: '#f0fdf4',
                padding: '18px',
                borderRadius: '10px',
                marginBottom: '18px',
                border: '1px solid #bbf7d0'
            }}>
                <h2 style={{
                    margin: '0 0 15px 0',
                    fontSize: '18px',
                    color: styles.successColor,
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    💰 {isRTL ? 'السعر' : t('descripcion.price', 'Prix')}
                </h2>
                
                <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                        fontSize: '28px', 
                        fontWeight: '900', 
                        color: styles.successColor,
                        marginBottom: '8px'
                    }}>
                        <Highlight type="price">
                            {post.price} {post.tipodemoneda || 'DZD'}
                        </Highlight>
                    </div>
                    
                    {post.tipoventa && (
                        <div style={{ 
                            fontSize: '16px', 
                            color: styles.textLight,
                            fontWeight: '600'
                        }}>
                            {isRTL ? 'نوع البيع' : t('descripcion.saleType', 'Type de vente')}: {' '}
                            <Highlight>{post.tipoventa}</Highlight>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 🔹 SECCIÓN 6: INFORMACIÓN ESPECÍFICA DE CATEGORÍA
    const generateCategorySpecificSection = () => {
        const categoryInfo = getCategoryInfo();
        
        return (
            <div style={{
                backgroundColor: '#faf5ff',
                padding: '18px',
                borderRadius: '10px',
                marginBottom: '18px',
                border: '1px solid #e9d5ff'
            }}>
                <h2 style={{
                    margin: '0 0 15px 0',
                    fontSize: '18px',
                    color: styles.purpleColor,
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    {categoryInfo.icon} {isRTL ? 'معلومات الفئة' : t('descripcion.categoryInfo', 'Informations Catégorie')}
                </h2>
                
                <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                        fontSize: '20px', 
                        fontWeight: '800', 
                        color: styles.purpleColor,
                        marginBottom: '8px'
                    }}>
                        {categoryInfo.title}
                    </div>
                    
                    <div style={{ 
                        fontSize: '16px', 
                        color: styles.textLight,
                        fontStyle: 'italic'
                    }}>
                        {categoryInfo.description}
                    </div>
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
                                onClick={handleCallOwner}
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
                                onClick={handleVideoCall}
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

                {/* 🎯 NUEVA SECCIÓN: ICONOS DE CONTACTO AL FINAL */}
                <div style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    padding: '16px',
                    borderRadius: '8px',
                    marginTop: '16px'
                }}>
                    <h3 style={{
                        fontSize: '16px',
                        marginBottom: '12px',
                        fontWeight: '700',
                        opacity: '0.9'
                    }}>
                        {isRTL ? 'طرق التواصل السريعة' : 'Contact Rapide'}
                    </h3>
                    
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}>
                        {/* Icono Teléfono */}
                        <div 
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                padding: '10px',
                                borderRadius: '8px',
                                minWidth: '80px'
                            }}
                            onClick={handleCallOwner}
                            onTouchStart={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.3)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onTouchEnd={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                            title={isRTL ? 'اتصال هاتفي' : 'Appel téléphonique'}
                        >
                            <div style={{
                                fontSize: '24px',
                                marginBottom: '6px',
                                backgroundColor: '#10b981',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)'
                            }}>
                                📞
                            </div>
                            <span style={{
                                fontSize: '12px',
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {isRTL ? 'اتصال' : 'Appel'}
                            </span>
                        </div>

                        {/* Icono Chat */}
                        <div 
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                padding: '10px',
                                borderRadius: '8px',
                                minWidth: '80px'
                            }}
                            onClick={handleChatWithOwner}
                            onTouchStart={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onTouchEnd={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                            title={isRTL ? 'دردشة مع البائع' : 'Chat avec le vendeur'}
                        >
                            <div style={{
                                fontSize: '24px',
                                marginBottom: '6px',
                                backgroundColor: '#3b82f6',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)'
                            }}>
                                💬
                            </div>
                            <span style={{
                                fontSize: '12px',
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {isRTL ? 'دردشة' : 'Chat'}
                            </span>
                        </div>

                        {/* Icono Cámara/Video */}
                        <div 
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                padding: '10px',
                                borderRadius: '8px',
                                minWidth: '80px'
                            }}
                            onClick={handleVideoCall}
                            onTouchStart={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.3)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onTouchEnd={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                            title={isRTL ? 'اتصال مرئي' : 'Appel vidéo'}
                        >
                            <div style={{
                                fontSize: '24px',
                                marginBottom: '6px',
                                backgroundColor: '#8b5cf6',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 8px rgba(139, 92, 246, 0.4)'
                            }}>
                                📹
                            </div>
                            <span style={{
                                fontSize: '12px',
                                fontWeight: '700',
                                textAlign: 'center'
                            }}>
                                {isRTL ? 'فيديو' : 'Vidéo'}
                            </span>
                        </div>
                    </div>

                    <div style={{
                        fontSize: '11px',
                        opacity: '0.7',
                        marginTop: '12px',
                        fontStyle: 'italic',
                        textAlign: 'center'
                    }}>
                        {isRTL ? 'انقر على أيقونة للاتصال الفوري' : 'Cliquez sur une icône pour un contact immédiat'}
                    </div>
                </div>

                <p style={{ 
                    fontSize: '15px',
                    opacity: '0.9', 
                    margin: '16px 0 0 0',
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