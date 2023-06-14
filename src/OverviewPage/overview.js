import React from "react";
import List from "./list";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import RadarChart from "./Chart/radarChart";
import PieChart from "./Chart/pieChart";
import BarChart from "./Chart/barchart";

//
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";

//component starts-------------

const Overview = () => {
  const [data, setData] = useState([]);
  let history = useHistory();

  useEffect(() => {
    axios
    .get("https://api.publicapis.org/entries")
    .then((res) => {
      console.log("response", res.data.entries);
      setData(res.data.entries);
    })
    .catch((err) => console.log("error", err));
  }, []);

  setInterval(()=>{
    axios
    .get("https://api.publicapis.org/entries")
    .then((res) => {
      console.log("response", res.data.entries.length !== data.length);
      if(res.data.entries.length == data.length){

        if (alert("Data got updated shall i refresh the page")) {
          setData(res.data.entries);
        }
                // setData(res.data.entries);
      }
  
    })
    .catch((err) => console.log("error", err));
  },600000)


  const moveToDetails = (index) => {
    history.push({
      pathname: "/details",
      state: { data: data[index] },
    });
  };

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
};

export default Overview;
