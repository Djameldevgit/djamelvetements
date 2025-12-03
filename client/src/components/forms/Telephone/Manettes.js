import React from 'react';
import { Form } from 'react-bootstrap';

const Manettes = ({ postData, handleChangeInput }) => {
  return (
    <div>
      {/* 🎮 TIPO PRINCIPAL - SIMPLE */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className="fw-bold">
          🎮 Type de manette *
        </Form.Label>
        <Form.Select
          name="tipoArticulo"
          value={postData.tipoArticulo}
          onChange={handleChangeInput}
          className="form-control"
          required
        >
          <option value="">Sélectionnez une manette</option>
          
          <optgroup label="🎮 Consoles">
            <option value="PS5">Manette PlayStation 5</option>
            <option value="PS4">Manette PlayStation 4</option>
            <option value="Xbox Series">Manette Xbox Series</option>
            <option value="Xbox One">Manette Xbox One</option>
            <option value="Nintendo Switch">Manette Nintendo Switch</option>
          </optgroup>
          
          <optgroup label="📱 Mobile/PC">
            <option value="Mobile Bluetooth">Manette mobile Bluetooth</option>
            <option value="PC USB">Manette PC USB</option>
            <option value="PC sans fil">Manette PC sans fil</option>
          </optgroup>
          
          <optgroup label="🎯 Spéciales">
            <option value="Arcade">Manette arcade</option>
            <option value="Racing">Volant racing</option>
            <option value="Rétro">Manette rétro</option>
          </optgroup>
          
          <optgroup label="🔩 Accessoires">
            <option value="Chargeur">Chargeur manette</option>
            <option value="Étui">Étui protection</option>
            <option value="Grips">Grips manette</option>
          </optgroup>
        </Form.Select>
      </Form.Group>

      {/* 🔌 CONNEXION - OPTIONNEL */}
      <Form.Group className="mb-3 w-100">
        <Form.Label className="fw-semibold">
          🔌 Connexion (optionnel)
        </Form.Label>
        <Form.Select
          name="connectiviteManette"
          value={postData.connectiviteManette}
          onChange={handleChangeInput}
          className="form-control"
        >
          <option value="">Choisir</option>
          <option value="Bluetooth">Bluetooth</option>
          <option value="USB">USB</option>
          <option value="Sans fil">Sans fil</option>
          <option value="Filaire">Filaire</option>
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default Manettes;