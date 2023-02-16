import { Chart } from "react-google-charts";
import React, { useState, useEffect } from "react";

const baseUrl = process.env.REACT_APP_BASE_URL;

function LineChart() {
  const [line, setLine] = useState([]);
  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //console.log(line);
        setLine(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <Chart
      chartType="LineChart"
      data={line}
      width="100%"
      height="400px"
      legendToggle
    />
  );
}

export default LineChart;
