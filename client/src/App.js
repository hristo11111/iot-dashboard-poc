import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Paper from '@material-ui/core/Paper';
import DeviceSelect from './components/DeviceSelect/DeviceSelect';
import LatestValuesTile from './components/LatestValuesTile/LatestValuesTile';
import DetailsTile from './components/DetailsTile/DetailsTile';
import KPIsLineChart from './components/KPIsLineChart/KPIsLineChart';
import { getCurrentValues } from './api/request';

import './App.scss';

function App() {
  const [device, setDevice] = useState('MyPythonDevice');
  const [pressure, setPressure] = useState(-1);
  const [strokeRate1, setStrokeRate1] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [barChartData, setBarChartData] = useState([])
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState(new Date());
  const [pumpHourLastValue, setPumpHourLastValue] = useState();

  const getData = async () => {
    getCurrentValues()
      .then(res => { 
        const { cv_1l_temp, cv_1r_temp, cv_2l_temp, cv_2r_temp, oil_temp, pressure, pump_hour, stroke_rate_1 } = res;
        
        setStrokeRate1(stroke_rate_1); 
        setPressure(pressure);
        setBarChartData([ cv_1l_temp, cv_2l_temp, cv_1r_temp, cv_2r_temp, oil_temp ]);
        setLastUpdatedTimestamp(res['iothub-enqueuedtime']);
        setPumpHourLastValue(pump_hour);

        setIsLoading(false) 
      });
  }

  useEffect(() => {
    setInterval(() => {
      getData();
    }, 1000);

    getData();
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
                <LatestValuesTile deviceId={device} pressure={pressure} strokeRate1={strokeRate1} barChartData={barChartData} />
              </div>
              <div className="right">
                <DetailsTile pumpHours={pumpHourLastValue} lastReportTime={format(new Date(lastUpdatedTimestamp), 'dd-MM-yyyy, HH:mm:ss')} isLoading={isLoading} />
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
