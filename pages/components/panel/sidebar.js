"use client";
import React from "react";
import { usePathname } from "next/navigation";
export default function Sidebar() {
  const currentPath = usePathname();
  const isActive = (path) => path === currentPath;
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-1">
        <a href="../" className="brand-link">
          <img
            src="../logo.png"
            alt="Frantzdy Trading CO - Trading become easier when you trade with us"
            className="brand-image"
          />
        </a>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 d-flex">
            <div className="image">
              <img
                src="../frontend/images/team/team-1.png"
                className="img-circle elevation-2"
                alt="Frantzdy Trading CO - Trading become easier when you trade with us"
              />
            </div>
            <div className="info">
              <p href="#" className="d-block mb-0">
                George Edward
              </p>
              <span className="badge badge-primary">USER</span>
              <span className="text-online blink ml-2">Online</span>
            </div>
          </div>
          <nav className="mb-3">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-header">DATA</li>
              <li className="nav-item">
                <a
                  href="../panel/cotreport"
                  className={
                    isActive("../panel/cotreport")
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <i className="nav-icon fas fa-chart-line" />
                  <p>COT REPORTs</p>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="../panel/cotpercentchange"
                  className={
                    isActive("../panel/cotpercentchange")
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <i className="nav-icon fas fa-database" />
                  <p>COT % CHANGE</p>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="../panel/sentimentdata"
                  className={
                    isActive("../panel/sentimentdata")
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <i className="nav-icon fas fa-server" />
                  <p>Sentiment Data</p>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="../panel/cotscanner"
                  className={
                    isActive("../panel/cotscanner")
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <i className="nav-icon fas fa-signal" />
                  <p>COT Scanner</p>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="../panel/calendar"
                  className={
                    isActive("../panel/calendar")
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <i className="nav-icon fas fa-calendar-alt" />
                  <p>Calendar</p>
                </a>
              </li>
              <li className="nav-header">OTHERS</li>
              <li className="nav-item">
                <a
                  href="../panel/videospdf"
                  className={
                    isActive("../panel/videospdf")
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <i className="nav-icon fas fa-file-video" />
                  <p>Video's & PDF</p>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="../panel/announcement"
                  className={
                    isActive("../panel/announcement")
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <i className="nav-icon fas fa-bullhorn" />
                  <p>
                    Announcement
                    <span className="badge badge-primary right">2</span>
                  </p>
                </a>
              </li>
              <li className="nav-header">LIST</li>
              <li className="nav-item">
                <a
                  href="../panel/users"
                  className={
                    isActive("../panel/users") ? "nav-link active" : "nav-link"
                  }
                >
                  <i className="nav-icon fas fa-users" />
                  <p>Users</p>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="../panel/teams"
                  className={
                    isActive("../panel/teams") ? "nav-link active" : "nav-link"
                  }
                >
                  <i className="nav-icon fas fa-user-tie" />
                  <p>Team Members</p>
                </a>
              </li>
              <li className="nav-header">SETTINGS</li>
              <li className="nav-item">
                <a
                  href="../panel/profile"
                  className={
                    isActive("../panel/profile")
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <i className="nav-icon fas fa-id-card" />
                  <p>Profile</p>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="../panel/blog"
                  className={
                    isActive("../panel/blog") ? "nav-link active" : "nav-link"
                  }
                >
                  <i className="nav-icon fas fa-blog" />
                  <p>Blog</p>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="../panel/subscription"
                  className={
                    isActive("../panel/subscription")
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <i className="nav-icon fab fa-stripe-s" />
                  <p>Subscription</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
