import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const OfresAbonnements = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('telephones');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* 📱 TIPO PRINCIPAL D'OFFRE */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          📱 {t('offer_type', 'Type d\'offre/abonnement')} *
        </Form.Label>
        <Form.Select
          name="tipoArticulo"
          value={postData.tipoArticulo}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
          required
        >
          <option value="">🔍 {t('select_offer_type', 'Choisissez un type d\'offre')}</option>
          
          {/* 📞 FORFAITS MOBILES */}
          <optgroup label={t('mobile_plans', 'Forfaits mobiles')}>
            <option value="Forfait illimité 4G/5G">{t('unlimited_plan', 'Forfait illimité 4G/5G')}</option>
            <option value="Forfait internet uniquement">{t('internet_only', 'Forfait internet uniquement')}</option>
            <option value="Forfait avec appels">{t('calls_plan', 'Forfait avec appels illimités')}</option>
            <option value="Forfait SMS illimités">{t('sms_plan', 'Forfait SMS illimités')}</option>
            <option value="Forfait data seulement">{t('data_only', 'Forfait data seulement')}</option>
            <option value="Forfait étudiant">{t('student_plan', 'Forfait étudiant')}</option>
            <option value="Forfait senior">{t('senior_plan', 'Forfait senior')}</option>
          </optgroup>
          
          {/* 📡 INTERNET MAISON */}
          <optgroup label={t('home_internet', 'Internet maison')}>
            <option value="Fibre optique">{t('fiber', 'Abonnement fibre optique')}</option>
            <option value="ADSL">{t('adsl', 'Abonnement ADSL')}</option>
            <option value="Internet 4G/5G maison">{t('mobile_home', 'Internet 4G/5G maison')}</option>
            <option value="Internet par satellite">{t('satellite', 'Internet satellite')}</option>
          </optgroup>
          
          {/* 📺 PACKS TV/INTERNET */}
          <optgroup label={t('tv_packs', 'Packs TV/Internet')}>
            <option value="Pack Triple Play">{t('triple_play', 'Pack Triple Play (TV+Internet+Téléphone)')}</option>
            <option value="Pack Double Play">{t('double_play', 'Pack Double Play (TV+Internet)')}</option>
            <option value="Chaînes premium">{t('premium_channels', 'Chaînes premium (Canal+, BeIN, etc.)')}</option>
            <option value="Services streaming">{t('streaming', 'Services streaming (Netflix, Disney+, etc.)')}</option>
          </optgroup>
          
          {/* 💳 CARTES PRÉPAYÉES */}
          <optgroup label={t('prepaid_cards', 'Cartes prépayées')}>
            <option value="Carte SIM prépayée">{t('prepaid_sim', 'Carte SIM prépayée')}</option>
            <option value="Recharge prépayée">{t('prepaid_topup', 'Recharge prépayée')}</option>
            <option value="Carte internet">{t('internet_card', 'Carte internet prépayée')}</option>
            <option value="Carte international">{t('international_card', 'Carte internationale')}</option>
          </optgroup>
          
          {/* 🎮 ABONNEMENTS JEUX */}
          <optgroup label={t('gaming_subscriptions', 'Abonnements jeux')}>
            <option value="Xbox Game Pass">{t('xbox_gamepass', 'Xbox Game Pass')}</option>
            <option value="PlayStation Plus">{t('ps_plus', 'PlayStation Plus')}</option>
            <option value="Nintendo Switch Online">{t('nintendo_online', 'Nintendo Switch Online')}</option>
            <option value="Abonnement cloud gaming">{t('cloud_gaming', 'Cloud gaming (GeForce Now, etc.)')}</option>
          </optgroup>
          
          {/* ☁️ SERVICES CLOUD */}
          <optgroup label={t('cloud_services', 'Services cloud')}>
            <option value="Stockage cloud">{t('cloud_storage', 'Stockage cloud (iCloud, Google One, etc.)')}</option>
            <option value="Sauvegarde en ligne">{t('online_backup', 'Sauvegarde en ligne')}</option>
            <option value="VPN service">{t('vpn_service', 'Service VPN')}</option>
            <option value="Antivirus en ligne">{t('online_antivirus', 'Antivirus en ligne')}</option>
          </optgroup>
          
          {/* 📞 SERVICES TÉLÉPHONIQUES */}
          <optgroup label={t('phone_services', 'Services téléphoniques')}>
            <option value="Numéro virtuel">{t('virtual_number', 'Numéro virtuel')}</option>
            <option value="Répondeur">{t('answering_service', 'Service de répondeur')}</option>
            <option value="Conférence téléphonique">{t('conference_call', 'Conférence téléphonique')}</option>
            <option value="Roaming international">{t('international_roaming', 'Roaming international')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

      {/* ⏱️ DURÉE (OPCIONEL) */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
          ⏱️ {t('duration', 'Durée (optionnel)')}
        </Form.Label>
        <Form.Select
          name="dureeOffre"
          value={postData.dureeOffre}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">📅 {t('select_duration', 'Sélectionnez durée')}</option>
          <option value="1 mois">1 mois</option>
          <option value="3 mois">3 mois</option>
          <option value="6 mois">6 mois</option>
          <option value="12 mois">12 mois</option>
          <option value="24 mois">24 mois</option>
          <option value="Sans engagement">Sans engagement</option>
          <option value="Flexible">Flexible (résiliable à tout moment)</option>
        </Form.Select>
        
        <Form.Text className={`text-muted mt-2 ${isRTL ? 'text-end d-block' : ''}`}>
          💡 {t('offer_tip', 'Spécifiez la durée si l\'offre est un abonnement')}
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default React.memo(OfresAbonnements);