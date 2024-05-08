import style from "./right-header.module.css";
import login from "../../image/login.svg";
import exit from "../../../../../icons/exit.svg";
import registration from "../../image/registration.svg";
import admin from "../../image/admin-panel.svg";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const RightHeader = ({ loginName, onLogout }) => {

  const userRoleId = useSelector((state) => state.user.roleId);
  const access = () => {
    if (userRoleId === 0 || userRoleId === 1) {
      return true;
    }
  };
  const checkAccess = access();

  return (
    <>
      {loginName && loginName !== "guest" ? (
        <div className={style.authWrapper}>
          <div className={style.HeaderAuth}> {loginName} </div>
          {checkAccess && (
            <NavLink to={"/admin-panel"} className={style.newProduct}>
              <img src={admin} alt="Админка" className={style.HeaderAdd} />
            </NavLink>
          )}
          <button className={style.exitButton} onClick={onLogout}>
            <img src={exit} className={style.HeaderExit} alt="exit button" />
          </button>
        </div>
      ) : (
        <div className={style.HeaderAuth}>
          <NavLink to={"/login"}>
            <img src={login} alt="Вход" className={style.HeaderLogin} />
          </NavLink>
          <NavLink to={"/register"}>
            <img
              src={registration}
              alt="Регистрация"
              className={style.HeaderRegistration}
            />
          </NavLink>
        </div>
      )}
    </>
  );
};
