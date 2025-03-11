import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options: ApexOptions = {
  colors: ['#fbbf24', '#0096FF'], // Colors for Download Count and Upload Count
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'pie', // Set the chart type to pie
    height: 350,
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        chart: {
          width: '100%',
        },
      },
    },
  ],
  labels: ['Download Count', 'Upload Count'], // Labels for pie chart
  dataLabels: {
    enabled: true, // Enable data labels (show percentage or value inside slices)
    style: {
      colors: ['#FFFFFF', '#FFFFFF'], // Font color for percentage values inside slices
      fontSize: '10px', // Adjust font size
      fontWeight: 'bold', // Bold font for better visibility
    },
    dropShadow: {
      enabled: false, // Optionally enable shadow for text for better readability
      top: 1,
      left: 1,
      blur: 1,
      opacity: 0.75,
    },
  },
  title: {
    align: 'center',
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left', // Adjust legend position for a pie chart
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',
  },
  tooltip: {
    y: {
      formatter: (value: number) => `${value} items`, // Tooltip formatting
    },
  },
};

interface PieChart {
  series: number[]; // Directly pass numbers for the pie chart's data
}

const PieChart: React.FC = () => {
  // Define the initial data
  const [state, setState] = useState<PieChart>({
    series: [70, 30], // Example data: 70 for Download Count, 30 for Upload Count
  });

  const handleReset = () => {
    setState({
      series: [70, 30], // Reset to default values
    });
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-md font-semibold text-black dark:text-white">
            Publication
          </h4>
        </div>

      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={state.series} // Pie chart series data
            type="pie"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
