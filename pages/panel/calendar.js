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
  const [sentiment,setSentiment] = useState(null);
  const [scanner,setScanner] = useState(null);

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
    setExportableData(csvRows);
  };
  const formatSentiment = (d) => {
    const res = {}
    d.forEach(e => {
      const k = Object.keys(e)[0]
      res[k] = {
        short : Number(e[k]['Short']['percentage'].replace("%","")),
        long : Number(e[k]['Long']['percentage'].replace("%",""))
      }
    })
    return res
  }
  const calculate_percentage = (entry) => {
    let pair_long = 0;
    let pair_short = 0;
    if (entry.is_contract) {
      pair_long = entry.base_long;
      pair_short = entry.base_short;
    } else {
      pair_long = entry.base_long + entry.quote_long;
      pair_short = entry.base_short + entry.quote_short;
    }
    return {
      pair_long,
      pair_short,
      perc_long: toPercentage(pair_long / (pair_long + pair_short)),
      perc_short: toPercentage(pair_short / (pair_long + pair_short)),
      pair_diff: pair_long - pair_short,
    };
  }; 
  const formatScanner = (d) => {
    const res = {}
    d.data.forEach(e => {
      if (fx_symbols.includes(e.pair)){
        const calculated = calculate_percentage(e)
        res[e.pair] = {
          long : Number(calculated.perc_long.replace("%","")),
          short : Number(calculated.perc_short.replace("%",""))
        }
      }
    })
    console.log(res)
    return res
  }

  function calculateScore(longPercentage, shortPercentage) {
    if (longPercentage + shortPercentage !== 100) {
        throw new Error("The total percentage of long and short positions must equal 100.");
    }

    let score = 0;

    if (longPercentage >= 50) {
        // Long position dominant, assign positive scores
        if (longPercentage >= 90) {
            score = 5;
        } else if (longPercentage >= 80) {
            score = 4;
        } else if (longPercentage >= 70) {
            score = 3;
        } else if (longPercentage >= 60) {
            score = 2;
        } else if (longPercentage >= 50) {
            score = 1;
        }
    } else {
        // Short position dominant, assign negative scores
        if (shortPercentage >= 90) {
            score = -5;
        } else if (shortPercentage >= 80) {
            score = -4;
        } else if (shortPercentage >= 70) {
            score = -3;
        } else if (shortPercentage >= 60) {
            score = -2;
        } else if (shortPercentage >= 50) {
            score = -1;
        }
    }

    return score;
}

  const fetchData = async () => {
    try {
      const response = await req("fundamental?latest=true");
      const resp2 = await postReq("scanner-data", {});
      const resp3 = await postReq("sentiment-data", {});
      if (response && resp2 && resp3) {
        handleExport(response);
        setData(response);
        setSentiment(formatSentiment(resp3))
        setScanner(formatScanner(resp2))
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
  let base = symbol;
  let quote = symbol;
  if (symbol.includes("/")){
    base = symbol.split("/")[0]
    quote = symbol.split("/")[1]
  }
  let baseData = data.find(item => item.name === base); // Get the base currency data
  let quoteData = data.find(item => item.name === quote); // Get the quote currency data
  console.log(baseData)
  console.log(quoteData)
  if (!baseData || !quoteData) return null; // Skip if data is not available

  // Calculate the score, seasonality, and trend for each event
  const events = ['mpmi', 'spmi', 'employment', 'unemployment', 'cpi', 'gdp','interest'];
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

  let cot_score = 0;
  if (Object.keys(scanner).includes(symbol)){
    cot_score = calculateScore(scanner[symbol].long,scanner[symbol].short)
  }

  let sentiment_score = 0;
  console.log(`sentiment symbol`)
  console.log(Object.keys(sentiment))
  if (Object.keys(sentiment).includes(symbol.replace('/',''))){
    sentiment_score = calculateScore(sentiment[symbol.replace('/','')].long,sentiment[symbol.replace('/','')].short)
  }

  // Calculate total scores
  const totalScore = (Object.values(baseScores).concat([cot_score,sentiment_score]).reduce((acc, score) => acc + score, 0) / events.length) -
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
  const interest = baseScores['interest'] - quoteScores['interest']

  return (
      <tr key={symbol}>
          <td>{symbol}</td>
          <td>{getBias(totalScore)}</td>
          <td className={getBackground(totalScore)}>{totalScore.toFixed(2)}</td>
          <td>{cot_score.toFixed(2)}</td>
          <td>{sentiment_score.toFixed(2)}</td>
          <td>{totalSeasonality.toFixed(2)}</td>
          <td>{totalTrend.toFixed(2)}</td>
          <td>{gdpScore.toFixed(2)}</td>
          <td>{cpiScore.toFixed(2)}</td>
          <td>{employment.toFixed(2)}</td>
          <td>{unemployment.toFixed(2)}</td>
          <td>{interest.toFixed(2)}</td>
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

      <Checker tier={2}>
        <HeadLink />
        <Menu user={user} />
        <Sidebar />

        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12">
                  <h1>Calendar</h1>
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
                          <h5 className="card-title">Calendar</h5>
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
                    <th>COT Score</th>
                    <th>Sentiment Score</th>
                    <th>Seasonality</th>
                    <th>Trend</th>
                    <th>GDP</th>
                    <th>CPI</th>
                    <th>Employment Change</th>
                    <th>Unemployment Rate</th>
                    <th>Interest Rate</th>
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
