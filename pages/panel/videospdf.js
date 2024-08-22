import Head from "next/head";
import HeadLink from "../components/panel/headlink";
import Sidebar from "../components/panel/sidebar";
import Menu from "../components/panel/menu";
import ScriptLink from "../components/panel/scriptlink";
import Footer from "../components/panel/footer";
import React, { Component, useContext, useEffect, useState } from "react";
import Checker from "../components/Checker";
import { formatImage, req } from "@/helpers";
import { UserContext } from "@/contexts/UserContextData";

export default function VideosPdf() {
  const { user, setUser } = useContext(UserContext);
  const [links, setLinks] = useState([]);
  const [pdf, setPdf] = useState(null);

  const fetchFile = async () => {
    const resp = await req("public-pdf-file");
    if (resp) {
      console.log(resp);
      setPdf(resp);
    } else {
      setPdf(null);
    }
  };

  const fetchLink = async () => {
    const resp = await req("public-video-link");
    if (resp) {
      console.log(resp);
      setLinks(resp);
    } else {
      setLinks(null);
    }
  };

  const refreshData = async () => {
    await fetchLink();
    await fetchFile();
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Videos & PDF</title>
        <meta name="description" content="Frantzdy Trading Co - Videos & PDF" />
      </Head>
      <Checker tier={1}>
        <HeadLink />
        <Menu user={user} />
        <Sidebar />

        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>VIDEOS</h1>
                </div>
                {user && user.isAdmin && (
                  <div className="col-sm-6">
                    <div className="float-right">
                      <input
                        type="file"
                        className="btn btn-sm btn-export box-shadow font-08"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          <div className="content">
            <section>
              <div className="container-fluid">
                <div class="row">
                  {links &&
                    links.map((e, i) => {
                      return (
                        <div className="col-lg-4 mb-3">
                          <div className="card h-100">
                            <div className="card-body p-0">
                              <div className="video">
                                <div className="embed-responsive embed-responsive-16by9">
                                  <iframe
                                    className="embed-responsive-item"
                                    src={e.link}
                                    allowFullScreen
                                  ></iframe>
                                </div>
                                <h5 className="my-4 text-center">{e.topic}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
          </div>

          <section className="content-header mt-3">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>PDF</h1>
                </div>
                {user && user.isAdmin && (
                  <div className="col-sm-6">
                    <div className="float-right">
                      <input
                        type="file"
                        className="btn btn-sm btn-export box-shadow font-08"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                {pdf &&
                  pdf.map((e, i) => {
                    return (
                      <div className="col-sm-2 mb-5">
                        <div className="text-center">
                          <img
                            className="img-fluid mb-2"
                            src="../panel/img/pdf.png"
                          />
                          <p className="text-white mb-0 px-1">{e.topic}</p>

                          <div className="mt-2">
                            <a
                              href={formatImage(e.file)}
                              download
                              className="btn btn-table-dark btn-sm box-shadow-2"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </div>
      </Checker>

      <Footer />
      <ScriptLink />
    </>
  );
}
