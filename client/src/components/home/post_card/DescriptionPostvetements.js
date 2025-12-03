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

    // ✅ FUNCIÓN MEJORADA: Obtener valores de post base O post.vetement
    const getFieldValue = (fieldName, altNames = []) => {
        // 1. Buscar en post base (modelo principal)
        if (post && post[fieldName] !== undefined && post[fieldName] !== null && post[fieldName] !== '') {
            return post[fieldName];
        }
        
        // 2. Buscar en post.vetement (modelo específico)
        if (post && post.vetement && post.vetement[fieldName] !== undefined && post.vetement[fieldName] !== null && post.vetement[fieldName] !== '') {
            return post.vetement[fieldName];
        }
        
        // 3. Buscar en nombres alternativos en post base
        for (const altName of altNames) {
            if (post && post[altName] !== undefined && post[altName] !== null && post[altName] !== '') {
                return post[altName];
            }
        }
        
        // 4. Buscar en nombres alternativos en post.vetement
        for (const altName of altNames) {
            if (post && post.vetement && post.vetement[altName] !== undefined && post.vetement[altName] !== null && post.vetement[altName] !== '') {
                return post.vetement[altName];
            }
        }
        
        return null;
    };

    // ✅ FUNCIÓN MEJORADA: Obtener array de post base O post.vetement
    const getArrayFieldValue = (fieldName, altNames = []) => {
        // 1. Buscar en post base
        if (post && post[fieldName] && Array.isArray(post[fieldName]) && post[fieldName].length > 0) {
            return post[fieldName];
        }
        
        // 2. Buscar en post.vetement
        if (post && post.vetement && post.vetement[fieldName] && Array.isArray(post.vetement[fieldName]) && post.vetement[fieldName].length > 0) {
            return post.vetement[fieldName];
        }
        
        // 3. Buscar en nombres alternativos
        for (const altName of altNames) {
            if (post && post[altName] && Array.isArray(post[altName]) && post[altName].length > 0) {
                return post[altName];
            }
            if (post && post.vetement && post.vetement[altName] && Array.isArray(post.vetement[altName]) && post.vetement[altName].length > 0) {
                return post.vetement[altName];
            }
        }
        
        return [];
    };

    // ✅ FUNCIÓN NUEVA: Verificar si un campo tiene valor
    const hasFieldValue = (fieldName, altNames = []) => {
        const value = getFieldValue(fieldName, altNames);
        return value !== null && value !== undefined && value !== '';
    };

    // ✅ FUNCIÓN ESPECIAL: Obtener tipoArticulo con compatibilidad hacia atrás
    const getTipoArticulo = () => {
        // 1. Primero buscar el campo nuevo
        const tipoArticulo = getFieldValue('tipoArticulo');
        if (tipoArticulo) return tipoArticulo;
        
        // 2. Si no existe, buscar en campos viejos (para compatibilidad)
        const oldFields = [
            'ropahombre', 'ropamujer', 'zapatoshombre', 'zapatosmujer',
            'reloj', 'gafas', 'bijoux', 'garcons', 'filles', 'bebes',
            'ropaprofesional', 'sacvalise'
        ];
        
        for (const oldField of oldFields) {
            const value = getFieldValue(oldField);
            if (value) {
                console.log(`🔄 Usando campo viejo ${oldField} -> tipoArticulo`);
                return value;
            }
        }
        
        return null;
    };

    // 🎯 FUNCIONES DE CONTACTO MEJORADAS (igual que antes)
    const handleCallOwner = () => {
        const phoneNumber = post?.telefono || post?.user?.mobile;
        if (!phoneNumber) {
            alert(isRTL ? 'رقم الهاتف غير متاح' : 'Numéro de téléphone non disponible');
            return;
        }
        
        window.location.href = `tel:${phoneNumber}`;
    };

    const handleChatWithOwner = () => {
        const userId = post?.user?._id;
        if (!userId) {
            alert(isRTL ? 'لا يمكن بدء محادثة مع هذا البائع' : 'Impossible de démarrer une conversation avec ce vendeur');
            return;
        }
        
        const chatUrl = `/chat/${userId}`;
        window.open(chatUrl, '_blank');
        
        setTimeout(() => {
            const userName = post?.user?.username || 'Vendeur';
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
                    const userId = post?.user?._id || 'store';
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

    // 🏷️ Información de categoría (usa post base)
    const getCategoryInfo = () => {
        const categories = {
            "ropahombre": {
                icon: "👔",
                title: t('categories.mensClothing', 'Ropa Hombre'),
                color: "#1e40af",
                description: t('categories.mensDescription', 'Estilo y elegancia para hombre')
            },
            "ropamujer": {
                icon: "👗",
                title: t('categories.womensClothing', 'Ropa Mujer'),
                color: "#be185d",
                description: t('categories.womensDescription', 'Moda y tendencias para mujer')
            },
            "zapatoshombre": {
                icon: "👞",
                title: t('categories.mensShoes', 'Calzado Hombre'),
                color: "#78350f",
                description: t('categories.mensShoesDescription', 'Calzado de calidad para hombre')
            },
            "zapatosmujer": {
                icon: "👠",
                title: t('categories.womensShoes', 'Calzado Mujer'),
                color: "#7c3aed",
                description: t('categories.womensShoesDescription', 'Calzado elegante para mujer')
            },
            "reloj": {
                icon: "⌚",
                title: t('categories.watches', 'Relojes'),
                color: "#0f766e",
                description: t('categories.watchesDescription', 'Relojes de prestigio y estilo')
            },
            "gafas": {
                icon: "👓",
                title: t('categories.glasses', 'Gafas'),
                color: "#4338ca",
                description: t('categories.glassesDescription', 'Gafas de vista y solares')
            },
            "bijoux": {
                icon: "💎",
                title: t('categories.jewelry', 'Joyería'),
                color: "#f59e0b",
                description: t('categories.jewelryDescription', 'Joyería y accesorios preciosos')
            },
            "sacvalise": {
                icon: "👜",
                title: t('categories.bags', 'Bolsos y Maletas'),
                color: "#dc2626",
                description: t('categories.bagsDescription', 'Bolsos y equipaje de calidad')
            },
            "garcons": {
                icon: "👦",
                title: t('categories.boys', 'Niños'),
                color: "#2563eb",
                description: t('categories.boysDescription', 'Ropa para niños')
            },
            "filles": {
                icon: "👧",
                title: t('categories.girls', 'Niñas'),
                color: "#db2777",
                description: t('categories.girlsDescription', 'Ropa para niñas')
            },
            "bebes": {
                icon: "👶",
                title: t('categories.baby', 'Bebé'),
                color: "#f97316",
                description: t('categories.babyDescription', 'Ropa y accesorios para bebé')
            },
            "TennueProfesionelle": {
                icon: "💼",
                title: t('categories.professional', 'Ropa Profesional'),
                color: "#475569",
                description: t('categories.professionalDescription', 'Ropa de trabajo y profesional')
            }
        };

        const subCategory = post?.subCategory;
        return categories[subCategory] || {
            icon: "🛍️",
            title: subCategory || t('categories.general', 'Producto Moda'),
            color: "#7c3aed",
            description: t('categories.generalDescription', 'Artículo de moda de calidad')
        };
    };

    // ✨ HIGHLIGHT MEJORADO (igual que antes)
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

    // 🔹 SECCIÓN 1: ANUNCIO PRINCIPAL (igual que antes)
    const generateMainAnnouncement = () => {
        const title = post?.title;
        
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
                    {title || t('descripcion.noTitle', 'Sin título')}
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

    // 🔹 SECCIÓN 2: DESCRIPCIÓN (igual que antes)
    const generateDescriptionSection = () => {
        const description = post?.description;
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
                    📝 {isRTL ? 'الوصف' : t('descripcion.description', 'Descripción')}
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
                            (isRTL ? 'عرض أقل' : t('descripcion.showLess', 'Ver menos')) : 
                            (isRTL ? 'عرض المزيد' : t('descripcion.showMore', 'Ver más'))
                        }
                    </button>
                )}
            </div>
        );
    };

    // 🔹 SECCIÓN 3: INFORMACIÓN BÁSICA
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
                    ℹ️ {isRTL ? 'المعلومات الأساسية' : t('descripcion.basicInfo', 'Información Básica')}
                </h2>
                
                <div style={{ display: 'grid', gap: '12px' }}>
                    {hasFieldValue('etat', ['estado', 'condition']) && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: styles.textDark }}>
                                {isRTL ? 'الحالة' : t('descripcion.condition', 'Estado')}:
                            </span>
                            <Highlight type="feature">{getFieldValue('etat', ['estado', 'condition'])}</Highlight>
                        </div>
                    )}
                    
                    {hasFieldValue('marca') && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: styles.textDark }}>
                                {isRTL ? 'العلامة التجارية' : t('descripcion.brand', 'Marca')}:
                            </span>
                            <Highlight>{getFieldValue('marca')}</Highlight>
                        </div>
                    )}

                    {hasFieldValue('material') && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: styles.textDark }}>
                                {isRTL ? 'المادة' : 'Material'}:
                            </span>
                            <Highlight>{getFieldValue('material')}</Highlight>
                        </div>
                    )}

                    {hasFieldValue('estilo') && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: styles.textDark }}>
                                {isRTL ? 'النمط' : 'Estilo'}:
                            </span>
                            <Highlight>{getFieldValue('estilo')}</Highlight>
                        </div>
                    )}

                    {hasFieldValue('temporada') && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: styles.textDark }}>
                                {isRTL ? 'الموسم' : 'Temporada'}:
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
                    🎨 {isRTL ? 'الألوان والمقاسات' : t('descripcion.colorsSizes', 'Colores & Tallas')}
                </h2>
                
                <div style={{ display: 'grid', gap: '12px' }}>
                    {hasColors && (
                        <div>
                            <span style={{ fontWeight: '600', color: styles.textDark, display: 'block', marginBottom: '8px' }}>
                                {isRTL ? 'الألوان المتاحة' : t('descripcion.availableColors', 'Colores disponibles')}:
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
                                {isRTL ? 'المقاسات المتاحة' : t('descripcion.availableSizes', 'Tallas disponibles')}:
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

    // 🔹 SECCIÓN 5: PRECIO (igual que antes)
    const generatePricingSection = () => {
        const price = post?.price;
        const currency = post?.tipodemoneda;
        const saleType = post?.tipoventa;

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
                    💰 {isRTL ? 'السعر' : t('descripcion.price', 'Precio')}
                </h2>
                
                <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                        fontSize: '28px', 
                        fontWeight: '900', 
                        color: styles.successColor,
                        marginBottom: '8px'
                    }}>
                        <Highlight type="price">
                            {price} {currency || 'MAD'}
                        </Highlight>
                    </div>
                    
                    {saleType && (
                        <div style={{ 
                            fontSize: '16px', 
                            color: styles.textLight,
                            fontWeight: '600'
                        }}>
                            {isRTL ? 'نوع البيع' : t('descripcion.saleType', 'Tipo de venta')}: {' '}
                            <Highlight>{saleType}</Highlight>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 🔹 SECCIÓN 6: TIPO DE ARTÍCULO (NUEVA - USANDO tipoArticulo)
    const generateTipoArticuloSection = () => {
        const tipoArticulo = getTipoArticulo();
        if (!tipoArticulo) return null;

        // Mapeo de nombres amigables
        const tipoArticuloNames = {
            // Ropa Hombre
            "chemises": "Camisas Formales",
            "chemises_casual": "Camisas Casual",
            "t_shirts": "Camisetas",
            "polo": "Polos",
            "jeans": "Jeans",
            "pantalons_costume": "Pantalones Formales",
            "pantalons_chinos": "Chinos",
            "vestes_cuir": "Chaquetas de Cuero",
            // Ropa Mujer
            "vestidos": "Vestidos",
            "blusas": "Blusas",
            "faldas": "Faldas",
            // Bebés
            "bodys": "Bodies",
            "pyjamas": "Pijamas",
            "robes": "Vestidos Bebé",
            // Zapatos
            "formales": "Zapatos Formales",
            "deportivos": "Zapatos Deportivos",
            "tacones": "Tacones",
            "planos": "Zapatos Planos",
            // Relojes
            "analogico": "Reloj Analógico",
            "digital": "Reloj Digital",
            "deportivo": "Reloj Deportivo",
            // Gafas
            "sol": "Gafas de Sol",
            "graduadas": "Gafas Graduadas",
            // Bijoux
            "collares": "Collares",
            "anillos": "Anillos",
            "pulseras": "Pulseras"
        };

        const displayName = tipoArticuloNames[tipoArticulo] || tipoArticulo.replace(/_/g, ' ');

        return (
            <div style={{
                backgroundColor: '#fef7ff',
                padding: '18px',
                borderRadius: '10px',
                marginBottom: '18px',
                border: '1px solid #f3e8ff'
            }}>
                <h2 style={{
                    margin: '0 0 15px 0',
                    fontSize: '18px',
                    color: '#7c3aed',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    🎯 {isRTL ? 'نوع المنتج' : 'Tipo de Artículo'}
                </h2>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', color: styles.textDark }}>
                        {isRTL ? 'التصنيف الدقيق' : 'Categoría específica'}:
                    </span>
                    <Highlight type="special">{displayName}</Highlight>
                </div>
            </div>
        );
    };

    // 🔹 SECCIÓN 7: CARACTERÍSTICAS ESPECÍFICAS POR CATEGORÍA
    const generateCategorySpecificSection = () => {
        const categorySpecificFields = [];

        // Bebés
        if (hasFieldValue('edadBebes', ['edadbebes'])) {
            categorySpecificFields.push({
                label: isRTL ? 'العمر' : 'Edad Bebé',
                value: getFieldValue('edadBebes', ['edadbebes']),
                icon: '👶'
            });
        }

        // Bijoux
        if (hasFieldValue('tipoMaterialBijoux', ['tipomaterialbijoux'])) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع المعدن' : 'Tipo de Metal',
                value: getFieldValue('tipoMaterialBijoux', ['tipomaterialbijoux']),
                icon: '💎'
            });
        }

        if (hasFieldValue('tipoPiedra', ['tipopiedra'])) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع الحجر' : 'Tipo de Piedra',
                value: getFieldValue('tipoPiedra', ['tipopiedra']),
                icon: '💎'
            });
        }

        // Zapatos mujer
        if (hasFieldValue('alturaTacon', ['alturatacon'])) {
            categorySpecificFields.push({
                label: isRTL ? 'ارتفاع الكعب' : 'Altura del Tacón',
                value: getFieldValue('alturaTacon', ['alturatacon']),
                icon: '👠'
            });
        }

        if (hasFieldValue('tipoDeCierre', ['tipodecierre'])) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع الإغلاق' : 'Tipo de Cierre',
                value: getFieldValue('tipoDeCierre', ['tipodecierre']),
                icon: '👠'
            });
        }

        if (hasFieldValue('formaDePunta', ['formadepunta'])) {
            categorySpecificFields.push({
                label: isRTL ? 'شكل المقدمة' : 'Forma de la Punta',
                value: getFieldValue('formaDePunta', ['formadepunta']),
                icon: '👠'
            });
        }

        // Zapatos hombre
        if (hasFieldValue('tipoDeSuela', ['tipodesuela'])) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع النعل' : 'Tipo de Suela',
                value: getFieldValue('tipoDeSuela', ['tipodesuela']),
                icon: '👞'
            });
        }

        // Gafas
        if (hasFieldValue('anchoPuente', ['anchopuente'])) {
            categorySpecificFields.push({
                label: isRTL ? 'عرض الجسر' : 'Ancho del Puente',
                value: getFieldValue('anchoPuente', ['anchopuente']),
                icon: '👓'
            });
        }

        if (hasFieldValue('longitudPatilla', ['langitudpatilla'])) {
            categorySpecificFields.push({
                label: isRTL ? 'طول الذراع' : 'Longitud de la Patilla',
                value: getFieldValue('longitudPatilla', ['langitudpatilla']),
                icon: '👓'
            });
        }

        // Relojes
        if (hasFieldValue('tiporeloj')) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع الساعة' : 'Tipo de Reloj',
                value: getFieldValue('tiporeloj'),
                icon: '⌚'
            });
        }

        if (hasFieldValue('movimientoReloj', ['movimientoreloj'])) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع الحركة' : 'Tipo de Movimiento',
                value: getFieldValue('movimientoReloj', ['movimientoreloj']),
                icon: '⌚'
            });
        }

        if (hasFieldValue('materialCorrea', ['materialcorrea'])) {
            categorySpecificFields.push({
                label: isRTL ? 'مادة السوار' : 'Material de la Correa',
                value: getFieldValue('materialCorrea', ['materialcorrea']),
                icon: '⌚'
            });
        }

        if (hasFieldValue('resistenciaAgua', ['resistenciaagua'])) {
            categorySpecificFields.push({
                label: isRTL ? 'مقاومة الماء' : 'Resistencia al Agua',
                value: getFieldValue('resistenciaAgua', ['resistenciaagua']),
                icon: '⌚'
            });
        }

        // Sacs & Valises
        if (hasFieldValue('tipoSangle', ['tipodsangle'])) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع الشريط' : 'Tipo de Sangle',
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
                label: isRTL ? 'مقاس الحقيبة' : 'Talla del Saco',
                value: getFieldValue('tallaSaco', ['tallasaco']),
                icon: '👜'
            });
        }

        // Profesionales
        if (hasFieldValue('tipoDeLabata', ['tipodelabata'])) {
            categorySpecificFields.push({
                label: isRTL ? 'نوع اللباس' : 'Tipo de Bata',
                value: getFieldValue('tipoDeLabata', ['tipodelabata']),
                icon: '💼'
            });
        }

        if (hasFieldValue('sectorDeTrabajo', ['sectordetrabajo'])) {
            categorySpecificFields.push({
                label: isRTL ? 'قطاع العمل' : 'Sector de Trabajo',
                value: getFieldValue('sectorDeTrabajo', ['sectordetrabajo']),
                icon: '💼'
            });
        }

        // Ocasión
        if (hasFieldValue('ocasion')) {
            categorySpecificFields.push({
                label: isRTL ? 'المناسبة' : 'Ocasión',
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
                    🔧 {isRTL ? 'مواصفات إضافية' : 'Especificaciones Adicionales'}
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

    // 🔹 SECCIÓN 8: INFORMACIÓN DE CATEGORÍA (igual que antes)
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
                    {categoryInfo.icon} {isRTL ? 'معلومات الفئة' : t('descripcion.categoryInfo', 'Información de Categoría')}
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

    // 🔹 SECCIÓN 9: CONTACTO (igual que antes)
    const generateContactSection = () => {
        const ownerName = post?.user?.username || 'Propietario';
        const phoneNumber = post?.telefono || post?.user?.mobile || 'No disponible';

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
                    👑 {isRTL ? 'معلومات المتجر' : 'Información del Vendedor'}
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
                        {isRTL ? 'صاحب المتجر 👤' : '👤 Propietario de la Tienda'}
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
                        {isRTL ? 'رقم الهاتف 📞' : '📞 Teléfono de Contacto'}
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
                        <div>{isRTL ? 'اتصال' : 'Llamar'}</div>
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
                        <div>{isRTL ? 'فيديو' : 'Video'}</div>
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
                        : '🛍️ Compra con confianza - Contacta al vendedor directamente!'
                    }
                </p>
            </div>
        );
    };

    // 🎯 RENDER PRINCIPAL ACTUALIZADO
    return (
<div>
{post.wilaya} / {post.commune}

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
            {generateTipoArticuloSection()} {/* ¡NUEVA SECCIÓN! */}
            {generateCategorySpecificSection()}
            {generateCategoryInfoSection()}
            {generateContactSection()}
        </div></div>
    );
};

export default DescriptionPost;