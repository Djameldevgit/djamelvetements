import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const CartsMemoire = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('telephones');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* 💾 TIPO PRINCIPAL DE CARTE MÉMOIRE */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          💾 {t('memory_card_type', 'Type de carte mémoire')} *
        </Form.Label>
        <Form.Select
          name="tipoArticulo"
          value={postData.tipoArticulo}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
          required
        >
          <option value="">🔍 {t('select_memory_card', 'Choisissez un type de carte mémoire')}</option>
          
          {/* 📱 CARTES MICROSD */}
          <optgroup label={t('microsd_cards', 'Cartes MicroSD')}>
            <option value="Carte MicroSD">{t('microsd', 'Carte MicroSD standard')}</option>
            <option value="Carte MicroSDHC">{t('microsdhc', 'Carte MicroSDHC (jusqu\'à 32GB)')}</option>
            <option value="Carte MicroSDXC">{t('microsdxc', 'Carte MicroSDXC (jusqu\'à 2TB)')}</option>
            <option value="Carte MicroSD A1/A2">{t('microsd_a1a2', 'Carte MicroSD A1/A2 (applications)')}</option>
            <option value="Carte MicroSD UHS-I">{t('microsd_uhsi', 'Carte MicroSD UHS-I (classe 10)')}</option>
            <option value="Carte MicroSD UHS-II">{t('microsd_uhsii', 'Carte MicroSD UHS-II (haute vitesse)')}</option>
            <option value="Carte MicroSD V30">{t('microsd_v30', 'Carte MicroSD V30 (vidéo 4K)')}</option>
            <option value="Carte MicroSD V60/V90">{t('microsd_v60v90', 'Carte MicroSD V60/V90 (vidéo 8K)')}</option>
          </optgroup>
          
          {/* 💾 CARTES SD */}
          <optgroup label={t('sd_cards', 'Cartes SD')}>
            <option value="Carte SD">{t('sd_card', 'Carte SD standard')}</option>
            <option value="Carte SDHC">{t('sdhc_card', 'Carte SDHC (jusqu\'à 32GB)')}</option>
            <option value="Carte SDXC">{t('sdxc_card', 'Carte SDXC (jusqu\'à 2TB)')}</option>
            <option value="Carte SDUC">{t('sduc_card', 'Carte SDUC (jusqu\'à 128TB)')}</option>
            <option value="Carte SD UHS-I">{t('sd_uhsi', 'Carte SD UHS-I')}</option>
            <option value="Carte SD UHS-II">{t('sd_uhsii', 'Carte SD UHS-II')}</option>
            <option value="Carte SD UHS-III">{t('sd_uhsiii', 'Carte SD UHS-III')}</option>
          </optgroup>
          
          {/* 📸 CARTES PROFESSIONNELLES */}
          <optgroup label={t('pro_cards', 'Cartes professionnelles')}>
            <option value="Carte Compact Flash">{t('compact_flash', 'Carte Compact Flash (CF)')}</option>
            <option value="Carte CFast">{t('cfast', 'Carte CFast')}</option>
            <option value="Carte CFexpress">{t('cfexpress', 'Carte CFexpress')}</option>
            <option value="Carte XQD">{t('xqd', 'Carte XQD')}</option>
            <option value="Carte SxS">{t('sxs', 'Carte SxS (Sony)')}</option>
            <option value="Carte P2">{t('p2_card', 'Carte P2 (Panasonic)')}</option>
          </optgroup>
          
          {/* 🔵 CARTES SPÉCIALES */}
          <optgroup label={t('special_cards', 'Cartes spéciales')}>
            <option value="Carte Memory Stick">{t('memory_stick', 'Carte Memory Stick (Sony)')}</option>
            <option value="Carte Memory Stick Pro">{t('memory_stick_pro', 'Carte Memory Stick Pro')}</option>
            <option value="Carte Memory Stick Duo">{t('memory_stick_duo', 'Carte Memory Stick Duo')}</option>
            <option value="Carte SmartMedia">{t('smartmedia', 'Carte SmartMedia')}</option>
            <option value="Carte xD-Picture">{t('xd_picture', 'Carte xD-Picture (Olympus/Fujifilm)')}</option>
            <option value="Carte MMC">{t('mmc_card', 'Carte MMC (MultiMediaCard)')}</option>
          </optgroup>
          
          {/* 🏷️ MARQUES DE CARTES */}
          <optgroup label={t('card_brands', 'Marques de cartes')}>
            <option value="Carte SanDisk">{t('sandisk_card', 'Carte SanDisk')}</option>
            <option value="Carte Samsung">{t('samsung_card', 'Carte Samsung')}</option>
            <option value="Carte Kingston">{t('kingston_card', 'Carte Kingston')}</option>
            <option value="Carte Lexar">{t('lexar_card', 'Carte Lexar')}</option>
            <option value="Carte Transcend">{t('transcend_card', 'Carte Transcend')}</option>
            <option value="Carte Sony">{t('sony_card', 'Carte Sony')}</option>
            <option value="Carte PNY">{t('pny_card', 'Carte PNY')}</option>
          </optgroup>
          
          {/* 📦 PACKS ET ACCESSOIRES */}
          <optgroup label={t('packs_accessories', 'Packs et accessoires')}>
            <option value="Pack 2 cartes">{t('2_pack', 'Pack de 2 cartes mémoire')}</option>
            <option value="Pack 3 cartes">{t('3_pack', 'Pack de 3 cartes mémoire')}</option>
            <option value="Carte avec adaptateur SD">{t('card_with_adapter', 'Carte avec adaptateur SD inclus')}</option>
            <option value="Étui protection cartes">{t('card_case', 'Étui de protection pour cartes')}</option>
            <option value="Lecteur de cartes">{t('card_reader', 'Lecteur de cartes mémoire')}</option>
            <option value="Adaptateur USB pour carte">{t('usb_adapter', 'Adaptateur USB pour carte mémoire')}</option>
            <option value="Kit récupération données">{t('data_recovery_kit', 'Kit récupération données carte')}</option>
          </optgroup>
          
          {/* 🚀 CARTES HAUTES PERFORMANCES */}
          <optgroup label={t('high_performance', 'Cartes hautes performances')}>
            <option value="Carte Extreme Pro">{t('extreme_pro', 'Carte Extreme Pro (haute vitesse)')}</option>
            <option value="Carte Endurance">{t('endurance_card', 'Carte Endurance (vidéosurveillance)')}</option>
            <option value="Carte Industrial">{t('industrial_card', 'Carte Industrial (températures extrêmes)')}</option>
            <option value="Carte High Endurance">{t('high_endurance', 'Carte High Endurance (écritures intensives)')}</option>
            <option value="Carte 4K/8K">{t('4k_8k_card', 'Carte optimisée 4K/8K vidéo')}</option>
          </optgroup>
          
          {/* 🔒 CARTES SÉCURISÉES */}
          <optgroup label={t('secured_cards', 'Cartes sécurisées')}>
            <option value="Carte cryptée">{t('encrypted_card', 'Carte mémoire cryptée')}</option>
            <option value="Carte avec mot de passe">{t('password_card', 'Carte avec protection mot de passe')}</option>
            <option value="Carte sécurisée entreprise">{t('enterprise_secure', 'Carte sécurisée entreprise')}</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

      {/* 💿 CAPACITÉ (OPCIONEL) */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
          💿 {t('card_capacity', 'Capacité (optionnel)')}
        </Form.Label>
        <Form.Select
          name="capaciteCarte"
          value={postData.capaciteCarte}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">📊 {t('select_capacity', 'Sélectionnez capacité')}</option>
          <option value="2GB">2GB</option>
          <option value="4GB">4GB</option>
          <option value="8GB">8GB</option>
          <option value="16GB">16GB</option>
          <option value="32GB">32GB</option>
          <option value="64GB">64GB</option>
          <option value="128GB">128GB</option>
          <option value="256GB">256GB</option>
          <option value="512GB">512GB</option>
          <option value="1TB">1TB</option>
          <option value="2TB">2TB</option>
          <option value="4TB+">4TB et plus</option>
        </Form.Select>
        
        <Form.Text className={`text-muted mt-2 ${isRTL ? 'text-end d-block' : ''}`}>
          💡 {t('memory_card_tip', 'Indiquez la capacité si c\'est une carte spécifique')}
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default React.memo(CartsMemoire);