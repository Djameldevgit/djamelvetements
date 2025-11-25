import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';
 import { checkImage } from '../utils/imageUpload';

// 🔷 REDUX Y DATOS
import { createPost, updatePost } from '../redux/actions/postAction';

// 🔷 IMPORTS OPTIMIZADOS - TODOS LOS COMPONENTES
import CategorySelector from '../components/forms/vetements/CategorySelector';
import Title from '../components/forms/vetements/Title';
import Description from '../components/forms/vetements/Description';
import Talla from '../components/forms/vetements/Talla';
import Genero from '../components/forms/vetements/Genero';
import Estado from '../components/forms/vetements/Estado';
import Color from '../components/forms/vetements/Color';
import TemporadaDeUso from '../components/forms/vetements/TemporadaDeUso';
import Marca from '../components/forms/vetements/Marca';
import MaterialProducto from '../components/forms/vetements/MaterialProducto';
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
import Price from '../components/forms/vetements/Price';
import TipoMoneda from '../components/forms/vetements/TipoMoneda';
import TipoVenta from '../components/forms/vetements/TipoVenta';
import ImageUpload from '../components/forms/vetements/ImageUpload';
import Contact from '../components/forms/vetements/Contact';

// 🎯 CONFIGURACIÓN DE VALORES POR DEFECTO
const DEFAULT_VALUES = {
    PHONE: "0658556296",
};

// ✅ ESTADO INICIAL COMPLETO CON LOS 36 CAMPOS
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
    telefono: DEFAULT_VALUES.PHONE,

    // 5. IMÁGENES (ÚLTIMAS)
    images: [],
});

// ✅ FUNCIÓN PARA SANITIZAR DATOS (COMO EL SEGUNDO COMPONENTE)
const sanitizePostData = (data) => {
    if (!data) return {};

    const cleanData = { ...data };

    // ✅ Asegurar arrays
    cleanData.talla = Array.isArray(cleanData.talla) ? cleanData.talla : [];
    cleanData.color = Array.isArray(cleanData.color) ? cleanData.color : [];

    // ✅ Asegurar descripción
    cleanData.description = cleanData.description || cleanData.content || '';

    return cleanData;
};

