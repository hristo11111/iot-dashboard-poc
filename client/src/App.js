import { useState, useEffect } from 'react';
import './App.css';
import HistoricalChart from './components/HistoricalChart/HistoricalChart';
import UnitSelect from './components/UnitSelect/UnitSelect';

function App() {
  const [unit, setUnit] = useState('cv_1l_temp');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/pumps')
    .then(res => res.json())
    .then(
      (result) => {
        setData(result);
      }
    )
  }, []);

  const onUnitSelectHandler = (event) => {
    setUnit(event.target.value);
  };

  return (
    <div className="App">
      <HistoricalChart unit={unit} data={data} />
      <UnitSelect onUnitSelect={onUnitSelectHandler} unit={unit} />
    </div>
  );
}

export default App;
