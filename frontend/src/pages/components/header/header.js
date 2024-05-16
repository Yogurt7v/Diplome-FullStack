import style from "./header.module.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {clearBusketData} from "../../../slices/busketSlice";
import { logout } from "../../../slices/userSlice";
import { NavMenu, LeftHeader, RightHeader } from "./nav-menu";

export const Header = ({ onCategoryChange, isActiveItem }) => {
  const loginName = useSelector((state) => state.user.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  const onLogout = () => {

    dispatch(logout());
    localStorage.removeItem("userData");
    dispatch(clearBusketData());
    let currentURL = window.location.pathname;
    if (currentURL === "/admin-panel") {
      navigate("/");
    }
  };

  useEffect(() => {
    let currentURL = window.location.pathname;
    if (currentURL !== "/") {
      setVisible(false);
    }
  }, []);

  return (
    <div className={style.HeaderWrapper}>
      <LeftHeader/>
      <div className={style.HeaderMenuWrapper}>
        {visible ? (
          <NavMenu
            onCategoryChange={onCategoryChange}
            isActiveItem={isActiveItem}
          />
        ) : null}
      </div>
      <RightHeader loginName={loginName} onLogout={onLogout} />
    </div>
  );
};

export default Header;
