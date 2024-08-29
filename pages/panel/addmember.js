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

const AddMember = () => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Add Team Member</title>
        <meta
          name="description"
          content="Frantzdy Trading Co - Add Team Member"
        />
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
                  <h1>ADD TEAM MEMBER</h1>
                </div>
                <div className="col-sm-6">
                  <a
                    className="btn btn-export box-shadow float-right"
                    href="../panel/teams"
                  >
                    Back to Teams
                  </a>
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
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Profile Photo</label>
                            <input type="file" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Profile Name</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Designation</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Mobile</label>
                            <input type="number" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8">
                          <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>City</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>State</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Country</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Zip / Postal Code</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-sm-12">
                          <div className="float-right">
                            <a className="btn btn-table-dark box-shadow-2">
                              Save
                            </a>
                          </div>
                        </div>
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

export default AddMember;
