import React, { useEffect, useState, useContext } from 'react';

import { CanvasJSChart } from 'canvasjs-react-charts';

import sampleOptions from './options';

import Context from '../../context/storages/cotext';

// you can check more here, about line chart / original code samples:
// https://canvasjs.com/react-charts/line-chart/

// const defaultOptions = {
//   responsive: true,
//   animationEnabled: true,
//   exportEnabled: true,
//   theme: 'light2',

//   axisX: {
//     title: 'Month',
//     interval: 10,
//   },
//   axisY: {
//     title: 'New Users (per month)',
//     includeZero: true,
//   },
//   data: [
//     {
//       type: 'line',
//       dataPoints: [samplePoints],
//     },
//   ],
// };

const LineChart = (props) => {
  const { globalState, globalDispatch } = useContext(Context);
  const { storage } = globalState;
  const [options, setOptions] = useState(sampleOptions);

  //   const addSymbols = (e) => {
  //     var suffixes = ['', 'K', 'M', 'B'];
  //     var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
  //     if (order > suffixes.length - 1) order = suffixes.length - 1;
  //     var suffix = suffixes[order];
  //     return CanvasJSChart.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  //   };
  //   const toggleDataSeries = (e) => {
  //     if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
  //       e.dataSeries.visible = false;
  //     } else {
  //       e.dataSeries.visible = true;
  //     }
  //     this.chart.render();
  //   };

  // const formatGraphData = (dataNum) => {
  //   let x = 0,
  //   const formated = storage.itemsDataPoints.map((log) => {
  //     x += 10;
  //     let dataPoint = {
  //       x: x,
  //       y: log[dataNum],
  //       label: log.x,
  //     };
  //     // x = 0;
  //     return dataPoint;
  //   });
  // }

  useEffect(() => {
    // let x = 0;

    const formatGraphData1 = storage.itemsDataPoints.map((log, index) => {
      // x += 10;
      let dataPoint = {
        x: index * 10,
        y: log.y1,
        label: log.x,
      };
      // x = 0;
      return dataPoint;
    });

    const formatGraphData2 = storage.itemsDataPoints.map((log, index) => {
      // x += 10;
      let dataPoint = {
        // x: log.x,
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
  }, [setOptions]);

  //   useEffect(() => {
  //     const CancelToken = axios.CancelToken;
  //     const source = CancelToken.source();

  //     const fetchGraphData = async () => {
  //       try {
  //         const config = {
  //           headers: {
  //             'content-type': 'application/json',
  //             'X-Requested-With': 'XMLhttpRequest',
  //           },
  //         };

  //         const {
  //           data,
  //         } = await axios.get(
  //           `${process.env.REACT_APP_BACKEND_URL_RGISTERED}?token=${user.token}`,
  //           config,
  //           { cancelToken: source.token }
  //         );

  // let x = 0;
  // const formatGraphData = data.reverse().map((month) => {
  //   x += 10;
  //   let dataPoint = {
  //     x: x,
  //     y: month.accountSum,
  //     label: month.month,
  //   };
  //   return dataPoint;
  // });

  //         const updatedOptions = { ...options };
  //         updatedOptions.data[0].dataPoints = formatGraphData;
  //         setOptions(updatedOptions);
  //       } catch (err) {
  //         if (axios.isCancel(err)) {
  //           console.log('cancelled');
  //         } else {
  //           console.log(`😱 Axios fetch registered users failed: ${err}`);
  //         }
  //       }
  //     };

  //     fetchGraphData();

  //     return () => {
  //       source.cancel();
  //     };
  //     // eslint-disable-next-line
  //   }, [setOptions]);

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
