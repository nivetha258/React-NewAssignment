import React, { useState } from "react";
import Overview from "./OverviewPage/overview";
import { useEffect,useCallback,useMemo } from "react";
import axios from "axios";

const Page = () => {

  const [apiData, setApiData] = useState([]);

  const fetchData = useCallback(() => {
    axios
      .get("https://api.publicapis.org/entries")
      .then((res) => {
        // console.log(res.data.entries.length , apiData.length,res.data.entries.length !== apiData.length,)
        if (res.data.entries.length !== apiData.length) {
          console.log("data changed in api")
            setApiData(res.data.entries);
            
        }
      })
      .catch((error) => {
        console.error("error", error);
      })

    },[apiData]);

    useEffect(()=>{
      fetchData()
      const intervalId = setInterval(fetchData, 6000);
      return () => {
        clearInterval(intervalId);
      };
      
    },[fetchData])
    
    console.log("page.js render")
  return (
    <div>
      <Overview data={apiData} />
    </div>
  );
};

export default Page
