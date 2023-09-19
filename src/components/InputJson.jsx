import { useState, useEffect } from 'react';
import '../styles/Input.css';

const InputJson = ({ onJsonChange }) => {
  // Estado para almacenar el valor del input
  const [inputValue, setInputValue] = useState('');
  // Estado para mostrar una advertencia
  const [showWarning, setShowWarning] = useState(false);

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

      // Verifica si el valor del input está vacío
      if (inputValue.trim() === '') {
        // Muestra la advertencia
        setShowWarning(true);

        // Oculta la advertencia después de 3 segundos
        setTimeout(() => {
          setShowWarning(false);
        }, 3000); // 3000 milisegundos (3 segundos)
      } else {
        // Oculta la advertencia y procesa el JSON
        setShowWarning(false);
        onJsonChange(inputValue);
        setInputValue('');
      }
    }
  };

  return (
    <div className="input-container">
      <textarea
        rows="5"
        placeholder="Ingrese sus coordenadas..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleEnterKey}
      />
      {showWarning && <p className="warning">El campo no puede estar vacío.</p>}
    </div>
  );
}

export default InputJson;
