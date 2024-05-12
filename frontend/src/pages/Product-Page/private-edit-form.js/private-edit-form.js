import styled from "./private-edit-form.module.css";
import { useLayoutEffect, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components";
import {
  addProductFetch,
  updatedProductFetch,
} from "../../../fetchs";

export const PrivateEditForm = ({
  product: {
    id,
    productName,
    image_url,
    description,
    category,
    weight,
    calories,
    ingredients,
    price,
  },
  allProducts,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [productNameValue, setProductNameValue] = useState(productName);
  const [imageUrlValue, setImageUrlValue] = useState(image_url);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [categoryValue, setCategoryValue] = useState(category);
  const [weightValue, setWeightValue] = useState(weight);
  const [caloriesValue, setCaloriesValue] = useState(calories);
  const [ingredientsValue, setIngredientsValue] = useState(ingredients);
  const [priceValue, setPriceValue] = useState(price);
  const [categoriesValue, setCategoriesValue] = useState([]);
  const [image, setImage] = useState("");
  const fileInput = useRef(null);


  useLayoutEffect(() => {
    setImageUrlValue(image_url);
    setDescriptionValue(description);
    setCategoryValue(category);
    setWeightValue(weight);
    setCaloriesValue(calories);
    setIngredientsValue(ingredients);
    setPriceValue(price);
  }, [
    image_url,
    description,
    category,
    weight,
    calories,
    ingredients,
    price,
    dispatch,
  ]);

  const onSave = () => {
    if (id) {
      updatedProductFetch({
        id,
        productName: productNameValue,
        image_url: imageUrlValue,
        description: descriptionValue,
        category: categoryValue || "burger",
        weight: Number(weightValue),
        calories: Number(caloriesValue),
        ingredients: ingredientsValue,
        price: Number(priceValue),
      }).then(() => navigate(`/`));
    } else {
      addProductFetch({
        productName: productNameValue,
        image_url: imageUrlValue,
        description: descriptionValue,
        category: categoryValue || "burger",
        weight: Number(weightValue),
        calories: Number(caloriesValue),
        ingredients: ingredientsValue,
        price: Number(priceValue),
      }).then(() => navigate(`/`));
    }
  };

  useEffect(() => {
    let products = allProducts
      let categories = [];
      for (let i = 0; i < products?.length; i++) {
        categories.push(products[i].category);
      }
      const uniqueСategories = categories.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      setCategoriesValue(uniqueСategories);
  }, [allProducts]);

  const onProductNameChange = ({ target }) => {
    setProductNameValue(target.value);
  };
  const onImageChange = ({ target }) => {
    setImageUrlValue(target.value);
  };

  const convertImageToBase64 = (event) => {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        setImage(reader.result);
      } 
      reader.onerror = (error) => {
        console.log('Ошибка загрузки файла ', error);
      }
  }

  const uploadImage = () => {
    setImageUrlValue("")
    fetch(`/upload`, {
      method: "POST",
      headers: {  
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        base64: image
      })
      }).then((res) => res.json()).then((res) => {
        setImageUrlValue(res.url);
    })
}
  const onDescriptionChange = ({ target }) => {
    setDescriptionValue(target.value);
  };
  const onCategoryChange = ({ target }) => {
    setCategoryValue(target.value);
  };
  const onWeightChange = ({ target }) => {
    setWeightValue(target.value);
  };
  const onCaloriesChange = ({ target }) => {
    setCaloriesValue(target.value);
  };
  const onIngredientsChange = ({ target }) => {
    setIngredientsValue(target.value);
  };
  const onPriceChange = ({ target }) => {
    setPriceValue(target.value);
  };

  useEffect(() => {
    const errorArray = [];
    if (!productNameValue) {
      errorArray.push("Название продукта не может быть пустым");
    }
    if (!imageUrlValue) {
      errorArray.push("Путь к картинке не может быть пустым");
    }
    if (!descriptionValue) {
      errorArray.push("Описание продукта не может быть пустым");
    }
    if (weightValue < 0) {
      errorArray.push("Вес не может меньше нуля");
    }
    if (caloriesValue <= 0 || caloriesValue > 10000) {
      errorArray.push("Калории не могут быть меньше нуля и больше 10000");
    }
    if (!ingredientsValue) {
      errorArray.push("Ингредиенты не может быть пустым");
    }
    if (priceValue <= 0) {
      errorArray.push("Цена не может быть меньше или равна нулю");
    }
    const errorMessage =
      errorArray.length > 1 ? errorArray.join(", ") : errorArray[0];

    setError(errorMessage);
  }, [
    priceValue,
    productNameValue,
    imageUrlValue,
    descriptionValue,
    weightValue,
    caloriesValue,
    ingredientsValue,
  ]);

  return (
    <div className={styled.EditFormWrapper}>
      <CustomInput
        value={productNameValue}
        placeholder="Название продукта"
        type="text"
        className="input"
        onChange={onProductNameChange}
      />
      <CustomInput
        value={imageUrlValue}
        placeholder="Путь к картинке"
        type="textarea"
        className="input"
        onChange={onImageChange}
      />
      <div className={styled.newImageWrapper}>
        <button onClick={() => fileInput.current.click()} className={styled.EditButtons}>Обзор</button>

      <input
        type="file"
        accept="image/*"
        onChange={convertImageToBase64}
        className={styled.hidden}
        ref = {fileInput}
      />
      {image === "" ? null :  (<img src={image === "" ? "" : image } alt="loaded"  className={styled.newImage}/>)}
      <button onClick={uploadImage} className={styled.EditButtons}>Загрузить</button>
      </div>
      
      <CustomInput
        value={descriptionValue}
        placeholder="Описание продукта"
        type="textarea"
        className="input"
        onChange={onDescriptionChange}
      />
      <select
        onChange={onCategoryChange}
        className={styled.select}
      >
        <option value=""/>
        {categoriesValue?.map((category) => (
          <option key={category} value={category} >
            {category}
          </option>
        ))}
      </select>
      <CustomInput
        value={weightValue}
        placeholder="Вес продукта"
        className="input"
        type="number"
        onChange={onWeightChange}
      />
      <CustomInput
        value={caloriesValue}
        placeholder="Калории"
        className="input"
        type="number"
        onChange={onCaloriesChange}
      />
      <CustomInput
        value={ingredientsValue}
        placeholder="Ингредиенты"
        type="text"
        className="input"
        onChange={onIngredientsChange}
      />
      <CustomInput
        value={priceValue}
        placeholder="Цена"
        type="number"
        className="input"
        onChange={onPriceChange}
      />
      {error && <div className={styled.PrivateEditFormError}>{error}</div>}
      <div className={styled.ButtonsWrapper}>
        <button onClick={() => navigate(`/`)} className={styled.EditButtons}>
          Назад
        </button>

        <button
          onClick={onSave}
          className={styled.EditButtons}
          disabled={error}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};
