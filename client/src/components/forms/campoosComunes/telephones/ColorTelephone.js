import React from 'react';
import { Form } from 'react-bootstrap';

const ColorTelephone = ({
  value = '',
  onChange,
  name = 'colortelefono',
  required = false,
  className = 'mb-3',
  disabled = false,
  error = null,
  theme = 'light'
}) => {
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
        🎨 Couleur{required && '*'}
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
        <option value="">Sélectionnez une couleur</option>
        <option value="Blanc">⚪ Blanc</option>
        <option value="Noir">⚫ Noir</option>
        <option value="Doré">🟡 Doré</option>
        <option value="Argenté">⚪ Argenté</option>
        <option value="Bleu">🔵 Bleu</option>
        <option value="Bleu nuit">🌌 Bleu nuit</option>
        <option value="Rouge">🔴 Rouge</option>
        <option value="Bordeaux">🍷 Bordeaux</option>
        <option value="Vert">🟢 Vert</option>
        <option value="Vert forêt">🌲 Vert forêt</option>
        <option value="Rose">🌸 Rose</option>
        <option value="Rose gold">🌹 Rose gold</option>
        <option value="Gris">🔘 Gris</option>
        <option value="Gris sidéral">🚀 Gris sidéral</option>
        <option value="Jaune">🟡 Jaune</option>
        <option value="Orange">🟠 Orange</option>
        <option value="Violet">🟣 Violet</option>
        <option value="Lavande">💜 Lavande</option>
        <option value="Bronze">🟤 Bronze</option>
        <option value="Titanium">🔩 Titanium</option>
        <option value="Autre">🎨 Autre</option>
      </Form.Select>
      {error && (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default ColorTelephone;