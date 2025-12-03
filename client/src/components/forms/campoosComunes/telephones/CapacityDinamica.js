// components/campoosComunes/telephones/CapacityDinamica.js
import React from 'react';
import { Form } from 'react-bootstrap';

const CapacityDinamica = ({
  value = '',
  onChange,
  name = 'capacite',
  subCategory = '',
  label = '🗂️ Capacité',
  required = false,
  className = 'mb-3',
  disabled = false,
  error = null,
  theme = 'light'
}) => {
  
  // TEXTOS INTRODUCTORIOS POR CATEGORÍA EN FRANCÉS
  const textosIntroduccion = {
    'Smartphones': "📱 Capacités de stockage smartphone",
    'Telephones': "📞 Capacités de stockage téléphone basique",
    'Tablettes': "📟 Capacités de stockage tablette",
    'Smartwatchs': "⌚ Capacités smartwatch",
    'CartesMemoire': "💾 Capacités de cartes mémoire",
    'Powerbanks': "🔋 Capacités de power banks",
    'EcouteursSon': "🎧 Autonomie des écouteurs",
    'VR': "🕶️ Espace de stockage VR",
    'Manettes': "🎮 Autonomie des manettes",
    'Stylets': "✏️ Capacité stylo numérique",
    'SupportsStabilisateurs': "📸 Autonomie stabilisateurs",
    'Baffle': "🔊 Puissance baffles",
    'StationChargement': "⚡ Puissance stations de charge",
    'Accessoires': "🔧 Capacités accessoires"
  };

  // CAPACIDADES ESPECÍFICAS POR SUBCATEGORÍA
  const capacitesParCategorie = {
    // ============================================
    // SMARTPHONES
    // ============================================
    'Smartphones': [
      '32 GB', '64 GB', '128 GB', '256 GB', '512 GB', '1 TB'
    ],
    
    // ============================================
    // TÉLÉPHONES CELLULAIRES (BASIQUES)
    // ============================================
    'Telephones': [
      '4 GB', '8 GB', '16 GB', '32 GB', '64 GB'
    ],
    
    // ============================================
    // TABLETTES
    // ============================================
    'Tablettes': [
      '32 GB', '64 GB', '128 GB', '256 GB', '512 GB', '1 TB', '2 TB'
    ],
    
    // ============================================
    // SMARTWATCHES
    // ============================================
    'Smartwatchs': [
      '4 GB', '8 GB', '16 GB', '32 GB'
    ],
    
    // ============================================
    // CARTES MÉMOIRE
    // ============================================
    'CartesMemoire': [
      '8 GB', '16 GB', '32 GB', '64 GB', '128 GB', '256 GB', '512 GB', '1 TB'
    ],
    
    // ============================================
    // POWER BANKS
    // ============================================
    'Powerbanks': [
      '2000 mAh', '5000 mAh', '10000 mAh', '20000 mAh', 
      '26800 mAh', '30000 mAh', '50000 mAh'
    ],
    
    // ============================================
    // ÉCOUTEURS ET CASQUES
    // ============================================
    'EcouteursSon': [
      '20 heures', '30 heures', '40 heures', '50 heures',
      '60 heures', 'Avec étui de charge'
    ],
    
    // ============================================
    // RÉALITÉ VIRTUELLE
    // ============================================
    'VR': [
      '64 GB', '128 GB', '256 GB', '512 GB', '1 TB'
    ],
    
    // ============================================
    // MANETTES ET CONTRÔLEURS
    // ============================================
    'Manettes': [
      '10 heures', '20 heures', '30 heures', '40 heures',
      'Rechargeable', 'Piles AA'
    ],
    
    // ============================================
    // STYLETS NUMÉRIQUES
    // ============================================
    'Stylets': [
      '10 heures', '20 heures', '30 heures', '40 heures',
      'Rechargeable', 'Avec étui de charge'
    ],
    
    // ============================================
    // STABILISATEURS ET SUPPORTS
    // ============================================
    'SupportsStabilisateurs': [
      '4 heures', '8 heures', '12 heures', '16 heures',
      '24 heures', 'Sans batterie'
    ],
    
    // ============================================
    // BAFFLES ET ENCEINTES
    // ============================================
    'Baffle': [
      '10W', '20W', '30W', '40W', '50W', '100W', '200W'
    ],
    
    // ============================================
    // STATIONS DE CHARGE
    // ============================================
    'StationChargement': [
      '30W', '45W', '65W', '100W', '120W', '150W', '200W'
    ],
    
    // ============================================
    // ACCESSOIRES DIVERS
    // ============================================
    'Accessoires': [
      'Standard', 'Grande capacité', 'Extra large',
      'Variable', 'Réglable'
    ],
    
    // ============================================
    // PROTECTIONS ET COQUES (pas besoin de capacité)
    // ============================================
    'ProtectionAntichoc': [],
    'Coques': [],
    'ProtectionEcran': [],
    'ChargeursCables': [],
    'FixFax': []
  };

  // CAPACIDADES POR DEFECTO (DISPOSITIVOS MÓVILES)
  const capacitesDefault = [
    '32 GB', '64 GB', '128 GB', '256 GB', '512 GB', '1 TB'
  ];

  // Determinar si mostrar este componente según la subcategoría
  const mostrarComponente = () => {
    const noMostrar = [
      'ProtectionAntichoc', 'Coques', 'ProtectionEcran', 
      'ChargeursCables', 'FixFax'
    ];
    
    return !noMostrar.includes(subCategory);
  };

  // Obtener capacidades según subcategoría
  const capacites = capacitesParCategorie[subCategory] || capacitesDefault;
  const textoIntro = textosIntroduccion[subCategory] || "🗂️ Sélectionnez la capacité";

  // Si no se debe mostrar el componente, retornar null
  if (!mostrarComponente()) {
    return null;
  }

  // Estilos
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

  // Iconos por tipo de capacidad
  const getIcon = (capacite) => {
    if (capacite.includes('GB') || capacite.includes('TB')) return '💾';
    if (capacite.includes('mAh')) return '🔋';
    if (capacite.includes('heures')) return '⏱️';
    if (capacite.includes('W')) return '⚡';
    return '📦';
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
        {/* OPCIÓN INTRODUCTORIA */}
        <option value="">{textoIntro}</option>
        
        {/* LISTA DE CAPACIDADES */}
        {capacites.map((capacite) => (
          <option key={capacite} value={capacite}>
            {getIcon(capacite)} {capacite}
          </option>
        ))}
        
        {/* OPCIONES ADICIONALES */}
        <option value="Autre">🔧 Autre capacité</option>
        <option value="Variable">🔄 Capacité variable</option>
        <option value="Non spécifié">❌ Non spécifié</option>
      </Form.Select>
      
      {error && (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
      
      {/* INFORMACIÓN ADICIONAL */}
      {value && !error && (
        <div style={{
          fontSize: '12px',
          color: theme === 'dark' ? '#a0aec0' : '#718096',
          marginTop: '8px',
          padding: '6px 10px',
          borderRadius: '6px',
          backgroundColor: theme === 'dark' ? '#2d3748' : '#f7fafc'
        }}>
          ✅ Capacité sélectionnée : <strong>{value}</strong>
        </div>
      )}
    </Form.Group>
  );
};

 

export default CapacityDinamica;