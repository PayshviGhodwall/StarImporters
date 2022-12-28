import React from "react";
import {
  RecoilRoot,
  selector,
  useRecoilState,
  useRecoilValue,
  atom
} from 'recoil';
export const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
export const notifyCount = atom({
  key: 'notifyCount', // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
export const CartCount = atom({
  key: 'CartCount', // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});