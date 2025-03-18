import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Select, { StylesConfig } from 'react-select';
import { checkbox } from '@material-tailwind/react';
import { faL } from '@fortawesome/free-solid-svg-icons';

interface UserForm {
  Id: number;
  firstname: string;
  lastname: string;
  email: string;
  password:string;
  repassword:string;
  university: number;
}


interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: number;
  role: string;
  img: string;
  createDateTime: string; // You can adjust the type if needed (e.g., Date)
  university: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  Password: string;
  IsActive: number;
  role: string;
  img: string;
  createDateTime: string;
  modifiedDateTime: string;
  ModifiedBy: number;
  university: number;
}



interface OTP {
  Id: number;
  UserId: OTP
}


interface University {
  id: number;
  value: string;
  label: string;
  isDeleted: number;
}



const SignUp: React.FC = () => {

  const apiUrl = import.meta.env.VITE_API_URL;

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [ismatchpass, setIsmatchpass] = useState<boolean>(true);
    const [ErrorMessage, setErrorMessage] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPolicyOpen, setIsPolicyOpen] = useState(false);

    const [OTP, setOTP] = useState("");
    const navigate = useNavigate();
      const [formData, setFormData] = useState<UserForm>({
        Id: 0,
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        repassword: "",
        university: 0,
      });


          const [university, setUniversity] = useState<University[]>([]);
      
          const [selectedOption, setSelectedOption] = useState<any>(null);
      
          const handleChange = (selectedOption1: any) => {
            setSelectedOption(selectedOption1);
            setFormData((prevFormData) => ({
              ...prevFormData,
              university: selectedOption1 ? selectedOption1.value : "",
            }));
          };

            useEffect(() => {
              const fetchData = async () => {
                try {
                  const response = await fetch(`${apiUrl}/api/Publication/University`, {
                    method: "GET",
                  });
                  if (response.ok) {
                    const jsonData: University[] = await response.json();
                    setUniversity(jsonData);
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
          
              fetchData();
            }, []);





    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setErrorMessage("");
        setIsmatchpass(true);
        //setIsSubmitting(false);
        if (isSubmitting)
        {
          console.log("disabled", isSubmitting);
          return;
        } 

        if (formData.password.toLowerCase() != formData.repassword.toLowerCase()) {
          setErrorMessage("Password not match");
          setIsmatchpass(false);
          return;
        }

        if (!isChecked) {
          setErrorMessage("You must accept the terms and conditions before registering.");
          return;
        }

        setIsSubmitting(true);

        const data = {
          ID: 0,
          FirstName: formData.firstname,
          LastName: formData.lastname,
          Email: formData.email,
          Password: formData.password,
        };
        
        console.log(data);


        const otpData ={
          OTPtypeId: 1,
          Email: formData.email
        }


        try {
          const response = await fetch(`${apiUrl}/api/Users/sendOTP`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify(otpData),
          });
  
          if (response.ok) {
            console.log("Form data submitted successfully!");
            const otp = await response.json();
              setIsSubmitting(false);
              setOTP(otp);
              OTPVerify(otp);
  
            } else {

              if (response.status === 400) {
                const errorResponse = await response.json();
                return Swal.fire({
                  icon: 'error',
                  title: 'Registration Failed',
                  text: errorResponse.message || "User already exists. Please login.",
                  confirmButtonColor: '#17C0CC',
                });
              }else{
                console.error("Registration Failed");
                Swal.fire({
                  icon: 'error',
                  title: 'Registration Failed',
                  text: 'Something went wrong while creating your account. Please try again.',
                  confirmButtonColor: '#17C0CC',
                });
              }

          }
        } catch (error) {
          console.error("Error submitting registration:", error);
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'Something went wrong while creating your account. Please try again.',
            confirmButtonColor: '#17C0CC',
          });
        } finally {
          setIsSubmitting(false);
        }
    };



    const OTPVerify = (otp: string) => {
      
      Swal.fire({
        title: "Enter your OTP",
        text: `To complete your registration, an OTP will be sent to ${formData.email}. Please check our email at your inbox, spam folder or junk mail`, // The additional message
        input: "text",
        confirmButtonColor: '#17C0CC',
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Verify OTP",
        showLoaderOnConfirm: true,
        customClass: {
          confirmButton: 'swal-button-verify', // Apply custom class to the confirm button
          input: 'swal-input-verify', // Apply custom class to the input field
        },
        preConfirm: async (inputOTP) => {
  
          const normalizedOtp = otp ? String(otp).trim() : "";
          const normalizedInputOTP = String(inputOTP).trim();

          if (normalizedOtp === normalizedInputOTP) {
            try {
              const data = {
                ID: 0,
                FirstName: formData.firstname,
                LastName: formData.lastname,
                Email: formData.email,
                Password: formData.password,
                university: selectedOption ? selectedOption.value : 0,
              };
    
              const response = await fetch(`${apiUrl}/api/Users/Create`, {
                method: "POST",
                headers: {"Content-Type": "application/json", },
                body: JSON.stringify(data),
              });
    
              if (!response.ok) {
                const errorResponse = await response.json();
                if (response.status === 400) {
                  // Handle BadRequest (User already exists)
                  return Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: errorResponse.message || "User already exists. Please login.",
                    confirmButtonColor: '#17C0CC',
                  });
                }
              }
    
              const responseData: UserInfo = await response.json();  
              // Show success message for 2 seconds
              Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'Your account has been created successfully.',
                timer: 3000, // Auto-close after 2 seconds
                showConfirmButton: false, // Hide the confirm button
              }).then(() =>{


                sessionStorage.setItem('id', responseData.id.toString());
                sessionStorage.setItem('firstname', responseData.firstName);
                sessionStorage.setItem('lastname', responseData.lastName);
                sessionStorage.setItem('email', responseData.email);
                sessionStorage.setItem('img', responseData.img);
                sessionStorage.setItem('role', responseData.role);
                sessionStorage.setItem('university', responseData.university.toString());
                sessionStorage.setItem('isLoggedIn', 'true');

                if (responseData.role.toLowerCase() == "admin") {
                  sessionStorage.setItem('isAdmin', 'true');
                  navigate('/');
                 window.location.reload();
                  
                }
                else
                {
                  sessionStorage.setItem('isAdmin', 'false');
                  navigate('/');
                  
                }
        
               window.location.reload();


              });
    
            } catch (error) {
              return Swal.showValidationMessage(`Request failed: ${error}`);
            }
          } else {
            // Invalid OTP
            const inputElement = Swal.getInput(); // Get the input element
            if (inputElement) {
              inputElement.style.borderColor = "red"; // Change border to red
            }
            // Show validation message
            return Swal.showValidationMessage("Invalid OTP! Please try again.");
          }
        },
        allowOutsideClick: false,
        didClose: () => {
          // Reset the input border color when the modal is closed
          const inputElement = Swal.getInput();
          if (inputElement) {
            inputElement.style.borderColor = ""; // Reset the border color
          }
        },
        timer: 30 * 60 * 1000,
      });
    
  // Add the custom CSS to style the verify button and input field
  const style = document.createElement('style');
  style.innerHTML = `
    .swal-button-verify {
      background-color: #17C0CC !important;
      border-color: #17C0CC !important;
      color: white !important;
    }
    .swal-button-verify:hover {
      background-color: #149fa3 !important;
      border-color: #149fa3 !important;
    }
    
    .swal-input-verify {
      border-color: #17C0CC !important;
      box-shadow: none !important;
      text-align: center; /* Center the text */
    }

    .swal-input-verify:focus {
      border-color: #17C0CC !important;
      outline: none;
      box-shadow: 0 0 3px rgba(23, 192, 204, 0.5) !important;
    }
  `;
  document.head.appendChild(style);
};
    

