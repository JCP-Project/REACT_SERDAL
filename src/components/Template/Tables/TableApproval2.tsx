import { useSampleClients } from '../../../hooks/sampleData';
import { Client } from '../../../interfaces';
import { Package } from '../../../types/package';


const packageData: Package[] = [
  {
    name: 'Free package',
    price: 0.0,
    invoiceDate: `Jan 13,2023`,
    status: 'Paid',
  },
  {
    name: 'Standard Package',
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: 'Paid',
  },
  {
    name: 'Business Package',
    price: 99.0,
    invoiceDate: `Jan 13,2023`,
    status: 'Unpaid',
  },
  {
    name: 'Standard Package',
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: 'Pending',
  },
];

const TableApproval2 = () => {
  const { clients } = useSampleClients()
  // const perPage = 5
  // const [currentPage, setCurrentPage] = useState(0)

  // const clientsPaginated = clients.slice(perPage * currentPage, perPage * (currentPage + 1))

  return (
      <>

      </>
  );
};

export default TableApproval2;
