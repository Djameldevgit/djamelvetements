// components/forms/vetements/IndexVetement.js - VERSIÓN OPTIMIZADA
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';

import WilayaCommune from '../campoosComunes/WilayaCommune';
import Contact from '../campoosComunes/Contact';
import ImageUpload from '../campoosComunes/ImageUpload';
 import TipoMoneda from '../campoosComunes/TipoMoneda';
 import Description from '../campoosComunes/Description';
import Price from '../campoosComunes/Price';
import Title from '../campoosComunes/Title';
import TipoVenta from '../campoosComunes/TipoVenta';
import Estado from '../campoosComunes/Estado';
 

import Talla from './Talla';
import Color from './Color';
import Genero from './Genero';
import TemporadaDeUso from './TemporadaDeUso';
import Marca from './Marca';
import MaterialProducto from './MaterialProducto';
 import Bebe from './Bebe';
import Bijoux from './Bijoux';
import ChaussureFemme from './ChaussureFemme';
import ChaussureHome from './ChaussureHome';
import Filles from './Filles';
import Garcons from './Garcons';
import Lunettes from './Lunettes';
import Montres from './Montres';
import SacsValises from './SacsValises';
import TennueProfesionelle from './TennueProfesionelle';
import VetementsFemme from './VetementsFemme';
import VetementsHomme from './VetementsHomme';
import SubCategorySelector from './SubCategoryVetements';

 
 

