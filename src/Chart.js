import { Chart } from "react-google-charts";
import React, { useState, useEffect } from "react";

const baseUrl = process.env.REACT_APP_BASE_URL;

let start_date = "";
let end_date = "";
let type = "";
let format = "";

function LineChart() {
  const [line, setLine] = useState([]);
  useEffect(() => {
    fetch(
      `${baseUrl}/users?start=${start_date.value}&end=${end_date.value}&type=${type.value}&format=${format}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //console.log(line);
        setLine(data);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(line);
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
