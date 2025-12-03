import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Accessoire = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('telephones');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* 🎁 TIPO PRINCIPAL D'ACCESSOIRE */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          🎁 {t('accessory_type', 'Type d\'accessoire')} *
        </Form.Label>
        <Form.Select
          name="tipoArticulo"
          value={postData.tipoArticulo}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
          required
        >
          <option value="">🔍 {t('select_accessory', 'Choisissez un type d\'accessoire')}</option>
          
          {/* 📱 SUPPORTS ET STABILISATEURS */}
          <optgroup label={t('holders_stabilizers', 'Supports et stabilisateurs')}>
            <option value="Support voiture magnétique">{t('magnetic_car_holder', 'Support voiture magnétique')}</option>
            <option value="Support voiture ventouse">{t('suction_car_holder', 'Support voiture ventouse')}</option>
            <option value="Support vélo/moto">{t('bike_motorcycle_holder', 'Support vélo/moto')}</option>
            <option value="Trépied téléphone">{t('phone_tripod', 'Trépied pour téléphone')}</option>
            <option value="Stabilisateur vidéo">{t('video_stabilizer', 'Stabilisateur vidéo (gimbal)')}</option>
            <option value="Support bureau">{t('desk_stand', 'Support bureau/table')}</option>
            <option value="Support mural">{t('wall_mount', 'Support mural')}</option>
            <option value="Support lit">{t('bed_stand', 'Support lit/chevet')}</option>
          </optgroup>
          
          {/* 🎧 ACCESSOIRES AUDIO */}
          <optgroup label={t('audio_accessories', 'Accessoires audio')}>
            <option value="Adaptateur audio">{t('audio_adapter', 'Adaptateur audio (jack vers USB-C/Lightning)')}</option>
            <option value="Splitter audio">{t('audio_splitter', 'Splitter audio (2 personnes)')}</option>
            <option value="Booster audio">{t('audio_booster', 'Booster/amplificateur audio')}</option>
            <option value="Microphone externe">{t('external_microphone', 'Microphone externe pour téléphone')}</option>
            <option value="Câble audio haute qualité">{t('premium_audio_cable', 'Câble audio haute qualité')}</option>
          </optgroup>
          
          {/* 📷 ACCESSOIRES PHOTO/VIDÉO */}
          <optgroup label={t('photo_video_accessories', 'Accessoires photo/vidéo')}>
            <option value="Objectif téléphone">{t('phone_lens', 'Objectif pour téléphone (grand-angle, macro)')}</option>
            <option value="Kit photographie">{t('photography_kit', 'Kit photographie mobile')}</option>
            <option value="Flash externe">{t('external_flash', 'Flash externe pour téléphone')}</option>
            <option value="Support selfie">{t('selfie_stick', 'Bâton selfie/téléscope')}</option>
            <option value="Lampe LED">{t('led_light', 'Lampe LED pour vidéo')}</option>
            <option value="Filtres photo">{t('photo_filters', 'Filtres pour objectif téléphone')}</option>
          </optgroup>
          
          {/* 🔩 OUTILS ET ENTRETIEN */}
          <optgroup label={t('tools_maintenance', 'Outils et entretien')}>
            <option value="Kit de nettoyage">{t('cleaning_kit', 'Kit de nettoyage écran')}</option>
            <option value="Tournevis précision">{t('precision_screwdriver', 'Tournevis de précision')}</option>
            <option value="Kit réparation téléphone">{t('phone_repair_kit', 'Kit réparation téléphone')}</option>
            <option value="Spudger outil">{t('spudger_tool', 'Spudger/outil d\'ouverture')}</option>
            <option value="Brosse nettoyage ports">{t('port_cleaning_brush', 'Brosse nettoyage ports')}</option>
            <option value="Gel désinfectant">{t('disinfectant_gel', 'Gel désinfectant écran')}</option>
          </optgroup>
          
          {/* 🎮 ACCESSOIRES GAMING */}
          <optgroup label={t('gaming_accessories', 'Accessoires gaming')}>
            <option value="Ventilateur cooling">{t('cooling_fan', 'Ventilateur cooling téléphone')}</option>
            <option value="Triggers gaming">{t('gaming_triggers', 'Triggers/gaichettes gaming')}</option>
            <option value="Support gaming">{t('gaming_stand', 'Support gaming inclinable')}</option>
            <option value="Accessoires contrôleurs">{t('controller_accessories', 'Accessoires pour manettes')}</option>
            <option value="Éclairage RGB">{t('rgb_lighting', 'Éclairage RGB gaming')}</option>
          </optgroup>
          
          {/* 🛡️ PROTECTION SUPPLÉMENTAIRE */}
          <optgroup label={t('extra_protection', 'Protection supplémentaire')}>
            <option value="Sangle/bracelet sécurité">{t('safety_strap', 'Sangle/bracelet de sécurité')}</option>
            <option value="Étui étanche">{t('waterproof_case', 'Étui étanche téléphone')}</option>
            <option value="Protection poussière">{t('dust_protector', 'Protection contre poussière')}</option>
            <option value="Antivol téléphone">{t('phone_lock', 'Antivol pour téléphone')}</option>
            <option value="Film caméra">{t('camera_protector', 'Film protection caméra')}</option>
          </optgroup>
          
          {/* 🔋 ACCESSOIRES ÉNERGIE */}
          <optgroup label={t('energy_accessories', 'Accessoires énergie')}>
            <option value="Adaptateur voyage">{t('travel_adapter', 'Adaptateur voyage international')}</option>
            <option value="Interrupteur prise">{t('power_switch', 'Interrupteur prise intelligent')}</option>
            <option value="Multiprise USB">{t('usb_power_strip', 'Multiprise USB multiple ports')}</option>
            <option value="Câble rallonge">{t('extension_cable', 'Câble rallonge USB')}</option>
            <option value="Testeur USB">{t('usb_tester', 'Testeur USB (voltage/courant)')}</option>
          </optgroup>
          
          {/* 🏠 ACCESSOIRES MAISON */}
          <optgroup label={t('home_accessories', 'Accessoires maison')}>
            <option value="Dock de charge">{t('charging_dock', 'Dock/station de charge')}</option>
            <option value="Réveil dock">{t('alarm_dock', 'Réveil/dock numérique')}</option>
            <option value="Support cuisine">{t('kitchen_holder', 'Support cuisine/salle de bain')}</option>
            <option value="Porte-téléphone réfrigérateur">{t('fridge_holder', 'Porte-téléphone réfrigérateur')}</option>
            <option value="Organisateur bureau">{t('desk_organizer', 'Organisateur bureau câbles')}</option>
          </optgroup>
          
          {/* 🎨 ACCESSOIRES DÉCORATIFS */}
          <optgroup label={t('decorative_accessories', 'Accessoires décoratifs')}>
            <option value="Charms/porte-clés">{t('charms_keychains', 'Charms/porte-clés téléphone')}</option>
            <option value="Stickers décoratifs">{t('decorative_stickers', 'Stickers décoratifs téléphone')}</option>
            <option value="Paillettes/strass">{t('glitter_rhinestones', 'Paillettes/strass décoratifs')}</option>
            <option value="Anneau pop socket">{t('pop_socket', 'Anneau/pop socket')}</option>
            <option value="Bracelet main libre">{t('hands_free_band', 'Bracelet main libre')}</option>
          </optgroup>
          
          {/* 🔗 ACCESSOIRES CONNECTIVITÉ */}
          <optgroup label={t('connectivity_accessories', 'Accessoires connectivité')}>
            <option value="Dongle HDMI">{t('hdmi_dongle', 'Dongle HDMI (téléphone vers TV)')}</option>
            <option value="Adaptateur Ethernet">{t('ethernet_adapter', 'Adaptateur Ethernet USB')}</option>
            <option value="Transmetteur Bluetooth">{t('bluetooth_transmitter', 'Transmetteur Bluetooth audio')}</option>
            <option value="Répéteur Wi-Fi">{t('wifi_extender', 'Répéteur Wi-Fi portable')}</option>
            <option value="Clé OTG">{t('otg_key', 'Clé OTG (USB On-The-Go)')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

      {/* 📱 COMPATIBILITÉ (OPCIONEL) */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
          📱 {t('compatibility', 'Compatibilité (optionnel)')}
        </Form.Label>
        <Form.Select
          name="compatibiliteAccessoire"
          value={postData.compatibiliteAccessoire}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">🔧 {t('select_compatibility', 'Sélectionnez compatibilité')}</option>
          <option value="iPhone">🍎 iPhone</option>
          <option value="Samsung">🔵 Samsung</option>
          <option value="Android">🤖 Android (tous)</option>
          <option value="Universel">🌐 Universel</option>
          <option value="Tablette iPad">💻 iPad</option>
          <option value="Tablette Android">💻 Tablette Android</option>
          <option value="Smartwatch">⌚ Smartwatch</option>
          <option value="Tous appareils">📱 Tous appareils</option>
        </Form.Select>
        
        <Form.Text className={`text-muted mt-2 ${isRTL ? 'text-end d-block' : ''}`}>
          💡 {t('accessory_tip', 'Indiquez la compatibilité si l\'accessoire est spécifique')}
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default React.memo(Accessoire);