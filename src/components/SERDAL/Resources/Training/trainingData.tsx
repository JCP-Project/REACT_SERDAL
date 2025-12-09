import { ReactNode } from 'react'

//Cover photo
import DataManagement from '../Training/Data Management.png'
import OpenData from '../Training/Open Data.png'
import MetaAnalysis from '../Training/Meta-analysis.png'
import ImpactAssesment from '../Training/Impact Assessment.png'
import Nvivo from '../Training/NVivo.png'
import FuturesThinking from '../Training/Futures Thinking.png'
import STATACourse from '../Training/Short Course on STATA.png'
import StrategicForesightandPlanning from '../Training/Strategic Foresight and Planning.png'
import DataManagementforCDA from '../Training/Data Management for CDA.png'



//Event Photos
import imgDataManagement1 from '../Training/Event Photos/Data Management 1.png'
import imgDataManagement2 from '../Training/Event Photos/Data Management 2.png'
import imgDataManagement3 from '../Training/Event Photos/Data Management 3.1.png'
import imgDataManagement4 from '../Training/Event Photos/Data Management 3.2.png'
import imgOpenData1 from '../Training/Event Photos/Open Data 1.png'
import imgOpenData2 from '../Training/Event Photos/Open Data 2.png'
import imgMetaAnalysis1 from '../Training/Event Photos/Meta-analysis 1.png'
import imgMetaAnalysis2 from '../Training/Event Photos/Meta-analysis 2.png'
import imgImpactAssesment1 from '../Training/Event Photos/Impact Assessment 1.png'
import imgImpactAssesment2 from '../Training/Event Photos/Impact Assessment 2.png'
import imgImpactAssesment3 from '../Training/Event Photos/ImpactAssessment3.png'
import Nvivo1 from '../Training/Event Photos/NVivo1.jpg'
import Nvivo2 from '../Training/Event Photos/NVivo2.png'
import Nvivo3 from '../Training/Event Photos/NVivo3.jpg'
import FuturesThinking1 from '../Training/Event Photos/Futures Thinking 1.jpg'
import FuturesThinking2 from '../Training/Event Photos/Futures Thinking 2.jpg'
import FuturesThinking3 from '../Training/Event Photos/Futures Thinking 3.jpg'
import STATA1 from '../Training/Event Photos//STATA 1.jpg'
import STATA2 from '../Training/Event Photos/STATA 2.jpg'
import StrategicForesightandPlanning1 from '../Training/Event Photos/Strategic Foresight and Planning 1.jpg'
import StrategicForesightandPlanning2 from '../Training/Event Photos/Strategic Foresight and Planning 2.jpg'
import DataManagementforCDA1 from '../Training/Event Photos/CDA Data Management 1.jpg'
import DataManagementforCDA2 from '../Training/Event Photos/CDA Data Management 2.jpg'

import VCACover from '../Training/Event Photos/VCA_Cover.png'
import VCA1 from '../Training/Event Photos/VCA1.png'
import VCA2 from '../Training/Event Photos/VCA2.png'

import SERDANCover from '../Training/Event Photos/SERDAN.png'
import SERDAN1 from '../Training/Event Photos/SERDAN1.jpg'
import SERDAN2 from '../Training/Event Photos/SERDAN2.jpg'
import SERDAN3 from '../Training/Event Photos/SERDAN3.jpg'


export interface TrainingData {
    id: number;
    title: string;
    info: string;
    summary: ReactNode;
    img: string;
    eventPhotos: string[]
  }

