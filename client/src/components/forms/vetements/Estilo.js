import React, { useMemo } from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Estilo = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('estilo');
  const isRTL = i18n.language === 'ar';

  // 🎯 DEFINICIÓN DE ESTILOS POR CATEGORÍA Y SUBCATEGORÍA
  const getFilteredStyles = useMemo(() => {
    if (!postData.category || !postData.subCategory) return [];

    const category = postData.category;
    const subCategory = postData.subCategory.toLowerCase();
    const styles = [];

    // 👔 ROPA HOMBRE
    if (category === 'vetements_homme') {
      if (subCategory.includes('camisa') || subCategory.includes('shirt')) {
        styles.push(
          { value: 'formal_hombre', label: t('formal', 'Formal') },
          { value: 'casual_hombre', label: t('casual', 'Casual') },
          { value: 'ejecutivo', label: t('executive', 'Ejecutivo') },
          { value: 'clasico_hombre', label: t('classic', 'Clásico') },
          { value: 'moderno_hombre', label: t('modern', 'Moderno') },
          { value: 'slim_fit', label: t('slim_fit', 'Slim Fit') },
          { value: 'regular_fit', label: t('regular_fit', 'Regular Fit') }
        );
      } else if (subCategory.includes('pantalon') || subCategory.includes('pant')) {
        styles.push(
          { value: 'formal_hombre', label: t('formal', 'Formal') },
          { value: 'casual_hombre', label: t('casual', 'Casual') },
          { value: 'deportivo_hombre', label: t('sporty', 'Deportivo') },
          { value: 'urbano_hombre', label: t('streetwear', 'Streetwear') },
          { value: 'slim_fit', label: t('slim_fit', 'Slim Fit') },
          { value: 'regular_fit', label: t('regular_fit', 'Regular Fit') },
          { value: 'relaxed_fit', label: t('relaxed_fit', 'Relaxed Fit') }
        );
      } else {
        // Estilos generales para ropa hombre
        styles.push(
          { value: 'casual_hombre', label: t('casual', 'Casual') },
          { value: 'formal_hombre', label: t('formal', 'Formal') },
          { value: 'deportivo_hombre', label: t('sporty', 'Deportivo') },
          { value: 'ejecutivo', label: t('executive', 'Ejecutivo') },
          { value: 'urbano_hombre', label: t('streetwear', 'Streetwear') },
          { value: 'clasico_hombre', label: t('classic', 'Clásico') },
          { value: 'moderno_hombre', label: t('modern', 'Moderno') },
          { value: 'vintage_hombre', label: t('vintage', 'Vintage') },
          { value: 'athleisure', label: t('athleisure', 'Athleisure') }
        );
      }
    }

    // 👗 ROPA MUJER
    else if (category === 'vetements_femme') {
      if (subCategory.includes('vestido') || subCategory.includes('dress')) {
        styles.push(
          { value: 'elegante_mujer', label: t('elegant', 'Elegante') },
          { value: 'formal_mujer', label: t('formal', 'Formal') },
          { value: 'casual_mujer', label: t('casual', 'Casual') },
          { value: 'romantico', label: t('romantic', 'Romántico') },
          { value: 'glamuroso', label: t('glamorous', 'Glamuroso') },
          { value: 'bohemio_mujer', label: t('boho_chic', 'Bohemio chic') }
        );
      } else if (subCategory.includes('falda') || subCategory.includes('skirt')) {
        styles.push(
          { value: 'elegante_mujer', label: t('elegant', 'Elegante') },
          { value: 'casual_mujer', label: t('casual', 'Casual') },
          { value: 'femenino', label: t('feminine', 'Femenino') },
          { value: 'moderno_mujer', label: t('modern', 'Moderno') },
          { value: 'minimalista_mujer', label: t('minimalist', 'Minimalista') }
        );
      } else {
        // Estilos generales para ropa mujer
        styles.push(
          { value: 'casual_mujer', label: t('casual', 'Casual') },
          { value: 'formal_mujer', label: t('formal', 'Formal') },
          { value: 'deportivo_mujer', label: t('sporty', 'Deportivo') },
          { value: 'elegante_mujer', label: t('elegant', 'Elegante') },
          { value: 'femenino', label: t('feminine', 'Femenino') },
          { value: 'romantico', label: t('romantic', 'Romántico') },
          { value: 'bohemio_mujer', label: t('boho_chic', 'Bohemio chic') },
          { value: 'glamuroso', label: t('glamorous', 'Glamuroso') },
          { value: 'vintage_mujer', label: t('vintage', 'Vintage') },
          { value: 'moderno_mujer', label: t('modern', 'Moderno') },
          { value: 'minimalista_mujer', label: t('minimalist', 'Minimalista') },
          { value: 'oversize', label: t('oversized', 'Oversize') },
          { value: 'ajustado', label: t('fitted', 'Ajustado') }
        );
      }
    }

    // 👞 CALZADO HOMBRE
    else if (category === 'chaussures_homme') {
      if (subCategory.includes('deportivo') || subCategory.includes('sport')) {
        styles.push(
          { value: 'deportivo_zapatos_hombre', label: t('athletic_shoes', 'Deportivo') },
          { value: 'casual_zapatos_hombre', label: t('casual_shoes', 'Casual') },
          { value: 'urbano_zapatos', label: t('urban_shoes', 'Urbano') }
        );
      } else if (subCategory.includes('formal') || subCategory.includes('dress')) {
        styles.push(
          { value: 'formal_zapatos_hombre', label: t('formal_shoes', 'Formal') },
          { value: 'elegante_zapatos_hombre', label: t('dress_shoes', 'Elegante') },
          { value: 'clasico_zapatos', label: t('classic_shoes', 'Clásico') },
          { value: 'moderno_zapatos', label: t('modern_shoes', 'Moderno') }
        );
      } else if (subCategory.includes('bota') || subCategory.includes('boot')) {
        styles.push(
          { value: 'botas_hombre', label: t('boots', 'Botas') },
          { value: 'casual_zapatos_hombre', label: t('casual_shoes', 'Casual') },
          { value: 'urbano_zapatos', label: t('urban_shoes', 'Urbano') }
        );
      } else {
        styles.push(
          { value: 'deportivo_zapatos_hombre', label: t('athletic_shoes', 'Deportivo') },
          { value: 'formal_zapatos_hombre', label: t('formal_shoes', 'Formal') },
          { value: 'casual_zapatos_hombre', label: t('casual_shoes', 'Casual') },
          { value: 'elegante_zapatos_hombre', label: t('dress_shoes', 'Elegante') },
          { value: 'urbano_zapatos', label: t('urban_shoes', 'Urbano') },
          { value: 'clasico_zapatos', label: t('classic_shoes', 'Clásico') },
          { value: 'moderno_zapatos', label: t('modern_shoes', 'Moderno') },
          { value: 'botas_hombre', label: t('boots', 'Botas') }
        );
      }
    }

    // 👠 CALZADO MUJER
    else if (category === 'chaussures_femme') {
      if (subCategory.includes('tacon') || subCategory.includes('heel')) {
        styles.push(
          { value: 'tacones', label: t('heels', 'Tacones') },
          { value: 'elegante_zapatos_mujer', label: t('dress_shoes', 'Elegante') },
          { value: 'formal_zapatos_mujer', label: t('formal_shoes', 'Formal') },
          { value: 'glamuroso_zapatos', label: t('glamorous_shoes', 'Glamuroso') }
        );
      } else if (subCategory.includes('plano') || subCategory.includes('flat')) {
        styles.push(
          { value: 'planos', label: t('flats', 'Planos') },
          { value: 'casual_zapatos_mujer', label: t('casual_shoes', 'Casual') },
          { value: 'boho_zapatos', label: t('boho_shoes', 'Bohemio') }
        );
      } else if (subCategory.includes('sandalia') || subCategory.includes('sandal')) {
        styles.push(
          { value: 'sandalia', label: t('sandals', 'Sandalia') },
          { value: 'casual_zapatos_mujer', label: t('casual_shoes', 'Casual') },
          { value: 'boho_zapatos', label: t('boho_shoes', 'Bohemio') },
          { value: 'glamuroso_zapatos', label: t('glamorous_shoes', 'Glamuroso') }
        );
      } else {
        styles.push(
          { value: 'deportivo_zapatos_mujer', label: t('athletic_shoes', 'Deportivo') },
          { value: 'formal_zapatos_mujer', label: t('formal_shoes', 'Formal') },
          { value: 'casual_zapatos_mujer', label: t('casual_shoes', 'Casual') },
          { value: 'elegante_zapatos_mujer', label: t('dress_shoes', 'Elegante') },
          { value: 'tacones', label: t('heels', 'Tacones') },
          { value: 'planos', label: t('flats', 'Planos') },
          { value: 'sandalia', label: t('sandals', 'Sandalia') },
          { value: 'botas_mujer', label: t('boots', 'Botas') },
          { value: 'glamuroso_zapatos', label: t('glamorous_shoes', 'Glamuroso') },
          { value: 'boho_zapatos', label: t('boho_shoes', 'Bohemio') }
        );
      }
    }

    // 👶 BEBÉS
    else if (category === 'bebe') {
      styles.push(
        { value: 'infantil_bebe', label: t('kids', 'Infantil') },
        { value: 'divertido_bebe', label: t('playful', 'Divertido') },
        { value: 'colorido_bebe', label: t('colorful', 'Colorido') },
        { value: 'tematico_bebe', label: t('themed', 'Temático') },
        { value: 'practico_bebe', label: t('practical', 'Práctico') },
        { value: 'suave_bebe', label: t('soft', 'Suave') },
        { value: 'confort_bebe', label: t('comfort', 'Confort') },
        { value: 'moderno_bebe', label: t('modern_baby', 'Moderno') }
      );
    }

    // 👦 NIÑOS
    else if (category === 'garcons') {
      styles.push(
        { value: 'infantil_nino', label: t('kids', 'Infantil') },
        { value: 'divertido_nino', label: t('playful', 'Divertido') },
        { value: 'deportivo_nino', label: t('sporty_kids', 'Deportivo') },
        { value: 'casual_nino', label: t('casual_kids', 'Casual') },
        { value: 'tematico_nino', label: t('themed', 'Temático') },
        { value: 'colorido_nino', label: t('colorful', 'Colorido') },
        { value: 'moderno_nino', label: t('modern_kids', 'Moderno') }
      );
    }

    // 👧 NIÑAS
    else if (category === 'filles') {
      styles.push(
        { value: 'infantil_nina', label: t('kids', 'Infantil') },
        { value: 'divertido_nina', label: t('playful', 'Divertido') },
        { value: 'femenino_nina', label: t('feminine', 'Femenino') },
        { value: 'princesa', label: t('princess', 'Princesa') },
        { value: 'deportivo_nina', label: t('sporty_kids', 'Deportivo') },
        { value: 'casual_nina', label: t('casual_kids', 'Casual') },
        { value: 'tematico_nina', label: t('themed', 'Temático') },
        { value: 'colorido_nina', label: t('colorful', 'Colorido') }
      );
    }

    // ⌚ RELOJES
    else if (category === 'montres') {
      if (subCategory.includes('deportivo') || subCategory.includes('sport')) {
        styles.push(
          { value: 'deportivo_reloj', label: t('sport_watch', 'Deportivo') },
          { value: 'buceo', label: t('diver_watch', 'Buceo') },
          { value: 'cronografo', label: t('chronograph', 'Cronógrafo') }
        );
      } else if (subCategory.includes('lujo') || subCategory.includes('luxury')) {
        styles.push(
          { value: 'lujo_reloj', label: t('luxury_watch', 'Lujo') },
          { value: 'elegante_reloj', label: t('dress_watch', 'Elegante') },
          { value: 'clasico_reloj', label: t('classic_watch', 'Clásico') }
        );
      } else {
        styles.push(
          { value: 'deportivo_reloj', label: t('sport_watch', 'Deportivo') },
          { value: 'elegante_reloj', label: t('dress_watch', 'Elegante') },
          { value: 'lujo_reloj', label: t('luxury_watch', 'Lujo') },
          { value: 'clasico_reloj', label: t('classic_watch', 'Clásico') },
          { value: 'moderno_reloj', label: t('modern_watch', 'Moderno') },
          { value: 'vintage_reloj', label: t('vintage_watch', 'Vintage') },
          { value: 'piloto', label: t('pilot_watch', 'Piloto') },
          { value: 'buceo', label: t('diver_watch', 'Buceo') },
          { value: 'cronografo', label: t('chronograph', 'Cronógrafo') },
          { value: 'minimalista_reloj', label: t('minimalist_watch', 'Minimalista') }
        );
      }
    }

    // 👓 GAFAS
    else if (category === 'lunettes') {
      styles.push(
        { value: 'aviador', label: t('aviator', 'Aviador') },
        { value: 'wayfarer', label: t('wayfarer', 'Wayfarer') },
        { value: 'redondo', label: t('round', 'Redondo') },
        { value: 'cuadrado', label: t('square', 'Cuadrado') },
        { value: 'rectangular', label: t('rectangular', 'Rectangular') },
        { value: 'cat_eye', label: t('cat_eye', 'Cat Eye') },
        { value: 'deportivo_gafas', label: t('sporty_glasses', 'Deportivo') },
        { value: 'elegante_gafas', label: t('elegant_glasses', 'Elegante') },
        { value: 'vintage_gafas', label: t('vintage_glasses', 'Vintage') },
        { value: 'moderno_gafas', label: t('modern_glasses', 'Moderno') },
        { value: 'clasico_gafas', label: t('classic_glasses', 'Clásico') }
      );
    }

    // 💎 JOYERÍA
    else if (category === 'bijoux') {
      styles.push(
        { value: 'clasico_joyeria', label: t('classic_jewelry', 'Clásico') },
        { value: 'moderno_joyeria', label: t('modern_jewelry', 'Moderno') },
        { value: 'vintage_joyeria', label: t('vintage_jewelry', 'Vintage') },
        { value: 'bohemio_joyeria', label: t('boho_jewelry', 'Bohemio') },
        { value: 'minimalista_joyeria', label: t('minimalist_jewelry', 'Minimalista') },
        { value: 'lujo_joyeria', label: t('luxury_jewelry', 'Lujo') },
        { value: 'etnico_joyeria', label: t('ethnic_jewelry', 'Étnico') },
        { value: 'artesanal_joyeria', label: t('artisanal_jewelry', 'Artesanal') },
        { value: 'elegante_joyeria', label: t('elegant_jewelry', 'Elegante') },
        { value: 'glamuroso_joyeria', label: t('glamorous_jewelry', 'Glamuroso') }
      );
    }

    // 👜 BOLSOS Y MALETAS
    else if (category === 'sacs_valises') {
      styles.push(
        { value: 'casual_bolso', label: t('casual_bag', 'Casual') },
        { value: 'elegante_bolso', label: t('elegant_bag', 'Elegante') },
        { value: 'deportivo_bolso', label: t('sporty_bag', 'Deportivo') },
        { value: 'playero_bolso', label: t('beach_bag', 'Playero') },
        { value: 'viaje_bolso', label: t('travel_bag', 'Viaje') },
        { value: 'bandolera', label: t('crossbody_bag', 'Bandolera') },
        { value: 'tote', label: t('tote_bag', 'Tote') },
        { value: 'mochila', label: t('backpack', 'Mochila') },
        { value: 'clutch', label: t('clutch', 'Clutch') },
        { value: 'minimalista_bolso', label: t('minimalist_bag', 'Minimalista') },
        { value: 'vintage_bolso', label: t('vintage_bag', 'Vintage') }
      );
    }

    // 💼 ROPA PROFESIONAL
    else if (category === 'tenues_professionnelles') {
      styles.push(
        { value: 'ejecutivo_pro', label: t('executive', 'Ejecutivo') },
        { value: 'corporativo', label: t('corporate', 'Corporativo') },
        { value: 'formal_pro', label: t('formal', 'Formal') },
        { value: 'business_casual', label: t('business_casual', 'Business Casual') },
        { value: 'uniforme', label: t('uniform', 'Uniforme') },
        { value: 'profesional_medico', label: t('medical', 'Médico') },
        { value: 'profesional_chef', label: t('chef', 'Chef') },
        { value: 'seguridad', label: t('security', 'Seguridad') }
      );
    }

    return styles;
  }, [postData.category, postData.subCategory, t]);

  // 🎯 OBTENER ICONO SEGÚN CATEGORÍA
  const getCategoryIcon = () => {
    const icons = {
      'vetements_homme': '👔',
      'vetements_femme': '👗',
      'chaussures_homme': '👞',
      'chaussures_femme': '👠',
      'bebe': '👶',
      'garcons': '👦',
      'filles': '👧',
      'montres': '⌚',
      'lunettes': '👓',
      'bijoux': '💎',
      'sacs_valises': '👜',
      'tenues_professionnelles': '💼'
    };
    return icons[postData.category] || '🎨';
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-4">
        <div dir={isRTL ? 'rtl' : 'ltr'}>
          <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
            {getCategoryIcon()} {t('style', 'Estilo')}
          </Form.Label>

          {!postData.category ? (
            <Card className="border-0 bg-light">
              <Card.Body className={`text-center py-5 ${isRTL ? 'text-end' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="text-muted mb-3" style={{ fontSize: '2rem' }}>⏳</div>
                <p className="text-muted mb-0">
                  {t('select_category_first', 'Selecciona una categoría primero para ver los estilos disponibles')}
                </p>
              </Card.Body>
            </Card>
          ) : !postData.subCategory ? (
            <Card className="border-0 bg-light">
              <Card.Body className={`text-center py-5 ${isRTL ? 'text-end' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="text-muted mb-3" style={{ fontSize: '2rem' }}>🔍</div>
                <p className="text-muted mb-0">
                  {t('select_subcategory_first', 'Selecciona una subcategoría para ver los estilos disponibles')}
                </p>
              </Card.Body>
            </Card>
          ) : (
            <div>
              <Form.Select
                name="estilo"
                value={postData.estilo || ''}
                onChange={handleChangeInput}
                className="border-0 bg-light py-3 px-3 rounded"
                size="lg"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">
                  {t('select_style', 'Selecciona el estilo')}
                </option>
                {getFilteredStyles.map((style) => (
                  <option key={style.value} value={style.value}>
                    {style.label}
                  </option>
                ))}
              </Form.Select>
 

              
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default React.memo(Estilo);