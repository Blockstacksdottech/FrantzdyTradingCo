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
  const [image, setImage] = useState([]);
  const [userInfo, setUserInfo] = useState({
    username: null,
    email: null,
    password: null,
    confirm: null,
  });
  const [userDetails, setUserDetails] = useState({
    full_name: null,
    mobile: null,
    address: null,
    city: null,
    state: null,
    country: null,
    zip_code: null,
    position: null,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (Object.keys(userInfo).includes(name)) {
      let temp = { ...userInfo };
      temp[name] = value;

      setUserInfo(temp);
    } else {
      let temp = { ...userDetails };
      temp[name] = value;
      setUserDetails(temp);
    }
  };

  const submit_data = async () => {
    console.log(userInfo);
    // submit user data first
    if (userInfo.password && userInfo.password === userInfo.confirm) {
      const res1 = await postReq("create-team-member", userInfo);
      //const res1 = {id : 38}
      if (res1) {
        // submitting details
        const res2 = await postReq(
          `create-team-member-details?userid=${res1.id}`,
          userDetails
        );
        if (res2) {
          if (image.length > 0) {
            const res3 = await uploadFiles(
              image,
              {},
              "profile_picture",
              `create-team-member-image?userid=${res1.id}`
            );
          }
          if (res2) {
            toast.success(`Created`);
            router.push("/panel/teams");
          }
        }
      } else {
        toast.error("failed");
      }
    } else {
      toast.error("password missmatch");
    }
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Add Team Member | Frantzdy Trading CO Admin Panel</title>
        <meta
          name="description"
          content="Manage your Frantzdy Trading CO team by adding new members through the admin panel. Input member details such as username, email, and designation to expand your team efficiently."
        />
        <meta
          name="keywords"
          content="Frantzdy Trading CO add team member, admin panel, user management, team expansion, member registration"
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
                            <input
                              type="file"
                              onChange={(e) => setImage(e.target.files)}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Username</label>
                            <input
                              type="text"
                              className="form-control"
                              name="username"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="full_name"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Designation</label>
                            <input
                              type="text"
                              className="form-control"
                              name="position"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Mobile</label>
                            <input
                              type="number"
                              className="form-control"
                              name="mobile"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8">
                          <div className="form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>City</label>
                            <input
                              type="text"
                              className="form-control"
                              name="city"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>State</label>
                            <input
                              type="text"
                              className="form-control"
                              name="state"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Country</label>
                            <input
                              type="text"
                              className="form-control"
                              name="country"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Zip / Postal Code</label>
                            <input
                              type="text"
                              className="form-control"
                              name="zip_code"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Password</label>
                            <input
                              type="text"
                              className="form-control"
                              name="password"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                              type="text"
                              className="form-control"
                              name="confirm"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-sm-12">
                          <div className="float-right">
                            <a
                              className="btn btn-table-dark box-shadow-2"
                              onClick={submit_data}
                            >
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
