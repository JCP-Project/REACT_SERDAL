import { useEffect, useState } from "react";
import Select from "react-select";
import ApexCharts from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faArrowDown19, faArrowDownShortWide, faArrowLeft, faFilter, faTurnDown } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { MdOutlineCheckBox, MdOutlineIndeterminateCheckBox } from "react-icons/md";
import { FaAngleLeft,FaAngleRight  } from "react-icons/fa";

interface DataSets {
  title: string;
  dataGroup: DataGroup[];
}

interface DataGroup {
  production: string;  // ✅ Correct key
  description: string;
  dataYear: string[];
  series: Series[];
}


interface Series {
  name: string;
  data: number[];
}

interface OptionType {
  value: string;
  label: string;
}

// New Ordered Chart Colors
const chartColors = [
  '#1E90FF', '#32CD32', '#FFD700', '#FF8C00', '#FF6347',
  '#8A2BE2', '#FF1493', '#20B2AA', '#6495ED', '#0066CC',
  '#DC143C', '#C71585', '#3CB371', '#4682B4', '#D2691E',
  '#FF7F50', '#9ACD32', '#00FA9A', '#8B4513', '#B0E0E6',
  '#00CED1', '#F08080', '#A52A2A', '#C0C0C0', '#D3D3D3',
  '#FF69B4', '#006400', '#8B0000', '#5F9EA0', '#808000',
  '#2E8B57', '#3B9B8C', '#4169E1', '#DAA520',
  '#00FA9A', '#7FFF00', '#9ACD32', '#ADFF2F', '#32CD32',
  '#FF7F50', '#FF6347', '#FF4500', '#D2691E', '#FF8C00',
  '#8B4513', '#A52A2A', '#D2B48C', '#C0C0C0', '#A9A9A9',
  '#F08080', '#F4A300', '#E9967A', '#FF6347', '#FF1493',
  '#FFD700', '#FF8C00', '#FF4500', '#D2691E', '#C71585',
  '#DC143C', '#FF69B4', '#FF6347', '#FF1493', '#F0E68C', 
  '#C71585', '#B22222', '#FF8C00', '#DAA520', '#20B2AA',
  '#4682B4', '#4169E1', '#6495ED', '#0000FF', '#00008B',
  '#006400', '#008B8B', '#556B2F', '#2E8B57', '#9ACD32',
  '#6B8E23', '#808000', '#556B2F', '#8B0000', '#B0C4DE',
  '#BDB76B', '#F08080', '#FF6347', '#8B008B', '#A52A2A', 
  '#C0C0C0', '#D3D3D3', '#C71585', '#FF1493', '#FF6347', 
  '#2F4F4F', '#B0E0E6', '#F5FFFA', '#FF4500', '#D2691E',
  '#FFD700', '#D3D3D3', '#FF69B4', '#D2B48C', '#FF7F50', 
  '#3CB371', '#4682B4', '#00CED1', '#5F9EA0', '#C71585',
  '#FF6347', '#FF7F50', '#FF8C00', '#FF4500', '#DAA520',
  '#F4A300', '#FFD700', '#F0E68C', '#32CD32', '#B0E0E6',
  '#00CED1', '#8B0000', '#FF6347', '#FF4500', '#B22222',
  '#DC143C', '#FF1493', '#FF6347', '#FFFF00', '#FFD700'  

];

