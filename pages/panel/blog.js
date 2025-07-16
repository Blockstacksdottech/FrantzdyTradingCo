import Head from "next/head";
import HeadLink from "../components/panel/headlink";
import Sidebar from "../components/panel/sidebar";
import Menu from "../components/panel/menu";
import ScriptLink from "../components/panel/scriptlink";
import Footer from "../components/panel/footer";
import React, { useEffect, useState } from "react";
import Checker from "../components/Checker";
import { deleteReq, formatDateLocal, formatImage, req } from "@/helpers";
import { toast } from "react-toastify";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs4";
import "datatables.net-responsive-dt";

const Blog = () => {
  DataTable.use(DT);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const fetchBlogs = async () => {
    setLoading(true);
    const resp = await req("blog");
    if (resp) {
      setArticles(resp);
    }
    setLoading(false);
  };

  const delPost = async (id) => {
    const resp = await deleteReq(`blog/${id}`);
    if (resp) {
      toast.success("deleted");
      fetchBlogs();
    } else {
      toast.error("Failed");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Blog</title>
        <meta name="description" content="Frantzdy Trading & Co., LLC - Blog" />
      </Head>
      <HeadLink />
      <Menu />
      <Sidebar />

      <Checker only_admin={true}>
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

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      {!loading && (
                        <DataTable
                          className="table projects"
                          options={{
                            responsive: true,
                            sorting: true,
                            pageLength: 5,
                            lengthMenu: [
                              [5, 10, 20, -1],
                              [5, 10, 20, "All"],
                            ],
                            language: {
                              search: "",
                              searchPlaceholder: "Search",
                              sLengthMenu: "_MENU_",
                            },
                          }}
                        >
                          <thead>
                            <tr>
                              <th>Thumbnail</th>
                              <th>Topic</th>
                              <th className="text-right">Edit</th>
                              <th className="text-right">Delete</th>
                            </tr>
                          </thead>

                          <tbody>
                            {articles.length > 0 &&
                              articles.map((e, i) => {
                                return (
                                  <tr key={i}>
                                    <td>
                                      <img
                                        alt={e.title}
                                        className="blog"
                                        src={
                                          e.image
                                            ? formatImage(e.image)
                                            : "../frontend/images/team/team-1.png"
                                        }
                                      />
                                    </td>
                                    <td>
                                      <p className="mb-0 font-weight-bold">
                                        {e.title}
                                      </p>
                                      <p className="mb-0">
                                        Author: {e.user.username}
                                      </p>
                                      <p className="mb-0">
                                        Published on: {formatDateLocal(e.date)}
                                      </p>
                                    </td>
                                    <td className="text-right">
                                      <a
                                        href={"/panel/editblog?id=" + e.slug}
                                        className="btn btn-sm btn-table-dark"
                                      >
                                        <i className="fa fa-edit"></i>
                                      </a>
                                    </td>
                                    <td
                                      className="text-right"
                                      onClick={() => delPost(e.slug)}
                                    >
                                      <a className="btn btn-sm btn-danger">
                                        <i className="fa fa-trash-alt"></i>
                                      </a>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </DataTable>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Checker>
      <Footer />
      <ScriptLink />
    </>
  );
};

export default Blog;
