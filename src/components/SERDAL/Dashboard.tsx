import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChartBar, faChartColumn, faChartDiagram, faUpload, faUser } from '@fortawesome/free-solid-svg-icons';

import PublicationChart from './Upload/Publication/PublicationChart';
import PieChart from './Upload/Publication/PieChart';
import Publication from './Upload/Publication/Publication1';
import CardDataStats from './CardDataStats';
import RecentUpload from './Upload/Publication/RecentUpload';


const Dashboard2: React.FC = () => {


  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

  return (
    <>
        {
          isAdmin ?(
          <div>
            <div className="p-5">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                    <CardDataStats title="Survey" total="43" rate="">
                      <span className="text-blue-500 bg-blue text-[40px]"><FontAwesomeIcon icon={faBook} /></span>   
                    </CardDataStats>
                    <CardDataStats title="Total Dataset" total="132" rate="" >
                    <span className="text-green-500 bg-blue text-[40px]"><FontAwesomeIcon icon={faChartColumn} /></span>   
                    </CardDataStats>
                    <CardDataStats title="Total Publication" total="30" rate="">
                      <span className="text-red-600 bg-blue text-[40px]"><FontAwesomeIcon icon={faUpload} /></span>    
                    </CardDataStats>
                    <CardDataStats title="Total Users" total="137" rate="">
                      <span className="text-yellow-300 bg-blue text-[40px]"><FontAwesomeIcon icon={faUser} /></span>    
                    </CardDataStats>
                  </div>


                  <div className=" mt-3 grid grid-cols-12 gap-4  md:gap-6 2xl:gap-7.5">
                    {/* <PublicationChart/> */}
                    <RecentUpload/>
                    {/* <PieChart/> */}
                  </div>

                </div>
            </div> 
          ):(
            <div> <Publication /></div>
           )
        }
    </>
  );
};

export default Dashboard2;
