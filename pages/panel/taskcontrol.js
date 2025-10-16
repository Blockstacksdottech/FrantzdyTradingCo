import Head from "next/head";
import HeadLink from "../components/panel/headlink";
import Sidebar from "../components/panel/sidebar";
import Menu from "../components/panel/menu";
import ScriptLink from "../components/panel/scriptlink";
import Footer from "../components/panel/footer";
import Checker from "../components/Checker";
import React, { useState } from "react";
import { postReq, req } from "@/helpers";

export default function TaskControl() {
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState(null);
  const [taskStatuses, setTaskStatuses] = useState({});

  const tasks = [
    { id: "fetch_data", name: "Fetch Data" },
    { id: "fetch_calendar", name: "Fetch Calendar" },
    { id: "fetch_seasonality", name: "Update Seasonality" },
    { id: "fetch_trends", name: "Update Trends" },
  ];

  const triggerTask = async (taskId) => {
    setLoading(taskId);
    setMessage(null);

    const resp = await postReq("admin/tasks/trigger/", { task: taskId });

    if (resp && resp.task_id) {
      setMessage(`Task "${tasks.find(e=> e.id === taskId).name}" triggered successfully.`);
      setTaskStatuses((prev) => ({
        ...prev,
        [taskId]: { id: resp.task_id, status: "PENDING" },
      }));
      pollStatus(taskId, resp.task_id);
    } else {
      setMessage(`Failed to trigger "${taskId}".`);
    }

    setLoading(null);
  };

  const pollStatus = async (taskKey, taskId) => {
    const check = async () => {
      const res = await req(`admin/tasks/status/${taskId}/`);
  
      if (res && res.status) {
        setTaskStatuses((prev) => ({
          ...prev,
          [taskKey]: { id: taskId, status: res.status },
        }));
  
        // keep checking every 5s until task is done
        if (res.status !== "SUCCESS" && res.status !== "FAILURE") {
          setTimeout(check, 5000);
        }
      } else {
        // in case of network errors or transient failures, retry anyway
        setTimeout(check, 5000);
      }
    };
  
    check();
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Task Control | Admin Dashboard</title>
        <meta name="description" content="Admin task control panel to manually trigger background updates." />
      </Head>

      <Checker only_admin={true} strict_admin={true}>
        <HeadLink />
        <Menu />
        <Sidebar />

        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>ADMIN TASK CONTROL</h1>
                </div>
              </div>
            </div>
          </section>

          <div className="content">
            <section>
              <div className="container-fluid">
                {message && (
                  <div className="alert alert-info text-center">{message}</div>
                )}
                <div className="row">
                  {tasks.map((task) => (
                    <div className="col-md-6 col-lg-3 mb-3" key={task.id}>
                      <div className="card box-shadow text-center">
                        <div className="card-body">
                          <h5 className="card-title">{task.name}</h5>
                          <p className="small text-muted">
                            {taskStatuses[task.id]?.status
                              ? `Status: ${taskStatuses[task.id].status}`
                              : "Not triggered"}
                          </p>
                          <button
                            className="btn btn-primary w-100"
                            disabled={loading === task.id}
                            onClick={() => triggerTask(task.id)}
                          >
                            {loading === task.id
                              ? "Running..."
                              : "Trigger Task"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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
