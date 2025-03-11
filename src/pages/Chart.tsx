import React from 'react';
import Breadcrumb from '../components/SERDAL/Breadcrumbs/Breadcrumb';
import ChartOne from '../components/Template/Charts/ChartOne';
import ChartThree from '../components/Template/Charts/ChartThree';
import ChartTwo from '../components/Template/Charts/ChartTwo';

const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
