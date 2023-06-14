import React from "react";
import { useState, useContext  } from "react";
import { PageContext } from "../../Context";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarComponent = (props) => {
    const { filters, setFilters } = useContext(PageContext);

  let array = props.data
  let authCounts = {};
 
  array.forEach(obj => {
    let auth = obj.Auth ;
    let api = obj.HTTPS;
  
    if (authCounts.hasOwnProperty(auth)) {
      if (authCounts[auth].hasOwnProperty(api)) {
        authCounts[auth][api] += 1;
      } else {
        authCounts[auth][api] = 1;
      }
    } else {
      authCounts[auth] = { [api]: 1 };
    }
  });
  
  let data = Object.keys(authCounts).map(auth => ({
    Auth: auth,
    ...authCounts[auth]
  }));
  
  const filterCategory = (e) => {
    setFilters([
      {
        field: "Auth",
        operator: "contains",
        value: e.activeLabel ,
      },
    ]);
  };



  return (
    // <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={300}
        height={300}
        data={data}
        margin={{
          top: 2,
          right: 3,
          left: 2,
          bottom: 5,
        }}
        onClick={filterCategory}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Auth" label={{ value :"Auth Values", offset: 0, position :"insideBottom" }} />
        <YAxis label={{ value: 'HTTPS values', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="true" stackId="a" fill="#8884d8" />
        <Bar dataKey="false" stackId="a" fill="#82ca9d" />
      </BarChart>
    // </ResponsiveContainer>
  );
};

export default BarComponent;