const IndexVetement = ({ 
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
  editData
}) => {
  // ✅ ESTADO SOLO PARA CAMPOS ESPECÍFICOS (NO category/subCategory)
  const [specificFields, setSpecificFields] = useState({
    
    tipoArticulo: "",
    
    talla: [],
    color: [],
    genero: "",
    etat: "",
    temporada: "",
    
    ocasion: "",
    estilo: "",

    bebes: "",
    edadBebes: "",
    

    tipoMaterialBijoux: "",
    tipoPiedra: "",
    alturaTacon: "",
    tipoDeCierre: "",
    formaDePunta: "",
    tipoDeSuela: "",
    tipoDeCierreHombre: "",
    anchoPuente: "",
    longitudPatilla: "",
    marca: "",
    material: "",
    tiporeloj: "",
    movimientoReloj: "",
    materialCorrea: "",
    resistenciaAgua: "",
    funcionalidades: "",
    tipoSangle: "",
    correa: "",
    tallaSaco: "",
    tipoDeLabata: "",
    sectorDeTrabajo: "",
    // ✅ NUEVOS CAMPOS ESPECÍFICOS
    
  });

  // ✅ EFFECT SIMPLIFICADO - Solo carga campos existentes
  useEffect(() => {
    if (isEdit && editData) {
      console.log('🎯 Cargando datos para edición:', editData.subCategory);
      
      // Mapa de conversión de campos viejos a nuevos
      const fieldConversionMap = {
        // Si hay datos viejos, los convertimos al nuevo formato
        ropahombre: 'tipoArticulo',
        ropamujer: 'tipoArticulo',
        zapatoshombre: 'tipoArticulo',
        zapatosmujer: 'tipoArticulo',
        reloj: 'tipoArticulo',
        gafas: 'tipoArticulo',
        bijoux: 'tipoArticulo',
        garcons: 'tipoArticulo',
        filles: 'tipoArticulo',
        bebes: 'tipoArticulo',
        ropaprofesional: 'tipoArticulo',
        sacvalise: 'tipoArticulo'
      };
      
      // Función para obtener el valor, primero del nuevo campo, luego del viejo
      const getFieldValue = (fieldName) => {
        const newFieldName = fieldConversionMap[fieldName] || fieldName;
        return editData[newFieldName] || editData[fieldName] || "";
      };
      
      const specificData = {
        // Campos arrays
        talla: Array.isArray(editData.talla) ? editData.talla : [],
        color: Array.isArray(editData.color) ? editData.color : [],
        
        // Campos simples
        genero: editData.genero || "",
        etat: editData.etat || "",
        temporada: editData.temporada || "",
        marca: editData.marca || "",
        material: editData.material || "",
        
        // Campo centralizado tipoArticulo
        tipoArticulo: getFieldValue('tipoArticulo'),
        
        // Campos específicos (solo los que realmente necesitas)
        edadBebes: editData.edadBebes || "",
        alturaTacon: editData.alturaTacon || "",
        tipoDeCierre: editData.tipoDeCierre || "",
        anchoPuente: editData.anchoPuente || "",
        // ... solo agregar campos que realmente se usan en tus componentes

        wilaya: editData.wilaya || "",
        commune: editData.commune || "",
      };
      
      setSpecificFields(specificData);
    }
  }, [isEdit, editData]);

  // ✅ HANDLERS OPTIMIZADOS
  const handleSpecificChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    setSpecificFields(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }, []);

  const handleSpecificArrayChange = useCallback((fieldName, value, isChecked) => {
    setSpecificFields(prev => {
      const currentArray = Array.isArray(prev[fieldName]) ? prev[fieldName] : [];
      let newArray;

      if (isChecked === undefined) {
        newArray = currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value];
      } else {
        newArray = isChecked
          ? [...currentArray.filter(item => item !== value), value]
          : currentArray.filter(item => item !== value);
      }

      return { ...prev, [fieldName]: newArray };
    });
  }, []);

  // ✅ HANDLE SUBMIT SIMPLIFICADO
  const handleVetementsSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (!postData.subCategory) {
      alert("❌ Por favor selecciona una subcategoría");
      return;
    }

    // Datos combinados optimizados
    const combinedData = {
      ...postData,
      ...specificFields,
      category: "vetements"
    };
    
    console.log('📦 Enviando datos:', combinedData);
    handleSubmit(e, combinedData);
  }, [postData, specificFields, handleSubmit]);

  // ✅ MAPA DE COMPONENTES SIMPLIFICADO
  const componentMap = {
    ropahombre: VetementsHomme,
    ropamujer: VetementsFemme,
    zapatoshombre: ChaussureHome,
    zapatosmujer: ChaussureFemme,
    reloj: Montres,
    gafas: Lunettes,
    bijoux: Bijoux,
    garcons: Garcons,
    filles: Filles,
    bebes: Bebe,
    TennueProfesionelle: TennueProfesionelle,
    sacvalise: SacsValises
  };

  // ✅ RENDERIZADO DE COMPONENTE ESPECÍFICO
  const SpecificCategorySection = useMemo(() => {
    if (!postData.subCategory) return null;
    
    const SpecificComponent = componentMap[postData.subCategory];
    if (!SpecificComponent) return null;

    return (
      <div className="px-2">
        <SpecificComponent
          postData={{ ...postData, ...specificFields }}
          handleChangeInput={handleSpecificChange}
        />
      </div>
    );
  }, [postData.subCategory, postData, specificFields, handleSpecificChange]);

  // ✅ SECCIONES COMPARTIDAS (optimizadas con useMemo)
  const CommonSections = useMemo(() => ({
    SubCategory: (
      <div className="px-2">
        <SubCategorySelector
          postData={postData}
          handleChangeInput={handleChangeInput}
          theme={theme}
        />
      </div>
    ),
    
    TitleDescription: (
      <div className="px-2">
        <Title postData={postData} handleChangeInput={handleChangeInput} />
        <Description postData={postData} handleChangeInput={handleChangeInput} />
      </div>
    ),
    WilayaSection: (
      <div className="px-2">
          <WilayaCommune
              postData={{ ...postData, ...specificFields }}
              handleChangeInput={handleSpecificChange}  // ← ¡USA handleSpecificChange!
          />
      </div>
  ),
    ProductFeatures: (
      <div className="px-2">
        <Talla
          postData={{ ...postData, ...specificFields }}
          tallaData={specificFields.talla}
          onTallaChange={(value, isChecked) => 
            handleSpecificArrayChange('talla', value, isChecked)
          }
        />
        <Color
          postData={{ ...postData, ...specificFields }}
          colorData={specificFields.color}
          onColorChange={(value, isChecked) => 
            handleSpecificArrayChange('color', value, isChecked)
          }
        />
        <Genero
          postData={{ ...postData, ...specificFields }}
          handleChangeInput={handleSpecificChange}
        />
        <Estado
          postData={{ ...postData, ...specificFields }}
          handleChangeInput={handleSpecificChange}
        />
        <TemporadaDeUso
          postData={{ ...postData, ...specificFields }}
          handleChangeInput={handleSpecificChange}
        />
        <Marca
          postData={{ ...postData, ...specificFields }}
          handleChangeInput={handleSpecificChange}
        />
        <MaterialProducto
          postData={{ ...postData, ...specificFields }}
          handleChangeInput={handleSpecificChange}
        />
      </div>
    ),
    
    PriceSection: (
      <div className="px-2">
        <Price postData={postData} handleChangeInput={handleChangeInput} />
        <TipoMoneda postData={postData} handleChangeInput={handleChangeInput} />
        <TipoVenta postData={postData} handleChangeInput={handleChangeInput} />
        <Contact postData={postData} handleChangeInput={handlePhoneChange} />
       
      </div>
    ),
    
    ImageSection: (
      <div className="px-2">
        <ImageUpload
          images={images}
          handleChangeImages={handleChangeImages}
          deleteImages={deleteImages}
          theme={theme}
        />
      </div>
    )
  }), [
    postData, specificFields, handleChangeInput, handleSpecificChange,
    handleSpecificArrayChange, handlePhoneChange, images, 
    handleChangeImages, deleteImages, theme
  ]);

  return (
    <div className="vetements-form">
      <Form onSubmit={handleVetementsSubmit} className="p-0">
        
        {/* 1. SUBCATEGORÍA PRINCIPAL */}
        {CommonSections.SubCategory}

        {postData.subCategory && (
          <>
            {/* 2. COMPONENTE ESPECÍFICO */}
            {SpecificCategorySection}
            
            {/* 3. TÍTULO Y DESCRIPCIÓN */}
            {CommonSections.TitleDescription}
            
            {/* 4. CARACTERÍSTICAS GENERALES */}
            {CommonSections.ProductFeatures}
            
            {/* 5. PRECIO Y VENTA */}
            {CommonSections.PriceSection}
            {CommonSections.WilayaSection}
            {/* 6. IMÁGENES */}
            {CommonSections.ImageSection}
            
            {/* 7. BOTONES */}
            <div className="px-2 mt-4">
              <Row className={`g-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Col xs={8}>
                  <Button
                    variant={isEdit ? "warning" : "success"}
                    type="submit"
                    size="lg"
                    className="fw-bold py-2 w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        {t('processing', 'Procesando...')}
                      </>
                    ) : (
                      <>
                        <FaSave className="me-2" />
                        {isEdit ? t('button_update', 'Actualizar') : t('button_publish', 'Publicar')}
                      </>
                    )}
                  </Button>
                </Col>
                <Col xs={4}>
                  <Button
                    variant="outline-secondary"
                    size="lg"
                    className="w-100 py-2"
                    onClick={() => window.history.back()}
                    disabled={isSubmitting}
                  >
                    <FaTimes className="me-2" />
                    {t('common.cancel', 'Cancelar')}
                  </Button>
                </Col>
              </Row>
            </div>
          </>
        )}

        {!postData.subCategory && (
          <Card className="text-center border-0 bg-light mt-3">
            <Card.Body className="py-4">
              <div className="fs-1 mb-2">🏁</div>
              <h5 className="text-muted fs-6">
                {t('select_category_first', 'Selecciona una subcategoría para continuar')}
              </h5>
            </Card.Body>
          </Card>
        )}
      </Form>
    </div>
  );
};

export default React.memo(IndexVetement);