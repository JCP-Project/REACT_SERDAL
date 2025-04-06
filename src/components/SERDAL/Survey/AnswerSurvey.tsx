import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

type AnswerType = 'short text' | 'long text' | "Radio" | 'checkbox' | 'Number';

interface FormField {
  id: number;
  index: number
  question: string;
  Answer: string | string[];
  answerOptions: string[];
  selectedType: string;
  required: boolean;
}

interface FormSurvey {
    id: number;
    title: string;
    description:string;
    fields: FormField[];

}

const AnswerSurvey = () => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const { answerpage } = useParams(); 

  // Manage local state for form fields
  const [formSurvey, setFormSurvey] = useState<FormSurvey>();
  const [form, setForm] = useState<FormField[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const adminStatus = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    console.log("TEST");
  
    const fetchAndSetData = async () => {
      const data = await fetchData(Number(answerpage));
      if (data && Array.isArray(data.fields)) {
        console.log("Fetched data from API:", data);
  
        // Update form only after data is fetched
        setForm(
          data.fields.map((field) => ({
            ...field,
            Answer: field.selectedType === 'Checkbox' ? [] : '',
          }))
        );
      }
    };
  
    fetchAndSetData();
  }, [answerpage]); // ✅ Runs when `answerpage` changes
  
  useEffect(() => {
    console.log("Updated form:", form);
  }, [form]); // ✅ Logs only after `form` updates
  
  const fetchData = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}/api/Survey/GetAnswerSheet/${id}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Error fetching publication data");
      }
  
      const jsonData: FormSurvey = await response.json();
      setFormSurvey(jsonData);

      console.log("Fetched Data:", jsonData);
      return jsonData; // ✅ Return data instead of setting state directly
    } catch (error) {
      console.error("Error fetching publication data:", error);
      return null;
    }
  };
  
  



  const handleOptionChange = (ID: number, option: string, type: "Radio" | 'Checkbox') => {
    setForm((prev) =>
      prev.map((field) => {
        if (field.index === ID) {
          const updatedField = { ...field };
          if (updatedField.selectedType === type) {
            if (type === "Radio") {
              updatedField.Answer = option;
            } else if (type === 'Checkbox') {
              const answerArray = Array.isArray(updatedField.Answer) ? updatedField.Answer : [];
              if (answerArray.includes(option)) {
                updatedField.Answer = answerArray.filter((item) => item !== option);
              } else {
                updatedField.Answer = [...answerArray, option];
              }
            }
          }
          return updatedField;
        }
        return field;
      })
    );
  };

  const handleSubmit = () => {
    // Check for required fields that are not filled in
    const newErrorMessages: string[] = [];
    form.forEach((field) => {
      if (field.required && (field.Answer === '' || (Array.isArray(field.Answer) && field.Answer.length === 0))) {
        newErrorMessages.push(`Please fill out the required field: ${field.question}`);
      }
    });

    if (newErrorMessages.length > 0) {
      setErrorMessages(newErrorMessages);
    } else {
      // Proceed with form submission if no errors
      console.log("Form Submitted", form);
      setErrorMessages([]); // Clear error messages on successful submit
    }
  };

  const renderField = (field: FormField) => {
    switch (field.selectedType) {
      case 'Short Text':
        return (
          <div>
            <label className="block text-md font-medium text-gray-800">
              {field.question}
              {field.required && <span className="text-red ml-1 font-bold">*</span>}
            </label>
            <input
              type="text"
              placeholder={field.question}
              value={field.Answer}
              onChange={(e) => {
                const newForm = [...form];
                newForm.find((f) => f.index === field.index)!.Answer = e.target.value;
                setForm(newForm);
              }}
              className="mt-4 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none focus:ring-0"
            />
          </div>
        );
      case 'Long Text':
        return (
          <div>
            <label className="block text-md font-medium text-gray-800">
              {field.question}
              {field.required && <span className="text-red ml-1 font-bold">*</span>}
            </label>

           <textarea
            placeholder={field.question}
            rows={1} // Start with minimal height
            value={field.Answer}
            onChange={(e) => {
                const newForm = [...form];
                newForm.find((f) => f.index === field.index)!.Answer = e.target.value;
                setForm(newForm);
                e.target.style.height = "auto"; // Reset height to recalculate
                e.target.style.height = `${e.target.scrollHeight}px`; // Expand based on content
            }}
            className="w-full border-b-2 border-gray-300 bg-transparent py-1 focus:border-primary focus:outline-none focus:ring-0 resize-none overflow-hidden mt-5"
            />
          </div>
        );
      case 'Number':
        return (
          <div key={field.index} className="mt-4">
            <label className="block text-md font-medium text-gray-800">
              {field.question}
              {field.required && <span className="text-red ml-1 font-bold">*</span>}
            </label>
            <input
              type="number"
              placeholder={field.question}
              value={field.Answer}
              onChange={(e) => {
                const newForm = [...form];
                newForm.find((f) => f.index === field.index)!.Answer = e.target.value;
                setForm(newForm);
              }}
              className="mt-4 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none"
            />
          </div>
        );
      case "Radio":
        return (
          <div>
            <label className="block text-md font-medium text-gray-800">
              {field.question}
              {field.required && <span className="text-red ml-1 font-bold">*</span>}
            </label>
            {field.answerOptions.map((option, index) => (
                <div key={index} className="flex items-center mt-2">
                    <label htmlFor={`option-${field.index}-${index}`} className="flex items-center cursor-pointer">
                        <input
                        type="radio"
                        id={`option-${field.index}-${index}`}
                        name={field.index.toString()}
                        value={option}
                        onChange={() => handleOptionChange(field.index, option, "Radio")}
                        className="peer hidden"
                        />
                        <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-secondary peer-checked:bg-primary">
                        <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                        </div>
                        <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                </div>

            ))}
          </div>
        );
      case "Checkbox":
        return (
          <div>
            <label className="block text-md font-medium text-gray-800">
              {field.question}
              {field.required && <span className="text-red ml-1 font-bold">*</span>}
            </label>
            {field.answerOptions.map((option, index) => (
                <div key={index} className="flex items-center mt-2">
                    <label htmlFor={`option-${field.index}-${index}`} className="flex items-center cursor-pointer">
                        <input
                        type="checkbox"
                        id={`option-${field.index}-${index}`}
                        name={field.index.toString()}
                        value={option}
                        checked={Array.isArray(field.Answer) && field.Answer.includes(option)}
                        onChange={() => handleOptionChange(field.index, option, "Checkbox")}
                        className="peer hidden"
                        />
                        <div className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center 
                                        peer-checked:border-secondary peer-checked:bg-primary">
                        <div className="w-3 h-3 bg-white rounded-sm opacity-0 peer-checked:opacity-100"></div>
                        </div>
                        <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <>
      <div>
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

        <div className="px-3 lg:px-40 bg-white">
            <div className="relative max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg my-2  overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-3 bg-secondary"></div>
                <label className="block text-2xl font-medium text-gray-800 py-5">{formSurvey?.title}</label>
                <p>{formSurvey?.description}</p>
            </div>
            
            {form.length > 0 ? (
                    form.map((field) => (
                    <div  key={field.index} className="relative max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg my-2  overflow-hidden">
                        <div key={field.index} className="py-3">
                        
                            {renderField(field)}
                        </div>
                    </div>
                    ))
                ) : (
                    <p>Loading form data...</p>
                )}


            {/* Show error messages */}
            {errorMessages.length > 0 && (
                <div className="relative max-w-3xl mx-auto bg-white overflow-hidden flex justify-start pb-10 mt-4 text-red-600">
                <ul>
                    {errorMessages.map((msg, index) => (
                    <li key={index}>- {msg}</li>
                    ))}
                </ul>
                </div>
            )}
        
            <div className="relative max-w-3xl mx-auto bg-white overflow-hidden flex justify-end pb-10">

                <button
                    onClick={handleSubmit}
                    className="bg-red-400 text-white py-2 px-4 rounded-sm text-sm hover:bg-red-500  focus:outline-none focus:ring-2 focus:ring-red mx-2"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    className="bg-primary text-white py-2 px-4 rounded-sm text-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    Save
                </button>
            </div>

        </div>





        </div>
      </div>
    </>
  );
};

export default AnswerSurvey;