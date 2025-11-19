import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';

// 🔷 REDUX Y DATOS
import { createPost, updatePost } from '../redux/actions/postAction';

// 🔷 IMPORTS OPTIMIZADOS - ORGANIZADOS POR ORDEN DE USO
// 1. CATEGORÍA Y SUBCATEGORÍA (PRIMEROS)
import CategorySelector from '../components/forms/vetements/CategorySelector';
 
// 2. TÍTULO Y DESCRIPCIÓN
import Title from '../components/forms/vetements/Title';
import Description from '../components/forms/vetements/Description';

// 3. COMPONENTES DE CARACTERÍSTICAS DEL PRODUCTO
import Talla from '../components/forms/vetements/Talla';
import Genero from '../components/forms/vetements/Genero';
import Estado from '../components/forms/vetements/Estado';
import Color from '../components/forms/vetements/Color';
import TemporadaDeUso from '../components/forms/vetements/TemporadaDeUso';
import Marca from '../components/forms/vetements/Marca';
import MaterialProducto from '../components/forms/vetements/MaterialProducto';

// 4. COMPONENTES ESPECÍFICOS POR CATEGORÍA
import Bebe from '../components/forms/vetements/Bebe';
import Bijoux from '../components/forms/vetements/Bijoux';
import ChaussureFemme from '../components/forms/vetements/ChaussureFemme';
import ChaussureHome from '../components/forms/vetements/ChaussureHome';
import Filles from '../components/forms/vetements/Filles';
import Garcons from '../components/forms/vetements/Garcons';
import Lunettes from '../components/forms/vetements/Lunettes';
import Montres from '../components/forms/vetements/Montres';
import SacsValises from '../components/forms/vetements/SacsValises';
import TennueProfesionelle from '../components/forms/vetements/TennueProfesionelle';
import VetementsFemme from '../components/forms/vetements/VetementsFemme';
import VetementsHomme from '../components/forms/vetements/VetementsHomme';

// 5. COMPONENTES DE PRECIO Y VENTA (ANTES DE LAS IMÁGENES)
import Price from '../components/forms/vetements/Price';
import TipoMoneda from '../components/forms/vetements/TipoMoneda';
import TipoVenta from '../components/forms/vetements/TipoVenta';

// 6. COMPONENTE DE IMÁGENES (EL ÚLTIMO)
import ImageUpload from '../components/forms/vetements/ImageUpload';
import Contact from '../components/forms/vetements/Contact';

const getInitialState = () => ({
  // 1. CATEGORÍA/SUBCATEGORÍA (PRIMEROS)
  category: "Tassili Fashion",
  subCategory: "",

  // 2. TÍTULO Y DESCRIPCIÓN
  title: "",
  description: "",
  content: "",

  // 3. CARACTERÍSTICAS GENERALES DEL PRODUCTO
  // Talla y arrays
  talla: [],
  color: [],

  // Bebés
  edadBebes: "",

  // Bijoux
  tipoMaterialBijoux: "",
  tipoPiedra: "",

  // Zapatos mujer
  alturaTacon: "",
  tipoDeCierre: "",
  formaDePunta: "",

  // Zapatos hombres
  tipoDeSuela: "",
  tipoDeCierreHombre: "",

  // Color y temporada
  temporada: "",
  tipocolor: "",
  ocasion: "",

  // Estilo
  estilo: "",

  // Género y estado
  genero: "",
  etat: "",

  // Gafas
  anchoPuente: "",
  longitudPatilla: "",

  // Marca y material
  marca: "",
  material: "",

  // Relojes
  tiporeloj: "",
  movimientoReloj: "",
  materialCorrea: "",
  resistenciaAgua: "",
  funcionalidades: "",

  // Sacvalise
  tipoSangle: "",
  correa: "",
  tallaSaco: "",

  // Profesionales
  tipoDeLabata: "",
  sectorDeTrabajo: "",

  // 4. PRECIO Y VENTA (ANTES DE LAS IMÁGENES)
  price: "",
  tipodemoneda: "",
  tipoventa: "",
  contact: "",
  // 5. IMÁGENES (ÚLTIMAS)
  images: [],
});

