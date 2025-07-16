import Head from "next/head";
import HeadLink from "../components/panel/headlink";
import Sidebar from "../components/panel/sidebar";
import Menu from "../components/panel/menu";
import ScriptLink from "../components/panel/scriptlink";
import Footer from "../components/panel/footer";
import React, { useEffect, useState, useRef, useContext } from "react";
import Checker from "../components/Checker";
import SummernoteLite from "react-summernote-lite";

import "react-summernote-lite/dist/esm/dist/summernote-lite.min.css";
import { toast } from "react-toastify";
import { uploadFiles } from "@/helpers";
import { UserContext } from "@/contexts/UserContextData";
import { useRouter } from "next/router";

const CreateBlog = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const noteRef = useRef();

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "../panel/js/datatable.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  // }, []);

  const save = async () => {
    if (!image) {
      toast.error("Please select an image");
    } else {
      const code = noteRef.current.summernote("code");
      const body = {
        title,
        content: code,
      };
      const res = await uploadFiles([image], body, "image", "blog/");
      if (res) {
        toast.success("created");
        router.push("/panel/blog");
      } else {
        toast.error("failed upload");
      }
    }
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Write a Blog</title>
        <meta name="description" content="Frantzdy Trading & Co., LLC - Write a Blog" />
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
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Thumbnail</label>
                        <input
                          className="form-control form-control-lg"
                          type="file"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        {/* <textarea id="summernote"></textarea> */}
                        <SummernoteLite
                          ref={noteRef}
                          defaultCodeValue={""}
                          placeholder={"Write something here..."}
                          tabsize={2}
                          lang="zh-CN" // only if you want to change the default language
                          dialogsInBody={true}
                          blockquoteBreakingLevel={0}
                          toolbar={[
                            ["style", ["style"]],
                            [
                              "font",
                              [
                                "bold",
                                "underline",
                                "clear",
                                "strikethrough",
                                "superscript",
                                "subscript",
                              ],
                            ],
                            ["fontsize", ["fontsize"]],
                            ["fontname", ["fontname"]],
                            ["para", ["ul", "ol", "paragraph"]],
                            ["table", ["table"]],
                            ["insert", ["link", "picture", "video", "hr"]],
                            ["view", ["fullscreen", "codeview", "help"]],
                          ]}
                          fontNames={[
                            "Arial",
                            "Georgia",
                            "Verdana",
                            "e.t.c...",
                          ]}
                          callbacks={{
                            onImageUpload: function (files) {
                              setImageFiles(files);
                            },
                            onKeyup: function (e) {},
                            onKeyDown: function (e) {},
                            onPaste: function (e) {},
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <div className="float-right">
                          <a
                            className="btn btn-table-dark box-shadow-2"
                            onClick={save}
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
          </section>
        </Checker>
      </div>
      <Footer />
      <ScriptLink />
    </>
  );
};

export default CreateBlog;
