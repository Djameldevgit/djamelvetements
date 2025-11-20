import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';

// 🔷 REDUX Y DATOS
import { createPost, updatePost } from '../redux/actions/postAction';

// 🔷 IMPORTS OPTIMIZADOS - ORGANIZADOS POR ORDEN DE USO
// ... (tus imports existentes)

// 🎯 CONFIGURACIÓN DE VALORES POR DEFECTO
const DEFAULT_VALUES = {
  PHONE: "0658556296",
  // Puedes agregar más valores por defecto aquí
};

const getInitialState = () => ({
  // 1. CATEGORÍA/SUBCATEGORÍA (PRIMEROS)
  category: "Tassili Fashion",
  subCategory: "",

  // 2. TÍTULO Y DESCRIPCIÓN
  title: "",
  description: "",
  content: "",

  // 3. CARACTERÍSTICAS GENERALES DEL PRODUCTO
  talla: [],
  color: [],

  // ... (tus otros campos existentes)

  // 4. PRECIO Y VENTA (ANTES DE LAS IMÁGENES)
  price: "",
  tipodemoneda: "",
  tipoventa: "",
  telefono: DEFAULT_VALUES.PHONE, // ✅ TELÉFONO POR DEFECTO

  // 5. IMÁGENES (ÚLTIMAS)
  images: [],
});

// 🎯 FUNCIONES DE UTILIDAD SEGURAS (mantén las existentes)
const safeArray = (potentialArray) => {
  if (!potentialArray) return [];
  if (Array.isArray(potentialArray)) return potentialArray;
  if (typeof potentialArray === 'string') {
    return potentialArray.split(',').map(s => s.trim()).filter(Boolean);
  }
  return [];
};

const safeIncludes = (array, value) => {
  const safeArrayValue = safeArray(array);
  return safeArrayValue.includes(value);
};

