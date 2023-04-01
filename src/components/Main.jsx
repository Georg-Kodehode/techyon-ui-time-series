import { nanoid } from "nanoid";
import Header from "./Header";
import Chart from "./Chart";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import timeSeriesPayload from "../timeSeriesPayload.json";

export default function Main() {
  const [allData, setAllData] = useState([]);
  const [generatedData, setGeneratedData] = useState([]);
  // const [hours, setHours] = useState("")
  // base the mock data on the highest value (i.e. baseValue) in the provided timeseries payload
  const baseValue = timeSeriesPayload.values["2018-08-09T02:00:00Z"];
  const customerId = timeSeriesPayload.customer_id;
  const firstMeterId = timeSeriesPayload.meter_id;
  const secondMeterId = "3f6f11d";
  const numOfMeters = 2;

  useEffect(() => {
    const fromDate = new Date(timeSeriesPayload.from);
    const toDate = new Date(timeSeriesPayload.to);
    console.log(firstMeterId);
    let valuesGenerated = [];
    for (let j = 0; j < numOfMeters; j++) {
      for (let i = 0; i < 24 * 7; i++) {
        const randomValue = (Math.random() * baseValue + 1).toFixed(1);
        // const hours = i===0 ? "01" : i<11 ? "0" + (i-1) : (i-1)
        // const hours = fromDate.getHours() + i - 1
        //
        // console.log(fromDate.getHours())
        // console.log((fromDate.getHours() + i - 1) % 24)
        /** FIX comment: Undo 2 hours added to fromDate because of the timezone */
        let hours = ((fromDate.getHours() + i - 4) % 24).toString();

        // console.log("Hours: " + hours)
        if (hours === "-2") hours = `22`;
        else if (hours === "-1") hours = `23`;
        else if (parseInt(hours) < 10) hours = `0${hours}`;

        // console.log("HOURS: " + hours)
        valuesGenerated.push({
          timestamp: new Date(`2018-08-09T${hours}:00:00Z`),
          kWh: randomValue,
          meter_id: firstMeterId,
          customer_id: customerId,
        });
      }
    }
    setGeneratedData([valuesGenerated]);
  }, []);

  function addValues(el) {
    return el
      .map((obj) => parseFloat(obj.kWh))
      .reduce((acc, currentValue) => acc + currentValue, 0)
      .toFixed(1);
  }

  const charts = generatedData.map((element) => {
    // console.log("Element: " + element.timestamp)
    // const test = element.slice(0, 24)
    // const sumWeek = element
    //   .map((obj) => parseFloat(obj.kWh))
    //   .reduce((acc, currentValue) => acc + currentValue, 0)
    //   .toFixed(1);
    const sumWeek = addValues(element);

    const oneMeterDayData = element.slice(-24);
    const oneMeterWeekData = element.slice(-(generatedData[0].length / 2));
    const allMetersWeekData = [
      {
        kWh: sumWeek,
      },
    ];
    console.log(
      "Sum of the first meter's values (i.e. last half of the values): " +
        addValues(oneMeterWeekData)
    );
    const eachMeterWeekData = [
      {
        kWh: addValues(element.slice(0, generatedData[0].length / 2)),
      },
      {
        kWh: addValues(oneMeterWeekData),
      },
    ];
    // TODO: ukentlig totalsum (graf 3 skal inneholde totalsum for begge målere, nå er det kun den ene måleren//(?)
    console.log(baseValue);
    console.log("DENNe" + element.slice(-24));
    // console.log("Length of GENERATED: " + element);
    // const testerD = [{element.slice(-(generatedData[0].length / 2))}, {}]
    return (
      <>
        <Chart
          data={oneMeterDayData}
          showLabelList={true}
          upperDomainValue={60}
          chartTitle={`Daglig strømforbruk, måler-id: ${element[0].meter_id}`}
        ></Chart>
        <Chart
          data={oneMeterWeekData}
          showLabelList={false}
          upperDomainValue={60}
          chartTitle={`Ukentlig strømforbruk, måler-id: ${element[0].meter_id}`}
        ></Chart>
        <Chart
          data={allMetersWeekData}
          showLabelList={true}
          upperDomainValue={20000}
          chartTitle={`Ukentlig totalsum, alle målere til kunde ${element[0].customer_id}`}
          label={`Målere: ${firstMeterId}, ${secondMeterId}`}
        ></Chart>
        <Chart
          data={eachMeterWeekData}
          showLabelList={true}
          upperDomainValue={10000}
          chartTitle={"Ukentlig totalsum for hver måler"}
          label={[`${secondMeterId}`, `${firstMeterId}`]}
        ></Chart>
      </>
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
