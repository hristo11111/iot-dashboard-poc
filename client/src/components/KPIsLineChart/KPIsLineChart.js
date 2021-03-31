import { useState, useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { KeyboardDatePicker } from '@material-ui/pickers';
import KPISelect from './KPISelect/KPISelect';
import Tile from '../generic/Tile/Tile';
import Echart from '../generic/Echart/Echart';
import { subDays, format } from 'date-fns';

import "./KPIsLineChart.scss";

let kpiData = {
  pump_hour: [
    { "iothub-enqueuedtime": "2020-01-01", value: '2' },
    { "iothub-enqueuedtime": "2020-01-02", value: '5' },
    { "iothub-enqueuedtime": "2020-01-03", value: '22' },
    { "iothub-enqueuedtime": "2020-01-04", value: '20' },
    { "iothub-enqueuedtime": "2020-01-05", value: '7' },
    { "iothub-enqueuedtime": "2020-01-06", value: '5' },
    { "iothub-enqueuedtime": "2020-01-07", value: '9' },
    { "iothub-enqueuedtime": "2020-01-08", value: '7' },
    { "iothub-enqueuedtime": "2020-01-09", value: '6' },
    { "iothub-enqueuedtime": "2020-01-10", value: '5' }
  ],
  pump_minute: [
    { "iothub-enqueuedtime": "2020-01-01", value: '12' },
    { "iothub-enqueuedtime": "2020-01-02", value: '22' },
    { "iothub-enqueuedtime": "2020-01-03", value: '22' },
    { "iothub-enqueuedtime": "2020-01-04", value: '32' },
    { "iothub-enqueuedtime": "2020-01-05", value: '43' },
    { "iothub-enqueuedtime": "2020-01-06", value: '23' },
    { "iothub-enqueuedtime": "2020-01-07", value: '12' },
    { "iothub-enqueuedtime": "2020-01-08", value: '9' },
    { "iothub-enqueuedtime": "2020-01-09", value: '14' },
    { "iothub-enqueuedtime": "2020-01-10", value: '15' }
  ],
  stroke_count_1: [
    { "iothub-enqueuedtime": "2020-01-01", value: '133' },
    { "iothub-enqueuedtime": "2020-01-02", value: '125' },
    { "iothub-enqueuedtime": "2020-01-03", value: '100' },
    { "iothub-enqueuedtime": "2020-01-04", value: '99' },
    { "iothub-enqueuedtime": "2020-01-05", value: '43' },
    { "iothub-enqueuedtime": "2020-01-06", value: '54' },
    { "iothub-enqueuedtime": "2020-01-07", value: '54' },
    { "iothub-enqueuedtime": "2020-01-08", value: '123' },
    { "iothub-enqueuedtime": "2020-01-09", value: '22' },
    { "iothub-enqueuedtime": "2020-01-10", value: '109' }
  ]
};

kpiData = [
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 137}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 121}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 134}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 124}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 132}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 120}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 132}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 138}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 131}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 121}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 122}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 125}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 125}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 136}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 125}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 136}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 128}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 131}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 134}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 133}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 137}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 128}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 122}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 120}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 120}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 127}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 135}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 130}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 123}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 131}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 124}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 121}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 126}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 124}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 133}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 128}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 137}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 126}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 137}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 124}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 123}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 130}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 138}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 131}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 138}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 130}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 121}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 126}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 136}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 135}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 121}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 128}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 125}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 130}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 120}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 123}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 120}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 124}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 132}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 138}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 124}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 131}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 138}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 126}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 132}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 122}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 135}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 123}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 132}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 126}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 125}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 126}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 127}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 122}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 132}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 138}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-10', 'cv_1l_temp': 140}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 138}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 125}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 132}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 138}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 135}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 128}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 129}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 130}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 137}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 131}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 132}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 136}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 999}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 129}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 139}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 139}, 
  {'iothub-connection-device-id': 'MyPythonDevice', 'iothub-enqueuedtime': '2021-01-11', 'cv_1l_temp': 132}
];

const KPIsLineChart = ({ deviceId }) => {
  const [kpi, setKPI] = useState('pump_hour');
  const [chartData, setCharData] = useState(kpiData);
  const [fromDate, handleFromDateChange] = useState(subDays(new Date(), 10));
  const [toDate, handleToDateChange] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const onKPISelectedHandler = (event) => {
    setKPI(event.target.value);
    setCharData(kpiData[event.target.value]);
  };

  useEffect(() => {
    const fdate = format(fromDate, 'ddMMy');
    const tdate = format(toDate, 'ddMMy');
    setIsLoading(true);

    fetch(`https://gettelemetrydatadocker.azurewebsites.net/api/GetData?deviceId=MyPythonDevice&function=GetHistoricalValue&kpi=${kpi}&datefrom=${fdate}&dateto=${tdate}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoading(false);
        setCharData(result && result[0] ? result[0].values : []);
      }
    )
  }, [fromDate, toDate, kpi]);

  const chartOption = {
    xAxis: {
        type: 'category',
        data: chartData && chartData.map((record) => format(new Date(record['iothub-enqueuedtime']), 'dd/MM/y HH:mm:ss').replace(' ', '\n')),
        axisLabel: { interval: 32, width: '10' }
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: chartData && chartData.map((record) => record[kpi]),
        type: 'line'
    }]
  };

  return (
    <Tile title={`KPIs Historical Data: ${deviceId}`} className="kpis-line-chart">
      <div className="header">
        <KPISelect onKPISelect={onKPISelectedHandler} kpi={kpi} />
        <KeyboardDatePicker 
          autoOk
          variant="inline"
          label="Select from date"
          format="dd/MM/yyyy"
          value={fromDate} 
          InputAdornmentProps={{ position: "start" }}
          onChange={handleFromDateChange}
          className="line-chart-date-picker"
        />
        <KeyboardDatePicker 
          autoOk
          variant="inline"
          label="Select to date"
          format="dd/MM/yyyy"
          value={toDate} 
          InputAdornmentProps={{ position: "start" }}
          onChange={handleToDateChange}
          className="line-chart-date-picker"
        />
      </div>
      <div className="chart" style={{ width: '100%', height: 300 }}>
        {isLoading ? <Skeleton variant="rect" height='80%' width="100%" /> : chartData && chartData.length !== 0 ? <Echart option={chartOption} /> : 'No data'}
      </div>
    </Tile>
  );
};

export default KPIsLineChart;
