import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectGroupOrderBy from "../../../Template/Forms/SelectGroup/SelectGroupOrderBy";
import PublicationList from "./PublicationList";
import { useEffect, useState } from "react";

interface ApiData {
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
  isDeleted: number;
}

function Publication() {
  const [publications, setPublications] = useState<ApiData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [displayPublications, setDisplayPublications] = useState<ApiData[]>([]);
  const [filter, setFilter] = useState(""); 
  const [sortBy, setSortBy] = useState<string>(""); // State to hold the sorting criteria
  const [morePage, setmorePage] = useState(false);

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7242/api/Publication/Publication`, {
          method: "GET",
        });
        if (response.ok) {
          const jsonData: ApiData[] = await response.json();
          setPublications(jsonData);
          setDisplayPublications(jsonData.slice(0, itemsPerPage)); 
        } else {
          console.error("Error fetching publication data");
        }
      } catch (error) {
        console.error("Error fetching publication data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value); // Update the search query
  };

  // Handle sorting changes
  const handleSortChange = (sortValue: string) => {
    setSortBy(sortValue); // Update the sort criteria
  };

  const filteredRows = publications
    .filter((row) => {
      return (
        row.title.toLowerCase().includes(filter.toLowerCase()) ||
        row.author.toLowerCase().includes(filter.toLowerCase()) ||
        row.category.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === "ASC") {
        return a.title.localeCompare(b.title); // Sort by title in ascending order
      } else if (sortBy === "DESC") {
        return b.title.localeCompare(a.title); // Sort by title in descending order
      } else {
        return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(); // Default sorting by createdDate
      }
    });

  const totalPages = Math.ceil(publications.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setDisplayPublications(publications.slice((page - 1) * itemsPerPage, page * itemsPerPage));
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-primary text-left py-10 pl-3 lg:px-40 md:px-[15%] xl:px-40 2xl:px-40">
        <h1 className="text-2xl font-bold text-white">Policy Briefs</h1>
      </div>

      <div className="px-5 py-5 md:px-[15%] flex items-center justify-between flex-wrap">
        <div className="w-full md:w-96 xl:w-1/2 relative flex items-center p-1 rounded-lg border-[1.5px] border-primary bg-white">
          <input
            type="text"
            placeholder="Search Article..."
            onChange={handleFilterChange}
            className="placeholder-black-900 text-lg px-5 w-full text-black-900 outline-none transition bg-white"
          />
          <FontAwesomeIcon icon={faSearch} size="lg" className="text-primary" />
        </div>

        <div className="w-full md:w-auto flex items-center justify-center m-2">
          <SelectGroupOrderBy Title="Order by" onSortChange={handleSortChange} />
        </div>
      </div>

      <div className="px-0 md:px-40">
        <div className="flex flex-wrap items-center justify-center">
          {filteredRows.length > 0 ? (
            <PublicationList data={filteredRows} />
          ) : (
            <div className="w-full text-center text-gray-500">Loading publications...</div>
          )}
        </div>

        <div>
          {filteredRows.length > itemsPerPage && (
            <div className="flex justify-center my-5">
              <button
                className={`px-4 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white'}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-4 py-1 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className={`px-4 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white'}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Publication;
