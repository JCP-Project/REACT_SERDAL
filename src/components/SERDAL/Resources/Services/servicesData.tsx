import capacityBuilding from '../Services/Capacity Building.svg'
import ConsultancyServices from '../Services/ConsultancyServices.svg'
import DataPortal from '../Services/DataPortal.svg'
import Facility from '../Services/Facility.svg'

const servicesData = [
    {   
        id: 0,
        title: "Capacity Building",
        summary:(<div>Enhancing research capabilities through tailored training sessions and workshops designed to equip individuals and organizations with the skills to excel in socio-economics research.<br/><br/> Key focus areas include: Data Management, Meta-Analysis, Impact Assessment, Futures Thinking, Time Series Analysis Using STATA, Short Course on STATA, Introduction to R Programming, Productivity and Efficiency Analysis Using STATA, Multivariate and Nonparametric Analysis in Socio-Economics Research Using SPSS and XLStat, Financial Analysis, and Forecasting.</div>),
        img: capacityBuilding
    },
    {   
        id: 1,
        title: "Consultancy Services",
        summary: "Providing expert insights and tailored solutions to navigate the socio-economic landscape and drive informed decision-making.",
        img: ConsultancyServices
    },
    {   
        id: 2,
        title: "Socio-Economics Data Portal",
        summary: "Your gateway to comprehensive socio-economic data and relevant materials for impactful research and analysis.",
        img: DataPortal,
    },
    {   
        id: 3,
        title: "SERDAL Facility",
        summary: "Equipped with computers and statistical software, the SERDAL Facility provides essential tools for conducting in-depth socio-economics research and analysis.",
        img: Facility
    }
]

export default servicesData;