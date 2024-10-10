import Head from "next/head";
import HeadLink from "../components/panel/headlink";
import Sidebar from "../components/panel/sidebar";
import Menu from "../components/panel/menu";
import ScriptLink from "../components/panel/scriptlink";
import Footer from "../components/panel/footer";
import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import { calculateNet, formatDateLocal, getThresholdSignal, isLogged, req,get_diff_signal,get_stars } from "@/helpers";
import { useRouter } from "next/router";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Legend,
  Bar,
  ResponsiveContainer,
  LabelList
} from "recharts";
import Downloader from "react-csv-downloader";
import Checker from "../components/Checker";
import { UserContext } from "@/contexts/UserContextData";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs4";
import "datatables.net-responsive-dt";


const CustomizedLabel= (props) => {
  const { x, y, stroke, value,payload } = props;
  useEffect(() => {
    /* console.log(`data here`)
    console.log(payload)
    console.log(props) */
  },[])

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};

const CotReport = () => {
  DataTable.use(DT);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [crowdingData, setCrowdingData] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);
  const [selectedCrowded, setSelectedCrowded] = useState(null);
  const [selectedSentiment, setSelectedSentiment] = useState(null);
  const [CommcrowdingData, setCommCrowdingData] = useState([]);
  const [CommsentimentData, setCommSentimentData] = useState([]);
  const [selectedCommCrowded, setSelectedCommCrowded] = useState(null);
  const [selectedCommSentiment, setSelectedCommSentiment] = useState(null);
  const [changeData,setChangeData] = useState([]);
  const [selectedChangeSymbol,setSelectedChangeSymbol] = useState(null);
  const [changeCommData,setChangeCommData] = useState([]);
  const [selectedChangeCommSymbol,setSelectedChangeCommSymbol] = useState(null);
  const [keys, setKeys] = useState([]);
  const nav = useRouter();
  const [exportableData, setExportableData] = useState([]);
  const [date, setDate] = useState(null);
  // dates filter
  const [dates,setDates] = useState([]);
  const [selectedDate,setSelectedDate] = useState(null)
  // economic calendar
  const [calendarData,setCalendarData] = useState([]);
  const [graphCalendarData,setGraphCalendarData] = useState([])
  const [currencyOptions,setCurrencyOptions] = useState([])
  const [calendarCurrency,setCalendarCurrency] = useState(null)
  const [calendarEvent,setCalendarEvent] = useState("gdp");

  const toPercentage = (num) => {
    // Check if the input is a valid number
    if (typeof num !== "number" || isNaN(num)) {
      //throw new Error("Input must be a valid number");
      return "0%"
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

  const handleExport = (dt) => {
    console.log(dt);
    const temp = [
      // Add headers for your CSV data
      [
        "ID",
        "Pair",
        "Base Long",
        "Base Short",
        "Base Net Position",
        "Quote Long",
        "Quote Short",
        "Quote Net Position",
        "Base Comm Long",
        "Base Comm Short",
        "Base Comm Net Position",
        "Quote Comm Long",
        "Quote Comm Short",
        "Quote Comm Net Position",
        "Base Nonrep Long",
        "Base Nonrep Short",
        "Base Nonrep Net Position",
        "Quote Nonrep Long",
        "Quote Nonrep Short",
        "Quote Nonrep Net Position",
        "Pair Long",
        "Pair Short",
        "Pair Net Position",
        "Pair Percentage Change",
        "Pair Comm Percentage Change",
        "Pair 2 Week Change",
        "Pair 3 Week Change",
        "Pair 4 Week Change",
        "Pair 5 Week Change",
        "Pair 6 Week Change",
        "Pair 7 Week Change",
        "Pair 8 Week Change",
        "Pair 9 Week Change",
        "Pair 10 Week Change",
        "Pair Comm 2 Week Change",
        "Pair Comm 3 Week Change",
        "Pair Comm 4 Week Change",
        "Pair Comm 5 Week Change",
        "Pair Comm 6 Week Change",
        "Pair Comm 7 Week Change",
        "Pair Comm 8 Week Change",
        "Pair Comm 9 Week Change",
        "Pair Comm 10 Week Change",
        "Pair Percentage Change Open Interest",
        "Pair 2 Week Change Open Interest",
        "Pair 3 Week Change Open Interest",
        "Pair 4 Week Change Open Interest",
        "Pair 5 Week Change Open Interest",
        "Pair 6 Week Change Open Interest",
        "Pair 7 Week Change Open Interest",
        "Pair 8 Week Change Open Interest",
        "Pair 9 Week Change Open Interest",
        "Pair 10 Week Change Open Interest",
        "Noncomm Diff Absolute Long",
        "Noncomm Diff Absolute Short",
        "Noncomm 2 Diff Absolute Long",
        "Noncomm 3 Diff Absolute Long",
        "Noncomm 4 Diff Absolute Long",
        "Noncomm 5 Diff Absolute Long",
        "Noncomm 6 Diff Absolute Long",
        "Noncomm 7 Diff Absolute Long",
        "Noncomm 8 Diff Absolute Long",
        "Noncomm 9 Diff Absolute Long",
        "Noncomm 10 Diff Absolute Long",
        "Noncomm 2 Diff Absolute Short",
        "Noncomm 3 Diff Absolute Short",
        "Noncomm 4 Diff Absolute Short",
        "Noncomm 5 Diff Absolute Short",
        "Noncomm 6 Diff Absolute Short",
        "Noncomm 7 Diff Absolute Short",
        "Noncomm 8 Diff Absolute Short",
        "Noncomm 9 Diff Absolute Short",
        "Noncomm 10 Diff Absolute Short",
        "Comm Diff Absolute Long",
        "Comm Diff Absolute Short",
        "Comm 2 Diff Absolute Long",
        "Comm 3 Diff Absolute Long",
        "Comm 4 Diff Absolute Long",
        "Comm 5 Diff Absolute Long",
        "Comm 6 Diff Absolute Long",
        "Comm 7 Diff Absolute Long",
        "Comm 8 Diff Absolute Long",
        "Comm 9 Diff Absolute Long",
        "Comm 10 Diff Absolute Long",
        "Comm 2 Diff Absolute Short",
        "Comm 3 Diff Absolute Short",
        "Comm 4 Diff Absolute Short",
        "Comm 5 Diff Absolute Short",
        "Comm 6 Diff Absolute Short",
        "Comm 7 Diff Absolute Short",
        "Comm 8 Diff Absolute Short",
        "Comm 9 Diff Absolute Short",
        "Comm 10 Diff Absolute Short",
        "Sentiment",
        "Is Contract",
        "Date Interval",
      ],
      ...dt.map((e) => [
        e.id,
        e.pair,
        e.base_long,
        e.base_short,
        e.base_net_position,
        e.quote_long,
        e.quote_short,
        e.quote_net_position,
        e.base_comm_long,
        e.base_comm_short,
        e.base_comm_net_position,
        e.quote_comm_long,
        e.quote_comm_short,
        e.quote_comm_net_position,
        e.base_nonrep_long,
        e.base_nonrep_short,
        e.base_nonrep_net_position,
        e.quote_nonrep_long,
        e.quote_nonrep_short,
        e.quote_nonrep_net_position,
        e.pair_long,
        e.pair_short,
        e.pair_net_position,
        e.pair_pct_change.toFixed(10),
        e.pair_comm_pct_change.toFixed(10),
        e.pair_2_week_change.toFixed(10),
        e.pair_3_week_change.toFixed(10),
        e.pair_4_week_change.toFixed(10),
        e.pair_5_week_change.toFixed(10),
        e.pair_6_week_change.toFixed(10),
        e.pair_7_week_change.toFixed(10),
        e.pair_8_week_change.toFixed(10),
        e.pair_9_week_change.toFixed(10),
        e.pair_10_week_change.toFixed(10),
        e.pair_comm_2_week_change.toFixed(10),
        e.pair_comm_3_week_change.toFixed(10),
        e.pair_comm_4_week_change.toFixed(10),
        e.pair_comm_5_week_change.toFixed(10),
        e.pair_comm_6_week_change.toFixed(10),
        e.pair_comm_7_week_change.toFixed(10),
        e.pair_comm_8_week_change.toFixed(10),
        e.pair_comm_9_week_change.toFixed(10),
        e.pair_comm_10_week_change.toFixed(10),
        e.pair_pct_change_open_interest.toFixed(10),
        e.pair_2_week_change_open_interest.toFixed(10),
        e.pair_3_week_change_open_interest.toFixed(10),
        e.pair_4_week_change_open_interest.toFixed(10),
        e.pair_5_week_change_open_interest.toFixed(10),
        e.pair_6_week_change_open_interest.toFixed(10),
        e.pair_7_week_change_open_interest.toFixed(10),
        e.pair_8_week_change_open_interest.toFixed(10),
        e.pair_9_week_change_open_interest.toFixed(10),
        e.pair_10_week_change_open_interest.toFixed(10),
        e.noncomm_diff_absolute_long,
        e.noncomm_diff_absolute_short,
        e.noncomm_2_diff_absolute_long,
        e.noncomm_3_diff_absolute_long,
        e.noncomm_4_diff_absolute_long,
        e.noncomm_5_diff_absolute_long,
        e.noncomm_6_diff_absolute_long,
        e.noncomm_7_diff_absolute_long,
        e.noncomm_8_diff_absolute_long,
        e.noncomm_9_diff_absolute_long,
        e.noncomm_10_diff_absolute_long,
        e.noncomm_2_diff_absolute_short,
        e.noncomm_3_diff_absolute_short,
        e.noncomm_4_diff_absolute_short,
        e.noncomm_5_diff_absolute_short,
        e.noncomm_6_diff_absolute_short,
        e.noncomm_7_diff_absolute_short,
        e.noncomm_8_diff_absolute_short,
        e.noncomm_9_diff_absolute_short,
        e.noncomm_10_diff_absolute_short,
        e.comm_diff_absolute_long,
        e.comm_diff_absolute_short,
        e.comm_2_diff_absolute_long,
        e.comm_3_diff_absolute_long,
        e.comm_4_diff_absolute_long,
        e.comm_5_diff_absolute_long,
        e.comm_6_diff_absolute_long,
        e.comm_7_diff_absolute_long,
        e.comm_8_diff_absolute_long,
        e.comm_9_diff_absolute_long,
        e.comm_10_diff_absolute_long,
        e.comm_2_diff_absolute_short,
        e.comm_3_diff_absolute_short,
        e.comm_4_diff_absolute_short,
        e.comm_5_diff_absolute_short,
        e.comm_6_diff_absolute_short,
        e.comm_7_diff_absolute_short,
        e.comm_8_diff_absolute_short,
        e.comm_9_diff_absolute_short,
        e.comm_10_diff_absolute_short,
        e.sentiment,
        e.is_contract,
        e.date_interval,
      ]),
    ];
    console.log(temp);
    setExportableData(temp);
  };

  const fetchMainData = async (date) => {
    setLoading(true);
    let url = "data";
    if (date){
      url = `data?date=${date}`
    }else{
      url = `data`
    }
    const response = await req(url);
      console.log("formating export");
      handleExport(response[0].data);
      setData(response[0].data);
      setDate(response[0].date);
    setLoading(false)
  }

  const fetchCalendarData = async () => {
    const response = await req("fundamental");
    if (response) {
      console.log(response);
      setCalendarData(response);
      const currs = response.map(e => e.name)
      setCurrencyOptions(currs)
      setCalendarCurrency(currs[0])
      //setDate(response.date);
    }
  }

  const fetchData = async () => {
    try {
      const resp = await req("dates")
      setDates(resp)
      setSelectedDate(resp[0].date)
      const response1 = await req("crowding_positions");
      setCrowdingData(response1);
      const response2 = await req("net_speculative");
      setSentimentData(response2);
      const response3 = await req("crowding_comm_positions");
      setCommCrowdingData(response3);
      const response4 = await req("net_comm_speculative");
      setCommSentimentData(response4);
      const response5 = await req("general-change-data")
      setChangeData(response5)
      const response6 = await req("general-comm-change-data")
      setChangeCommData(response6)
      fetchCalendarData();
      const keys = Object.keys(response1);
      console.log(keys);
      setKeys(keys);
      setSelectedCrowded(keys[0]);
      setSelectedSentiment(keys[0]);
      setSelectedCommCrowded(keys[0]);
      setSelectedCommSentiment(keys[0]);
      setSelectedChangeSymbol(keys[0])
      setSelectedChangeCommSymbol(keys[0])
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (e, target) => {
    const o = e.target;
    if (target === "crowded") {
      setSelectedCrowded(o.value);
    } else {
      setSelectedSentiment(o.value);
    }
  };

  const handleSelectCommChange = (e, target) => {
    const o = e.target;
    if (target === "calendar"){
      setCalendarCurrency(o.value)
    }
    if (target === "crowded") {
      setSelectedCommCrowded(o.value);
    }if (target == "nonchange"){
      setSelectedChangeSymbol(o.value);
    }if (target == "change"){
      setSelectedChangeCommSymbol(o.value);
    } else {
      setSelectedCommSentiment(o.value);
    }
  };

  useEffect(() => {
    if (calendarCurrency && calendarEvent){
      const tar = calendarData.filter(e => e.name === calendarCurrency)[0]
      const tar_data = tar.latest_events.filter(e=> e.event_code === calendarEvent)[0]
      const res = tar_data.data.map(e => {return {date : e.date,forecast : Number(e.forecast.toFixed(2)),actual: Number(e.actual.toFixed(2)),previous:Number(e.previous.toFixed(2))}})
      console.log(res)
      setGraphCalendarData(res)
    }
  },[calendarCurrency,calendarEvent])

  useEffect(() => {
    if (selectedDate){
      fetchMainData(selectedDate)
    }
  },[user,selectedDate])

  useEffect(() => {
    if (user.logged) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {}, [data]);

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

  const calculate_comm_percentage = (entry) => {
    let pair_long = 0;
    let pair_short = 0;
    if (entry.is_contract) {
      pair_long = entry.base_comm_long;
      pair_short = entry.base_comm_short;
    } else {
      pair_long = entry.base_comm_long + entry.quote_comm_long;
      pair_short = entry.base_comm_short + entry.quote_comm_short;
    }
    return {
      pair_long,
      pair_short,
      perc_long: toPercentage(pair_long / (pair_long + pair_short)),
      perc_short: toPercentage(pair_short / (pair_long + pair_short)),
      pair_diff: pair_long - pair_short,
    };
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>COT Report Exclusive for Admin</title>
        <meta name="description" content="Frantzdy Trading Co - COT Report" />
      </Head>
      <Checker only_admin={true} strict_admin={true}>
        <HeadLink />
        <Menu user={user} />
        <Sidebar />

        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-8">
                  <h1>COT REPORTS</h1>
                </div>
                <div className="col-sm-4">
                <select
                              className="form-control form-control-sm form-control-select"
                              onChange={(e) =>
                                setSelectedDate(e.target.value)
                              }
                              value={selectedDate}

                            >
                              <option selected="selected">
                                Select Date
                              </option>
                              {dates.map((e, i) => {
                                return (
                                  <option key={e.date} value={e.date}>
                                    {formatDateLocal(e.date)}
                                  </option>
                                );
                              })}
                            </select>
                </div>
              </div>
            </div>
          </section>

          {loading && (
            <h4 className="text-white text-center pt-5 blink">
              PLEASE WAIT COT REPORTS ARE DOWNLOADING...
            </h4>
          )}

          {!loading && (
            <>
              <div className="content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">Commercial Report</h3>

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
                                    Export COT Data
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
                                <th>Pair</th>
                                <th>Base Long</th>
                                <th>Base Short</th>
                                <th>Base Net Position</th>
                                <th>Quote Long</th>
                                <th>Quote Short</th>
                                <th>Quote Net Position</th>
                                <th>Pair Long</th>
                                <th>Pair Short</th>
                                <th>Pair Net Position</th>
                                <th>% Pair long</th>
                                <th>% Pair Short</th>
                                <th>% Diff Absolute Long</th>
                                <th>% Diff Absolute Short</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data && (
                                <>
                                  {data.map((entry, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{entry.pair}</td>
                                        <td>{entry.base_comm_long}</td>
                                        <td>{entry.base_comm_short}</td>
                                        <td>
                                          {entry.base_comm_long -
                                            entry.base_comm_short}
                                        </td>
                                        <td>{entry.quote_comm_long}</td>
                                        <td>{entry.quote_comm_short}</td>
                                        <td>
                                          {entry.quote_comm_long -
                                            entry.quote_comm_short}
                                        </td>
                                        <td>
                                          {
                                            calculate_comm_percentage(entry)
                                              .pair_long
                                          }
                                        </td>
                                        <td>
                                          {
                                            calculate_comm_percentage(entry)
                                              .pair_short
                                          }
                                        </td>
                                        <td>
                                          {calculate_comm_percentage(entry)
                                            .pair_long -
                                            calculate_comm_percentage(entry)
                                              .pair_short}
                                        </td>
                                        <td>
                                          {
                                            calculate_comm_percentage(entry)
                                              .perc_long
                                          }
                                        </td>
                                        <td>
                                          {
                                            calculate_comm_percentage(entry)
                                              .perc_short
                                          }
                                        </td>
                                        <td>{entry.comm_diff_absolute_long}</td>
                                        <td>
                                          {entry.comm_diff_absolute_short}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </>
                              )}
                            </tbody>
                          </DataTable>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">Non Commercial Report</h3>

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
                                    Export COT Data
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
                                <th>Pair</th>
                                <th>Base Long</th>
                                <th>Base Short</th>
                                <th>Base Net Position</th>
                                <th>Quote Long</th>
                                <th>Quote Short</th>
                                <th>Quote Net Position</th>
                                <th>Pair Long</th>
                                <th>Pair Short</th>
                                <th>Pair Net Position</th>
                                <th>% Pair long</th>
                                <th>% Pair Short</th>
                                <th>% Diff Absolute Long</th>
                                <th>% Diff Absolute Short</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data && (
                                <>
                                  {data.map((entry, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{entry.pair}</td>
                                        <td>{entry.base_long}</td>
                                        <td>{entry.base_short}</td>
                                        <td>
                                          {entry.base_long - entry.base_short}
                                        </td>
                                        <td>{entry.quote_long}</td>
                                        <td>{entry.quote_short}</td>
                                        <td>
                                          {entry.quote_long - entry.quote_short}
                                        </td>
                                        <td>
                                          {
                                            calculate_percentage(entry)
                                              .pair_long
                                          }
                                        </td>
                                        <td>
                                          {
                                            calculate_percentage(entry)
                                              .pair_short
                                          }
                                        </td>
                                        <td>
                                          {calculate_percentage(entry)
                                            .pair_long -
                                            calculate_percentage(entry)
                                              .pair_short}
                                        </td>
                                        <td>
                                          {
                                            calculate_percentage(entry)
                                              .perc_long
                                          }
                                        </td>
                                        <td>
                                          {
                                            calculate_percentage(entry)
                                              .perc_short
                                          }
                                        </td>
                                        <td>
                                          {entry.noncomm_diff_absolute_long}
                                        </td>
                                        <td>
                                          {entry.noncomm_diff_absolute_short}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </>
                              )}
                            </tbody>
                          </DataTable>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">
                            % Change in Commercial Positions
                          </h3>

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
                                <th>Pair</th>
                                <th>1 Week Change</th>
                                <th>2 Week Change</th>
                                <th>3 Week Change</th>
                                <th>4 Week Change</th>
                                <th>5 Week Change</th>
                                <th>6 Week Change</th>
                                <th>7 Week Change</th>
                                <th>8 Week Change</th>
                                <th>9 Week Change</th>
                                <th>10 Week Change</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data && (
                                <>
                                  {data.map((entry, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{entry.pair}</td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_comm_pct_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_comm_pct_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_comm_pct_change.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_comm_2_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_comm_2_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_comm_2_week_change.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_comm_3_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_comm_3_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_comm_3_week_change.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_comm_4_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_comm_4_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_comm_4_week_change.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_comm_5_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_comm_5_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_comm_5_week_change.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_comm_6_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_comm_6_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_comm_6_week_change.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_comm_7_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_comm_7_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_comm_7_week_change.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_comm_8_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_comm_8_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_comm_8_week_change.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_comm_9_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_comm_9_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_comm_9_week_change.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_comm_10_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_comm_10_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_comm_10_week_change.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </>
                              )}
                            </tbody>
                          </DataTable>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">
                            % Change in Non-Commercial Positions
                          </h3>

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
                                <th>Pair</th>
                                <th>1 Week Change</th>
                                <th>2 Week Change</th>
                                <th>3 Week Change</th>
                                <th>4 Week Change</th>
                                <th>5 Week Change</th>
                                <th>6 Week Change</th>
                                <th>7 Week Change</th>
                                <th>8 Week Change</th>
                                <th>9 Week Change</th>
                                <th>10 Week Change</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data && (
                                <>
                                  {data.map((entry, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{entry.pair}</td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_pct_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_pct_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_pct_change.toFixed(2)}%
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_2_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_2_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_2_week_change.toFixed(2)}%
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_3_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_3_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_3_week_change.toFixed(2)}%
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_4_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_4_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_4_week_change.toFixed(2)}%
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_5_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_5_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_5_week_change.toFixed(2)}%
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_6_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_6_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_6_week_change.toFixed(2)}%
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_7_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_7_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_7_week_change.toFixed(2)}%
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_8_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_8_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_8_week_change.toFixed(2)}%
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_9_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_9_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_9_week_change.toFixed(2)}%
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_10_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_10_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_10_week_change.toFixed(2)}
                                          %
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </>
                              )}
                            </tbody>
                          </DataTable>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">Non-Reportable Report</h3>

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
                                    Export COT Data
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
                                <th>Pair</th>
                                <th>Base Long</th>
                                <th>Base Short</th>
                                <th>Base Net Position</th>
                                <th>% Base long</th>
                                <th>% Base Short</th>
                                <th>Quote Long</th>
                                <th>Quote Short</th>
                                <th>Quote Net Position</th>
                                <th>% Quote long</th>
                                <th>% Quote Short</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data && (
                                <>
                                  {data.map((entry, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{entry.pair}</td>
                                        <td>{entry.base_nonrep_long}</td>
                                        <td>{entry.base_nonrep_short}</td>
                                        <td>
                                          {entry.base_nonrep_long -
                                            entry.base_nonrep_short}
                                        </td>
                                        <td>
                                          {toPercentage(
                                            entry.base_nonrep_long /
                                              (entry.base_nonrep_long +
                                                entry.base_nonrep_short)
                                          )}
                                        </td>
                                        <td>
                                          {toPercentage(
                                            entry.base_nonrep_short /
                                              (entry.base_nonrep_long +
                                                entry.base_nonrep_short)
                                          )}
                                        </td>
                                        <td>{entry.quote_nonrep_long}</td>
                                        <td>{entry.quote_nonrep_short}</td>
                                        <td>
                                          {entry.quote_nonrep_long -
                                            entry.quote_nonrep_short}
                                        </td>
                                        <td>
                                          {toPercentage(
                                            entry.quote_nonrep_long /
                                              (entry.quote_nonrep_long +
                                                entry.quote_nonrep_short)
                                          )}
                                        </td>
                                        <td>
                                          {toPercentage(
                                            entry.quote_nonrep_short /
                                              (entry.quote_nonrep_long +
                                                entry.quote_nonrep_short)
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </>
                              )}
                            </tbody>
                          </DataTable>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">Sentiments</h3>

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
                                    Export COT Data
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
                                <th>Pair</th>
                                <th>Long</th>
                                <th>Short</th>
                                <th>Net Position</th>
                                <th>Sentiment</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data && (
                                <>
                                  {data.map((entry, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{entry.pair}</td>
                                        <td>{entry.pair_long}</td>
                                        <td>{entry.pair_short}</td>
                                        <td>{calculateNet(entry)}</td>
                                        <td>
                                          {getThresholdSignal(
                                            entry.pair_pct_change
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </>
                              )}
                            </tbody>
                          </DataTable>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12 ">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="card-title">COMMERCIAL SIGNAL</h5>
                          <div className="card-tools">
                            {exportableData.length > 0 && (
                              <>
                                <Downloader
                                  filename="my_data.csv"
                                  elementtype="button"
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
                            className="table table-borderless table-sm"
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
                                <th>Pair</th>
                                <th>Overall</th>
                                <th>3 Week</th>
                                <th>3 Week % Net Shift</th>
                                <th>5 Week</th>
                                <th>5 Week % Net Shift</th>
                                <th>ADR</th>
                                <th>Long Term</th>
                                <th>Sentiment</th>
                                <th>% Long</th>
                                <th>% Short</th>
                                <th>Crowded Market Alert</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data &&
                                data.length > 0 &&
                                data.map((e, i) => {
                                  return (
                                    <tr>
                                      <td>{e.pair}</td>
                                      <td>
                                        {getThresholdSignal(
                                          e.pair_comm_pct_change
                                        )}
                                      </td>
                                      <td>
                                        {getThresholdSignal(
                                          e.pair_comm_3_week_change
                                        )}
                                      </td>
                                      <td>{e.pair_comm_3_week_change}</td>
                                      <td>
                                        {getThresholdSignal(
                                          e.pair_comm_5_week_change
                                        )}
                                      </td>
                                      <td>{e.pair_comm_5_week_change}</td>
                                      <td>60</td>
                                      <td>
                                        {get_diff_signal(
                                          e.comm_10_diff_absolute_long,
                                          e.comm_10_diff_absolute_short
                                        )}
                                      </td>
                                      <td>
                                        {get_diff_signal(
                                          e.comm_diff_absolute_long,
                                          e.comm_diff_absolute_short
                                        )}
                                      </td>
                                      <td>
                                        <div
                                          className="progress progress-sm"
                                          style={{ height: "15px" }}
                                        >
                                          <div
                                            className="progress-bar progress-bar-striped progress-bar-animated"
                                            aria-valuenow={toPercentage(
                                              (e.base_comm_long +
                                                e.quote_comm_long) /
                                                (e.base_comm_long +
                                                  e.base_comm_short +
                                                  e.quote_comm_long +
                                                  e.quote_comm_short)
                                            ).replace("%", "")}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style={{
                                              width: toPercentage(
                                                (e.base_comm_long +
                                                  e.quote_comm_long) /
                                                  (e.base_comm_long +
                                                    e.base_comm_short +
                                                    e.quote_comm_long +
                                                    e.quote_comm_short)
                                              ),
                                            }}
                                          ></div>
                                        </div>
                                        {toPercentage(
                                          (e.base_comm_long +
                                            e.quote_comm_long) /
                                            (e.base_comm_long +
                                              e.base_comm_short +
                                              e.quote_comm_long +
                                              e.quote_comm_short)
                                        )}
                                      </td>
                                      <td>
                                        <div
                                          className="progress progress-sm"
                                          style={{ height: "15px" }}
                                        >
                                          <div
                                            className="progress-bar progress-bar-striped progress-bar-animated"
                                            aria-valuenow={toPercentage(
                                              (e.base_comm_short +
                                                e.quote_comm_short) /
                                                (e.base_comm_long +
                                                  e.base_comm_short +
                                                  e.quote_comm_long +
                                                  e.quote_comm_short)
                                            ).replace("%", "")}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style={{
                                              width: toPercentage(
                                                (e.base_comm_short +
                                                  e.quote_comm_short) /
                                                  (e.base_comm_long +
                                                    e.base_comm_short +
                                                    e.quote_comm_long +
                                                    e.quote_comm_short)
                                              ),
                                            }}
                                          ></div>
                                        </div>
                                        {toPercentage(
                                          (e.base_comm_short +
                                            e.quote_comm_short) /
                                            (e.base_comm_long +
                                              e.base_comm_short +
                                              e.quote_comm_long +
                                              e.quote_comm_short)
                                        )}
                                      </td>
                                      <td>
                                        {new Array(
                                          get_stars(
                                            e.comm_diff_absolute_long,
                                            e.comm_diff_absolute_short
                                          )
                                        )
                                          .fill(0)
                                          .map(() => {
                                            return (
                                              <span className="fa fa-star checked"></span>
                                            );
                                          })}
                                        {new Array(
                                          5 -
                                            get_stars(
                                              e.comm_diff_absolute_long,
                                              e.comm_diff_absolute_short
                                            )
                                        )
                                          .fill(0)
                                          .map(() => {
                                            return (
                                              <span className="fa fa-star"></span>
                                            );
                                          })}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </DataTable>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 ">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="card-title">NON-COMMERCIAL SIGNAL</h5>
                          <div className="card-tools">
                            {exportableData.length > 0 && (
                              <>
                                <Downloader
                                  filename="my_data.csv"
                                  elementtype="button"
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
                            className="table table-borderless table-sm"
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
                                <th>Pair</th>
                                <th>Overall</th>
                                <th>3 Week</th>
                                <th>3 Week % Net Shift</th>
                                <th>5 Week</th>
                                <th>5 Week % Net Shift</th>
                                <th>Long Term</th>
                                <th>Sentiment</th>
                                <th>% Long</th>
                                <th>% Short</th>
                                <th>Crowded Market Alert</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data &&
                                data.length > 0 &&
                                data.map((e, i) => {
                                  return (
                                    <tr>
                                      <td>{e.pair}</td>

                                      <td>
                                        {getThresholdSignal(e.pair_pct_change)}
                                      </td>
                                      <td>
                                        {getThresholdSignal(
                                          e.pair_3_week_change
                                        )}
                                      </td>
                                      <td>{e.pair_3_week_change}</td>
                                      <td>
                                        {getThresholdSignal(
                                          e.pair_5_week_change
                                        )}
                                      </td>

                                      <td>{e.pair_5_week_change}</td>
                                      {/* <td>60</td> */}
                                      <td>
                                        {get_diff_signal(
                                          e.noncomm_10_diff_absolute_long,
                                          e.noncomm_10_diff_absolute_short
                                        )}
                                      </td>
                                      <td>
                                        {get_diff_signal(
                                          e.noncomm_diff_absolute_long,
                                          e.noncomm_diff_absolute_short
                                        )}
                                      </td>
                                      <td>
                                        <div
                                          className="progress progress-sm"
                                          style={{ height: "15px" }}
                                        >
                                          <div
                                            className="progress-bar progress-bar-striped progress-bar-animated"
                                            aria-valuenow={toPercentage(
                                              (e.base_long + e.quote_long) /
                                                (e.base_long +
                                                  e.base_short +
                                                  e.quote_long +
                                                  e.quote_short)
                                            ).replace("%", "")}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style={{
                                              width: toPercentage(
                                                (e.base_long + e.quote_long) /
                                                  (e.base_long +
                                                    e.base_short +
                                                    e.quote_long +
                                                    e.quote_short)
                                              ),
                                            }}
                                          ></div>
                                        </div>
                                        {toPercentage(
                                          (e.base_long + e.quote_long) /
                                            (e.base_long +
                                              e.base_short +
                                              e.quote_long +
                                              e.quote_short)
                                        )}
                                      </td>
                                      <td>
                                        <div
                                          className="progress progress-sm"
                                          style={{ height: "15px" }}
                                        >
                                          <div
                                            className="progress-bar progress-bar-striped progress-bar-animated"
                                            aria-valuenow={toPercentage(
                                              (e.base_short + e.quote_short) /
                                                (e.base_long +
                                                  e.base_short +
                                                  e.quote_long +
                                                  e.quote_short)
                                            ).replace("%", "")}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style={{
                                              width: toPercentage(
                                                (e.base_short + e.quote_short) /
                                                  (e.base_long +
                                                    e.base_short +
                                                    e.quote_long +
                                                    e.quote_short)
                                              ),
                                            }}
                                          ></div>
                                        </div>
                                        {toPercentage(
                                          (e.base_short + e.quote_short) /
                                            (e.base_long +
                                              e.base_short +
                                              e.quote_long +
                                              e.quote_short)
                                        )}
                                      </td>
                                      <td>
                                        {new Array(
                                          get_stars(
                                            e.noncomm_diff_absolute_long,
                                            e.noncomm_diff_absolute_short
                                          )
                                        )
                                          .fill(0)
                                          .map(() => {
                                            return (
                                              <span className="fa fa-star checked"></span>
                                            );
                                          })}
                                        {new Array(
                                          5 -
                                            get_stars(
                                              e.noncomm_diff_absolute_long,
                                              e.noncomm_diff_absolute_short
                                            )
                                        )
                                          .fill(0)
                                          .map(() => {
                                            return (
                                              <span className="fa fa-star"></span>
                                            );
                                          })}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </DataTable>
                        </div>
                      </div>
                    </div>
                  </div> 

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="card-title">
                            Net Speculative Data (Commercial)
                          </h5>
                          <div className="card-tools">
                            <select
                              className="form-control form-control-sm form-control-select"
                              onChange={(e) =>
                                handleSelectCommChange(e, "sentiment")
                              }
                              value={selectedCommSentiment}
                            >
                              <option selected="selected">
                                Select Symbol Name
                              </option>
                              {keys.map((e, i) => {
                                return (
                                  <option key={e} value={e}>
                                    {e}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="card-body" style={{ fontSize: "11px" }}>
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                              data={
                                CommsentimentData &&
                                CommsentimentData[selectedCommSentiment]
                              }
                            >
                              <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#05FFFF"
                              />
                              <CartesianGrid
                                stroke="#0b4a89"
                                strokeDasharray="5 5"
                              />
                              <XAxis
                                dataKey="date"
                                tick={{ fill: "#b6ccf5" }}
                                tickLine={{ stroke: "#b6ccf5" }}
                              />
                              <YAxis
                                tick={{ fill: "#b6ccf5" }}
                                tickLine={{ stroke: "#b6ccf5" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#083D72",
                                }}
                                itemStyle={{ color: "#b6ccf5" }}
                                cursor={{ stroke: "transparent" }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="card-title">
                            Crowding Data (Commercial)
                          </h5>
                          <div className="card-tools">
                            <select
                              className="form-control form-control-sm form-control-select"
                              onChange={(e) =>
                                handleSelectCommChange(e, "crowded")
                              }
                              value={selectedCommCrowded}
                            >
                              <option selected="selected">
                                Select Symbol Name
                              </option>
                              {keys.map((e, i) => {
                                return (
                                  <option key={e} value={e}>
                                    {e}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="card-body" style={{ fontSize: "11px" }}>
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                              data={
                                CommcrowdingData &&
                                CommcrowdingData[selectedCommCrowded]
                              }
                            >
                              <CartesianGrid
                                stroke="#0b4a89"
                                strokeDasharray="5 5"
                              />
                              <XAxis
                                dataKey="date"
                                tick={{ fill: "#b6ccf5" }}
                                tickLine={{ stroke: "#b6ccf5" }}
                              />
                              <YAxis
                                tick={{ fill: "#b6ccf5" }}
                                tickLine={{ stroke: "#b6ccf5" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#083D72",
                                }}
                                itemStyle={{ color: "#b6ccf5" }}
                                cursor={{ fill: "transparent" }}
                              />
                              <Legend />
                              <Bar dataKey="long" fill="#05FFFF" />
                              <Bar dataKey="short" fill="#032950" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="card-title">
                            Net Speculative Data (Non-Commercial)
                          </h5>
                          <div className="card-tools">
                            <select
                              className="form-control form-control-sm form-control-select"
                              onChange={(e) =>
                                handleSelectChange(e, "sentiment")
                              }
                              value={selectedSentiment}
                            >
                              <option selected="selected">
                                Select Symbol Name
                              </option>
                              {keys.map((e, i) => {
                                return (
                                  <option key={e} value={e}>
                                    {e}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="card-body" style={{ fontSize: "11px" }}>
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                              data={
                                sentimentData &&
                                sentimentData[selectedSentiment]
                              }
                            >
                              <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#05FFFF"
                              />
                              <CartesianGrid
                                stroke="#0b4a89"
                                strokeDasharray="5 5"
                              />
                              <XAxis
                                dataKey="date"
                                tick={{ fill: "#b6ccf5" }}
                                tickLine={{ stroke: "#b6ccf5" }}
                              />
                              <YAxis
                                tick={{ fill: "#b6ccf5" }}
                                tickLine={{ stroke: "#b6ccf5" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#083D72",
                                }}
                                itemStyle={{ color: "#b6ccf5" }}
                                cursor={{ stroke: "transparent" }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="card-title">
                            Crowding Data (Non-Commercial)
                          </h5>
                          <div className="card-tools">
                            <select
                              className="form-control form-control-sm form-control-select"
                              onChange={(e) => handleSelectChange(e, "crowded")}
                              value={selectedCrowded}
                            >
                              <option selected="selected">
                                Select Symbol Name
                              </option>
                              {keys.map((e, i) => {
                                return (
                                  <option key={e} value={e}>
                                    {e}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="card-body" style={{ fontSize: "11px" }}>
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                              data={
                                crowdingData && crowdingData[selectedCrowded]
                              }
                            >
                              <CartesianGrid
                                stroke="#0b4a89"
                                strokeDasharray="5 5"
                              />
                              <XAxis
                                dataKey="date"
                                tick={{ fill: "#b6ccf5" }}
                                tickLine={{ stroke: "#b6ccf5" }}
                              />
                              <YAxis
                                tick={{ fill: "#b6ccf5" }}
                                tickLine={{ stroke: "#b6ccf5" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#083D72",
                                }}
                                itemStyle={{ color: "#b6ccf5" }}
                                cursor={{ fill: "transparent" }}
                              />
                              <Legend />
                              <Bar dataKey="long" fill="#05FFFF" />
                              <Bar dataKey="short" fill="#032950" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="card-title">
                            52 weeks Signal (Non Commercial)
                          </h5>
                          <div className="card-tools">
                            <select
                              className="form-control form-control-sm form-control-select"
                              onChange={(e) =>
                                handleSelectCommChange(e, "nonchange")
                              }
                              value={selectedChangeSymbol}
                            >
                              <option selected="selected">
                                Select Symbol Name
                              </option>
                              {keys.map((e, i) => {
                                return (
                                  <option key={e} value={e}>
                                    {e}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="card-body" style={{ fontSize: "11px" }}>
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                              data={
                                changeData &&
                                changeData[selectedChangeSymbol]
                              }
                            >
                              <Line
                                type="monotone"
                                dataKey="change"
                                stroke="#05FFFF"
                                onMouseOver={(e) => {
                                  console.log(`mouse over `)
                                  console.log(e)
                                }}
                              >{/* <LabelList content={<CustomizedLabel data={changeData[selectedChangeSymbol]} />} /> */}
      </Line>
                              <CartesianGrid
                                stroke="#0b4a89"
                                strokeDasharray="5 5"
                              />
                              <XAxis
                                dataKey="date"
                                tick={{ fill: "#b6ccf5" }}
                                tickLine={{ stroke: "#b6ccf5" }}
                              />
                              <YAxis
                                tick={{ fill: "#b6ccf5" }}
                                tickLine={{ stroke: "#b6ccf5" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#083D72",
                                }}
                                itemStyle={{ color: "#b6ccf5" }}
                                cursor={{ stroke: "transparent" }}
                                formatter={(value,nam,props) => {
                                  
                                  return [value,`${props.payload.signal}`]
                                }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header">
                          <h5 className="card-title">
                            52 weeks Signal (Commercial)
                          </h5>
                          <div className="card-tools">
                            <select
                              className="form-control form-control-sm form-control-select"
                              onChange={(e) =>
                                handleSelectCommChange(e, "change")
                              }
                              value={selectedChangeCommSymbol}
                            >
                              <option selected="selected">
                                Select Symbol Name
                              </option>
                              {keys.map((e, i) => {
                                return (
                                  <option key={e} value={e}>
                                    {e}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="card-body" style={{ fontSize: "11px" }}>
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                              data={
                                changeCommData &&
                                changeCommData[selectedChangeCommSymbol]
                              }
                            >
                              <Line
                                type="monotone"
                                dataKey="change"
                                stroke="#05FFFF"
                                onMouseOver={(e) => {
                                  console.log(`mouse over `)
                                  console.log(e)
                                }}
                              >{/* <LabelList content={<CustomizedLabel data={changeData[selectedChangeSymbol]} />} /> */}
      </Line>
                              <CartesianGrid
                                stroke="#0b4a89"
                                strokeDasharray="5 5"
                              />
                              <XAxis
                                dataKey="date"
                                tick={{ fill: "#b6ccf5" }}
                                tickLine={{ stroke: "#b6ccf5" }}
                              />
                              <YAxis
                                tick={{ fill: "#b6ccf5" }}
                                tickLine={{ stroke: "#b6ccf5" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#083D72",
                                }}
                                itemStyle={{ color: "#b6ccf5" }}
                                cursor={{ stroke: "transparent" }}
                                formatter={(value,nam,props) => {
                                  
                                  return [value,`${props.payload.signal}`]
                                }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header">
                          <h5 className="card-title">
                            Economic Calendar Events
                          </h5>
                          <div className="card-tools">
                            <select
                              className="form-control form-control-sm form-control-select"
                              onChange={(e) =>
                                handleSelectCommChange(e, "calendar")
                              }
                              value={calendarCurrency}
                            >
                              <option selected="selected" disabled={true}>
                                Select Symbol Name
                              </option>
                              {currencyOptions.map((e, i) => {
                                return (
                                  <option key={e} value={e}>
                                    {e}
                                  </option>
                                );
                              })}
                            </select>
                            <select
                              className="form-control form-control-sm form-control-select"
                              onChange={(e) =>
                                setCalendarEvent(e.target.value)
                              }
                              value={calendarEvent}
                            >
                              <option selected="selected" disabled={true}>
                                Select Event Name
                              </option>
                              
                               
                                  <option key={"gdp"} value={"gdp"}>
                                    {"GDP"}
                                  </option>
                                  <option key={"cpi"} value={"cpi"}>
                                    {"CPI"}
                                  </option>
                                  <option key={"employment"} value={"employment"}>
                                    {"Employment Change"}
                                  </option>
                                  <option key={"unemployment"} value={"unemployment"}>
                                    {"Unemployment Rate"}
                                  </option>
                                  <option key={"mpmi"} value={"mpmi"}>
                                    {"MPMI"}
                                  </option>
                                  <option key={"spmi"} value={"spmi"}>
                                    {"SPMI"}
                                  </option>
                                
                            </select>
                          </div>
                        </div>
                        <div className="card-body" style={{ fontSize: "11px" }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                              data={
                                graphCalendarData && graphCalendarData
                              }
                            >
                              <CartesianGrid
                                stroke="#0b4a89"
                                strokeDasharray="5 5"
                              />
                              <XAxis
                                dataKey="date"
                                tick={{ fill: "#b6ccf5" }}
                                tickLine={{ stroke: "#b6ccf5" }}
                              />
                              <YAxis
                                tick={{ fill: "#b6ccf5" }}
                                tickLine={{ stroke: "#b6ccf5" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#083D72",
                                }}
                                itemStyle={{ color: "#b6ccf5" }}
                                cursor={{ fill: "transparent" }}
                              />
                              <Legend />
                              <Bar dataKey="previous" fill="#05FFFF" />
                              <Bar dataKey="actual" fill="#032950" />
                              <Bar dataKey="forecast" fill="#035550" />
                            </BarChart>
                          </ResponsiveContainer>
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

export default CotReport;