const universityOptions = university.map((uni) => ({
  value: uni.id,
  label: uni.label,
}));


const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setIsChecked(event.target.checked);
  setErrorMessage("");
};


  return (
    <>
      {/* <Breadcrumb pageName="Sign Up" /> */}

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap">

          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="text-center">
              <Link className="mb-5.5 inline-block mt-10" to="/">
              <img className="hidden dark:block" height={10} width={10} src="/logo.png" alt="Logo" />
              </Link>
              <p className="2xl:px-20 font-bold text-primary">
              SOCIO-ECONOMICS RESEARCH AND DATA ANALYTICS LABORATORY
              </p>

              <span className="mt-15 inline-block">
                <svg
                  width="350"
                  height="350"
                  viewBox="0 0 350 350"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.5825 294.844L30.5069 282.723C25.0538 280.414 19.4747 278.414 13.7961 276.732L13.4079 282.365L11.8335 276.159C4.79107 274.148 0 273.263 0 273.263C0 273.263 6.46998 297.853 20.0448 316.653L35.8606 319.429L23.5737 321.2C25.2813 323.253 27.1164 325.196 29.0681 327.019C48.8132 345.333 70.8061 353.736 78.1898 345.787C85.5736 337.838 75.5526 316.547 55.8074 298.235C49.6862 292.557 41.9968 288.001 34.2994 284.415L33.5825 294.844Z"
                    fill="#F2F2F2"
                  />
                  <path
                    d="M62.8332 281.679L66.4705 269.714C62.9973 264.921 59.2562 260.327 55.2652 255.954L52.019 260.576L53.8812 254.45C48.8923 249.092 45.2489 245.86 45.2489 245.86C45.2489 245.86 38.0686 270.253 39.9627 293.358L52.0658 303.903L40.6299 299.072C41.0301 301.712 41.596 304.324 42.3243 306.893C49.7535 332.77 64.2336 351.323 74.6663 348.332C85.0989 345.341 87.534 321.939 80.1048 296.063C77.8019 288.041 73.5758 280.169 68.8419 273.123L62.8332 281.679Z"
                    fill="#F2F2F2"
                  />
                  <path
                    d="M243.681 82.9153H241.762V30.3972C241.762 26.4054 240.975 22.4527 239.447 18.7647C237.918 15.0768 235.677 11.7258 232.853 8.90314C230.028 6.0805 226.674 3.84145 222.984 2.31385C219.293 0.786245 215.337 0 211.343 0H99.99C91.9222 0 84.1848 3.20256 78.48 8.90314C72.7752 14.6037 69.5703 22.3354 69.5703 30.3972V318.52C69.5703 322.512 70.3571 326.465 71.8859 330.153C73.4146 333.841 75.6553 337.192 78.48 340.015C81.3048 342.837 84.6582 345.076 88.3489 346.604C92.0396 348.131 95.9952 348.918 99.99 348.918H211.343C219.41 348.918 227.148 345.715 232.852 340.014C238.557 334.314 241.762 326.582 241.762 318.52V120.299H243.68L243.681 82.9153Z"
                    fill="#E6E6E6"
                  />
                  <path
                    d="M212.567 7.9054H198.033C198.701 9.54305 198.957 11.3199 198.776 13.0793C198.595 14.8387 197.984 16.5267 196.997 17.9946C196.01 19.4625 194.676 20.6652 193.114 21.4967C191.552 22.3283 189.809 22.7632 188.039 22.7632H124.247C122.477 22.7631 120.734 22.3281 119.172 21.4964C117.61 20.6648 116.277 19.462 115.289 17.9942C114.302 16.5263 113.691 14.8384 113.511 13.079C113.33 11.3197 113.585 9.54298 114.254 7.9054H100.678C94.6531 7.9054 88.8749 10.297 84.6146 14.5542C80.3543 18.8113 77.9609 24.5852 77.9609 30.6057V318.31C77.9609 324.331 80.3543 330.105 84.6146 334.362C88.8749 338.619 94.6531 341.011 100.678 341.011H212.567C218.592 341.011 224.37 338.619 228.63 334.362C232.891 330.105 235.284 324.331 235.284 318.31V30.6053C235.284 24.5848 232.891 18.811 228.63 14.554C224.37 10.297 218.592 7.9054 212.567 7.9054Z"
                    fill="white"
                  />
                  <path
                    d="M142.368 122.512C142.368 120.501 142.898 118.526 143.904 116.784C144.911 115.043 146.359 113.597 148.102 112.592C146.36 111.587 144.383 111.057 142.371 111.057C140.358 111.057 138.381 111.586 136.639 112.591C134.896 113.596 133.448 115.042 132.442 116.784C131.436 118.525 130.906 120.501 130.906 122.512C130.906 124.522 131.436 126.498 132.442 128.239C133.448 129.981 134.896 131.427 136.639 132.432C138.381 133.437 140.358 133.966 142.371 133.966C144.383 133.966 146.36 133.436 148.102 132.431C146.359 131.426 144.911 129.981 143.905 128.24C142.898 126.499 142.368 124.523 142.368 122.512Z"
                    fill="#CCCCCC"
                  />
                  <path
                    d="M156.779 122.512C156.778 120.501 157.308 118.526 158.315 116.784C159.321 115.043 160.769 113.597 162.513 112.592C160.77 111.587 158.793 111.057 156.781 111.057C154.769 111.057 152.792 111.586 151.049 112.591C149.306 113.596 147.859 115.042 146.852 116.784C145.846 118.525 145.316 120.501 145.316 122.512C145.316 124.522 145.846 126.498 146.852 128.239C147.859 129.981 149.306 131.427 151.049 132.432C152.792 133.437 154.769 133.966 156.781 133.966C158.793 133.966 160.77 133.436 162.513 132.431C160.769 131.426 159.322 129.981 158.315 128.24C157.308 126.499 156.779 124.523 156.779 122.512Z"
                    fill="#CCCCCC"
                  />
                  <path
                    d="M170.862 133.966C177.192 133.966 182.325 128.838 182.325 122.512C182.325 116.186 177.192 111.057 170.862 111.057C164.531 111.057 159.398 116.186 159.398 122.512C159.398 128.838 164.531 133.966 170.862 133.966Z"
                    fill="#17C0CC"
                  />
                  <path
                    d="M190.017 158.289H123.208C122.572 158.288 121.962 158.035 121.512 157.586C121.062 157.137 120.809 156.527 120.809 155.892V89.1315C120.809 88.496 121.062 87.8866 121.512 87.4372C121.962 86.9878 122.572 86.735 123.208 86.7343H190.017C190.653 86.735 191.263 86.9878 191.713 87.4372C192.163 87.8866 192.416 88.496 192.416 89.1315V155.892C192.416 156.527 192.163 157.137 191.713 157.586C191.263 158.035 190.653 158.288 190.017 158.289ZM123.208 87.6937C122.826 87.6941 122.46 87.8457 122.19 88.1154C121.92 88.385 121.769 88.7507 121.768 89.132V155.892C121.769 156.274 121.92 156.639 122.19 156.909C122.46 157.178 122.826 157.33 123.208 157.33H190.017C190.399 157.33 190.765 157.178 191.035 156.909C191.304 156.639 191.456 156.274 191.457 155.892V89.132C191.456 88.7507 191.304 88.385 191.035 88.1154C190.765 87.8457 190.399 87.6941 190.017 87.6937H123.208Z"
                    fill="#CCCCCC"
                  />
                  <path
                    d="M204.934 209.464H102.469V210.423H204.934V209.464Z"
                    fill="#CCCCCC"
                  />
                  <path
                    d="M105.705 203.477C107.492 203.477 108.941 202.029 108.941 200.243C108.941 198.457 107.492 197.01 105.705 197.01C103.918 197.01 102.469 198.457 102.469 200.243C102.469 202.029 103.918 203.477 105.705 203.477Z"
                    fill="#17C0CC"
                  />
                  <path
                    d="M204.934 241.797H102.469V242.757H204.934V241.797Z"
                    fill="#CCCCCC"
                  />
                  <path
                    d="M105.705 235.811C107.492 235.811 108.941 234.363 108.941 232.577C108.941 230.791 107.492 229.344 105.705 229.344C103.918 229.344 102.469 230.791 102.469 232.577C102.469 234.363 103.918 235.811 105.705 235.811Z"
                    fill="#17C0CC"
                  />
                  <path
                    d="M203.062 278.617H170.68C170.121 278.617 169.584 278.394 169.189 277.999C168.793 277.604 168.571 277.068 168.57 276.509V265.168C168.571 264.609 168.793 264.073 169.189 263.678C169.584 263.283 170.121 263.06 170.68 263.06H203.062C203.621 263.06 204.158 263.283 204.553 263.678C204.949 264.073 205.171 264.609 205.172 265.168V276.509C205.171 277.068 204.949 277.604 204.553 277.999C204.158 278.394 203.621 278.617 203.062 278.617Z"
                    fill="#17C0CC"
                  />
                  <path
                    d="M116.263 203.477C118.05 203.477 119.499 202.029 119.499 200.243C119.499 198.457 118.05 197.01 116.263 197.01C114.476 197.01 113.027 198.457 113.027 200.243C113.027 202.029 114.476 203.477 116.263 203.477Z"
                    fill="#17C0CC"
                  />
                  <path
                    d="M126.818 203.477C128.605 203.477 130.054 202.029 130.054 200.243C130.054 198.457 128.605 197.01 126.818 197.01C125.031 197.01 123.582 198.457 123.582 200.243C123.582 202.029 125.031 203.477 126.818 203.477Z"
                    fill="#17C0CC"
                  />
                  <path
                    d="M116.263 235.811C118.05 235.811 119.499 234.363 119.499 232.577C119.499 230.791 118.05 229.344 116.263 229.344C114.476 229.344 113.027 230.791 113.027 232.577C113.027 234.363 114.476 235.811 116.263 235.811Z"
                    fill="#17C0CC"
                  />
                  <path
                    d="M126.818 235.811C128.605 235.811 130.054 234.363 130.054 232.577C130.054 230.791 128.605 229.344 126.818 229.344C125.031 229.344 123.582 230.791 123.582 232.577C123.582 234.363 125.031 235.811 126.818 235.811Z"
                    fill="#17C0CC"
                  />
                  <path
                    d="M264.742 229.309C264.972 229.414 265.193 229.537 265.404 229.678L286.432 220.709L287.183 215.174L295.585 215.123L295.089 227.818L267.334 235.153C267.275 235.345 267.205 235.535 267.124 235.719C266.722 236.574 266.077 237.292 265.269 237.783C264.46 238.273 263.525 238.514 262.58 238.475C261.636 238.436 260.723 238.119 259.958 237.563C259.193 237.008 258.61 236.239 258.28 235.353C257.951 234.467 257.892 233.504 258.108 232.584C258.325 231.664 258.809 230.829 259.5 230.183C260.19 229.538 261.056 229.11 261.989 228.955C262.922 228.799 263.879 228.922 264.742 229.309Z"
                    fill="#FFB8B8"
                  />
                  <path
                    d="M298.642 344.352H292.894L290.16 322.198L298.643 322.198L298.642 344.352Z"
                    fill="#FFB8B8"
                  />
                  <path
                    d="M288.788 342.711H299.873V349.685H281.809C281.809 347.835 282.544 346.062 283.853 344.754C285.162 343.446 286.937 342.711 288.788 342.711Z"
                    fill="#1C2434"
                  />
                  <path
                    d="M320.995 342.729L315.274 343.292L310.379 321.513L318.822 320.682L320.995 342.729Z"
                    fill="#FFB8B8"
                  />
                  <path
                    d="M311.028 342.061L322.059 340.975L322.744 347.916L304.766 349.685C304.676 348.774 304.767 347.854 305.033 346.977C305.299 346.101 305.735 345.285 306.317 344.577C306.898 343.869 307.614 343.283 308.422 342.851C309.23 342.419 310.116 342.151 311.028 342.061Z"
                    fill="#1C2434"
                  />
                  <path
                    d="M300.242 191.677C306.601 191.677 311.757 186.525 311.757 180.17C311.757 173.815 306.601 168.663 300.242 168.663C293.882 168.663 288.727 173.815 288.727 180.17C288.727 186.525 293.882 191.677 300.242 191.677Z"
                    fill="#FFB8B8"
                  />
                  <path
                    d="M291.607 339.872C291.113 339.873 290.635 339.7 290.256 339.383C289.877 339.066 289.623 338.626 289.537 338.139C286.562 321.636 276.838 267.676 276.605 266.181C276.6 266.147 276.597 266.112 276.598 266.077V262.054C276.597 261.907 276.643 261.764 276.729 261.645L278.013 259.847C278.074 259.761 278.154 259.689 278.247 259.639C278.34 259.588 278.444 259.559 278.549 259.554C285.874 259.211 309.86 258.206 311.019 259.652C312.183 261.106 311.772 265.512 311.678 266.38L311.682 266.471L322.459 335.337C322.543 335.886 322.408 336.446 322.082 336.896C321.756 337.347 321.265 337.65 320.717 337.742L313.986 338.85C313.485 338.931 312.971 338.829 312.539 338.563C312.107 338.297 311.784 337.885 311.63 337.401C309.548 330.754 302.568 308.393 300.149 299.741C300.133 299.686 300.099 299.639 300.051 299.607C300.004 299.576 299.946 299.563 299.89 299.571C299.834 299.579 299.782 299.608 299.745 299.651C299.708 299.694 299.688 299.749 299.689 299.806C299.81 308.054 300.102 329.098 300.203 336.366L300.214 337.148C300.218 337.678 300.023 338.191 299.668 338.584C299.313 338.978 298.823 339.224 298.295 339.274L291.804 339.863C291.738 339.869 291.672 339.872 291.607 339.872Z"
                    fill="#1C2434"
                  />
                  <path
                    d="M292.933 196.201C290.924 197.395 289.721 199.588 289.031 201.821C287.754 205.953 286.985 210.226 286.741 214.545L286.012 227.475L276.984 261.755C284.809 268.37 289.322 266.867 299.855 261.455C310.387 256.044 311.591 263.26 311.591 263.26L313.697 234.092L316.706 202.219C316.031 201.407 315.266 200.672 314.427 200.03C311.645 197.868 308.409 196.366 304.962 195.636C301.516 194.906 297.948 194.967 294.528 195.815L292.933 196.201Z"
                    fill="#17C0CC"
                  />
                  <path
                    d="M290.001 236.232C290.244 236.324 290.479 236.434 290.704 236.562L311.497 226.163L311.842 220.529L320.419 219.938L320.878 232.781L293.092 241.963C292.865 242.935 292.347 243.816 291.608 244.487C290.868 245.158 289.941 245.588 288.951 245.72C287.96 245.852 286.953 245.68 286.063 245.226C285.173 244.772 284.442 244.058 283.968 243.179C283.494 242.301 283.299 241.298 283.409 240.306C283.519 239.313 283.928 238.378 284.583 237.624C285.238 236.869 286.107 236.332 287.075 236.084C288.043 235.835 289.063 235.887 290.001 236.232Z"
                    fill="#FFB8B8"
                  />
                  <path
                    d="M316.556 202.365C321.672 204.17 322.573 223.716 322.573 223.716C316.554 220.409 309.332 225.821 309.332 225.821C309.332 225.821 307.827 220.709 306.022 214.094C305.477 212.233 305.412 210.265 305.832 208.372C306.253 206.479 307.147 204.724 308.429 203.269C308.429 203.269 311.44 200.56 316.556 202.365Z"
                    fill="#17C0CC"
                  />
                  <path
                    d="M310.566 183.213C309.132 182.066 307.174 184.151 307.174 184.151L306.026 173.828C306.026 173.828 298.853 174.687 294.261 173.542C289.67 172.396 288.953 177.7 288.953 177.7C288.716 175.557 288.668 173.399 288.81 171.248C289.096 168.667 292.827 166.087 299.427 164.366C306.026 162.646 309.47 170.101 309.47 170.101C314.061 172.395 312.001 184.36 310.566 183.213Z"
                    fill="#1C2434"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to SERDAL
              </h2>

              <form onSubmit={handleSubmit}>



              <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Institution
                  </label>
                  <div className="relative">
                  <Select
                          id="university"
                          placeholder = "Select Institution"                                      
                          value={selectedOption}
                          onChange={handleChange}
                          options={universityOptions}
                          styles={customStyles}
                          name="university"
                          className="!text-lg"
                          required
                    />
                  </div>
                </div>



                <div className="mb-4">
                  <label className="mb-2.5 block text-sm text-black dark:text-white">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      id="firstname"
                      name="firstname"
                      onChange={handleInputChange}
                      value={formData.firstname}
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />

                    <span className="absolute right-4 top-2">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                            fill=""
                          />
                          <path
                            d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block text-sm text-black dark:text-white">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      id="lastname"
                      name="lastname"
                      onChange={handleInputChange}
                      value={formData.lastname}
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />

                    <span className="absolute right-4 top-2">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                            fill=""
                          />
                          <path
                            d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block text-sm text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      onChange={handleInputChange}
                      value={formData.email}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />

                    <span className="absolute right-4 top-2">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block text-sm text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      onChange={handleInputChange}
                      value={formData.password}
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />

                    <span className="absolute right-4 top-2">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="mb-2.5 block text-sm text-black dark:text-white">
                    Re-type Password
                  </label>
                  <div className="relative">
                    <input
                      id="repassword"
                      name="repassword"
                     onChange={handleInputChange}
                     value={formData.repassword}
                      type="password"
                      placeholder="Re-enter your password"
                      className={`w-full rounded-lg border bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:bg-form-input dark:text-white dark:focus:border-primary ${ismatchpass ? 'border-stroke' : 'border-red-500' }`}
                      required
                      />

                    <span className="absolute right-4 top-2">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>




                <div className="my-5">
                  <div className="relative">
                  <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                        <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                          I agree to the{" "}
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsModalOpen(true);
                            }}
                            className="text-indigo-600 hover:underline"
                          >
                            Terms and Conditions
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsPolicyOpen(true);
                            }}
                            className="text-indigo-600 hover:underline"
                          >
                            Privacy Policy
                          </a>
                        </label>
                    </div>
                  </div>
                </div>




                {
                  ErrorMessage && (<div className="text-red text-xs mb-3 ml-3 mt-3">{ErrorMessage}</div>)
                }
                

                <div className="mb-5">
                  <input
                    // disabled={isSubmitting}
                    type="submit"
                    value="Create account"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>


                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{' '}
                    <Link to="/auth/signin"
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.location.href = `/auth/signin`;
                                }}              
                    className="text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 text-sm flex justify-center items-center z-50 bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-5">
            <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
            <section>
        <p>
          By accessing or using this website provided by <b>SERDAL</b>, you agree to comply with and be bound by these Terms and
          Conditions. Please read these Terms carefully before registering, using, or accessing our Services. If you do not agree to
          these Terms, you should not use our Services.
        </p>
      </section>

      <section className="mt-3">
        <p>
          You are responsible for maintaining the confidentiality of your account
          and for all activities that occur under your account. You agree to use the
          Services only for lawful purposes.
        </p>
      </section>

      <section className="mt-3">
            <p>
              Please review our <b>Privacy Policy</b> to
              understand how we collect, use, and protect your personal information.
            </p>
        </section>


      <section>
        <h5 className="text-md font-semibold mt-5">Contact Information</h5>
        <p>
          If you have any questions about these Terms, please contact us at: 
          <br />
          Email: SERDAL@uplb.edu.ph
        </p>
      </section>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full py-2 bg-primary text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}



