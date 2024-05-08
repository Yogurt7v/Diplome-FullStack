import style from "./card.module.css";
import plus from "../../../icons/plus.svg";
import minus from "../../../icons/minus.svg";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../../selectors";
import { addBusketData } from "../../../actions/add-busket-data";

export const Card = ({ id, productName, imageUrl, description, price }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const userOnPage = useSelector(selectUserId);

  const decrimetnQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    setQuantity(quantity);
  }, [quantity]);

  const addProductToBusket = (productId = id, productName, quantity, price) => {
    const userId = userOnPage;
    const randomId = (Math.random() * 1000000).toFixed(0);
    dispatch(
      addBusketData({
        randomId,
        userId,
        productId,
        productName,
        quantity,
        price,
      })
    );
  };

  return (
    <>
      <div className={style.CardWrapper}>
        <div className={style.CardLogo}>
          <Link to={`/products/${id}`}>
            <img src={imageUrl} alt="" className={style.CardImage} />
          </Link>
        </div>
        <div className={style.CardInfo}>
          <h3 className={style.CardTitle}>{productName}</h3>

          <div className={style.CardDescription}>
            <p className={style.CardText}>{description}</p>
          </div>
          <div className={style.CardQuantity}>
            <div className={style.Increment}>
              <div className={style.Cover}>
                <img
                  src={minus}
                  alt=""
                  onClick={() => decrimetnQuantity()}
                  className={quantity === 1 ? style.disabled : style.normal}
                />
              </div>

              <p className={style.quantityNumber}>{quantity}</p>
              <div className={style.Cover}>
                <img
                  src={plus}
                  alt=""
                  onClick={() => setQuantity(quantity + 1)}
                  className={style.normal}
                />
              </div>
              <div className={style.CardPrice}>{price} $</div>
            </div>
          </div>
          <button
            className={style.CardButton}
            onClick={() => addProductToBusket(id, productName, quantity, price)}
          >
            Buy
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
