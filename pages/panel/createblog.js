import Head from "next/head";
import HeadLink from "../components/panel/headlink";
import Sidebar from "../components/panel/sidebar";
import Menu from "../components/panel/menu";
import ScriptLink from "../components/panel/scriptlink";
import Footer from "../components/panel/footer";
import React, { useEffect } from "react";
import Checker from "../components/Checker";

const CreateBlog = () => {
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
        <title>Write a Blog</title>
        <meta name="description" content="Frantzdy Trading Co - Write a Blog" />
      </Head>
      <HeadLink />
      <Menu />
      <Sidebar />

      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>WRITE A BLOG</h1>
              </div>
              <div className="col-sm-6">
                <a
                  className="btn btn-export box-shadow float-right"
                  href="../panel/blog"
                >
                  Back to Blog
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
                      <div className="form-group">
                        <label>Topic</label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                        />
                      </div>
                      <div className="form-group">
                        <label>Thumbnail</label>
                        <input
                          className="form-control form-control-lg"
                          type="file"
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea id="summernote"></textarea>
                      </div>
                      <div className="form-group">
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
          </section>
        </Checker>
      </div>
      <Footer />
      <ScriptLink />
    </>
  );
};

export default CreateBlog;
