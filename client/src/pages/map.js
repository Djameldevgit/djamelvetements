import React, { useState, useEffect } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  ButtonGroup, 
  Alert, 
  Spinner,
  Badge,
  Carousel
} from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import L from "leaflet";
import { useTranslation } from "react-i18next";
import "leaflet/dist/leaflet.css";

// Fix para los íconos de Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Íconos
import { 
  FaStore, 
  FaUser, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaSyncAlt,
  FaGlobe,
  FaCity,
  FaHome,
  FaIdCard,
  FaRuler,
  FaLocationArrow,
  FaWhatsapp
} from "react-icons/fa";

// 🎯 DATOS ESTÁTICOS DE LA TIENDA - ÚNICA FUENTE DE VERDAD
const SHOP_DATA = {
  _id: 'Boutique Djamel',
  username: 'Djamel',
  nombretienda: 'Boutique Elegante',
  role: 'admin',
  wilaya: 'alger',
  commune: 'reghaia', 
  address: 'cite mafal',
  mobile: '+213 661 23 45 67',
  email: 'djamelart@fmail.com',
  presentacion: 'Más de 10 años vistiendo a la mujer moderna. Especialistas en trajes tradicionales, vestidos de fiesta y ropa casual de alta calidad. Telas importadas y diseños exclusivos.',
  avatar: '/images/boutique-logo.png'
};

// 🆕 FUNCIÓN PARA CALCULAR DISTANCIA
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
};

// 🆕 HOOK PARA OBTENER UBICACIÓN ACTUAL DEL USUARIO
const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalización no soportada'));
        return;
      }

      setIsGettingLocation(true);
      setLocationError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          setUserLocation(location);
          setIsGettingLocation(false);
          resolve(location);
        },
        (error) => {
          let errorMessage = 'Error obteniendo ubicación';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Permiso de ubicación denegado';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Información de ubicación no disponible';
              break;
            case error.TIMEOUT:
              errorMessage = 'Tiempo de espera agotado';
              break;
          }
          setLocationError(errorMessage);
          setIsGettingLocation(false);
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  };

  return { userLocation, locationError, isGettingLocation, getUserLocation };
};

// 🆕 COMPONENTE DE CÁLCULO DE DISTANCIA
const DistanceCalculator = ({ shopPosition }) => {
  const { t } = useTranslation('map');
  const { userLocation, locationError, isGettingLocation, getUserLocation } = useUserLocation();
  const [distance, setDistance] = useState(null);
  const [calculating, setCalculating] = useState(false);

  const calculateDistanceToShop = async () => {
    if (!shopPosition) return;
    
    try {
      setCalculating(true);
      
      const currentLocation = await getUserLocation();
      
      if (currentLocation && shopPosition.lat && shopPosition.lng) {
        const calculatedDistance = calculateDistance(
          currentLocation.lat,
          currentLocation.lng,
          shopPosition.lat,
          shopPosition.lng
        );
        
        setDistance(calculatedDistance);
      }
    } catch (error) {
      console.error(t('map.distanceCalculationError', 'Error calculando distancia:'), error);
    } finally {
      setCalculating(false);
    }
  };

  const formatDistance = (km) => {
    if (km < 1) {
      return `${Math.round(km * 1000)} ${t('map.meters', 'm')}`;
    } else if (km < 1000) {
      return `${km.toFixed(1)} ${t('map.kilometers', 'km')}`;
    } else {
      return `${Math.round(km)} ${t('map.kilometers', 'km')}`;
    }
  };

  if (!shopPosition || !shopPosition.lat) {
    return null;
  }

  return (
    <div className="mt-3 p-3 bg-light rounded border">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="d-flex align-items-center">
          <FaRuler className="text-primary me-2" size={20} />
          <h6 className="mb-0 fw-bold">{t('map.distanceToShop', 'Distancia a la tienda')}</h6>
        </div>
        
        <Button
          variant={distance ? "outline-success" : "primary"}
          size="sm"
          onClick={calculateDistanceToShop}
          disabled={calculating || isGettingLocation}
        >
          {calculating || isGettingLocation ? (
            <Spinner animation="border" size="sm" />
          ) : distance ? (
            <FaSyncAlt />
          ) : (
            <FaLocationArrow />
          )}
          <span className="ms-2">
            {distance ? t('map.recalculate', 'Recalcular') : t('map.calculate', 'Calcular')}
          </span>
        </Button>
      </div>
      
      {distance !== null ? (
        <div className="text-center">
          <Badge bg="success" className="fs-6 p-2">
            <h4 className="mb-0">{formatDistance(distance)}</h4>
          </Badge>
          <p className="text-muted small mb-0 mt-1">
            {t('map.distanceDescription', 'Distancia en línea recta desde tu ubicación actual')}
          </p>
        </div>
      ) : locationError ? (
        <Alert variant="warning" className="py-2 mb-0">
          <small>{locationError}</small>
        </Alert>
      ) : (
        <p className="text-muted small mb-0">
          {t('map.getDistance', 'Haz clic en "Calcular" para conocer la distancia desde tu ubicación actual')}
        </p>
      )}
      
      {userLocation && (
        <small className="text-muted d-block mt-2">
          {t('map.yourLocation', 'Tu ubicación actual')}: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
        </small>
      )}
    </div>
  );
};

