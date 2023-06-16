import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useContext } from "react";
import { PageContext } from "../Context";

export default function DataGridDemo(props) {
  const { currentPage, setCurrentPage, filters, setFilters } =
    useContext(PageContext);

  const selectedRow = (e) => {
    props.moveToDetails(e[0] - 1);
  };
  let columns = [];
  if (props.data.length > 0) {
    columns = Object.keys(props.data[0]);

    if (!columns.includes("id")) {
      columns.unshift("id");
    }
    columns = columns.map((value) => {
      if (value === "id") {
        return { field: "id", headerName: "SNo", width: 50 };
      }
      return { field: value, minWidth: 100, maxWidth: 400 };
    });
  }
  const rows = props.data.map((obj, i) => {
    return { ...obj, id: i + 1 };
  });

  const handleFilterChange = (filterModel) => {
    setFilters(filterModel.items);
  };
  console.log("list render")
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <h1>List</h1>
      <DataGrid
        rows={rows}
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
        }}
        pageSizeOptions={[10, 25, 50]}
        slots={{ toolbar: GridToolbar }}
        onRowSelectionModelChange={selectedRow}
      />
    </Box>
  );
}
