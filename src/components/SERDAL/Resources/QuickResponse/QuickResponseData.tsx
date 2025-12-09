//Phase 1
import { ReactNode } from 'react';
import id0 from './images/Food and Nutrition.png'
import id1 from './images/Practices in Agriculture.png'
import id2 from './images/Onion Market Prices.png'
import id3 from './images/Multi-Sphere Nature of Rice.png'

//pdf
import pdf0 from './PDF/Discussion Paper_Food and Nutrition Systems.pdf'
import pdf1 from './PDF/Discussion Paper_Nudging.pdf'
import pdf2 from './PDF/Discussion Paper_Onion.pdf'
import pdf3 from './PDF/Discussion Paper_Rice.pdf'


export interface QuickResponseData {
  id: number;
  year: number;
  title: string;
  img: string;
  Authors:string;
  Institution: string;
  Keywords: string;
  Abstract: ReactNode | string;
  PDF: string;

}

const quickResponseData: QuickResponseData[] = 
	[{
		id: 0,
        year: 2025,
        title: 'Are We Food and Nutrition Systems Transformation-Ready? Assessing the Food and Nutrition Policy and Governance Landscape in the Philippines',
        Abstract: <p>Global challenges such as hunger, malnutrition, and environmental degradation have
                    intensified the need to transform food systems, making it a critical agenda for sustainable
                    development, particularly in relation to the food and agriculture sectors. This transformation
                    necessitates a radical shift, not only in increasing food supply but also in integrating food
                    security with healthy diets, improving livelihoods, and fostering environmental sustainability.
                    However, the readiness of the Philippines' food system for such transformation remains a
                    challenge, despite various government policies and programs aimed at enhancing food
                    production and nutrition. This paper examines the policies and governance frameworks in the
                    Philippines to assess their role in preparing the country’s food systems for transformation. It
                    explores potential overlaps and gaps in these policies and provides insights for future research
                    and policy considerations to achieve a cohesive strategy for food systems transformation in the
                    country.
                    </p>,
        img: id0,
        Authors:"Geny F. Lapiña, Aileen V. Lapitan, Samantha J.P. Manalastas, Charis Mae T. Neric",
        Institution:"University of the Philippines Los Baños",
        Keywords: "food and nutrition systems transformation, food policy, governance",
        PDF: pdf0
    },
    {
		id: 1,
        year: 2025,
        title: 'From Awareness to Action: Nudging Sustainable Practices in Agriculture and Natural Resource Management',
        Abstract: <p>This discussion paper explores how behavioral insights, particularly the concept of
                        “nudging,” can bridge the gap between awareness and action in promoting sustainable
                        agriculture and natural resource management in the Philippines. Traditional approaches,
                        such as information campaigns and regulations, often fall short in changing behavior due to
                        overlooked cognitive biases, habits, and social influences. Drawing on behavioral economics,
                        the authors highlight practical nudging strategies including default seings, social norms
                        messaging, visual cues, eco-labeling, and commitment devices that subtly guide individuals
                        toward more sustainable choices without restricting freedom. The paper emphasizes the
                        importance of local context in designing effective interventions, citing examples from both
                        global and Philippine experiences. It advocates for integrating nudges into existing policy
                        frameworks to enhance impact and public engagement, presenting them as a low-cost yet
                        powerful complement to conventional tools in addressing environmental and agricultural
                        challenges.
                    </p>,
        img: id1,
        Authors:"Jefferson A. Arapoc,  Ma. Nova R. Nguyen",
        Institution:"University of the Philippines Los Baños",
        Keywords: "nudging, behavioral economics, sustainable practices",
        PDF: pdf1
    },
    {
		id: 2,
        year: 2025,
        title: 'Analysis of the Seasonality of Onion Market Prices in the Philippines: Insights and Policy Recommendations from the Recent Price Volatility',
        Abstract: <p>
                     The onion industry in the Philippines is a critical component of the agricultural sector,
                    influencing both local economies and national food security. However, the market for onions,
                    particularly red onions, has been affected by significant price volatility, primarily due to its
                    seasonal production paerns and the imbalance between supply and demand. This study
                    analyzes the seasonal fluctuations in the retail prices of red onions in the Philippines using time
                    series data from 2012 to 2024. The analysis identifies a recurring trend in which prices are lowest
                    from March to June, corresponding with the end of the harvest season, and highest from
                    December to January, coinciding with the holiday season and the beginning of the next harvest
                    cycle. These price fluctuations are further exacerbated by irregular price movements, such as
                    those seen in 2022 and 2023, which were linked to supply shortages and policy interventions.
                    Despite increased production in key onion-producing regions, such as Central Luzon and
                    MIMAROPA, the Philippine onion market remains vulnerable to external shocks and
                    inefficiencies within the supply chain. The findings highlight the need for targeted
                    interventions, including the strengthening of cold storage and post-harvest infrastructure,
                    improved supply chain transparency, and the development of region-specific policies that align
                    importation strategies with domestic production cycles.
                    </p>,
        img: id2,
        Authors:"Paul Kenneth B. Maghirang, Emmanuel C. Flores, Maria Angelica T. Maghirang",
        Institution:"University of the Philippines Los Baños",
        Keywords: "onion, price volatility, seasonality, market fluctuations, Philippines",
        PDF: pdf2
    },
    {
		id: 3,
        year: 2025,
        title: 'The Multi-sphere Nature of Rice in the Philippines and its Interactions with Climate Change Phenomena',
        Abstract: <p>
                     Rice production and supply in the Philippines remains to be a significant challenge over the
                    years, and has been facing the concerns brought forth by climate change. In addition, the recent
                    episodes of the El Niño phenomenon have highlighted these concerns on top of the
                    technological, economic, social, and political dimensions of the problem. The recent policy
                    takeaways of the government to impose price caps on rice for distribution in the market has
                    posed serious concerns on the soundness of the policy in terms of its economics. There has also
                    been a move to redistribute excess supply but arguably edible rice, but has been planned to be
                    extended via importation. These policies reflect a myriad of complexities of the agricultural
                    sector that require a comprehensive, long-term and a farm-to-table mode of re-programming for
                    the sector. To complement these assertions, we present and analyze the reported official
                    production, supply, and import data, as well as the metrics of technological requirements,
                    infrastructure, and investment. We also correlate these data given demand, consumption, and
                    nutritional requirements, with rice as a vehicle given its socioeconomic and cultural importance.
                    Given these observations, insights, and inferences, we propose some simple yet significant ways
                    forward to augment the pressing concerns on the sector pos-Covid-19 pandemic onto the “next
                    normal”.
                    </p>,
        img: id3,
        Authors:"Luisito C Abueg, Geny F. Lapiña, Jayson S. Cabral",
        Institution:"University of the Philippines Los Baños",
        Keywords: "El Niño phenomenon, rice agriculture, Rice self-sufficiency, Agricultural price caps",
        PDF: pdf3
    },


]

export default quickResponseData;
