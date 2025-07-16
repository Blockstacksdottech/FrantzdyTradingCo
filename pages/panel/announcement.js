import Head from "next/head";
import HeadLink from "../components/panel/headlink";
import Sidebar from "../components/panel/sidebar";
import Menu from "../components/panel/menu";
import ScriptLink from "../components/panel/scriptlink";
import Footer from "../components/panel/footer";
import React, { Component, useEffect, useState } from "react";
import Checker from "../components/Checker";
import { req, postReq, formatDateLocal } from "@/helpers";

export default function Announcement() {
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    const resp = await req("announcement");
    if (resp) {
      setAnnouncements(resp);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Announcements | Frantzdy Trading & Co., LLC - Latest Updates</title>
        <meta
          name="description"
          content="Stay informed with the latest announcements from Frantzdy Trading & Co., LLC. Access important updates, new features, and company news to keep your trading strategies aligned with our services."
        />
        <meta
          name="keywords"
          content="Frantzdy Trading & Co., LLC announcements, company updates, new features, trading news, service updates"
        />
      </Head>
      <Checker tier={1}>
        <HeadLink />
        <Menu />
        <Sidebar />

        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>ANNOUNCEMENT</h1>
                </div>
                <div className="col-sm-6">
                  <a
                    class="btn btn-export box-shadow float-right"
                    href="../panel/createannouncement"
                  >
                    Create Announcement
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
                    {announcements &&
                      announcements.map((e, i) => {
                        return (
                          <div className="card mb-3">
                            <div className="card-header">
                              <h4 className="card-title">
                                <p className="small text-primary">
                                  {formatDateLocal(e.date)}
                                </p>
                                {e.topic}
                              </h4>
                            </div>
                            <div className="card-body">{e.description}</div>
                          </div>
                        );
                      })}
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
