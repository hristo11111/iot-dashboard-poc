import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const KPISelect = ({ kpi, onKPISelect }) => {
  return (
    <FormControl>
      <InputLabel id="kpi-select-label">KPI</InputLabel>
      <Select
        labelId="kpi-select-label"
        value={kpi}
        onChange={onKPISelect}
      >
        <MenuItem value={'PumpHour'}>Pump Hours</MenuItem>
        <MenuItem value={'PumpMinute'}>Pump Minute</MenuItem>
        <MenuItem value={'StrokeCount'}>Stroke count 1</MenuItem>
      </Select>
    </FormControl>
  );
};

export default KPISelect;
