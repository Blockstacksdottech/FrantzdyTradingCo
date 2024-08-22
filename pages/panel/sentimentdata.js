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
} from "recharts";
import Downloader from "react-csv-downloader";
import Checker from "../components/Checker";
import { UserContext } from "@/contexts/UserContextData";

const Sentimentdata = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [exportableData, setExportableData] = useState([]);

  const initDataTable = () => {
    const script = document.createElement("script");
    script.src = "../panel/js/datatable.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup function to remove the script on component unmount
      document.body.removeChild(script);
    };
  };

  useEffect(() => {
    return initDataTable();
  }, [loading]);

  const handleExport = (dt) => {
    console.log(dt);
    const temp1 = [
      // Add headers for your CSV data
      ["Symbol", "Action", "Percentage", "Volume", "Positions"],
      t
        .map((e, i) => {
          const sym = Object.keys(e)[0];
          const actions = Object.keys(e[sym]);
          let res = [];
          for (const ac of actions) {
            res.push([
              sym,
              ac,
              e[sym][ac].percentage,
              e[sym][ac].volume,
              e[sym][ac].positions,
            ]);
          }
          return res;
        })
        .flat(),
    ];
    const temp = [temp1[0], ...temp1[1]];
    console.log(temp);
    setExportableData(temp);
  };

  const fetchData = async () => {
    try {
      const response = await postReq("sentiment-data", {});
      if (response) {
        setData(response);
        handleExport(response);
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

  useEffect(() => {}, [data]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sentiment Data</title>
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
                <div className="col-sm-6 m-auto">
                  <h1>SENTIMENT DATA</h1>
                </div>
                <div className="col-sm-6 m-auto">
                  <div className="float-right">
                    {exportableData.length > 0 && (
                      <>
                        <Downloader
                          filename="my_data.csv"
                          elementType="button"
                          disabled={false} // Set to true to disable download
                          datas={exportableData}
                        >
                          <a className="btn btn-sm btn-export box-shadow">
                            Export Data
                          </a>
                        </Downloader>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {loading && (
            <h4 className="text-white text-center pt-5 blink">
              PLEASE WAIT SENTIMENT DATA ARE DOWNLOADING...
            </h4>
          )}

          {!loading && data && data.length > 0 && (
            <>
              <div className="content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-body p-0">
                          <div className="table-responsive p-0">
                            <table className="table table-bordered table-sm m-0">
                              <thead>
                                <tr>
                                  <th>Symbol</th>
                                  <th>Action</th>
                                  <th>Percentage</th>
                                  <th>Volume</th>
                                  <th>Positions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* TAble-row Start */}
                                {data &&
                                  data.length > 0 &&
                                  data.map((e, i) => {
                                    const sym = Object.keys(e)[0];
                                    return (
                                      <>
                                        <tr>
                                          <td rowspan="3">{sym}</td>
                                        </tr>
                                        <tr>
                                          <td>Short</td>
                                          <td>
                                            <div
                                              class="progress progress-sm"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                class="progress-bar progress-bar-striped progress-bar-animated"
                                                aria-valuenow={e[sym][
                                                  "Short"
                                                ].percentage.replace("%", "")}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{
                                                  width:
                                                    e[sym]["Short"].percentage,
                                                }}
                                              ></div>
                                            </div>
                                            {e[sym]["Short"].percentage}
                                          </td>
                                          <td>{e[sym]["Short"].volume}</td>
                                          <td>{e[sym]["Short"].positions}</td>
                                        </tr>
                                        <tr>
                                          <td>Long</td>
                                          <td>
                                            <div
                                              class="progress progress-sm"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                class="progress-bar progress-bar-striped progress-bar-animated"
                                                aria-valuenow={e[sym][
                                                  "Long"
                                                ].percentage.replace("%", "")}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{
                                                  width:
                                                    e[sym]["Long"].percentage,
                                                }}
                                              ></div>
                                            </div>
                                            {e[sym]["Long"].percentage}
                                          </td>
                                          <td>{e[sym]["Long"].volume}</td>
                                          <td>{e[sym]["Long"].positions}</td>
                                        </tr>
                                      </>
                                    );
                                  })}

                                {/* TAble-row END */}
                              </tbody>
                            </table>
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

export default Sentimentdata;
