// Createpost.js - VERSIÓN CORREGIDA
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Alert, Form, Button } from 'react-bootstrap';
import { checkImage } from '../utils/imageUpload';

// 🔷 REDUX
import { createPost, updatePost } from '../redux/actions/postAction';

// 🔷 COMPONENTES DE CATEGORÍAS (IMPORTS DINÁMICOS)
import IndexVetement from '../components/forms/vetements/IndexVetement';
import IndexTelefonos from '../components/forms/Telephone/IndexTelefonos';  // ✅ IMPORTAR

// 🎯 CONFIGURACIÓN ESCALABLE
const GENERAL_CATEGORIES = [
  { 
    value: "vetements", 
    label: "👕 Ropa y Moda", 
    description: "Vestimenta, calzado, accesorios de moda",
    available: true,
    component: IndexVetement
  },
  { 
    value: "telephones",  // ✅ CAMBIADO de "telefonos" a "telephones"
    label: "📱 Teléfonos y Tecnología", 
    description: "Smartphones, tablets, accesorios tecnológicos",
    available: true,
    component: IndexTelefonos
  },
  { 
    value: "vehicules", 
    label: "🚗 Vehículos", 
    description: "Coches, motos, bicicletas, repuestos",
    available: false,
    component: null
  }
];

const DEFAULT_VALUES = {
  PHONE: "0658556296",
};

// ✅ ESTADO INICIAL - CAMPOS COMUNES PARA TODAS LAS CATEGORÍAS
const getInitialState = () => ({
  category: "",
  subCategory: "",
  title: "",
  description: "",
  content: "",
  price: "",
  tipodemoneda: "MAD",
  tipoventa: "fixed",
  telefono: DEFAULT_VALUES.PHONE,
});

