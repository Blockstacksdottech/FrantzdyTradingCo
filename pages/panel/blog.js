import Head from "next/head";
import HeadLink from "../components/panel/headlink";
import Sidebar from "../components/panel/sidebar";
import Menu from "../components/panel/menu";
import ScriptLink from "../components/panel/scriptlink";
import Footer from "../components/panel/footer";
import React, { useEffect } from "react";
import Checker from "../components/Checker";

const Blog = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "../panel/js/datatable.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Blog</title>
        <meta name="description" content="Frantzdy Trading Co - Blog" />
      </Head>
      <HeadLink />
      <Menu />
      <Sidebar />

      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>BLOG</h1>
              </div>
              <div className="col-sm-6">
                <a
                  className="btn btn-export box-shadow float-right"
                  href="../panel/createblog"
                >
                  Add Blog
                </a>
              </div>
            </div>
          </div>
        </section>

        <Checker only_admin={true}>
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
                              <th>Topic</th>
                              <th>Author</th>
                              <th>Published On</th>
                              <th>Edit</th>
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
                              <td>
                                Far far away, behind the word mountains, far
                                from the countries Vokalia and Consonantia.
                              </td>
                              <td>Krishna</td>
                              <td>07 Aug 2024 | 10:57 PM</td>
                              <td>
                                <a className="btn btn-sm btn-table-dark">
                                  <i className="fa fa-edit"></i>
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
        </Checker>
      </div>
      <Footer />
      <ScriptLink />
    </>
  );
};

export default Blog;
