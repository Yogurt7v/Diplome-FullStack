import style from "./register-page.module.css";
import eye from "../../icons/eye.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { selectUserRole } from "../../selectors";
import { setUser } from "../../actions";
import { ROLE } from "../../constants/role";
import { useResetForm } from "../../hooks";
import { Header } from "../components";
import Slider from "../components/slider/Slider";
import { InputMask } from "@react-input/mask";
import { registerFetch } from "../../fetchs";

const regFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .matches(/\w+$/, "Логин не подходит. Допускаются только буквы и цифры")
    .min(3, "Неверный логин. Логин слишком мал")
    .max(15, "Неверный логин. Логин слишком большой"),
  password: yup
    .string()
    .required("Пустой пароль")
    .matches(
      /^[\w#%]+$/,
      "Неподходящий пароль. Допускаются только буквы, цифры и символы"
    )
    .min(8, "Неверный пароль. Слишком мал. Не меньше 8 символов")
    .max(30, "Неверный пароль. Пароль слишком большой. Не больше 30 символов"),
  passcheck: yup
    .string()
    .required("Пустой пароль")
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать!"),
  address: yup.string().required("Заполните адрес"),
  homeNumber: yup.string().required("Заполните домашний номер"),
  flatNumber: yup.string().required("Заполните квартиру"),
  phone: yup
    .string()
    .required("Заполните телефон")
    .min(10, "Неверный телефон. Телефон слишком мал"),
});

export const RegisterPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      passcheck: "",
      address: "",
      homeNumber: "",
      flatNumber: "",
      phone: "",
    },
    resolver: yupResolver(regFormSchema),
  });

  const [serverError, setServerError] = useState();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const roleId = useSelector(selectUserRole);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [geoAddress, setGeoAddress] = useState({});
  const [checkPassword, setCheckPassword] = useState(false);

  useResetForm(reset);

  const onSubmit = ({
    login,
    password,
    address,
    homeNumber,
    flatNumber,
    phone,
  }) => {
    registerFetch(login, password, address, homeNumber, flatNumber, phone).then(
      ({ error, res }) => {
        if (error) {
          setServerError(`${error}`);
          return;
        }
        dispatch(setUser(res));
        localStorage.setItem("userData", JSON.stringify(res));
        navigate("/");
      }
    );
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    });

    const geoAdress = async () => {
      const response = await fetch(
        `https://catalog.api.2gis.com/3.0/items/geocode?lat=${latitude}&lon=${longitude}&fields=items.point&key=3827dd82-e134-4dbb-8cbe-4642b95009b4`
      );
      const data = await response.json();
      const { result } = data;
      setGeoAddress(result);
    };
    geoAdress();
  }, [latitude, longitude]);

  const formError =
    errors?.login?.message ||
    errors?.password?.message ||
    errors?.passcheck?.message ||
    errors?.address?.message ||
    errors?.homeNumber?.message ||
    errors?.flatNumber?.message ||
    errors?.phone?.message;
  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div className={style.registerPageWrapper}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.registerForm}>
          <h2 className={style.registerFormTitle}>Регистрация</h2>
          <input
            type="text"
            placeholder="Логин"
            className={style.registerInput}
            autoComplete="off"
            {...register("login", {
              onChange: () => setServerError(null),
            })}
          ></input>
          <div className={style.passwordContainer}>
            <input
              type={checkPassword ? "text" : "password"}
              placeholder="Пароль"
              className={style.registerInput}
              autoComplete="on"
              {...register("password", {
                onChange: () => setServerError(null),
              })}
            ></input>
            <img
              src={eye}
              className={style.eye}
              alt="eye"
              onMouseDown={() => setCheckPassword(!checkPassword)}
              onMouseUp={() => setCheckPassword(!checkPassword)}
            ></img>
          </div>
          <div className={style.passwordContainer}>
            <input
              type={checkPassword ? "text" : "password"}
              placeholder="Повтор пароля"
              className={style.registerInput}
              autoComplete="on"
              {...register("passcheck", {
                onChange: () => setServerError(null),
              })}
            ></input>
            <img
              src={eye}
              className={style.eye}
              alt="eye"
              onMouseDown={() => setCheckPassword(!checkPassword)}
              onMouseUp={() => setCheckPassword(!checkPassword)}
              sa
            ></img>
          </div>
          <input
            name="address"
            list="address"
            type="text"
            placeholder="Адрес"
            autoComplete="off"
            className={style.registerInput}
            {...register("address", {
              onChange: () => setServerError(null),
            })}
          ></input>
          <datalist id="address">
            {geoAddress?.items?.map((item) => (
              <option key={item?.id} value={item?.full_name} />
            ))}
          </datalist>
          <input
            type="text"
            placeholder="Номер дома"
            className={style.registerInput}
            autoComplete="on"
            {...register("homeNumber", {
              onChange: () => setServerError(null),
            })}
          ></input>
          <input
            type="number"
            placeholder="Номер квартиры"
            className={style.registerInput}
            autoComplete="on"
            {...register("flatNumber", {
              onChange: () => setServerError(null),
            })}
          ></input>
          <InputMask
            mask="+7 (___) ___-__-__"
            replacement={{ _: /\d/ }}
            placeholder="Телефон"
            className={style.registerInput}
            autoComplete="on"
            {...register("phone", {
              onChange: () => setServerError(null),
            })}
          />
          <button
            type="submit"
            disabled={!!formError}
            children={"Зарегистрироваться"}
            className={style.registerButton}
          ></button>
          {errorMessage && (
            <div className={style.errorMessage}>{errorMessage}</div>
          )}
        </form>
        <div className={style.sliderWrapper}>
          <Slider />
        </div>
      </div>
    </>
  );
};
