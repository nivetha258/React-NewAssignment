import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect, useRef, useContext } from "react";
import { PageContext } from "../Context";

export default function DataGridDemo(props) {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const { currentPage, setCurrentPage, filters, setFilters } = useContext(PageContext);
  const isFirstRender = useRef(true);

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //   } else {
  //     if (rowSelectionModel) {
  //       props.moveToDetails(rowSelectionModel[0] - 1);
  //     }
  //   }
  // }, [rowSelectionModel]);




const selectedRow = (e)=>{
  console.log(e)
  props.moveToDetails(e[0] - 1);
}
  let columns =[];
  if(props.data.length >0 ){
     columns = Object.keys(props.data[0])
     
     if(!columns.includes("id")){
        columns.unshift("id")
     }
    columns =  columns.map((value)=>  {
      if(value === "id") {return {field : "id",headerName: "SNo",width : 50}}
      return {field : value,minWidth :100,maxWidth : 400}})   
 }
 console.log(columns)
  const rows = props.data.map((obj, i) => {
    return { ...obj, id: i + 1 };
  });
  console.log(rows)

  const handleFilterChange = (filterModel) => {
    setFilters(filterModel.items);
  };

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <h1>List</h1>
      <DataGrid
        rows={rows}
        // rowLength={ 500}
        columns={columns}
        paginationModel={currentPage}
        onPaginationModelChange={setCurrentPage}
        filterModel={{
          items: filters,
        }}
        onFilterModelChange={handleFilterChange}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
              page: 0,
            },
          },
          // filter: {
          //   filterModel: {
          //     items: [
          //       {
          //         field: 'category',
          //         operator: '>',
          //         value: '2.5',
          //       },
          //     ],
          //   },
          // },
        }}
        pageSizeOptions={[10, 25, 50]}
        slots={{ toolbar: GridToolbar }}
        // onRowSelectionModelChange={(newRowSelectionModel) => {
        //   setRowSelectionModel(newRowSelectionModel);
        // }}
        onRowSelectionModelChange = {selectedRow}
        // rowSelectionModel={rowSelectionModel}
        // onPaginationModelChange={(newPage) => {
        //     console.log(newPage)
        //    setCurrentPage(newPage)}}
        // page={currentPage}
        // onPageChange={(newPage) => {
        //   console.log(newPage)
        //   setCurrentPage(newPage)}}
      />
    </Box>
  );
}
