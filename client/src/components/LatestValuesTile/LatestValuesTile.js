import './LatestValuesTile.scss';
import Tile from '../generic/Tile/Tile';
import Echart from '../generic/Echart/Echart';

const option1 = {
  series: [{
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      max: 140,
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
          value: 90,
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

const option2 = {
  series: [{
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      max: 40,
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
          value: 30,
          name: 'Stroke rate 1',
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
      data: [120, 200, 150, 80, 70],
      type: 'bar',
      itemStyle: {
        normal: {
            barBorderRadius: [5, 5, 0 ,0 ]
        }
      }
  }]
};

const LatestValuesTile = ({ deviceId }) => {
  return (
    <Tile title={`Waterjet readings: ${deviceId}`}>
      <div className="latest-values-tile">
        <div className="pressure-gauge" style={{ width: '25%', height: 300 }}>
          <Echart option={option1} />
        </div>
        <div className="temperature-bar-chart" style={{ width: '50%', height: 300 }} >
          <Echart option={optionTemperatures}/>
        </div>
        <div className="stroke-rate-gauge" style={{ width: '25%', height: 300 }}>
          <Echart option={option2} />
        </div>
      </div>
    </Tile>
  );
};

export default LatestValuesTile;
