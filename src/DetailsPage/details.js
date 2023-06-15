// import React from 'react'
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
//
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";

//component starts
const Details = () => {
  const location = useLocation();
  const { data } = location.state || {};
  console.log(data);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Details
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {Object.keys(data).map((key, i) => {
            return (
              <div key={i}>
                <p>
                  <b
                    style={{
                      display: "inline-block",
                      width: "100px",
                      padding: "0 20px",
                    }}
                  >
                    {key}
                  </b>
                  {key === "Link" ? (
                    <span style={{ margin: 0 }}>
                      <a href={data[key]} target="_blank">
                         Go to website
                      </a>
                    </span>
                  ) : (<>
                    <span style={{ margin: 0 }}>
                      {data[key] === "" ? "Empty":data[key] === true?"True":data[key] === false ?"False":data[key] }</span>
                    </>
                  )}
                </p>
              </div>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
};

export default Details;
