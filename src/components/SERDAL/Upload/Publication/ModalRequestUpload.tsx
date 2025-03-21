import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { faClose, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Define prop types for ModalRequest
interface ModalRequestProps {
  open: boolean;
  handleOpen: () => void;
  showMessage: () => void;
}

interface FormData {
  title: string;
  author: string;
  description: string;
  CreatedBy: number;
  Category: string;
  pdfLink: string;
  Img: File | null;
  file: File | null;
}




function closeModal(setFormData: Dispatch<SetStateAction<FormData>>) {
  setFormData({
    title: "",
    author: "",
    description: "",
    CreatedBy: 0,
    Category: "",
    pdfLink: "",
    Img: null,
    file: null,
  });
}
const ModalRequest = ({ open, handleOpen, showMessage  }: ModalRequestProps) => {

  const [imgError, setImgError] = useState("");
  const [pdfError, setPdfError] = useState("");
  const [uploadError, setuploadError] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    description: "",
    CreatedBy: 0,
    Category: "",
    pdfLink: "",
    Img: null as File | null,
    file: null as File | null,
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (imgError) {
        alert("Please fix the file error before submitting.");
        return;
      }

      if (pdfError) {
        alert("Please fix the file error before submitting.");
        return;
      }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("description", formData.description);
    data.append("Category", formData.Category);
    data.append("pdflink", formData.pdfLink);
    data.append("isDeleted", "0");

    const id = sessionStorage.getItem('id');
      if (id) {
        data.append("CreatedBy", id);
      }
    
    if (formData.file) {
      data.append("file", formData.file);
    }

    if (formData.Img) {
      data.append("img", formData.Img);
    }

    console.log(data);

    try {
      const response = await fetch("https://localhost:7242/api/Publication", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        console.log("Form data submitted successfully!");

          setImgError("");
          setPdfError("");

          const fileInput = document.getElementById("file") as HTMLInputElement;
          const imgInput = document.getElementById("img") as HTMLInputElement;
          if (fileInput) fileInput.value = "";
          if (imgInput) imgInput.value = "";

          showMessage();
          handleCloseModal();

        } else {
        console.error("Error submitting form.");
        setuploadError(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setuploadError(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const fileType = e.target.id;
    console.log("File",fileType);

    if (file) {
      if (fileType === "file") {
        if (file.type !== "application/pdf") {
          setPdfError("Please select a valid PDF file.");
        } else {
          setPdfError(""); // Clear PDF error if valid
          setFormData((prev) => ({ ...prev, file }));
        }
      }

      if (fileType === "img") {
        if (!file.type.startsWith("image/")) {
          setImgError("Please select a valid image file.");
        } else {
          setImgError("");
          setFormData((prev) => ({ ...prev, Img: file }));
        }
      }

    }
  };

  const handleCloseModal = () => {
    setuploadError(false);
    closeModal(setFormData); // Reset form data
    handleOpen(); // Close the modal
  };


  return (
    <Dialog open={open} handler={handleOpen} size="lg" className="mx-auto w-full w-screen max-w-[45rem]">
      <DialogHeader className="relative flex flex-col bg-primary text-white">
        <h3 className="text-2xl">Create Publication</h3>
      </DialogHeader>
          <div className={uploadError ? "block" : "hidden"}>
          <div className=" w-full flex items-center justify-center border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-7 py-2 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-2">
              <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
              <FontAwesomeIcon icon={faClose} className="text-white font-bold"/>
              </div>
              <div className="flex text-center">
                <h5 className="text-md font-semibold text-black dark:text-[#34D399] ">
                  Error on publication request submission
                </h5>
              </div>
            </div>
            </div>
      <DialogBody className="flex flex-col gap-4 h-[80vh]">
        <div className="h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded">
          <form className="max-w-xl mx-auto my-2" onSubmit={handleSubmit}>

          <div>
            {/* <h3 className="font-bold mb-5">Details</h3> */}

            <div className="my-5">
              <label className="block text-sm ml-2">Title</label>
              <input
                required
                type="text"
                placeholder="Publication Title"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="text-sm w-full rounded-lg border-[2px] border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary"
              />
            </div>

            <div className="my-5">
              <label className="block text-sm ml-2">Author</label>
              <input
                required
                type="text"
                id="author"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleInputChange}
                className="text-sm w-full rounded-lg border-[2px] border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary"
              />
            </div>

            <div className="my-5">
              <label className="block text-sm ml-2">Summary</label>
              <textarea
                rows={6}
                placeholder="Summary"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="text-sm w-full rounded-lg border-[2px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>

            <div className="my-5">
              <label className="block text-sm ml-2">Keywords</label>
              <input
                required
                type="text"
                id="Category"
                name="Category"
                placeholder="Keywords"
                value={formData.Category}
                onChange={handleInputChange}
                className="text-sm w-full rounded-lg border-[2px] border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary"
              />
            </div>           

          </div>

          <div>

            <div>
              <label className="block text-sm ml-2">Image</label>
              <div className="flex flex-col gap-5.5 mb-6">
                <input
                  id="img"
                  required
                  type="file"
                  onChange={handleFileChange}
                  className="w-full cursor-pointer rounded-lg border-[2px] border-stroke bg-transparent outline-none transition 
                            file:mr-2 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke 
                            file:bg-whiter file:py-0 file:px-2 file:hover:bg-primary 
                            file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white"
                />
                  {imgError && (
                    <p className="text-red-500 text-sm mt-[-10px]">{imgError}</p>
                  )}
              </div>  
            </div>
            
            <div>
              <label className="block text-sm ml-2">PDF</label>
              <div className="flex flex-col gap-5.5 mb-6">
                <input
                  id="file"
                  required
                  type="file"
                  onChange={handleFileChange}
                  className="w-full cursor-pointer rounded-lg border-[2px] border-stroke bg-transparent outline-none transition 
                            file:mr-2 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke 
                            file:bg-whiter file:py-0 file:px-2 file:hover:bg-primary 
                            file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white"
                />
                  {pdfError && (
                    <p className="text-red-500 text-sm mt-[-10px]">{pdfError}</p>
                  )}
              </div>
            </div>

            <div className="my-5">
              <label className="block text-sm ml-2">PDF Link</label>
              <input
                type="text"
                id="pdfLink"
                name="pdfLink"
                placeholder="PDF Link (Optional)"
                value={formData.pdfLink}
                onChange={handleInputChange}
                className="text-sm w-full rounded-lg border-[2px] border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary"
              />
            </div>



          


          </div>

            <DialogFooter className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="flex items-center gap-3 bg-red-600 text-white px-4 py-1.5 rounded-md hover:bg-red-700"
              >
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="flex items-center gap-3 bg-primary text-white px-4 py-1.5 rounded-md hover:bg-secondary"
              >
                <span>Submit</span>
              </button>
            </DialogFooter>
          </form>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ModalRequest;
