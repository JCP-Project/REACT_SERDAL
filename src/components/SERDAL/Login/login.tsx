import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const CLientID = "660497554255-5bnd7flm92cbk9j1v0ni52qpi0hushfu.apps.googleusercontent.com";

  interface DecodedToken {
    sub: string;
    name: string;
    email: string;
    picture: string; 
  }


// Define interface for User data (fetched from API)
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
  }


function login (){

  const navigate = useNavigate();

    const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
        try {
          const decodedToken: DecodedToken = jwtDecode(credentialResponse.credential);
          createOrUpdateUser({ 
            id: 0,
            firstName: decodedToken.name.split(' ')[0], 
            lastName: decodedToken.name.split(' ')[1], 
            email: decodedToken.email,
            Password: "",  
            img: decodedToken.picture, 
            IsActive: 1, 
            role: 'user', 
            createDateTime: new Date().toISOString(),
            modifiedDateTime: new Date().toISOString(),
            ModifiedBy: 0,

          });

        } catch (error) {
          console.error("Error decoding token:", error);
        }
      };

      const createOrUpdateUser = async (user: User) => {
        try {
            console.log(user);
            const response = await fetch("https://localhost:7242/api/Users/Check", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            });
      
            if (!response.ok) {
              throw new Error("Network response was not ok");
            } 

            const responseData = await response.json();

            const returnedUser: User = {
              id: responseData.id,
              firstName: responseData.firstName,
              lastName: responseData.lastName,
              email: responseData.email,
              IsActive: responseData.isActive,
              role: responseData.role,
              img: responseData.img,
              createDateTime: responseData.createDateTime,
            };

              sessionStorage.setItem('id', returnedUser.id.toString());
              sessionStorage.setItem('firstname', returnedUser.firstName);
              sessionStorage.setItem('lastname', returnedUser.lastName);
              sessionStorage.setItem('email', returnedUser.email);
              sessionStorage.setItem('img', returnedUser.img);
              sessionStorage.setItem('role', returnedUser.role);
              sessionStorage.setItem('isLoggedIn', 'true');

              console.log("if", returnedUser.role.toLowerCase() )
              if (returnedUser.role.toLowerCase() == "admin") {
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

          } catch (error) {
          console.error("Error fetching users:", error);
        }
      };  


    return(
            <>
                <GoogleOAuthProvider clientId={CLientID}>
                    <GoogleLogin onSuccess={handleLoginSuccess}/>
                </GoogleOAuthProvider>
            </>

    );
}

export default login