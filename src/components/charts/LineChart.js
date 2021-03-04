import React, { useEffect, useState, useContext } from 'react';

import { CanvasJSChart } from 'canvasjs-react-charts';

import sampleOptions from './options';

import Context from '../../context/storages/cotext';

// you can check more here, about line chart / original code samples:
// https://canvasjs.com/react-charts/line-chart/

const LineChart = (props) => {
  const { globalState } = useContext(Context);
  const { storage } = globalState;
  const [options, setOptions] = useState(sampleOptions);

  useEffect(() => {
    const formatGraphData1 = storage.itemsDataPoints.map((log, index) => {
      // x += 10;
      let dataPoint = {
        x: index * 10,
        y: log.y1,
        label: log.x,
      };

      return dataPoint;
    });

    const formatGraphData2 = storage.itemsDataPoints.map((log, index) => {
      let dataPoint = {
        x: index * 10,
        y: log.y2,
        label: log.x,
      };

      return dataPoint;
    });

    const updatedOptions = { ...options };
    updatedOptions.data[0].dataPoints = formatGraphData1;
    updatedOptions.data[1].dataPoints = formatGraphData2;
    setOptions(updatedOptions);

    // eslint-disable-next-line
  }, [setOptions, storage.itemsDataPoints]);

  const containerProps = {
    height: '42vh',
  };

  return (
    <div>
      <CanvasJSChart containerProps={containerProps} options={props.options} />
    </div>
  );
};

export default LineChart;
