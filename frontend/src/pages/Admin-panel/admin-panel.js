import style from "./admin-panel.module.css";
import trash from "../../icons/trash.svg";
import { useLayoutEffect, useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import { closeModal, openModal } from "../../slices/appSlice.js";
import { setUser } from "../../slices/userSlice.js";
import { checkAccess } from "../../utils";
import { Header, Orders, Reports, UserRow } from "../components";
import { PrivateEditForm } from "../Product-Page/private-edit-form.js";
import {
  updateBusketOrdersFetch,
  getAllImagesFetch,
} from "../../fetchs";
import { ColorRing } from "react-loader-spinner";
import {deleteUserFetch} from "../../slices/allUsersSlice.js";
import axios from "axios";

export const AdminPanel = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers.items);
  const [role, setRole] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const userRole = useSelector(selectUserRole);
  const newProduct = {
    id: "",
    productName: "",
    image_url: "",
    description: "",
    category: "",
    weight: "",
    calories: "",
    ingredients: "",
    price: "",
    comments: [],
  };
  const [orders, setOrders] = useState([]);
  const [paidStatus, setPaidStatus] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState(false);
  const [reports, setReports] = useState([]);
  const [reportDeleteMessage, setReportDeleteMessage] = useState(null);
  const [ordersDeleteMessage, setOrdersDeleteMessage] = useState(null);
  const allProducts = useSelector((state) => state.products.items);
  const [allImages, setAllImages] = useState([]);
  const [imageToRemove, setImageToRemove] = useState(null);
  const [loading, setLoading] = useState(false);

  const onImageRemove = (id) => {
    dispatch(
      openModal({
        text: "Удалить изображение?",
        onConform: () => {
          axios.delete (`/upload/${id}`);
          setAllImages(allImages.filter((image) => image._id !== id));
          dispatch(closeModal());
        },
        onCancel: () => {
          dispatch(closeModal());
        },
      })
    );
  };

  const onBusketOrderUpdate = (objParams) => {
    updateBusketOrdersFetch(objParams);
  };

  const onBusketOrderDelete = (id) => {
    dispatch(
      openModal({
        text: "Удалить заказ? ",
        onConform: () => {
          dispatch(closeModal());
          axios.delete(`/buskets/${id}`);
          setOrders(orders.filter((order) => order._id !== id));
          setOrdersDeleteMessage("Заказ удален");
          setTimeout(() => {
            setOrdersDeleteMessage(null);
          }, 3000);
        },
        onCancel: () => {
          dispatch(closeModal());
        },
      })
    );
  };
  const deleteReport = (id) => {
    dispatch(
      openModal({
        text: "Удалить жалобу? ",
        onConform: () => {
          dispatch(closeModal());
          setReportDeleteMessage("Жалоба удалена");
          setReports(reports.filter((report) => report._id !== id));
          axios.delete(`/reports/${id}`);
          setTimeout(() => {
            setReportDeleteMessage(null);
          }, 3000);
        },
        onCancel: () => {
          dispatch(closeModal());
        },
      })
    );
  };

  const onUserRemove = useCallback(
    (userId) => {
      if (!checkAccess([role[0]?.id], userRole)) {
        setErrorMessage("Доступ запрещен");
        return;
      }
      let  user = users?.find((user) => user.id === userId);

      if (user.roleId === 0) {
        setErrorMessage("Нельзя удалить администратора");
        return;
      }
      setErrorMessage(null);
      dispatch(deleteUserFetch(userId))
    },
    [role, userRole, users, dispatch]
  );

  useLayoutEffect(() => {
    const currentUserDataJSON = localStorage.getItem("userData");
    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);
    dispatch(
      setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) })
    );
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("/roles"),
      axios.get("/buskets"),
      axios.get("/reports"),
      getAllImagesFetch(),
    ]).then(
      ([ rolesRes, ordersRes, reportsRes, imagesRes]) => {
        setRole(rolesRes.data);
        setOrders(ordersRes.data);
        setReports(reportsRes.data);
        setAllImages(imagesRes);
        setLoading(false)
      }
    );
  }, []);

  useEffect(() => {
    const result = allImages.filter(
      (image) => !allProducts.some((product) => product.image_url === image.url)
    );
    setImageToRemove(result);
  }, [allImages, allProducts]);


  return (
    <>
      <Header />
      {loading ? <div className={style.AdminPanelWrapper}><ColorRing width={200} height={200} /></div> : (
      <div className={style.AdminPanelWrapper}>
        {userRole === role[0]?.id || userRole === role[0]?.id ? (
          <details className={style.AdminPanelDetails}>
            <summary className={style.AdminPanelSummary}>
              Добавить новый продукт
            </summary>
            <PrivateEditForm product={newProduct} allProducts={allProducts} />
          </details>
        ) : null}
        {userRole === role[0]?.id || userRole === role[1]?.id ? (
          <details className={style.AdminPanelDetails}>
            <summary className={style.AdminPanelSummary}>Пользователи</summary>
            {errorMessage ? <div>{errorMessage}</div> : null}
            <div>
              {users?.map(
                ({
                  id,
                  login,
                  address,
                  homeNumber,
                  flatNumber,
                  phone,
                  registeredAt,
                  roleId,
                }) => (
                  <UserRow
                    key={id}
                    id={id}
                    login={login}
                    address={address}
                    homeNumber={homeNumber}
                    flatNumber={flatNumber}
                    phone={phone}
                    registeredAt={registeredAt}
                    roleId={roleId}
                    roles={role.filter(
                      ({ id: role_id }) => role_id !== role[3]?.id
                    )}
                    onUserRemove={() => onUserRemove(id)}
                  />
                )
              )}
            </div>
          </details>
        ) : null}

        {orders.length > 0 &&
        (userRole === role[0]?.id || userRole === role[1]?.id) ? (
          <details>
            <summary className={style.AdminPanelSummary}>Заказы</summary>
            <div className={style.userMessage}>{ordersDeleteMessage}</div>
            <div className={style.OrdersWrapper}>
              <Orders
                users={users}
                orders={orders}
                setPaidStatus={setPaidStatus}
                setDeliveryStatus={setDeliveryStatus}
                onBusketOrderUpdate={onBusketOrderUpdate}
                paidStatus={paidStatus}
                deliveryStatus={deliveryStatus}
                onBusketOrderDelete={onBusketOrderDelete}
              />
            </div>
          </details>
        ) : null}

        {reports.length > 0 &&
        (userRole === role[0]?.id || userRole === role[1]?.id) ? (
          <details>
            <div className={style.userMessage}>{reportDeleteMessage}</div>
            <summary className={style.AdminPanelSummary}>Жалобы</summary>
            <Reports
              users={users}
              reports={reports}
              deleteReport={deleteReport}
            />
          </details>
        ) : null}

        {imageToRemove?.length > 0 &&
        (userRole === role[0]?.id || userRole === role[1]?.id) ? (
          <details>
            <summary className={style.AdminPanelSummary}>Неиспользуемые изображения</summary>
            {imageToRemove?.map((image) => (
              <div key={image._id} className={style.ImageWrapper}>
                <img key={image._id} src={image.url} alt="loaded" className={style.imageToRemove}/>
                <img
                  src={trash}
                  alt="trash"
                  onClick={() => onImageRemove(image._id)}
                  className={style.AdminPanelTrash}
                />
              </div>
            ))}
          </details>
        ) : null}
      </div>)}
    </>
  );
};
