import React from 'react';
import { Form, Badge } from 'react-bootstrap';

const Memoire = ({
  value = '',
  onChange,
  name = 'type_memoire',
  label = '💽 Type de mémoire *',
  placeholder = 'Sélectionnez le type',
  required = true,
  className = 'mb-3',
  disabled = false,
  error = null,
  style = {},
  helperText = null,
  variant = 'primary',
  size = 'md'
}) => {
  const memoryTypes = [
    { value: 'MicroSD', label: '📱 MicroSD', maxCapacity: '2GB' },
    { value: 'MicroSDHC', label: '📱 MicroSDHC', maxCapacity: '32GB' },
    { value: 'MicroSDXC', label: '📱 MicroSDXC', maxCapacity: '2TB' },
    { value: 'SD', label: '💾 SD', maxCapacity: '2GB' },
    { value: 'SDHC', label: '💾 SDHC', maxCapacity: '32GB' },
    { value: 'SDXC', label: '💾 SDXC', maxCapacity: '2TB' },
    { value: 'SDUC', label: '💾 SDUC', maxCapacity: '128TB' },
    { value: 'CF', label: '📸 Compact Flash', maxCapacity: '512GB' },
    { value: 'CFast', label: '⚡ CFast', maxCapacity: '2TB' },
    { value: 'CFexpress', label: '🚀 CFexpress', maxCapacity: '8TB' },
    { value: 'XQD', label: '🎥 XQD', maxCapacity: '2TB' },
    { value: 'Memory Stick', label: '🔵 Memory Stick', maxCapacity: '128GB' }
  ];

  const selectedType = memoryTypes.find(type => type.value === value);

  return (
    <Form.Group className={className}>
      <Form.Label style={style.formLabel}>
        {label}
      </Form.Label>
      
      <div className="d-flex align-items-center gap-2 mb-2">
        <Form.Select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          isInvalid={!!error}
          style={style.formControl}
          size={size}
        >
          <option value="">{placeholder}</option>
          {memoryTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Form.Select>
        
        {selectedType && (
          <Badge bg={variant} className="fs-6">
            Max: {selectedType.maxCapacity}
          </Badge>
        )}
      </div>
      
      {helperText && (
        <Form.Text className="text-muted">
          {helperText}
        </Form.Text>
      )}
      
      {error && (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default Memoire;