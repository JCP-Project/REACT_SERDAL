




import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useRef, useState } from "react";
import {Loader2} from "../../../common/Loader/Loader2";
import Select, { StylesConfig } from 'react-select';
import { motion } from 'framer-motion';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";


import { QuickResponseData } from "../Resources/QuickResponse/QuickResponseData";
import quickResponseData from "../Resources/QuickResponse/QuickResponseData";

import QuickResponseList from "./QuickResponseList";
import SlidingTitleHeader from "../components/slidingTitleHeader";



function QuickResponse()
{
      const apiUrl = import.meta.env.VITE_API_URL;

    const [responseData, setResponseData] = useState<QuickResponseData[]>(quickResponseData);


    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<QuickResponseData[]>([]);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchContainerRef = useRef<HTMLDivElement>(null);



    const [selectedOption, setSelectedOption] = useState<any>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);  // Current page
    const [totalCount, setTotalCount] = useState(0); // Total number of records
    const pageSize = 10;  // Number of publications per page
    const totalPages = Math.ceil(totalCount / pageSize); // Calculate total pages


    
    const generatePageNumbers = () => {
      
      let startPage = Math.max(1, currentPage - Math.floor(pageSize / 2));
      let endPage = Math.min(totalPages, startPage + pageSize - 1);

        if (endPage - startPage + 1 < pageSize) {
          startPage = Math.max(1, endPage - pageSize + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    };

    const pageNumbers = generatePageNumbers();

   const optionSort = [
    { label: 'Title (A-Z)', value: 'Title_ASC' },
    { label: 'Title (Z-A)', value: 'Title_DESC' },
    { label: 'Most Recent', value: 'PublicationDate_MostRecent' },
    { label: 'Oldest First', value: 'PublicationDate_OldestFirst' },
  ];



const handleSort = (selected: any) => {
  setSelectedOption(selected);

  if (!selected) {
    setResponseData(quickResponseData);
    return;
  }

    let sortedData = [...responseData];

  switch (selected.value) {
    case 'Title_ASC':
      sortedData.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case 'Title_DESC':
      sortedData.sort((a, b) => b.title.localeCompare(a.title));
      break;

    case 'PublicationDate_MostRecent':
      sortedData.sort((a, b) => b.year - a.year);
      break;

    case 'PublicationDate_OldestFirst':
      sortedData.sort((a, b) => a.year - b.year);
      break;

    default:
      break;
  }

  setResponseData(sortedData);
};

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);

      if (value.trim() === "") {
        // If input is cleared, reset suggestions and show all data
        setSuggestions([]);
        setResponseData(quickResponseData); // or your original data array
      } else {
        // Otherwise, filter suggestions
        const filteredSuggestions = quickResponseData.filter(
          (item) =>
            item.title.toLowerCase().includes(value.toLowerCase()) ||
            item.Keywords.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      }
    };

    const updateSuggestions = (term: string) => {
    if (!term) {
      setSuggestions([]);
      return;
    }

        const filteredSuggestions = quickResponseData.filter(
      (item) =>
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.Keywords.toLowerCase().includes(term.toLowerCase())
    );

    setSuggestions(filteredSuggestions.slice(0, 5)); // show top 5 suggestions
  };

    const handleSuggestionClick = (id: number, title: string) => {
    setSearchTerm(title);
    setSuggestions([]);
    performSearch(title);
  };


    const performSearch = (term: string) => {
    const filtered = responseData.filter(
      (item) =>
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.Keywords.toLowerCase().includes(term.toLowerCase())
    );
    setResponseData(filtered);
  };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performSearch(searchTerm);
      setSuggestions([]);
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


  const handleSearchButton = () => {
    performSearch(searchTerm);
    setSuggestions([]);
  };


  

//#endregion


    return(
    <div className="bg-white lg:min-h-[90vh]">
      {SlidingTitleHeader("Quick Response")}

      <div className="px-0 lg:px-40 ">
        <div className="flex items-center justify-center">
        {
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
                            <button onClick={handleSearchButton}>Search</button>
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
                          value={selectedOption}
                          onChange={handleSort}
                          options={optionSort}
                          styles={customStyles}
                          isClearable ={true}
                          className="text-sm w-full md:w-auto"
                        />
                      </div>


                  </div>

                      {              
                        loading ? (<div><LoaderInline /></div>):
                        (
                            <QuickResponseList data={responseData}/>
                        )
                      }

                      {
                        !loading && errorMessage && (
                          <div className='w-[100%] text-center py-20 text-gray-400 font-bold text-lg'>
                            {errorMessage}
                          </div>
                        )
                      }


                      


                    {
                      responseData && totalCount > pageSize && (
                        <div className="flex items-center justify-end my-2">
                        {/* Previous Button */}
                        <button
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="mx-3 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-l-lg hover:bg-secondary disabled:bg-gray-400"
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
                          className="mx-3 px-4 py-2 text-sm font-semibold text-white bg-primary rounded-r-lg hover:bg-secondary disabled:bg-gray-400"
                        >
                          Next
                        </button>
                      </div>
                      )

                    }

                </div> 

                
                           
              </div>
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
    border: "2px solid #2591DE", 
    boxShadow: 'none',
    minWidth: '200px',
    width: '100%', 
    '&:hover': {
      borderColor: "#2591DE",
    },
    '&:focus': {
      borderColor: "#2591DE",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '.8rem',
    backgroundColor: state.isSelected ? "#2591DE" : 'transparent',
    color: state.isSelected ? '#fff' : '#000', 
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: "#2591DE", 
      color: '#fff',
    },
  }),
};






export default QuickResponse;