const Createpost = () => {
  // 🔷 REDUX Y HOOKS
  const { auth, theme, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { t, i18n } = useTranslation('categories');

  const isEdit = location.state?.isEdit || false;
  const postToEdit = location.state?.postData || null;
  const isRTL = i18n.language === 'ar';

  // ✅ ESTADO - SOLO CAMPOS COMUNES
  const [postData, setPostData] = useState(getInitialState);
  const [images, setImages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalCategory, setGeneralCategory] = useState("");

  // ✅ EFFECT PARA CARGA - CORREGIDO
  useEffect(() => {
    if (isEdit && postToEdit) {
      console.log('🔄 Cargando edición:', postToEdit);
      
      // ✅ DETECTAR CATEGORÍA ORIGINAL DEL POST
      const originalCategory = postToEdit.category || "vetements";
      
      // ✅ CORRECCIÓN ESPECÍFICA POR CATEGORÍA
      const correctedData = {
        ...getInitialState(),
        ...postToEdit,
        category: originalCategory, // ✅ RESPETAR CATEGORÍA ORIGINAL
        subCategory: postToEdit.subCategory || postToEdit.category || "",
        description: postToEdit.description || postToEdit.content || "",
        title: postToEdit.title || "",

        // Campos de ubicación
        wilaya: postToEdit.wilaya || "",
        commune: postToEdit.commune || "",
        telefono: postToEdit.telefono || DEFAULT_VALUES.PHONE,
      };

      setPostData(correctedData);
      setGeneralCategory(originalCategory); // ✅ USAR CATEGORÍA ORIGINAL

      // Imágenes existentes
      if (postToEdit.images?.length > 0) {
        const existingImages = postToEdit.images.map((img, index) => ({
          url: typeof img === 'string' ? img : img?.url,
          file: null,
          isExisting: true,
          name: `existing-${index}-${Date.now()}`
        })).filter(img => img.url);
        setImages(existingImages);
      }
    } else {
      setPostData(getInitialState());
      setGeneralCategory("");
      setImages([]);
    }
  }, [isEdit, postToEdit]);

  // ✅ HANDLERS COMUNES - SIMPLIFICADOS
  const handleChangeInput = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }, []);

  const handleGeneralCategorySelect = (categoryValue) => {
    setGeneralCategory(categoryValue);
    setPostData(prev => ({
      ...prev,
      category: categoryValue,
      subCategory: "" // Reset al cambiar categoría
    }));
  };

  const handlePhoneChange = useCallback((phoneValue) => {
    setPostData(prev => ({
      ...prev,
      telefono: phoneValue || DEFAULT_VALUES.PHONE
    }));
  }, []);

  // ✅ MANEJO DE IMÁGENES
  const handleChangeImages = useCallback((e) => {
    const files = [...e.target.files];
    if (files.length === 0) return;

    const error = checkImage(files, images.length);
    if (error) {
      showAlertMessage(error, 'warning');
      return;
    }

    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      isExisting: false,
      name: file.name
    }));

    setImages(prev => [...prev, ...newImages]);
  }, [images.length]);

  const deleteImages = useCallback((index) => {
    setImages(prev => {
      const newImages = [...prev];
      const removedImage = newImages.splice(index, 1)[0];
      if (removedImage && !removedImage.isExisting && removedImage.url) {
        URL.revokeObjectURL(removedImage.url);
      }
      return newImages;
    });
  }, []);

  // ✅ HANDLE SUBMIT - GENÉRICO PARA TODAS LAS CATEGORÍAS
  const handleSubmit = useCallback(async (e, categorySpecificData = null) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    // ✅ VALIDACIONES BÁSICAS
    if (images.length === 0) {
      showAlertMessage("Por favor agrega al menos una foto.", "danger");
      setIsSubmitting(false);
      return;
    }

    if (!postData.title || !postData.price) {
      showAlertMessage("Título y precio son requeridos.", "danger");
      setIsSubmitting(false);
      return;
    }

    if (!postData.subCategory) {
      showAlertMessage("Selecciona una subcategoría.", "danger");
      setIsSubmitting(false);
      return;
    }

    try {
      // ✅ COMBINAR DATOS DE FORMA GENÉRICA
      const finalPostData = {
        ...postData,
        ...(categorySpecificData || {}),
        content: postData.description || postData.content || '',
      };

      const actionData = {
        postData: finalPostData,
        images,
        auth,
        ...(isEdit && postToEdit && { status: { _id: postToEdit._id, ...postToEdit } }),
        ...(!isEdit && { socket })
      };

      if (isEdit) {
        await dispatch(updatePost(actionData));
        showAlertMessage('Producto actualizado correctamente!', "success");
      } else {
        await dispatch(createPost(actionData));
        showAlertMessage('Producto creado correctamente!', "success");
      }

      setTimeout(() => history.push('/'), 2000);

    } catch (error) {
      console.error('❌ Error:', error);
      showAlertMessage(
        error.response?.data?.msg || error.message || 'Error en la publicación',
        "danger"
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [postData, images, auth, isEdit, postToEdit, socket, dispatch, history, isSubmitting]);

  const showAlertMessage = useCallback((message, variant = "info") => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  }, []);

  // ✅ SELECTOR DE CATEGORÍA GENERAL - REUTILIZABLE
  const GeneralCategorySelector = () => (
    <Card className="border-0 shadow-sm mb-4">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">📁 ¿Qué quieres publicar?</h5>
        <small className="opacity-75">Selecciona la categoría principal</small>
      </Card.Header>
      <Card.Body>
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold fs-6">Categoría Principal *</Form.Label>
          <Form.Select 
            value={generalCategory} 
            onChange={(e) => handleGeneralCategorySelect(e.target.value)}
            size="lg"
            className="border-2"
          >
            <option value="">-- Selecciona una categoría --</option>
            {GENERAL_CATEGORIES.map((cat) => (
              <option 
                key={cat.value} 
                value={cat.value}
                disabled={!cat.available}
              >
                {cat.label} {!cat.available && '(Próximamente)'}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Row className="g-3 mt-3">
          {GENERAL_CATEGORIES.map((cat) => (
            <Col xs={12} md={6} lg={4} key={cat.value}>
              <Card 
                className={`h-100 cursor-pointer border-2 ${
                  generalCategory === cat.value 
                    ? 'border-primary bg-primary text-white' 
                    : !cat.available
                    ? 'border-light bg-light text-muted'
                    : 'border-light'
                }`}
                onClick={() => cat.available && handleGeneralCategorySelect(cat.value)}
                style={{ 
                  cursor: cat.available ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s',
                  opacity: cat.available ? 1 : 0.6
                }}
              >
                <Card.Body className="text-center p-3">
                  <div className="fs-2 mb-2">{cat.label.split(' ')[0]}</div>
                  <h6 className="mb-1">{cat.label}</h6>
                  <small>{cat.description}</small>
                  {!cat.available && (
                    <div className="mt-2">
                      <span className="badge bg-warning text-dark">Próximamente</span>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );

  // ✅ RENDER DINÁMICO DE FORMULARIOS - ESCALABLE
  const renderCategoryForm = () => {
    if (!generalCategory) {
      return <GeneralCategorySelector />;
    }

    const selectedCategory = GENERAL_CATEGORIES.find(cat => cat.value === generalCategory);
    
    if (!selectedCategory || !selectedCategory.available) {
      return (
        <Card className="text-center border-0 bg-light">
          <Card.Body className="py-5">
            <div className="fs-1 mb-3">🚧</div>
            <h4>Categoría no disponible</h4>
            <p className="text-muted">Esta categoría estará disponible pronto</p>
            <Button 
              variant="outline-primary" 
              onClick={() => handleGeneralCategorySelect("")}
            >
              ← Volver a categorías
            </Button>
          </Card.Body>
        </Card>
      );
    }

    // ✅ PROPS COMUNES PARA TODOS LOS COMPONENTES
    const commonProps = {
      postData,
      handleChangeInput,
      handlePhoneChange,
      images,
      handleChangeImages,
      deleteImages,
      theme,
      isRTL,
      handleSubmit,
      isSubmitting,
      isEdit,
      t,
      editData: isEdit ? postToEdit : null
    };

    // ✅ RENDER COMPONENTE ESPECÍFICO DE CATEGORÍA
    const CategoryComponent = selectedCategory.component;
    
    // ✅ DEBUG: Mostrar qué categoría se está cargando
    console.log(`🔍 Cargando componente para categoría: ${generalCategory}`);
    console.log(`📱 Post data category: ${postData.category}`);
    console.log(`🎯 Componente a renderizar: ${CategoryComponent?.name || 'No encontrado'}`);
    
    return CategoryComponent ? <CategoryComponent {...commonProps} /> : (
      <Card className="border-0 shadow-sm">
        <Card.Body className="text-center py-5">
          <div className="fs-1 mb-3">⚠️</div>
          <h4>Componente no encontrado</h4>
          <p className="text-muted">
            El formulario para la categoría "{generalCategory}" no está disponible.
          </p>
          <Button 
            variant="outline-primary" 
            onClick={() => handleGeneralCategorySelect("")}
          >
            ← Volver a categorías
          </Button>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container fluid className="p-2" dir={isRTL ? "rtl" : "ltr"}>
      <Row className="g-0">
        <Col xs={12}>
          {/* HEADER */}
          <Card className="border-0 rounded-0">
            <Card.Header className={`${isEdit ? "bg-warning text-dark" : "bg-primary text-white"} ps-3`}>
              <Row className="align-items-center g-0">
                <Col>
                  <h2 className="mb-1 fs-6">
                    {isEdit ? 'Editar Publicación' : 'Crear Nueva Publicación'}
                  </h2>
                  {isEdit && postData.title && (
                    <p className="mb-0 opacity-75 small">
                      Editando: "{postData.title}" 
                      <span className="ms-2 badge bg-secondary">
                        {generalCategory === 'vetements' ? '👕 Ropa' : 
                         generalCategory === 'telephones' ? '📱 Teléfonos' : 
                         generalCategory}
                      </span>
                    </p>
                  )}
                </Col>
                {generalCategory && (
                  <Col xs="auto">
                    <Button 
                      variant="outline-light" 
                      size="sm"
                      onClick={() => handleGeneralCategorySelect("")}
                    >
                      🔄 Cambiar Categoría
                    </Button>
                  </Col>
                )}
              </Row>
            </Card.Header>
          </Card>

          {/* ALERTS */}
          {showAlert && (
            <Alert variant={alertVariant} dismissible onClose={() => setShowAlert(false)} 
                   className="mb-0 rounded-0 border-0">
              <Alert.Heading className="fs-6">
                {alertVariant === "success" ? "✅ Éxito" :
                 alertVariant === "warning" ? "⚠️ Advertencia" :
                 alertVariant === "danger" ? "❌ Error" : "ℹ️ Info"}
              </Alert.Heading>
              {alertMessage}
            </Alert>
          )}

          {/* FORMULARIO PRINCIPAL */}
          <Card className="shadow-none border-0 rounded-0">
            <Card.Body className="p-0">
              {renderCategoryForm()}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Createpost;