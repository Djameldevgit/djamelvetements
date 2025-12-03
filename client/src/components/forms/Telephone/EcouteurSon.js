import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const EcouteurSon = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('telephones');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* 🎧 TIPO PRINCIPAL D'ÉCOUTEURS/CASQUES */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          🎧 {t('headphone_type', 'Type d\'écouteurs/casques')} *
        </Form.Label>
        <Form.Select
          name="tipoArticulo"
          value={postData.tipoArticulo}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
          required
        >
          <option value="">🔍 {t('select_headphone_type', 'Choisissez un type d\'écouteurs/casques')}</option>
          
          {/* 🎧 ÉCOUTEURS INTRA-AURICULAIRES */}
          <optgroup label={t('in_ear', 'Écouteurs intra-auriculaires')}>
            <option value="Écouteurs filaires">{t('wired_earphones', 'Écouteurs filaires')}</option>
            <option value="Écouteurs sans fil">{t('wireless_earphones', 'Écouteurs sans fil')}</option>
            <option value="Écouteurs Bluetooth">{t('bluetooth_earphones', 'Écouteurs Bluetooth')}</option>
            <option value="Écouteurs sport">{t('sport_earphones', 'Écouteurs sport (étanches)')}</option>
            <option value="Écouteurs gaming">{t('gaming_earphones', 'Écouteurs gaming')}</option>
            <option value="Écouteurs avec réduction de bruit">{t('noise_cancelling', 'Écouteurs avec réduction de bruit (ANC)')}</option>
          </optgroup>
          
          {/* 🎧 CASQUES AUDIO */}
          <optgroup label={t('headphones', 'Casques audio')}>
            <option value="Casques circum-auriculaires">{t('over_ear', 'Casques circum-auriculaires (over-ear)')}</option>
            <option value="Casques supra-auriculaires">{t('on_ear', 'Casques supra-auriculaires (on-ear)')}</option>
            <option value="Casques sans fil">{t('wireless_headphones', 'Casques sans fil')}</option>
            <option value="Casques Bluetooth">{t('bluetooth_headphones', 'Casques Bluetooth')}</option>
            <option value="Casques gaming">{t('gaming_headphones', 'Casques gaming')}</option>
            <option value="Casques studio">{t('studio_headphones', 'Casques studio (monitoring)')}</option>
            <option value="Casques avec ANC">{t('anc_headphones', 'Casques avec réduction de bruit active')}</option>
          </optgroup>
          
          {/* 🔗 ÉCOUTEURS SPÉCIAUX */}
          <optgroup label={t('special_earphones', 'Écouteurs spéciaux')}>
            <option value="Écouteurs conduction osseuse">{t('bone_conduction', 'Écouteurs conduction osseuse')}</option>
            <option value="Écouteurs pour dormir">{t('sleep_earphones', 'Écouteurs pour dormir')}</option>
            <option value="Écouteurs étanches">{t('waterproof_earphones', 'Écouteurs étanches (natation)')}</option>
            <option value="Écouteurs pour enfants">{t('kids_earphones', 'Écouteurs pour enfants')}</option>
            <option value="Écouteurs audiométrie">{t('hearing_aid', 'Écouteurs audiométrie')}</option>
          </optgroup>
          
          {/* 🍎 MARQUES SPÉCIFIQUES */}
          <optgroup label={t('specific_brands', 'Marques spécifiques')}>
            <option value="AirPods">{t('airpods', 'Apple AirPods')}</option>
            <option value="AirPods Pro">{t('airpods_pro', 'Apple AirPods Pro')}</option>
            <option value="AirPods Max">{t('airpods_max', 'Apple AirPods Max')}</option>
            <option value="Écouteurs Samsung">{t('samsung_earphones', 'Samsung Galaxy Buds')}</option>
            <option value="Écouteurs Sony">{t('sony_earphones', 'Sony WF/WH Series')}</option>
            <option value="Écouteurs Bose">{t('bose_earphones', 'Bose QuietComfort')}</option>
            <option value="Écouteurs Beats">{t('beats_earphones', 'Beats by Dre')}</option>
          </optgroup>
          
          {/* 🔩 ACCESSOIRES AUDIO */}
          <optgroup label={t('audio_accessories', 'Accessoires audio')}>
            <option value="Étuis de charge">{t('charging_case', 'Étuis de charge pour écouteurs')}</option>
            <option value="Embouts remplacement">{t('ear_tips', 'Embouts de remplacement (silicone/mousse)')}</option>
            <option value="Câbles audio">{t('audio_cables', 'Câbles audio (3.5mm, USB-C, Lightning)')}</option>
            <option value="Adaptateurs audio">{t('audio_adapters', 'Adaptateurs audio (jack vers USB-C/Lightning)')}</option>
            <option value="Batteries remplacement">{t('replacement_batteries', 'Batteries de remplacement')}</option>
            <option value="Kits réparation">{t('repair_kits', 'Kits de réparation écouteurs')}</option>
            <option value="Étuis protection">{t('protective_cases', 'Étuis de protection')}</option>
          </optgroup>
          
          {/* 🏃 SPORT ET FITNESS */}
          <optgroup label={t('sport_fitness', 'Sport et fitness')}>
            <option value="Écouteurs running">{t('running_earphones', 'Écouteurs running (anti-transpiration)')}</option>
            <option value="Écouteurs gym">{t('gym_earphones', 'Écouteurs gym/fitness')}</option>
            <option value="Écouteurs vélo">{t('cycling_earphones', 'Écouteurs vélo (conduction osseuse)')}</option>
            <option value="Casques sport">{t('sport_headphones', 'Casques sport')}</option>
          </optgroup>
          
          {/* 💼 PROFESSIONNEL */}
          <optgroup label={t('professional_audio', 'Audio professionnel')}>
            <option value="Casques DJ">{t('dj_headphones', 'Casques DJ')}</option>
            <option value="Écouteurs monitoring">{t('monitoring_earphones', 'Écouteurs monitoring')}</option>
            <option value="Casques aviation">{t('aviation_headphones', 'Casques aviation/pilote')}</option>
            <option value="Casques chantier">{t('construction_headphones', 'Casques chantier (avec protection auditive)')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

      {/* 🎵 TYPE DE CONNEXION (OPCIONEL) */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
          🎵 {t('connection_type', 'Type de connexion (optionnel)')}
        </Form.Label>
        <Form.Select
          name="typeConnexionAudio"
          value={postData.typeConnexionAudio}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">🔗 {t('select_connection', 'Sélectionnez connexion')}</option>
          <option value="Bluetooth">📡 Bluetooth</option>
          <option value="Filaire 3.5mm">🔌 Filaire jack 3.5mm</option>
          <option value="USB-C">🔌 USB-C</option>
          <option value="Lightning">🔌 Lightning (Apple)</option>
          <option value="Sans fil 2.4GHz">📡 Sans fil 2.4GHz (dongle)</option>
          <option value="Mixte (filaire/sans fil)">🔌📡 Mixte filaire/sans fil</option>
          <option value="Aucune (autonome)">🔋 Autonome (sans connexion)</option>
        </Form.Select>
        
        <Form.Text className={`text-muted mt-2 ${isRTL ? 'text-end d-block' : ''}`}>
          💡 {t('audio_tip', 'Spécifiez le type de connexion si important')}
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default React.memo(EcouteurSon);