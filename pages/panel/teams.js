import Head from "next/head";
import HeadLink from "../components/panel/headlink";
import Sidebar from "../components/panel/sidebar";
import Menu from "../components/panel/menu";
import ScriptLink from "../components/panel/scriptlink";
import Footer from "../components/panel/footer";
import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  formatImage,
  getSubName,
  isLogged,
  patchReq,
  postReq,
  req,
  uploadFiles,
} from "@/helpers";
import { useRouter } from "next/router";
import Checker from "../components/Checker";
import { UserContext } from "@/contexts/UserContextData";
import { toast } from "react-toastify";

const Teams = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "../panel/js/datatable.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>TEAM MEMBERS</title>
        <meta name="description" content="Frantzdy Trading Co - TEAM MEMBERS" />
      </Head>
      <HeadLink />
      <Menu user={user} />
      <Sidebar />

      <Checker only_admin={true}>
        {/* {!loading && (
          <> */}
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>TEAM MEMBERS</h1>
                </div>
                <div className="col-sm-6">
                  <div className="float-right">
                    <a className="btn btn-export box-shadow" href="./addmember">
                      Add Member
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-borderless projects datatable">
                          <thead>
                            <tr className="text-center">
                              <th></th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Designation</th>
                              <th>Date of Joining</th>
                              <th>Last Login</th>
                              <th>Details</th>
                              <th>Edit</th>
                              <th>Ban</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                            <tr>
                              <td>
                                <img
                                  alt="Avatar"
                                  className="table-avatar"
                                  src="../favicon.ico"
                                />
                              </td>
                              <td className="text-capitalize">Krishna</td>
                              <td>krishnadipak1@gmail.com</td>
                              <td className="text-capitalize">
                                Data & Quantitative Analyst
                              </td>
                              <td>07 Aug 2024 | 10:57 PM</td>
                              <td>07 Aug 2024 | 10:58 PM</td>
                              <td>
                                <a className="btn btn-sm btn-table-dark">
                                  <i className="far fa-eye"></i>
                                </a>
                              </td>
                              <td>
                                <a className="btn btn-sm btn-table-dark">
                                  <i className="fa fa-user-edit"></i>
                                </a>
                              </td>
                              <td>
                                <a className="btn btn-sm btn-danger">
                                  <i className="fa fa-ban"></i>
                                </a>
                              </td>
                              <td>
                                <a className="btn btn-sm btn-danger">
                                  <i className="fa fa-trash-alt"></i>
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* </>
        )} */}
        <Footer />
        <ScriptLink />
      </Checker>
    </>
  );
};

export default Teams;
