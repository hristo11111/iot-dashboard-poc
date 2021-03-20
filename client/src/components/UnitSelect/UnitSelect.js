import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const UnitSelect = ({ unit, onUnitSelect }) => {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Unit</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={unit}
        onChange={onUnitSelect}
      >
        <MenuItem value={'cv_1l_temp'}>CV 1L temp</MenuItem>
        <MenuItem value={'oil_temp'}>Oil temp</MenuItem>
        <MenuItem value={'stroke_rate_1'}>Stroke rate 1</MenuItem>
      </Select>
    </FormControl>
  );
};

export default UnitSelect;
