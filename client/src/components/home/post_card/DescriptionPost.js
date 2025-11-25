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

    // ✅ FUNCIÓN MEJORADA: Obtener valores con nombres alternativos
    const getFieldValue = (fieldName, altNames = []) => {
        // Buscar en el campo principal
        if (post && post[fieldName]) return post[fieldName];
        
        // Buscar en nombres alternativos
        for (const altName of altNames) {
            if (post && post[altName]) return post[altName];
        }
        
        return null;
    };

    // ✅ FUNCIÓN MEJORADA: Obtener array con nombres alternativos
    const getArrayFieldValue = (fieldName, altNames = []) => {
        // Buscar en el campo principal
        if (post && post[fieldName] && Array.isArray(post[fieldName])) {
            return post[fieldName];
        }
        
        // Buscar en nombres alternativos
        for (const altName of altNames) {
            if (post && post[altName] && Array.isArray(post[altName])) {
                return post[altName];
            }
        }
        
        return [];
    };

    // ✅ FUNCIÓN NUEVA: Verificar si un campo tiene valor
    const hasFieldValue = (fieldName, altNames = []) => {
        const value = getFieldValue(fieldName, altNames);
        return value && value !== '' && value !== null && value !== undefined;
    };

    // 🎯 FUNCIONES DE CONTACTO MEJORADAS
    const handleCallOwner = () => {
        const phoneNumber = getFieldValue('telefono', ['phone', 'mobile']);
        if (!phoneNumber) {
            alert(isRTL ? 'رقم الهاتف غير متاح' : 'Numéro de téléphone non disponible');
            return;
        }
        
        window.location.href = `tel:${phoneNumber}`;
    };

    const handleChatWithOwner = () => {
        const userId = getFieldValue('_id') || post.user?._id;
        if (!userId) {
            alert(isRTL ? 'لا يمكن بدء محادثة مع هذا البائع' : 'Impossible de démarrer une conversation avec ce vendeur');
            return;
        }
        
        const chatUrl = `/chat/${userId}`;
        window.open(chatUrl, '_blank');
        
        setTimeout(() => {
            const userName = getFieldValue('username') || post.user?.username || 'Vendeur';
            alert(isRTL ? 
                `تم فتح الدردشة مع ${userName}` : 
                `Conversation ouverte avec ${userName}`
            );
        }, 500);
    };

    const handleVideoCall = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    const userId = getFieldValue('_id') || post.user?._id || 'store';
                    const videoCallUrl = `https://meet.jit.si/tassili-${userId}-${Date.now()}`;
                    
                    const videoWindow = window.open(videoCallUrl, '_blank', 
                        'width=800,height=600,scrollbars=yes,resizable=yes');
                    
                    if (videoWindow) {
                        alert(isRTL ? 
                            'جاري فتح غرفة الفيديو...' : 
                            'Ouverture de la salle de visioconférence...'
                        );
                    } else {
                        alert(isRTL ? 
                            'تم منع النافذة المنبثقة. يرجى السماح بالنوافذ المنبثقة لهذا الموقع.' : 
                            'Popup bloqué. Veuillez autoriser les popups pour ce site.'
                        );
                    }
                    
                    setTimeout(() => {
                        stream.getTracks().forEach(track => track.stop());
                    }, 1000);
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

    // 🏷️ Información de categoría actualizada
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

        const category = getFieldValue('category', ['categorie', 'type']);
        return categories[category] || {
            icon: "🛍️",
            title: category || t('categories.general', 'Produit Mode'),
            color: "#7c3aed",
            description: t('categories.generalDescription', 'Article de mode de qualité')
        };
    };

    // ✨ HIGHLIGHT MEJORADO
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
            },
            special: {
                backgroundColor: '#e0e7ff',
                color: '#3730a3',
                fontWeight: '700'
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
        const title = getFieldValue('title', ['titulo', 'name', 'nom']);
        
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
                    {title || t('descripcion.noTitle', 'Sans titre')}
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
        const description = getFieldValue('description', ['descripcion', 'content', 'contenu']);
        if (!description) return null;

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

    // 🔹 SECCIÓN 3: INFORMACIÓN BÁSICA ACTUALIZADA
    const generateBasicInfoSection = () => {
        const hasBasicInfo = 
            hasFieldValue('genero') || 
            hasFieldValue('etat', ['estado', 'condition']) || 
            hasFieldValue('marca') || 
            hasFieldValue('material') ||
            hasFieldValue('estilo') ||
            hasFieldValue('temporada');

        if (!hasBasicInfo) return null;

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
                    {hasFieldValue('etat', ['estado', 'condition']) && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: styles.textDark }}>
                                {isRTL ? 'الحالة' : t('descripcion.condition', 'État')}:
                            </span>
                            <Highlight type="feature">{getFieldValue('etat', ['estado', 'condition'])}</Highlight>
                        </div>
                    )}
                    
                  
                    {hasFieldValue('marca') && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: styles.textDark }}>
                                {isRTL ? 'العلامة التجارية' : t('descripcion.brand', 'Marque')}:
                            </span>
                            <Highlight>{getFieldValue('marca')}</Highlight>
                        </div>
                    )}

                    {hasFieldValue('material') && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: styles.textDark }}>
                                {isRTL ? 'المادة' : 'Matériau'}:
                            </span>
                            <Highlight>{getFieldValue('material')}</Highlight>
                        </div>
                    )}

                    {hasFieldValue('estilo') && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: styles.textDark }}>
                                {isRTL ? 'النمط' : 'Style'}:
                            </span>
                            <Highlight>{getFieldValue('estilo')}</Highlight>
                        </div>
                    )}

                    {hasFieldValue('temporada') && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: styles.textDark }}>
                                {isRTL ? 'الموسم' : 'Saison'}:
                            </span>
                            <Highlight>{getFieldValue('temporada')}</Highlight>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 🔹 SECCIÓN 4: COLORES Y TALLAS
    const generateColorsSizesSection = () => {
        const colors = getArrayFieldValue('color', ['colors', 'couleurs', 'colores']);
        const sizes = getArrayFieldValue('talla', ['tallas', 'sizes', 'tailles']);

        const hasColors = colors && colors.length > 0;
        const hasSizes = sizes && sizes.length > 0;

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
                                {colors.map((color, index) => (
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
                                {sizes.map((size, index) => (
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
        const price = getFieldValue('price', ['prix', 'precio']);
        const currency = getFieldValue('tipodemoneda', ['currency', 'moneda', 'devise']);
        const saleType = getFieldValue('tipoventa', ['saleType', 'typeVente', 'tipo_venta']);

        if (!price) return null;

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
                            {price} {currency || 'DZD'}
                        </Highlight>
                    </div>
                    
                    {saleType && (
                        <div style={{ 
                            fontSize: '16px', 
                            color: styles.textLight,
                            fontWeight: '600'
                        }}>
                            {isRTL ? 'نوع البيع' : t('descripcion.saleType', 'Type de vente')}: {' '}
                            <Highlight>{saleType}</Highlight>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 🔹 SECCIÓN 6: CARACTERÍSTICAS ESPECÍFICAS POR CATEGORÍA
    const generateCategorySpecificSection = () => {
        const categorySpecificFields = [];

        // Bebés
        if (hasFieldValue('edadBebes', ['edadbebes'])) {
            categorySpecificFields.push({
                label: isRTL ? 'العمر' : 'Âge Bébé',
                value: getFieldValue('edadBebes', ['edadbebes']),
                icon: '👶'
            });
        }

        // Bijoux
        if (hasFieldValue('tipoMaterialBijoux', ['tipomaterialbijoux'])) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع المعدن' : 'Type de Métal',
                value: getFieldValue('tipoMaterialBijoux', ['tipomaterialbijoux']),
                icon: '💎'
            });
        }

        if (hasFieldValue('tipoPiedra', ['tipopiedra'])) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع الحجر' : 'Type de Pierre',
                value: getFieldValue('tipoPiedra', ['tipopiedra']),
                icon: '💎'
            });
        }

        // Zapatos mujer
        if (hasFieldValue('alturaTacon', ['alturatacon'])) {
            categorySpecificFields.push({
                label: isRTL ? 'ارتفاع الكعب' : 'Hauteur du Talon',
                value: getFieldValue('alturaTacon', ['alturatacon']),
                icon: '👠'
            });
        }

        if (hasFieldValue('tipoDeCierre', ['tipodecierre'])) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع الإغلاق' : 'Type de Fermeture',
                value: getFieldValue('tipoDeCierre', ['tipodecierre']),
                icon: '👠'
            });
        }

        if (hasFieldValue('formaDePunta', ['formadepunta'])) {
            categorySpecificFields.push({
                label: isRTL ? 'شكل المقدمة' : 'Forme de la Pointe',
                value: getFieldValue('formaDePunta', ['formadepunta']),
                icon: '👠'
            });
        }

        // Zapatos hombre
        if (hasFieldValue('tipoDeSuela', ['tipodesuela'])) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع النعل' : 'Type de Semelle',
                value: getFieldValue('tipoDeSuela', ['tipodesuela']),
                icon: '👞'
            });
        }

        // Gafas
        if (hasFieldValue('anchoPuente', ['anchopuente'])) {
            categorySpecificFields.push({
                label: isRTL ? 'عرض الجسر' : 'Largeur du Pont',
                value: getFieldValue('anchoPuente', ['anchopuente']),
                icon: '👓'
            });
        }

        if (hasFieldValue('longitudPatilla', ['langitudpatilla'])) {
            categorySpecificFields.push({
                label: isRTL ? 'طول الذراع' : 'Longueur des Branches',
                value: getFieldValue('longitudPatilla', ['langitudpatilla']),
                icon: '👓'
            });
        }

        // Relojes
        if (hasFieldValue('tiporeloj')) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع الساعة' : 'Type de Montre',
                value: getFieldValue('tiporeloj'),
                icon: '⌚'
            });
        }

        if (hasFieldValue('movimientoReloj', ['movimientoreloj'])) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع الحركة' : 'Type de Mouvement',
                value: getFieldValue('movimientoReloj', ['movimientoreloj']),
                icon: '⌚'
            });
        }

        if (hasFieldValue('materialCorrea', ['materialcorrea'])) {
            categorySpecificFields.push({
                label: isRTL ? 'مادة السوار' : 'Matériau du Bracelet',
                value: getFieldValue('materialCorrea', ['materialcorrea']),
                icon: '⌚'
            });
        }

        if (hasFieldValue('resistenciaAgua', ['resistenciaagua'])) {
            categorySpecificFields.push({
                label: isRTL ? 'مقاومة الماء' : 'Résistance à l\'Eau',
                value: getFieldValue('resistenciaAgua', ['resistenciaagua']),
                icon: '⌚'
            });
        }

        // Sacs & Valises
        if (hasFieldValue('tipoSangle', ['tipodsangle'])) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع الشريط' : 'Type de Sangle',
                value: getFieldValue('tipoSangle', ['tipodsangle']),
                icon: '👜'
            });
        }

        if (hasFieldValue('correa')) {
            categorySpecificFields.push({
                label: isRTL ? 'الحزام' : 'Correa',
                value: getFieldValue('correa'),
                icon: '👜'
            });
        }

        if (hasFieldValue('tallaSaco', ['tallasaco'])) {
            categorySpecificFields.push({
                label: isRTL ? 'مقاس الحقيبة' : 'Taille du Sac',
                value: getFieldValue('tallaSaco', ['tallasaco']),
                icon: '👜'
            });
        }

        // Profesionales
        if (hasFieldValue('tipoDeLabata', ['tipodelabata'])) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع اللباس' : 'Type de Tenue',
                value: getFieldValue('tipoDeLabata', ['tipodelabata']),
                icon: '💼'
            });
        }

        if (hasFieldValue('sectorDeTrabajo', ['sectordetrabajo'])) {
            categorySpecificFields.push({
                label: isRTL ? 'قطاع العمل' : 'Secteur de Travail',
                value: getFieldValue('sectorDeTrabajo', ['sectordetrabajo']),
                icon: '💼'
            });
        }

        // Color y ocasión adicional
        if (hasFieldValue('tipocolor')) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع اللون' : 'Type de Couleur',
                value: getFieldValue('tipocolor'),
                icon: '🎨'
            });
        }

        if (hasFieldValue('ocasion')) {
            categorySpecificFields.push({
                label: isRTL ? 'المناسبة' : 'Occasion',
                value: getFieldValue('ocasion'),
                icon: '🎉'
            });
        }

        if (categorySpecificFields.length === 0) return null;

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
                    🔧 {isRTL ? 'مواصفات إضافية' : 'Spécifications Additionnelles'}
                </h2>
                
                <div style={{ display: 'grid', gap: '12px' }}>
                    {categorySpecificFields.map((field, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: styles.textDark, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {field.icon} {field.label}:
                            </span>
                            <Highlight type="special">{field.value}</Highlight>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // 🔹 SECCIÓN 7: INFORMACIÓN DE CATEGORÍA
    const generateCategoryInfoSection = () => {
        const categoryInfo = getCategoryInfo();
        
        return (
            <div style={{
                backgroundColor: '#f0f9ff',
                padding: '18px',
                borderRadius: '10px',
                marginBottom: '18px',
                border: '1px solid #bae6fd'
            }}>
                <h2 style={{
                    margin: '0 0 15px 0',
                    fontSize: '18px',
                    color: '#0369a1',
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
                        color: '#0369a1',
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

    // 🔹 SECCIÓN 8: CONTACTO
    const generateContactSection = () => {
        const ownerName = getFieldValue('username') || post.user?.username || 'Propriétaire';
        const phoneNumber = getFieldValue('telefono', ['phone', 'mobile']) || post.user?.mobile || 'Non disponible';

        return (
            <div style={{
                background: styles.contactGradient,
                color: 'white',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center',
                width: '100%',
                boxSizing: 'border-box',
            }}>
                <h2 style={{
                    margin: '0 0 16px 0',
                    fontSize: '20px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                }}>
                    👑 {isRTL ? 'معلومات المتجر' : 'Informations du Vendeur'}
                </h2>

                <div style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    padding: '16px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '14px',
                        opacity: '0.9',
                        marginBottom: '8px',
                        fontWeight: '700'
                    }}>
                        {isRTL ? 'صاحب المتجر 👤' : '👤 Propriétaire de la Boutique'}
                    </div>
                    
                    <div style={{
                        fontSize: '18px',
                        fontWeight: '900',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        display: 'inline-block',
                        border: '2px solid rgba(255,255,255,0.3)',
                        marginBottom: '12px',
                        minWidth: '200px'
                    }}>
                        {ownerName}
                    </div>

                    <div style={{
                        fontSize: '14px',
                        opacity: '0.9',
                        marginBottom: '8px',
                        fontWeight: '700',
                        marginTop: '12px'
                    }}>
                        {isRTL ? 'رقم الهاتف 📞' : '📞 Téléphone de Contact'}
                    </div>
                    
                    <div style={{
                        fontSize: '16px',
                        fontWeight: '800',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        display: 'inline-block',
                        border: '1px solid rgba(255,255,255,0.2)',
                        direction: 'ltr',
                        fontFamily: 'monospace'
                    }}>
                        {phoneNumber}
                    </div>
                </div>

                {/* Botones de acción */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px',
                    marginBottom: '20px'
                }}>
                    <div 
                        style={{
                            backgroundColor: '#10b981',
                            color: 'white',
                            padding: '14px 8px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '800',
                            fontSize: '13px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                            border: '2px solid rgba(255,255,255,0.2)'
                        }}
                        onClick={handleCallOwner}
                    >
                        <div style={{ fontSize: '24px' }}>📞</div>
                        <div>{isRTL ? 'اتصال' : 'Appeler'}</div>
                    </div>

                    <div 
                        style={{
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            padding: '14px 8px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '800',
                            fontSize: '13px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                            border: '2px solid rgba(255,255,255,0.2)'
                        }}
                        onClick={handleChatWithOwner}
                    >
                        <div style={{ fontSize: '24px' }}>💬</div>
                        <div>{isRTL ? 'دردشة' : 'Chat'}</div>
                    </div>

                    <div 
                        style={{
                            backgroundColor: '#8b5cf6',
                            color: 'white',
                            padding: '14px 8px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '800',
                            fontSize: '13px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
                            border: '2px solid rgba(255,255,255,0.2)'
                        }}
                        onClick={handleVideoCall}
                    >
                        <div style={{ fontSize: '24px' }}>📹</div>
                        <div>{isRTL ? 'فيديو' : 'Vidéo'}</div>
                    </div>
                </div>

                <p style={{ 
                    fontSize: '15px',
                    opacity: '0.9', 
                    margin: '20px 0 0 0',
                    fontWeight: '700',
                    fontStyle: 'italic'
                }}>
                    {isRTL 
                        ? '🛍️ تسوق بثقة واتصل بالبائع مباشرة!'
                        : '🛍️ Achetez en confiance - Contactez le vendeur directement !'
                    }
                </p>
            </div>
        );
    };

    // 🎯 DEBUG: Mostrar estructura completa del post
    console.log('🔍 DescriptionPost - Datos recibidos:', post);

    // 🎯 RENDER PRINCIPAL MEJORADO
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
            {generateCategoryInfoSection()}
            {generateContactSection()}
        </div>
    );
};

export default DescriptionPost;