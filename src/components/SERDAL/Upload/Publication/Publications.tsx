import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PublicationList from "./PublicationsList";
import { useEffect, useRef, useState } from "react";
import Loader from "../../../../common/Loader/Loader2";
import Select, { StylesConfig } from 'react-select';
import { motion } from 'framer-motion';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface ApiData {
  publication: Publication[]; // Array of publications
  university: University[]; // Array of universities
  keywordList: keywordList[];
}

interface Publication {
  id: number;
  title: string;
  author: string;
  summary: string;
  createdDate: string;
  createdBy: number;
  status: number;
  modifiedBy: number;
  modifiedDate: string;
  imgPath: string;
  pdfLink: string;
  pdfFile: string;
  category: string;
  university: number;
  download: number;
  isDeleted: number;
}

interface University {
  id: number;
  value: string;
  label: string;
  isDeleted: number;
}

interface keywordList {
  keywords: string;
}


function Publications()
{
      const apiUrl = import.meta.env.VITE_API_URL;

      const [publications, setPublications] = useState<Publication[]>([]);
      const [university, setUniversity] = useState<University[]>([]);
      const [keywordList, setKeywords] = useState<keywordList[]>([]);
      const [suggestions, setSuggestions] = useState<Publication[]>([]); // List of suggestions
 
      const [searchTerm, setSearchTerm] = useState("");  // The current search input value
      const searchInputRef = useRef<HTMLInputElement | null>(null);
      const searchContainerRef = useRef(null);
      const loadPublication = useRef(false);
      const [initialLoad, setInitialLoad] = useState(true);
      const [loadDropdown, setLoadDropdown] = useState(true);
      const [hideFilter, sethideFilter] = useState(true);

      const [selectedUniversity, setselectedUniversity] = useState<any>(null);
      const [selectedKeywords, setselectedKeywords] = useState<any>(null);

      const [loading, setLoading] = useState<boolean>(false);
      const [errorMessage, setErrorMessage] = useState<string | null>(null);
      const [selectedOption1, setSelectedOption1] = useState<any>(null);

      const [currentPage, setCurrentPage] = useState(1);  // Current page
      const [totalCount, setTotalCount] = useState(0); // Total number of records
      const pageSize = 10;  // Number of publications per page

      
      const totalPages = Math.ceil(totalCount / pageSize); // Calculate total pages

      // Generate page numbers for pagination with a max of 10 buttons shown at a time
      const generatePageNumbers = () => {
        const maxPageNumbers = 10;
        let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
        let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

        if (endPage - startPage + 1 < maxPageNumbers) {
          startPage = Math.max(1, endPage - maxPageNumbers + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
      };

      const pageNumbers = generatePageNumbers();

  //#region  Function to fetch publications based on the current page

    // Call fetchPublications when the component mounts or when the page changes
    useEffect(() => {
      if (initialLoad) {
        setInitialLoad(false); 
        return;
      }
    
      fetchPublications();
    }, [currentPage, initialLoad, selectedKeywords, selectedUniversity, selectedOption1]);


    //API Call
    const fetchPublications = async () => {
      setLoading(true);
      setErrorMessage('');
      setPublications([]);

      const loadpage = {
        page: currentPage,
        pagesize: pageSize,
        universities: selectedUniversity ? selectedUniversity.value.toString() : "", 
        keywords: selectedKeywords ? selectedKeywords.value : "",
        order: selectedOption1 ? selectedOption1.value : "",
        search: searchTerm,
      };
      
      try {
        const response = await fetch(`${apiUrl}/api/Publication/PublicationPerPage`, {
          method: 'POST',  // Use POST method
          headers: {
            'Content-Type': 'application/json',  // Sending JSON data
          },
          body: JSON.stringify(loadpage),
        });

        if (response.ok) {
          const jsonData = await response.json();
          

          setPublications(jsonData.publications);  // Update publications
          setTotalCount(jsonData.totalCount); // Update total count

        } else {
          const errorResponse = await response.json();
          console.error('Error fetching publications:', errorResponse.message || 'Unknown error');
          setErrorMessage(errorResponse.message || 'Error fetching publications');
        }
      } catch (error) {
        console.error('Error fetching publications:', error);
        setErrorMessage('Error fetching publications');
      } finally {
        loadPublication.current = false;
        setLoading(false);
      }
    };
//#endregion

    
      useEffect(() => {

        if (loadDropdown === true) {
          setLoadDropdown(false);
          fetchData();

        }
      }, []);

      const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/Publication/Dropdown`, {
          method: "GET",
        });
        if (response.ok) {
          const jsonData: ApiData = await response.json();
          setUniversity(jsonData.university);
          setKeywords(jsonData.keywordList);
        } else {
          const errorResponse = await response.json();
          console.error("Error message", errorResponse.message || "Unknown error");
        }
      } catch (error) {
            console.error("Error fetching publication data:", error);
      } finally {
      }
    };


    //#region Multi Select

      const universityOptions = university.map((uni) => ({
            value: uni.id,
            label: uni.label,
      }));

      const keywordsOptions = keywordList.map((key) => ({     
        value: key,
        label: key,
      }));      

   const handleChangeUniversity = (selected: any) => {
    setselectedUniversity(selected);
    setCurrentPage(1);
  };

  const handleChange1 = (selected: any) => {
      setSelectedOption1(selected);
      setCurrentPage(1);
    };

  const handleChangeKeywords = (selected: any) => {
    setselectedKeywords(selected);
    setCurrentPage(1);
  };
  //#endregion

   const optionSort = [
    { label: 'Title (A-Z)', value: 'Title_ASC' },
    { label: 'Title (Z-A)', value: 'Title_DESC' },
    { label: 'Publication Date Most Recent', value: 'PublicationDate_MostRecent' },
    { label: 'Publication Date Oldest First', value: 'PublicationDate_OldestFirst' },
  ];


  
  //#region Filter by Clicked Publications
  const filterData = async (id:number) => {
    setLoading(true);
   try {
     const response = await fetch(`${apiUrl}/api/Publication/Search/${id}`, {
       method: "GET",
     });
 
     if (response.ok) {
       const jsonData: Publication[] = await response.json();
       setPublications(jsonData);

     } else {
       console.error("Error fetching publication data");
       setErrorMessage("Error fetching publication data");
     }
   } catch (error) {
     console.error("Error fetching publication data:", error);
     setErrorMessage("Error fetching publication data");
    } finally {
      setLoading(false);
      setSuggestions([]); 
    }
 };
 //#endregion


//#region Search
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    //Search when press enter
    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setErrorMessage("");
        setCurrentPage(1);  // Reset to the first page
        setLoading(true); // Set loading to true when starting the fetch
        await SearchAll(searchTerm);  // Wait for the async function to finish
        setLoading(false); // Set loading to false once the data is fetched
      }
    };


    const SearchAll = async (search: string) => {
      setLoading(true);
      setPublications([]); // Clear previous publications

      try {
        // Update API call to include pagination parameters
        const response = await fetch(`${apiUrl}/api/Publication/SearchAll?query=${search}&page=${currentPage}&pageSize=${pageSize}`);
        
        if (response.ok) {
          const jsonData = await response.json(); // Get the paginated publications
          setPublications(jsonData.publications); // Set fetched publications to state
          
          // Handle pagination (optional, depending on your API response format)
          setTotalCount(jsonData.totalCount); // Assuming your API returns a `totalCount` for pagination
        } else {
          const errorResponse = await response.json();
          console.error("Error message", errorResponse.message || "Unknown error");
          setErrorMessage(errorResponse.message);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setSuggestions([]);
        setLoading(false);
      }
    };


    useEffect(() => {
      // If search term is empty, fetch all data
      if (searchTerm.length === 0) {
        setErrorMessage("");
        setSuggestions([]);  // Clear suggestions before fetching all data
        setTotalCount(0); // Reset total count
        setCurrentPage(1); // Reset to the first page
        setPublications([]);
        fetchPublications();

        return;
      }
    
      // If search term is too short, clear suggestions
      if (searchTerm.length < 3) {
        setErrorMessage("");
        setSuggestions([]); // Clear suggestions if search term is too short
        return;
      }
    
      // For longer search terms
      const timer = setTimeout(() => {
        fetchSuggestions();
      }, 500);
    
      return () => clearTimeout(timer);
    }, [searchTerm]);

    //Suggestion whle typing
    const fetchSuggestions = async () => {
      try {
        const query = searchTerm.length === 0 ? 'X' : searchTerm;  // Check for empty searchTerm
        const response = await fetch(`${apiUrl}/api/Publication/searchSuggestions?query=${query}`);
        if (response.ok) {
          const jsonData: Publication[] = await response.json();        
          if (jsonData && Array.isArray(jsonData.data)) {
            setSuggestions(jsonData.data);           
          } else {
            console.error("Fetched data is not in the expected format.");
          }
        } else {
          console.error("Error fetching suggestions");
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
          setSuggestions([]); // Clear suggestions when clicking outside
        }
      };
    
      // Add event listener to the document to detect clicks outside the container
      document.addEventListener("mousedown", handleClickOutside);
    
      // Clean up the event listener when the component is unmounted
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

//#endregion


  const handleSuggestionClick = (Id:number,suggestion: string) => {
    setSearchTerm(suggestion);
    filterData(Id);
  };


    return(
    <div className="bg-white lg:min-h-[90vh]">
      <div className="bg-primary text-left py-8">
          <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
                  <h1 className="text-2xl font-bold text-left text-white px-3 lg:px-40">Publications</h1>
        </motion.div>
      </div>


      <div className="px-0 lg:px-40 ">
        <div className="flex items-center justify-center">
        {
          loading ? (
              <div><Loader /></div> // Show loader while loading
          ) : (
              <div className="flex w-screen ">

                <div className="w-full lg:w-[100%]">

                  <div className="flex items-center justify-end my-5">
                      <div className="relative w-full" ref={searchContainerRef}>

                        <div className="flex items-center h-10 px-1 lg:h-10 lg:px-0">
                          <div className="flex-grow border-2 border-primary h-full">
                            <input
                              type="text"
                              ref={searchInputRef}
                              value={searchTerm}
                              onChange={handleInputChange}
                              onKeyDown={handleKeyPress}
                              placeholder="Search publications..."
                              className="w-full h-full text-lg pl-2 text-gray-700 placeholder-gray-400 focus:outline-none"
                            />
                          </div>

                          <div className="text-lg bg-primary border-2 border-primary px-3 text-white h-full flex hover:bg-primary hover:text-gray-100">
                            <button>Search</button>
                          </div>
                        </div>

                        {suggestions.length > 0 && (
                          <ul className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                            {suggestions.map((suggestion) => (
                              <li
                                key={suggestion.id}
                                onClick={() => handleSuggestionClick(suggestion.id, suggestion.title)}
                                className="p-2 cursor-pointer text-lg text-gray-500 hover:bg-primary hover:text-white"
                              >
                                <div>
                                  <p className="">{suggestion.title}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}

                      </div>
                  </div> 

                  <div className="block md:flex md:items-center md:justify-end sm:flex-wrap border-b border-gray-300">
    
                      <div className="flex items-center justify-center py-1 mx-1">
                        <label htmlFor="SortID" className="text-sm pr-0 lg:pr-3"><span className="lg:block hidden"></span> </label>
                        <Select
                          id="SortID"
                          placeholder="Sort By"
                          value={selectedOption1}
                          onChange={handleChange1}
                          options={optionSort}
                          styles={customStyles}
                          isClearable ={true}
                          className="text-sm w-full md:w-auto"  // Full width on mobile, 200px on larger screens, auto on desktop
                        />
                      </div>

                      <div className="mx-1 md:ml-3 my-1 flex justify-end">
                      <button
                        onClick={() => sethideFilter(prev => !prev)}
                        className="bg-primary text-white px-5 py-3 rounded-sm flex items-center space-x-2"
                        title={hideFilter ? "Show Advance Filters" : "Hide Advance Filters"} // Tooltip text
                      >
                        <FontAwesomeIcon icon={faFilter} className="mr-2" />
                        <span>{hideFilter ? <FaAngleDown /> : <FaAngleUp />}</span>
                      </button>

                      </div>

                      {
                        !!!hideFilter && (
                          <motion.div
                          // initial={{ y: -5 }}
                          // animate={{ y: 0 }}
                          // transition={{ type: 'spring', stiffness: 500 }}
                          className="w-full md:flex md:justify-between px-1">
                            <div className="flex items-center justify-center py-1 md:mx-2 md:flex-grow">
                              {/* <label htmlFor="KeywordsID" className="text-sm"><span className="lg:block hidden">Keywords:</span></label> */}
                              <Select
                                id="KeywordsID"
                                placeholder="Select Keywords"
                                options={keywordsOptions}
                                value={selectedKeywords}
                                onChange={handleChangeKeywords}
                                className="text-sm w-full sm:w-[200px] md:flex md:flex-grow"  // Full width on mobile, 200px on larger screens, auto on desktop
                                styles={customStyles}
                                isClearable ={true}
                              />
                            </div>
  
                            <div className="flex items-center justify-center py-1 md:flex-grow">
                              {/* <label htmlFor="University" className="text-sm"><span className="lg:block hidden">University:</span></label> */}
                              <Select
                                id="University"
                                placeholder="Select University"
                                options={universityOptions}
                                value={selectedUniversity}
                                onChange={handleChangeUniversity}
                                className="text-sm w-full sm:w-[200px] md:flex md:flex-grow"  // Full width on mobile, 200px on larger screens, auto on desktop
                                styles={customStyles}
                                isClearable ={true}
                              />
                            </div>
                        </motion.div>
                        )
                      }

                  </div>

                      {              
                        loading && <div><Loader /></div>
                      }

                      {
                        !loading && errorMessage && (
                          <div className='w-[100%] text-center py-20 text-gray-400 font-bold text-lg'>
                            {errorMessage}
                          </div>
                        )
                      }

                      <PublicationList data={publications} university={university} />


                    {
                      publications && publications.length > 100 && (
                        <div className="flex items-center justify-end my-2">
                        {/* Previous Button */}
                        <button
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-l-lg hover:bg-secondary disabled:bg-gray-400"
                        >
                          Prev
                        </button>
  
                        {/* Page Numbers */}
                        <div className="flex space-x-2">
                          {pageNumbers.map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-4 py-2 text-sm font-semibold rounded-lg ${
                                currentPage === page
                                  ? "bg-primary text-white"
                                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </div>
  
                        {/* Next Button */}
                        <button
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-r-lg hover:bg-secondary disabled:bg-gray-400"
                        >
                          Next
                        </button>
                      </div>
                      )

                    }

                </div> 

                
                           
              </div>

          )
        }
        </div>
      </div>
    </div>
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






export default Publications;