// Function to convert hex color to RGB
function hexToRgb(hex) {
  hex = hex.replace(/^#/, ''); // Remove '#' if it exists
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}


function GenerateChart() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { dataset } = useParams();

  const [chart, setChart] = useState<string>("line");
  const [dataSet, setDataSet] = useState<DataSets | null>(null);

 const [selectedProd, setSelectedProd] = useState<number>(0)

  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);
  const [settedChart, setSettedChart] = useState<JSX.Element | null>(null);

  const [FilteredYears, setFilterYears] = useState<string[]>([]);

  const adminStatus = sessionStorage.getItem('isAdmin') === 'true';

  const chartOptions = [
    { label: "Line Chart", value: "line" },
    { label: "Bar Chart", value: "bar" },
    { label: "Area Chart", value: "area" },
    { label: "Scatter Chart", value: "scatter" },
    { label: "Radar Chart", value: "radar" },
    { label: "Bubble Chart", value: "bubble" },
  ];

  useEffect(() => {
    fetchDataset(Number(dataset));
  }, []);

  const fetchDataset = async (Id: number) => {
    try {
      const response = await fetch(`${apiUrl}/api/Dataset/DataById/${Id}`);
      if (response.ok) {
        const jsonData: DataSets = await response.json();
        console.log(jsonData);
        setDataSet(jsonData);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formattedSeries = () => {
    if (!dataSet || !dataSet?.dataGroup[selectedProd]?.series) {
      return [{ name: "No Data", data: [] }];
    }
  
    // Correctly reference `dataYear` inside `dataGroup[selectedProd]`
    const filterYears =
      selectedYears.length > 0
        ? dataSet?.dataGroup[selectedProd].dataYear
            .map((year, index) => (selectedYears.includes(year) ? index : null))
            .filter((index) => index !== null) // Ensure we only keep valid indices
        : [...Array(dataSet?.dataGroup[selectedProd].dataYear.length).keys()]; // Select all years if none are selected
  
    console.log("Filtered Years Indices:", filterYears);
  
    return dataSet?.dataGroup[selectedProd].series
      .filter((s) => selectedVariables.length === 0 || selectedVariables.includes(s.name))
      .map((s) => ({
        name: s.name,
        data: filterYears.map((index) => ({
          x: dataSet?.dataGroup[selectedProd].dataYear[index], // ✅ Corrected reference
          y: s.data[index],
          z: Math.random() * 100,
        })),
      }));
  };
  
  

  
  // Generate multi-select options for Year & Variables
  const optionsYear = dataSet?.dataGroup[selectedProd].dataYear.map((year) => ({
    value: year,
    label: year,
  })) || [];
  
  const optionsVariables = dataSet?.dataGroup[selectedProd].series.map((s) => ({
    value: s.name,
    label: s.name,
  })) || [];

  const optionsProduction = dataSet?.dataGroup.map((s, index) => ({
    value: index,
    label: s.production || "Unnamed Production", // ✅ Correct key
  })) || [];

  // Get min & max values from the dataset dynamically
// Extract all Y-values from the dataset
    const yaxisConfig = {
      labels: {
        show: true,
        formatter: (value) => value.toLocaleString(), // ✅ Format numbers with commas
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
      },
      tickAmount: 10, // ✅ Ensure proper scaling (adjust if needed)
      forceNiceScale: true, // ✅ Helps keep axis labels evenly spaced
    };


    const baseChartOptions = {
      chart: {
        type: chart,
        height: 400,
        width: "95%",
        toolbar: { show: false },
        zoom: { enabled: false }, // ✅ Disable zooming
        pan: { enabled: false }, // ✅ Disable panning
      },
      colors: chartColors,
      title: { 
       // text: `${dataSet?.title?.toUpperCase()} - ${dataSet?.dataGroup[selectedProd]?.production.toLowerCase() || "Subtitle Here"}`,
        align: "left",
        style: { fontSize: "18px", fontWeight: "bold" }
      },
      xaxis: { 
        // categories: dataSet?.dataGroup[selectedProd]?.dataYear || [] 
      },
      yaxis: yaxisConfig, // ✅ Use the dynamic y-axis config   
      tooltip: {
        enabled: true,
        shared: true, // Enable shared tooltip for multiple series values
        intersect: false, // Disable intersect to avoid conflict with shared tooltip
        y: {
          formatter: (value) => (value === null ? "No Data" : value.toLocaleString()), // Show "No Data" in tooltip
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          const tooltipItems = series.map((s, i) => {
            // Get the actual series name using the `w.config.series[i].name`
            const seriesName = w.config.series[i].name;
            const seriesColor = (w.config.colors && w.config.colors[i]) || '#000000';
      
            // Only display the y-value for each series (ignoring size or other data)
            return `
      <div class="flex items-center space-x-2">
        <span class="inline-block w-2.5 h-2.5 rounded-full" style="background-color: ${seriesColor};"></span>
        <strong class="font-semibold text-sm">${seriesName}:</strong>
        <span class="text-sm">${s[dataPointIndex] === null ? "No Data" : s[dataPointIndex].toLocaleString()}</span>
      </div>
    `;
          });
      
          // Add padding inside the tooltip container
          return `<div class="tooltip-custom" style="padding: 10px;">${tooltipItems.join('')}</div>`;
        },
      },     
      stroke: {
        curve: "smooth",
        width: 5,
      },
      markers: { size: 4 }, // Keep the size of the markers (but it won't show in the tooltip)
      dataLabels: { enabled: false },
    };

    
      const lineBarChart = {
        ...baseChartOptions,
        stroke: {
          curve: "smooth", // ✅ Keep smooth lines for better appearance
          width: 5,
        },
        markers: {
          size: 4, // ✅ Keep visible markers for clarity
        },
      };
    
      const scatterChart = {
        ...baseChartOptions,
      // title: { text:  dataSet?.title },
        xaxis: {
          categories: dataSet?.dataGroup[selectedProd]?.dataYear || [], // ✅ Ensure x-axis uses years
        },
      };
  

      const radarChart = {
        ...baseChartOptions,
        //title: { text:  dataSet?.title },
        xaxis: {
          categories: dataSet?.dataGroup[selectedProd]?.dataYear?.length ? dataSet?.dataGroup[selectedProd].dataYear : ["Default"],
        },
      };

      const bubbleChart = {
        ...baseChartOptions,
        //title: { text:  dataSet?.title},
        xaxis: {
          categories: dataSet?.dataGroup[selectedProd]?.dataYear || [], // ✅ Ensure years are used as x-axis labels
          type: "category", // Important for Bubble Chart
        },
      };
  

      const barChart = {
        ...baseChartOptions,
        //title: { text: dataSet?.title },
        plotOptions: {
          bar: { horizontal: false },
        },
        xaxis: {
          categories: dataSet?.dataGroup[selectedProd]?.dataYear || [], // ✅ Ensure x-axis uses years
        },
      };
      

  // ✅ Use `useEffect` to update `settedChart` dynamically
  useEffect(() => {
    let newChart;
  
    switch (chart) {
      case "line":
      case "area":
        newChart = (
          <div className="w-full max-w-[100%] mx-auto bg-white">
            <ApexCharts
              key={chart}
              options={lineBarChart}
              series={formattedSeries()}
              type={chart}
              height={700}
            />
          </div>
        );
        break;
  
      case "bar":
        newChart = (
          <div className="w-full max-w-[100%] mx-auto bg-white">
            <ApexCharts
              key={chart}
              options={barChart}
              series={formattedSeries()}
              type="bar"
              height={500}
            />
          </div>
        );
        break;
  
      case "scatter":
        newChart = (
          <div className="w-full max-w-[100%] mx-auto bg-white">
            <ApexCharts
              key={chart}
              options={scatterChart}
              series={formattedSeries()}
              type="scatter"
              height={500}
            />
          </div>
        );
        break;
  
      case "radar":
        newChart = (
          <div className="w-full max-w-[100%] mx-auto bg-white">
            <ApexCharts
              key={chart}
              options={radarChart}
              series={formattedSeries()}
              type="radar"
              height={500}
            />
          </div>
        );
        break;
  
      case "bubble":
        newChart = (
          <div className="w-full max-w-[100%] mx-auto bg-white">
            <ApexCharts
              key={chart}
              options={bubbleChart}
              series={formattedSeries()}
              type="bubble"
              height={500}
            />
          </div>
        );
        break;
  
      default:
        newChart = (
          <div className="w-full max-w-[100%] mx-auto bg-white">
            <ApexCharts
              key={chart}
              options={lineBarChart}
              series={formattedSeries()}
              type="line"
              height={500}
            />
          </div>
        );
    }
  
    setSettedChart(newChart);
  }, [chart, dataSet, selectedYears, selectedVariables, selectedProd]);

  useEffect(() => {
  setSelectedYears([]); // ✅ Reset years when production changes
  setSelectedVariables([]); // ✅ Reset selected variables
}, [selectedProd]);

const handleBackClick = () => {
  window.history.back(); // This will navigate to the previous page in the browser's history
};

const [activeTab, setActiveTab] = useState(1);


  // Handle checkbox change for years
  const handleCheckboxChangeYears = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedYears((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedYears((prevSelected) => prevSelected.filter((year) => year !== value));
    }
  };

  // Handle checkbox change for variables
  const handleCheckboxChangeVariables = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedVariables((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedVariables((prevSelected) => prevSelected.filter((variable) => variable !== value));
    }
  };

// Toggle Select All for Years
const handleToggleSelectAllYears = () => {
  if (selectedYears.length === optionsYear.length) {
    setSelectedYears([]); // Unselect all if everything is selected
  } else {
    setSelectedYears(optionsYear.map((option) => option.value)); // Select all years
  }
};

// Toggle Select All for Variables
const handleToggleSelectAllVariables = () => {
  if (selectedVariables.length === optionsVariables.length) {
    setSelectedVariables([]); // Unselect all if everything is selected
  } else {
    setSelectedVariables(optionsVariables.map((option) => option.value)); // Select all variables
  }
};
  return (
    <>



    {
      adminStatus && (
            <div className="fixed ml-2 top-1/2 transform -translate-y-1/2">
            <button
              onClick={handleBackClick}
              className="bg-primary text-white py-8 px-1 text-lg font-semibold rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary-400
                        hover:scale-110 transition-transform duration-200 ease-in-out"
            >
               <FaAngleLeft className="font-bold" />
            </button>
          </div>        
      )
    }

      <div className={`bg-white ${adminStatus ? 'lg:px-5' : 'lg:px-40'}`}>


      <div className="w-full mx-auto bg-white">
        {/* Tab Header */}
        <div className="flex w-full">
          <div
            onClick={() => setActiveTab(1)}
            className={`${
              activeTab === 1 ? "bg-primary" : "bg-gray-200"
            } flex-1 py-0.5`}
          >
          </div>
          <div
            onClick={() => setActiveTab(2)}
            className={`${
              activeTab === 2 ? "bg-primary" : "bg-gray-200"
            } flex-1 py-0.5`}
          >
          </div>
        </div>

        <div className="flex w-full justify-between my-3">
          {activeTab > 1 && (
            <button
              onClick={() => setActiveTab(1)}
              className="flex items-center space-x-2 bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-300 ease-in-out"
            >
              <FaAngleLeft />
              <span>Back</span>
            </button>
          )}
        </div>


        

        {/* Tab Content */}
        <div className="p-4 bg-white rounded-b-lg">
          {activeTab === 1 && (
            <div>
            <h2 className="text-xl font-bold">{dataSet?.title}</h2>

            <div className="flex items-center justify-end py-1 mx-1">
              <div className="flex items-center justify-end py-1 mx-1 border-gray-300 w-full md:w-[400px]">
                <Select
                  id="SelectProduction"
                  placeholder="Select Production"
                  options={optionsProduction}
                  value={optionsProduction.find((option) => option.value === selectedProd) || null}
                  onChange={(selected) => setSelectedProd(selected?.value ?? 0)}
                  className="text-sm w-full z-5"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      maxHeight: "72px",
                      overflowY: "auto",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 9999,
                    }),
                  }}
                />
              </div>
              <button
                onClick={() => setActiveTab(2)}
                className="flex items-center space-x-2 bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-300 ease-in-out"
              >
                <span>Continue</span>
                <FaAngleRight />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 mx-1">

                          {/* Multi-Select for Variables */}
                          <div className="my-4">
                <div className="text-sm font-medium mb-2">Select Commodity:</div>
                  <div
                    className="w-full max-h-[250px] min-h-[250px] overflow-y-auto border p-2"
                    style={{ borderRadius: "8px", borderColor: "#ddd" }}>
                      {optionsVariables.map((option) => (
                        <div key={option.value} className="flex items-center mt-2">
                          <label htmlFor={`option-${option.value}`} className="flex items-center cursor-pointer">
                            {/* Hidden checkbox input */}
                            <input
                              type="checkbox"
                              id={`option-${option.value}`}
                              name={option.value}
                              value={option.value}
                              checked={selectedVariables.includes(option.value)}
                              onChange={handleCheckboxChangeVariables}
                              className="peer hidden" // hide the checkbox but still functional
                            />
                            
                            {/* Custom styled checkbox */}
                            <div className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center 
                                            peer-checked:border-secondary peer-checked:bg-primary">
                              <div className="w-3 h-3 bg-white rounded-sm opacity-0 peer-checked:opacity-100"></div>
                            </div>
                            
                            {/* Option label */}
                            <span className="ml-2 text-gray-700">{option.label}</span>
                          </label>
                        </div>
                      ))}
                  </div>


                <button
                  onClick={handleToggleSelectAllVariables}
                  className="mt-2 px-4 py-2 bg-primary text-white text-sm rounded flex items-center space-x-2"
                >
                  {selectedVariables.length === optionsVariables.length ? (
                    <MdOutlineIndeterminateCheckBox />
                  ) : (
                    <MdOutlineCheckBox />
                  )}
                  <span>{selectedVariables.length === optionsVariables.length ? "Deselect All Commodity" : "Select All Commodity"}</span>
                </button>


                <div className="mt-3">
                  <strong>Selected Variables:</strong>
                  <div>{selectedVariables.join(", ")}</div>
                </div>
              </div>

              {/* Multi-Select for Year */}
              <div className="my-4">
                <div className="text-sm font-medium mb-2">Select Years:</div>
                  <div
                        className="w-full max-h-[250px] min-h-[250px] overflow-y-auto border p-2"
                        style={{ borderRadius: "8px", borderColor: "#ddd" }}
                      >
                        {optionsYear.map((option) => (
                          <div key={option.value} className="flex items-center mt-2">
                            <label htmlFor={`option-${option.value}`} className="flex items-center cursor-pointer">
                              {/* Hidden checkbox input */}
                              <input
                                type="checkbox"
                                id={`option-${option.value}`}
                                name={option.value}
                                value={option.value}
                                checked={selectedYears.includes(option.value)}
                                onChange={handleCheckboxChangeYears}
                                className="peer hidden" // hide the checkbox but still functional
                              />
                              
                              {/* Custom styled checkbox */}
                              <div className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center 
                                              peer-checked:border-secondary peer-checked:bg-primary">
                                <div className="w-3 h-3 bg-white rounded-sm opacity-0 peer-checked:opacity-100"></div>
                              </div>
                              
                              {/* Option label */}
                              <span className="ml-2 text-gray-700">{option.label}</span>
                            </label>
                          </div>
                        ))}
                  </div>
                <button
                  onClick={handleToggleSelectAllYears}
                  className="mt-2 px-4 py-2 bg-primary text-white text-sm rounded flex items-center space-x-2"
                >
                    {selectedYears.length === optionsYear.length ? (
                        <MdOutlineIndeterminateCheckBox />
                      ) : (
                        <MdOutlineCheckBox />
                      )}
                  <span>{selectedYears.length === optionsYear.length ? "Deselect All Years" : "Select All Years"}</span>
                </button>

                <div className="mt-3">
                  <strong>Selected Years:</strong>
                  <div>{selectedYears.join(", ")}</div>
                </div>
              </div>


            </div>
          </div>

          )}
          
          {activeTab === 2 && (
            <div>
                <h2 className="text-xl font-bold">Chart: {dataSet?.title}</h2>

                <div className="flex items-center justify-end py-1 mx-1 border-b border-gray-300">
                <div className="flex items-center justify-end py-1 mx-1 border-gray-300">
                <Select
                  id="SelectProduction"
                  placeholder="Select Production"
                  options={optionsProduction}
                  value={optionsProduction.find((option) => option.value === selectedProd) || null}
                  onChange={(selected) => setSelectedProd(selected?.value ?? 0)}
                  className="text-sm w-full z-5"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      maxHeight: "72px",
                      overflowY: "auto",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 9999,
                    }),
                  }}
                />
                </div>
                <div>
                    <div className="flex items-center justify-end py-1 mx-1 border-gray-300">
                    <Select
                      id="SelectChart"
                      placeholder="Select Chart"
                      value={chartOptions.find((option) => option.value === chart)}
                      onChange={(selectedOption) => setChart(selectedOption?.value || "line")}
                      options={chartOptions}
                      isClearable={true}
                      className="text-sm w-full md:w-auto"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          maxHeight: "72px",
                          overflowY: "auto",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          zIndex: 9999,
                        }),
                      }}
                    />
                  </div>
                </div>
              </div>

                        {/* ✅ Render Chart Dynamically */}
              <div className="w-full mx-auto bg-white lg:mt-10 z-1">
                {settedChart}
              </div>


                <div className="lg:py-10 lg:px-4">
                  <h3>Description</h3>
                  <p>{dataSet?.dataGroup[selectedProd]?.description}</p>
                </div>
            </div>
          )}
        </div>
      </div>






          {/* Chart Type Selection */}

















          <div>

          </div>



        </div>
    </>
  );
}

export default GenerateChart;
