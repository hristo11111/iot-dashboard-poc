import * as echarts from "echarts"
import { useRef, useEffect } from 'react';

const Echart = ({ option }) => {
  const myChart = useRef(null);

  useEffect(() => {
    const chart = echarts.init(myChart.current);
    chart.setOption(option);

    window.addEventListener("resize", () => chart.resize());

    return window.removeEventListener("resize", () => chart.resize());
  }, [option])

  return (
    <div
      ref={myChart}
      style={{
        height: "100%",
        width:"100%"
      }}
    ></div>
  );
};

export default Echart;
