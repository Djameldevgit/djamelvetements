// components/forms/telephones/IndexTelefonos.js
import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';

// Componentes comunes generales
import Description from '../campoosComunes/Description';
import Contact from '../campoosComunes/Contact';
import ImageUpload from '../campoosComunes/ImageUpload';
import TipoMoneda from '../campoosComunes/TipoMoneda';
import Price from '../campoosComunes/Price';
import Title from '../campoosComunes/Title';
import TipoVenta from '../campoosComunes/TipoVenta';
import Estado from '../campoosComunes/Estado';
import WilayaCommune from '../campoosComunes/WilayaCommune';

// Componentes específicos para teléfonos
import SubCategorySelector from './SubCategoryTelephone';
// IMPORTAR EL NUEVO COMPONENTE DINÁMICO
import MarcaDinamica from '../campoosComunes/telephones/MarcaDinamica';
import Modelo from '../campoosComunes/telephones/Modelo';
import Referencia from '../campoosComunes/telephones/Referencia';
import CapacityGB from '../campoosComunes/telephones/CapacityDinamica';
import ColorTelephone from '../campoosComunes/telephones/ColorTelephone';
import CopyOriginal from '../campoosComunes/telephones/CopyOriginal';

// Componentes específicos por subcategoría
import Smartphones from './Smartphones';
import TelephonesCelular from './TelephonesCelular';
import Smartwatchs from './SmartWatch';
import ProtectionAntichoc from './ProteccionYantechok';
import EcouteursSon from './EcouteurSon';
import ChargeursCables from './ChargeurCable';
import SuportStabilizateurs from './SuportStabilizateurs';
import Manettes from './Manettes';
import VR from './VR';
import PowerBanks from './PowerBanks';
import Stylets from './Stylets';
import CartsMemoire from './CartsMemoire';
import FixFax from './FixFax';
import Tablette from './Tablette';