// Avatar component
const Avatar = ({ user, size = 60 }) => {
  return (
    <div
      className="rounded-circle bg-gradient-primary d-flex align-items-center justify-content-center text-white shadow"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      {user?.username?.charAt(0)?.toUpperCase() || t('common.initial', 'T')}
    </div>
  );
};

// Ícono personalizado para tienda
const ShopIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDI3LjVDMTUuODI4NCAyNy41IDE2LjUgMjYuODI4NCAxNi41IDI2VjI0LjVIMTMuNVYyNkMxMy41IDI2LjgyODQgMTQuMTcxNiAyNy41IDE1IDI3LjVaIiBmaWxsPSIjREQyRTM2Ii8+CjxwYXRoIGQ9Ik0yMSAyNkgyMUgyMUgyMVoiIGZpbGw9IiNGRjVCMzYiLz4KPHBhdGggZD0iTTkgNkg5SDIxSDIxVjI2SDlWNloiIGZpbGw9IiNGRjVCMzYiLz4KPHBhdGggZD0iTTcgOUg3SDIzSDIzVjI2SDdWOVoiIGZpbGw9IiNGRjVCMzYiLz4KPHBhdGggZD0iTTUgMTJINVYyNkg1VjEyWiIgZmlsbD0iI0ZGNUIzNiIvPgo8cGF0aCBkPSJNMjUgMTJIMjVWMjZIMjVWMTJaIiBmaWxsPSIjRkY1QjM2Ii8+CjxwYXRoIGQ9Ik0xOC41IDE2LjVMMTguNSAxNi41TDE4LjUgMTYuNUwxOC41IDE2LjVaIiBmaWxsPSIjRkY1QjM2Ii8+CjxwYXRoIGQ9Ik0xNSAxOS41QzE0LjE3MTYgMTkuNSAxMy41IDE4LjgyODQgMTMuNSAxOFYxNi41SDE2LjVWMThDMTYuNSAxOC44Mjg0IDE1LjgyODQgMTkuNSAxNSAxOS41WiIgZmlsbD0iI0ZGNUIzNiIvPgo8cGF0aCBkPSJNMTEuNSAxNi41VjE2LjVIMTguNVYxNi41IiBzdHJva2U9IiNGRjVCMzYiIHN0cm9rZS13aWR0aD0iMS41Ii8+CjxwYXRoIGQ9Ik0xMS41IDE5LjVWMTkuNUgxOC41VjE5LjUiIHN0cm9rZT0iI0ZGNUIzNiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KPHBhdGggZD0iTTExLjUgMTMuNVYxMy41SDE4LjVWMTMuNSIgc3Ryb2tlPSIjRkY1QjM2IiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8L3N2Zz4K',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// ✅ COMPONENTE DE CAROUSEL
const ImageCarousel = ({ images }) => {
  const { t } = useTranslation('common');

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-4 bg-light rounded">
        <FaStore size={32} className="text-muted mb-2" />
        <p className="text-muted mb-0">{t('common.noImages', 'No hay imágenes disponibles')}</p>
      </div>
    );
  }

  return (
    <Carousel fade interval={3000} controls={images.length > 1} indicators={images.length > 1}>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <div 
            className="d-flex justify-content-center align-items-center"
            style={{ height: '250px', overflow: 'hidden' }}
          >
            <img
              className="d-block w-100 h-100 object-fit-cover"
              src={image}
              alt={t('common.shopImage', 'Imagen de la tienda') + ` ${index + 1}`}
              style={{ objectFit: 'cover' }}
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) {
                  e.target.nextSibling.style.display = 'block';
                }
              }}
            />
            <div className="position-absolute text-center" style={{ display: 'none' }}>
              <FaStore size={48} className="text-muted mb-2" />
              <p className="text-muted">{t('common.imageNotAvailable', 'Imagen no disponible')}</p>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

