import * as React from "react";
import Categories from "./components/Categories";

interface CategoriesList {
    categories: Categories
}

const CategoriesList = ({categories}: CategoriesList) => (
    <Categories {...categories} />
)

export {
    Categories
}

export default CategoriesList;
