import React from "react";
//import { useState, useContext  } from "react";
// import { PageContext } from "../../Context";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from "recharts";

const Radarvalue = (props) => {

  //The OnClick function on Radar chart gives the entire values. So I couldn't apply the filter option.

  //const { filters, setFilters } = useContext(PageContext);

  // const filterCategory = (e) => {
   // console.log(e)
  //   setFilters([
  //     {
  //       field: "Cors",
  //       operator: "contains",
  //       value: " " ,
  //     },
  //   ]);
  // };



  let array = props.data;
  
  console.log(props.data)
  const uniqueValues = [...new Set(array.map((item) => item.Cors))];
  const valueCounts = array.reduce((counts, item) => {
    counts[item.Cors] = (counts[item.Cors] || 0) + 1;
    return counts;
  }, {});

  const data = uniqueValues.map((value) => {
    return {
      value: value,
      count: valueCounts[value],
      length: props.data.length,
    };
  });
  console.log(data);
  console.log("radar render")
  return (  
      <RadarChart outerRadius={90} width={400} height={250} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="value" />
        <PolarRadiusAxis angle={45}  />
        <Radar
          name="CORS"
          dataKey="count"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
          // onClick={filterCategory}
        />
        <Tooltip />
        <Legend />
      </RadarChart>
  );
};

export default Radarvalue;
