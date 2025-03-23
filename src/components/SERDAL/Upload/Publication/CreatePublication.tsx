import React, { useState,useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Select, { StylesConfig } from 'react-select';
import { motion } from 'framer-motion';

interface Institution {
  id: number;
  value: string;
  label: string;
  isDeleted: number;
}


function CreatePublication() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [institution, setInstitution] = useState<Institution[]>([]);

  const navigate = useNavigate();
  const [imgError, setImgError] = useState("");
  const [pdfError, setPdfError] = useState("");
  const [ErrorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedOption, setSelectedOption] = useState<any>(null);

  const [fileName, setFileName] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    citation: "",
    journal: "",
    title: "",
    author: "",
    abstract: "",
    CreatedBy: 0, 
    keywords: "",
    pdfLink: "",
    publicationDate: Date.now.toString(),
    Img: null as File | null,
    file: null as File | null,
  });


  useEffect(() => {    
    fetchInstitution();
  }, []);


  const handleChangeInstitution = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      institution: selectedOption ? selectedOption.value : "",
    }));
  };

  const fetchInstitution = async () => {

    try {
         const response = await fetch(`${apiUrl}/api/Institution/GetAllInstitution`, {
            method: "GET",
            });

          if (response.ok) {
              const jsonData: Institution[] = await response.json();
              setInstitution(jsonData);
          } else {
              const errorResponse = await response.json();
              console.error("Error message", errorResponse.message || "Unknown error");
              setErrorMessage(errorResponse.message);
          }
          } catch (error) {
              console.error("Error fetching publication data:", error);
              setErrorMessage("Error fetching publication data");
          } finally {

            }
  };

  const InstitutionOptions = institution.map((ins) => ({
    value: ins.id,
    label: ins.label,
  }));



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage("");

      if (isSubmitting)
      {
        console.log("disabled", isSubmitting);
        return;
      } 
      setIsSubmitting(true);

      const data = new FormData();
      data.append("citation", formData.citation);
      data.append("journal", formData.journal);
      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("summary", formData.abstract);
      data.append("pdflink", formData.pdfLink);
      data.append("keywords", formData.keywords);
      data.append("publicationDate", formData.publicationDate);
      data.append("publication_Institutions", selectedOption.map(option => option.value));

     console.log("good", new Date().toLocaleString('en-CA'));

    const id = sessionStorage.getItem('id');
      if (id) {
        data.append("CreatedBy", id);
      }

      const university = sessionStorage.getItem('university');
      if (university) {
        data.append("university", university);

      }

      console.log("test", data);



    
      if (formData.file) {
        data.append("file", formData.file);
      } else {
        // Check if pdfLink is empty, null, or undefined
        if (!formData.pdfLink) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please upload a PDF or provide a PDF link.',
          });
          setIsSubmitting(false);
          return;
        }
      }
      
      console.log(data);
    try {
      const response = await fetch(`${apiUrl}/api/Publication/Create`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        console.log("Form data submitted successfully!");
          setFormData({
            citation: "",
            journal: "",
            title: "",
            author: "",
            abstract: "",
            CreatedBy: 0,
            keywords: "",
            pdfLink: "",
            publicationDate: Date.now.toString(),
            Img: null,
            file: null,
          });

          Swal.fire({
            title: 'Success!',
            text: 'Your publication was created successfully.',
            icon: 'success',
            confirmButtonText: 'Okay',
            confirmButtonColor: '#17C0CC',
          }).then(() => {
            navigate('/UploadPublication');
            window.location.reload();
          });;

          const fileInput = document.getElementById("file") as HTMLInputElement;
          const imgInput = document.getElementById("img") as HTMLInputElement;
          if (fileInput) fileInput.value = "";
          if (imgInput) imgInput.value = "";
        } else {
        console.error("Error submitting form.");
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'Something went wrong while submitting your publication. Please try again.',
          confirmButtonColor: '#17C0CC',
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'Something went wrong while submitting your publication. Please try again.',
        confirmButtonColor: '#17C0CC',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const fileType = e.target.id;
    console.log("File",fileType);

    if (file) {
      if (fileType === "file") {
        if (file.type !== "application/pdf") {
          Swal.fire({
            icon: 'error',
            title: 'Invalid PDF',
            text: 'Please select a valid PDF file.',
            confirmButtonColor: '#17C0CC',
          });

        } else {
          setPdfError(""); // Clear PDF error if valid
          setFormData((prev) => ({ ...prev, file }));
          setFileName(file.name);
        }
        
      }
    
      if (fileType === "img") {
        if (!file.type.startsWith("image/")) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Image',
            text: 'Please select a valid image file.',
            confirmButtonColor: '#17C0CC',
          });
        } else {
          setImgError("");
          setFormData((prev) => ({ ...prev, Img: file }));
        }
      }
    }
    



  };

  const errorAlert = (msg:string) => {
    Swal.fire({
      title: 'Error!',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Retry',
      confirmButtonColor: '#17C0CC',
    });
  };

  const todayDate = new Date().toLocaleDateString('en-CA');

  const getLocalDateTime = (): string => {
    const date = new Date();
    
    const localDate = date.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
    const localTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Format: HH:mm:ss
    
    return `${localDate} ${localTime}`;
  };

  return (
    <>
      <div className="bg-white ">
      <div className="bg-primary text-left py-5 pl-3 lg:px-40">
              <h1 className="text-2xl font-bold text-white">Publication</h1>
              <div className="flex">
                <div><Link to="/UploadPublication"><h1 className="text-lg font-bold text-white">Request &gt;</h1></Link></div>
                <motion.div
                  initial={{ x: -400 }} // Start from the left (off-screen)
                  animate={{ x: 0 }}     // End at position x = 0 (default position)
                  transition={{ type: 'spring', stiffness: 100}} // Smooth transition
                >
                          <div><h5 className="text-lg font-bold text-white ml-1">  Upload</h5></div>
                </motion.div>
                
              </div>              
      </div>

        <form className="max-w-3xl mx-3 lg:mx-auto my-2 text-lg" onSubmit={handleSubmit}>
          <div>

          <div className="my-5">
              <input
                required
                type="text"
                id="citation"
                name="citation"
                placeholder="Citation"
                value={formData.citation}
                onChange={handleInputChange}
                className="mt-4 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none"
              />
          </div>

          <div className="my-5">
              <input
                required
                type="text"
                id="journal"
                name="journal"
                placeholder="Journal"
                value={formData.journal}
                onChange={handleInputChange}
                className="mt-4 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none"
              />
          </div>

            <div className="my-5">
                <input
                  required
                  type="text"
                  placeholder="Publication Title"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-4 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none"
                />
            </div>

            <div className="my-5">
              <input
                required
                type="text"
                id="author"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleInputChange}
                className="mt-4 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none"
              />
            </div>

            <div className="my-5">
              <input
                type="date"
                id="publicationDate"
                name="publicationDate"
                value={formData.publicationDate} // You can bind this to your form data if needed
                onChange={handleInputChange} // Update form data when the date is changed
                max={todayDate} // Restrict the date selection to today or earlier
                className="mt-4 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none"
              />
            </div>

          <div className="mt-10">
            <div className="relative">
                <Select
                    id="Institution"
                    placeholder = "Select Institution"                                      
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e)}
                    options={InstitutionOptions}
                    styles={customStyles}
                    name="Institution"
                    className="!text-lg"
                    isMulti
                    required
                    />
            </div>
          </div>

          <div className="my-5">
              <input
                required
                type="text"
                id="keywords"
                name="keywords"
                placeholder="Keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                className="mt-4 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none"
              />
          </div>

            <div className="my-10">
              <textarea
                rows={5}
                placeholder="Abstract"
                id="abstract"
                name="abstract"
                value={formData.abstract}
                onChange={handleInputChange}
                className="w-full rounded-md border-2 border-gray-300 bg-transparent py-1 px-2 focus:border-primary focus:outline-none focus:ring-0 "
                required
              ></textarea>
            </div>
          </div>

          <div>

             <div className="my-5">
              <input
                type="text"
                id="pdfLink"
                name="pdfLink"
                placeholder="PDF Link (Optional)"
                value={formData.pdfLink}
                onChange={handleInputChange}
                className="mt-4 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none"
              />
            </div>

            <div>
            <div className="flex flex-col mb-6 mt-10">
            <label className="block text-lg ml-2">PDF File</label>
                <label
                  htmlFor="file"
                  className="w-full cursor-pointer rounded-lg border-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none 
                          flex justify-center items-center text-gray-700 bg-transparent border-2 border-gray-300 rounded-md text-lg font-medium hover:bg-primary hover:text-white"
                >
                  {/* Custom placeholder text */}
                  {!fileName && (
                    <span className="text-gray-500">Choose PDF file</span>
                  )}

                  {/* Display file name after selection */}
                  {fileName && (
                    <span className="text-gray-600">{fileName}</span>
                  )}

                  {/* File input is hidden, triggered by the label */}
                  <input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden" // Hide the default file input
                  />
                </label>

                {/* Display error message */}
                {pdfError && (
                  <p className="text-red-500 text-lg mt-[-10px]">{pdfError}</p>
                )}
              </div>

            </div>

            {/* <div>
              <label className="block text-lgml-2">Image</label>
              <div className="flex flex-col gap-5.5 mb-6">
                <input
                  id="img"
                  type="file"
                  onChange={handleFileChange}
                  className="w-full cursor-pointer rounded-lg border-[2px] border-stroke bg-transparent outline-none transition 
                            file:mr-2 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke 
                            file:bg-whiter file:py-0 file:px-2 file:hover:bg-primary 
                            file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white"
                />
                  {imgError && (
                    <p className="text-red-500 text-lgmt-[-10px]">{imgError}</p>
                  )}
              </div>  
            </div> */}
          

            
            
            {
            ErrorMessage && 
            <div className="text-red text-lgtext-left">Error: {ErrorMessage}</div>
            }
          </div>

          <div className="flex items-center justify-end">
            <button type="button" disabled={isSubmitting} className="flex items-center gap-3 bg-red-600 text-white px-4 py-1.5 rounded-md hover:bg-red-700 mx-2">
              <span>Cancel</span>
            </button>
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-3 bg-primary text-white px-4 py-1.5 rounded-md hover:bg-secondary mx-2">
              <span>Submit</span>
            </button>
          </div>
        </form>
      </div>

    </>
  );
}


const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    fontSize: '1rem',
    borderWidth: '2px',
    borderColor: "6B7280",
    boxShadow: state.isFocused ? '0 0 0 0px #17C0CC' : 'none',
    '&:hover': {
      borderColor: "6B7280",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '1rem',
    backgroundColor: state.isSelected ? "#17C0CC" : 'transparent',
    color: state.isSelected ? '#fff' : '#000',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: "#17C0CC", // Keep hover effect consistent
      color: '#fff',
    },
  }),
};


export default CreatePublication;
