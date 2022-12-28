import { selector } from "recoil";
import { textState,CartCount } from "./atom";

export const charCountState = selector({
  key: "charCountState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);
    return text;
  },
});
export const charCartState = selector({
  key: "charCartState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(CartCount);
    return text;
  },
});
