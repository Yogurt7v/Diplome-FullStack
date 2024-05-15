import style from "./main-page.module.css";
import { useLayoutEffect, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../slices/userSlice";
import { addProductsData } from "../../slices/productsSlice";
import {setAllUsers} from "../../slices/allUsersSlice";
import {
  SortBar,
  Header,
  MainContent,
  SearchBar,
  BusketCard,
} from "../components";
import { SORT_OPTIONS } from "../../constants";
import { getAllProducts, getUsersFetch } from "../../fetchs";

export const MainPage = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.items);
  const [products, setProducts] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchPhraseFromSearchBar, setSearchPhraseFromSearchBar] =
    useState("");
  const [sorting, setSorting] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [loading, setLoading] = useState(true);
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
    const random = Math.random().toFixed(50);
    if (!currentUserDataJSON) {
      dispatch(
        setUser({
          id: -1,
          login: "guest",
          roleId: 3,
          session: random,
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
    Promise.all([
      getAllProducts(),
      getUsersFetch()
    ]).then(([allProducts, allUsers]) => {
      dispatch(addProductsData(allProducts))
      dispatch(setAllUsers(allUsers));
    })}, [dispatch])

  useEffect(() => {
      const sortObJ = sortOption.find((option) => option.value === sorting);
      const filteredProducts = allProducts.filter((allProducts) =>
        searchCategory ? allProducts.category === searchCategory : allProducts
      );
      setProducts(sortObJ ? sortObJ.sort(filteredProducts) : filteredProducts);
      setCurrentPage(1);
      setLoading(false);
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
          loading={loading}
          products={products}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};
