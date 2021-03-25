
import Tile from '../generic/Tile/Tile';

import './DetailsTile.scss';

const DetailsTile = ({ pumpHours, lastReportTime }) => {
  return (
    <div className="details-wrapper">
      <Tile title="Current Pump Hours">
        {pumpHours}
      </Tile>
      <Tile title="Status" className="status-tile">
        Running
      </Tile>
      <Tile title="Last Report Time">
        {lastReportTime}
      </Tile>
    </div>
  );
};

export default DetailsTile;
