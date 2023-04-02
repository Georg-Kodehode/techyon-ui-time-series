import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Chart from "./Chart";
import Footer from "./Footer";
import timeSeriesPayload from "../timeSeriesPayload.json";

/**
 * base the mock data on the highest value (i.e. baseValue) in the
 * provided timeseries payload
 */
const baseValue = timeSeriesPayload.values["2018-08-09T02:00:00Z"];
const customerId = timeSeriesPayload.customer_id;
const firstMeterId = timeSeriesPayload.meter_id;
const secondMeterId = "3f6f11d";
const numOfMeters = 2;
const fromDate = new Date(timeSeriesPayload.from);

export default function Main() {
  const [generatedData, setGeneratedData] = useState([]);

  /**
   * generate data once based on payload data. Generate data for two meters.
   * For each meter, data for one week is generated.
   */
  useEffect(() => {
    let valuesGenerated = [];
    for (let j = 0; j < numOfMeters; j++) {
      for (let i = 0; i < 24 * 7; i++) {
        const randomValue = (Math.random() * baseValue + 1).toFixed(1);
        const hours = ((fromDate.getHours() + i - 1) % 24).toString();

        valuesGenerated.push({
          timestamp: `2018-08-09T${hours}:00:00Z`,
          hours: hours < 10 ? `0${hours}:00` : `${hours}:00`,
          kWh: randomValue,
          meter_id: firstMeterId,
          customer_id: customerId,
        });
      }
    }
    // set the generated to be an array containing the valuesGenerated array
    setGeneratedData([valuesGenerated]);
  }, []);

  /**
   * function used to add together kWh values sent to it
   */
  function addValues(el) {
    return el
      .map((obj) => parseFloat(obj.kWh))
      .reduce((acc, currentValue) => acc + currentValue, 0)
      .toFixed(1);
  }

  const charts = generatedData.map((element) => {
    const sumWeek = addValues(element);
    // data for the last 24 hours, i.e. the latest day (today)
    const oneMeterDayData = element.slice(-24);
    // data for one week for one meter
    const oneMeterWeekData = element.slice(-(generatedData[0].length / 2));

    /**
     * sum of kWh values for both meters
     */
    const allMetersWeekData = [
      {
        kWh: sumWeek,
        dataKey: `Målere: ${firstMeterId}, ${secondMeterId}`,
      },
    ];
    /**
     * sum of kWh values for a week for both meters separately.
     */
    const eachMeterWeekData = [
      {
        kWh: addValues(element.slice(0, generatedData[0].length / 2)),
        dataKey: `Måler-ID: ${secondMeterId}`,
      },
      {
        kWh: addValues(oneMeterWeekData),
        dataKey: `Måler-ID: ${firstMeterId}`,
      },
    ];

    return (
      <div className="routes-wrapper" key={nanoid()}>
        <Routes>
          <Route
            path="/"
            element={
              <Chart
                data={oneMeterDayData}
                showLabelList={false}
                upperDomainValue={60}
                chartTitle={`Daglig strømforbruk, måler-ID: ${element[0].meter_id}`}
                dataKey={"hours"}
                keyProp={nanoid()}
              ></Chart>
            }
          />
          <Route
            path="/one-meter-week"
            element={
              <Chart
                data={oneMeterWeekData}
                showLabelList={false}
                upperDomainValue={60}
                chartTitle={`Ukentlig strømforbruk, måler-ID: ${element[0].meter_id}`}
                dataKey={"hours"}
                keyProp={nanoid()}
              ></Chart>
            }
          />
          <Route
            path="/all-meters-week"
            element={
              <Chart
                data={allMetersWeekData}
                showLabelList={true}
                upperDomainValue={20000}
                chartTitle={`Ukentlig totalsum, alle målere til kunde ${element[0].customer_id}`}
                dataKey={"dataKey"}
                keyProp={nanoid()}
              ></Chart>
            }
          />
          <Route
            path="each-meter-week"
            element={
              <Chart
                data={eachMeterWeekData}
                showLabelList={true}
                upperDomainValue={10000}
                chartTitle={"Ukentlig totalsum for hver måler"}
                dataKey={"dataKey"}
                keyProp={nanoid()}
              ></Chart>
            }
          />
          <Route
            path="*"
            element={
              <Chart
                data={oneMeterDayData}
                showLabelList={false}
                upperDomainValue={60}
                chartTitle={`Daglig strømforbruk, måler-ID: ${element[0].meter_id}`}
                dataKey={"hours"}
                key={nanoid()}
              ></Chart>
            }
          />
        </Routes>
      </div>
    );
  });

  return (
    <>
      <Header></Header>
      <div className="main-wrapper">{charts}</div>
      <Footer></Footer>
    </>
  );
}
