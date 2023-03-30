import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { nanoid } from "nanoid";
import { data } from "../data/testData";
// import timeseriesPayload from "../timeseriesPayload.json";
import Header from "./Header";
import React, { useState, useEffect } from "react";

export default function Main() {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    fetch("./src/timeseriesPayload.json")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
        console.log(data);
      });
  }, []);

  console.log("TEST: ");
  const test = new Date("2022-01-01T00:00:00Z").getHours();

  const charts = data.map((element) => (
    <div className="content-wrapper" key={nanoid()}>
      <LineChart
        width={400}
        height={400}
        data={element}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="kWh" stroke="#8884d8" />
      </LineChart>
    </div>
  ));

  return (
    <>
      <Header></Header>
      <div className="main-wrapper">{charts}</div>
    </>
  );
}
