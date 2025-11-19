import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaSave, FaTimes, FaTag, FaMapMarkerAlt, FaPhone, FaImage, FaShoppingCart } from 'react-icons/fa';

// Componentes
import ImageUpload from '../components/forms/ImageUpload';
import { createPost, updatePost } from '../redux/actions/postAction';

// Datos estáticos
const conditions = ['new', 'like_new', 'good', 'satisfactory'];
const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '36', '38', '40', '42', '44', '46', '48', '50'];
const allColors = ['black', 'white', 'red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'brown', 'gray', 'beige', 'multicolor'];
const materials = ['cotton', 'polyester', 'wool', 'silk', 'denim', 'leather', 'synthetic', 'linen', 'cashmere', 'velvet'];
const genders = ['man', 'woman', 'unisex', 'boy', 'girl', 'baby'];
const seasons = ['spring', 'summer', 'autumn', 'winter', 'all_year'];
const wilayas = ['algiers', 'oran', 'constantine', 'annaba', 'blida', 'batna', 'djelfa', 'setif', 'sidi_bel_abbes', 'biskra', 'tebessa', 'el_oued', 'skikda', 'tiaret', 'bejaia', 'tlemcen', 'ouargla', 'mostaganem', 'bordj_bou_arreridj', 'chlef', 'souk_ahras', 'medea', 'el_tarf', 'ain_defla', 'naama', 'ain_temouchent', 'ghardaia', 'relizane'];
const saleTypes = ['retail', 'wholesale', 'both'];

// Estructura de categorías simplificada
const categoriesStructure = {
  clothing: {
    man_clothing: ['tops_shirts', 'jeans_pants', 'shorts_capris', 'jackets_vests', 'suits_blazers', 'sportswear'],
    woman_clothing: ['tops_shirts', 'jeans_pants', 'dresses', 'skirts', 'sportswear'],
    man_shoes: ['sneakers', 'boots', 'classic'],
    woman_shoes: ['sneakers', 'sandals', 'boots'],
    boys: ['sneakers', 'tops_shirts', 'pants'],
    girls: ['sneakers', 'dresses', 'tops'],
    baby: ['clothing', 'shoes'],
    professional_wear: ['suits'],
    bags_luggage: ['handbags', 'backpacks', 'wallets']
  }
};

const CreatePost = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation('createpost');

  const isEdit = location.state?.isEdit || false;
  const postToEdit = location.state?.postData || null;

  // Estado simplificado
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    subCategory: '',
    subSubCategory: '',
    brand: '',
    condition: 'new',
    sizes: [],
    colors: [],
    material: '',
    gender: '',
    season: 'all_year',
    saleType: 'retail',
    minQuantity: '',
    wilaya: '',
    commune: '',
    location: '',
    phone: '',
    email: '',
    bootiquename: ''
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'info' });

  // Cargar datos para edición
  useEffect(() => {
    if (isEdit && postToEdit) {
      setFormData({
        title: postToEdit.title || '',
        description: postToEdit.description || '',
        price: postToEdit.price || '',
        subCategory: postToEdit.subCategory || '',
        subSubCategory: postToEdit.subSubCategory || '',
        brand: postToEdit.brand || '',
        condition: postToEdit.condition || 'new',
        sizes: postToEdit.sizes || [],
        colors: postToEdit.colors || [],
        material: postToEdit.material || '',
        gender: postToEdit.gender || '',
        season: postToEdit.season || 'all_year',
        saleType: postToEdit.saleType || 'retail',
        minQuantity: postToEdit.minQuantity || '',
        wilaya: postToEdit.wilaya || '',
        commune: postToEdit.commune || '',
        location: postToEdit.location || '',
        phone: postToEdit.phone || '',
        email: postToEdit.email || '',
        bootiquename: postToEdit.bootiquename || ''
      });

      if (postToEdit.images) {
        setExistingImages(postToEdit.images);
      }
    }
  }, [isEdit, postToEdit]);

  // Manejo de cambios simple
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejo de arrays simple
  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  // Envío simplificado
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const postData = {
        ...formData,
        price: Number(formData.price),
        minQuantity: formData.minQuantity ? Number(formData.minQuantity) : undefined,
        category: 'clothing'
      };

      const actionData = {
        postData,
        images,
        auth
      };

      if (isEdit && postToEdit) {
        actionData.existingImages = existingImages;
        actionData.status = { _id: postToEdit._id };
        await dispatch(updatePost(actionData));
        showAlert('Article modifié avec succès!', 'success');
      } else {
        await dispatch(createPost(actionData));
        showAlert('Article publié avec succès!', 'success');
      }

      setTimeout(() => history.push('/'), 2000);

    } catch (error) {
      console.error('Error:', error);
      showAlert(error.response?.data?.msg || 'Erreur lors de la publication', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: 'info' }), 5000);
  };

  // Obtener opciones de categorías
  const getSubCategories = () => Object.keys(categoriesStructure.clothing || {});
  const getSubSubCategories = () => categoriesStructure.clothing?.[formData.subCategory] || [];

  // Estilos básicos
  const styles = {
    card: { border: 'none', borderRadius: '12px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
    cardHeader: { backgroundColor: '#fff', border: 'none', padding: '12px 16px' },
    formLabel: { fontWeight: '600', marginBottom: '6px', display: 'block' },
    formControl: { borderRadius: '8px', padding: '12px', marginBottom: '8px' }
  };

  return (
    <Container fluid className="py-4 bg-light">
      <Row className="justify-content-center">
        <Col xs={12} lg={10} xl={8}>
          
          {/* Header */}
          <Card style={styles.card}>
            <Card.Body className="text-center">
              <h4>{isEdit ? 'Modifier Article' : 'Vendre Article'}</h4>
              {isEdit && postToEdit?.title && <p>Modification: "{postToEdit.title}"</p>}
            </Card.Body>
          </Card>

          {/* Alert */}
          {alert.show && (
            <Alert variant={alert.variant} dismissible onClose={() => setAlert({ show: false, message: '', variant: 'info' })}>
              {alert.message}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            
            {/* Categorías */}
            <Card style={styles.card}>
              <Card.Header style={styles.cardHeader}>
                <h6><FaTag className="me-2" />Catégories</h6>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={styles.formLabel}>Sous-catégorie *</Form.Label>
                      <Form.Select name="subCategory" value={formData.subCategory} onChange={handleChange} style={styles.formControl}>
                        <option value="">Choisir une sous-catégorie</option>
                        {getSubCategories().map(cat => (
                          <option key={cat} value={cat}>{t(`categories.${cat}`) || cat}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={styles.formLabel}>Type spécifique</Form.Label>
                      <Form.Select name="subSubCategory" value={formData.subSubCategory} onChange={handleChange} disabled={!formData.subCategory} style={styles.formControl}>
                        <option value="">Choisir un type</option>
                        {getSubSubCategories().map(type => (
                          <option key={type} value={type}>{t(`categories.${type}`) || type}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {formData.subCategory && (
              <>
                {/* Informations de base */}
                <Card style={styles.card}>
                  <Card.Header style={styles.cardHeader}><h6>Informations de base</h6></Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>Titre *</Form.Label>
                          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Titre de l'article" style={styles.formControl} />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>Marque *</Form.Label>
                          <Form.Control type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Marque" style={styles.formControl} />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>Description</Form.Label>
                          <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Description" style={styles.formControl} />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Prix et État */}
                <Card style={styles.card}>
                  <Card.Header style={styles.cardHeader}><h6>Prix & État</h6></Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>Prix (DZD) *</Form.Label>
                          <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" style={styles.formControl} />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>État</Form.Label>
                          <Form.Select name="condition" value={formData.condition} onChange={handleChange} style={styles.formControl}>
                            {conditions.map(cond => <option key={cond} value={cond}>{t(`conditions.${cond}`) || cond}</option>)}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>Genre</Form.Label>
                          <Form.Select name="gender" value={formData.gender} onChange={handleChange} style={styles.formControl}>
                            <option value="">Choisir</option>
                            {genders.map(g => <option key={g} value={g}>{t(`genders.${g}`) || g}</option>)}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>Saison</Form.Label>
                          <Form.Select name="season" value={formData.season} onChange={handleChange} style={styles.formControl}>
                            {seasons.map(s => <option key={s} value={s}>{t(`seasons.${s}`) || s}</option>)}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Type de vente */}
                <Card style={styles.card}>
                  <Card.Header style={styles.cardHeader}><h6><FaShoppingCart className="me-2" />Type de vente</h6></Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>Type de vente</Form.Label>
                          <Form.Select name="saleType" value={formData.saleType} onChange={handleChange} style={styles.formControl}>
                            {saleTypes.map(type => <option key={type} value={type}>{t(`saleTypes.${type}`) || type}</option>)}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      {(formData.saleType === 'wholesale' || formData.saleType === 'both') && (
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label style={styles.formLabel}>Quantité minimale</Form.Label>
                            <Form.Control type="number" name="minQuantity" value={formData.minQuantity} onChange={handleChange} placeholder="Quantité min" style={styles.formControl} />
                          </Form.Group>
                        </Col>
                      )}
                    </Row>
                  </Card.Body>
                </Card>

                {/* Tailles */}
                <Card style={styles.card}>
                  <Card.Header style={styles.cardHeader}><h6>Tailles disponibles</h6></Card.Header>
                  <Card.Body>
                    <Row>
                      {allSizes.map(size => (
                        <Col key={size} xs={4} sm={3} md={2}>
                          <Form.Check type="checkbox" label={t(`sizes.${size}`) || size} checked={formData.sizes.includes(size)} onChange={() => handleArrayChange('sizes', size)} />
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>

                {/* Couleurs */}
                <Card style={styles.card}>
                  <Card.Header style={styles.cardHeader}><h6>Couleurs disponibles</h6></Card.Header>
                  <Card.Body>
                    <Row>
                      {allColors.map(color => (
                        <Col key={color} xs={6} sm={4} md={3}>
                          <Form.Check type="checkbox" label={t(`colors.${color}`) || color} checked={formData.colors.includes(color)} onChange={() => handleArrayChange('colors', color)} />
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>

                {/* Localisation */}
                <Card style={styles.card}>
                  <Card.Header style={styles.cardHeader}><h6><FaMapMarkerAlt className="me-2" />Localisation</h6></Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>Wilaya *</Form.Label>
                          <Form.Select name="wilaya" value={formData.wilaya} onChange={handleChange} style={styles.formControl}>
                            <option value="">Choisir une wilaya</option>
                            {wilayas.map(w => <option key={w} value={w}>{t(`wilayas.${w}`) || w}</option>)}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>Commune *</Form.Label>
                          <Form.Control type="text" name="commune" value={formData.commune} onChange={handleChange} placeholder="Commune" style={styles.formControl} />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>Adresse</Form.Label>
                          <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Adresse complète" style={styles.formControl} />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Contact */}
                <Card style={styles.card}>
                  <Card.Header style={styles.cardHeader}><h6><FaPhone className="me-2" />Contact</h6></Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>Téléphone *</Form.Label>
                          <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Téléphone" style={styles.formControl} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>Email</Form.Label>
                          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" style={styles.formControl} />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Images */}
                <Card style={styles.card}>
                  <Card.Header style={styles.cardHeader}><h6><FaImage className="me-2" />Images</h6></Card.Header>
                  <Card.Body>
                    <ImageUpload images={images} setImages={setImages} existingImages={existingImages} setExistingImages={setExistingImages} isEdit={isEdit} />
                  </Card.Body>
                </Card>

                {/* Boutons */}
                <Card style={styles.card}>
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <Button variant={isEdit ? "warning" : "success"} type="submit" disabled={isSubmitting} className="w-100">
                          <FaSave className="me-2" />
                          {isSubmitting ? 'Chargement...' : (isEdit ? 'Modifier' : 'Publier')}
                        </Button>
                      </Col>
                      <Col md={4}>
                        <Button variant="outline-secondary" onClick={() => history.goBack()} disabled={isSubmitting} className="w-100">
                          <FaTimes className="me-2" />
                          Annuler
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePost;