import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/Template/PageTitle';

import SignIn from './components/SERDAL/Login/Authentication/SignIn';
import SignUp from './components/SERDAL/Login/Authentication/SignUp';

import DefaultLayout from './layout/DefaultLayout';
import UploadPublication from './components/SERDAL/Upload/Publication/UploadPublication';

import PublicationRequest from './components/SERDAL/Upload/Publication/PublicationRequest';
import Dashboard2 from './components/SERDAL/Dashboard';
import Users from './components/SERDAL/Users/Users';

import CreatePublication from './components/SERDAL/Upload/Publication/CreatePublication';
import Info from './components/SERDAL/Upload/Publication/InfoPage';

import Datasets from './components/SERDAL/Upload/DataSet/Datasets';
import CreateSurvey from './components/SERDAL/Survey/CreateSurvey';
import Form from './components/SERDAL/Survey/Form';
import AnswerSurvey from './components/SERDAL/Survey/AnswerSurvey';
import GenerateChart from './components/SERDAL/Upload/DataSet/GenerateChart';
import ResetPassword from './components/SERDAL/Login/Authentication/ResetPassword';
import Institution from './components/SERDAL/Management/Institution/Institution';
import Home from './components/SERDAL/Home/home';
import Publications from './components/SERDAL/Upload/Publication/Publications';
import Training from './components/SERDAL/Training/training';
import People from './components/SERDAL/People/people';
import AboutUs from './components/SERDAL/AboutUs/aboutus';
import TrainingInfo from './components/SERDAL/Training/traininginfo';
import Services from './components/SERDAL/Services/services';
import ContactUs from './components/SERDAL/ContactUs/contactUs';
import NotFound from './components/SERDAL/Notfound';
import Maintenance from './components/SERDAL/Maintenance';
import DatasetsPage from './components/SERDAL/Upload/DataSet/DatasetsPage';

import ScrollToTop from './components/SERDAL/components/scrolltop';
import QuickResponseInfo from './components/SERDAL/QuickResponse/QuickResponseInfo';
import QuickResponse from './components/SERDAL/QuickResponse/QuickResponse';
import useAutoLogout from './hooks/useAutoLogout';



function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
   // setTimeout(() => setLoading(false), 1000);
   setLoading(false);
  }, []);

  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  useAutoLogout(1000);
 

  return loading ? (
    <Loader/>
  ) : (
   <>
   <ScrollToTop />
    <DefaultLayout>

      <Routes>
      <Route path="/404Notfound" element={<> <PageTitle title="404" /> <NotFound /> </>} />

        <Route path="/Maintenance" element={<> <PageTitle title="SERDAL | Maintenance" /> <Maintenance /> </>} />

        <Route path="/publication" element={<> <PageTitle title="SERDAL | Publications" /> <Publications /> </>} />
        <Route path="/about" element={<> <PageTitle title="SERDAL | About Us" /> <AboutUs /> </>} />
        <Route path="/people" element={<> <PageTitle title="SERDAL | People" /> <People /> </>} />
        <Route path="/UploadPublication" element={<> <PageTitle title="SERDAL | Upload Publication" /> <UploadPublication /> </>} />
        <Route path="/createpost" element={<> <PageTitle title="SERDAL | Upload" /> <CreatePublication /> </>} />

        <Route path="/datasets" element={<>
          <PageTitle title="SERDAL | Datasets" description="SERDAL Dataset for Agriculture, Aquatic, and Natural Resources (AANR) and Socio-Economics" keywords="Agriculture, Aquatic, and Natural Resources (AANR), Socio-Economics, Crops, Fisheries, Livestock and Poultry,Generate Chart Dataset" />
          <DatasetsPage /> 
         </>} />

        <Route path="/contact" element={<>
          <PageTitle title="SERDAL | Contact Us" />
          <ContactUs /> 
          </>} />
        <Route path="/services" element={<> <PageTitle title="SERDAL | Services" /> <Services /> </>} />

        <Route path="/trainings" element={<> <PageTitle title="SERDAL | Training" /> <Training /> </>} />
        <Route path="/trainings/Info/:infopage" element={<> <PageTitle title="SERDAL | Trainings Info" /> <TrainingInfo /> </>} />
        
        <Route path="/publication/Info/:infopage" element={<> <PageTitle title="SERDAL | Publication Info" /> <Info /> </>} />

        <Route path="/survey/answer/:answerpage" element={<> <PageTitle title="SERDAL | Answer Survey" /> <AnswerSurvey /> </>} />
        <Route path="/datasets/generatechart/:dataset" element={<> <PageTitle title="SERDAL | Survey" /> <GenerateChart /> </>} />

        <Route path="/generatechart" element={<> <PageTitle title="SERDAL | Survey" /> <GenerateChart /> </>} />

        <Route path="/auth/signin" element={<> <PageTitle title="SERDAL | Signin" /> <SignIn /> </>} />
        <Route path="/auth/signup" element={<> <PageTitle title="SERDAL | Signup" /> <SignUp /> </>} />
        <Route path="/auth/resetpassword" element={<> <PageTitle title="SERDAL | Reset Password" /> <ResetPassword /> </>} />

        <Route path="/QuickResponse" element={<> <PageTitle title="SERDAL | SERDAL Toolbox" /> <QuickResponse /> </>} />
         <Route path="/QuickResponse/Info/:infopage" element={<><PageTitle title="Quick Response Info" /><QuickResponseInfo /></>} />

        
        <Route path="/createpublication" element={<> <PageTitle title="SERDAL | Upload Publication" /> <CreatePublication /> </>} />
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
          <Route index element={<> <PageTitle title="Home" /> <Home /> </>} />          
        )}

          <Route
            path="*"
            element={
              <>
                <PageTitle title="404" />
                <NotFound />
              </>
            }
          />
       
        
      </Routes>
  </DefaultLayout> 
  </>
  );
}

export default App;
