import Breadcrumb from '../components/SERDAL/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Template/Tables/TableOne';
import TableThree from '../components/Template/Tables/TableThree';
import TableTwo from '../components/Template/Tables/TableTwo';
import TableApproval from '../components/Template/Tables/TableApproval';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
        <TableApproval/>
      </div>
    </>
  );
};

export default Tables;
