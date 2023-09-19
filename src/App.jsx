import { useState } from 'react';
import './App.css'
import InputJson from './components/InputJson'
import Map from './components/Map'

function App() {
  const [jsonValue, setJsonValue] = useState('');

  // Función para actualizar el valor del JSON
  const handleJsonChange = (value) => {
    setJsonValue(value);
  };
  return (
    <div style={{ overflowX: 'hidden', position: 'relative  ' }}>
      <InputJson onJsonChange={handleJsonChange} />
      <Map jsonValue={jsonValue} />
    </div>

  )
}

export default App
