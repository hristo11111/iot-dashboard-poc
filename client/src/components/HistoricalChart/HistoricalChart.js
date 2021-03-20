/* eslint no-undef: "off" */
import { useEffect, useRef } from 'react';

const options = {
  config: {
    // Vega-Lite default configuration
  },
  init: (view) => {
    // initialize tooltip handler
    // view.tooltip(new vegaTooltip.Handler().call);
  },
  view: {
    // view constructor options
    // remove the loader if you don't want to default to vega-datasets!
    loader: vega.loader({
      baseURL: "https://cdn.jsdelivr.net/npm/vega-datasets@2/",
    }),
    renderer: "svg",
  },
};

const HistoricalChart = ({ unit, data }) => {
  const container = useRef();

  useEffect(() => {
    vl.register(vega, vegaLite, options);

    vl
      .markLine()
      .data(data)
      .width(500)
      .encode(
        vl.y().fieldQ(unit),
        vl.x().timeMD('date').axis({title: 'Day', format: '%d'})
      )
      .render()
      .then(chart => {
        const oldChild = document.querySelectorAll('#container > div')[0];
        container.current.replaceChild(chart, oldChild);
      });
  }, [unit, data]);

  return (
    <>
      <div id="container" ref={container}>
        <div></div>
      </div>
    </>
  );
};

export default HistoricalChart;
