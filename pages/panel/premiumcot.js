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
  extractYear
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
  const [selectedYear,setSelectedYear] = useState(null);
  const [pairs,setPairs] = useState([])
  const [selectedPair,setSelectedPair] = useState(null)
  const [selectedData,setSelectedData] = useState([]);

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
  function groupDataByPair(dataArray) {
    const groupedData = {};
  
    dataArray.forEach(dataItem => {
      dataItem.data.forEach(item => {
        const pair = item.pair;
        const date = dataItem.date;
        item = {...item,date}
  
        if (!groupedData[pair]) {
          groupedData[pair] = [];
        }
  
        // Add the item to the groupedData array, maintaining date order
        const insertionIndex = groupedData[pair].findIndex(existingItem => new Date(existingItem.date) > new Date(date));
        if (insertionIndex === -1) {
          groupedData[pair].push(item);
        } else {
          groupedData[pair].splice(insertionIndex, 0, item);
        }
      });
    });

    Object.keys(groupedData).forEach(e => {
      groupedData[e] = groupedData[e].reverse()
    })
  
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
        
      ]]
      Object.keys(dt).forEach((e) => {
        const tm = (dt[e].forEach((e1) => {
            const n_d = calculate_percentage(e1)
            const c_d = calculate_comm_percentage(e1)
        
        
        
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

        ])
        }))
        
        
      })
     
    console.log(temp);
    setExportableData(temp);
  };

  const fetchData = async () => {
    try {
      let url = "all-data"
      if (selectedYear){
        url = `all-data?year=${selectedYear}`
      }
      
      let response = await req(url);
      console.log("formating export");
      const r = groupDataByPair(response)
      handleExport(r);
      setData(r);
      setSelectedPair(Object.keys(r)[0])
      if (!selectedYear){
        setSelectedYear(extractYear(response[0].date))
      }
      
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPair){
        setLoading(true)
        setSelectedData(data[selectedPair])
        
    }
  },[selectedPair])

  useEffect(() => {
    setLoading(false)
  },[selectedData])

  useEffect(() => {
    if (user.logged) {
      fetchData();
    }
  }, [user,selectedYear]);

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
        <title>Premium COT Data</title>
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
                              onChange={(e) =>
                                setSelectedYear(e.target.value)
                              }
                              value={selectedYear}
                            >
                              <option selected="selected" disabled={true}>
                                Select Year
                              </option>
                              
                               {generateYears(2020).map((e,i) => {
                                return <option key={e} value={e}>
                                {e}
                              </option>
                               })}
                                  
                                  
                                
                            </select>
                    </div>
                    <div className="col-lg-12 ">
                      <div className="card">
                      {
                        data && <>
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
                              
                               {Object.keys(data).map((e,i) => {
                                return <option key={e} value={e}>
                                {e}
                              </option>
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
      <th>Non-Comm % Long</th>
      <th>Non-Comm % Short</th>
      <th>Non-Comm Net Position</th>
      
    
                              </tr>
                            </thead>
                            <tbody>
                              {selectedData &&
                                selectedData.length > 0 &&
                                selectedData.map((e, i) => {
                                    const n_d = calculate_percentage(e)
                                    const c_d = calculate_comm_percentage(e)
                                  return (
                                    <tr key={e.date}>
                                      <td>{selectedPair}</td>
                                      <td>{formatDate(e.date)}</td>
                                      <td>{n_d.pair_long}</td>
                                      <td>{n_d.pair_short}</td>
                                      <td>
                                        <div
                                          className="progress progress-sm"
                                          style={{ height: "15px" }}
                                        >
                                          <div
                                            className="progress-bar progress-bar-striped progress-bar-animated"
                                            aria-valuenow={n_d.perc_long.replace("%", "")}
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
                                            aria-valuenow={n_d.perc_short.replace("%", "")}
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
                                      



                                      
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </DataTable>
                        </div>
                        </>
                      }
                        
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 ">
                      {
                        data && <div className="card">
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
      <th>Comm % Long</th>
      <th>Comm % Short</th>
      <th>Comm Net Position</th>
    
                              </tr>
                            </thead>
                            <tbody>
                              {selectedData &&
                                selectedData.length > 0 &&
                                selectedData.map((e, i) => {
                                    const c_d = calculate_comm_percentage(e)
                                  return (
                                    <tr key={"c"+e.date}>
                                      <td>{selectedPair}</td>
                                      <td>{formatDate(e.date)}</td>
                                      <td>{c_d.pair_long}</td>
                                      <td>{c_d.pair_short}</td>
                                      <td>
                                        <div
                                          className="progress progress-sm"
                                          style={{ height: "15px" }}
                                        >
                                          <div
                                            className="progress-bar progress-bar-striped progress-bar-animated"
                                            aria-valuenow={c_d.perc_long.replace("%", "")}
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
                                            aria-valuenow={c_d.perc_short.replace("%", "")}
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
                                      



                                      
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </DataTable>
                        </div>
                      </div>
                      }
                      
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
