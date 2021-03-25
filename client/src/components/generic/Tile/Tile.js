import Paper from '@material-ui/core/Paper';

import './Tile.scss';

const Tile = ({ title, className, children }) => {
  return (
    <Paper elevation={3}>
      <div className={`tile-wrapper ${className}`}>
        <div className="title">{title}</div>
        <div className="tile-content">
          {children}
        </div>
      </div>
    </Paper>
  );
};

export default Tile;