const IndexTelefonos = ({ 
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
  // ✅ Estado para campos específicos de teléfonos
  const [specificFields, setSpecificFields] = useState({
    // Campos comunes de teléfonos y accesorios
    capacite: "",
    colortelefono: "",
    copie: "",
    marque: "",
    modelo: "",
    referencia: "",
    tipoArticulo: "",
    
    // Campos para smartphones
    os: "",
    appareil: "",
    camerafrontal: "",
    gigas: "",
    doublepuces: "",
    bateria: "",
    charging_type: "",
    
    // Otros campos específicos
    compatibiliteAccessoire: "",
    capaciteCarte: "",
    puissanceChargeur: "",
    typeConnexionAudio: "",
    typeConnexionFixFax: "",
    connectiviteManette: "",
    dureeOffre: "",
    etatPiece: "",
    capacitePowerbank: "",
    tailleEcranWatch: "",
    fonctionnalitesWatch: "",
    compatibiliteProtection: "",
    compatibiliteStylet: "",
    caracteristiquesStylet: "",
    compatibilite: "",
    tailleEcranTablette: "",
    etatTablette: "",
    marcacelular: "",
    marcaVR: ""
  });

  // ✅ Effect para carga de datos de edición
  useEffect(() => {
    if (isEdit && editData) {
      console.log('📱 Cargando datos de teléfonos para edición:', editData.subCategory);
      
      const specificData = {};
      
      // Campos comunes de teléfonos
      ['capacite', 'colortelefono', 'copie', 'marque', 'modelo', 'referencia', 'tipoArticulo'].forEach(field => {
        specificData[field] = editData[field] || "";
      });
      
      // Campos de smartphones
      ['os', 'appareil', 'camerafrontal', 'gigas', 'doublepuces', 'bateria', 'charging_type'].forEach(field => {
        specificData[field] = editData[field] || "";
      });
      
      // Otros campos específicos
      const otherFields = [
        'compatibiliteAccessoire', 'capaciteCarte', 'puissanceChargeur', 'typeConnexionAudio',
        'typeConnexionFixFax', 'connectiviteManette', 'dureeOffre', 'etatPiece', 'capacitePowerbank',
        'tailleEcranWatch', 'fonctionnalitesWatch', 'compatibiliteProtection', 'compatibiliteStylet',
        'caracteristiquesStylet', 'compatibilite', 'tailleEcranTablette', 'etatTablette', 'marcacelular', 'marcaVR'
      ];
      
      otherFields.forEach(field => {
        specificData[field] = editData[field] || "";
      });
      
      setSpecificFields(specificData);
    }
  }, [isEdit, editData]);

  // ✅ Handler para campos específicos
  const handleSpecificChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setSpecificFields(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // ✅ Handler para submit
  const handleTelefonosSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (!postData.subCategory) {
      alert("❌ Por favor selecciona una subcategoría");
      return;
    }

    // Datos combinados
    const combinedData = {
      ...postData,
      ...specificFields,
      category: "telephones"
    };
    
    console.log('📱 Enviando datos de teléfonos:', combinedData);
    handleSubmit(e, combinedData);
  }, [postData, specificFields, handleSubmit]);

  // ✅ Mapa de componentes específicos
  const componentMap = {
    Smartphones: Smartphones,
    Telephones: TelephonesCelular,
    Tablettes: Tablette,
    Smartwatchs: Smartwatchs,
    ProtectionAntichoc: ProtectionAntichoc,
    EcouteursSon: EcouteursSon,
    ChargeursCables: ChargeursCables,
    SupportsStabilisateurs: SuportStabilizateurs,
    Manettes: Manettes,
    VR: VR,
    Powerbanks: PowerBanks,
    Stylets: Stylets,
    CartesMemoire: CartsMemoire,
    FixFax: FixFax
  };

  // ✅ Componente específico según subcategoría
  const renderSpecificComponent = () => {
    if (!postData.subCategory) return null;
    
    const SpecificComponent = componentMap[postData.subCategory];
    if (!SpecificComponent) return null;

    return (
      <div className="px-2 mb-4">
        <SpecificComponent
          postData={{ ...postData, ...specificFields }}
          handleChangeInput={handleSpecificChange}
          theme={theme}
        />
      </div>
    );
  };

  // ✅ Renderizar componentes comunes de teléfonos/tabletas
  const renderTelephoneCommonFields = () => {
    if (!['Smartphones', 'Telephones', 'Tablettes'].includes(postData.subCategory)) return null;
    
    return (
      <div className="px-2 mb-4">
        <Row className="g-3">
          <Col md={4}>
          <CapacityGB
  value={specificFields.capacite || ''}
  onChange={handleSpecificChange}
  name="capacite"
  subCategory={postData.subCategory} // ¡ESTA ES LA CLAVE!
  label="🗂️ Capacité"
  placeholder="Sélectionnez la capacité"
  theme={theme}
/>
          </Col>
          <Col md={4}>
            <ColorTelephone
              value={specificFields.colortelefono || ''}
              onChange={handleSpecificChange}
              name="colortelefono"
              label="🎨 Couleur"
              placeholder="Sélectionnez une couleur"
              theme={theme}
            />
          </Col>
          <Col md={4}>
            <CopyOriginal
              value={specificFields.copie || ''}
              onChange={handleSpecificChange}
              name="copie"
              label="📱 Type de copie"
              placeholder="Sélectionnez le type"
              theme={theme}
            />
          </Col>
        </Row>
      </div>
    );
  };

  // ✅ Renderizar campos comunes de marca/modelo/referencia (¡USANDO MarcaDinamica!)
  const renderMarcaModeloReferencia = () => {
    return (
      <div className="px-2 mb-4">
        <Row className="g-3">
          <Col md={4}>
            {/* ✅ USAR MarcaDinamica EN LUGAR DE Marque */}
            <MarcaDinamica
              value={specificFields.marque || ''}
              onChange={handleSpecificChange}
              name="marque"
              subCategory={postData.subCategory} // ¡ESTA ES LA CLAVE!
              label="🏷️ Marque"
              placeholder="Sélectionnez la marque"
              theme={theme}
            />
          </Col>
          <Col md={4}>
            <Modelo 
              value={specificFields.modelo || ''}
              onChange={handleSpecificChange}
              name="modelo"
              label="📱 Modèle"
              placeholder="Entrez le modèle"
              theme={theme}
            />
          </Col>
          <Col md={4}>
            <Referencia 
              value={specificFields.referencia || ''}
              onChange={handleSpecificChange}
              name="referencia"
              label="🔖 Référence"
              placeholder="Entrez la référence"
              theme={theme}
            />
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div className="telephones-form">
      <Form onSubmit={handleTelefonosSubmit} className="p-0">
        
        {/* 1. Selección de subcategoría */}
        <div className="px-2 mb-4">
          <SubCategorySelector
            postData={postData}
            handleChangeInput={handleChangeInput}
            theme={theme}
          />
        </div>

        {postData.subCategory && (
          <>
            {/* 2. Componente específico de la subcategoría */}
            {renderSpecificComponent()}
            
            {/* 3. Campos comunes de teléfonos/tabletas */}
            {renderTelephoneCommonFields()}
            
            {/* 4. Marca, Modelo y Referencia (¡AHORA CON MarcaDinamica!) */}
            {renderMarcaModeloReferencia()}
            
            {/* 5. Título y Descripción */}
            <div className="px-2 mb-4">
              <Title 
                postData={postData} 
                handleChangeInput={handleChangeInput}
                theme={theme}
              />
              <Description 
                postData={postData} 
                handleChangeInput={handleChangeInput}
                theme={theme}
              />
            </div>
            
            {/* 6. Estado */}
            <div className="px-2 mb-4">
              <Estado
                value={postData.etat || ''}
                onChange={handleChangeInput}
                name="etat"
                theme={theme}
              />
            </div>
            
            {/* 7. Precio, Moneda y Tipo de Venta */}
            <div className="px-2 mb-4">
              <Row className="g-3">
                <Col md={4}>
                  <Price 
                    postData={postData} 
                    handleChangeInput={handleChangeInput}
                    theme={theme}
                  />
                </Col>
                <Col md={4}>
                  <TipoMoneda 
                    postData={postData} 
                    handleChangeInput={handleChangeInput}
                    theme={theme}
                  />
                </Col>
                <Col md={4}>
                  <TipoVenta 
                    postData={postData} 
                    handleChangeInput={handleChangeInput}
                    theme={theme}
                  />
                </Col>
              </Row>
            </div>
            
            {/* 8. Contacto */}
            <div className="px-2 mb-4">
              <Contact 
                postData={postData} 
                handleChangeInput={handlePhoneChange}
                theme={theme}
              />
            </div>
            
            {/* 9. Ubicación */}
            <div className="px-2 mb-4">
              <WilayaCommune
                postData={{ ...postData, ...specificFields }}
                handleChangeInput={handleSpecificChange}
                theme={theme}
              />
            </div>
            
            {/* 10. Imágenes */}
            <div className="px-2 mb-4">
              <ImageUpload
                images={images}
                handleChangeImages={handleChangeImages}
                deleteImages={deleteImages}
                theme={theme}
              />
            </div>
            
            {/* 11. Botones de acción */}
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
              <div className="fs-1 mb-2">📱</div>
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

export default React.memo(IndexTelefonos);