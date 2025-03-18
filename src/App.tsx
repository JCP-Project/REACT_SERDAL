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



function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    //setTimeout(() => setLoading(false), 1000);
    setLoading(false);
  }, []);


  //sessionStorage.setItem('isLoggedIn', 'false');
  //essionStorage.setItem('isAdmin', 'false');

  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const [seconds, setSeconds] = useState(0);

  const validateRoute = (pathname: string) => {
    // List of valid base routes (without dynamic parameters)
    const validRoutes = [
      '/profile', '/auth/signin', '/signup', 
      '/admin/users', '/admin/publicationrequest', '/calendar', 
      '/forms/form-elements', '/forms/form-layout', 
      '/tables', '/tableapproval', '/chart', 
      '/ui/alerts', '/ui/buttons', '/uploadpublication', 
      '/publication', '/login', '/createpublication','/createpost','/auth/signup','/datasets','/','/survey','/admin/survey/create','/admin/survey/form',
      '/datasets/generatechart',
      '/admin/datasets',
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

    // When 10 seconds have passed, set the session storage item
    //console.log("Admin",sessionStorage.getItem('isAdmin'));
    if (seconds >= 30) {
     // sessionStorage.setItem('isLoggedIn', 'false');
     // window.location.reload();

    }

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [seconds]); // Dependency array includes `seconds` so it triggers when `seconds` updates




  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
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

             
            <Route path="/Auth/signup" element={<> <PageTitle title="Signup" /> <SignUp /> </>} />
          </>
        ):
        (
          // Site Index
          <Route index element={<> <PageTitle title="SERDAL" /> <Publication /> </>} />
          
        )}
       
        
      </Routes>
  </DefaultLayout> 
  );
}

export default App;