const Createpost = () => {
  const { auth, theme, languageReducer} = useSelector((state) => state);
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

  // ✅ CARGAR DATOS MEJORADO - SOLO UNA VEZ
  useEffect(() => {
    if (isEdit) {
      if (postToEdit) {
        // Caso 1: Tenemos postData del state
        console.log('📥 Cargando desde postToEdit:', postToEdit._id);
        loadPostData(postToEdit);
      } else if (id) {
        // Caso 2: Tenemos ID pero no postData - cargar desde API
        console.log('🔄 ID disponible pero sin postData, cargando...');
        loadPostFromAPI(id);
      } else {
        console.log('❌ Modo edición pero sin ID ni datos');
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
        images: Array.isArray(sanitizedData.images) ? sanitizedData.images : [],
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

      console.log('✅ Datos cargados correctamente:', finalPostData.title);
    } catch (error) {
      console.error('❌ Error cargando datos:', error);
      showAlertMessage('Error al cargar los datos del post', 'danger');
    }
  };

  const loadPostFromAPI = async (postId) => {
    try {
      // Aquí deberías tener una acción Redux para obtener el post por ID
      console.log('📡 Cargando post desde API con ID:', postId);
      showAlertMessage('Cargando datos del post...', 'info');
      
      // Ejemplo de cómo cargar desde API:
      // await dispatch(getPostById(postId));
      // El post cargado debería estar en el estado de Redux
      
    } catch (error) {
      console.error('Error cargando post:', error);
      showAlertMessage('Error al cargar el post desde el servidor', 'danger');
    }
  };

  const sanitizePostData = useCallback((data) => {
    if (!data) return {};
    
    // Limpiar y normalizar los datos
    const cleanData = { ...data };
    
    // Asegurar que los arrays estén inicializados
    if (!Array.isArray(cleanData.talla)) cleanData.talla = [];
    if (!Array.isArray(cleanData.color)) cleanData.color = [];
    if (!Array.isArray(cleanData.images)) cleanData.images = [];
    
    return cleanData;
  }, []);

  const showAlertMessage = useCallback((message, variant) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  }, []);

  const handleChangeInput = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }, []);

  const handleChangeImages = useCallback((e) => {
    const files = [...e.target.files];
    let err = "";
    const newImages = [];

    files.forEach(file => {
      if (!file) err = t('validation_images_required');
      else if (file.size > 5 * 1024 * 1024) err = t('validation_images_size');
      else newImages.push(file);
    });

    if (err) {
      showAlertMessage(err, "danger");
      return;
    }

    setImages(prev => [...prev, ...newImages]);
  }, [t, showAlertMessage]);

  const deleteImages = useCallback((index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validaciones
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

    try {
      const actionData = {
        postData: {
          ...postData,
          price: Number(postData.price) || 0
        },
        images,
        auth,
      };

      // Para edición, agregar el ID del post
      if (isEdit) {
        const postId = postToEdit?._id || id;
        if (!postId) {
          throw new Error('ID del post no disponible para edición');
        }
        actionData.status = { _id: postId };
      }

      console.log('📤 Enviando datos:', {
        isEdit,
        postId: postToEdit?._id || id,
        actionData
      });

      if (isEdit) {
        await dispatch(updatePost(actionData));
        showAlertMessage(t('success_update') || 'Post actualizado correctamente', "success");
      } else {
        await dispatch(createPost(actionData));
        showAlertMessage(t('success_create') || 'Post creado correctamente', "success");
      }

      setTimeout(() => history.push('/'), 2000);

    } catch (error) {
      console.error('❌ Error en submit:', error);
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

  // 1. CATEGORÍA Y SUBCATEGORÍA (PRIMEROS)
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
      <Talla postData={postData} handleChangeInput={handleChangeInput} />
      <Genero postData={postData} handleChangeInput={handleChangeInput} />
      <Estado postData={postData} handleChangeInput={handleChangeInput} />
      <Color postData={postData} handleChangeInput={handleChangeInput} />
      <TemporadaDeUso postData={postData} handleChangeInput={handleChangeInput} />
      <Marca postData={postData} handleChangeInput={handleChangeInput} />
      <MaterialProducto postData={postData} handleChangeInput={handleChangeInput} />


      
    </div>
  ), [postData, handleChangeInput]);

  // 5. PRECIO Y VENTA (ANTES DE IMÁGENES)
  const PriceSection = useMemo(() => (
    <div className="px-2">
      <Price postData={postData} handleChangeInput={handleChangeInput} />
      <TipoMoneda postData={postData} handleChangeInput={handleChangeInput} />
      <TipoVenta postData={postData} handleChangeInput={handleChangeInput} />
      <Contact postData={postData} handleChangeInput={handleChangeInput} />
    </div>
  ), [postData, handleChangeInput]);

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
            <Card.Body className="p-0">
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Createpost;