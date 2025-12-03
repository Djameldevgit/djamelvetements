import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const SacsValises = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('sacvalise');
  const isRTL = i18n.language === 'ar';

  return (
    <Card className="border-0 rounded-0 mb-3 shadow-sm" dir={isRTL ? "rtl" : "ltr"}>
      <Card.Body className="p-4">
        {/* FILA 1: SUBCATEGORÍA PRINCIPAL */}
        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group className="w-100">
              <Form.Label className="fw-bold text-dark mb-3 fs-6" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                👜 {t('bags_luggage')}
              </Form.Label>
              <Form.Select
                name="tipoArticulo"
                value={postData.tipoArticulo}
                onChange={handleChangeInput}
                className="form-control border-0 shadow-sm"
                style={{ 
                  width: '100%',
                  maxHeight: 'none',
                  overflow: 'visible',
                  textAlign: isRTL ? 'right' : 'left'
                }}
                dir={isRTL ? 'rtl' : 'ltr'}
                size="lg"
              >
                <option value="">{t('select_bags_subcategory')}</option>
                
                {/* CARTERAS Y MONEDEROS */}
                <optgroup label={t('wallets_cardholders')}>
                  <option value="womens_wallets">{t('womens_wallets')}</option>
                  <option value="mens_wallets">{t('mens_wallets')}</option>
                  <option value="cardholders">{t('cardholders')}</option>
                  <option value="coin_purses">{t('coin_purses')}</option>
                  <option value="travel_wallets">{t('travel_wallets')}</option>
                  <option value="clutch_wallets">{t('clutch_wallets')}</option>
                  <option value="designer_wallets">{t('designer_wallets')}</option>
                </optgroup>
                
                {/* BOLSOS DE MANO */}
                <optgroup label={t('handbags')}>
                  <option value="tote_bags">{t('tote_bags')}</option>
                  <option value="shoulder_bags">{t('shoulder_bags')}</option>
                  <option value="crossbody_bags">{t('crossbody_bags')}</option>
                  <option value="clutch_bags">{t('clutch_bags')}</option>
                  <option value="hobo_bags">{t('hobo_bags')}</option>
                  <option value="satchel_bags">{t('satchel_bags')}</option>
                  <option value="bucket_bags">{t('bucket_bags')}</option>
                  <option value="evening_bags">{t('evening_bags')}</option>
                  <option value="designer_handbags">{t('designer_handbags')}</option>
                </optgroup>
                
                {/* MOCHILAS */}
                <optgroup label={t('backpacks')}>
                  <option value="laptop_backpacks">{t('laptop_backpacks')}</option>
                  <option value="school_backpacks">{t('school_backpacks')}</option>
                  <option value="travel_backpacks">{t('travel_backpacks')}</option>
                  <option value="hiking_backpacks">{t('hiking_backpacks')}</option>
                  <option value="urban_backpacks">{t('urban_backpacks')}</option>
                  <option value="mini_backpacks">{t('mini_backpacks')}</option>
                  <option value="rolling_backpacks">{t('rolling_backpacks')}</option>
                </optgroup>
                
                {/* BOLSOS PROFESIONALES */}
                <optgroup label={t('professional_bags')}>
                  <option value="briefcases">{t('briefcases')}</option>
                  <option value="laptop_bags">{t('laptop_bags')}</option>
                  <option value="messenger_bags">{t('messenger_bags')}</option>
                  <option value="portfolio_bags">{t('portfolio_bags')}</option>
                  <option value="tablet_bags">{t('tablet_bags')}</option>
                  <option value="document_bags">{t('document_bags')}</option>
                </optgroup>
                
                {/* MALETAS Y EQUIPAJE */}
                <optgroup label={t('luggage')}>
                  <option value="suitcases">{t('suitcases')}</option>
                  <option value="carry_on_luggage">{t('carry_on_luggage')}</option>
                  <option value="checked_luggage">{t('checked_luggage')}</option>
                  <option value="hard_shell_luggage">{t('hard_shell_luggage')}</option>
                  <option value="soft_shell_luggage">{t('soft_shell_luggage')}</option>
                  <option value="luggage_sets">{t('luggage_sets')}</option>
                  <option value="rolling_luggage">{t('rolling_luggage')}</option>
                  <option value="duffle_bags">{t('duffle_bags')}</option>
                </optgroup>
                
                {/* BOLSAS DEPORTIVAS */}
                <optgroup label={t('sports_bags')}>
                  <option value="gym_bags">{t('gym_bags')}</option>
                  <option value="shoe_bags">{t('shoe_bags')}</option>
                  <option value="beach_bags">{t('beach_bags')}</option>
                  <option value="swim_bags">{t('swim_bags')}</option>
                  <option value="yoga_bags">{t('yoga_bags')}</option>
                  <option value="cycling_bags">{t('cycling_bags')}</option>
                </optgroup>
                
                {/* BOLSOS ESPECIALIZADOS */}
                <optgroup label={t('specialty_bags')}>
                  <option value="diaper_bags">{t('diaper_bags')}</option>
                  <option value="camera_bags">{t('camera_bags')}</option>
                  <option value="medical_bags">{t('medical_bags')}</option>
                  <option value="cosmetic_bags">{t('cosmetic_bags')}</option>
                  <option value="lunch_bags">{t('lunch_bags')}</option>
                  <option value="cooler_bags">{t('cooler_bags')}</option>
                </optgroup>
                
                <option value="other_bags">{t('other_bags')}</option>
              </Form.Select>
              <Form.Text className="text-muted" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                {t('choose_bags_type')}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        {/* FILA 2: DETALLES ADICIONALES - SOLO SI HAY SUBCATEGORÍA SELECCIONADA */}
        {postData.subCategory && (
          <>
            {/* MATERIALES */}
            <Row className="mb-3">
             
              {/* TAMAÑO */}
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label style={{ textAlign: isRTL ? 'right' : 'left' }}>
                    📏 {t('bag_size')}
                  </Form.Label>
                  <Form.Select
                    name="tallasaco"
                    value={postData.tallasaco || ''}
                    onChange={handleChangeInput}
                    className="form-control border-0 shadow-sm"
                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    <option value="">{t('select_size', 'Sélectionnez la taille')}</option>
                    <option value="mini_bags">{t('mini_bags')}</option>
                    <option value="small_bags">{t('small_bags')}</option>
                    <option value="medium_bags">{t('medium_bags')}</option>
                    <option value="large_bags">{t('large_bags')}</option>
                    <option value="extra_large_bags">{t('extra_large_bags')}</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* TIPO DE CIERRE Y CORREA */}
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label style={{ textAlign: isRTL ? 'right' : 'left' }}>
                    🔒 {t('closure_type')}
                  </Form.Label>
                  <Form.Select
                    name="correa"
                    value={postData.correa || ''}
                    onChange={handleChangeInput}
                    className="form-control border-0 shadow-sm"
                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    <option value="">{t('select_closure', 'Sélectionnez la fermeture')}</option>
                    <option value="zipper_closure">{t('zipper_closure')}</option>
                    <option value="magnetic_closure">{t('magnetic_closure')}</option>
                    <option value="button_closure">{t('button_closure')}</option>
                    <option value="drawstring_closure">{t('drawstring_closure')}</option>
                    <option value="flap_closure">{t('flap_closure')}</option>
                    <option value="open_top">{t('open_top')}</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label style={{ textAlign: isRTL ? 'right' : 'left' }}>
                    ⛓️ {t('strap_type')}
                  </Form.Label>
                  <Form.Select
                    name="tipodsangle"
                    value={postData.tipodsangle || ''}
                    onChange={handleChangeInput}
                    className="form-control border-0 shadow-sm"
                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    <option value="">{t('select_strap', 'Sélectionnez la sangle')}</option>
                    <option value="adjustable_strap">{t('adjustable_strap')}</option>
                    <option value="chain_strap">{t('chain_strap')}</option>
                    <option value="leather_strap">{t('leather_strap')}</option>
                    <option value="fabric_strap">{t('fabric_strap')}</option>
                    <option value="detachable_strap">{t('detachable_strap')}</option>
                    <option value="no_strap">{t('no_strap')}</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

          
          </>
        )}
      </Card.Body>

      {/* ESTILOS RTL ESPECÍFICOS */}
      <style jsx>{`
        .form-select {
          max-height: none !important;
          overflow: visible !important;
        }
        .form-select option {
          padding: 12px 16px;
          border-bottom: 1px solid #f0f0f0;
        }
        .form-select optgroup {
          font-weight: bold;
          color: #666;
          font-style: normal;
          padding: 8px 12px;
          background-color: #f8f9fa;
        }
        /* Estilos RTL específicos */
        [dir="rtl"] .form-select {
          text-align: right;
        }
        [dir="rtl"] .form-label {
          text-align: right;
        }
        [dir="rtl"] .form-text {
          text-align: right;
        }
        [dir="rtl"] .card-body {
          text-align: right;
        }
      `}</style>
    </Card>
  );
};

export default React.memo(SacsValises);