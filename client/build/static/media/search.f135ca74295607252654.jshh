import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { getDataAPI } from "../utils/fetchData";
import Posts from "../components/home/Posts";
import LoadIcon from "../images/loading.gif";

import DestinacionHadjOmra from "../components/forms/hadjpmra/DestinacionHdjaOmra";
import DestinacionLocationvacances from "../components/forms/locationvacances/DestinacionLocationvacances";
import Destinacionvoyageorganise from "../components/forms/voyageorgranise/Destinacionvoyageorganise";

import {
  Container,
  Form,
  Button,
  Spinner,
  Alert,
  Row,
  Col,
  Card,
  Badge,
  Collapse,
} from "react-bootstrap";

export default function SearchPage() {
  const { t, i18n } = useTranslation('search');
  const languageReducer = useSelector(state => state.languageReducer);
  
  // 🆕 DETECCIÓN RTL
  const isRTL = i18n.language === 'ar';
  
  // 🆕 ESTADO PARA TOGGLE DE BÚSQUEDA AVANZADA
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  
  useEffect(() => {
    const lang = languageReducer?.language || 'fr';
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [languageReducer?.language, i18n]);

  // 🔹 Estados para filtros tradicionales - CORREGIDOS
  const [filters, setFilters] = useState({
    subCategory: "",    
    destinacion: "",    
    datedeparMin: "",    // 🆕 CORREGIDO: Fecha mínima (coincide con campo real)
    datedeparMax: "",    // 🆕 CORREGIDO: Fecha máxima (coincide con campo real)
    nombreHotel: "",     // Búsqueda por hotel
    minPrice: "",        // 🆕 NUEVO: Precio mínimo
    maxPrice: "",        // 🆕 NUEVO: Precio máximo
    latest: false       
  });

  // 🔥 Estados para búsqueda inteligente
  const [smartSearchResults, setSmartSearchResults] = useState([]);
  const [smartSearchError, setSmartSearchError] = useState(null);
  const [smartSearchLoading, setSmartSearchLoading] = useState(false);

  // 🔹 Estados tradicionales
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const { auth } = useSelector((state) => state);

  // 🔹 Opciones para el select de categoría
  const subCategoryOptions = [
    { value: "Voyage Organise", label: t('categories.organizedTrip', 'Voyage Organisé') },
    { value: "Location_Vacances", label: t('categories.vacationRental', 'Location Vacances') },
    { value: "hadj_Omra", label: t('categories.hajjUmrah', 'Hadj & Omra') }
  ];

  // 🔹 Buscar posts con filtros tradicionales - ACTUALIZADO
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setError(null);
    setSmartSearchError(null);
    setLoading(true);

    try {
      const queryParams = new URLSearchParams();
      
      if (filters.subCategory.trim()) {
        queryParams.append('subCategory', filters.subCategory.trim());
      }
      
      if (filters.destinacion.trim()) {
        queryParams.append('destinacion', filters.destinacion.trim());
      }
      
      // 🆕 PARÁMETROS DE FECHAS - CORREGIDOS
      if (filters.datedeparMin.trim()) {
        queryParams.append('datedeparMin', filters.datedeparMin.trim());
      }
      
      if (filters.datedeparMax.trim()) {
        queryParams.append('datedeparMax', filters.datedeparMax.trim());
      }
      
      // 🆕 BÚSQUEDA POR HOTEL
      if (filters.nombreHotel.trim()) {
        queryParams.append('nombreHotel', filters.nombreHotel.trim());
      }
      
      // 🆕 PARÁMETROS DE PRECIO - NUEVOS
      if (filters.minPrice.trim()) {
        queryParams.append('minPrice', filters.minPrice.trim());
      }
      
      if (filters.maxPrice.trim()) {
        queryParams.append('maxPrice', filters.maxPrice.trim());
      }
      
      if (filters.latest) {
        queryParams.append('sort', '-createdAt');
      }
      
      const queryString = queryParams.toString();
      const url = `posts${queryString ? `?${queryString}` : ''}`;
      
      const res = await getDataAPI(url, auth.token);
      setResults(res.data.posts || []);
      
    } catch (err) {
      console.error("Error en búsqueda tradicional:", err);
      setError(
        err.response?.data?.message || err.message || t('errors.searchError', 'Erreur de recherche')
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Buscar últimos viajes automáticamente
  const handleLatestTrips = () => {
    setFilters(prev => ({
      ...prev,
      latest: true,
      subCategory: "",
      destinacion: "",
      datedeparMin: "",
      datedeparMax: "",
      nombreHotel: "",
      minPrice: "",
      maxPrice: ""
    }));
    setSmartSearchResults([]);
    setSmartSearchError(null);
  };

  // 🔹 Efecto para búsqueda automática de últimos viajes
  useEffect(() => {
    if (filters.latest) {
      handleSearch();
    }
  }, [filters.latest]);

  // 🔥 Limpiar búsqueda inteligente cuando se usan filtros normales
  useEffect(() => {
    if (filters.subCategory || filters.destinacion || filters.datedeparMin || 
        filters.datedeparMax || filters.nombreHotel || filters.minPrice || filters.maxPrice) {
      setSmartSearchResults([]);
      setSmartSearchError(null);
    }
  }, [filters.subCategory, filters.destinacion, filters.datedeparMin, 
      filters.datedeparMax, filters.nombreHotel, filters.minPrice, filters.maxPrice]);

  // 🔹 Manejo de filtros optimizado
  const updateFilter = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'subCategory' && { destinacion: "" })
    }));
  };

  // 🔹 Función específica para actualizar el destino
  const updateDestinacion = (value) => {
    setFilters(prev => ({
      ...prev,
      destinacion: value
    }));
  };

  // 🔹 Limpiar todos los filtros
  const handleClearFilters = () => {
    setFilters({
      subCategory: "",
      destinacion: "",
      datedeparMin: "",
      datedeparMax: "",
      nombreHotel: "",
      minPrice: "",
      maxPrice: "",
      latest: false
    });
    setResults([]);
    setSmartSearchResults([]);
    setError(null);
    setSmartSearchError(null);
    setShowAdvancedSearch(false);
  };

  // 🔹 Contador de filtros activos - ACTUALIZADO
  const activeFiltersCount = [
    filters.subCategory,
    filters.destinacion,
    filters.datedeparMin,
    filters.datedeparMax,
    filters.nombreHotel,
    filters.minPrice,
    filters.maxPrice,
    filters.latest,
    smartSearchResults.length > 0 ? "búsqueda-activa" : ""
  ].filter(Boolean).length;

  // 🔥 DETERMINAR QUÉ RESULTADOS MOSTRAR
  const postsToShow = smartSearchResults.length > 0 ? smartSearchResults : results;
  const showingSmartSearch = smartSearchResults.length > 0;

  // 🔥 COMPONENTE DE DESTINO DINÁMICO - CON RTL
  const DestinationSelector = () => {
    if (!filters.subCategory) {
      return (
        <Form.Group className="h-100 d-flex flex-column">
          <Form.Label className="small fw-semibold mb-1">
            {/* 🆕 ICONO RTL */}
            {isRTL ? (
              <span>
                {t('labels.destination', 'Destination')} 
                <i className="fas fa-map-marker-alt text-success ms-1"></i>
              </span>
            ) : (
              <span>
                <i className="fas fa-map-marker-alt text-success me-1"></i>
                {t('labels.destination', 'Destination')}
              </span>
            )}
          </Form.Label>
          <Form.Select 
            size="sm" 
            disabled
            className="flex-grow-1"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <option value="">{t('placeholders.selectCategoryFirst', 'Sélectionnez d\'abord une catégorie')}</option>
          </Form.Select>
        </Form.Group>
      );
    }

    const destinationProps = {
      postData: { destinacion: filters.destinacion },
      handleChangeInput: (e) => {
        if (e.target.name === 'destinacion') {
          updateDestinacion(e.target.value);
        }
      }
    };

    const getDestinationLabel = () => {
      switch (filters.subCategory) {
        case "Voyage Organise":
          return t('labels.destinationOrganized', 'Destination (Voyages Organisés)');
        case "Location_Vacances":
          return t('labels.destinationRental', 'Destination (Location Vacances)');
        case "hadj_Omra":
          return t('labels.destinationHajj', 'Destination (Hadj & Omra)');
        default:
          return t('labels.destination', 'Destination');
      }
    };

    const getDestinationIcon = () => {
      switch (filters.subCategory) {
        case "Voyage Organise":
          return "fas fa-globe-americas";
        case "Location_Vacances":
          return "fas fa-home";
        case "hadj_Omra":
          return "fas fa-mosque";
        default:
          return "fas fa-map-marker-alt";
      }
    };

    const renderDestinationComponent = () => {
      switch (filters.subCategory) {
        case "Voyage Organise":
          return <Destinacionvoyageorganise {...destinationProps} />;
        case "Location_Vacances":
          return <DestinacionLocationvacances {...destinationProps} />;
        case "hadj_Omra":
          return <DestinacionHadjOmra {...destinationProps} />;
        default:
          return null;
      }
    };

    return (
      <Form.Group className="h-100 d-flex flex-column">
        <Form.Label className="small fw-semibold mb-1">
          {/* 🆕 ICONO RTL */}
          {isRTL ? (
            <span>
              {getDestinationLabel()} 
              <i className={`${getDestinationIcon()} text-success ms-1`}></i>
            </span>
          ) : (
            <span>
              <i className={`${getDestinationIcon()} text-success me-1`}></i>
              {getDestinationLabel()}
            </span>
          )}
        </Form.Label>
        <div className="flex-grow-1">
          {renderDestinationComponent()}
        </div>
      </Form.Group>
    );
  };

  return (
    <Container fluid className="px-0" dir={isRTL ? "rtl" : "ltr"}>
      {/* 🔹 BÚSQUEDA PRINCIPAL CON FILTROS TRADICIONALES - CON RTL */}
      <Card className="shadow-sm border-0 rounded-0 mb-3">
        <Card.Body className="p-3">
          <Form onSubmit={handleSearch}>
            {/* 🆕 FILA 1: CATEGORÍA Y DESTINO EN MISMA FILA - CON RTL */}
            <Row className={`g-3 align-items-stretch mb-3 ${isRTL ? 'flex-row-reverse' : ''}`} style={{ minHeight: '80px' }}>
              {/* CATEGORÍA - 50% */}
              <Col xl={6} lg={6} md={6} sm={12} className="d-flex flex-column">
                <Form.Group className="h-100 d-flex flex-column">
                  <Form.Label className="small fw-semibold mb-1">
                    {/* 🆕 ICONO RTL */}
                    {isRTL ? (
                      <span>
                        {t('labels.category', 'Catégorie')} 
                        <i className="fas fa-tags text-info ms-1"></i>
                      </span>
                    ) : (
                      <span>
                        <i className="fas fa-tags text-info me-1"></i>
                        {t('labels.category', 'Catégorie')}
                      </span>
                    )}
                  </Form.Label>
                  <Form.Select
                    value={filters.subCategory}
                    onChange={(e) => updateFilter('subCategory', e.target.value)}
                    size="sm"
                    disabled={loading}
                    className="flex-grow-1"
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <option value="">{t('placeholders.allCategories', 'Toutes les catégories')}</option>
                    {subCategoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* DESTINO - 50% */}
              <Col xl={6} lg={6} md={6} sm={12} className="d-flex flex-column">
                <DestinationSelector />
              </Col>
            </Row>

            {/* 🆕 BOTÓN PARA BÚSQUEDA AVANZADA */}
            <Row className={`mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Col>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className="w-100"
                >
                  <i className={`fas ${showAdvancedSearch ? 'fa-chevron-up' : 'fa-chevron-down'} ${isRTL ? 'ms-2' : 'me-2'}`}></i>
                  {showAdvancedSearch 
                    ? t('buttons.hideAdvanced', 'Masquer la recherche avancée') 
                    : t('buttons.showAdvanced', 'Recherche avancée')}
                  {activeFiltersCount > 0 && (
                    <Badge   className={`${isRTL ? 'me-2' : 'ms-2'}`}>
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </Col>
            </Row>

            {/* 🆕 BÚSQUEDA AVANZADA - COLLAPSE */}
            <Collapse in={showAdvancedSearch}>
              <div>
                {/* FILA 2: RANGO DE FECHAS Y BÚSQUEDA DE HOTEL - CON RTL */}
                <Row className={`g-3 align-items-end mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {/* FECHA INICIO */}
                  <Col xl={4} lg={4} md={6} sm={12}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        {/* 🆕 ICONO RTL */}
                        {isRTL ? (
                          <span>
                            {t('labels.startDate', 'Date de Départ Min')} 
                            <i className="fas fa-calendar-plus text-primary ms-1"></i>
                          </span>
                        ) : (
                          <span>
                            <i className="fas fa-calendar-plus text-primary me-1"></i>
                            {t('labels.startDate', 'Date de Départ Min')}
                          </span>
                        )}
                      </Form.Label>
                      <Form.Control
                        type="date"
                        value={filters.datedeparMin}
                        onChange={(e) => updateFilter('datedeparMin', e.target.value)}
                        size="sm"
                        disabled={loading}
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </Form.Group>
                  </Col>

                  {/* FECHA FIN */}
                  <Col xl={4} lg={4} md={6} sm={12}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        {/* 🆕 ICONO RTL */}
                        {isRTL ? (
                          <span>
                            {t('labels.endDate', 'Date de Départ Max')} 
                            <i className="fas fa-calendar-minus text-primary ms-1"></i>
                          </span>
                        ) : (
                          <span>
                            <i className="fas fa-calendar-minus text-primary me-1"></i>
                            {t('labels.endDate', 'Date de Départ Max')}
                          </span>
                        )}
                      </Form.Label>
                      <Form.Control
                        type="date"
                        value={filters.datedeparMax}
                        onChange={(e) => updateFilter('datedeparMax', e.target.value)}
                        size="sm"
                        disabled={loading}
                        min={filters.datedeparMin}
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </Form.Group>
                  </Col>

                  {/* BÚSQUEDA POR HOTEL */}
                  <Col xl={4} lg={4} md={12} sm={12}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        {/* 🆕 ICONO RTL */}
                        {isRTL ? (
                          <span>
                            {t('labels.hotelSearch', 'Recherche par Hôtel')} 
                            <i className="fas fa-hotel text-warning ms-1"></i>
                          </span>
                        ) : (
                          <span>
                            <i className="fas fa-hotel text-warning me-1"></i>
                            {t('labels.hotelSearch', 'Recherche par Hôtel')}
                          </span>
                        )}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t('placeholders.hotelName', 'Nom de l\'hôtel...')}
                        value={filters.nombreHotel}
                        onChange={(e) => updateFilter('nombreHotel', e.target.value)}
                        size="sm"
                        disabled={loading}
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* 🆕 FILA 3: RANGO DE PRECIOS - NUEVO */}
                <Row className={`g-3 align-items-end mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {/* PRECIO MÍNIMO */}
                  <Col xl={6} lg={6} md={6} sm={12}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        {/* 🆕 ICONO RTL */}
                        {isRTL ? (
                          <span>
                            {t('labels.minPrice', 'Prix Minimum')} 
                            <i className="fas fa-euro-sign text-success ms-1"></i>
                          </span>
                        ) : (
                          <span>
                            <i className="fas fa-euro-sign text-success me-1"></i>
                            {t('labels.minPrice', 'Prix Minimum')}
                          </span>
                        )}
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder={t('placeholders.minPrice', 'Min...')}
                        value={filters.minPrice}
                        onChange={(e) => updateFilter('minPrice', e.target.value)}
                        size="sm"
                        disabled={loading}
                        min="0"
                        step="0.01"
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </Form.Group>
                  </Col>

                  {/* PRECIO MÁXIMO */}
                  <Col xl={6} lg={6} md={6} sm={12}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        {/* 🆕 ICONO RTL */}
                        {isRTL ? (
                          <span>
                            {t('labels.maxPrice', 'Prix Maximum')} 
                            <i className="fas fa-euro-sign text-success ms-1"></i>
                          </span>
                        ) : (
                          <span>
                            <i className="fas fa-euro-sign text-success me-1"></i>
                            {t('labels.maxPrice', 'Prix Maximum')}
                          </span>
                        )}
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder={t('placeholders.maxPrice', 'Max...')}
                        value={filters.maxPrice}
                        onChange={(e) => updateFilter('maxPrice', e.target.value)}
                        size="sm"
                        disabled={loading}
                        min={filters.minPrice || "0"}
                        step="0.01"
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Collapse>

            {/* 🆕 FILA 4: BOTONES DE ACCIÓN - CON RTL */}
            <Row className={`g-3 align-items-end ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Col xl={12} lg={12} md={12} sm={12}>
                <div className={`d-flex gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Button 
                    variant="primary" 
                    onClick={handleSearch}
                    className="flex-fill"
                    size="sm"
                    disabled={loading}
                    style={{ minWidth: '140px' }}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className={isRTL ? "ms-1" : "me-1"} />
                        {t('buttons.searching', 'Recherche...')}
                      </>
                    ) : (
                      <>
                        <i className={`fas fa-search ${isRTL ? "ms-1" : "me-1"}`}></i>
                        {t('buttons.search', 'Rechercher')}
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline-secondary" 
                    onClick={handleLatestTrips}
                    size="sm"
                    disabled={loading || filters.latest}
                    style={{ minWidth: '120px' }}
                  >
                    <i className={`fas fa-clock ${isRTL ? "ms-1" : "me-1"}`}></i>
                    {t('buttons.latestTrips', 'Derniers Voyages')}
                  </Button>
                  
                  {activeFiltersCount > 0 && (
                    <Button 
                      variant="outline-danger" 
                      onClick={handleClearFilters}
                      size="sm"
                      disabled={loading || smartSearchLoading}
                      style={{ minWidth: '100px' }}
                    >
                      <i className={`fas fa-times ${isRTL ? "ms-1" : "me-1"}`}></i>
                      {t('buttons.clearAll', 'Effacer')}
                    </Button>
                  )}
                </div>
              </Col>
            </Row>

            {/* 🔹 FILTROS ACTIVOS - ACTUALIZADO CON RTL */}
            <div className="mt-3">
              {activeFiltersCount > 0 && (
                <div className={`d-flex align-items-center flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <small className={`text-muted ${isRTL ? "ms-2" : "me-2"}`}>
                    {t('labels.activeFilters', 'Filtres actifs')}:
                  </small>
                  {filters.subCategory && (
                    <Badge   className={isRTL ? "ms-1 mb-1" : "me-1 mb-1"}>
                      {t('labels.category', 'Catégorie')}: {filters.subCategory}
                    </Badge>
                  )}
                  {filters.destinacion && (
                    <Badge   className={isRTL ? "ms-1 mb-1" : "me-1 mb-1"}>
                      {t('labels.destination', 'Destination')}: {filters.destinacion}
                    </Badge>
                  )}
                  {filters.datedeparMin && (
                    <Badge   className={isRTL ? "ms-1 mb-1" : "me-1 mb-1"}>
                      {t('labels.from', 'De')}: {filters.datedeparMin}
                    </Badge>
                  )}
                  {filters.datedeparMax && (
                    <Badge  className={isRTL ? "ms-1 mb-1" : "me-1 mb-1"}>
                      {t('labels.to', 'À')}: {filters.datedeparMax}
                    </Badge>
                  )}
                  {filters.nombreHotel && (
                    <Badge   className={isRTL ? "ms-1 mb-1" : "me-1 mb-1"}>
                      {t('labels.hotel', 'Hôtel')}: {filters.nombreHotel}
                    </Badge>
                  )}
                  {filters.minPrice && (
                    <Badge   className={isRTL ? "ms-1 mb-1" : "me-1 mb-1"}>
                      {t('labels.minPrice', 'Prix Min')}: ${filters.minPrice}
                    </Badge>
                  )}
                  {filters.maxPrice && (
                    <Badge    className={isRTL ? "ms-1 mb-1" : "me-1 mb-1"}>
                      {t('labels.maxPrice', 'Prix Max')}: ${filters.maxPrice}
                    </Badge>
                  )}
                  {showingSmartSearch && (
                    <Badge   className={isRTL ? "ms-1 mb-1" : "me-1 mb-1"}>
                      {t('labels.smartSearch', 'Recherche Intelligente')}
                    </Badge>
                  )}
                  {filters.latest && (
                    <Badge   className={isRTL ? "ms-1 mb-1" : "me-1 mb-1"}>
                      {t('labels.latestTrips', 'Derniers Voyages')}
                    </Badge>
                  )}
                  <Badge  className="mb-1">
                    {activeFiltersCount} {activeFiltersCount === 1 ? t('labels.filter', 'filtre') : t('labels.filters', 'filtres')}
                  </Badge>
                </div>
              )}
            </div>

          </Form>
        </Card.Body>
      </Card>

      {/* 🔹 CONTENIDO PRINCIPAL - CON RTL */}
      <Container className="py-3">
        {/* 🔹 Indicadores de Resultados - CON RTL */}
        {showingSmartSearch && smartSearchResults.length > 0 && (
          <Alert variant="success" className="px-3 d-flex align-items-center mb-3">
            <i className={`fas fa-check-circle ${isRTL ? "ms-2" : "me-2"} fs-6`}></i>
            <small className="fw-semibold">
              {t('results.smartSearchResults', 'Recherche intelligente')}: {smartSearchResults.length} {t('results.resultsFound', 'résultats trouvés')}
            </small>
          </Alert>
        )}

        {results.length > 0 && !showingSmartSearch && (
          <Alert variant="info" className="px-3 d-flex align-items-center mb-3">
            <i className={`fas fa-info-circle ${isRTL ? "ms-2" : "me-2"} fs-6`}></i>
            <small className="fw-semibold">
              {t('results.filtersApplied', 'Filtres appliqués')}: {results.length} {t('results.resultsFound', 'résultats trouvés')}
            </small>
          </Alert>
        )}

        {(error || smartSearchError) && (
          <Alert variant="danger" className="px-3 d-flex align-items-center mb-3">
            <i className={`fas fa-exclamation-triangle ${isRTL ? "ms-2" : "me-2"} fs-6`}></i>
            <small>{error || smartSearchError}</small>
          </Alert>
        )}

        {showingSmartSearch && smartSearchResults.length === 0 && !smartSearchLoading && !smartSearchError && (
          <Alert variant="warning" className="px-3 d-flex align-items-center mb-3">
            <i className={`fas fa-search ${isRTL ? "ms-2" : "me-2"} fs-6`}></i>
            <small className="fw-semibold">
              {t('results.noSmartResults', 'Aucun résultat trouvé avec la recherche intelligente')}
            </small>
          </Alert>
        )}

        {/* 🔹 Lista de Posts */}
        <div className="">
          {(loading || smartSearchLoading) ? (
            <Card className="text-center">
              <Card.Body className="p-3">
                <img src={LoadIcon} alt="loading" width="40" className="mb-2" />
                <h6 className="text-muted mb-1">
                  {smartSearchLoading ? t('states.searching', 'Recherche...') : t('states.applyingFilters', 'Application des filtres...')}
                </h6>
                <small className="text-muted">{t('states.pleaseWait', 'Veuillez patienter...')}</small>
              </Card.Body>
            </Card>
          ) : (
            <Posts posts={postsToShow.length > 0 ? postsToShow : null} filters={filters} />
          )}
        </div>
      </Container>
    </Container>
  );
}