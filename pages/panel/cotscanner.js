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
} from "@/helpers";
import { useRouter } from "next/router";
import Downloader from "react-csv-downloader";
import Checker from "../components/Checker";
import { UserContext } from "@/contexts/UserContextData";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs4";
import "datatables.net-responsive-dt";

const Cotscanner = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const nav = useRouter();
  const [exportableData, setExportableData] = useState([]);
  const [date, setDate] = useState(null);

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

  function get_stars(a, b) {
    const { stars, signal } = getRating(a, b);
    return stars;
  }

  function get_diff_signal(a, b) {
    const { stars, signal } = getRating(a, b);
    return signal;
  }

  const handleExport = (dt) => {
    const date = dt.date;
    dt = dt.data;
    const temp = [
      // Add headers for your CSV data
      [
        "PAIR",
        "OVERALL NON-COM SIGNAL",
        "OVERALL COM SIGNAL",
        "5 WEEK NON-COM COT SIGNAL",
        "5 WEEK NON-COM % NET SHIFT",
        "3 WEEK NON-COM COT SIGNAL",
        "3 WEEK NON-COM % NET SHIFT",
        "5 WEEK COM COT SIGNAL",
        "5 WEEK COM % NET SHIFT",
        "3 WEEK COM COT SIGNAL",
        "3 WEEK COM % NET SHIFT",
        "ADR",
        "LONG TERM NON-COM COT SIGNAL",
        "SENTIMENT NON-COM SIGNAL",
        "% NON-COM LONG",
        "% NON-COM SHORT",
        "NON-COM CROWDED MARKET ALERT",
        "LONG TERM COM COT SIGNAL",
        "SENTIMENT COM SIGNAL",
        "% COM LONG",
        "% COM SHORT",
        "COM CROWDED MARKET ALERT",
      ],
      ...dt.map((e) => [
        e.pair,
        getThresholdSignal(e.pair_pct_change),
        getThresholdSignal(e.pair_comm_pct_change),
        getThresholdSignal(e.pair_5_week_change),
        e.pair_5_week_change,
        getThresholdSignal(e.pair_3_week_change),
        e.pair_3_week_change,
        getThresholdSignal(e.pair_comm_5_week_change),
        e.pair_comm_5_week_change,
        getThresholdSignal(e.pair_comm_3_week_change),
        e.pair_comm_3_week_change,
        60,
        get_diff_signal(
          e.noncomm_10_diff_absolute_long,
          e.noncomm_10_diff_absolute_short
        ),
        get_diff_signal(
          e.noncomm_diff_absolute_long,
          e.noncomm_diff_absolute_short
        ),
        toPercentage(
          (e.base_long + e.quote_long) /
            (e.base_long + e.base_short + e.quote_long + e.quote_short)
        ),
        toPercentage(
          (e.base_short + e.quote_short) /
            (e.base_long + e.base_short + e.quote_long + e.quote_short)
        ),
        get_stars(e.noncomm_diff_absolute_long, e.noncomm_diff_absolute_short) +
          " stars",
        get_diff_signal(
          e.comm_10_diff_absolute_long,
          e.comm_10_diff_absolute_short
        ),
        get_diff_signal(e.comm_diff_absolute_long, e.comm_diff_absolute_short),
        toPercentage(
          (e.base_comm_long + e.quote_comm_long) /
            (e.base_comm_long +
              e.base_comm_short +
              e.quote_comm_long +
              e.quote_comm_short)
        ),
        toPercentage(
          (e.base_comm_short + e.quote_comm_short) /
            (e.base_comm_long +
              e.base_comm_short +
              e.quote_comm_long +
              e.quote_comm_short)
        ),
        get_stars(e.comm_diff_absolute_long, e.comm_diff_absolute_short) +
          " stars",
      ]),
    ];
    console.log(temp);
    setExportableData(temp);
  };

  const fetchData = async () => {
    try {
      const response = await postReq("scanner-data", {});
      console.log("formating export");
      handleExport(response);
      setData(response.data);
      setDate(response.date);
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

  useEffect(() => {}, [data]);

  return (
    <>
      <Head>
        <title>COT SCANNER</title>
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
                  <h1>COT SCANNER</h1>
                </div>
              </div>
            </div>
          </section>

          {loading && (
            <h4 className="text-white text-center pt-5 blink">
              PLEASE WAIT COT SCANNER LOADING...
            </h4>
          )}

          {!loading && (
            <>
              <div className="content">
                <div className="container-fluid">
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
                  <div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-header">
                            <h3 className="card-title">Forex Volatility</h3>
                          </div>
                          <div className="card-body">
                            <iframe
                              src="https://widgets.myfxbook.com/widgets/market-volatility.html?symbols=8,47,9,10,1234,11,103,12,46,1245,6,13,14,15,17,18,7,2114,19,20,21,22,1246,23,1,1233,107,24,25,4,2872,137,48,1236,1247,2012,2,1863,3240,26,49,27,28,2090,131,5,29,5779,31,34,3,36,37,38,2076,40,41,42,43,45,3005,3473,50,2115,2603,2119,1815,2521,51,5435,5079,1893&type=0"
                              width="100%"
                              height="100%"
                            />
                          </div>
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

export default Cotscanner;
