export default {
  animationEnabled: true,
  responsive: true,
  exportEnabled: true,
  theme: 'light2',
  backgroundColor: 'pink',
  title: {
    text: 'Storage Items Count',
    fontSize: 26,
  },
  axisX: {
    valueFormatString: 'DD MMM,YY',
    title: 'DATE',
    includeZero: true,
    interval: 10,
  },
  axisY: {
    title: 'ITEMS',
    // suffix: ' °C',
  },
  legend: {
    cursor: 'pointer',
    fontSize: 16,
    itemclick: function toggleDataSeries(e) {
      if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      //chart.render();
    },
  },
  toolTip: {
    shared: true,
  },
  data: [
    {
      name: 'Items Out',
      type: 'spline',
      // yValueFormatString: '#0.## °C',
      showInLegend: true,
      dataPoints: [
        // { x: new Date(2017, 6, 24), y: 31 },
        // { x: new Date(2017, 6, 25), y: 31 },
        // { x: new Date(2017, 6, 26), y: 29 },
        // { x: new Date(2017, 6, 27), y: 29 },
        // { x: new Date(2017, 6, 28), y: 31 },
        // { x: new Date(2017, 6, 29), y: 30 },
        // { x: new Date(2017, 6, 30), y: 29 },
      ],
    },
    {
      name: 'Total',
      type: 'spline',
      // yValueFormatString: '#0.## °C',
      showInLegend: true,
      dataPoints: [
        // { x: new Date(2017, 6, 24), y: 20 },
        // { x: new Date(2017, 6, 25), y: 20 },
        // { x: new Date(2017, 6, 26), y: 25 },
        // { x: new Date(2017, 6, 27), y: 25 },
        // { x: new Date(2017, 6, 28), y: 25 },
        // { x: new Date(2017, 6, 29), y: 25 },
        // { x: new Date(2017, 6, 30), y: 25 },
      ],
    },
    // {
    //   name: 'Nantucket',
    //   type: 'spline',
    //   yValueFormatString: '#0.## °C',
    //   showInLegend: true,
    //   dataPoints: [
    //     { x: new Date(2017, 6, 24), y: 22 },
    //     { x: new Date(2017, 6, 25), y: 19 },
    //     { x: new Date(2017, 6, 26), y: 23 },
    //     { x: new Date(2017, 6, 27), y: 24 },
    //     { x: new Date(2017, 6, 28), y: 24 },
    //     { x: new Date(2017, 6, 29), y: 23 },
    //     { x: new Date(2017, 6, 30), y: 23 },
    //   ],
    // },
  ],
};
