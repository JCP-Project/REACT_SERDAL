import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/Template/PageTitle';

import SignIn from './components/SERDAL/Login/Authentication/SignIn';
import SignUp from './components/SERDAL/Login/Authentication/SignUp';

import DefaultLayout from './layout/DefaultLayout';
import UploadPublication from './components/SERDAL/Upload/Publication/UploadPublication';
import Publication from './components/SERDAL/Upload/Publication/Publications';
import PublicationRequest from './components/SERDAL/Upload/Publication/PublicationRequest';
import Dashboard2 from './components/SERDAL/Dashboard';
import Users from './components/SERDAL/Users/Users';

import CreatePublication from './components/SERDAL/Upload/Publication/CreatePublication';
import Info from './components/SERDAL/Upload/Publication/InfoPage';
import Survey from './components/SERDAL/Survey/Survey';
import Datasets from './components/SERDAL/Upload/DataSet/Datasets';
import CreateSurvey from './components/SERDAL/Survey/CreateSurvey';
import Form from './components/SERDAL/Survey/Form';
import AnswerSurvey from './components/SERDAL/Survey/AnswerSurvey';
import GenerateChart from './components/SERDAL/Upload/DataSet/GenerateChart';
import ResetPassword from './components/SERDAL/Login/Authentication/ResetPassword';
import Institution from './components/SERDAL/Management/Institution/Institution';
import Home from './components/SERDAL/Home/home';
import Publications from './components/SERDAL/Upload/Publication/Publications';
import About from './components/SERDAL/About/about';



function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    //setTimeout(() => setLoading(false), 1000);
    setLoading(false);
  }, []);


  //localStorage.setItem('isLoggedIn', 'false');
  //essionStorage.setItem('isAdmin', 'false');

  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [seconds, setSeconds] = useState(0);

  const validateRoute = (pathname: string) => {
    // List of valid base routes (without dynamic parameters)
    const validRoutes = [
      '/people',
     '/auth/signin', '/signup', 
      '/tables', '/tableapproval','/chart', 
      '/uploadpublication', 
      '/publication','/createpublication','/createpost','/auth/signup','/datasets','/','/survey',
      '/datasets/generatechart',
      '/admin/users', '/admin/datasets','/admin/Management/Institution','/admin/survey/create','/admin/survey/form','/admin/publicationrequest',
      '/auth/resetpassword',
    ];


    return validRoutes.some(route => {
      // If route has dynamic parameters (e.g., /parent/childpage/:customName), match the base path
      const baseRoute = route.split('/')[1]; // Get the base route part (e.g., 'parent' for /parent/...)
      const pathParts = pathname.split('/');
      const isValid = pathParts[1] === baseRoute;
      return isValid;
    });
  };

 //#region Auto Logout
    // Function to reset the timer
    const resetTimer = () => {
      setSeconds(0); // Reset the inactivity timer
    };
  
    useEffect(() => {
      const pathname = location.pathname.toLowerCase();
      if (!validateRoute(pathname)) {
        navigate('/'); // Redirect to '/publication' if invalid route
      }
    }, [location.pathname, navigate]);
  
    useEffect(() => {
      // Set interval to update seconds every 1 second
      const intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1); // Increment seconds
      }, 1000);
  
      // Cleanup the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []);
  
    useEffect(() => {
      if (seconds >= 3600) {
        localStorage.clear();
        window.location.reload(); // Reload the page after clearing session storage
      }
    }, [seconds]);
  
    // Detect user activity (mousemove, keydown, or click)
    const handleActivity = () => {
      setIsActive(true); // Set user as active
      resetTimer(); // Reset the timer when activity is detected
    };
  
    useEffect(() => {
      // Set up event listeners for user activity
      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('keydown', handleActivity);
      window.addEventListener('click', handleActivity);
  
      // Cleanup event listeners when the component unmounts
      return () => {
        window.removeEventListener('mousemove', handleActivity);
        window.removeEventListener('keydown', handleActivity);
        window.removeEventListener('click', handleActivity);
      };
    }, []); // This only runs once when the component is mounted
 //#endregion

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route path="/publication" element={<> <PageTitle title="Publications" /> <Publications /> </>} />
        <Route path="/people" element={<> <PageTitle title="people" /> <About /> </>} />
        <Route path="/UploadPublication" element={<> <PageTitle title="Upload Publication" /> <UploadPublication /> </>} />
        <Route path="/createpost" element={<> <PageTitle title="Upload" /> <CreatePublication /> </>} />
        <Route path="/datasets" element={<> <PageTitle title="Datasets" /> <Datasets /> </>} />
        
        <Route path="/Publication/Info/:infopage" element={<> <PageTitle title="Publication Info" /> <Info /> </>} />

        <Route path="/survey/answer/:answerpage" element={<> <PageTitle title="Answer Survey" /> <AnswerSurvey /> </>} />
        <Route path="/datasets/generatechart/:dataset" element={<> <PageTitle title="Survey" /> <GenerateChart /> </>} />

        <Route path="/generatechart" element={<> <PageTitle title="Survey" /> <GenerateChart /> </>} />

        <Route path="/auth/signin" element={<> <PageTitle title="Signin" /> <SignIn /> </>} />
        <Route path="/auth/signup" element={<> <PageTitle title="Signup" /> <SignUp /> </>} />
        <Route path="/auth/resetpassword" element={<> <PageTitle title="Reset Password" /> <ResetPassword /> </>} />

        <Route path="/survey" element={<> <PageTitle title="Survey" /> <Survey /> </>} />

        
        <Route path="/createpublication" element={<> <PageTitle title="Add Publication" /> <CreatePublication /> </>} />
        {isAdmin && isLoggedIn ? (
          <>
          <Route index element={<> <PageTitle title="SERDAL" /> <Dashboard2 /> </>} />  
            <Route path="/admin/survey/create" element={<> <PageTitle title="Create Survey" /> <CreateSurvey /> </>} />
            <Route path="/admin/survey/form" element={<> <PageTitle title="Survey Form" /> <Form /> </>} />
            <Route path="/survey/answer/:answerpage" element={<> <PageTitle title="Answer Survey" /> <AnswerSurvey /> </>} />
            
            <Route path="admin/Users" element={<> <PageTitle title="Users" /> <Users /> </>} />
            <Route path="/admin/PublicationRequest" element={<> <PageTitle title="Publication Request" /> <PublicationRequest /> </>} />
            <Route path="/admin/datasets" element={<> <PageTitle title="Datasets" /> <Datasets /> </>} />

            <Route path="/admin/Management/Institution" element={<> <PageTitle title="Institution" /> <Institution /> </>} />
             
            <Route path="/Auth/signup" element={<> <PageTitle title="Signup" /> <SignUp /> </>} />
          </>
        ):
        (
          // Site Index
          <Route index element={<> <PageTitle title="Home" /> <Home /> </>} />
          
        )}
       
        
      </Routes>
  </DefaultLayout> 
  );
}

export default App;
