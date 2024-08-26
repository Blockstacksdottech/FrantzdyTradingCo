import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContextData";
import { isLogged, logout } from "@/helpers";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function Checker({ children, tier, no_check, only_admin, no_login,strict_admin }) {
  const { user, setUser } = useContext(UserContext);
  const nav = useRouter();
  useEffect(() => {
    async function test() {
      let resp = await isLogged();
      console.log(resp);
      let obj = { ...user };
      if (resp) {
        obj.logged = true;
        obj.username = resp.username;
        obj.email = resp.email;
        obj.valid = resp.isValidSub;
        obj.tier = resp.tier;
        obj.isAdmin = resp.is_superuser;
        obj.isActive = resp.is_active;
        obj.isMember = resp.is_member;
        obj.id = resp.id
        setUser(obj);
        return obj;
      } else {
        return obj;
      }
    }

    test().then((obj) => {
      if (no_login) {
        return;
      }
      if (obj.logged) {
        if (!obj.isActive) {
          toast.error("You are banned");
          logout(setUser);
          nav.push("/login");
        }
        if (only_admin) {
          if (obj.isAdmin || (obj.isMember && !strict_admin)) {
            return;
          } else {
            nav.push("/panel/cotscanner");
          }
        }
        if (no_check) {
          return;
        }
        if (obj.isAdmin || (obj.isMember && !strict_admin)) {
          return;
        }
        if (obj.valid) {
          if (obj.tier >= tier) {
            return;
          } else {
            nav.push("/panel/cotscanner");
          }
        } else {
          nav.push("/joinus");
        }
      } else {
        nav.push("/login");
      }
    });
  }, []);
  return <>{children}</>;
}

export default Checker;
