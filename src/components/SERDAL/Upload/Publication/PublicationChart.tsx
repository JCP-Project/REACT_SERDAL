import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#fbbf24', '#16a34a','#b91c1c'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#fbbf24', '#16a34a','#b91c1c'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 70,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const PublicationChart: React.FC = () => {
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Awaiting Approval',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
      },

      {
        name: 'Approved',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
      },

      {
        name: 'Decline',
        data: [5, 2, 1, 0, 4, 0, 1, 2, 3, 1, 2, 6],
      },
    ],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            <div>
          <h4 className="text-md font-semibold text-black dark:text-white">
            Publication Request
          </h4>
        </div>
      <div className="flex flex-wrap items-start justify-between gap-3 mt-4 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-50">
            <span className="mt-1.5 mr-2 flex h-3 w-full max-w-3 items-center justify-center rounded-full border border-[#fbbf24]">
              <span className="block h-3 w-full max-w-3 rounded-full bg-[#fbbf24]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[14px] text-primary">Awaiting Approval </p>
              <p className="text-xs">Total : 10</p>
            </div>
          </div>
          <div className="flex min-w-30">
          <span className="mt-1.5 mr-2 flex h-3 w-full max-w-3 items-center justify-center rounded-full border border-[#16a34a]">
              <span className="block h-3 w-full max-w-3 rounded-full bg-[#16a34a]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[14px] text-primary">Aprroved </p>
              <p className="text-xs">Total: 80 </p>
            </div>
          </div>
          <div className="flex min-w-30">
          <span className="mt-1.5 mr-2 flex h-3 w-full max-w-3 items-center justify-center rounded-full border border-[#b91c1c]">
              <span className="block h-3 w-full max-w-3 rounded-full bg-[#b91c1c]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[14px] text-primary">Declined</p>
              <p className="text-xs">Total: 20</p>
            </div>
          </div>
        </div>

        {/* <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div> */}

      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default PublicationChart;
