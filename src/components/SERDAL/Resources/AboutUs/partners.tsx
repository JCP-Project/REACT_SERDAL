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
    imgsize: string;
    pin: string;
    logolocation: string;
    pinLocation: string;
}

const partnersLogo: parteners[] =
[
    {
        id: 0,
        name: (<div>SERDAL<br/>(UPLB)</div>),
        link: "/",
        address: "",
        img: UPLB,
        imgsize: "w-15 h-15",
        pin: "h-10 w-10",

        logolocation: "top-[6.5%] left-[57%] md:top-[4.5%] md:left-[43%]",
        pinLocation: "",
    },
    {
        id: 1,
        name: (<div>SERDAC-Luzon<br/>(CLSU)</div>),
        link: "https://www.facebook.com/SERDACLuzon/",
        address: "",
        img: CLSU,
        imgsize: "w-15 h-15",
        pin: "h-10 w-10",

        logolocation: "top-[1%] left-[11%] md:top-[-2.5%] md:left-[7%]",
        pinLocation: "",
    },
    {
        id: 2,
        name: (<div>Satellite SERDAC<br/>(BU)</div>),
        link: "https://www.facebook.com/SerdacBicol/",
        address: "",
        img: BU,
        imgsize: "w-15 h-15",
        pin: "h-10 w-10",

        logolocation: "top-[14%] left-[5%] md:top-[16%] md:left-[2%]",
        pinLocation: "",
    },
    {
        id: 3,
        name: (<div>ViSERDAC<br/>(VSU)</div>),
        link: "https://www.facebook.com/viserdac",
        address: "",
        img: VSU,
        imgsize: "w-15 h-15",
        pin: "h-10 w-10",

        logolocation: "top-[28%] left-[70%] md:top-[26%] md:left-[53%]",
        pinLocation: "",
    },
    {
        id: 4,
        name: (<div>Satellite SERDAC<br/>(UPV)</div>),
        link: "https://www.facebook.com/SERDACUPV/",
        address: "",
        img: UPV,
        imgsize: "w-15 h-15",
        pin: "h-10 w-10",

        logolocation: "top-[35%] left-[8%] md:top-[35%] md:left-[4%]",
        pinLocation: "",
    },
    {
        id: 5,
        name: (<div>Satellite SERDAC<br/>(WMSU)</div>),
        link: "https://www.facebook.com/satellite.serdac.wmsu/",
        address: "",
        img: WMSU,
        imgsize: "w-15 h-15",
        pin: "h-10 w-10",

        logolocation: "top-[56%] left-[23%] md:top-[57%] md:left-[16%]",
        pinLocation: "",
    },
    {
        id: 6,
        name: (<div>Satellite SERDAC<br/>(USM)</div>),
        link: "https://www.facebook.com/profile.php?id=61557863887239",
        address: "",
        img: USM,
        imgsize: "w-15 h-15",
        pin: "h-10 w-10",

        logolocation: "top-[77%] left-[28%] md:top-[73%] md:left-[24%]",
        pinLocation: "",
    },
    {
        id: 7,
        name: (<div>Satellite SERDAC<br/>(USeP)</div>),
        link: "https://www.facebook.com/serdacmin/",
        address: "",
        img: USEP,
        imgsize: "w-15 h-15",
        pin: "h-10 w-10",

        logolocation: "top-[76.5%] left-[67%] md:top-[73.5%] md:left-[51%]",
        pinLocation: "",
    },
]

export default partnersLogo;
