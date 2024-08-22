import Head from "next/head";
import React, { Component, useContext, useEffect, useState } from "react";
import Checker from "../components/Checker";
import { postReq, req, reqNoAuth, formatDateLocal, logout } from "@/helpers";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { public_stripe_key } from "@/helpers/constants";
import { UserContext } from "@/contexts/UserContextData";
import { useRouter } from "next/router";
import ScriptLink from "../components/panel/scriptlink";
import Menu from "../components/panel/menu";
import HeadLink from "../components/panel/headlink";
import Sidebar from "../components/panel/sidebar";
import Footer from "../components/panel/footer";

export default function Subscription(props) {
  const [payments, setPayments] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [subscription, setSubscription] = useState(null);
  const [cancelation, setCancelation] = useState(null);
  const nav = useRouter();

  const transmitAction = async (body) => {
    const res = await postReq("subscription-handler", body);
    if (res) {
      toast.success(
        body.action === "upgrade"
          ? "Subscription updated"
          : "Subscription Canceled"
      );
      if (body.action === "cancel") {
        logout(nav, setUser);
      }
    } else {
      toast.error(`Failed`);
    }
  };

  const fetchPayments = async () => {
    const resp = await reqNoAuth("/payment/subscribable-product", true);
    if (resp) {
      console.log(resp);
      setPayments(resp);
    }
  };
  const fetchSubscription = async () => {
    const resp = await req("subscription-handler");
    if (resp) {
      setSubscription(resp.subscriptionId);
      setCancelation({
        cancel_date: resp.cancel_date,
        cancel_at_end: resp.cancel_at_end,
        show: resp.show,
      });
    } else {
      toast.error("Subscription not found");
      nav.push("/joinus");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    if (user.logged) {
      if (user && !user.valid) {
        nav.push("/joinus");
      } else if (user && user.valid) {
        fetchSubscription();
      }
    }
  }, [user]);

  function filterByNameKeyword(array, keyword) {
    return array.filter((obj) =>
      obj.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  const upgrade = async (keyword) => {
    if (!user.logged) {
      toast.info("First Register yourself");
      nav.push("/register");
    } else {
      if (!user.valid) {
        nav.push("/joinus");
      }
      const objects = filterByNameKeyword(payments, keyword);
      if (objects.length > 0) {
        console.log(objects[0]);
        const payment_id = objects[0].price_id;
        const body = {
          pid: payment_id,
          action: "upgrade",
          sid: subscription,
        };
        await transmitAction(body);
      } else {
        toast.error("Not supported");
      }
    }
  };

  const cancel = async (keyword) => {
    if (!user.logged) {
      toast.info("First Register yourself");
      nav.push("/register");
    } else {
      if (!user.valid) {
        nav.push("/joinus");
      }
      const objects = filterByNameKeyword(payments, keyword);
      if (objects.length > 0) {
        console.log(objects[0]);
        const payment_id = objects[0].price_id;
        const body = {
          pid: payment_id,
          action: "cancel",
          sid: subscription,
        };
        await transmitAction(body);
      } else {
        toast.error("Not supported");
      }
    }
  };

  const getPrice = (keyword) => {
    const objects = filterByNameKeyword(payments, keyword);
    if (objects.length > 0) {
      console.log(objects[0]);
      const price = objects[0].price / 100;
      return price;
    } else {
      return null;
    }
  };

  return (
    <Checker no_login={true}>
      <>
        <Head>
          <title>
            Frantzdy Trading CO - Trading become easier when you trade with us
          </title>
        </Head>
        <HeadLink />
        <Menu />
        <Sidebar />
        {subscription && user.valid && (
          <>
            {" "}
            <div className="content-wrapper">
              <section class="content-header">
                <div class="container-fluid">
                  <div class="row mb-2">
                    <div class="col-sm-12">
                      <h1>Your Subscription</h1>
                    </div>
                  </div>
                </div>
              </section>
              <div className="content">
                <section className="mt-3">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="card h-100 border-0 rounded pricing-table table-1">
                          <div className="card-header pt-4 pb-1 bg-transparent text-center">
                            BASIC
                            <h2 className="mb-0">
                              $
                              {getPrice("basic")
                                ? getPrice("basic").toFixed(2)
                                : "Undefined"}
                              /Month
                            </h2>
                            {/* <p>7-days free trial</p> */}
                          </div>
                          <div className="card-body p-0">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                Weekly COT report signal summaries
                              </li>
                              <li className="list-group-item">
                                Basic educational content on how to interpret
                                COT reports
                              </li>
                              <li className="list-group-item">
                                Access to a community forum
                              </li>
                            </ul>
                          </div>
                          <div className="card-footer py-3 bg-transparent">
                            <div className="text-center">
                              {user.tier === 1 && (
                                <a
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => cancel("basic")}
                                >
                                  Unsubscribe
                                </a>
                              )}
                              {user.tier !== 1 && (
                                <a
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => upgrade("basic")}
                                >
                                  Upgrade
                                </a>
                              )}
                              {user.tier === 1 &&
                                cancelation.cancel_at_end &&
                                cancelation.show && (
                                  <>
                                    <p>
                                      Cancels :{" "}
                                      {formatDateLocal(cancelation.cancel_date)}
                                    </p>
                                  </>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="card h-100 border-0 rounded pricing-table table-1">
                          <div className="card-header pt-4 pb-1 bg-transparent text-center">
                            STANDARD
                            <h2 className="mb-0">
                              $
                              {getPrice("standard")
                                ? getPrice("standard").toFixed(2)
                                : "Undefined"}
                              /Month
                            </h2>
                          </div>
                          <div className="card-body p-0">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                All Basic Plan features
                              </li>
                              <li className="list-group-item">
                                Bi-weekly COT report signal analysis
                              </li>
                              <li className="list-group-item">
                                Detailed breakdowns of major market positions
                                (e.g., futures, options)
                              </li>
                              <li className="list-group-item">
                                Monthly webinars with market experts
                              </li>
                              <li className="list-group-item">
                                Priority email support
                              </li>
                            </ul>
                          </div>
                          <div className="card-footer">
                            <div className="text-center">
                              {user.tier === 2 && (
                                <a
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => cancel("standard")}
                                >
                                  Unsubscribe
                                </a>
                              )}
                              {user.tier !== 2 && (
                                <a
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => upgrade("standard")}
                                >
                                  Upgrade
                                </a>
                              )}
                              {user.tier === 2 &&
                                cancelation.cancel_at_end &&
                                cancelation.show && (
                                  <>
                                    <p>
                                      Cancels :{" "}
                                      {formatDateLocal(cancelation.cancel_date)}
                                    </p>
                                  </>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="card h-100 border-0 rounded pricing-table table-1">
                          <div className="card-header pt-4 pb-1 bg-transparent text-center">
                            PREMIUM
                            <h2 className="mb-0">
                              $
                              {getPrice("premium")
                                ? getPrice("premium").toFixed(2)
                                : "Undefined"}
                              /Month
                            </h2>
                          </div>
                          <div className="card-body p-0">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                All Standard Plan features
                              </li>
                              <li className="list-group-item">
                                Weekly in-depth COT report signal analysis
                              </li>
                              <li className="list-group-item">
                                Real-time alerts on significant COT report
                                changes
                              </li>
                              <li className="list-group-item">
                                Access to exclusive market trend reports
                              </li>
                              <li className="list-group-item">
                                One-on-one consultation sessions (1 per month)
                              </li>
                              <li className="list-group-item">
                                Dedicated account manager
                              </li>
                            </ul>
                          </div>
                          <div className="card-footer">
                            <div className="text-center">
                              {user.tier === 3 && (
                                <a
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => cancel("premium")}
                                >
                                  Unsubscribe
                                </a>
                              )}
                              {user.tier !== 3 && (
                                <a
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => upgrade("premium")}
                                >
                                  Upgrade
                                </a>
                              )}
                              {user.tier === 3 &&
                                cancelation.cancel_at_end &&
                                cancelation.show && (
                                  <>
                                    <p>
                                      Cancels :{" "}
                                      {formatDateLocal(cancelation.cancel_date)}
                                    </p>
                                  </>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="card h-100 border-0 rounded pricing-table table-1">
                          <div className="card-header pt-4 pb-1 bg-transparent text-center">
                            ENTERPRISE
                            <h3 className="mb-0">
                              $
                              {getPrice("custom")
                                ? getPrice("custom").toFixed(2)
                                : "Undefined"}
                              /2Years
                            </h3>
                          </div>
                          <div className="card-body p-0">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                All Premium Plan features
                              </li>
                              <li className="list-group-item">
                                Tailored COT report signal analysis based on
                                specific market interests
                              </li>
                              <li className="list-group-item">
                                Regular strategy sessions with top analysts
                              </li>
                              <li className="list-group-item">
                                On-demand market research reports
                              </li>
                              <li className="list-group-item">
                                Full access to historical COT data archives
                              </li>
                              <li className="list-group-item">
                                Priority support with a dedicated team
                              </li>
                            </ul>
                          </div>
                          <div className="card-footer">
                            <div className="text-center">
                              {user.tier === 4 && (
                                <a
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => cancel("custom")}
                                >
                                  Unsubscribe
                                </a>
                              )}
                              {user.tier !== 4 && (
                                <a
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => upgrade("custom")}
                                >
                                  Upgrade
                                </a>
                              )}
                              {user.tier === 4 &&
                                cancelation.cancel_at_end &&
                                cancelation.show && (
                                  <>
                                    <p>
                                      Cancels :{" "}
                                      {formatDateLocal(cancelation.cancel_date)}
                                    </p>
                                  </>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </>
        )}

        <Footer />
        <ScriptLink />
      </>
    </Checker>
  );
}
