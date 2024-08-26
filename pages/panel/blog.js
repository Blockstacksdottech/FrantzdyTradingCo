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

const Blog = () => {
  const [articles,setArticles] = useState([])



  useEffect(() => {
    const script = document.createElement("script");
    script.src = "../panel/js/datatable.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const fetchBlogs = async () => {
    const resp = await req("blog")
    if (resp){
      setArticles(resp)
    }
  }

  const delPost = async (id) => {
    const resp = await deleteReq(`blog/${id}`)
    if (resp) {
      toast.success("deleted")
      fetchBlogs()
    }else{
      toast.error("Failed")
    }
  }

  useEffect(() => {
    fetchBlogs()
  },[])



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
          {
            articles.length > 0  &&<section className="content">
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
                            {
                              articles.length > 0 && articles.map((e,i ) => {
return <tr>
                              <td>
                                <img
                                  alt="Avatar"
                                  className="table-avatar"
                                  src={
                                    e.image
                                      ? formatImage(e.image)
                                      : "../frontend/images/team/team-1.png"
                                  }
                                />
                              </td>
                              <td>
                                {e.title}
                              </td>
                              <td>{e.user.username}</td>
                              <td>{formatDateLocal(e.date)}</td>
                              <td>
                                <a href={"/panel/editblog?id="+e.id} className="btn btn-sm btn-table-dark">
                                  <i className="fa fa-edit"></i>
                                </a>
                              </td>
                              <td onClick={() => delPost(e.id)}>
                                <a className="btn btn-sm btn-danger">
                                  <i className="fa fa-trash-alt"></i>
                                </a>
                              </td>
                            </tr>
                              })
                            }
                            
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          }
          
        </Checker>
      </div>
      <Footer />
      <ScriptLink />
    </>
  );
};

export default Blog;
