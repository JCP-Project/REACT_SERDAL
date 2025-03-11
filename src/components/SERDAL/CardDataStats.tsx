import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {
  return (
    <div className="rounded-lg border border-stroke bg-white shadow-default py-4">
      <div className="flex items-center justify-center bg-tranparrent">
        <div>
          {children}
        </div>
        

        <div className="flex items-end justify-between ml-4">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
      </div>


    </div>
  );
};

export default CardDataStats;
