import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ProteccionYantechok = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('telephones');
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      {/* 🛡️ TIPO PRINCIPAL DE PROTECCIÓN */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-bold text-dark mb-3 fs-6 ${isRTL ? 'text-end d-block' : ''}`}>
          🛡️ {t('protection_type', 'Type de protection')} *
        </Form.Label>
        <Form.Select
          name="tipoArticulo"
          value={postData.tipoArticulo}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
          required
        >
          <option value="">🔍 {t('select_protection_type', 'Choisissez un type de protection')}</option>
          
          {/* 📱 COQUES ET ÉTUIS */}
          <optgroup label="📱 Coques et étuis">
            <option value="Coque silicone">Coque en silicone</option>
            <option value="Coque transparente">Coque transparente</option>
            <option value="Coque rigide">Coque rigide (polycarbonate)</option>
            <option value="Coque bumper">Coque bumper avec protection bords</option>
            <option value="Coque cuir">Étui en cuir véritable</option>
            <option value="Coque similicuir">Étui en similicuir</option>
            <option value="Coque magnétique">Coque avec support magnétique</option>
            <option value="Coque étanche">Coque étanche pour natation</option>
            <option value="Coque anti-choc militaire">Coque anti-choc militaire (certifié)</option>
            <option value="Coque personnalisée">Coque personnalisée/photo</option>
            <option value="Étui portefeuille">Étui portefeuille avec poches</option>
            <option value="Étui rabat">Étui avec rabat de protection</option>
            <option value="Étui avec support">Étui avec support intégré</option>
            <option value="Étui ceinture">Étui de ceinture pour smartphone</option>
          </optgroup>
          
          {/* 🛡️ PROTECTIONS D'ÉCRAN */}
          <optgroup label="🛡️ Protections d'écran">
            <option value="Verre trempé 9H">Verre trempé 9H résistance</option>
            <option value="Verre trempé anti-éclats">Verre trempé anti-éclats</option>
            <option value="Verre trempé Full Cover">Verre trempé Full Cover (bords arrondis)</option>
            <option value="Verre trempé avec caméra">Verre trempé avec protection caméra</option>
            <option value="Verre trempé anti-reflets">Verre trempé anti-reflets</option>
            <option value="Verre trempé privacy">Verre trempé privacy (vision réduite)</option>
            <option value="Verre trempé Blue Light">Verre trempé anti lumière bleue</option>
            <option value="Film hydrogel">Film hydrogel souple</option>
            <option value="Film PET">Film PET plastique</option>
            <option value="Film TPU auto-adhésif">Film TPU auto-adhésif</option>
            <option value="Protection caméra avant/arrière">Protection caméra avant/arrière</option>
            <option value="Kit complet protection">Kit complet (écran + caméra + bords)</option>
          </optgroup>
          
          {/* 💧 PROTECTIONS ÉTANCHES */}
          <optgroup label="💧 Protections étanches">
            <option value="Sac étanche téléphone">Sac étanche pour téléphone</option>
            <option value="Étui étanche plongée">Étui étanche pour plongée</option>
            <option value="Pochette étanche plage">Pochette étanche pour plage/piscine</option>
            <option value="Protection anti-pluie">Protection anti-pluie temporaire</option>
            <option value="Film nanotechnologie">Film nanotechnologie anti-eau</option>
          </optgroup>
          
          {/* 🚗 ACCESSOIRES DE PROTECTION */}
          <optgroup label="🚗 Accessoires de protection">
            <option value="Support voiture anti-vibration">Support voiture anti-vibration</option>
            <option value="Porte téléphone magnétique">Porte téléphone magnétique voiture</option>
            <option value="Support vélo/moto">Support pour vélo/moto sécurisé</option>
            <option value="Sangle de sécurité">Sangle/bracelet de sécurité</option>
            <option value="Poche anti-vol">Poche anti-vol RFID</option>
            <option value="Étui avec chaîne">Étui avec chaîne de sécurité</option>
          </optgroup>
          
          {/* 🧼 KITS ET ACCESSOIRES */}
          <optgroup label="🧼 Kits et accessoires">
            <option value="Kit nettoyage écran">Kit de nettoyage écran professionnel</option>
            <option value="Chiffon microfibre">Chiffon microfibre anti-rayures</option>
            <option value="Liquide nettoyant écran">Liquide nettoyant pour écran</option>
            <option value="Brosse de nettoyage">Brosse pour ports et caméra</option>
            <option value="Spray anti-bactérien">Spray anti-bactérien pour téléphone</option>
            <option value="Gel désinfectant">Gel désinfectant écran</option>
          </optgroup>
          
          {/* 🎮 PROTECTION GAMING */}
          <optgroup label="🎮 Protection gaming">
            <option value="Coque gaming avec ventilateur">Coque gaming avec ventilateur</option>
            <option value="Protection manette gaming">Protection pour manette gaming</option>
            <option value="Étui console portable">Étui pour console portable (Switch, Steam Deck)</option>
            <option value="Coque RGB gaming">Coque avec éclairage RGB gaming</option>
            <option value="Protection écran console">Protection écran console portable</option>
          </optgroup>
          
          {/* 👶 PROTECTION ENFANTS */}
          <optgroup label="👶 Protection enfants">
            <option value="Coque enfant anti-choc">Coque enfant anti-choc renforcée</option>
            <option value="Étui enfant designs">Étui enfant avec designs amusants</option>
            <option value="Protection tablette enfant">Protection complète tablette enfant</option>
            <option value="Poignée de sécurité">Poignée de sécurité pour téléphone</option>
            <option value="Étui flottant">Étui flottant pour piscine</option>
          </optgroup>
          
          {/* 💼 PROTECTION PROFESSIONNELLE */}
          <optgroup label="💼 Protection professionnelle">
            <option value="Étui professionnel cuir">Étui professionnel en cuir</option>
            <option value="Coque anti-poussière chantier">Coque anti-poussière pour chantier</option>
            <option value="Protection pour environnements extrêmes">Protection environnements extrêmes</option>
            <option value="Étui étanche professionnel">Étui étanche professionnel</option>
            <option value="Coque avec support carte">Coque avec support carte professionnelle</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

      {/* 📱 COMPATIBILITÉ (OPCIONEL) */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className={`fw-semibold ${isRTL ? 'text-end d-block' : ''}`}>
          📱 {t('compatibility', 'Compatibilité (optionnel)')}
        </Form.Label>
        <Form.Select
          name="compatibiliteProtection"
          value={postData.compatibiliteProtection}
          onChange={handleChangeInput}
          className="form-control border-0 shadow-sm"
        >
          <option value="">🔧 {t('select_compatibility', 'Sélectionnez compatibilité')}</option>
          
          {/* iPHONE */}
          <optgroup label="🍎 iPhone">
            <option value="iPhone 15/15 Pro">iPhone 15/15 Pro</option>
            <option value="iPhone 14/14 Pro">iPhone 14/14 Pro</option>
            <option value="iPhone 13/13 Pro">iPhone 13/13 Pro</option>
            <option value="iPhone 12/12 Pro">iPhone 12/12 Pro</option>
            <option value="iPhone 11/11 Pro">iPhone 11/11 Pro</option>
            <option value="iPhone SE">iPhone SE (2020/2022)</option>
            <option value="iPhone ancien modèle">iPhone ancien modèle</option>
          </optgroup>
          
          {/* SAMSUNG */}
          <optgroup label="🔵 Samsung Galaxy">
            <option value="Galaxy S24/S24+">Galaxy S24/S24+</option>
            <option value="Galaxy S23/S23+">Galaxy S23/S23+</option>
            <option value="Galaxy S22/S22+">Galaxy S22/S22+</option>
            <option value="Galaxy S21/S21+">Galaxy S21/S21+</option>
            <option value="Galaxy Z Fold">Galaxy Z Fold 5/4</option>
            <option value="Galaxy Z Flip">Galaxy Z Flip 5/4</option>
            <option value="Galaxy A série">Galaxy A série (A54, A34, etc.)</option>
          </optgroup>
          
          {/* AUTRES MARQUES */}
          <optgroup label="📱 Autres marques">
            <option value="Google Pixel">Google Pixel 8/7/6</option>
            <option value="Xiaomi/Redmi">Xiaomi/Redmi/Poco</option>
            <option value="OnePlus">OnePlus 11/10/9</option>
            <option value="Huawei">Huawei P/Mate série</option>
            <option value="OPPO">OPPO Find/Reno série</option>
            <option value="Realme">Realme GT/Number série</option>
            <option value="Nokia">Nokia smartphones</option>
            <option value="Motorola">Motorola Edge/Razr</option>
            <option value="Sony Xperia">Sony Xperia 1/5/10</option>
          </optgroup>
          
          {/* TABLETTES */}
          <optgroup label="💻 Tablettes">
            <option value="iPad tous modèles">iPad tous modèles</option>
            <option value="Samsung Galaxy Tab">Samsung Galaxy Tab</option>
            <option value="Tablette Android">Tablette Android générique</option>
            <option value="Tablette Windows">Tablette Windows/Surface</option>
          </optgroup>
          
          {/* CONSOLES */}
          <optgroup label="🎮 Consoles">
            <option value="Nintendo Switch">Nintendo Switch/OLED</option>
            <option value="Steam Deck">Steam Deck</option>
            <option value="ROG Ally">ASUS ROG Ally</option>
            <option value="PlayStation Portal">PlayStation Portal</option>
          </optgroup>
          
          {/* UNIVERSEL */}
          <optgroup label="🌐 Universel">
            <option value="Taille unique">Taille unique/adjustable</option>
            <option value="Pour tous téléphones">Pour tous téléphones</option>
            <option value="Protection universelle écran">Protection écran universelle</option>
            <option value="Film découpable">Film protecteur découpable</option>
          </optgroup>
        </Form.Select>
        
        
      </Form.Group>
    </div>
  );
};

export default React.memo(ProteccionYantechok);