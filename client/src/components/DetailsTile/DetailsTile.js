import Tile from '../generic/Tile/Tile';
import Skeleton from '@material-ui/lab/Skeleton';

import './DetailsTile.scss';

const DetailsTile = ({ lastReportTime, isLoading, pumpHours }) => {
  return (
    <div className="details-wrapper">
      <Tile title="Current Pump Hours">
        {pumpHours}
      </Tile>
      <Tile title="Status" className="status-tile">
        Running
      </Tile>
      <Tile title="Last Report Time">
        {isLoading ? <Skeleton /> : lastReportTime}
      </Tile>
    </div>
  );
};

export default DetailsTile;