{isPolicyOpen && (
        <div className="fixed inset-0 text-sm flex justify-center items-center z-50 bg-gray-600 bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-5">
            <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>
            <section>
            <p>
              We collect personal information when you use our website or services, such
              as your name, email address and any other details you provide
              to us.
            </p>
      </section>

      <section className="mt-3">
        <p>
          The information we collect is used to improve our services, provide customer
          support, and send you updates or promotions related to our offerings. We do not
          sell or share your personal information with third parties without your consent.
        </p>
      </section>

      <section className="mt-3">
            <p>
            We take appropriate measures to secure your personal information, including encryption
            and firewalls. However, please note that no data transmission method is completely secure.
            </p>
        </section>

        <section className="mt-3">
            <p>
            Our website may contain links to third-party websites. We are not responsible for the content
            or privacy practices of these sites. We encourage you to read their privacy policies before
            submitting any personal information.
            </p>
        </section>  


      <section>
        <h5 className="text-md font-semibold mt-5">Contact Information</h5>
        <p>
        If you have any questions or concerns about our Privacy Policy, please contact us at: 
          <br />
          Email: Serdal@uplb.edu.ph
        </p>
      </section>
            <button
              onClick={() => setIsPolicyOpen(false)}
              className="mt-4 w-full py-2 bg-primary text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </>
  );
};


const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    fontSize: '1rem',
    paddingLeft:'10px',
    borderWidth: '2px',
    borderColor: "6B7280", // Keep the border color consistent
    boxShadow: state.isFocused ? '0 0 0 0px #17C0CC' : 'none', // Remove default blue focus outline
    '&:hover': {
      borderColor: "6B7280", // Ensure hover border stays the same
    },
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '0.7rem',
    backgroundColor: state.isSelected ? "#17C0CC" : 'transparent',
    color: state.isSelected ? '#fff' : '#000',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: "#17C0CC", // Keep hover effect consistent
      color: '#fff',
    },
  }),
};


export default SignUp;
