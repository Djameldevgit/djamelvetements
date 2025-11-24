import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { getDataAPI } from "../utils/fetchData";
import Posts from "../components/home/Posts";
import LoadIcon from "../images/loading.gif";

// 🔷 COMPONENTES ESENCIALES SOLO PARA BÚSQUEDA
import CategorySelector from '../components/forms/vetements/CategorySelector';
import Talla from '../components/forms/vetements/Talla';
import Genero from '../components/forms/vetements/Genero';
import Estado from '../components/forms/vetements/Estado';
import Color from '../components/forms/vetements/Color';
import Marca from '../components/forms/vetements/Marca';

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
  InputGroup
} from "react-bootstrap";

export default function SearchPage() {
  const { t, i18n } = useTranslation('search');
  const languageReducer = useSelector(state => state.languageReducer);
  
  const isRTL = i18n.language === 'ar';
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  
  useEffect(() => {
    const lang = languageReducer?.language || 'fr';
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [languageReducer?.language, i18n]);

  // 🔹 Estados para filtros de ropa - OPTIMIZADOS
  const [filters, setFilters] = useState({
    subCategory: "",    
    title: "",
    talla: "",
    genero: "",
    color: "",
    marca: "",
    estado: "",
    minPrice: "",
    maxPrice: "",
    latest: false       
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const { auth } = useSelector((state) => state);

  // 🔹 Buscar productos
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const queryParams = new URLSearchParams();
      
      if (filters.subCategory.trim()) queryParams.append('subCategory', filters.subCategory.trim());
      if (filters.title.trim()) queryParams.append('title', filters.title.trim());
      if (filters.talla.trim()) queryParams.append('talla', filters.talla.trim());
      if (filters.genero.trim()) queryParams.append('genero', filters.genero.trim());
      if (filters.color.trim()) queryParams.append('color', filters.color.trim());
      if (filters.marca.trim()) queryParams.append('marca', filters.marca.trim());
      if (filters.estado.trim()) queryParams.append('estado', filters.estado.trim());
      if (filters.minPrice.trim()) queryParams.append('minPrice', filters.minPrice.trim());
      if (filters.maxPrice.trim()) queryParams.append('maxPrice', filters.maxPrice.trim());
      if (filters.latest) queryParams.append('sort', '-createdAt');
      
      const queryString = queryParams.toString();
      const url = `posts${queryString ? `?${queryString}` : ''}`;
      
      const res = await getDataAPI(url, auth.token);
      setResults(res.data.posts || []);
      
    } catch (err) {
      console.error("Error en búsqueda:", err);
      setError(err.response?.data?.message || err.message || t('errors.searchError', 'Erreur de recherche'));
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Buscar últimos productos
  const handleLatestProducts = () => {
    setFilters(prev => ({
      ...prev,
      latest: true,
      subCategory: "",
      title: "",
      talla: "",
      genero: "",
      color: "",
      marca: "",
      estado: "",
      minPrice: "",
      maxPrice: ""
    }));
  };

  useEffect(() => {
    if (filters.latest) {
      handleSearch();
    }
  }, [filters.latest]);

  // 🔹 Manejo de filtros
  const updateFilter = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      latest: false // Desactivar latest cuando se usan otros filtros
    }));
  };

  // 🔹 Limpiar filtros
  const handleClearFilters = () => {
    setFilters({
      subCategory: "",
      title: "",
      talla: "",
      genero: "",
      color: "",
      marca: "",
      estado: "",
      minPrice: "",
      maxPrice: "",
      latest: false
    });
    setResults([]);
    setError(null);
    setShowAdvancedSearch(false);
  };

  // 🔹 Contador de filtros activos
  const activeFiltersCount = [
    filters.subCategory,
    filters.title,
    filters.talla,
    filters.genero,
    filters.color,
    filters.marca,
    filters.estado,
    filters.minPrice,
    filters.maxPrice,
    filters.latest
  ].filter(Boolean).length;

  // 🔥 COMPONENTES DE FORMULARIO DINÁMICOS
  const renderFormComponent = (component, props = {}) => {
    const componentProps = {
      postData: filters,
      handleChangeInput: (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        updateFilter(fieldName, value);
      },
      ...props
    };

    switch (component) {
      case 'CategorySelector':
        return <CategorySelector {...componentProps} />;
      case 'Talla':
        return <Talla {...componentProps} />;
      case 'Genero':
        return <Genero {...componentProps} />;
      case 'Estado':
        return <Estado {...componentProps} />;
      case 'Color':
        return <Color {...componentProps} />;
      case 'Marca':
        return <Marca {...componentProps} />;
      default:
        return null;
    }
  };

  return (
    <Container fluid className="px-0" dir={isRTL ? "rtl" : "ltr"}>
      {/* 🔹 BÚSQUEDA COMPACTA */}
      <Card className="shadow-sm border-0 rounded-0 mb-2">
        <Card.Body className="p-2">
          <Form onSubmit={handleSearch}>
            {/* 🆕 FILA 1: BÚSQUEDA RÁPIDA COMPACTA */}
            <Row className={`g-2 align-items-end ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* BÚSQUEDA POR TEXTO */}
              <Col xl={4} lg={4} md={4} sm={12}>
                <Form.Group>
                  <Form.Label className="small fw-semibold mb-1">
                    {t('labels.productName', 'Qué buscas?')}
                  </Form.Label>
                  <InputGroup size="sm">
                    <Form.Control
                      type="text"
                      placeholder={t('placeholders.searchProducts', 'Buscar productos...')}
                      value={filters.title}
                      onChange={(e) => updateFilter('title', e.target.value)}
                      disabled={loading}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              {/* CATEGORÍA */}
              <Col xl={3} lg={3} md={3} sm={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold mb-1">
                    {t('labels.category', 'Categoría')}
                  </Form.Label>
                  {renderFormComponent('CategorySelector')}
                </Form.Group>
              </Col>

              {/* GÉNERO */}
              <Col xl={2} lg={2} md={2} sm={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold mb-1">
                    {t('labels.gender', 'Género')}
                  </Form.Label>
                  {renderFormComponent('Genero')}
                </Form.Group>
              </Col>

              {/* BOTONES DE ACCIÓN */}
              <Col xl={3} lg={3} md={3} sm={12}>
                <div className={`d-flex gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Button 
                    variant="primary" 
                    onClick={handleSearch}
                    size="sm"
                    disabled={loading}
                    className="flex-fill"
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <i className="fas fa-search"></i>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                    size="sm"
                  >
                    <i className={`fas ${showAdvancedSearch ? 'fa-filter' : 'fa-sliders-h'}`}></i>
                  </Button>

                  {activeFiltersCount > 0 && (
                    <Button 
                      variant="outline-danger" 
                      onClick={handleClearFilters}
                      size="sm"
                    >
                      <i className="fas fa-times"></i>
                    </Button>
                  )}
                </div>
              </Col>
            </Row>

            {/* 🔹 BÚSQUEDA AVANZADA - COLLAPSE COMPACTO */}
            <Collapse in={showAdvancedSearch}>
              <div className="mt-2 pt-2 border-top">
                <Row className={`g-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {/* TALLA */}
                  <Col xl={2} lg={2} md={4} sm={6}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        {t('labels.size', 'Talla')}
                      </Form.Label>
                      {renderFormComponent('Talla')}
                    </Form.Group>
                  </Col>

                  {/* COLOR */}
                  <Col xl={2} lg={2} md={4} sm={6}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        {t('labels.color', 'Color')}
                      </Form.Label>
                      {renderFormComponent('Color')}
                    </Form.Group>
                  </Col>

                  {/* MARCA */}
                  <Col xl={2} lg={2} md={4} sm={6}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        {t('labels.brand', 'Marca')}
                      </Form.Label>
                      {renderFormComponent('Marca')}
                    </Form.Group>
                  </Col>

                  {/* ESTADO */}
                  <Col xl={2} lg={2} md={4} sm={6}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        {t('labels.condition', 'Estado')}
                      </Form.Label>
                      {renderFormComponent('Estado')}
                    </Form.Group>
                  </Col>

                  {/* PRECIO MÍN */}
                  <Col xl={2} lg={2} md={4} sm={6}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        {t('labels.minPrice', 'Precio Min')}
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => updateFilter('minPrice', e.target.value)}
                        size="sm"
                        min="0"
                      />
                    </Form.Group>
                  </Col>

                  {/* PRECIO MÁX */}
                  <Col xl={2} lg={2} md={4} sm={6}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold mb-1">
                        {t('labels.maxPrice', 'Precio Max')}
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => updateFilter('maxPrice', e.target.value)}
                        size="sm"
                        min={filters.minPrice || "0"}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* BOTÓN ÚLTIMOS PRODUCTOS */}
                <Row className="mt-2">
                  <Col>
                    <Button 
                      variant="outline-info" 
                      onClick={handleLatestProducts}
                      size="sm"
                      disabled={filters.latest}
                      className="w-100"
                    >
                      <i className="fas fa-clock me-1"></i>
                      {t('buttons.latestProducts', 'Ver últimos productos')}
                    </Button>
                  </Col>
                </Row>
              </div>
            </Collapse>

            {/* 🔹 FILTROS ACTIVOS COMPACTO */}
            {activeFiltersCount > 0 && (
              <div className="mt-2 pt-2 border-top">
                <div className={`d-flex align-items-center flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <small className={`text-muted ${isRTL ? "ms-2" : "me-2"}`}>
                    <strong>{activeFiltersCount}</strong> {t('labels.filtersActive', 'filtros activos')}:
                  </small>
                  
                  {filters.subCategory && (
                    <Badge bg="info" className={isRTL ? "ms-1 mb-1" : "me-1 mb-1"}>
                      Cat: {filters.subCategory}
                    </Badge>
                  )}
                  {filters.title && (
                    <Badge bg="primary" className={isRTL ? "ms-1 mb-1" : "me-1 mb-1"}>
                      {filters.title}
                    </Badge>
                  )}
                  {filters.talla && (
                    <Badge bg="warning" className={isRTL ? "ms-1 mb-1" : "me-1 mb-1"}>
                      Talla: {filters.talla}
                    </Badge>
                  )}
                  {filters.genero && (
                    <Badge bg="info" className={isRTL ? "ms-1 mb-1" : "me-1 mb-1"}>
                      {filters.genero}
                    </Badge>
                  )}
                  {filters.latest && (
                    <Badge bg="secondary" className={isRTL ? "ms-1 mb-1" : "me-1 mb-1"}>
                      Últimos
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>

      {/* 🔹 CONTENIDO PRINCIPAL - MÁXIMO ESPACIO PARA POSTS */}
      <Container fluid className="px-0">
        {/* 🔹 Indicadores de Resultados COMPACTOS */}
        {results.length > 0 && (
          <Alert variant="info" className="py-2 px-3 d-flex align-items-center mb-2">
            <i className={`fas fa-info-circle ${isRTL ? "ms-2" : "me-2"} fs-6`}></i>
            <small className="fw-semibold">
              <strong>{results.length}</strong> {t('results.resultsFound', 'productos encontrados')}
            </small>
          </Alert>
        )}

        {error && (
          <Alert variant="danger" className="py-2 px-3 d-flex align-items-center mb-2">
            <i className={`fas fa-exclamation-triangle ${isRTL ? "ms-2" : "me-2"} fs-6`}></i>
            <small>{error}</small>
          </Alert>
        )}

        {/* 🔹 Lista de Posts - MÁXIMO ESPACIO */}
        <div>
          {loading ? (
            <Card className="text-center border-0">
              <Card.Body className="p-4">
                <img src={LoadIcon} alt="loading" width="40" className="mb-2" />
                <h6 className="text-muted mb-1">{t('states.searching', 'Buscando...')}</h6>
              </Card.Body>
            </Card>
          ) : (
            <Posts posts={results.length > 0 ? results : null} filters={filters} />
          )}
        </div>
      </Container>
    </Container>
  );
}