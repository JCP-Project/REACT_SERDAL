
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select, { StylesConfig } from 'react-select';



type AnswerType = 'Short Text' | 'Long Text' | 'Radio' | 'Checkbox' | 'Number';

interface FormField {
  ID: number;
  Question: string;
  Answer: string;
  AnswerType: AnswerType[];
  SelectedType: AnswerType;
  Required: boolean;
  AddOption: string;
}

interface FormData {
    id: number;
    title: string;
    description: string;
    isActive: number;
    isDeleted: number;
    createdBy: number;
    createdDate: Date;
    modifiedBy: number;
    modifiedDate: Date;
    fields: string[] | null;
  }

  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Active",
      value: "0",
    },
    {
      label: "Inactive",
      value: "1",
    },
  ];

  

function Survey (){


        const apiUrl = import.meta.env.VITE_API_URL;

        const [activeTab, setActiveTab] = useState("all");
        const [formData, setformData] = useState<FormData[]>([]);
        const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
            sessionStorage.getItem("isLoggedIn") === "true"
          );
    
    
        const [sort, setSort] = useState<any>(null);
    
        useEffect(() =>{
            GetSurveyList();
            console.log(isLoggedIn);
          },[]);
    
        const GetSurveyList = async() =>{
            try {
                const response = await fetch(`${apiUrl}/api/Survey/AllSurvey`, {
                  method: 'GET',
                });
        
                if (response.ok) {
                  const jsonData:  FormData[] = await response.json();
                  //console.log(jsonData);  
                  setformData(jsonData); 
                  //console.log("Success",formData); 
        
                } else {
                  const errorResponse = await response.json();
                  console.error('Error fetching publications:', errorResponse.message || 'Unknown error');
                 // setErrorMessage(errorResponse.message || 'Error fetching publications');
                }
              } catch (error) {
                console.error('Error fetching publications:', error);
               // setErrorMessage('Error fetching publications');
              } finally {
               // loadPublication.current = false;
              //  setLoading(false);
              }
        };
    
    
        
        
        const filteredRows = formData.filter((row) => {
              return row.isActive === 1;
        })
    
    
          const sortedRows = [...filteredRows].sort((a, b) => {
            if (!sort) return 0; // If no sorting option is selected, return the original order
        
            switch (sort.value) {
                case "title_asc":
                    return a.title.localeCompare(b.title);
                case "title_desc":
                    return b.title.localeCompare(a.title);
                case "date_desc":
                    return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(); // Most recent first
                case "date_asc":
                    return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(); // Oldest first
    
                default:
                    return 0;
            }
        });
    
          const truncate = (txt: string): string => {
            if (txt.length >200) {
              return `${txt.slice(0, 250 - 3)}...`;
            }
            return txt;
          };
    
    
          const handleSort = (selected: any) => {
            setSort(selected);
          };     
        
          const sortOptions = [
            { label: 'Title (A-Z)', value: 'title_asc' },
            { label: 'Title (Z-A)', value: 'title_desc' },
            { label: 'Most Recent', value: 'date_desc' },  // Newest First
            { label: 'Oldest First', value: 'date_asc' }   // Oldest First
          ];


    return(
        <>

        <div className="bg-white">
            <div className="bg-primary text-left py-8">
                <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                >
                        <h1 className="text-2xl font-bold text-left text-white lg:px-40">Survey</h1>
                </motion.div>
            </div>

            <div>
              <div className="lg:px-40 bg-white">

                <div className="block md:flex md:items-center md:justify-end sm:flex-wrap border-b border-gray-300">  



                    <div className="flex items-center justify-center py-1 mx-1">
                    <Select
                        id="SortID"
                        placeholder="Sort By"
                        value={sort}
                        onChange={handleSort}
                        options={sortOptions}
                        styles={customStyles}
                        isClearable ={true}
                        className="text-sm w-full md:w-auto"
                    />
                    </div>

                    
                </div>               

                <div className="flex flex-wrap items-center justify-center">
                    {
                        sortedRows.map((data) => (
                            <div key={`survey-${data.id}`} className={`text-sm relative w-full h-35 p-6 rounded-lg shadow-lg overflow-hidden group m-2 ${ data.isActive == 1 ? `bg-white` : `bg-gray-100`}`}>
                                <div className={`absolute top-0 left-0 w-full h-1 ${ data.isActive == 1 ? `bg-primary` : `bg-secondary`}`}></div>
                                <div>

                                    <Link to={isLoggedIn ? `/survey/answer/${data.id}` : "/signin"}>
                                        <div><h1 className="font-bold text-primary text-lg">{data.title}</h1></div>
                                    </Link> 


                                    <div>
                                        {truncate(data.description)} 
                                    </div>


                                    <div className="flex items-center justify-between w-full mt-3">

                                        <div className="text-xs"><span><FontAwesomeIcon icon={faCalendar} className="mr-1" /></span> 
                                        {
                                            new Date(data.createdDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            })
                                        }
                                        </div>

                                        <div>
                                            <Link to={isLoggedIn ? `/survey/answer/${data.id}` : "/signin"}>
                                                <button className="flex items-center gap-3 bg-[#17C0CC] text-white px-4 py-1 rounded-md hover:bg-[#139B99]">                                                                   
                                                    Answer
                                                </button>   
                                            </Link>   
                                        </div>

                                    </div>

                                </div>

                            </div>
                        ))
                    }
                </div>


              </div>
            </div>

         </div>
        </>
    );
}


const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    fontSize: '.8rem',
    border: "2px solid #17C0CC", // Set the border color to #17C0CC
    boxShadow: 'none', // Remove any default focus outline or shadow
    minWidth: '200px', // Set the minimum width for larger screens
    width: '100%', // Ensures it takes full width in the parent container
    '&:hover': {
      borderColor: "#17C0CC", // Border color remains #17C0CC on hover
    },
    '&:focus': {
      borderColor: "#17C0CC", // Border color remains #17C0CC when focused
    },
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '0.7rem',
    backgroundColor: state.isSelected ? "#17C0CC" : 'transparent', // Background color when selected
    color: state.isSelected ? '#fff' : '#000', // Text color when selected
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: "#17C0CC", // Background color on hover
      color: '#fff', // Text color on hover
    },
  }),
};


export default Survey