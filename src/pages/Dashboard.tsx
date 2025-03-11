import React from 'react';
import CardDataStats from '../components/Template/CardDataStats';
import ChartOne from '../components/Template/Charts/ChartOne';

import ChatCard from '../components/Template/Chat/ChatCard';

import TableOne from '../components/Template/Tables/TableOne';
import TableRecentUpload from '../components/Template/Tables/TableRecentUpload';
import TableApproval2 from '../components/Template/Tables/TableApproval2';
import Publication from '../components/SERDAL/Upload/Publication/Publication1';
import UploadPublication from '../components/SERDAL/Upload/Publication/UploadPublication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChartColumn, faUpload, faUser } from '@fortawesome/free-solid-svg-icons';
import TestChart from '../components/Template/Charts/TestChart';
import PublicationChart from '../components/SERDAL/Upload/Publication/PublicationChart';
import PieChart from '../components/SERDAL/Upload/Publication/PieChart';

const Dashboard: React.FC = () => {


  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

  let Dashboard;
  if (isAdmin) {
    Dashboard = <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Survey" total="43" rate="">
          <span className="text-blue-500 bg-blue text-[40px]"><FontAwesomeIcon icon={faBook} /></span>   
        </CardDataStats>
        <CardDataStats title="Total Dataset Uploaded" total="132" rate="" >
        <span className="text-green-500 bg-blue text-[40px]"><FontAwesomeIcon icon={faChartColumn} /></span>   
        </CardDataStats>
        <CardDataStats title="Total Uploaded Files" total="30" rate="">
          <span className="text-red-600 bg-blue text-[40px]"><FontAwesomeIcon icon={faUpload} /></span>    
        </CardDataStats>
        <CardDataStats title="Total Users" total="137" rate="">
          <span className="text-yellow-300 bg-blue text-[40px]"><FontAwesomeIcon icon={faUser} /></span>    
        </CardDataStats>
      </div>


      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <PublicationChart/>
        <PieChart/>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
      
        {/* <ChartThree /> */}
        {/* <MapOne /> */}

        <div className="col-span-12 xl:col-span-16">
        <TestChart chartType="area"/>
        </div>
        {/* 
        <div className="col-span-12 xl:col-span-16">
        <TestChart chartType="bar"/>
        </div>
        <div className="col-span-12 xl:col-span-16">
        <TestChart chartType="area"/>
        </div>
        <div className="col-span-12 xl:col-span-16">
        <TestChart chartType="pie"/>
        </div>
        <div className="col-span-12 xl:col-span-16">
        <TestChart chartType="donut"/>
        </div>
        <div className="col-span-12 xl:col-span-16">
        <TestChart chartType="radialBar"/>
        </div>
        <div className="col-span-12 xl:col-span-16">
        <TestChart chartType="scatter"/>
        </div>
        <div className="col-span-12 xl:col-span-16">
        <TestChart chartType="bubble"/>
        </div>
        <div className="col-span-12 xl:col-span-16">
        <TestChart chartType="heatmap"/>
        </div>
        <div className="col-span-12 xl:col-span-16">
        <TestChart chartType="candlestick"/>
        </div>
        <div className="col-span-12 xl:col-span-16">
        <TestChart chartType="boxPlot"/>
        </div>
        <div className="col-span-12 xl:col-span-16">
        <TestChart chartType="radar"/>
        </div>
        <div className="col-span-12 xl:col-span-16">
        <TestChart chartType="polarArea"/>
        </div>
        <div className="col-span-12 xl:col-span-16">
        <TestChart chartType="rangeBar"/>
        </div>
        <div className="col-span-12 xl:col-span-16">
        <TestChart chartType="rangeArea"/>
        </div> */}






        <div className="col-span-12 xl:col-span-16">
          <TableOne />
        </div>
        <div className="col-span-12 xl:col-span-16">
          <TableRecentUpload />
        </div>

        <div className="col-span-12 xl:col-span-16">
          <TableApproval2 />
        </div>

        <div className="col-span-12 xl:col-span-16">
          <UploadPublication />
        </div>

        <ChatCard />
      </div>
    </div>
      ;
  } else {
    Dashboard = <div> <Publication /></div>;
  }

  return (
    <>
      {/* {Dashboard} */}
    </>
  );
};

export default Dashboard;
