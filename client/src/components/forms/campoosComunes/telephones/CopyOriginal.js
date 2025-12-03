import React from 'react';
import { Form } from 'react-bootstrap';

const CopyOriginal = ({
  value = '',
  onChange,
  name = 'copie',
  label = '📱 Type de copie',
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
        <option value="">Sélectionnez le type</option>
        <option value="Original">🔬 Original</option>
        <option value="Reconditionné">♻️ Reconditionné</option>
        <option value="Copie Chinois">🇨🇳 Copie Chinois</option>
        <option value="Premium Copy">⭐ Copie Premium</option>
        <option value="Clone">👥 Clone</option>
        <option value="Grade A+">🏆 Grade A+</option>
        <option value="Grade A">✅ Grade A</option>
        <option value="Grade B">⚠️ Grade B</option>
        <option value="Grade C">🔧 Grade C</option>
      </Form.Select>
      {error && (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default CopyOriginal;