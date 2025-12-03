import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const FixFax = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('telephones');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* 📞 TIPO PRINCIPAL DE TÉLÉPHONE FIXE/FAX */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          📞 {t('fixed_phone_type', 'Type de téléphone fixe/fax')} *
        </Form.Label>
        <Form.Select
          name="tipoArticulo"
          value={postData.tipoArticulo}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
          required
        >
          <option value="">🔍 {t('select_phone_type', 'Choisissez un type de téléphone/fax')}</option>
          
          {/* 🏠 TÉLÉPHONES FIXES CLASSIQUES */}
          <optgroup label={t('classic_phones', 'Téléphones fixes classiques')}>
            <option value="Téléphone fixe à fil">{t('wired_phone', 'Téléphone fixe à fil')}</option>
            <option value="Téléphone fixe sans fil DECT">{t('cordless_phone', 'Téléphone sans fil DECT')}</option>
            <option value="Téléphone fixe mural">{t('wall_phone', 'Téléphone fixe mural')}</option>
            <option value="Téléphone fixe de bureau">{t('desk_phone', 'Téléphone fixe de bureau')}</option>
            <option value="Téléphone fixe analogique">{t('analog_phone', 'Téléphone fixe analogique')}</option>
            <option value="Téléphone fixe numérique">{t('digital_phone', 'Téléphone fixe numérique')}</option>
          </optgroup>
          
          {/* 👨‍🦳 TÉLÉPHONES POUR SENIORS */}
          <optgroup label={t('senior_phones', 'Téléphones pour seniors')}>
            <option value="Téléphone senior gros boutons">{t('big_button_phone', 'Téléphone senior gros boutons')}</option>
            <option value="Téléphone senior avec SOS">{t('sos_phone', 'Téléphone senior avec bouton SOS')}</option>
            <option value="Téléphone senior amplifié">{t('amplified_phone', 'Téléphone senior son amplifié')}</option>
            <option value="Téléphone senior simplifié">{t('simple_phone', 'Téléphone senior interface simplifiée')}</option>
          </optgroup>
          
          {/* 💼 TÉLÉPHONES PROFESSIONNELS */}
          <optgroup label={t('professional_phones', 'Téléphones professionnels')}>
            <option value="Téléphone d'affaires">{t('business_phone', 'Téléphone d\'affaires/multiligne')}</option>
            <option value="Téléphone IP">{t('ip_phone', 'Téléphone IP (VoIP)')}</option>
            <option value="Téléphone conférence">{t('conference_phone', 'Téléphone conférence')}</option>
            <option value="Téléphone standard">{t('reception_phone', 'Téléphone standard/réception')}</option>
            <option value="Téléphone avec afficheur">{t('display_phone', 'Téléphone avec grand afficheur')}</option>
          </optgroup>
          
          {/* 📠 MACHINES FAX */}
          <optgroup label={t('fax_machines', 'Machines fax')}>
            <option value="Fax simple">{t('simple_fax', 'Machine fax simple')}</option>
            <option value="Fax multifonction">{t('multifunction_fax', 'Fax multifonction (impression/copie)')}</option>
            <option value="Fax numérique">{t('digital_fax', 'Fax numérique')}</option>
            <option value="Fax analogique">{t('analog_fax', 'Fax analogique')}</option>
            <option value="Fax portable">{t('portable_fax', 'Fax portable')}</option>
          </optgroup>
          
          {/* 📞 COMBINAISONS TÉLÉPHONE/FAX */}
          <optgroup label={t('phone_fax_combos', 'Combinaisons téléphone/fax')}>
            <option value="Téléphone avec fax intégré">{t('phone_with_fax', 'Téléphone avec fax intégré')}</option>
            <option value="Fax avec téléphone">{t('fax_with_phone', 'Machine fax avec téléphone')}</option>
            <option value="Combinaison sans fil">{t('cordless_combo', 'Combinaison sans fil téléphone/fax')}</option>
          </optgroup>
          
          {/* 🎨 TÉLÉPHONES DESIGN */}
          <optgroup label={t('design_phones', 'Téléphones design')}>
            <option value="Téléphone rétro">{t('retro_phone', 'Téléphone style rétro')}</option>
            <option value="Téléphone design moderne">{t('modern_design', 'Téléphone design moderne')}</option>
            <option value="Téléphone couleur">{t('colored_phone', 'Téléphone couleur unique')}</option>
            <option value="Téléphone vintage">{t('vintage_phone', 'Téléphone vintage')}</option>
          </optgroup>
          
          {/* 🔩 ACCESSOIRES FIXES/FAX */}
          <optgroup label={t('accessories', 'Accessoires téléphone fixe/fax')}>
            <option value="Combinaison sans fil">{t('cordless_set', 'Combinaison sans fil (base + combinés)')}</option>
            <option value="Combiné supplémentaire">{t('extra_handset', 'Combiné supplémentaire sans fil')}</option>
            <option value="Batterie téléphone sans fil">{t('cordless_battery', 'Batterie pour téléphone sans fil')}</option>
            <option value="Chargeur combiné">{t('handset_charger', 'Chargeur pour combiné')}</option>
            <option value="Rouleau fax">{t('fax_roll', 'Rouleau papier pour fax')}</option>
            <option value="Cartouche encre fax">{t('fax_ink', 'Cartouche encre pour fax')}</option>
            <option value="Câble téléphonique">{t('phone_cable', 'Câble téléphonique RJ11')}</option>
            <option value="Adaptateur téléphone">{t('phone_adapter', 'Adaptateur téléphonique')}</option>
          </optgroup>
          
          {/* 🆘 TÉLÉPHONES SPÉCIAUX */}
          <optgroup label={t('special_phones', 'Téléphones spéciaux')}>
            <option value="Téléphone étanche">{t('waterproof_phone', 'Téléphone étanche')}</option>
            <option value="Téléphone robuste">{t('rugged_phone', 'Téléphone robuste (chantier)')}</option>
            <option value="Téléphone sans écran">{t('no_screen_phone', 'Téléphone sans écran')}</option>
            <option value="Téléphone avec radio">{t('radio_phone', 'Téléphone avec radio FM')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

      {/* 🔌 TYPE DE CONNEXION (OPCIONEL) */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
          🔌 {t('connection_type', 'Type de connexion (optionnel)')}
        </Form.Label>
        <Form.Select
          name="typeConnexionFixFax"
          value={postData.typeConnexionFixFax}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">🔗 {t('select_connection', 'Sélectionnez connexion')}</option>
          <option value="RJ11 (filaire)">🔗 RJ11 (filaire classique)</option>
          <option value="Sans fil DECT">📡 Sans fil DECT</option>
          <option value="VoIP">🌐 VoIP (Internet)</option>
          <option value="Mixte filaire/sans fil">🔗📡 Mixte filaire/sans fil</option>
          <option value="Analogique">📞 Analogique</option>
          <option value="Numérique">💻 Numérique</option>
          <option value="Sans connexion (autonome)">🔋 Autonome (sans connexion)</option>
        </Form.Select>
        
        <Form.Text className={`text-muted mt-2 ${isRTL ? 'text-end d-block' : ''}`}>
          💡 {t('fixfax_tip', 'Spécifiez le type de connexion si important')}
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default React.memo(FixFax);