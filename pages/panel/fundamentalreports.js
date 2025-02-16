import Head from "next/head";
import HeadLink from "../components/panel/headlink";
import Sidebar from "../components/panel/sidebar";
import Menu from "../components/panel/menu";
import ScriptLink from "../components/panel/scriptlink";
import Footer from "../components/panel/footer";
import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import { calculateNet, formatDateLocal, getThresholdSignal, isLogged, req,get_diff_signal,get_stars,generateYears,isDateInCurrentYear } from "@/helpers";
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




const FundamentalReports = () => {
  DataTable.use(DT);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  // economic calendar
  const [calendarData,setCalendarData] = useState([]);
  const [graphCalendarData,setGraphCalendarData] = useState([])
  const [currencyOptions,setCurrencyOptions] = useState([])
  const [seasonalityOptions,setSeasonalityOptions] = useState([])
  const [calendarCurrency,setCalendarCurrency] = useState(null)
  const [calendarEvent,setCalendarEvent] = useState("gdp");
  const [calendarYear,setCalendarYear] = useState(new Date().getFullYear()) 
  const [seasApi,setSeasApi] = useState([])
  const [seasonalityCurrency,setSeasonalityCurrency] = useState(null);

  // seasonality
  const [seasonalityGraphData,setSeasonalityGraphData] = useState([])



  const calculateSeasonality = () => {

  }

 

  const fetchCalendarData = async () => {
    const response = await req("fundamental");
    const resp2 = await req("adm-seasonality")
    if (response ) {
      console.log(response);
      setCalendarData(response);
      const currs = response.map(e => e.name)

      setCurrencyOptions(currs)

      setCalendarCurrency(currs[0])

      //setDate(response.date);
    }
  }
  const fetchDataSeasonality = async (year) => {
    const resp2 = await req(`adm-seasonality?year=${year}`)
    if (resp2) {
      const currs2 = resp2.map(e => e.name)
      setSeasonalityOptions(currs2)
      if (!seasonalityCurrency){
      setSeasonalityCurrency(currs2[0])
      }
      setSeasApi(resp2)
      //setDate(response.date);
    }
  }


  const fetchData = async () => {
    try {
      fetchCalendarData();   
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



  const handleSelectCommChange = (e, target) => {
    const o = e.target;
    if (target === "calendar"){
      setCalendarCurrency(o.value)
    }
    
  };

  useEffect(() => {
    if (calendarCurrency && calendarEvent && calendarYear){
      const tar = calendarData.filter(e => e.name === calendarCurrency)[0]
      const tar_data = tar.latest_events.filter(e=> e.event_code === calendarEvent)[0]
      const filtered = tar_data.data.filter(e => isDateInCurrentYear(e.date,Number(calendarYear)))
      const seasonality = filtered.map(e => ({date : e.date,seasonality : Number(e.avg_score.toFixed(4)),trend : Number(e.trend.toFixed(4)) }))
      const res = filtered.map(e => {return {date : e.date,forecast : Number(e.forecast.toFixed(4)),actual: Number(e.actual.toFixed(4)),previous:Number(e.previous.toFixed(4)),score:Number(e.score.toFixed(4))}})
      res.sort((a, b) => new Date(a.date) - new Date(b.date))
      seasonality.sort((a, b) => new Date(a.date) - new Date(b.date))
      setGraphCalendarData(res)
      //setSeasonalityGraphData(seasonality)
    }
  },[calendarCurrency,calendarEvent,calendarYear])

  useEffect(() => {
    if (calendarYear){
      fetchDataSeasonality(calendarYear)
    }
  },[calendarYear])

  useEffect(() => {

    const t_data = seasApi.filter(e => e.name === seasonalityCurrency)
    console.log(t_data)
    console.log(calendarYear)
    const seas_data = t_data.length > 0 ? t_data[0].seasonalities.filter(e => e.year === Number(calendarYear)) : []
    console.log(seas_data)
    const res = t_data.length > 0 ? seas_data.map(e => {return {date : `${e.month}/${e.year}`,seasonality:e.value,trend:t_data[0].trend}}) : []
    setSeasonalityGraphData(res)
  },[seasonalityCurrency,seasApi])



  useEffect(() => {
    if (user.logged) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {}, [calendarData]);

 

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Fundamental data Exclusive for Admin</title>
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
                  <h1>FUNDAMENTAL DATA</h1>
                </div>
                
              </div>
            </div>
          </section>

          {loading && (
            <h4 className="text-white text-center pt-5 blink">
              PLEASE WAIT GRAPHS ARE LOADING...
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
                                  <option key={"retail"} value={"retail"}>
                                    {"Retail Sales"}
                                  </option>
                                  <option key={"ppi"} value={"ppi"}>
                                    {"PPI"}
                                  </option>
                                  <option key={"interest"} value={"interest"}>
                                    {"Interest"}
                                  </option>
                                
                            </select>

                            <select
                              className="form-control form-control-sm form-control-select"
                              onChange={(e) =>
                                setCalendarYear(e.target.value)
                              }
                              value={calendarYear}
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
                        </div>
                        <div className="card-body" style={{ fontSize: "11px" }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
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
                              <Line
                                type="monotone"
                                dataKey="previous"
                                stroke="#05FFFF"
                              ></Line>
                              <Line
                                type="monotone"
                                dataKey="actual"
                                stroke="#032950"
                              ></Line>
                              <Line
                                type="monotone"
                                dataKey="forecast"
                                stroke="#035550"
                              ></Line>
                              <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#034550"
                              ></Line>
                              
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
                            Seasonality & Trend
                          </h5>
                          <div className="card-tools">
                            <select
                              className="form-control form-control-sm form-control-select"
                              onChange={(e) =>{
                                console.log(e.target.value)
                               setSeasonalityCurrency(e.target.value)

                              }
                              }
                              value={seasonalityCurrency}
                            >
                              <option selected="selected" disabled={true}>
                                Select Symbol Name
                              </option>
                              {seasonalityOptions.map((e, i) => {
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
                                seasonalityGraphData && seasonalityGraphData
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
                              <Line
                                type="monotone"
                                dataKey="seasonality"
                                stroke="#05FFFF"
                              ></Line>
                              <Line
                                type="monotone"
                                dataKey="trend"
                                stroke="#032950"
                              ></Line>
                              
                              
                            </LineChart>
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

export default FundamentalReports;
