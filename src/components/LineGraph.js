import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function(tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0');
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  // data[casesType].forEach((date) => {
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint, // new cases between today and yesterday
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }

  return chartData;
};

function LineGraph({casesType = "cases" }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          let chartData = buildChartData(data, 'cases');
          setData(chartData);
        });
    };
    fetchData();
  }, [casesType]);

  return (
    <div>
      {/* optional chaining -if it exists */}
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                data: data,
                backgroundColor: 'rgba(204,16,52,0.5)',
                borderColor: '#CC1034',
              },
            ],
          }}
        />
      )}
    </div>
  )
}

export default LineGraph;
