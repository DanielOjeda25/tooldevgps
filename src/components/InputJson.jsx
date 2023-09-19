import { useState } from 'react';
import '../styles/Input.css';

const InputJson = ({ onJsonChange }) => {
  // Estado para almacenar el valor del input
  const [inputValue, setInputValue] = useState('');

  // Función para manejar cambios en el input
  const handleInputChange = (event) => {
    // Actualiza el estado con el nuevo valor del input
    setInputValue(event.target.value);
  };

  // Función para manejar la tecla "Enter"
  const handleEnterKey = (event) => {
    // Verifica si la tecla presionada es "Enter" (código de tecla 13)
    if (event.keyCode === 13) {
      // Evita que se realice un salto de línea en el input
      event.preventDefault();
      onJsonChange(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Ingrese sus puntos..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleEnterKey}
      />
    </div>
  );
}

export default InputJson;
