"use client";
import { useRouter } from "next/router";
import { formatImage, logout, req } from "@/helpers";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContextData";

export default function Menu({}) {
  const nav = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const fetchUserImage = async () => {
    const resp = await req("user-image");
    if (resp) {
      console.log(resp);
      setImage(resp);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    if (user.logged) {
      fetchUserImage();
    }
  }, [user]);

  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item text-center">
            <a href="#" className="nav-link text-center">
              Data Last updated on Tuesday, 23 July, 2024
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              onClick={() => logout(nav, setUser)}
              className="nav-link btn btn-sm btn-danger white"
              href="../login"
            >
              <i className="fas fa-power-off mr-1"></i> LOGOUT
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