const trainingData: TrainingData[] = [
    
        {
            id: 0,
            title: "UPLB SERDAL’s Training Series: Empowering Researchers with Essential Data Management Skills",
            info:"The UPLB Socio-Economics Research and Data Analytics Laboratory (UPLB SERDAL), launched its highly anticipated Training Series on Socio-Economics Data Management. This training series was designed to enhance the data management capabilities of researchers, students, and professionals in the socio-economics field. The series, conducted via Zoom, comprised three comprehensive training sessions",
            summary: (
                <div>
                  <p>
                    The UPLB Socio-Economics Research and Data Analytics Laboratory (UPLB SERDAL) launched its highly anticipated Training Series on Socio-Economics Data Management. This training series was designed to enhance the data management capabilities of researchers, students, and professionals in the socio-economics field. The series, conducted via Zoom, comprised three comprehensive training sessions:
                  </p>
                  <ul className="list-disc ml-5 my-3">
                    <li>
                      <strong>Fundamentals of Research Data Management (Aug 12, 2024):</strong> Laid the groundwork for understanding core data management concepts, the data lifecycle, and best practices in managing research data effectively.
                    </li>
                    <li>
                      <strong>Search, Storage, Security, and Sharing Research Data (Aug 14, 2024):</strong> Addressed key topics such as metadata management, choosing the right data storage solutions, ensuring data security and privacy, and implementing strategies for securely sharing data within research networks.
                    </li>
                    <li>
                      <strong>Practical Data Analysis Workshop (Aug 16, 2024):</strong> Offered hands-on experience with data analysis techniques, including visualization tools and Excel applications, equipping participants with practical skills to interpret and present data effectively.
                    </li>
                  </ul>
                  <p>
                    The sessions were led by Asst. Prof. Reginald Neil C. Recario from the Institute of Computer Science at CAS-UPLB and Dr. Jefferson A. Arapoc from the Department of Economics at CEM-UPLB. It was interactive and focused on real-world applications, empowering participants to apply their learning in socio-economics research.
                  </p>
                </div>
              ),
            img: DataManagement,
            eventPhotos: [imgDataManagement1,imgDataManagement2,imgDataManagement3,imgDataManagement4],
        },
        {
            id: 1,
            title: "UPLB SERDAL’s Open Data Training: Promoting Data Accessibility in the Digital Age",
            info:" The UPLB Socio-Economics Research and Data Analytics Laboratory’s Open Data Training, held virtually from November 6–8, 2024, aimed to promote open data practices among researchers, students, and professionals across various institutions. The 3-day event introduced participants to the concept of open data and provided hands-on training in navigating the CKAN (Comprehensive Knowledge Archive Network) platform, a key tool for open data management.",
            summary: (
                <div>
                  <p>
                    The UPLB Socio-Economics Research and Data Analytics Laboratory’s Open Data Training, held virtually from November 6–8, 2024, aimed to promote open data practices among researchers, students, and professionals across various institutions. The 3-day event introduced participants to the concept of open data and provided hands-on training in navigating the CKAN (Comprehensive Knowledge Archive Network) platform, a key tool for open data management.
                  </p>
                  <p className="mt-3">
                    The training, led by Dr. Concepcion L. Khan of the Institute of Computer Science at CAS-UPLB, covered crucial topics such as the significance of open data in advancing research, improving decision-making, and promoting collaboration. Participants learned how open data practices can transform data accessibility and foster transparency in research initiatives. A key session focused on overcoming the challenges of implementing open data initiatives in the Philippines.
                  </p>
                  <p className="mt-3">
                    The training not only offered theoretical insights but also provided participants with practical experience using open data platforms. The CKAN live demonstration and hands-on session allowed participants to apply what they learned in real-time.
                  </p>
                  <p className="mt-3">
                    This initiative is expected to foster a growing network of open data advocates, driving innovation and knowledge-sharing in the Philippines and beyond.
                  </p>
                </div>
              ),
            img: OpenData,
            eventPhotos: [imgOpenData1,imgOpenData2],
        },
        {
            id: 2,
            title: "UPLB SERDAL’s Meta-analysis Training: Enhancing Research by Familiarizing with the Tool for Analyzing Analyses",
            info:"The UPLB Socio-Economics Research and Data Analytics Laboratory’s Meta-analysis Training, held virtually on November 14, 2024, introduced novice researchers to the key tools and techniques of meta-analysis. The one-day event, led by Dr. Arvin B. Vista from the Department of Agricultural and Applied Economics at CEM-UPLB, covered three essential topics: Introduction to Meta-analysis, Identifying and Coding Meta-analysis Data, and Summarizing Meta-analysis Data",
            summary:  (
                <div>
                  <p>
                    The UPLB Socio-Economics Research and Data Analytics Laboratory’s Meta-analysis Training, held virtually on November 14, 2024, introduced novice researchers to the key tools and techniques of meta-analysis. The one-day event, led by Dr. Arvin B. Vista from the Department of Agricultural and Applied Economics at CEM-UPLB, covered three essential topics: <strong>Introduction to Meta-analysis</strong>, <strong>Identifying and Coding Meta-analysis Data</strong>, and <strong>Summarizing Meta-analysis Data</strong>.
                  </p>
                  <p className="mt-3">
                    The primary aim of the training was to familiarize participants with meta-analysis as a powerful research tool, enabling them to synthesize findings, improve the reliability of conclusions, and make evidence-based decisions. Attendees learned how to collect data, apply statistical techniques, and interpret results — all critical for enhancing the robustness of research outcomes.
                  </p>
                  <p className="mt-3">
                    With participation from researchers, students, and faculty across various universities and institutions, the training equipped attendees with the skills to incorporate meta-analytic methods into their own research. It successfully laid the groundwork for continued professional development and collaboration in meta-analysis research.
                  </p>
                </div>
              ),
            img: MetaAnalysis,
            eventPhotos: [imgMetaAnalysis1,imgMetaAnalysis2],
        },
        {
            id: 3,
            title: "UPLB SERDAL’s Impact Assessment Training: A Crash Course on Designing Effective Evaluations",
            info: "The UPLB Socio-Economics Research and Data Analytics Laboratory’s Impact Assessment Impact Assessment Training, held virtually from November 25-27, 2024, provided an in-depth, 3-day learning experience for researchers and professionals seeking to understand and apply impact assessment methodologies. Led by Dr. Jefferson A. Arapoc, Asst. Prof. Paul Joseph B. Ramirez, and Mr. Paul Allen B. Yabut from the UPLB Department of Economics, the training focused on experimental and quasi-experimental methods, including Randomized Control Trials (RCTs), Difference-in-Difference (DID), and Propensity Score Matching (PSM).",
            summary: (
                <div>
                  <p>
                    The UPLB Socio-Economics Research and Data Analytics Laboratory’s <strong>Impact Assessment Training</strong>, held virtually from November 25–27, 2024, provided an in-depth, 3-day learning experience for researchers and professionals seeking to understand and apply impact assessment methodologies. Led by <strong>Dr. Jefferson A. Arapoc</strong>, <strong>Asst. Prof. Paul Joseph B. Ramirez</strong>, and <strong>Mr. Paul Allen B. Yabut</strong> from the UPLB Department of Economics, the training focused on experimental and quasi-experimental methods, including <strong>Randomized Control Trials (RCTs)</strong>, <strong>Difference-in-Difference (DID)</strong>, and <strong>Propensity Score Matching (PSM)</strong>.
                  </p>
                  <p className="mt-3">
                    The training aimed to equip participants with the skills to design, implement, and evaluate robust impact assessments, empowering them to make evidence-based decisions in policy and program development. Through hands-on exercises and engaging discussions, attendees gained practical knowledge on how to evaluate the effectiveness of social and economic interventions, improving both the quality and transparency of data used in policymaking.
                  </p>
                  <p className="mt-3">
                    Participants came from diverse institutions, including government agencies, universities, and research organizations, ensuring broad applicability of the content. By the end of the program, attendees were more confident in their ability to conduct high-quality impact assessments, contributing to more informed, data-driven decision-making in their respective fields.
                  </p>
                </div>
              ),
            img: ImpactAssesment,
            eventPhotos: [imgImpactAssesment1,imgImpactAssesment2,imgImpactAssesment3],
        },
        {
            id: 4,
            title: "UPLB SERDAL’s NVivo Training Workshop: Mastering Qualitative Research",
            info: "The UPLB Socio-Economics Research and Data Analytics Laboratory’s NVivo Training Workshop, conducted on December 9, 2024, in a hybrid setup, was led by Dr. Nicamil K. Sanchez. He introduced participants to NVivo 15’s core features, including basic data organization and coding, as well as advanced tools like query functions and data visualization. Aimed at researchers, faculty, and staff from Socio-Economic Research and Data Analytics Centers (SERDACs), the event focused on enhancing participants’ qualitative data analysis skills. Attendees gained practical experience in using NVivo to improve their research processes.",
            summary: (
                <div>
                  <p>
                    The UPLB Socio-Economics Research and Data Analytics Laboratory’s <strong>NVivo Training Workshop</strong>, conducted on <strong>December 9, 2024</strong>, in a hybrid setup, was led by <strong>Dr. Nicamil K. Sanchez</strong>. He introduced participants to <strong>NVivo 15’s</strong> core features, including basic data organization and coding, as well as advanced tools like query functions and data visualization.
                  </p>
                  <p className="mt-3">
                    Aimed at researchers, faculty, and staff from Socio-Economic Research and Data Analytics Centers (SERDACs), the event focused on enhancing participants’ <strong>qualitative data analysis skills</strong>. Attendees gained practical experience in using NVivo to improve their research processes.
                  </p>
                </div>
              )
              ,
            img: Nvivo,
            eventPhotos: [Nvivo1,Nvivo2,Nvivo3],
        },
        {
            id: 5,
            title: "UPLB SERDAL’s Futures Thinking Training Workshop: Shaping the Futures of the AANR Sector",
            info:"The UPLB Socio-Economics Research and Data Analytics Laboratory organized a comprehensive 3-day training workshop on Futures Thinking, held on January 14 to 16, 2025, at the Conference Room, Obdulia F. Sison Hall, UPLB. The workshop aimed to enhance participants’ understanding of futures thinking and foresight, focusing on critical aspects of strategic planning in the agriculture, aquatic, and natural resources (AANR) sector. The workshop covered various topics, including: Introduction to Futures Thinking, Futures Thinking in the AANR, Agri-Systems Approach to Futures Thinking and Problem Tree Analysis, Scanning, Reflexive Foresight and Causal Layered Analysis (CLA), Emerging Trends and Futures Wheel, Scenario Building, Backcasting and Strategic Policy Thinking, and Strategic Foresight and Planning.",
            summary: (
                <div>
                  <p>
                    The UPLB Socio-Economics Research and Data Analytics Laboratory organized a comprehensive 3-day training workshop on <strong>Futures Thinking</strong>, held on <strong>January 14 to 16, 2025</strong>, at the Conference Room, Obdulia F. Sison Hall, UPLB. The workshop aimed to enhance participants’ understanding of futures thinking and foresight, focusing on critical aspects of strategic planning in the <strong>agriculture, aquatic, and natural resources (AANR)</strong> sector.
                  </p>
                  <p className="mt-3">
                    The sessions covered a wide range of topics including: <em>Introduction to Futures Thinking, Futures Thinking in the AANR, Agri-Systems Approach to Futures Thinking and Problem Tree Analysis, Scanning, Reflexive Foresight and Causal Layered Analysis (CLA), Emerging Trends and Futures Wheel, Scenario Building, Backcasting and Strategic Policy Thinking</em>, and <em>Strategic Foresight and Planning</em>.
                  </p>
                  <p className="mt-3">
                    Training discussions were spearheaded by <strong>Dr. Melodee Marciana E. De Castro</strong>, project leader of SERDAL Phase 2, with support from project team members <strong>Asst. Prof. Luisito C. Abueg</strong>, <strong>Asst. Prof. Geny F. Lapiña</strong>, and <strong>Mr. Paul Kenneth B. Maghirang</strong>. Additional insights were provided by experts <strong>Dr. Aileen V. Lapitan</strong>, <strong>Dr. Hadji C. Jalotjot</strong> (College of Public Affairs and Development), and <strong>Dr. Rodmyr F. Datoon</strong> (College of Agriculture and Food Science).
                  </p>
                  <p className="mt-3">
                    Participants included representatives from <strong>SERDACs and their satellite centers</strong>, such as Central Luzon State University, Visayas State University, University of Southeastern Philippines, Western Mindanao State University, and University of Southern Mindanao. Faculty and researchers from <strong>CEM-UPLB</strong> and representatives from <strong>DOST-PCAARRD</strong> also joined to align with ongoing SERDAL and SERDAC initiatives.
                  </p>
                </div>
              ),
            img: FuturesThinking,
            eventPhotos: [FuturesThinking1,FuturesThinking2,FuturesThinking3],
        },
        {
            id: 6,
            title: "UPLB SERDAL’s Short Course on STATA: Enhancing Data Analytics in the Public Sector",
            info:"On May 8, 2025, UPLB SERDAL, in partnership with the UPLB College of Economics Alumni Foundation, Inc. (CEMAFI), conducted its first institution-based paid training workshop titled Short Course on STATA. Held at the SERDAL Facility in ICOPED, UPLB, the event was designed to enhance the data analysis skills of staff from the Department of Agriculture Regional Field Office IV-A.",
            summary: (
                <div>
                  <p>
                    On May 8, 2025, UPLB SERDAL, in partnership with the UPLB College of Economics Alumni Foundation, Inc. (CEMAFI), conducted its first institution-based paid training workshop titled Short Course on STATA. Held at the SERDAL Facility in ICOPED, UPLB, the event was designed to enhance the data analysis skills of staff from the Department of Agriculture Regional Field Office IV-A.
                  </p>
                  <p className="mt-3">
                   Facilitated by Ms. Lianne Maxine A. Tabanggay, instructor from the Department of Agricultural and Applied Economics, the one-day workshop covered key topics such as data management, data visualization, and hypothesis testing using STATA software.
                  </p>
                  <p className="mt-3">
                    Fifteen participants from DA RFO IV-A’s Planning, Monitoring, and Evaluation Department took part in the hands-on sessions using their own datasets. The training was highly interactive and practical, sparking interest in the software’s integration into their office operations.
                  </p>
                  <p className="mt-3">
                    This initiative reflects UPLB SERDAL’s continuing efforts to support evidence-based decision-making and capacity building in government agencies through applied data training.
                  </p>
                </div>
              ),
            img: STATACourse,
            eventPhotos: [STATA1,STATA2],
        },
        {
            id: 7,
            title: "UPLB SERDAL’s Strategic Foresight and Planning Workshop: Building a Unified Roadmap for the SERDAL–SERDACs–Satellite SERDACs Network",
            info:"UPLB SERDAL, in partnership with DOST-PCAARRD, held a three-day Strategic Foresight and Planning Workshop from March 17 to 19, 2025. The event gathered representatives from SERDAL, SERDACs, and their satellite centers to develop a unified strategic roadmap for the network.",
            summary: (
                <div>
                  <p>
                    UPLB SERDAL, in partnership with DOST-PCAARRD, held a three-day Strategic Foresight and Planning Workshop from March 17 to 19, 2025. The event gathered representatives from SERDAL, SERDACs, and their satellite centers to develop a unified strategic roadmap for the network.
                  </p>
                  <p className="mt-3">
                   Sessions covered drivers and signals, strategic programme management, scenario planning, and partnership development. The third day, facilitated by DOST-PCAARRD, focused on aligning plans and priorities across centers. The participating universities included Central Luzon State University, Bicol University, UP Visayas, Western Mindanao State University, and University of Southern Mindanao.
                  </p>
                  <p className="mt-3">
                    The workshop concluded with a shared direction and actionable steps to harmonize operations, streamline services, and strengthen the network’s support for socio-economics R&D nationwide.

                  </p>
                </div>
              ),
            img: StrategicForesightandPlanning,
            eventPhotos: [StrategicForesightandPlanning1,StrategicForesightandPlanning2],
        },
        {
            id: 8,
            title: "UPLB SERDAL’s Data Management Training for CDA Region IV-A: Enhancing Data Handling Capabilities",
            info:"The two-day Data Management Training held on June 4–5, 2025, at UPLB was organized by UPLB SERDAL and ICOPED-UPLB for the Cooperative Development Authority Region IV-A. The workshop aimed to equip CDA personnel with essential skills in data lifecycle management, security, integration, and analysis. Led by Asst. Prof. Reginald Neil C. Recario and supported by the SERDAL and ICOPED team, the training combined theory and hands-on exercises to enhance participants’ data handling capabilities.",
            summary: (
                <div>
                  <p>
                    The two-day Data Management Training held on June 4–5, 2025, at UPLB was organized by UPLB SERDAL and ICOPED-UPLB for the Cooperative Development Authority Region IV-A. The workshop aimed to equip CDA personnel with essential skills in data lifecycle management, security, integration, and analysis. Led by Asst. Prof. Reginald Neil C. Recario and supported by the SERDAL and ICOPED team, the training combined theory and hands-on exercises to enhance participants’ data handling capabilities.
                  </p>
                  <p className="mt-3">
                   This initiative strengthens CDA Region IV-A’s capacity for data-driven decision-making and improved service delivery. It reflects a shared commitment between UPLB and CDA to advancing data literacy and management excellence within government agencies, ultimately supporting more transparent and effective cooperative development programs.
                  </p>
                </div>
              ),
            img: DataManagementforCDA,
            eventPhotos: [DataManagementforCDA1,DataManagementforCDA2],
        },
        {
            id: 9,
            title: "UPLB SERDAL’s Value Chain Analysis Training for the Department of Agriculture – Bureau of Animal Industry: Enhancing Honey Value Chain Competitiveness",
            info:"From August 11-13, 2025, UPLB SERDAL conducted a Value Chain Analysis Training for the Department of Agriculture – Bureau of Animal Industry. The training focused on strengthening participants’ understanding of the honey value chain, covering key topics such as value chain analysis concepts, development frameworks, analytical tools, and insights from the Beeconomy Initiative and Beeconomic Success.",
            summary: (
                <div>
                  <p>
                  From August 11-13, 2025, UPLB SERDAL conducted a Value Chain Analysis Training for the Department of Agriculture – Bureau of Animal Industry. The training focused on strengthening participants’ understanding of the honey value chain, covering key topics such as value chain analysis concepts, development frameworks, analytical tools, and insights from the Beeconomy Initiative and Beeconomic Success.,                    
                  </p>
                  <p className="mt-3">
                   The training was enriched by seasoned VCA experts from CEM, Dr. Julieta A. Delos Reyes and Asst. Prof. Paul Joseph B. Ramirez, whose expertise guided participants through the intricacies of value chain analysis. Adding a special buzz to the event was Dr. Cleofas R. Cervancia, fondly known as the Queen Bee, along with Ms. Jessica B. Baroga-Barbecho, both from the UPLB Bee Program dedicated to advancing bee-related research and industry development.
                  </p>
                  <p className="mt-3">
                  The training enabled participants to gain a deeper understanding of how value is created, added, and distributed across the honey value chain. It also supported them in identifying gaps, improving efficiency, and developing strategies that enhance competitiveness and benefit all stakeholders.
                  </p>
                </div>
              ),
            img: VCACover,
            eventPhotos: [VCA1,VCA2],
        },
        {
            id: 10,
            title: "UPLB SERDAL’s Proposal Writing Workshop: Improvement of Strategies for the Harmonized Capacity Building and Data Repository of SERDAN",
            info:"From October 20-22, 2025, UPLB SERDAL, in partnership with DOST-PCAARRD, conducted the SERDAN Workshop aimed at enhancing strategies for harmonizing the network’s capacity-building initiatives and data repository systems. The three-day workshop guided participants through the key components of project proposal development, including reviewing action plans, identifying collaboration opportunities, refining project objectives, outlining activities and timelines, planning budgets, and defining expected outputs.",
            summary: (
                <div>
                  <p>
                  From October 20-22, 2025, UPLB SERDAL, in partnership with DOST-PCAARRD, conducted the SERDAN Workshop aimed at enhancing strategies for harmonizing the network’s capacity-building initiatives and data repository systems. The three-day workshop guided participants through the key components of project proposal development, including reviewing action plans, identifying collaboration opportunities, refining project objectives, outlining activities and timelines, planning budgets, and defining expected outputs.                    
                  </p>
                  <p className="mt-3">
                   The workshop gathered representatives from the Socio-Economics Research and Data Analytics Network, with participants from Central Luzon State University, Bicol University, Visayas State University, University of Southeastern Philippines, Western Mindanao State University, and University of Southern Mindanao.
                  </p>
                  <p className="mt-3">
                  Participants were able to develop two concept notes—one on capacity building and another on data repository development—by collectively reviewing existing initiatives, identifying gaps, and formulating approaches for strengthened collaboration and standardization across the network. This effort supports the development of harmonized strategies that enhance coherence, efficiency, and shared direction within the network.
                  </p>
                </div>
              ),
            img: SERDANCover,
            eventPhotos: [SERDAN1,SERDAN2, SERDAN3],
        },
        

    ]

export default trainingData;