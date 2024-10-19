import Head from "next/head";
import HeadLink from "../components/panel/headlink";
import Sidebar from "../components/panel/sidebar";
import Menu from "../components/panel/menu";
import ScriptLink from "../components/panel/scriptlink";
import Footer from "../components/panel/footer";
import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import { isLogged, postReq, req } from "@/helpers";
import { useRouter } from "next/router";
import Downloader from "react-csv-downloader";
import Checker from "../components/Checker";
import { UserContext } from "@/contexts/UserContextData";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs4";
import "datatables.net-responsive-dt";
import {fx_symbols} from "../../helpers/constants"

const Calendar = () => {
  DataTable.use(DT);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);

  const nav = useRouter();
  const [exportableData, setExportableData] = useState([]);
  const [date, setDate] = useState(null);

  const toPercentage = (num) => {
    // Check if the input is a valid number
    if (typeof num !== "number" || isNaN(num)) {
      throw new Error("Input must be a valid number");
    }

    // Convert the number to a percentage
    const percentage = num * 100;

    // Return the formatted percentage string
    return `${percentage.toFixed(2)}%`;
  };

  function formatDate(dateString) {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Format the date using toLocaleDateString
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  const handleExport = (data) => {
    const header = [
      "Currency", "Event ID", "Event Code", "Date", "Time", "Actual",
      "Forecast", "Previous", "Surprise", "Trend", "Magnitude",
      "Score", "Rescaled Score", "Rescaled Trend", "Year", "Month",
      "Average Score", "Importance"
  ];

  const csvRows = [];
  csvRows.push(header); // Add header

  data.forEach(currencyData => {
      const currencyName = currencyData.name;

      currencyData.latest_events.forEach(event => {
          const eventId = event.id;
          const eventCode = event.event_code;
          const eventData = event.data;

          const row = [
              currencyName,
              eventId,
              eventCode,
              eventData.date,
              eventData.time,
              eventData.actual,
              eventData.forecast,
              eventData.previous,
              eventData.surprise,
              eventData.trend,
              eventData.magnitude,
              eventData.score,
              eventData.rescaled_score,
              eventData.rescaled_trend,
              eventData.year,
              eventData.month,
              eventData.avg_score,
              event.importance
          ];

          csvRows.push(row); // Add each row
      });
  });
    console.log("temp here");
    console.log(csvRows);
    setExportableData(csvRows);
  };

  const fetchData = async () => {
    try {
      const response = await req("fundamental?latest=true");
      if (response) {
        console.log(response);
        handleExport(response);
        setData(response);
        //setDate(response.date);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.logged) {
      fetchData();
    }
  }, [user]);

  const getBias = (score) => {
    
    if (score >= 2) return 'Bullish';
    if (score >= -2 && score < 2) return 'Neutral';
    if (score < -2) return 'Bearish';
    return 'Neutral'; // Fallback
};

const getBackground = (score) => {
  if (score >= 2) return 'bg-green';
    if (score >= -2 && score < 2) return '';
    if (score < -2) return 'bg-red';
    return 'Neutral';
}

const tableRows = fx_symbols.map((symbol) => {
  if (!data) {
    return <></>
  }
  let baseData = data.find(item => item.name === symbol.split("/")[0]); // Get the base currency data
  let quoteData = data.find(item => item.name === symbol.split("/")[1]); // Get the quote currency data
  console.log(baseData)
  console.log(quoteData)
  if (!baseData || !quoteData) return null; // Skip if data is not available

  // Calculate the score, seasonality, and trend for each event
  const events = ['mpmi', 'spmi', 'employment', 'unemployment', 'cpi', 'gdp'];
  const baseScores = {};
  const quoteScores = {};
  const baseTrends = {};
  const quoteTrends = {};
  const baseSeasonality = {};
  const quoteSeasonality = {};

  events.forEach(event => {
      if (events.includes(event)){
        const baseEvent = baseData.latest_events.find(e => e.event_code === event);
      const quoteEvent = quoteData.latest_events.find(e => e.event_code === event);

      baseScores[event] = baseEvent ? baseEvent.data.rescaled_score : 0;
      quoteScores[event] = quoteEvent ? quoteEvent.data.rescaled_score : 0;
      baseTrends[event] = baseEvent ? baseEvent.data.rescaled_trend : 0;
      quoteTrends[event] = quoteEvent ? quoteEvent.data.rescaled_trend : 0;
      baseSeasonality[event] = baseEvent ? baseEvent.data.rescaled_avg_score : 0;
      quoteSeasonality[event] = quoteEvent ? quoteEvent.data.rescaled_avg_score : 0;
      }
      
  });

  // Calculate total scores
  const totalScore = (Object.values(baseScores).reduce((acc, score) => acc + score, 0) / events.length) -
      (Object.values(quoteScores).reduce((acc, score) => acc + score, 0) / events.length);

  const totalSeasonality = (Object.values(baseSeasonality).reduce((acc, score) => acc + score, 0) / events.length) -
  (Object.values(quoteSeasonality).reduce((acc, score) => acc + score, 0) / events.length);

  const totalTrend = (Object.values(baseTrends).reduce((acc, score) => acc + score, 0) / events.length) -
  (Object.values(quoteTrends).reduce((acc, score) => acc + score, 0) / events.length);

  const gdpScore = baseScores['gdp'] - quoteScores['gdp'];
  const cpiScore = baseScores['cpi'] - quoteScores['cpi'];
  const employment = baseScores['employment'] - quoteScores['employment'];
  const unemployment = baseScores['unemployment'] - quoteScores['unemployment'];
  const mpmi = baseScores['mpmi'] - quoteScores['mpmi'];
  const spmi = baseScores['spmi'] - quoteScores['spmi'];

  return (
      <tr key={symbol}>
          <td>{symbol}</td>
          <td>{getBias(totalScore)}</td>
          <td className={getBackground(totalScore)}>{totalScore.toFixed(2)}</td>
          <td>{totalSeasonality.toFixed(2)}</td>
          <td>{totalTrend.toFixed(2)}</td>
          <td>{gdpScore.toFixed(2)}</td>
          <td>{cpiScore.toFixed(2)}</td>
          <td>{employment.toFixed(2)}</td>
          <td>{unemployment.toFixed(2)}</td>
          <td>{mpmi.toFixed(2)}</td>
          <td>{spmi.toFixed(2)}</td>
      </tr>
  );
});

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Calendar</title>
        <meta
          name="description"
          content="Commitments of Traders (COT) Reports"
        />
      </Head>

      <Checker tier={1}>
        <HeadLink />
        <Menu user={user} />
        <Sidebar />

        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12">
                  <h1>COT % CHANGE</h1>
                </div>
              </div>
            </div>
          </section>
          {loading && (
            <h4 className="text-white text-center pt-5 blink">
              PLEASE WAIT CALENDAR IS DOWNLOADING...
            </h4>
          )}

          {!loading && data && data.length > 0 && (
            <>
              <div className="content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="card-title">Commercial Positions</h5>
                          <div className="card-tools">
                            {exportableData.length > 0 && (
                              <>
                                <Downloader
                                  filename="my_data.csv"
                                  elementType="button"
                                  disabled={false} // Set to true to disable download
                                  datas={exportableData}
                                >
                                  <a className="btn btn-export btn-sm box-shadow">
                                    Export Data
                                  </a>
                                </Downloader>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="card-body">
                          <DataTable
                            className="table"
                            options={{
                              responsive: true,
                              sorting: true,
                              pageLength: 5,
                              lengthMenu: [
                                [5, 10, 20, -1],
                                [5, 10, 20, "All"],
                              ],
                              language: {
                                search: "",
                                searchPlaceholder: "Search",
                                sLengthMenu: "_MENU_",
                              },
                            }}
                          >
                            <thead>
                            <tr>
                    <th>Symbol</th>
                    <th>Bias</th>
                    <th>Score</th>
                    <th>Seasonality</th>
                    <th>Trend</th>
                    <th>GDP</th>
                    <th>CPI</th>
                    <th>Employment Change</th>
                    <th>Unemployment Rate</th>
                    <th>MPMI</th>
                    <th>SPMI</th>
                </tr>
                            </thead>
                            <tbody>
                              {tableRows}
                            </tbody>
                          </DataTable>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                </div>
              </div>
            </>
          )}
        </div>
      </Checker>

      <Footer />
      <ScriptLink />
    </>
  );
};

export default Calendar;
