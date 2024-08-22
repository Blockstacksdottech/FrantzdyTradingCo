import Head from "next/head";
import HeadLink from "../components/panel/headlink";
import Sidebar from "../components/panel/sidebar";
import Menu from "../components/panel/menu";
import ScriptLink from "../components/panel/scriptlink";
import Footer from "../components/panel/footer";
import React, { useEffect, useState } from "react";
import Checker from "../components/Checker";
import { req, postReq, deleteReq, formatDate } from "@/helpers";
import { toast } from "react-toastify";

export default function CreateAnnouncement() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "../panel/js/datatable.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const [announcements, setAnnouncements] = useState([]);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const fetchAnnouncements = async () => {
    const resp = await req("adm-announcement");
    if (resp) {
      setAnnouncements(resp);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const create_Announcement = async (e) => {
    e.preventDefault();
    const body = {
      topic,
      description,
    };
    const resp = await postReq("adm-announcement/", body);
    if (resp) {
      toast.success("Announcement created");
      fetchAnnouncements();
    }
  };

  const deleteAnnounc = async (id) => {
    const resp = await deleteReq(`adm-announcement/${id}`);
    if (resp) {
      toast.success("Deleted");
      fetchAnnouncements();
    } else {
      toast.error("Failed");
    }
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Create Announcement</title>
        <meta
          name="description"
          content="Frantzdy Trading Co - Create Announcement"
        />
      </Head>
      <Checker only_admin={true}>
        <HeadLink />
        <Menu />
        <Sidebar />

        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Create Announcement</h1>
                </div>
                <div className="col-sm-6">
                  <a
                    class="btn btn-export box-shadow float-right"
                    href="../panel/announcement"
                  >
                    Back to Announcement
                  </a>
                </div>
              </div>
            </div>
          </section>
          <div className="content">
            <section>
              <div className="container-fluid">
                <div class="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <form>
                          <div className="form-group">
                            <input
                              id="topic"
                              type="text"
                              className="form-control"
                              placeholder="Topic of Announcement"
                              value={topic}
                              onChange={(e) => setTopic(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              placeholder="Description"
                              rows={7}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                          <div className="form-group float-right">
                            <button
                              className="btn btn-table-dark box-shadow-2"
                              onClick={(e) => {
                                e.preventDefault();
                                console.log("clicked");
                                create_Announcement(e);
                              }}
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="card-title">ANNOUNCEMENTS</h5>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-borderless datatable">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Announcements</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {announcements &&
                                announcements.map((e, i) => {
                                  return (
                                    <tr>
                                      <td>{formatDate(new Date(e.date))}</td>
                                      <td>
                                        <h5>{e.topic}</h5>
                                        {e.description}
                                      </td>
                                      <td>
                                        <a
                                          className="btn btn-sm btn-danger"
                                          onClick={() => deleteAnnounc(e.id)}
                                        >
                                          <i className="fa fa-trash"></i>
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
        </div>
      </Checker>

      <Footer />
      <ScriptLink />
    </>
  );
}
