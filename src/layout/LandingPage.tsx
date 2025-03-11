import Dataset from "../components/SERDAL/Upload/Publication/Publication1";
import Header2 from "../components/Template/Header/Header2";
import TableRecentUpload from "../components/Template/Tables/TableRecentUpload";

function LandingPage (){

    return(
        <>
        <div className="bg-[#EDFEFF] min-h-screen">
            <Header2/>
            <Dataset/>
        </div>
        </>
    );
}



export default LandingPage;