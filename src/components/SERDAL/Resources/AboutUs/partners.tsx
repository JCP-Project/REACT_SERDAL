//Phase 1
import UPLB from '..//AboutUs/Partners/logo.png'
import CLSU from '../AboutUs/Partners/SERDAC-Luzon (CLSU).png'
import BU from '../AboutUs/Partners/Satellite SERDAC (BU).png'
import VSU from '../AboutUs/Partners/ViSERDAC (VSU).png'
import UPV from '../AboutUs/Partners/Satellite SERDAC (UPV).png'
import WMSU from '../AboutUs/Partners/Satellite SERDAC (WMSU).png'
import USM from '../AboutUs/Partners/Satellite SERDAC (USM).png'
import USEP from '../AboutUs/Partners/SERDAC-Min (USeP).png'
import { ReactNode } from 'react'


export interface parteners {
    id: number;
    name: ReactNode;
    link: string;
    address: string;
    img: string;
    imgsize:string;
    pin:string;
    logolocation: string;
    pinLocation: string;
}


const partnersLogo: parteners[] = 
    [{
        id: 0,
        name: (<div>SERDAL<br/>(UPLB)</div>),
        link: "/",
        address: "",
        img: UPLB,
        imgsize: "w-15 h-15",
        pin:"h-10 w-10",
        logolocation: "top-[1.5%] left-[65%] md:top-[1.5%] md:left-[50%]",
        pinLocation: "top-[114%] left-[-60%] md:top-[98%] md:left-[-40%] text-secondary",
    },
    {
        id: 1,
        name: (<div>SERDAC-Luzon<br/>(CLSU)</div>),
        link: "https://www.facebook.com/SERDACLuzon/",
        address: "",
        img: CLSU,
        imgsize: "w-15 h-15",
        pin:"h-10 w-10",
        logolocation: "top-[-9.5%] left-[4%]",
        pinLocation: "top-[131%] left-[126%] md:top-[126%] md:left-[99%]",
    },
    {
        id: 2,
        name: (<div>Satellite SERDAC<br/>(BU)</div>),
        link: "https://www.facebook.com/SerdacBicol/",
        address: "",
        img: BU,
        imgsize: "w-15 h-15",
        pin:"h-10 w-10",
        logolocation: "top-[14%] left-[-5%]",
        pinLocation: "top-[94%] left-[235%] md:top-[92%] md:left-[193%]",
    },
    {
        id: 3,
        name: (<div>ViSERDAC<br/>(VSU)</div>),
        link: "https://www.facebook.com/viserdac",
        address: "",
        img: VSU,
        imgsize: "w-15 h-15",
        pin:"h-10 w-10",
        logolocation: "top-[26%] left-[73%] md:top-[29.5%] md:left-[62.5%]",
        pinLocation: "top-[123%] left-[19%] md:top-[91%] md:left-[0%]",
    },
    {
        id: 4,
        name: (<div>Satellite SERDAC<br/>(UPV)</div>),
        link: " https://www.facebook.com/SERDACUPV/",
        address: "",
        img: UPV,
        imgsize: "w-15 h-15",
        pin:"h-10 w-10",
        logolocation: "top-[37%] left-[-1%] md:top-[37%] md:left-[-3%]",
        pinLocation: "top-[59%] left-[178%] md:top-[59%] md:left-[150%]",
    },
    {
        id: 5,
        name: (<div>Satellite SERDAC<br/>(WMSU)</div>),
        link: "https://www.facebook.com/satellite.serdac.wmsu/",
        address: "",
        img: WMSU,
        imgsize: "w-15 h-15",
        pin:"h-10 w-10",
        logolocation: "top-[59%] left-[16%] md:top-[59%] md:left-[12%]",
        pinLocation: "top-[66%] left-[112%] md:top-[66%] md:left-[92%]",
    },
    {
        id: 6,
        name: (<div>Satellite SERDAC<br/>(USM)</div>),
        link: "https://www.facebook.com/profile.php?id=61557863887239",
        address: "",
        img: USM,
        imgsize: "w-15 h-15",
        pin:"h-10 w-10",
        logolocation: "top-[81%] left-[22%] md:top-[78.5%] md:left-[15.5%]",
        pinLocation: "top-[-35%] left-[184%] md:top-[-20%] md:left-[154%]",
    },
    {
        id: 7,
        name: (<div>Satellite SERDAC<br/>(USeP)</div>),
        link: "https://www.facebook.com/serdacmin/",
        address: "",
        img: USEP,
        imgsize: "w-15 h-15",
        pin:"h-10 w-10",
        logolocation: "top-[83.5%] left-[72%] md:top-[81%] md:left-[55%]",
        pinLocation: "top-[-63%] left-[62%] md:top-[-47%] md:left-[58%]",
    },
    




]

export default partnersLogo;
