import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";


interface DatasetListProps {
  dataSets: DatasetGroup[];
  fetchDataSets: () => void;  // Add fetchDataSets as a prop
}

interface DatasetGroup {
  id: number;
  categoryName: string;
  dataset : DataSets[]
}


interface DataSets {
  id: number;
  title: string;
  img: string;
 // dataGroup: DataGroup[];
}

// interface DataGroup {
//   production: string;  // ✅ Correct key
//   description: string;
//   dataYear: string[];
//   series: Series[];
// }

interface Series {
  name: string;
  data: number[];
}

interface UpdateStatus{
  Id: number;
  status: number;
  ModifiedBy: number;
  isDeleted: number;
}




const DatasetPageList: React.FC<DatasetListProps> = ({ dataSets, fetchDataSets }) => {
  
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("APIToken");
  const adminStatus = localStorage.getItem('isAdmin') === 'true';

  const handleDelete = (id: number, title: string) => {

      
      const swalWithTailwindButtons = Swal.mixin({
        customClass: {
          confirmButton: "bg-primary text-white py-2 px-4 rounded-md focus:outline-none m-2", 
          cancelButton: "bg-gray-500 text-white py-2 px-4 rounded-md focus:outline-none m-2",
        },
        buttonsStyling: false,
      });
    
      swalWithTailwindButtons
        .fire({
          title: "Are you sure?",
          text: `You want to Delete "${title}" Dataset`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            // Trigger the API call
            ConfirmDelete(id, title);
          }
        });
    };



    //update Confirm Delete
    const ConfirmDelete = async (id: number, title: string) => {

      const userId = Number(localStorage.getItem('id'));
  
      try {
        const response = await fetch(`${apiUrl}/api/Dataset/Delete/${id}?ModifiedBy=${userId}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
    
        if (response.ok) {   

          const swalWithTailwindButtons = Swal.mixin({
            customClass: {
              confirmButton: "bg-primary text-white py-2 px-4 rounded-md focus:outline-none",
              cancelButton: "bg-gray-500 text-white py-2 px-4 rounded-md  focus:outline-none",
            },
            buttonsStyling: false,
          });
    
          swalWithTailwindButtons.fire({
            title: "Success",
            text: `${title} deleted successfully`,
            icon: "success",
          });

          fetchDataSets();

        } else {
          const errorResponse = await response.json();
          console.error("Error message", errorResponse.message || "Unknown error");
    
          const swalWithTailwindButtons = Swal.mixin({
            customClass: {
              confirmButton: "bg-green-500 text-white py-2 px-4 rounded-md focus:outline-none",
              cancelButton: "bg-gray-500 text-white py-2 px-4 rounded-md focus:outline-none", 
            },
            buttonsStyling: false,
          });
    
          swalWithTailwindButtons.fire({
            title: "Failed to Delete!",
            text: errorResponse.message || "An error occurred while Deleting.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error Deleting data:", error);
    
        const swalWithTailwindButtons = Swal.mixin({
          customClass: {
            confirmButton: "bg-green-500 text-white py-2 px-4 rounded-md focus:outline-none",
            cancelButton: "bg-gray-500 text-white py-2 px-4 rounded-md focus:outline-none",
          },
          buttonsStyling: false,
        });
    
        swalWithTailwindButtons.fire({
          title: "Network Error!",
          text: "There was an issue connecting to the server.",
          icon: "error",
        });
      } finally {

      }
    };
      //#endregion
    // useEffect(() =>{console.log(dataSets);},[])
      

  return (
<>
            <div className="w-full">
                {dataSets.map((data, dataIndex) => (
                    <div key={`dataKey${data.id}${dataIndex}`} id={`Dataset-${data.id}${dataIndex}`} className="mb-10">
                      <div className="relative bg-secondary text-white text-xl font-bold flex">
                        <div className="absolute bg-primary w-2 h-full"></div>
                        <div className="mx-5 my-3">{data.categoryName}</div>
                      </div>

                       <div className="flex flex-wrap justify-center md:flex md:items-center md:justify-start text-lg text-black space-x-8">
                          {  
                           data.dataset.length > 0 ? (data.dataset.map((datarow,datarowIndex) =>(
                              <Link key={`$datarowKey${datarow.id}${datarowIndex}`} id={`$datarowID${datarow.id}${datarowIndex}`}  to={`/datasets/generatechart/${datarow.id}-${encodeURIComponent(datarow.title)}`}>
                              <div  
                                    className="group relative flex flex-col items-center justify-center px-4 py-2 m-3 font-bold hover:text-primary  hover:bg-[#daf1f8]">
                              
                                  <div className="relative flex flex-col items-center justify-center p-5 overflow-hidden ">
                                    <img src={datarow.img}  className="aboslute h-15 transform transition-transform duration-300 group-hover:scale-110" />
                                  </div>
                                  
                                      {
                                          datarow.title
                                      }
                                                  
                            </div>
                            </Link>)
                            )):(
                              <div className="w-full text-center py-10">No Data Available</div>
                            )
                            
                          }
                        </div>
                    </div>
                ))}

            </div>
        </>
  );
}

export default DatasetPageList; // Correct the export statement
