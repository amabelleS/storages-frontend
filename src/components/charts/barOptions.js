export default {
  animationEnabled: true,
  responsive: true,
  exportEnabled: true,
  theme: 'dark2',
  title: {
    text: 'Income',
    fontSize: 24,
  },
  // subtitles: [
  //   {
  //     text: 'Per Day',
  //   },
  // ],
  axisX: {
    // valueFormatString: 'DD MMM,YY',
    title: 'DATE',
    // fontSize: 21,
  },
  axisY: {
    title: 'Income (ILS)',
    includeZero: true,
    suffix: '₪',
    // maximum: 100,
  },
  data: [
    {
      type: 'column',
      // yValueFormatString: "#,###'%'",
      // xValueFormatString: '##.00000',
      yValueFormatString: '##',
      indexLabel: '{y}',
      dataPoints: [
        // { label: 'Core 1', y: 68 },
        // { label: 'Core 2', y: 3 },
        // { label: 'Core 3', y: 8 },
        // { label: 'Core 4', y: 87 },
        // { label: 'Core 5', y: 2 },
        // { label: 'Core 6', y: 6 },
      ],
    },
  ],
};
