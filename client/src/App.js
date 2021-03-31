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

const sitesArray = {
  pressure: 'https://gettelemetrydatadocker.azurewebsites.net/api/GetData?deviceId=MyPythonDevice&function=GetCurrentValue&kpi=pressure',
  // cv_1l_temp: 'https://gettelemetrydatadocker.azurewebsites.net/api/GetData?deviceId=MyPythonDevice&function=GetCurrentValue&kpi=cv_1l_temp',
  // cv_2l_temp: 'https://gettelemetrydatadocker.azurewebsites.net/api/GetData?deviceId=MyPythonDevice&function=GetCurrentValue&kpi=cv_2l_temp',
  // cv_1r_temp: 'https://gettelemetrydatadocker.azurewebsites.net/api/GetData?deviceId=MyPythonDevice&function=GetCurrentValue&kpi=cv_1r_temp',
  // cv_2r_temp: 'https://gettelemetrydatadocker.azurewebsites.net/api/GetData?deviceId=MyPythonDevice&function=GetCurrentValue&kpi=cv_2r_temp',
  // oil_temp: 'https://gettelemetrydatadocker.azurewebsites.net/api/GetData?deviceId=MyPythonDevice&function=GetCurrentValue&kpi=oil_temp',
  stroke_rate_1: 'https://gettelemetrydatadocker.azurewebsites.net/api/GetData?deviceId=MyPythonDevice&function=GetCurrentValue&kpi=stroke_rate_1',
  // pump_hour: 'https://gettelemetrydatadocker.azurewebsites.net/api/GetData?deviceId=MyPythonDevice&function=GetCurrentValue&kpi=pump_hour'
}

function App() {
  const [device, setDevice] = useState('MyPythonDevice');
  const [pressure, setPressure] = useState(-1);
  const [strokeRate1, setStrokeRate1] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  const getPressure = async () => {
    const pressureResp = await fetch(`https://gettelemetrydatadocker.azurewebsites.net/api/GetData?deviceId=MyPythonDevice&function=GetCurrentValue&kpi=pressure`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    pressureResp.json().then(res => { setPressure(res.pressure) });
  }

  const getStrokeRate1 = async () => {
    setIsLoading(true);
    const strokeRate1Resp = await fetch(`https://gettelemetrydatadocker.azurewebsites.net/api/GetData?deviceId=MyPythonDevice&function=GetCurrentValue&kpi=stroke_rate_1`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      strokeRate1Resp.json().then(res => { setStrokeRate1(res.stroke_rate_1); setIsLoading(false) });
  }

  useEffect(() => {
    setInterval(() => {
      getPressure();
      getStrokeRate1();
    }, 20000);

    getPressure();
    getStrokeRate1()
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
                <LatestValuesTile deviceId={device} pressure={pressure} strokeRate1={strokeRate1} />
              </div>
              <div className="right">
                <DetailsTile pumpHours={3313} lastReportTime={format(new Date(), 'dd-MM-yyyy, HH:mm:ss')} isLoading={isLoading} />
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
