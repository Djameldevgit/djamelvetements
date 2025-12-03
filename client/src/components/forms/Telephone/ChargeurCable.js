import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ChargeurCable = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('telephones');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* 🔌 TIPO PRINCIPAL DE CHARGEUR/CÂBLE */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          🔌 {t('charger_cable_type', 'Type de chargeur/câble')} *
        </Form.Label>
        <Form.Select
          name="tipoArticulo"
          value={postData.tipoArticulo}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
          required
        >
          <option value="">🔍 {t('select_charger_type', 'Choisissez un type de chargeur/câble')}</option>
          
          {/* 🔌 CHARGEURS MURAUX */}
          <optgroup label={t('wall_chargers', 'Chargeurs muraux')}>
            <option value="Chargeur rapide">{t('fast_charger', 'Chargeur rapide (Quick Charge/PD)')}</option>
            <option value="Chargeur standard">{t('standard_charger', 'Chargeur standard (5V/2A)')}</option>
            <option value="Chargeur GaN">{t('gan_charger', 'Chargeur GaN (compact et rapide)')}</option>
            <option value="Chargeur multiple ports">{t('multi_port_charger', 'Chargeur multiple ports')}</option>
            <option value="Chargeur voiture">{t('car_charger', 'Chargeur voiture/allume-cigare')}</option>
            <option value="Chargeur voyage">{t('travel_charger', 'Chargeur voyage (adaptateurs inclus)')}</option>
            <option value="Chargeur sans fil">{t('wireless_charger', 'Chargeur sans fil (pad/stand)')}</option>
          </optgroup>
          
          {/* 🔗 CÂBLES DE CHARGE */}
          <optgroup label={t('charging_cables', 'Câbles de charge')}>
            <option value="Câble USB-C vers USB-C">{t('usbc_to_usbc', 'Câble USB-C vers USB-C')}</option>
            <option value="Câble USB-C vers USB-A">{t('usbc_to_usba', 'Câble USB-C vers USB-A')}</option>
            <option value="Câble Lightning vers USB">{t('lightning_to_usb', 'Câble Lightning vers USB')}</option>
            <option value="Câble Micro USB">{t('micro_usb', 'Câble Micro USB')}</option>
            <option value="Câble charge rapide">{t('fast_charge_cable', 'Câble charge rapide (3A+)')}</option>
            <option value="Câble données">{t('data_cable', 'Câble données + charge')}</option>
            <option value="Câble magnétique">{t('magnetic_cable', 'Câble magnétique')}</option>
          </optgroup>
          
          {/* ⚡ CHARGEURS SPÉCIAUX */}
          <optgroup label={t('special_chargers', 'Chargeurs spéciaux')}>
            <option value="Chargeur MagSafe">{t('magsafe_charger', 'Chargeur MagSafe (Apple)')}</option>
            <option value="Chargeur gaming">{t('gaming_charger', 'Chargeur gaming (RGB/design)')}</option>
            <option value="Chargeur solaire">{t('solar_charger', 'Chargeur solaire portable')}</option>
            <option value="Chargeur batterie externe">{t('powerbank_charger', 'Chargeur pour batterie externe')}</option>
            <option value="Chargeur multiple appareils">{t('multi_device_charger', 'Chargeur multiple appareils')}</option>
            <option value="Chargeur induction">{t('induction_charger', 'Chargeur à induction')}</option>
          </optgroup>
          
          {/* 🚗 CHARGEURS VOITURE */}
          <optgroup label={t('car_chargers', 'Chargeurs voiture')}>
            <option value="Chargeur allume-cigare">{t('cigarette_lighter', 'Chargeur allume-cigare standard')}</option>
            <option value="Chargeur rapide voiture">{t('fast_car_charger', 'Chargeur rapide voiture')}</option>
            <option value="Chargeur double port voiture">{t('dual_car_charger', 'Chargeur double port voiture')}</option>
            <option value="Chargeur USB-C voiture">{t('usbc_car_charger', 'Chargeur USB-C voiture')}</option>
            <option value="Chargeur voiture avec voltmètre">{t('voltmeter_car_charger', 'Chargeur avec voltmètre intégré')}</option>
          </optgroup>
          
          {/* 📱 MARQUES SPÉCIFIQUES */}
          <optgroup label={t('specific_brands', 'Marques spécifiques')}>
            <option value="Chargeur Apple original">{t('apple_original', 'Chargeur Apple original')}</option>
            <option value="Chargeur Samsung original">{t('samsung_original', 'Chargeur Samsung original')}</option>
            <option value="Câble Apple MFi certifié">{t('mfi_certified', 'Câble Apple MFi certifié')}</option>
            <option value="Chargeur Anker">{t('anker_charger', 'Chargeur Anker')}</option>
            <option value="Chargeur Belkin">{t('belkin_charger', 'Chargeur Belkin')}</option>
            <option value="Chargeur UGREEN">{t('ugreen_charger', 'Chargeur UGREEN')}</option>
          </optgroup>
          
          {/* 🔩 ACCESSOIRES CHARGE */}
          <optgroup label={t('charging_accessories', 'Accessoires charge')}>
            <option value="Adaptateur prise">{t('plug_adapter', 'Adaptateur prise (voyage)')}</option>
            <option value="Support chargeur">{t('charger_stand', 'Support/organisateur chargeur')}</option>
            <option value="Protecteur câble">{t('cable_protector', 'Protecteur de câble (angle)')}</option>
            <option value="Boîtier enrouleur">{t('cable_winder', 'Boîtier enrouleur câble')}</option>
            <option value="Testeur câble">{t('cable_tester', 'Testeur de câble USB')}</option>
            <option value="Nettoyant port">{t('port_cleaner', 'Nettoyant ports de charge')}</option>
          </optgroup>
          
          {/* 🔋 CHARGEURS UNIVERSELS */}
          <optgroup label={t('universal_chargers', 'Chargeurs universels')}>
            <option value="Chargeur universel multiple tips">{t('universal_multitip', 'Chargeur universel avec tips multiples')}</option>
            <option value="Adaptateur universel">{t('universal_adapter', 'Adaptateur universel charge')}</option>
            <option value="Chargeur pour tous appareils">{t('all_device_charger', 'Chargeur compatible tous appareils')}</option>
            <option value="Kit voyage universel">{t('universal_travel_kit', 'Kit voyage universel')}</option>
          </optgroup>
          
          {/* 🎮 CHARGEURS GAMING */}
          <optgroup label={t('gaming_chargers', 'Chargeurs gaming')}>
            <option value="Chargeur console portable">{t('portable_console_charger', 'Chargeur console portable (Switch, Steam Deck)')}</option>
            <option value="Chargeur manette gaming">{t('gaming_controller_charger', 'Chargeur manette gaming')}</option>
            <option value="Chargeur station gaming">{t('gaming_charging_station', 'Station de charge gaming')}</option>
            <option value="Chargeur RGB gaming">{t('rgb_gaming_charger', 'Chargeur gaming avec RGB')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

      {/* ⚡ PUISSANCE (OPCIONEL) */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
          ⚡ {t('power_output', 'Puissance de sortie (optionnel)')}
        </Form.Label>
        <Form.Select
          name="puissanceChargeur"
          value={postData.puissanceChargeur}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">🔋 {t('select_power', 'Sélectionnez puissance')}</option>
          <option value="5W (charge lente)">5W (charge lente)</option>
          <option value="10W (charge standard)">10W (charge standard)</option>
          <option value="18W (charge rapide)">18W (charge rapide)</option>
          <option value="20W (charge rapide)">20W (charge rapide)</option>
          <option value="30W (charge super rapide)">30W (charge super rapide)</option>
          <option value="45W (charge ultra rapide)">45W (charge ultra rapide)</option>
          <option value="65W+ (charge extrême)">65W+ (charge extrême)</option>
          <option value="Variable (ajustable)">Variable (puissance ajustable)</option>
        </Form.Select>
        
        <Form.Text className={`text-muted mt-2 ${isRTL ? 'text-end d-block' : ''}`}>
          💡 {t('charger_tip', 'Indiquez la puissance si c\'est un chargeur rapide')}
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default React.memo(ChargeurCable);