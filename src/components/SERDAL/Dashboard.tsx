import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChartBar, faChartColumn, faChartDiagram, faUpload, faUser } from '@fortawesome/free-solid-svg-icons';

import CardDataStats from './CardDataStats';
import RecentUpload from './Upload/Publication/RecentUpload';


interface TotalCount {
  publication: number;
  dataset: number;
  survey: number;
  users: number
}

const Dashboard2: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

  const [totalCount, setTotalCount] = useState<TotalCount>();


  useEffect(() => {
    fetchTotalCount();
  },[]);

  const fetchTotalCount = async () => {

    try {
      const response = await fetch(`${apiUrl}/api/Dashboard/TotalCount`);

      if (response.ok) {
        const jsonresult: TotalCount = await response.json();
        setTotalCount(jsonresult);

      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
        {
          isAdmin ?(
          <div>
            <div className="p-5">
                  <div className="grid grid-cols-2 gap-1 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                    <CardDataStats title="Survey" total={totalCount?.survey.toString()} rate="">
                      <span className="text-blue-500 bg-blue text-[40px]"><FontAwesomeIcon icon={faBook} /></span>   
                    </CardDataStats>
                    <CardDataStats title="Total Dataset" total={totalCount?.dataset.toString()} rate="" >
                    <span className="text-green-500 bg-blue text-[40px]"><FontAwesomeIcon icon={faChartColumn} /></span>   
                    </CardDataStats>
                    <CardDataStats title="Total Publication" total={totalCount?.publication.toString()} rate="">
                      <span className="text-red-600 bg-blue text-[40px]"><FontAwesomeIcon icon={faUpload} /></span>    
                    </CardDataStats>
                    <CardDataStats title="Total Users" total={totalCount?.users.toString()} rate="">
                      <span className="text-yellow-300 bg-blue text-[40px]"><FontAwesomeIcon icon={faUser} /></span>    
                    </CardDataStats>
                  </div>


                  <div className=" mt-3 grid grid-cols-1 gap-12  md:gap-12">
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
