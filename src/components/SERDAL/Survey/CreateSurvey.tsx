import { faAdd, faArrowUp, faCopy, faSortDown, faSortUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';
import { Form } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

//import FormModal from './Modal/FormModal';

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


const CreateSurvey: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState<FormField[]>([
    {
      ID: 1,
      Question: 'Question 1',
      Answer: '',
      AnswerType: ['Short Text', 'Long Text', 'Radio', 'Checkbox', 'Number'],
      SelectedType: 'Short Text',
      Required: false,
      AddOption: '',
    },
  ]);

  const [formTitle, setFormTitle] = useState<string>(''); // New state for form title
  const [formDescription, setFormDescription] = useState<string>('');

  //const [newOption, setNewOption] = useState<string>('');
  const fieldRefs = useRef<{ [key: number]: HTMLDivElement }>({});
  const [focusID, setFocusID] = useState<number | null>(null); // Track the ID to focus on



    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

const focusOnField = (ID: number) => {
  const field = fieldRefs.current[ID];
  if (field) {
    field.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Focus on the "AddOption" input after adding an option
    const addOptionInput = field.querySelector('input[placeholder="Add new option"]');
    if (addOptionInput) {
      addOptionInput.focus();
    }
  }
};
  // Focus on the new field after state update
  useEffect(() => {
    if (focusID !== null) {
      focusOnField(focusID);
      setFocusID(null); // Reset focusID to prevent repeated focus
    }
  }, [focusID]); // Only trigger when focusID changes

  const handleTypeChange = (ID: number, newType: AnswerType) => {
    setFormFields((prev) =>
      prev.map((field) => {
        if (field.ID === ID) {
          let updatedField = { ...field, SelectedType: newType };

          if (newType === 'Radio') {
            updatedField = {
              ...updatedField,
              answerOption: ['Option 1'],
            };
          } else if (newType === 'Checkbox') {
            updatedField = {
              ...updatedField,
              answerOption: ['Option 1'],
            };
          } else {
            updatedField = {
              ...updatedField,
              answerOption: [],
            };
          }

          return updatedField;
        }
        return field;
      })
    );
  };

  const handleQuestionChange = (ID: number, newQuestion: string) => {
    setFormFields((prev) =>
      prev.map((field) =>
        field.ID === ID ? { ...field, Question: newQuestion } : field
      )
    );
  };

    const handleSetOptionChange = (ID: number, optionvalue: string) => {
    setFormFields((prev) =>
      prev.map((field) =>
        field.ID === ID ? { ...field, AddOption: optionvalue } : field
      )
    );
  };

const handleOptionChange = (ID: number, index: number, newOption: string) => {
  setFormFields((prev) =>
    prev.map((field) => {
      if (field.ID === ID) {
        const updatedField = { ...field };
        if (updatedField.SelectedType === 'Radio' || updatedField.SelectedType === 'Checkbox') {
          const updatedOptions = [...(updatedField.answerOption || [])];
          updatedOptions[index] = newOption;
          updatedField.answerOption = updatedOptions;
        }
        return updatedField;
      }
      return field;
    })
  );
};

  const handleAddOption = (ID: number) => {
   // if (newOption.trim() === '') return;

    setFormFields((prev) =>
      prev.map((field) => {
        if (field.ID === ID) {
          const updatedField = { ...field };

          if (!updatedField.AddOption?.trim()) {
            return field;
          }

          if (updatedField.SelectedType === 'Radio' || updatedField.SelectedType === 'Checkbox') {
            const updatedOptions = [...(updatedField.answerOption || [])];
            updatedOptions.push(updatedField.AddOption);
            updatedField.answerOption = updatedOptions;

            updatedField.AddOption = '';

            setFocusID(ID);
          }
          return updatedField;
        }
        return field;
      })
    );

  };

  const handleDeleteOption = (ID: number, index: number) => {
    setFormFields((prev) =>
      prev.map((field) => {
        if (field.ID === ID) {
          const updatedField = { ...field };

          if (updatedField.SelectedType === 'Radio' || updatedField.SelectedType === 'Checkbox') {
            const updatedOptions = [...(updatedField.answerOption || [])];

            if (updatedOptions.length > 1) {
              updatedOptions.splice(index, 1);
              updatedField.answerOption = updatedOptions;
            }
          }
          return updatedField;
        }
        return field;
      })
    );
  };

  const handleDeleteField = (ID: number) => {
    setFormFields((prev) => prev.filter((field) => field.ID !== ID));
  };

const addNewField = (ID: number) => {
  const newID = formFields.length > 0 ? Math.max(...formFields.map(field => field.ID)) + 1 : 1;
  const index = formFields.findIndex((field) => field.ID === ID);

  const fieldToCheck = formFields.find((field) => field.ID === ID);
  if (fieldToCheck?.Question.trim() === '') {
    return; // Don't add a new field if the question is empty
  }

  if (index !== -1) {
    const newField = {
      ID: newID,
      Question: `Question ${newID}`, // Automatically add question number
      AnswerType: ['Short Text', 'Long Text', 'Radio', 'Checkbox', 'Number'],
      SelectedType: 'Short Text',
      Required: false,
    };

    const updatedFields = [
      ...formFields.slice(0, index + 1),
      newField,
      ...formFields.slice(index + 1),
    ];

    setFormFields(updatedFields);
    setFocusID(newID); // Set the ID to focus on
  }
};

const handleDuplicateField = (ID: number) => {
  const fieldToDuplicate = formFields.find((field) => field.ID === ID);
  if (fieldToDuplicate?.Question.trim() === '') {
    return; // Don't duplicate if the question is empty
  }

  const newID = formFields.length > 0 ? Math.max(...formFields.map(field => field.ID)) + 1 : 1;
  const index = formFields.findIndex((field) => field.ID === ID);

  if (index !== -1) {
    const duplicatedField = {
      ...fieldToDuplicate,
      ID: newID,
      Question: `Question ${newID}`, // Automatically add question number
    };

    const updatedFields = [
      ...formFields.slice(0, index + 1),
      duplicatedField,
      ...formFields.slice(index + 1),
    ];

    setFormFields(updatedFields);
    setFocusID(newID); // Set the ID to focus on
  }
};


const handleSave = () => {
  setIsModalOpen(true);
  if (formTitle && formTitle.trim() !== "" && formDescription && formDescription.trim() !== "") {
    CreateSurvey();
  }

}


const CreateSurvey = async () => {
    const formData = {
        title: formTitle, 
        fields: formFields,
        description: formDescription,
      };

      console.log(formData);

    try {
      const response = await fetch(`${apiUrl}/api/Survey/Create`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',  // Sending JSON data
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
       // const jsonData = await response.json();
        
        Swal.fire({
            icon: 'success',
            title: 'Survey Creation Successful!',
            text: 'Survey been created successfully.',
            timer: 3000, // Auto-close after 2 seconds
            showConfirmButton: false, // Hide the confirm button
        }).then(() =>{
           // navigate('/');    

        });
      } else {
        const errorResponse = await response.json();
        console.error( errorResponse.message || 'Unknown error');
        return Swal.fire({
            icon: 'error',
            title: 'Survey Creation Failed',
            text: errorResponse.message || "Unexpected Error",
            confirmButtonColor: '#17C0CC',
        });
      }

    } catch (error) {
      console.error('Error fetching Survey:', error);
      //setErrorMessage('Error fetching publications');
    } finally {
      //loadPublication.current = false;
      //setLoading(false);
    }
  };


 const handleFocus = (ID: number) => {
    setFocusID(ID); // Update focusID when field is clicked or focused
  };

const handleRequiredToggle = (ID: number) => {
  setFormFields((prev) =>
    prev.map((field) =>
      field.ID === ID ? { ...field, Required: !(field.Required ?? false) } : field
    )
  );
};


const handleMoveUp = (ID: number) => {
  const index = formFields.findIndex((field) => field.ID === ID);
  if (index > 0) {
    const updatedFields = [...formFields];
    const [removed] = updatedFields.splice(index, 1);
    updatedFields.splice(index - 1, 0, removed);
    setFormFields(updatedFields);
  }
};

const handleMoveDown = (ID: number) => {
  const index = formFields.findIndex((field) => field.ID === ID);
  if (index < formFields.length - 1) {
    const updatedFields = [...formFields];
    const [removed] = updatedFields.splice(index, 1);
    updatedFields.splice(index + 1, 0, removed);
    setFormFields(updatedFields);
  }
};

  const renderField = (field: FormField) => {
    switch (field.SelectedType) {
      case 'Short Text':
        return (
          <div ref={(el) => (fieldRefs.current[field.ID] = el!)} key={field.ID} className="mt-4">
            <label className="block text-md font-medium text-gray-800">{field.Question}{field.Required && (<span className="text-red ml-1 font-bold">*</span>)}</label>
            <input
              type="text"
              placeholder="Short text"
              className="w-full border-b-2 border-gray-300 bg-transparent py-1 px-2 focus:border-primary focus:outline-none focus:ring-0 "

              disabled
            />
          </div>
        );
      case 'Number':
        return (
          <div ref={(el) => (fieldRefs.current[field.ID] = el!)} key={field.ID} className="mt-4">
            <label className="block text-md font-medium text-gray-800">{field.Question}{field.Required && (<span className="text-red ml-1 font-bold">*</span>)}</label>
            <input
              type="number"
              placeholder="Number"
              className="w-full border-b-2 border-gray-300 bg-transparent py-1 px-2 focus:border-primary focus:outline-none focus:ring-0 "

              disabled
            />
          </div>
        );
      case 'Long Text':
        return (
          <div ref={(el) => (fieldRefs.current[field.ID] = el!)} key={field.ID} className="mt-4">
            <label className="block text-md font-medium text-gray-800">{field.Question}{field.Required && (<span className="text-red ml-1 font-bold">*</span>)}</label>
            <textarea
              placeholder="Enter long text"
              rows={2}
              className="w-full border-b-2 border-gray-300 bg-transparent py-1 px-2 focus:border-primary focus:outline-none focus:ring-0 "

              disabled
            />
          </div>
        );
      case 'Radio':
        const radioField = field as RadioField;
        return (
          <div ref={(el) => (fieldRefs.current[field.ID] = el!)} key={field.ID} className="mt-4">
            <label className="block text-md font-medium text-gray-800">{field.Question}{field.Required && (<span className="text-red ml-1 font-bold">*</span>)}</label>
            {radioField.answerOption && radioField.answerOption.length > 0 ? (
              radioField.answerOption.map((option, index) => (
                <div key={index} className="flex items-center mt-2">
                    {/* Label wraps only the radio button and its custom styling */}
                    <label className="flex items-center cursor-pointer">
                        <input
                        type="radio"
                        name={field.ID.toString()}
                        value={option}
                        className="peer hidden"
                        />
                        <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center 
                                        peer-checked:border-secondary peer-checked:bg-primary">
                        <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                        </div>
                    </label>

                    {/* Text input and delete button remain outside the label */}
                    <div className="flex items-center w-3/4 ml-2">
                        <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(field.ID, index, e.target.value)}
                        className="w-full border-b-2 border-gray-300 bg-transparent py-1 px-2 
                                    focus:border-primary focus:outline-none focus:ring-0"
                        />
                        <button
                        type="button"
                        onClick={() => handleDeleteOption(field.ID, index)}
                        className={`ml-2 ${radioField.answerOption.length === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-red-500 hover:text-red-700'}`}
                        disabled={radioField.answerOption.length === 1}
                        >
                        ×
                        </button>
                    </div>
                </div>

              ))
            ) : (
              <p>No options available</p>
            )}
            <div className="mt-4 flex items-center lg:justify-between">
              <input
                type="text"
                value={field.AddOption}
                onChange={(e) => handleSetOptionChange(field.ID, e.target.value)}
                className="w-full border-b-2 border-gray-300 bg-transparent py-1 px-2 focus:border-primary focus:outline-none focus:ring-0 "
                placeholder="Add new option"
              />
              <button
                type="button"
                onClick={() => handleAddOption(field.ID)}
                className="ml-2 bg-primary text-white py-1 px-2 w-40 rounded-sm flex items-center justify-center"
              >
                Add <span className="hidden md:block ml-1">option</span> 
              </button>
            </div>
          </div>
        );
      case 'Checkbox':
        const checkboxField = field as CheckboxField;
        return (
          <div ref={(el) => (fieldRefs.current[field.ID] = el!)} key={field.ID} className="mt-4">
            <label className="block text-md font-medium text-gray-800">{field.Question}{field.Required && (<span className="text-red ml-1 font-bold">*</span>)}</label>
            {checkboxField.answerOption && checkboxField.answerOption.length > 0 ? (
              checkboxField.answerOption.map((option, index) => (
                <div key={index} className="flex items-center mt-2">
                <label className="flex items-center cursor-pointer">
                    <input
                    type="checkbox"
                    name={field.ID.toString()}
                    value={option}
                    className="peer hidden"
                    />
                    <div className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center 
                                    peer-checked:border-secondary peer-checked:bg-primary">
                    <div className="w-3 h-3 bg-white rounded-sm opacity-0 peer-checked:opacity-100"></div>
                    </div>
                </label>

                {/* Text input and delete button remain separate */}
                <div className="flex items-center w-3/4 ml-2">
                    <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(field.ID, index, e.target.value)}
                    className="w-full border-b-2 border-gray-300 bg-transparent py-1 px-2 
                                focus:border-primary focus:outline-none focus:ring-0"
                    />
                    <button
                    type="button"
                    onClick={() => handleDeleteOption(field.ID, index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                    >
                    ×
                    </button>
                </div>
                </div>

              ))
            ) : (
              <p>No options available</p>
            )}
            <div className="mt-4 flex items-center lg:justify-between">
              <input
                type="text"
                value={field.AddOption}
                onChange={(e) => handleSetOptionChange(field.ID, e.target.value)}
                className="w-full border-b-2 border-gray-300 bg-transparent py-1 px-2 focus:border-primary focus:outline-none focus:ring-0 "
                placeholder="Add new option"
              />
              <button
                type="button"
                onClick={() => handleAddOption(field.ID)}
                className="ml-2 bg-primary text-white py-1 px-2 w-40 rounded-sm flex items-center justify-center"
              >
                Add <span className="hidden md:block ml-1">option</span> 
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="relative max-w-3xl mx-3 lg:mx-auto p-8 bg-white rounded-lg shadow-2xl my-2 z-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-3 bg-primary"></div>
        <div>
            <label className="block text-lg font-medium text-gray-800">Survey Title:</label>
            <input
            type="text"
            placeholder="Enter form title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="mt-4 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none"
            />
        </div>
        <div className="mt-5">
        <textarea
            placeholder="Enter Description"
            rows={1} // Start with minimal height
            value={formDescription}
            onChange={(e) => {
                setFormDescription(e.target.value);
                e.target.style.height = "auto"; // Reset height to recalculate
                e.target.style.height = `${e.target.scrollHeight}px`; // Expand based on content
            }}
            className="w-full border-b-2 border-gray-300 bg-transparent py-1 focus:border-primary focus:outline-none focus:ring-0 resize-none overflow-hidden mt-5"
            />
        </div>
    </div>

      {formFields.map((field) => (
        <div
          ref={(el) => (fieldRefs.current[field.ID] = el!)}
          key={field.ID}
          className="relative max-w-3xl mx-3 lg:mx-auto px-6 py-1 bg-white rounded-lg shadow-2xl my-2 z-50 overflow-hidden group"
        >
        
        <div className="flex flex-col items-center my-2"> 
            <div className="text-gray-400">
                <button
                    id={`moveUpBtn${field.ID}`}
                    onClick={() => handleMoveUp(field.ID)}
                    className=" px-4 h-[15px] rounded-md  disabled:opacity-50"
                    disabled={formFields.findIndex((fieldItem) => fieldItem.ID === field.ID) === 0} // Disable if it's the first field
                >
                    <FontAwesomeIcon icon={faSortUp} />
                </button>
            </div>
        </div>

          <div className="absolute top-0 left-0 w-1 h-full bg-white group-hover:bg-primary"></div>
          <div className="space-y-6">
            
            {/* Answer Type Section */}
            <div className="flex flex-col sm:flex-row justify-between lg:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <label className="font-medium">Answer Type:</label>
                <div className="relative w-full sm:w-3/4">
                    <select
                    value={field.SelectedType}
                    onChange={(e) => handleTypeChange(field.ID, e.target.value as AnswerType)}
                    className="w-full border-b-2 border-gray-300 bg-transparent py-2 px-1 
                                focus:border-primary focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                    >
                    {field.AnswerType.map((type) => (
                        <option 
                        key={type} 
                        value={type} 
                        className="text-black bg-white hover:bg-primary focus:bg-primary"
                        >
                        {type}
                        </option>
                    ))}
                    </select>
                    
                    {/* Dropdown Arrow */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 peer-focus:text-primary transition duration-200"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </div>
                </div>
            </div>



            {/* Question Section */}
            <div className="flex flex-col sm:flex-row justify-between lg:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <label className="font-medium">Question:</label>
              <input
                type="text"
                placeholder="Question"
                value={field.Question}
                onChange={(e) => handleQuestionChange(field.ID, e.target.value)}
                className="w-full sm:w-3/4 border-b-2 border-gray-300 bg-transparent py-1 px-2 focus:border-primary focus:outline-none focus:ring-0"

                
              />
            </div>

            {/* Render other dynamic field content */}
            {renderField(field)}

            {/* Action Buttons */}
            <div className="flex justify-end mt-6 space-x-1">

                            {/* Required Section */}
            <div className="flex items-center justify-center">
              <label className="mr-2 font-medium text-gray-700">Required:</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={field.Required}
                  onChange={() => handleRequiredToggle(field.ID)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

              <button
                id={`btn${field.ID}`}
                onClick={() => addNewField(field.ID)}
                className={`bg-primary text-white py-1 px-5 rounded-md hover:bg-secondary ${field.Question.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={field.Question.trim() === ''}
              >
                <FontAwesomeIcon icon={faAdd} />
              </button>

              <button
                id={`btn${field.ID}`}
                onClick={() => handleDuplicateField(field.ID)}
                className={`bg-gray-500 text-white py-1 px-5 rounded-md hover:text-primary ${field.Question.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={field.Question.trim() === ''}
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>

              <button
                id={`btn${field.ID}`}
                onClick={() => handleDeleteField(field.ID)}
                className={`bg-gray-400 text-white py-1 px-5 rounded-md hover:text-red  ${formFields.length === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={formFields.length === 1}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>

            <div className="flex flex-col items-center my-2"> 
            <div className="text-gray-400">
                <button
                    id={`moveDownBtn${field.ID}`}
                    onClick={() => handleMoveDown(field.ID)}
                    className="px-4 h-[15px] rounded-md  disabled:opacity-50"
                    disabled={formFields.findIndex((fieldItem) => fieldItem.ID === field.ID) === formFields.length - 1} // Disable if it's the last field
                >
                    <FontAwesomeIcon className="" icon={faSortDown} />
                </button>
                </div>
            </div>

                

          </div>
        </div>
      ))}

      <div className='flex justify-end fixed bottom-2 right-1 lg:right-10 z-999'>
        <div>
          <button
           onClick={() => handleSave()}
            className={`bg-primary text-white py-1 px-5 rounded-md hover:text-white  ${formFields.length === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
           disabled={formFields.length === 0}
              >
                Save
                {/* <FontAwesomeIcon icon={faTrash} /> */}
        </button>
        </div>
      </div>


       {/* <FormModal isOpen={isModalOpen} onClose={closeModal} formFields={formFields} /> */}
    </>
  );
};

export default CreateSurvey;