const Map = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation('map');
  
  // 🎯 SIMPLIFICADO: No necesitamos homeUsers ni auth para los datos
  const { auth } = useSelector((state) => state);
  
  const [mapCenter, setMapCenter] = useState([36.5, 3.5]);
  const [markerPosition, setMarkerPosition] = useState([36.5, 3.5]);
  const [shopPosition, setShopPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [mapStyle, setMapStyle] = useState("street");
  
  // 🎯 SIEMPRE usar los datos estáticos
  const selectedUser = SHOP_DATA;
  const isUserAuthenticated = !!auth.user;
  const isRTL = i18n.language === 'ar';

  // Imágenes del carousel
  const carouselImages = [
    '/images/shop1.jpg',
    '/images/shop2.jpg', 
    '/images/shop3.jpg',
    '/images/shop4.jpg'

  ].filter(img => img);

  // Proveedores de mapas
  const mapProviders = {
    street: {
      name: t('map.street', 'Street'),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '© OpenStreetMap'
    },
    satellite: {
      name: t('map.satellite', 'Satellite'),
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: '© Esri'
    },
    terrain: {
      name: t('map.terrain', 'Terrain'),
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution: '© OpenTopoMap'
    }
  };

  // 🎯 BUSCAR UBICACIÓN CON DATOS ESTÁTICOS
  const searchLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      setShopPosition(null);
      
      const locationFields = [];
      
      // Usar los datos ESTÁTICOS de la tienda
      if (selectedUser.wilaya) {
        let query = selectedUser.wilaya;
        if (selectedUser.commune) query += `, ${selectedUser.commune}`;
        if (selectedUser.address) query += `, ${selectedUser.address}`;
        query += ', Algeria';
        
        locationFields.push({ value: query, zoom: 14, priority: 1 });
      }
      
      if (selectedUser.wilaya && selectedUser.commune) {
        locationFields.push({ 
          value: `${selectedUser.wilaya}, ${selectedUser.commune}, Algeria`, 
          zoom: 12, 
          priority: 2 
        });
      }
      
      if (selectedUser.wilaya) {
        locationFields.push({ 
          value: `${selectedUser.wilaya}, Algeria`, 
          zoom: 10, 
          priority: 3 
        });
      }

      // Ordenar por prioridad
      locationFields.sort((a, b) => a.priority - b.priority);

      for (const field of locationFields) {
        try {
          const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(field.value)}&format=json&limit=1`;
          const response = await fetch(url, { 
            headers: { 
              'User-Agent': 'ShopApp/1.0',
              'Accept-Language': i18n.language || 'en'
            } 
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
              const lat = parseFloat(data[0].lat);
              const lon = parseFloat(data[0].lon);
              
              setMapCenter([lat, lon]);
              setMarkerPosition([lat, lon]);
              setShopPosition({ lat, lng: lon });
              setZoomLevel(field.zoom);
              setLoading(false);
              return;
            }
          }
        } catch (error) {
          console.warn(t('map.locationSearchWarning', 'Advertencia buscando ubicación:'), error);
          continue;
        }
      }
      
      // Si no se encontró ninguna ubicación
      setError(t('map.locationNotFound', 'Ubicación no encontrada para los datos proporcionados'));
      
    } catch (error) {
      console.error(t('map.locationError', 'Error de ubicación:'), error);
      setError(t('map.generalError', 'Error cargando la ubicación'));
    } finally {
      setLoading(false);
    }
  };

  // 🎯 EFECTO SIMPLIFICADO
  useEffect(() => {
    searchLocation();
  }, [i18n.language]);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleMapStyleChange = (style) => {
    setMapStyle(style);
  };

  // 🎯 FUNCIÓN PARA CONTACTAR POR WHATSAPP
  const contactViaWhatsApp = () => {
    const message = t('whatsapp.defaultMessage', `Hola {{username}}, vi tu tienda en la app y me interesa conocer más sobre tus productos.`, { 
      username: selectedUser.username 
    });
    const whatsappUrl = `https://wa.me/${selectedUser.mobile.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  return (
    <Container fluid className="py-4" dir={isRTL ? "rtl" : "ltr"}>
    <Row className="justify-content-center">
      <Col lg={10} xl={8}>
        
        {/* 🎯 HEADER SIMPLIFICADO */}
        <Card className="shadow-sm mb-3 border-0 bg-light">
          <Card.Body className="text-center">
            <h4 className="text-primary mb-2">
              <FaStore className="me-2" />
              {selectedUser.nombretienda}
            </h4>
            <p className="mb-0">
              <strong>Información oficial de nuestra tienda</strong>
              <br />
              <small className="text-muted">
                {!isUserAuthenticated && (
                  <Link to="/login" className="text-decoration-none">
                    Inicia sesión para acceder a todas las funciones
                  </Link>
                )}
              </small>
            </p>
          </Card.Body>
        </Card>

        {/* CAROUSEL */}
        <Card className="shadow-sm mb-3 border-0">
          <Card.Body className="p-0">
            <ImageCarousel images={carouselImages} />
          </Card.Body>
        </Card>

        {/* 🎯 INFORMACIÓN DE LA TIENDA - SIEMPRE LA MISMA */}
        <Card className="shadow-sm mb-3 border-0">
          <Card.Body>
            <Row className={`g-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              
              {/* Propietario */}
              <Col xs={12} lg={6}>
                <div className="d-flex align-items-center">
                  <FaUser className={`text-primary ${isRTL ? "ms-2" : "me-2"}`} size={18} />
                  <div className="d-flex align-items-center">
                    <strong className="text-dark me-2">{t('user.owner', 'Dueño')}:</strong>
                    <span className="text-primary"><strong>{selectedUser.username}</strong></span>
                  </div>
                </div>
              </Col>

              {/* Nombre de la Tienda */}
              <Col xs={12} lg={6}>
                <div className="d-flex align-items-center">
                  <FaStore className={`text-primary ${isRTL ? "ms-2" : "me-2"}`} size={18} />
                  <strong className="text-dark me-2">{t('shop.boutiqueName', 'Tienda')}:</strong>
                  <span><strong>{selectedUser.nombretienda}</strong></span>
                </div>
              </Col>

              {/* Teléfono */}
              <Col xs={12} lg={6}>
                <div className="d-flex align-items-center">
                  <FaPhone className={`text-success ${isRTL ? "ms-2" : "me-2"}`} size={16} />
                  <strong className="text-dark me-2">{t('contact.phone', 'Teléfono')}:</strong>
                  <span><strong>{selectedUser.mobile}</strong></span>
                  <Button 
                    variant="success" 
                    size="sm" 
                    className="ms-2"
                    onClick={contactViaWhatsApp}
                  >
                    <FaWhatsapp className="me-1" />
                    WhatsApp
                  </Button>
                </div>
              </Col>

              {/* Email */}
              <Col xs={12} lg={6}>
                <div className="d-flex align-items-center">
                  <FaEnvelope className={`text-danger ${isRTL ? "ms-2" : "me-2"}`} size={16} />
                  <strong className="text-dark me-2">{t('contact.email', 'Email')}:</strong>
                  <span><strong>{selectedUser.email}</strong></span>
                </div>
              </Col>

              {/* Wilaya */}
              <Col xs={12} lg={6}>
                <div className="d-flex align-items-center">
                  <FaMapMarkerAlt className={`text-warning ${isRTL ? "ms-2" : "me-2"}`} size={16} />
                  <strong className="text-dark me-2">{t('location.wilaya', 'Wilaya')}:</strong>
                  <span><strong>{selectedUser.wilaya}</strong></span>
                </div>
              </Col>

              {/* Commune */}
              <Col xs={12} lg={6}>
                <div className="d-flex align-items-center">
                  <FaCity className={`text-info ${isRTL ? "ms-2" : "me-2"}`} size={16} />
                  <strong className="text-dark me-2">{t('location.commune', 'Comuna')}:</strong>
                  <span><strong>{selectedUser.commune}</strong></span>
                </div>
              </Col>

              {/* Dirección */}
              <Col xs={12}>
                <div className="d-flex align-items-center">
                  <FaHome className={`text-secondary ${isRTL ? "ms-2" : "me-2"}`} size={16} />
                  <strong className="text-dark me-2">{t('location.address', 'Dirección')}:</strong>
                  <span><strong>{selectedUser.address}</strong></span>
                </div>
              </Col>

              {/* Presentación */}
              <Col xs={12}>
                <div className="d-flex align-items-start">
                  <FaIdCard className={`text-primary ${isRTL ? "ms-2" : "me-2 mt-1"}`} size={16} />
                  <div>
                    <strong className="text-dark me-2">{t('profile.presentation', 'Presentación')}:</strong>
                    <span>{selectedUser.presentacion}</span>
                  </div>
                </div>
              </Col>

            </Row>
          </Card.Body>
        </Card>

        {/* MAPA - SIEMPRE FUNCIONAL */}
        <Card className="shadow-sm border-0">
          <Card.Header className="bg-white border-bottom">
            <Row className={`align-items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Col>
                <h5 className="mb-0">
                  <FaGlobe className={isRTL ? "ms-2" : "me-2"} />
                  {t('map.location', 'Ubicación en el Mapa')}
                </h5>
                <small className="text-muted">
                  {selectedUser.wilaya && `${selectedUser.wilaya}`}
                  {selectedUser.commune && `, ${selectedUser.commune}`}
                  {selectedUser.address && `, ${selectedUser.address}`}
                </small>
              </Col>
              <Col xs="auto">
                <ButtonGroup size="sm">
                  {Object.keys(mapProviders).map(style => (
                    <Button
                      key={style}
                      variant={mapStyle === style ? "primary" : "outline-primary"}
                      onClick={() => handleMapStyleChange(style)}
                    >
                      {mapProviders[style].name}
                    </Button>
                  ))}
                </ButtonGroup>
              </Col>
            </Row>
          </Card.Header>
          
          <Card.Body className="p-0">
            {loading && (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" size="lg" />
                <p className="mt-3 fs-5">{t('map.searching', 'Buscando ubicación...')}</p>
              </div>
            )}
            
            {error && !loading && (
              <Alert variant="warning" className="m-4">
                <div className="d-flex align-items-center">
                  <i className={`fas fa-exclamation-triangle ${isRTL ? "ms-2" : "me-2"}`}></i>
                  <div>
                    <strong>Ubicación no disponible</strong>
                    <p className="mb-0">{error}</p>
                  </div>
                </div>
              </Alert>
            )}

            {!loading && !error && (
              <>
                <div style={{ height: '400px', width: '100%' }}>
                  <MapContainer 
                    center={mapCenter} 
                    zoom={zoomLevel} 
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                    key={`${mapStyle}-${mapCenter[0]}-${mapCenter[1]}`}
                  >
                    <ChangeView center={mapCenter} zoom={zoomLevel} />
                    <TileLayer
                      url={mapProviders[mapStyle].url}
                      attribution={mapProviders[mapStyle].attribution}
                    />
                    
                    <Marker position={markerPosition} icon={ShopIcon}>
                      <Popup>
                        <div style={{ minWidth: '250px', textAlign: isRTL ? 'right' : 'left' }}>
                          <h6 className="fw-bold text-primary mb-2">
                            {selectedUser.nombretienda}
                          </h6>
                          {selectedUser.wilaya && <div className="mb-1"><strong>📍 {t('location.wilaya', 'Wilaya')}:</strong> {selectedUser.wilaya}</div>}
                          {selectedUser.commune && <div className="mb-1"><strong>🏘️ {t('location.commune', 'Comuna')}:</strong> {selectedUser.commune}</div>}
                          {selectedUser.address && <div className="mb-1"><strong>🏠 {t('location.address', 'Dirección')}:</strong> {selectedUser.address}</div>}
                          {selectedUser.mobile && (
                            <Button 
                              variant="success" 
                              size="sm" 
                              className="w-100 mt-2"
                              onClick={contactViaWhatsApp}
                            >
                              <FaWhatsapp className="me-1" />
                              Contactar por WhatsApp
                            </Button>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
                
                {/* COMPONENTE DE CÁLCULO DE DISTANCIA */}
                <DistanceCalculator shopPosition={shopPosition} />
              </>
            )}
          </Card.Body>
          
          <Card.Footer className="bg-white">
            <Row className={`align-items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Col>
                <small className="text-muted">
                  {t('map.usingData', 'Usando datos oficiales de la tienda')}
                </small>
              </Col>
              <Col xs="auto">
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={searchLocation}
                    disabled={loading}
                  >
                    <FaSyncAlt className={isRTL ? "ms-1" : "me-1"} />
                    {t('map.reload', 'Actualizar')}
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={handleGoBack}
                  >
                    {t('common.back', 'Volver')}
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>
  );
};

export default Map;