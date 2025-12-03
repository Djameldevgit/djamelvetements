import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const PieceDeRechange = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('telephones');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* 🔧 TIPO PRINCIPAL DE PIÈCE DE RECHANGE */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          🔧 {t('spare_part_type', 'Type de pièce de rechange')} *
        </Form.Label>
        <Form.Select
          name="tipoArticulo"
          value={postData.tipoArticulo}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
          required
        >
          <option value="">🔍 {t('select_spare_part', 'Choisissez un type de pièce')}</option>
          
          {/* 📱 ÉCRANS ET VITRES */}
          <optgroup label="📱 Écrans et vitres">
            <option value="Écran complet avec cadre">Écran complet avec cadre (LCD + vitre + cadre)</option>
            <option value="Écran LCD seul">Écran LCD/OLED seul</option>
            <option value="Vitre tactile">Vitre tactile (digitizer)</option>
            <option value="Vitre avant">Vitre avant (glass only)</option>
            <option value="Écran arrière">Écran/verre arrière</option>
            <option value="Kit écran avec outils">Kit écran avec outils de réparation</option>
            <option value="Écran reconditionné">Écran reconditionné/testé</option>
            <option value="Écran origine">Écran origine constructeur</option>
            <option value="Écran compatible">Écran compatible/générique</option>
            <option value="Écran tablette">Écran pour tablette</option>
            <option value="Écran smartwatch">Écran pour smartwatch</option>
          </optgroup>
          
          {/* 🔋 BATTERIES */}
          <optgroup label="🔋 Batteries">
            <option value="Batterie origine">Batterie origine constructeur</option>
            <option value="Batterie compatible">Batterie compatible haute capacité</option>
            <option value="Batterie reconditionnée">Batterie reconditionnée</option>
            <option value="Batterie tablette">Batterie pour tablette</option>
            <option value="Batterie smartwatch">Batterie pour smartwatch</option>
            <option value="Batterie avec outils">Batterie avec kit d'outils</option>
            <option value="Batterie étanche">Batterie étanche</option>
            <option value="Batterie gaming">Batterie gaming haute performance</option>
            <option value="Cellule batterie">Cellule de batterie seule</option>
            <option value="Connecteur batterie">Connecteur de batterie</option>
          </optgroup>
          
          {/* 📷 CAMÉRAS */}
          <optgroup label="📷 Caméras">
            <option value="Caméra avant">Caméra avant (selfie)</option>
            <option value="Caméra arrière principale">Caméra arrière principale</option>
            <option value="Caméra ultra grand-angle">Caméra ultra grand-angle</option>
            <option value="Caméra téléobjectif">Caméra téléobjectif (zoom)</option>
            <option value="Caméra macro">Caméra macro</option>
            <option value="Caméra profondeur">Caméra de profondeur (portrait)</option>
            <option value="Flash LED">Flash LED</option>
            <option value="Module caméra complet">Module caméra complet</option>
            <option value="Verre protection caméra">Verre protection caméra</option>
            <option value="Anneau flash">Anneau flash selfie</option>
          </optgroup>
          
          {/* 🔌 CONNECTEURS ET PORTS */}
          <optgroup label="🔌 Connecteurs et ports">
            <option value="Port de charge USB-C">Port de charge USB-C</option>
            <option value="Port de charge Lightning">Port de charge Lightning</option>
            <option value="Port audio jack 3.5mm">Port audio jack 3.5mm</option>
            <option value="Connecteur dock">Connecteur dock/station</option>
            <option value="Port carte SIM">Port carte SIM/SD</option>
            <option value="Connecteur flex">Connecteur flex/ribbon cable</option>
            <option value="Port haut-parleur">Port haut-parleur</option>
            <option value="Port microphone">Port microphone</option>
            <option value="Connecteur antenne">Connecteur antenne</option>
            <option value="Kit port de charge">Kit port de charge avec soudure</option>
          </optgroup>
          
          {/* 🔊 HAUT-PARLEURS ET MICROPHONES */}
          <optgroup label="🔊 Haut-parleurs et microphones">
            <option value="Haut-parleur principal">Haut-parleur principal (earpiece)</option>
            <option value="Haut-parleur basse">Haut-parleur basse (loudspeaker)</option>
            <option value="Haut-parleur stéréo">Haut-parleur stéréo</option>
            <option value="Microphone principal">Microphone principal</option>
            <option value="Microphone réduction bruit">Microphone réduction de bruit</option>
            <option value="Microphone vidéo">Microphone vidéo</option>
            <option value="Vibreur">Moteur vibreur (haptic engine)</option>
            <option value="Grille haut-parleur">Grille haut-parleur</option>
            <option value="Module audio complet">Module audio complet</option>
          </optgroup>
          
          {/* ⚙️ BOUTONS ET COMMUTATEURS */}
          <optgroup label="⚙️ Boutons et commutateurs">
            <option value="Bouton power">Bouton power/veille</option>
            <option value="Bouton volume">Bouton volume +/-</option>
            <option value="Bouton silencieux">Bouton silencieux</option>
            <option value="Bouton Bixby/Assistant">Bouton Bixby/Assistant</option>
            <option value="Bouton tactile">Bouton tactile capacitif</option>
            <option value="Interrupteur bascule">Interrupteur bascule</option>
            <option value="Kit boutons complet">Kit boutons complet</option>
            <option value="Ressort bouton">Ressort de bouton</option>
            <option value="Bouton avec flex">Bouton avec cable flex</option>
          </optgroup>
          
          {/* 🛡️ COQUES INTERNES ET CADRES */}
          <optgroup label="🛡️ Coques internes et cadres">
            <option value="Cadre milieu">Cadre milieu (middle frame)</option>
            <option value="Cadre arrière">Cadre arrière</option>
            <option value="Coque interne">Coque interne</option>
            <option value="Châssis complet">Châssis complet</option>
            <option value="Support caméra">Support/cadre caméra</option>
            <option value="Support batterie">Support batterie</option>
            <option value="Support carte mère">Support carte mère</option>
            <option value="Vis et clips">Vis et clips de montage</option>
            <option value="Joint étanchéité">Joint d'étanchéité (water seal)</option>
            <option value="Cadre avec antennes">Cadre avec antennes intégrées</option>
          </optgroup>
          
          {/* ⚡ CARTES MÈRES ET COMPOSANTS */}
          <optgroup label="⚡ Cartes mères et composants">
            <option value="Carte mère complète">Carte mère complète</option>
            <option value="Carte mère reconditionnée">Carte mère reconditionnée</option>
            <option value="Chipset/processeur">Chipset/processeur</option>
            <option value="Carte réseau Wi-Fi">Carte réseau Wi-Fi/Bluetooth</option>
            <option value="Carte NFC">Carte NFC</option>
            <option value="Capteur empreinte">Capteur d'empreinte digitale</option>
            <option value="Capteur de proximité">Capteur de proximité</option>
            <option value="Capteur gyroscope">Capteur gyroscope/accéléromètre</option>
            <option value="Capteur luminosité">Capteur de luminosité</option>
            <option value="Module Face ID">Module Face ID/TrueDepth</option>
          </optgroup>
          
          {/* 🔩 OUTILS ET ACCESSOIRES RÉPARATION */}
          <optgroup label="🔩 Outils et accessoires réparation">
            <option value="Kit d'outils réparation">Kit d'outils de réparation complet</option>
            <option value="Tournevis précision">Tournevis de précision</option>
            <option value="Pinces électroniques">Pinces électroniques</option>
            <option value="Spudger/ouverture">Spudger outil d'ouverture</option>
            <option value="Pistolet à air chaud">Pistolet à air chaud (hot air)</option>
            <option value="Station de soudure">Station de soudure</option>
            <option value="Colle électronique">Colle électronique/adhésif</option>
            <option value="Ruban thermique">Ruban thermique (thermal pad)</option>
            <option value="Pâte thermique">Pâte thermique</option>
            <option value="Nettoyant contacts">Nettoyant contacts électroniques</option>
            <option value="Loupe éclairante">Loupe éclairante pour réparation</option>
          </optgroup>
          
          {/* 💡 AUTRES COMPOSANTS */}
          <optgroup label="💡 Autres composants">
            <option value="Antenne GSM/5G">Antenne GSM/4G/5G</option>
            <option value="Antenne Wi-Fi">Antenne Wi-Fi</option>
            <option value="Antenne GPS">Antenne GPS</option>
            <option value="Câble flex">Câble flex (display, charge, etc.)</option>
            <option value="Radiateur refroidissement">Radiateur de refroidissement</option>
            <option value="Ventilateur refroidissement">Ventilateur de refroidissement</option>
            <option value="Pompe chaleur">Pompe à chaleur (vapor chamber)</option>
            <option value="Module sans fil">Module sans fil (wireless charging)</option>
            <option value="Bobine induction">Bobine d'induction</option>
            <option value="Connecteur dock magnétique">Connecteur dock magnétique</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

      {/* 📱 ÉTAT DE LA PIÈCE (OPCIONEL) */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
          🛠️ {t('part_condition', 'État de la pièce (optionnel)')}
        </Form.Label>
        <Form.Select
          name="etatPiece"
          value={postData.etatPiece}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">🏷️ {t('select_condition', 'Sélectionnez état')}</option>
          <option value="Neuf">🆕 {t('new', 'Neuf - Jamais utilisé')}</option>
          <option value="Origine">🏭 {t('original', 'Origine constructeur')}</option>
          <option value="Compatible">🔧 {t('compatible', 'Compatible après marché')}</option>
          <option value="Reconditionné">🔄 {t('refurbished', 'Reconditionné/testé')}</option>
          <option value="Testé fonctionnel">✅ {t('tested_working', 'Testé fonctionnel')}</option>
          <option value="Occasion bon état">👍 {t('used_good', 'Occasion bon état')}</option>
          <option value="À tester/AS-IS">⚠️ {t('untested', 'À tester/AS-IS')}</option>
          <option value="Pour pièces">⚙️ {t('for_parts', 'Pour pièces/réparation')}</option>
          <option value="Défectueux">❌ {t('defective', 'Défectueux (pour pièces)')}</option>
        </Form.Select>
        
        <Form.Text className={`text-muted mt-2 ${isRTL ? 'text-end d-block' : ''}`}>
          💡 {t('spare_part_tip', 'Indiquez l\'état si la pièce est d\'occasion ou reconditionnée')}
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default React.memo(PieceDeRechange);