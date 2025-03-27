import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import Swal from 'sweetalert2';


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




const DatasetList: React.FC<DatasetListProps> = ({ dataSets, fetchDataSets }) => {
  
  const apiUrl = import.meta.env.VITE_API_URL;
  const adminStatus = sessionStorage.getItem('isAdmin') === 'true';

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

      const userId = Number(sessionStorage.getItem('id'));
  
      try {
        const response = await fetch(`${apiUrl}/api/Dataset/Delete/${id}?ModifiedBy=${userId}`, {
          method: "POST",
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


  return (
<>
            <div className="w-full">
                {dataSets.map((data, dataIndex) => (
                    <div key={`dataKey${data.id}${dataIndex}`} id={`Dataset-${data.id}${dataIndex}`} className="mb-10">
                      <div className="bg-primary p-2 text-white text-xl font-bold">
                        {data.categoryName}
                      </div>

                        {
                          data.dataset.map((datarow,datarowIndex) =>(
                            <div key={`$datarowKey${datarow.id}${datarowIndex}`} id={`$datarowID${datarow.id}${datarowIndex}`} 
                                  className="relative flex items-center px-4 py-2  border-b border-gray-300">
                              <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                              <h5 className="text-sm font-bold uppercase text-primary text-left">
                                
                              <Link  to={`/datasets/generatechart/${datarow.id}`}>
                                  {
                                      datarow.title
                                  }
                              </Link>

                              <div className={`absolute bottom-5 right-2 ${adminStatus ? 'block' : 'hidden'}`}>
                                <button onClick={() => handleDelete(datarow.id, datarow.title)}>
                                  <FaTrashCan 
                                        color="#D32F2F" 
                                        className="hover:scale-110 hover:rotate-6 transition-transform duration-200" 
                                  />
                                </button>
                              </div>
                              
                            </h5>
                          </div>
                          ))
                        }

                        {/* <ul className="list-disc list-inside space-y-2 text-gray-800">
                            {data.dataGroup.map((datagroup, index) => (
                              <li
                                key={index}
                                className=""
                              >
                                <span className="text-sm text-primary-600">
                                  {datagroup.production}
                                </span>
                              </li>
                            ))}
                        </ul> */}



                    </div>
                ))}

            </div>
        </>
  );
}

export default DatasetList; // Correct the export statement
