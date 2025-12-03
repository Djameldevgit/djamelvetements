// components/campoosComunes/telephones/MarcaDinamica.js
import React from 'react';
import { Form } from 'react-bootstrap';

const MarcaDinamica = ({
  value = '',
  onChange,
  name = 'marque',
  subCategory = '',
  label = '🏷️ Marque',
  required = false,
  className = 'mb-3',
  disabled = false,
  error = null,
  theme = 'light'
}) => {
  
  // TEXTOS INTRODUCTORIOS POR CATEGORÍA EN FRANCÉS
  const textosIntroduccion = {
    'Telephones': "📱 Marques de téléphones cellulaires (basiques)",
    'Smartphones': "📱 Marques de smartphones (haut de gamme)",
    'Tablettes': "📟 Marques de tablettes",
    'Smartwatchs': "⌚ Marques de smartwatches et montres connectées",
    'EcouteursSon': "🎧 Marques d'écouteurs et casques audio",
    'VR': "🕶️ Marques de réalité virtuelle et augmentée",
    'ChargeursCables': "🔌 Marques de chargeurs et câbles",
    'Powerbanks': "🔋 Marques de power banks (batteries externes)",
    'ProtectionAntichoc': "🛡️ Marques de protections et coques",
    'CartesMemoire': "💾 Marques de cartes mémoire",
    'Manettes': "🎮 Marques de manettes et contrôleurs gaming",
    'Stylets': "✏️ Marques de stylets et styli",
    'FixFax': "📞 Marques de téléphones fixes et fax",
    'SupportsStabilisateurs': "📸 Marques de supports et stabilisateurs",
    'Baffle': "🔊 Marques de baffles et enceintes",
    'StationChargement': "⚡ Marques de stations de charge",
    'Coques': "📱 Marques de coques et étuis",
    'ProtectionEcran': "🖥️ Marques de protections d'écran",
    'Accessoires': "🔧 Marques d'accessoires divers"
  };

  // MARCAS ESPECÍFICAS POR SUBCATEGORÍA - SIMPLIFICADAS
  const marcasPorCategoria = {
    'Telephones': [
      'Nokia', 'Alcatel', 'Samsung', 'Motorola', 'LG', 'ZTE', 
      'Huawei', 'Xiaomi', 'Tecno', 'Infinix', 'Itel', 'Symphony', 
      'Maxcom', 'Vtel', 'BLU', 'Cherry Mobile', 'Doogee', 'Energizer',
      'Gionee', 'Honor', 'Micromax', 'MyPhone', 'Panasonic', 'Sharp',
      'TCL', 'Ulefone', 'Wiko', 'Xolo'
    ].sort(),
    
    'Smartphones': [
      'Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OnePlus', 'Google',
      'Sony', 'Oppo', 'Vivo', 'Realme', 'Motorola', 'Nokia',
      'Asus', 'Honor', 'Nothing Phone', 'Fairphone', 'CAT Phone',
      'BlackBerry', 'HTC', 'LG', 'Razer Phone', 'ZTE'
    ].sort(),
    
    'Tablettes': [
      'Apple', 'Samsung', 'Huawei', 'Lenovo', 'Xiaomi', 'Amazon',
      'Microsoft', 'Google', 'Sony', 'Asus', 'Alcatel', 'Nokia',
      'Realme', 'Oppo', 'OnePlus', 'Honor', 'Acer', 'Dell',
      'HP', 'Panasonic', 'LG', 'TCL'
    ].sort(),
    
    'Smartwatchs': [
      'Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Fitbit', 'Garmin',
      'Amazfit', 'Realme', 'OnePlus', 'Oppo', 'Fossil', 'Michael Kors',
      'Tag Heuer', 'Casio', 'Suunto', 'Polar', 'Withings', 'Mobvoi',
      'Noise', 'Boat', 'Fire-Boltt', 'Honor'
    ].sort(),
    
    'EcouteursSon': [
      'Apple', 'Samsung', 'Sony', 'JBL', 'Bose', 'Beats', 'Xiaomi',
      'Huawei', 'Realme', 'OnePlus', 'Oppo', 'Vivo', 'Skullcandy',
      'Sennheiser', 'Audio-Technica', 'Bang & Olufsen', 'Marshall',
      'Anker', 'Jabra', 'Logitech', 'Razer', 'SteelSeries', 'HyperX',
      'Edifier', 'Philips', 'Nothing Ear'
    ].sort(),
    
    'VR': [
      'Meta (Oculus)', 'HTC', 'Sony', 'Valve', 'Pico', 'HP',
      'Google', 'Samsung', 'Apple', 'Microsoft', 'Varjo', 'Pimax',
      'Nintendo'
    ].sort(),
    
    'ChargeursCables': [
      'Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Anker', 'Belkin',
      'UGREEN', 'Baseus', 'Aukey', 'Spigen', 'RAVPower', 'Choetech',
      'Mophie', 'Native Union', 'Nomad', 'Satechi', 'OnePlus',
      'Oppo', 'Realme', 'Motorola'
    ].sort(),
    
    'Powerbanks': [
      'Anker', 'Xiaomi', 'Samsung', 'RAVPower', 'Baseus', 'Belkin',
      'ROMOSS', 'Tronsmart', 'UGREEN', 'Zendure', 'EasyAcc',
      'Iniu', 'Pisen', 'Sony', 'Yoobao'
    ].sort(),
    
    'ProtectionAntichoc': [
      'Spigen', 'Case-Mate', 'OtterBox', 'Mous', 'Ringke', 'ESR',
      'TORRAS', 'Supcase', 'RhinoShield', 'Urban Armor Gear',
      'dbrand', 'Caudabe'
    ].sort(),
    
    'CartesMemoire': [
      'SanDisk', 'Samsung', 'Kingston', 'Transcend', 'Lexar',
      'PNY', 'Western Digital', 'Toshiba', 'ADATA', 'Silicon Power',
      'Verbatim', 'Team Group'
    ].sort(),
    
    'Manettes': [
      'Sony', 'Microsoft', 'Nintendo', 'SteelSeries', 'Razer',
      'Logitech', '8BitDo', 'Nacon', 'Thrustmaster', 'Hori',
      'Scuf Gaming', 'Astro Gaming', 'Turtle Beach', 'Corsair',
      'HyperX', 'GameSir'
    ].sort(),
    
    'Stylets': [
      'Apple', 'Samsung', 'Microsoft', 'Wacom', 'Huion', 'XP-Pen',
      'STAEDTLER', 'Adonit', 'SonarPen', 'Bamboo', 'RENAISSER'
    ].sort(),
    
    'FixFax': [
      'Panasonic', 'Gigaset', 'Philips', 'AT&T', 'VTech', 'Motorola',
      'Doro', 'BT', 'Cisco', 'Poly', 'Avaya', 'Alcatel'
    ].sort(),
    
    'SupportsStabilisateurs': [
      'DJI', 'Zhiyun', 'Moza', 'FeiyuTech', 'Hohem', 'Benro',
      'Manfrotto', 'Joby', 'Ulanzi', 'SmallRig', 'PGYTECH',
      'Sirui', 'Neewer'
    ].sort(),
    
    'Baffle': [
      'JBL', 'Sony', 'Bose', 'Marshall', 'Bang & Olufsen',
      'Harman Kardon', 'Anker', 'LG', 'Samsung', 'Xiaomi',
      'Huawei', 'Creative', 'Edifier', 'Philips', 'Yamaha'
    ].sort(),
    
    'StationChargement': [
      'Anker', 'Belkin', 'Native Union', 'Satechi', 'Mophie',
      'Nomad', 'Baseus', 'UGREEN', 'RAVPower', 'Choetech',
      'iOttie', 'ESR', 'Spigen', 'Samsung', 'Apple', 'Google'
    ].sort(),
    
    'Coques': [
      'Spigen', 'Case-Mate', 'OtterBox', 'Mous', 'Ringke', 'ESR',
      'TORRAS', 'Supcase', 'Catalyst', 'RhinoShield', 'Urban Armor Gear',
      'dbrand', 'Casetify', 'Pela Case', 'Burga'
    ].sort(),
    
    'ProtectionEcran': [
      'Spigen', 'ESR', 'ZAGG', 'amFilm', 'OMOTON', 'JETech',
      'LK', 'Supershieldz', 'Skinomi', 'BodyGuardz', 'IQ Shield',
      'Ringke', 'Poetic'
    ].sort(),
    
    'Accessoires': [
      'Anker', 'Belkin', 'Baseus', 'UGREEN', 'Spigen', 'ESR',
      'JETech', 'Ringke', 'Supcase', 'Mophie', 'Native Union',
      'Nomad', 'Satechi', 'RAVPower', 'Xiaomi', 'Huawei',
      'Samsung', 'Apple'
    ].sort()
  };

  // MARCAS POR DEFECTO
  const marcasDefault = [
    'Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Nokia',
    'Motorola', 'Sony', 'LG', 'Google', 'OnePlus',
    'Oppo', 'Vivo', 'Realme', 'Asus', 'Alcatel',
    'Anker', 'Belkin', 'Baseus', 'Spigen', 'SanDisk'
  ].sort();

  // Obtener marcas según subcategoría
  const marcas = marcasPorCategoria[subCategory] || marcasDefault;
  const textoIntro = textosIntroduccion[subCategory] || "🏷️ Marques disponibles";

  // Estilos simples
  const styles = {
    formControl: {
      border: `1px solid ${theme === 'dark' ? '#4a5568' : '#cbd5e0'}`,
      backgroundColor: theme === 'dark' ? '#2d3748' : '#ffffff',
      padding: '10px 12px',
      borderRadius: '8px',
      color: theme === 'dark' ? 'white' : '#2d3748',
      width: '100%',
      fontSize: '14px'
    },
    formLabel: {
      fontWeight: '600',
      marginBottom: '6px',
      display: 'block',
      color: theme === 'dark' ? '#e2e8f0' : '#2d3748'
    }
  };

  return (
    <Form.Group className={className}>
      <Form.Label style={styles.formLabel}>
        {label} {required && '*'}
      </Form.Label>
      
      <Form.Select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        isInvalid={!!error}
        style={styles.formControl}
      >
        {/* ✅ OPCIÓN INTRODUCTORIA EN FRANCÉS */}
        <option value="">
          {textoIntro}
        </option>
        
        {/* ✅ MARCAS SIMPLES SIN AGRUPACIÓN */}
        {marcas.map((marca) => (
          <option key={marca} value={marca}>
            {marca}
          </option>
        ))}
        
        {/* ✅ OPCIONES ADICIONALES */}
        <option value="Autre">Autre marque</option>
        <option value="Marque locale">Marque locale</option>
        <option value="Sans marque">Sans marque</option>
      </Form.Select>
      
      {error && (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
      
      {/* ✅ INFORMACIÓN SIMPLE */}
      {value && (
        <div style={{
          fontSize: '12px',
          color: theme === 'dark' ? '#a0aec0' : '#718096',
          marginTop: '8px',
          padding: '6px 10px',
          borderRadius: '6px',
          backgroundColor: theme === 'dark' ? '#2d3748' : '#f7fafc'
        }}>
          ✅ Marque sélectionnée : <strong>{value}</strong>
        </div>
      )}
    </Form.Group>
  );
};

export default MarcaDinamica;