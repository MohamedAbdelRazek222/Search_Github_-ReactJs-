// STEP 1 - Include Dependencies
// Include react
import React from "react";
import ReactDOM from "react-dom";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// STEP 2 - Chart Data
// const chartData = [
//   {
//     label: "Html",
//     value: "13"
//   },
//   {
//     label: "Css",
//     value: "23"
//   },
//   {
//     label: "Javascript",
//     value: "80"
//   },
  
// ];


// STEP 4 - Creating the DOM element to pass the react-fusioncharts component

const ChartComponent=({data})=>{
// STEP 3 - Creating the JSON object to store the chart configurations
const chartConfigs = {
  type: "doughnut2d", // The chart type
  width: "100%", // Width of the chart
  height: "400", // Height of the chart
  dataFormat: "json", // Data type
  dataSource: {
    // Chart Configuration
    chart: {
      caption:"Stars Per Language",
      decimals:0,
      doughnutRadius:'45%',
      showPercentValues:0,
      theme:'candy'
      // paletteColors:'#f0db4f',

      
    },
    // Chart Data
    data: data
  }
};
return (<ReactFC {...chartConfigs} />);


}



export default ChartComponent;
