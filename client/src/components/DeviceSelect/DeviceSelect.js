import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const DeviceSelect = ({ device, onDeviceSelect }) => {
  return (
    <FormControl>
      <InputLabel id="device-select-label">Device</InputLabel>
      <Select
        labelId="device-select-label"
        id="demo-simple-select"
        value={device}
        onChange={onDeviceSelect}
      >
        <MenuItem value={'MyPythonDevice'}>My Python Device 1</MenuItem>
        <MenuItem value={'MyPythonDevice2'}>My Python Device 2</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DeviceSelect;
