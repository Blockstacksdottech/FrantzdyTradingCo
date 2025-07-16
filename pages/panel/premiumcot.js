import Head from "next/head";
import HeadLink from "../components/panel/headlink";
import Sidebar from "../components/panel/sidebar";
import Menu from "../components/panel/menu";
import ScriptLink from "../components/panel/scriptlink";
import Footer from "../components/panel/footer";
import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  getRating,
  getThresholdSignal,
  isLogged,
  postReq,
  req,
  generateYears,
  extractYear,
} from "@/helpers";
import { useRouter } from "next/router";
import Downloader from "react-csv-downloader";
import Checker from "../components/Checker";
import { UserContext } from "@/contexts/UserContextData";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs4";
import "datatables.net-responsive-dt";

const PremiumCot = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const nav = useRouter();
  const [exportableData, setExportableData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [pairs, setPairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState(null);
  const [selectedData, setSelectedData] = useState([]);
  const [maxLong, setMaxLong] = useState(null);
  const [minLong, setMinLong] = useState(null);
  const [maxShort, setMaxShort] = useState(null);
  const [minShort, setMinShort] = useState(null);
  const [maxNet, setMaxNet] = useState(null);
  const [minNet, setMinNet] = useState(null);
  const [avgLong, setAvgLong] = useState(null);
  const [avgShort, setAvgShort] = useState(null);
  const [avgNet, setAvgNet] = useState(null);
  const [comm_maxLong, setCommMaxLong] = useState(null);
  const [comm_minLong, setCommMinLong] = useState(null);
  const [comm_maxShort, setCommMaxShort] = useState(null);
  const [comm_minShort, setCommMinShort] = useState(null);
  const [comm_avgLong, setCommAvgLong] = useState(null);
  const [comm_avgShort, setCommAvgShort] = useState(null);
  const [comm_maxNet, setCommMaxNet] = useState(null);
  const [comm_minNet, setCommMinNet] = useState(null);
  const [comm_avgNet, setCommAvgNet] = useState(null);

  DataTable.use(DT);

  // const initDataTable = () => {
  //   const script = document.createElement("script");
  //   script.src = "../panel/js/datatable.js";
  //   script.async = false;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // };

  /* useEffect(() => {
    return initDataTable();
  }, [loading]); */

  const toPercentage = (num) => {
    // Check if the input is a valid number
    if (typeof num !== "number" || isNaN(num)) {
      console.log(`error here `);
      console.log(num);
      console.log(avgLong);
      console.log(avgShort);
      return 0;
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

  function get_stars(a, b) {
    const { stars, signal } = getRating(a, b);
    return stars;
  }

  function get_diff_signal(a, b) {
    const { stars, signal } = getRating(a, b);
    return signal;
  }
  function groupDataByPair(dataArray) {
    const groupedData = {};

    dataArray.forEach((dataItem) => {
      dataItem.data.forEach((item) => {
        const pair = item.pair;
        const date = dataItem.date;
        item = { ...item, date };

        if (!groupedData[pair]) {
          groupedData[pair] = [];
        }

        // Add the item to the groupedData array, maintaining date order
        const insertionIndex = groupedData[pair].findIndex(
          (existingItem) => new Date(existingItem.date) > new Date(date)
        );
        if (insertionIndex === -1) {
          groupedData[pair].push(item);
        } else {
          groupedData[pair].splice(insertionIndex, 0, item);
        }
      });
    });

    Object.keys(groupedData).forEach((e) => {
      groupedData[e] = groupedData[e].reverse();
    });

    return groupedData;
  }

  const handleExport = (dt) => {
    const temp = [
      // Add headers for your CSV data
      [
        "PAIR",
        "Date",
        "Non-Comm long",
        "Non-Comm Short",
        "Non-Comm % Long",
        "Non-Comm % Short",
        "Non-Comm Net Position",
        "Comm long",
        "Comm Short",
        "Comm % Long",
        "Comm % Short",
        "Comm Net Position",
      ],
    ];
    Object.keys(dt).forEach((e) => {
      const tm = dt[e].forEach((e1) => {
        const n_d = calculate_percentage(e1);
        const c_d = calculate_comm_percentage(e1);

        temp.push([
          e,
          e1.date,
          n_d.pair_long,
          n_d.pair_short,
          n_d.perc_long,
          n_d.perc_short,
          n_d.pair_diff,
          c_d.pair_long,
          c_d.pair_short,
          c_d.perc_long,
          c_d.perc_short,
          c_d.pair_diff,
        ]);
      });
    });

    console.log(temp);
    setExportableData(temp);
  };

  const fetchData = async () => {
    try {
      let url = "all-data";
      if (selectedYear) {
        url = `all-data?year=${selectedYear}`;
      }

      let response = await req(url);
      console.log("formating export");
      const r = groupDataByPair(response);
      handleExport(r);
      setData(r);
      if (!selectedPair) {
        setSelectedPair(Object.keys(r)[0]);
      } else {
        setSelectedData(r[selectedPair]);
      }

      if (!selectedYear) {
        setSelectedYear(extractYear(response[0].date));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchData2 = async () => {
    try {
      let url = "all-data";
      let response = await req(url);
    } catch (error) {}
  };

  useEffect(() => {
    if (selectedPair) {
      setSelectedData(data[selectedPair]);
    }
  }, [selectedPair]);

  useEffect(() => {
    if (user.logged) {
      //setLoading(true)
      //fetchData();
      fetchAndAnalyzeData();
    }
  }, [user, selectedYear]);

  // Step 2: Calculate 13-week average for perc_long and perc_short

  const getAverage = (values) => {
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return sum / values.length;
  };

  const handleAnalysis = (target) => {
    console.log(`########### ${target} #########`);
    console.log(selectedData);
    const dataArray = selectedData.map((e) => {
      const d =
        target === "nc"
          ? calculate_percentage(e)
          : calculate_comm_percentage(e);
      return { ...d, date: e.date };
    });
    console.log(dataArray);
    const LongValues = dataArray.map((item) => item.pair_long);
    const ShortValues = dataArray.map((item) => item.pair_short);
    const netValues = dataArray.map((item) => item.pair_diff);

    const maxPercLong = Math.max(...LongValues);
    const minPercLong = Math.min(...LongValues);
    const maxPercShort = Math.max(...ShortValues);
    const minPercShort = Math.min(...ShortValues);
    const maxnet = Math.max(...netValues);
    const minnet = Math.min(...netValues);

    // Get the last 13 weeks (or fewer if the array has fewer than 13 elements)
    const last13Weeks = dataArray.slice(0, 13);
    console.log(last13Weeks);
    const percLongLast13Weeks = last13Weeks.map((item) => item.pair_long);
    const percShortLast13Weeks = last13Weeks.map((item) => item.pair_short);
    const LastNet13 = last13Weeks.map((item) => item.pair_diff);

    const avgPercLong = getAverage(percLongLast13Weeks);
    const avgPercShort = getAverage(percShortLast13Weeks);
    const avgNet = getAverage(LastNet13);
    console.log(`calculating for ${target}`);
    console.log(avgNet);
    if (target === "nc") {
      setMaxLong(maxPercLong);
      setMinLong(minPercLong);
      setMaxShort(maxPercShort);
      setMinShort(minPercShort);
      setMaxNet(maxnet);
      setMinNet(minnet);
      setAvgLong(avgPercLong);
      setAvgShort(avgPercShort);
      setAvgNet(avgNet);
    } else {
      setCommMaxLong(maxPercLong);
      setCommMinLong(minPercLong);
      setCommMaxShort(maxPercShort);
      setCommMinShort(minPercShort);
      setCommMaxNet(maxnet);
      setCommMinNet(minnet);
      setCommAvgLong(avgPercLong);
      setCommAvgShort(avgPercShort);
      setCommAvgNet(avgNet);
    }
  };

  useEffect(() => {
    if (selectedData && selectedData.length > 0 && selectedYear) {
      handleAnalysis("nc");
      handleAnalysis("c");
      //setLoading(false)
    }
  }, [selectedData, selectedYear]);

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

  const fetchAndAnalyzeData = async () => {
    setLoading(true);
    const startYear = 2020;
    let allData = [];
    let current_year = new Date().getFullYear();

    try {
      let url = "all-data";
      if (selectedYear) {
        url = `all-data?year=${selectedYear}`;
      }
      const initialData = await req(url);
      allData = allData.concat(initialData);

      if (!selectedYear) {
        current_year = extractYear(initialData[0].date);
        setSelectedYear(extractYear(initialData[0].date));
      } else {
        current_year = selectedYear;
      }
      const r = groupDataByPair(initialData);
      handleExport(r);

      if (current_year) {
        const previousYear = current_year - 1;
        const prevData = await req(`all-data/?year=${previousYear}`);
        allData = allData.concat(prevData);
        const groupedData = groupDataByPair(allData);

        for (const pair in groupedData) {
          groupedData[pair] = calculateWeeklyChanges(groupedData[pair]);
        }

        const results = organizeDataByYear(groupedData);
        console.log("analyzing results");
        console.log(results);
        setData(results[current_year]);
        if (!selectedPair) {
          setSelectedPair(Object.keys(results[current_year])[0]);
        }

        setSelectedData(
          results[current_year][
            selectedPair ? selectedPair : Object.keys(results[current_year])[0]
          ]
        );
        if (prevData || current_year === startYear) {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(`Error fetching data:`, error);
    }
  };

  const calculateWeeklyChanges = (data) => {
    console.log(`calculating weekly changes`);
    console.log(data);
    return data.map((entry, index, arr) => {
      if (index === data.length - 1) return { ...entry, changes: null };

      const prev = arr[index + 1];
      const nc_data_current = calculate_percentage(entry);
      const nc_data_prev = calculate_percentage(prev);
      const c_data_current = calculate_comm_percentage(entry);
      const c_data_prev = calculate_comm_percentage(prev);
      return {
        ...entry,
        changes: {
          nc_pair_long_change: toPercentage(
            (nc_data_current.pair_long - nc_data_prev.pair_long) /
              nc_data_prev.pair_long
          ),
          nc_pair_short_change: toPercentage(
            (nc_data_current.pair_short - nc_data_prev.pair_short) /
              nc_data_prev.pair_short
          ),
          nc_pair_diff_change: toPercentage(
            (nc_data_current.pair_long -
              nc_data_current.pair_short -
              (nc_data_prev.pair_long - nc_data_prev.pair_short)) /
              (nc_data_prev.pair_long - nc_data_prev.pair_short)
          ),
          c_pair_long_change: toPercentage(
            (c_data_current.pair_long - c_data_prev.pair_long) /
              c_data_prev.pair_long
          ),
          c_pair_short_change: toPercentage(
            (c_data_current.pair_short - c_data_prev.pair_short) /
              c_data_prev.pair_short
          ),
          c_pair_diff_change: toPercentage(
            (c_data_current.pair_long -
              c_data_current.pair_short -
              (c_data_prev.pair_long - c_data_prev.pair_short)) /
              (c_data_prev.pair_long - c_data_prev.pair_short)
          ),
        },
      };
    });
  };

  const organizeDataByYear = (groupedData) => {
    const organizedData = {};
    for (const pair in groupedData) {
      groupedData[pair].forEach((entry) => {
        const year = new Date(entry.date).getFullYear();
        if (!organizedData[year]) {
          organizedData[year] = {};
        }
        if (!organizedData[year][pair]) {
          organizedData[year][pair] = [];
        }
        organizedData[year][pair].push(entry);
      });
    }
    return organizedData;
  };

  return (
    <>
      <Head>
        <title>
          Premium COT Analysis | Frantzdy Trading & Co., LLC - In-Depth Commitment of
          Traders Reports
        </title>
        <meta
          name="description"
          content="Access Frantzdy Trading & Co., LLC's Premium Commitment of Traders (COT) Analysis for comprehensive insights into market positions. Enhance your trading strategies with detailed reports and expert interpretations."
        />
        <meta
          name="keywords"
          content="Premium COT analysis, Commitment of Traders reports, market positions, trading strategies, Frantzdy Trading & Co., LLC, futures market analysis, trader insights"
        />
      </Head>
      <Checker tier={3}>
        <HeadLink />
        <Menu user={user} />
        <Sidebar />

        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12">
                  <h1>Premium COT Data</h1>
                </div>
              </div>
            </div>
          </section>

          {loading && (
            <h4 className="text-white text-center pt-5 blink">
              PLEASE WAIT COT Data LOADING...
            </h4>
          )}

          {!loading && (
            <>
              <div className="content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-4 mb-2">
                      <select
                        className="form-control form-control-sm form-control-select"
                        onChange={(e) => setSelectedYear(e.target.value)}
                        value={selectedYear}
                      >
                        <option selected="selected" disabled={true}>
                          Select Year
                        </option>

                        {generateYears(2020).map((e, i) => {
                          return (
                            <option key={e} value={e}>
                              {e}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-lg-12 ">
                      <div className="card">
                        {selectedData && (
                          <>
                            <div className="card-header">
                              <h5 className="card-title">NON COMMERCIAL</h5>
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

                                <select
                                  className="form-control form-control-sm form-control-select mt-3"
                                  onChange={(e) =>
                                    setSelectedPair(e.target.value)
                                  }
                                  value={selectedPair}
                                >
                                  <option selected="selected" disabled={true}>
                                    Select Pair
                                  </option>

                                  {data &&
                                    Object.keys(data).map((e, i) => {
                                      return (
                                        <option key={e} value={e}>
                                          {e}
                                        </option>
                                      );
                                    })}
                                </select>
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
                                    <th>PAIR</th>
                                    <th>Date</th>
                                    <th>Non-Comm long</th>
                                    <th>Non-Comm Short</th>
                                    <th>Total</th>
                                    <th>Non-Comm % Long</th>
                                    <th>Non-Comm % Short</th>
                                    <th>Non-Comm Net Position</th>
                                    <th>Non-Comm % change long</th>
                                    <th>Non-Comm % change short</th>
                                    <th>Non-Comm % change Net Position</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {selectedData &&
                                    selectedData.length > 0 &&
                                    maxLong && (
                                      <>
                                        <tr>
                                          <td>{selectedPair}</td>
                                          <td>MAX</td>
                                          <td>{maxLong}</td>
                                          <td>{maxShort}</td>
                                          <td>{maxLong + maxShort}</td>
                                          <td>--</td>
                                          <td>--</td>
                                          <td>{maxNet}</td>
                                          <td>--</td>
                                          <td>--</td>
                                          <td>--</td>
                                        </tr>
                                        <tr>
                                          <td>{selectedPair}</td>
                                          <td>Min</td>
                                          <td>{minLong}</td>
                                          <td>{minShort}</td>
                                          <td>{minLong + minShort}</td>
                                          <td>--</td>
                                          <td>--</td>
                                          <td>{minNet}</td>
                                          <td>--</td>
                                          <td>--</td>
                                          <td>--</td>
                                        </tr>
                                        <tr>
                                          <td>{selectedPair}</td>
                                          <td>13 Per.AVG</td>
                                          <td>{avgLong}</td>
                                          <td>{avgShort}</td>
                                          <td>{avgLong + avgShort}</td>
                                          <td>
                                            <div
                                              className="progress progress-sm"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                aria-valuenow={toPercentage(
                                                  avgLong / (avgLong + avgShort)
                                                ).replace("%", "")}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{
                                                  width: toPercentage(
                                                    avgLong /
                                                      (avgLong + avgShort)
                                                  ),
                                                }}
                                              ></div>
                                            </div>
                                            {toPercentage(
                                              avgLong / (avgLong + avgShort)
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
                                                  avgShort /
                                                    (avgLong + avgShort)
                                                ).replace("%", "")}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{
                                                  width: toPercentage(
                                                    avgShort /
                                                      (avgLong + avgShort)
                                                  ),
                                                }}
                                              ></div>
                                            </div>
                                            {toPercentage(
                                              avgShort / (avgLong + avgShort)
                                            )}
                                          </td>
                                          <td>{avgNet}</td>
                                          <td>--</td>
                                          <td>--</td>
                                          <td>--</td>
                                        </tr>
                                        {selectedData.map((e, i) => {
                                          const n_d = calculate_percentage(e);
                                          const c_d =
                                            calculate_comm_percentage(e);
                                          return (
                                            <tr key={e.date}>
                                              <td>{selectedPair}</td>
                                              <td>{formatDate(e.date)}</td>
                                              <td>{n_d.pair_long}</td>
                                              <td>{n_d.pair_short}</td>
                                              <td>
                                                {n_d.pair_long + n_d.pair_short}
                                              </td>
                                              <td>
                                                <div
                                                  className="progress progress-sm"
                                                  style={{ height: "15px" }}
                                                >
                                                  <div
                                                    className="progress-bar progress-bar-striped progress-bar-animated"
                                                    aria-valuenow={n_d.perc_long.replace(
                                                      "%",
                                                      ""
                                                    )}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={{
                                                      width: n_d.perc_long,
                                                    }}
                                                  ></div>
                                                </div>
                                                {n_d.perc_long}
                                              </td>
                                              <td>
                                                <div
                                                  className="progress progress-sm"
                                                  style={{ height: "15px" }}
                                                >
                                                  <div
                                                    className="progress-bar progress-bar-striped progress-bar-animated"
                                                    aria-valuenow={n_d.perc_short.replace(
                                                      "%",
                                                      ""
                                                    )}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={{
                                                      width: n_d.perc_short,
                                                    }}
                                                  ></div>
                                                </div>
                                                {n_d.perc_short}
                                              </td>
                                              <td>{n_d.pair_diff}</td>
                                              <td>
                                                {e.changes
                                                  ? e.changes
                                                      .nc_pair_long_change
                                                  : "--"}
                                              </td>
                                              <td>
                                                {e.changes
                                                  ? e.changes
                                                      .nc_pair_short_change
                                                  : "--"}
                                              </td>
                                              <td>
                                                {e.changes
                                                  ? e.changes
                                                      .nc_pair_diff_change
                                                  : "--"}
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </>
                                    )}
                                </tbody>
                              </DataTable>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 ">
                      {data && (
                        <div className="card">
                          <div className="card-header">
                            <h5 className="card-title">COMMERCIAL</h5>
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
                                  <th>PAIR</th>
                                  <th>Date</th>
                                  <th>Comm long</th>
                                  <th>Comm Short</th>
                                  <th>Total</th>
                                  <th>Comm % Long</th>
                                  <th>Comm % Short</th>
                                  <th>Comm Net Position</th>
                                  <th>Comm % change long</th>
                                  <th>Comm % change short</th>
                                  <th>Comm % change Net Position</th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedData &&
                                  selectedData.length > 0 &&
                                  comm_maxLong && (
                                    <>
                                      <tr>
                                        <td>{selectedPair}</td>
                                        <td>MAX</td>
                                        <td>{comm_maxLong}</td>
                                        <td>{comm_maxShort}</td>
                                        <td>{comm_maxLong + comm_maxShort}</td>
                                        <td>--</td>
                                        <td>--</td>
                                        <td>{comm_maxNet}</td>
                                        <td>--</td>
                                        <td>--</td>
                                        <td>--</td>
                                      </tr>
                                      <tr>
                                        <td>{selectedPair}</td>
                                        <td>Min</td>
                                        <td>{comm_minLong}</td>
                                        <td>{comm_minShort}</td>
                                        <td>{comm_minLong + comm_minShort}</td>
                                        <td>--</td>
                                        <td>--</td>
                                        <td>{comm_minNet}</td>
                                        <td>--</td>
                                        <td>--</td>
                                        <td>--</td>
                                      </tr>
                                      <tr>
                                        <td>{selectedPair}</td>
                                        <td>13 Per.AVG</td>
                                        <td>{comm_avgLong}</td>
                                        <td>{comm_avgShort}</td>
                                        <td>{comm_avgLong + comm_avgShort}</td>
                                        <td>
                                          <div
                                            className="progress progress-sm"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              aria-valuenow={toPercentage(
                                                comm_avgLong /
                                                  (comm_avgLong + comm_avgShort)
                                              ).replace("%", "")}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                              style={{
                                                width: toPercentage(
                                                  comm_avgLong /
                                                    (comm_avgLong +
                                                      comm_avgShort)
                                                ),
                                              }}
                                            ></div>
                                          </div>
                                          {toPercentage(
                                            comm_avgLong /
                                              (comm_avgLong + comm_avgShort)
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
                                                comm_avgShort /
                                                  (comm_avgLong + comm_avgShort)
                                              ).replace("%", "")}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                              style={{
                                                width: toPercentage(
                                                  comm_avgShort /
                                                    (comm_avgLong +
                                                      comm_avgShort)
                                                ),
                                              }}
                                            ></div>
                                          </div>
                                          {toPercentage(
                                            comm_avgShort /
                                              (comm_avgLong + comm_avgShort)
                                          )}
                                        </td>
                                        <td>{comm_avgNet}</td>
                                        <td>--</td>
                                        <td>--</td>
                                        <td>--</td>
                                      </tr>
                                      {selectedData.map((e, i) => {
                                        const c_d =
                                          calculate_comm_percentage(e);
                                        return (
                                          <tr key={"c" + e.date}>
                                            <td>{selectedPair}</td>
                                            <td>{formatDate(e.date)}</td>
                                            <td>{c_d.pair_long}</td>
                                            <td>{c_d.pair_short}</td>
                                            <td>
                                              {c_d.pair_long + c_d.pair_short}
                                            </td>
                                            <td>
                                              <div
                                                className="progress progress-sm"
                                                style={{ height: "15px" }}
                                              >
                                                <div
                                                  className="progress-bar progress-bar-striped progress-bar-animated"
                                                  aria-valuenow={c_d.perc_long.replace(
                                                    "%",
                                                    ""
                                                  )}
                                                  aria-valuemin="0"
                                                  aria-valuemax="100"
                                                  style={{
                                                    width: c_d.perc_long,
                                                  }}
                                                ></div>
                                              </div>
                                              {c_d.perc_long}
                                            </td>
                                            <td>
                                              <div
                                                className="progress progress-sm"
                                                style={{ height: "15px" }}
                                              >
                                                <div
                                                  className="progress-bar progress-bar-striped progress-bar-animated"
                                                  aria-valuenow={c_d.perc_short.replace(
                                                    "%",
                                                    ""
                                                  )}
                                                  aria-valuemin="0"
                                                  aria-valuemax="100"
                                                  style={{
                                                    width: c_d.perc_short,
                                                  }}
                                                ></div>
                                              </div>
                                              {c_d.perc_short}
                                            </td>
                                            <td>{c_d.pair_diff}</td>
                                            <td>
                                              {e.changes
                                                ? e.changes.c_pair_long_change
                                                : "--"}
                                            </td>
                                            <td>
                                              {e.changes
                                                ? e.changes.c_pair_short_change
                                                : "--"}
                                            </td>
                                            <td>
                                              {e.changes
                                                ? e.changes.c_pair_diff_change
                                                : "--"}
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
                      )}
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

export default PremiumCot;
