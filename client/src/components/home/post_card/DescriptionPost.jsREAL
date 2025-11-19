import React from 'react';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaComments, FaHotel, FaPlane, FaBus, FaHome, FaMapMarkerAlt, FaConciergeBell, FaMoneyBillWave, FaCalendarAlt, FaUsers, FaStar, FaChild, FaBaby, FaBed, FaRuler, FaShower, FaUserFriends, FaCrown, FaTag } from 'react-icons/fa';

const DescriptionPost = ({ post, readMore, setReadMore }) => {
    const { t, i18n } = useTranslation(["descripcion","categpries","createpost"]);
    const isRTL = i18n.language === 'ar' || i18n.language === 'ara';

    // Colores elegantes
    const primaryColor = "#1e88e5";
    const secondaryColor = "#1565c0";
    const accentColor = "#4fc3f7";
    const successColor = "#43a047";
    const warningColor = "#ff9800";

    // Determinar la categoría del post con traducción
    const getCategoryInfo = () => {
        const travelType = t(`travelTypes.${post.subCategory}`, { ns: "descripcion" });
        
        switch (post.subCategory) {
            case "hadj_Omra":
                return {
                    icon: "🕋",
                    type: travelType,
                    color: "#8B4513",
                    gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)"
                };
            case "Voyage Organise":
                return {
                    icon: "✈️",
                    type: travelType,
                    color: "#3498db",
                    gradient: "linear-gradient(135deg, #3498db 0%, #1abc9c 100%)"
                };
            case "Location_Vacances":
                return {
                    icon: "🏠",
                    type: travelType,
                    color: "#e74c3c",
                    gradient: "linear-gradient(135deg, #e74c3c 0%, #e67e22 100%)"
                };
            default:
                return {
                    icon: "🌟",
                    type: t('labels.exceptionalOffer', { ns: "descripcion" }),
                    color: "#9b59b6",
                    gradient: "linear-gradient(135deg, #9b59b6 0%, #3498db 100%)"
                };
        }
    };

    const categoryInfo = getCategoryInfo();

    // NUEVO: Mapeo de campos booleanos con iconos y colores
    const getBooleanFieldInfo = (fieldName, value) => {
        const fieldMap = {
            descuentoGrupo: { 
                icon: "👥", 
                label: t('descuentoGrupo', 'Descuento para grupos'),
                color: successColor,
                bgColor: '#e8f5e8'
            },
            ofertaEspecial: { 
                icon: "🎁", 
                label: t('ofertaEspecial', 'Oferta especial'),
                color: warningColor,
                bgColor: '#fff3e0'
            },
            descuentoTemporadaBaja: { 
                icon: "📉", 
                label: t('descuentoTemporadaBaja', 'Descuento temporada baja'),
                color: "#9c27b0",
                bgColor: '#f3e5f5'
            },
            descuentoAnticipacion: { 
                icon: "⏰", 
                label: t('descuentoAnticipacion', 'Descuento por anticipación'),
                color: "#ff5722",
                bgColor: '#fbe9e7'
            }
        };

        return fieldMap[fieldName] || { icon: "✅", label: fieldName, color: primaryColor, bgColor: '#e3f2fd' };
    };

    // NUEVO: Función para renderizar campos booleanos elegantes
    const renderBooleanFields = () => {
        const booleanFields = [
            'descuentoGrupo',
            'ofertaEspecial', 
            'descuentoTemporadaBaja',
            'descuentoAnticipacion'
        ];

        const activeFields = booleanFields.filter(field => post[field] === true);

        if (activeFields.length === 0) return null;

        return (
            <div className="p-4" style={{ 
                backgroundColor: '#f8f5ff',
                borderTop: '1px solid #e8e2ff'
            }}>
                <div className="d-flex align-items-center mb-4">
                    <FaTag size={24} style={{
                        color: '#7e57c2',
                        marginRight: isRTL ? '0' : '12px',
                        marginLeft: isRTL ? '12px' : '0'
                    }} />
                    <h5 className="mb-0 fw-bold" style={{ color: '#7e57c2', fontSize: '1.4rem' }}>
                        {t('labels.specialBenefits')}
                    </h5>
                </div>

                <Row className="g-4">
                    {activeFields.map(field => {
                        const fieldInfo = getBooleanFieldInfo(field, post[field]);
                        return (
                            <Col key={field} xs={12} md={6} lg={3}>
                                <div className="text-center p-4 rounded-3 h-100" style={{
                                    backgroundColor: fieldInfo.bgColor,
                                    border: `2px solid ${fieldInfo.color}30`,
                                    transition: 'all 0.3s ease'
                                }}>
                                    <div style={{ 
                                        fontSize: '2.5rem',
                                        marginBottom: '12px'
                                    }}>
                                        {fieldInfo.icon}
                                    </div>
                                    <div className="fw-bold" style={{
                                        color: fieldInfo.color,
                                        fontSize: '1.1rem',
                                        lineHeight: '1.4'
                                    }}>
                                        {fieldInfo.label}
                                    </div>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        );
    };

    // NUEVO: Función para renderizar características del alojamiento
    const renderAccommodationFeatures = () => {
        const hasFeatures = post.tipoPropiedad || post.categoria || post.capacidad || post.habitaciones || post.superficie || post.banos;
        if (!hasFeatures) return null;

        return (
            <div className="p-4" style={{ 
                backgroundColor: '#e8f5e8',
                borderTop: '1px solid #c8e6c9'
            }}>
                <div className="d-flex align-items-center mb-4">
                    <FaHome size={24} style={{
                        color: successColor,
                        marginRight: isRTL ? '0' : '12px',
                        marginLeft: isRTL ? '12px' : '0'
                    }} />
                    <h5 className="mb-0 fw-bold" style={{ color: successColor, fontSize: '1.4rem' }}>
                        {t('labels.accommodationFeatures', 'Características del Alojamiento')}
                    </h5>
                </div>

                <Row className="g-4">
                    {post.tipoPropiedad && (
                        <Col xs={12} md={6} lg={4}>
                            <div className="d-flex align-items-center p-3 rounded-3" style={{
                                backgroundColor: 'white',
                                border: `2px solid ${primaryColor}20`
                            }}>
                                <div style={{ 
                                    fontSize: '2rem',
                                    marginRight: isRTL ? '0' : '15px',
                                    marginLeft: isRTL ? '15px' : '0'
                                }}>
                                    🏠
                                </div>
                                <div>
                                    <div className="fw-bold text-dark" style={{ fontSize: '1.1rem' }}>
                                        {t(`labels.propertyType`, 'Tipo de Propiedad')}
                                    </div>
                                    <div style={{ color: primaryColor, fontSize: '1rem', fontWeight: '600' }}>
                                        {post.tipoPropiedad}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )}

                    {post.categoria && (
                        <Col xs={12} md={6} lg={4}>
                            <div className="d-flex align-items-center p-3 rounded-3" style={{
                                backgroundColor: 'white',
                                border: `2px solid ${warningColor}20`
                            }}>
                                <FaCrown size={20} style={{ 
                                    color: warningColor,
                                    marginRight: isRTL ? '0' : '15px',
                                    marginLeft: isRTL ? '15px' : '0'
                                }} />
                                <div>
                                    <div className="fw-bold text-dark" style={{ fontSize: '1.1rem' }}>
                                        {t(`labels.category`, 'Categoría')}
                                    </div>
                                    <div style={{ color: warningColor, fontSize: '1rem', fontWeight: '600' }}>
                                        {post.categoria}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )}

                    {post.capacidad && (
                        <Col xs={12} md={6} lg={4}>
                            <div className="d-flex align-items-center p-3 rounded-3" style={{
                                backgroundColor: 'white',
                                border: `2px solid ${secondaryColor}20`
                            }}>
                                <FaUserFriends size={20} style={{ 
                                    color: secondaryColor,
                                    marginRight: isRTL ? '0' : '15px',
                                    marginLeft: isRTL ? '15px' : '0'
                                }} />
                                <div>
                                    <div className="fw-bold text-dark" style={{ fontSize: '1.1rem' }}>
                                        {t(`labels.capacity`, 'Capacidad')}
                                    </div>
                                    <div style={{ color: secondaryColor, fontSize: '1rem', fontWeight: '600' }}>
                                        {post.capacidad}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )}

                    {post.habitaciones && (
                        <Col xs={12} md={6} lg={4}>
                            <div className="d-flex align-items-center p-3 rounded-3" style={{
                                backgroundColor: 'white',
                                border: `2px solid ${accentColor}20`
                            }}>
                                <FaBed size={20} style={{ 
                                    color: accentColor,
                                    marginRight: isRTL ? '0' : '15px',
                                    marginLeft: isRTL ? '15px' : '0'
                                }} />
                                <div>
                                    <div className="fw-bold text-dark" style={{ fontSize: '1.1rem' }}>
                                        {t(`labels.rooms`, 'Habitaciones')}
                                    </div>
                                    <div style={{ color: accentColor, fontSize: '1rem', fontWeight: '600' }}>
                                        {post.habitaciones}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )}

                    {post.superficie && (
                        <Col xs={12} md={6} lg={4}>
                            <div className="d-flex align-items-center p-3 rounded-3" style={{
                                backgroundColor: 'white',
                                border: `2px solid ${successColor}20`
                            }}>
                                <FaRuler size={20} style={{ 
                                    color: successColor,
                                    marginRight: isRTL ? '0' : '15px',
                                    marginLeft: isRTL ? '15px' : '0'
                                }} />
                                <div>
                                    <div className="fw-bold text-dark" style={{ fontSize: '1.1rem' }}>
                                        {t(`labels.surface`, 'Superficie')}
                                    </div>
                                    <div style={{ color: successColor, fontSize: '1rem', fontWeight: '600' }}>
                                        {post.superficie}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )}

                    {post.banos && (
                        <Col xs={12} md={6} lg={4}>
                            <div className="d-flex align-items-center p-3 rounded-3" style={{
                                backgroundColor: 'white',
                                border: `2px solid ${warningColor}20`
                            }}>
                                <FaShower size={20} style={{ 
                                    color: warningColor,
                                    marginRight: isRTL ? '0' : '15px',
                                    marginLeft: isRTL ? '15px' : '0'
                                }} />
                                <div>
                                    <div className="fw-bold text-dark" style={{ fontSize: '1.1rem' }}>
                                        {t(`labels.bathrooms`, 'Baños')}
                                    </div>
                                    <div style={{ color: warningColor, fontSize: '1rem', fontWeight: '600' }}>
                                        {post.banos}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )}
                </Row>
            </div>
        );
    };

    // NUEVO: Función para renderizar detalles de transporte
    const renderTransportDetails = () => {
        const hasTransport = post.typeTransport || post.compagnieAerienne || post.classeVol || post.transportTerrestre;
        if (!hasTransport) return null;

        return (
            <div className="p-4" style={{ 
                backgroundColor: '#e3f2fd',
                borderTop: '1px solid #bbdefb'
            }}>
                <div className="d-flex align-items-center mb-4">
                    <FaPlane size={24} style={{
                        color: primaryColor,
                        marginRight: isRTL ? '0' : '12px',
                        marginLeft: isRTL ? '12px' : '0'
                    }} />
                    <h5 className="mb-0 fw-bold" style={{ color: primaryColor, fontSize: '1.4rem' }}>
                        {t('labels.transportDetails')}
                    </h5>
                </div>

                <Row className="g-4">
                    {post.typeTransport && (
                        <Col xs={12} md={6}>
                            <div className="d-flex align-items-center p-3 rounded-3" style={{
                                backgroundColor: 'white',
                                border: `2px solid ${primaryColor}20`
                            }}>
                                <div style={{ 
                                    fontSize: '2rem',
                                    marginRight: isRTL ? '0' : '15px',
                                    marginLeft: isRTL ? '15px' : '0'
                                }}>
                                    ✈️
                                </div>
                                <div>
                                    <div className="fw-bold text-dark" style={{ fontSize: '1.1rem' }}>
                                        {t(`labels.transportType`, 'Tipo de Transporte')}
                                    </div>
                                    <div style={{ color: primaryColor, fontSize: '1rem', fontWeight: '600' }}>
                                        {post.typeTransport}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )}

                    {post.compagnieAerienne && (
                        <Col xs={12} md={6}>
                            <div className="d-flex align-items-center p-3 rounded-3" style={{
                                backgroundColor: 'white',
                                border: `2px solid ${secondaryColor}20`
                            }}>
                                <div style={{ 
                                    fontSize: '2rem',
                                    marginRight: isRTL ? '0' : '15px',
                                    marginLeft: isRTL ? '15px' : '0'
                                }}>
                                    🏢
                                </div>
                                <div>
                                    <div className="fw-bold text-dark" style={{ fontSize: '1.1rem' }}>
                                        {t(`labels.airline`, 'Compañía Aérea')}
                                    </div>
                                    <div style={{ color: secondaryColor, fontSize: '1rem', fontWeight: '600' }}>
                                        {post.compagnieAerienne}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )}

                    {post.classeVol && (
                        <Col xs={12} md={6}>
                            <div className="d-flex align-items-center p-3 rounded-3" style={{
                                backgroundColor: 'white',
                                border: `2px solid ${warningColor}20`
                            }}>
                                <FaStar size={20} style={{ 
                                    color: warningColor,
                                    marginRight: isRTL ? '0' : '15px',
                                    marginLeft: isRTL ? '15px' : '0'
                                }} />
                                <div>
                                    <div className="fw-bold text-dark" style={{ fontSize: '1.1rem' }}>
                                        {t(`labels.flightClass`, 'Clase de Vuelo')}
                                    </div>
                                    <div style={{ color: warningColor, fontSize: '1rem', fontWeight: '600' }}>
                                        {post.classeVol}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )}

                    {post.transportTerrestre && (
                        <Col xs={12} md={6}>
                            <div className="d-flex align-items-center p-3 rounded-3" style={{
                                backgroundColor: 'white',
                                border: `2px solid ${successColor}20`
                            }}>
                                <FaBus size={20} style={{ 
                                    color: successColor,
                                    marginRight: isRTL ? '0' : '15px',
                                    marginLeft: isRTL ? '15px' : '0'
                                }} />
                                <div>
                                    <div className="fw-bold text-dark" style={{ fontSize: '1.1rem' }}>
                                        {t(`labels.groundTransport`, 'Transporte Terrestre')}
                                    </div>
                                    <div style={{ color: successColor, fontSize: '1rem', fontWeight: '600' }}>
                                        {post.transportTerrestre}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )}
                </Row>
            </div>
        );
    };

    // Mapeo completo de servicios con iconos y categorías
    const getServiceInfo = (serviceId) => {
        const serviceMap = {
            // 📋 SERVICIOS ADMINISTRATIVOS
            "visa_hajj_omra": { icon: "🛂", category: "administrativos" },
            "permis_sortie": { icon: "📄", category: "administrativos" },
            "certificat_vaccination": { icon: "💉", category: "administrativos" },
            "autorisation_ministerielle": { icon: "🏛️", category: "administrativos" },
            "assistance_documentation": { icon: "📁", category: "administrativos" },
            
            // 🏨 HÉBERGEMENT
            "hebergement_haram_meca": { icon: "🕌", category: "hebergement" },
            "hebergement_haram_medina": { icon: "🌙", category: "hebergement" },
            "hotel_3_etoiles": { icon: "⭐", category: "hebergement" },
            "hotel_4_etoiles": { icon: "⭐⭐", category: "hebergement" },
            "hotel_5_etoiles": { icon: "⭐⭐⭐", category: "hebergement" },
            "chambre_double": { icon: "🛌", category: "hebergement" },
            "chambre_triple": { icon: "🛌🛌", category: "hebergement" },
            "chambre_individuelle": { icon: "👤", category: "hebergement" },
            "suite_familiale": { icon: "👨‍👩‍👧‍👦", category: "hebergement" },
            
            // 🚗 TRANSPORT
            "billet_avion_international": { icon: "✈️", category: "transport" },
            "transfert_aeroport": { icon: "🚐", category: "transport" },
            "bus_prive_meca_medina": { icon: "🚌", category: "transport" },
            "navettes_hotels": { icon: "🚎", category: "transport" },
            "transport_mina_arafat": { icon: "🗻", category: "transport" },
            "voiture_privee": { icon: "🚙", category: "transport" },
            
            // 👥 GUIDES
            "guide_religieux_francophone": { icon: "🕋", category: "guides" },
            "guide_arabophone": { icon: "📖", category: "guides" },
            "cours_preparation_hajj": { icon: "🎓", category: "guides" },
            "cours_preparation_omra": { icon: "📚", category: "guides" },
            "assistance_rituels": { icon: "🙏", category: "guides" },
            "groupe_reduit": { icon: "👨‍👩‍👧‍👦", category: "guides" },
            
            // 🍽️ RESTAURATION
            "petit_dejeuner": { icon: "☕", category: "restauration" },
            "demi_pension": { icon: "🍲", category: "restauration" },
            "pension_complete": { icon: "🍽️", category: "restauration" },
            "buffet_sahour": { icon: "🌙", category: "restauration" },
            "repas_speciaux": { icon: "🥘", category: "restauration" },
            "eau_zamzam_illimite": { icon: "💧", category: "restauration" },
            
            // 🏥 SANTÉ
            "assistance_medicale_24h": { icon: "⚕️", category: "sante" },
            "assurance_medicale": { icon: "🏥", category: "sante" },
            "infirmier_accompagnant": { icon: "💊", category: "sante" },
            "premier_secours": { icon: "🆘", category: "sante" },
            "coordination_securite": { icon: "🛡️", category: "sante" },
            "localisateur_groupe": { icon: "📍", category: "sante" },
            
            // 🎁 KITS
            "kit_pelegrin_complet": { icon: "🎒", category: "kits" },
            "ihram_coton": { icon: "👕", category: "kits" },
            "sac_voyage": { icon: "🧳", category: "kits" },
            "guide_manuel": { icon: "📘", category: "kits" },
            "bouteille_zamzam": { icon: "💧", category: "kits" },
            "cadeau_souvenir": { icon: "🎁", category: "kits" },
            
            // ⭐ PREMIUM
            "accompagnement_vip": { icon: "👑", category: "premium" },
            "fast_track_aeroport": { icon: "🚀", category: "premium" },
            "suite_executive": { icon: "🏰", category: "premium" },
            "concierge_personnel": { icon: "🔑", category: "premium" },
            "restaurant_gastronomique": { icon: "🍴", category: "premium" },
            "transport_berline": { icon: "🚘", category: "premium" }
        };

        return serviceMap[serviceId] || { icon: "✅", category: "general" };
    };

    // Función para agrupar servicios por categoría
    const groupServicesByCategory = (services) => {
        const grouped = {};
        
        services.forEach(serviceId => {
            const serviceInfo = getServiceInfo(serviceId);
            const category = serviceInfo.category;
            
            if (!grouped[category]) {
                grouped[category] = [];
            }
            
            grouped[category].push({
                id: serviceId,
                label: t(`servicess.${serviceId}`, { ns: "categories", defaultValue: serviceId }),
                icon: serviceInfo.icon
            });
        });
        
        return grouped;
    };

    // Traducción de nombres de categorías
    const getCategoryLabel = (categoryKey) => {
        const categoryLabels = {
            "administrativos": t("servicess.categoria_administrativos", { ns: "categories" }),
            "hebergement": t("servicess.categoria_hebergement", { ns: "categories" }),
            "transport": t("servicess.categoria_transport", { ns: "categories" }),
            "guides": t("servicess.categoria_guides", { ns: "categories" }),
            "restauration": t("servicess.categoria_restauration", { ns: "categories" }),
            "sante": t("servicess.categoria_sante", { ns: "categories" }),
            "kits": t("servicess.categoria_kits", { ns: "categories" }),
            "premium": t("servicess.categoria_premium", { ns: "categories" })
        };
        
        return categoryLabels[categoryKey] || categoryKey;
    };

    // Orden preferido de categorías
    const categoryOrder = ["administrativos", "hebergement", "transport", "guides", "restauration", "sante", "kits", "premium"];

    // Función para formatear fechas
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        
        if (isRTL) {
            return date.toLocaleDateString('ar-EG', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } else {
            return date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        }
    };

    // Componente para valores destacados
    const Highlight = ({ children }) => (
        <span style={{ 
            color: primaryColor, 
            fontWeight: '700',
            backgroundColor: '#e3f2fd',
            padding: '8px 12px',
            borderRadius: '8px',
            margin: '0 4px',
            fontSize: '1.1rem',
            display: 'inline-block'
        }}>
            {children}
        </span>
    );

    // Renderizado elegante de servicios agrupados
    const renderServicesElegantly = () => {
        if (!post.servicios || post.servicios.length === 0) return null;

        const groupedServices = groupServicesByCategory(post.servicios);
        
        return (
            <div className="p-4" style={{ 
                backgroundColor: '#fafafa',
                borderTop: '1px solid #f0f0f0'
            }}>
                <div className="d-flex align-items-center mb-4">
                    <FaConciergeBell size={22} style={{
                        color: primaryColor, 
                        marginRight: isRTL ? '0' : '12px',
                        marginLeft: isRTL ? '12px' : '0'
                    }} />
                    <h5 className="mb-0 fw-bold" style={{ color: secondaryColor, fontSize: '1.3rem' }}>
                        {t('labels.servicesEquipment', { ns: "descripcion" })} 
                        <Badge bg="primary" className="ms-3" style={{ fontSize: '0.9rem' }}>
                            {post.servicios.length}
                        </Badge>
                    </h5>
                </div>

                <div className="row">
                    {categoryOrder.map(categoryKey => {
                        if (!groupedServices[categoryKey]) return null;
                        
                        const categoryServices = groupedServices[categoryKey];
                        const categoryLabel = getCategoryLabel(categoryKey);
                        
                        return (
                            <div key={categoryKey} className="col-md-6 mb-4">
                                <div className="border rounded p-4 h-100" style={{ 
                                    backgroundColor: 'white',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                                }}>
                                    <h6 className="fw-bold mb-3" style={{ 
                                        color: primaryColor,
                                        fontSize: '1.1rem',
                                        borderBottom: '2px solid #e3f2fd',
                                        paddingBottom: '8px'
                                    }}>
                                        {categoryLabel}
                                    </h6>
                                    <div className="d-flex flex-wrap gap-3">
                                        {categoryServices.map(service => (
                                            <Badge 
                                                key={service.id}
                                                bg="light" 
                                                text="dark"
                                                className="d-flex align-items-center"
                                                style={{ 
                                                    fontSize: '0.95rem',
                                                    border: `1px solid ${primaryColor}30`,
                                                    backgroundColor: `${primaryColor}08`,
                                                    padding: '10px 14px',
                                                    borderRadius: '25px'
                                                }}
                                            >
                                                <span className="me-2" style={{ fontSize: '1.1rem' }}>
                                                    {service.icon}
                                                </span>
                                                {service.label}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Servicios sin categoría (fallback) */}
                {Object.keys(groupedServices).some(key => !categoryOrder.includes(key)) && (
                    <div className="mt-4">
                        <h6 className="fw-bold mb-3" style={{ fontSize: '1.1rem', color: '#666' }}>
                            {t('labels.otherServices', { ns: "descripcion" })}
                        </h6>
                        <div className="d-flex flex-wrap gap-3">
                            {Object.keys(groupedServices)
                                .filter(key => !categoryOrder.includes(key))
                                .flatMap(key => groupedServices[key])
                                .map(service => (
                                    <Badge 
                                        key={service.id}
                                        bg="light" 
                                        text="dark"
                                        style={{ fontSize: '0.95rem', padding: '8px 12px' }}
                                    >
                                        {service.icon} {service.label}
                                    </Badge>
                                ))
                            }
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Función para mostrar información del hotel
    const renderHotelInfo = () => {
        if (!post.nombreHotel && !post.ciudadHotel && !post.direccionHotel) return null;

        return (
            <div className="p-4" style={{ 
                backgroundColor: '#f8f9fa',
                borderTop: '1px solid #e0e0e0'
            }}>
                <div className="d-flex align-items-center mb-3">
                    <FaHotel size={22} style={{
                        color: primaryColor,
                        marginRight: isRTL ? '0' : '12px',
                        marginLeft: isRTL ? '12px' : '0'
                    }} />
                    <h5 className="mb-0 fw-bold" style={{ color: secondaryColor, fontSize: '1.3rem' }}>
                        {t('labels.hotelInfo', { ns: "descripcion", defaultValue: "Informations de l'Hôtel" })}
                    </h5>
                </div>
                
                <div className="row">
                    {post.nombreHotel && (
                        <div className="col-md-6 mb-3">
                            <div className="fw-bold fs-6 mb-1">🏨 {t('labels.hotelName', { ns: "descripcion", defaultValue: "Nom de l'hôtel" })}</div>
                            <div className="fs-5 text-dark">{post.nombreHotel}</div>
                        </div>
                    )}
                    {post.ciudadHotel && (
                        <div className="col-md-6 mb-3">
                            <div className="fw-bold fs-6 mb-1">🏙️ {t('labels.hotelCity', { ns: "descripcion", defaultValue: "Ville" })}</div>
                            <div className="fs-5 text-dark">{post.ciudadHotel}</div>
                        </div>
                    )}
                    {post.direccionHotel && (
                        <div className="col-12 mb-3">
                            <div className="fw-bold fs-6 mb-1">📍 {t('labels.hotelAddress', { ns: "descripcion", defaultValue: "Adresse" })}</div>
                            <div className="fs-5 text-dark">{post.direccionHotel}</div>
                        </div>
                    )}
                    {post.zonaRegion && (
                        <div className="col-12">
                            <div className="fw-bold fs-6 mb-1">🗺️ {t('labels.hotelZone', { ns: "descripcion", defaultValue: "Zone/Région" })}</div>
                            <div className="fs-5 text-dark">{post.zonaRegion}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Función para mostrar sistema completo de precios
    const renderCompletePricing = () => {
        const hasPricing = post.precioBase || post.tarifaNinos || post.tarifaBebes || post.prixAdulte || post.prixEnfant || post.prixBebe;
        if (!hasPricing) return null;

        return (
            <div className="p-4" style={{ 
                backgroundColor: '#fff8e1',
                borderTop: '1px solid #ffe082'
            }}>
                <div className="d-flex align-items-center mb-4">
                    <FaMoneyBillWave size={22} style={{
                        color: '#f57c00',
                        marginRight: isRTL ? '0' : '12px',
                        marginLeft: isRTL ? '12px' : '0'
                    }} />
                    <h5 className="mb-0 fw-bold" style={{ color: '#f57c00', fontSize: '1.3rem' }}>
                        {t('labels.completePricing', { ns: "descripcion", defaultValue: "Tarifs Complets" })}
                    </h5>
                </div>

                <div className="row">
                    {/* Sistema nuevo de precios */}
                    {post.precioBase && (
                        <div className="col-md-4 mb-3 text-center">
                            <div className="fw-bold fs-6 mb-2">👨‍🦰 {t('labels.adultPrice', { ns: "descripcion", defaultValue: "Adulte" })}</div>
                            <div className="fs-4 fw-bold text-success">{parseFloat(post.precioBase).toLocaleString()} DA</div>
                        </div>
                    )}
                    {post.tarifaNinos && (
                        <div className="col-md-4 mb-3 text-center">
                            <div className="fw-bold fs-6 mb-2">👶 {t('labels.childPrice', { ns: "descripcion", defaultValue: "Enfant (2-12 ans)" })}</div>
                            <div className="fs-4 fw-bold text-info">{parseFloat(post.tarifaNinos).toLocaleString()} DA</div>
                        </div>
                    )}
                    {post.tarifaBebes && (
                        <div className="col-md-4 mb-3 text-center">
                            <div className="fw-bold fs-6 mb-2">🍼 {t('labels.babyPrice', { ns: "descripcion", defaultValue: "Bébé (0-2 ans)" })}</div>
                            <div className="fs-4 fw-bold text-warning">{parseFloat(post.tarifaBebes).toLocaleString()} DA</div>
                        </div>
                    )}

                    {/* Sistema antiguo de precios */}
                    {post.prixAdulte && (
                        <div className="col-md-4 mb-3 text-center">
                            <div className="fw-bold fs-6 mb-2">👨 {t('labels.adult', { ns: "descripcion" })}</div>
                            <div className="fs-4 fw-bold text-success">{post.prixAdulte} DA</div>
                        </div>
                    )}
                    {post.prixEnfant && (
                        <div className="col-md-4 mb-3 text-center">
                            <div className="fw-bold fs-6 mb-2">🧒 {t('labels.child', { ns: "descripcion" })}</div>
                            <div className="fs-4 fw-bold text-info">{post.prixEnfant} DA</div>
                        </div>
                    )}
                    {post.prixBebe && (
                        <div className="col-md-4 mb-3 text-center">
                            <div className="fw-bold fs-6 mb-2">👶 {t('labels.baby', { ns: "descripcion" })}</div>
                            <div className="fs-4 fw-bold text-warning">{post.prixBebe} DA</div>
                        </div>
                    )}

                    {/* Opciones especiales */}
                    {(post.descuentoGrupo || post.ofertaEspecial) && (
                        <div className="col-12 mt-3">
                            <div className="fw-bold fs-6 mb-2">🎯 {t('labels.specialOptions', { ns: "descripcion", defaultValue: "Options Spéciales" })}</div>
                            <div className="d-flex gap-3">
                                {post.descuentoGrupo && (
                                    <Badge bg="success" className="fs-6 p-3">
                                        👥 {t('descuentoGrupo', { ns: "categories", defaultValue: "Remise pour groupes" })}
                                    </Badge>
                                )}
                                {post.ofertaEspecial && (
                                    <Badge bg="warning" text="dark" className="fs-6 p-3">
                                        🎁 {t('ofertaEspecial', { ns: "categories", defaultValue: "Offre spéciale" })}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Función compacta para generar la historia del viaje
    const generateTravelStory = () => {
        const sections = [];

        // 🔹 SECCIÓN 1: Información Principal
        let mainInfo = t('sections.main', { 
            ns: "descripcion", 
            type: categoryInfo.type 
        });

        // Usar el campo unificado destinacion
        if (post.destinacion) {
            mainInfo += ` ${t('labels.towards', { ns: "descripcion" })} ${post.destinacion} `;
        }

        if (post.datedepar) {
            mainInfo += ` ${t('labels.from', { ns: "descripcion" })} ${formatDate(post.datedepar)}`;
            if (post.horadudepar) {
                mainInfo += ` (${t('labels.departureAt', { ns: "descripcion" })} ${post.horadudepar})`;
            }
        }

        if (post.dureeSejour) {
            mainInfo += ` • ${t('labels.duration', { ns: "descripcion" })}: ${post.dureeSejour}`;
        }

        sections.push({ type: 'main', content: mainInfo });

        return sections;
    };

    const travelSections = generateTravelStory();

    // Función para renderizar cada sección con su estilo correspondiente
    const renderSection = (section, index) => {
        const baseStyle = {
            lineHeight: '1.7',
            fontSize: '1.2rem',
            marginBottom: '1rem',
            padding: '1rem 0',
            borderBottom: index < travelSections.length - 1 ? '1px solid #f0f0f0' : 'none',
            textAlign: isRTL ? 'right' : 'left',
            direction: isRTL ? 'rtl' : 'ltr'
        };

        switch (section.type) {
            case 'main':
                return (
                    <div key={index} style={baseStyle}>
                        <div style={{ 
                            fontSize: '1.4rem',
                            fontWeight: '700',
                            color: secondaryColor,
                            marginBottom: '0.75rem'
                        }}>
                            {section.content}
                        </div>
                    </div>
                );

            default:
                return (
                    <div key={index} style={baseStyle}>
                        {section.content}
                    </div>
                );
        }
    };

    // Badges para información específica
    const renderQuickInfoBadges = () => {
        const badges = [];

        if (post.wilaya && post.commune) {
            badges.push(
                <Badge key="location" bg="light" text="dark" className="me-2 mb-2 p-3" style={{ fontSize: '1rem' }}>
                    <FaMapMarkerAlt className={isRTL ? "ms-2" : "me-2"} style={{ color: primaryColor, fontSize: '1.1rem' }} />
                    {post.commune}, {post.wilaya}
                </Badge>
            );
        }

        if (post.datedepar) {
            badges.push(
                <Badge key="date" bg="light" text="dark" className="me-2 mb-2 p-3" style={{ fontSize: '1rem' }}>
                    <FaCalendarAlt className={isRTL ? "ms-2" : "me-2"} style={{ color: primaryColor, fontSize: '1.1rem' }} />
                    {formatDate(post.datedepar)}
                </Badge>
            );
        }

        return badges;
    };

    return (
        <Card className="mb-3 border-0 shadow-lg" style={{ 
            borderRadius: '15px', 
            overflow: 'hidden',
            direction: isRTL ? 'rtl' : 'ltr'
        }}>
            {/* Header Mejorado */}
            <Card.Header 
                className="border-0 text-white d-flex align-items-center justify-content-between"
                style={{ 
                    background: categoryInfo.gradient,
                    padding: '1.5rem 1.75rem'
                }}
            >
                <div className="d-flex align-items-center">
                    <div style={{
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '12px',
                        padding: '12px',
                        marginRight: isRTL ? '0' : '18px',
                        marginLeft: isRTL ? '18px' : '0'
                    }}>
                        <span style={{ fontSize: '1.8rem' }}>{categoryInfo.icon}</span>
                    </div>
                    <div>
                        <h5 className="mb-0 fw-bold" style={{ fontSize: '1.3rem' }}>
                            {categoryInfo.type.toUpperCase()}
                        </h5>
                        <small style={{ opacity: 0.9, fontSize: '1rem' }}>
                            {t('labels.exclusiveOffer', { ns: "descripcion" })} • {t('labels.publishedOn', { ns: "descripcion" })} {formatDate(post.createdAt)}
                        </small>
                    </div>
                </div>
                {post.views > 0 && (
                    <Badge bg="light" text="dark" style={{ fontSize: '1rem', padding: '8px 12px' }}>
                        👁️ {post.views} {t('labels.views', { ns: "descripcion" })}
                    </Badge>
                )}
            </Card.Header>

            <Card.Body className="p-0">
                {/* Badges de Información Rápida */}
                <div className="p-4 pb-3" style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <div className="d-flex flex-wrap">
                        {renderQuickInfoBadges()}
                    </div>
                </div>

                {/* Contenido Principal */}
                <div className="p-4">
                    {travelSections.map((section, index) => renderSection(section, index))}
                </div>

                {/* 🆕 NUEVAS SECCIONES ELEGANTES */}
                
                {/* Características del Alojamiento */}
                {renderAccommodationFeatures()}

                {/* Detalles del Transporte */}
                {renderTransportDetails()}

                {/* Campos Booleanos (Ofertas Especiales) */}
                {renderBooleanFields()}

                {/* Información del Hotel */}
                {renderHotelInfo()}

                {/* Sistema Completo de Precios */}
                {renderCompletePricing()}

                {/* Servicios Elegantes Agrupados por Categoría */}
                {renderServicesElegantly()}

                {/* Descripción Extendida */}
                {post.description && post.description.length > 200 && (
                    <div className="p-4" style={{ 
                        backgroundColor: '#fafafa', 
                        borderTop: '1px solid #f0f0f0'
                    }}>
                        {readMore ? (
                            <>
                                <div className="d-flex align-items-center mb-3">
                                    <FaComments size={22} style={{
                                        color: primaryColor, 
                                        marginRight: isRTL ? '0' : '12px',
                                        marginLeft: isRTL ? '12px' : '0'
                                    }} />
                                    <h6 className="fw-bold mb-0" style={{ color: secondaryColor, fontSize: '1.2rem' }}>
                                        {t('labels.detailedDescription', { ns: "descripcion" })}
                                    </h6>
                                </div>
                                <p style={{ 
                                    fontSize: '1.1rem',
                                    lineHeight: '1.7',
                                    color: '#555',
                                    marginBottom: '1rem',
                                    textAlign: isRTL ? 'right' : 'left'
                                }}>
                                    {post.description}
                                </p>
                                <Button 
                                    variant="outline-primary" 
                                    size="lg"
                                    onClick={() => setReadMore(false)}
                                    style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}
                                >
                                    {t('labels.readLess', { ns: "descripcion" })}
                                </Button>
                            </>
                        ) : (
                            <div 
                                className="d-flex align-items-center cursor-pointer"
                                onClick={() => setReadMore(true)}
                                style={{ color: primaryColor }}
                            >
                                <FaComments size={20} className={isRTL ? "ms-3" : "me-3"} />
                                <span className="fw-bold" style={{ fontSize: '1.1rem' }}>
                                    {t('labels.readMore', { ns: "descripcion" })}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer con CTA */}
                <div className="p-4 text-center" style={{ 
                    backgroundColor: '#f8f9fa',
                    borderTop: '1px solid #f0f0f0'
                }}>
                    <div className="fw-bold mb-3" style={{ fontSize: '1.1rem' }}>
                        {t('labels.uniqueExperience', { ns: "descripcion" })}
                    </div>
                    {post.contacto && (
                        <div style={{ 
                            color: primaryColor, 
                            fontWeight: '700',
                            fontSize: '1.3rem'
                        }}>
                            📞 {post.contacto}
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default DescriptionPost;