const Createpost = () => {
  const { auth, theme, languageReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const { t, i18n } = useTranslation('categories');

  const isEdit = location.state?.isEdit || false;
  const postToEdit = location.state?.postData || null;
  const isRTL = i18n.language === 'ar';

  const [postData, setPostData] = useState(getInitialState);
  const [images, setImages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("info");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Configurar idioma
  useEffect(() => {
    const lang = languageReducer?.language || 'fr';
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [languageReducer?.language, i18n]);

  // ✅ CARGAR DATOS MEJORADO - MANTENER TELÉFONO POR DEFECTO EN EDICIÓN
  useEffect(() => {
    if (isEdit) {
      if (postToEdit) {
        loadPostData(postToEdit);
      } else if (id) {
        loadPostFromAPI(id);
      } else {
        showAlertMessage('No se encontraron datos para editar', 'danger');
        setTimeout(() => history.push('/'), 2000);
      }
    }
  }, [isEdit, postToEdit, id]);

  const loadPostData = (postData) => {
    try {
      const sanitizedData = sanitizePostData(postData);
      const finalPostData = {
        ...getInitialState(),
        ...sanitizedData,
        category: sanitizedData.category || "Tassili Fashion",
        subCategory: sanitizedData.subCategory || "",
        description: sanitizedData.description || sanitizedData.content || "",
        title: sanitizedData.title || "",
        talla: safeArray(sanitizedData.talla),
        color: safeArray(sanitizedData.color),
        images: safeArray(sanitizedData.images),
        // ✅ Mantener teléfono existente o usar por defecto
        telefono: sanitizedData.telefono || DEFAULT_VALUES.PHONE,
      };

      setPostData(finalPostData);

      // Cargar imágenes existentes
      if (postData.images?.length > 0) {
        const existingImages = postData.images
          .map(img => {
            if (typeof img === 'string') return { url: img, file: null, isExisting: true };
            if (img?.url) return { ...img, file: null, isExisting: true };
            return null;
          })
          .filter(Boolean);
        setImages(existingImages);
      } else {
        setImages([]);
      }
    } catch (error) {
      showAlertMessage('Error al cargar los datos del post', 'danger');
    }
  };

  // ... (mantén tus otras funciones existentes: loadPostFromAPI, sanitizePostData, showAlertMessage)

  // 🎯 MANEJO DE CAMPOS STRING (MEJORADO PARA TELÉFONO)
  const handleChangeInput = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    setPostData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }, []);

  // 🎯 MANEJO ESPECÍFICO PARA TELÉFONO
  const handlePhoneChange = useCallback((phoneValue) => {
    setPostData(prev => ({
      ...prev,
      telefono: phoneValue || DEFAULT_VALUES.PHONE
    }));
  }, []);

  // ... (mantén tus otras funciones: handleArrayChange, handleChangeImages, deleteImages)

  // 🎯 HANDLE SUBMIT MEJORADO - VALIDAR TELÉFONO
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validaciones básicas
    if (!postData.subCategory) {
      showAlertMessage(t('validation_category_required'), "danger");
      setIsSubmitting(false);
      return;
    }

    if (images.length === 0) {
      showAlertMessage(t('validation_images_required'), "danger");
      setIsSubmitting(false);
      return;
    }

    if (!postData.title || !postData.price) {
      showAlertMessage('Título y precio son requeridos', "danger");
      setIsSubmitting(false);
      return;
    }

    // ✅ Validación opcional de teléfono
    if (!postData.telefono || postData.telefono.trim() === '') {
      // Usar teléfono por defecto si está vacío
      setPostData(prev => ({
        ...prev,
        telefono: DEFAULT_VALUES.PHONE
      }));
    }

    try {
      const safePostData = {
        ...postData,
        talla: safeArray(postData.talla),
        color: safeArray(postData.color),
        images: safeArray(postData.images),
        price: Number(postData.price) || 0,
        telefono: postData.telefono || DEFAULT_VALUES.PHONE // ✅ Asegurar teléfono
      };

      const actionData = {
        postData: safePostData,
        images,
        auth,
      };

      if (isEdit) {
        const postId = postToEdit?._id || id;
        if (!postId) {
          throw new Error('ID del post no disponible para edición');
        }
        actionData.status = { _id: postId };
      }

      if (isEdit) {
        await dispatch(updatePost(actionData));
        showAlertMessage(t('success_update') || 'Post actualizado correctamente', "success");
      } else {
        await dispatch(createPost(actionData));
        showAlertMessage(t('success_create') || 'Post creado correctamente', "success");
      }

      setTimeout(() => history.push('/'), 2000);

    } catch (error) {
      showAlertMessage(
        error.response?.data?.msg || 
        error.message || 
        t('error_publication') || 
        'Error en la publicación', 
        "danger"
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [postData, images, auth, isEdit, postToEdit, id, dispatch, history, t, showAlertMessage]);

  // ✅ COMPONENTES ORGANIZADOS EN EL ORDEN SOLICITADO

  // 1. CATEGORÍA Y SUBCATEGORÍA
  const CategorySection = useMemo(() => (
    <div className="px-2">
      <CategorySelector postData={postData} handleChangeInput={handleChangeInput} />
    </div>
  ), [postData, handleChangeInput]);

  // 2. TÍTULO Y DESCRIPCIÓN
  const TitleDescriptionSection = useMemo(() => (
    <div className="px-2">
      <Title postData={postData} handleChangeInput={handleChangeInput} />
      <Description postData={postData} handleChangeInput={handleChangeInput} />
    </div>
  ), [postData, handleChangeInput]);

  // 3. COMPONENTES ESPECÍFICOS POR SUBCATEGORÍA
  const SpecificCategorySection = useMemo(() => {
    if (!postData.subCategory) return null;

    const components = {
      "VetementsHomme": <VetementsHomme postData={postData} handleChangeInput={handleChangeInput} />,
      "VetementsFemme": <VetementsFemme postData={postData} handleChangeInput={handleChangeInput} />,
      "ChaussuresHomme": <ChaussureHome postData={postData} handleChangeInput={handleChangeInput} />,
      "ChaussuresFemme": <ChaussureFemme postData={postData} handleChangeInput={handleChangeInput} />,
      "Montres": <Montres postData={postData} handleChangeInput={handleChangeInput} />,
      "Lunettes": <Lunettes postData={postData} handleChangeInput={handleChangeInput} />,
      "Bijoux": <Bijoux postData={postData} handleChangeInput={handleChangeInput} />,
      "Garcons": <Garcons postData={postData} handleChangeInput={handleChangeInput} />,
      "Filles": <Filles postData={postData} handleChangeInput={handleChangeInput} />,
      "Bebe": <Bebe postData={postData} handleChangeInput={handleChangeInput} />,
      "TennueProfesionelle": <TennueProfesionelle postData={postData} handleChangeInput={handleChangeInput} />,
      "SacsValises": <SacsValises postData={postData} handleChangeInput={handleChangeInput} />
    };

    return components[postData.subCategory] || null;
  }, [postData.subCategory, postData, handleChangeInput]);

  // 4. CARACTERÍSTICAS GENERALES DEL PRODUCTO
  const ProductFeaturesSection = useMemo(() => (
    <div className="px-2">
      <Talla postData={postData} handleArrayChange={handleArrayChange} />
      <Genero postData={postData} handleChangeInput={handleChangeInput} />
      <Estado postData={postData} handleChangeInput={handleChangeInput} />
      <Color postData={postData} handleArrayChange={handleArrayChange} />
      <TemporadaDeUso postData={postData} handleChangeInput={handleChangeInput} />
      <Marca postData={postData} handleChangeInput={handleChangeInput} />
      <MaterialProducto postData={postData} handleChangeInput={handleChangeInput} />
    </div>
  ), [postData, handleChangeInput, handleArrayChange]);

  // 5. PRECIO Y VENTA (CON TELÉFONO POR DEFECTO)
  const PriceSection = useMemo(() => (
    <div className="px-2">
      <Price postData={postData} handleChangeInput={handleChangeInput} />
      <TipoMoneda postData={postData} handleChangeInput={handleChangeInput} />
      <TipoVenta postData={postData} handleChangeInput={handleChangeInput} />
      <Contact 
        postData={postData} 
        handleChangeInput={handlePhoneChange} // ✅ Pasar función específica
      />
    </div>
  ), [postData, handleChangeInput, handlePhoneChange]);

  // 6. IMÁGENES (ÚLTIMAS)
  const ImageSection = useMemo(() => (
    <div className="px-2">
      <ImageUpload
        images={images}
        handleChangeImages={handleChangeImages}
        deleteImages={deleteImages}
        theme={theme}
      />
    </div>
  ), [images, handleChangeImages, deleteImages, theme]);

  return (
    <Container fluid className="p-2" dir={isRTL ? "rtl" : "ltr"}>
      <Row className="g-0">
        <Col xs={12}>
          <Card className="border-0 rounded-0">
            <Card.Header className={`${isEdit ? "bg-warning text-dark" : "bg-primary text-white"} ps-3`}>
              <Row className="align-items-center g-0">
                <Col>
                  <h2 className="mb-1 fs-6">
                    {isEdit ? t('edit_title', 'Modifier la Publication') : t('create_title', 'Créer une Nouvelle Publication')}
                  </h2>
                  {isEdit && postData.title && (
                    <p className="mb-0 opacity-75 small">
                      {t('modification', 'Modification de')}: "{postData.title}"
                    </p>
                  )}
                </Col>
              </Row>
            </Card.Header>
          </Card>

          {showAlert && (
            <Alert variant={alertVariant} dismissible onClose={() => setShowAlert(false)} className="mb-0 rounded-0 border-0">
              <Alert.Heading className="fs-6">
                {alertVariant === "success" ? "✅ Success" : "⚠️ Error"}
              </Alert.Heading>
              {alertMessage}
            </Alert>
          )}

          <Card className="shadow-none border-0 rounded-0">
            <Form onSubmit={handleSubmit} className="p-0">

              {/* 1. CATEGORÍA Y SUBCATEGORÍA */}
              {CategorySection}

              {postData.subCategory && (
                <>
                  {/* 2. TÍTULO Y DESCRIPCIÓN */}
                  {TitleDescriptionSection}

                  {/* 3. COMPONENTES ESPECÍFICOS POR CATEGORÍA */}
                  {SpecificCategorySection}

                  {/* 4. CARACTERÍSTICAS GENERALES DEL PRODUCTO */}
                  {ProductFeaturesSection}

                  {/* 5. PRECIO Y VENTA */}
                  {PriceSection}

                  {/* 6. IMÁGENES */}
                  {ImageSection}

                  {/* BOTONES DE ACCIÓN */}
                  <div className="px-2">
                    <Row className={`g-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Col xs={8}>
                        <div className="d-grid gap-1">
                          <Button
                            variant={isEdit ? "warning" : "success"}
                            type="submit"
                            size="lg"
                            className="fw-bold py-2"
                            disabled={isSubmitting}
                          >
                            <FaSave className="me-2" />
                            {isSubmitting ? 'Cargando...' : 
                              (isEdit ? t('button_update', 'Mettre à jour') : t('button_publish', 'Publier'))}
                          </Button>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <Button
                          variant="outline-secondary"
                          size="lg"
                          className="w-100 py-2"
                          onClick={() => history.goBack()}
                          disabled={isSubmitting}
                        >
                          <FaTimes className="me-2" />
                          {t('common.cancel', 'Annuler')}
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </>
              )}

              {!postData.subCategory && (
                <Card className="text-center border-0 bg-light">
                  <Card.Body className="py-4">
                    <div className="fs-1 mb-2">🏁</div>
                    <h5 className="text-muted fs-6">
                      {t('select_category_first', 'Selecciona una categoría para continuar')}
                    </h5>
                  </Card.Body>
                </Card>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Createpost;