const Createpost = () => {
    const { auth, theme, languageReducer, socket } = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { t, i18n } = useTranslation('categories');

    const isEdit = location.state?.isEdit || false;
    const postToEdit = location.state?.postData || null;
    const isRTL = i18n.language === 'ar';

    // ✅ ESTADO COMPLETO CON TODOS LOS CAMPOS
    const [postData, setPostData] = useState(getInitialState);
    const [images, setImages] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("info");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ✅ CONFIGURACIÓN DE IDIOMA (COMO EL SEGUNDO COMPONENTE)
    useEffect(() => {
        const lang = languageReducer?.language || 'fr';
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [languageReducer?.language, i18n]);

    // ✅ USEEFFECT PARA CARGA DE DATOS - ESTRUCTURA PROBADA
    useEffect(() => {
        console.log('🔄 useEffect - Modo:', isEdit ? 'EDICIÓN' : 'CREACIÓN');

        if (isEdit && postToEdit) {
            console.log('📝 Cargando datos para edición:', postToEdit);

            // ✅ SANITIZAR DATOS COMO EN EL SEGUNDO COMPONENTE
            const sanitizedData = sanitizePostData(postToEdit);

            const finalPostData = {
                ...getInitialState(),
                ...sanitizedData,
                category: sanitizedData.category || "Tassili Fashion",
                subCategory: sanitizedData.subCategory || "",
                description: sanitizedData.description || sanitizedData.content || "",
                title: sanitizedData.title || "",
                telefono: sanitizedData.telefono || DEFAULT_VALUES.PHONE,
            };

            console.log('📤 Datos finales para edición:', finalPostData);
            setPostData(finalPostData);

            // ✅ CARGA DE IMÁGENES COMO EN EL SEGUNDO COMPONENTE
            if (postToEdit.images?.length > 0) {
                const existingImages = postToEdit.images
                    .map((img, index) => {
                        if (typeof img === 'string') {
                            return {
                                url: img,
                                file: null,
                                isExisting: true,
                                name: `existing-${index}-${Date.now()}`
                            };
                        }
                        if (img?.url) {
                            return {
                                ...img,
                                file: null,
                                isExisting: true,
                                name: `existing-${index}-${Date.now()}`
                            };
                        }
                        return null;
                    })
                    .filter(Boolean);

                console.log('🖼️ Imágenes cargadas:', existingImages);
                setImages(existingImages);
            } else {
                setImages([]);
            }
        } else {
            // Modo creación: resetear todo
            console.log('🆕 Modo creación - resetear estado');
            setPostData(getInitialState());
            setImages([]);
        }
    }, [isEdit, postToEdit]);

    // ✅ MANEJO DE CAMPOS STRING - SIMPLIFICADO Y FUNCIONAL
    const handleChangeInput = useCallback((e) => {
        const { name, value, type, checked } = e.target;

        console.log('✏️ Cambio en campo:', { name, value });

        setPostData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }, []);

    // ✅ MANEJO ESPECÍFICO PARA TELÉFONO
    const handlePhoneChange = useCallback((phoneValue) => {
        console.log('📞 Cambio teléfono:', phoneValue);

        setPostData(prev => ({
            ...prev,
            telefono: phoneValue || DEFAULT_VALUES.PHONE
        }));
    }, []);

    // ✅ MANEJO DE ARRAYS CORREGIDO
   // ✅ MANEJO DE ARRAYS CORREGIDO - CON PROTECCIÓN COMPLETA
const handleArrayChange = useCallback((fieldName, value, isChecked) => {
    console.log('🔄 handleArrayChange:', { fieldName, value, isChecked });

    setPostData(prev => {
        // ✅ PROTECCIÓN COMPLETA - Asegurar que siempre sea array
        const currentArray = Array.isArray(prev[fieldName]) ? prev[fieldName] : [];
        
        let newArray;

        if (isChecked === undefined) {
            // Toggle automático CON PROTECCIÓN
            const isCurrentlySelected = currentArray.includes(value);
            newArray = isCurrentlySelected
                ? currentArray.filter(item => item !== value)
                : [...currentArray, value];
        } else {
            // Con isChecked explícito CON PROTECCIÓN
            newArray = isChecked
                ? [...currentArray.filter(item => item !== value), value]
                : currentArray.filter(item => item !== value);
        }

        console.log('📊 Array actualizado:', { fieldName, currentArray, newArray });

        return {
            ...prev,
            [fieldName]: newArray
        };
    });
}, []);
    // ✅ MANEJO DE IMÁGENES - ESTRUCTURA SIMPLIFICADA
    const handleChangeImages = useCallback((e) => {
        const files = [...e.target.files];
        
        if (files.length === 0) return;
    
        // ✅ Usar checkImage para validar todo
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
    
        console.log('📸 Nuevas imágenes agregadas:', newImages);
        setImages(prev => [...prev, ...newImages]);
    }, [images.length]);

    // ✅ ELIMINAR IMÁGENES
    const deleteImages = useCallback((index) => {
        console.log('🗑️ Eliminando imagen en índice:', index);

        setImages(prev => {
            const newImages = [...prev];
            const removedImage = newImages.splice(index, 1)[0];

            if (removedImage && !removedImage.isExisting && removedImage.url) {
                URL.revokeObjectURL(removedImage.url);
            }

            return newImages;
        });
    }, []);

    // ✅ HANDLE SUBMIT - ESTRUCTURA PROBADA DEL SEGUNDO COMPONENTE
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        console.log('🚀 Iniciando envío del formulario...');

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
            // ✅ PREPARAR DATOS COMO EN EL SEGUNDO COMPONENTE
            const actionData = {
                postData: {
                    ...postData,
                    content: postData.description || postData.content || '', // Compatibilidad
                },
                images,
                auth,
                ...(isEdit && postToEdit && {
                    status: { _id: postToEdit._id, ...postToEdit }
                }),
                ...(!isEdit && { socket }) // Solo en creación
            };

            console.log('📦 Datos FINALES para dispatch:', actionData);

            // ✅ DISPATCH EXACTO COMO EN EL SEGUNDO COMPONENTE
            if (isEdit) {
                await dispatch(updatePost(actionData));
                showAlertMessage('Producto actualizado correctamente!', "success");
            } else {
                await dispatch(createPost(actionData));
                showAlertMessage('Producto creado correctamente!', "success");
            }

            // ✅ REDIRIGIR DESPUÉS DE ÉXITO
            setTimeout(() => history.push('/'), 2000);

        } catch (error) {
            console.error('❌ Error submitting post:', error);
            showAlertMessage(
                error.response?.data?.msg ||
                error.message ||
                'Error en la publicación',
                "danger"
            );
        } finally {
            setIsSubmitting(false);
        }
    }, [
        postData, images, auth, isEdit, postToEdit, socket,
        dispatch, history, isSubmitting
    ]);

    // ✅ FUNCIÓN showAlertMessage
    const showAlertMessage = useCallback((message, variant = "info") => {
        setAlertMessage(message);
        setAlertVariant(variant);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
    }, []);

    // ✅ COMPONENTES ORGANIZADOS (MANTENIENDO TU ESTRUCTURA ORIGINAL)

    // 1. CATEGORÍA Y SUBCATEGORÍA
    const CategorySection = useMemo(() => (
        <div className="px-2">
            <CategorySelector
                postData={postData}
                handleChangeInput={handleChangeInput}
            />
        </div>
    ), [postData, handleChangeInput]);

    // 2. TÍTULO Y DESCRIPCIÓN
    const TitleDescriptionSection = useMemo(() => (
        <div className="px-2">
            <Title
                postData={postData}
                handleChangeInput={handleChangeInput}
            />
            <Description
                postData={postData}
                handleChangeInput={handleChangeInput}
            />
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

    // 5. PRECIO Y VENTA
    const PriceSection = useMemo(() => (
        <div className="px-2">
            <Price postData={postData} handleChangeInput={handleChangeInput} />
            <TipoMoneda postData={postData} handleChangeInput={handleChangeInput} />
            <TipoVenta postData={postData} handleChangeInput={handleChangeInput} />
            <Contact
                postData={postData}
                handleChangeInput={handlePhoneChange}
            />
        </div>
    ), [postData, handleChangeInput, handlePhoneChange]);

    // 6. IMÁGENES
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
                                {alertVariant === "success" ? "✅ Success" :
                                    alertVariant === "warning" ? "⚠️ Warning" :
                                        alertVariant === "danger" ? "❌ Error" : "ℹ️ Info"}
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
                                        <div className="px-2 mt-4">
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
                                                            {isSubmitting ? (
                                                                <>
                                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                                    Procesando...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <FaSave className="me-2" />
                                                                    {isEdit ? t('button_update', 'Mettre à jour') : t('button_publish', 'Publier')}
                                                                </>
                                                            )}
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