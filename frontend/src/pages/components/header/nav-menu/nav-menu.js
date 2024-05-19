import style from "./nav-menu.module.css";
import { NavMenuItem } from "../../../components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const NavMenu = ({ onCategoryChange, isActiveItem }) => {
  const [allCategorys, setAllCategorys] = useState([]);
  const appProducts = useSelector((state) => state.products.items);

  useEffect(() => {
      const uniqueCategorys = [...new Set(appProducts.map(({ category }) => category))];
      uniqueCategorys.unshift("All");
      setAllCategorys(uniqueCategorys);
  }, [appProducts]);

  return (
    <>
      <nav className={style.NavMenuWrapper}>
        {allCategorys.map((category) => (
          <NavMenuItem
            isActiveItem={isActiveItem}
            key={category}
            item={category}
            onCategoryChange={onCategoryChange}
          />
        ))}
      </nav>
    </>
  );
};

export default NavMenu;
