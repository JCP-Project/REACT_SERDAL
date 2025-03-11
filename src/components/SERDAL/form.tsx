import { faAdd, faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';

type AnswerType = 'short text' | 'long text' | 'radio' | 'checkbox' | 'Number';

interface FormField {
  ID: number;
  Question: string;
  Answer: string;
  AnswerType: AnswerType[];
  SelectedType: AnswerType;
}

const DynamicInput: React.FC = () => {
  const [formFields, setFormFields] = useState<FormField[]>([
    {
      ID: 1,
      Question: 'Question 1',
      Answer: '',
      AnswerType: ['short text', 'long text', 'radio', 'checkbox', 'Number'],
      SelectedType: 'short text',
    },
  ]);

  const [formTitle, setFormTitle] = useState<string>(''); // New state for form title
  const [newOption, setNewOption] = useState<string>('');
  const fieldRefs = useRef<{ [key: number]: HTMLDivElement }>({});
  const [focusID, setFocusID] = useState<number | null>(null); // Track the ID to focus on

  // Focus on the newly added or duplicated field
  const focusOnField = (ID: number) => {
    const field = fieldRefs.current[ID];
    if (field) {
      field.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = field.querySelector('input, textarea');
      if (input) {
        input.focus();
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

          if (newType === 'radio') {
            updatedField = {
              ...updatedField,
              answerOption: ['Option 1'],
            };
          } else if (newType === 'checkbox') {
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

  const handleOptionChange = (ID: number, index: number, newOption: string) => {
    setFormFields((prev) =>
      prev.map((field) => {
        if (field.ID === ID) {
          const updatedField = { ...field };
          if (updatedField.SelectedType === 'radio' || updatedField.SelectedType === 'checkbox') {
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
    if (newOption.trim() === '') return;

    setFormFields((prev) =>
      prev.map((field) => {
        if (field.ID === ID) {
          const updatedField = { ...field };

          if (updatedField.SelectedType === 'radio' || updatedField.SelectedType === 'checkbox') {
            const updatedOptions = [...(updatedField.answerOption || [])];
            updatedOptions.push(newOption);
            updatedField.answerOption = updatedOptions;
          }
          return updatedField;
        }
        return field;
      })
    );

    setNewOption('');
  };

  const handleDeleteOption = (ID: number, index: number) => {
    setFormFields((prev) =>
      prev.map((field) => {
        if (field.ID === ID) {
          const updatedField = { ...field };

          if (updatedField.SelectedType === 'radio' || updatedField.SelectedType === 'checkbox') {
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
      AnswerType: ['short text', 'long text', 'radio', 'checkbox', 'Number'],
      SelectedType: 'short text',
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
  const formData = {
    title: formTitle,  // Include the form title in the saved data
    fields: formFields,
  };
  console.log(formData);
}


 const handleFocus = (ID: number) => {
    setFocusID(ID); // Update focusID when field is clicked or focused
  };


  const renderField = (field: FormField) => {
    switch (field.SelectedType) {
      case 'short text':
        return (
          <div ref={(el) => (fieldRefs.current[field.ID] = el!)} key={field.ID} className="mt-4">
            <label className="block text-md font-medium text-gray-800">{field.Question}</label>
            <input
              type="text"
              placeholder="Short text"
              className="mt-2 py-1 px-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
              disabled
            />
          </div>
        );
      case 'Number':
        return (
          <div ref={(el) => (fieldRefs.current[field.ID] = el!)} key={field.ID} className="mt-4">
            <label className="block text-md font-medium text-gray-800">{field.Question}</label>
            <input
              type="number"
              placeholder="Number"
              className="mt-2 py-1 px-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
              disabled
            />
          </div>
        );
      case 'long text':
        return (
          <div ref={(el) => (fieldRefs.current[field.ID] = el!)} key={field.ID} className="mt-4">
            <label className="block text-md font-medium text-gray-800">{field.Question}</label>
            <textarea
              placeholder="Enter long text"
              rows={2}
              className="mt-2 py-1 px-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
              disabled
            />
          </div>
        );
      case 'radio':
        const radioField = field as RadioField;
        return (
          <div ref={(el) => (fieldRefs.current[field.ID] = el!)} key={field.ID} className="mt-4">
            <label className="block text-md font-medium text-gray-800">{field.Question}</label>
            {radioField.answerOption && radioField.answerOption.length > 0 ? (
              radioField.answerOption.map((option, index) => (
                <div key={index} className="flex items-center mt-2">
                  <input
                    type="radio"
                    name={field.ID.toString()}
                    value={option}
                    className="mr-2"
                  />
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(field.ID, index, e.target.value)}
                      className="border p-2 rounded-lg w-3/4 focus:outline-none focus:ring-2 focus:ring-primary"
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
            <div className="mt-4 flex items-center">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                className="border p-2 rounded-lg w-3/4 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Add new option"
              />
              <button
                type="button"
                onClick={() => handleAddOption(field.ID)}
                className="ml-2 bg-primary text-white py-1 px-3 rounded-lg hover:bg-secondary"
              >
                Add Option
              </button>
            </div>
          </div>
        );
      case 'checkbox':
        const checkboxField = field as CheckboxField;
        return (
          <div ref={(el) => (fieldRefs.current[field.ID] = el!)} key={field.ID} className="mt-4">
            <label className="block text-md font-medium text-gray-800">{field.Question}</label>
            {checkboxField.answerOption && checkboxField.answerOption.length > 0 ? (
              checkboxField.answerOption.map((option, index) => (
                <div key={index} className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    name={field.ID.toString()}
                    value={option}
                    className="mr-2"
                  />
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(field.ID, index, e.target.value)}
                      className="border py-1 px-2 rounded-lg w-3/4 focus:outline-none focus:ring-2 focus:ring-primary"
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
            <div className="mt-4 flex items-center">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                className="border py-1 px-2 rounded-lg w-3/4 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Add new option"
              />
              <button
                type="button"
                onClick={() => handleAddOption(field.ID)}
                className="ml-2 bg-primary text-white py-1 px-2 rounded-lg hover:bg-secondary"
              >
                Add Option
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
      <div className="relative max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg my-2 z-50">
        <label className="block text-lg font-medium text-gray-800">Survey Title:</label>
        <input
          type="text"
          placeholder="Enter form title"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="mt-2 py-1 px-2 border-b-2 border-gray-300 rounded-sm w-full focus:outline-none focus:border-primary"
        />
      </div>

      {formFields.map((field) => (
        <div ref={(el) => (fieldRefs.current[field.ID] = el!)} key={field.ID} className="relative max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg my-2 z-50 overflow-hidden group">
          <div className='absolute top-0 left-0 w-1 h-100 bg-white group-hover:bg-primary'></div>
          <div className="space-y-6 ">
            <div className="flex justify-between items-center">
              <label className="font-medium">Answer Type:</label>
              <select
                value={field.SelectedType}
                onChange={(e) => handleTypeChange(field.ID, e.target.value as AnswerType)}
                className="border py-1 px-2 rounded-lg w-3/4 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {field.AnswerType.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between items-center">
              <label className="font-medium">Question:</label>
              <input
                type="text"
                placeholder="Question"
                value={field.Question}
                onChange={(e) => handleQuestionChange(field.ID, e.target.value)}
                className="border py-1 px-2 rounded-lg w-3/4 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {renderField(field)}

            <div className="flex justify-end mt-6 space-x-1">
              <button
                id={`btn${field.ID}`}
                onClick={() => addNewField(field.ID)}
                className={`bg-primary text-white py-1 px-5  rounded-md hover:bg-secondary ${field.Question.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
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

          </div>

        </div>
      ))}
      <div className='flex justify-end fixed bottom-2 right-10 z-999'>
        <div>
          <button
           onClick={() => handleSave()}
           className={`bg-gray-400 text-white py-1 px-5 rounded-md hover:text-white  ${formFields.length === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
           disabled={formFields.length === 1}
              >
                Save
                {/* <FontAwesomeIcon icon={faTrash} /> */}
        </button>
        </div>
      </div>
    </>
  );
};

export default DynamicInput;
