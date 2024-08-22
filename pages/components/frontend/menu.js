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
      <header className="fixed-top navigation bg-tertiary">
        <nav className="navbar navbar-expand-xl navbar-light text-center">
          <div className="container">
            <a className="navbar-brand" href="./">
              <img
                loading="prelaod"
                decoding="async"
                className="img-fluid"
                src="./logo.png"
                alt="Frantzdy Trading CO - Trading become easier when you trade with us"
              />
            </a>
            <button
              className="navbar-toggler custom-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item ">
                  <a className="nav-link" href="./">
                    HOME
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link" data-bs-toggle="dropdown">
                    FOR MEMBERS
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <a
                        className="dropdown-item"
                        href="./panel/cotpercentchange"
                      >
                        COT % CHANGE
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./panel/sentimentdata">
                        SENTIMENT DATA
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="./panel/cotscanner">
                        COT SCANNER
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item ">
                  <a className="nav-link" href="./blog">
                    BLOG
                  </a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link" href="./faq">
                    FAQ
                  </a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link" href="./contact">
                    CONTACT
                  </a>
                </li>
              </ul>

              {(!user || !user.logged) && (
                <>
                  <a href="./login" className="btn btn-outline-primary">
                    LOGIN
                  </a>
                  <a href="./joinus" className="btn btn-primary ms-2 ms-lg-3">
                    JOIN US
                  </a>
                </>
              )}

              {user && user.logged && (
                <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown">
                    <a href="#" className="nav-link" data-bs-toggle="dropdown">
                      <img
                        src={
                          image
                            ? formatImage(image.profile_picture)
                            : "/frontend/images/team/team-1.png"
                        }
                        className="user-div"
                        alt="Frantzdy Trading CO - Trading become easier when you trade with us"
                      />
                      <span className="d-none d-md-inline text-white">
                        {user && user.username}
                      </span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li>
                        <a className="dropdown-item" href="./panel/profile">
                          Profile
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => logout(nav, setUser)}
                          className="dropdown-item"
                          href="./login"
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
