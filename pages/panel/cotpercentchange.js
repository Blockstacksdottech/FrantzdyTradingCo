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

const CotpercentChange = () => {
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

  const handleExport = (dt) => {
    console.log(dt);
    const date = dt.date;
    dt = dt.data;
    const temp = [
      // Add headers for your CSV data
      [
        "Date",
        "Pair",
        "Percentage Change",
        "2 Week Change",
        "3 Week Change",
        "4 Week Change",
        "5 Week Change",
        "6 Week Change",
        "7 Week Change",
        "8 Week Change",
        "9 Week Change",
        "10 Week Change",
      ],
      ...dt.map((e) => [
        date,
        e.pair,
        e.pair_pct_change.toFixed(2),
        e.pair_2_week_change.toFixed(2),
        e.pair_3_week_change.toFixed(2),
        e.pair_4_week_change.toFixed(2),
        e.pair_5_week_change.toFixed(2),
        e.pair_6_week_change.toFixed(2),
        e.pair_7_week_change.toFixed(2),
        e.pair_8_week_change.toFixed(2),
        e.pair_9_week_change.toFixed(2),
        e.pair_10_week_change.toFixed(2),
      ]),
    ];
    console.log("temp here");
    console.log(temp);
    setExportableData(temp);
  };

  const fetchData = async () => {
    try {
      const response = await postReq("change-data", {});
      if (response) {
        console.log(response);
        handleExport(response);
        setData(response.data);
        setDate(response.date);
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

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>COT % Change</title>
        <meta
          name="description"
          content="Commitments of Traders (COT) Reports"
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
                  <h1>COT % CHANGE</h1>
                </div>
              </div>
            </div>
          </section>
          {loading && (
            <h4 className="text-white text-center pt-5 blink">
              PLEASE WAIT COT % CHANGE ARE DOWNLOADING...
            </h4>
          )}

          {!loading && data && data.length > 0 && (
            <>
              <div className="content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header border-0">
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
                              {data && data.length > 0 && (
                                <>
                                  {data.map((entry, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{entry.pair}</td>
                                        <td>
                                          <div
                                            class="progress progress-sm"
                                            style={{ height: "20px" }}
                                          >
                                            <div
                                              class="progress-bar progress-bar-striped progress-bar-animated"
                                              aria-valuenow={entry.pair_comm_pct_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                              style={{
                                                width: `${entry.pair_comm_pct_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
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
                                            style={{ height: "20px" }}
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
                                            style={{ height: "20px" }}
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
                                            style={{ height: "20px" }}
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
                                            style={{ height: "20px" }}
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
                                            style={{ height: "20px" }}
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
                                            style={{ height: "20px" }}
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
                                            style={{ height: "20px" }}
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
                                            style={{ height: "20px" }}
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
                                            style={{ height: "20px" }}
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

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header border-0">
                          <h5 className="card-title">
                            Non-Commercial positions
                          </h5>
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
                              {data && data.length > 0 && (
                                <>
                                  {data.map((entry, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{entry.pair}</td>
                                        <td>
                                          <div
                                            class="progress progress-sm"
                                            style={{ height: "20px" }}
                                          >
                                            <div
                                              class="progress-bar progress-bar-striped progress-bar-animated"
                                              aria-valuenow={entry.pair_pct_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                              style={{
                                                width: `${entry.pair_pct_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                            ></div>
                                          </div>
                                          {entry.pair_pct_change.toFixed(2)}%
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "20px" }}
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
                                            style={{ height: "20px" }}
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
                                            style={{ height: "20px" }}
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
                                            style={{ height: "20px" }}
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
                                            style={{ height: "20px" }}
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
                                            style={{ height: "20px" }}
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
                                            style={{ height: "20px" }}
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
                                            style={{ height: "20px" }}
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
                                            style={{ height: "20px" }}
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
                        <div className="card-header border-0">
                          <h5 className="card-title">Open Interest</h5>
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
                              {data && data.length > 0 && (
                                <>
                                  {data.map((entry, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{entry.pair}</td>
                                        <td>
                                          <div
                                            class="progress progress-sm"
                                            style={{ height: "20px" }}
                                          >
                                            <div
                                              class="progress-bar progress-bar-striped progress-bar-animated"
                                              aria-valuenow={entry.pair_pct_change_open_interest.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                              style={{
                                                width: `${entry.pair_pct_change_open_interest.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                            ></div>
                                          </div>
                                          {entry.pair_pct_change_open_interest.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "20px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_2_week_change_open_interest.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_2_week_change_open_interest.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_2_week_change_open_interest.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "20px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_3_week_change_open_interest.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_3_week_change_open_interest.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_3_week_change_open_interest.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "20px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_4_week_change_open_interest.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_4_week_change_open_interest.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_4_week_change_open_interest.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "20px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_5_week_change_open_interest.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_5_week_change_open_interest.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_5_week_change_open_interest.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "20px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_6_week_change_open_interest.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_6_week_change_open_interest.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_6_week_change_open_interest.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "20px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_7_week_change_open_interest.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_7_week_change_open_interest.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_7_week_change_open_interest.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "20px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_8_week_change_open_interest.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_8_week_change_open_interest.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_8_week_change_open_interest.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "20px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_9_week_change_open_interest.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_9_week_change_open_interest.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_9_week_change_open_interest.toFixed(
                                            2
                                          )}
                                          %
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "20px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pair_10_week_change_open_interest.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pair_10_week_change_open_interest.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                          {entry.pair_10_week_change_open_interest.toFixed(
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

export default CotpercentChange;
