import './LatestValuesTile.scss';
import Skeleton from '@material-ui/lab/Skeleton';
import Tile from '../generic/Tile/Tile';
import Echart from '../generic/Echart/Echart';

const LatestValuesTile = ({ deviceId, pressure, strokeRate1, barChartData }) => {
  const pressureOption = {
    series: [{
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        max: 160,
        pointer: {
            show: false
        },
        progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
                borderWidth: 1,
                borderColor: '#464646'
            }
        },
        axisLine: {
            lineStyle: {
                width: 15
            }
        },
        splitLine: {
            show: false,
            distance: 0,
            length: 10
        },
        axisTick: {
            show: true
        },
        axisLabel: {
            show: false,
            distance: 40
        },
        data: [{
            value: pressure,
            name: 'Output pressure',
            title: {
                offsetCenter: ['0%', '-25%']
            },
            detail: {
                offsetCenter: ['0%', '10%']
            }
        }
        ],
        title: {
            fontSize: 14
        },
        detail: {
            width: 50,
            height: 24,
            fontSize: 14,
            color: 'auto',
            borderColor: 'auto',
            borderRadius: 20,
            borderWidth: 1,
            formatter: '{value}'
        }
    }]
  };

  const strokeRate1Option = {
    series: [{
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        min: 20,
        max: 60,
        pointer: {
            show: true
        },
        progress: {
            show: true,
            overlap: false,
            roundCap: false,
            clip: false
        },
        axisLine: {
            lineStyle: {
                width: 5
            }
        },
        axisTick: {
            show: false
        },
        splitLine: {
            length: 5,
            lineStyle: {
                width: 2,
                color: '#999'
            }
        },
        axisLabel: {
            distance: -45,
            color: '#999',
            fontSize: 12,
            formatter: function (value) {
                if (value === 20) {
                    return '';
                }
                return value + '°';
            }
        },
        data: [{
            value: strokeRate1,
            name: 'Stroke rate 1',
            title: {
                offsetCenter: ['0%', '-145%']
            },
            detail: {
                offsetCenter: ['0%', '35%']
            }
        }
        ],
        title: {
            fontSize: 14
        },
        detail: {
            width: 50,
            height: 24,
            fontSize: 14,
            color: 'auto',
            borderColor: 'auto',
            borderRadius: 20,
            borderWidth: 1,
            formatter: '{value}'
        }
    }]
  };

  const optionTemperatures = {
    xAxis: {
        type: 'category',
        data: ['CV Left 1', 'CV Left 2', 'CV Right 1', 'CV Right 2', 'Oil'],
        axisLabel: { interval: 0, rotate: 30 }
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: barChartData,
        type: 'bar',
        itemStyle: {
          normal: {
              barBorderRadius: [5, 5, 0 ,0 ]
          }
        }
    }]
  };

  return (
    <Tile title={`Waterjet readings: ${deviceId}`}> 
      <div className="latest-values-tile">
        <div className="pressure-gauge" style={{ width: '25%', height: 350 }}>
          {pressure === -1 ? <Skeleton variant="rect" height='80%' width="100%" /> : <Echart option={pressureOption} />}
        </div>
        <div className="temperature-bar-chart" style={{ width: '50%', height: 350 }} >
          <Echart option={optionTemperatures}/>
        </div>
        <div className="stroke-rate-gauge" style={{ width: '25%', height: 350 }}>
          {strokeRate1 === -1 ? <Skeleton variant="rect" height='80%' width="100%" /> : <Echart option={strokeRate1Option} />}
        </div>
      </div>
    </Tile>
  );
};

export default LatestValuesTile;
