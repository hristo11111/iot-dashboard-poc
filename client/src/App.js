import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Paper from '@material-ui/core/Paper';
import DeviceSelect from './components/DeviceSelect/DeviceSelect';
import LatestValuesTile from './components/LatestValuesTile/LatestValuesTile';
import DetailsTile from './components/DetailsTile/DetailsTile';
import KPIsLineChart from './components/KPIsLineChart/KPIsLineChart';

import './App.scss';

function App() {
  const [device, setDevice] = useState('MyPythonDevice');
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch('http://localhost:3000/pumps')
    // .then(res => res.json())
    // .then(
    //   (result) => {
    //     setData(result);
    //   }
    // )
  }, []);

  const onDeviceSelectHandler = (event) => {
    setDevice(event.target.value);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="App">
        <div className="wrapper">
          <div className="choose-device">
            <DeviceSelect device={device} onDeviceSelect={onDeviceSelectHandler} />
          </div>
          <Paper>
            <div className="dashboard">
              <div className="left">
                <KPIsLineChart deviceId={device} />
                <LatestValuesTile deviceId={device} />
              </div>
              <div className="right">
                <DetailsTile pumpHours={3313} lastReportTime={format(new Date(), 'dd-MM-yyyy, HH:mm:ss')} />
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
