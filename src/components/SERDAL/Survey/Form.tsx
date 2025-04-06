
import { faAdd, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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





function Form () {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [activeTab, setActiveTab] = useState("all");
    const [formData, setformData] = useState<FormData[]>([]);
    const [sort, setSort] = useState<any>(null);

    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
      localStorage.getItem("isLoggedIn") === "true"
    );
    const navigate = useNavigate();

    useEffect(() =>{
        GetSurveyList();
      },[]);
    
    const GetSurveyList = async() =>{
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
        if (activeTab === "all") {
            return true;
          }
          return activeTab === "0" ? row.isActive === 1 : row.isActive === 0;
    })

    const handleTabChange = (newValue: string) => {
        setActiveTab(newValue);
      };


      const sortedRows = [...filteredRows].sort((a, b) => {
        if (!sort) return 0; // If no sorting option is selected, return the original order
    
        switch (sort.value) {
            case "title_asc":
                return a.title.localeCompare(b.title);
            case "title_desc":
                return b.title.localeCompare(a.title);
            // case "answers_desc":
            //     return (b.answers || 0) - (a.answers || 0);
            // case "answers_asc":
            //     return (a.answers || 0) - (b.answers || 0);

            case "date_desc":
                return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(); // Most recent first
            case "date_asc":
                return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(); // Oldest first

            default:
                return 0;
        }
    });

    const handleRequiredToggle = (ID: number) => {
        setformData((prev) =>
          prev.map((field) =>
            field.id === ID ? { ...field, isActive: field.isActive === 1 ? 0 : 1 } : field
          )
        );
      };

      const truncate = (txt: string): string => {
        if (txt.length >50) {
          return `${txt.slice(0, 50 - 3)}...`;
        }
        return txt;
      };


      const handleSort = (selected: any) => {
        setSort(selected);
      };     
    
      const sortOptions = [
        { label: 'Title (A-Z)', value: 'title_asc' },
        { label: 'Title (Z-A)', value: 'title_desc' },
        { label: 'Most Answered', value: 'answers_desc' },
        { label: 'Least Answered', value: 'answers_asc' },
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

        <div className="bg-white lg:max-h-[90vh]">
            <div className="bg-primary text-left py-8">
                <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                >
                        <h1 className={`text-2xl font-bold text-left text-white px-3 ${adminStatus ? 'lg:px-5' : 'lg:px-40'}`}>Survey</h1>
                </motion.div>
            </div>

            <div>
                <div className={`lg:px-40 bg-white mt-5 ${adminStatus ? 'lg:px-5' : 'lg:px-40'}`}>



                <div className="block md:flex md:items-center md:justify-between border-b border-gray-300">  

                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="flex">
                            {TABS.map((tab, index) => (
                              <button
                                key={index}
                                onClick={() => handleTabChange(tab.value)}
                                className={`px-6 py-2 text-sm font-medium rounded-2xl transition-all ${activeTab === tab.value ? 'text-white bg-primary' : 'text-gray-500 hover:text-primary'}`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className=" md:flex md:items-center md:justify-center py-1 mx-1">
                          <div>
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

                          <div className="flex justify-end  lg:justify-end lg:ml-1 py-3">
                                              
                            <Link to="/admin/survey/create">
                              <button className="flex items-center gap-3 bg-[#17C0CC] text-white px-4 py-2 rounded-md hover:bg-[#139B99]">
                                <FontAwesomeIcon icon={faAdd} className="cursor-pointer" />
                                  Create
                              </button>   
                            </Link>              
                          </div>
                        </div>

                        
                </div>               


                    <div className="flex flex-wrap items-center justify-center mt-5">
                        {
                            sortedRows.map((data) => (
                                <div key={`survey-${data.id}`} className={`text-sm relative  w-full p-6 rounded-lg shadow-lg overflow-hidden group m-2 ${ data.isActive == 1 ? `bg-white` : `bg-gray-100`}`}>
                                    <div className={`absolute top-0 left-0 w-1 h-full ${ data.isActive == 1 ? `bg-primary` : `bg-secondary`}`}></div>
                                    <div>

                                        <div onClick={() => openSurvey(data.id)}><h1 className="font-bold text-primary text-lg cursor-pointer">{data.title}</h1></div>
                                        <div>
                                           {truncate("This is a sample description for survey")} 
                                        </div>
                                        <div>
                                        <div className="w-full mt-5">
                                            <div className="mb-2 flex items-center justify-between">
                                                <p>Answered</p>
                                                <p>50%</p>
                                            </div>
                                              {/* <Progress value={50} className="bg-gray-200 m-0 [&>div]:bg-[#17C0CC]" /> */}
                                            </div>
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
                                            <div className="flex items-center justify-center">
                                                <label className="mr-2 text-xs text-gray-700">Active:</label>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                    type="checkbox"
                                                    checked={data.isActive == 1 ? true : false}
                                                    onChange={() => handleRequiredToggle(data.id)}
                                                    className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                                </label>
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


export default Form