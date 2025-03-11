import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardHeader, Typography, CardBody,  Chip, CardFooter, Tabs, TabsHeader, Tab,} from "@material-tailwind/react";
import { faEye, faSearch} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
 
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Active",
    value: "1",
  },
  {
    label: "Inactive",
    value: "0",
  },

];

interface User {
  id: number;
  imagePath: string;
  firstName: string;
  lastName:string;
  email: string;
  role: string;
  isActive: number;
  createDateTime: string; 
}
 
  
export default function Users() {
  const apiUrl = import.meta.env.VITE_API_URL;

   const [activeTab, setActiveTab] = useState("all"); // Active tab state
  const [filter, setFilter] = useState(""); // Filter state to hold the search query



    const [tableRows, setTableRows] = useState<User[]>([]);

  useEffect(() => {
    const fetchTableRows = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/Users/users`);
        if (!response.ok) {
          console.log("Network response was not ok", response);
          throw new Error("Network response was not ok");
        }
        
        const rowsData = await response.json();
        console.log(rowsData);
        setTableRows(rowsData);
      } catch (error) {
        console.error("Error fetching table rows:", error);
      }
    };

    fetchTableRows();
  }, []);


  // Handle tab changes and reset to the first page when changing the tab
  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue); // Update the active tab
  };

  // Handle input change
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value); // Update the search query
  };

  // Filter and sort rows based on the active tab and search query
  const filteredRows = tableRows
  .filter((row) => {
    // First filter by active tab (status)
    if (activeTab !== "all" && row.isActive.toString() !== activeTab) {
      return false; // Exclude the row if it doesn't match the selected tab
    }
    // Then filter by the search query (title, author, or status)
    return (
      row.email.toLowerCase().includes(filter.toLowerCase()) ||
      row.role.toLowerCase().includes(filter.toLowerCase())
    );
  });





  return (
    <>
      <div className="bg-primary text-left py-8">
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <h1 className="text-2xl font-bold text-left text-white lg:px-40">Datasets</h1>
          </motion.div>
      </div>


    <Card className="h-full w-full px-20 rounded-lg">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-2 flex items-center justify-between gap-8">

        </div>

        {/* Tabs */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value={activeTab} className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={`Tab${value}`} value={value}>
                  <button className="text-md" key={value} onClick={() => handleTabChange(value)}>&nbsp;&nbsp;{label}&nbsp;&nbsp;</button>                
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>

        <div className="w-full md:w-72">
            <div className="relative h-8 w-full min-w-[200px]">
              <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                  <FontAwesomeIcon icon={faSearch} className="w-5 h-5 text-gray-700" />
              </div>
              <input  className="peer h-full w-full rounded-[7px] border border-[#6F9B9E] border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm text-md text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-[#6F9B9E] placeholder-shown:border-t-[#6F9B9E] focus:border-2 focus:border-[#6F9B9E] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" 
                      placeholder=" " 
                      value={filter}
                      onChange={handleFilterChange}
              />
              <label
                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-md text-md leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[10px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-[#6F9B9E] before:transition-all after:pointer-events-none after:mt-[10.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-[#6F9B9E] after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-[#6F9B9E] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-md peer-focus:leading-tight peer-focus:text-[#6F9B9E] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#6F9B9E] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#6F9B9E] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-[#6F9B9E]">               
                Search
              </label>
            </div>
          </div>
        </div>
      </CardHeader>

<CardBody className="px-0">
  {/* Wrapper div for scrolling */}
  <div className="max-h-[500px] min-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-white">
    <table className="mt-2 w-full min-w-max table-auto text-left">
      {/* Make the header sticky */}
      <thead className="sticky top-0 bg-white z-50">
        <tr>
            <th key="title" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
              <Typography  variant="small" color="blue-gray"  className="text-md leading-none opacity-70">
                NAME
              </Typography>
            </th>
            <th key="author" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
              <Typography  variant="small" color="blue-gray"  className="text-md leading-none opacity-70">
                ROLE
              </Typography>
            </th>
            <th key="status" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
              <Typography  variant="small" color="blue-gray"  className="text-md leading-none opacity-70">
                STATUS
              </Typography>
            </th>
            <th key="uploaddate" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
              <Typography  variant="small" color="blue-gray"  className="text-md leading-none opacity-70">
                REGISTERED DATE
              </Typography>
            </th>
            {/* <th key="delete" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
              <Typography  variant="small" color="blue-gray"  className="text-md leading-none opacity-70">
                DETAILS
              </Typography>
            </th> */}

            
        </tr>
      </thead>
      <tbody>
  {filteredRows.map(({ id, imagePath, firstName, lastName, email, role, isActive, createDateTime }) => {
    const classes = "p-1 border-b border-blue-gray-50";

    return (
      <tr key={id}>
        <td className={classes}>
          <div className="flex items-center gap-3 lg:w-45">
            <div>
              <div className="flex items-center">
                <div className="rounded-full bg-primary text-white w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  {firstName.charAt(0).toUpperCase()}{lastName.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray" className="text-md">
                {firstName} {lastName}
              </Typography>
              <Typography variant="small" color="blue-gray" className="text-md opacity-70">
                {email || "No Email Available"} {/* Fallback */}
              </Typography>
            </div>
          </div>
        </td>
        <td className={classes}>
          <div className="block text-center">
            <Typography variant="small" color="blue-gray" className="text-md">
            {role ? `${role.charAt(0).toUpperCase()}${role.slice(1).toLowerCase()}` : "No Role Available"}
            </Typography>
          </div>
        </td>
        <td className={classes}>
          <div>
            <div>
              <Chip
                className="text-white p-0 m-0 text-sm text-center"
                value={isActive === 1 ? "Active" : isActive === 0 ? "Inactive" : "Unknown"}
                style={{
                  backgroundColor: isActive === 1 ? "#16a34a" : isActive === 0 ? "#b91c1c" : "#ffffff",
                }}
              />
            </div>
          </div>
        </td>
        <td className={`${classes} text-center`}>
          <Typography variant="small" color="blue-gray" className="text-md">
            {createDateTime
              ? new Intl.DateTimeFormat('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                }).format(new Date(createDateTime))
              : "No Date Available"} {/* Fallback */}
          </Typography>
        </td>
      </tr>
    );
  })}
</tbody>

    </table>
  </div>
</CardBody>



      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-3 z-50">
        <div className="flex gap-2">
        </div>
      </CardFooter>
    </Card>
    </>
  );
}