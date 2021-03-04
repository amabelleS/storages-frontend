import React, { useEffect, useState, useContext } from 'react';

import { CanvasJSChart } from 'canvasjs-react-charts';

import barOptions from './barOptions';

import Button from '../../shared/components/FormElements/Button';

import Context from '../../context/storages/cotext';

import './charts.css';

const BarChart = () => {
  const [options, setOptions] = useState(barOptions);
  const { globalState } = useContext(Context);
  const { storage } = globalState;

  const [monthMode, setMonthMode] = useState(false);

  // this gives an object with dates as keys
  const groups = storage.incomeLog.reduce((groups, log) => {
    const date = log.date.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(log);
    // console.log(groups);
    return groups;
  }, {});

  //
  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      logs: groups[date],
    };
  });

  // this gives an object with dates as keys - GROUPED BT MONTH ---->
  const groupsByMonth = storage.incomeLog.reduce((groupsByMonth, log) => {
    const date = log.date.slice(0, 7);
    if (!groupsByMonth[date]) {
      groupsByMonth[date] = [];
    }

    groupsByMonth[date].push(log);
    return groupsByMonth;
  }, {});

  // Edit: to add it in the array format instead  ?
  const groupByMonthArrays = Object.keys(groupsByMonth).map((date) => {
    return {
      date,
      logs: groupsByMonth[date],
    };
  });

  const sumAmountsByDay = groupArrays
    .map((date) => {
      return {
        date: date.date,
        amount: date.logs.reduce(
          (accumulator, currentValue) => accumulator + currentValue.amount,
          0
        ),
      };
    })
    .slice(-30);

  const sumAmountsByMonth = groupByMonthArrays.map((date) => {
    return {
      date: date.date,
      amount: date.logs.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0
      ),
    };
  });

  const formatGraphData = sumAmountsByDay.map((log) => {
    let dataPoint = {
      // x: log.x,
      // x: index * 10,
      y: log.amount,
      label: log.date.slice(0, 10),
    };

    return dataPoint;
  });

  const formatGraphDataByMonth = sumAmountsByMonth.map((log) => {
    let dataPoint = {
      // x: log.x,
      // x: index * 10,
      y: log.amount,
      label: log.date,
    };

    return dataPoint;
  });

  useEffect(() => {
    if (!monthMode) {
      const updatedOptions = { ...options };
      updatedOptions.data[0].dataPoints = formatGraphData;

      setOptions(updatedOptions);
    } else {
      const updatedOptions = { ...options };
      updatedOptions.data[0].dataPoints = formatGraphDataByMonth;

      setOptions(updatedOptions);
    }
    // eslint-disable-next-line
  }, [setOptions, monthMode, storage]);

  const containerProps = {
    height: '42vh',
  };

  return (
    <div>
      <div className="chart_action">
        <Button stat onClick={() => setMonthMode(!monthMode)}>
          {monthMode
            ? 'Income Per Month Mode - press to show income for the last 30 days'
            : 'Income Per Day Mode - press to change to monthly presentation'}
        </Button>
      </div>
      <CanvasJSChart
        options={options}
        containerProps={containerProps}
        // onRef={(ref) => (this.chart = ref)}
      />
    </div>
  );
};

export default BarChart;
