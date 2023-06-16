
import Details from "./DetailsPage/details";
import { PageContext } from "./Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Page from "./Page";

function App() {
  console.log("app render")
  const [currentPage, setCurrentPage] = useState({ pageSize: 10, page: 0 });
  const [filters, setFilters] = useState([
    {
      field: "category",
      operator: "contains",
      value: "",
    },
  ]);
  
  console.log("app",filters);
  return (
    <PageContext.Provider
      value={{ currentPage, setCurrentPage, filters, setFilters }}
    >
      <Router>       
          <Switch>
            <Route path="/details">
              <Details />
            </Route>
            <Route path="/">
              <Page />
            </Route>
          </Switch>  
      </Router>
    </PageContext.Provider>
  );
}

export default App;
