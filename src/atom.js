import React from "react";
import {
  RecoilRoot,
  selector,
  useRecoilState,
  useRecoilValue,
  atom,
} from "recoil";
export const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
export const notifyCount = atom({
  key: "notifyCount", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
export const CartCount = atom({
  key: "CartCount", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
export const searchKey = atom({
  key: "searchKey", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
export const pageCategory = atom({
  key: "pageCate", // unique ID (with respect to other atoms/selectors)
  default: 1, // default value (aka initial value)
});
export const pageBrand = atom({
  key: "pageBrand", // unique ID (with respect to other atoms/selectors)
  default: 1, // default value (aka initial value)
});

export const pageSubCategoryData = atom({
  key: "pageSubCategoryData", // unique ID (with respect to other atoms/selectors)
  default: [
    {
      subCategory: "",
      brand: "",
      sortBy: "",
      filtr: false,
    },
  ], // default value (aka initial value)
});
export const pageCategoryData = atom({
  key: "pageSubCategoryData", // unique ID (with respect to other atoms/selectors)
  default: [
    {
      category: "",
      brand: "",
      sortBy: "",
      filtr: false,
    },
  ], // default value (aka initial value)
});
export const pageSubCategory = atom({
  key: "pageSubCategory", // unique ID (with respect to other atoms/selectors)
  default: 1, // default value (aka initial value)
});
export const pageFeature = atom({
  key: "pageFeature", // unique ID (with respect to other atoms/selectors)
  default: 1, // default value (aka initial value)
});
export const chngeFilter = atom({
  key: "chngeFilter", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
