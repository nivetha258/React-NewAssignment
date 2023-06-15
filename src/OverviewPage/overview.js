import React, { useCallback } from "react";
import List from "./list";
import { useState, useEffect,memo } from "react";
import { useHistory } from "react-router-dom";
import RadarChart from "./Chart/radarChart";
import PieChart from "./Chart/pieChart";
import BarChart from "./Chart/barchart";

//
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

//component starts-------------

const Overview = memo((props) => {
  const data = props.data;
  let history = useHistory();


  const moveToDetails = (index) => {
    history.push({
      pathname: "/details",
      state: { data: data[index] },
    });
  };
  console.log("overview render")

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              Overview Page
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper>
          <h2>Charts</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <PieChart data={data} />
            <RadarChart data={data} />
            <BarChart data={data} />
          </div>
          <List data={data} moveToDetails={moveToDetails} />
        </Paper>
      </Box>
    </div>
  );
});

export default Overview;
