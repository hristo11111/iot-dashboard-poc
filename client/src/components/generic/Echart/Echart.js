import * as echarts from "echarts"
import { useRef, useEffect } from 'react';

const Echart = ({ option }) => {
  const myChart = useRef(null);

  useEffect(() => {
    let instance = echarts.getInstanceByDom(myChart.current);

    if (!instance) {
      instance = echarts.init(myChart.current);
    }
    instance.setOption(option);

    window.addEventListener("resize", () => instance.resize());

    return window.removeEventListener("resize", () => instance.resize());
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
