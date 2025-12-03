import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Powerbanks = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('telephones');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* TIPO PRINCIPAL DE POWERBANK */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          🔋 {t('powerbank_type', 'Tipo de power bank')}
        </Form.Label>
        <Form.Select
          name="tipoArticulo"
          value={postData.tipoArticulo}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">{t('select_subcategory', 'Selecciona el tipo de power bank')}</option>
          
          {/* PAR PUISSANCE */}
          <optgroup label={t('by_power', 'Par puissance')}>
            <option value="Power Bank 5000mAh">{t('powerbank_5000', 'Power Bank 5000mAh')}</option>
            <option value="Power Bank 10000mAh">{t('powerbank_10000', 'Power Bank 10000mAh')}</option>
            <option value="Power Bank 20000mAh">{t('powerbank_20000', 'Power Bank 20000mAh')}</option>
            <option value="Power Bank 30000mAh+">{t('powerbank_30000', 'Power Bank 30000mAh+')}</option>
          </optgroup>
          
          {/* CHARGE RAPIDE */}
          <optgroup label={t('fast_charging', 'Charge rapide')}>
            <option value="Power Bank PD 20W">{t('powerbank_pd_20w', 'Power Bank PD 20W')}</option>
            <option value="Power Bank PD 45W">{t('powerbank_pd_45w', 'Power Bank PD 45W')}</option>
            <option value="Power Bank PD 65W+">{t('powerbank_pd_65w', 'Power Bank PD 65W+')}</option>
            <option value="Power Bank GaN">{t('powerbank_gan', 'Power Bank GaN (ultra rapide)')}</option>
          </optgroup>
          
          {/* TYPES SPÉCIAUX */}
          <optgroup label={t('special_types', 'Types spéciaux')}>
            <option value="Power Bank solaire">{t('powerbank_solar', 'Power Bank solaire')}</option>
            <option value="Power Bank MagSafe">{t('powerbank_magsafe', 'Power Bank MagSafe')}</option>
            <option value="Power Bank gaming">{t('powerbank_gaming', 'Power Bank gaming RGB')}</option>
            <option value="Power Bank voiture">{t('powerbank_car', 'Power Bank démarreur voiture')}</option>
            <option value="Power Bank compact">{t('powerbank_compact', 'Power Bank carte de crédit')}</option>
          </optgroup>
          
          {/* MARQUES */}
          <optgroup label={t('by_brand', 'Par marque')}>
            <option value="Anker Power Bank">{t('anker_powerbank', 'Anker Power Bank')}</option>
            <option value="Xiaomi Power Bank">{t('xiaomi_powerbank', 'Xiaomi Power Bank')}</option>
            <option value="Samsung Power Bank">{t('samsung_powerbank', 'Samsung Power Bank')}</option>
            <option value="Belkin Power Bank">{t('belkin_powerbank', 'Belkin Power Bank')}</option>
            <option value="RAVPower">{t('ravpower', 'RAVPower')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

      {/* CARACTERÍSTIQUES TECHNIQUES */}
      <Row className="g-3">
        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('powerbank_capacity', 'Capacité')}
            </Form.Label>
            <Form.Select
              name="capacitePowerbank"
              value={postData.capacitePowerbank}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select_capacity', 'Sélectionnez capacité')}</option>
              <option value="1000-5000mAh">🔋 1000-5000 mAh</option>
              <option value="5001-10000mAh">🔋 5001-10000 mAh</option>
              <option value="10001-20000mAh">🔋 10001-20000 mAh</option>
              <option value="20001-30000mAh">🔋 20001-30000 mAh</option>
              <option value="30000mAh+">🔋 30000 mAh et plus</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3 w-100">
            <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
              {t('powerbank_ports', 'Ports de sortie')}
            </Form.Label>
            <Form.Select
              name="portsPowerbank"
              value={postData.portsPowerbank}
              onChange={handleChangeInput}
              className="form-control border-0 shadow-sm"
            >
              <option value="">{t('select_ports', 'Sélectionnez ports')}</option>
              <option value="1 port">🔌 1 port</option>
              <option value="2 ports">🔌🔌 2 ports</option>
              <option value="3 ports">🔌🔌🔌 3 ports</option>
              <option value="4 ports+">🔌🔌🔌🔌 4 ports et plus</option>
              <option value="USB-C + USB-A">🔌🔌 USB-C + USB-A</option>
              <option value="Wireless">🔋 Sans fil</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
        {t('choose_powerbank_type', 'Sélectionnez le type de power bank et ses caractéristiques')}
      </Form.Text>
    </div>
  );
};

export default React.memo(Powerbanks);