
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select, { StylesConfig } from 'react-select';
import Loader from '../../../common/Loader';



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
        const navigate = useNavigate();

        const [activeTab, setActiveTab] = useState("all");
        const [formData, setformData] = useState<FormData[]>([]);
        const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
            sessionStorage.getItem("isLoggedIn") === "true"
          );

        const [errorMessage, seterrorMessage] = useState<string>("");       
        const [loading, setLoading] = useState<boolean>(false);
        const adminStatus = sessionStorage.getItem('isAdmin') === 'true';
        const [sort, setSort] = useState<any>(null);
        
        useEffect(() =>{
            GetSurveyList();        
          },[]);

    
        const GetSurveyList = async() =>{
          seterrorMessage("");
          setLoading(true);

            try {
                const response = await fetch(`${apiUrl}/api/Survey/AllSurvey`, {
                  method: 'GET',
                });
        
                if (response.ok) {
                  const jsonData:  FormData[] = await response.json();  
                  setformData(jsonData); 
        
                } else {
                  const errorResponse = await response.json();
                  console.error('Error fetching publications:', errorResponse.message || 'Unknown error');
                  seterrorMessage("No Survey Available");
                }
              } catch (error) {
                console.error('Error fetching publications:', error);
                seterrorMessage("Failed to fetch dataset from the server.");

              } finally {
                setLoading(false);
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


          

    const openSurvey = (id: number) => {

      if (isLoggedIn) {
        return navigate( `/survey/answer/${id}`);    
      }
      localStorage.setItem("surveyPath", `/survey/answer/${id}`);
      navigate("/auth/signin");
    }


    return(
        <>

        <div className="bg-white">
            <div className="bg-primary text-left py-8">
                <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                >
                        <h1 className="text-2xl font-bold text-left text-white px-3 lg:px-40">Survey</h1>
                </motion.div>
            </div>

            <div>
              <div className={`bg-white ${adminStatus ? 'lg:px-5' : 'lg:px-40'}`}>

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

                {loading ? (
                    <div><Loader /></div>
                  ) : (
                    errorMessage ? (
                      <div className='w-[100%] text-center py-20 text-gray-400 font-bold text-lg'>
                      {errorMessage}
                    </div>
                    ) : (
                     <div>
                                          {
                        sortedRows.map((data) => (
                            <div key={`survey-${data.id}`} className={`text-sm relative lg:w-full lg:h-35 p-6 rounded-lg shadow-lg overflow-hidden group m-2 ${ data.isActive == 1 ? `bg-white` : `bg-gray-100`}`}>
                                 <div className={`absolute top-0 left-0 w-1 h-full ${ data.isActive == 1 ? `bg-primary` : `bg-secondary`}`}></div>
                                <div>

                                  <div onClick={() => openSurvey(data.id)}><h1 className="font-bold text-primary text-lg cursor-pointer">{data.title}</h1></div>



                                    <div>
                                        {truncate(data.description)} 
                                    </div>


                                    <div className="flex items-center justify-between w-full mt-3">

                                        <div className="text-xs"><span><FontAwesomeIcon icon={faCalendar} className="mr-1" /></span> 
                                        {
                                            new Date(`${data.createdDate}Z`).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            })
                                        }
                                        </div>

                                        <div>
                                                <button className="flex items-center gap-3 bg-[#17C0CC] text-white px-4 py-1 rounded-md hover:bg-[#139B99]" onClick={() => openSurvey(data.id)}>                                                                   
                                                    Answer
                                                </button>   
                                        </div>

                                    </div>

                                </div>

                            </div>
                        ))
                    }
                     </div>
                    )
                  )}




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