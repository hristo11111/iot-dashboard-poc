import { useState, useEffect } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import KPISelect from './KPISelect/KPISelect';
import Tile from '../generic/Tile/Tile';
import Echart from '../generic/Echart/Echart';
import { subDays, format } from 'date-fns';
import { getHistoricalValues } from '../../api/request';

import "./KPIsLineChart.scss";

const KPIsLineChart = ({ deviceId }) => {
  const [kpi, setKPI] = useState('PumpHour');
  const [chartData, setCharData] = useState([]);
  const [fromDate, handleFromDateChange] = useState(subDays(new Date(), 10));
  const [toDate, handleToDateChange] = useState(new Date());

  const onKPISelectedHandler = (event) => {
    setKPI(event.target.value);
  };

  useEffect(() => {
    const fDate = format(fromDate, "yyyy-MM-dd'T'HH:mm:ss.SSS");
    const tDate = format(toDate, "yyyy-MM-dd'T'HH:mm:ss.SSS");

    getHistoricalValues({ fromDate: fDate, toDate: tDate, kpi })
      .then(res => setCharData(res))
  }, [fromDate, toDate, kpi]);

  const chartOption = {
    xAxis: {
        type: 'category',
        data: chartData && chartData.map((record) => format(new Date(record.d), 'dd/MM/y HH:mm:ss').replace(' ', '\n')),
        axisLabel: { interval: 32, width: '10' }
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: chartData && chartData.map((record) => record.v),
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
        <Echart option={chartOption} />
      </div>
    </Tile>
  );
};

export default KPIsLineChart;
