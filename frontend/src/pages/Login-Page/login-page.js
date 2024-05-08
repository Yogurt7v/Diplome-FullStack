import style from "./loginPage.module.css";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { selectUserRole } from "../../selectors";
import { setUser } from "../../actions";
import { useResetForm } from "../../hooks";
import { ROLE } from "../../constants/role";
import { Header } from "../components";
import { loginUser } from "../../fetchs";

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Пустой логин")
    .matches(/\w+$/, "Логин не подходит. Допускаются только буквы и цифры")
    .min(3, "Неверный логин. Логин слишком мал")
    .max(15, "Неверный логин. Логин слишком большой"),
  password: yup
    .string()
    .required("Пустой пароль")
    .matches(/^[\w#%]+$/, "Допускаются только буквы, цифры и символы")
    .min(8, "Неверный пароль. Слишком мал. Не меньше 8 символов")
    .max(30, "Неверный пароль. Пароль слишком большой. Не больше 30 символов"),
});

export const LoginPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
  });

  const [serverError, setServerError] = useState("");
  const roleId = useSelector(selectUserRole);
  const dispatch = useDispatch();

  useResetForm(reset);

  const onSubmit = ({ login, password }) => {
    loginUser(login, password).then(({ error, res }) => {
      if (error) {
        setServerError(`${error}`);
        return;
      }
      dispatch(setUser(res));
      localStorage.setItem("userData", JSON.stringify(res));
      setServerError(null);
    });
  };

  const formError = errors?.login?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div className={style.LoginPageWrapper}>
        <div className={style.LoginPageContent}>Login Page</div>
        <form onSubmit={handleSubmit(onSubmit)} className={style.LoginPageForm}>
          <input
            className={style.LoginPageInput}
            type="text"
            placeholder="Login"
            {...register("login", {
              onChange: () => setServerError(null),
            })}
          ></input>
          <input
            className={style.LoginPageInput}
            type="password"
            placeholder="Password"
            autoComplete="on"
            {...register("password", {
              onChange: () => setServerError(null),
            })}
          ></input>
          <button
            className={style.LoginPageButton}
            type="submit"
            disabled={!!formError}
            children={"Авторизоваться"}
          ></button>
          {errorMessage && (
            <div className={style.errorMessage}>{errorMessage}</div>
          )}
          <Link to="/register" className={style.register}>
            Регистрация
          </Link>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
