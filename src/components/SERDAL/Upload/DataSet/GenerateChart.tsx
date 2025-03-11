import { useEffect, useState } from "react";
import Select from "react-select";
import ApexCharts from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faArrowDown19, faArrowDownShortWide, faArrowLeft, faFilter, faTurnDown } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";




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
        toolbar: { show: true },
        zoom: { enabled: false }, // ✅ Disable zooming
        pan: { enabled: false }, // ✅ Disable panning
      },
      title: { 
        text: `${dataSet?.title?.toUpperCase()} - ${dataSet?.dataGroup[selectedProd]?.production.toLowerCase() || "Subtitle Here"}`, // ✅ Use `<br>` for a new line
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
      
            // Only display the y-value for each series (ignoring size or other data)
            return `<div><strong>${seriesName}:</strong> ${s[dataPointIndex] === null ? "No Data" : s[dataPointIndex].toLocaleString()}</div>`;
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
              <FontAwesomeIcon icon={faArrowLeft} className="font-bold" />
            </button>
          </div>        
      )
    }

      <div className="bg-white lg:px-40">
          {/* Chart Type Selection */}


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







          {/* Wrapper for Multi-Selects & Buttons */}
          <div className="grid grid-cols-2 gap-4 border-b border-gray-300 py-2 mx-1">
            {/* Multi-Select for Year */}
            <div className="flex flex-col">
              <Select
                id="SelectYear"
                placeholder="Select Years"
                isMulti
                options={optionsYear}
                value={optionsYear.filter((option) => selectedYears.includes(option.value))}
                onChange={(selected) => setSelectedYears(selected.map((option) => option.value))}
                className="text-sm w-full"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    maxHeight: "72px", // ✅ 3 rows (each row ≈ 24px)
                    overflowY: "auto",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 9999, // ✅ Ensure dropdown stays on top
                  }),
                }}
              />
              {/* Button for Selecting All Years */}
              <button
                onClick={() => setSelectedYears(dataSet?.dataGroup[selectedProd]?.dataYear || [])} // ✅ Correct reference
                className="mt-2 px-4 py-2 bg-primary text-white text-sm rounded"
              >
                Select All Years
              </button>

            </div>

            {/* Multi-Select for Variables */}
            <div className="flex flex-col">
              <Select
                id="SelectVariable"
                placeholder="Select Variables"
                isMulti
                options={optionsVariables}
                value={optionsVariables.filter((option) => selectedVariables.includes(option.value))}
                onChange={(selected) => setSelectedVariables(selected.map((option) => option.value))}
                className="text-sm w-full"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    maxHeight: "72px", // ✅ 3 rows (each row ≈ 24px)
                    overflowY: "auto",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 9999, // ✅ Ensure dropdown stays on top
                  }),
                }}
              />
              {/* Button for Selecting All Variables */}
              <button
                onClick={() => setSelectedVariables(dataSet?.dataGroup[selectedProd]?.series.map((s) => s.name) || [])}
                className="mt-2 px-4 py-2 bg-primary text-white text-sm rounded"
              >
                Select All Variables
              </button>
            </div>

          </div>






          <div>

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
    </>
  );
}

export default GenerateChart;
