import style from "./main-page.module.css";
import { useLayoutEffect, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../slices/userSlice";
import { allProductsFetch } from "../../slices/productsSlice";
import { allUsersFetch } from "../../slices/allUsersSlice";
import {
  SortBar,
  Header,
  MainContent,
  SearchBar,
  BusketCard,
} from "../components";
import { SORT_OPTIONS } from "../../constants";

export const MainPage = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.items);
  const productsFromStore = useSelector((state) => state.products.items);
  const [products, setProducts] = useState(productsFromStore);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchPhraseFromSearchBar, setSearchPhraseFromSearchBar] =
    useState("");
  const [sorting, setSorting] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const sortOption = SORT_OPTIONS;

  const onSearch = () => {
    setSearchPhrase(searchPhraseFromSearchBar);
  };

  const onDelete = () => {
    setSearchPhrase("");
  };


  const [isActiveItem, setActiveItem] = useState("");

  const onCategoryChange = (event) => {
    const category = event.target.id;
    if (category === "All") {
      setSearchCategory(null);
      setActiveItem("");
    } else {
      setActiveItem(category);
      setSearchCategory(category);
      setCurrentPage(1);
    }
  };

  const handleSort = (e) => {
    setSorting(e.target.value);
  };

  useLayoutEffect(() => {
    const currentUserDataJSON = localStorage.getItem("userData");
    if (!currentUserDataJSON) {
      dispatch(
        setUser({
          id: -1,
          login: "guest",
          roleId: 3,
        })
      );
    }
    if (currentUserDataJSON) {
      const currentUserData = JSON.parse(currentUserDataJSON);
      dispatch(
        setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) })
      );
    }
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(allProductsFetch())
    dispatch(allUsersFetch())
    }, [dispatch])

  useEffect(() => {
      let products = allProducts;
      if(searchCategory){
        products = allProducts.filter((allProducts) => allProducts.category === searchCategory);
      }
      if (searchPhrase) {
        products = products.filter((product) => product.description.includes(searchPhrase));
      }
      if (sorting) {
        products = sortOption.find((option) => option.value === sorting).sort(products);
      }
      setProducts(products);
      setCurrentPage(1);
  }, [searchPhrase, searchCategory, sorting, sortOption, dispatch, allProducts]);

  return (
    <>
      <Header
        onCategoryChange={onCategoryChange}
        isActiveItem={isActiveItem}
      />
      <div className={style.AppWrapper}>
        <div className={style.SortBarWrapper}>
          <SortBar options={sortOption} onSort={handleSort} />
          <SearchBar
            searchPhraseFromSearchBar={searchPhraseFromSearchBar}
            setSearchPhraseFromSearchBar={setSearchPhraseFromSearchBar}
            searchPhrase={searchPhrase}
            onSearch={onSearch}
            onDelete={onDelete}
          />
          <BusketCard />
        </div>
        <MainContent
        products={products}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};
