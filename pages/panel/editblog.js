import Head from "next/head";
import HeadLink from "../components/panel/headlink";
import Sidebar from "../components/panel/sidebar";
import Menu from "../components/panel/menu";
import ScriptLink from "../components/panel/scriptlink";
import Footer from "../components/panel/footer";
import React, { useEffect, useState, useRef } from "react";
import Checker from "../components/Checker";
import SummernoteLite from "react-summernote-lite";

import "react-summernote-lite/dist/esm/dist/summernote-lite.min.css";
import { toast } from "react-toastify";
import { uploadPatchFiles, req, formatImage } from "@/helpers";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

const CreateBlog = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [content, setContent] = useState("");

  const noteRef = useRef();

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "../panel/js/datatable.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  // }, []);

  useEffect(() => {
    if (id) {
      fetchArticle(id);
    }
  }, [id]);

  const fetchArticle = async (id) => {
    const resp = await req(`blog/${id}/`);
    if (resp) {
      setArticle(resp);
      setTitle(resp.title);
      setContent(resp.content);
      setLoading(false);
    }
  };

  const save = async () => {
      const code = noteRef.current.summernote("code");
      const body = {
        title,
        content: code,
      };
      const imgArr = image ? [image] : []
      const res = await uploadPatchFiles(imgArr, body, "image", `blog/${id}/`);
      if (res) {
        toast.success("updated");
        fetchArticle(id);
      } else {
        toast.error("failed upload");
      }
    
  };

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
          {!loading && (
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
                          <div className="row">
                            <div className="col-sm-4 m-auto">
                              {article.image && (
                                <img
                                  src={formatImage(article.image)}
                                  style={{ width: 400, height: 200 }}
                                />
                              )}
                            </div>
                            <div className="col-sm-8 m-auto">
                              <input
                                className="form-control form-control-lg"
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Description</label>
                          {/* <textarea id="summernote"></textarea> */}
                          <SummernoteLite
                            ref={noteRef}
                            defaultCodeValue={content}
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
          )}
        </Checker>
      </div>
      <Footer />
      <ScriptLink />
    </>
  );
};

export default CreateBlog;
