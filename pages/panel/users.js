import Head from "next/head";
import HeadLink from "../components/panel/headlink";
import Sidebar from "../components/panel/sidebar";
import Menu from "../components/panel/menu";
import ScriptLink from "../components/panel/scriptlink";
import Footer from "../components/panel/footer";
import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  formatDateLocal,
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

const Users = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "../panel/js/datatable.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const resp = await req("userlist");
    if (resp) {
      setUsers(resp);
    }
    setLoading(false);
  };

  const switchStatus = async (id) => {
    const resp = await postReq("userlist", {
      userid: id,
    });
    if (resp) {
      toast.success("User Banned");
      fetchUsers();
    } else {
      toast.error("Failed");
    }
  };

  const addToMember = async (id,isMember) => {
    const resp = await postReq("userpromote", {
      userid: id,
      action : isMember ? "demote" : "promote" 
    });
    if (resp) {
      toast.success("User Updated");
      fetchUsers();
    } else {
      toast.error("Failed");
    }
  }

  const deleteUser = async (id) => {
    const resp = await postReq("userdelete", {
      userid: id,
    });
    if (resp) {
      toast.success("User Deleted");
      fetchUsers();
    } else {
      toast.error("Failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Registered Users</title>
        <meta
          name="description"
          content="Frantzdy Trading Co - Registered Users"
        />
      </Head>
      <HeadLink />
      <Menu user={user} />
      <Sidebar />

      <Checker only_admin={true}>
        {!loading && (
          <>
            <div className="content-wrapper">
              <section className="content-header">
                <div className="container-fluid">
                  <div className="row mb-2">
                    <div className="col-sm-6">
                      <h1>USERS</h1>
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
                                  <th>Subscription</th>
                                  <th>Date of Joining</th>
                                  <th>Status</th>
                                  <th>Team Member</th>
                                  <th>Details</th>
                                  <th>Promote</th>
                                  <th>Ban</th>
                                  <th>Delete</th>
                                </tr>
                              </thead>
                              <tbody className="text-center">
                                {users.map((e, i) => {
                                  return (
                                    <tr>
                                      <td>
                                        <img
                                          alt="Avatar"
                                          className="table-avatar"
                                          src={
                                            e.image
                                              ? formatImage(
                                                  e.image.profile_picture
                                                )
                                              : "../frontend/images/team/team-1.png"
                                          }
                                        />
                                      </td>
                                      <td className="text-capitalize">
                                        {e.username}
                                      </td>
                                      <td>{e.email}</td>
                                      <td className="text-uppercase">
                                        {e.sub.valid
                                          ? getSubName(e.sub.tier)
                                          : "Not Subscribed"}
                                      </td>
                                      <td>{formatDateLocal(e.date_joined)}</td>
                                      <td>
                                        {e.is_active && (
                                          <a className="badge bg-success">
                                            Active
                                          </a>
                                        )}
                                        {!e.is_active && (
                                          <a className="badge bg-danger">
                                            Banned
                                          </a>
                                        )}
                                      </td>
                                      <td>
                                        {e.is_member && (
                                          <a className="badge bg-success">
                                            Active
                                          </a>
                                        )}
                                        {!e.is_member && (
                                          <a className="badge bg-danger">
                                            Not Active
                                          </a>
                                        )}
                                      </td>
                                      <td>
                                        <a className="btn btn-sm btn-table-dark">
                                          <i className="far fa-eye"></i>
                                        </a>
                                      </td>
                                      <td onClick={() => addToMember(e.id,e.is_member)}>
                                        <a className="btn btn-sm btn-table-dark">
                                          <p className="font-weight-bold m-0">{e.is_member ? "-" : "+"}</p>
                                        </a>
                                      </td>
                                      <td onClick={() => switchStatus(e.id)}>
                                        <a className="btn btn-sm btn-danger">
                                          <i className="fa fa-ban"></i>
                                        </a>
                                      </td>
                                      <td onClick={() => deleteUser(e.id)}>
                                        <a className="btn btn-sm btn-danger">
                                          <i className="fa fa-trash-alt"></i>
                                        </a>
                                      </td>
                                    </tr>
                                  );
                                })}
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
          </>
        )}

        <Footer />
        <ScriptLink />
      </Checker>
    </>
  );
};

export default Users;
