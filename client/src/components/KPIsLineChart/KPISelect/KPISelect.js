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
        <MenuItem value={'pump_hour'}>Pump Hours</MenuItem>
        <MenuItem value={'pump_minute'}>Pump Minute</MenuItem>
        <MenuItem value={'stroke_count_1'}>Stroke count 1</MenuItem>
      </Select>
    </FormControl>
  );
};

export default KPISelect;
