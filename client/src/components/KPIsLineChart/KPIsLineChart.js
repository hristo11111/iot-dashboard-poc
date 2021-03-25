import { useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import KPISelect from './KPISelect/KPISelect';
import Tile from '../generic/Tile/Tile';
import Echart from '../generic/Echart/Echart';
import { subDays } from 'date-fns';

import "./KPIsLineChart.scss";

const kpiData = {
  pump_hour: [
    { date: "2020-01-01", value: '2' },
    { date: "2020-01-02", value: '5' },
    { date: "2020-01-03", value: '22' },
    { date: "2020-01-04", value: '20' },
    { date: "2020-01-05", value: '7' },
    { date: "2020-01-06", value: '5' },
    { date: "2020-01-07", value: '9' },
    { date: "2020-01-08", value: '7' },
    { date: "2020-01-09", value: '6' },
    { date: "2020-01-10", value: '5' }
  ],
  pump_minute: [
    { date: "2020-01-01", value: '12' },
    { date: "2020-01-02", value: '22' },
    { date: "2020-01-03", value: '22' },
    { date: "2020-01-04", value: '32' },
    { date: "2020-01-05", value: '43' },
    { date: "2020-01-06", value: '23' },
    { date: "2020-01-07", value: '12' },
    { date: "2020-01-08", value: '9' },
    { date: "2020-01-09", value: '14' },
    { date: "2020-01-10", value: '15' }
  ],
  stroke_count_1: [
    { date: "2020-01-01", value: '133' },
    { date: "2020-01-02", value: '125' },
    { date: "2020-01-03", value: '100' },
    { date: "2020-01-04", value: '99' },
    { date: "2020-01-05", value: '43' },
    { date: "2020-01-06", value: '54' },
    { date: "2020-01-07", value: '54' },
    { date: "2020-01-08", value: '123' },
    { date: "2020-01-09", value: '22' },
    { date: "2020-01-10", value: '109' }
  ]
};

const KPIsLineChart = ({ deviceId }) => {
  const [kpi, setKPI] = useState('pump_hour');
  const [chartData, setCharData] = useState(kpiData.pump_hour);
  const [fromDate, handleFromDateChange] = useState(subDays(new Date(), 10));
  const [toDate, handleToDateChange] = useState(new Date());
  const onKPISelectedHandler = (event) => {
    setKPI(event.target.value);
    setCharData(kpiData[event.target.value]);
  };

  const chartOption = {
    xAxis: {
        type: 'category',
        data: chartData.map((record) => record.date),
        axisLabel: { interval: 0, rotate: 30 }
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: chartData.map((record) => record.value),
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
